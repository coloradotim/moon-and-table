import { describe, expect, it } from "vitest";

import {
  getApprovedSourceReviews,
  SOURCE_REVIEW_STATUSES,
  SOURCE_USE_DECISIONS,
  starterSourceNotes,
  starterSourceReviews,
  validateSourceNote,
  validateSourceReview,
  type SourceNote,
} from "../../src/data/source-registry";

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
        "source.sarah_faith_gottesdiener",
        "source.rachel_patterson_moon",
        "source.laurel_woodward",
        "source.arin_murphy_hiscock",
        "source.safety_reference_families",
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

  it("keeps starter source notes short, transformed, and non-verbatim", () => {
    for (const note of starterSourceNotes) {
      expect(validateSourceNote(note)).toEqual({ valid: true, errors: [] });
      expect(note.verbatimAllowed).toBe(false);
      expect(note.paraphrasedNote.length).toBeLessThanOrEqual(280);
      expect(note.locationNote).toContain("docs/source-research-synthesis.md");
    }
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
    };

    expect(validateSourceNote(note).errors).toEqual([
      "note.invalid_trace: source id does not match a reviewed source",
      "note.invalid_trace: location note is required",
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
    expect(getApprovedSourceReviews().map((review) => review.id)).toEqual([
      "source.astronomy_engine",
      "source.safety_reference_families",
    ]);
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
