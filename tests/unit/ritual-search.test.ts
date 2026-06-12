import { describe, expect, it } from "vitest";

import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import {
  getRitualTimingSearchMatch,
  getRitualTimingSearchTarget,
  getRitualSearchChips,
  getRitualSourceOptions,
  ritualTimingPresetOptions,
  searchRituals,
} from "../../src/data/rituals/search-rituals";
import type { Ritual } from "../../src/data/rituals/types";
import { getTimingWindowCandidates } from "../../src/lib/timing-window-candidates";

function getNewMoonWindow() {
  const window = getTimingWindowCandidates({
    startDate: "2026-06-12T12:00:00.000Z",
    timezone: "UTC",
    daysAhead: 4,
    options: { maxCandidates: 8 },
  }).find((candidate) => candidate.label === "New Moon");

  if (!window) {
    throw new Error("Expected a New Moon timing window fixture.");
  }

  return window;
}

function resultIds(query: string, selectedChips: string[] = []): string[] {
  return searchRituals(sourceBackedRituals, { query, selectedChips }).map(
    (ritual) => ritual.id,
  );
}

describe("Ritual search", () => {
  it("returns reviewed direct-use records in the direct-selection search flow", () => {
    expect(resultIds("")).toHaveLength(225);
    expect(sourceBackedRituals).toHaveLength(225);
    expect(sourceBackedRituals.every((ritual) => ritual.availability.findable)).toBe(
      true,
    );
    expect(
      sourceBackedRituals.filter((ritual) => ritual.availability.directUseEligible),
    ).toHaveLength(225);
  });

  it("surfaces searchable direct-use Rituals even when they are not recommendation eligible", () => {
    const searchOnlyRitual = {
      ...sourceBackedRituals[0],
      id: "ritual.search_only_direct_use_fixture",
      status: "reviewed",
      presentation: {
        ...sourceBackedRituals[0].presentation,
        headline: "Search Only Direct Use Fixture",
      },
      searchMetadata: {
        ...sourceBackedRituals[0].searchMetadata,
        tags: ["search-only-direct-use-fixture"],
        keywords: ["search-only-direct-use-fixture"],
      },
      availability: {
        findable: true,
        directUseEligible: true,
        recommendationEligible: false,
      },
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
        eligibility: {
          recommendable: false,
          missing: ["recommendation_review"],
        },
      },
    } satisfies Ritual;

    expect(
      searchRituals([searchOnlyRitual], {
        query: "search-only-direct-use-fixture",
      }).map((ritual) => ritual.id),
    ).toEqual(["ritual.search_only_direct_use_fixture"]);
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

  it("filters by canonical source labels", () => {
    const sourceOptions = getRitualSourceOptions(sourceBackedRituals);

    expect(sourceOptions).toHaveLength(10);
    expect(sourceOptions.map((option) => option.label)).toEqual(
      expect.arrayContaining([
        "Raymond Buckland, Practical Candleburning Rituals",
        "Arin Murphy-Hiscock, The House Witch: Your Complete Guide to Creating a Magical Space with Rituals and Spells for Hearth and Home",
        "Sophie Saint Thomas, Sex Witch: Magickal Spells for Love, Lust, and Self-Protection",
      ]),
    );
    expect(sourceOptions.map((option) => option.label)).not.toEqual(
      expect.arrayContaining(["The House Witch", "Whitehurst flower magic"]),
    );
    expect(
      searchRituals(sourceBackedRituals, {
        source: "raymond_buckland_practical_candleburning_rituals",
      }),
    ).toHaveLength(13);
  });

  it("supports expanded search sort options", () => {
    expect(
      searchRituals(sourceBackedRituals, { sort: "source" })[0].searchMetadata
        .sourceLabel,
    ).toBe("The Green Witch's Garden");
    expect(
      searchRituals(sourceBackedRituals, { sort: "capacity" })[0]
        .recommendationMetadata.capacity.default,
    ).toBe("enough_to_participate");
    expect(
      searchRituals(sourceBackedRituals, { sort: "recently_added" })[0].id,
    ).toBe(sourceBackedRituals[sourceBackedRituals.length - 1].id);
  });

  it("filters direct-use rituals by actual timing evidence for a current window", () => {
    const window = getNewMoonWindow();
    const results = searchRituals(sourceBackedRituals, {
      timingFilter: "current",
      timingWindow: window,
    });
    const ids = results.map((ritual) => ritual.id);

    expect(results).toHaveLength(11);
    expect(ids).toEqual(
      expect.arrayContaining([
        "candidate.moon_book.lunation_map_one_desire",
        "candidate.moon_book.new_moon_table_seed",
        "candidate.moon_book.dark_moon_void_table",
        "candidate.moon_book.cycle_close_and_begin_again",
        "candidate.saint_thomas.bedroom_leaf_blessing",
      ]),
    );
    expect(ids).not.toEqual(
      expect.arrayContaining([
        "ritual-house-witch-cauldron-blessing",
        "ritual-house-witch-bless-kitchen-tool",
        "candidate.saint_thomas.long_distance_calendar_light",
      ]),
    );
    expect(
      results.every(
        (ritual) => ritual.recommendationMetadata.timing.relationship !== "none",
      ),
    ).toBe(true);
    expect(
      results.every((ritual) =>
        Boolean(getRitualTimingSearchMatch(ritual, window)),
      ),
    ).toBe(true);
  });

  it("supports named timing filters without falling back to broad text search", () => {
    const newMoonResults = searchRituals(sourceBackedRituals, {
      timingFilter: "new_moon",
    });
    const fullMoonResults = searchRituals(sourceBackedRituals, {
      timingFilter: "full_moon",
    });
    const waxingResults = searchRituals(sourceBackedRituals, {
      timingFilter: "waxing_moon",
    });
    const waningResults = searchRituals(sourceBackedRituals, {
      timingFilter: "waning_moon",
    });
    const monthResults = searchRituals(sourceBackedRituals, {
      timingFilter: "beginning_of_month",
    });

    expect(ritualTimingPresetOptions.map((option) => option.label)).toEqual([
      "New Moon",
      "Full Moon",
      "Waxing Moon",
      "Waning Moon",
      "Spring Equinox",
      "Fall Equinox",
      "Winter Solstice",
      "Summer Solstice",
      "Beginning of month",
      "End of year",
      "Beginning of year",
    ]);
    expect(newMoonResults).toHaveLength(11);
    expect(fullMoonResults).toHaveLength(7);
    expect(waxingResults).toHaveLength(4);
    expect(waningResults).toHaveLength(7);
    expect(monthResults.map((ritual) => ritual.id)).toEqual([
      "candidate.dominguez.astrology-journal-timing-record",
      "candidate.dominguez.conditions-as-outline",
    ]);
    expect(waxingResults.map((ritual) => ritual.id)).not.toEqual(
      expect.arrayContaining(["candidate.saint_thomas.long_distance_calendar_light"]),
    );
    expect(monthResults.map((ritual) => ritual.id)).not.toEqual(
      expect.arrayContaining(["ritual-magical-household-door-guardian-object"]),
    );
  });

  it("uses broad seasonal timing presets only against timing metadata", () => {
    const springTarget = getRitualTimingSearchTarget("spring_equinox");
    const springResults = searchRituals(sourceBackedRituals, {
      timingFilter: "spring_equinox",
    });

    expect(springResults).toHaveLength(10);
    expect(springResults.map((ritual) => ritual.id)).toEqual(
      expect.arrayContaining([
        "candidate.moon_book.seed_pot_intention",
        "whitehurst-narcissus-morning-vase",
        "ritual-woodward-repeated-recipe-memory",
      ]),
    );
    expect(
      springResults.every((ritual) =>
        Boolean(getRitualTimingSearchMatch(ritual, springTarget)),
      ),
    ).toBe(true);
  });

  it("sorts timing-window search matches by timing relationship strength", () => {
    const window = getNewMoonWindow();
    const relationships = searchRituals(sourceBackedRituals, {
      timingFilter: "current",
      timingWindow: window,
      sort: "match",
    }).map((ritual) => ritual.recommendationMetadata.timing.relationship);
    const ranks = relationships.map((relationship) => {
      if (relationship === "required") return 3;
      if (relationship === "preferred") return 2;
      if (relationship === "helpful") return 1;
      return 0;
    });

    expect(relationships).toEqual(
      expect.arrayContaining(["required", "preferred", "helpful"]),
    );
    expect(ranks).toEqual([...ranks].sort((a, b) => b - a));
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
