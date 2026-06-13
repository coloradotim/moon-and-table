import { describe, expect, it } from "vitest";

import {
  createRecommendationEventStore,
  createRecommendationInstance,
  createRitualFavoriteStore,
  type RitualFeedback,
} from "../../src/data/rituals/household-state";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";
import { getRitualVersionIdentity } from "../../src/data/rituals/version-identity";

const baseRitual = sourceBackedRituals[0];
const secondRitual = sourceBackedRituals[1];
const thirdRitual = sourceBackedRituals[2];
const fourthRitual = sourceBackedRituals[3];

function createClock(values: string[]): () => string {
  let index = 0;

  return () => {
    const value = values[index] ?? values[values.length - 1];
    index += 1;
    return value;
  };
}

function createChangedRitual(): Ritual {
  return {
    ...baseRitual,
    presentation: {
      ...baseRitual.presentation,
      headline: `${baseRitual.presentation.headline} changed`,
    },
  };
}

describe("Ritual favorites household state", () => {
  it("adds a favorite with version identity and a small Ritual snapshot", () => {
    const store = createRitualFavoriteStore([], {
      now: () => "2026-01-01T00:00:00.000Z",
    });
    const favorite = store.addRitualFavorite({
      ritualId: baseRitual.id,
      ritual: baseRitual,
      sourceSurface: "search",
      createdBy: "person_a",
      note: "  return to this  ",
    });

    expect(favorite).toEqual({
      ritualId: baseRitual.id,
      favoritedVersionId: getRitualVersionIdentity(baseRitual).versionId,
      active: true,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: undefined,
      createdBy: "person_a",
      sourceSurface: "search",
      ritualSnapshot: {
        headline: baseRitual.presentation.headline,
        sourceLabel: baseRitual.searchMetadata.sourceLabel,
        primaryPurpose: baseRitual.recommendationMetadata.purposes.primary,
        primaryCarrier: baseRitual.recommendationMetadata.carriers.primary,
      },
      note: "return to this",
    });
    expect(store.isRitualFavorited(baseRitual.id)).toBe(true);
  });

  it("deactivates, reactivates, and keeps add idempotent for active favorites", () => {
    const store = createRitualFavoriteStore([], {
      now: createClock([
        "2026-01-01T00:00:00.000Z",
        "2026-01-02T00:00:00.000Z",
        "2026-01-03T00:00:00.000Z",
        "2026-01-04T00:00:00.000Z",
      ]),
    });

    const added = store.addRitualFavorite({
      ritualId: baseRitual.id,
      ritual: baseRitual,
      sourceSurface: "choose_with_me",
    });
    const removed = store.removeRitualFavorite(baseRitual.id);
    const reactivated = store.addRitualFavorite({
      ritualId: baseRitual.id,
      ritual: createChangedRitual(),
      sourceSurface: "ritual_detail",
      note: "changed note",
    });
    const idempotent = store.addRitualFavorite({
      ritualId: baseRitual.id,
      ritual: createChangedRitual(),
      sourceSurface: "search",
      note: "should not overwrite active favorite",
    });

    expect(added.createdAt).toBe("2026-01-01T00:00:00.000Z");
    expect(removed).toMatchObject({
      active: false,
      updatedAt: "2026-01-02T00:00:00.000Z",
    });
    expect(reactivated).toMatchObject({
      active: true,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-03T00:00:00.000Z",
      sourceSurface: "ritual_detail",
      note: "changed note",
    });
    expect(idempotent).toEqual(reactivated);
    expect(store.isRitualFavorited(baseRitual.id)).toBe(true);
  });

  it("tracks active, inactive, and missing favorite lookup deterministically", () => {
    const store = createRitualFavoriteStore([
      {
        ritualId: "active",
        active: true,
        createdAt: "2026-01-01T00:00:00.000Z",
        sourceSurface: "search",
      },
      {
        ritualId: "inactive",
        active: false,
        createdAt: "2026-01-01T00:00:00.000Z",
        sourceSurface: "search",
      },
    ]);

    expect(store.isRitualFavorited("active")).toBe(true);
    expect(store.isRitualFavorited("inactive")).toBe(false);
    expect(store.isRitualFavorited("missing")).toBe(false);
  });

  it("toggles favorites and does not mutate canonical Ritual records", () => {
    const store = createRitualFavoriteStore([], {
      now: createClock([
        "2026-01-01T00:00:00.000Z",
        "2026-01-02T00:00:00.000Z",
      ]),
    });
    const original = JSON.stringify(baseRitual);

    expect(
      store.toggleRitualFavorite({
        ritualId: baseRitual.id,
        ritual: baseRitual,
        sourceSurface: "search",
      }).active,
    ).toBe(true);
    expect(
      store.toggleRitualFavorite({
        ritualId: baseRitual.id,
        ritual: baseRitual,
        sourceSurface: "search",
      }).active,
    ).toBe(false);
    expect(JSON.stringify(baseRitual)).toBe(original);
  });

  it("returns cloned favorites so callers cannot mutate stored state", () => {
    const store = createRitualFavoriteStore([], {
      now: () => "2026-01-01T00:00:00.000Z",
    });
    const favorite = store.addRitualFavorite({
      ritualId: baseRitual.id,
      ritual: baseRitual,
      sourceSurface: "search",
    });

    favorite.active = false;
    favorite.ritualSnapshot!.headline = "changed outside";

    expect(store.isRitualFavorited(baseRitual.id)).toBe(true);
    expect(store.listRitualFavorites()[0]).toMatchObject({
      active: true,
      ritualSnapshot: {
        headline: baseRitual.presentation.headline,
      },
    });
  });
});

