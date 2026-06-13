import {
  validateRitualDocument,
  validateRitualValidationSnapshotDocument,
  validateRitualVersionDocument,
  type RitualDbValidationFinding,
  type RitualDocument,
  type RitualValidationSnapshotDocument,
  type RitualVersionDocument,
} from "./db-documents";
import {
  createRitualStaticExport,
  isRitualStaticExportSuccessful,
} from "./db-static-export";
import type { Ritual } from "./types";
import { getRitualVersionIdentity } from "./version-identity";

export type RitualDbParityInput = {
  staticRituals: readonly Ritual[];
  ritualDocuments: readonly RitualDocument[];
  versionDocuments: readonly RitualVersionDocument[];
  validationSnapshots: readonly RitualValidationSnapshotDocument[];
};

export type RitualDbParityFieldMismatch = {
  ritualId: string;
  versionId?: string;
  path: string;
  staticValue: unknown;
  dbValue: unknown;
};

export type RitualDbParityInvalidRecord = {
  ritualId: string;
  versionId?: string;
  recordType: "ritualDocument" | "versionDocument" | "validationSnapshot";
  findings: RitualDbValidationFinding[];
};

export type RitualDbParityReport = {
  counts: {
    staticRituals: number;
    staticRitualIds: number;
    dbRitualDocuments: number;
    dbVersionDocuments: number;
    dbValidationSnapshots: number;
    publishedVersionsMatched: number;
    contentHashesMatched: number;
    exportableRituals: number;
  };
  missingInDb: string[];
  extraInDb: string[];
  extraVersionIds: string[];
  hashMismatches: RitualDbParityFieldMismatch[];
  fieldMismatches: RitualDbParityFieldMismatch[];
  invalidDbRecords: RitualDbParityInvalidRecord[];
  unpublishedOrUnvalidated: Array<{
    ritualId: string;
    versionId?: string;
    reason: string;
  }>;
  exportMismatches: RitualDbParityFieldMismatch[];
};

type ComparablePath = {
  path: string;
  getStaticValue: (ritual: Ritual) => unknown;
  getDbValue: (versionDocument: RitualVersionDocument) => unknown;
};

const RITUAL_COMPARABLE_PATHS: ComparablePath[] = [
  {
    path: "presentation",
    getStaticValue: (ritual) => ritual.presentation,
    getDbValue: (versionDocument) => versionDocument.ritual.presentation,
  },
  {
    path: "searchMetadata",
    getStaticValue: (ritual) => ritual.searchMetadata,
    getDbValue: (versionDocument) => versionDocument.ritual.searchMetadata,
  },
  {
    path: "recommendationMetadata",
    getStaticValue: (ritual) => ritual.recommendationMetadata,
    getDbValue: (versionDocument) =>
      versionDocument.ritual.recommendationMetadata,
  },
  {
    path: "availability",
    getStaticValue: (ritual) => ritual.availability,
    getDbValue: (versionDocument) => versionDocument.ritual.availability,
  },
  {
    path: "ritualWords",
    getStaticValue: (ritual) => ritual.ritualWords,
    getDbValue: (versionDocument) => versionDocument.ritual.ritualWords,
  },
  {
    path: "reviewFlags",
    getStaticValue: (ritual) => ritual.reviewFlags,
    getDbValue: (versionDocument) => versionDocument.ritual.reviewFlags,
  },
  {
    path: "adaptationPolicy",
    getStaticValue: (ritual) => ritual.adaptationPolicy,
    getDbValue: (versionDocument) => versionDocument.ritual.adaptationPolicy,
  },
];

function stableJsonValue(value: unknown): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(stableJsonValue);
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => item !== undefined)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, stableJsonValue(item)]),
  );
}

function stableJsonString(value: unknown): string {
  return JSON.stringify(stableJsonValue(value));
}

function valuesEqual(left: unknown, right: unknown): boolean {
  return stableJsonString(left) === stableJsonString(right);
}

