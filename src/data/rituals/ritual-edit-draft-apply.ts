import {
  createRitualDocumentFromRitual,
  createRitualValidationSnapshotDocument,
  createRitualVersionDocumentFromRitual,
  validateReviewDecisionDocument,
  validateRitualAuditEventDocument,
  validateRitualDocument,
  validateRitualValidationSnapshotDocument,
  validateRitualVersionDocument,
  type ReviewDecisionDocument,
  type RitualAuditEventDocument,
  type RitualDbActor,
  type RitualDbValidationFinding,
  type RitualDocument,
  type RitualLifecycleSnapshot,
  type RitualValidationSnapshotDocument,
  type RitualVersionDocument,
} from "./db-documents.js";
import {
  type RitualEditDraftActor,
  type RitualEditDraftDocument,
  type RitualEditDraftStore,
} from "./ritual-edit-drafts.js";
import { validateRitualEditDraft } from "./ritual-edit-draft-validation.js";
import type {
  Ritual,
  RitualAvailability,
  RitualRecommendationMetadata,
  RitualSearchMetadata,
  RitualStatus,
} from "./types.js";

export const RITUAL_DRAFT_APPLY_VALIDATOR_VERSION =
  "ritual-edit-draft-apply-v1";

const RECOMMENDATION_METADATA_CHANGED_REASON =
  "recommendation_metadata_changed";

const SELECTOR_RELEVANT_RECOMMENDATION_PATHS = [
  ["purposes", "primary"],
  ["purposes", "secondary"],
  ["carriers", "primary"],
  ["carriers", "secondary"],
  ["capacity"],
  ["audience"],
  ["timing", "relationship"],
  ["timing", "contexts"],
  ["eligibility"],
] as const;

export type ApplyRitualEditDraftWrite =
  | {
      collection: "rituals";
      id: string;
      operation: "create" | "set";
      document: RitualDocument;
    }
  | {
      collection: "ritualVersions";
      id: string;
      operation: "create";
      document: RitualVersionDocument;
    }
  | {
      collection: "ritualValidationSnapshots";
      id: string;
      operation: "create";
      document: RitualValidationSnapshotDocument;
    }
  | {
      collection: "reviewDecisions";
      id: string;
      operation: "create";
      document: ReviewDecisionDocument;
    }
  | {
      collection: "ritualAuditEvents";
      id: string;
      operation: "create";
      document: RitualAuditEventDocument;
    }
  | {
      collection: "ritualEditDrafts";
      id: string;
      operation: "set";
      document: RitualEditDraftDocument;
    };

export type ApplyRitualEditDraftPlan = {
  draftBefore: RitualEditDraftDocument;
  draftAfter: RitualEditDraftDocument;
  ritualDocumentBefore: RitualDocument;
  ritualDocumentAfter: RitualDocument;
  previousVersionDocument: RitualVersionDocument;
  versionDocument: RitualVersionDocument;
  validationSnapshotDocument: RitualValidationSnapshotDocument;
  reviewDecisionDocument: ReviewDecisionDocument;
  auditEventDocument: RitualAuditEventDocument;
  recommendationHeld: boolean;
  writes: ApplyRitualEditDraftWrite[];
};

export type AddHouseholdRitualDraftToLibraryPlan = {
  draftBefore: RitualEditDraftDocument;
  draftAfter: RitualEditDraftDocument;
  ritualDocumentAfter: RitualDocument;
  versionDocument: RitualVersionDocument;
  validationSnapshotDocument: RitualValidationSnapshotDocument;
  reviewDecisionDocument: ReviewDecisionDocument;
  auditEventDocument: RitualAuditEventDocument;
  writes: ApplyRitualEditDraftWrite[];
};

export type ApplyRitualEditDraftStore = RitualEditDraftStore & {
  getRitualDocument(
    ritualId: string,
  ): Promise<RitualDocument | undefined>;
  getRitualVersionDocument(
    versionId: string,
  ): Promise<RitualVersionDocument | undefined>;
  commitApplyRitualEditDraftPlan(
    plan: ApplyRitualEditDraftPlan | AddHouseholdRitualDraftToLibraryPlan,
  ): Promise<void>;
};

export type ApplyRitualEditDraftInput = {
  store: ApplyRitualEditDraftStore;
  draftId: string;
  actor?: RitualEditDraftActor;
  appliedAtIso?: string;
};

export type ApplyRitualEditDraftResult =
  | {
      valid: true;
      plan: ApplyRitualEditDraftPlan;
      findings: [];
    }
  | {
      valid: false;
      findings: RitualDbValidationFinding[];
    };

