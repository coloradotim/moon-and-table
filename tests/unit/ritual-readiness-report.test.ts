import { describe, expect, it } from "vitest";

import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import {
  createRitualReadinessReport,
  formatRitualReadinessReport,
} from "../../src/data/rituals/readiness-report";
import type { Ritual } from "../../src/data/rituals/types";

describe("Ritual readiness report", () => {
  it("summarizes the current source-backed import records", () => {
    const report = createRitualReadinessReport(sourceBackedRituals);

    expect(report.total).toBe(218);
    expect(report.byStatus).toEqual({
      pilot: 0,
      draft: 0,
      reviewed: 36,
      recommendable: 182,
    });
    expect(report.availability).toEqual({
      findable: 218,
      directUseEligible: 218,
      recommendationEligible: 182,
    });
    expect(report.validation).toEqual({
      valid: true,
      findings: [],
    });
  });

  it("reports recommendation-eligible records in formatted output", () => {
    const formatted = formatRitualReadinessReport(
      createRitualReadinessReport(sourceBackedRituals),
    );

    expect(formatted).toContain("Ritual readiness report");
    expect(formatted).toContain("- recommendation eligible: 182");
    expect(formatted).toContain("- valid: true");
    expect(formatted).toContain("- findings: 0");
    expect(formatted).not.toContain("undefined");
  });

  it("keeps explicit missing reasons only on held recommendation records", () => {
    const report = createRitualReadinessReport(sourceBackedRituals);
    const formatted = formatRitualReadinessReport(report);

    expect(report.records).toHaveLength(218);

    for (const record of report.records.filter(
      (candidate) => candidate.recommendationEligible,
    )) {
      expect(record.missing).toEqual([]);
      expect(record.recommendable).toBe(true);
      expect(formatted).toContain(`${record.id} | ${record.status}`);
      expect(formatted).toContain(`${record.id}`);
    }

    for (const record of report.records.filter(
      (candidate) => !candidate.recommendationEligible,
    )) {
      expect(record.missing.length).toBeGreaterThan(0);
      expect(record.recommendable).toBe(false);
      expect(formatted).toContain(`${record.id} | ${record.status}`);
      expect(formatted).toContain(`${record.id}`);
    }

    expect(
      report.records.filter(
        (record) =>
          record.directUseEligible && !record.missing.includes("direct_use_review"),
      ),
    ).toHaveLength(218);
    expect(
      report.records.filter((record) =>
        record.missing.includes("timing_engine_wiring"),
      ),
    ).toHaveLength(22);
  });

  it("surfaces validation findings when invalid data is passed", () => {
    const invalid = {
      ...sourceBackedRituals[0],
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
        purposes: {
          ...sourceBackedRituals[0].recommendationMetadata.purposes,
          primary: "generic" as Ritual["recommendationMetadata"]["purposes"]["primary"],
        },
      },
    } satisfies Ritual;
    const report = createRitualReadinessReport([invalid]);
    const formatted = formatRitualReadinessReport(report);

    expect(report.validation.valid).toBe(false);
    expect(report.validation.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ritualId: sourceBackedRituals[0].id,
          path: "recommendationMetadata.purposes.primary",
        }),
      ]),
    );
    expect(formatted).toContain("Validation findings:");
    expect(formatted).toContain("recommendationMetadata.purposes.primary");
    expect(formatted).toContain("Primary purpose is invalid.");
  });
});
