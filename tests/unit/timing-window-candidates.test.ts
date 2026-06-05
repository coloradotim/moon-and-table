import { describe, expect, it } from "vitest";

import type { PrivateNatalProfile } from "../../src/lib/private-data-schema";
import {
  getTimingWindowCandidates,
  type TimingWindowCandidate,
} from "../../src/lib/timing-window-candidates";

function scoreForLabel(
  candidates: TimingWindowCandidate[],
  label: string,
): number | undefined {
  return candidates.find((candidate) => candidate.label === label)?.score;
}

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

describe("timing window candidates", () => {
  it("returns candidates for a known week with an exact new moon", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-06-15T00:00:00.000Z",
      options: { maxCandidates: 8 },
    });
    const newMoon = candidates.find((candidate) => candidate.label === "New Moon");

    expect(newMoon).toMatchObject({
      startsAtIso: "2026-06-15T02:54:39.007Z",
      strength: "primary",
    });
    expect(newMoon?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "exact_new_moon" }),
      ]),
    );
  });

  it("returns candidates for a known week with an exact full moon", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-06-28T00:00:00.000Z",
      options: { maxCandidates: 8 },
    });
    const fullMoon = candidates.find((candidate) => candidate.label === "Full Moon");

    expect(fullMoon).toMatchObject({
      startsAtIso: "2026-06-29T23:57:17.744Z",
      strength: "primary",
    });
    expect(fullMoon?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "exact_full_moon" }),
      ]),
    );
  });

  it("returns seasonal marker candidates for known solstice weeks", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-12-20T00:00:00.000Z",
      options: { maxCandidates: 8 },
    });
    const solstice = candidates.find((candidate) => candidate.label === "Winter solstice");

    expect(solstice).toMatchObject({
      startsAtIso: "2026-12-21T20:50:22.187Z",
    });
    expect(solstice?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "seasonal_marker" }),
      ]),
    );
  });

  it("can include universal day numerology as an accent candidate", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-06-21T00:00:00.000Z",
      options: {
        includePlanetaryAspects: false,
        maxCandidates: 30,
      },
    });
    const numerology = candidates.find(
      (candidate) => candidate.label === "Universal day 6",
    );

    expect(numerology).toMatchObject({
      startsAtIso: "2026-06-26T00:00:00.000Z",
      strength: "accent",
    });
    expect(numerology?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "numerology_theme_match" }),
      ]),
    );
  });

  it("can include month-turn calendar thresholds as human-readable timing windows", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-07-29T00:00:00.000Z",
      daysAhead: 5,
      options: {
        includePlanetaryAspects: false,
        includeRetrogrades: false,
        maxCandidates: 30,
      },
    });
    const monthTurn = candidates.find(
      (candidate) => candidate.label === "Month turn into August",
    );

    expect(monthTurn).toMatchObject({
      startsAtIso: "2026-08-01T00:00:00.000Z",
      strength: "supporting",
      signalKeys: expect.arrayContaining([
        "timing_rule.calendar_threshold.month_turn",
      ]),
    });
    expect(monthTurn?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "calendar_threshold",
          label: "Calendar threshold",
          detail: "Month turn into August",
        }),
      ]),
    );

    const serialized = JSON.stringify(monthTurn).toLowerCase();

    expect(serialized).not.toContain("schedule.");
    expect(serialized).not.toContain("folklore says");
    expect(serialized).not.toContain("holiday");
  });

  it("uses the supplied local timezone for month-turn timing windows", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "America/Denver",
      startDate: "2026-07-31T00:00:00.000Z",
      daysAhead: 2,
      options: {
        includePlanetaryAspects: false,
        includeRetrogrades: false,
        maxCandidates: 30,
      },
    });
    const localLastDay = candidates.find(
      (candidate) => candidate.label === "Month turn out of July",
    );

    expect(localLastDay).toMatchObject({
      startsAtIso: "2026-07-31T06:00:00.000Z",
      strength: "supporting",
    });
    expect(localLastDay?.timingFacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "calendar_threshold",
          dateIso: "2026-07-31",
          timezone: "America/Denver",
        }),
      ]),
    );
  });

  it("does not emit hard-coded schedule windows", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-06-21T00:00:00.000Z",
      options: { maxCandidates: 20 },
    });
    const serialized = JSON.stringify(candidates).toLowerCase();

    expect(serialized).not.toContain("thursday evening");
    expect(serialized).not.toContain("tuesday evening");
    expect(serialized).not.toContain("saturday morning");
    expect(serialized).not.toContain("schedule.");
    expect(serialized).not.toContain("realistic window");
  });

  it("returns deterministic sorted candidates for fixed dates", () => {
    const input = {
      timezone: "UTC",
      startDate: "2026-06-21T00:00:00.000Z",
      options: { maxCandidates: 12 },
    };
    const candidates = getTimingWindowCandidates(input);

    expect(candidates).toEqual(getTimingWindowCandidates(input));
    expect(candidates.length).toBeGreaterThan(0);

    for (let index = 1; index < candidates.length; index += 1) {
      expect(candidates[index - 1].score).toBeGreaterThanOrEqual(
        candidates[index].score,
      );
    }

    for (const candidate of candidates) {
      expect(candidate.scoreReasons.length).toBeGreaterThan(0);
      expect(candidate.signalKeys.length).toBeGreaterThan(0);
      expect(candidate.timingFacts.length).toBeGreaterThan(0);
    }
  });

  it("still returns a safe lunar fallback when no private profile is available", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-08-03T00:00:00.000Z",
      daysAhead: 1,
      options: {
        includePlanetaryAspects: false,
        includeRetrogrades: false,
      },
    });

    expect(candidates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: expect.stringContaining("moon"),
          natalContactKeys: [],
          natalContactThemeKeys: [],
        }),
      ]),
    );
  });

  it("can include private natal-contact score reasons with fake profiles", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-06-21T00:00:00.000Z",
      privateNatalProfiles: fakeNatalProfiles,
      options: { maxCandidates: 20 },
    });
    const contactCandidate = candidates.find(
      (candidate) => candidate.label === "Shared timing contact",
    );

    expect(contactCandidate?.natalContactKeys.length).toBeGreaterThan(0);
    expect(contactCandidate?.natalContactThemeKeys).toEqual(
      expect.arrayContaining(["practical_care", "private_natal_contact"]),
    );
    expect(contactCandidate?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "natal_contact_present" }),
        expect.objectContaining({ code: "shared_natal_contact_match" }),
      ]),
    );
  });

  it("lets a stronger transit-to-natal contact improve a candidate score", () => {
    const withoutNatal = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-06-21T00:00:00.000Z",
      options: { maxCandidates: 30 },
    });
    const withNatal = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-06-21T00:00:00.000Z",
      privateNatalProfiles: fakeNatalProfiles,
      options: { maxCandidates: 30 },
    });

    expect(scoreForLabel(withNatal, "Shared timing contact")).toBeGreaterThan(
      scoreForLabel(withoutNatal, "Moon in Virgo — useful tending") ?? 0,
    );
  });

  it("keeps natal-contact candidate labels and diagnostics privacy-safe", () => {
    const candidates = getTimingWindowCandidates({
      timezone: "UTC",
      startDate: "2026-06-21T00:00:00.000Z",
      privateNatalProfiles: fakeNatalProfiles,
      options: { maxCandidates: 20 },
    });
    const contactCandidate = candidates.find(
      (candidate) => candidate.label === "Shared timing contact",
    );
    const safeNatalFields = JSON.stringify({
      label: contactCandidate?.label,
      natalContactKeys: contactCandidate?.natalContactKeys,
      natalContactThemeKeys: contactCandidate?.natalContactThemeKeys,
      natalScoreReasons: contactCandidate?.scoreReasons.filter((reason) =>
        reason.code.includes("natal"),
      ),
    }).toLowerCase();

    expect(safeNatalFields).not.toContain("birth");
    expect(safeNatalFields).not.toContain("email");
    expect(safeNatalFields).not.toContain("virgo");
    expect(safeNatalFields).not.toContain("degree");
    expect(safeNatalFields).not.toContain("moon");
    expect(safeNatalFields).not.toContain("sun");
  });
});
