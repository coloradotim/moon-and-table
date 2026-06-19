import type {
  RitualDbValidationFinding,
  RitualDbValidationResult,
} from "./db-documents.js";
import type {
  RitualEditDraftDocument,
  RitualEditDraftBuffer,
} from "./ritual-edit-drafts.js";
import {
  RITUAL_AUDIENCES,
  RITUAL_CAPACITY_MODES,
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  RITUAL_STATUSES,
  RITUAL_TIMING_RELATIONSHIPS,
  type Ritual,
} from "./types.js";
import { validateRitual } from "./validate-rituals.js";

export const RITUAL_EDIT_DRAFT_VALIDATION_SECTIONS = [
  "status",
  "body",
  "fit",
  "search",
  "provenance",
  "review",
  "versions",
  "debug",
  "other",
] as const;

export type RitualEditDraftValidationSection =
  (typeof RITUAL_EDIT_DRAFT_VALIDATION_SECTIONS)[number];

export type RitualEditDraftValidationField =
  | "headline"
  | "practice"
  | "intention"
  | "bestWindow"
  | "questionToCarry"
  | "primaryPurpose"
  | "secondaryPurposes"
  | "primaryCarrier"
  | "secondaryCarriers"
  | "capacitySupports"
  | "capacityDefault"
  | "audienceSupports"
  | "audienceDefault"
  | "bothOfUsStructure"
  | "timingRelationship"
  | "timingContexts"
  | "recommendationMissing"
  | "recommendationNotFor"
  | "searchTags"
  | "searchKeywords"
  | "searchMaterials"
  | "searchPlaces";

export type RitualEditDraftValidationFinding = RitualDbValidationFinding & {
  section: RitualEditDraftValidationSection;
  field?: RitualEditDraftValidationField;
  unsafeContentHidden?: boolean;
};

export type RitualEditDraftValidationSectionSummary = {
  section: RitualEditDraftValidationSection;
  errors: number;
  warnings: number;
};

export type RitualEditDraftValidationReport = Omit<RitualDbValidationResult, "findings"> & {
  findings: RitualEditDraftValidationFinding[];
  summaryLabel: string;
  errorCount: number;
  warningCount: number;
  sectionSummaries: RitualEditDraftValidationSectionSummary[];
};

const REQUIRED_BODY_FIELDS = [
  "headline",
  "practice",
  "intention",
  "bestWindow",
  "questionToCarry",
] as const satisfies readonly RitualEditDraftValidationField[];

const BODY_FIELD_PATHS: Record<
  Extract<
    RitualEditDraftValidationField,
    "headline" | "practice" | "intention" | "bestWindow" | "questionToCarry"
  >,
  string
> = {
  headline: "draftBuffer.presentation.headline",
  practice: "draftBuffer.presentation.practice",
  intention: "draftBuffer.presentation.intention",
  bestWindow: "draftBuffer.presentation.bestWindow",
  questionToCarry: "draftBuffer.presentation.questionToCarry",
};

const FIELD_PATH_PREFIXES: Array<{
  field: RitualEditDraftValidationField;
  prefixes: string[];
}> = [
  { field: "primaryPurpose", prefixes: ["draftBuffer.recommendationMetadata.purposes.primary"] },
  { field: "secondaryPurposes", prefixes: ["draftBuffer.recommendationMetadata.purposes.secondary"] },
  { field: "primaryCarrier", prefixes: ["draftBuffer.recommendationMetadata.carriers.primary"] },
  { field: "secondaryCarriers", prefixes: ["draftBuffer.recommendationMetadata.carriers.secondary"] },
  { field: "capacitySupports", prefixes: ["draftBuffer.recommendationMetadata.capacity.supports"] },
  { field: "capacityDefault", prefixes: ["draftBuffer.recommendationMetadata.capacity.default"] },
  { field: "audienceSupports", prefixes: ["draftBuffer.recommendationMetadata.audience.supports"] },
  { field: "audienceDefault", prefixes: ["draftBuffer.recommendationMetadata.audience.default"] },
  { field: "bothOfUsStructure", prefixes: ["draftBuffer.recommendationMetadata.audience.bothOfUsStructure"] },
  { field: "timingRelationship", prefixes: ["draftBuffer.recommendationMetadata.timing.relationship"] },
  { field: "timingContexts", prefixes: ["draftBuffer.recommendationMetadata.timing.contexts"] },
  { field: "recommendationMissing", prefixes: ["draftBuffer.recommendationMetadata.eligibility.missing"] },
  { field: "recommendationNotFor", prefixes: ["draftBuffer.recommendationMetadata.eligibility.notFor"] },
  { field: "searchTags", prefixes: ["draftBuffer.searchMetadata.tags"] },
  { field: "searchKeywords", prefixes: ["draftBuffer.searchMetadata.keywords"] },
  { field: "searchMaterials", prefixes: ["draftBuffer.searchMetadata.materials"] },
  { field: "searchPlaces", prefixes: ["draftBuffer.searchMetadata.places"] },
];