export type AddHouseholdRitualDraftToLibraryInput = {
  store: ApplyRitualEditDraftStore;
  draftId: string;
  actor?: RitualEditDraftActor;
  addedAtIso?: string;
};

export type AddHouseholdRitualDraftToLibraryResult =
  | {
      valid: true;
      plan: AddHouseholdRitualDraftToLibraryPlan;
      findings: [];
    }
  | {
      valid: false;
      findings: RitualDbValidationFinding[];
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
  // Firestore Admin overloads are wider than this adapter needs.
  set: (...args: any[]) => Promise<unknown>;
};

type AdminQueryLike = {
  get: () => Promise<AdminQuerySnapshotLike>;
  limit: (count: number) => AdminQueryLike;
};

type AdminCollectionReferenceLike = {
  doc: (id: string) => AdminDocumentReferenceLike;
  where: (
    fieldPath: string,
    opStr: "==",
    value: unknown,
  ) => AdminQueryLike;
};

type AdminWriteBatchLike = {
  set: (reference: any, document: unknown) => AdminWriteBatchLike;
  create: (
    reference: any,
    document: unknown,
  ) => AdminWriteBatchLike;
  commit: () => Promise<unknown>;
};

export type AdminFirestoreRitualEditDraftApplyDb = {
  collection: (collectionName: string) => AdminCollectionReferenceLike;
  batch: () => AdminWriteBatchLike;
};

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeIdPart(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function uniqueStrings(values: readonly string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))];
}

function finding(
  path: string,
  message: string,
): RitualDbValidationFinding {
  return { path, message, severity: "error" };
}

function toDbActor(actor: RitualEditDraftActor): RitualDbActor {
  return actor === "household" ? "owner" : actor;
}

function toAuditActor(actor: RitualEditDraftActor): "owner" | "automation" | "codex" {
  return actor === "automation" || actor === "codex" ? actor : "owner";
}

function toLifecycleSnapshot(document: RitualDocument): RitualLifecycleSnapshot {
  return {
    lifecycleState: document.lifecycle.state,
    findable: document.lifecycle.findable,
    directUseEligible: document.lifecycle.directUseEligible,
    recommendationEligible: document.lifecycle.recommendationEligible,
    recommendable: document.lifecycle.recommendable,
    missingReadiness: [...document.lifecycle.missingReadiness],
  };
}

function createDecisionId(input: {
  ritualId: string;
  versionId: string;
  appliedAtIso: string;
}): string {
  return [
    "review",
    "apply_draft_changes",
    normalizeIdPart(input.ritualId),
    normalizeIdPart(input.versionId),
    normalizeIdPart(input.appliedAtIso),
  ].join("_");
}

function createAddHouseholdDecisionId(input: {
  ritualId: string;
  versionId: string;
  addedAtIso: string;
}): string {
  return [
    "review",
    "add_household_ritual",
    normalizeIdPart(input.ritualId),
    normalizeIdPart(input.versionId),
    normalizeIdPart(input.addedAtIso),
  ].join("_");
}

function createAuditEventId(input: {
  ritualId: string;
  versionId: string;
  appliedAtIso: string;
}): string {
  return [
    "audit",
    "ritual_draft_applied",
    normalizeIdPart(input.ritualId),
    normalizeIdPart(input.versionId),
    normalizeIdPart(input.appliedAtIso),
  ].join("_");
}

function createAddHouseholdAuditEventId(input: {
  ritualId: string;
  versionId: string;
  addedAtIso: string;
}): string {
  return [
    "audit",
    "household_ritual_added",
    normalizeIdPart(input.ritualId),
    normalizeIdPart(input.versionId),
    normalizeIdPart(input.addedAtIso),
  ].join("_");
}

function createValidationSnapshotId(input: {
  ritualId: string;
  versionId: string;
  appliedAtIso: string;
}): string {
  return [
    "validation",
    normalizeIdPart(input.ritualId),
    normalizeIdPart(input.versionId),
    normalizeIdPart(input.appliedAtIso),
  ].join("_");
}

function createAddHouseholdValidationSnapshotId(input: {
  ritualId: string;
  versionId: string;
  addedAtIso: string;
}): string {
  return [
    "validation",
    "household",
    normalizeIdPart(input.ritualId),
    normalizeIdPart(input.versionId),
    normalizeIdPart(input.addedAtIso),
  ].join("_");
}

function getPathValue(value: unknown, path: readonly string[]): unknown {
  return path.reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, value);
}

function stableJson(value: unknown): string {
  if (value === undefined) {
    return JSON.stringify({ __moonTableUndefined: true });
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value.map((item) => JSON.parse(stableJson(item))));
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return JSON.stringify(
      Object.keys(record).sort().reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = JSON.parse(stableJson(record[key]));
        return acc;
      }, {}),
    );
  }

  return JSON.stringify(value);
}

