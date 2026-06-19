import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";

import type { RitualVersionDocument } from "../src/data/rituals/db-documents.js";
import {
  applyRitualEditDraft,
  createAdminFirestoreRitualEditDraftApplyStore,
  type ApplyRitualEditDraftStore,
} from "../src/data/rituals/ritual-edit-draft-apply.js";
import type {
  Ritual,
  RitualAdaptationPolicy,
  RitualAvailability,
  RitualCanonicalBody,
  RitualRecommendationMetadata,
  RitualReviewFlags,
  RitualSearchMetadata,
  RitualSourceGrounding,
  RitualStatus,
  RitualWords,
} from "../src/data/rituals/types.js";

type RitualDbValidationFinding = {
  path: string;
  message: string;
  severity: "error" | "warning";
};

type RitualEditDraftActor =
  | "owner"
  | "person_a"
  | "person_b"
  | "automation"
  | "codex"
  | "household";

type RitualEditDraftOrigin =
  | {
      type: "source";
      sourceGrounding: RitualSourceGrounding[];
    }
  | {
      type: "household";
      householdContext: string;
    };

type RitualEditDraftBuffer = {
  id: string;
  status?: RitualStatus;
  origin: RitualEditDraftOrigin;
  presentation: RitualCanonicalBody;
  recommendationMetadata?: Partial<RitualRecommendationMetadata>;
  searchMetadata?: Partial<RitualSearchMetadata>;
  availability?: Partial<RitualAvailability>;
  ritualWords?: RitualWords[];
  reviewFlags?: RitualReviewFlags;
  adaptationPolicy?: RitualAdaptationPolicy;
};

type RitualEditDraftDocument = {
  id: string;
  schemaVersion: "ritual-db-v1";
  collection: "ritualEditDrafts";
  ritualId: string;
  baseVersionId?: string;
  baseContentHash?: string;
  draftSource: "existing_version" | "household_blank";
  status: "active" | "discarded" | "submitted" | "applied";
  saveState: "idle" | "saving" | "saved" | "unsaved_changes" | "save_failed";
  draftBuffer: RitualEditDraftBuffer;
  createdBy: RitualEditDraftActor;
  createdAtIso: string;
  updatedBy: RitualEditDraftActor;
  updatedAtIso: string;
  lastAutosavedAtIso?: string;
  lastManuallySavedAtIso?: string;
  discardedBy?: RitualEditDraftActor;
  discardedAtIso?: string;
  submittedBy?: RitualEditDraftActor;
  submittedAtIso?: string;
  appliedBy?: RitualEditDraftActor;
  appliedAtIso?: string;
  appliedVersionId?: string;
};

type SubmitRitualEditDraftResult =
  | {
      valid: true;
      draft: RitualEditDraftDocument;
      appliedVersionId?: string;
      recommendationHeld?: boolean;
    }
  | {
      valid: false;
      findings: RitualDbValidationFinding[];
    };

type RitualEditDraftClientAction =
  | {
      action: "load_or_create";
      ritualId: string;
      versionId: string;
    }
  | {
      action: "create_blank";
      ritualId: string;
    }
  | {
      action: "autosave" | "save";
      draftId: string;
      draftBuffer: RitualEditDraftBuffer;
    }
  | {
      action: "apply_changes";
      draftId: string;
    };

type RitualEditDraftApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type RitualEditDraftApiResponse = {
  status: (code: number) => RitualEditDraftApiResponse;
  json: (body: SubmitRitualEditDraftResult) => void;
  setHeader?: (name: string, value: string) => void;
};

type FirestoreDb = ReturnType<typeof getFirestore>;

type RitualEditDraftStore = {
  getDraft(draftId: string): Promise<RitualEditDraftDocument | undefined>;
  setDraft(draft: RitualEditDraftDocument): Promise<void>;
  listDraftsForRitual(ritualId: string): Promise<RitualEditDraftDocument[]>;
};

const RITUAL_DB_SCHEMA_VERSION = "ritual-db-v1" as const;
const RITUAL_EDIT_DRAFT_ACTORS = [
  "owner",
  "person_a",
  "person_b",
  "automation",
  "codex",
  "household",
] as const satisfies readonly RitualEditDraftActor[];

