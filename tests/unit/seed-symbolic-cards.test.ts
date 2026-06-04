import { describe, expect, it } from "vitest";

import { batchOneSymbolicCards } from "../../src/data/batch-1-ritual-library";
import { starterRitualPatterns } from "../../src/data/ritual-patterns";
import { seedSymbolicCards } from "../../src/data/seed-symbolic-cards";
import {
  getTimingSignalsForFacts,
} from "../../src/lib/timing-interpretation-rules";

const expectedSeedKeys = [
  "new_moon",
  "waxing_moon",
  "full_moon",
  "waning_moon",
  "numerology_1",
  "numerology_2",
  "numerology_3",
  "numerology_4",
  "numerology_5",
  "numerology_6",
  "numerology_7",
  "numerology_8",
  "numerology_9",
  "candle",
  "color_accent",
  "kitchen_clearing",
  "plant_tending",
  "houseplant",
  "salt",
  "rosemary",
  "basil",
  "mint",
  "thyme",
  "sage",
  "lavender",
  "honey",
  "lemon",
  "bread",
  "oats",
  "apple",
  "ordinary_cooking",
  "tea",
  "astrology_body_sun",
  "astrology_body_moon",
  "astrology_body_mercury",
  "astrology_body_venus",
  "astrology_body_mars",
  "astrology_body_jupiter",
  "astrology_body_saturn",
  "astrology_sign_aries",
  "astrology_sign_taurus",
  "astrology_sign_gemini",
  "astrology_sign_cancer",
  "astrology_sign_leo",
  "astrology_sign_virgo",
  "astrology_sign_libra",
  "astrology_sign_scorpio",
  "astrology_sign_sagittarius",
  "astrology_sign_capricorn",
  "astrology_sign_aquarius",
  "astrology_sign_pisces",
  "astrology_aspect_conjunction",
  "astrology_aspect_opposition",
  "astrology_aspect_square",
  "astrology_aspect_trine",
  "astrology_aspect_sextile",
  "astrology_motion_retrograde",
  "seasonal_spring_equinox",
  "seasonal_summer_solstice",
  "seasonal_autumn_equinox",
  "seasonal_winter_solstice",
  "seasonal_opening_freshening",
  "seasonal_warmth_light_rest",
  "seasonal_harvest_gratitude_storing",
  "seasonal_wintering_attention",
  "seasonal_table_home_reset",
  "private_profile_practical_care_theme",
  "private_profile_beauty_warmth_theme",
  "private_profile_structured_action_theme",
];

