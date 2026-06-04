import { describe, expect, it } from "vitest";

import { starterRitualPatterns } from "../../src/data/ritual-patterns";
import { seedSymbolicCards } from "../../src/data/seed-symbolic-cards";
import {
  getApprovedSourceReviews,
  SOURCE_NOTE_LOCATION_PRECISIONS,
  SOURCE_NOTE_REVIEW_BASES,
  SOURCE_REVIEW_STATUSES,
  SOURCE_USE_DECISIONS,
  starterSourceNotes,
  starterSourceReviews,
  validateSourceNote,
  validateSourceReview,
  type SourceNote,
} from "../../src/data/source-registry";
import { starterTimingInterpretationRules } from "../../src/lib/timing-interpretation-rules";

describe("source registry", () => {
  it("supports the required source use decisions and review statuses", () => {
    expect(SOURCE_USE_DECISIONS).toEqual([
      "use",
      "use_carefully",
      "context_only",
      "defer",
      "avoid",
    ]);
    expect(SOURCE_REVIEW_STATUSES).toEqual([
      "candidate",
      "reviewed",
      "approved",
      "rejected",
    ]);
  });

  it("keeps starter source reviews valid and traceable", () => {
    expect(starterSourceReviews.length).toBeGreaterThanOrEqual(6);
    expect(starterSourceReviews.map((review) => review.id)).toEqual(
      expect.arrayContaining([
        "source.astronomy_engine",
        "source.steven_forrest",
        "source.kevin_burk",
        "source.april_elliott_kent",
        "source.astrology_ethics_sources",
        "source.barnum_forer_guardrail",
        "source.hans_decoz_tom_monte",
        "source.david_phillips_numerology",
        "source.sarah_faith_gottesdiener",
        "source.rachel_patterson_moon",
        "source.laurel_woodward",
        "source.arin_murphy_hiscock",
        "source.vca_pet_plant_safety",
        "source.safety_reference_families",
        "source.noaa_nws_seasonal_facts",
        "source.temperance_alden_seasonal_practice",
        "source.anna_franklin_seasonal_home",
        "source.old_farmers_almanac_context",
      ]),
    );

    for (const review of starterSourceReviews) {
      expect(validateSourceReview(review)).toEqual({
        valid: true,
        errors: [],
      });
      expect(review.bestFor.length).toBeGreaterThan(0);
      expect(review.copyrightNotes.join(" ").toLowerCase()).not.toContain(
        "copy passages",
      );
    }
  });

  it("includes the reviewed astrology source batch for timing interpretation", () => {
    expect(starterSourceReviews).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "source.steven_forrest",
          reviewStatus: "reviewed",
          useDecision: "use",
        }),
        expect.objectContaining({
          id: "source.kevin_burk",
          reviewStatus: "reviewed",
          useDecision: "use",
        }),
        expect.objectContaining({
          id: "source.april_elliott_kent",
          reviewStatus: "reviewed",
          useDecision: "use_carefully",
        }),
        expect.objectContaining({
          id: "source.astrology_ethics_sources",
          reviewStatus: "reviewed",
          useDecision: "use",
        }),
        expect.objectContaining({
          id: "source.barnum_forer_guardrail",
          reviewStatus: "reviewed",
          useDecision: "use",
        }),
      ]),
    );
  });

  it("includes the reviewed lunar source batch for four-phase cards", () => {
    expect(starterSourceReviews).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "source.sarah_faith_gottesdiener",
          title: "Sarah Faith Gottesdiener — lunar reflection source",
          reviewStatus: "reviewed",
          useDecision: "use",
        }),
        expect.objectContaining({
          id: "source.rachel_patterson_moon",
          title: "Rachel Patterson — lunar/domestic magic source",
          reviewStatus: "reviewed",
          useDecision: "use_carefully",
        }),
      ]),
    );
  });

  it("makes deferred and context source families explicit without approving them", () => {
    const expectedDeferredOrContextSources = [
      "source.swiss_ephemeris_deferred",
      "source.sweph_swisseph_deferred",
      "source.kerykeion_astrologer_api_deferred",
      "source.astrology_api_family_context",
      "source.jpl_horizons_context",
      "source.chani_nicholas_context",
      "source.robert_hand_deferred",
      "source.demetra_george_deferred",
      "source.popular_astrology_sites_context",
      "source.yasmin_boland_moonology_context",
      "source.diane_ahlquist_context",
      "source.llewellyn_moon_sign_book_context",
      "source.we_moon_oracle_context",
      "source.juno_jordan_javane_lawrence_context",
      "source.commercial_numerology_sites_avoid",
      "source.rosemary_gladstar_context",
    ];
    const reviewsById = new Map(
      starterSourceReviews.map((review) => [review.id, review]),
    );
    const approvedSourceIds = getApprovedSourceReviews().map(
      (review) => review.id,
    );

    expect(starterSourceReviews.map((review) => review.id)).toEqual(
      expect.arrayContaining(expectedDeferredOrContextSources),
    );
    expect(approvedSourceIds).not.toEqual(
      expect.arrayContaining(expectedDeferredOrContextSources),
    );

    for (const id of expectedDeferredOrContextSources) {
      const review = reviewsById.get(id);
      const extractionNotes = review?.extractionNotes.join(" ") ?? "";

      expect(review, id).toBeDefined();
      expect(["context_only", "defer", "avoid"]).toContain(review?.useDecision);
      expect(["candidate", "reviewed", "rejected"]).toContain(
        review?.reviewStatus,
      );
      expect(extractionNotes, id).toMatch(/Before use|Do not use/);
      expect(validateSourceReview(review!)).toEqual({
        valid: true,
        errors: [],
      });
    }
  });

  it("keeps deferred and context source families out of active content references", () => {
    const inactiveSourceIds = [
      "source.swiss_ephemeris_deferred",
      "source.sweph_swisseph_deferred",
      "source.kerykeion_astrologer_api_deferred",
      "source.astrology_api_family_context",
      "source.jpl_horizons_context",
      "source.chani_nicholas_context",
      "source.robert_hand_deferred",
      "source.demetra_george_deferred",
      "source.popular_astrology_sites_context",
      "source.yasmin_boland_moonology_context",
      "source.diane_ahlquist_context",
      "source.llewellyn_moon_sign_book_context",
      "source.we_moon_oracle_context",
      "source.juno_jordan_javane_lawrence_context",
      "source.commercial_numerology_sites_avoid",
      "source.rosemary_gladstar_context",
    ];
    const activeSourceReferences = [
      ...seedSymbolicCards.flatMap((card) => card.source_references),
      ...starterRitualPatterns.flatMap((pattern) => pattern.sourceReferences),
      ...starterTimingInterpretationRules.flatMap(
        (rule) => rule.sourceReferences,
      ),
    ];

    expect(activeSourceReferences).not.toEqual(
      expect.arrayContaining(inactiveSourceIds),
    );
  });

  it("keeps starter source notes short, transformed, and non-verbatim", () => {
    for (const note of starterSourceNotes) {
      expect(validateSourceNote(note)).toEqual({ valid: true, errors: [] });
      expect(note.verbatimAllowed).toBe(false);
      expect(note.paraphrasedNote.length).toBeLessThanOrEqual(280);
      expect(note.locationNote.length).toBeGreaterThan(0);
      expect(note.sourceLocationLabel?.length).toBeGreaterThan(0);
      expect(note.reviewedSourceArea?.length).toBeGreaterThan(0);
      expect(SOURCE_NOTE_REVIEW_BASES).toContain(note.reviewBasis);
      expect(SOURCE_NOTE_LOCATION_PRECISIONS).toContain(note.locationPrecision);
      expect(Number.isNaN(Date.parse(note.reviewedAtIso ?? ""))).toBe(false);
    }
  });

  it("identifies source notes that still have synthesis-only location precision", () => {
    const synthesisOnlyNotes = starterSourceNotes.filter(
      (note) => note.locationPrecision === "synthesis_only",
    );

    expect(synthesisOnlyNotes.map((note) => note.id)).toEqual(
      expect.arrayContaining(["note.safety_overrides_symbolism"]),
    );
    expect(synthesisOnlyNotes.every((note) =>
      note.reviewedSourceArea?.includes("needs more precise source location") ||
      note.sourceId === "source.safety_reference_families",
    )).toBe(true);
  });

  it("includes transformed source notes for each MVP lunar phase", () => {
    const lunarNoteIds = [
      "note.new_moon_quiet_reset",
      "note.waxing_moon_steady_support",
      "note.full_moon_visibility_without_fear",
      "note.waning_moon_clear_and_rest",
    ];
    const lunarNotes = starterSourceNotes.filter((note) =>
      lunarNoteIds.includes(note.id),
    );

    expect(lunarNotes.map((note) => note.id).sort()).toEqual(
      [...lunarNoteIds].sort(),
    );

    for (const note of lunarNotes) {
      expect(note.category).toBe("moon_phase_symbolism");
      expect(note.verbatimAllowed).toBe(false);
      expect(note.paraphrasedNote.length).toBeLessThanOrEqual(280);
      expect(note.paraphrasedNote.toLowerCase()).not.toContain("guarantee");
      expect(note.copyrightNotes.join(" ").toLowerCase()).toContain("short transformed note");
    }
  });

  it("includes transformed source notes for MVP astrology interpretation", () => {
    const astrologyNoteIds = [
      "note.astrology_symbolic_not_predictive",
      "note.astrology_planets_as_functions",
      "note.astrology_signs_as_styles",
      "note.astrology_aspects_as_relationships",
      "note.astrology_retrograde_slow_review",
      "note.astrology_ethics_no_personal_certainty",
      "note.barnum_forer_specificity_guardrail",
    ];
    const astrologyNotes = starterSourceNotes.filter((note) =>
      astrologyNoteIds.includes(note.id),
    );

    expect(astrologyNotes.map((note) => note.id).sort()).toEqual(
      [...astrologyNoteIds].sort(),
    );

    for (const note of astrologyNotes) {
      expect(validateSourceNote(note)).toEqual({ valid: true, errors: [] });
      expect(note.verbatimAllowed).toBe(false);
      expect(note.paraphrasedNote.length).toBeLessThanOrEqual(280);
      expect(note.paraphrasedNote.toLowerCase()).not.toContain("will happen");
      expect(note.paraphrasedNote.toLowerCase()).not.toContain("guarantee");
    }
  });

  it("includes reviewed numerology sources and transformed notes for numbers 1-9", () => {
    const requiredSourceIds = [
      "source.hans_decoz_tom_monte",
      "source.david_phillips_numerology",
      "source.barnum_forer_guardrail",
    ];
    const requiredNoteIds = [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_1_beginning_focus",
      "note.numerology_2_cooperation_balance",
      "note.numerology_3_expression_warmth",
      "note.numerology_4_structure_repair",
      "note.numerology_5_change_freshness",
      "note.numerology_6_home_care",
      "note.numerology_7_reflection_pause",
      "note.numerology_8_capacity_power",
      "note.numerology_9_completion_release",
    ];
    const sources = starterSourceReviews.filter((review) =>
      requiredSourceIds.includes(review.id),
    );
    const notes = starterSourceNotes.filter((note) =>
      requiredNoteIds.includes(note.id),
    );
    const userFacingNoteText = notes
      .map((note) => note.paraphrasedNote)
      .join(" ")
      .toLowerCase();

    expect(sources.map((source) => source.id).sort()).toEqual(
      [...requiredSourceIds].sort(),
    );
    expect(notes.map((note) => note.id).sort()).toEqual(
      [...requiredNoteIds].sort(),
    );

    for (const note of notes) {
      expect(validateSourceNote(note)).toEqual({ valid: true, errors: [] });
      expect(note.verbatimAllowed).toBe(false);
      expect(note.paraphrasedNote.length).toBeLessThanOrEqual(280);
    }

    expect(userFacingNoteText).not.toContain("guarantees");
    expect(userFacingNoteText).not.toContain("will happen");
    expect(userFacingNoteText).not.toContain("you are a");
    expect(userFacingNoteText).not.toContain("your relationship");
    expect(userFacingNoteText).not.toContain("private source text");
  });

  it("includes reviewed seasonal and almanac sources with transformed notes", () => {
    const requiredSourceIds = [
      "source.astronomy_engine",
      "source.noaa_nws_seasonal_facts",
      "source.temperance_alden_seasonal_practice",
      "source.anna_franklin_seasonal_home",
      "source.old_farmers_almanac_context",
    ];
    const requiredNoteIds = [
      "note.seasonal_facts_as_markers",
      "note.noaa_seasons_fact_guardrail",
      "note.spring_equinox_opening_balance",
      "note.summer_solstice_light_tending",
      "note.autumn_equinox_harvest_storing",
      "note.winter_solstice_rest_warmth",
      "note.seasonal_opening_airing_freshening",
      "note.seasonal_warmth_light_rest",
      "note.seasonal_harvest_gratitude_storing",
      "note.wintering_quiet_attention_protection",
      "note.seasonal_table_home_reset",
      "note.almanac_context_not_authority",
    ];
    const sourceIds = starterSourceReviews.map((review) => review.id);
    const notes = starterSourceNotes.filter((note) =>
      requiredNoteIds.includes(note.id),
    );
    const userFacingNoteText = notes
      .map((note) => note.paraphrasedNote)
      .join(" ")
      .toLowerCase();

    expect(sourceIds).toEqual(expect.arrayContaining(requiredSourceIds));
    expect(notes.map((note) => note.id).sort()).toEqual(
      [...requiredNoteIds].sort(),
    );

    for (const note of notes) {
      expect(validateSourceNote(note)).toEqual({ valid: true, errors: [] });
      expect(note.verbatimAllowed).toBe(false);
      expect(note.paraphrasedNote.length).toBeLessThanOrEqual(280);
      expect(note.sourceLocationLabel).toMatch(
        /Reviewed seasonal and almanac source batch|Astronomy Engine documentation/,
      );
      expect(note.reviewBasis).toMatch(
        /source_family_synthesis|computed_fact_documentation/,
      );
    }

    expect(
      starterSourceReviews.find((source) => source.id === "source.old_farmers_almanac_context")
        ?.useDecision,
    ).toBe("context_only");
    expect(userFacingNoteText).not.toContain("guaranteed");
    expect(userFacingNoteText).not.toContain("copy forecast");
    expect(userFacingNoteText).not.toContain("private source text");
    expect(userFacingNoteText).not.toContain("birth");
  });

  it("includes strengthened astrology notes for planets signs aspects and combinations", () => {
    const requiredNoteIds = [
      "note.astrology_body_sun_focus_visibility",
      "note.astrology_body_moon_care_rhythm",
      "note.astrology_body_mercury_words_sorting",
      "note.astrology_body_venus_warmth_worth",
      "note.astrology_body_mars_bounded_action",
      "note.astrology_body_jupiter_perspective_support",
      "note.astrology_body_saturn_limits_structure",
      "note.astrology_sign_aries_direct_start",
      "note.astrology_sign_taurus_steady_care",
      "note.astrology_sign_gemini_light_sorting",
      "note.astrology_sign_cancer_home_containment",
      "note.astrology_sign_leo_visible_warmth",
      "note.astrology_sign_virgo_useful_tending",
      "note.astrology_sign_libra_shared_balance",
      "note.astrology_sign_scorpio_private_release",
      "note.astrology_sign_sagittarius_wider_view",
      "note.astrology_sign_capricorn_bounded_effort",
      "note.astrology_sign_aquarius_system_experiment",
      "note.astrology_sign_pisces_soft_release",
      "note.astrology_aspect_conjunction_joined_focus",
      "note.astrology_aspect_opposition_balance_contrast",
      "note.astrology_aspect_square_useful_adjustment",
      "note.astrology_aspect_trine_available_support",
      "note.astrology_aspect_sextile_small_opening",
      "note.astrology_combo_mercury_cancer_careful_words",
      "note.astrology_combo_mercury_virgo_practical_detail",
      "note.astrology_combo_venus_leo_visible_warmth",
      "note.astrology_combo_mars_capricorn_bounded_action",
      "note.astrology_combo_moon_virgo_useful_tending",
      "note.astrology_combo_moon_cancer_home_rhythm",
      "note.astrology_combo_sun_cancer_household_attention",
    ];
    const notes = starterSourceNotes.filter((note) =>
      requiredNoteIds.includes(note.id),
    );
    const serializedNotes = JSON.stringify(notes).toLowerCase();

    expect(notes.map((note) => note.id).sort()).toEqual(
      [...requiredNoteIds].sort(),
    );

    for (const note of notes) {
      expect(validateSourceNote(note)).toEqual({ valid: true, errors: [] });
      expect(note.verbatimAllowed).toBe(false);
      expect(note.paraphrasedNote.length).toBeLessThanOrEqual(280);
      expect(note.paraphrasedNote).toMatch(
        /Use|support|signal|can|Mercury|Venus|Mars|Moon|Sun/,
      );
    }

    expect(serializedNotes).not.toContain("will happen");
    expect(serializedNotes).not.toContain("will create conflict");
    expect(serializedNotes).not.toContain("you are");
    expect(serializedNotes).not.toContain("natal");
    expect(serializedNotes).not.toContain("synastry");
    expect(serializedNotes).not.toContain("compatibility");
    expect(serializedNotes).not.toContain("private source text");
  });

  it("rejects notes without a known source id or location note", () => {
    const note: SourceNote = {
      ...starterSourceNotes[0],
      id: "note.invalid_trace",
      sourceId: "source.unknown",
      locationNote: "",
      sourceLocationLabel: "",
      reviewedSourceArea: "",
      reviewBasis: "unsupported" as SourceNote["reviewBasis"],
      reviewedAtIso: "not-a-date",
      locationPrecision: "unknown" as SourceNote["locationPrecision"],
    };

    expect(validateSourceNote(note).errors).toEqual([
      "note.invalid_trace: source id does not match a reviewed source",
      "note.invalid_trace: location note is required",
      "note.invalid_trace: source location label is required",
      "note.invalid_trace: reviewed source area is required",
      "note.invalid_trace: review basis is not supported",
      "note.invalid_trace: location precision is not supported",
      "note.invalid_trace: reviewedAtIso must be an ISO date string",
    ]);
  });

  it("rejects long copied-looking notes and verbatim permission", () => {
    const note: SourceNote = {
      ...starterSourceNotes[0],
      id: "note.long_quote",
      paraphrasedNote: `"${"copied ".repeat(16)}"`,
      verbatimAllowed: true as false,
    };

    expect(validateSourceNote(note).errors).toEqual(
      expect.arrayContaining([
        "note.long_quote: paraphrased note appears to include a long quote",
        "note.long_quote: verbatimAllowed must be false",
      ]),
    );
  });

  it("returns only approved source reviews for active use", () => {
    expect(getApprovedSourceReviews().map((review) => review.id)).toEqual(
      expect.arrayContaining([
        "source.astronomy_engine",
        "source.cdc_cleaning_safety",
        "source.epa_household_air",
        "source.nfpa_fire_safety",
        "source.usfa_fire_safety",
        "source.cpsc_candle_safety",
        "source.fda_food_safety",
        "source.poison_control",
        "source.aspca_plant_safety",
        "source.vca_pet_plant_safety",
        "source.safety_reference_families",
      ]),
    );
  });

  it("includes MVP home kitchen plant and light source notes", () => {
    const noteIds = starterSourceNotes.map((note) => note.id);

    expect(starterSourceReviews.map((review) => review.id)).toEqual(
      expect.arrayContaining([
        "source.cheryl_mendelson",
        "source.shoukei_matsumoto",
        "source.tess_whitehurst",
        "source.scott_cunningham_cross_check",
        "source.madame_pamita_candle",
        "source.sandra_kynes_color_cross_check",
        "source.cdc_cleaning_safety",
        "source.epa_household_air",
        "source.nfpa_fire_safety",
        "source.usfa_fire_safety",
        "source.cpsc_candle_safety",
        "source.candle_association_safety",
        "source.fda_food_safety",
        "source.poison_control",
        "source.aspca_plant_safety",
        "source.vca_pet_plant_safety",
      ]),
    );
    expect(noteIds).toEqual(
      expect.arrayContaining([
        "note.home_tending_small_enough",
        "note.home_tending_attention_care",
        "note.home_threshold_as_transition",
        "note.home_atmosphere_without_overclaim",
        "note.kitchen_magic_normal_use",
        "note.ingredient_symbolism_cross_check",
        "note.plant_tending_check_first",
        "note.houseplant_observation_first",
        "note.basil_kitchen_warmth",
        "note.mint_freshness_clear",
        "note.thyme_steady_care",
        "note.sage_clear_reflection_no_smoke",
        "note.lavender_soft_rest_cue",
        "note.light_focus_optional_flame",
        "note.candle_flame_attention_marker",
        "note.color_symbolism_optional_accent",
        "note.simple_candle_selection_no_shopping",
        "note.ordinary_candle_safety",
        "note.air_reset_without_smoke",
        "note.food_herb_safety_override",
        "note.pet_plant_access_review",
        "note.vca_pet_plant_allergy_guardrail",
        "note.poison_control_essential_oil_block",
        "note.bread_everyday_nourishment",
        "note.oats_steady_care",
        "note.apple_freshness_choice",
        "note.ordinary_cooking_as_care",
      ]),
    );
  });

  it("keeps source-controlled examples privacy-safe", () => {
    const serialized = JSON.stringify({
      starterSourceReviews,
      starterSourceNotes,
    }).toLowerCase();

    expect(serialized).not.toContain("birth data");
    expect(serialized).not.toContain("natal placement tied");
    expect(serialized).not.toContain("relationship details");
    expect(serialized).not.toContain("copied book passage");
    expect(serialized).not.toContain("private source text");
  });
});
