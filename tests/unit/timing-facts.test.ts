import { describe, expect, it } from "vitest";

import {
  getTimingFactsForDate,
  getUniversalNumerologyNumbers,
  getZodiacSignForLongitude,
  type CalendarThresholdFact,
  type NumerologyDateFact,
  type PlanetSignFact,
  type PlanetRetrogradeFact,
  type PlanetaryAspectFact,
  type SeasonalMarkerFact,
} from "../../src/lib/timing-facts";
import {
  getNumerologyTimingFacts,
  reduceNumerology,
} from "../../src/lib/numerology-timing";

describe("timing facts", () => {
  it("keeps the existing four-bucket lunar phase behavior available", () => {
    const facts = getTimingFactsForDate("2026-06-15T03:00:00.000Z");
    const moonPhase = facts.find((fact) => fact.type === "moon_phase");

    expect(moonPhase).toMatchObject({
      type: "moon_phase",
      phase: "new",
      label: "New moon",
      computedBy: "astronomy_engine",
      confidence: "computed",
    });
  });

  it("includes exact lunation facts when the selected week contains one", () => {
    const facts = getTimingFactsForDate("2026-06-15T03:00:00.000Z");
    const lunation = facts.find((fact) => fact.type === "lunation");

    expect(lunation).toMatchObject({
      type: "lunation",
      lunation: "new_moon",
      label: "New moon exact",
      exactIso: "2026-06-15T02:54:39.007Z",
      computedBy: "astronomy_engine",
      confidence: "computed",
    });
  });

  it("computes moon sign as a factual zodiac position", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const moonSign = facts.find((fact) => fact.type === "moon_sign");

    expect(moonSign).toMatchObject({
      type: "moon_sign",
      sign: "virgo",
      label: "Moon in Virgo",
      computedBy: "astronomy_engine",
      confidence: "computed",
    });
  });

  it("handles sun sign boundary behavior around the June solstice", () => {
    const beforeSolstice = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const afterSolstice = getTimingFactsForDate("2026-06-21T12:00:00.000Z");

    expect(beforeSolstice.find((fact) => fact.type === "sun_sign")).toMatchObject({
      sign: "gemini",
      label: "Sun in Gemini",
    });
    expect(afterSolstice.find((fact) => fact.type === "sun_sign")).toMatchObject({
      sign: "cancer",
      label: "Sun in Cancer",
    });
  });

  it("detects solstice or equinox markers inside the selected week", () => {
    const facts = getTimingFactsForDate("2026-06-21T12:00:00.000Z");
    const marker = facts.find(
      (fact): fact is SeasonalMarkerFact => fact.type === "solar_season",
    );

    expect(marker).toMatchObject({
      marker: "june_solstice",
      label: "June solstice",
      exactIso: "2026-06-21T08:25:00.316Z",
    });
  });

  it("computes planetary signs without adding interpretation", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z", {
      includePlanetaryAspects: false,
    });
    const mercury = facts.find(
      (fact): fact is PlanetSignFact =>
        fact.type === "planet_sign" && fact.planet === "mercury",
    );

    expect(mercury).toMatchObject({
      planet: "mercury",
      sign: "cancer",
      label: "Mercury in Cancer",
      computedBy: "astronomy_engine",
    });
    expect(JSON.stringify(mercury).toLowerCase()).not.toContain("means");
  });

  it("computes retrograde status as apparent motion only", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z", {
      includePlanetaryAspects: false,
    });
    const pluto = facts.find(
      (fact): fact is PlanetRetrogradeFact =>
        fact.type === "planet_retrograde" && fact.planet === "pluto",
    );

    expect(pluto).toMatchObject({
      planet: "pluto",
      isRetrograde: true,
      label: "Pluto retrograde",
    });
    expect(pluto?.apparentDailyMotionDegrees).toBeLessThan(0);
  });

  it("detects only major aspects within the configured orb", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z", {
      aspectOrbDegrees: 3,
    });
    const mercuryMars = facts.find(
      (fact): fact is PlanetaryAspectFact =>
        fact.type === "planetary_aspect" &&
        fact.bodyA === "mercury" &&
        fact.bodyB === "mars",
    );

    expect(mercuryMars).toMatchObject({
      aspect: "sextile",
      label: "Mercury sextile Mars",
    });
    expect(mercuryMars?.orbDegrees).toBeLessThanOrEqual(3);
  });

  it("computes universal numerology year, month, and day facts", () => {
    const numbers = getUniversalNumerologyNumbers("2026-06-21T00:00:00.000Z");
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const numerologyFacts = facts.filter(
      (fact): fact is NumerologyDateFact => fact.type === "numerology_date",
    );

    expect(numbers).toEqual({
      universal_year: 1,
      universal_month: 7,
      universal_day: 1,
    });
    expect(numerologyFacts.map((fact) => fact.label)).toEqual([
      "Universal year 1",
      "Universal month 7",
      "Universal day 1",
    ]);
    expect(numerologyFacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "numerology.universal_year.1",
          scope: "universal_year",
          number: 1,
          relatedSymbolicKeys: ["numerology_1"],
        }),
        expect.objectContaining({
          key: "numerology.universal_month.7",
          scope: "universal_month",
          number: 7,
          relatedSymbolicKeys: ["numerology_7"],
        }),
      ]),
    );
  });

  it("computes first-day calendar threshold facts", () => {
    const facts = getTimingFactsForDate("2026-07-01T12:00:00.000Z");
    const calendarFacts = facts.filter(
      (fact): fact is CalendarThresholdFact => fact.type === "calendar_threshold",
    );

    expect(calendarFacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "timing.calendar_threshold.first_day_of_month.2026-07-01",
          threshold: "first_day_of_month",
          label: "First day of July",
          dateIso: "2026-07-01",
          monthName: "July",
          previousMonthName: "June",
          computedBy: "app_calendar",
          confidence: "computed",
        }),
        expect.objectContaining({
          id: "timing.calendar_threshold.month_turn.2026-07-01",
          threshold: "month_turn",
          label: "Month turn into July",
        }),
      ]),
    );
  });

  it("computes last-day calendar threshold facts including leap-year month ends", () => {
    const juneFacts = getTimingFactsForDate("2026-06-30T12:00:00.000Z");
    const leapFacts = getTimingFactsForDate("2028-02-29T12:00:00.000Z");
    const juneCalendarFacts = juneFacts.filter(
      (fact): fact is CalendarThresholdFact => fact.type === "calendar_threshold",
    );
    const leapCalendarFacts = leapFacts.filter(
      (fact): fact is CalendarThresholdFact => fact.type === "calendar_threshold",
    );

    expect(juneCalendarFacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          threshold: "last_day_of_month",
          label: "Last day of June",
          dateIso: "2026-06-30",
          nextMonthName: "July",
        }),
        expect.objectContaining({
          threshold: "month_turn",
          label: "Month turn out of June",
        }),
      ]),
    );
    expect(leapCalendarFacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          threshold: "last_day_of_month",
          label: "Last day of February",
          dateIso: "2028-02-29",
        }),
      ]),
    );
  });

  it("does not create calendar threshold facts on ordinary month days", () => {
    const facts = getTimingFactsForDate("2026-07-15T12:00:00.000Z");

    expect(facts.some((fact) => fact.type === "calendar_threshold")).toBe(false);
  });

  it("reduces numerology values to 1-9 for MVP", () => {
    expect(reduceNumerology(2026)).toBe(1);
    expect(reduceNumerology(29)).toBe(2);
    expect(reduceNumerology(11)).toBe(2);
    expect(reduceNumerology(22)).toBe(4);
  });

  it("computes fixed universal numerology date examples deterministically", () => {
    expect(getUniversalNumerologyNumbers("2026-01-01T00:00:00.000Z")).toEqual({
      universal_year: 1,
      universal_month: 2,
      universal_day: 3,
    });
    expect(getUniversalNumerologyNumbers("2027-12-31T23:59:59.000Z")).toEqual({
      universal_year: 2,
      universal_month: 5,
      universal_day: 9,
    });
  });

  it("exposes a reusable numerology fact API with UTC-stable dates", () => {
    const facts = getNumerologyTimingFacts("2026-06-21T00:30:00.000+02:00");

    expect(facts).toHaveLength(3);
    expect(facts[0]).toMatchObject({
      id: "timing.numerology.universal_year.1.2026-06-20",
      type: "numerology_date",
      dateIso: "2026-06-20",
      exactIso: "2026-06-20T22:30:00.000Z",
      computedBy: "app_numerology",
      confidence: "computed",
    });
  });

  it("rejects invalid dates in the numerology fact API", () => {
    expect(() => getNumerologyTimingFacts("not-a-date")).toThrow(
      "A valid date is required for numerology timing facts.",
    );
  });

  it("rejects invalid dates", () => {
    expect(() => getTimingFactsForDate("not-a-date")).toThrow(
      "A valid date is required for timing facts.",
    );
  });

  it("uses UTC date boundaries deterministically", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:30:00.000+02:00");
    const moonPhase = facts.find((fact) => fact.type === "moon_phase");

    expect(moonPhase?.startIso).toBe("2026-06-15T00:00:00.000Z");
    expect(moonPhase?.endIso).toBe("2026-06-21T23:59:59.999Z");
  });

  it("maps zodiac longitude boundaries", () => {
    expect(getZodiacSignForLongitude(0)).toEqual({ sign: "aries", degree: 0 });
    expect(getZodiacSignForLongitude(29.999).sign).toBe("aries");
    expect(getZodiacSignForLongitude(30)).toEqual({ sign: "taurus", degree: 0 });
    expect(getZodiacSignForLongitude(359.5)).toEqual({
      sign: "pisces",
      degree: 29.5,
    });
  });
});
