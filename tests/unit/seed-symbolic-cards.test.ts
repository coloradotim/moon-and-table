import { describe, expect, it } from "vitest";

import { seedSymbolicCards } from "../../src/data/seed-symbolic-cards";

const expectedSeedKeys = [
  "new_moon",
  "waxing_moon",
  "full_moon",
  "waning_moon",
  "numerology_1",
  "numerology_2",
  "numerology_4",
  "numerology_6",
  "numerology_9",
  "candle",
  "kitchen_clearing",
  "plant_tending",
  "salt",
  "rosemary",
  "honey",
  "lemon",
  "tea",
  "private_profile_practical_care_theme",
  "private_profile_beauty_warmth_theme",
  "private_profile_structured_action_theme",
];

describe("seedSymbolicCards", () => {
  it("keeps the initial approved seed set complete", () => {
    expect(seedSymbolicCards.map((card) => card.key).sort()).toEqual(
      [...expectedSeedKeys].sort(),
    );
  });

  it("includes review guardrails on every card", () => {
    for (const card of seedSymbolicCards) {
      expect(card.approval_status).toBe("approved");
      expect(card.avoid_saying.length).toBeGreaterThan(0);
      expect(card.safety_notes.length).toBeGreaterThan(0);
      expect(card.source_references.length).toBeGreaterThan(0);
    }
  });

  it("adds safety-reviewed kitchen plant and light starter cards", () => {
    const starterKeys = [
      "tea",
      "lemon",
      "salt",
      "rosemary",
      "plant_tending",
      "candle",
      "kitchen_clearing",
    ];
    const starterCards = seedSymbolicCards.filter((card) =>
      starterKeys.includes(card.key),
    );

    expect(starterCards.map((card) => card.key).sort()).toEqual(
      [...starterKeys].sort(),
    );

    for (const card of starterCards) {
      const serializedCard = JSON.stringify(card).toLowerCase();
      const userFacingCardText = `${card.summary} ${card.ritual_ideas.join(" ")}`.toLowerCase();

      expect(card.safety_notes.length).toBeGreaterThan(0);
      expect(card.safety_flags).toBeDefined();
      expect(card.source_references).toContain("source.safety_reference_families");
      expect(serializedCard).not.toContain("essential oil ingestion");
      expect(serializedCard).not.toContain("smoke cleanse");
      expect(serializedCard).not.toContain("medical claim");
      expect(userFacingCardText).not.toContain("guaranteed result");
    }

    expect(
      starterCards.find((card) => card.key === "candle")?.safety_flags?.fire,
    ).toBe("live_flame");
    expect(
      starterCards.find((card) => card.key === "tea")?.safety_flags?.ingestion,
    ).toBe("normal_food_use_only");
    expect(
      starterCards.find((card) => card.key === "rosemary")?.safety_flags
        ?.essentialOils,
    ).toBe("avoid");
  });

  it("keeps the lunar phase system to four approved source-traceable cards", () => {
    const lunarCards = seedSymbolicCards.filter(
      (card) => card.category === "moon_phase",
    );
    const forbiddenEightPhaseKeys = [
      "crescent_moon",
      "first_quarter_moon",
      "gibbous_moon",
      "last_quarter_moon",
      "balsamic_moon",
    ];

    expect(lunarCards.map((card) => card.key).sort()).toEqual([
      "full_moon",
      "new_moon",
      "waning_moon",
      "waxing_moon",
    ]);
    expect(seedSymbolicCards.map((card) => card.key)).not.toEqual(
      expect.arrayContaining(forbiddenEightPhaseKeys),
    );

    for (const card of lunarCards) {
      expect(card.approval_status).toBe("approved");
      expect(card.confidence).toBe("core");
      expect(card.themes.length).toBeGreaterThanOrEqual(3);
      expect(card.themes.length).toBeLessThanOrEqual(5);
      expect(card.good_for.length).toBeGreaterThanOrEqual(3);
      expect(card.ritual_styles.length).toBeGreaterThan(0);
      expect(card.ritual_ideas.length).toBeGreaterThan(0);
      expect(card.avoid_saying.length).toBeGreaterThan(0);
      expect(card.safety_notes.length).toBeGreaterThan(0);
      expect(card.source_references).toEqual(
        expect.arrayContaining([
          "source.sarah_faith_gottesdiener",
          "source.rachel_patterson_moon",
          "note.four_phase_moon_mvp",
          "note.lunar_cards_stay_invitational",
        ]),
      );
      expect(`${card.summary} ${card.ritual_ideas.join(" ")}`.toLowerCase()).not.toContain(
        "guarantee",
      );
      expect(card.ritual_ideas.join(" ").toLowerCase()).not.toContain(
        "must",
      );
    }

    expect(
      lunarCards.find((card) => card.key === "new_moon")?.source_references,
    ).toContain("note.new_moon_quiet_reset");
    expect(
      lunarCards.find((card) => card.key === "waxing_moon")?.source_references,
    ).toContain("note.waxing_moon_steady_support");
    expect(
      lunarCards.find((card) => card.key === "full_moon")?.source_references,
    ).toContain("note.full_moon_visibility_without_fear");
    expect(
      lunarCards.find((card) => card.key === "waning_moon")?.source_references,
    ).toContain("note.waning_moon_clear_and_rest");
  });

  it("keeps strengthened lunar cards invitational and safety-aware", () => {
    const lunarCards = seedSymbolicCards.filter(
      (card) => card.category === "moon_phase",
    );
    const serializedLunarCards = JSON.stringify(lunarCards).toLowerCase();
    const userFacingLunarText = lunarCards
      .map((card) => `${card.summary} ${card.ritual_ideas.join(" ")}`)
      .join(" ")
      .toLowerCase();

    expect(userFacingLunarText).not.toContain("manifestation guarantee");
    expect(userFacingLunarText).not.toContain("guaranteed outcome");
    expect(userFacingLunarText).not.toContain("causes conflict");
    expect(userFacingLunarText).not.toContain("urgent");
    expect(userFacingLunarText).not.toContain("copy");
    expect(serializedLunarCards).not.toContain("private source text");
    expect(serializedLunarCards).not.toContain("birth");
    expect(serializedLunarCards).not.toContain("natal");
  });

  it("keeps private profile cards generic placeholders", () => {
    const privateProfileCards = seedSymbolicCards.filter(
      (card) => card.category === "private_profile_theme",
    );

    expect(privateProfileCards).toHaveLength(3);

    for (const card of privateProfileCards) {
      expect(card.summary.toLowerCase()).toContain("generic");
      expect(JSON.stringify(card).toLowerCase()).toContain("placeholder");
    }
  });
});
