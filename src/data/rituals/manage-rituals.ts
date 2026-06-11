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
    const missingReadiness =
      ritual.recommendationMetadata.eligibility.missing ?? [];

    const sourceLabels = getRitualSourceLabels(ritual);

    return {
      ritual,
      id: ritual.id,
      headline: ritual.presentation.headline,
      status: ritual.status,
      origin: ritual.origin.type,
      findable: ritual.availability.findable,
      directUseEligible: ritual.availability.directUseEligible,
      recommendationEligible: ritual.availability.recommendationEligible,
      recommendable: ritual.recommendationMetadata.eligibility.recommendable,
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
