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
        "led_candle_light_focus",
        "table_reset",
        "threshold_reset",
        "close_the_evening",
        "tea_ritual",
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
      "led_candle_light_focus",
      "close_the_evening",
    ]);
    expect(approvedKeys).not.toContain("table_reset");
    expect(approvedKeys).not.toContain("tea_ritual");
  });

  it("filters eligible approved patterns by capacity mode", () => {
    expect(getEligibleRitualPatterns("pause").map((pattern) => pattern.key)).toEqual([
      "led_candle_light_focus",
      "close_the_evening",
    ]);
    expect(getEligibleRitualPatterns("low").map((pattern) => pattern.key)).toEqual([
      "clear_one_surface",
      "tend_one_plant",
      "led_candle_light_focus",
      "close_the_evening",
    ]);
    expect(getEligibleRitualPatterns("high")).toEqual([]);
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

  it("keeps tea pattern normal-food-use only and not active until approved", () => {
    const teaPattern = starterRitualPatterns.find(
      (pattern) => pattern.key === "tea_ritual",
    );

    expect(teaPattern?.safetyFlags.ingestion).toBe("normal_food_use_only");
    expect(teaPattern?.approvalStatus).toBe("reviewed");
    expect(getEligibleRitualPatterns("steady").map((pattern) => pattern.key)).not.toContain(
      "tea_ritual",
    );
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

