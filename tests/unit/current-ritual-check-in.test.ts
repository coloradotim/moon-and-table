import { describe, expect, it } from "vitest";

import { ritualFocusOptions } from "../../src/data/ritual-focus-options";
import {
  createInitialRitualCheckInDraft,
  energyCapacityOptions,
  getCapacityModeForEnergy,
  getNextStepAfterAudience,
  getNextStepAfterEnergy,
  getNextStepAfterPractice,
  getPracticeOptionsForEnergy,
  sanitizeRitualFocusText,
  timeScopeOptions,
} from "../../src/lib/current-ritual-check-in";

describe("current ritual check-in", () => {
  it("starts at time scope and exposes exact time-scope labels", () => {
    expect(createInitialRitualCheckInDraft()).toEqual({ step: "time_scope" });
    expect(timeScopeOptions.map((option) => option.label)).toEqual([
      "For today",
      "Best moment this week",
    ]);
  });

  it("exposes exact energy labels and maps them to existing capacity modes", () => {
    expect(energyCapacityOptions.map((option) => option.label)).toEqual([
      "Barely any",
      "A little",
      "Enough to engage",
      "Room for something deeper",
    ]);
    expect(getCapacityModeForEnergy("barely_any")).toBe("pause");
    expect(getCapacityModeForEnergy("a_little")).toBe("low");
    expect(getCapacityModeForEnergy("enough_to_engage")).toBe("steady");
    expect(getCapacityModeForEnergy("room_for_something_deeper")).toBe("high");
  });

  it("adapts follow-up steps by energy", () => {
    expect(getNextStepAfterEnergy("barely_any")).toBe("audience");
    expect(getNextStepAfterEnergy("a_little")).toBe("audience");
    expect(getNextStepAfterEnergy("enough_to_engage")).toBe("audience");
    expect(getNextStepAfterEnergy("room_for_something_deeper")).toBe("audience");
    expect(getNextStepAfterAudience("barely_any")).toBe("ritual_focus");
    expect(getNextStepAfterAudience("a_little")).toBe("practice_type");
    expect(getNextStepAfterAudience("enough_to_engage")).toBe("practice_type");
    expect(getNextStepAfterAudience("room_for_something_deeper")).toBe(
      "practice_type",
    );
    expect(getNextStepAfterPractice("a_little")).toBe("ritual_focus");
    expect(getNextStepAfterPractice("enough_to_engage")).toBe("ritual_focus");
    expect(getNextStepAfterPractice("room_for_something_deeper")).toBe("ritual_focus");
  });

  it("uses exact adaptive practice labels", () => {
    expect(getPracticeOptionsForEnergy("a_little").map((option) => option.label)).toEqual([
      "Home",
      "Plant",
      "Kitchen",
      "Candle or light",
      "Conversation",
      "Surprise me",
    ]);
    expect(
      getPracticeOptionsForEnergy("enough_to_engage").map((option) => option.label),
    ).toEqual([
      "Home tending",
      "Kitchen",
      "Plants",
      "Candle or light",
      "Conversation",
      "Reflection",
      "Surprise me",
    ]);
    expect(
      getPracticeOptionsForEnergy("room_for_something_deeper").map(
        (option) => option.label,
      ),
    ).toEqual([
      "Home tending",
      "Kitchen",
      "Plants",
      "Candle or light",
      "Conversation",
      "Reflection",
      "Seasonal",
      "Surprise me",
    ]);
  });

  it("uses ritual focus labels from controlled vocabulary", () => {
    expect(ritualFocusOptions.map((option) => option.label)).toEqual([
      "Getting grounded",
      "Making a beginning",
      "Clearing something out",
      "Resting",
      "Saying something clearly",
      "Tending us",
      "Tending the home",
      "Marking a threshold",
      "Something else",
    ]);
  });

  it("keeps Something else as short current context only", () => {
    expect(
      sanitizeRitualFocusText(`  a small threshold\nwithout making it huge  `),
    ).toBe("a small threshold without making it huge");
    expect(sanitizeRitualFocusText("   ")).toBeUndefined();
    expect(
      sanitizeRitualFocusText("x".repeat(140))?.length,
    ).toBeLessThanOrEqual(120);
  });
});
