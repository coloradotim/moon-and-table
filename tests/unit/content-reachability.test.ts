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
        "clear_one_surface",
        "bread_enoughness_cue",
        "candle_light_focus",
        "close_the_evening",
        "end_of_week_closing",
        "houseplant_check_in",
        "kitchen_reset",
        "lavender_soft_rest_cue",
        "ordinary_cooking_care_cue",
        "prune_one_dead_leaf",
        "return_one_object",
        "room_reset",
        "seasonal_table_home_reset",
        "table_reset",
        "tend_one_plant",
        "threshold_reset",
      ]),
    );
    expect(report.gaps.approvedRitualPatternsNotSelected).toEqual(
      expect.arrayContaining(["one_clear_sentence", "tea_ritual"]),
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
    expect(formatted).not.toContain("birth date");
    expect(formatted).not.toContain("private source text");
  });
});
