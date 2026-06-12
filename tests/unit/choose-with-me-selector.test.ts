import { describe, expect, it } from "vitest";

import { chooseWithMeRitual } from "../../src/data/rituals/choose-with-me-selector";
import type { Ritual } from "../../src/data/rituals/types";
import type { TimingFact } from "../../src/lib/timing-facts";
import type { TimingWindowCandidate } from "../../src/lib/timing-window-candidates";

function makeRitual(overrides: Partial<Ritual>): Ritual {
  return {
    id: "ritual-default",
    status: "recommendable",
    origin: {
      type: "source",
      sourceGrounding: [
        {
          citationLabel: "Test source",
          sourceLocation: "test",
          sourceSummary: "A privacy-safe fixture.",
          sourceSupports: "A ritual shape.",
          moonAndTableChanges: "Transformed for testing.",
          doNotImport: [],
        },
      ],
    },
    presentation: {
      headline: "Test Ritual",
      practice: "Place a cup on the table and name the work.",
      intention: "Hold the work with care.",
      bestWindow: "When there is enough time.",
      whyThisFits: "The authored ritual already holds this shape.",
      questionToCarry: "What is ready to be held?",
    },
    recommendationMetadata: {
      purposes: {
        primary: "tending",
        secondary: [],
        refinement: "the home",
      },
      carriers: {
        primary: "table",
        secondary: [],
      },
      capacity: {
        supports: ["only_a_little", "enough_to_participate"],
        default: "enough_to_participate",
      },
      audience: {
        supports: ["me", "both_of_us"],
        default: "me",
      },
      timing: {
        relationship: "helpful",
      },
      eligibility: {
        recommendable: true,
      },
    },
    searchMetadata: {
      tags: ["table", "tending"],
      keywords: ["home", "care"],
      materials: ["cup"],
      places: ["table"],
    },
    availability: {
      findable: true,
      directUseEligible: true,
      recommendationEligible: true,
    },
    ...overrides,
  };
}

