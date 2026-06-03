import { describe, expect, it } from "vitest";

import {
  getTimingFactsForDate,
  getUniversalNumerologyNumbers,
  getZodiacSignForLongitude,
  type NumerologyDateFact,
  type PlanetSignFact,
  type PlanetRetrogradeFact,
  type PlanetaryAspectFact,
  type SeasonalMarkerFact,
} from "../../src/lib/timing-facts";

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

    expect(numbers).toEqual({ year: 1, month: 7, day: 1 });
    expect(numerologyFacts.map((fact) => fact.label)).toEqual([
      "Universal year 1",
      "Universal month 7",
      "Universal day 1",
    ]);
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
