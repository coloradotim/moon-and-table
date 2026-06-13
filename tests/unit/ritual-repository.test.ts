import { describe, expect, it } from "vitest";

import {
  createStaticRitualRepository,
  isFindableDirectUseRitual,
  isRecommendationEligibleRitualForChooseWithMe,
} from "../../src/data/rituals/ritual-repository";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";

function createFixtureRitual(overrides: Partial<Ritual> = {}): Ritual {
  return {
    ...sourceBackedRituals[0],
    id: "ritual.repository.fixture",
    presentation: {
      ...sourceBackedRituals[0].presentation,
      headline: "Repository Fixture",
    },
    ...overrides,
  };
}

describe("static Ritual repository", () => {
  it("returns all static Rituals for Manage Rituals", () => {
    const repository = createStaticRitualRepository();

    expect(repository.getAllRitualsForManager()).toHaveLength(
      sourceBackedRituals.length,
    );
    expect(repository.getAllRitualsForManager().map((ritual) => ritual.id)).toEqual(
      sourceBackedRituals.map((ritual) => ritual.id),
    );
  });

  it("returns findable direct-use Rituals for Search without requiring recommendation eligibility", () => {
    const searchOnly = createFixtureRitual({
      id: "ritual.search-only.repository-fixture",
      status: "reviewed",
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
    });
    const notFindable = createFixtureRitual({
      id: "ritual.not-findable.repository-fixture",
      availability: {
        findable: false,
        directUseEligible: true,
        recommendationEligible: true,
      },
    });
    const notDirectUse = createFixtureRitual({
      id: "ritual.not-direct-use.repository-fixture",
      availability: {
        findable: true,
        directUseEligible: false,
        recommendationEligible: true,
      },
    });
    const repository = createStaticRitualRepository([
      searchOnly,
      notFindable,
      notDirectUse,
    ]);

    expect(repository.getFindableDirectUseRitualsForSearch()).toEqual([
      searchOnly,
    ]);
    expect(isFindableDirectUseRitual(searchOnly)).toBe(true);
  });

  it("returns only recommendation-ready Rituals for Choose with me", () => {
    const recommendable = createFixtureRitual({
      id: "ritual.recommendable.repository-fixture",
      status: "recommendable",
      availability: {
        findable: true,
        directUseEligible: true,
        recommendationEligible: true,
      },
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
        eligibility: { recommendable: true },
      },
    });
    const searchOnly = createFixtureRitual({
      id: "ritual.choose-search-only.repository-fixture",
      status: "reviewed",
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
    });
    const metadataHeld = createFixtureRitual({
      id: "ritual.metadata-held.repository-fixture",
      status: "recommendable",
      availability: {
        findable: true,
        directUseEligible: true,
        recommendationEligible: true,
      },
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
        eligibility: {
          recommendable: false,
          missing: ["recommendation_review"],
        },
      },
    });
    const draft = createFixtureRitual({
      id: "ritual.draft.repository-fixture",
      status: "draft",
      availability: {
        findable: true,
        directUseEligible: true,
        recommendationEligible: true,
      },
      recommendationMetadata: {
        ...sourceBackedRituals[0].recommendationMetadata,
        eligibility: { recommendable: true },
      },
    });
    const repository = createStaticRitualRepository([
      recommendable,
      searchOnly,
      metadataHeld,
      draft,
    ]);

    expect(repository.getRecommendationEligibleRitualsForChooseWithMe()).toEqual([
      recommendable,
    ]);
    expect(isRecommendationEligibleRitualForChooseWithMe(recommendable)).toBe(
      true,
    );
  });

  it("can find a Ritual by id from the static fallback", () => {
    const repository = createStaticRitualRepository();
    const ritual = sourceBackedRituals[0];

    expect(repository.getRitualById(ritual.id)).toBe(ritual);
    expect(repository.getRitualById("missing.ritual")).toBeUndefined();
  });
});
