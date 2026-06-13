import type {
  Ritual,
  RitualRecommendationMetadata,
  RitualReviewFlags,
  RitualSearchMetadata,
  RitualSourceGrounding,
  RitualStatus,
} from "./types";
import { validateRitual } from "./validate-rituals";
import { getRitualVersionIdentity } from "./version-identity";

export const RITUAL_DB_SCHEMA_VERSION = "ritual-db-v1" as const;
export const RITUAL_RUNTIME_SCHEMA_VERSION = "src/data/rituals/types.ts" as const;
export const DEFAULT_RITUAL_DB_CREATED_AT_ISO = "1970-01-01T00:00:00.000Z";

export const RITUAL_DB_LIFECYCLE_STATES = [
  "draft",
  "reviewed",
  "recommendable",
  "held",
  "rejected",
  "archived",
] as const;

export type RitualDbLifecycleState = (typeof RITUAL_DB_LIFECYCLE_STATES)[number];

export const RITUAL_DB_ACTORS = [
  "owner",
  "person_a",
  "person_b",
  "automation",
  "codex",
] as const;

export type RitualDbActor = (typeof RITUAL_DB_ACTORS)[number];

export const RITUAL_IMPORTERS = ["owner", "automation", "codex"] as const;
export type RitualImporter = (typeof RITUAL_IMPORTERS)[number];

export type RitualDocument = {
  id: string;
  schemaVersion: typeof RITUAL_DB_SCHEMA_VERSION;
  currentVersionId: string;
  publishedVersionId?: string;
  latestValidationSnapshotId?: string;
  latestReviewDecisionId?: string;
  lifecycle: {
    state: RitualDbLifecycleState;
    imported: boolean;
    findable: boolean;
    directUseEligible: boolean;
    recommendationEligible: boolean;
    recommendable: boolean;
    missingReadiness: string[];
    holdReasons: string[];
  };
  origin: {
    type: "source" | "household";
    sourceIds?: string[];
    sourceRunIds?: string[];
    importBatchIds?: string[];
    packetCandidateIds?: string[];
  };
  searchIndex: {
    headline: string;
    sourceLabel?: string;
    originLabel?: string;
    primaryPurpose: string;
    primaryCarrier: string;
    tags: string[];
    keywords: string[];
    materials?: string[];
    places?: string[];
  };
  versionHistory: {
    versionIds: string[];
    archivedVersionIds: string[];
    supersededVersionIds: string[];
  };
  createdAtIso: string;
  updatedAtIso: string;
  archivedAtIso?: string;
};

export type RitualVersionDocument = {
  id: string;
  ritualId: string;
  versionId: string;
  schemaVersion: typeof RITUAL_DB_SCHEMA_VERSION;
  ritualSchemaVersion: typeof RITUAL_RUNTIME_SCHEMA_VERSION;
  contentHash: string;
  ritual: Ritual;
  provenance: {
    sourceIds?: string[];
    sourceRunId?: string;
    importBatchId?: string;
    packetPath?: string;
    packetCandidateId?: string;
    sourceLocationLabels: string[];
    sourceGrounding: RitualSourceGrounding[];
    moonAndTableAdaptationNotes: string[];
  };
  reviewStateAtCreation: {
    lifecycleState: RitualDbLifecycleState;
    findable: boolean;
    directUseEligible: boolean;
    recommendationEligible: boolean;
    recommendable: boolean;
    missingReadiness: string[];
    reviewFlags: string[];
  };
  createdBy: RitualDbActor;
  createdAtIso: string;
  supersedesVersionId?: string;
  archivedAtIso?: string;
};

export const IMPORT_BATCH_DISPOSITIONS = [
  "imported",
  "held_before_import",
  "candidate_extract_later",
  "rejected",
  "duplicate",
] as const;

export type ImportBatchDisposition =
  (typeof IMPORT_BATCH_DISPOSITIONS)[number];

export type ImportBatchDocument = {
  id: string;
  sourceRunId?: string;
  packetPath?: string;
  sourceLabel: string;
  importer: RitualImporter;
  createdAtIso: string;
  candidateResults: Array<{
    packetCandidateId: string;
    ritualId?: string;
    versionId?: string;
    disposition: ImportBatchDisposition;
    directUseTarget?: "yes" | "no" | "later_review";
    recommendationTarget?: "yes" | "no" | "later_review" | "context_only";
    notes: string[];
  }>;
};

export const REVIEW_DECISION_TYPES = [
  "approve_import",
  "hold_import",
  "promote_direct_use",
  "hold_direct_use",
  "promote_recommendation",
  "hold_recommendation",
  "mark_needs_source_recheck",
  "mark_needs_packet_correction",
  "toggle_review_flag",
  "archive_version",
  "supersede_version",
  "reject_version",
] as const;