function createLookup<T>(
  values: readonly T[],
  getKey: (value: T) => string,
): Map<string, T[]> {
  const lookup = new Map<string, T[]>();

  for (const value of values) {
    const key = getKey(value);
    const existing = lookup.get(key) ?? [];

    lookup.set(key, [...existing, value]);
  }

  return lookup;
}

function getSourceGroundingSummary(ritual: Ritual): {
  count: number;
  citationLabels: string[];
  sourceLocations: string[];
} {
  const sourceGrounding =
    ritual.origin.type === "source" ? ritual.origin.sourceGrounding : [];

  return {
    count: sourceGrounding.length,
    citationLabels: sourceGrounding
      .map((grounding) => grounding.citationLabel)
      .sort(),
    sourceLocations: sourceGrounding
      .map((grounding) => grounding.sourceLocation)
      .sort(),
  };
}

function findValidationSnapshot(
  ritualDocument: RitualDocument,
  versionDocument: RitualVersionDocument,
  validationSnapshotsById: Map<string, RitualValidationSnapshotDocument[]>,
  validationSnapshotsByVersion: Map<string, RitualValidationSnapshotDocument[]>,
): RitualValidationSnapshotDocument | undefined {
  const idMatches = ritualDocument.latestValidationSnapshotId
    ? validationSnapshotsById.get(ritualDocument.latestValidationSnapshotId) ?? []
    : [];
  const versionMatches =
    validationSnapshotsByVersion.get(versionDocument.versionId) ?? [];

  return [...idMatches, ...versionMatches].find(
    (snapshot) =>
      snapshot.ritualId === ritualDocument.id &&
      snapshot.versionId === versionDocument.versionId,
  );
}

function addMismatch(
  mismatches: RitualDbParityFieldMismatch[],
  mismatch: RitualDbParityFieldMismatch,
): void {
  mismatches.push({
    ...mismatch,
    staticValue: stableJsonValue(mismatch.staticValue),
    dbValue: stableJsonValue(mismatch.dbValue),
  });
}

function addInvalidRecord(
  invalidDbRecords: RitualDbParityInvalidRecord[],
  input: RitualDbParityInvalidRecord,
): void {
  const findings = input.findings.filter((finding) => finding.severity === "error");

  if (findings.length === 0) {
    return;
  }

  invalidDbRecords.push({ ...input, findings });
}

