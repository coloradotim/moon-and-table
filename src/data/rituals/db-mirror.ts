import {
  createRitualDbDocumentPair,
  createRitualValidationSnapshotDocument,
  DEFAULT_RITUAL_DB_CREATED_AT_ISO,
  validateRitualAuditEventDocument,
  validateRitualDocumentPair,
  validateRitualValidationSnapshotDocument,
  type RitualAuditEventDocument,
  type RitualDbValidationFinding,
  type RitualDocument,
  type RitualValidationSnapshotDocument,
  type RitualVersionDocument,
} from "./db-documents";
import { sourceBackedRituals } from "./source-backed-rituals";
import type { Ritual } from "./types";
import { getRitualVersionIdentity } from "./version-identity";

export type RitualDbMirrorDryRunRecord = {
  ritualId: string;
  versionId: string;
  contentHash: string;
  ritualDocument: RitualDocument;
  versionDocument: RitualVersionDocument;
  validationSnapshot: RitualValidationSnapshotDocument;
  auditEvent: RitualAuditEventDocument;
};

export type RitualDbMirrorSkippedRecord = {
  ritualId: string;
  headline?: string;
  reasons: RitualDbValidationFinding[];
};

export type RitualDbMirrorDryRunReport = {
  generatedAtIso: string;
  validatorVersion: string;
  source: "static_source_backed_rituals";
  counts: {
    staticRitualsRead: number;
    ritualDocumentsGenerated: number;
    versionDocumentsGenerated: number;
    validationSnapshotsGenerated: number;
    auditEventsGenerated: number;
    skippedRecords: number;
  };
  reconciliation: {
    countsReconcile: boolean;
    staticRitualIds: number;
    mirroredRitualIds: number;
    missingRitualIds: string[];
    duplicateRitualIds: string[];
    duplicateVersionIds: string[];
  };
  mirrored: RitualDbMirrorDryRunRecord[];
  skipped: RitualDbMirrorSkippedRecord[];
};

export type CreateRitualDbMirrorDryRunOptions = {
  generatedAtIso?: string;
  validatorVersion?: string;
};

const DEFAULT_MIRROR_VALIDATOR_VERSION = "static-db-mirror-dry-run-v1";

function normalizeIdPart(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function createValidationSnapshotId(versionId: string): string {
  return `validation_${normalizeIdPart(versionId)}`;
}

function createAuditEventId(versionId: string): string {
  return `audit_db_mirror_created_${normalizeIdPart(versionId)}`;
}

function countDuplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates].sort();
}

function finding(
  path: string,
  message: string,
): RitualDbValidationFinding {
  return { path, message, severity: "error" };
}

function createAuditEvent(input: {
  ritualId: string;
  versionId: string;
  validationSnapshotId: string;
  createdAtIso: string;
}): RitualAuditEventDocument {
  return {
    id: createAuditEventId(input.versionId),
    ritualId: input.ritualId,
    versionId: input.versionId,
    eventType: "db_mirror_created",
    actor: "codex",
    summary: "Dry-run mirror generated DB-shaped documents from static Ritual data.",
    relatedValidationSnapshotId: input.validationSnapshotId,
    createdAtIso: input.createdAtIso,
  };
}

function createSkippedRecord(
  ritual: Ritual,
  reasons: RitualDbValidationFinding[],
): RitualDbMirrorSkippedRecord {
  return {
    ritualId: ritual.id,
    headline: ritual.presentation?.headline,
    reasons,
  };
}

export function createRitualDbMirrorDryRun(
  rituals: readonly Ritual[],
  options: CreateRitualDbMirrorDryRunOptions = {},
): RitualDbMirrorDryRunReport {
  const generatedAtIso =
    options.generatedAtIso ?? DEFAULT_RITUAL_DB_CREATED_AT_ISO;
  const validatorVersion =
    options.validatorVersion ?? DEFAULT_MIRROR_VALIDATOR_VERSION;
  const ritualIds = rituals.map((ritual) => ritual.id);
  const versionIds = rituals.map((ritual) => getRitualVersionIdentity(ritual).versionId);
  const duplicateRitualIds = countDuplicates(ritualIds);
  const duplicateVersionIds = countDuplicates(versionIds);
  const mirrored: RitualDbMirrorDryRunRecord[] = [];
  const skipped: RitualDbMirrorSkippedRecord[] = [];
  const processedRitualIds = new Set<string>();
  const processedVersionIds = new Set<string>();

  for (const ritual of rituals) {
    const identity = getRitualVersionIdentity(ritual);
    const duplicateFindings = [
      ...(processedRitualIds.has(ritual.id)
        ? [finding("ritualId", "Duplicate Ritual id in static mirror input.")]
        : []),
      ...(processedVersionIds.has(identity.versionId)
        ? [finding("versionId", "Duplicate version id in static mirror input.")]
        : []),
    ];

    if (duplicateFindings.length > 0) {
      skipped.push(createSkippedRecord(ritual, duplicateFindings));
      continue;
    }

    processedRitualIds.add(ritual.id);
    processedVersionIds.add(identity.versionId);

    const validationSnapshotId = createValidationSnapshotId(identity.versionId);
    const { ritualDocument, versionDocument } = createRitualDbDocumentPair(ritual, {
      createdAtIso: generatedAtIso,
      updatedAtIso: generatedAtIso,
      createdBy: "codex",
      currentVersionId: identity.versionId,
      publishedVersionId: identity.versionId,
      latestValidationSnapshotId: validationSnapshotId,
    });
    const validationSnapshot = createRitualValidationSnapshotDocument({
      id: validationSnapshotId,
      ritualDocument,
      versionDocument,
      validatorVersion,
      generatedAtIso,
    });
    const auditEvent = createAuditEvent({
      ritualId: ritual.id,
      versionId: identity.versionId,
      validationSnapshotId,
      createdAtIso: generatedAtIso,
    });
    const findings = [
      ...validateRitualDocumentPair(ritualDocument, versionDocument).findings,
      ...validateRitualValidationSnapshotDocument(
        validationSnapshot,
        versionDocument,
      ).findings,
      ...validateRitualAuditEventDocument(auditEvent).findings,
    ].filter((candidate) => candidate.severity === "error");

    if (findings.length > 0) {
      skipped.push(createSkippedRecord(ritual, findings));
      continue;
    }

    mirrored.push({
      ritualId: ritual.id,
      versionId: identity.versionId,
      contentHash: identity.contentHash,
      ritualDocument,
      versionDocument,
      validationSnapshot,
      auditEvent,
    });
  }

  const mirroredRitualIdSet = new Set(mirrored.map((record) => record.ritualId));
  const missingRitualIds = ritualIds
    .filter((ritualId) => !mirroredRitualIdSet.has(ritualId))
    .filter((ritualId, index, values) => values.indexOf(ritualId) === index)
    .sort();
  const countsReconcile = rituals.length === mirrored.length + skipped.length;

  return {
    generatedAtIso,
    validatorVersion,
    source: "static_source_backed_rituals",
    counts: {
      staticRitualsRead: rituals.length,
      ritualDocumentsGenerated: mirrored.length,
      versionDocumentsGenerated: mirrored.length,
      validationSnapshotsGenerated: mirrored.length,
      auditEventsGenerated: mirrored.length,
      skippedRecords: skipped.length,
    },
    reconciliation: {
      countsReconcile,
      staticRitualIds: new Set(ritualIds).size,
      mirroredRitualIds: mirroredRitualIdSet.size,
      missingRitualIds,
      duplicateRitualIds,
      duplicateVersionIds,
    },
    mirrored,
    skipped,
  };
}