export type ReviewDecisionType = (typeof REVIEW_DECISION_TYPES)[number];

export const REVIEW_DECISIONS = [
  "approved",
  "held",
  "rejected",
  "archived",
  "superseded",
] as const;

export type ReviewDecision = (typeof REVIEW_DECISIONS)[number];

export type RitualLifecycleSnapshot = {
  lifecycleState: RitualDbLifecycleState;
  findable: boolean;
  directUseEligible: boolean;
  recommendationEligible: boolean;
  recommendable: boolean;
  missingReadiness: string[];
};

export type ReviewDecisionDocument = {
  id: string;
  ritualId: string;
  versionId: string;
  decisionType: ReviewDecisionType;
  decision: ReviewDecision;
  reasons: string[];
  reviewer: RitualDbActor;
  sourceRunId?: string;
  importBatchId?: string;
  before: RitualLifecycleSnapshot;
  after: RitualLifecycleSnapshot;
  createdAtIso: string;
};

export type RitualValidationSnapshotDocument = {
  id: string;
  ritualId: string;
  versionId: string;
  validatorVersion: string;
  contentHash: string;
  generatedAtIso: string;
  valid: boolean;
  findings: Array<{
    path: string;
    message: string;
    severity: "error" | "warning";
  }>;
  readiness: {
    sourceGroundingComplete: boolean;
    presentationComplete: boolean;
    directUseReady: boolean;
    recommendationMetadataComplete: boolean;
    recommendationReady: boolean;
    missingReadiness: string[];
  };
};

export const RITUAL_AUDIT_EVENT_TYPES = [
  "db_mirror_created",
  "validation_snapshot_created",
  "static_export_generated",
  "published_pointer_changed",
  "runtime_read_fallback_used",
  "rollback_performed",
] as const;

export type RitualAuditEventType = (typeof RITUAL_AUDIT_EVENT_TYPES)[number];

export type RitualAuditEventDocument = {
  id: string;
  ritualId?: string;
  versionId?: string;
  eventType: RitualAuditEventType;
  actor: Exclude<RitualDbActor, "person_a" | "person_b">;
  summary: string;
  relatedReviewDecisionId?: string;
  relatedValidationSnapshotId?: string;
  createdAtIso: string;
};

export type RitualDbValidationSeverity = "error" | "warning";

export type RitualDbValidationFinding = {
  path: string;
  message: string;
  severity: RitualDbValidationSeverity;
};

export type RitualDbValidationResult = {
  valid: boolean;
  findings: RitualDbValidationFinding[];
};

export type CreateRitualDocumentOptions = {
  createdAtIso?: string;
  updatedAtIso?: string;
  currentVersionId?: string;
  publishedVersionId?: string;
  latestValidationSnapshotId?: string;
  latestReviewDecisionId?: string;
  sourceRunIds?: string[];
  importBatchIds?: string[];
  packetCandidateIds?: string[];
  holdReasons?: string[];
  archivedVersionIds?: string[];
  supersededVersionIds?: string[];
};

export type CreateRitualVersionDocumentOptions = {
  createdAtIso?: string;
  createdBy?: RitualDbActor;
  sourceRunId?: string;
  importBatchId?: string;
  packetPath?: string;
  packetCandidateId?: string;
  supersedesVersionId?: string;
};

const RITUAL_ALLOWED_TOP_LEVEL_KEYS = new Set([
  "id",
  "status",
  "origin",
  "presentation",
  "recommendationMetadata",
  "searchMetadata",
  "availability",
  "ritualWords",
  "reviewFlags",
  "adaptationPolicy",
]);

const PRIVATE_OR_UNSUPPORTED_PAYLOAD_KEYS = new Set([
  "birthDate",
  "birthPlace",
  "birthTime",
  "copiedSourceText",
  "email",
  "extractedSourceText",
  "natalPlacements",
  "ocrText",
  "pageImage",
  "pageImages",
  "privateArtifactPath",
  "privateProfile",
  "privateSourceExcerpt",
  "privateSourceText",
  "rawSourceExcerpt",
  "rawSourceText",
  "realName",
  "schedule",
  "sourceExcerpt",
  "sourceNotes",
  "symbolicCards",
  "ritualPattern",
  "ritualPatternKey",
]);

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoString(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    !Number.isNaN(Date.parse(value))
  );
}

function includesValue<const T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

function uniqueStrings(values: Iterable<string | undefined>): string[] {
  return [...new Set([...values].filter(isNonEmptyString))];
}

function addFinding(
  findings: RitualDbValidationFinding[],
  path: string,
  message: string,
  severity: RitualDbValidationSeverity = "error",
): void {
  findings.push({ path, message, severity });
}

