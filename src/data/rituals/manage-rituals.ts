import { RITUAL_STATUSES, type Ritual, type RitualStatus } from "./types";
import {
  getRitualSourceFilterValue,
  getRitualSourceLabels,
  getRitualSourceOptions,
  type RitualSourceOption,
} from "./search-rituals";
import {
  validateRituals,
  type RitualValidationFinding,
} from "./validate-rituals";
import type {
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "./db-documents";
import type { RitualReviewAction } from "./db-review-transactions";

export const MANAGE_RITUAL_ORIGIN_FILTERS = ["all", "source", "household"] as const;
export const MANAGE_RITUAL_AVAILABILITY_FILTERS = [
  "all",
  "findable",
  "direct_use",
  "recommendation_eligible",
  "recommendable",
] as const;
export const MANAGE_RITUAL_READINESS_FILTERS = [
  "all",
  "missing_readiness",
  "review_flags",
  "validation_findings",
  "recommendation_ready",
] as const;
export const MANAGE_RITUAL_VALIDATION_FILTERS = ["all", "valid", "findings"] as const;

export type ManageRitualStatusFilter = "all" | RitualStatus;
export type ManageRitualOriginFilter = (typeof MANAGE_RITUAL_ORIGIN_FILTERS)[number];
export type ManageRitualAvailabilityFilter =
  (typeof MANAGE_RITUAL_AVAILABILITY_FILTERS)[number];
export type ManageRitualReadinessFilter =
  (typeof MANAGE_RITUAL_READINESS_FILTERS)[number];
export type ManageRitualValidationFilter =
  (typeof MANAGE_RITUAL_VALIDATION_FILTERS)[number];
export type ManageRitualSortKey =
  | "headline"
  | "status"
  | "origin"
  | "direct_use"
  | "recommendation"
  | "issues";
export type ManageRitualSortDirection = "asc" | "desc";

const MANAGE_RITUAL_SORT_KEYS: ManageRitualSortKey[] = [
  "headline",
  "status",
  "origin",
  "direct_use",
  "recommendation",
  "issues",
];

const ritualStatusSortOrder = new Map<RitualStatus, number>(
  RITUAL_STATUSES.map((status, index) => [status, index]),
);
const RECOMMENDATION_PROMOTION_RESOLVABLE_READINESS = new Set([
  "recommendation_review",
]);

export type ManageRitualFilters = {
  status: ManageRitualStatusFilter;
  origin: ManageRitualOriginFilter;
  availability: ManageRitualAvailabilityFilter;
  readiness: ManageRitualReadinessFilter;
  validation: ManageRitualValidationFilter;
  source: string;
  sort: ManageRitualSortKey;
  direction: ManageRitualSortDirection;
};

export type ManageRitualDbDocuments = {
  ritualDocuments: readonly RitualDocument[];
  versionDocuments: readonly RitualVersionDocument[];
  validationSnapshots: readonly RitualValidationSnapshotDocument[];
};

export type ManageRitualReviewActionOption = {
  action: RitualReviewAction;
  label: string;
  description: string;
  enabled: boolean;
  requiresReason: boolean;
  disabledReason?: string;
  tone?: "normal" | "caution" | "danger";
};

export type ManageRitualReviewState = {
  dbBacked: boolean;
  lifecycleState?: string;
  currentVersionId?: string;
  publishedVersionId?: string;
  latestValidationSnapshotId?: string;
  validationSnapshotValid?: boolean;
  holdReasons: string[];
  sourceRunIds: string[];
  importBatchIds: string[];
  packetCandidateIds: string[];
  sourceIds: string[];
  actions: ManageRitualReviewActionOption[];
  unavailableReason?: string;
};

export type ManageRitualRow = {
  ritual: Ritual;
  id: string;
  headline: string;
  status: RitualStatus;
  origin: "source" | "household";
  findable: boolean;
  directUseEligible: boolean;
  recommendationEligible: boolean;
  recommendable: boolean;
  primaryPurpose: string;
  primaryCarrier: string;
  audience: string[];
  capacity: string[];
  reviewFlags: string[];
  validationFindings: RitualValidationFinding[];
  missingReadiness: string[];
  issues: string[];
  sourceLabel?: string;
  originLabel?: string;
  sourceValues: string[];
  reviewState: ManageRitualReviewState;
};

export type ManageRitualsViewModel = {
  total: number;
  filteredTotal: number;
  counts: {
    byStatus: Record<RitualStatus, number>;
    byOrigin: Record<"source" | "household", number>;
    findable: number;
    directUseEligible: number;
    recommendationEligible: number;
    recommendable: number;
    withValidationFindings: number;
    withMissingReadiness: number;
  };
  filters: ManageRitualFilters;
  sourceOptions: RitualSourceOption[];
  rows: ManageRitualRow[];
};

export type CreateManageRitualsViewModelOptions = {
  dbBacked?: boolean;
  dbDocuments?: ManageRitualDbDocuments;
};

export const defaultManageRitualFilters: ManageRitualFilters = {
  status: "all",
  origin: "all",
  availability: "all",
  readiness: "all",
  validation: "all",
  source: "all",
  sort: "headline",
  direction: "asc",
};

function emptyStatusCounts(): Record<RitualStatus, number> {
  return Object.fromEntries(
    RITUAL_STATUSES.map((status) => [status, 0]),
  ) as Record<RitualStatus, number>;
}

function getReviewFlags(ritual: Ritual): string[] {
  const flags = ritual.reviewFlags;

  if (!flags) {
    return [];
  }

  return [
    flags.sourceTextReviewRequired ? "sourceTextReviewRequired" : undefined,
    flags.materialSafetyReviewRequired ? "materialSafetyReviewRequired" : undefined,
    flags.sourceVerificationRequired ? "sourceVerificationRequired" : undefined,
    flags.productBoundaryReviewRequired ? "productBoundaryReviewRequired" : undefined,
  ].filter((flag): flag is string => Boolean(flag));
}

function getRitualDbContext(
  ritual: Ritual,
  options?: CreateManageRitualsViewModelOptions,
): {
  ritualDocument?: RitualDocument;
  versionDocument?: RitualVersionDocument;
  validationSnapshot?: RitualValidationSnapshotDocument;
} {
  const ritualDocument = options?.dbDocuments?.ritualDocuments.find(
    (document) => document.id === ritual.id,
  );
  const currentVersionId = ritualDocument?.currentVersionId;
  const publishedVersionId = ritualDocument?.publishedVersionId;
  const versionDocument = options?.dbDocuments?.versionDocuments.find(
    (document) =>
      document.ritualId === ritual.id &&
      (document.versionId === currentVersionId ||
        document.versionId === publishedVersionId),
  );
  const snapshotId = ritualDocument?.latestValidationSnapshotId;
  const validationSnapshot = options?.dbDocuments?.validationSnapshots.find(
    (document) =>
      document.ritualId === ritual.id &&
      (document.id === snapshotId ||
        document.versionId === versionDocument?.versionId),
  );

  return { ritualDocument, versionDocument, validationSnapshot };
}

function hasSourceGrounding(ritual: Ritual): boolean {
  return ritual.origin.type !== "source" || ritual.origin.sourceGrounding.length > 0;
}

function createBlockedAction(
  action: RitualReviewAction,
  label: string,
  description: string,
  disabledReason: string,
  requiresReason: boolean,
  tone: ManageRitualReviewActionOption["tone"] = "normal",
): ManageRitualReviewActionOption {
  return {
    action,
    label,
    description,
    enabled: false,
    requiresReason,
    disabledReason,
    tone,
  };
}

function createActionOption(input: {
  action: RitualReviewAction;
  label: string;
  description: string;
  enabled: boolean;
  requiresReason: boolean;
  disabledReason?: string;
  tone?: ManageRitualReviewActionOption["tone"];
}): ManageRitualReviewActionOption {
  return {
    action: input.action,
    label: input.label,
    description: input.description,
    enabled: input.enabled,
    requiresReason: input.requiresReason,
    disabledReason: input.enabled ? undefined : input.disabledReason,
    tone: input.tone ?? "normal",
  };
}

function createReviewState(input: {
  ritual: Ritual;
  directUseEligible: boolean;
  recommendable: boolean;
  missingReadiness: string[];
  reviewFlags: string[];
  validationFindings: RitualValidationFinding[];
  options?: CreateManageRitualsViewModelOptions;
}): ManageRitualReviewState {
  const dbBacked = input.options?.dbBacked === true;
  const { ritualDocument, validationSnapshot } = getRitualDbContext(
    input.ritual,
    input.options,
  );
  const unavailableReason = !dbBacked
    ? "Review actions are available when the active Ritual repository source is Firestore."
    : !ritualDocument
      ? "This Ritual does not have a Firestore review document in the active read payload."
      : undefined;
  const baseState = {
    dbBacked,
    lifecycleState: ritualDocument?.lifecycle.state,
    currentVersionId: ritualDocument?.currentVersionId,
    publishedVersionId: ritualDocument?.publishedVersionId,
    latestValidationSnapshotId: ritualDocument?.latestValidationSnapshotId,
    validationSnapshotValid: validationSnapshot?.valid,
    holdReasons: ritualDocument?.lifecycle.holdReasons ?? [],
    sourceRunIds: ritualDocument?.origin.sourceRunIds ?? [],
    importBatchIds: ritualDocument?.origin.importBatchIds ?? [],
    packetCandidateIds: ritualDocument?.origin.packetCandidateIds ?? [],
    sourceIds: ritualDocument?.origin.sourceIds ?? [],
    unavailableReason,
  };

  if (unavailableReason || !ritualDocument) {
    const reason = unavailableReason ?? "Review actions are unavailable.";

    return {
      ...baseState,
      actions: [
        createBlockedAction("promote_direct_use", "Restore direct use", "Make this Ritual available in Search and direct selection. Recommendation review stays separate.", reason, false),
        createBlockedAction("promote_recommendation", "Make recommendation-ready", "Allow Choose with me to recommend this Ritual after direct use and validation are clear.", reason, false),
        createBlockedAction("hold_recommendation", "Remove from recommendations", "Keep Search and direct selection available, but stop Choose with me from offering it.", reason, true, "caution"),
        createBlockedAction("add_review_note", "Add review note", "Record a review note without changing availability.", reason, true),
      ],
    };
  }

  const validationClean = input.validationFindings.length === 0 &&
    validationSnapshot?.valid !== false;
  const promotionsHaveValidation = validationSnapshot?.valid === true;
  const reviewFlagsClean = input.reviewFlags.length === 0;
  const sourceGrounded = hasSourceGrounding(input.ritual);
  const directUsePromotionBlocker = !promotionsHaveValidation
    ? "A passing validation snapshot is required before direct use can be restored."
    : !validationClean
      ? "Resolve validation findings before restoring direct use."
      : !reviewFlagsClean
        ? "Resolve review flags before restoring direct use."
        : !sourceGrounded
          ? "Source-backed Rituals need source grounding before direct use can be restored."
          : undefined;
  const unresolvedRecommendationReadiness = input.missingReadiness.filter(
    (item) => !RECOMMENDATION_PROMOTION_RESOLVABLE_READINESS.has(item),
  );
  const recommendationPromotionBlocker = !input.directUseEligible
    ? "Restore direct use before making this recommendation-ready."
    : unresolvedRecommendationReadiness.length > 0
      ? `Resolve ${unresolvedRecommendationReadiness.join(", ")} before making this recommendation-ready.`
      : directUsePromotionBlocker;
  const isArchived = ritualDocument.lifecycle.state === "archived";

  return {
    ...baseState,
    actions: [
      createActionOption({
        action: "promote_direct_use",
        label: "Restore direct use",
        description: "Make this Ritual available in Search and direct selection. Recommendation review stays separate.",
        enabled: !input.directUseEligible && !directUsePromotionBlocker,
        disabledReason: input.directUseEligible
          ? "Direct use is already available."
          : directUsePromotionBlocker,
        requiresReason: false,
      }),
      createActionOption({
        action: "hold_direct_use",
        label: "Remove from direct use",
        description: "Keep the Ritual visible in Manage, but remove it from Search, direct selection, and recommendations.",
        enabled: input.directUseEligible && !isArchived,
        disabledReason: isArchived
          ? "Archived Rituals are already unavailable."
          : "Direct use is already unavailable.",
        requiresReason: true,
        tone: "caution",
      }),
      createActionOption({
        action: "promote_recommendation",
        label: "Make recommendation-ready",
        description: "Allow Choose with me to recommend this Ritual after direct use and validation are clear.",
        enabled: !input.recommendable && !recommendationPromotionBlocker,
        disabledReason: input.recommendable
          ? "This Ritual is already recommendation-ready."
          : recommendationPromotionBlocker,
        requiresReason: false,
      }),
      createActionOption({
        action: "hold_recommendation",
        label: "Remove from recommendations",
        description: "Keep Search and direct selection available, but stop Choose with me from offering it.",
        enabled: input.directUseEligible && !isArchived,
        disabledReason: isArchived
          ? "Archived Rituals are already unavailable."
          : "Direct use must be available before only recommendations can be removed.",
        requiresReason: true,
        tone: "caution",
      }),
      createActionOption({
        action: "mark_needs_source_recheck",
        label: "Needs source recheck",
        description: "Hold this Ritual until source grounding is reviewed again.",
        enabled: input.ritual.origin.type === "source" && !isArchived,
        disabledReason: input.ritual.origin.type !== "source"
          ? "Only source-backed Rituals can be marked for source recheck."
          : "Archived Rituals are already unavailable.",
        requiresReason: true,
        tone: "caution",
      }),
      createActionOption({
        action: "mark_needs_packet_correction",
        label: "Needs packet correction",
        description: "Hold this Ritual until its extraction packet is corrected.",
        enabled: input.ritual.origin.type === "source" && !isArchived,
        disabledReason: input.ritual.origin.type !== "source"
          ? "Only source-backed Rituals can be marked for packet correction."
          : "Archived Rituals are already unavailable.",
        requiresReason: true,
        tone: "caution",
      }),
      createActionOption({
        action: "add_review_note",
        label: "Add review note",
        description: "Record a review note without changing availability.",
        enabled: true,
        requiresReason: true,
      }),
      createActionOption({
        action: "archive_ritual",
        label: "Archive Ritual",
        description: "Remove this Ritual from search, direct use, and recommendations.",
        enabled: !isArchived && promotionsHaveValidation,
        disabledReason: isArchived
          ? "Already archived."
          : "Archiving requires a passing validation snapshot for the target version.",
        requiresReason: true,
        tone: "danger",
      }),
    ],
  };
}

function normalizeFilters(filters?: Partial<ManageRitualFilters>): ManageRitualFilters {
  const status = filters?.status ?? defaultManageRitualFilters.status;
  const origin = filters?.origin ?? defaultManageRitualFilters.origin;
  const availability =
    filters?.availability ?? defaultManageRitualFilters.availability;
  const readiness = filters?.readiness ?? defaultManageRitualFilters.readiness;
  const validation =
    filters?.validation ?? defaultManageRitualFilters.validation;
  const source = filters?.source ?? defaultManageRitualFilters.source;
  const sort = filters?.sort ?? defaultManageRitualFilters.sort;
  const direction = filters?.direction ?? defaultManageRitualFilters.direction;

  return {
    status: status === "all" || RITUAL_STATUSES.includes(status) ? status : "all",
    origin: MANAGE_RITUAL_ORIGIN_FILTERS.includes(origin) ? origin : "all",
    availability: MANAGE_RITUAL_AVAILABILITY_FILTERS.includes(availability)
      ? availability
      : "all",
    readiness: MANAGE_RITUAL_READINESS_FILTERS.includes(readiness)
      ? readiness
      : "all",
    validation: MANAGE_RITUAL_VALIDATION_FILTERS.includes(validation)
      ? validation
      : "all",
    source,
    sort: MANAGE_RITUAL_SORT_KEYS.includes(sort) ? sort : "headline",
    direction: direction === "desc" ? "desc" : "asc",
  };
}

function rowMatchesFilters(row: ManageRitualRow, filters: ManageRitualFilters): boolean {
  if (filters.status !== "all" && row.status !== filters.status) {
    return false;
  }

  if (filters.origin !== "all" && row.origin !== filters.origin) {
    return false;
  }

  if (
    filters.source !== "all" &&
    !row.sourceValues.includes(filters.source)
  ) {
    return false;
  }

  if (filters.availability === "findable" && !row.findable) {
    return false;
  }

  if (filters.availability === "direct_use" && !row.directUseEligible) {
    return false;
  }

  if (
    filters.availability === "recommendation_eligible" &&
    !row.recommendationEligible
  ) {
    return false;
  }

  if (filters.availability === "recommendable" && !row.recommendable) {
    return false;
  }

  if (
    filters.readiness === "missing_readiness" &&
    row.missingReadiness.length === 0
  ) {
    return false;
  }

  if (filters.readiness === "review_flags" && row.reviewFlags.length === 0) {
    return false;
  }

  if (
    filters.readiness === "validation_findings" &&
    row.validationFindings.length === 0
  ) {
    return false;
  }

  if (filters.readiness === "recommendation_ready" && !row.recommendable) {
    return false;
  }

  if (filters.validation === "valid" && row.validationFindings.length > 0) {
    return false;
  }

  if (filters.validation === "findings" && row.validationFindings.length === 0) {
    return false;
  }

  return true;
}

function compareText(a: string, b: string): number {
  const normalizedA = a.trim().toLowerCase();
  const normalizedB = b.trim().toLowerCase();

  if (!normalizedA && normalizedB) {
    return 1;
  }

  if (normalizedA && !normalizedB) {
    return -1;
  }

  return normalizedA.localeCompare(normalizedB);
}

function compareBoolean(a: boolean, b: boolean): number {
  if (a === b) {
    return 0;
  }

  return a ? 1 : -1;
}

function recommendationSortValue(row: ManageRitualRow): number {
  if (row.recommendable) {
    return 2;
  }

  if (row.recommendationEligible) {
    return 1;
  }

  return 0;
}

function statusSortValue(status: RitualStatus): number {
  return ritualStatusSortOrder.get(status) ?? RITUAL_STATUSES.length;
}

function sortManageRows(
  rows: ManageRitualRow[],
  filters: ManageRitualFilters,
): ManageRitualRow[] {
  const sorted = [...rows].sort((a, b) => {
    switch (filters.sort) {
      case "status":
        return statusSortValue(a.status) - statusSortValue(b.status) ||
          compareText(a.headline, b.headline);
      case "origin":
        return compareText(a.origin, b.origin) ||
          compareText(a.sourceLabel ?? "", b.sourceLabel ?? "") ||
          compareText(a.headline, b.headline);
      case "direct_use":
        return compareBoolean(a.directUseEligible, b.directUseEligible) ||
          compareText(a.headline, b.headline);
      case "recommendation":
        return recommendationSortValue(a) - recommendationSortValue(b) ||
          compareText(a.headline, b.headline);
      case "issues":
        return compareText(a.issues[0] ?? "", b.issues[0] ?? "") ||
          a.issues.length - b.issues.length ||
          compareText(a.headline, b.headline);
      case "headline":
      default:
        return compareText(a.headline, b.headline);
    }
  });

  return filters.direction === "desc" ? sorted.reverse() : sorted;
}

export function createManageRitualsViewModel(
  rituals: Ritual[],
  filterOverrides?: Partial<ManageRitualFilters>,
  options?: CreateManageRitualsViewModelOptions,
): ManageRitualsViewModel {
  const filters = normalizeFilters(filterOverrides);
  const sourceOptions = getRitualSourceOptions(rituals);
  const validation = validateRituals(rituals);
  const findingsByRitualId = new Map<string, RitualValidationFinding[]>();

  for (const finding of validation.findings) {
    const currentFindings = findingsByRitualId.get(finding.ritualId) ?? [];
    currentFindings.push(finding);
    findingsByRitualId.set(finding.ritualId, currentFindings);
  }

  const rows = rituals.map((ritual) => {
    const reviewFlags = getReviewFlags(ritual);
    const validationFindings = findingsByRitualId.get(ritual.id) ?? [];
    const dbContext = getRitualDbContext(ritual, options);
    const lifecycle = options?.dbBacked === true
      ? dbContext.ritualDocument?.lifecycle
      : undefined;
    const missingReadiness =
      lifecycle?.missingReadiness ??
      ritual.recommendationMetadata.eligibility.missing ??
      [];

    const sourceLabels = getRitualSourceLabels(ritual);
    const findable = lifecycle?.findable ?? ritual.availability.findable;
    const directUseEligible =
      lifecycle?.directUseEligible ?? ritual.availability.directUseEligible;
    const recommendationEligible =
      lifecycle?.recommendationEligible ??
      ritual.availability.recommendationEligible;
    const recommendable =
      lifecycle?.recommendable ??
      ritual.recommendationMetadata.eligibility.recommendable;

    return {
      ritual,
      id: ritual.id,
      headline: ritual.presentation.headline,
      status: ritual.status,
      origin: ritual.origin.type,
      findable,
      directUseEligible,
      recommendationEligible,
      recommendable,
      primaryPurpose: ritual.recommendationMetadata.purposes.primary,
      primaryCarrier: ritual.recommendationMetadata.carriers.primary,
      audience: ritual.recommendationMetadata.audience.supports,
      capacity: ritual.recommendationMetadata.capacity.supports,
      reviewFlags,
      validationFindings,
      missingReadiness,
      issues: [...new Set([
        ...missingReadiness,
        ...validationFindings.map((finding) => finding.path),
      ])],
      sourceLabel: sourceLabels[0],
      originLabel: ritual.searchMetadata.originLabel,
      sourceValues: sourceLabels.map(getRitualSourceFilterValue),
      reviewState: createReviewState({
        ritual,
        directUseEligible,
        recommendable,
        missingReadiness,
        reviewFlags,
        validationFindings,
        options,
      }),
    };
  });

  const byStatus = emptyStatusCounts();
  const byOrigin = { source: 0, household: 0 };

  for (const row of rows) {
    byStatus[row.status] += 1;
    byOrigin[row.origin] += 1;
  }

  const filteredRows = sortManageRows(
    rows.filter((row) => rowMatchesFilters(row, filters)),
    filters,
  );

  return {
    total: rows.length,
    filteredTotal: filteredRows.length,
    counts: {
      byStatus,
      byOrigin,
      findable: rows.filter((row) => row.findable).length,
      directUseEligible: rows.filter((row) => row.directUseEligible).length,
      recommendationEligible: rows.filter((row) => row.recommendationEligible)
        .length,
      recommendable: rows.filter((row) => row.recommendable).length,
      withValidationFindings: rows.filter(
        (row) => row.validationFindings.length > 0,
      ).length,
      withMissingReadiness: rows.filter(
        (row) => row.missingReadiness.length > 0,
      ).length,
    },
    filters,
    sourceOptions,
    rows: filteredRows,
  };
}