export function createRitualDbParityReport(
  input: RitualDbParityInput,
): RitualDbParityReport {
  const staticRitualsById = createLookup(input.staticRituals, (ritual) => ritual.id);
  const ritualDocumentsById = createLookup(
    input.ritualDocuments,
    (document) => document.id,
  );
  const versionDocumentsByVersionId = createLookup(
    input.versionDocuments,
    (document) => document.versionId,
  );
  const validationSnapshotsById = createLookup(
    input.validationSnapshots,
    (document) => document.id,
  );
  const validationSnapshotsByVersion = createLookup(
    input.validationSnapshots,
    (document) => document.versionId,
  );
  const missingInDb: string[] = [];
  const extraInDb: string[] = [];
  const extraVersionIds: string[] = [];
  const hashMismatches: RitualDbParityFieldMismatch[] = [];
  const fieldMismatches: RitualDbParityFieldMismatch[] = [];
  const invalidDbRecords: RitualDbParityInvalidRecord[] = [];
  const unpublishedOrUnvalidated: RitualDbParityReport["unpublishedOrUnvalidated"] =
    [];
  const exportMismatches: RitualDbParityFieldMismatch[] = [];
  let publishedVersionsMatched = 0;
  let contentHashesMatched = 0;

  for (const ritualDocument of input.ritualDocuments) {
    addInvalidRecord(invalidDbRecords, {
      ritualId: ritualDocument.id,
      versionId: ritualDocument.publishedVersionId,
      recordType: "ritualDocument",
      findings: validateRitualDocument(ritualDocument).findings,
    });
  }

  for (const versionDocument of input.versionDocuments) {
    addInvalidRecord(invalidDbRecords, {
      ritualId: versionDocument.ritualId,
      versionId: versionDocument.versionId,
      recordType: "versionDocument",
      findings: validateRitualVersionDocument(versionDocument).findings,
    });
  }

  for (const staticRitual of [...input.staticRituals].sort((left, right) =>
    left.id.localeCompare(right.id),
  )) {
    const identity = getRitualVersionIdentity(staticRitual);
    const ritualDocument = ritualDocumentsById.get(staticRitual.id)?.[0];

    if (!ritualDocument) {
      missingInDb.push(staticRitual.id);
      continue;
    }

    if (!ritualDocument.publishedVersionId) {
      unpublishedOrUnvalidated.push({
        ritualId: staticRitual.id,
        reason: "Missing publishedVersionId.",
      });
      continue;
    }

    const versionDocument =
      versionDocumentsByVersionId.get(ritualDocument.publishedVersionId)?.[0];

    if (!versionDocument) {
      unpublishedOrUnvalidated.push({
        ritualId: staticRitual.id,
        versionId: ritualDocument.publishedVersionId,
        reason: "Missing published version document.",
      });
      continue;
    }

    publishedVersionsMatched += 1;

    const validationSnapshot = findValidationSnapshot(
      ritualDocument,
      versionDocument,
      validationSnapshotsById,
      validationSnapshotsByVersion,
    );

    if (!validationSnapshot) {
      unpublishedOrUnvalidated.push({
        ritualId: staticRitual.id,
        versionId: versionDocument.versionId,
        reason: "Missing validation snapshot.",
      });
    } else {
      addInvalidRecord(invalidDbRecords, {
        ritualId: staticRitual.id,
        versionId: versionDocument.versionId,
        recordType: "validationSnapshot",
        findings: validateRitualValidationSnapshotDocument(
          validationSnapshot,
          versionDocument,
        ).findings,
      });

      if (!validationSnapshot.valid) {
        unpublishedOrUnvalidated.push({
          ritualId: staticRitual.id,
          versionId: versionDocument.versionId,
          reason: "Validation snapshot is not valid.",
        });
      }
    }

    if (versionDocument.versionId !== identity.versionId) {
      addMismatch(hashMismatches, {
        ritualId: staticRitual.id,
        versionId: versionDocument.versionId,
        path: "versionId",
        staticValue: identity.versionId,
        dbValue: versionDocument.versionId,
      });
    }

    if (versionDocument.contentHash !== identity.contentHash) {
      addMismatch(hashMismatches, {
        ritualId: staticRitual.id,
        versionId: versionDocument.versionId,
        path: "contentHash",
        staticValue: identity.contentHash,
        dbValue: versionDocument.contentHash,
      });
    } else {
      contentHashesMatched += 1;
    }

    for (const comparablePath of RITUAL_COMPARABLE_PATHS) {
      const staticValue = comparablePath.getStaticValue(staticRitual);
      const dbValue = comparablePath.getDbValue(versionDocument);

      if (!valuesEqual(staticValue, dbValue)) {
        addMismatch(fieldMismatches, {
          ritualId: staticRitual.id,
          versionId: versionDocument.versionId,
          path: comparablePath.path,
          staticValue,
          dbValue,
        });
      }
    }

    if (
      !valuesEqual(
        getSourceGroundingSummary(staticRitual),
        getSourceGroundingSummary(versionDocument.ritual),
      )
    ) {
      addMismatch(fieldMismatches, {
        ritualId: staticRitual.id,
        versionId: versionDocument.versionId,
        path: "origin.sourceGrounding",
        staticValue: getSourceGroundingSummary(staticRitual),
        dbValue: getSourceGroundingSummary(versionDocument.ritual),
      });
    }

    const staticMissingReadiness =
      staticRitual.recommendationMetadata.eligibility.missing ?? [];
    if (!valuesEqual(staticMissingReadiness, ritualDocument.lifecycle.missingReadiness)) {
      addMismatch(fieldMismatches, {
        ritualId: staticRitual.id,
        versionId: versionDocument.versionId,
        path: "lifecycle.missingReadiness",
        staticValue: staticMissingReadiness,
        dbValue: ritualDocument.lifecycle.missingReadiness,
      });
    }

    const lifecycleAvailability = {
      directUseEligible: ritualDocument.lifecycle.directUseEligible,
      findable: ritualDocument.lifecycle.findable,
      recommendationEligible: ritualDocument.lifecycle.recommendationEligible,
    };
    if (!valuesEqual(staticRitual.availability, lifecycleAvailability)) {
      addMismatch(fieldMismatches, {
        ritualId: staticRitual.id,
        versionId: versionDocument.versionId,
        path: "lifecycle.availability",
        staticValue: staticRitual.availability,
        dbValue: lifecycleAvailability,
      });
    }
  }

  for (const ritualDocument of input.ritualDocuments) {
    if (!staticRitualsById.has(ritualDocument.id)) {
      extraInDb.push(ritualDocument.id);
    }
  }

  for (const versionDocument of input.versionDocuments) {
    if (!staticRitualsById.has(versionDocument.ritualId)) {
      extraVersionIds.push(versionDocument.versionId);
    }
  }

  const exportReport = createRitualStaticExport({
    ritualDocuments: input.ritualDocuments,
    versionDocuments: input.versionDocuments,
    validationSnapshots: input.validationSnapshots,
  });

  if (isRitualStaticExportSuccessful(exportReport)) {
    const exportedRitualsById = createLookup(
      exportReport.records.map((record) => record.ritual),
      (ritual) => ritual.id,
    );

    for (const staticRitual of input.staticRituals) {
      const exportedRitual = exportedRitualsById.get(staticRitual.id)?.[0];

      if (!exportedRitual) {
        addMismatch(exportMismatches, {
          ritualId: staticRitual.id,
          path: "staticExport",
          staticValue: "present",
          dbValue: "missing",
        });
      } else if (!valuesEqual(staticRitual, exportedRitual)) {
        addMismatch(exportMismatches, {
          ritualId: staticRitual.id,
          path: "staticExport.ritual",
          staticValue: staticRitual,
          dbValue: exportedRitual,
        });
      }
    }
  } else {
    for (const skipped of exportReport.skipped) {
      exportMismatches.push({
        ritualId: skipped.ritualId,
        versionId: skipped.versionId,
        path: "staticExport.skipped",
        staticValue: "exportable",
        dbValue: skipped.reasons.map((reason) => ({
          path: reason.path,
          message: reason.message,
        })),
      });
    }
  }

  return {
    counts: {
      staticRituals: input.staticRituals.length,
      staticRitualIds: staticRitualsById.size,
      dbRitualDocuments: input.ritualDocuments.length,
      dbVersionDocuments: input.versionDocuments.length,
      dbValidationSnapshots: input.validationSnapshots.length,
      publishedVersionsMatched,
      contentHashesMatched,
      exportableRituals: exportReport.counts.ritualsExported,
    },
    missingInDb: missingInDb.sort(),
    extraInDb: extraInDb.sort(),
    extraVersionIds: extraVersionIds.sort(),
    hashMismatches,
    fieldMismatches,
    invalidDbRecords,
    unpublishedOrUnvalidated,
    exportMismatches,
  };
}

