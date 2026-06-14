import {
  createRitualReviewTransactionPlan,
  RITUAL_REVIEW_ACTIONS,
  type RitualReviewAction,
  type RitualReviewTransactionPlan,
  type RitualReviewTransactionWrite,
} from "./db-review-transactions";
import type {
  RitualDbActor,
  RitualDbValidationFinding,
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "./db-documents";

export type RitualReviewActionRequest = {
  ritualId: string;
  versionId: string;
  action: RitualReviewAction;
  reasons: string[];
};

export type RitualReviewActionCaller = {
  uid?: string;
  email?: string;
  reviewer?: RitualDbActor;
};

export type RitualReviewActionAuthorizer = (
  caller: RitualReviewActionCaller,
  request: RitualReviewActionRequest,
) => boolean | Promise<boolean>;

export type RitualReviewActionStore = {
  getRitualDocument: (ritualId: string) => Promise<RitualDocument | undefined>;
  getRitualVersionDocument: (
    versionId: string,
  ) => Promise<RitualVersionDocument | undefined>;
  getRitualValidationSnapshotDocument: (
    snapshotId: string,
  ) => Promise<RitualValidationSnapshotDocument | undefined>;
  commitReviewTransactionPlan: (
    plan: RitualReviewTransactionPlan,
  ) => Promise<void>;
};

export type RitualReviewActionBoundaryInput = {
  request: unknown;
  caller: RitualReviewActionCaller;
  store: RitualReviewActionStore;
  authorize: RitualReviewActionAuthorizer;
  createdAtIso?: string;
};

export type RitualReviewActionBoundaryResult =
  | {
    valid: true;
    plan: RitualReviewTransactionPlan;
  }
  | {
    valid: false;
    findings: RitualDbValidationFinding[];
  };

type AdminDocumentSnapshotLike = {
  exists: boolean;
  data: () => unknown;
};

type AdminDocumentReferenceLike = {
  get: () => Promise<AdminDocumentSnapshotLike>;
};

type AdminCollectionReferenceLike = {
  doc: (id: string) => AdminDocumentReferenceLike;
};

type AdminWriteBatchLike = {
  set: (ref: AdminDocumentReferenceLike, document: unknown) => void;
  create: (ref: AdminDocumentReferenceLike, document: unknown) => void;
  commit: () => Promise<unknown>;
};

export type AdminFirestoreReviewActionDb = {
  collection: (collectionName: string) => AdminCollectionReferenceLike;
  batch: () => AdminWriteBatchLike;
};

const ACTIONS_REQUIRING_VALIDATION = new Set<RitualReviewAction>([
  "promote_direct_use",
  "promote_recommendation",
  "archive_ritual",
  "rollback_published_version",
]);

const ACTIONS_REQUIRING_REASON = new Set<RitualReviewAction>([
  "hold_direct_use",
  "hold_recommendation",
  "mark_needs_source_recheck",
  "mark_needs_packet_correction",
  "add_review_note",
  "archive_ritual",
  "rollback_published_version",
]);

const MAX_REVIEW_REASONS = 8;
const MAX_REVIEW_REASON_LENGTH = 280;

function finding(path: string, message: string): RitualDbValidationFinding {
  return { path, message, severity: "error" };
}

function normalizeIdPart(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

export function createRitualValidationSnapshotIdForVersion(
  versionId: string,
): string {
  return `validation_${normalizeIdPart(versionId)}`;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRitualReviewAction(value: unknown): value is RitualReviewAction {
  return typeof value === "string" && RITUAL_REVIEW_ACTIONS.includes(
    value as RitualReviewAction,
  );
}

function normalizeReasons(reasons: unknown): string[] {
  if (!Array.isArray(reasons)) {
    return [];
  }

  return [...new Set(
    reasons
      .filter(isNonEmptyString)
      .map((reason) => reason.trim().slice(0, MAX_REVIEW_REASON_LENGTH)),
  )].slice(0, MAX_REVIEW_REASONS);
}

function parseReviewActionRequest(
  request: unknown,
): { valid: true; request: RitualReviewActionRequest } | {
  valid: false;
  findings: RitualDbValidationFinding[];
} {
  if (!request || typeof request !== "object") {
    return {
      valid: false,
      findings: [finding("request", "Review action request must be an object.")],
    };
  }

  const payload = request as Record<string, unknown>;
  const findings: RitualDbValidationFinding[] = [];
  const ritualId = payload.ritualId;
  const versionId = payload.versionId;
  const action = payload.action;
  const reasons = normalizeReasons(payload.reasons);

  if (!isNonEmptyString(ritualId)) {
    findings.push(finding("ritualId", "Ritual id is required."));
  }

  if (!isNonEmptyString(versionId)) {
    findings.push(finding("versionId", "Version id is required."));
  }

  if (!isRitualReviewAction(action)) {
    findings.push(finding("action", "Review action is not supported."));
  }

  if (Array.isArray(payload.reasons) && payload.reasons.length > MAX_REVIEW_REASONS) {
    findings.push(
      finding("reasons", `At most ${MAX_REVIEW_REASONS} review reasons are allowed.`),
    );
  }

  if (
    isRitualReviewAction(action) &&
    ACTIONS_REQUIRING_REASON.has(action) &&
    reasons.length === 0
  ) {
    findings.push(finding("reasons", "A reason or note is required for this action."));
  }

  if (findings.length > 0) {
    return { valid: false, findings };
  }

  return {
    valid: true,
    request: {
      ritualId: ritualId as string,
      versionId: versionId as string,
      action: action as RitualReviewAction,
      reasons,
    },
  };
}

async function getValidationSnapshotForAction(input: {
  action: RitualReviewAction;
  ritualDocument: RitualDocument;
  targetVersionDocument: RitualVersionDocument;
  store: RitualReviewActionStore;
}): Promise<RitualValidationSnapshotDocument | undefined> {
  if (!ACTIONS_REQUIRING_VALIDATION.has(input.action)) {
    return undefined;
  }

  const candidateIds = [
    input.ritualDocument.latestValidationSnapshotId,
    createRitualValidationSnapshotIdForVersion(input.targetVersionDocument.versionId),
  ].filter(isNonEmptyString);

  for (const snapshotId of [...new Set(candidateIds)]) {
    const snapshot = await input.store.getRitualValidationSnapshotDocument(snapshotId);

    if (
      snapshot &&
      snapshot.ritualId === input.ritualDocument.id &&
      snapshot.versionId === input.targetVersionDocument.versionId
    ) {
      return snapshot;
    }
  }

  return undefined;
}

function getReviewer(caller: RitualReviewActionCaller): RitualDbActor {
  return caller.reviewer ?? "owner";
}

export async function applyRitualReviewAction(
  input: RitualReviewActionBoundaryInput,
): Promise<RitualReviewActionBoundaryResult> {
  const parsed = parseReviewActionRequest(input.request);

  if (!parsed.valid) {
    return parsed;
  }

  const authorized = await input.authorize(input.caller, parsed.request);

  if (!authorized) {
    return {
      valid: false,
      findings: [finding("caller", "Caller is not authorized to review Rituals.")],
    };
  }

  const [ritualDocument, targetVersionDocument] = await Promise.all([
    input.store.getRitualDocument(parsed.request.ritualId),
    input.store.getRitualVersionDocument(parsed.request.versionId),
  ]);
  const missingFindings = [
    ritualDocument
      ? undefined
      : finding("ritualId", "Ritual document was not found."),
    targetVersionDocument
      ? undefined
      : finding("versionId", "Ritual version document was not found."),
  ].filter((item): item is RitualDbValidationFinding => Boolean(item));

  if (missingFindings.length > 0 || !ritualDocument || !targetVersionDocument) {
    return { valid: false, findings: missingFindings };
  }

  const validationSnapshot = await getValidationSnapshotForAction({
    action: parsed.request.action,
    ritualDocument,
    targetVersionDocument,
    store: input.store,
  });
  const planResult = createRitualReviewTransactionPlan({
    action: parsed.request.action,
    ritualDocument,
    targetVersionDocument,
    validationSnapshot,
    reviewer: getReviewer(input.caller),
    reasons: parsed.request.reasons,
    createdAtIso: input.createdAtIso,
  });

  if (!planResult.valid) {
    return planResult;
  }

  await input.store.commitReviewTransactionPlan(planResult.plan);

  return {
    valid: true,
    plan: planResult.plan,
  };
}

function collectionNameForWrite(
  write: RitualReviewTransactionWrite,
): string {
  return write.collection;
}

export function createAdminFirestoreRitualReviewActionStore(
  db: AdminFirestoreReviewActionDb,
): RitualReviewActionStore {
  async function getDocument<T>(
    collectionName: string,
    id: string,
  ): Promise<T | undefined> {
    const snapshot = await db.collection(collectionName).doc(id).get();

    return snapshot.exists ? snapshot.data() as T : undefined;
  }

  return {
    getRitualDocument(ritualId) {
      return getDocument<RitualDocument>("rituals", ritualId);
    },
    getRitualVersionDocument(versionId) {
      return getDocument<RitualVersionDocument>("ritualVersions", versionId);
    },
    getRitualValidationSnapshotDocument(snapshotId) {
      return getDocument<RitualValidationSnapshotDocument>(
        "ritualValidationSnapshots",
        snapshotId,
      );
    },
    async commitReviewTransactionPlan(plan) {
      const batch = db.batch();

      for (const write of plan.writes) {
        const ref = db.collection(collectionNameForWrite(write)).doc(write.id);

        if (write.operation === "create") {
          batch.create(ref, write.document);
        } else {
          batch.set(ref, write.document);
        }
      }

      await batch.commit();
    },
  };
}
