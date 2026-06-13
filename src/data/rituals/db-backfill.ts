import {
  formatRitualDbParityReport,
  createRitualDbParityReport,
  isRitualDbParitySuccessful,
  type RitualDbParityReport,
} from "./db-parity";
import type { RitualDbMirrorDryRunReport } from "./db-mirror";
import type {
  RitualAuditEventDocument,
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "./db-documents";
import type { Ritual } from "./types";
import { getRitualVersionIdentity } from "./version-identity";

export const RITUAL_DB_BACKFILL_BACKUP_SCHEMA_VERSION =
  "ritual-db-backfill-backup-v1" as const;

export type RitualDbBackfillBackupArtifact = {
  schemaVersion: typeof RITUAL_DB_BACKFILL_BACKUP_SCHEMA_VERSION;
  sourceStaticCommitSha: string;
  generatedAtIso: string;
  staticRituals: Ritual[];
  writePayload: {
    ritualDocuments: RitualDocument[];
    versionDocuments: RitualVersionDocument[];
    validationSnapshots: RitualValidationSnapshotDocument[];
    auditEvents: RitualAuditEventDocument[];
  };
};

export type ExistingRitualDbBackfillSnapshot = {
  ritualDocuments: readonly RitualDocument[];
  versionDocuments: readonly RitualVersionDocument[];
  validationSnapshots: readonly RitualValidationSnapshotDocument[];
  auditEvents: readonly RitualAuditEventDocument[];
};

export type UnsafeRitualDbBackfillConflict = {
  collection:
    | "rituals"
    | "ritualVersions"
    | "ritualValidationSnapshots"
    | "ritualAuditEvents";
  documentId: string;
  reason: string;
};

export type RitualDbBackfillReport = {
  sourceStaticCommitSha: string;
  generatedAtIso: string;
  mode: "dry_run" | "read_check" | "pre_write" | "post_write";
  backupArtifactPath?: string;
  rollbackProcedure: string[];
  counts: {
    staticRitualCount: number;
    staticRitualIdSetHash: string;
    dbPointerCount: number;
    dbVersionCount: number;
    dbValidationSnapshotCount: number;
    dbAuditEventCount: number;
    publishedVersionCount: number;
    contentHashMatchCount: number;
  };
  parity: RitualDbParityReport;
  unsafeExistingConflicts: UnsafeRitualDbBackfillConflict[];
  preservationGates: Array<{
    id: string;
    passed: boolean;
    message: string;
  }>;
};

export type CreateRitualDbBackfillReportInput = {
  sourceStaticCommitSha: string;
  generatedAtIso: string;
  staticRituals: readonly Ritual[];
  mirrorReport: RitualDbMirrorDryRunReport;
  backupArtifactPath?: string;
  dbSnapshotForParity?: ExistingRitualDbBackfillSnapshot;
  existingDbSnapshotForConflictCheck?: ExistingRitualDbBackfillSnapshot;
  mode?: RitualDbBackfillReport["mode"];
};

type CollectionPayload =
  | RitualDocument
  | RitualVersionDocument
  | RitualValidationSnapshotDocument
  | RitualAuditEventDocument;

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

function fnv1a64(value: string): string {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const mask = (1n << 64n) - 1n;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= BigInt(value.charCodeAt(index));
    hash = (hash * prime) & mask;
  }

  return `fnv1a64:${hash.toString(16).padStart(16, "0")}`;
}

