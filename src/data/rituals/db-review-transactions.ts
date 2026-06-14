import {
  DEFAULT_RITUAL_DB_CREATED_AT_ISO,
  validateReviewDecisionDocument,
  validateRitualAuditEventDocument,
  validateRitualDocument,
  validateRitualValidationSnapshotDocument,
  validateRitualVersionDocument,
  type ReviewDecision,
  type ReviewDecisionDocument,
  type RitualAuditEventDocument,
  type RitualDbActor,
  type RitualDbValidationFinding,
  type RitualDocument,
  type RitualLifecycleSnapshot,
  type RitualValidationSnapshotDocument,
  type RitualVersionDocument,
} from "./db-documents";

export const RITUAL_REVIEW_ACTIONS = [
  "promote_direct_use",
  "hold_direct_use",
  "promote_recommendation",
  "hold_recommendation",
  "mark_needs_source_recheck",
  "mark_needs_packet_correction",
  "add_review_note",
  "archive_ritual",
  "rollback_published_version",
] as const;

export type RitualReviewAction = (typeof RITUAL_REVIEW_ACTIONS)[number];

export type RitualReviewTransactionWrite =
  | {
    collection: "rituals";
    id: string;
    operation: "set";
    document: RitualDocument;
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
  };

export type RitualReviewTransactionPlan = {
  action: RitualReviewAction;
  ritualDocumentBefore: RitualDocument;
  ritualDocumentAfter: RitualDocument;
  reviewDecisionDocument: ReviewDecisionDocument;
  auditEventDocument: RitualAuditEventDocument;
  writes: RitualReviewTransactionWrite[];
};

export type CreateRitualReviewTransactionPlanInput = {
  action: RitualReviewAction;
  ritualDocument: RitualDocument;
  targetVersionDocument?: RitualVersionDocument;
  validationSnapshot?: RitualValidationSnapshotDocument;
  reviewer?: RitualDbActor;
  reasons?: string[];
  createdAtIso?: string;
  reviewDecisionId?: string;
  auditEventId?: string;
};

export type RitualReviewTransactionPlanResult =
  | {
    valid: true;
    plan: RitualReviewTransactionPlan;
    findings: [];
  }
  | {
    valid: false;
    findings: RitualDbValidationFinding[];
  };

type LifecyclePatch = Partial<RitualDocument["lifecycle"]>;

const ACTIONS_REQUIRING_VALIDATION = new Set<RitualReviewAction>([
  "promote_direct_use",
  "promote_recommendation",
  "archive_ritual",
  "rollback_published_version",
]);

const PROMOTION_ACTIONS = new Set<RitualReviewAction>([
  "promote_direct_use",
  "promote_recommendation",
]);

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
  action: RitualReviewAction;
  ritualId: string;
  versionId: string;
  createdAtIso: string;
}): string {
  return [
    "review",
    input.action,
    normalizeIdPart(input.ritualId),
    normalizeIdPart(input.versionId),
    normalizeIdPart(input.createdAtIso),
  ].join("_");
}

function createAuditEventId(input: {
  action: RitualReviewAction;
  ritualId: string;
  versionId: string;
  createdAtIso: string;
}): string {
  return [
    "audit",
    input.action,
    normalizeIdPart(input.ritualId),
    normalizeIdPart(input.versionId),
    normalizeIdPart(input.createdAtIso),
  ].join("_");
}

function getDecision(action: RitualReviewAction): ReviewDecision {
  switch (action) {
    case "promote_direct_use":
    case "promote_recommendation":
    case "rollback_published_version":
      return "approved";
    case "archive_ritual":
      return "archived";
    case "add_review_note":
      return "noted";
    case "hold_direct_use":
    case "hold_recommendation":
    case "mark_needs_source_recheck":
    case "mark_needs_packet_correction":
      return "held";
  }
}

