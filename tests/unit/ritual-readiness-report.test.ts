import { describe, expect, it } from "vitest";

import { pilotRituals } from "../../src/data/rituals/pilot-rituals";
import {
  createRitualReadinessReport,
  formatRitualReadinessReport,
} from "../../src/data/rituals/readiness-report";
import type { Ritual } from "../../src/data/rituals/types";

describe("Ritual readiness report", () => {
  it("summarizes the current three pilot records", () => {
    const report = createRitualReadinessReport(pilotRituals);

    expect(report.total).toBe(3);
    expect(report.byStatus).toEqual({
      pilot: 3,
      draft: 0,
      reviewed: 0,
      recommendable: 0,
    });
    expect(report.availability).toEqual({
      findable: 3,
      directUseEligible: 3,
      recommendationEligible: 0,
    });
    expect(report.validation).toEqual({
      valid: true,
      findings: [],
    });
  });

  it("reports zero recommendation-eligible records in formatted output", () => {
    const formatted = formatRitualReadinessReport(
      createRitualReadinessReport(pilotRituals),
    );

    expect(formatted).toContain("Ritual readiness report");
    expect(formatted).toContain("- recommendation eligible: 0");
    expect(formatted).toContain("- valid: true");
    expect(formatted).toContain("- findings: 0");
    expect(formatted).not.toContain("undefined");
  });

  it("includes pilot_review as the missing readiness item for all pilot records", () => {
    const report = createRitualReadinessReport(pilotRituals);
    const formatted = formatRitualReadinessReport(report);

    expect(report.records).toHaveLength(3);

    for (const record of report.records) {
      expect(record.missing).toEqual(["pilot_review"]);
      expect(record.recommendationEligible).toBe(false);
      expect(record.recommendable).toBe(false);
      expect(formatted).toContain(`${record.id} | pilot`);
      expect(formatted).toContain(`${record.id}`);
      expect(formatted).toContain("missing: pilot_review");
    }
  });

  it("surfaces validation findings when invalid data is passed", () => {
    const invalid = {
      ...pilotRituals[0],
      recommendationMetadata: {
        ...pilotRituals[0].recommendationMetadata,
        purposes: {
          ...pilotRituals[0].recommendationMetadata.purposes,
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
          ritualId: "ritual.wet_the_seed_and_wait",
          path: "recommendationMetadata.purposes.primary",
        }),
      ]),
    );
    expect(formatted).toContain("Validation findings:");
    expect(formatted).toContain("recommendationMetadata.purposes.primary");
    expect(formatted).toContain("Primary purpose is invalid.");
  });
});
