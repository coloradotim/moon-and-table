import {
  validateRitualDocument,
  validateRitualValidationSnapshotDocument,
  validateRitualVersionDocument,
  type RitualDbLifecycleState,
  type RitualDbValidationFinding,
  type RitualDocument,
  type RitualValidationSnapshotDocument,
  type RitualVersionDocument,
} from "./db-documents";
import type { Ritual } from "./types";
import { validateRituals } from "./validate-rituals";

export type RitualStaticExportInput = {
  ritualDocuments: readonly RitualDocument[];
  versionDocuments: readonly RitualVersionDocument[];
  validationSnapshots: readonly RitualValidationSnapshotDocument[];
};

export type RitualStaticExportRecord = {
  ritualId: string;
  versionId: string;
  contentHash: string;
  lifecycleState: RitualDbLifecycleState;
  ritual: Ritual;
};

export type RitualStaticExportSkippedRecord = {
  ritualId: string;
  versionId?: string;
  headline?: string;
  reasons: RitualDbValidationFinding[];
};

export type RitualStaticExportReport = {
  targetFile: "src/data/rituals/source-backed-rituals.ts";
  counts: {
    ritualDocumentsRead: number;
    versionDocumentsRead: number;
    validationSnapshotsRead: number;
    ritualsExported: number;
    skippedRecords: number;
  };
  records: RitualStaticExportRecord[];
  skipped: RitualStaticExportSkippedRecord[];
  sourceText: string;
};

const TARGET_FILE = "src/data/rituals/source-backed-rituals.ts" as const;
const EXPORTABLE_LIFECYCLE_STATES = new Set<RitualDbLifecycleState>([
  "held",
  "reviewed",
  "recommendable",
]);

function finding(path: string, message: string): RitualDbValidationFinding {
  return { path, message, severity: "error" };
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function toStableJsonValue(value: unknown): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(toStableJsonValue);
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => item !== undefined)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, toStableJsonValue(item)]),
  );
}

function createDocumentLookup<T extends { id: string }>(
  documents: readonly T[],
): Map<string, T[]> {
  const lookup = new Map<string, T[]>();

  for (const document of documents) {
    const existing = lookup.get(document.id) ?? [];

    lookup.set(document.id, [...existing, document]);
  }

  return lookup;
}

function createVersionLookup(
  documents: readonly RitualVersionDocument[],
): Map<string, RitualVersionDocument[]> {
  const lookup = new Map<string, RitualVersionDocument[]>();

  for (const document of documents) {
    const existing = lookup.get(document.versionId) ?? [];

    lookup.set(document.versionId, [...existing, document]);
  }

  return lookup;
}

function createValidationSnapshotLookup(
  documents: readonly RitualValidationSnapshotDocument[],
): Map<string, RitualValidationSnapshotDocument[]> {
  const lookup = new Map<string, RitualValidationSnapshotDocument[]>();

  for (const document of documents) {
    const keys = [
      document.id,
      `${document.ritualId}:${document.versionId}`,
    ];

    for (const key of keys) {
      const existing = lookup.get(key) ?? [];

      lookup.set(key, [...existing, document]);
    }
  }

  return lookup;
}

function findValidationSnapshot(
  ritualDocument: RitualDocument,
  versionDocument: RitualVersionDocument,
  validationSnapshotsByKey: Map<string, RitualValidationSnapshotDocument[]>,
): RitualValidationSnapshotDocument | undefined {
  const idMatches = ritualDocument.latestValidationSnapshotId
    ? validationSnapshotsByKey.get(ritualDocument.latestValidationSnapshotId) ?? []
    : [];
  const versionMatches =
    validationSnapshotsByKey.get(
      `${ritualDocument.id}:${versionDocument.versionId}`,
    ) ?? [];

  return [...idMatches, ...versionMatches].find(
    (snapshot) =>
      snapshot.ritualId === ritualDocument.id &&
      snapshot.versionId === versionDocument.versionId,
  );
}

function createSkippedRecord(
  ritualDocument: RitualDocument,
  versionDocument: RitualVersionDocument | undefined,
  reasons: RitualDbValidationFinding[],
): RitualStaticExportSkippedRecord {
  return {
    ritualId: ritualDocument.id,
    versionId: versionDocument?.versionId ?? ritualDocument.publishedVersionId,
    headline:
      versionDocument?.ritual.presentation?.headline ??
      ritualDocument.searchIndex?.headline,
    reasons,
  };
}