function getLifecyclePatch(
  action: RitualReviewAction,
  reasons: readonly string[],
): LifecyclePatch {
  switch (action) {
    case "promote_direct_use":
      return {
        state: "reviewed",
        findable: true,
        directUseEligible: true,
        recommendationEligible: false,
        recommendable: false,
        missingReadiness: ["recommendation_review"],
        holdReasons: [],
      };
    case "promote_recommendation":
      return {
        state: "recommendable",
        findable: true,
        directUseEligible: true,
        recommendationEligible: true,
        recommendable: true,
        missingReadiness: [],
        holdReasons: [],
      };
    case "hold_direct_use":
      return {
        state: "held",
        findable: true,
        directUseEligible: false,
        recommendationEligible: false,
        recommendable: false,
        missingReadiness: ["direct_use_review", "recommendation_review"],
        holdReasons: uniqueStrings([...reasons, "direct_use_hold"]),
      };
    case "hold_recommendation":
      return {
        state: "reviewed",
        findable: true,
        directUseEligible: true,
        recommendationEligible: false,
        recommendable: false,
        missingReadiness: ["recommendation_review"],
        holdReasons: uniqueStrings([...reasons, "recommendation_hold"]),
      };
    case "mark_needs_source_recheck":
      return {
        state: "held",
        findable: true,
        directUseEligible: false,
        recommendationEligible: false,
        recommendable: false,
        missingReadiness: ["source_recheck", "direct_use_review", "recommendation_review"],
        holdReasons: uniqueStrings([...reasons, "source_recheck"]),
      };
    case "mark_needs_packet_correction":
      return {
        state: "held",
        findable: true,
        directUseEligible: false,
        recommendationEligible: false,
        recommendable: false,
        missingReadiness: [
          "packet_correction",
          "direct_use_review",
          "recommendation_review",
        ],
        holdReasons: uniqueStrings([...reasons, "packet_correction"]),
      };
    case "archive_ritual":
      return {
        state: "archived",
        findable: false,
        directUseEligible: false,
        recommendationEligible: false,
        recommendable: false,
        holdReasons: uniqueStrings([...reasons, "archived"]),
      };
    case "add_review_note":
    case "rollback_published_version":
      return {};
  }
}

function createRitualDocumentAfter(input: {
  action: RitualReviewAction;
  ritualDocument: RitualDocument;
  targetVersionDocument: RitualVersionDocument;
  validationSnapshot?: RitualValidationSnapshotDocument;
  reviewDecisionId: string;
  createdAtIso: string;
  reasons: readonly string[];
}): RitualDocument {
  const after = cloneJson(input.ritualDocument);
  const lifecyclePatch = getLifecyclePatch(input.action, input.reasons);
  const actionPublishesVersion =
    input.action === "promote_direct_use" ||
    input.action === "promote_recommendation" ||
    input.action === "rollback_published_version";
  const actionMovesCurrentVersion = input.action !== "add_review_note";

  after.lifecycle = {
    ...after.lifecycle,
    ...lifecyclePatch,
    imported: after.lifecycle.imported,
    missingReadiness: lifecyclePatch.missingReadiness
      ? uniqueStrings(lifecyclePatch.missingReadiness)
      : [...after.lifecycle.missingReadiness],
    holdReasons: lifecyclePatch.holdReasons
      ? uniqueStrings(lifecyclePatch.holdReasons)
      : [...after.lifecycle.holdReasons],
  };
  if (actionMovesCurrentVersion) {
    after.currentVersionId = input.targetVersionDocument.versionId;
  }
  if (actionPublishesVersion) {
    after.publishedVersionId = input.targetVersionDocument.versionId;
  }
  after.latestReviewDecisionId = input.reviewDecisionId;
  if (input.validationSnapshot) {
    after.latestValidationSnapshotId = input.validationSnapshot.id;
  }
  after.updatedAtIso = input.createdAtIso;

  if (input.action === "archive_ritual") {
    after.archivedAtIso = input.createdAtIso;
    after.versionHistory.archivedVersionIds = uniqueStrings([
      ...after.versionHistory.archivedVersionIds,
      input.targetVersionDocument.versionId,
    ]);
  }

  if (
    !after.versionHistory.versionIds.includes(input.targetVersionDocument.versionId)
  ) {
    after.versionHistory.versionIds = [
      ...after.versionHistory.versionIds,
      input.targetVersionDocument.versionId,
    ];
  }

  return after;
}

function getBlockingReviewFlags(versionDocument: RitualVersionDocument): string[] {
  const flags = versionDocument.ritual.reviewFlags;

  if (!flags) {
    return [];
  }

  return Object.entries(flags)
    .filter(([key, value]) => key !== "notes" && value === true)
    .map(([key]) => key);
}

