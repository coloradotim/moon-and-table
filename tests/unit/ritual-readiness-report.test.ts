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
      draft: 218,
      reviewed: 0,
      recommendable: 0,
    });
    expect(report.availability).toEqual({
      findable: 218,
      directUseEligible: 0,
      recommendationEligible: 0,
    });
    expect(report.validation).toEqual({
      valid: true,
      findings: [],
    });
  });

  it("reports zero recommendation-eligible records in formatted output", () => {
    const formatted = formatRitualReadinessReport(
      createRitualReadinessReport(sourceBackedRituals),
    );

    expect(formatted).toContain("Ritual readiness report");
    expect(formatted).toContain("- recommendation eligible: 0");
    expect(formatted).toContain("- valid: true");
    expect(formatted).toContain("- findings: 0");
    expect(formatted).not.toContain("undefined");
  });

  it("includes direct-use and recommendation review as missing readiness for all source-backed records", () => {
    const report = createRitualReadinessReport(sourceBackedRituals);
    const formatted = formatRitualReadinessReport(report);

    expect(report.records).toHaveLength(218);

    for (const record of report.records) {
      expect(record.missing).toEqual([
        "direct_use_review",
        "recommendation_review",
      ]);
      expect(record.recommendationEligible).toBe(false);
      expect(record.recommendable).toBe(false);
      expect(formatted).toContain(`${record.id} | draft`);
      expect(formatted).toContain(`${record.id}`);
      expect(formatted).toContain(
        "missing: direct_use_review, recommendation_review",
      );
    }
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
