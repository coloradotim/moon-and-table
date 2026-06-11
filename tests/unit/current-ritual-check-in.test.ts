import { describe, expect, it } from "vitest";

import {
  carrierOptions,
  createInitialRitualCheckInDraft,
  energyCapacityOptions,
  getCapacityModeForEnergy,
  getNextStepAfterAudience,
  getNextStepAfterEnergy,
  getNextStepAfterPractice,
  getRefinementGroupForPurpose,
  purposeOptions,
  timeScopeOptions,
} from "../../src/lib/current-ritual-check-in";

describe("current ritual check-in", () => {
  it("starts at the entry path and exposes exact time-scope labels", () => {
    expect(createInitialRitualCheckInDraft()).toEqual({ step: "entry_path" });
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
    expect(getNextStepAfterAudience("barely_any")).toBe("purpose");
    expect(getNextStepAfterAudience("a_little")).toBe("carrier");
    expect(getNextStepAfterAudience("enough_to_engage")).toBe("carrier");
    expect(getNextStepAfterAudience("room_for_something_deeper")).toBe(
      "carrier",
    );
    expect(getNextStepAfterPractice("a_little")).toBe("review");
    expect(getNextStepAfterPractice("enough_to_engage")).toBe("refinement");
    expect(getNextStepAfterPractice("room_for_something_deeper")).toBe("refinement");
  });

  it("uses exact carrier labels from the 7x10 flow", () => {
    expect(carrierOptions.map((option) => option.label)).toEqual([
      "In candlelight",
      "At the table",
      "At the doorway",
      "With a plant",
      "In words",
      "In a vessel",
      "In the body",
    ]);
  });

  it("uses exact purpose labels from the 7x10 flow", () => {
    expect(purposeOptions.map((option) => option.label)).toEqual([
      "Steadying",
      "Opening",
      "Releasing",
      "Tending",
      "Connecting",
      "Voicing",
      "Marking",
      "Blessing",
      "Protecting",
      "Remembering",
    ]);
  });

  it("uses purpose-specific refinements for higher energy paths", () => {
    expect(getRefinementGroupForPurpose("connecting")).toEqual({
      purpose: "connecting",
      question: "What kind of connection?",
      options: [
        { key: "touch", label: "Touch" },
        { key: "sensuality", label: "Sensuality" },
        { key: "tenderness", label: "Tenderness" },
        { key: "play", label: "Play" },
        { key: "desire", label: "Desire" },
        { key: "closeness", label: "Closeness" },
      ],
    });
  });
});
