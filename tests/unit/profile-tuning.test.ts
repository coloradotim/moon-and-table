import { describe, expect, it } from "vitest";

import {
  buildProfileTuningUpdate,
  getRitualStyleOptions,
  normalizeProfilePreferenceValues,
  splitStyleList,
  type ProfileTuningSettings,
} from "../../src/lib/profile-tuning";

const currentSettings: ProfileTuningSettings = {
  defaultAudience: "either",
  audienceLabels: {
    person_a: "Person A",
    person_b: "Person B",
    together: "Together",
    either: "Either",
  },
  defaultCapacityMode: "low",
  maxRitualDurationMinutes: 5,
  preferredRitualStyles: ["plant_tending"],
  avoidedRitualStyles: ["large_task_list"],
  astrologyVisibility: "balanced",
  assumptions: [
    {
      key: "assumption.low_overwhelm",
      label: "Suggestions usually work better when they stay small",
      value: true,
      source: "starter_assumption",
      confidence: "low",
      editable: true,
      updatedAtIso: "2026-01-01T00:00:00.000Z",
    },
    {
      key: "assumption.private_note",
      label: "Private placeholder note",
      value: "placeholder",
      source: "astro_material",
      confidence: "medium",
      editable: false,
      updatedAtIso: "2026-01-01T00:00:00.000Z",
    },
  ],
};

describe("profile tuning helpers", () => {
  it("splits comma-separated ritual styles", () => {
    expect(splitStyleList(" plant_tending, candle , kitchen_clearing ")).toEqual([
      "plant_tending",
      "candle",
      "kitchen_clearing",
    ]);
  });

  it("provides labeled ritual style picklist options", () => {
    expect(getRitualStyleOptions(["home_care", "custom_style"])).toEqual(
      expect.arrayContaining([
        { value: "home_tending", label: "Home tending" },
        { value: "custom_style", label: "Custom Style" },
      ]),
    );
  });

  it("maps bootstrap preference values to canonical taxonomy values", () => {
    expect(
      normalizeProfilePreferenceValues([
        "candle",
        "home_care",
        "kitchen_clearing",
        "shopping",
        "elaborate_ceremony",
        "vague_mush",
        "unknown_saved_value",
      ]),
    ).toEqual([
      "candle_or_light",
      "home_tending",
      "surface_reset",
      "shopping_required",
      "elaborate_setup",
      "avoid_vague_mush",
      "unknown_saved_value",
    ]);
  });

  it("builds Firestore updates while preserving assumption metadata intentionally", () => {
    const update = buildProfileTuningUpdate(
      currentSettings,
      {
        defaultAudience: "together",
        defaultCapacityMode: "steady",
        maxRitualDurationMinutes: 20,
        preferredRitualStyles: ["plant_tending", "candle"],
        avoidedRitualStyles: ["shopping", "vague_mush"],
        astrologyVisibility: "subtle",
        assumptionValues: {
          "assumption.low_overwhelm": false,
          "assumption.private_note": true,
        },
      },
      "2026-02-01T00:00:00.000Z",
    );

    expect(update.profile).toMatchObject({
      defaultAudience: "together",
      preferredRitualStyles: ["plant_tending", "candle_or_light"],
      avoidedRitualStyles: ["shopping_required", "avoid_vague_mush"],
      astrologyVisibility: "subtle",
      updatedAtIso: "2026-02-01T00:00:00.000Z",
    });
    expect(update.profile.assumptions[0]).toEqual({
      key: "assumption.low_overwhelm",
      label: "Suggestions usually work better when they stay small",
      value: false,
      source: "user_confirmed",
      confidence: "high",
      editable: true,
      updatedAtIso: "2026-02-01T00:00:00.000Z",
    });
    expect(update.profile.assumptions[1]).toEqual(
      currentSettings.assumptions[1],
    );
    expect(update.capacitySettings).toMatchObject({
      defaultCapacityMode: "steady",
      maxRitualDurationMinutes: 20,
    });
    expect(update.scheduleConstraints).toMatchObject({
      defaultCapacityMode: "steady",
      maxRitualDurationMinutes: 20,
    });
  });
});