function createValidationResult(
  findings: RitualDbValidationFinding[],
): RitualDbValidationResult {
  return {
    valid: findings.every((finding) => finding.severity !== "error"),
    findings,
  };
}

function getReviewFlagKeys(reviewFlags: RitualReviewFlags | undefined): string[] {
  if (!reviewFlags) {
    return [];
  }

  return Object.entries(reviewFlags)
    .filter(([key, value]) => key !== "notes" && value === true)
    .map(([key]) => key);
}

function mapRitualStatusToLifecycleState(status: RitualStatus): RitualDbLifecycleState {
  switch (status) {
    case "recommendable":
      return "recommendable";
    case "reviewed":
      return "reviewed";
    case "draft":
    case "pilot":
      return "draft";
  }
}

function getMissingReadiness(
  recommendationMetadata: RitualRecommendationMetadata,
): string[] {
  return [...(recommendationMetadata.eligibility.missing ?? [])];
}

function createLifecycleFromRitual(
  ritual: Ritual,
  holdReasons: string[] = [],
): RitualDocument["lifecycle"] {
  return {
    state: mapRitualStatusToLifecycleState(ritual.status),
    imported: ritual.origin.type === "source",
    findable: ritual.availability.findable,
    directUseEligible: ritual.availability.directUseEligible,
    recommendationEligible: ritual.availability.recommendationEligible,
    recommendable: ritual.recommendationMetadata.eligibility.recommendable,
    missingReadiness: getMissingReadiness(ritual.recommendationMetadata),
    holdReasons: [...holdReasons],
  };
}

function getSourceGrounding(ritual: Ritual): RitualSourceGrounding[] {
  return ritual.origin.type === "source"
    ? cloneJson(ritual.origin.sourceGrounding)
    : [];
}

function getSourceIds(sourceGrounding: readonly RitualSourceGrounding[]): string[] {
  return uniqueStrings(sourceGrounding.map((grounding) => grounding.citationLabel));
}

function getSourceLocationLabels(
  sourceGrounding: readonly RitualSourceGrounding[],
): string[] {
  return uniqueStrings(sourceGrounding.map((grounding) => grounding.sourceLocation));
}

function getAdaptationNotes(
  sourceGrounding: readonly RitualSourceGrounding[],
): string[] {
  return uniqueStrings(sourceGrounding.map((grounding) => grounding.moonAndTableChanges));
}

function createSearchIndex(
  presentation: Ritual["presentation"],
  recommendationMetadata: RitualRecommendationMetadata,
  searchMetadata: RitualSearchMetadata,
): RitualDocument["searchIndex"] {
  return {
    headline: presentation.headline,
    sourceLabel: searchMetadata.sourceLabel,
    originLabel: searchMetadata.originLabel,
    primaryPurpose: recommendationMetadata.purposes.primary,
    primaryCarrier: recommendationMetadata.carriers.primary,
    tags: [...searchMetadata.tags],
    keywords: [...searchMetadata.keywords],
    materials: searchMetadata.materials ? [...searchMetadata.materials] : undefined,
    places: searchMetadata.places ? [...searchMetadata.places] : undefined,
  };
}

function findForbiddenPayloadKeys(value: unknown, path = ""): string[] {
  if (value === null || typeof value !== "object") {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      findForbiddenPayloadKeys(item, `${path}.${index}`),
    );
  }

  return Object.entries(value).flatMap(([key, nestedValue]) => {
    const nextPath = path ? `${path}.${key}` : key;
    const ownFinding = PRIVATE_OR_UNSUPPORTED_PAYLOAD_KEYS.has(key)
      ? [nextPath]
      : [];

    return [...ownFinding, ...findForbiddenPayloadKeys(nestedValue, nextPath)];
  });
}

function validateStringArray(
  findings: RitualDbValidationFinding[],
  value: unknown,
  path: string,
  options: { requireNonEmpty?: boolean } = {},
): void {
  if (!Array.isArray(value)) {
    addFinding(findings, path, "Expected an array.");
    return;
  }

  if (options.requireNonEmpty && value.length === 0) {
    addFinding(findings, path, "Expected at least one value.");
  }

  value.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      addFinding(findings, `${path}.${index}`, "Expected a non-empty string.");
    }
  });
}