const PRIVATE_OR_SOURCE_RESIDUE_KEYS = new Set([
  "birthData",
  "birthDate",
  "birthPlace",
  "birthTime",
  "copiedPassage",
  "copiedPassages",
  "copiedSourceText",
  "debugPrompt",
  "email",
  "extractedSourceText",
  "natalPlacements",
  "ocrText",
  "pageImage",
  "pageImages",
  "privateArtifactPath",
  "privateProfile",
  "privateProfileDetails",
  "privateSourceExcerpt",
  "privateSourceText",
  "rawExtractionTranscript",
  "rawSourceExcerpt",
  "rawSourceText",
  "realName",
  "relationshipDetails",
  "schedule",
  "sourceExcerpt",
  "sourceNotes",
]);

const ALLOWED_DRAFT_BUFFER_TOP_LEVEL_KEYS = new Set([
  "adaptationPolicy",
  "availability",
  "id",
  "origin",
  "presentation",
  "recommendationMetadata",
  "reviewFlags",
  "ritualWords",
  "searchMetadata",
  "status",
]);

const BROAD_TIMING_CONTEXT_LABELS = new Set([
  "imperfect timing",
  "lunar phase",
  "moon phase",
  "moon sign",
  "planetary aspect",
  "retrograde planet",
]);

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function includesValue<const T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeRuntimePath(path: string): string {
  return path.startsWith("draftBuffer.") ? path : `draftBuffer.${path}`;
}

function mapPathToField(path: string): RitualEditDraftValidationField | undefined {
  const normalized = normalizeRuntimePath(path);

  const bodyField = REQUIRED_BODY_FIELDS.find((field) =>
    normalized === BODY_FIELD_PATHS[field] ||
    normalized === `draftBuffer.presentation.${field}`,
  );

  if (bodyField) {
    return bodyField;
  }

  return FIELD_PATH_PREFIXES.find((mapping) =>
    mapping.prefixes.some((prefix) =>
      normalized === prefix || normalized.startsWith(`${prefix}.`)
    )
  )?.field;
}

function mapPathToSection(path: string): RitualEditDraftValidationSection {
  const normalized = normalizeRuntimePath(path);

  if (
    REQUIRED_BODY_FIELDS.some((field) =>
      normalized === BODY_FIELD_PATHS[field] ||
      normalized === `draftBuffer.presentation.${field}`
    )
  ) {
    return "body";
  }

  if (
    normalized === "draftBuffer.id" ||
    normalized === "draftBuffer.status" ||
    normalized.startsWith("draftBuffer.availability")
  ) {
    return "status";
  }

  if (normalized.startsWith("draftBuffer.recommendationMetadata")) {
    return "fit";
  }

  if (normalized.startsWith("draftBuffer.searchMetadata")) {
    return "search";
  }

  if (
    normalized.startsWith("draftBuffer.origin") ||
    normalized.startsWith("draftBuffer.ritualWords")
  ) {
    return "provenance";
  }

  if (
    normalized.startsWith("draftBuffer.reviewFlags") ||
    normalized.startsWith("draftBuffer.adaptationPolicy")
  ) {
    return "review";
  }

  return "other";
}