function hasSelectorRelevantMetadataChanged(
  before: RitualRecommendationMetadata | undefined,
  after: RitualRecommendationMetadata | undefined,
): boolean {
  if (!before || !after) {
    return before !== after;
  }

  return SELECTOR_RELEVANT_RECOMMENDATION_PATHS.some((path) =>
    stableJson(getPathValue(before, path)) !==
      stableJson(getPathValue(after, path))
  );
}

function lifecycleForAppliedDraft(input: {
  before: RitualDocument;
  recommendationMetadataChanged: boolean;
}): RitualDocument["lifecycle"] {
  if (!input.recommendationMetadataChanged) {
    return cloneJson(input.before.lifecycle);
  }

  const missingReadiness = uniqueStrings([
    ...input.before.lifecycle.missingReadiness,
    "recommendation_review",
  ]);

  return {
    ...cloneJson(input.before.lifecycle),
    state: input.before.lifecycle.directUseEligible ? "reviewed" : "held",
    recommendationEligible: false,
    recommendable: false,
    missingReadiness,
    holdReasons: uniqueStrings([
      ...input.before.lifecycle.holdReasons,
      RECOMMENDATION_METADATA_CHANGED_REASON,
    ]),
  };
}

function ritualStatusForLifecycle(
  lifecycle: RitualDocument["lifecycle"],
): RitualStatus {
  return lifecycle.recommendable ? "recommendable" : "reviewed";
}

function applyLifecycleToRecommendationMetadata(input: {
  metadata: RitualRecommendationMetadata | undefined;
  lifecycle: RitualDocument["lifecycle"];
}): RitualRecommendationMetadata | undefined {
  if (!input.metadata) {
    return undefined;
  }

  return {
    ...cloneJson(input.metadata),
    eligibility: {
      ...cloneJson(input.metadata.eligibility),
      recommendable: input.lifecycle.recommendable,
      missing: [...input.lifecycle.missingReadiness],
    },
  };
}

function lifecycleForAddedHouseholdRitual(
  draft: RitualEditDraftDocument,
): RitualDocument["lifecycle"] {
  const draftMissing =
    draft.draftBuffer.recommendationMetadata?.eligibility?.missing ?? [];

  return {
    state: "reviewed",
    imported: false,
    findable: true,
    directUseEligible: true,
    recommendationEligible: false,
    recommendable: false,
    missingReadiness: uniqueStrings([
      ...draftMissing,
      "recommendation_review",
    ]),
    holdReasons: [],
  };
}

function createAppliedRitual(input: {
  baseRitual: Ritual;
  draft: RitualEditDraftDocument;
  lifecycle: RitualDocument["lifecycle"];
}): Ritual {
  const recommendationMetadata =
    input.draft.draftBuffer.recommendationMetadata as
      | RitualRecommendationMetadata
      | undefined;
  const searchMetadata =
    input.draft.draftBuffer.searchMetadata as RitualSearchMetadata;
  const availability: RitualAvailability = {
    findable: input.lifecycle.findable,
    directUseEligible: input.lifecycle.directUseEligible,
    recommendationEligible: input.lifecycle.recommendationEligible,
  };

  return {
    ...cloneJson(input.baseRitual),
    id: input.draft.ritualId,
    status: ritualStatusForLifecycle(input.lifecycle),
    origin: cloneJson(input.draft.draftBuffer.origin),
    presentation: {
      ...cloneJson(input.baseRitual.presentation),
      ...cloneJson(input.draft.draftBuffer.presentation),
    },
    recommendationMetadata: applyLifecycleToRecommendationMetadata({
      metadata: recommendationMetadata,
      lifecycle: input.lifecycle,
    }),
    searchMetadata: cloneJson(searchMetadata),
    availability,
    ritualWords: input.draft.draftBuffer.ritualWords
      ? cloneJson(input.draft.draftBuffer.ritualWords)
      : undefined,
    reviewFlags: input.draft.draftBuffer.reviewFlags
      ? cloneJson(input.draft.draftBuffer.reviewFlags)
      : undefined,
    adaptationPolicy: input.draft.draftBuffer.adaptationPolicy
      ? cloneJson(input.draft.draftBuffer.adaptationPolicy)
      : undefined,
  };
}

