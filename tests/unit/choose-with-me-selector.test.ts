import { describe, expect, it } from "vitest";

import { chooseWithMeRitual } from "../../src/data/rituals/choose-with-me-selector";
import type { Ritual } from "../../src/data/rituals/types";

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
});
