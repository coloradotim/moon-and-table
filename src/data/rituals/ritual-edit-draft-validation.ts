import type {
  RitualDbValidationFinding,
  RitualDbValidationResult,
} from "./db-documents";
import type {
  RitualEditDraftDocument,
  RitualEditDraftBuffer,
} from "./ritual-edit-drafts";
import {
  RITUAL_STATUSES,
  type Ritual,
} from "./types";
import { validateRitual } from "./validate-rituals";

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
  | "questionToCarry";

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

const BODY_FIELD_PATHS: Record<RitualEditDraftValidationField, string> = {
  headline: "draftBuffer.presentation.headline",
  practice: "draftBuffer.presentation.practice",
  intention: "draftBuffer.presentation.intention",
  bestWindow: "draftBuffer.presentation.bestWindow",
  questionToCarry: "draftBuffer.presentation.questionToCarry",
};

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

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeRuntimePath(path: string): string {
  return path.startsWith("draftBuffer.") ? path : `draftBuffer.${path}`;
}

function mapPathToField(path: string): RitualEditDraftValidationField | undefined {
  const normalized = normalizeRuntimePath(path);

  return REQUIRED_BODY_FIELDS.find((field) =>
    normalized === BODY_FIELD_PATHS[field] ||
    normalized === `draftBuffer.presentation.${field}`,
  );
}

function mapPathToSection(path: string): RitualEditDraftValidationSection {
  const normalized = normalizeRuntimePath(path);

  if (mapPathToField(normalized)) {
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