export function createSourceBackedRitualDbMirrorDryRun(
  options: CreateRitualDbMirrorDryRunOptions = {},
): RitualDbMirrorDryRunReport {
  return createRitualDbMirrorDryRun(sourceBackedRituals, options);
}

export function isRitualDbMirrorDryRunSuccessful(
  report: RitualDbMirrorDryRunReport,
): boolean {
  return (
    report.reconciliation.countsReconcile &&
    report.reconciliation.missingRitualIds.length === 0 &&
    report.reconciliation.duplicateRitualIds.length === 0 &&
    report.reconciliation.duplicateVersionIds.length === 0 &&
    report.counts.skippedRecords === 0
  );
}

export function formatRitualDbMirrorDryRunReport(
  report: RitualDbMirrorDryRunReport,
): string {
  const lines = [
    "Static-to-DB Ritual mirror dry run",
    "",
    `Generated at: ${report.generatedAtIso}`,
    `Validator version: ${report.validatorVersion}`,
    "Firestore writes: no",
    "",
    "Counts",
    `- Static Rituals read: ${report.counts.staticRitualsRead}`,
    `- Ritual documents generated: ${report.counts.ritualDocumentsGenerated}`,
    `- Version documents generated: ${report.counts.versionDocumentsGenerated}`,
    `- Validation snapshots generated: ${report.counts.validationSnapshotsGenerated}`,
    `- Audit events generated: ${report.counts.auditEventsGenerated}`,
    `- Skipped records: ${report.counts.skippedRecords}`,
    "",
    "Reconciliation",
    `- Counts reconcile: ${report.reconciliation.countsReconcile ? "yes" : "no"}`,
    `- Static Ritual IDs: ${report.reconciliation.staticRitualIds}`,
    `- Mirrored Ritual IDs: ${report.reconciliation.mirroredRitualIds}`,
    `- Missing Ritual IDs: ${report.reconciliation.missingRitualIds.length}`,
    `- Duplicate Ritual IDs: ${report.reconciliation.duplicateRitualIds.length}`,
    `- Duplicate version IDs: ${report.reconciliation.duplicateVersionIds.length}`,
    "",
    "Closeout",
    `- Static Rituals read: ${report.counts.staticRitualsRead}`,
    `- Static Rituals validated: ${report.counts.ritualDocumentsGenerated}`,
    `- DB Rituals generated: ${report.counts.ritualDocumentsGenerated}`,
    `- DB versions generated: ${report.counts.versionDocumentsGenerated}`,
    `- Validation snapshots: ${report.counts.validationSnapshotsGenerated}`,
    `- Skipped records and reasons: ${report.counts.skippedRecords}`,
  ];

  if (report.reconciliation.missingRitualIds.length > 0) {
    lines.push("", "Missing Ritual IDs");
    lines.push(...report.reconciliation.missingRitualIds.map((id) => `- ${id}`));
  }

  if (report.reconciliation.duplicateRitualIds.length > 0) {
    lines.push("", "Duplicate Ritual IDs");
    lines.push(...report.reconciliation.duplicateRitualIds.map((id) => `- ${id}`));
  }

  if (report.reconciliation.duplicateVersionIds.length > 0) {
    lines.push("", "Duplicate version IDs");
    lines.push(...report.reconciliation.duplicateVersionIds.map((id) => `- ${id}`));
  }

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
    `Dry run result: ${isRitualDbMirrorDryRunSuccessful(report) ? "pass" : "fail"}`,
  );

  return `${lines.join("\n")}\n`;
}