function finding(input: {
  path: string;
  message: string;
  severity?: RitualDbValidationFinding["severity"];
  unsafeContentHidden?: boolean;
}): RitualEditDraftValidationFinding {
  const section = mapPathToSection(input.path);

  return {
    path: input.path,
    message: input.message,
    severity: input.severity ?? "error",
    section,
    field: mapPathToField(input.path),
    unsafeContentHidden: input.unsafeContentHidden,
  };
}

function hasUnsafeKeyShape(key: string): boolean {
  if (PRIVATE_OR_SOURCE_RESIDUE_KEYS.has(key)) {
    return true;
  }

  return /private|rawsource|sourcetext|sourceexcerpt|ocr|pageimage|transcript|realname|birth|relationshipdetails|email|schedule/i
    .test(key);
}

function findUnsafePayloadKeys(value: unknown, path = "draftBuffer"): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findUnsafePayloadKeys(item, `${path}.${index}`));
  }

  if (!isObject(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, nested]) => {
    const nestedPath = `${path}.${key}`;
    const current = hasUnsafeKeyShape(key) ? [nestedPath] : [];

    return [...current, ...findUnsafePayloadKeys(nested, nestedPath)];
  });
}

function createRuntimeRitualFromDraftBuffer(
  draftBuffer: RitualEditDraftBuffer,
): Ritual {
  return {
    id: draftBuffer.id,
    status: draftBuffer.status ?? "draft",
    origin: cloneJson(draftBuffer.origin),
    presentation: {
      ...cloneJson(draftBuffer.presentation),
      whyThisFits: "Draft validation placeholder.",
    },
    recommendationMetadata: cloneJson(draftBuffer.recommendationMetadata ?? {}),
    searchMetadata: cloneJson(draftBuffer.searchMetadata ?? {}),
    availability: cloneJson(draftBuffer.availability ?? {}),
    ritualWords: draftBuffer.ritualWords ? cloneJson(draftBuffer.ritualWords) : undefined,
    reviewFlags: draftBuffer.reviewFlags ? cloneJson(draftBuffer.reviewFlags) : undefined,
    adaptationPolicy: draftBuffer.adaptationPolicy
      ? cloneJson(draftBuffer.adaptationPolicy)
      : undefined,
  } as Ritual;
}

function createSummaryLabel(errorCount: number, warningCount: number): string {
  if (errorCount === 0 && warningCount === 0) {
    return "Validation clean";
  }

  const pieces: string[] = [];

  if (errorCount > 0) {
    pieces.push(`${errorCount} blocking issue${errorCount === 1 ? "" : "s"}`);
  }

  if (warningCount > 0) {
    pieces.push(`${warningCount} warning${warningCount === 1 ? "" : "s"}`);
  }

  return pieces.join(", ");
}

function createReport(
  findings: RitualEditDraftValidationFinding[],
): RitualEditDraftValidationReport {
  const errorCount = findings.filter((item) => item.severity === "error").length;
  const warningCount = findings.filter((item) => item.severity === "warning").length;

  return {
    valid: errorCount === 0,
    findings,
    summaryLabel: createSummaryLabel(errorCount, warningCount),
    errorCount,
    warningCount,
    sectionSummaries: RITUAL_EDIT_DRAFT_VALIDATION_SECTIONS.map((section) => ({
      section,
      errors: findings.filter((item) =>
        item.section === section && item.severity === "error"
      ).length,
      warnings: findings.filter((item) =>
        item.section === section && item.severity === "warning"
      ).length,
    })),
  };
}

function validateStringList(input: {
  value: unknown;
  path: string;
  findings: RitualEditDraftValidationFinding[];
  required?: boolean;
}): void {
  if (!Array.isArray(input.value)) {
    input.findings.push(finding({
      path: input.path,
      message: "List field must be an array.",
    }));
    return;
  }

  const seen = new Set<string>();
  input.value.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      input.findings.push(finding({
        path: `${input.path}.${index}`,
        message: "List values must be non-empty strings.",
      }));
      return;
    }

    const normalized = item.trim();
    if (seen.has(normalized)) {
      input.findings.push(finding({
        path: `${input.path}.${index}`,
        message: "Duplicate list value will be collapsed on save.",
        severity: "warning",
      }));
    }
    seen.add(normalized);
  });

  if (input.required && input.value.length === 0) {
    input.findings.push(finding({
      path: input.path,
      message: "At least one value is required.",
    }));
  }
}

