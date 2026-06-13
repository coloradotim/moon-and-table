import { describe, expect, it } from "vitest";

import {
  createRitualDbMirrorDryRun,
  createSourceBackedRitualDbMirrorDryRun,
  formatRitualDbMirrorDryRunReport,
  isRitualDbMirrorDryRunSuccessful,
} from "../../src/data/rituals/db-mirror";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";
import { getRitualVersionIdentity } from "../../src/data/rituals/version-identity";

const generatedAtIso = "2026-06-13T00:00:00.000Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe("static-to-DB Ritual mirror dry run", () => {
  it("generates DB-shaped docs, validation snapshots, and audit events for every static Ritual", () => {
    const report = createSourceBackedRitualDbMirrorDryRun({ generatedAtIso });
    const firstRitual = sourceBackedRituals[0];
    const firstIdentity = getRitualVersionIdentity(firstRitual);
    const firstRecord = report.mirrored[0];

    expect(isRitualDbMirrorDryRunSuccessful(report)).toBe(true);
    expect(report.counts.staticRitualsRead).toBe(sourceBackedRituals.length);
    expect(report.counts.ritualDocumentsGenerated).toBe(sourceBackedRituals.length);
    expect(report.counts.versionDocumentsGenerated).toBe(sourceBackedRituals.length);
    expect(report.counts.validationSnapshotsGenerated).toBe(
      sourceBackedRituals.length,
    );
    expect(report.counts.auditEventsGenerated).toBe(sourceBackedRituals.length);
    expect(report.counts.skippedRecords).toBe(0);
    expect(report.reconciliation.missingRitualIds).toEqual([]);
    expect(report.reconciliation.duplicateRitualIds).toEqual([]);
    expect(report.reconciliation.duplicateVersionIds).toEqual([]);

    expect(firstRecord.ritualId).toBe(firstRitual.id);
    expect(firstRecord.versionId).toBe(firstIdentity.versionId);
    expect(firstRecord.contentHash).toBe(firstIdentity.contentHash);
    expect(firstRecord.ritualDocument.id).toBe(firstRitual.id);
    expect(firstRecord.ritualDocument.currentVersionId).toBe(
      firstIdentity.versionId,
    );
    expect(firstRecord.ritualDocument.publishedVersionId).toBe(
      firstIdentity.versionId,
    );
    expect(firstRecord.versionDocument.ritual).toEqual(firstRitual);
    expect(firstRecord.versionDocument.contentHash).toBe(
      firstIdentity.contentHash,
    );
    expect(firstRecord.validationSnapshot.valid).toBe(true);
    expect(firstRecord.validationSnapshot.contentHash).toBe(
      firstIdentity.contentHash,
    );
    expect(firstRecord.ritualDocument.latestValidationSnapshotId).toBe(
      firstRecord.validationSnapshot.id,
    );
    expect(firstRecord.auditEvent.eventType).toBe("db_mirror_created");
    expect(firstRecord.auditEvent.relatedValidationSnapshotId).toBe(
      firstRecord.validationSnapshot.id,
    );
    expect(firstRecord.auditEvent.createdAtIso).toBe(generatedAtIso);
  });

  it("reports invalid records with validation reasons instead of mirroring them", () => {
    const invalidRitual = {
      ...clone(sourceBackedRituals[0]),
      privateSourceText: "Do not store this.",
    } as Ritual & { privateSourceText: string };
    const report = createRitualDbMirrorDryRun([invalidRitual], {
      generatedAtIso,
    });

    expect(isRitualDbMirrorDryRunSuccessful(report)).toBe(false);
    expect(report.mirrored).toEqual([]);
    expect(report.counts.skippedRecords).toBe(1);
    expect(report.skipped[0].ritualId).toBe(invalidRitual.id);
    expect(report.skipped[0].reasons.map((reason) => reason.path)).toContain(
      "ritual.privateSourceText",
    );
    expect(report.reconciliation.missingRitualIds).toEqual([invalidRitual.id]);
  });

  it("reports duplicate Ritual and version ids", () => {
    const duplicate = clone(sourceBackedRituals[0]);
    const report = createRitualDbMirrorDryRun(
      [sourceBackedRituals[0], duplicate],
      { generatedAtIso },
    );
    const identity = getRitualVersionIdentity(sourceBackedRituals[0]);

    expect(isRitualDbMirrorDryRunSuccessful(report)).toBe(false);
    expect(report.mirrored).toHaveLength(1);
    expect(report.skipped).toHaveLength(1);
    expect(report.reconciliation.duplicateRitualIds).toEqual([
      sourceBackedRituals[0].id,
    ]);
    expect(report.reconciliation.duplicateVersionIds).toEqual([
      identity.versionId,
    ]);
    expect(report.skipped[0].reasons.map((reason) => reason.path)).toEqual([
      "ritualId",
      "versionId",
    ]);
  });

  it("formats a closeout report for PR review", () => {
    const report = createSourceBackedRitualDbMirrorDryRun({ generatedAtIso });
    const formatted = formatRitualDbMirrorDryRunReport(report);

    expect(formatted).toContain("Static-to-DB Ritual mirror dry run");
    expect(formatted).toContain("Firestore writes: no");
    expect(formatted).toContain(
      `- Static Rituals read: ${sourceBackedRituals.length}`,
    );
    expect(formatted).toContain("Dry run result: pass");
  });
});
