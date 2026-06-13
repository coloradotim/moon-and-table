import { describe, expect, it } from "vitest";

import {
  createRitualDbParityReport,
  formatRitualDbParityReport,
  isRitualDbParitySuccessful,
} from "../../src/data/rituals/db-parity";
import {
  createRitualDbMirrorDryRun,
  type RitualDbMirrorDryRunRecord,
} from "../../src/data/rituals/db-mirror";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";

const generatedAtIso = "2026-06-13T00:00:00.000Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createMirrorRecords(count = 2): RitualDbMirrorDryRunRecord[] {
  const report = createRitualDbMirrorDryRun(
    sourceBackedRituals.slice(0, count),
    { generatedAtIso },
  );

  expect(report.skipped).toEqual([]);
  return report.mirrored;
}

function createReport(
  staticRituals: readonly Ritual[],
  records: readonly RitualDbMirrorDryRunRecord[],
) {
  return createRitualDbParityReport({
    staticRituals,
    ritualDocuments: records.map((record) => record.ritualDocument),
    versionDocuments: records.map((record) => record.versionDocument),
    validationSnapshots: records.map((record) => record.validationSnapshot),
  });
}

describe("static-vs-DB Ritual parity", () => {
  it("passes when every static Ritual has a matching DB pointer, version, validation snapshot, and export", () => {
    const staticRituals = sourceBackedRituals.slice(0, 2);
    const report = createReport(staticRituals, createMirrorRecords(2).reverse());

    expect(isRitualDbParitySuccessful(report)).toBe(true);
    expect(report.counts.staticRituals).toBe(2);
    expect(report.counts.dbRitualDocuments).toBe(2);
    expect(report.counts.publishedVersionsMatched).toBe(2);
    expect(report.counts.contentHashesMatched).toBe(2);
    expect(report.counts.exportableRituals).toBe(2);
    expect(report.missingInDb).toEqual([]);
    expect(report.extraInDb).toEqual([]);
    expect(report.fieldMismatches).toEqual([]);
  });

  it("reports missing and extra DB Ritual documents", () => {
    const records = createMirrorRecords(2);
    const extraRecord = clone(records[0]);

    extraRecord.ritualDocument.id = "extra_ritual";
    extraRecord.ritualDocument.searchIndex.headline = "Extra ritual";
    extraRecord.versionDocument.ritualId = "extra_ritual";

    const report = createReport(
      [sourceBackedRituals[0], sourceBackedRituals[2]],
      [records[0], extraRecord],
    );

    expect(isRitualDbParitySuccessful(report)).toBe(false);
    expect(report.missingInDb).toEqual([sourceBackedRituals[2].id]);
    expect(report.extraInDb).toEqual(["extra_ritual"]);
  });

  it("reports hash and version identity mismatches", () => {
    const [record] = createMirrorRecords(1);
    const mismatchedRecord = clone(record);

    mismatchedRecord.versionDocument.contentHash =
      "fnv1a128:00000000000000000000000000000000";

    const report = createReport([sourceBackedRituals[0]], [mismatchedRecord]);

    expect(isRitualDbParitySuccessful(report)).toBe(false);
    expect(report.hashMismatches.map((mismatch) => mismatch.path)).toContain(
      "contentHash",
    );
    expect(report.invalidDbRecords.map((record) => record.recordType)).toContain(
      "versionDocument",
    );
  });

  it("reports field mismatches for presentation and source grounding", () => {
    const [record] = createMirrorRecords(1);
    const mismatchedRecord = clone(record);

    mismatchedRecord.versionDocument.ritual.presentation.headline =
      "Changed headline";
    if (mismatchedRecord.versionDocument.ritual.origin.type !== "source") {
      throw new Error("Expected source-backed test ritual.");
    }
    mismatchedRecord.versionDocument.ritual.origin.sourceGrounding = [];

    const report = createReport([sourceBackedRituals[0]], [mismatchedRecord]);

    expect(isRitualDbParitySuccessful(report)).toBe(false);
    expect(report.fieldMismatches.map((mismatch) => mismatch.path)).toContain(
      "presentation",
    );
    expect(report.fieldMismatches.map((mismatch) => mismatch.path)).toContain(
      "origin.sourceGrounding",
    );
  });

  it("reports unpublished and unvalidated DB records", () => {
    const [record] = createMirrorRecords(1);
    const unpublishedRecord = clone(record);

    delete unpublishedRecord.ritualDocument.publishedVersionId;

    const unpublishedReport = createReport(
      [sourceBackedRituals[0]],
      [unpublishedRecord],
    );
    const unvalidatedReport = createRitualDbParityReport({
      staticRituals: [sourceBackedRituals[0]],
      ritualDocuments: [record.ritualDocument],
      versionDocuments: [record.versionDocument],
      validationSnapshots: [],
    });

    expect(isRitualDbParitySuccessful(unpublishedReport)).toBe(false);
    expect(unpublishedReport.unpublishedOrUnvalidated[0].reason).toBe(
      "Missing publishedVersionId.",
    );
    expect(isRitualDbParitySuccessful(unvalidatedReport)).toBe(false);
    expect(unvalidatedReport.unpublishedOrUnvalidated[0].reason).toBe(
      "Missing validation snapshot.",
    );
    expect(unvalidatedReport.exportMismatches[0].path).toBe(
      "staticExport.skipped",
    );
  });

  it("formats a readable parity report for PR review", () => {
    const report = createReport(sourceBackedRituals.slice(0, 1), createMirrorRecords(1));
    const formatted = formatRitualDbParityReport(report);

    expect(formatted).toContain("Static-vs-DB Ritual parity report");
    expect(formatted).toContain("Firestore reads: no");
    expect(formatted).toContain("Static Rituals: 1");
    expect(formatted).toContain("Parity result: pass");
  });
});
