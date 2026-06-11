import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
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

describe("source-backed Ritual import data", () => {
  it("contains source-backed records with direct-use review overlays applied", () => {
    expect(sourceBackedRituals).toHaveLength(218);
    expect(sourceBackedRituals.map((ritual) => ritual.id)).toEqual(
      expect.arrayContaining([
        "ritual-buckland-candle-prepare-table",
        "ritual-house-witch-spiritual-hearth-recognition",
        "ritual-magical-household-center-house-mind",
        "ritual-green-garden-one-green-check-in",
        "whitehurst-flower-on-the-table",
        "candidate.saint_thomas.intimate_altar_table",
        "ritual-woodward-center-at-counter",
        "candidate.moon_book.new_moon_table_seed",
        "candidate.anand.practice_night_commitment",
        "candidate.dominguez.glyph-as-mark",
      ]),
    );
    expect(sourceBackedRituals.filter((ritual) => ritual.status === "draft")).toHaveLength(
      0,
    );
    expect(
      sourceBackedRituals.filter((ritual) => ritual.status === "reviewed"),
    ).toHaveLength(218);
    expect(sourceBackedRituals.every((ritual) => ritual.origin.type === "source")).toBe(
      true,
    );
    expect(
      sourceBackedRituals.every((ritual) => ritual.availability.findable === true),
    ).toBe(true);
    expect(
      sourceBackedRituals.filter((ritual) => ritual.availability.directUseEligible),
    ).toHaveLength(218);
    expect(
      sourceBackedRituals.every(
        (ritual) => ritual.availability.recommendationEligible === false,
      ),
    ).toBe(true);
    expect(
      sourceBackedRituals.every(
        (ritual) =>
          ritual.recommendationMetadata.eligibility.recommendable === false &&
          ritual.recommendationMetadata.eligibility.missing?.includes(
            "recommendation_review",
          ) &&
          (ritual.availability.directUseEligible ||
            ritual.recommendationMetadata.eligibility.missing?.includes(
              "direct_use_review",
            )),
      ),
    ).toBe(true);
  });

  it("promotes the Woodward kitchen/vessel batch for direct use only", () => {
    const woodward = sourceBackedRituals.filter(
      (ritual) =>
        ritual.searchMetadata.sourceLabel ===
        "Woodward, The Magical Household Cookbook",
    );

    expect(woodward).toHaveLength(14);
    expect(woodward.every((ritual) => ritual.status === "reviewed")).toBe(true);
    expect(woodward.every((ritual) => ritual.availability.directUseEligible)).toBe(
      true,
    );
    expect(
      woodward.every((ritual) => !ritual.availability.recommendationEligible),
    ).toBe(true);
    expect(
      woodward.every(
        (ritual) =>
          ritual.recommendationMetadata.eligibility.missing?.join(",") ===
          "recommendation_review",
      ),
    ).toBe(true);
    expect(woodward.every((ritual) => ritual.reviewFlags === undefined)).toBe(true);
  });

  it("promotes the House Witch hearth and room batch for direct use only", () => {
    const houseWitch = sourceBackedRituals.filter(
      (ritual) => ritual.searchMetadata.sourceLabel === "The House Witch",
    );

    expect(houseWitch).toHaveLength(15);
    expect(houseWitch.every((ritual) => ritual.status === "reviewed")).toBe(true);
    expect(
      houseWitch.every((ritual) => ritual.availability.directUseEligible),
    ).toBe(true);
    expect(
      houseWitch.every((ritual) => !ritual.availability.recommendationEligible),
    ).toBe(true);
    expect(
      houseWitch.every(
        (ritual) =>
          ritual.recommendationMetadata.eligibility.missing?.join(",") ===
          "recommendation_review",
      ),
    ).toBe(true);
    expect(houseWitch.every((ritual) => ritual.reviewFlags === undefined)).toBe(true);

    expect(
      houseWitch.find(
        (ritual) => ritual.id === "ritual-house-witch-food-with-awareness",
      )?.presentation.bestWindow,
    ).toContain("both of you");
    expect(
      houseWitch.find(
        (ritual) => ritual.id === "ritual-house-witch-cauldron-harmony",
      )?.presentation.headline,
    ).toBe("Hold Harmony in the Cauldron");
    expect(
      houseWitch.find(
        (ritual) => ritual.id === "ritual-house-witch-purify-person-at-home",
      )?.presentation.headline,
    ).toBe("Release Through Salt and Flame");
  });

  it("promotes the Buckland candle batch for direct use only", () => {
    const buckland = sourceBackedRituals.filter(
      (ritual) =>
        ritual.searchMetadata.sourceLabel ===
        "Buckland, Practical Candleburning Rituals",
    );

    expect(buckland).toHaveLength(13);
    expect(buckland.every((ritual) => ritual.status === "reviewed")).toBe(true);
    expect(buckland.every((ritual) => ritual.availability.directUseEligible)).toBe(
      true,
    );
    expect(
      buckland.every((ritual) => !ritual.availability.recommendationEligible),
    ).toBe(true);
    expect(
      buckland.every(
        (ritual) =>
          ritual.recommendationMetadata.eligibility.missing?.join(",") ===
          "recommendation_review",
      ),
    ).toBe(true);
    expect(buckland.every((ritual) => ritual.reviewFlags === undefined)).toBe(true);

    const directUseText = buckland
      .map((ritual) => Object.values(ritual.presentation).join(" "))
      .join(" ");

    expect(directUseText).not.toMatch(
      /Tim approves|material review|direct-use|for this candidate|Use the first version|Use the second version/i,
    );
    expect(
      buckland.find((ritual) => ritual.id === "ritual-buckland-candle-dream-door")
        ?.presentation.headline,
    ).toBe("Open the Dream Door");
    expect(
      buckland.find(
        (ritual) =>
          ritual.id === "ritual-candlelight-buckland-protecting-boundary-circle",
      )?.presentation.practice,
    ).not.toContain("first protection version");
    expect(
      buckland.find(
        (ritual) => ritual.id === "ritual-candlelight-buckland-tending-home-settling",
      )?.presentation.practice,
    ).toContain("so burns its spirit");
    expect(
      buckland.find((ritual) => ritual.id === "ritual-buckland-candle-dream-door")
        ?.presentation.practice,
    ).toContain("all that it sees");
  });

  it("promotes the Magical Household domestic batch for direct use only", () => {
    const magicalHousehold = sourceBackedRituals.filter(
      (ritual) => ritual.searchMetadata.sourceLabel === "The Magical Household",
    );

    expect(magicalHousehold).toHaveLength(15);
    expect(magicalHousehold.every((ritual) => ritual.status === "reviewed")).toBe(
      true,
    );
    expect(
      magicalHousehold.every((ritual) => ritual.availability.directUseEligible),
    ).toBe(true);
    expect(
      magicalHousehold.every(
        (ritual) => !ritual.availability.recommendationEligible,
      ),
    ).toBe(true);
    expect(
      magicalHousehold.every(
        (ritual) =>
          ritual.recommendationMetadata.eligibility.missing?.join(",") ===
          "recommendation_review",
      ),
    ).toBe(true);
    expect(
      magicalHousehold.find(
        (ritual) => ritual.id === "ritual-magical-household-center-house-mind",
      )?.presentation.headline,
    ).toBe("Center the House");
    expect(
      magicalHousehold.find(
        (ritual) =>
          ritual.id === "ritual-magical-household-four-elements-purification",
      )?.presentation.headline,
    ).toBe("Carry the Four Elements Through the House");
  });

  it("promotes the Green Garden plant batch for direct use only", () => {
    const greenGarden = sourceBackedRituals.filter(
      (ritual) => ritual.searchMetadata.sourceLabel === "The Green Witch's Garden",
    );

    expect(greenGarden).toHaveLength(16);
    expect(greenGarden.every((ritual) => ritual.status === "reviewed")).toBe(true);
    expect(
      greenGarden.every((ritual) => ritual.availability.directUseEligible),
    ).toBe(true);
    expect(
      greenGarden.every((ritual) => !ritual.availability.recommendationEligible),
    ).toBe(true);
    expect(
      greenGarden.every(
        (ritual) =>
          ritual.recommendationMetadata.eligibility.missing?.join(",") ===
          "recommendation_review",
      ),
    ).toBe(true);
    expect(
      greenGarden.find(
        (ritual) => ritual.id === "ritual-green-garden-record-page",
      )?.presentation.headline,
    ).toBe("Make the Green Record");
    expect(
      greenGarden.find(
        (ritual) => ritual.id === "ritual-green-garden-welcome-new-plant",
      )?.presentation.practice,
    ).not.toMatch(/pets|children|safety warnings/i);
  });

  it("promotes the Whitehurst flower batches for direct use only", () => {
    const whitehurst = sourceBackedRituals.filter(
      (ritual) => ritual.searchMetadata.sourceLabel === "Whitehurst flower magic",
    );
    const reviewedWhitehurst = whitehurst.filter(
      (ritual) => ritual.availability.directUseEligible,
    );

    expect(whitehurst).toHaveLength(36);
    expect(reviewedWhitehurst).toHaveLength(36);
    expect(reviewedWhitehurst.every((ritual) => ritual.status === "reviewed")).toBe(
      true,
    );
    expect(
      reviewedWhitehurst.every(
        (ritual) => !ritual.availability.recommendationEligible,
      ),
    ).toBe(true);
    expect(
      reviewedWhitehurst.find((ritual) => ritual.id === "whitehurst-flower-on-the-table")
        ?.presentation.headline,
    ).toBe("Set One Flower on the Table");
    expect(
      reviewedWhitehurst.find((ritual) => ritual.id === "whitehurst-rose-as-witness")
        ?.presentation.headline,
    ).toBe("Let One Rose Witness the Words");
    expect(
      reviewedWhitehurst
        .map((ritual) => ritual.presentation.practice)
        .join(" "),
    ).not.toMatch(/reviewed flower|reviewed bouquet|reviewed petals/i);
  });

  it("promotes the Moon Book lunar-cycle batch for direct use only", () => {
    const moonBook = sourceBackedRituals.filter(
      (ritual) =>
        ritual.searchMetadata.sourceLabel ===
        "Sarah Faith Gottesdiener, The Moon Book",
    );

    expect(moonBook).toHaveLength(21);
    expect(moonBook.every((ritual) => ritual.status === "reviewed")).toBe(true);
    expect(moonBook.every((ritual) => ritual.availability.directUseEligible)).toBe(
      true,
    );
    expect(
      moonBook.every((ritual) => !ritual.availability.recommendationEligible),
    ).toBe(true);
    expect(
      moonBook.find(
        (ritual) => ritual.id === "candidate.moon_book.imperfect_timing_adaptation",
      )?.presentation.headline,
    ).toBe("Use the Phase You Actually Have");
  });

  it("maps packet presentation fields without legacy pilot records", () => {
    expect(sourceBackedRituals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "ritual-buckland-candle-prepare-table",
          presentation: expect.objectContaining({
            headline: "Prepare the Candle Table",
            practice:
              expect.stringContaining("Set two white altar candles at the back corners."),
            intention: "Prepare the table so candle work has a clear physical beginning and end.",
            bestWindow: "Before a longer Buckland-derived candle working.",
            questionToCarry: "What am I setting apart for this work?",
          }),
        }),
        expect.objectContaining({
          id: "whitehurst-flower-on-the-table",
          presentation: expect.objectContaining({
            headline: "Set One Flower on the Table",
            practice: expect.stringContaining("Put it in a small vase or bowl and set it at the table."),
          }),
        }),
      ]),
    );
    expect(sourceBackedRituals.map((ritual) => ritual.id)).not.toEqual(
      expect.arrayContaining([
        "ritual.wet_the_seed_and_wait",
        "ritual.set_grain_at_the_table",
        "ritual.kindle_the_first_household_light",
      ]),
    );
  });

  it("keeps source-backed Ritual metadata valid and findable", () => {
    expect(validateRituals(sourceBackedRituals)).toEqual({
      valid: true,
      findings: [],
    });

    expect(
      sourceBackedRituals.map((ritual) => ritual.recommendationMetadata.purposes.primary),
    ).toEqual(expect.arrayContaining(["opening", "tending", "blessing"]));

    expect(
      sourceBackedRituals.find((ritual) => ritual.id === "ritual-woodward-bread-table-offering")
        ?.searchMetadata.materials,
    ).toEqual(expect.arrayContaining(["bread"]));
    expect(
      sourceBackedRituals.find(
        (ritual) => ritual.id === "ritual-buckland-candle-prepare-table",
      )?.searchMetadata.keywords,
    ).toEqual(expect.arrayContaining(["table"]));
  });

  it("uses only valid purpose, carrier, capacity, audience, and timing values", () => {
    for (const ritual of sourceBackedRituals) {
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
    for (const ritual of sourceBackedRituals) {
      expect(ritual.origin.type).toBe("source");
      if (ritual.origin.type !== "source") {
        throw new Error(`${ritual.id} should be source-origin.`);
      }

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
      ...sourceBackedRituals[0],
      presentation: {
        ...sourceBackedRituals[0].presentation,
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
      ...sourceBackedRituals[0],
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
        purposes: {
          ...sourceBackedRituals[0].recommendationMetadata.purposes,
          primary: "generic" as Ritual["recommendationMetadata"]["purposes"]["primary"],
        },
        carriers: {
          ...sourceBackedRituals[0].recommendationMetadata.carriers,
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
      ...sourceBackedRituals[0],
      status: "recommendable",
      availability: {
        ...sourceBackedRituals[0].availability,
        recommendationEligible: true,
      },
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
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
      ...sourceBackedRituals[0],
      status: "recommendable",
      availability: {
        ...sourceBackedRituals[0].availability,
        recommendationEligible: true,
      },
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

  it("prevents source-backed Rituals from self-identifying as recommendation-ready", () => {
    const recommendationEligiblePilot = {
      ...sourceBackedRituals[0],
      availability: {
        ...sourceBackedRituals[0].availability,
        recommendationEligible: true,
      },
    } satisfies Ritual;
    const recommendablePilot = {
      ...sourceBackedRituals[0],
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
        eligibility: {
          recommendable: true,
        },
      },
    } satisfies Ritual;

    expect(validateRitual(recommendationEligiblePilot).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "availability.recommendationEligible",
        }),
      ]),
    );
    expect(validateRitual(recommendablePilot).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "recommendationMetadata.eligibility.recommendable",
        }),
      ]),
    );
  });

  it("requires recommendable status for recommendation-eligible records", () => {
    const recommendationEligibleDraft = {
      ...sourceBackedRituals[0],
      status: "reviewed",
      availability: {
        ...sourceBackedRituals[0].availability,
        recommendationEligible: true,
      },
    } satisfies Ritual;
    const recommendableDraft = {
      ...sourceBackedRituals[0],
      status: "reviewed",
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
        eligibility: {
          recommendable: true,
        },
      },
    } satisfies Ritual;

    expect(validateRitual(recommendationEligibleDraft).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "availability.recommendationEligible",
        }),
      ]),
    );
    expect(validateRitual(recommendableDraft).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "recommendationMetadata.eligibility.recommendable",
        }),
      ]),
    );
  });

  it("validates source and household origins by origin type", () => {
    const validSource = sourceBackedRituals[0];
    const invalidSource = {
      ...sourceBackedRituals[0],
      origin: {
        type: "source",
        sourceGrounding: [],
      },
    } satisfies Ritual;
    const validHousehold = {
      ...sourceBackedRituals[0],
      origin: {
        type: "household",
        contributedBy: "Both",
        householdContext: "Household-approved practice for later review.",
      },
    } satisfies Ritual;
    const invalidHousehold = {
      ...sourceBackedRituals[0],
      origin: {
        type: "household",
        householdContext: "",
      },
    } satisfies Ritual;
    const invalidOrigin = {
      ...sourceBackedRituals[0],
      origin: {
        type: "library",
      },
    } as unknown as Ritual;

    expect(validateRitual(validSource).findings).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "origin.sourceGrounding",
        }),
      ]),
    );
    expect(validateRitual(invalidSource).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "origin.sourceGrounding",
        }),
      ]),
    );
    expect(validateRitual(validHousehold)).toEqual({
      valid: true,
      findings: [],
    });
    expect(validateRitual(invalidHousehold).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "origin.householdContext",
        }),
      ]),
    );
    expect(validateRitual(invalidOrigin).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "origin.type",
        }),
      ]),
    );
  });

  it("catches duplicate ids", () => {
    expect(validateRituals([sourceBackedRituals[0], sourceBackedRituals[0]]).findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "id",
          message: "Duplicate Ritual id.",
        }),
      ]),
    );
  });

  it("keeps source-backed Ritual records out of the current generator", () => {
    const generatorSource = readFileSync(
      new URL("../../src/lib/generate-weekly-brief.ts", import.meta.url),
      "utf8",
    );

    expect(generatorSource).not.toContain("data/rituals");
    expect(generatorSource).not.toContain("sourceBackedRituals");
  });
});
