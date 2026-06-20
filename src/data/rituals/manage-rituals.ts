import {
  RITUAL_AUDIENCES,
  RITUAL_CAPACITY_MODES,
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  RITUAL_STATUSES,
  RITUAL_TIMING_RELATIONSHIPS,
  type Ritual,
  type RitualStatus,
} from "./types";
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
import { validateRitualEditDraft } from "./ritual-edit-draft-validation";
import type {
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "./db-documents";
import type { RitualReviewAction } from "./db-review-transactions";
import type { RitualEditDraftDocument } from "./ritual-edit-drafts";

export const MANAGE_RITUAL_ORIGIN_FILTERS = ["all", "source", "household"] as const;
export const MANAGE_RITUAL_VIEW_FILTERS = [
  "all",
  "active_draft",
  "in_library",
  "choose_with_me",
  "needs_attention",
  "archived",
] as const;
export const MANAGE_RITUAL_AVAILABILITY_FILTERS = [
  "all",
  "in_library",
  "hidden_from_library",
  "allowed_choose_with_me",
  "held_choose_with_me",
] as const;
export const MANAGE_RITUAL_READINESS_FILTERS = [
  "all",
  "missing_readiness",
  "review_flags",
  "validation_findings",
] as const;
export const MANAGE_RITUAL_VALIDATION_FILTERS = ["all", "valid", "findings"] as const;
export const MANAGE_RITUAL_SHORTCUT_FILTERS = [
  "all",
  "active_draft",
  "validation_issues",
  "timing_repair",
  "source_review",
  "recommendation_setup",
  "held_choose_with_me",
  "state_mismatch",
] as const;

export type ManageRitualViewFilter = (typeof MANAGE_RITUAL_VIEW_FILTERS)[number];
export type ManageRitualStatusFilter = ManageRitualViewFilter | RitualStatus;
export type ManageRitualOriginFilter = (typeof MANAGE_RITUAL_ORIGIN_FILTERS)[number];
export type ManageRitualAvailabilityFilter =
  (typeof MANAGE_RITUAL_AVAILABILITY_FILTERS)[number];
export type ManageRitualReadinessFilter =
  (typeof MANAGE_RITUAL_READINESS_FILTERS)[number];
export type ManageRitualValidationFilter =
  (typeof MANAGE_RITUAL_VALIDATION_FILTERS)[number];
export type ManageRitualShortcutFilter =
  (typeof MANAGE_RITUAL_SHORTCUT_FILTERS)[number];
export type ManageRitualPurposeFilter = "all" | (typeof RITUAL_PURPOSES)[number];
export type ManageRitualCarrierFilter = "all" | (typeof RITUAL_CARRIERS)[number];
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
  query: string;
  status: ManageRitualStatusFilter;
  origin: ManageRitualOriginFilter;
  availability: ManageRitualAvailabilityFilter;
  readiness: ManageRitualReadinessFilter;
  validation: ManageRitualValidationFilter;
  shortcut: ManageRitualShortcutFilter;
  purpose: ManageRitualPurposeFilter;
  carrier: ManageRitualCarrierFilter;
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
  packetPaths: string[];
  packetCandidateIds: string[];
  sourceIds: string[];
  sourceLocationLabels: string[];
  sourceGroundingSummaries: string[];
  moonAndTableAdaptationNotes: string[];
  actions: ManageRitualReviewActionOption[];
  unavailableReason?: string;
};

export type ManageRitualRow = {
  rowKind: "published" | "edit_draft";
  ritual: Ritual;
  activeDraft?: RitualEditDraftDocument;
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
  libraryState: "draft" | "in_library" | "hidden" | "archived" | "state_mismatch";
  chooseWithMeState: "allowed" | "held_by_choice" | "needs_setup" | "not_available";
  attentionLabels: string[];
  searchText: string;
  sourceLabel?: string;
  originLabel?: string;
  sourceValues: string[];
  reviewState: ManageRitualReviewState;
};

