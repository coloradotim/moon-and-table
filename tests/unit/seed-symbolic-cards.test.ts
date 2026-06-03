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

  it("keeps the lunar phase system to four approved source-traceable cards", () => {
    const lunarCards = seedSymbolicCards.filter(
      (card) => card.category === "moon_phase",
    );

    expect(lunarCards.map((card) => card.key).sort()).toEqual([
      "full_moon",
      "new_moon",
      "waning_moon",
      "waxing_moon",
    ]);

    for (const card of lunarCards) {
      expect(card.approval_status).toBe("approved");
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
