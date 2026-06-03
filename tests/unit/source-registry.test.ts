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
