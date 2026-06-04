import { describe, expect, it } from "vitest";

import {
  getApprovedRitualPatterns,
  getEligibleRitualPatterns,
  RITUAL_PATTERN_APPROVAL_STATUSES,
  starterRitualPatterns,
  validateRitualPattern,
  type RitualPattern,
} from "../../src/data/ritual-patterns";
import { withSafetyOverrides } from "../../src/lib/ritual-safety";

describe("ritual patterns", () => {
  it("supports the required approval statuses", () => {
    expect(RITUAL_PATTERN_APPROVAL_STATUSES).toEqual([
      "draft",
      "reviewed",
      "approved",
      "rejected",
    ]);
  });

  it("keeps starter patterns small, typed, and safety-reviewed", () => {
    expect(starterRitualPatterns.map((pattern) => pattern.key)).toEqual(
      expect.arrayContaining([
        "clear_one_surface",
        "tend_one_plant",
        "candle_light_focus",
        "table_reset",
        "threshold_reset",
        "room_reset",
        "close_the_evening",
        "one_clear_sentence",
        "tea_ritual",
        "simple_warm_drink",
        "bread_enoughness_cue",
        "oats_steady_care_cue",
        "apple_fresh_choice_cue",
        "ordinary_cooking_care_cue",
        "kitchen_reset",
        "return_one_object",
        "soften_one_corner",
        "window_open_air_reset",
        "bed_blanket_rest_cue",
        "shared_space_reset",
        "small_repair",
        "end_of_week_closing",
        "seasonal_table_home_reset",
        "morning_light_pause",
        "prune_one_dead_leaf",
        "rotate_plant_for_light",
        "salt_boundary_bowl",
        "lemon_freshness_cue",
        "rosemary_kitchen_memory",
        "houseplant_check_in",
        "basil_kitchen_warmth_cue",
        "mint_freshness_cue",
        "thyme_steady_care_cue",
        "sage_clear_reflection_cue",
        "lavender_soft_rest_cue",
      ]),
    );

    for (const pattern of starterRitualPatterns) {
      const result = validateRitualPattern(pattern);

      expect(result.valid).toBe(true);
      expect(pattern.defaultDurationMinutes).toBeGreaterThanOrEqual(0);
      expect(pattern.defaultDurationMinutes).toBeLessThanOrEqual(30);
      expect(pattern.capacityModes.length).toBeGreaterThan(0);
      expect(pattern.safetyNotes.length).toBeGreaterThan(0);
      expect(pattern.sourceReferences.length).toBeGreaterThan(0);
      expect(pattern.steps.length).toBeGreaterThan(0);
      expect(pattern.steps.length).toBeLessThanOrEqual(5);
    }
  });

  it("returns only approved ritual patterns for recommendation eligibility", () => {
    const approvedKeys = getApprovedRitualPatterns().map((pattern) => pattern.key);

    expect(approvedKeys).toEqual(
      expect.arrayContaining([
        "clear_one_surface",
        "tend_one_plant",
        "candle_light_focus",
        "table_reset",
        "threshold_reset",
        "room_reset",
        "close_the_evening",
        "one_clear_sentence",
        "tea_ritual",
        "simple_warm_drink",
        "bread_enoughness_cue",
        "oats_steady_care_cue",
        "apple_fresh_choice_cue",
        "ordinary_cooking_care_cue",
        "kitchen_reset",
        "return_one_object",
        "soften_one_corner",
        "window_open_air_reset",
        "bed_blanket_rest_cue",
        "shared_space_reset",
        "small_repair",
        "end_of_week_closing",
        "seasonal_table_home_reset",
        "morning_light_pause",
        "prune_one_dead_leaf",
        "rotate_plant_for_light",
        "salt_boundary_bowl",
        "lemon_freshness_cue",
        "rosemary_kitchen_memory",
        "houseplant_check_in",
        "basil_kitchen_warmth_cue",
        "mint_freshness_cue",
        "thyme_steady_care_cue",
        "sage_clear_reflection_cue",
        "lavender_soft_rest_cue",
      ]),
    );
    expect(approvedKeys.length).toBeGreaterThanOrEqual(20);
  });

  it("has approved ritual coverage for visible practice areas", () => {
    const visiblePracticeStyles = [
      "home_tending",
      "plant_tending",
      "kitchen",
      "candle_or_light",
      "reflection",
      "seasonal",
    ];
    const approvedPatterns = getApprovedRitualPatterns();

    for (const style of visiblePracticeStyles) {
      expect(
        approvedPatterns.some((pattern) => pattern.ritualStyles.includes(style)),
      ).toBe(true);
    }
  });

  it("keeps conversation patterns bounded and consent-aware", () => {
    const conversationPatterns = getApprovedRitualPatterns().filter((pattern) =>
      pattern.ritualStyles.includes("conversation"),
    );
    const serializedConversation = JSON.stringify(conversationPatterns).toLowerCase();

    expect(conversationPatterns.map((pattern) => pattern.key)).toContain(
      "one_clear_sentence",
    );
    expect(serializedConversation).toContain("consent");
    expect(serializedConversation).toContain("capacity");
    expect(serializedConversation).not.toContain("couples counseling");
    expect(serializedConversation).not.toContain("relationship advice");
  });

  it("filters eligible approved patterns by capacity mode", () => {
    expect(getEligibleRitualPatterns("pause").map((pattern) => pattern.key)).toEqual(
      expect.arrayContaining([
        "candle_light_focus",
        "close_the_evening",
        "return_one_object",
        "bed_blanket_rest_cue",
        "morning_light_pause",
        "lavender_soft_rest_cue",
      ]),
    );
    expect(getEligibleRitualPatterns("low").map((pattern) => pattern.key)).toEqual(
      expect.arrayContaining([
        "clear_one_surface",
        "tend_one_plant",
        "candle_light_focus",
        "table_reset",
        "threshold_reset",
        "room_reset",
        "close_the_evening",
        "one_clear_sentence",
        "tea_ritual",
        "kitchen_reset",
        "bread_enoughness_cue",
        "oats_steady_care_cue",
        "apple_fresh_choice_cue",
        "return_one_object",
        "window_open_air_reset",
        "morning_light_pause",
        "salt_boundary_bowl",
        "houseplant_check_in",
        "basil_kitchen_warmth_cue",
        "mint_freshness_cue",
        "thyme_steady_care_cue",
        "sage_clear_reflection_cue",
        "lavender_soft_rest_cue",
      ]),
    );
    expect(getEligibleRitualPatterns("steady").map((pattern) => pattern.key)).toEqual(
      expect.arrayContaining([
        "simple_warm_drink",
        "ordinary_cooking_care_cue",
        "kitchen_reset",
        "tea_ritual",
      ]),
    );
    expect(getEligibleRitualPatterns("high").map((pattern) => pattern.key)).toEqual(
      expect.arrayContaining([
        "table_reset",
        "room_reset",
        "shared_space_reset",
        "small_repair",
      ]),
    );
  });

  it("includes a meaningful MVP-depth home-tending pattern set", () => {
    const homeTendingKeys = getApprovedRitualPatterns()
      .filter((pattern) => pattern.ritualStyles.includes("home_tending"))
      .map((pattern) => pattern.key);

    expect(homeTendingKeys).toEqual(
      expect.arrayContaining([
        "threshold_reset",
        "table_reset",
        "room_reset",
        "clear_one_surface",
        "close_the_evening",
        "return_one_object",
        "soften_one_corner",
        "window_open_air_reset",
        "bed_blanket_rest_cue",
        "shared_space_reset",
        "small_repair",
        "end_of_week_closing",
      ]),
    );
    expect(homeTendingKeys.length).toBeGreaterThanOrEqual(8);
  });

  it("keeps approved home-tending reset patterns free of smoke oils and candle flame", () => {
    const homeTendingPatterns = getApprovedRitualPatterns().filter((pattern) =>
      pattern.ritualStyles.includes("home_tending"),
    );

    for (const pattern of homeTendingPatterns) {
      const serializedPattern = JSON.stringify(pattern).toLowerCase();

      expect(pattern.safetyFlags.smoke).toBe("none");
      expect(pattern.safetyFlags.essentialOils).toBe("none");
      expect(pattern.safetyFlags.fire).not.toBe("live_flame");
      expect(serializedPattern).not.toContain("curse");
      expect(serializedPattern).not.toContain("spiritual warfare");
      expect(serializedPattern).not.toContain("guaranteed safety");
    }
  });

  it("requires safety flags and excludes unsafe approved patterns", () => {
    const unsafePattern: RitualPattern = {
      ...starterRitualPatterns[0],
      id: "ritual_pattern_unsafe_test",
      key: "unsafe_test",
      approvalStatus: "approved",
      steps: ["Smoke cleanse the room and drink essential oil."],
      safetyFlags: withSafetyOverrides({
        smoke: "avoid",
        essentialOils: "avoid",
      }),
    };
    const result = validateRitualPattern(unsafePattern);

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        "ritual_pattern_unsafe_test: smoke-cleansing defaults are blocked",
        "ritual_pattern_unsafe_test: essential oil ingestion is blocked",
        "ritual_pattern_unsafe_test: essential oils are marked avoid",
        "ritual_pattern_unsafe_test: smoke is marked avoid",
      ]),
    );
    expect(getEligibleRitualPatterns("low", [unsafePattern])).toEqual([]);
  });

  it("keeps kitchen plant and light patterns approved with safety guardrails", () => {
    const requiredKeys = [
      "tea_ritual",
      "simple_warm_drink",
      "bread_enoughness_cue",
      "oats_steady_care_cue",
      "apple_fresh_choice_cue",
      "ordinary_cooking_care_cue",
      "kitchen_reset",
      "tend_one_plant",
      "candle_light_focus",
      "morning_light_pause",
      "prune_one_dead_leaf",
      "rotate_plant_for_light",
      "salt_boundary_bowl",
      "lemon_freshness_cue",
      "rosemary_kitchen_memory",
      "houseplant_check_in",
      "basil_kitchen_warmth_cue",
      "mint_freshness_cue",
      "thyme_steady_care_cue",
      "sage_clear_reflection_cue",
      "lavender_soft_rest_cue",
    ];
    const approvedPatterns = getApprovedRitualPatterns();
    const patternsByKey = new Map(
      approvedPatterns.map((pattern) => [pattern.key, pattern]),
    );

    for (const key of requiredKeys) {
      expect(patternsByKey.has(key)).toBe(true);
    }

    const teaPattern = starterRitualPatterns.find(
      (pattern) => pattern.key === "tea_ritual",
    );
    const warmDrinkPattern = starterRitualPatterns.find(
      (pattern) => pattern.key === "simple_warm_drink",
    );
    const ordinaryCookingPattern = starterRitualPatterns.find(
      (pattern) => pattern.key === "ordinary_cooking_care_cue",
    );
    const lightPattern = starterRitualPatterns.find(
      (pattern) => pattern.key === "candle_light_focus",
    );

    expect(teaPattern?.safetyFlags.ingestion).toBe("normal_food_use_only");
    expect(warmDrinkPattern?.safetyFlags.ingestion).toBe(
      "normal_food_use_only",
    );
    expect(ordinaryCookingPattern?.safetyFlags.ingestion).toBe(
      "normal_food_use_only",
    );
    expect(lightPattern?.safetyFlags.fire).toBe("live_flame");

    for (const pattern of approvedPatterns.filter((pattern) =>
      requiredKeys.includes(pattern.key),
    )) {
      const serializedPattern = JSON.stringify(pattern).toLowerCase();

      expect(pattern.safetyFlags.essentialOils).not.toBe("review_required");
      expect(pattern.safetyFlags.smoke).toBe("none");
      if (pattern.key !== "candle_light_focus") {
        expect(pattern.safetyFlags.fire).not.toBe("live_flame");
      }
      if (pattern.ritualStyles.includes("plant") || pattern.ritualStyles.includes("herb")) {
        expect(pattern.safetyNotes.join(" ").toLowerCase()).toMatch(/pet|plant|herb/);
        expect(pattern.safetyFlags.pets, pattern.key).toBe("review_required");
        expect(pattern.safetyFlags.allergies.length, pattern.key).toBeGreaterThan(0);
        expect(pattern.sourceReferences, pattern.key).toEqual(
          expect.arrayContaining([
            "source.aspca_plant_safety",
            "source.vca_pet_plant_safety",
            "note.vca_pet_plant_allergy_guardrail",
          ]),
        );
      }
      expect(serializedPattern).not.toContain("medical claim");
      expect(serializedPattern).not.toContain("crystal elixir");
      expect(serializedPattern).not.toContain("raw flour");
    }
  });

  it("adds structured depth fields to approved MVP patterns", () => {
    const requiredKeys = [
      "threshold_reset",
      "table_reset",
      "room_reset",
      "clear_one_surface",
      "close_the_evening",
      "return_one_object",
      "soften_one_corner",
      "window_open_air_reset",
      "bed_blanket_rest_cue",
      "shared_space_reset",
      "small_repair",
      "end_of_week_closing",
      "seasonal_table_home_reset",
      "tea_ritual",
      "simple_warm_drink",
      "bread_enoughness_cue",
      "oats_steady_care_cue",
      "apple_fresh_choice_cue",
      "ordinary_cooking_care_cue",
      "kitchen_reset",
      "tend_one_plant",
      "morning_light_pause",
      "prune_one_dead_leaf",
      "rotate_plant_for_light",
      "salt_boundary_bowl",
      "lemon_freshness_cue",
      "rosemary_kitchen_memory",
      "houseplant_check_in",
      "basil_kitchen_warmth_cue",
      "mint_freshness_cue",
      "thyme_steady_care_cue",
      "sage_clear_reflection_cue",
      "lavender_soft_rest_cue",
    ];
    const patternByKey = new Map(
      getApprovedRitualPatterns().map((pattern) => [pattern.key, pattern]),
    );

    for (const key of requiredKeys) {
      const pattern = patternByKey.get(key);

      expect(pattern, key).toBeDefined();
      expect(pattern?.capacityGuidance).toBeDefined();
      expect(pattern?.toneGuidance?.length).toBeGreaterThan(0);
      expect(pattern?.sourceNoteKeys?.length).toBeGreaterThan(0);
      expect(pattern?.generatorUseNotes?.length).toBeGreaterThan(0);
      expect(pattern?.contraindications?.length).toBeGreaterThan(0);
      expect(pattern?.sourceReferences).toEqual(
        expect.arrayContaining(pattern?.sourceNoteKeys ?? []),
      );
    }
  });

  it("accepts grimoire presentation fields on focused approved patterns", () => {
    const presentationKeys = [
      "close_the_evening",
      "morning_light_pause",
      "candle_light_focus",
      "tend_one_plant",
      "clear_one_surface",
      "threshold_reset",
      "tea_ritual",
      "kitchen_reset",
      "table_reset",
      "bed_blanket_rest_cue",
      "seasonal_table_home_reset",
    ];
    const patternByKey = new Map(
      getApprovedRitualPatterns().map((pattern) => [pattern.key, pattern]),
    );

    for (const key of presentationKeys) {
      const pattern = patternByKey.get(key);

      expect(pattern, key).toBeDefined();
      expect(pattern?.presentation?.invitation).toBeTruthy();
      expect(pattern?.presentation?.whyThisPractice).toBeTruthy();
      expect(pattern?.presentation?.approach.length).toBeGreaterThan(0);
      expect(pattern?.presentation?.steps.length).toBeGreaterThan(0);
      expect(pattern?.presentation?.carry).toBeTruthy();
      expect(pattern?.presentation?.closing).toBeTruthy();
      expect(validateRitualPattern(pattern!)).toMatchObject({ valid: true });
    }
  });

  it("keeps grimoire presentation copy privacy-safe and source-safe", () => {
    const presentationText = JSON.stringify(
      starterRitualPatterns.map((pattern) => pattern.presentation).filter(Boolean),
    ).toLowerCase();

    expect(presentationText).not.toContain("birth data");
    expect(presentationText).not.toContain("birth date");
    expect(presentationText).not.toContain("birth time");
    expect(presentationText).not.toContain("birth place");
    expect(presentationText).not.toContain("natal placement");
    expect(presentationText).not.toContain("relationship details");
    expect(presentationText).not.toContain("private source text");
    expect(presentationText).not.toContain("copied source");
    expect(presentationText).not.toContain("copied ritual");
    expect(presentationText).not.toContain("guarantee");
    expect(presentationText).not.toContain("keep it simple and useful");
    expect(presentationText).not.toContain("if that feels supportive");
  });

  it("keeps source-controlled patterns privacy-safe and source-safe", () => {
    const serialized = JSON.stringify(starterRitualPatterns).toLowerCase();

    expect(serialized).not.toContain("birth data");
    expect(serialized).not.toContain("natal placement");
    expect(serialized).not.toContain("relationship details");
    expect(serialized).not.toContain("private source text");
    expect(serialized).not.toContain("copied ritual");
    expect(serialized).not.toContain("copied recipe");
  });

  it("adds a source-backed seasonal table or home reset pattern", () => {
    const pattern = getApprovedRitualPatterns().find(
      (candidate) => candidate.key === "seasonal_table_home_reset",
    );
    const serializedPattern = JSON.stringify(pattern).toLowerCase();

    expect(pattern).toBeDefined();
    expect(pattern?.ritualStyles).toEqual(
      expect.arrayContaining(["seasonal", "table_reset", "home_tending"]),
    );
    expect(pattern?.capacityModes).toEqual(
      expect.arrayContaining(["low", "steady"]),
    );
    expect(pattern?.defaultDurationMinutes).toBeLessThanOrEqual(10);
    expect(pattern?.sourceReferences).toEqual(
      expect.arrayContaining([
        "source.anna_franklin_seasonal_home",
        "source.temperance_alden_seasonal_practice",
        "source.old_farmers_almanac_context",
        "note.seasonal_table_home_reset",
        "note.almanac_context_not_authority",
      ]),
    );
    expect(pattern?.safetyFlags.smoke).toBe("none");
    expect(pattern?.safetyFlags.essentialOils).toBe("none");
    expect(pattern?.safetyFlags.fire).not.toBe("live_flame");
    expect(serializedPattern).not.toContain("guarantee");
    expect(serializedPattern).not.toContain("protection from danger");
    expect(serializedPattern).not.toContain("private source text");
  });
});