function applyLifecycleOverlay(
  ritual: Ritual,
  ritualDocument: RitualDocument,
): Ritual {
  const recommendationMetadata = ritual.recommendationMetadata;

  return {
    ...ritual,
    availability: {
      findable: ritualDocument.lifecycle.findable,
      directUseEligible: ritualDocument.lifecycle.directUseEligible,
      recommendationEligible: ritualDocument.lifecycle.recommendationEligible,
    },
    recommendationMetadata: recommendationMetadata
      ? {
        ...recommendationMetadata,
        eligibility: {
          ...recommendationMetadata.eligibility,
          recommendable: ritualDocument.lifecycle.recommendable,
          missing: [...ritualDocument.lifecycle.missingReadiness],
        },
      }
      : undefined,
  };
}

function buildStaticRitualsSource(rituals: readonly Ritual[]): string {
  const records = rituals.map((ritual) => toStableJsonValue(cloneJson(ritual)));

  return `import type { Ritual } from "./types";
import { applySourceBackedDirectUseReview } from "./direct-use-review";
import { applySourceBackedRecommendationEligibilityReview } from "./recommendation-eligibility-review";

// Generated by scripts/export-db-rituals-to-static.ts.
// Firestore remains the draft/review/version store; this file remains the
// production static TypeScript gate. Do not edit exported Ritual prose by hand.
const importedSourceBackedRituals: Ritual[] = ${JSON.stringify(records, null, 2)};

const directUseReviewedSourceBackedRituals = applySourceBackedDirectUseReview(
  importedSourceBackedRituals,
);

export const sourceBackedRituals: Ritual[] =
  applySourceBackedRecommendationEligibilityReview(
    directUseReviewedSourceBackedRituals,
  );
`;
}

