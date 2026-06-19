import {
  DEFAULT_RITUAL_DB_CREATED_AT_ISO,
  RITUAL_DB_ACTORS,
  RITUAL_DB_SCHEMA_VERSION,
  type RitualDbActor,
  type RitualVersionDocument,
} from "./db-documents";
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
} from "./types";

export const RITUAL_EDIT_DRAFT_STATUSES = [
  "active",
  "discarded",
  "submitted",
  "applied",
] as const;

export type RitualEditDraftStatus =
  (typeof RITUAL_EDIT_DRAFT_STATUSES)[number];

export const RITUAL_EDIT_DRAFT_SAVE_STATES = [
  "idle",
  "saving",
  "saved",
  "unsaved_changes",
  "save_failed",
] as const;

export type RitualEditDraftSaveState =
  (typeof RITUAL_EDIT_DRAFT_SAVE_STATES)[number];

export const RITUAL_EDIT_DRAFT_ACTORS = [
  ...RITUAL_DB_ACTORS,
  "household",
] as const;

export type RitualEditDraftActor =
  (typeof RITUAL_EDIT_DRAFT_ACTORS)[number];

export type RitualEditDraftOrigin =
  | {
      type: "source";
      sourceGrounding: RitualSourceGrounding[];
    }
  | {
      type: "household";
      householdContext: string;
    };