function validateLifecycleSnapshot(
  findings: RitualDbValidationFinding[],
  snapshot: RitualLifecycleSnapshot,
  path: string,
): void {
  if (!includesValue(RITUAL_DB_LIFECYCLE_STATES, snapshot.lifecycleState)) {
    addFinding(findings, `${path}.lifecycleState`, "Lifecycle state is invalid.");
  }

  validateStringArray(findings, snapshot.missingReadiness, `${path}.missingReadiness`);

  if (snapshot.recommendationEligible && !snapshot.directUseEligible) {
    addFinding(
      findings,
      `${path}.recommendationEligible`,
      "Recommendation eligibility requires direct-use eligibility.",
    );
  }

  if (snapshot.recommendationEligible !== snapshot.recommendable) {
    addFinding(
      findings,
      `${path}.recommendable`,
      "Recommendation eligibility and recommendable flag must agree.",
    );
  }

  if (snapshot.recommendable && snapshot.missingReadiness.length > 0) {
    addFinding(
      findings,
      `${path}.missingReadiness`,
      "Recommendable snapshots must not have missing readiness.",
    );
  }
}

export function createRitualDocumentFromRitual(
  ritual: Ritual,
  options: CreateRitualDocumentOptions = {},
): RitualDocument {
  const identity = getRitualVersionIdentity(ritual);
  const createdAtIso = options.createdAtIso ?? DEFAULT_RITUAL_DB_CREATED_AT_ISO;
  const updatedAtIso = options.updatedAtIso ?? createdAtIso;
  const sourceGrounding = getSourceGrounding(ritual);
  const versionId = options.currentVersionId ?? identity.versionId;

  return {
    id: ritual.id,
    schemaVersion: RITUAL_DB_SCHEMA_VERSION,
    currentVersionId: versionId,
    publishedVersionId: options.publishedVersionId,
    latestValidationSnapshotId: options.latestValidationSnapshotId,
    latestReviewDecisionId: options.latestReviewDecisionId,
    lifecycle: createLifecycleFromRitual(ritual, options.holdReasons),
    origin: {
      type: ritual.origin.type,
      sourceIds: ritual.origin.type === "source"
        ? getSourceIds(sourceGrounding)
        : undefined,
      sourceRunIds: options.sourceRunIds,
      importBatchIds: options.importBatchIds,
      packetCandidateIds: options.packetCandidateIds,
    },
    searchIndex: createSearchIndex(
      ritual.presentation,
      ritual.recommendationMetadata,
      ritual.searchMetadata,
    ),
    versionHistory: {
      versionIds: [versionId],
      archivedVersionIds: options.archivedVersionIds ?? [],
      supersededVersionIds: options.supersededVersionIds ?? [],
    },
    createdAtIso,
    updatedAtIso,
  };
}

export function createRitualVersionDocumentFromRitual(
  ritual: Ritual,
  options: CreateRitualVersionDocumentOptions = {},
): RitualVersionDocument {
  const identity = getRitualVersionIdentity(ritual);
  const sourceGrounding = getSourceGrounding(ritual);
  const lifecycle = createLifecycleFromRitual(ritual);

  return {
    id: identity.versionId,
    ritualId: identity.ritualId,
    versionId: identity.versionId,
    schemaVersion: RITUAL_DB_SCHEMA_VERSION,
    ritualSchemaVersion: RITUAL_RUNTIME_SCHEMA_VERSION,
    contentHash: identity.contentHash,
    ritual: cloneJson(ritual),
    provenance: {
      sourceIds: ritual.origin.type === "source"
        ? getSourceIds(sourceGrounding)
        : undefined,
      sourceRunId: options.sourceRunId,
      importBatchId: options.importBatchId,
      packetPath: options.packetPath,
      packetCandidateId: options.packetCandidateId,
      sourceLocationLabels: getSourceLocationLabels(sourceGrounding),
      sourceGrounding,
      moonAndTableAdaptationNotes: getAdaptationNotes(sourceGrounding),
    },
    reviewStateAtCreation: {
      lifecycleState: lifecycle.state,
      findable: lifecycle.findable,
      directUseEligible: lifecycle.directUseEligible,
      recommendationEligible: lifecycle.recommendationEligible,
      recommendable: lifecycle.recommendable,
      missingReadiness: [...lifecycle.missingReadiness],
      reviewFlags: getReviewFlagKeys(ritual.reviewFlags),
    },
    createdBy: options.createdBy ?? "codex",
    createdAtIso: options.createdAtIso ?? DEFAULT_RITUAL_DB_CREATED_AT_ISO,
    supersedesVersionId: options.supersedesVersionId,
  };
}

export function createRitualDbDocumentPair(
  ritual: Ritual,
  options: CreateRitualDocumentOptions & CreateRitualVersionDocumentOptions = {},
): {
  ritualDocument: RitualDocument;
  versionDocument: RitualVersionDocument;
} {
  const versionDocument = createRitualVersionDocumentFromRitual(ritual, options);
  const ritualDocument = createRitualDocumentFromRitual(ritual, {
    ...options,
    currentVersionId: versionDocument.versionId,
  });

  return { ritualDocument, versionDocument };
}

