import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  BRIEF_FEEDBACK_TYPES,
  buildBriefFeedbackDocument,
  isBriefFeedbackType,
  saveBriefFeedback,
} from "../../src/lib/brief-feedback";
import { generateWeeklyBrief } from "../../src/lib/generate-weekly-brief";
import { addDoc, collection } from "firebase/firestore";

vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(),
  collection: vi.fn((db: unknown, name: string) => ({ db, name })),
}));

describe("brief feedback", () => {
  beforeEach(() => {
    vi.mocked(addDoc).mockReset();
    vi.mocked(collection).mockClear();
  });

  it("supports the initial feedback types including try_again", () => {
    expect(BRIEF_FEEDBACK_TYPES).toEqual([
      "good",
      "too_much",
      "too_generic",
      "more_like_this",
      "not_this_style",
      "skipped",
      "try_again",
    ]);
    expect(isBriefFeedbackType("try_again")).toBe(true);
    expect(isBriefFeedbackType("saved")).toBe(false);
  });

  it("builds a Firestore feedback document with brief trace references", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-30T00:00:00.000Z",
      capacityMode: "low",
    });
    const feedback = buildBriefFeedbackDocument({
      feedbackType: "good",
      brief,
      userId: "placeholder-user-id",
      userEmail: "person_a@example.com",
      householdId: "placeholder-household",
      createdAtIso: "2026-01-01T00:00:00.000Z",
    });

    expect(feedback).toMatchObject({
      userId: "placeholder-user-id",
      userEmail: "person_a@example.com",
      householdId: "placeholder-household",
      briefId: brief.briefKey,
      feedbackType: "good",
      symbolicCardKeys: brief.trace.symbolicCards,
      ritualPatternKeys: brief.trace.ritualPatterns,
      timingFactKeys: brief.trace.timingFacts,
      capacityMode: brief.trace.capacityMode,
      audience: brief.trace.audience,
      sourceReviewIds: brief.trace.sourceReviewIds,
      sourceNoteIds: brief.trace.sourceNoteIds,
      createdAtIso: "2026-01-01T00:00:00.000Z",
    });
  });

  it("saves feedback to the Firestore feedback collection", async () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-30T00:00:00.000Z",
      capacityMode: "low",
    });
    const db = { app: "placeholder" };

    await saveBriefFeedback(db as never, {
      feedbackType: "try_again",
      brief,
      userId: "placeholder-user-id",
      createdAtIso: "2026-01-01T00:00:00.000Z",
    });

    expect(collection).toHaveBeenCalledWith(db, "feedback");
    expect(addDoc).toHaveBeenCalledWith(
      { db, name: "feedback" },
      expect.objectContaining({
        briefId: brief.briefKey,
        feedbackType: "try_again",
        ritualPatternKeys: brief.trace.ritualPatterns,
      }),
    );
  });


  it("keeps feedback fixtures privacy-safe", () => {
    const serialized = JSON.stringify(
      buildBriefFeedbackDocument({
        feedbackType: "try_again",
        brief: generateWeeklyBrief(),
        userId: "placeholder-user-id",
      }),
    ).toLowerCase();

    expect(serialized).not.toContain("birth");
    expect(serialized).not.toContain("natal");
    expect(serialized).not.toContain("relationship details");
    expect(serialized).not.toContain("private source text");
  });
});