function validateEnumList<const T extends readonly string[]>(input: {
  value: unknown;
  allowed: T;
  path: string;
  findings: RitualEditDraftValidationFinding[];
  required?: boolean;
}): void {
  validateStringList(input);

  if (!Array.isArray(input.value)) {
    return;
  }

  input.value.forEach((item, index) => {
    if (!includesValue(input.allowed, item)) {
      input.findings.push(finding({
        path: `${input.path}.${index}`,
        message: "Value is not supported by the current Ritual metadata model.",
      }));
    }
  });

  if (input.required && input.value.length === 0) {
    input.findings.push(finding({
      path: input.path,
      message: "At least one supported value is required.",
    }));
  }
}

function validateDraftSelectionMetadata(
  draftBuffer: RitualEditDraftBuffer,
  findings: RitualEditDraftValidationFinding[],
): void {
  const metadata = draftBuffer.recommendationMetadata;

  if (!metadata) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata",
      message: "Recommendation metadata is required before this draft can publish.",
    }));
    return;
  }

  if (!includesValue(RITUAL_PURPOSES, metadata.purposes?.primary)) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata.purposes.primary",
      message: "Primary purpose must use a supported Ritual purpose.",
    }));
  }

  validateEnumList({
    value: metadata.purposes?.secondary ?? [],
    allowed: RITUAL_PURPOSES,
    path: "draftBuffer.recommendationMetadata.purposes.secondary",
    findings,
  });

  if (metadata.purposes?.secondary?.includes(metadata.purposes.primary)) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata.purposes.secondary",
      message: "Secondary purposes should not repeat the primary purpose.",
      severity: "warning",
    }));
  }

  if (!includesValue(RITUAL_CARRIERS, metadata.carriers?.primary)) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata.carriers.primary",
      message: "Primary carrier must use a supported Ritual carrier.",
    }));
  }

  validateEnumList({
    value: metadata.carriers?.secondary ?? [],
    allowed: RITUAL_CARRIERS,
    path: "draftBuffer.recommendationMetadata.carriers.secondary",
    findings,
  });

  if (metadata.carriers?.secondary?.includes(metadata.carriers.primary)) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata.carriers.secondary",
      message: "Secondary carriers should not repeat the primary carrier.",
      severity: "warning",
    }));
  }

  validateEnumList({
    value: metadata.capacity?.supports ?? [],
    allowed: RITUAL_CAPACITY_MODES,
    path: "draftBuffer.recommendationMetadata.capacity.supports",
    findings,
    required: true,
  });

  if (
    metadata.capacity?.default &&
    !includesValue(RITUAL_CAPACITY_MODES, metadata.capacity.default)
  ) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata.capacity.default",
      message: "Default capacity must use a supported value.",
    }));
  }

  validateEnumList({
    value: metadata.audience?.supports ?? [],
    allowed: RITUAL_AUDIENCES,
    path: "draftBuffer.recommendationMetadata.audience.supports",
    findings,
    required: true,
  });

  if (
    metadata.audience?.default &&
    !includesValue(RITUAL_AUDIENCES, metadata.audience.default)
  ) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata.audience.default",
      message: "Default audience must use a supported value.",
    }));
  }

  if (!includesValue(RITUAL_TIMING_RELATIONSHIPS, metadata.timing?.relationship)) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata.timing.relationship",
      message: "Timing relationship must use a supported value.",
    }));
  }

  validateStringList({
    value: metadata.timing?.contexts ?? [],
    path: "draftBuffer.recommendationMetadata.timing.contexts",
    findings,
  });

  if (Array.isArray(metadata.timing?.contexts)) {
    metadata.timing.contexts.forEach((context, index) => {
      if (
        typeof context === "string" &&
        BROAD_TIMING_CONTEXT_LABELS.has(context.trim().toLowerCase())
      ) {
        findings.push(finding({
          path: `draftBuffer.recommendationMetadata.timing.contexts.${index}`,
          message:
            "Use a specific timing signal, not a broad bucket. Examples: new moon, full moon, waxing moon, moon in Cancer, Mercury retrograde.",
          severity: "warning",
        }));
      }
    });
  }

  validateStringList({
    value: metadata.eligibility?.missing ?? [],
    path: "draftBuffer.recommendationMetadata.eligibility.missing",
    findings,
  });
  validateStringList({
    value: metadata.eligibility?.notFor ?? [],
    path: "draftBuffer.recommendationMetadata.eligibility.notFor",
    findings,
  });
}