export function createRitualValidationSnapshotDocument(input: {
  id: string;
  ritualDocument: RitualDocument;
  versionDocument: RitualVersionDocument;
  validatorVersion: string;
  generatedAtIso?: string;
}): RitualValidationSnapshotDocument {
  const runtimeValidation = validateRitual(input.versionDocument.ritual);
  const sourceGroundingComplete =
    input.versionDocument.ritual.origin.type !== "source" ||
    input.versionDocument.ritual.origin.sourceGrounding.length > 0;
  const presentationComplete = runtimeValidation.findings.every(
    (finding) => !finding.path.startsWith("presentation."),
  );
  const recommendationMetadataComplete =
    input.ritualDocument.lifecycle.missingReadiness.length === 0 &&
    input.versionDocument.ritual.recommendationMetadata.capacity.supports.length > 0 &&
    input.versionDocument.ritual.recommendationMetadata.audience.supports.length > 0;
  const findings = [
    ...runtimeValidation.findings.map((finding) => ({
      path: finding.path,
      message: finding.message,
      severity: "error" as const,
    })),
    ...validateRitualDocument(input.ritualDocument).findings,
    ...validateRitualVersionDocument(input.versionDocument).findings,
  ];
  const valid = findings.every((finding) => finding.severity !== "error");

  return {
    id: input.id,
    ritualId: input.ritualDocument.id,
    versionId: input.versionDocument.versionId,
    validatorVersion: input.validatorVersion,
    contentHash: input.versionDocument.contentHash,
    generatedAtIso: input.generatedAtIso ?? DEFAULT_RITUAL_DB_CREATED_AT_ISO,
    valid,
    findings,
    readiness: {
      sourceGroundingComplete,
      presentationComplete,
      directUseReady:
        valid &&
        sourceGroundingComplete &&
        presentationComplete &&
        input.ritualDocument.lifecycle.directUseEligible,
      recommendationMetadataComplete,
      recommendationReady:
        valid &&
        input.ritualDocument.lifecycle.recommendationEligible &&
        input.ritualDocument.lifecycle.recommendable &&
        recommendationMetadataComplete,
      missingReadiness: [...input.ritualDocument.lifecycle.missingReadiness],
    },
  };
}

export function validateRitualDocument(
  document: RitualDocument,
): RitualDbValidationResult {
  const findings: RitualDbValidationFinding[] = [];

  if (!isNonEmptyString(document.id)) {
    addFinding(findings, "id", "Ritual document id is required.");
  }

  if (document.schemaVersion !== RITUAL_DB_SCHEMA_VERSION) {
    addFinding(findings, "schemaVersion", "Ritual DB schema version is invalid.");
  }

  if (!isNonEmptyString(document.currentVersionId)) {
    addFinding(findings, "currentVersionId", "Current version id is required.");
  }

  if (!includesValue(RITUAL_DB_LIFECYCLE_STATES, document.lifecycle.state)) {
    addFinding(findings, "lifecycle.state", "Lifecycle state is invalid.");
  }

  if (
    document.lifecycle.recommendationEligible &&
    !document.lifecycle.directUseEligible
  ) {
    addFinding(
      findings,
      "lifecycle.recommendationEligible",
      "Recommendation eligibility requires direct-use eligibility.",
    );
  }

  if (
    document.lifecycle.recommendationEligible !==
    document.lifecycle.recommendable
  ) {
    addFinding(
      findings,
      "lifecycle.recommendable",
      "Recommendation eligibility and recommendable flag must agree.",
    );
  }

  if (
    document.lifecycle.state === "recommendable" &&
    (!document.lifecycle.findable ||
      !document.lifecycle.directUseEligible ||
      !document.lifecycle.recommendationEligible ||
      !document.lifecycle.recommendable)
  ) {
    addFinding(
      findings,
      "lifecycle",
      "Recommendable lifecycle requires findable, direct-use, recommendation-eligible, and recommendable flags.",
    );
  }

  if (
    ["rejected", "archived"].includes(document.lifecycle.state) &&
    (document.lifecycle.findable ||
      document.lifecycle.directUseEligible ||
      document.lifecycle.recommendationEligible ||
      document.lifecycle.recommendable)
  ) {
    addFinding(
      findings,
      "lifecycle",
      "Rejected or archived Rituals must not be current selection candidates.",
    );
  }

  if (
    document.lifecycle.recommendable &&
    document.lifecycle.missingReadiness.length > 0
  ) {
    addFinding(
      findings,
      "lifecycle.missingReadiness",
      "Recommendable Ritual documents must not have missing readiness.",
    );
  }

  validateStringArray(
    findings,
    document.lifecycle.missingReadiness,
    "lifecycle.missingReadiness",
  );
  validateStringArray(findings, document.lifecycle.holdReasons, "lifecycle.holdReasons");

  if (!["source", "household"].includes(document.origin.type)) {
    addFinding(findings, "origin.type", "Origin type is invalid.");
  }

  if (document.origin.type === "source") {
    validateStringArray(findings, document.origin.sourceIds, "origin.sourceIds", {
      requireNonEmpty: true,
    });
  }

  if (!isNonEmptyString(document.searchIndex.headline)) {
    addFinding(findings, "searchIndex.headline", "Search headline is required.");
  }

  if (!isNonEmptyString(document.searchIndex.primaryPurpose)) {
    addFinding(
      findings,
      "searchIndex.primaryPurpose",
      "Primary purpose is required.",
    );
  }

  if (!isNonEmptyString(document.searchIndex.primaryCarrier)) {
    addFinding(
      findings,
      "searchIndex.primaryCarrier",
      "Primary carrier is required.",
    );
  }

  validateStringArray(findings, document.searchIndex.tags, "searchIndex.tags");
  validateStringArray(findings, document.searchIndex.keywords, "searchIndex.keywords");
  validateStringArray(
    findings,
    document.versionHistory.versionIds,
    "versionHistory.versionIds",
    { requireNonEmpty: true },
  );

  if (!document.versionHistory.versionIds.includes(document.currentVersionId)) {
    addFinding(
      findings,
      "versionHistory.versionIds",
      "Version history must include current version id.",
    );
  }

  if (!isIsoString(document.createdAtIso)) {
    addFinding(findings, "createdAtIso", "Created timestamp must be ISO-like.");
  }

  if (!isIsoString(document.updatedAtIso)) {
    addFinding(findings, "updatedAtIso", "Updated timestamp must be ISO-like.");
  }

  findForbiddenPayloadKeys(document).forEach((path) => {
    addFinding(
      findings,
      path,
      "Document contains a private or unsupported payload field.",
    );
  });

  return createValidationResult(findings);
}

