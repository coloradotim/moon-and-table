import type { RitualDbValidationFinding } from "../data/rituals/db-documents";
import type { RitualVersionDocument } from "../data/rituals/db-documents";
import type {
  RitualEditDraftClientAction,
  SubmitRitualEditDraftResult,
} from "../data/rituals/ritual-edit-draft-client";
import {
  addHouseholdRitualDraftToLibrary,
  applyRitualEditDraft,
  type ApplyRitualEditDraftStore,
} from "../data/rituals/ritual-edit-draft-apply";
import {
  autosaveRitualEditDraft,
  createBlankHouseholdRitualDraft,
  createDraftFromRitualVersion,
  saveRitualEditDraft,
  type RitualEditDraftBuffer,
  type RitualEditDraftDocument,
  type RitualEditDraftStore,
} from "../data/rituals/ritual-edit-drafts";
import type { RitualCanonicalBody } from "../data/rituals/types";

export type RitualEditDraftApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

export type RitualEditDraftApiResponse = {
  status: (code: number) => RitualEditDraftApiResponse;
  json: (body: SubmitRitualEditDraftResult) => void;
  setHeader?: (name: string, value: string) => void;
};

export type VerifiedRitualEditDraftCaller = {
  uid: string;
  email?: string;
};

export type RitualEditDraftApiDependencies = {
  verifyIdToken: (idToken: string) => Promise<VerifiedRitualEditDraftCaller>;
  draftStore: RitualEditDraftStore;
  applyStore?: ApplyRitualEditDraftStore;
  getRitualVersionDocument: (
    versionId: string,
  ) => Promise<RitualVersionDocument | undefined>;
  authorize: (caller: VerifiedRitualEditDraftCaller) => boolean | Promise<boolean>;
  now?: () => string;
};

function finding(path: string, message: string): RitualDbValidationFinding {
  return { path, message, severity: "error" };
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

function isDraftOrigin(value: unknown): value is RitualEditDraftBuffer["origin"] {
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

  if (body.action === "list_active") {
    const limit = typeof body.limit === "number" && Number.isFinite(body.limit)
      ? Math.max(1, Math.min(Math.floor(body.limit), 25))
      : undefined;

    return {
      action: "list_active",
      ...(limit ? { limit } : {}),
    };
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

  if (
    (body.action === "apply_changes" || body.action === "add_to_library") &&
    typeof body.draftId === "string"
  ) {
    return {
      action: body.action,
      draftId: body.draftId,
    };
  }

  return undefined;
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
  if (getErrorMessage(error).includes("Ritual edit draft was not found")) {
    return invalid("draftId", "Ritual edit draft was not found.", 404);
  }

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
  request: Extract<RitualEditDraftClientAction, { action: "load_or_create" }>;
  dependencies: RitualEditDraftApiDependencies;
  now: string;
}): Promise<RitualEditDraftDocument | undefined> {
  const activeDraft = (await input.dependencies.draftStore.listDraftsForRitual(
    input.request.ritualId,
  )).find((draft) => draft.status === "active");

  if (activeDraft) {
    return activeDraft;
  }

  const versionDocument = await input.dependencies.getRitualVersionDocument(
    input.request.versionId,
  );

  if (!versionDocument || versionDocument.ritualId !== input.request.ritualId) {
    return undefined;
  }

  return createDraftFromRitualVersion({
    store: input.dependencies.draftStore,
    versionDocument,
    actor: "owner",
    createdAtIso: input.now,
  });
}

async function handleRequestAction(input: {
  request: RitualEditDraftClientAction;
  dependencies: RitualEditDraftApiDependencies;
  now: string;
}): Promise<{ status: number; body: SubmitRitualEditDraftResult }> {
  if (input.request.action === "list_active") {
    const drafts = await input.dependencies.draftStore.listActiveDrafts(
      input.request.limit ?? 25,
    );

    return { status: 200, body: { valid: true, drafts } };
  }

  if (input.request.action === "load_or_create") {
    const draft = await loadOrCreateDraft({
      request: input.request,
      dependencies: input.dependencies,
      now: input.now,
    });

    return draft
      ? { status: 200, body: { valid: true, draft } }
      : invalid("versionId", "A published Ritual version is required before editing.");
  }

  if (input.request.action === "create_blank") {
    const draft = await createBlankHouseholdRitualDraft({
      store: input.dependencies.draftStore,
      ritualId: input.request.ritualId,
      actor: "owner",
      createdAtIso: input.now,
    });

    return { status: 200, body: { valid: true, draft } };
  }

  if (input.request.action === "apply_changes") {
    if (!input.dependencies.applyStore) {
      return invalid(
        "ritualEditDraft",
        "Publishing a draft requires the Ritual edit draft apply service.",
        500,
      );
    }

    const result = await applyRitualEditDraft({
      store: input.dependencies.applyStore,
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

  if (input.request.action === "add_to_library") {
    if (!input.dependencies.applyStore) {
      return invalid(
        "ritualEditDraft",
        "Adding a Ritual to the library requires the Ritual edit draft apply service.",
        500,
      );
    }

    const result = await addHouseholdRitualDraftToLibrary({
      store: input.dependencies.applyStore,
      draftId: input.request.draftId,
      actor: "owner",
      addedAtIso: input.now,
    });

    return result.valid
      ? {
        status: 200,
        body: {
          valid: true,
          draft: result.plan.draftAfter,
          appliedVersionId: result.plan.versionDocument.versionId,
          recommendationHeld: true,
          addedToLibrary: true,
        },
      }
      : { status: 400, body: { valid: false, findings: result.findings } };
  }

  const saveInput = {
    store: input.dependencies.draftStore,
    draftId: input.request.draftId,
    draftBuffer: input.request.draftBuffer,
    actor: "owner" as const,
    updatedAtIso: input.now,
  };
  const draft = input.request.action === "autosave"
    ? await autosaveRitualEditDraft(saveInput)
    : await saveRitualEditDraft(saveInput);

  return { status: 200, body: { valid: true, draft } };
}

export async function handleRitualEditDraftApi(
  request: RitualEditDraftApiRequest,
  response: RitualEditDraftApiResponse,
  dependencies: RitualEditDraftApiDependencies,
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

  let caller: VerifiedRitualEditDraftCaller;

  try {
    caller = await dependencies.verifyIdToken(idToken);
  } catch {
    const result = invalid("authorization", "Firebase ID token could not be verified.", 401);

    send(response, result.status, result.body);
    return;
  }

  if (!(await dependencies.authorize(caller))) {
    const result = invalid("authorization", "Ritual edit draft access was denied.", 403);

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
    const result = await handleRequestAction({
      request: parsedRequest,
      dependencies,
      now: dependencies.now?.() ?? new Date().toISOString(),
    });

    send(response, result.status, result.body);
  } catch (error) {
    console.error("[ritual-edit-draft] failed", error);
    const result = createUnexpectedApiError(error);

    send(response, result.status, result.body);
  }
}
