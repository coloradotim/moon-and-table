import { describe, expect, it } from "vitest";

import {
  getGroupedProfilePreferenceOptions,
  getProfilePreferenceGroup,
  getProfilePreferenceLabel,
  normalizeProfilePreferenceValues,
  PROFILE_PREFERENCE_GROUP_LABELS,
  PROFILE_PREFERENCE_OPTIONS,
} from "../../src/lib/profile-preference-taxonomy";

describe("profile preference taxonomy", () => {
  it("separates preferences into canonical groups", () => {
    expect(PROFILE_PREFERENCE_GROUP_LABELS).toMatchObject({
      ritual_style: "Ritual styles",
      action_pattern: "Action patterns",
      burden_avoid_flag: "Burden / avoid flags",
      tone_preference: "Tone preferences",
      audience: "Audience",
    });
    expect(getProfilePreferenceGroup("plant")).toBe("ritual_style");
    expect(getProfilePreferenceGroup("surface_reset")).toBe("action_pattern");
    expect(getProfilePreferenceGroup("houseplant")).toBe("action_pattern");
    expect(getProfilePreferenceGroup("herb")).toBe("action_pattern");
    expect(getProfilePreferenceGroup("basil")).toBe("action_pattern");
    expect(getProfilePreferenceGroup("lavender")).toBe("action_pattern");
    expect(getProfilePreferenceGroup("bread")).toBe("action_pattern");
    expect(getProfilePreferenceGroup("color_accent")).toBe("action_pattern");
    expect(getProfilePreferenceGroup("shopping_required")).toBe(
      "burden_avoid_flag",
    );
    expect(getProfilePreferenceGroup("low_woo")).toBe("tone_preference");
    expect(getProfilePreferenceGroup("person_a")).toBe("audience");
  });

  it("maps old bootstrap values to canonical values", () => {
    expect(
      normalizeProfilePreferenceValues([
        "candle",
        "home_care",
        "kitchen_clearing",
        "shopping",
        "elaborate_ceremony",
        "vague_mush",
      ]),
    ).toEqual([
      "candle_or_light",
      "home_tending",
      "surface_reset",
      "shopping_required",
      "elaborate_setup",
      "avoid_vague_mush",
    ]);
  });

  it("keeps unknown saved values visible without crashing", () => {
    const groupedOptions = getGroupedProfilePreferenceOptions([
      "custom_saved_value",
    ]);

    expect(getProfilePreferenceLabel("custom_saved_value")).toBe(
      "Custom Saved Value",
    );
    expect(groupedOptions.at(-1)).toEqual({
      group: "unknown",
      label: "Other saved values",
      options: [{ value: "custom_saved_value", label: "Custom Saved Value" }],
    });
  });

  it("keeps canonical values unique", () => {
    const values = PROFILE_PREFERENCE_OPTIONS.map((option) => option.value);

    expect(new Set(values).size).toBe(values.length);
  });

  it("keeps taxonomy examples privacy-safe", () => {
    const serialized = JSON.stringify(PROFILE_PREFERENCE_OPTIONS).toLowerCase();

    expect(serialized).not.toContain("birth data");
    expect(serialized).not.toContain("natal placement");
    expect(serialized).not.toContain("relationship details");
    expect(serialized).not.toContain("private source text");
  });
});
