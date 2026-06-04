import { describe, expect, it } from "vitest";

import { recommendationQualityScenarios } from "../fixtures/recommendation-quality-scenarios";
import {
  createRecommendationQualityReport,
  formatRecommendationQualityReport,
  getRecommendationQualityWarnings,
} from "../../scripts/recommendation-quality-report";

function normalCopyFieldsFromReport(): string {
  const report = createRecommendationQualityReport();

  return report.scenarioResults
    .flatMap((result) => [
      result.brief.theme,
      result.brief.recommendedRitual,
      result.brief.intention,
      result.brief.bestWindow,
      result.brief.optionalAddOn,
      result.brief.reflectionPrompt,
      result.brief.explanation.whyThisFits,
      ...result.howThisWasChosen.flatMap((section) => [
        section.title,
        section.body,
      ]),
    ])
    .join("\n");
}

describe("recommendation quality report", () => {
  it("keeps scenario fixtures privacy-safe and broad enough for review", () => {
    const serialized = JSON.stringify(recommendationQualityScenarios).toLowerCase();

    expect(recommendationQualityScenarios.length).toBeGreaterThanOrEqual(20);
    expect(recommendationQualityScenarios.map((scenario) => scenario.id)).toEqual(
      expect.arrayContaining([
        "pause.permission.enough",
        "waning.beginning.preparation_bridge",
        "candle.no_generic_addon",
        "plant.low.honor_choice",
        "kitchen.tea.ordinary_care",
        "tending_us.low.bounded",
        "best_week.clear_reason",
        "numerology.accent.secondary",
        "source_debug.no_raw_keys",
        "repetition.no_generic_closing",
      ]),
    );
    expect(serialized).not.toContain("@gmail.com");
    expect(serialized).not.toContain("birth date");
    expect(serialized).not.toContain("birth time");
    expect(serialized).not.toContain("birth place");
    expect(serialized).not.toContain("raw natal placement");
    expect(serialized).not.toContain("private source passage");
    expect(serialized).not.toContain("service account");
  });

  it("generates a markdown report with scenario details and warning counts", () => {
    const report = createRecommendationQualityReport();
    const formatted = formatRecommendationQualityReport(report);

    expect(report.scenarioCount).toBe(recommendationQualityScenarios.length);
    expect(formatted).toContain("# Recommendation Quality Scenario Report");
    expect(formatted).toContain("## Warning Counts");
    expect(formatted).toContain("### pause.permission.enough");
    expect(formatted).toContain("Selected ritual pattern:");
    expect(formatted).toContain("How this was chosen:");
    expect(formatted).toContain("Top rejected near alternatives:");
    expect(formatted).toContain("Human review notes:");
  });

  it("flags known bad sample-like output", () => {
    const warnings = getRecommendationQualityWarnings({
      scenario: {
        currentRitualCheckIn: {
          timeScope: "today",
          energyCapacity: "barely_any",
          capacityMode: "pause",
          audience: "me",
          ritualFocusKey: "making_a_beginning",
          ritualFocusLabel: "Making a beginning",
        },
      },
      selectedRitualPatternKey: "candle_light_focus",
      selectedRitualPatternStyles: ["candle_or_light", "light_focus"],
      selectedTimingWindow: { isStrong: false, reasonLabels: [] },
      copy: {
        theme: "No required ritual.",
        recommendedRitual:
          "No required ritual. Light a candle. Name what to release. Keep it simple and useful.",
        intention: "Keep it simple and useful.",
        bestWindow: "When you have five quiet minutes.",
        optionalAddOn: "Optional: light a candle if that feels supportive.",
        reflectionPrompt:
          "What can this household stop feeding with attention this week?",
        whyThisFits:
          "The score was 12 because source.rachel_patterson_moon matched private_profile.practical_tending.",
        howThisWasChosen: [
          {
            title: "Debug",
            body: "candidate close_the_evening was rejected by score.",
          },
        ],
      },
    }).map((warning) => warning.id);

    expect(warnings).toEqual(
      expect.arrayContaining([
        "pause_with_imperative_steps",
        "generic_optional_candle",
        "candle_ritual_with_candle_addon",
        "raw_score_language_in_user_copy",
        "debug_key_in_user_copy",
        "generic_closing_repeated",
        "carry_prompt_contradicts_focus",
        "source_id_visible_in_normal_copy",
      ]),
    );
  });

  it("flags generic candle add-ons with or without the optional prefix", () => {
    const base = {
      scenario: {
        currentRitualCheckIn: {
          timeScope: "today" as const,
          energyCapacity: "a_little" as const,
          capacityMode: "low" as const,
          audience: "me" as const,
          ritualFocusKey: "resting" as const,
          ritualFocusLabel: "Resting",
        },
      },
      selectedRitualPatternKey: "close_the_evening",
      selectedRitualPatternStyles: ["home_tending"],
      selectedTimingWindow: { isStrong: false, reasonLabels: [] },
      copy: {
        theme: "Let the evening close gently.",
        recommendedRitual: "Put one thing away and let that be enough.",
        intention: "Let the day end without extra effort.",
        bestWindow: "When you have five quiet minutes.",
        optionalAddOn: "",
        reflectionPrompt: "What can be complete enough for tonight?",
        whyThisFits: "This keeps the ritual small and practical.",
        howThisWasChosen: [],
      },
    };

    const withPrefix = getRecommendationQualityWarnings({
      ...base,
      copy: {
        ...base.copy,
        optionalAddOn: "Optional: light a candle if that feels supportive.",
      },
    }).map((warning) => warning.id);
    const withoutPrefix = getRecommendationQualityWarnings({
      ...base,
      copy: {
        ...base.copy,
        optionalAddOn: "Light a candle if that feels supportive.",
      },
    }).map((warning) => warning.id);

    expect(withPrefix).toContain("generic_optional_candle");
    expect(withoutPrefix).toContain("generic_optional_candle");
  });

  it("does not emit raw private details in report normal copy fields", () => {
    const normalCopy = normalCopyFieldsFromReport().toLowerCase();

    expect(normalCopy).not.toContain("@gmail.com");
    expect(normalCopy).not.toContain("birth date");
    expect(normalCopy).not.toContain("birth time");
    expect(normalCopy).not.toContain("birth place");
    expect(normalCopy).not.toContain("raw natal placement");
    expect(normalCopy).not.toContain("relationship details");
    expect(normalCopy).not.toContain("private source passage");
  });

  it("keeps debug and source ids out of normal copy fields", () => {
    const normalCopy = normalCopyFieldsFromReport();

    expect(normalCopy).not.toMatch(/\bsource\.[a-z0-9_.-]+\b/i);
    expect(normalCopy).not.toMatch(/\bnote\.[a-z0-9_.-]+\b/i);
    expect(normalCopy).not.toMatch(/\bdocs\/source/i);
    expect(normalCopy).not.toMatch(/\bprivate_profile\.[a-z0-9_.-]+\b/i);
    expect(normalCopy).not.toMatch(/\btiming_rule\.[a-z0-9_.-]+\b/i);
  });
});
