import { describe, expect, it } from "vitest";

import { generateWeeklyBrief } from "../../src/lib/generate-weekly-brief";

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

  it("returns one primary ritual as a single string", () => {
    const brief = generateWeeklyBrief();

    expect(typeof brief.recommendedRitual).toBe("string");
    expect(brief.recommendedRitual).toContain("Tend one plant.");
    expect(brief.recommendedRitual.split("\n")).toHaveLength(1);
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
      capacityMode: "tiny",
      scheduleAssumptions: ["schedule.realistic_window_thursday"],
    });
  });

  it("keeps tiny capacity brief language short and non-identifying", () => {
    const serializedBrief = JSON.stringify(generateWeeklyBrief()).toLowerCase();

    expect(serializedBrief).toContain("3-5 minutes");
    expect(serializedBrief).toContain("private_profile.practical_tending");
    expect(serializedBrief).not.toContain("birth");
    expect(serializedBrief).not.toContain("natal");
    expect(serializedBrief).not.toContain("relationship details");
    expect(serializedBrief).not.toContain("private source text");
  });
});