export function createRitualStaticExport(
  input: RitualStaticExportInput,
): RitualStaticExportReport {
  const versionDocumentsByVersionId = createVersionLookup(input.versionDocuments);
  const validationSnapshotsByKey = createValidationSnapshotLookup(
    input.validationSnapshots,
  );
  const ritualDocumentsById = createDocumentLookup(input.ritualDocuments);
  const records: RitualStaticExportRecord[] = [];
  const skipped: RitualStaticExportSkippedRecord[] = [];

  for (const ritualDocument of [...input.ritualDocuments].sort((left, right) =>
    left.id.localeCompare(right.id),
  )) {
    const duplicateRitualDocuments =
      ritualDocumentsById.get(ritualDocument.id)?.length ?? 0;
    const publishedVersionId = ritualDocument.publishedVersionId;
    const versionMatches = publishedVersionId
      ? versionDocumentsByVersionId.get(publishedVersionId) ?? []
      : [];
    const versionDocument = versionMatches[0];
    const reasons: RitualDbValidationFinding[] = [];

    if (duplicateRitualDocuments > 1) {
      reasons.push(finding("ritualDocument.id", "Duplicate Ritual document id."));
    }

    if (!EXPORTABLE_LIFECYCLE_STATES.has(ritualDocument.lifecycle.state)) {
      reasons.push(
        finding(
          "ritualDocument.lifecycle.state",
          "Static export requires held, reviewed, or recommendable lifecycle state.",
        ),
      );
    }

    if (!publishedVersionId) {
      reasons.push(
        finding(
          "ritualDocument.publishedVersionId",
          "Static export requires a published version pointer.",
        ),
      );
    }

    if (publishedVersionId && versionMatches.length === 0) {
      reasons.push(
        finding(
          "ritualDocument.publishedVersionId",
          "Published version document was not supplied for export.",
        ),
      );
    }

    if (versionMatches.length > 1) {
      reasons.push(
        finding("versionDocument.versionId", "Duplicate version document id."),
      );
    }

    reasons.push(
      ...validateRitualDocument(ritualDocument).findings.filter(
        (finding) => finding.severity === "error",
      ),
    );

    if (versionDocument) {
      const validationSnapshot = findValidationSnapshot(
        ritualDocument,
        versionDocument,
        validationSnapshotsByKey,
      );

      reasons.push(
        ...validateRitualVersionDocument(versionDocument).findings.filter(
          (finding) => finding.severity === "error",
        ),
      );

      if (ritualDocument.id !== versionDocument.ritualId) {
        reasons.push(
          finding(
            "ritualDocument.id",
            "Ritual document id must match published version ritual id.",
          ),
        );
      }

      if (publishedVersionId !== versionDocument.versionId) {
        reasons.push(
          finding(
            "ritualDocument.publishedVersionId",
            "Published version pointer must match supplied version document.",
          ),
        );
      }

      if (
        !ritualDocument.versionHistory.versionIds.includes(
          versionDocument.versionId,
        )
      ) {
        reasons.push(
          finding(
            "ritualDocument.versionHistory.versionIds",
            "Version history must include the published version id.",
          ),
        );
      }

      if (!validationSnapshot) {
        reasons.push(
          finding(
            "ritualDocument.latestValidationSnapshotId",
            "Static export requires a validation snapshot for the published version.",
          ),
        );
      } else {
        reasons.push(
          ...validateRitualValidationSnapshotDocument(
            validationSnapshot,
            versionDocument,
          ).findings.filter((finding) => finding.severity === "error"),
        );

        if (!validationSnapshot.valid) {
          reasons.push(
            finding(
              "validationSnapshot.valid",
              "Static export requires a valid validation snapshot.",
            ),
          );
        }
      }
    }

    if (reasons.length > 0 || !versionDocument) {
      skipped.push(createSkippedRecord(ritualDocument, versionDocument, reasons));
      continue;
    }

    records.push({
      ritualId: ritualDocument.id,
      versionId: versionDocument.versionId,
      contentHash: versionDocument.contentHash,
      lifecycleState: ritualDocument.lifecycle.state,
      ritual: applyLifecycleOverlay(cloneJson(versionDocument.ritual), ritualDocument),
    });
  }

  const collectionValidation = validateRituals(
    records.map((record) => record.ritual),
  );

  for (const finding of collectionValidation.findings) {
    const record = records.find((candidate) => candidate.ritualId === finding.ritualId);

    skipped.push({
      ritualId: finding.ritualId,
      versionId: record?.versionId,
      headline: record?.ritual.presentation.headline,
      reasons: [{
        path: `ritual.${finding.path}`,
        message: finding.message,
        severity: "error",
      }],
    });
  }

  const exportableRecords = collectionValidation.valid ? records : [];

  return {
    targetFile: TARGET_FILE,
    counts: {
      ritualDocumentsRead: input.ritualDocuments.length,
      versionDocumentsRead: input.versionDocuments.length,
      validationSnapshotsRead: input.validationSnapshots.length,
      ritualsExported: exportableRecords.length,
      skippedRecords: skipped.length,
    },
    records: exportableRecords,
    skipped,
    sourceText:
      skipped.length === 0 ? buildStaticRitualsSource(exportableRecords.map(
        (record) => record.ritual,
      )) : "",
  };
}

export function isRitualStaticExportSuccessful(
  report: RitualStaticExportReport,
): boolean {
  return report.skipped.length === 0 && report.records.length > 0;
}

export function formatRitualStaticExportReport(
  report: RitualStaticExportReport,
): string {
  const lines = [
    "DB-to-TypeScript Ritual static export",
    "",
    `Target file: ${report.targetFile}`,
    "Firestore reads: no",
    "Firestore writes: no",
    "",
    "Counts",
    `- Ritual documents read: ${report.counts.ritualDocumentsRead}`,
    `- Version documents read: ${report.counts.versionDocumentsRead}`,
    `- Validation snapshots read: ${report.counts.validationSnapshotsRead}`,
    `- Rituals exported: ${report.counts.ritualsExported}`,
    `- Skipped records: ${report.counts.skippedRecords}`,
  ];

  if (report.skipped.length > 0) {
    lines.push("", "Skipped records");
    for (const skipped of report.skipped) {
      lines.push(`- ${skipped.ritualId}${skipped.headline ? ` (${skipped.headline})` : ""}`);
      for (const reason of skipped.reasons) {
        lines.push(`  - ${reason.path}: ${reason.message}`);
      }
    }
  }

  lines.push(
    "",
    `Export result: ${isRitualStaticExportSuccessful(report) ? "pass" : "fail"}`,
  );

  return `${lines.join("\n")}\n`;
}