function makeMoonPhaseFact(phase: "new" | "waxing" | "full" | "waning"): TimingFact {
  return {
    id: `moon_phase.${phase}.test`,
    type: "moon_phase",
    label: `${phase} moon`,
    phase,
    phaseAngleDegrees: phase === "full" ? 180 : 0,
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function makePlanetaryAspectFact(): TimingFact {
  return {
    id: "planetary_aspect.venus.trine.mars.test",
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

function makeTimingWindow(
  overrides: Partial<TimingWindowCandidate> = {},
): TimingWindowCandidate {
  return {
    id: "timing_window.new_moon.test",
    startsAtIso: "2026-06-14T06:00:00.000Z",
    label: "New moon window",
    timingFacts: [makeMoonPhaseFact("new")],
    signalKeys: ["timing_rule.moon_phase.new"],
    natalContactKeys: [],
    natalContactThemeKeys: [],
    strength: "supporting",
    score: 12,
    scoreReasons: [
      {
        code: "moon_phase.new",
        label: "New moon",
        points: 12,
      },
    ],
    ...overrides,
  };
}

describe("chooseWithMeRitual", () => {
  it("preserves the requested primary carrier and purpose cell", () => {
    const selected = makeRitual({
      id: "table-tending",
      presentation: {
        ...makeRitual({}).presentation,
        headline: "Table Tending",
      },
    });
    const otherPurpose = makeRitual({
      id: "table-opening",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        purposes: {
          primary: "opening",
          secondary: ["tending"],
          refinement: "a beginning",
        },
      },
    });

    const result = chooseWithMeRitual([otherPurpose, selected], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      refinement: "the home",
    });

    expect(result.status).toBe("selected");
    expect(result.selectedRitual?.id).toBe("table-tending");
    expect(result.debug.exclusions.requested_primary_purpose_unmatched).toBe(1);
  });

  it("holds deeper-only rituals until the user has room for something deeper", () => {
    const deeperOnly = makeRitual({
      id: "deeper-ritual",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        capacity: {
          supports: ["room_for_something_deeper"],
          default: "room_for_something_deeper",
        },
      },
    });

    const lowResult = chooseWithMeRitual([deeperOnly], {
      timeScope: "today",
      energyCapacity: "a_little",
      capacityMode: "low",
      audience: "me",
      purpose: "tending",
      carrier: "table",
    });

    const deeperResult = chooseWithMeRitual([deeperOnly], {
      timeScope: "today",
      energyCapacity: "room_for_something_deeper",
      capacityMode: "high",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      refinement: "the home",
    });

    expect(lowResult.status).toBe("no_result");
    expect(lowResult.debug.exclusions.capacity_exceeds_user).toBe(1);
    expect(deeperResult.status).toBe("selected");
    expect(deeperResult.selectedRitual?.id).toBe("deeper-ritual");
  });

  it("infers the carrier for barely-any capacity without drifting from purpose", () => {
    const vesselTending = makeRitual({
      id: "vessel-tending",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        carriers: {
          primary: "vessel",
          secondary: [],
        },
        capacity: {
          supports: ["only_a_little"],
          default: "only_a_little",
        },
      },
    });

    const result = chooseWithMeRitual([vesselTending], {
      timeScope: "today",
      energyCapacity: "barely_any",
      capacityMode: "pause",
      audience: "me",
      purpose: "tending",
      carrier: null,
    });

    expect(result.status).toBe("selected");
    expect(result.selectedRitual?.id).toBe("vessel-tending");
    expect(result.debug.topCandidates[0]?.evidence).toContain(
      "carrier inferred from a low-capacity ritual",
    );
    expect(result.whyThisFits).not.toContain(
      "The authored ritual already holds this shape",
    );
    expect(result.whyThisFits).not.toContain("carrier inferred");
    expect(result.howThisWasChosen).toContain("its own vessel form");
    expect(result.howThisWasChosen).toContain("ranked the remaining rituals");
  });

  it("returns a documented no-result instead of drifting to another carrier", () => {
    const tableTending = makeRitual({
      id: "table-tending",
    });

    const result = chooseWithMeRitual([tableTending], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "plant",
      refinement: "a living thing",
    });

    expect(result.status).toBe("no_result");
    expect(result.debug.fallback).toBe("no_eligible_ritual_for_requested_cell");
    expect(result.debug.exclusions.requested_primary_carrier_unmatched).toBe(1);
  });

  it("excludes required timing rituals when the timing cannot be verified", () => {
    const requiredNewMoon = makeRitual({
      id: "required-new-moon",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["new moon"],
        },
      },
    });

    const result = chooseWithMeRitual([requiredNewMoon], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("waning")],
      },
    });

    expect(result.status).toBe("no_result");
    expect(result.debug.exclusions.required_timing_unmatched).toBe(1);
  });

  it("allows required timing rituals when matching timing evidence is present", () => {
    const requiredNewMoon = makeRitual({
      id: "required-new-moon",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["new moon"],
        },
      },
    });

    const result = chooseWithMeRitual([requiredNewMoon], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("new")],
      },
    });

    expect(result.status).toBe("selected");
    expect(result.selectedRitual?.id).toBe("required-new-moon");
    expect(result.debug.timing.matchedRitualTiming).toContain("new moon");
    expect(result.debug.timing.timingScore).toBeGreaterThan(0);
  });

  it("lets preferred timing decide between otherwise aligned rituals", () => {
    const untimed = makeRitual({
      id: "untimed-table",
      presentation: {
        ...makeRitual({}).presentation,
        headline: "Untimed Table",
      },
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "none",
        },
      },
    });
    const fullMoonPreferred = makeRitual({
      id: "full-moon-table",
      presentation: {
        ...makeRitual({}).presentation,
        headline: "Full Moon Table",
      },
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "preferred",
          contexts: ["full moon"],
        },
      },
    });

    const result = chooseWithMeRitual([untimed, fullMoonPreferred], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("full")],
      },
    });

    expect(result.status).toBe("selected");
    expect(result.selectedRitual?.id).toBe("full-moon-table");
    expect(result.debug.selectedBreakdown?.timing).toBe(16);
  });

  it("keeps helpful timing from overriding the requested purpose", () => {
    const openingFullMoon = makeRitual({
      id: "opening-full-moon",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        purposes: {
          primary: "opening",
          secondary: ["tending"],
          refinement: "opening",
        },
        timing: {
          relationship: "helpful",
          contexts: ["full moon"],
        },
      },
    });
    const tendingUntimed = makeRitual({
      id: "tending-untimed",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "none",
        },
      },
    });

    const result = chooseWithMeRitual([openingFullMoon, tendingUntimed], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("full")],
      },
    });

    expect(result.status).toBe("selected");
    expect(result.selectedRitual?.id).toBe("tending-untimed");
    expect(result.debug.exclusions.requested_primary_purpose_unmatched).toBe(1);
  });

  it("does not give timing-none rituals a fake timing boost", () => {
    const untimed = makeRitual({
      id: "untimed",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "none",
          contexts: ["new moon"],
        },
      },
    });

    const result = chooseWithMeRitual([untimed], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("new")],
      },
    });

    expect(result.status).toBe("selected");
    expect(result.debug.selectedBreakdown?.timing).toBe(0);
    expect(result.debug.timing.matchedRitualTiming).toEqual([]);
  });

  it("uses a strong selected timing window for across-the-week recommendations", () => {
    const requiredNewMoon = makeRitual({
      id: "required-new-moon-window",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["new moon"],
        },
      },
    });
    const selectedWindow = makeTimingWindow();

    const result = chooseWithMeRitual([requiredNewMoon], {
      timeScope: "best_moment_this_week",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("waning")],
        timingWindowCandidates: [selectedWindow],
        timingWindowCandidateIds: [selectedWindow.id],
      },
    });

    expect(result.status).toBe("selected");
    expect(result.debug.timing.selectedWindow).toBe(selectedWindow.id);
    expect(result.debug.timing.matchedRitualTiming).toContain("new moon");
  });

  it("does not treat a weak across-week window as satisfying required timing", () => {
    const requiredNewMoon = makeRitual({
      id: "required-new-moon-weak-window",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["new moon"],
        },
      },
    });
    const weakWindow = makeTimingWindow({
      id: "timing_window.weak_new_moon.test",
      strength: "accent",
      score: 8,
    });

    const result = chooseWithMeRitual([requiredNewMoon], {
      timeScope: "best_moment_this_week",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("waning")],
        timingWindowCandidates: [weakWindow],
        timingWindowCandidateIds: [weakWindow.id],
      },
    });

    expect(result.status).toBe("no_result");
    expect(result.debug.timing.selectedWindow).toBeUndefined();
    expect(result.debug.exclusions.required_timing_unmatched).toBe(1);
  });

  it("does not use an across-week timing window as immediate evidence for today", () => {
    const requiredNewMoon = makeRitual({
      id: "required-new-moon-today",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["new moon"],
        },
      },
    });
    const selectedWindow = makeTimingWindow();

    const result = chooseWithMeRitual([requiredNewMoon], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("waning")],
        timingWindowCandidates: [selectedWindow],
        timingWindowCandidateIds: [selectedWindow.id],
      },
    });

    expect(result.status).toBe("no_result");
    expect(result.debug.exclusions.required_timing_unmatched).toBe(1);
  });

  it("requires actual planetary aspect evidence for planetary timing", () => {
    const venusMars = makeRitual({
      id: "venus-mars-required",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["venus trine mars"],
        },
      },
    });

    const missingResult = chooseWithMeRitual([venusMars], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("full")],
      },
    });
    const matchedResult = chooseWithMeRitual([venusMars], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makePlanetaryAspectFact()],
      },
    });

    expect(missingResult.status).toBe("no_result");
    expect(matchedResult.status).toBe("selected");
    expect(matchedResult.debug.timing.matchedRitualTiming).toContain(
      "venus trine mars",
    );
  });

  it("records missing required timing contexts as unverifiable", () => {
    const requiredWithoutContext = makeRitual({
      id: "required-without-context",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "required",
        },
      },
    });

    const result = chooseWithMeRitual([requiredWithoutContext], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("new")],
      },
    });

    expect(result.status).toBe("no_result");
    expect(result.debug.exclusions.required_timing_unmatched).toBe(1);
  });

  it("can still select a timing-adaptable ritual when timing evidence is weak", () => {
    const adaptable = makeRitual({
      id: "timing-adaptable",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "helpful",
          contexts: ["venus-touched evening"],
        },
      },
      adaptationPolicy: {
        purposeChange: "not_allowed",
        timingAdaptation: "may_shape_best_window",
      },
    });

    const result = chooseWithMeRitual([adaptable], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("waxing")],
      },
    });

    expect(result.status).toBe("selected");
    expect(result.selectedRitual?.id).toBe("timing-adaptable");
    expect(result.debug.selectedBreakdown?.timing).toBe(0);
  });

  it("keeps raw timing keys in debug while normal copy names the timing context", () => {
    const requiredNewMoon = makeRitual({
      id: "required-new-moon-copy",
      recommendationMetadata: {
        ...makeRitual({}).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["new moon"],
        },
      },
    });

    const result = chooseWithMeRitual([requiredNewMoon], {
      timeScope: "today",
      energyCapacity: "enough_to_engage",
      capacityMode: "steady",
      audience: "me",
      purpose: "tending",
      carrier: "table",
      timingContext: {
        computedTimingFacts: [makeMoonPhaseFact("new")],
      },
    });

    expect(result.status).toBe("selected");
    expect(result.howThisWasChosen).toContain("new moon");
    expect(result.howThisWasChosen).not.toContain("moon_phase.new.test");
    expect(result.debug.timing.suppliedFacts).toContain("moon_phase.new.test");
  });
});
