import { describe, expect, it } from "vitest";

import type { PrivateNatalProfile } from "../../src/lib/private-data-schema";
import { createTodaysShapeBrief } from "../../src/lib/todays-shape-brief";

const fakeNatalProfiles: PrivateNatalProfile[] = [
  {
    personKey: "person_a",
    profileThemeKeys: ["practical_care"],
    placements: [
      {
        bodyOrPoint: "moon",
        sign: "virgo",
        degree: 0,
        themeKeys: ["practical_care"],
      },
    ],
  },
  {
    personKey: "person_b",
    profileThemeKeys: ["practical_care"],
    placements: [
      {
        bodyOrPoint: "sun",
        sign: "virgo",
        degree: 1,
        themeKeys: ["steady_care"],
      },
    ],
  },
];

function textFor(value: unknown): string {
  return JSON.stringify(value).toLowerCase();
}

describe("Today's shape brief", () => {
  it("summarizes a waning moon with the next lunar milestone as soft timing weather", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-06-05T12:00:00.000Z",
      timezone: "UTC",
    });

    expect(brief.title).toBe("Today’s shape");
    expect(brief.summary).toContain("Today, the moon is in its waning gibbous phase");
    expect(brief.summary).toContain("Next lunar milestone: Last quarter moon");
    expect(brief.summary).toContain("Today’s timing is more for noticing the pattern than forcing a turn");
    expect(brief.chips).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Waning gibbous moon; next last quarter moon",
          kind: "moon",
        }),
      ]),
    );
    expect(brief.timingAuthority).toBe("shape_only");
    expect(brief.majorEventPresent).toBe(false);
  });

  it("lets a new moon today become prominent timing weather", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-06-15T03:00:00.000Z",
      timezone: "UTC",
    });

    expect(brief.summary).toContain("New moon today");
    expect(brief.chips).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "New moon today", emphasis: "primary" }),
      ]),
    );
    expect(brief.timingAuthority).toBe("may_lead");
    expect(brief.majorEventPresent).toBe(true);
  });

  it("finds a full moon inside the best-week window", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-06-28T00:00:00.000Z",
      timezone: "UTC",
      timeScope: "best_moment_this_week",
    });

    expect(brief.summary).toContain("Full moon comes within the week");
    expect(brief.summary).toContain("stand near the front");
    expect(brief.timingAuthority).toBe("may_lead");
    expect(brief.majorEventPresent).toBe(true);
  });

  it("names month turns without turning them into instructions", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-07-31T12:00:00.000Z",
      timezone: "UTC",
    });

    expect(brief.summary).toContain("Last day of July");
    expect(brief.summary).toContain("threshold weather");
    expect(brief.chips).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Last day of July", kind: "calendar" }),
      ]),
    );
  });

  it("treats the end or beginning of a year as year threshold weather", () => {
    const ending = createTodaysShapeBrief({
      currentDate: "2026-12-31T12:00:00.000Z",
      timezone: "UTC",
    });
    const beginning = createTodaysShapeBrief({
      currentDate: "2027-01-01T12:00:00.000Z",
      timezone: "UTC",
    });

    expect(ending.summary).toContain("The year is closing");
    expect(beginning.summary).toContain("The year has just opened");
    expect(beginning.chips).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Year beginning", kind: "calendar" }),
      ]),
    );
  });

  it("surfaces solstice and equinox timing as seasonal weather", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-06-21T12:00:00.000Z",
      timezone: "UTC",
    });

    expect(brief.summary).toContain("June solstice is in the weather");
    expect(brief.chips).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "June solstice", kind: "seasonal" }),
      ]),
    );
    expect(brief.majorEventPresent).toBe(true);
  });

  it("can elevate a marked major numerology hit without destiny language", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-06-21T12:00:00.000Z",
      timezone: "UTC",
      majorNumerologyNumbers: [1],
    });

    expect(brief.chips).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "1 note", kind: "numerology" }),
      ]),
    );
    expect(textFor(brief)).not.toContain("destiny");
    expect(textFor(brief)).not.toContain("numerology says");
  });

  it("keeps ordinary numerology out of the first-screen surface", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-08-03T00:00:00.000Z",
      timezone: "UTC",
    });
    const numerologyChips = brief.chips.filter((chip) => chip.kind === "numerology");

    expect(numerologyChips).toHaveLength(0);
    expect(brief.summary).not.toContain("3 note");
    expect(brief.summary).toContain("Next lunar milestone: Last quarter moon");
    expect(brief.summary).toContain("Today’s timing is more for noticing what is already changing than forcing a turn");
  });

  it("summarizes private timing contacts without raw chart data", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-06-21T00:00:00.000Z",
      timezone: "UTC",
      privateNatalProfiles: fakeNatalProfiles,
    });
    const privateTimingText = textFor({
      details: brief.details?.filter((detail) => detail.title === "Private timing"),
    });

    expect(brief.chips.some((chip) => chip.kind === "private_contact")).toBe(false);
    expect(privateTimingText).toContain("shared private timing note");
    expect(privateTimingText).not.toContain("person_a");
    expect(privateTimingText).not.toContain("person_b");
    expect(privateTimingText).not.toContain("virgo");
    expect(privateTimingText).not.toContain("degree");
    expect(privateTimingText).not.toContain("orb");
    expect(privateTimingText).not.toContain("natal");
  });

  it("keeps no-major-timing copy soft and non-prescriptive", () => {
    const brief = createTodaysShapeBrief({
      currentDate: "2026-08-03T00:00:00.000Z",
      timezone: "UTC",
    });
    const briefText = textFor(brief);

    expect(brief.summary).toContain("the day can stay simple and observational");
    expect(briefText).not.toContain("you should");
    expect(briefText).not.toContain("timing overrides");
    expect(briefText).not.toContain("score");
    expect(briefText).not.toContain("source");
    expect(briefText).not.toContain("debug");
  });
});