export function isRitualDbParitySuccessful(
  report: RitualDbParityReport,
): boolean {
  return (
    report.counts.staticRituals === report.counts.dbRitualDocuments &&
    report.counts.staticRituals === report.counts.publishedVersionsMatched &&
    report.counts.staticRituals === report.counts.contentHashesMatched &&
    report.counts.staticRituals === report.counts.exportableRituals &&
    report.missingInDb.length === 0 &&
    report.extraInDb.length === 0 &&
    report.extraVersionIds.length === 0 &&
    report.hashMismatches.length === 0 &&
    report.fieldMismatches.length === 0 &&
    report.invalidDbRecords.length === 0 &&
    report.unpublishedOrUnvalidated.length === 0 &&
    report.exportMismatches.length === 0
  );
}

function formatMismatch(mismatch: RitualDbParityFieldMismatch): string {
  return `- ${mismatch.ritualId}${mismatch.versionId ? ` (${mismatch.versionId})` : ""} ${mismatch.path}`;
}

export function formatRitualDbParityReport(
  report: RitualDbParityReport,
): string {
  const lines = [
    "Static-vs-DB Ritual parity report",
    "",
    "Firestore reads: no",
    "Firestore writes: no",
    "",
    "Counts",
    `- Static Rituals: ${report.counts.staticRituals}`,
    `- Static Ritual IDs: ${report.counts.staticRitualIds}`,
    `- DB Ritual documents: ${report.counts.dbRitualDocuments}`,
    `- DB version documents: ${report.counts.dbVersionDocuments}`,
    `- DB validation snapshots: ${report.counts.dbValidationSnapshots}`,
    `- Published versions matched: ${report.counts.publishedVersionsMatched}`,
    `- Content hashes matched: ${report.counts.contentHashesMatched}`,
    `- Exportable Rituals: ${report.counts.exportableRituals}`,
    "",
    "Reconciliation",
    `- Missing in DB: ${report.missingInDb.length}`,
    `- Extra in DB: ${report.extraInDb.length}`,
    `- Extra DB versions: ${report.extraVersionIds.length}`,
    `- Hash mismatches: ${report.hashMismatches.length}`,
    `- Field mismatches: ${report.fieldMismatches.length}`,
    `- Invalid DB records: ${report.invalidDbRecords.length}`,
    `- Unpublished or unvalidated: ${report.unpublishedOrUnvalidated.length}`,
    `- Static export mismatches: ${report.exportMismatches.length}`,
  ];

  if (report.missingInDb.length > 0) {
    lines.push("", "Missing in DB", ...report.missingInDb.map((id) => `- ${id}`));
  }

  if (report.extraInDb.length > 0) {
    lines.push("", "Extra in DB", ...report.extraInDb.map((id) => `- ${id}`));
  }

  if (report.extraVersionIds.length > 0) {
    lines.push(
      "",
      "Extra DB versions",
      ...report.extraVersionIds.map((id) => `- ${id}`),
    );
  }

  if (report.hashMismatches.length > 0) {
    lines.push("", "Hash mismatches", ...report.hashMismatches.map(formatMismatch));
  }

  if (report.fieldMismatches.length > 0) {
    lines.push(
      "",
      "Field mismatches",
      ...report.fieldMismatches.map(formatMismatch),
    );
  }

  if (report.invalidDbRecords.length > 0) {
    lines.push("", "Invalid DB records");
    for (const invalid of report.invalidDbRecords) {
      lines.push(
        `- ${invalid.ritualId}${invalid.versionId ? ` (${invalid.versionId})` : ""} ${invalid.recordType}`,
      );
      for (const finding of invalid.findings) {
        lines.push(`  - ${finding.path}: ${finding.message}`);
      }
    }
  }

  if (report.unpublishedOrUnvalidated.length > 0) {
    lines.push("", "Unpublished or unvalidated");
    for (const record of report.unpublishedOrUnvalidated) {
      lines.push(
        `- ${record.ritualId}${record.versionId ? ` (${record.versionId})` : ""}: ${record.reason}`,
      );
    }
  }

  if (report.exportMismatches.length > 0) {
    lines.push(
      "",
      "Static export mismatches",
      ...report.exportMismatches.map(formatMismatch),
    );
  }

  lines.push(
    "",
    `Parity result: ${isRitualDbParitySuccessful(report) ? "pass" : "fail"}`,
  );

  return `${lines.join("\n")}\n`;
}