export function validateRitualVersionDocument(
  document: RitualVersionDocument,
): RitualDbValidationResult {
  const findings: RitualDbValidationFinding[] = [];
  const identity = getRitualVersionIdentity(document.ritual);
  const runtimeValidation = validateRitual(document.ritual);

  if (!isNonEmptyString(document.id)) {
    addFinding(findings, "id", "Ritual version document id is required.");
  }

  if (document.id !== document.versionId) {
    addFinding(findings, "id", "Ritual version document id must equal versionId.");
  }

  if (document.schemaVersion !== RITUAL_DB_SCHEMA_VERSION) {
    addFinding(findings, "schemaVersion", "Ritual DB schema version is invalid.");
  }

  if (document.ritualSchemaVersion !== RITUAL_RUNTIME_SCHEMA_VERSION) {
    addFinding(
      findings,
      "ritualSchemaVersion",
      "Runtime Ritual schema version is invalid.",
    );
  }

  if (document.ritualId !== document.ritual.id) {
    addFinding(findings, "ritualId", "Ritual id must match snapshot ritual id.");
  }

  if (document.ritualId !== identity.ritualId) {
    addFinding(findings, "ritualId", "Ritual id does not match version identity.");
  }

  if (document.versionId !== identity.versionId) {
    addFinding(
      findings,
      "versionId",
      "Version id must match deterministic Ritual version identity.",
    );
  }

  if (document.contentHash !== identity.contentHash) {
    addFinding(
      findings,
      "contentHash",
      "Content hash must match deterministic Ritual content hash.",
    );
  }

  if (!/^fnv1a128:[0-9a-f]{32}$/.test(document.contentHash)) {
    addFinding(findings, "contentHash", "Content hash format is invalid.");
  }

  for (const finding of runtimeValidation.findings) {
    addFinding(
      findings,
      `ritual.${finding.path}`,
      finding.message,
    );
  }

  for (const key of Object.keys(document.ritual)) {
    if (!RITUAL_ALLOWED_TOP_LEVEL_KEYS.has(key)) {
      addFinding(
        findings,
        `ritual.${key}`,
        "Ritual contains an unsupported top-level metadata field.",
      );
    }
  }

  if (document.ritual.origin.type === "source") {
    if (document.provenance.sourceGrounding.length === 0) {
      addFinding(
        findings,
        "provenance.sourceGrounding",
        "Source-origin versions require source grounding provenance.",
      );
    }

    if (document.provenance.sourceLocationLabels.length === 0) {
      addFinding(
        findings,
        "provenance.sourceLocationLabels",
        "Source-origin versions require source location labels.",
      );
    }
  }

  validateLifecycleSnapshot(
    findings,
    document.reviewStateAtCreation,
    "reviewStateAtCreation",
  );

  if (
    document.reviewStateAtCreation.findable !== document.ritual.availability.findable ||
    document.reviewStateAtCreation.directUseEligible !==
      document.ritual.availability.directUseEligible ||
    document.reviewStateAtCreation.recommendationEligible !==
      document.ritual.availability.recommendationEligible ||
    document.reviewStateAtCreation.recommendable !==
      document.ritual.recommendationMetadata.eligibility.recommendable
  ) {
    addFinding(
      findings,
      "reviewStateAtCreation",
      "Review state at creation must match the Ritual snapshot availability and recommendability.",
    );
  }

  const missingReadiness = getMissingReadiness(document.ritual.recommendationMetadata);
  if (
    document.reviewStateAtCreation.missingReadiness.join("\n") !==
    missingReadiness.join("\n")
  ) {
    addFinding(
      findings,
      "reviewStateAtCreation.missingReadiness",
      "Review state missing readiness must match the Ritual snapshot.",
    );
  }

  if (!isIsoString(document.createdAtIso)) {
    addFinding(findings, "createdAtIso", "Created timestamp must be ISO-like.");
  }

  findForbiddenPayloadKeys(document).forEach((path) => {
    addFinding(
      findings,
      path,
      "Document contains a private or unsupported payload field.",
    );
  });

  return createValidationResult(findings);
}

