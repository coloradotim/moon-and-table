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
        "tea_ritual",
        "simple_warm_drink",
        "kitchen_reset",
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

    expect(approvedKeys).toEqual([
      "clear_one_surface",
      "tend_one_plant",
      "candle_light_focus",
      "table_reset",
      "threshold_reset",
      "room_reset",
      "close_the_evening",
      "tea_ritual",
      "simple_warm_drink",
      "kitchen_reset",
    ]);
  });

  it("filters eligible approved patterns by capacity mode", () => {
    expect(getEligibleRitualPatterns("pause").map((pattern) => pattern.key)).toEqual([
      "candle_light_focus",
      "close_the_evening",
    ]);
    expect(getEligibleRitualPatterns("low").map((pattern) => pattern.key)).toEqual([
      "clear_one_surface",
      "tend_one_plant",
      "candle_light_focus",
      "table_reset",
      "threshold_reset",
      "room_reset",
      "close_the_evening",
      "tea_ritual",
      "kitchen_reset",
    ]);
    expect(getEligibleRitualPatterns("steady").map((pattern) => pattern.key)).toEqual(
      expect.arrayContaining([
        "simple_warm_drink",
        "kitchen_reset",
        "tea_ritual",
      ]),
    );
    expect(getEligibleRitualPatterns("high").map((pattern) => pattern.key)).toEqual([
      "table_reset",
      "room_reset",
    ]);
  });

  it("includes at least five approved home-tending starter patterns", () => {
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
      ]),
    );
    expect(homeTendingKeys.length).toBeGreaterThanOrEqual(5);
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
      "kitchen_reset",
      "tend_one_plant",
      "candle_light_focus",
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
    const lightPattern = starterRitualPatterns.find(
      (pattern) => pattern.key === "candle_light_focus",
    );

    expect(teaPattern?.safetyFlags.ingestion).toBe("normal_food_use_only");
    expect(warmDrinkPattern?.safetyFlags.ingestion).toBe(
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
      expect(serializedPattern).not.toContain("medical claim");
      expect(serializedPattern).not.toContain("crystal elixir");
      expect(serializedPattern).not.toContain("raw flour");
    }
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
});