function validateDraftSearchMetadata(
  draftBuffer: RitualEditDraftBuffer,
  findings: RitualEditDraftValidationFinding[],
): void {
  const metadata = draftBuffer.searchMetadata;

  if (!metadata) {
    findings.push(finding({
      path: "draftBuffer.searchMetadata",
      message: "Search metadata is required before this draft can publish.",
    }));
    return;
  }

  validateStringList({
    value: metadata.tags ?? [],
    path: "draftBuffer.searchMetadata.tags",
    findings,
    required: true,
  });
  validateStringList({
    value: metadata.keywords ?? [],
    path: "draftBuffer.searchMetadata.keywords",
    findings,
  });
  validateStringList({
    value: metadata.materials ?? [],
    path: "draftBuffer.searchMetadata.materials",
    findings,
  });
  validateStringList({
    value: metadata.places ?? [],
    path: "draftBuffer.searchMetadata.places",
    findings,
  });
}

export function validateRitualEditDraft(
  draft: RitualEditDraftDocument,
): RitualEditDraftValidationReport {
  const findings: RitualEditDraftValidationFinding[] = [];

  if (draft.draftBuffer.id !== draft.ritualId) {
    findings.push(finding({
      path: "draftBuffer.id",
      message: "Draft buffer Ritual id must match the draft document.",
    }));
  }

  if (!isNonEmptyString(draft.draftBuffer.status) ||
    !RITUAL_STATUSES.includes(draft.draftBuffer.status)) {
    findings.push(finding({
      path: "draftBuffer.status",
      message: "Draft Ritual status is invalid.",
    }));
  }

  for (const key of Object.keys(draft.draftBuffer)) {
    if (!ALLOWED_DRAFT_BUFFER_TOP_LEVEL_KEYS.has(key) && !hasUnsafeKeyShape(key)) {
      findings.push(finding({
        path: `draftBuffer.${key}`,
        message: "Draft buffer contains an unsupported top-level field.",
      }));
    }
  }

  for (const field of REQUIRED_BODY_FIELDS) {
    if (!isNonEmptyString(draft.draftBuffer.presentation?.[field])) {
      findings.push(finding({
        path: BODY_FIELD_PATHS[field],
        message: "Required Ritual body field is missing.",
      }));
    }
  }

  validateDraftSelectionMetadata(draft.draftBuffer, findings);
  validateDraftSearchMetadata(draft.draftBuffer, findings);

  const runtimeValidation = validateRitual(
    createRuntimeRitualFromDraftBuffer(draft.draftBuffer),
  );
  for (const runtimeFinding of runtimeValidation.findings) {
    if (runtimeFinding.path === "presentation.whyThisFits") {
      continue;
    }

    const path = normalizeRuntimePath(runtimeFinding.path);
    if (mapPathToField(path)) {
      continue;
    }

    if (
      findings.some((item) =>
        item.path === path &&
        item.message === runtimeFinding.message &&
        item.severity === "error"
      )
    ) {
      continue;
    }

    findings.push(finding({
      path,
      message: runtimeFinding.message,
    }));
  }

  if (draft.draftBuffer.recommendationMetadata?.eligibility?.missing?.length) {
    findings.push(finding({
      path: "draftBuffer.recommendationMetadata.eligibility.missing",
      message: "Recommendation readiness still has unresolved holds.",
      severity: "warning",
    }));
  }

  for (const path of findUnsafePayloadKeys(draft.draftBuffer)) {
    findings.push(finding({
      path,
      message: "Draft contains a disallowed private, source, or debug field. Its contents are hidden.",
      unsafeContentHidden: true,
    }));
  }

  return createReport(findings);
}