export function validateRitualDocumentPair(
  ritualDocument: RitualDocument,
  versionDocument: RitualVersionDocument,
): RitualDbValidationResult {
  const findings = [
    ...validateRitualDocument(ritualDocument).findings,
    ...validateRitualVersionDocument(versionDocument).findings,
  ];

  if (ritualDocument.id !== versionDocument.ritualId) {
    addFinding(
      findings,
      "ritualDocument.id",
      "Ritual document id must match version ritual id.",
    );
  }

  if (ritualDocument.currentVersionId !== versionDocument.versionId) {
    addFinding(
      findings,
      "ritualDocument.currentVersionId",
      "Current version pointer must match the supplied version document.",
    );
  }

  return createValidationResult(findings);
}

export function validateImportBatchDocument(
  document: ImportBatchDocument,
): RitualDbValidationResult {
  const findings: RitualDbValidationFinding[] = [];

  if (!isNonEmptyString(document.id)) {
    addFinding(findings, "id", "Import batch id is required.");
  }

  if (!isNonEmptyString(document.sourceLabel)) {
    addFinding(findings, "sourceLabel", "Source label is required.");
  }

  if (!includesValue(RITUAL_IMPORTERS, document.importer)) {
    addFinding(findings, "importer", "Importer is invalid.");
  }

  if (!isIsoString(document.createdAtIso)) {
    addFinding(findings, "createdAtIso", "Created timestamp must be ISO-like.");
  }

  if (!Array.isArray(document.candidateResults)) {
    addFinding(findings, "candidateResults", "Candidate results must be an array.");
  } else {
    document.candidateResults.forEach((candidate, index) => {
      const path = `candidateResults.${index}`;

      if (!isNonEmptyString(candidate.packetCandidateId)) {
        addFinding(
          findings,
          `${path}.packetCandidateId`,
          "Packet candidate id is required.",
        );
      }

      if (!includesValue(IMPORT_BATCH_DISPOSITIONS, candidate.disposition)) {
        addFinding(findings, `${path}.disposition`, "Disposition is invalid.");
      }

      if (
        candidate.disposition === "imported" &&
        (!isNonEmptyString(candidate.ritualId) ||
          !isNonEmptyString(candidate.versionId))
      ) {
        addFinding(
          findings,
          path,
          "Imported candidates require ritualId and versionId.",
        );
      }

      validateStringArray(findings, candidate.notes, `${path}.notes`);
    });
  }

  findForbiddenPayloadKeys(document).forEach((path) => {
    addFinding(
      findings,
      path,
      "Document contains a private or unsupported payload field.",
    );
  });

  return createValidationResult(findings);
}

export function validateReviewDecisionDocument(
  document: ReviewDecisionDocument,
): RitualDbValidationResult {
  const findings: RitualDbValidationFinding[] = [];

  if (!isNonEmptyString(document.id)) {
    addFinding(findings, "id", "Review decision id is required.");
  }

  if (!isNonEmptyString(document.ritualId)) {
    addFinding(findings, "ritualId", "Ritual id is required.");
  }

  if (!isNonEmptyString(document.versionId)) {
    addFinding(findings, "versionId", "Version id is required.");
  }

  if (!includesValue(REVIEW_DECISION_TYPES, document.decisionType)) {
    addFinding(findings, "decisionType", "Review decision type is invalid.");
  }

  if (!includesValue(REVIEW_DECISIONS, document.decision)) {
    addFinding(findings, "decision", "Review decision value is invalid.");
  }

  if (!includesValue(RITUAL_DB_ACTORS, document.reviewer)) {
    addFinding(findings, "reviewer", "Reviewer is invalid.");
  }

  validateStringArray(findings, document.reasons, "reasons");
  validateLifecycleSnapshot(findings, document.before, "before");
  validateLifecycleSnapshot(findings, document.after, "after");

  if (!isIsoString(document.createdAtIso)) {
    addFinding(findings, "createdAtIso", "Created timestamp must be ISO-like.");
  }

  findForbiddenPayloadKeys(document).forEach((path) => {
    addFinding(
      findings,
      path,
      "Document contains a private or unsupported payload field.",
    );
  });

  return createValidationResult(findings);
}