describe("Choose with me recommendation instances and events", () => {
  it("creates a recommendation instance with selected version and top candidate version IDs", () => {
    const instance = createRecommendationInstance({
      id: "recommendation_fixture",
      createdAt: "2026-01-01T00:00:00.000Z",
      selectedRitual: baseRitual,
      checkInSnapshot: {
        timeScope: "tonight",
        capacityMode: "low",
        energyCapacity: "a_little",
        audience: "me",
        purpose: "steadying",
        carrier: "words",
        refinement: "the moment",
        freeTextIntent: "quiet",
      },
      selectorSnapshot: {
        selectorVersion: "choose-with-me-v1",
        selectedScore: 42,
        selectedBreakdown: { total: 42, purpose: 10 },
        matchedTiming: ["new_moon"],
        topCandidates: [
          { ritual: baseRitual, score: 42, breakdown: { total: 42 } },
          { ritual: secondRitual, score: 38 },
          { ritual: thirdRitual, score: 35 },
          { ritual: fourthRitual, score: 20 },
        ],
        exclusionSummary: { not_recommendation_eligible: 2 },
      },
    });

    expect(instance).toMatchObject({
      id: "recommendation_fixture",
      selectedRitualId: baseRitual.id,
      selectedVersionId: getRitualVersionIdentity(baseRitual).versionId,
      surface: "choose_with_me",
      checkInSnapshot: {
        purpose: "steadying",
        carrier: "words",
      },
      selectorSnapshot: {
        selectorVersion: "choose-with-me-v1",
        selectedScore: 42,
        topCandidates: [
          {
            ritualId: baseRitual.id,
            versionId: getRitualVersionIdentity(baseRitual).versionId,
            score: 42,
          },
          {
            ritualId: secondRitual.id,
            versionId: getRitualVersionIdentity(secondRitual).versionId,
            score: 38,
          },
          {
            ritualId: thirdRitual.id,
            versionId: getRitualVersionIdentity(thirdRitual).versionId,
            score: 35,
          },
        ],
      },
      ritualSnapshot: {
        headline: baseRitual.presentation.headline,
        sourceLabel: baseRitual.searchMetadata.sourceLabel,
        primaryPurpose: baseRitual.recommendationMetadata.purposes.primary,
        primaryCarrier: baseRitual.recommendationMetadata.carriers.primary,
        status: baseRitual.status,
        recommendationEligible: baseRitual.availability.recommendationEligible,
        presentationSnapshot: baseRitual.presentation,
        recommendationMetadataSnapshot: baseRitual.recommendationMetadata,
      },
    });
    expect(instance.selectorSnapshot.topCandidates).toHaveLength(3);
  });

  it("records one recommendation_shown event per recommendation instance", () => {
    const store = createRecommendationEventStore();
    const instance = store.createRecommendationInstance({
      id: "recommendation_fixture",
      createdAt: "2026-01-01T00:00:00.000Z",
      selectedRitual: baseRitual,
      checkInSnapshot: {},
      selectorSnapshot: {
        topCandidates: [{ ritual: baseRitual, score: 1 }],
      },
    });

    const first = store.recordRecommendationShown(instance);
    const second = store.recordRecommendationShown(instance);

    expect(first).toEqual(second);
    expect(store.listRitualInteractionEvents()).toEqual([first]);
    expect(first).toMatchObject({
      ritualId: baseRitual.id,
      eventType: "recommendation_shown",
      surface: "choose_with_me",
      recommendationInstanceId: "recommendation_fixture",
    });
  });

  it("records favorite and direct-selection interaction events without feedback", () => {
    const store = createRecommendationEventStore([], [], {
      now: createClock([
        "2026-01-02T00:00:00.000Z",
        "2026-01-03T00:00:00.000Z",
        "2026-01-04T00:00:00.000Z",
      ]),
    });
    store.createRecommendationInstance({
      id: "recommendation_fixture",
      createdAt: "2026-01-01T00:00:00.000Z",
      selectedRitual: baseRitual,
      checkInSnapshot: {},
      selectorSnapshot: {
        topCandidates: [
          { ritual: baseRitual, score: 10 },
          { ritual: secondRitual, score: 8 },
        ],
      },
    });

    const added = store.recordFavoriteAdded({
      recommendationInstanceId: "recommendation_fixture",
      ritualId: baseRitual.id,
      surface: "choose_with_me",
    });
    const removed = store.recordFavoriteRemoved({
      recommendationInstanceId: "recommendation_fixture",
      ritualId: baseRitual.id,
      surface: "choose_with_me",
    });
    const selected = store.recordRitualSelected({
      ritualId: secondRitual.id,
      surface: "search",
    });

    expect(added).toMatchObject({
      ritualId: baseRitual.id,
      eventType: "favorite_added",
      surface: "choose_with_me",
      createdAt: "2026-01-02T00:00:00.000Z",
      recommendationInstanceId: "recommendation_fixture",
    });
    expect(removed).toMatchObject({
      ritualId: baseRitual.id,
      eventType: "favorite_removed",
      surface: "choose_with_me",
      createdAt: "2026-01-03T00:00:00.000Z",
      recommendationInstanceId: "recommendation_fixture",
    });
    expect(selected).toMatchObject({
      ritualId: secondRitual.id,
      eventType: "ritual_selected",
      surface: "search",
      createdAt: "2026-01-04T00:00:00.000Z",
    });
    expect(added.feedback).toBeUndefined();
    expect(removed.feedback).toBeUndefined();
    expect(selected.feedback).toBeUndefined();
    expect(() =>
      store.recordFavoriteAdded({
        recommendationInstanceId: "recommendation_fixture",
        ritualId: secondRitual.id,
        surface: "choose_with_me",
      }),
    ).toThrow(/must target selected Ritual/);
  });

  it("records feedback against the selected recommendation instance only", () => {
    const store = createRecommendationEventStore([], [], {
      now: () => "2026-01-02T00:00:00.000Z",
    });
    store.createRecommendationInstance({
      id: "recommendation_fixture",
      createdAt: "2026-01-01T00:00:00.000Z",
      selectedRitual: baseRitual,
      checkInSnapshot: {},
      selectorSnapshot: {
        topCandidates: [
          { ritual: baseRitual, score: 10 },
          { ritual: secondRitual, score: 8 },
        ],
      },
    });
    const feedback: RitualFeedback = {
      fit: "not_fit",
      reasons: ["wrong_purpose", "never_recommend_this"],
      note: "Wrong lane tonight",
    };
    const event = store.recordRitualFeedback({
      recommendationInstanceId: "recommendation_fixture",
      ritualId: baseRitual.id,
      feedback,
      actor: "person_b",
    });

    feedback.reasons.push("wrong_carrier");

    expect(event).toMatchObject({
      ritualId: baseRitual.id,
      eventType: "feedback_submitted",
      surface: "choose_with_me",
      createdAt: "2026-01-02T00:00:00.000Z",
      actor: "person_b",
      recommendationInstanceId: "recommendation_fixture",
      feedback: {
        fit: "not_fit",
        reasons: ["wrong_purpose", "never_recommend_this"],
        note: "Wrong lane tonight",
      },
    });
    expect(store.listRitualInteractionEvents()[0].feedback?.reasons).toEqual([
      "wrong_purpose",
      "never_recommend_this",
    ]);
    expect(() =>
      store.recordRitualFeedback({
        recommendationInstanceId: "recommendation_fixture",
        ritualId: secondRitual.id,
        feedback: {
          fit: "mixed",
          reasons: ["wrong_carrier"],
        },
      }),
    ).toThrow(/must target selected Ritual/);
  });

  it("records try-another separately from negative feedback", () => {
    const store = createRecommendationEventStore([], [], {
      now: () => "2026-01-03T00:00:00.000Z",
    });
    store.createRecommendationInstance({
      id: "recommendation_fixture",
      createdAt: "2026-01-01T00:00:00.000Z",
      selectedRitual: baseRitual,
      checkInSnapshot: {},
      selectorSnapshot: {
        topCandidates: [{ ritual: baseRitual, score: 10 }],
      },
    });
    const event = store.recordTryAnotherRequested({
      recommendationInstanceId: "recommendation_fixture",
      ritualId: baseRitual.id,
      actor: "household",
    });

    expect(event).toEqual({
      id: "ritual_event_try_another_requested_recommendation_fixture_2026_01_03t00_00_00_000z",
      ritualId: baseRitual.id,
      eventType: "try_another_requested",
      surface: "choose_with_me",
      createdAt: "2026-01-03T00:00:00.000Z",
      actor: "household",
      recommendationInstanceId: "recommendation_fixture",
    });
    expect(event.feedback).toBeUndefined();
  });

  it("returns cloned instances and events so callers cannot mutate stored state", () => {
    const store = createRecommendationEventStore();
    const instance = store.createRecommendationInstance({
      id: "recommendation_fixture",
      createdAt: "2026-01-01T00:00:00.000Z",
      selectedRitual: baseRitual,
      checkInSnapshot: {},
      selectorSnapshot: {
        topCandidates: [{ ritual: baseRitual, score: 1 }],
      },
    });
    const event = store.recordRecommendationShown(instance);

    instance.selectorSnapshot.topCandidates[0].ritualId = "changed";
    event.ritualId = "changed";

    expect(store.listRecommendationInstances()[0].selectorSnapshot.topCandidates[0])
      .toMatchObject({
        ritualId: baseRitual.id,
      });
    expect(store.listRitualInteractionEvents()[0].ritualId).toBe(baseRitual.id);
  });
});