function validateInputs(input: {
  action: RitualReviewAction;
  ritualDocument: RitualDocument;
  targetVersionDocument?: RitualVersionDocument;
  validationSnapshot?: RitualValidationSnapshotDocument;
}): RitualDbValidationFinding[] {
  const findings = [...validateRitualDocument(input.ritualDocument).findings];
  const targetVersionDocument = input.targetVersionDocument;

  if (!targetVersionDocument) {
    findings.push(finding("targetVersionDocument", "Target version document is required."));
    return findings;
  }

  findings.push(...validateRitualVersionDocument(targetVersionDocument).findings);

  if (targetVersionDocument.ritualId !== input.ritualDocument.id) {
    findings.push(
      finding("targetVersionDocument.ritualId", "Target version must belong to the Ritual document."),
    );
  }

  if (
    !input.ritualDocument.versionHistory.versionIds.includes(
      targetVersionDocument.versionId,
    )
  ) {
    findings.push(
      finding("ritualDocument.versionHistory.versionIds", "Version history must include target version id."),
    );
  }

  if (ACTIONS_REQUIRING_VALIDATION.has(input.action)) {
    if (!input.validationSnapshot) {
      findings.push(
        finding("validationSnapshot", "A passing validation snapshot is required for this review action."),
      );
    } else {
      findings.push(
        ...validateRitualValidationSnapshotDocument(
          input.validationSnapshot,
          targetVersionDocument,
        ).findings,
      );

      if (!input.validationSnapshot.valid) {
        findings.push(
          finding("validationSnapshot.valid", "Validation snapshot must be passing."),
        );
      }
    }
  } else if (input.validationSnapshot) {
    findings.push(
      ...validateRitualValidationSnapshotDocument(
        input.validationSnapshot,
        targetVersionDocument,
      ).findings,
    );
  }

  if (PROMOTION_ACTIONS.has(input.action)) {
    if (
      targetVersionDocument.ritual.origin.type === "source" &&
      targetVersionDocument.provenance.sourceGrounding.length === 0
    ) {
      findings.push(
        finding("targetVersionDocument.provenance.sourceGrounding", "Source-backed promotions require source grounding."),
      );
    }

    const blockingReviewFlags = getBlockingReviewFlags(targetVersionDocument);
    for (const flag of blockingReviewFlags) {
      findings.push(
        finding(`targetVersionDocument.ritual.reviewFlags.${flag}`, "Blocking review flags must be resolved before promotion."),
      );
    }
  }

  if (
    input.action === "promote_recommendation" &&
    !input.ritualDocument.lifecycle.directUseEligible
  ) {
    findings.push(
      finding("ritualDocument.lifecycle.directUseEligible", "Restore direct use before making this Ritual recommendation-ready."),
    );
  }

  if (
    input.action === "rollback_published_version" &&
    input.ritualDocument.publishedVersionId === targetVersionDocument.versionId
  ) {
    findings.push(
      finding("ritualDocument.publishedVersionId", "Rollback target must differ from the current published version."),
    );
  }

  return findings.filter((candidate) => candidate.severity === "error");
}

function createReviewDecisionDocument(input: {
  action: RitualReviewAction;
  decisionId: string;
  ritualDocumentBefore: RitualDocument;
  ritualDocumentAfter: RitualDocument;
  targetVersionDocument: RitualVersionDocument;
  reviewer: RitualDbActor;
  reasons: readonly string[];
  createdAtIso: string;
}): ReviewDecisionDocument {
  return {
    id: input.decisionId,
    ritualId: input.ritualDocumentBefore.id,
    versionId: input.targetVersionDocument.versionId,
    decisionType: input.action,
    decision: getDecision(input.action),
    reasons: [...input.reasons],
    reviewer: input.reviewer,
    sourceRunId: input.targetVersionDocument.provenance.sourceRunId,
    importBatchId: input.targetVersionDocument.provenance.importBatchId,
    before: toLifecycleSnapshot(input.ritualDocumentBefore),
    after: toLifecycleSnapshot(input.ritualDocumentAfter),
    createdAtIso: input.createdAtIso,
  };
}