export function validateRitualValidationSnapshotDocument(
  document: RitualValidationSnapshotDocument,
  versionDocument?: RitualVersionDocument,
): RitualDbValidationResult {
  const findings: RitualDbValidationFinding[] = [];

  if (!isNonEmptyString(document.id)) {
    addFinding(findings, "id", "Validation snapshot id is required.");
  }

  if (!isNonEmptyString(document.ritualId)) {
    addFinding(findings, "ritualId", "Ritual id is required.");
  }

  if (!isNonEmptyString(document.versionId)) {
    addFinding(findings, "versionId", "Version id is required.");
  }

  if (!isNonEmptyString(document.validatorVersion)) {
    addFinding(findings, "validatorVersion", "Validator version is required.");
  }

  if (!/^fnv1a128:[0-9a-f]{32}$/.test(document.contentHash)) {
    addFinding(findings, "contentHash", "Content hash format is invalid.");
  }

  if (!isIsoString(document.generatedAtIso)) {
    addFinding(findings, "generatedAtIso", "Generated timestamp must be ISO-like.");
  }

  if (!Array.isArray(document.findings)) {
    addFinding(findings, "findings", "Findings must be an array.");
  } else {
    document.findings.forEach((finding, index) => {
      if (!isNonEmptyString(finding.path)) {
        addFinding(findings, `findings.${index}.path`, "Finding path is required.");
      }

      if (!isNonEmptyString(finding.message)) {
        addFinding(
          findings,
          `findings.${index}.message`,
          "Finding message is required.",
        );
      }

      if (!["error", "warning"].includes(finding.severity)) {
        addFinding(
          findings,
          `findings.${index}.severity`,
          "Finding severity is invalid.",
        );
      }
    });
  }

  if (
    Array.isArray(document.findings) &&
    document.valid &&
    document.findings.some((finding) => finding.severity === "error")
  ) {
    addFinding(
      findings,
      "valid",
      "Valid snapshots must not contain error findings.",
    );
  }

  if (
    document.readiness.recommendationReady &&
    document.readiness.missingReadiness.length > 0
  ) {
    addFinding(
      findings,
      "readiness.missingReadiness",
      "Recommendation-ready snapshots must not have missing readiness.",
    );
  }

  if (versionDocument) {
    if (document.ritualId !== versionDocument.ritualId) {
      addFinding(
        findings,
        "ritualId",
        "Validation snapshot ritual id must match version document.",
      );
    }

    if (document.versionId !== versionDocument.versionId) {
      addFinding(
        findings,
        "versionId",
        "Validation snapshot version id must match version document.",
      );
    }

    if (document.contentHash !== versionDocument.contentHash) {
      addFinding(
        findings,
        "contentHash",
        "Validation snapshot content hash must match version document.",
      );
    }
  }

  findForbiddenPayloadKeys(document).forEach((path) => {
    addFinding(
      findings,
      path,
      "Document contains a private or unsupported payload field.",
    );
  });

  return createValidationResult(findings);
}

export function validateRitualAuditEventDocument(
  document: RitualAuditEventDocument,
): RitualDbValidationResult {
  const findings: RitualDbValidationFinding[] = [];

  if (!isNonEmptyString(document.id)) {
    addFinding(findings, "id", "Audit event id is required.");
  }

  if (!includesValue(RITUAL_AUDIT_EVENT_TYPES, document.eventType)) {
    addFinding(findings, "eventType", "Audit event type is invalid.");
  }

  if (!["owner", "automation", "codex"].includes(document.actor)) {
    addFinding(findings, "actor", "Audit actor is invalid.");
  }

  if (!isNonEmptyString(document.summary)) {
    addFinding(findings, "summary", "Audit summary is required.");
  }

  if (!isIsoString(document.createdAtIso)) {
    addFinding(findings, "createdAtIso", "Created timestamp must be ISO-like.");
  }

  findForbiddenPayloadKeys(document).forEach((path) => {
    addFinding(
      findings,
      path,
      "Document contains a private or unsupported payload field.",
    );
  });

  return createValidationResult(findings);
}