function createAddedHouseholdRitual(input: {
  draft: RitualEditDraftDocument;
  lifecycle: RitualDocument["lifecycle"];
}): Ritual {
  const recommendationMetadata =
    input.draft.draftBuffer.recommendationMetadata as
      | RitualRecommendationMetadata
      | undefined;
  const searchMetadata =
    input.draft.draftBuffer.searchMetadata as RitualSearchMetadata;

  return {
    id: input.draft.ritualId,
    status: "reviewed",
    origin: cloneJson(input.draft.draftBuffer.origin),
    presentation: {
      ...cloneJson(input.draft.draftBuffer.presentation),
      whyThisFits: "Generated after Choose with me.",
    },
    recommendationMetadata: applyLifecycleToRecommendationMetadata({
      metadata: recommendationMetadata,
      lifecycle: input.lifecycle,
    }),
    searchMetadata: {
      ...cloneJson(searchMetadata),
      originLabel: searchMetadata.originLabel ?? "Household",
    },
    availability: {
      findable: input.lifecycle.findable,
      directUseEligible: input.lifecycle.directUseEligible,
      recommendationEligible: input.lifecycle.recommendationEligible,
    },
    ritualWords: input.draft.draftBuffer.ritualWords
      ? cloneJson(input.draft.draftBuffer.ritualWords)
      : undefined,
    reviewFlags: input.draft.draftBuffer.reviewFlags
      ? cloneJson(input.draft.draftBuffer.reviewFlags)
      : undefined,
    adaptationPolicy: input.draft.draftBuffer.adaptationPolicy
      ? cloneJson(input.draft.draftBuffer.adaptationPolicy)
      : undefined,
  };
}

function createAppliedDraft(input: {
  draft: RitualEditDraftDocument;
  actor: RitualEditDraftActor;
  appliedAtIso: string;
  appliedVersionId: string;
}): RitualEditDraftDocument {
  return {
    ...cloneJson(input.draft),
    status: "applied",
    saveState: "saved",
    updatedBy: input.actor,
    updatedAtIso: input.appliedAtIso,
    appliedBy: input.actor,
    appliedAtIso: input.appliedAtIso,
    appliedVersionId: input.appliedVersionId,
  };
}

function createDraftLifecycleSnapshot(): RitualLifecycleSnapshot {
  return {
    lifecycleState: "draft",
    findable: false,
    directUseEligible: false,
    recommendationEligible: false,
    recommendable: false,
    missingReadiness: ["not_added_to_library"],
  };
}

function createRitualDocumentAfter(input: {
  ritualDocumentBefore: RitualDocument;
  ritual: Ritual;
  versionDocument: RitualVersionDocument;
  validationSnapshotId: string;
  reviewDecisionId: string;
  lifecycle: RitualDocument["lifecycle"];
  updatedAtIso: string;
}): RitualDocument {
  const document = createRitualDocumentFromRitual(input.ritual, {
    createdAtIso: input.ritualDocumentBefore.createdAtIso,
    updatedAtIso: input.updatedAtIso,
    currentVersionId: input.versionDocument.versionId,
    publishedVersionId: input.versionDocument.versionId,
    latestValidationSnapshotId: input.validationSnapshotId,
    latestReviewDecisionId: input.reviewDecisionId,
    sourceRunIds: input.ritualDocumentBefore.origin.sourceRunIds,
    importBatchIds: input.ritualDocumentBefore.origin.importBatchIds,
    packetCandidateIds: input.ritualDocumentBefore.origin.packetCandidateIds,
    archivedVersionIds:
      input.ritualDocumentBefore.versionHistory.archivedVersionIds,
    supersededVersionIds: uniqueStrings([
      ...input.ritualDocumentBefore.versionHistory.supersededVersionIds,
      input.ritualDocumentBefore.currentVersionId,
    ]),
    holdReasons: input.lifecycle.holdReasons,
  });

  return {
    ...document,
    lifecycle: cloneJson(input.lifecycle),
    versionHistory: {
      versionIds: uniqueStrings([
        ...input.ritualDocumentBefore.versionHistory.versionIds,
        input.versionDocument.versionId,
      ]),
      archivedVersionIds: [
        ...input.ritualDocumentBefore.versionHistory.archivedVersionIds,
      ],
      supersededVersionIds: uniqueStrings([
        ...input.ritualDocumentBefore.versionHistory.supersededVersionIds,
        input.ritualDocumentBefore.currentVersionId,
      ]),
    },
  };
}

function createAddedHouseholdRitualDocument(input: {
  ritual: Ritual;
  versionDocument: RitualVersionDocument;
  validationSnapshotId: string;
  reviewDecisionId: string;
  lifecycle: RitualDocument["lifecycle"];
  addedAtIso: string;
}): RitualDocument {
  const document = createRitualDocumentFromRitual(input.ritual, {
    createdAtIso: input.addedAtIso,
    updatedAtIso: input.addedAtIso,
    currentVersionId: input.versionDocument.versionId,
    publishedVersionId: input.versionDocument.versionId,
    latestValidationSnapshotId: input.validationSnapshotId,
    latestReviewDecisionId: input.reviewDecisionId,
    holdReasons: input.lifecycle.holdReasons,
  });

  return {
    ...document,
    lifecycle: cloneJson(input.lifecycle),
    versionHistory: {
      versionIds: [input.versionDocument.versionId],
      archivedVersionIds: [],
      supersededVersionIds: [],
    },
  };
}