export type ManageRitualsViewModel = {
  total: number;
  activeDraftTotal: number;
  filteredTotal: number;
  counts: {
    byStatus: Record<RitualStatus, number>;
    byOrigin: Record<"source" | "household", number>;
    findable: number;
    directUseEligible: number;
    inLibrary: number;
    recommendationEligible: number;
    recommendable: number;
    allowedChooseWithMe: number;
    needsAttention: number;
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
  activeDrafts?: readonly RitualEditDraftDocument[];
};

export const defaultManageRitualFilters: ManageRitualFilters = {
  query: "",
  status: "all",
  origin: "all",
  availability: "all",
  readiness: "all",
  validation: "all",
  shortcut: "all",
  purpose: "all",
  carrier: "all",
  source: "all",
  sort: "headline",
  direction: "asc",
};

function emptyStatusCounts(): Record<RitualStatus, number> {
  return Object.fromEntries(
    RITUAL_STATUSES.map((status) => [status, 0]),
  ) as Record<RitualStatus, number>;
}

function getReviewFlagLabels(flags: Ritual["reviewFlags"]): string[] {
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

function getReviewFlags(ritual: Ritual): string[] {
  return getReviewFlagLabels(ritual.reviewFlags);
}

function normalizeSearchToken(value: string): string {
  return value.trim().toLowerCase();
}

function rowIsInLibrary(row: Pick<ManageRitualRow, "findable" | "directUseEligible">): boolean {
  return row.findable && row.directUseEligible;
}

function rowHasLibraryStateMismatch(
  row: Pick<ManageRitualRow, "findable" | "directUseEligible">,
): boolean {
  return row.findable !== row.directUseEligible;
}

function hasExplicitChooseWithMeHold(input: {
  holdReasons: readonly string[];
  missingReadiness: readonly string[];
}): boolean {
  return input.holdReasons.includes("recommendation_hold") ||
    input.missingReadiness.includes("recommendation_review");
}

function getLibraryState(input: {
  rowKind: ManageRitualRow["rowKind"];
  findable: boolean;
  directUseEligible: boolean;
  lifecycleState?: string;
}): ManageRitualRow["libraryState"] {
  if (input.rowKind === "edit_draft") {
    return "draft";
  }

  if (input.lifecycleState === "archived") {
    return "archived";
  }

  if (input.findable !== input.directUseEligible) {
    return "state_mismatch";
  }

  return input.findable && input.directUseEligible ? "in_library" : "hidden";
}

function getChooseWithMeState(input: {
  rowKind: ManageRitualRow["rowKind"];
  libraryState: ManageRitualRow["libraryState"];
  recommendationEligible: boolean;
  recommendable: boolean;
  missingReadiness: readonly string[];
  holdReasons: readonly string[];
}): ManageRitualRow["chooseWithMeState"] {
  if (input.rowKind === "edit_draft") {
    if (input.recommendationEligible && input.recommendable) {
      return "allowed";
    }

    if (
      hasExplicitChooseWithMeHold({
        holdReasons: input.holdReasons,
        missingReadiness: input.missingReadiness,
      })
    ) {
      return "held_by_choice";
    }

    return "needs_setup";
  }

  if (input.libraryState === "archived") {
    return "not_available";
  }

  if (input.recommendationEligible && input.recommendable) {
    return "allowed";
  }

  if (
    input.libraryState === "in_library" &&
    hasExplicitChooseWithMeHold({
      holdReasons: input.holdReasons,
      missingReadiness: input.missingReadiness,
    })
  ) {
    return "held_by_choice";
  }

  if (input.libraryState === "in_library") {
    return "needs_setup";
  }

  return "not_available";
}

function getAttentionLabels(input: {
  rowKind: ManageRitualRow["rowKind"];
  libraryState: ManageRitualRow["libraryState"];
  chooseWithMeState: ManageRitualRow["chooseWithMeState"];
  validationFindings: readonly RitualValidationFinding[];
  missingReadiness: readonly string[];
  reviewFlags: readonly string[];
}): string[] {
  const labels: string[] = [];

  if (input.rowKind === "edit_draft") {
    labels.push("Draft");
  }

  if (input.libraryState === "state_mismatch") {
    labels.push("Library state mismatch");
  }

  if (input.validationFindings.length > 0) {
    labels.push("Validation issues");
  }

  if (
    input.validationFindings.some((finding) =>
      /timing/i.test(`${finding.path} ${finding.message}`)
    ) ||
    input.missingReadiness.some((item) => /timing/i.test(item))
  ) {
    labels.push("Timing needs repair");
  }

  if (
    input.reviewFlags.some((flag) => /source/i.test(flag)) ||
    input.missingReadiness.some((item) => /source|packet/i.test(item))
  ) {
    labels.push("Needs source review");
  }

  if (input.chooseWithMeState === "needs_setup") {
    labels.push("Needs recommendation setup");
  }

  return [...new Set(labels)];
}

function createManageSearchText(input: {
  row: Omit<ManageRitualRow, "searchText">;
  holdReasons: readonly string[];
}): string {
  const ritual = input.row.ritual;
  const versionIds = [
    input.row.reviewState.currentVersionId,
    input.row.reviewState.publishedVersionId,
  ].filter((value): value is string => Boolean(value));
  const values = [
    input.row.id,
    input.row.id.split(/[_-]/).slice(-2).join(" "),
    ...versionIds,
    ...versionIds.map((value) => value.slice(-12)),
    input.row.headline,
    input.row.activeDraft?.draftBuffer.presentation.headline,
    input.row.sourceLabel,
    input.row.originLabel,
    input.row.origin,
    input.row.primaryPurpose,
    input.row.primaryCarrier,
    input.row.libraryState,
    input.row.chooseWithMeState.replaceAll("_", " "),
    ...input.row.attentionLabels,
    ...ritual.searchMetadata.tags,
    ...ritual.searchMetadata.keywords,
    ...(ritual.searchMetadata.materials ?? []),
    ...(ritual.searchMetadata.places ?? []),
    ...input.row.missingReadiness,
    ...input.row.reviewFlags,
    ...input.row.validationFindings.flatMap((finding) => [
      finding.path,
      finding.message,
    ]),
    ...input.holdReasons,
  ];

  return values
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .join(" ")
    .toLowerCase();
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

function chooseWithMeSetupBlocker(ritual: Ritual): string | undefined {
  const metadata = ritual.recommendationMetadata;

  if (!metadata) {
    return "Add recommendation metadata before allowing Choose with me.";
  }

  if (!RITUAL_PURPOSES.includes(metadata.purposes?.primary)) {
    return "Choose with me needs a primary purpose.";
  }

  if (!RITUAL_CARRIERS.includes(metadata.carriers?.primary)) {
    return "Choose with me needs a primary carrier.";
  }

  if ((metadata.capacity?.supports.length ?? 0) === 0) {
    return "Choose with me needs at least one capacity support.";
  }

  if ((metadata.audience?.supports.length ?? 0) === 0) {
    return "Choose with me needs at least one audience support.";
  }

  if (
    metadata.timing?.relationship === "required" &&
    (metadata.timing.contexts ?? []).filter((context) =>
      context.trim().length > 0 &&
      !["imperfect timing", "lunar phase", "moon phase", "moon sign", "planetary aspect", "retrograde planet"]
        .includes(context.trim().toLowerCase())
    ).length === 0
  ) {
    return "Required timing needs a concrete supported timing signal.";
  }

  return undefined;
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
  const { ritualDocument, versionDocument, validationSnapshot } = getRitualDbContext(
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
    packetPaths: versionDocument?.provenance.packetPath
      ? [versionDocument.provenance.packetPath]
      : [],
    packetCandidateIds: ritualDocument?.origin.packetCandidateIds ?? [],
    sourceIds: ritualDocument?.origin.sourceIds ?? [],
    sourceLocationLabels: versionDocument?.provenance.sourceLocationLabels ?? [],
    sourceGroundingSummaries: versionDocument?.provenance.sourceGrounding.map(
      (grounding) => `${grounding.citationLabel}: ${grounding.sourceSummary}`,
    ) ?? [],
    moonAndTableAdaptationNotes:
      versionDocument?.provenance.moonAndTableAdaptationNotes ?? [],
    unavailableReason,
  };

  if (unavailableReason || !ritualDocument) {
    const reason = unavailableReason ?? "Review actions are unavailable.";

    return {
      ...baseState,
      actions: [
        createBlockedAction("promote_direct_use", "Show in library", "Make this Ritual available in Search and direct selection. Recommendation review stays separate.", reason, false),
        createBlockedAction("promote_recommendation", "Allow in Choose with me", "Allow Choose with me to recommend this Ritual after direct use and validation are clear.", reason, false),
        createBlockedAction("hold_recommendation", "Hold from Choose with me", "Keep Search and direct selection available, but stop Choose with me from offering it.", reason, true, "caution"),
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
  const recommendationSetupBlocker = chooseWithMeSetupBlocker(input.ritual);
  const recommendationPromotionBlocker = !input.directUseEligible
    ? "Show this Ritual in the library before allowing Choose with me."
    : recommendationSetupBlocker
      ? recommendationSetupBlocker
    : unresolvedRecommendationReadiness.length > 0
      ? `Resolve ${unresolvedRecommendationReadiness.join(", ")} before allowing Choose with me.`
      : directUsePromotionBlocker;
  const isArchived = ritualDocument.lifecycle.state === "archived";

  return {
    ...baseState,
    actions: [
      createActionOption({
        action: "promote_direct_use",
        label: "Show in library",
        description: "Make this Ritual available in Search and direct selection. Recommendation review stays separate.",
        enabled: !input.directUseEligible && !directUsePromotionBlocker,
        disabledReason: input.directUseEligible
          ? "This Ritual is already shown in the library."
          : directUsePromotionBlocker,
        requiresReason: false,
      }),
      createActionOption({
        action: "hold_direct_use",
        label: "Hide from library",
        description: "Keep the Ritual visible in Manage, but remove it from Search, direct selection, and recommendations.",
        enabled: input.directUseEligible && !isArchived,
        disabledReason: isArchived
          ? "Archived Rituals are already unavailable."
          : "This Ritual is already hidden from the library.",
        requiresReason: true,
        tone: "caution",
      }),
      createActionOption({
        action: "promote_recommendation",
        label: "Allow in Choose with me",
        description: "Allow Choose with me to recommend this Ritual after direct use and validation are clear.",
        enabled: !input.recommendable && !recommendationPromotionBlocker,
        disabledReason: input.recommendable
          ? "Choose with me can already offer this Ritual."
          : recommendationPromotionBlocker,
        requiresReason: false,
      }),
      createActionOption({
        action: "hold_recommendation",
        label: "Hold from Choose with me",
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
  const rawStatus = filters?.status ?? defaultManageRitualFilters.status;
  const status = rawStatus === "draft" || rawStatus === "pilot"
    ? "active_draft"
    : rawStatus === "reviewed"
      ? "in_library"
      : rawStatus === "recommendable"
        ? "choose_with_me"
        : rawStatus;
  const origin = filters?.origin ?? defaultManageRitualFilters.origin;
  const rawAvailability = String(
    filters?.availability ?? defaultManageRitualFilters.availability,
  );
  const availability = rawAvailability === "findable" ||
      rawAvailability === "direct_use"
    ? "in_library"
    : rawAvailability === "recommendation_eligible" ||
        rawAvailability === "recommendable"
      ? "allowed_choose_with_me"
      : rawAvailability;
  const rawReadiness = String(
    filters?.readiness ?? defaultManageRitualFilters.readiness,
  );
  const readiness = rawReadiness === "recommendation_ready" ? "all" : rawReadiness;
  const validation = filters?.validation ?? defaultManageRitualFilters.validation;
  const shortcut = filters?.shortcut ?? defaultManageRitualFilters.shortcut;
  const purpose = filters?.purpose ?? defaultManageRitualFilters.purpose;
  const carrier = filters?.carrier ?? defaultManageRitualFilters.carrier;
  const source = filters?.source ?? defaultManageRitualFilters.source;
  const sort = filters?.sort ?? defaultManageRitualFilters.sort;
  const direction = filters?.direction ?? defaultManageRitualFilters.direction;

  return {
    query: filters?.query?.trim() ?? "",
    status: MANAGE_RITUAL_VIEW_FILTERS.includes(status as ManageRitualViewFilter) ||
        RITUAL_STATUSES.includes(status as RitualStatus)
      ? status
      : "all",
    origin: MANAGE_RITUAL_ORIGIN_FILTERS.includes(origin) ? origin : "all",
    availability: MANAGE_RITUAL_AVAILABILITY_FILTERS.includes(
        availability as ManageRitualAvailabilityFilter,
      )
      ? availability as ManageRitualAvailabilityFilter
      : "all",
    readiness: MANAGE_RITUAL_READINESS_FILTERS.includes(
        readiness as ManageRitualReadinessFilter,
      )
      ? readiness as ManageRitualReadinessFilter
      : "all",
    validation: MANAGE_RITUAL_VALIDATION_FILTERS.includes(validation)
      ? validation
      : "all",
    shortcut: MANAGE_RITUAL_SHORTCUT_FILTERS.includes(shortcut)
      ? shortcut
      : "all",
    purpose: purpose === "all" || RITUAL_PURPOSES.includes(purpose)
      ? purpose
      : "all",
    carrier: carrier === "all" || RITUAL_CARRIERS.includes(carrier)
      ? carrier
      : "all",
    source,
    sort: MANAGE_RITUAL_SORT_KEYS.includes(sort) ? sort : "headline",
    direction: direction === "desc" ? "desc" : "asc",
  };
}

function rowMatchesFilters(row: ManageRitualRow, filters: ManageRitualFilters): boolean {
  const inLibrary = rowIsInLibrary(row);
  const stateMismatch = rowHasLibraryStateMismatch(row);
  const allowedChooseWithMe = row.chooseWithMeState === "allowed";
  const needsAttention = row.attentionLabels.length > 0;
  const queryTokens = normalizeSearchToken(filters.query)
    .split(/\s+/)
    .filter(Boolean);

  if (
    filters.status === "active_draft" &&
    row.rowKind !== "edit_draft" &&
    !row.activeDraft
  ) {
    return false;
  }

  if (filters.status === "in_library" && !inLibrary) {
    return false;
  }

  if (filters.status === "choose_with_me" && !allowedChooseWithMe) {
    return false;
  }

  if (filters.status === "needs_attention" && !needsAttention) {
    return false;
  }

  if (filters.status === "archived" && row.libraryState !== "archived") {
    return false;
  }

  if (
    !MANAGE_RITUAL_VIEW_FILTERS.includes(filters.status as ManageRitualViewFilter) &&
    row.status !== filters.status
  ) {
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

  if (filters.purpose !== "all" && row.primaryPurpose !== filters.purpose) {
    return false;
  }

  if (filters.carrier !== "all" && row.primaryCarrier !== filters.carrier) {
    return false;
  }

  if (filters.availability === "in_library" && !inLibrary) {
    return false;
  }

  if (filters.availability === "hidden_from_library" && inLibrary) {
    return false;
  }

  if (filters.availability === "allowed_choose_with_me" && !allowedChooseWithMe) {
    return false;
  }

  if (
    filters.availability === "held_choose_with_me" &&
    row.chooseWithMeState !== "held_by_choice"
  ) {
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

  if (filters.validation === "valid" && row.validationFindings.length > 0) {
    return false;
  }

  if (filters.validation === "findings" && row.validationFindings.length === 0) {
    return false;
  }

  if (
    filters.shortcut === "active_draft" &&
    row.rowKind !== "edit_draft" &&
    !row.activeDraft
  ) {
    return false;
  }

  if (
    filters.shortcut === "validation_issues" &&
    row.validationFindings.length === 0
  ) {
    return false;
  }

  if (
    filters.shortcut === "timing_repair" &&
    !row.attentionLabels.includes("Timing needs repair")
  ) {
    return false;
  }

  if (
    filters.shortcut === "source_review" &&
    !row.attentionLabels.includes("Needs source review")
  ) {
    return false;
  }

  if (
    filters.shortcut === "recommendation_setup" &&
    row.chooseWithMeState !== "needs_setup"
  ) {
    return false;
  }

  if (
    filters.shortcut === "held_choose_with_me" &&
    row.chooseWithMeState !== "held_by_choice"
  ) {
    return false;
  }

  if (filters.shortcut === "state_mismatch" && !stateMismatch) {
    return false;
  }

  if (
    queryTokens.length > 0 &&
    !queryTokens.every((token) => row.searchText.includes(token))
  ) {
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

function firstAllowedValue<const T extends readonly string[]>(
  allowed: T,
  value: unknown,
): T[number] {
  return typeof value === "string" && allowed.includes(value)
    ? value
    : allowed[0];
}

function allowedList<const T extends readonly string[]>(
  allowed: T,
  values: unknown,
): T[number][] {
  return Array.isArray(values)
    ? values.filter((value): value is T[number] =>
      typeof value === "string" && allowed.includes(value)
    )
    : [];
}

function createDraftReviewState(input: {
  dbBacked: boolean;
  draft: RitualEditDraftDocument;
}): ManageRitualReviewState {
  return {
    dbBacked: input.dbBacked,
    lifecycleState: "draft",
    currentVersionId: input.draft.baseVersionId,
    publishedVersionId: undefined,
    latestValidationSnapshotId: undefined,
    validationSnapshotValid: undefined,
    holdReasons: [],
    sourceRunIds: [],
    importBatchIds: [],
    packetPaths: [],
    packetCandidateIds: [],
    sourceIds: [],
    sourceLocationLabels: [],
    sourceGroundingSummaries: [],
    moonAndTableAdaptationNotes: [],
    unavailableReason: "Add this draft to the library before availability actions are available.",
    actions: [],
  };
}

function createDraftManageRitualRow(input: {
  draft: RitualEditDraftDocument;
  dbBacked: boolean;
}): ManageRitualRow {
  const draft = input.draft;
  const draftBuffer = draft.draftBuffer;
  const primaryPurpose = firstAllowedValue(
    RITUAL_PURPOSES,
    draftBuffer.recommendationMetadata?.purposes?.primary,
  );
  const primaryCarrier = firstAllowedValue(
    RITUAL_CARRIERS,
    draftBuffer.recommendationMetadata?.carriers?.primary,
  );
  const capacity = allowedList(
    RITUAL_CAPACITY_MODES,
    draftBuffer.recommendationMetadata?.capacity?.supports,
  );
  const audience = allowedList(
    RITUAL_AUDIENCES,
    draftBuffer.recommendationMetadata?.audience?.supports,
  );
  const timingRelationship = firstAllowedValue(
    RITUAL_TIMING_RELATIONSHIPS,
    draftBuffer.recommendationMetadata?.timing?.relationship,
  );
  const missingReadiness =
    draftBuffer.recommendationMetadata?.eligibility?.missing ?? [];
  const findable = draftBuffer.availability?.findable ?? false;
  const directUseEligible = draftBuffer.availability?.directUseEligible ?? false;
  const recommendationEligible =
    draftBuffer.availability?.recommendationEligible ?? false;
  const recommendable =
    draftBuffer.recommendationMetadata?.eligibility?.recommendable ?? false;
  const status = firstAllowedValue(RITUAL_STATUSES, draftBuffer.status);
  const origin = draftBuffer.origin.type;
  const libraryState = getLibraryState({
    rowKind: "edit_draft",
    findable,
    directUseEligible,
  });
  const chooseWithMeState = getChooseWithMeState({
    rowKind: "edit_draft",
    libraryState,
    recommendationEligible,
    recommendable,
    missingReadiness,
    holdReasons: [],
  });
  const validationFindings = validateRitualEditDraft(draft).findings.map(
    (finding): RitualValidationFinding => ({
      ritualId: draft.ritualId,
      path: finding.path,
      message: finding.message,
    }),
  );
  const reviewFlags = getReviewFlagLabels(draftBuffer.reviewFlags);
  const attentionLabels = getAttentionLabels({
    rowKind: "edit_draft",
    libraryState,
    chooseWithMeState,
    validationFindings,
    missingReadiness,
    reviewFlags,
  });
  const ritual: Ritual = {
    id: draft.ritualId,
    status,
    origin: draftBuffer.origin,
    presentation: {
      ...draftBuffer.presentation,
      whyThisFits: "Generated after Choose with me.",
    },
    recommendationMetadata: {
      purposes: {
        primary: primaryPurpose,
        secondary: allowedList(
          RITUAL_PURPOSES,
          draftBuffer.recommendationMetadata?.purposes?.secondary,
        ).filter((purpose) => purpose !== primaryPurpose),
        refinement: "",
      },
      carriers: {
        primary: primaryCarrier,
        secondary: allowedList(
          RITUAL_CARRIERS,
          draftBuffer.recommendationMetadata?.carriers?.secondary,
        ).filter((carrier) => carrier !== primaryCarrier),
      },
      capacity: {
        supports: capacity,
        default: capacity[0],
      },
      audience: {
        supports: audience,
        default: audience[0],
        bothOfUsStructure:
          draftBuffer.recommendationMetadata?.audience?.bothOfUsStructure,
      },
      timing: {
        relationship: timingRelationship,
        contexts: draftBuffer.recommendationMetadata?.timing?.contexts ?? [],
      },
      eligibility: {
        recommendable,
        missing: missingReadiness,
        notFor: draftBuffer.recommendationMetadata?.eligibility?.notFor ?? [],
      },
    },
    searchMetadata: {
      tags: draftBuffer.searchMetadata?.tags ?? [],
      keywords: draftBuffer.searchMetadata?.keywords ?? [],
      materials: draftBuffer.searchMetadata?.materials ?? [],
      places: draftBuffer.searchMetadata?.places ?? [],
      sourceLabel: draftBuffer.searchMetadata?.sourceLabel,
      originLabel: draftBuffer.searchMetadata?.originLabel ?? "Household draft",
    },
    availability: {
      findable,
      directUseEligible,
      recommendationEligible,
    },
    ritualWords: draftBuffer.ritualWords,
    reviewFlags: draftBuffer.reviewFlags,
    adaptationPolicy: draftBuffer.adaptationPolicy,
  };
  const headline = draftBuffer.presentation.headline.trim() || "Untitled Ritual";
  const reviewState = createDraftReviewState({ dbBacked: input.dbBacked, draft });
  const sourceLabels = getRitualSourceLabels(ritual);

  const row: ManageRitualRow = {
    rowKind: "edit_draft",
    ritual,
    activeDraft: draft,
    id: draft.ritualId,
    headline,
    status,
    origin,
    findable,
    directUseEligible,
    recommendationEligible,
    recommendable,
    primaryPurpose,
    primaryCarrier,
    audience,
    capacity,
    reviewFlags,
    validationFindings,
    missingReadiness,
    issues: [...new Set([
      ...missingReadiness,
      ...validationFindings.map((finding) => finding.path),
      ...attentionLabels,
    ])],
    libraryState,
    chooseWithMeState,
    attentionLabels,
    searchText: "",
    sourceLabel: ritual.searchMetadata.sourceLabel,
    originLabel: ritual.searchMetadata.originLabel,
    sourceValues: sourceLabels.map(getRitualSourceFilterValue),
    reviewState,
  };
  row.searchText = createManageSearchText({ row, holdReasons: [] });

  return row;
}

export function createManageRitualsViewModel(
  rituals: Ritual[],
  filterOverrides?: Partial<ManageRitualFilters>,
  options?: CreateManageRitualsViewModelOptions,
): ManageRitualsViewModel {
  const filters = normalizeFilters(filterOverrides);
  const validation = validateRituals(rituals);
  const findingsByRitualId = new Map<string, RitualValidationFinding[]>();
  const activeDrafts =
    options?.activeDrafts?.filter((draft) => draft.status === "active") ?? [];
  const activeDraftByRitualId = new Map(
    activeDrafts.map((draft) => [draft.ritualId, draft]),
  );
  const ritualIds = new Set(rituals.map((ritual) => ritual.id));

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

    const reviewState = createReviewState({
      ritual,
      directUseEligible,
      recommendable,
      missingReadiness,
      reviewFlags,
      validationFindings,
      options,
    });
    const libraryState = getLibraryState({
      rowKind: "published",
      findable,
      directUseEligible,
      lifecycleState: reviewState.lifecycleState,
    });
    const chooseWithMeState = getChooseWithMeState({
      rowKind: "published",
      libraryState,
      recommendationEligible,
      recommendable,
      missingReadiness,
      holdReasons: reviewState.holdReasons,
    });
    const attentionLabels = getAttentionLabels({
      rowKind: "published",
      libraryState,
      chooseWithMeState,
      validationFindings,
      missingReadiness,
      reviewFlags,
    });
    const row: ManageRitualRow = {
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
        ...attentionLabels,
      ])],
      libraryState,
      chooseWithMeState,
      attentionLabels,
      searchText: "",
      sourceLabel: sourceLabels[0],
      originLabel: ritual.searchMetadata.originLabel,
      sourceValues: sourceLabels.map(getRitualSourceFilterValue),
      reviewState,
      rowKind: "published" as const,
      activeDraft: activeDraftByRitualId.get(ritual.id),
    };
    row.searchText = createManageSearchText({
      row,
      holdReasons: reviewState.holdReasons,
    });

    return row;
  });
  const standaloneDraftRows = activeDrafts
    .filter((draft) => !ritualIds.has(draft.ritualId))
    .map((draft) =>
      createDraftManageRitualRow({
        draft,
        dbBacked: options?.dbBacked === true,
      })
    );
  const allRows = [...rows, ...standaloneDraftRows];
  const sourceOptions = getRitualSourceOptions(allRows.map((row) => row.ritual));

  const byStatus = emptyStatusCounts();
  const byOrigin = { source: 0, household: 0 };

  for (const row of allRows) {
    byStatus[row.status] += 1;
    byOrigin[row.origin] += 1;
  }

  const filteredRows = sortManageRows(
    allRows.filter((row) => rowMatchesFilters(row, filters)),
    filters,
  );

  return {
    total: rows.length,
    activeDraftTotal: activeDrafts.length,
    filteredTotal: filteredRows.length,
    counts: {
      byStatus,
      byOrigin,
      findable: allRows.filter((row) => row.findable).length,
      directUseEligible: allRows.filter((row) => row.directUseEligible).length,
      inLibrary: allRows.filter((row) => row.libraryState === "in_library").length,
      recommendationEligible: allRows.filter((row) => row.recommendationEligible)
        .length,
      recommendable: allRows.filter((row) => row.recommendable).length,
      allowedChooseWithMe: allRows.filter((row) =>
        row.chooseWithMeState === "allowed"
      ).length,
      needsAttention: allRows.filter((row) => row.attentionLabels.length > 0)
        .length,
      withValidationFindings: allRows.filter(
        (row) => row.validationFindings.length > 0,
      ).length,
      withMissingReadiness: allRows.filter(
        (row) => row.missingReadiness.length > 0,
      ).length,
    },
    filters,
    sourceOptions,
    rows: filteredRows,
  };
}
