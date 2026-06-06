import { describe, expect, it } from "vitest";

import { getApprovedRitualPatterns } from "../../src/data/ritual-patterns";
import { seedSymbolicCards } from "../../src/data/seed-symbolic-cards";
import { starterSourceNotes } from "../../src/data/source-registry";
import {
  createContentReachabilityReport,
  formatContentReachabilityReport,
  getDefaultContentReachabilityScenarios,
} from "../../src/lib/content-reachability";

describe("content reachability diagnostics", () => {
  it("builds a representative privacy-safe scenario set", () => {
    const scenarios = getDefaultContentReachabilityScenarios();
    const approvedPatternCount = getApprovedRitualPatterns().length;
    const serializedScenarios = JSON.stringify(scenarios).toLowerCase();

    expect(scenarios.length).toBeGreaterThan(approvedPatternCount);
    expect(scenarios.map((scenario) => scenario.id)).toEqual(
      expect.arrayContaining([
        "pattern.tend_one_plant",
        "pattern.candle_light_focus",
        "pattern.table_reset",
      ]),
    );
    expect(serializedScenarios).not.toContain("@");
    expect(serializedScenarios).not.toContain("birth");
    expect(serializedScenarios).not.toContain("natal placement");
    expect(serializedScenarios).not.toContain("relationship details");
  });

  it("reports selected, evaluated, rejected, and gap coverage", () => {
    const report = createContentReachabilityReport();
    const approvedPatternKeys = getApprovedRitualPatterns().map(
      (pattern) => pattern.key,
    );

    expect(report.scenarioCount).toBeGreaterThan(approvedPatternKeys.length);
    expect(report.coverage.computedTimingFactTypes).toEqual(
      expect.arrayContaining([
        "moon_phase",
        "moon_sign",
        "numerology_date",
        "planet_sign",
        "planetary_aspect",
        "solar_season",
        "sun_sign",
      ]),
    );
    expect(report.coverage.selectedTimingRuleIds.some((id) =>
      id.startsWith("timing_rule.moon_phase."),
    )).toBe(true);
    expect(report.coverage.selectedTimingRuleIds.some((id) =>
      id.startsWith("timing_rule.solar_season."),
    )).toBe(true);
    expect(report.coverage.selectedRitualPatternKeys).toEqual(
      expect.arrayContaining([
        "bank_the_house_light",
        "banked_light_evening",
        "clear_one_surface",
        "first_light_at_the_threshold",
        "first_light_beginning",
        "full_light_on_the_table",
        "hearth_object_return",
        "kitchen_reset",
        "last_household_light",
        "plant_witness_to_growth",
        "quiet_welcome",
        "renewed_light_return",
        "seasonal_marker_bowl",
        "two_words_at_the_table",
        "unlit_or_electric_witness",
        "waning_light_release",
      ]),
    );
    expect(report.gaps.approvedRitualPatternsNotSelected).toEqual(
      expect.arrayContaining(["table_reset", "tea_ritual"]),
    );
    expect(report.gaps.approvedRitualPatternsNotSelected.length).toBeGreaterThan(0);
    expect(report.gaps.approvedRitualPatternsNotSelected.every((key) =>
      approvedPatternKeys.includes(key),
    )).toBe(true);
    expect(report.gaps.approvedRitualPatternsNotEvaluated).toEqual([]);
    expect(report.coverage.evaluatedRitualPatternKeys).toEqual(
      expect.arrayContaining(approvedPatternKeys),
    );
    expect(report.coverage.rejectedRitualPatternKeys.length).toBeGreaterThan(0);
    expect(report.scenarioResults.some((result) =>
      result.practiceChoiceStatus === "resolved_open_preference",
    )).toBe(true);
    expect(report.scenarioResults.some((result) =>
      result.practiceChoiceVisibleOptions.includes("Surprise me"),
    )).toBe(true);
    expect(report.scenarioResults.every((result) =>
      !result.practiceChoiceVisibleOptions.includes("Conversation"),
    )).toBe(true);
    expect(report.scenarioResults.some((result) =>
      result.numerologySelectedSignalLabels.length > 0,
    )).toBe(true);
    expect(report.scenarioResults.every((result) =>
      result.numerologySelectedSignalLabels.every((label) =>
        label.startsWith("Numerology "),
      ),
    )).toBe(true);
  });

  it("identifies cards and notes that are not selected in sampled generation", () => {
    const report = createContentReachabilityReport();
    const approvedCardKeys = seedSymbolicCards
      .filter((card) => card.approval_status === "approved")
      .map((card) => card.key);
    const sourceNoteIds = starterSourceNotes.map((note) => note.id);

    expect(report.coverage.selectedSymbolicCardKeys.length).toBeGreaterThan(0);
    expect(report.coverage.selectedSourceNoteIds.length).toBeGreaterThan(0);
    expect(report.gaps.approvedSymbolicCardsNotSelected.every((key) =>
      approvedCardKeys.includes(key),
    )).toBe(true);
    expect(report.gaps.sourceNotesNotSelected.every((id) =>
      sourceNoteIds.includes(id),
    )).toBe(true);
    expect(report.gaps.sourceNotesNotReferencedByContent).not.toContain(
      "note.computed_facts_are_not_meanings",
    );
    expect(report.gaps.sourceNotesNotReferencedByContent).not.toContain(
      "note.poison_control_essential_oil_block",
    );
  });

  it("formats a concise markdown report for local use", () => {
    const report = createContentReachabilityReport();
    const formatted = formatContentReachabilityReport(report);

    expect(formatted).toContain("# Content Reachability Diagnostics");
    expect(formatted).toContain("Scenarios sampled:");
    expect(formatted).toContain("Approved ritual patterns not selected:");
    expect(formatted).toContain("Source notes not referenced by cards, rules, or patterns:");
    expect(formatted).toContain("## Practice Choice Diagnostics");
    expect(formatted).toContain("## Numerology Diagnostics");
    expect(formatted).toContain("Visible practice options sampled:");
    expect(formatted).toContain("Numerology statuses:");
    expect(formatted).not.toContain("birth date");
    expect(formatted).not.toContain("private source text");
  });
});