function collectPlanValidationFindings(
  plan: Omit<ApplyRitualEditDraftPlan, "writes">,
): RitualDbValidationFinding[] {
  return [
    ...validateRitualDocument(plan.ritualDocumentAfter).findings,
    ...validateRitualVersionDocument(plan.versionDocument).findings,
    ...validateRitualValidationSnapshotDocument(
      plan.validationSnapshotDocument,
      plan.versionDocument,
    ).findings,
    ...validateReviewDecisionDocument(plan.reviewDecisionDocument).findings,
    ...validateRitualAuditEventDocument(plan.auditEventDocument).findings,
  ];
}

function collectAddHouseholdPlanValidationFindings(
  plan: Omit<AddHouseholdRitualDraftToLibraryPlan, "writes">,
): RitualDbValidationFinding[] {
  return [
    ...validateRitualDocument(plan.ritualDocumentAfter).findings,
    ...validateRitualVersionDocument(plan.versionDocument).findings,
    ...validateRitualValidationSnapshotDocument(
      plan.validationSnapshotDocument,
      plan.versionDocument,
    ).findings,
    ...validateReviewDecisionDocument(plan.reviewDecisionDocument).findings,
    ...validateRitualAuditEventDocument(plan.auditEventDocument).findings,
  ];
}

function createPlanWrites(
  plan: Omit<ApplyRitualEditDraftPlan, "writes">,
): ApplyRitualEditDraftWrite[] {
  return [
    {
      collection: "ritualVersions",
      id: plan.versionDocument.id,
      operation: "create",
      document: plan.versionDocument,
    },
    {
      collection: "ritualValidationSnapshots",
      id: plan.validationSnapshotDocument.id,
      operation: "create",
      document: plan.validationSnapshotDocument,
    },
    {
      collection: "reviewDecisions",
      id: plan.reviewDecisionDocument.id,
      operation: "create",
      document: plan.reviewDecisionDocument,
    },
    {
      collection: "ritualAuditEvents",
      id: plan.auditEventDocument.id,
      operation: "create",
      document: plan.auditEventDocument,
    },
    {
      collection: "rituals",
      id: plan.ritualDocumentAfter.id,
      operation: "set",
      document: plan.ritualDocumentAfter,
    },
    {
      collection: "ritualEditDrafts",
      id: plan.draftAfter.id,
      operation: "set",
      document: plan.draftAfter,
    },
  ];
}

function createAddHouseholdPlanWrites(
  plan: Omit<AddHouseholdRitualDraftToLibraryPlan, "writes">,
): ApplyRitualEditDraftWrite[] {
  return [
    {
      collection: "ritualVersions",
      id: plan.versionDocument.id,
      operation: "create",
      document: plan.versionDocument,
    },
    {
      collection: "ritualValidationSnapshots",
      id: plan.validationSnapshotDocument.id,
      operation: "create",
      document: plan.validationSnapshotDocument,
    },
    {
      collection: "reviewDecisions",
      id: plan.reviewDecisionDocument.id,
      operation: "create",
      document: plan.reviewDecisionDocument,
    },
    {
      collection: "ritualAuditEvents",
      id: plan.auditEventDocument.id,
      operation: "create",
      document: plan.auditEventDocument,
    },
    {
      collection: "rituals",
      id: plan.ritualDocumentAfter.id,
      operation: "create",
      document: plan.ritualDocumentAfter,
    },
    {
      collection: "ritualEditDrafts",
      id: plan.draftAfter.id,
      operation: "set",
      document: plan.draftAfter,
    },
  ];
}

