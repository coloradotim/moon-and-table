import { describe, expect, it } from "vitest";

import {
  CAPACITY_MODES,
  generateWeeklyBrief,
} from "../../src/lib/generate-weekly-brief";

const supersededCapacityModes = [
  "tiny",
  "normal",
  "spacious",
  "celebration",
  "survival",
];

describe("generateWeeklyBrief", () => {
  it("returns the required weekly brief shape", () => {
    const brief = generateWeeklyBrief();

    expect(brief).toMatchObject({
      dateRange: expect.any(String),
      theme: expect.any(String),
      bestWindow: expect.any(String),
      recommendedRitual: expect.any(String),
      optionalAddOn: expect.any(String),
      reflectionPrompt: expect.any(String),
      whyThis: expect.any(String),
      trace: expect.any(Object),
    });
  });

  it("limits capacity modes to pause, low, steady, and high", () => {
    expect([...CAPACITY_MODES].sort()).toEqual(
      ["high", "low", "pause", "steady"].sort(),
    );
  });

  it("does not use old capacity modes in generated traces", () => {
    for (const mode of CAPACITY_MODES) {
      const brief = generateWeeklyBrief({ capacityMode: mode });

      expect(supersededCapacityModes).not.toContain(brief.trace.capacityMode);
    }
  });

  it("returns one primary ritual as a single string", () => {
    const brief = generateWeeklyBrief({ capacityMode: "steady" });

    expect(typeof brief.recommendedRitual).toBe("string");
    expect(brief.recommendedRitual).toContain("Tend one plant.");
    expect(brief.recommendedRitual.split("\n")).toHaveLength(1);
  });

  it("pause produces no required ritual", () => {
    const brief = generateWeeklyBrief({ capacityMode: "pause" });

    expect(brief.bestWindow).toContain("no required ritual");
    expect(brief.recommendedRitual).toContain("No required ritual");
    expect(brief.whyThis).toContain("capacity is pause");
  });

  it("low produces a 0-5 minute recommendation with no setup burden", () => {
    const brief = generateWeeklyBrief({ capacityMode: "low" });

    expect(brief.bestWindow).toContain("0-5 minutes");
    expect(brief.whyThis).toContain("0-5 minutes");
    expect(brief.whyThis).toContain("no shopping, setup, or cleanup");
  });

  it("steady produces a 10-20 minute practical recommendation", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "steady",
      scheduleConstraints: { maxRitualDurationMinutes: 20 },
    });

    expect(brief.bestWindow).toContain("10-20 minutes");
    expect(brief.recommendedRitual).toContain("clear one nearby surface");
    expect(brief.whyThis).toContain("capacity is steady");
  });

  it("high produces an active recommendation without creating a task list", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "high",
      scheduleConstraints: { maxRitualDurationMinutes: 30 },
    });

    expect(brief.bestWindow).toContain("20-30 minutes");
    expect(brief.recommendedRitual).toContain("decisive care");
    expect(brief.recommendedRitual.split("\n")).toHaveLength(1);
    expect(brief.recommendedRitual).not.toContain("1.");
    expect(brief.recommendedRitual).not.toContain("2.");
  });

  it("schedule constraints can move the recommended window", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      scheduleConstraints: {
        unavailableDaysOrNights: ["Tuesday night"],
        preferredRitualWindows: ["schedule.preferred_window_saturday_morning"],
        maxRitualDurationMinutes: 5,
      },
    });

    expect(brief.bestWindow).toContain("Saturday morning");
    expect(brief.bestWindow).not.toContain("Tuesday");
    expect(brief.whyThis).toContain("moves the ritual away");
    expect(brief.trace.scheduleAssumptions).toEqual([
      "schedule.symbolic_event_tuesday",
      "schedule.preferred_window_saturday_morning",
    ]);
  });

  it("includes a complete privacy-safe trace", () => {
    const brief = generateWeeklyBrief();

    expect(brief.trace).toEqual({
      timingFacts: ["moon.waning", "numerology.6"],
      symbolicCards: [
        "moon.waning",
        "numerology.6",
        "plant.tending",
        "private_profile.practical_tending",
      ],
      privateProfileKeys: ["private_profile.practical_tending"],
      capacityMode: "low",
      scheduleAssumptions: [
        "schedule.symbolic_event_tuesday",
        "schedule.realistic_window_thursday",
      ],
    });
  });

  it("keeps generated output non-identifying", () => {
    const serializedBrief = JSON.stringify(generateWeeklyBrief()).toLowerCase();

    expect(serializedBrief).toContain("private_profile.practical_tending");
    expect(serializedBrief).not.toContain("birth");
    expect(serializedBrief).not.toContain("natal");
    expect(serializedBrief).not.toContain("relationship details");
    expect(serializedBrief).not.toContain("private source text");
  });
});
