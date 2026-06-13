import { describe, expect, it } from "vitest";

import {
  createRitualDbBackfillBackupArtifact,
  createRitualDbBackfillReport,
  formatRitualDbBackfillReport,
  isRitualDbBackfillReportSuccessful,
} from "../../src/data/rituals/db-backfill";
import { createRitualDbMirrorDryRun } from "../../src/data/rituals/db-mirror";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";

const generatedAtIso = "2026-06-13T00:00:00.000Z";
const sourceStaticCommitSha = "test-static-commit";
const backupArtifactPath =
  ".moon-table-private/ritual-backfills/test-ritual-db-backfill.json";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createMirrorReport(count = 2) {
  const report = createRitualDbMirrorDryRun(
    sourceBackedRituals.slice(0, count),
    { generatedAtIso },
  );

  expect(report.skipped).toEqual([]);
  return report;
}

describe("Ritual DB production backfill preservation report", () => {
  it("creates a backup artifact with static Rituals and full DB write payloads", () => {
    const mirrorReport = createMirrorReport(1);
    const backup = createRitualDbBackfillBackupArtifact({
      sourceStaticCommitSha,
      generatedAtIso,
      staticRituals: sourceBackedRituals.slice(0, 1),
      mirrorReport,
    });

    expect(backup.schemaVersion).toBe("ritual-db-backfill-backup-v1");
    expect(backup.sourceStaticCommitSha).toBe(sourceStaticCommitSha);
    expect(backup.staticRituals).toEqual(sourceBackedRituals.slice(0, 1));
    expect(backup.writePayload.ritualDocuments).toHaveLength(1);
    expect(backup.writePayload.versionDocuments).toHaveLength(1);
    expect(backup.writePayload.validationSnapshots).toHaveLength(1);
    expect(backup.writePayload.auditEvents).toHaveLength(1);
  });

  it("passes when the intended DB payload preserves every static Ritual", () => {
    const mirrorReport = createMirrorReport(2);
    const report = createRitualDbBackfillReport({
      sourceStaticCommitSha,
      generatedAtIso,
      staticRituals: sourceBackedRituals.slice(0, 2),
      mirrorReport,
      backupArtifactPath,
    });

    expect(isRitualDbBackfillReportSuccessful(report)).toBe(true);
    expect(report.counts.staticRitualCount).toBe(2);
    expect(report.counts.dbPointerCount).toBe(2);
    expect(report.counts.dbVersionCount).toBe(2);
    expect(report.counts.publishedVersionCount).toBe(2);
    expect(report.counts.contentHashMatchCount).toBe(2);
    expect(report.parity.missingInDb).toEqual([]);
  });

  it("fails when the backup artifact path is missing", () => {
    const mirrorReport = createMirrorReport(1);
    const report = createRitualDbBackfillReport({
      sourceStaticCommitSha,
      generatedAtIso,
      staticRituals: sourceBackedRituals.slice(0, 1),
      mirrorReport,
    });

    expect(isRitualDbBackfillReportSuccessful(report)).toBe(false);
    expect(report.preservationGates).toContainEqual({
      id: "backup_artifact_present",
      passed: false,
      message: "Backup artifact path is recorded before any production write.",
    });
  });

  it("refuses unsafe existing Firestore conflicts but allows idempotent existing records", () => {
    const mirrorReport = createMirrorReport(1);
    const [record] = mirrorReport.mirrored;
    const changedExistingRitual = clone(record.ritualDocument);

    changedExistingRitual.searchIndex.headline = "Changed existing headline";

    const conflictingReport = createRitualDbBackfillReport({
      sourceStaticCommitSha,
      generatedAtIso,
      staticRituals: sourceBackedRituals.slice(0, 1),
      mirrorReport,
      backupArtifactPath,
      existingDbSnapshotForConflictCheck: {
        ritualDocuments: [changedExistingRitual],
        versionDocuments: [],
        validationSnapshots: [],
        auditEvents: [],
      },
    });
    const idempotentReport = createRitualDbBackfillReport({
      sourceStaticCommitSha,
      generatedAtIso,
      staticRituals: sourceBackedRituals.slice(0, 1),
      mirrorReport,
      backupArtifactPath,
      existingDbSnapshotForConflictCheck: {
        ritualDocuments: [record.ritualDocument],
        versionDocuments: [record.versionDocument],
        validationSnapshots: [record.validationSnapshot],
        auditEvents: [record.auditEvent],
      },
    });

    expect(isRitualDbBackfillReportSuccessful(conflictingReport)).toBe(false);
    expect(conflictingReport.unsafeExistingConflicts).toEqual([{
      collection: "rituals",
      documentId: record.ritualDocument.id,
      reason:
        "Existing Firestore document differs from the intended backfill payload.",
    }]);
    expect(isRitualDbBackfillReportSuccessful(idempotentReport)).toBe(true);
    expect(idempotentReport.unsafeExistingConflicts).toEqual([]);
  });

  it("fails if a non-source-backed Ritual enters the backfill set", () => {
    const householdRitual = {
      ...clone(sourceBackedRituals[0]),
      id: "household_test_ritual",
      origin: {
        type: "household",
        householdContext: "Generic household context.",
      },
    } as Ritual;
    const mirrorReport = createRitualDbMirrorDryRun([householdRitual], {
      generatedAtIso,
    });
    const report = createRitualDbBackfillReport({
      sourceStaticCommitSha,
      generatedAtIso,
      staticRituals: [householdRitual],
      mirrorReport,
      backupArtifactPath,
    });

    expect(isRitualDbBackfillReportSuccessful(report)).toBe(false);
    expect(report.preservationGates).toContainEqual({
      id: "source_backed_only",
      passed: false,
      message: "Backfill includes only existing source-backed Rituals.",
    });
  });

  it("formats the required runbook and preservation audit fields", () => {
    const report = createRitualDbBackfillReport({
      sourceStaticCommitSha,
      generatedAtIso,
      staticRituals: sourceBackedRituals.slice(0, 1),
      mirrorReport: createMirrorReport(1),
      backupArtifactPath,
    });
    const formatted = formatRitualDbBackfillReport(report);

    expect(formatted).toContain("Production Ritual DB backfill preservation report");
    expect(formatted).toContain("Firestore reads: no");
    expect(formatted).toContain("Firestore writes: no");
    expect(formatted).toContain("Source static commit SHA: test-static-commit");
    expect(formatted).toContain("Static Ritual count: 1");
    expect(formatted).toContain("Static Ritual ID set hash:");
    expect(formatted).toContain("Backup/export artifact path:");
    expect(formatted).toContain("Rollback procedure");
    expect(formatted).toContain("Backfill preservation result: pass");
  });
});