export async function createApplyRitualEditDraftPlan(input: {
  store: ApplyRitualEditDraftStore;
  draftId: string;
  actor?: RitualEditDraftActor;
  appliedAtIso?: string;
}): Promise<ApplyRitualEditDraftResult> {
  const actor = input.actor ?? "owner";
  const appliedAtIso = input.appliedAtIso ?? new Date().toISOString();
  const draft = await input.store.getDraft(input.draftId);

  if (!draft) {
    return {
      valid: false,
      findings: [finding("draftId", "Ritual edit draft was not found.")],
    };
  }

  if (draft.status !== "active") {
    return {
      valid: false,
      findings: [finding("draft.status", "Only active drafts can be applied.")],
    };
  }

  if (draft.draftSource !== "existing_version") {
    return {
      valid: false,
      findings: [
        finding(
          "draft.draftSource",
          "Publish draft is only available for existing Ritual drafts.",
        ),
      ],
    };
  }

  if (draft.saveState !== "saved") {
    return {
      valid: false,
      findings: [
        finding("draft.saveState", "Save this draft before applying changes."),
      ],
    };
  }

  const ritualDocument = await input.store.getRitualDocument(draft.ritualId);
  if (!ritualDocument) {
    return {
      valid: false,
      findings: [finding("ritualId", "Live Ritual document was not found.")],
    };
  }

  const liveVersionId = ritualDocument.publishedVersionId ??
    ritualDocument.currentVersionId;
  const baseVersion = await input.store.getRitualVersionDocument(liveVersionId);

  if (!baseVersion) {
    return {
      valid: false,
      findings: [
        finding("baseVersionId", "Live Ritual version was not found."),
      ],
    };
  }

  if (
    draft.baseVersionId !== liveVersionId ||
    draft.baseContentHash !== baseVersion.contentHash
  ) {
    return {
      valid: false,
      findings: [
        finding(
          "baseVersionId",
          "This draft is based on an older live version. Reload or compare before applying.",
        ),
      ],
    };
  }

  const draftValidation = validateRitualEditDraft(draft);
  if (!draftValidation.valid) {
    return {
      valid: false,
      findings: draftValidation.findings.filter(
        (item) => item.severity === "error",
      ),
    };
  }

  const draftRecommendationMetadata =
    draft.draftBuffer.recommendationMetadata as RitualRecommendationMetadata | undefined;
  const recommendationHeld = hasSelectorRelevantMetadataChanged(
    baseVersion.ritual.recommendationMetadata,
    draftRecommendationMetadata,
  );
  const lifecycleAfter = lifecycleForAppliedDraft({
    before: ritualDocument,
    recommendationMetadataChanged: recommendationHeld,
  });
  const nextRitual = createAppliedRitual({
    baseRitual: baseVersion.ritual,
    draft,
    lifecycle: lifecycleAfter,
  });
  const versionDocument = createRitualVersionDocumentFromRitual(nextRitual, {
    createdAtIso: appliedAtIso,
    createdBy: toDbActor(actor),
    supersedesVersionId: liveVersionId,
  });
  const validationSnapshotId = createValidationSnapshotId({
    ritualId: ritualDocument.id,
    versionId: versionDocument.versionId,
    appliedAtIso,
  });
  const reviewDecisionId = createDecisionId({
    ritualId: ritualDocument.id,
    versionId: versionDocument.versionId,
    appliedAtIso,
  });
  const ritualDocumentAfter = createRitualDocumentAfter({
    ritualDocumentBefore: ritualDocument,
    ritual: nextRitual,
    versionDocument,
    validationSnapshotId,
    reviewDecisionId,
    lifecycle: lifecycleAfter,
    updatedAtIso: appliedAtIso,
  });
  const validationSnapshotDocument = createRitualValidationSnapshotDocument({
    id: validationSnapshotId,
    ritualDocument: ritualDocumentAfter,
    versionDocument,
    validatorVersion: RITUAL_DRAFT_APPLY_VALIDATOR_VERSION,
    generatedAtIso: appliedAtIso,
  });
  const reviewDecisionDocument: ReviewDecisionDocument = {
    id: reviewDecisionId,
    ritualId: ritualDocument.id,
    versionId: versionDocument.versionId,
    decisionType: "apply_draft_changes",
    decision: "approved",
    reasons: recommendationHeld
      ? ["Applied draft changes.", "Choose with me held because recommendation metadata changed."]
      : ["Applied draft changes."],
    reviewer: toDbActor(actor),
    before: toLifecycleSnapshot(ritualDocument),
    after: toLifecycleSnapshot(ritualDocumentAfter),
    createdAtIso: appliedAtIso,
  };
  const auditEventDocument: RitualAuditEventDocument = {
    id: createAuditEventId({
      ritualId: ritualDocument.id,
      versionId: versionDocument.versionId,
      appliedAtIso,
    }),
    ritualId: ritualDocument.id,
    versionId: versionDocument.versionId,
    eventType: "ritual_draft_applied",
    actor: toAuditActor(actor),
    summary: recommendationHeld
      ? "Applied Ritual edit draft and held Choose with me eligibility."
      : "Applied Ritual edit draft.",
    relatedReviewDecisionId: reviewDecisionId,
    relatedValidationSnapshotId: validationSnapshotId,
    createdAtIso: appliedAtIso,
  };
  const draftAfter = createAppliedDraft({
    draft,
    actor,
    appliedAtIso,
    appliedVersionId: versionDocument.versionId,
  });
  const partialPlan = {
    draftBefore: cloneJson(draft),
    draftAfter,
    ritualDocumentBefore: cloneJson(ritualDocument),
    ritualDocumentAfter,
    previousVersionDocument: cloneJson(baseVersion),
    versionDocument,
    validationSnapshotDocument,
    reviewDecisionDocument,
    auditEventDocument,
    recommendationHeld,
  };
  const findings = collectPlanValidationFindings(partialPlan);

  if (findings.some((item) => item.severity === "error")) {
    return { valid: false, findings };
  }

  const plan: ApplyRitualEditDraftPlan = {
    ...partialPlan,
    writes: createPlanWrites(partialPlan),
  };

  return { valid: true, plan, findings: [] };
}