export type RitualEditDraftBuffer = {
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

export type RitualEditDraftDocument = {
  id: string;
  schemaVersion: typeof RITUAL_DB_SCHEMA_VERSION;
  collection: "ritualEditDrafts";
  ritualId: string;
  baseVersionId?: string;
  baseContentHash?: string;
  draftSource: "existing_version" | "household_blank";
  status: RitualEditDraftStatus;
  saveState: RitualEditDraftSaveState;
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

export type RitualEditDraftStore = {
  getDraft(draftId: string): Promise<RitualEditDraftDocument | undefined>;
  setDraft(draft: RitualEditDraftDocument): Promise<void>;
  listDraftsForRitual(ritualId: string): Promise<RitualEditDraftDocument[]>;
};

type AdminDocumentSnapshotLike = {
  exists: boolean;
  data: () => unknown;
};

type AdminQuerySnapshotLike = {
  docs: AdminDocumentSnapshotLike[];
};

type AdminDocumentReferenceLike = {
  get: () => Promise<AdminDocumentSnapshotLike>;
  set: (document: unknown) => Promise<unknown>;
};

type AdminCollectionReferenceLike = {
  doc: (id: string) => AdminDocumentReferenceLike;
  get: () => Promise<AdminQuerySnapshotLike>;
};

export type AdminFirestoreRitualEditDraftDb = {
  collection: (collectionName: string) => AdminCollectionReferenceLike;
};

export type CreateDraftFromRitualVersionInput = {
  store: RitualEditDraftStore;
  versionDocument: RitualVersionDocument;
  draftId?: string;
  actor: RitualEditDraftActor;
  createdAtIso?: string;
};

export type CreateBlankHouseholdRitualDraftInput = {
  store: RitualEditDraftStore;
  ritualId: string;
  draftId?: string;
  actor: RitualEditDraftActor;
  createdAtIso?: string;
};

export type SaveRitualEditDraftInput = {
  store: RitualEditDraftStore;
  draftId: string;
  draftBuffer: RitualEditDraftBuffer;
  actor: RitualEditDraftActor;
  updatedAtIso?: string;
};

export type DraftStatusChangeInput = {
  store: RitualEditDraftStore;
  draftId: string;
  actor: RitualEditDraftActor;
  updatedAtIso?: string;
};

export type ApplyRitualEditDraftStatusInput = DraftStatusChangeInput & {
  appliedVersionId: string;
};

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
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

function createDraftId(ritualId: string, createdAtIso: string): string {
  const suffix = createdAtIso.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  return `draft_${ritualId.replace(/[^a-zA-Z0-9]+/g, "_")}_${suffix}`;
}

function normalizeTimestamp(value: string | undefined): string {
  const timestamp = value ?? DEFAULT_RITUAL_DB_CREATED_AT_ISO;

  assertIsoLike(timestamp, "Draft timestamp");

  return timestamp;
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

export async function createDraftFromRitualVersion(
  input: CreateDraftFromRitualVersionInput,
): Promise<RitualEditDraftDocument> {
  assertRitualEditDraftActor(input.actor);
  const createdAtIso = normalizeTimestamp(input.createdAtIso);
  const draftId = input.draftId ??
    createDraftId(input.versionDocument.ritualId, createdAtIso);
  const draft: RitualEditDraftDocument = {
    id: draftId,
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

export async function createBlankHouseholdRitualDraft(
  input: CreateBlankHouseholdRitualDraftInput,
): Promise<RitualEditDraftDocument> {
  assertRitualEditDraftActor(input.actor);
  const createdAtIso = normalizeTimestamp(input.createdAtIso);
  const draftId = input.draftId ?? createDraftId(input.ritualId, createdAtIso);
  const draft: RitualEditDraftDocument = {
    id: draftId,
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

export async function loadRitualEditDraft(
  store: RitualEditDraftStore,
  draftId: string,
): Promise<RitualEditDraftDocument | undefined> {
  const draft = await store.getDraft(draftId);

  return draft ? cloneJson(draft) : undefined;
}

export async function listRitualEditDraftsForRitual(
  store: RitualEditDraftStore,
  ritualId: string,
): Promise<RitualEditDraftDocument[]> {
  return (await store.listDraftsForRitual(ritualId)).map(cloneJson);
}

async function updateDraftBuffer(
  input: SaveRitualEditDraftInput,
  savedAtField: "lastAutosavedAtIso" | "lastManuallySavedAtIso",
): Promise<RitualEditDraftDocument> {
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
    [savedAtField]: updatedAtIso,
  };

  await input.store.setDraft(updated);

  return cloneJson(updated);
}

export function autosaveRitualEditDraft(
  input: SaveRitualEditDraftInput,
): Promise<RitualEditDraftDocument> {
  return updateDraftBuffer(input, "lastAutosavedAtIso");
}

export function saveRitualEditDraft(
  input: SaveRitualEditDraftInput,
): Promise<RitualEditDraftDocument> {
  return updateDraftBuffer(input, "lastManuallySavedAtIso");
}

async function updateDraftStatus(
  input: DraftStatusChangeInput,
  status: Exclude<RitualEditDraftStatus, "active">,
): Promise<RitualEditDraftDocument> {
  assertRitualEditDraftActor(input.actor);
  const existing = await input.store.getDraft(input.draftId);

  if (!existing) {
    throw new Error("Ritual edit draft was not found.");
  }

  assertActiveDraft(existing);

  const updatedAtIso = normalizeTimestamp(input.updatedAtIso);
  const updated: RitualEditDraftDocument = {
    ...cloneJson(existing),
    status,
    saveState: "saved",
    updatedBy: input.actor,
    updatedAtIso,
    ...(status === "discarded"
      ? { discardedBy: input.actor, discardedAtIso: updatedAtIso }
      : { submittedBy: input.actor, submittedAtIso: updatedAtIso }),
  };

  await input.store.setDraft(updated);

  return cloneJson(updated);
}

export function discardRitualEditDraft(
  input: DraftStatusChangeInput,
): Promise<RitualEditDraftDocument> {
  return updateDraftStatus(input, "discarded");
}

export function markRitualEditDraftSubmitted(
  input: DraftStatusChangeInput,
): Promise<RitualEditDraftDocument> {
  return updateDraftStatus(input, "submitted");
}

export async function markRitualEditDraftApplied(
  input: ApplyRitualEditDraftStatusInput,
): Promise<RitualEditDraftDocument> {
  assertRitualEditDraftActor(input.actor);
  const existing = await input.store.getDraft(input.draftId);

  if (!existing) {
    throw new Error("Ritual edit draft was not found.");
  }

  assertActiveDraft(existing);

  if (input.appliedVersionId.trim().length === 0) {
    throw new Error("Applied version id is required.");
  }

  const updatedAtIso = normalizeTimestamp(input.updatedAtIso);
  const updated: RitualEditDraftDocument = {
    ...cloneJson(existing),
    status: "applied",
    saveState: "saved",
    updatedBy: input.actor,
    updatedAtIso,
    appliedBy: input.actor,
    appliedAtIso: updatedAtIso,
    appliedVersionId: input.appliedVersionId,
  };

  await input.store.setDraft(updated);

  return cloneJson(updated);
}

export function createInMemoryRitualEditDraftStore(
  initialDrafts: readonly RitualEditDraftDocument[] = [],
): RitualEditDraftStore & {
  getAllDrafts(): RitualEditDraftDocument[];
} {
  const drafts = new Map(
    initialDrafts.map((draft) => [draft.id, cloneJson(draft)]),
  );

  return {
    async getDraft(draftId) {
      const draft = drafts.get(draftId);

      return draft ? cloneJson(draft) : undefined;
    },
    async setDraft(draft) {
      drafts.set(draft.id, cloneJson(draft));
    },
    async listDraftsForRitual(ritualId) {
      return [...drafts.values()]
        .filter((draft) => draft.ritualId === ritualId)
        .sort((a, b) => b.updatedAtIso.localeCompare(a.updatedAtIso))
        .map(cloneJson);
    },
    getAllDrafts() {
      return [...drafts.values()].map(cloneJson);
    },
  };
}

export function createAdminFirestoreRitualEditDraftStore(
  db: AdminFirestoreRitualEditDraftDb,
): RitualEditDraftStore {
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
