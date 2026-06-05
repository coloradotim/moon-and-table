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
        "calendar.first_day.threshold_word",
        "calendar.last_day.closing_bowl",
        "calendar.month_turn.best_week",
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
    expect(formatted).toContain("Selected ritual form family:");
    expect(formatted).toContain("Expected ritual form family:");
    expect(formatted).toContain("Ritual form family matched:");
    expect(formatted).toContain("### Broad Pattern Concentration");
    expect(formatted).toContain("### Pattern Concentration Review");
    expect(formatted).toContain("### Strong Patterns Not Selected");
    expect(formatted).toContain("How this was chosen:");
    expect(formatted).toContain("Top rejected near alternatives:");
    expect(formatted).toContain("Human review notes:");
    expect(formatted).not.toContain("undefined");
  });

  it("surfaces Batch 1 ritual-form reachability in named scenarios", () => {
    const report = createRecommendationQualityReport();
    const resultById = new Map(
      report.scenarioResults.map((result) => [result.scenario.id, result]),
    );

    expect(resultById.get("batch1.plant.dead_leaf_release")).toMatchObject({
      selectedRitualPattern: { key: "dead_leaf_release" },
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["plant release/removal"]),
    });
    expect(resultById.get("batch1.kitchen.grain_beginning")).toMatchObject({
      selectedRitualPattern: { key: "grain_bowl_beginning" },
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["grain/seed/bowl"]),
    });
    expect(resultById.get("batch1.reflection.folded_phrase")).toMatchObject({
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["written/folded/container"]),
    });
    expect(resultById.get("batch1.quiet_welcome")).toMatchObject({
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["welcome/offering/vessel"]),
    });
    expect(resultById.get("home.threshold.arrival")).toMatchObject({
      selectedRitualPattern: { key: "threshold_bowl" },
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["threshold/crossing/bowl/key"]),
    });
    expect(resultById.get("home.threshold.arrival")?.selectedRitualPattern.key).not.toBe(
      "salt_clear_water_release",
    );
    expect(resultById.get("candle.live_flame_avoided")).toMatchObject({
      selectedRitualPattern: { key: "first_light_at_the_threshold" },
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["first light / threshold"]),
    });
    expect(resultById.get("candle.live_flame_avoided")?.selectedRitualPattern.key).not.toBe(
      "honeyed_word",
    );
    expect(resultById.get("issue183.home.tending_steady")).toMatchObject({
      selectedRitualPattern: { key: "house_from_root_to_roof" },
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["house map"]),
    });
    expect(resultById.get("issue183.home.tending_steady")?.selectedRitualPattern.key).not.toBe(
      "salt_clear_water_release",
    );
    expect(resultById.get("issue183.plant.beginning.seed")).toMatchObject({
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["plant seed/beginning"]),
    });
    expect(resultById.get("issue183.plant.rest.dormancy")).toMatchObject({
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["plant rest/dormancy"]),
    });
    expect(resultById.get("issue183.reflection.waning_release")).toMatchObject({
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["waning phrase/release"]),
    });
    expect(resultById.get("issue183.candle.rest_dark")).toMatchObject({
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["banked/darkening light"]),
    });
    expect(report.contentHealth.concentratedSelectedPatterns).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: "honeyed_word" }),
      ]),
    );
  });

  it("covers issue 207 golden house-voice scenarios without diagnostic normal copy", () => {
    const report = createRecommendationQualityReport();
    const resultById = new Map(
      report.scenarioResults.map((result) => [result.scenario.id, result]),
    );
    const expectedPatterns = new Map([
      ["batch1.plant.dead_leaf_release", "dead_leaf_release"],
      ["issue183.plant.beginning.seed", "seed_waiting"],
      ["batch1.kitchen.grain_beginning", "grain_bowl_beginning"],
      ["batch1.quiet_welcome", "quiet_welcome"],
      ["issue204.kitchen.bounded_sweetness", "honeyed_word"],
      ["home.threshold.arrival", "threshold_bowl"],
      ["batch1.home.salt_water_clearing", "salt_clear_water_release"],
      ["issue183.candle.rest_dark", "bank_the_house_light"],
      ["issue183.candle.full_saying_clearly", "full_light_on_the_table"],
      ["batch1.reflection.folded_phrase", "folded_phrase_vessel"],
      ["batch1.seasonal.marker_bowl", "seasonal_marker_bowl"],
      ["issue201.kitchen.bread_center_enoughness", "bread_at_the_center"],
      ["issue201.home.bread_grain_table_center", "bread_at_the_center"],
      ["issue201.seasonal.grain_continuity", "seasonal_marker_bowl"],
      ["issue202.reflection.returnable_key", "carried_key_word"],
      ["issue202.reflection.last_first_word", "last_word_first_word"],
      ["issue202.seasonal.entry_first_crossing", "seasonal_entry_bowl"],
      ["issue203.seasonal.end_empty_return", "clear_the_threshold_bowl"],
      ["issue222.candle.new_beginning_first_light", "first_light_for_the_beginning"],
      ["issue222.candle.full_saying_both", "candle_witness_one_phrase"],
      ["issue222.candle.full_rest", "full_light_holding_bowl"],
      ["issue222.candle.waning_clearing_release", "waning_light_release"],
      ["issue222.candle.dark_rest_low", "bank_the_house_light"],
      ["issue222.candle.live_flame_avoided_unlit", "unlit_candle_witness"],
      ["issue222.reflection.mercury_saying_clearly", "window_light_threshold"],
      ["issue222.candle.best_week_lunation_window", "full_light_on_the_table"],
      ["issue222.surprise.candle_real_fit", "window_light_threshold"],
      ["issue223.candle.high.full_both_saying", "candle_witness_one_phrase"],
      ["issue223.candle.high.new_beginning", "first_light_for_the_beginning"],
      ["issue223.candle.high.waning_clearing", "waning_light_release"],
      ["issue223.candle.steady.resting", "full_light_holding_bowl"],
      ["issue223.candle.high.best_week", "candle_witness_one_phrase"],
    ]);
    const issue202LossPatterns = new Map([
      ["issue202.generic.low_not_threshold", ["carried_key_word", "threshold_bowl", "seasonal_entry_bowl", "last_word_first_word"]],
      ["issue202.clearing.not_key", ["carried_key_word", "threshold_bowl", "seasonal_entry_bowl", "last_word_first_word"]],
      ["issue202.kitchen.warmth.not_threshold", ["carried_key_word", "threshold_bowl", "seasonal_entry_bowl", "last_word_first_word"]],
      ["issue202.plant.not_threshold", ["carried_key_word", "threshold_bowl", "seasonal_entry_bowl", "last_word_first_word"]],
      ["batch1.surprise_me.resolves_visible_category", ["carried_key_word", "threshold_bowl", "seasonal_entry_bowl", "last_word_first_word"]],
    ]);
    const issue203SaltWaterLossPatterns = new Map([
      ["home.threshold.arrival", ["salt_clear_water_release"]],
      ["issue183.home.tending_steady", ["salt_clear_water_release"]],
      ["batch1.seasonal.marker_bowl", ["salt_clear_water_release"]],
      ["batch1.surprise_me.resolves_visible_category", ["salt_clear_water_release"]],
    ]);
    const issue204HoneyLossPatterns = new Map([
      ["candle.live_flame_avoided", ["honeyed_word"]],
      ["issue204.home.beginning.not_honey", ["honeyed_word"]],
      ["issue204.plant.not_honey", ["honeyed_word"]],
      ["issue204.clearing.not_honey", ["honeyed_word"]],
      ["issue204.threshold.not_honey", ["honeyed_word"]],
    ]);
    const issue205LossPatterns = new Map([
      ["issue205.kitchen.warmth.not_phrase", ["folded_phrase_vessel", "waning_phrase_release", "carried_key_word", "last_word_first_word", "plant_phrase_under_the_pot"]],
    ]);
    const recommendationContractMatrix = new Map([
      ["contract.plant.both_high_tending_waning", {
        expectedFamilies: ["plant witness/growth"],
        blockedPatterns: ["waning_light_release", "salt_clear_water_release", "full_light_on_the_table"],
      }],
      ["contract.plant.high_tending_no_timing", {
        expectedFamilies: ["plant witness/growth"],
        blockedPatterns: ["waning_light_release", "salt_clear_water_release", "candle_witness_one_phrase"],
      }],
      ["contract.plant.high_rest_companionship", {
        expectedFamilies: ["plant rest/dormancy"],
        blockedPatterns: ["bank_the_house_light", "waning_light_release", "full_light_on_the_table"],
      }],
      ["contract.kitchen.high_tending_full", {
        expectedFamilies: ["warm cup/bowl"],
        blockedPatterns: ["candle_witness_one_phrase", "full_light_on_the_table", "waning_light_release"],
      }],
      ["contract.kitchen.high_beginning_waning", {
        expectedFamilies: ["grain/seed/bowl"],
        blockedPatterns: ["waning_light_release", "salt_clear_water_release", "full_light_on_the_table"],
      }],
      ["contract.home.high_tending_waning", {
        expectedFamilies: ["house map", "threshold/crossing/bowl/key", "bread/grain center"],
        blockedPatterns: ["waning_light_release", "salt_clear_water_release", "full_light_on_the_table"],
      }],
      ["contract.home.high_threshold_full", {
        expectedFamilies: ["threshold/crossing/bowl/key"],
        blockedPatterns: ["candle_witness_one_phrase", "full_light_on_the_table", "warm_cup_between_us"],
      }],
      ["contract.reflection.high_saying_new", {
        expectedFamilies: ["written/folded/container", "first/last threshold"],
        blockedPatterns: ["first_light_for_the_beginning", "grain_bowl_beginning", "warm_cup_between_us"],
      }],
      ["contract.candle.high_beginning", {
        expectedFamilies: ["first light / threshold"],
        blockedPatterns: ["house_from_root_to_roof", "threshold_bowl", "grain_bowl_beginning"],
      }],
      ["contract.candle.high_resting", {
        expectedFamilies: ["full light / clarity", "banked/darkening light"],
        blockedPatterns: ["candle_witness_one_phrase", "full_light_on_the_table", "first_light_for_the_beginning"],
      }],
      ["contract.surprise.high_preserves_resolved_category", {
        expectedFamilies: ["written/folded/container", "first/last threshold", "full light / clarity"],
        blockedPatterns: ["grain_bowl_beginning"],
      }],
      ["contract.surprise.both_preserves_audience", {
        expectedFamilies: ["warm cup/bowl", "welcome/offering/vessel"],
        blockedPatterns: ["candle_witness_one_phrase"],
      }],
    ]);
    const requiredScenarioIds = [
      ...expectedPatterns.keys(),
      ...issue202LossPatterns.keys(),
      ...issue203SaltWaterLossPatterns.keys(),
      ...issue204HoneyLossPatterns.keys(),
      ...issue205LossPatterns.keys(),
      "issue205.reflection.folded_word_body",
      "issue205.reflection.waning_phrase_return",
      "issue205.home.carried_word_return",
      "issue205.plant.placed_phrase",
      "issue205.seasonal.first_last_words",
      "issue222.candle.venus_warmth_tending_us",
      "issue222.candle.saturn_boundary_rest",
      "issue222.candle.no_strong_timing",
      "issue223.candle.high.full_both_saying",
      "issue223.candle.high.new_beginning",
      "issue223.candle.high.waning_clearing",
      "issue223.candle.steady.resting",
      "issue223.candle.high.best_week",
      ...recommendationContractMatrix.keys(),
      "issue183.kitchen.clearing_salt",
      "issue183.reflection.waning_release",
      "kitchen.warmth.together",
      "batch1.reflection.folded_phrase",
      "batch1.surprise_me.resolves_visible_category",
    ];
    const blockedPhrases = [
      "approved ritual container",
      "selected ritual context",
      "symbolic fit context",
      "not as a prediction",
      "some approved options were set aside",
      "practical household constraints",
      "matched the selected ritual",
      "allowed in as a small accent",
      "about twenty minutes or less",
      "primary timing signal",
      "timing tone",
      "score reason",
      "raw score",
      "exact pattern match",
      "ritual form family matched",
      "selected pattern",
      "approved",
      "safety",
      "constraints",
      "tradeoff",
      "source.",
      "note.",
      "private_profile",
      "person a",
      "person b",
      "natal-chart themes",
      "avoid flags",
      "conflicting with household avoid flags",
      "surprise me,",
      "surprise me ->",
      "protection",
      "warding",
      "security",
      "luck",
      "prosperity",
      "bad luck",
      "first-foot",
      "purification",
      "purify",
      "danger-removal",
      "danger removal",
      "medical claim",
      "relationship advice",
      "apology",
      "persuasion",
      "control",
      "hohman",
      "pow-wows",
      "long lost friend",
      "charm wording",
      "copied charm",
      "prayer formula",
      "spell database",
      "petition",
      "affirmation",
      "ambience",
      "wellness",
      "productivity",
      "psychology",
      "scientific proof",
      "only symbolic",
      "just symbolic",
      "visual reminder",
      "held lightly",
      "stronger material form",
      "better fit elsewhere",
      "timing overrode",
      "moon phase overrode",
      "helped point toward",
      "set aside",
    ];

    for (const [scenarioId, patternKey] of expectedPatterns) {
      expect(resultById.get(scenarioId)?.selectedRitualPattern.key).toBe(patternKey);
    }

    for (const [scenarioId, blockedPatternKeys] of issue202LossPatterns) {
      expect(blockedPatternKeys, scenarioId).not.toContain(
        resultById.get(scenarioId)?.selectedRitualPattern.key,
      );
    }

    for (const [scenarioId, blockedPatternKeys] of issue203SaltWaterLossPatterns) {
      expect(blockedPatternKeys, scenarioId).not.toContain(
        resultById.get(scenarioId)?.selectedRitualPattern.key,
      );
    }

    for (const [scenarioId, blockedPatternKeys] of issue204HoneyLossPatterns) {
      expect(blockedPatternKeys, scenarioId).not.toContain(
        resultById.get(scenarioId)?.selectedRitualPattern.key,
      );
    }

    for (const [scenarioId, blockedPatternKeys] of issue205LossPatterns) {
      expect(blockedPatternKeys, scenarioId).not.toContain(
        resultById.get(scenarioId)?.selectedRitualPattern.key,
      );
    }

    for (const [scenarioId, contract] of recommendationContractMatrix) {
      const result = resultById.get(scenarioId);

      expect(result, scenarioId).toBeDefined();
      expect(contract.blockedPatterns, scenarioId).not.toContain(
        result?.selectedRitualPattern.key,
      );
      expect(
        result?.selectedRitualFormFamilies.some((family) =>
          contract.expectedFamilies.includes(family),
        ),
        `${scenarioId} selected ${result?.selectedRitualPattern.key} with families ${result?.selectedRitualFormFamilies.join(", ")}`,
      ).toBe(true);
      expect(result?.warnings, scenarioId).toEqual([]);
      expect(result?.brief.bestWindow.toLowerCase(), scenarioId).not.toContain(
        "five quiet minutes",
      );
    }

    expect(resultById.get("issue183.kitchen.clearing_salt")?.selectedRitualPattern.key).toBe(
      "salt_clear_water_release",
    );
    expect(resultById.get("issue183.reflection.waning_release")?.selectedRitualPattern.key).toBe(
      "waning_phrase_release",
    );
    expect(resultById.get("issue205.reflection.folded_word_body")?.selectedRitualPattern.key).toBe(
      "folded_phrase_vessel",
    );
    expect(resultById.get("issue205.reflection.waning_phrase_return")?.selectedRitualPattern.key).toBe(
      "waning_phrase_release",
    );
    expect(resultById.get("issue205.home.carried_word_return")?.selectedRitualPattern.key).toBe(
      "carried_key_word",
    );
    expect(resultById.get("issue205.plant.placed_phrase")?.selectedRitualPattern.key).toBe(
      "plant_phrase_under_the_pot",
    );
    expect(["last_word_first_word", "first_day_last_day"]).toContain(
      resultById.get("issue205.seasonal.first_last_words")?.selectedRitualPattern.key,
    );
    for (const scenarioId of [
      "issue223.candle.high.full_both_saying",
      "issue223.candle.high.new_beginning",
      "issue223.candle.high.waning_clearing",
      "issue223.candle.steady.resting",
      "issue223.candle.high.best_week",
    ]) {
      expect(resultById.get(scenarioId)?.brief.bestWindow.toLowerCase(), scenarioId).not.toContain(
        "five quiet minutes",
      );
    }

    expect(["warm_cup_between_us", "quiet_welcome"]).toContain(
      resultById.get("kitchen.warmth.together")?.selectedRitualPattern.key,
    );
    expect(resultById.get("batch1.reflection.folded_phrase")).toMatchObject({
      ritualFormFamilyMatched: true,
      selectedRitualFormFamilies: expect.arrayContaining(["written/folded/container"]),
    });
    expect(resultById.get("batch1.surprise_me.resolves_visible_category")).toMatchObject({
      practiceChoiceStatus: "resolved_open_preference",
      ritualFormFamilyMatched: true,
    });

    for (const scenarioId of requiredScenarioIds) {
      const result = resultById.get(scenarioId);

      expect(result, scenarioId).toBeDefined();
      expect(result?.warnings, scenarioId).toEqual([]);

      const normalCopy = [
        result?.brief.theme,
        result?.brief.recommendedRitual,
        result?.brief.intention,
        result?.brief.bestWindow,
        result?.brief.optionalAddOn,
        result?.brief.reflectionPrompt,
        result?.brief.explanation.whyThisFits,
        result?.brief.sourceSummary,
        ...(result?.howThisWasChosen.flatMap((section) => [
          section.title,
          section.body,
        ]) ?? []),
      ].join("\n").toLowerCase();

      for (const phrase of blockedPhrases) {
        expect(normalCopy, `${scenarioId} leaked ${phrase}`).not.toContain(phrase);
      }
    }
  });

  it("surfaces calendar threshold timing in recommendation quality scenarios", () => {
    const report = createRecommendationQualityReport();
    const resultById = new Map(
      report.scenarioResults.map((result) => [result.scenario.id, result]),
    );
    const firstDay = resultById.get("calendar.first_day.threshold_word");
    const lastDay = resultById.get("calendar.last_day.closing_bowl");
    const monthTurn = resultById.get("calendar.month_turn.best_week");
    const formatted = formatRecommendationQualityReport(report);

    expect(firstDay?.selectedTimingSignals).toEqual(
      expect.arrayContaining([
        "First day of the month — threshold and first word",
      ]),
    );
    expect(firstDay?.brief.explanation.whyThisFits).toContain(
      "The first day of the month makes this an opening threshold",
    );
    expect(firstDay?.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Timing shaped it",
          body: expect.stringContaining("The first day of the month makes this an opening threshold"),
        }),
      ]),
    );
    expect(lastDay?.selectedTimingSignals).toEqual(
      expect.arrayContaining([
        "Last day of the month — closing and return",
      ]),
    );
    expect(lastDay?.brief.explanation.whyThisFits).toContain(
      "The last day of the month makes this a closing rite",
    );
    expect(monthTurn).toMatchObject({
      selectedRitualPattern: { key: "first_day_last_day" },
      ritualFormFamilyMatched: true,
      selectedTimingWindow: {
        label: "Month turn out of August",
        isStrong: true,
        reasonLabels: expect.arrayContaining(["Calendar threshold"]),
      },
    });
    expect(monthTurn?.selectedTimingSignals).toEqual(
      expect.arrayContaining(["Month turn — crossing between months"]),
    );
    expect(monthTurn?.brief.explanation.whyThisFits).toContain(
      "stood out this week",
    );
    expect(monthTurn?.brief.explanation.whyThisFits).toContain(
      "The month turn gives this a clean threshold",
    );
    expect(formatted).toContain("Calendar threshold");
    expect(formatted).toContain("Month turn — crossing between months");
    expect(formatted.toLowerCase()).not.toContain("folklore says");
    expect(formatted.toLowerCase()).not.toContain("today's folklore says");
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
          {
            title: "Debug",
            body: "duplicate heading should be caught.",
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
        "duplicate_explanation_section_headings",
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
