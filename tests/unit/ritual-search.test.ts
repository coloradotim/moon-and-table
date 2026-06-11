import { describe, expect, it } from "vitest";

import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import {
  getRitualSearchChips,
  searchRituals,
} from "../../src/data/rituals/search-rituals";
import type { Ritual } from "../../src/data/rituals/types";

function resultIds(query: string, selectedChips: string[] = []): string[] {
  return searchRituals(sourceBackedRituals, { query, selectedChips }).map(
    (ritual) => ritual.id,
  );
}

describe("Ritual search", () => {
  it("returns reviewed direct-use records in the direct-selection search flow", () => {
    expect(resultIds("")).toHaveLength(218);
    expect(sourceBackedRituals).toHaveLength(218);
    expect(sourceBackedRituals.every((ritual) => ritual.availability.findable)).toBe(
      true,
    );
    expect(
      sourceBackedRituals.filter((ritual) => ritual.availability.directUseEligible),
    ).toHaveLength(218);
  });

  it("can include draft records only for inspection/debug search", () => {
    const ids = searchRituals(sourceBackedRituals, {
      query: "seed",
      includeNonDirectUse: true,
    }).map((ritual) => ritual.id);

    expect(ids).toEqual(
      expect.arrayContaining(["candidate.moon_book.seed_pot_intention"]),
    );
  });

  it("can inspect source-backed table rituals by bread or grain when requested", () => {
    expect(
      searchRituals(sourceBackedRituals, {
        query: "bread",
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(
      expect.arrayContaining(["ritual-woodward-bread-table-offering"]),
    );
    expect(
      searchRituals(sourceBackedRituals, {
        query: "grain",
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(
      expect.arrayContaining(["ritual-woodward-bread-table-offering"]),
    );
  });

  it("can inspect source-backed candle and light rituals by lamp or light when requested", () => {
    expect(
      searchRituals(sourceBackedRituals, {
        query: "lamp",
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(
      expect.arrayContaining(["candidate.saint_thomas.intimate_altar_table"]),
    );
    expect(
      searchRituals(sourceBackedRituals, {
        query: "light",
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(
      expect.arrayContaining(["ritual-buckland-candle-prepare-table"]),
    );
  });

  it("can find the imported packet families in inspection/debug search", () => {
    expect(
      searchRituals(sourceBackedRituals, {
        query: "new moon",
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(expect.arrayContaining(["candidate.moon_book.new_moon_table_seed"]));
    expect(
      searchRituals(sourceBackedRituals, {
        query: "practice night",
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(
      expect.arrayContaining(["candidate.anand.practice_night_commitment"]),
    );
    expect(
      searchRituals(sourceBackedRituals, {
        query: "glyph",
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(expect.arrayContaining(["candidate.dominguez.glyph-as-mark"]));
  });

  it("filters by carrier chips only for direct-use eligible rituals", () => {
    expect(resultIds("", ["plant"])).toEqual(
      expect.arrayContaining([
        "ritual-green-garden-welcome-existing-plant",
        "ritual-woodward-enoughness-bowl",
        "ritual-woodward-seasonal-food-marker",
      ]),
    );
    expect(resultIds("", ["table"])).toEqual(
      expect.arrayContaining(["ritual-woodward-bread-table-offering"]),
    );
  });

  it("filters by purpose chips only for direct-use eligible rituals", () => {
    expect(resultIds("", ["opening"])).toEqual(
      expect.arrayContaining(["ritual-woodward-center-at-counter"]),
    );
  });

  it("narrows when selected chips and text search are combined", () => {
    expect(
      searchRituals(sourceBackedRituals, {
        query: "seed",
        selectedChips: ["plant"],
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(
      expect.arrayContaining(["candidate.moon_book.seed_pot_intention"]),
    );
    expect(
      searchRituals(sourceBackedRituals, {
        query: "seed",
        selectedChips: ["doorway"],
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual([]);
  });

  it("excludes non-findable rituals from normal search results", () => {
    const hiddenRitual = {
      ...sourceBackedRituals[0],
      id: "ritual.hidden_seed",
      availability: {
        ...sourceBackedRituals[0].availability,
        findable: false,
      },
    } satisfies Ritual;

    expect(
      searchRituals([hiddenRitual], { query: "seed" }).map(
        (ritual) => ritual.id,
      ),
    ).toEqual([]);
  });

  it("derives direct-use chips only from reviewed direct-use metadata", () => {
    const draftOnlyRitual = {
      ...sourceBackedRituals[0],
      id: "ritual.draft_only_chip",
      status: "draft",
      availability: {
        ...sourceBackedRituals[0].availability,
        directUseEligible: false,
      },
      searchMetadata: {
        ...sourceBackedRituals[0].searchMetadata,
        tags: ["draft-only-chip"],
      },
    } satisfies Ritual;

    const chips = getRitualSearchChips([
      ...sourceBackedRituals,
      draftOnlyRitual,
    ]).map((chip) => chip.value);

    expect(chips).toEqual(expect.arrayContaining(["table", "vessel", "bread"]));
    expect(chips).not.toEqual(expect.arrayContaining(["draft-only-chip"]));
  });
});
