import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { pilotRituals } from "../../src/data/rituals/pilot-rituals";
import {
  RITUAL_AUDIENCES,
  RITUAL_CAPACITY_MODES,
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  RITUAL_TIMING_RELATIONSHIPS,
  type Ritual,
} from "../../src/data/rituals/types";
import {
  validateRitual,
  validateRituals,
} from "../../src/data/rituals/validate-rituals";

describe("inert Ritual pilot data", () => {
  it("contains exactly the three reviewed pilot Ritual records", () => {
    expect(pilotRituals.map((ritual) => ritual.id)).toEqual([
      "ritual.wet_the_seed_and_wait",
      "ritual.set_grain_at_the_table",
      "ritual.kindle_the_first_household_light",
    ]);
    expect(pilotRituals).toHaveLength(3);
    expect(pilotRituals.every((ritual) => ritual.status === "pilot")).toBe(true);
    expect(pilotRituals.every((ritual) => ritual.origin.type === "source")).toBe(
      true,
    );
  });

  it("keeps reviewed pilot presentation prose unchanged", () => {
    expect(pilotRituals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          presentation: expect.objectContaining({
            headline: "Wet the seed and wait.",
            practice:
              "Place one seed in a small dish. Touch it with a little water. Name the beginning it will hold in one sentence. Set the dish where it can wait undisturbed. Do not ask it to prove anything tonight. The ritual is complete when the seed has been placed into waiting.",
            intention:
              "Let the beginning have a small body and enough time to wait.",
            bestWindow:
              "When beginning something that should not become work immediately. Spring, new-phase, or first-step timing can strengthen the fit.",
            whyThisFits:
              "Seed and water make beginning material without promising the result. The Ritual ends by placing the seed into waiting, not by demanding growth.",
            questionToCarry: "What beginning can be placed into waiting?",
          }),
        }),
        expect.objectContaining({
          presentation: expect.objectContaining({
            headline: "Set grain at the table.",
            practice:
              "Place one small piece of bread at the center of the table. Name one way this household is being fed or held right now. Let the table hold that sentence for one breath. Eat the bread, share it, or put it away. The ritual is complete when the table is clear again.",
            intention:
              "Let ordinary nourishment have one clear place at the center.",
            bestWindow:
              "Near a meal, after the room has scattered, or when the household needs one ordinary point of care.",
            whyThisFits:
              "The source connects grain with household rhythm and table warmth. This Ritual keeps the table and food-family material specific so it does not become a generic object ritual.",
            questionToCarry:
              "What ordinary thing is holding more than you noticed?",
          }),
        }),
        expect.objectContaining({
          presentation: expect.objectContaining({
            headline: "Kindle the first household light.",
            practice:
              "Turn on one lamp before you begin anything else. Let it be the first household light of this ritual. Stand near it and name what is beginning in one plain sentence. Leave the lamp on while you take the first ordinary step. The ritual is complete when the beginning has been named and the light remains.",
            intention: "Let one first light make the beginning visible.",
            bestWindow:
              "At the beginning of the day, a task, a conversation, or a new phase. Strong beginning timing can make this especially fitting.",
            whyThisFits:
              "The source structure treats kindling as an opening act for the household. This Ritual keeps the first-light structure but uses ordinary household light rather than hearth fire.",
            questionToCarry: "What beginning wants one clear first sign?",
          }),
        }),
      ]),
    );
  });

  it("keeps pilot Ritual metadata valid and findable", () => {
    expect(validateRituals(pilotRituals)).toEqual({
      valid: true,
      findings: [],
    });

    expect(
      pilotRituals.map((ritual) => ({
        id: ritual.id,
        primaryPurpose: ritual.recommendationMetadata.purposes.primary,
        primaryCarrier: ritual.recommendationMetadata.carriers.primary,
        timingRelationship: ritual.recommendationMetadata.timing.relationship,
      })),
    ).toEqual([
      {
        id: "ritual.wet_the_seed_and_wait",
        primaryPurpose: "opening",
        primaryCarrier: "plant",
        timingRelationship: "helpful",
      },
      {
        id: "ritual.set_grain_at_the_table",
        primaryPurpose: "tending",
        primaryCarrier: "table",
        timingRelationship: "none",
      },
      {
        id: "ritual.kindle_the_first_household_light",
        primaryPurpose: "opening",
        primaryCarrier: "candlelight",
        timingRelationship: "preferred",
      },
    ]);

    expect(
      pilotRituals.find((ritual) => ritual.id === "ritual.set_grain_at_the_table")
        ?.searchMetadata.materials,
    ).toEqual(["bread", "grain", "table"]);
    expect(
      pilotRituals.find(
        (ritual) => ritual.id === "ritual.kindle_the_first_household_light",
      )?.searchMetadata.keywords,
    ).toEqual(expect.arrayContaining(["lamp", "light"]));
  });

  it("uses only valid purpose, carrier, capacity, audience, and timing values", () => {
    for (const ritual of pilotRituals) {
      expect(RITUAL_PURPOSES).toContain(
        ritual.recommendationMetadata.purposes.primary,
      );
      expect(RITUAL_CARRIERS).toContain(
        ritual.recommendationMetadata.carriers.primary,
      );

      for (const capacity of ritual.recommendationMetadata.capacity.supports) {
        expect(RITUAL_CAPACITY_MODES).toContain(capacity);
      }

      for (const audience of ritual.recommendationMetadata.audience.supports) {
        expect(RITUAL_AUDIENCES).toContain(audience);
      }

      expect(RITUAL_TIMING_RELATIONSHIPS).toContain(
        ritual.recommendationMetadata.timing.relationship,
      );
      expect(ritual.recommendationMetadata.timing.relationship).not.toBe(
        "required_or_preferred",
      );
    }
  });

  it("keeps source grounding local to the inert Ritual records", () => {
    for (const ritual of pilotRituals) {
      expect(ritual.origin.sourceGrounding.length).toBeGreaterThan(0);
      expect(ritual.origin.sourceGrounding[0]).toEqual(
        expect.objectContaining({
          citationLabel: expect.any(String),
          sourceLocation: expect.any(String),
          sourceSummary: expect.any(String),
          sourceSupports: expect.any(String),
          moonAndTableChanges: expect.any(String),
          doNotImport: expect.any(Array),
        }),
      );
    }
  });

  it("catches missing required presentation fields", () => {
    const invalid = {
      ...pilotRituals[0],
      presentation: {
        ...pilotRituals[0].presentation,
        practice: "",
      },
    } satisfies Ritual;

    expect(validateRitual(invalid).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "presentation.practice",
        }),
      ]),
    );
  });

  it("catches invalid enum values", () => {
    const invalid = {
      ...pilotRituals[0],
      recommendationMetadata: {
        ...pilotRituals[0].recommendationMetadata,
        purposes: {
          ...pilotRituals[0].recommendationMetadata.purposes,
          primary: "generic" as Ritual["recommendationMetadata"]["purposes"]["primary"],
        },
        carriers: {
          ...pilotRituals[0].recommendationMetadata.carriers,
          primary: "room" as Ritual["recommendationMetadata"]["carriers"]["primary"],
        },
        capacity: {
          supports: [
            "low" as Ritual["recommendationMetadata"]["capacity"]["supports"][number],
          ],
        },
        audience: {
          supports: [
            "together" as Ritual["recommendationMetadata"]["audience"]["supports"][number],
          ],
        },
        timing: {
          relationship:
            "required_or_preferred" as Ritual["recommendationMetadata"]["timing"]["relationship"],
        },
      },
    } satisfies Ritual;

    expect(validateRitual(invalid).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "recommendationMetadata.purposes.primary",
        }),
        expect.objectContaining({
          path: "recommendationMetadata.carriers.primary",
        }),
        expect.objectContaining({
          path: "recommendationMetadata.capacity.supports.0",
        }),
        expect.objectContaining({
          path: "recommendationMetadata.audience.supports.0",
        }),
        expect.objectContaining({
          path: "recommendationMetadata.timing.relationship",
        }),
      ]),
    );
  });

  it("catches recommendation-eligible records without required metadata", () => {
    const invalid = {
      ...pilotRituals[0],
      recommendationMetadata: {
        ...pilotRituals[0].recommendationMetadata,
        capacity: {
          supports: [],
        },
      },
    } satisfies Ritual;

    expect(validateRitual(invalid).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "recommendationMetadata.capacity.supports",
        }),
      ]),
    );
  });

  it("catches recommendation-eligible records with missing metadata objects", () => {
    const invalid = {
      ...pilotRituals[0],
      recommendationMetadata: undefined,
    } as unknown as Ritual;

    expect(validateRitual(invalid).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "recommendationMetadata",
        }),
      ]),
    );
  });

  it("catches duplicate ids", () => {
    expect(validateRituals([pilotRituals[0], pilotRituals[0]]).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "id",
          message: "Duplicate Ritual id.",
        }),
      ]),
    );
  });

  it("keeps pilot Ritual records out of the current generator", () => {
    const generatorSource = readFileSync(
      new URL("../../src/lib/generate-weekly-brief.ts", import.meta.url),
      "utf8",
    );

    expect(generatorSource).not.toContain("data/rituals");
    expect(generatorSource).not.toContain("pilotRituals");
  });
});
