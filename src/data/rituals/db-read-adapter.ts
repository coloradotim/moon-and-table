import {
  createRitualDbParityReport,
  isRitualDbParitySuccessful,
  type RitualDbParityReport,
} from "./db-parity";
import {
  createRitualStaticExport,
  type RitualStaticExportReport,
} from "./db-static-export";
import {
  createStaticRitualRepository,
  type RitualRepository,
} from "./ritual-repository";
import type {
  RitualDbValidationFinding,
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "./db-documents";
import type { Ritual } from "./types";

export const RITUAL_DB_READ_FEATURE_FLAG =
  "VITE_MOON_TABLE_USE_FIRESTORE_RITUALS" as const;

export type RitualDbReadDocuments = {
  ritualDocuments: readonly RitualDocument[];
  versionDocuments: readonly RitualVersionDocument[];
  validationSnapshots: readonly RitualValidationSnapshotDocument[];
};

export type RitualDbReadRepositorySource =
  | "db"
  | "static_fallback_disabled"
  | "static_fallback_unavailable"
  | "static_fallback_invalid"
  | "static_fallback_parity_failed";

export type RitualDbReadRepositoryResult = {
  source: RitualDbReadRepositorySource;
  repository: RitualRepository;
  findings: RitualDbValidationFinding[];
  dbDocuments?: RitualDbReadDocuments;
  exportReport?: RitualStaticExportReport;
  parityReport?: RitualDbParityReport;
  fallbackReason?: string;
};

export type CreateRitualDbReadRepositoryInput = RitualDbReadDocuments & {
  enabled: boolean;
  staticFallbackRepository: RitualRepository;
  staticParityRituals: readonly Ritual[];
};

export type LoadRitualDbReadRepositoryInput = {
  enabled: boolean;
  loadDbDocuments: () => Promise<RitualDbReadDocuments>;
  staticFallbackRepository: RitualRepository;
  staticParityRituals: readonly Ritual[];
};

function finding(path: string, message: string): RitualDbValidationFinding {
  return { path, message, severity: "error" };
}

function createFallbackResult(input: {
  source: Exclude<RitualDbReadRepositorySource, "db">;
  repository: RitualRepository;
  reason: string;
  findings?: RitualDbValidationFinding[];
  exportReport?: RitualStaticExportReport;
  parityReport?: RitualDbParityReport;
}): RitualDbReadRepositoryResult {
  return {
    source: input.source,
    repository: input.repository,
    findings: input.findings ?? [],
    exportReport: input.exportReport,
    parityReport: input.parityReport,
    fallbackReason: input.reason,
  };
}

function flattenStaticExportFindings(
  report: RitualStaticExportReport,
): RitualDbValidationFinding[] {
  return report.skipped.flatMap((record) =>
    record.reasons.map((reason) => ({
      ...reason,
      path: `${record.ritualId}.${reason.path}`,
    })),
  );
}

function flattenParityFindings(
  report: RitualDbParityReport,
): RitualDbValidationFinding[] {
  return [
    ...report.missingInDb.map((ritualId) =>
      finding(ritualId, "Static Ritual is missing from DB read payload."),
    ),
    ...report.extraInDb.map((ritualId) =>
      finding(ritualId, "DB read payload has an extra Ritual."),
    ),
    ...report.extraVersionIds.map((versionId) =>
      finding(versionId, "DB read payload has an extra Ritual version."),
    ),
    ...report.hashMismatches.map((mismatch) =>
      finding(
        `${mismatch.ritualId}.${mismatch.path}`,
        "DB read payload does not match static version identity.",
      ),
    ),
    ...report.fieldMismatches.map((mismatch) =>
      finding(
        `${mismatch.ritualId}.${mismatch.path}`,
        "DB read payload does not match static Ritual field.",
      ),
    ),
    ...report.invalidDbRecords.flatMap((record) =>
      record.findings.map((item) => ({
        ...item,
        path: `${record.ritualId}.${item.path}`,
      })),
    ),
    ...report.unpublishedOrUnvalidated.map((record) =>
      finding(
        `${record.ritualId}.${record.versionId ?? "publishedVersionId"}`,
        record.reason,
      ),
    ),
    ...report.exportMismatches.map((mismatch) =>
      finding(
        `${mismatch.ritualId}.${mismatch.path}`,
        "DB read payload does not export back to the static runtime Ritual.",
      ),
    ),
  ];
}

function getPublishedReadDocuments(
  input: RitualDbReadDocuments,
): RitualDbReadDocuments {
  const publishedVersionIds = new Set(
    input.ritualDocuments
      .map((document) => document.publishedVersionId)
      .filter((versionId): versionId is string => typeof versionId === "string"),
  );

  return {
    ritualDocuments: input.ritualDocuments,
    versionDocuments: input.versionDocuments.filter((document) =>
      publishedVersionIds.has(document.versionId),
    ),
    validationSnapshots: input.validationSnapshots.filter((document) =>
      publishedVersionIds.has(document.versionId),
    ),
  };
}

export function isRitualDbReadFeatureEnabled(
  env: Record<string, unknown>,
): boolean {
  return env[RITUAL_DB_READ_FEATURE_FLAG] === "true";
}

export function createRitualDbReadRepository(
  input: CreateRitualDbReadRepositoryInput,
): RitualDbReadRepositoryResult {
  if (!input.enabled) {
    return createFallbackResult({
      source: "static_fallback_disabled",
      repository: input.staticFallbackRepository,
      reason: "DB Ritual reads are disabled by feature flag.",
    });
  }

  const publishedReadDocuments = getPublishedReadDocuments(input);
  const exportReport = createRitualStaticExport(publishedReadDocuments);

  if (exportReport.skipped.length > 0 || exportReport.records.length === 0) {
    return createFallbackResult({
      source: "static_fallback_invalid",
      repository: input.staticFallbackRepository,
      reason: "DB Ritual read payload did not pass published-version validation.",
      findings: flattenStaticExportFindings(exportReport),
      exportReport,
    });
  }

  const parityReport = createRitualDbParityReport({
    staticRituals: input.staticParityRituals,
    ritualDocuments: publishedReadDocuments.ritualDocuments,
    versionDocuments: publishedReadDocuments.versionDocuments,
    validationSnapshots: publishedReadDocuments.validationSnapshots,
  });

  if (!isRitualDbParitySuccessful(parityReport)) {
    return {
      source: "db",
      repository: createStaticRitualRepository(
        exportReport.records.map((record) => record.ritual),
      ),
      findings: flattenParityFindings(parityReport),
      dbDocuments: publishedReadDocuments,
      exportReport,
      parityReport,
    };
  }

  return {
    source: "db",
    repository: createStaticRitualRepository(
      exportReport.records.map((record) => record.ritual),
    ),
    findings: [],
    dbDocuments: publishedReadDocuments,
    exportReport,
    parityReport,
  };
}

export async function loadRitualDbReadRepository(
  input: LoadRitualDbReadRepositoryInput,
): Promise<RitualDbReadRepositoryResult> {
  if (!input.enabled) {
    return createFallbackResult({
      source: "static_fallback_disabled",
      repository: input.staticFallbackRepository,
      reason: "DB Ritual reads are disabled by feature flag.",
    });
  }

  try {
    const documents = await input.loadDbDocuments();

    return createRitualDbReadRepository({
      ...documents,
      enabled: true,
      staticFallbackRepository: input.staticFallbackRepository,
      staticParityRituals: input.staticParityRituals,
    });
  } catch (error) {
    return createFallbackResult({
      source: "static_fallback_unavailable",
      repository: input.staticFallbackRepository,
      reason: error instanceof Error
        ? error.message
        : "DB Ritual read payload could not be loaded.",
      findings: [
        finding("loadDbDocuments", "DB Ritual read payload could not be loaded."),
      ],
    });
  }
}