function createStaticRitualIdSetHash(rituals: readonly Ritual[]): string {
  return fnv1a64(rituals.map((ritual) => ritual.id).sort().join("\n"));
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createLookup<T extends { id: string }>(
  documents: readonly T[],
): Map<string, T> {
  return new Map(documents.map((document) => [document.id, document]));
}

function findUnsafeConflicts(
  collection: UnsafeRitualDbBackfillConflict["collection"],
  intendedDocuments: readonly CollectionPayload[],
  existingDocuments: readonly CollectionPayload[],
): UnsafeRitualDbBackfillConflict[] {
  const existingById = createLookup(existingDocuments);

  return intendedDocuments.flatMap((document) => {
    const existing = existingById.get(document.id);

    if (!existing || valuesEqual(existing, document)) {
      return [];
    }

    return [{
      collection,
      documentId: document.id,
      reason: "Existing Firestore document differs from the intended backfill payload.",
    }];
  });
}

function createRollbackProcedure(backupArtifactPath?: string): string[] {
  return [
    "Do not delete static Ritual source until the DB migration is separately approved.",
    "If the static runtime needs rollback, revert the generated TypeScript export through git.",
    "If a DB write needs rollback, restore the prior Firestore export or delete only the document IDs listed in the backup payload after confirming no newer versions were written.",
    backupArtifactPath
      ? `Use the backup artifact at ${backupArtifactPath} to recover the exact source Rituals, version IDs, content hashes, and intended DB write payload.`
      : "Create and retain a backup artifact before using --write.",
  ];
}

export function createRitualDbBackfillBackupArtifact(input: {
  sourceStaticCommitSha: string;
  generatedAtIso: string;
  staticRituals: readonly Ritual[];
  mirrorReport: RitualDbMirrorDryRunReport;
}): RitualDbBackfillBackupArtifact {
  return {
    schemaVersion: RITUAL_DB_BACKFILL_BACKUP_SCHEMA_VERSION,
    sourceStaticCommitSha: input.sourceStaticCommitSha,
    generatedAtIso: input.generatedAtIso,
    staticRituals: cloneJson([...input.staticRituals]),
    writePayload: {
      ritualDocuments: input.mirrorReport.mirrored.map((record) =>
        cloneJson(record.ritualDocument),
      ),
      versionDocuments: input.mirrorReport.mirrored.map((record) =>
        cloneJson(record.versionDocument),
      ),
      validationSnapshots: input.mirrorReport.mirrored.map((record) =>
        cloneJson(record.validationSnapshot),
      ),
      auditEvents: input.mirrorReport.mirrored.map((record) =>
        cloneJson(record.auditEvent),
      ),
    },
  };
}

export function createRitualDbBackfillReport(
  input: CreateRitualDbBackfillReportInput,
): RitualDbBackfillReport {
  const intendedRitualDocuments = input.mirrorReport.mirrored.map(
    (record) => record.ritualDocument,
  );
  const intendedVersionDocuments = input.mirrorReport.mirrored.map(
    (record) => record.versionDocument,
  );
  const intendedValidationSnapshots = input.mirrorReport.mirrored.map(
    (record) => record.validationSnapshot,
  );
  const intendedAuditEvents = input.mirrorReport.mirrored.map(
    (record) => record.auditEvent,
  );
  const parity = createRitualDbParityReport({
    staticRituals: input.staticRituals,
    ritualDocuments:
      input.dbSnapshotForParity?.ritualDocuments ?? intendedRitualDocuments,
    versionDocuments:
      input.dbSnapshotForParity?.versionDocuments ?? intendedVersionDocuments,
    validationSnapshots:
      input.dbSnapshotForParity?.validationSnapshots ??
      intendedValidationSnapshots,
  });
  const unsafeExistingConflicts = input.existingDbSnapshotForConflictCheck
    ? [
      ...findUnsafeConflicts(
        "rituals",
        intendedRitualDocuments,
        input.existingDbSnapshotForConflictCheck.ritualDocuments,
      ),
      ...findUnsafeConflicts(
        "ritualVersions",
        intendedVersionDocuments,
        input.existingDbSnapshotForConflictCheck.versionDocuments,
      ),
      ...findUnsafeConflicts(
        "ritualValidationSnapshots",
        intendedValidationSnapshots,
        input.existingDbSnapshotForConflictCheck.validationSnapshots,
      ),
      ...findUnsafeConflicts(
        "ritualAuditEvents",
        intendedAuditEvents,
        input.existingDbSnapshotForConflictCheck.auditEvents,
      ),
    ]
    : [];
  const publishedVersionCount = intendedRitualDocuments.filter(
    (document) => document.publishedVersionId,
  ).length;
  const staticRitualIdSetHash = createStaticRitualIdSetHash(input.staticRituals);
  const sourceBackedOnly = input.staticRituals.every(
    (ritual) => ritual.origin.type === "source",
  );
  const contentHashMatchCount = input.staticRituals.filter((ritual) => {
    const identity = getRitualVersionIdentity(ritual);
    const versionDocument = intendedVersionDocuments.find(
      (document) => document.versionId === identity.versionId,
    );

    return versionDocument?.contentHash === identity.contentHash;
  }).length;
  const rollbackProcedure = createRollbackProcedure(input.backupArtifactPath);
  const preservationGates = [
    {
      id: "mirror_successful",
      passed:
        input.mirrorReport.counts.skippedRecords === 0 &&
        input.mirrorReport.reconciliation.countsReconcile,
      message: "Static-to-DB mirror produced complete DB-shaped payload.",
    },
    {
      id: "source_backed_only",
      passed: sourceBackedOnly,
      message: "Backfill includes only existing source-backed Rituals.",
    },
    {
      id: "static_count_matches_intended_db_count",
      passed:
        input.staticRituals.length === intendedRitualDocuments.length &&
        input.staticRituals.length === intendedVersionDocuments.length,
      message: "Static count matches intended DB pointer and version counts.",
    },
    {
      id: "published_versions_present",
      passed: publishedVersionCount === input.staticRituals.length,
      message: "Every static Ritual has an intended published version pointer.",
    },
    {
      id: "content_hashes_match",
      passed: contentHashMatchCount === input.staticRituals.length,
      message: "Every intended DB version content hash matches static content.",
    },
    {
      id: "parity_passes",
      passed: isRitualDbParitySuccessful(parity),
      message: "DB-shaped records preserve static Ritual IDs, fields, grounding, validation, and export equivalence.",
    },
    {
      id: "backup_artifact_present",
      passed: Boolean(input.backupArtifactPath),
      message: "Backup artifact path is recorded before any production write.",
    },
    {
      id: "no_unsafe_existing_conflicts",
      passed: unsafeExistingConflicts.length === 0,
      message: "Existing Firestore documents are absent or exactly idempotent.",
    },
    {
      id: "rollback_documented",
      passed: rollbackProcedure.length > 0,
      message: "Rollback procedure is documented in the report.",
    },
  ];

  return {
    sourceStaticCommitSha: input.sourceStaticCommitSha,
    generatedAtIso: input.generatedAtIso,
    mode: input.mode ?? "dry_run",
    backupArtifactPath: input.backupArtifactPath,
    rollbackProcedure,
    counts: {
      staticRitualCount: input.staticRituals.length,
      staticRitualIdSetHash,
      dbPointerCount: intendedRitualDocuments.length,
      dbVersionCount: intendedVersionDocuments.length,
      dbValidationSnapshotCount: intendedValidationSnapshots.length,
      dbAuditEventCount: intendedAuditEvents.length,
      publishedVersionCount,
      contentHashMatchCount,
    },
    parity,
    unsafeExistingConflicts,
    preservationGates,
  };
}

export function isRitualDbBackfillReportSuccessful(
  report: RitualDbBackfillReport,
): boolean {
  return report.preservationGates.every((gate) => gate.passed);
}

export function formatRitualDbBackfillReport(
  report: RitualDbBackfillReport,
): string {
  const lines = [
    "Production Ritual DB backfill preservation report",
    "",
    `Mode: ${report.mode}`,
    `Firestore reads: ${report.mode === "dry_run" ? "no" : "yes"}`,
    `Firestore writes: ${report.mode === "post_write" ? "yes" : "no"}`,
    `Source static commit SHA: ${report.sourceStaticCommitSha}`,
    `Generated at: ${report.generatedAtIso}`,
    `Backup/export artifact path: ${report.backupArtifactPath ?? "(missing)"}`,
    "",
    "Counts",
    `- Static Ritual count: ${report.counts.staticRitualCount}`,
    `- Static Ritual ID set hash: ${report.counts.staticRitualIdSetHash}`,
    `- DB pointer count: ${report.counts.dbPointerCount}`,
    `- DB version count: ${report.counts.dbVersionCount}`,
    `- DB validation snapshot count: ${report.counts.dbValidationSnapshotCount}`,
    `- DB audit event count: ${report.counts.dbAuditEventCount}`,
    `- Published version count: ${report.counts.publishedVersionCount}`,
    `- Content hash match count: ${report.counts.contentHashMatchCount}`,
    "",
    "Preservation gates",
    ...report.preservationGates.map((gate) =>
      `- ${gate.passed ? "pass" : "fail"} ${gate.id}: ${gate.message}`,
    ),
    "",
    "Parity summary",
    `- Missing in DB: ${report.parity.missingInDb.length}`,
    `- Extra in DB: ${report.parity.extraInDb.length}`,
    `- Hash mismatches: ${report.parity.hashMismatches.length}`,
    `- Field mismatches: ${report.parity.fieldMismatches.length}`,
    `- Invalid DB records: ${report.parity.invalidDbRecords.length}`,
    `- Unpublished/unvalidated records: ${report.parity.unpublishedOrUnvalidated.length}`,
    `- Static export mismatches: ${report.parity.exportMismatches.length}`,
    `- Unsafe existing conflicts: ${report.unsafeExistingConflicts.length}`,
  ];

  if (report.unsafeExistingConflicts.length > 0) {
    lines.push("", "Unsafe existing conflicts");
    lines.push(
      ...report.unsafeExistingConflicts.map((conflict) =>
        `- ${conflict.collection}/${conflict.documentId}: ${conflict.reason}`,
      ),
    );
  }

  lines.push("", "Rollback procedure");
  lines.push(...report.rollbackProcedure.map((step) => `- ${step}`));

  lines.push("", "Parity detail");
  lines.push(formatRitualDbParityReport(report.parity).trimEnd());

  lines.push(
    "",
    `Backfill preservation result: ${isRitualDbBackfillReportSuccessful(report) ? "pass" : "fail"}`,
  );

  return `${lines.join("\n")}\n`;
}