export async function applyRitualEditDraft(
  input: ApplyRitualEditDraftInput,
): Promise<ApplyRitualEditDraftResult> {
  const result = await createApplyRitualEditDraftPlan(input);

  if (!result.valid) {
    return result;
  }

  await input.store.commitApplyRitualEditDraftPlan(result.plan);

  return result;
}

export async function createAddHouseholdRitualDraftToLibraryPlan(input: {
  store: ApplyRitualEditDraftStore;
  draftId: string;
  actor?: RitualEditDraftActor;
  addedAtIso?: string;
}): Promise<AddHouseholdRitualDraftToLibraryResult> {
  const actor = input.actor ?? "owner";
  const addedAtIso = input.addedAtIso ?? new Date().toISOString();
  const draft = await input.store.getDraft(input.draftId);

  if (!draft) {
    return {
      valid: false,
      findings: [finding("draftId", "Ritual edit draft was not found.")],
    };
  }

  if (draft.status !== "active") {
    return {
      valid: false,
      findings: [finding("draft.status", "Only active drafts can be added.")],
    };
  }

  if (draft.draftSource !== "household_blank") {
    return {
      valid: false,
      findings: [
        finding(
          "draft.draftSource",
          "Add to library is only available for new household Ritual drafts.",
        ),
      ],
    };
  }

  if (draft.saveState !== "saved") {
    return {
      valid: false,
      findings: [
        finding("draft.saveState", "Save this draft before adding it to the library."),
      ],
    };
  }

  if (draft.draftBuffer.origin.type !== "household") {
    return {
      valid: false,
      findings: [
        finding("draftBuffer.origin.type", "New Rituals must use household origin."),
      ],
    };
  }

  const existingRitual = await input.store.getRitualDocument(draft.ritualId);
  if (existingRitual) {
    return {
      valid: false,
      findings: [
        finding("ritualId", "A live Ritual already exists for this draft."),
      ],
    };
  }

  const draftValidation = validateRitualEditDraft(draft);
  if (!draftValidation.valid) {
    return {
      valid: false,
      findings: draftValidation.findings.filter(
        (item) => item.severity === "error",
      ),
    };
  }

  const lifecycleAfter = lifecycleForAddedHouseholdRitual(draft);
  const ritual = createAddedHouseholdRitual({
    draft,
    lifecycle: lifecycleAfter,
  });
  const versionDocument = createRitualVersionDocumentFromRitual(ritual, {
    createdAtIso: addedAtIso,
    createdBy: toDbActor(actor),
  });
  const validationSnapshotId = createAddHouseholdValidationSnapshotId({
    ritualId: draft.ritualId,
    versionId: versionDocument.versionId,
    addedAtIso,
  });
  const reviewDecisionId = createAddHouseholdDecisionId({
    ritualId: draft.ritualId,
    versionId: versionDocument.versionId,
    addedAtIso,
  });
  const ritualDocumentAfter = createAddedHouseholdRitualDocument({
    ritual,
    versionDocument,
    validationSnapshotId,
    reviewDecisionId,
    lifecycle: lifecycleAfter,
    addedAtIso,
  });
  const validationSnapshotDocument = createRitualValidationSnapshotDocument({
    id: validationSnapshotId,
    ritualDocument: ritualDocumentAfter,
    versionDocument,
    validatorVersion: RITUAL_DRAFT_APPLY_VALIDATOR_VERSION,
    generatedAtIso: addedAtIso,
  });
  const reviewDecisionDocument: ReviewDecisionDocument = {
    id: reviewDecisionId,
    ritualId: draft.ritualId,
    versionId: versionDocument.versionId,
    decisionType: "add_household_ritual",
    decision: "approved",
    reasons: [
      "Added household Ritual to the library.",
      "Choose with me held for recommendation review.",
    ],
    reviewer: toDbActor(actor),
    before: createDraftLifecycleSnapshot(),
    after: toLifecycleSnapshot(ritualDocumentAfter),
    createdAtIso: addedAtIso,
  };
  const auditEventDocument: RitualAuditEventDocument = {
    id: createAddHouseholdAuditEventId({
      ritualId: draft.ritualId,
      versionId: versionDocument.versionId,
      addedAtIso,
    }),
    ritualId: draft.ritualId,
    versionId: versionDocument.versionId,
    eventType: "household_ritual_added",
    actor: toAuditActor(actor),
    summary: "Added household Ritual draft to the library.",
    relatedReviewDecisionId: reviewDecisionId,
    relatedValidationSnapshotId: validationSnapshotId,
    createdAtIso: addedAtIso,
  };
  const draftAfter = createAppliedDraft({
    draft,
    actor,
    appliedAtIso: addedAtIso,
    appliedVersionId: versionDocument.versionId,
  });
  const partialPlan = {
    draftBefore: cloneJson(draft),
    draftAfter,
    ritualDocumentAfter,
    versionDocument,
    validationSnapshotDocument,
    reviewDecisionDocument,
    auditEventDocument,
  };
  const findings = collectAddHouseholdPlanValidationFindings(partialPlan);

  if (findings.some((item) => item.severity === "error")) {
    return { valid: false, findings };
  }

  const plan: AddHouseholdRitualDraftToLibraryPlan = {
    ...partialPlan,
    writes: createAddHouseholdPlanWrites(partialPlan),
  };

  return { valid: true, plan, findings: [] };
}

