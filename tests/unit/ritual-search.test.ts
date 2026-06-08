import { describe, expect, it } from "vitest";

import { pilotRituals } from "../../src/data/rituals/pilot-rituals";
import {
  getRitualSearchChips,
  searchRituals,
} from "../../src/data/rituals/search-rituals";
import type { Ritual } from "../../src/data/rituals/types";

function resultIds(query: string, selectedChips: string[] = []): string[] {
  return searchRituals(pilotRituals, { query, selectedChips }).map(
    (ritual) => ritual.id,
  );
}

describe("Ritual search", () => {
  it("returns all findable pilot rituals for an empty query", () => {
    expect(resultIds("")).toEqual([
      "ritual.wet_the_seed_and_wait",
      "ritual.set_grain_at_the_table",
      "ritual.kindle_the_first_household_light",
    ]);
  });

  it("finds the seed ritual by seed", () => {
    expect(resultIds("seed")).toEqual(["ritual.wet_the_seed_and_wait"]);
  });

  it("finds the table ritual by bread or grain", () => {
    expect(resultIds("bread")).toEqual(["ritual.set_grain_at_the_table"]);
    expect(resultIds("grain")).toEqual(["ritual.set_grain_at_the_table"]);
  });

  it("finds the first-light ritual by lamp or light", () => {
    expect(resultIds("lamp")).toEqual([
      "ritual.kindle_the_first_household_light",
    ]);
    expect(resultIds("light")).toEqual([
      "ritual.kindle_the_first_household_light",
    ]);
  });

  it("filters by carrier chips", () => {
    expect(resultIds("", ["plant"])).toEqual([
      "ritual.wet_the_seed_and_wait",
    ]);
    expect(resultIds("", ["table"])).toEqual([
      "ritual.set_grain_at_the_table",
    ]);
  });

  it("filters by purpose chips", () => {
    expect(resultIds("", ["opening"])).toEqual([
      "ritual.wet_the_seed_and_wait",
      "ritual.kindle_the_first_household_light",
    ]);
  });

  it("narrows when selected chips and text search are combined", () => {
    expect(resultIds("beginning", ["plant"])).toEqual([
      "ritual.wet_the_seed_and_wait",
    ]);
    expect(resultIds("beginning", ["table"])).toEqual([]);
  });

  it("excludes non-findable rituals from normal search results", () => {
    const hiddenRitual = {
      ...pilotRituals[0],
      id: "ritual.hidden_seed",
      availability: {
        ...pilotRituals[0].availability,
        findable: false,
      },
    } satisfies Ritual;

    expect(
      searchRituals([hiddenRitual], { query: "seed" }).map(
        (ritual) => ritual.id,
      ),
    ).toEqual([]);
  });

  it("derives useful chips from current findable pilot metadata", () => {
    const chips = getRitualSearchChips(pilotRituals).map((chip) => chip.value);

    expect(chips).toEqual(
      expect.arrayContaining([
        "candlelight",
        "table",
        "plant",
        "vessel",
        "opening",
        "tending",
        "steadying",
        "blessing",
        "seed",
        "water",
        "bread",
        "grain",
        "lamp",
        "light",
      ]),
    );
  });
});
