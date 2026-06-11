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
  it("does not return draft source-backed rituals in the direct-use search flow", () => {
    expect(resultIds("")).toEqual([]);
    expect(sourceBackedRituals).toHaveLength(218);
    expect(sourceBackedRituals.every((ritual) => ritual.availability.findable)).toBe(
      true,
    );
    expect(
      sourceBackedRituals.every(
        (ritual) => ritual.availability.directUseEligible === false,
      ),
    ).toBe(true);
  });

  it("can include draft records only for inspection/debug search", () => {
    const ids = searchRituals(sourceBackedRituals, {
      query: "seed",
      includeNonDirectUse: true,
    }).map((ritual) => ritual.id);

    expect(ids).toEqual(
      expect.arrayContaining(["ritual-green-garden-welcome-existing-plant"]),
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

  it("can inspect the remaining imported packet families only in inspection/debug search", () => {
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
    expect(resultIds("", ["plant"])).toEqual([]);
    expect(resultIds("", ["table"])).toEqual([]);
  });

  it("filters by purpose chips only for direct-use eligible rituals", () => {
    expect(resultIds("", ["opening"])).toEqual([]);
  });

  it("narrows when selected chips and text search are combined", () => {
    expect(
      searchRituals(sourceBackedRituals, {
        query: "seed",
        selectedChips: ["plant"],
        includeNonDirectUse: true,
      }).map((ritual) => ritual.id),
    ).toEqual(
      expect.arrayContaining(["ritual-green-garden-welcome-existing-plant"]),
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

  it("does not derive direct-use chips from draft source-backed metadata", () => {
    const chips = getRitualSearchChips(sourceBackedRituals).map((chip) => chip.value);

    expect(chips).toEqual([]);
  });
});