describe("seedSymbolicCards", () => {
  it("keeps the initial approved seed set complete", () => {
    expect(seedSymbolicCards.map((card) => card.key).sort()).toEqual(
      [...expectedSeedKeys, ...batchOneSymbolicCards.map((card) => card.key)].sort(),
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
      "basil",
      "mint",
      "thyme",
      "sage",
      "lavender",
      "houseplant",
      "plant_tending",
      "candle",
      "color_accent",
      "kitchen_clearing",
      "bread",
      "oats",
      "apple",
      "ordinary_cooking",
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
      starterCards.find((card) => card.key === "color_accent")?.safety_flags?.fire,
    ).not.toBe("live_flame");
    expect(
      starterCards.find((card) => card.key === "tea")?.safety_flags?.ingestion,
    ).toBe("normal_food_use_only");
    expect(
      starterCards.find((card) => card.key === "ordinary_cooking")?.safety_flags
        ?.ingestion,
    ).toBe("normal_food_use_only");
    expect(
      starterCards.find((card) => card.key === "rosemary")?.safety_flags
        ?.essentialOils,
    ).toBe("avoid");

    for (const key of ["houseplant", "basil", "mint", "thyme", "sage", "lavender"]) {
      const card = starterCards.find((candidate) => candidate.key === key);

      expect(card?.safety_flags?.pets, key).toBe("review_required");
      expect(card?.safety_flags?.allergies.length, key).toBeGreaterThan(0);
      expect(card?.source_references, key).toEqual(
        expect.arrayContaining([
          "source.aspca_plant_safety",
          "source.vca_pet_plant_safety",
          "note.vca_pet_plant_allergy_guardrail",
        ]),
      );
    }
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

  it("adds source-backed seasonal cards for anchors and home themes", () => {
    const seasonalCards = seedSymbolicCards.filter(
      (card) => card.category === "seasonal",
    );
    const seasonalText = JSON.stringify(seasonalCards).toLowerCase();

    expect(seasonalCards.map((card) => card.key).sort()).toEqual([
      "seasonal_autumn_equinox",
      "seasonal_bowl",
      "seasonal_harvest_gratitude_storing",
      "seasonal_opening_freshening",
      "seasonal_spring_equinox",
      "seasonal_summer_solstice",
      "seasonal_table_home_reset",
      "seasonal_warmth_light_rest",
      "seasonal_winter_solstice",
      "seasonal_wintering_attention",
    ]);

    for (const card of seasonalCards) {
      expect(card.approval_status).toBe("approved");
      expect(card.signalSummary).toEqual(expect.any(String));
      expect(card.sourceNoteKeys?.length).toBeGreaterThan(0);
      expect(card.toneGuidance?.length).toBeGreaterThan(0);
      if (card.key !== "seasonal_bowl") {
        expect(card.source_references).toEqual(
          expect.arrayContaining([
            "source.astronomy_engine",
            "source.noaa_nws_seasonal_facts",
            "source.temperance_alden_seasonal_practice",
            "source.anna_franklin_seasonal_home",
            "source.old_farmers_almanac_context",
            "note.seasonal_facts_as_markers",
            "note.almanac_context_not_authority",
          ]),
        );
      } else {
        expect(card.source_references).toEqual(
          expect.arrayContaining([
            "source.source_review_kelley_book_of_halloween_seasonal_threshold",
            "source.source_review_british_popular_customs_calendar_household",
            "note.calendar_customs_as_household_thresholds",
          ]),
        );
      }
      expect(card.avoid_saying.length).toBeGreaterThan(0);
      expect(card.safety_notes.length).toBeGreaterThan(0);
    }

    expect(seasonalText).not.toContain("guarantee");
    expect(seasonalText).not.toContain("must celebrate");
    expect(seasonalText).not.toContain("copied source text");
    expect(seasonalText).not.toContain("required festival");
    expect(seasonalText).not.toContain("private source text");
    expect(seasonalText).not.toContain("birth");
  });

  it("adds structured MVP-depth to the four lunar phase cards", () => {
    const lunarCards = seedSymbolicCards.filter(
      (card) => card.category === "moon_phase",
    );
    const approvedOrPlannedPatternKeys = new Set([
      ...starterRitualPatterns.map((pattern) => pattern.key),
      "return_one_object",
      "small_repair",
      "shared_space_reset",
      "end_of_week_closing",
    ]);

    for (const card of lunarCards) {
      expect(card.signalSummary).toEqual(expect.any(String));
      expect(card.signalSummary?.length).toBeGreaterThan(20);
      expect(card.capacityGuidance).toBeDefined();
      expect(card.capacityGuidance).toBeDefined();
      expect(Object.keys(card.capacityGuidance ?? {}).length).toBeGreaterThanOrEqual(3);
      expect(card.toneGuidance?.length).toBeGreaterThan(0);
      expect(card.sourceNoteKeys).toEqual(
        expect.arrayContaining(["note.four_phase_moon_mvp", "note.lunar_cards_stay_invitational"]),
      );
      expect(card.source_references).toEqual(
        expect.arrayContaining(card.sourceNoteKeys ?? []),
      );
      expect(card.interpretationNotes?.length).toBeGreaterThan(0);
      expect(card.contraindications?.length).toBeGreaterThan(0);
      expect(card.ritualPatternKeys?.length).toBeGreaterThan(0);

      for (const key of card.ritualPatternKeys ?? []) {
        expect(approvedOrPlannedPatternKeys.has(key), key).toBe(true);
      }
    }
  });

  it("uses enriched lunar signal summaries for generated timing signals", () => {
    const signals = getTimingSignalsForFacts([
      {
        id: "timing.moon_phase.full.test",
        type: "moon_phase",
        label: "Full moon",
        phase: "full",
        phaseAngleDegrees: 180,
        exactIso: "2026-06-03T12:00:00.000Z",
        timezone: "UTC",
        computedBy: "manual",
        confidence: "computed",
      },
    ]);

    expect(signals[0]?.signalSummary).toBe(
      seedSymbolicCards.find((card) => card.key === "full_moon")?.signalSummary,
    );
  });

  it("adds source-backed MVP-depth numerology cards for numbers 1-9", () => {
    const numerologyCards = seedSymbolicCards.filter(
      (card) => card.category === "numerology",
    );
    const userFacingText = numerologyCards
      .map((card) => `${card.summary} ${card.ritual_ideas.join(" ")}`)
      .join(" ")
      .toLowerCase();

    expect(numerologyCards.map((card) => card.key).sort()).toEqual(
      Array.from({ length: 9 }, (_, index) => `numerology_${index + 1}`).sort(),
    );

    for (const card of numerologyCards) {
      expect(card.approval_status).toBe("approved");
      expect(card.confidence).toBe("common");
      expect(card.signalSummary).toEqual(expect.any(String));
      expect(card.signalSummary?.toLowerCase()).toContain("light");
      expect(card.sourceNoteKeys).toEqual(
        expect.arrayContaining([
          "note.numerology_calculation_reduced_universal_dates",
          "note.numerology_guardrail_accent_only",
        ]),
      );
      expect(card.source_references).toEqual(
        expect.arrayContaining([
          "source.hans_decoz_tom_monte",
          "source.barnum_forer_guardrail",
          ...(card.sourceNoteKeys ?? []),
        ]),
      );
      expect(card.toneGuidance?.length).toBeGreaterThan(0);
      expect(card.contraindications?.length).toBeGreaterThan(0);
      expect(card.avoid_saying.join(" ").toLowerCase()).toContain(
        "main reason",
      );
    }

    expect(userFacingText).not.toContain("guarantee");
    expect(userFacingText).not.toContain("compatibility");
    expect(userFacingText).not.toContain("you are");
    expect(userFacingText).not.toContain("destiny");
    expect(userFacingText).not.toContain("private source text");
  });

  it("adds an approved MVP astrology symbolic layer", () => {
    const astrologyCards = seedSymbolicCards.filter((card) =>
      card.category.startsWith("astrology_"),
    );
    const astrologyKeys = astrologyCards.map((card) => card.key);

    expect(astrologyCards).toHaveLength(25);
    expect(astrologyKeys).toEqual(
      expect.arrayContaining([
        "astrology_body_sun",
        "astrology_body_moon",
        "astrology_body_mercury",
        "astrology_body_venus",
        "astrology_body_mars",
        "astrology_body_jupiter",
        "astrology_body_saturn",
        "astrology_sign_aries",
        "astrology_sign_pisces",
        "astrology_aspect_square",
        "astrology_aspect_trine",
        "astrology_motion_retrograde",
      ]),
    );
    expect(astrologyKeys).not.toEqual(
      expect.arrayContaining([
        "astrology_body_uranus",
        "astrology_body_neptune",
        "astrology_body_pluto",
      ]),
    );

    for (const card of astrologyCards) {
      const userFacingCardText = `${card.summary} ${card.ritual_ideas.join(" ")}`.toLowerCase();

      expect(card.approval_status).toBe("approved");
      expect(card.source_references).toEqual(
        expect.arrayContaining([
          "source.steven_forrest",
          "source.kevin_burk",
          "source.astrology_ethics_sources",
          "source.barnum_forer_guardrail",
        ]),
      );
      expect(card.avoid_saying.length).toBeGreaterThan(0);
      expect(card.safety_notes.length).toBeGreaterThan(0);
      expect(userFacingCardText).not.toContain("will happen");
      expect(userFacingCardText).not.toContain("guaranteed");
      expect(userFacingCardText).not.toContain("compatibility");
      expect(userFacingCardText).not.toContain("your chart");
    }
  });

  it("backs astrology cards with concrete source notes", () => {
    const cardByKey = new Map(seedSymbolicCards.map((card) => [card.key, card]));

    expect(cardByKey.get("astrology_body_mercury")?.source_references).toContain(
      "note.astrology_body_mercury_words_sorting",
    );
    expect(cardByKey.get("astrology_body_mars")?.source_references).toContain(
      "note.astrology_body_mars_bounded_action",
    );
    expect(cardByKey.get("astrology_sign_cancer")?.source_references).toContain(
      "note.astrology_sign_cancer_home_containment",
    );
    expect(cardByKey.get("astrology_sign_virgo")?.source_references).toContain(
      "note.astrology_sign_virgo_useful_tending",
    );
    expect(cardByKey.get("astrology_aspect_square")?.source_references).toContain(
      "note.astrology_aspect_square_useful_adjustment",
    );
    expect(cardByKey.get("astrology_aspect_trine")?.source_references).toContain(
      "note.astrology_aspect_trine_available_support",
    );
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