export async function addHouseholdRitualDraftToLibrary(
  input: AddHouseholdRitualDraftToLibraryInput,
): Promise<AddHouseholdRitualDraftToLibraryResult> {
  const result = await createAddHouseholdRitualDraftToLibraryPlan(input);

  if (!result.valid) {
    return result;
  }

  await input.store.commitApplyRitualEditDraftPlan(result.plan);

  return result;
}

export function createAdminFirestoreRitualEditDraftApplyStore(
  db: AdminFirestoreRitualEditDraftApplyDb,
): ApplyRitualEditDraftStore {
  const draftCollection = db.collection("ritualEditDrafts");
  const ritualCollection = db.collection("rituals");
  const versionCollection = db.collection("ritualVersions");

  return {
    async getDraft(draftId) {
      const snapshot = await draftCollection.doc(draftId).get();

      return snapshot.exists
        ? cloneJson(snapshot.data() as RitualEditDraftDocument)
        : undefined;
    },
    async setDraft(draft) {
      await draftCollection.doc(draft.id).set(cloneJson(draft));
    },
    async listDraftsForRitual(ritualId) {
      const snapshot = await draftCollection.where("ritualId", "==", ritualId).get();

      return snapshot.docs
        .filter((document) => document.exists)
        .map((document) => document.data() as RitualEditDraftDocument)
        .sort((a, b) => b.updatedAtIso.localeCompare(a.updatedAtIso))
        .map(cloneJson);
    },
    async listActiveDrafts(limit) {
      const snapshot = await draftCollection
        .where("status", "==", "active")
        .limit(limit)
        .get();

      return snapshot.docs
        .filter((document) => document.exists)
        .map((document) => document.data() as RitualEditDraftDocument)
        .sort((a, b) => b.updatedAtIso.localeCompare(a.updatedAtIso))
        .slice(0, limit)
        .map(cloneJson);
    },
    async getRitualDocument(ritualId) {
      const snapshot = await ritualCollection.doc(ritualId).get();

      return snapshot.exists
        ? cloneJson(snapshot.data() as RitualDocument)
        : undefined;
    },
    async getRitualVersionDocument(versionId) {
      const directSnapshot = await versionCollection.doc(versionId).get();

      if (directSnapshot.exists) {
        return cloneJson(directSnapshot.data() as RitualVersionDocument);
      }

      const querySnapshot = await versionCollection
        .where("versionId", "==", versionId)
        .limit(1)
        .get();
      const matchingSnapshot = querySnapshot.docs[0];

      return matchingSnapshot
        ? cloneJson(matchingSnapshot.data() as RitualVersionDocument)
        : undefined;
    },
    async commitApplyRitualEditDraftPlan(plan) {
      const batch = db.batch();

      for (const write of plan.writes) {
        const reference = db.collection(write.collection).doc(write.id);
        if (write.operation === "create") {
          batch.create(reference, cloneJson(write.document));
        } else {
          batch.set(reference, cloneJson(write.document));
        }
      }

      await batch.commit();
    },
  };
}