type VercelRequest = RitualEditDraftApiRequest;
type VercelResponse = RitualEditDraftApiResponse;

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function finding(path: string, message: string): RitualDbValidationFinding {
  return { path, message, severity: "error" };
}

function invalid(
  path: string,
  message: string,
  status = 400,
): { status: number; body: SubmitRitualEditDraftResult } {
  return {
    status,
    body: {
      valid: false,
      findings: [finding(path, message)],
    },
  };
}

function send(
  response: RitualEditDraftApiResponse,
  status: number,
  body: SubmitRitualEditDraftResult,
): void {
  response.status(status).json(body);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isCanonicalBody(value: unknown): value is RitualCanonicalBody {
  return isObject(value) &&
    typeof value.headline === "string" &&
    typeof value.practice === "string" &&
    typeof value.intention === "string" &&
    typeof value.bestWindow === "string" &&
    typeof value.questionToCarry === "string" &&
    !("whyThisFits" in value);
}

function isDraftOrigin(value: unknown): value is RitualEditDraftOrigin {
  if (!isObject(value) || typeof value.type !== "string") {
    return false;
  }

  if (value.type === "source") {
    return Array.isArray(value.sourceGrounding);
  }

  return value.type === "household" && typeof value.householdContext === "string";
}

function isDraftBuffer(value: unknown): value is RitualEditDraftBuffer {
  return isObject(value) &&
    typeof value.id === "string" &&
    isDraftOrigin(value.origin) &&
    isCanonicalBody(value.presentation);
}

function parseRequest(body: unknown): RitualEditDraftClientAction | undefined {
  if (!isObject(body) || typeof body.action !== "string") {
    return undefined;
  }

  if (
    body.action === "load_or_create" &&
    typeof body.ritualId === "string" &&
    typeof body.versionId === "string"
  ) {
    return {
      action: "load_or_create",
      ritualId: body.ritualId,
      versionId: body.versionId,
    };
  }

  if (body.action === "create_blank" && typeof body.ritualId === "string") {
    return {
      action: "create_blank",
      ritualId: body.ritualId,
    };
  }

  if (
    (body.action === "autosave" || body.action === "save") &&
    typeof body.draftId === "string" &&
    isDraftBuffer(body.draftBuffer)
  ) {
    return {
      action: body.action,
      draftId: body.draftId,
      draftBuffer: body.draftBuffer,
    };
  }

  if (body.action === "apply_changes" && typeof body.draftId === "string") {
    return {
      action: "apply_changes",
      draftId: body.draftId,
    };
  }

  return undefined;
}

function getHeader(
  headers: RitualEditDraftApiRequest["headers"],
  name: string,
): string | undefined {
  const value = headers?.[name] ?? headers?.[name.toLowerCase()];

  return Array.isArray(value) ? value[0] : value;
}

function getBearerToken(headers: RitualEditDraftApiRequest["headers"]): string | undefined {
  const authorization = getHeader(headers, "authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);

  return match?.[1];
}

function getServiceAccount(): object | undefined {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (json) {
    return JSON.parse(json) as object;
  }

  if (base64) {
    return JSON.parse(Buffer.from(base64, "base64").toString("utf8")) as object;
  }

  if (path) {
    return JSON.parse(readFileSync(path, "utf8")) as object;
  }

  return undefined;
}

function initializeFirebaseAdmin(): void {
  if (getApps().length > 0) {
    return;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ??
    process.env.GCLOUD_PROJECT ??
    process.env.VITE_FIREBASE_PROJECT_ID;
  const serviceAccount = getServiceAccount();

  initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : applicationDefault(),
    projectId,
  });
}

async function getRitualVersionDocumentByVersionId(
  db: FirestoreDb,
  versionId: string,
): Promise<RitualVersionDocument | undefined> {
  const collection = db.collection("ritualVersions");
  const directSnapshot = await collection.doc(versionId).get();

  if (directSnapshot.exists) {
    return directSnapshot.data() as RitualVersionDocument;
  }

  const querySnapshot = await collection
    .where("versionId", "==", versionId)
    .limit(1)
    .get();
  const matchingSnapshot = querySnapshot.docs[0];

  return matchingSnapshot
    ? matchingSnapshot.data() as RitualVersionDocument
    : undefined;
}

function createAdminFirestoreRitualEditDraftStore(db: FirestoreDb): RitualEditDraftStore {
  const collection = db.collection("ritualEditDrafts");

  return {
    async getDraft(draftId) {
      const snapshot = await collection.doc(draftId).get();

      return snapshot.exists
        ? cloneJson(snapshot.data() as RitualEditDraftDocument)
        : undefined;
    },
    async setDraft(draft) {
      await collection.doc(draft.id).set(cloneJson(draft));
    },
    async listDraftsForRitual(ritualId) {
      const snapshot = await collection.get();

      return snapshot.docs
        .filter((document) => document.exists)
        .map((document) => document.data() as RitualEditDraftDocument)
        .filter((draft) => draft.ritualId === ritualId)
        .sort((a, b) => b.updatedAtIso.localeCompare(a.updatedAtIso))
        .map(cloneJson);
    },
  };
}

function assertRitualEditDraftActor(actor: RitualEditDraftActor): void {
  if (!RITUAL_EDIT_DRAFT_ACTORS.includes(actor)) {
    throw new Error("Ritual edit draft actor must be repo-safe.");
  }
}

function assertIsoLike(value: string, label: string): void {
  if (Number.isNaN(Date.parse(value))) {
    throw new Error(`${label} must be ISO-like.`);
  }
}

function normalizeTimestamp(value: string | undefined): string {
  const timestamp = value ?? "1970-01-01T00:00:00.000Z";

  assertIsoLike(timestamp, "Draft timestamp");

  return timestamp;
}

function createDraftId(ritualId: string, createdAtIso: string): string {
  const suffix = createdAtIso.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  return `draft_${ritualId.replace(/[^a-zA-Z0-9]+/g, "_")}_${suffix}`;
}

function draftOriginFromRitual(ritual: Ritual): RitualEditDraftOrigin {
  if (ritual.origin.type === "source") {
    return {
      type: "source",
      sourceGrounding: cloneJson(ritual.origin.sourceGrounding),
    };
  }

  return {
    type: "household",
    householdContext: ritual.origin.householdContext,
  };
}

function draftBufferFromRitual(ritual: Ritual): RitualEditDraftBuffer {
  return {
    id: ritual.id,
    status: ritual.status,
    origin: draftOriginFromRitual(ritual),
    presentation: {
      headline: ritual.presentation.headline,
      practice: ritual.presentation.practice,
      intention: ritual.presentation.intention,
      bestWindow: ritual.presentation.bestWindow,
      questionToCarry: ritual.presentation.questionToCarry,
    },
    recommendationMetadata: cloneJson(ritual.recommendationMetadata),
    searchMetadata: cloneJson(ritual.searchMetadata),
    availability: cloneJson(ritual.availability),
    ritualWords: ritual.ritualWords ? cloneJson(ritual.ritualWords) : undefined,
    reviewFlags: ritual.reviewFlags ? cloneJson(ritual.reviewFlags) : undefined,
    adaptationPolicy: ritual.adaptationPolicy
      ? cloneJson(ritual.adaptationPolicy)
      : undefined,
  };
}

function createBlankDraftBuffer(ritualId: string): RitualEditDraftBuffer {
  return {
    id: ritualId,
    status: "draft",
    origin: {
      type: "household",
      householdContext: "",
    },
    presentation: {
      headline: "",
      practice: "",
      intention: "",
      bestWindow: "",
      questionToCarry: "",
    },
    searchMetadata: {
      tags: [],
      keywords: [],
      materials: [],
      places: [],
      originLabel: "Household",
    },
    availability: {
      findable: false,
      directUseEligible: false,
      recommendationEligible: false,
    },
  };
}

async function createDraftFromRitualVersion(input: {
  store: RitualEditDraftStore;
  versionDocument: RitualVersionDocument;
  actor: RitualEditDraftActor;
  createdAtIso: string;
}): Promise<RitualEditDraftDocument> {
  assertRitualEditDraftActor(input.actor);
  const createdAtIso = normalizeTimestamp(input.createdAtIso);
  const draft: RitualEditDraftDocument = {
    id: createDraftId(input.versionDocument.ritualId, createdAtIso),
    schemaVersion: RITUAL_DB_SCHEMA_VERSION,
    collection: "ritualEditDrafts",
    ritualId: input.versionDocument.ritualId,
    baseVersionId: input.versionDocument.versionId,
    baseContentHash: input.versionDocument.contentHash,
    draftSource: "existing_version",
    status: "active",
    saveState: "saved",
    draftBuffer: draftBufferFromRitual(input.versionDocument.ritual),
    createdBy: input.actor,
    createdAtIso,
    updatedBy: input.actor,
    updatedAtIso: createdAtIso,
  };

  await input.store.setDraft(cloneJson(draft));

  return draft;
}

async function createBlankHouseholdRitualDraft(input: {
  store: RitualEditDraftStore;
  ritualId: string;
  actor: RitualEditDraftActor;
  createdAtIso: string;
}): Promise<RitualEditDraftDocument> {
  assertRitualEditDraftActor(input.actor);
  const createdAtIso = normalizeTimestamp(input.createdAtIso);
  const draft: RitualEditDraftDocument = {
    id: createDraftId(input.ritualId, createdAtIso),
    schemaVersion: RITUAL_DB_SCHEMA_VERSION,
    collection: "ritualEditDrafts",
    ritualId: input.ritualId,
    draftSource: "household_blank",
    status: "active",
    saveState: "idle",
    draftBuffer: createBlankDraftBuffer(input.ritualId),
    createdBy: input.actor,
    createdAtIso,
    updatedBy: input.actor,
    updatedAtIso: createdAtIso,
  };

  await input.store.setDraft(cloneJson(draft));

  return draft;
}

function assertActiveDraft(draft: RitualEditDraftDocument): void {
  if (draft.status !== "active") {
    throw new Error("Only active Ritual edit drafts can be changed.");
  }
}

function assertDraftBufferMatchesRitual(
  draft: RitualEditDraftDocument,
  draftBuffer: RitualEditDraftBuffer,
): void {
  if (draftBuffer.id !== draft.ritualId) {
    throw new Error("Draft buffer ritual id must match the draft document.");
  }
}

async function saveRitualEditDraft(input: {
  store: RitualEditDraftStore;
  draftId: string;
  draftBuffer: RitualEditDraftBuffer;
  actor: RitualEditDraftActor;
  updatedAtIso: string;
  savedAtField: "lastAutosavedAtIso" | "lastManuallySavedAtIso";
}): Promise<RitualEditDraftDocument> {
  assertRitualEditDraftActor(input.actor);
  const existing = await input.store.getDraft(input.draftId);

  if (!existing) {
    throw new Error("Ritual edit draft was not found.");
  }

  assertActiveDraft(existing);
  assertDraftBufferMatchesRitual(existing, input.draftBuffer);

  const updatedAtIso = normalizeTimestamp(input.updatedAtIso);
  const updated: RitualEditDraftDocument = {
    ...cloneJson(existing),
    draftBuffer: cloneJson(input.draftBuffer),
    saveState: "saved",
    updatedBy: input.actor,
    updatedAtIso,
    [input.savedAtField]: updatedAtIso,
  };

  await input.store.setDraft(updated);

  return cloneJson(updated);
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function getErrorCode(error: unknown): string {
  const code = (error as { code?: unknown } | undefined)?.code;

  return typeof code === "string" || typeof code === "number" ? String(code) : "";
}

function isQuotaExceededError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  const code = getErrorCode(error).toLowerCase();

  return code === "8" ||
    code === "resource-exhausted" ||
    code === "resource_exhausted" ||
    message.includes("resource_exhausted") ||
    message.includes("quota exceeded");
}

function createUnexpectedApiError(error: unknown): {
  status: number;
  body: SubmitRitualEditDraftResult;
} {
  if (isQuotaExceededError(error)) {
    return invalid(
      "firestore",
      "Firestore quota was exceeded, so the Ritual edit draft was not saved.",
      429,
    );
  }

  return invalid(
    "ritualEditDraft",
    "Ritual edit draft was not saved because the draft service failed.",
    500,
  );
}

async function loadOrCreateDraft(input: {
  store: RitualEditDraftStore;
  ritualId: string;
  versionId: string;
  now: string;
  getRitualVersionDocument: (versionId: string) => Promise<RitualVersionDocument | undefined>;
}): Promise<RitualEditDraftDocument | undefined> {
  const activeDraft = (await input.store.listDraftsForRitual(input.ritualId))
    .find((draft) => draft.status === "active");

  if (activeDraft) {
    return activeDraft;
  }

  const versionDocument = await input.getRitualVersionDocument(input.versionId);

  if (!versionDocument || versionDocument.ritualId !== input.ritualId) {
    return undefined;
  }

  return createDraftFromRitualVersion({
    store: input.store,
    versionDocument,
    actor: "owner",
    createdAtIso: input.now,
  });
}

async function handleRequestAction(input: {
  request: RitualEditDraftClientAction;
  store: RitualEditDraftStore;
  applyStore: ApplyRitualEditDraftStore;
  now: string;
  getRitualVersionDocument: (versionId: string) => Promise<RitualVersionDocument | undefined>;
}): Promise<{ status: number; body: SubmitRitualEditDraftResult }> {
  if (input.request.action === "load_or_create") {
    const draft = await loadOrCreateDraft({
      store: input.store,
      ritualId: input.request.ritualId,
      versionId: input.request.versionId,
      now: input.now,
      getRitualVersionDocument: input.getRitualVersionDocument,
    });

    return draft
      ? { status: 200, body: { valid: true, draft } }
      : invalid("versionId", "A published Ritual version is required before editing.");
  }

  if (input.request.action === "create_blank") {
    const draft = await createBlankHouseholdRitualDraft({
      store: input.store,
      ritualId: input.request.ritualId,
      actor: "owner",
      createdAtIso: input.now,
    });

    return { status: 200, body: { valid: true, draft } };
  }

  if (input.request.action === "apply_changes") {
    const result = await applyRitualEditDraft({
      store: input.applyStore,
      draftId: input.request.draftId,
      actor: "owner",
      appliedAtIso: input.now,
    });

    return result.valid
      ? {
        status: 200,
        body: {
          valid: true,
          draft: result.plan.draftAfter,
          appliedVersionId: result.plan.versionDocument.versionId,
          recommendationHeld: result.plan.recommendationHeld,
        },
      }
      : { status: 400, body: { valid: false, findings: result.findings } };
  }

  const existing = await input.store.getDraft(input.request.draftId);
  if (!existing) {
    return invalid("draftId", "Ritual edit draft was not found.", 404);
  }

  const draft = await saveRitualEditDraft({
    store: input.store,
    draftId: input.request.draftId,
    draftBuffer: input.request.draftBuffer,
    actor: "owner",
    updatedAtIso: input.now,
    savedAtField: input.request.action === "autosave"
      ? "lastAutosavedAtIso"
      : "lastManuallySavedAtIso",
  });

  return { status: 200, body: { valid: true, draft } };
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  response.setHeader?.("Cache-Control", "no-store");

  if (request.method !== "POST") {
    const result = invalid("method", "Ritual edit drafts require POST.", 405);

    send(response, result.status, result.body);
    return;
  }

  const idToken = getBearerToken(request.headers);
  if (!idToken) {
    const result = invalid("authorization", "A Firebase ID token is required.", 401);

    send(response, result.status, result.body);
    return;
  }

  const parsedRequest = parseRequest(request.body);
  if (!parsedRequest) {
    const result = invalid("request", "Ritual edit draft request was incomplete.");

    send(response, result.status, result.body);
    return;
  }

  try {
    initializeFirebaseAdmin();
    let decoded: Awaited<ReturnType<ReturnType<typeof getAuth>["verifyIdToken"]>>;

    try {
      decoded = await getAuth().verifyIdToken(idToken);
    } catch {
      const result = invalid("authorization", "Firebase ID token could not be verified.", 401);

      send(response, result.status, result.body);
      return;
    }

    const caller = {
      uid: decoded.uid,
      email: typeof decoded.email === "string" ? decoded.email : undefined,
    };

    if (!caller.uid) {
      const result = invalid("authorization", "Ritual edit draft access was denied.", 403);

      send(response, result.status, result.body);
      return;
    }

    const db = getFirestore();
    const result = await handleRequestAction({
      request: parsedRequest,
      store: createAdminFirestoreRitualEditDraftStore(db),
      applyStore: createAdminFirestoreRitualEditDraftApplyStore(db),
      getRitualVersionDocument: (versionId) =>
        getRitualVersionDocumentByVersionId(db, versionId),
      now: new Date().toISOString(),
    });

    send(response, result.status, result.body);
  } catch (error) {
    console.error("[ritual-edit-draft-route] failed", error);
    const result = createUnexpectedApiError(error);

    send(response, result.status, result.body);
  }
}
