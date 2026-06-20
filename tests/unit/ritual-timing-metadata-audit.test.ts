import { describe, expect, it } from "vitest";

import { chooseWithMeRitual } from "../../src/data/rituals/choose-with-me-selector";
import {
  getRitualTimingSearchMatch,
  type RitualTimingSearchTarget,
} from "../../src/data/rituals/search-rituals";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";
import type { TimingFact } from "../../src/lib/timing-facts";

const broadTimingContextLabels = new Set([
  "astrological timing",
  "imperfect timing",
  "lunar phase",
  "moon phase",
  "moon sign",
  "planetary aspect",
  "retrograde planet",
]);

function getRitual(id: string): Ritual {
  const ritual = sourceBackedRituals.find((candidate) => candidate.id === id);

  if (!ritual) {
    throw new Error(`Missing fixture Ritual: ${id}`);
  }

  return ritual;
}

function makeMoonPhaseFact(phase: "new" | "waxing" | "full" | "waning"): TimingFact {
  return {
    id: `timing.moon_phase.${phase}.fixture`,
    type: "moon_phase",
    label: `${phase} moon`,
    phase,
    phaseAngleDegrees: phase === "new" ? 0 : phase === "full" ? 180 : 90,
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function makeMercuryRetrogradeFact(): TimingFact {
  return {
    id: "timing.planet_retrograde.mercury.fixture",
    type: "planet_retrograde",
    label: "Mercury retrograde",
    planet: "mercury",
    isRetrograde: true,
    apparentDailyMotionDegrees: -0.2,
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function makeMoonInCancerFact(): TimingFact {
  return {
    id: "timing.moon_sign.cancer.fixture",
    type: "moon_sign",
    label: "Moon in Cancer",
    sign: "cancer",
    degree: 12,
    eclipticLongitudeDegrees: 102,
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function makeVenusTrineMarsFact(): TimingFact {
  return {
    id: "timing.planetary_aspect.venus.trine.mars.fixture",
    type: "planetary_aspect",
    label: "Venus trine Mars",
    bodyA: "venus",
    bodyB: "mars",
    aspect: "trine",
    angleDegrees: 120,
    orbDegrees: 1,
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function makeSunInAriesFact(): TimingFact {
  return {
    id: "timing.sun_sign.aries.fixture",
    type: "sun_sign",
    label: "Sun in Aries",
    sign: "aries",
    degree: 3,
    eclipticLongitudeDegrees: 3,
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function makeVenusInLeoFact(): TimingFact {
  return {
    id: "timing.planet_sign.venus.leo.fixture",
    type: "planet_sign",
    label: "Venus in Leo",
    planet: "venus",
    sign: "leo",
    degree: 7,
    eclipticLongitudeDegrees: 127,
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function searchTarget(label: string, fact: TimingFact): RitualTimingSearchTarget {
  const evidence = [fact.id, fact.label, fact.type];

  if (fact.type === "moon_phase") {
    evidence.push(fact.phase, `${fact.phase} moon`);
  }

  if (fact.type === "planet_retrograde") {
    evidence.push(fact.planet, "retrograde", `${fact.planet} retrograde`);
  }

  if (fact.type === "moon_sign") {
    evidence.push(fact.sign, `moon sign ${fact.sign}`);
  }

  if (fact.type === "sun_sign") {
    evidence.push(fact.sign, `sun sign ${fact.sign}`);
  }

  if (fact.type === "planet_sign") {
    evidence.push(fact.planet, fact.sign, `${fact.planet} in ${fact.sign}`);
  }

  if (fact.type === "planetary_aspect") {
    evidence.push(
      fact.bodyA,
      fact.bodyB,
      fact.aspect,
      `${fact.bodyA} ${fact.aspect} ${fact.bodyB}`,
      `${fact.bodyB} ${fact.aspect} ${fact.bodyA}`,
    );
  }

  return { label, evidence };
}

function chooseWithTiming(ritual: Ritual, fact: TimingFact) {
  return chooseWithMeRitual([ritual], {
    timeScope: "today",
    energyCapacity: "enough_to_engage",
    capacityMode: "steady",
    audience: ritual.recommendationMetadata!.audience.default ?? "me",
    purpose: ritual.recommendationMetadata!.purposes.primary,
    carrier: ritual.recommendationMetadata!.carriers.primary,
    timingContext: {
      computedTimingFacts: [fact],
    },
  });
}

describe("Ritual timing metadata audit guardrails", () => {
  it("keeps broad bucket labels out of active timing metadata", () => {
    const offenders = sourceBackedRituals.flatMap((ritual) => {
      if (ritual.recommendationMetadata!.timing.relationship === "none") {
        return [];
      }

      return (ritual.recommendationMetadata!.timing.contexts ?? [])
        .filter((context) => broadTimingContextLabels.has(context.toLowerCase()))
        .map((context) => `${ritual.id}: ${context}`);
    });

    expect(offenders).toEqual([]);
  });

  it("lets Search timing filters match repaired new moon and full moon records", () => {
    const newMoon = makeMoonPhaseFact("new");
    const fullMoon = makeMoonPhaseFact("full");

    expect(
      getRitualTimingSearchMatch(
        getRitual("candidate.moon_book.new_moon_table_seed"),
        searchTarget("New Moon", newMoon),
      )?.matchedContexts,
    ).toContain("new moon");
    expect(
      getRitualTimingSearchMatch(
        getRitual("candidate.moon_book.full_moon_mirror"),
        searchTarget("Full Moon", fullMoon),
      )?.matchedContexts,
    ).toContain("full moon");
  });

  it("lets Search timing filters match repaired retrograde and aspect records", () => {
    expect(
      getRitualTimingSearchMatch(
        getRitual("candidate.dominguez.retrograde-foundation"),
        searchTarget("Mercury retrograde", makeMercuryRetrogradeFact()),
      )?.matchedContexts,
    ).toContain("Mercury retrograde");
    expect(
      getRitualTimingSearchMatch(
        getRitual("candidate.dominguez.change-details-not-date"),
        searchTarget("Venus trine Mars", makeVenusTrineMarsFact()),
      )?.matchedContexts,
    ).toContain("Venus trine Mars");
  });

  it("does not let sign-specific timing contexts match generic lunar evidence", () => {
    const moonSignTone = getRitual("candidate.dominguez.moon-sign-tone");

    expect(
      getRitualTimingSearchMatch(
        moonSignTone,
        searchTarget("New Moon", makeMoonPhaseFact("new")),
      ),
    ).toBeNull();
    expect(
      getRitualTimingSearchMatch(
        moonSignTone,
        searchTarget("Moon in Cancer", makeMoonInCancerFact()),
      )?.matchedContexts,
    ).toContain("moon in Cancer");
  });

  it("lets Search timing filters match repaired source-backed zodiac records", () => {
    expect(
      getRitualTimingSearchMatch(
        getRitual("dykes-gibson-aries-invocation"),
        searchTarget("Sun in Aries", makeSunInAriesFact()),
      )?.matchedContexts,
    ).toContain("sun in Aries");
  });

  it("does not treat day or hour timing as a generic planet-name match", () => {
    expect(
      getRitualTimingSearchMatch(
        getRitual("ss-herstik-c2-self-love-self-lust-candle"),
        searchTarget("Venus in Leo", makeVenusInLeoFact()),
      ),
    ).toBeNull();
  });

  it("lets Choose with me match repaired timing metadata for lunar and sky fixtures", () => {
    const newMoonResult = chooseWithTiming(
      getRitual("candidate.moon_book.new_moon_table_seed"),
      makeMoonPhaseFact("new"),
    );
    const fullMoonResult = chooseWithTiming(
      getRitual("candidate.moon_book.full_moon_mirror"),
      makeMoonPhaseFact("full"),
    );
    const retrogradeResult = chooseWithTiming(
      getRitual("candidate.dominguez.retrograde-foundation"),
      makeMercuryRetrogradeFact(),
    );
    const aspectResult = chooseWithTiming(
      getRitual("candidate.dominguez.change-details-not-date"),
      makeVenusTrineMarsFact(),
    );

    expect(newMoonResult.status).toBe("selected");
    expect(newMoonResult.debug.timing.matchedRitualTiming).toContain("new moon");
    expect(fullMoonResult.status).toBe("selected");
    expect(fullMoonResult.debug.timing.matchedRitualTiming).toContain("full moon");
    expect(retrogradeResult.status).toBe("selected");
    expect(retrogradeResult.debug.timing.matchedRitualTiming).toContain(
      "Mercury retrograde",
    );
    expect(aspectResult.status).toBe("selected");
    expect(aspectResult.debug.timing.matchedRitualTiming).toContain(
      "Venus trine Mars",
    );
  });
});
