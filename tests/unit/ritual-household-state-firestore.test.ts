import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  loadHouseholdRitualState,
  saveRecommendationInstance,
  saveRitualFavorite,
  saveRitualInteractionEvent,
} from "../../src/data/rituals/household-state-firestore";
import {
  createRecommendationEventStore,
  createRitualFavoriteStore,
} from "../../src/data/rituals/household-state";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

vi.mock("firebase/firestore", () => ({
  collection: vi.fn((db: unknown, ...path: string[]) => ({ db, path })),
  doc: vi.fn((db: unknown, ...path: string[]) => ({ db, path })),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
}));

type MockSnapshotInput = [string, Record<string, unknown>];

const baseRitual = sourceBackedRituals[0];

function querySnapshot(docs: MockSnapshotInput[]) {
  return {
    docs: docs.map(([id, data]) => ({
      id,
      data: () => data,
    })),
  };
}

function createRecommendationInstance() {
  return createRecommendationEventStore().createRecommendationInstance({
    id: "recommendation_fixture",
    createdAt: "2026-01-01T00:00:00.000Z",
    selectedRitual: baseRitual,
    checkInSnapshot: {
      purpose: "steadying",
      carrier: "words",
    },
    selectorSnapshot: {
      selectorVersion: "choose-with-me-static-v1",
      selectedScore: 42,
      topCandidates: [{ ritual: baseRitual, score: 42 }],
    },
  });
}

describe("Firestore household Ritual state adapter", () => {
  beforeEach(() => {
    vi.mocked(collection).mockClear();
    vi.mocked(doc).mockClear();
    vi.mocked(getDocs).mockReset();
    vi.mocked(setDoc).mockReset();
  });

  it("loads active and inactive household favorites through the household path", async () => {
    vi.mocked(getDocs)
      .mockResolvedValueOnce(
        querySnapshot([
          [
            baseRitual.id,
            {
              householdId: "household-a",
              ritualId: baseRitual.id,
              favoritedVersionId: "version-a",
              active: true,
              createdAt: "2026-01-01T00:00:00.000Z",
              sourceSurface: "search",
              ritualSnapshot: {
                headline: "Findable Ritual",
                primaryPurpose: "steadying",
                primaryCarrier: "words",
              },
            },
          ],
          [
            "inactive-ritual",
            {
              householdId: "household-a",
              ritualId: "inactive-ritual",
              active: false,
              createdAt: "2026-01-02T00:00:00.000Z",
              sourceSurface: "choose_with_me",
            },
          ],
          [
            "malformed",
            {
              householdId: "household-a",
              ritualId: "different-id",
              active: true,
              createdAt: "2026-01-03T00:00:00.000Z",
            },
          ],
        ]) as never,
      )
      .mockResolvedValueOnce(querySnapshot([]) as never)
      .mockResolvedValueOnce(querySnapshot([]) as never);
    const db = { app: "test" };

    const state = await loadHouseholdRitualState(db as never, "household-a");

    expect(collection).toHaveBeenCalledWith(
      db,
      "households",
      "household-a",
      "ritualFavorites",
    );
    expect(state.favorites.map((favorite) => favorite.ritualId)).toEqual([
      baseRitual.id,
      "inactive-ritual",
    ]);
    expect(createRitualFavoriteStore(state.favorites).isRitualFavorited(baseRitual.id))
      .toBe(true);
    expect(createRitualFavoriteStore(state.favorites).isRitualFavorited("inactive-ritual"))
      .toBe(false);
  });

  it("loads recommendation instances and interaction events without turning search selection into feedback", async () => {
    const instance = createRecommendationInstance();
    vi.mocked(getDocs)
      .mockResolvedValueOnce(querySnapshot([]) as never)
      .mockResolvedValueOnce(
        querySnapshot([[instance.id, { householdId: "household-a", ...instance }]]) as never,
      )
      .mockResolvedValueOnce(
        querySnapshot([
          [
            "event-search-selection",
            {
              householdId: "household-a",
              id: "event-search-selection",
              ritualId: baseRitual.id,
              eventType: "ritual_selected",
              surface: "search",
              createdAt: "2026-01-02T00:00:00.000Z",
            },
          ],
          [
            "event-feedback",
            {
              householdId: "household-a",
              id: "event-feedback",
              ritualId: baseRitual.id,
              eventType: "feedback_submitted",
              surface: "choose_with_me",
              recommendationInstanceId: instance.id,
              feedback: {
                fit: "fit",
                reasons: ["right_ritual"],
              },
              createdAt: "2026-01-03T00:00:00.000Z",
            },
          ],
        ]) as never,
      );

    const state = await loadHouseholdRitualState({ app: "test" } as never, "household-a");

    expect(state.recommendationInstances).toHaveLength(1);
    expect(state.interactionEvents[0]).toMatchObject({
      eventType: "ritual_selected",
      surface: "search",
    });
    expect(state.interactionEvents[0]?.feedback).toBeUndefined();
    expect(state.interactionEvents[1]).toMatchObject({
      eventType: "feedback_submitted",
      surface: "choose_with_me",
      feedback: {
        fit: "fit",
        reasons: ["right_ritual"],
      },
    });
  });

  it("persists favorites, recommendation instances, and events under household state", async () => {
    const favorite = createRitualFavoriteStore([], {
      now: () => "2026-01-01T00:00:00.000Z",
    }).addRitualFavorite({
      ritualId: baseRitual.id,
      ritual: baseRitual,
      sourceSurface: "search",
    });
    const instance = createRecommendationInstance();
    const event = createRecommendationEventStore([instance]).recordTryAnotherRequested({
      recommendationInstanceId: instance.id,
      ritualId: baseRitual.id,
      createdAt: "2026-01-02T00:00:00.000Z",
    });
    const db = { app: "test" };

    await saveRitualFavorite(db as never, "household-a", favorite);
    await saveRecommendationInstance(db as never, "household-a", instance);
    await saveRitualInteractionEvent(db as never, "household-a", event);

    expect(doc).toHaveBeenCalledWith(
      db,
      "households",
      "household-a",
      "ritualFavorites",
      baseRitual.id,
    );
    expect(doc).toHaveBeenCalledWith(
      db,
      "households",
      "household-a",
      "recommendationInstances",
      instance.id,
    );
    expect(doc).toHaveBeenCalledWith(
      db,
      "households",
      "household-a",
      "ritualInteractionEvents",
      event.id,
    );
    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining({
        path: ["households", "household-a", "ritualFavorites", baseRitual.id],
      }),
      expect.not.objectContaining({
        updatedAt: undefined,
      }),
    );
    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining({
        path: ["households", "household-a", "ritualFavorites", baseRitual.id],
      }),
      expect.objectContaining({
        householdId: "household-a",
        ritualId: baseRitual.id,
        active: true,
      }),
    );
    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining({
        path: ["households", "household-a", "ritualInteractionEvents", event.id],
      }),
      expect.objectContaining({
        eventType: "try_another_requested",
      }),
    );
    expect(setDoc).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        feedback: undefined,
      }),
    );
  });

  it("rejects private, source, and debug fields before writing household state", async () => {
    await expect(
      saveRitualFavorite({ app: "test" } as never, "household-a", {
        ritualId: baseRitual.id,
        active: true,
        createdAt: "2026-01-01T00:00:00.000Z",
        sourceSurface: "search",
        privateSourceText: "not allowed",
      } as never),
    ).rejects.toThrow(/private\/source\/debug/);

    expect(setDoc).not.toHaveBeenCalled();
  });
});