function createAuditEventDocument(input: {
  action: RitualReviewAction;
  auditEventId: string;
  ritualDocumentBefore: RitualDocument;
  ritualDocumentAfter: RitualDocument;
  targetVersionDocument: RitualVersionDocument;
  reviewDecisionId: string;
  validationSnapshot?: RitualValidationSnapshotDocument;
  reviewer: RitualDbActor;
  createdAtIso: string;
}): RitualAuditEventDocument {
  const previousPublishedVersionId =
    input.ritualDocumentBefore.publishedVersionId ?? "(none)";
  const nextPublishedVersionId =
    input.ritualDocumentAfter.publishedVersionId ?? "(none)";

  return {
    id: input.auditEventId,
    ritualId: input.ritualDocumentBefore.id,
    versionId: input.targetVersionDocument.versionId,
    eventType: input.action === "rollback_published_version"
      ? "rollback_performed"
      : "review_decision_recorded",
    actor: input.reviewer === "owner" || input.reviewer === "automation"
      ? input.reviewer
      : "codex",
    summary: input.action === "rollback_published_version"
      ? `Rollback changed published version from ${previousPublishedVersionId} to ${nextPublishedVersionId}.`
      : `Review action ${input.action} recorded for ${input.ritualDocumentBefore.id}.`,
    relatedReviewDecisionId: input.reviewDecisionId,
    relatedValidationSnapshotId: input.validationSnapshot?.id,
    createdAtIso: input.createdAtIso,
  };
}

export function createRitualReviewTransactionPlan(
  input: CreateRitualReviewTransactionPlanInput,
): RitualReviewTransactionPlanResult {
  const createdAtIso =
    input.createdAtIso ?? DEFAULT_RITUAL_DB_CREATED_AT_ISO;
  const reviewer = input.reviewer ?? "codex";
  const reasons = uniqueStrings(input.reasons ?? []);
  const inputFindings = validateInputs(input);

  if (inputFindings.length > 0 || !input.targetVersionDocument) {
    return { valid: false, findings: inputFindings };
  }

  const reviewDecisionId = input.reviewDecisionId ?? createDecisionId({
    action: input.action,
    ritualId: input.ritualDocument.id,
    versionId: input.targetVersionDocument.versionId,
    createdAtIso,
  });
  const auditEventId = input.auditEventId ?? createAuditEventId({
    action: input.action,
    ritualId: input.ritualDocument.id,
    versionId: input.targetVersionDocument.versionId,
    createdAtIso,
  });
  const ritualDocumentBefore = cloneJson(input.ritualDocument);
  const ritualDocumentAfter = createRitualDocumentAfter({
    action: input.action,
    ritualDocument: ritualDocumentBefore,
    targetVersionDocument: input.targetVersionDocument,
    validationSnapshot: input.validationSnapshot,
    reviewDecisionId,
    createdAtIso,
    reasons,
  });
  const reviewDecisionDocument = createReviewDecisionDocument({
    action: input.action,
    decisionId: reviewDecisionId,
    ritualDocumentBefore,
    ritualDocumentAfter,
    targetVersionDocument: input.targetVersionDocument,
    reviewer,
    reasons,
    createdAtIso,
  });
  const auditEventDocument = createAuditEventDocument({
    action: input.action,
    auditEventId,
    ritualDocumentBefore,
    ritualDocumentAfter,
    targetVersionDocument: input.targetVersionDocument,
    reviewDecisionId,
    validationSnapshot: input.validationSnapshot,
    reviewer,
    createdAtIso,
  });
  const outputFindings = [
    ...validateRitualDocument(ritualDocumentAfter).findings,
    ...validateReviewDecisionDocument(reviewDecisionDocument).findings,
    ...validateRitualAuditEventDocument(auditEventDocument).findings,
  ].filter((candidate) => candidate.severity === "error");

  if (outputFindings.length > 0) {
    return { valid: false, findings: outputFindings };
  }

  return {
    valid: true,
    findings: [],
    plan: {
      action: input.action,
      ritualDocumentBefore,
      ritualDocumentAfter,
      reviewDecisionDocument,
      auditEventDocument,
      writes: [
        {
          collection: "rituals",
          id: ritualDocumentAfter.id,
          operation: "set",
          document: ritualDocumentAfter,
        },
        {
          collection: "reviewDecisions",
          id: reviewDecisionDocument.id,
          operation: "create",
          document: reviewDecisionDocument,
        },
        {
          collection: "ritualAuditEvents",
          id: auditEventDocument.id,
          operation: "create",
          document: auditEventDocument,
        },
      ],
    },
  };
}

export function isRitualReviewTransactionPlanSuccessful(
  result: RitualReviewTransactionPlanResult,
): result is Extract<RitualReviewTransactionPlanResult, { valid: true }> {
  return result.valid;
}
