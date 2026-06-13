import type { ChooseWithMeScoreBreakdown } from "./choose-with-me-selector";
import type { Ritual } from "./types";
import {
  getRitualPresentationSnapshot,
  getRitualRecommendationMetadataSnapshot,
  getRitualVersionIdentity,
  type RitualPresentationSnapshot,
  type RitualRecommendationMetadataSnapshot,
} from "./version-identity";

export const RITUAL_HOUSEHOLD_ACTORS = [
  "person_a",
  "person_b",
  "household",
] as const;

export type RitualHouseholdActor = (typeof RITUAL_HOUSEHOLD_ACTORS)[number];

export const RITUAL_FAVORITE_SOURCE_SURFACES = [
  "choose_with_me",
  "search",
  "ritual_detail",
] as const;

export type RitualFavoriteSourceSurface =
  (typeof RITUAL_FAVORITE_SOURCE_SURFACES)[number];

export type RitualFavoriteSnapshot = {
  headline: string;
  sourceLabel?: string;
  primaryPurpose: string;
  primaryCarrier: string;
};

export type RitualFavorite = {
  ritualId: string;
  favoritedVersionId?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: RitualHouseholdActor;
  sourceSurface: RitualFavoriteSourceSurface;
  ritualSnapshot?: RitualFavoriteSnapshot;
  note?: string;
};

export type RitualFavoriteInput = {
  ritualId: string;
  ritual?: Ritual;
  favoritedVersionId?: string;
  sourceSurface: RitualFavoriteSourceSurface;
  createdBy?: RitualHouseholdActor;
  ritualSnapshot?: RitualFavoriteSnapshot;
  note?: string;
};

export type RitualFavoriteStore = {
  listRitualFavorites(): RitualFavorite[];
  isRitualFavorited(ritualId: string): boolean;
  addRitualFavorite(input: RitualFavoriteInput): RitualFavorite;
  removeRitualFavorite(ritualId: string): RitualFavorite | undefined;
  toggleRitualFavorite(input: RitualFavoriteInput): RitualFavorite;
};

export const RITUAL_FEEDBACK_REASONS = [
  "right_ritual",
  "more_like_this",
  "wrong_purpose",
  "wrong_carrier",
  "wrong_timing",
  "too_much",
  "too_small",
  "wrong_audience",
  "too_generic",
  "not_magical_enough",
  "wording_felt_off",
  "too_context_specific",
  "wanted_more_body_or_bedroom",
  "wanted_less_body_or_bedroom",
  "not_tonight",
  "never_recommend_this",
] as const;

export type RitualFeedbackReason = (typeof RITUAL_FEEDBACK_REASONS)[number];

export const RITUAL_FEEDBACK_FITS = ["fit", "mixed", "not_fit"] as const;

export type RitualFeedbackFit = (typeof RITUAL_FEEDBACK_FITS)[number];

export type RitualFeedback = {
  fit: RitualFeedbackFit;
  reasons: RitualFeedbackReason[];
  note?: string;
};

export type RecommendationCheckInSnapshot = {
  timeScope?: string;
  capacityMode?: string;
  energyCapacity?: string;
  audience?: string;
  purpose?: string | null;
  carrier?: string | null;
  refinement?: string | null;
  freeTextIntent?: string | null;
};

export type RecommendationCandidateSnapshot = {
  ritualId: string;
  versionId?: string;
  score?: number;
  breakdown?: Partial<ChooseWithMeScoreBreakdown> | Record<string, number>;
};

export type RecommendationRitualSnapshot = {
  headline: string;
  sourceLabel?: string;
  primaryPurpose: string;
  primaryCarrier: string;
  status: string;
  recommendationEligible: boolean;
  presentationSnapshot?: RitualPresentationSnapshot;
  recommendationMetadataSnapshot?: RitualRecommendationMetadataSnapshot;
};

export type RecommendationInstance = {
  id: string;
  createdAt: string;
  selectedRitualId: string;
  selectedVersionId?: string;
  surface: "choose_with_me";
  checkInSnapshot: RecommendationCheckInSnapshot;
  selectorSnapshot: {
    selectorVersion?: string;
    selectedScore?: number;
    selectedBreakdown?: Partial<ChooseWithMeScoreBreakdown> | Record<string, number>;
    matchedTiming?: string[];
    topCandidates: RecommendationCandidateSnapshot[];
    exclusionSummary?: Record<string, number>;
  };
  ritualSnapshot: RecommendationRitualSnapshot;
};

export const RITUAL_INTERACTION_EVENT_TYPES = [
  "recommendation_shown",
  "ritual_selected",
  "favorite_added",
  "favorite_removed",
  "feedback_submitted",
  "try_another_requested",
] as const;

export type RitualInteractionEventType =
  (typeof RITUAL_INTERACTION_EVENT_TYPES)[number];

export const RITUAL_INTERACTION_SURFACES = [
  "choose_with_me",
  "search",
  "manage",
  "ritual_detail",
] as const;

export type RitualInteractionSurface =
  (typeof RITUAL_INTERACTION_SURFACES)[number];

export type RitualInteractionEvent = {
  id: string;
  ritualId: string;
  eventType: RitualInteractionEventType;
  surface: RitualInteractionSurface;
  createdAt: string;
  actor?: RitualHouseholdActor;
  recommendationInstanceId?: string;
  feedback?: RitualFeedback;
};

export type RecommendationCandidateInput = {
  ritual: Ritual;
  score?: number;
  breakdown?: Partial<ChooseWithMeScoreBreakdown> | Record<string, number>;
};

export type RecommendationInstanceInput = {
  id?: string;
  createdAt?: string;
  selectedRitual: Ritual;
  checkInSnapshot: RecommendationCheckInSnapshot;
  selectorSnapshot: {
    selectorVersion?: string;
    selectedScore?: number;
    selectedBreakdown?: Partial<ChooseWithMeScoreBreakdown> | Record<string, number>;
    matchedTiming?: string[];
    topCandidates: RecommendationCandidateInput[];
    exclusionSummary?: Record<string, number>;
  };
};

export type RecommendationEventStore = {
  createRecommendationInstance(input: RecommendationInstanceInput): RecommendationInstance;
  recordRecommendationShown(instance: RecommendationInstance): RitualInteractionEvent;
  recordRitualFeedback(input: {
    recommendationInstanceId: string;
    ritualId: string;
    feedback: RitualFeedback;
    actor?: RitualHouseholdActor;
    createdAt?: string;
  }): RitualInteractionEvent;
  recordTryAnotherRequested(input: {
    recommendationInstanceId: string;
    ritualId: string;
    actor?: RitualHouseholdActor;
    createdAt?: string;
  }): RitualInteractionEvent;
  listRecommendationInstances(): RecommendationInstance[];
  listRitualInteractionEvents(): RitualInteractionEvent[];
};

type StoreOptions = {
  now?: () => string;
};

function defaultNow(): string {
  return new Date().toISOString();
}

function cloneFavorite(favorite: RitualFavorite): RitualFavorite {
  return {
    ...favorite,
    ritualSnapshot: favorite.ritualSnapshot
      ? { ...favorite.ritualSnapshot }
      : undefined,
  };
}

function normalizeNote(note: string | undefined): string | undefined {
  const trimmed = note?.trim();

  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

function getFavoriteSnapshot(ritual: Ritual): RitualFavoriteSnapshot {
  return {
    headline: ritual.presentation.headline,
    sourceLabel: ritual.searchMetadata.sourceLabel,
    primaryPurpose: ritual.recommendationMetadata.purposes.primary,
    primaryCarrier: ritual.recommendationMetadata.carriers.primary,
  };
}

function resolveFavoriteVersionId(input: RitualFavoriteInput): string | undefined {
  return input.favoritedVersionId ??
    (input.ritual ? getRitualVersionIdentity(input.ritual).versionId : undefined);
}

function resolveFavoriteSnapshot(
  input: RitualFavoriteInput,
): RitualFavoriteSnapshot | undefined {
  return input.ritualSnapshot ??
    (input.ritual ? getFavoriteSnapshot(input.ritual) : undefined);
}

export function createRitualFavoriteStore(
  initialFavorites: readonly RitualFavorite[] = [],
  options: StoreOptions = {},
): RitualFavoriteStore {
  const now = options.now ?? defaultNow;
  const favoritesById = new Map(
    initialFavorites.map((favorite) => [favorite.ritualId, cloneFavorite(favorite)]),
  );

  function listRitualFavorites(): RitualFavorite[] {
    return [...favoritesById.values()].map(cloneFavorite);
  }

  function isRitualFavorited(ritualId: string): boolean {
    return favoritesById.get(ritualId)?.active === true;
  }

  function addRitualFavorite(input: RitualFavoriteInput): RitualFavorite {
    const existing = favoritesById.get(input.ritualId);
    const note = normalizeNote(input.note);

    if (existing?.active) {
      return cloneFavorite(existing);
    }

    const favorite: RitualFavorite = {
      ritualId: input.ritualId,
      favoritedVersionId: resolveFavoriteVersionId(input),
      active: true,
      createdAt: existing?.createdAt ?? now(),
      updatedAt: existing ? now() : undefined,
      createdBy: input.createdBy ?? existing?.createdBy,
      sourceSurface: input.sourceSurface,
      ritualSnapshot: resolveFavoriteSnapshot(input),
      note: note ?? existing?.note,
    };

    favoritesById.set(input.ritualId, favorite);

    return cloneFavorite(favorite);
  }

  function removeRitualFavorite(ritualId: string): RitualFavorite | undefined {
    const existing = favoritesById.get(ritualId);

    if (!existing) {
      return undefined;
    }

    const removed: RitualFavorite = {
      ...existing,
      active: false,
      updatedAt: now(),
    };

    favoritesById.set(ritualId, removed);

    return cloneFavorite(removed);
  }

  function toggleRitualFavorite(input: RitualFavoriteInput): RitualFavorite {
    if (isRitualFavorited(input.ritualId)) {
      return removeRitualFavorite(input.ritualId) as RitualFavorite;
    }

    return addRitualFavorite(input);
  }

  return {
    listRitualFavorites,
    isRitualFavorited,
    addRitualFavorite,
    removeRitualFavorite,
    toggleRitualFavorite,
  };
}

function cloneFeedback(feedback: RitualFeedback): RitualFeedback {
  return {
    ...feedback,
    reasons: [...feedback.reasons],
  };
}

function cloneEvent(event: RitualInteractionEvent): RitualInteractionEvent {
  return {
    ...event,
    feedback: event.feedback ? cloneFeedback(event.feedback) : undefined,
  };
}

function cloneRecommendationInstance(
  instance: RecommendationInstance,
): RecommendationInstance {
  return {
    ...instance,
    checkInSnapshot: { ...instance.checkInSnapshot },
    selectorSnapshot: {
      ...instance.selectorSnapshot,
      selectedBreakdown: instance.selectorSnapshot.selectedBreakdown
        ? { ...instance.selectorSnapshot.selectedBreakdown }
        : undefined,
      matchedTiming: instance.selectorSnapshot.matchedTiming
        ? [...instance.selectorSnapshot.matchedTiming]
        : undefined,
      topCandidates: instance.selectorSnapshot.topCandidates.map((candidate) => ({
        ...candidate,
        breakdown: candidate.breakdown ? { ...candidate.breakdown } : undefined,
      })),
      exclusionSummary: instance.selectorSnapshot.exclusionSummary
        ? { ...instance.selectorSnapshot.exclusionSummary }
        : undefined,
    },
    ritualSnapshot: {
      ...instance.ritualSnapshot,
      presentationSnapshot: instance.ritualSnapshot.presentationSnapshot
        ? clonePresentationSnapshot(instance.ritualSnapshot.presentationSnapshot)
        : undefined,
      recommendationMetadataSnapshot:
        instance.ritualSnapshot.recommendationMetadataSnapshot
          ? cloneRecommendationMetadataSnapshot(
              instance.ritualSnapshot.recommendationMetadataSnapshot,
            )
          : undefined,
    },
  };
}

function clonePresentationSnapshot(
  snapshot: RitualPresentationSnapshot,
): RitualPresentationSnapshot {
  return { ...snapshot };
}

function cloneRecommendationMetadataSnapshot(
  snapshot: RitualRecommendationMetadataSnapshot,
): RitualRecommendationMetadataSnapshot {
  return {
    purposes: {
      primary: snapshot.purposes.primary,
      secondary: [...snapshot.purposes.secondary],
      refinement: snapshot.purposes.refinement,
    },
    carriers: {
      primary: snapshot.carriers.primary,
      secondary: [...snapshot.carriers.secondary],
    },
    capacity: {
      supports: [...snapshot.capacity.supports],
      default: snapshot.capacity.default,
    },
    audience: {
      supports: [...snapshot.audience.supports],
      default: snapshot.audience.default,
      bothOfUsStructure: snapshot.audience.bothOfUsStructure,
    },
    timing: {
      relationship: snapshot.timing.relationship,
      contexts: snapshot.timing.contexts ? [...snapshot.timing.contexts] : undefined,
    },
    eligibility: {
      recommendable: snapshot.eligibility.recommendable,
      missing: snapshot.eligibility.missing
        ? [...snapshot.eligibility.missing]
        : undefined,
      notFor: snapshot.eligibility.notFor
        ? [...snapshot.eligibility.notFor]
        : undefined,
    },
  };
}

function normalizeIdPart(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function createRecommendationInstanceId(
  ritualId: string,
  createdAt: string,
): string {
  return `recommendation_${normalizeIdPart(ritualId)}_${normalizeIdPart(createdAt)}`;
}

function createEventId(
  eventType: RitualInteractionEventType,
  ritualId: string,
  createdAt: string,
  recommendationInstanceId?: string,
): string {
  return [
    "ritual_event",
    eventType,
    normalizeIdPart(recommendationInstanceId ?? ritualId),
    normalizeIdPart(createdAt),
  ].join("_");
}

function getSelectedInstanceForEvent(
  instances: RecommendationInstance[],
  recommendationInstanceId: string,
  ritualId: string,
): RecommendationInstance {
  const instance = instances.find((candidate) => candidate.id === recommendationInstanceId);

  if (!instance) {
    throw new Error(
      `Cannot record Ritual interaction without known recommendation instance: ${recommendationInstanceId}`,
    );
  }

  if (instance.selectedRitualId !== ritualId) {
    throw new Error(
      `Feedback and interaction events must target selected Ritual ${instance.selectedRitualId}, not ${ritualId}`,
    );
  }

  return instance;
}

function createRecommendationRitualSnapshot(
  ritual: Ritual,
): RecommendationRitualSnapshot {
  return {
    headline: ritual.presentation.headline,
    sourceLabel: ritual.searchMetadata.sourceLabel,
    primaryPurpose: ritual.recommendationMetadata.purposes.primary,
    primaryCarrier: ritual.recommendationMetadata.carriers.primary,
    status: ritual.status,
    recommendationEligible: ritual.availability.recommendationEligible,
    presentationSnapshot: getRitualPresentationSnapshot(ritual),
    recommendationMetadataSnapshot:
      getRitualRecommendationMetadataSnapshot(ritual),
  };
}

export function createRecommendationInstance(
  input: RecommendationInstanceInput,
): RecommendationInstance {
  const createdAt = input.createdAt ?? defaultNow();
  const selectedVersion = getRitualVersionIdentity(input.selectedRitual);

  return {
    id: input.id ?? createRecommendationInstanceId(input.selectedRitual.id, createdAt),
    createdAt,
    selectedRitualId: input.selectedRitual.id,
    selectedVersionId: selectedVersion.versionId,
    surface: "choose_with_me",
    checkInSnapshot: { ...input.checkInSnapshot },
    selectorSnapshot: {
      selectorVersion: input.selectorSnapshot.selectorVersion,
      selectedScore: input.selectorSnapshot.selectedScore,
      selectedBreakdown: input.selectorSnapshot.selectedBreakdown
        ? { ...input.selectorSnapshot.selectedBreakdown }
        : undefined,
      matchedTiming: input.selectorSnapshot.matchedTiming
        ? [...input.selectorSnapshot.matchedTiming]
        : undefined,
      topCandidates: input.selectorSnapshot.topCandidates
        .slice(0, 3)
        .map((candidate) => ({
          ritualId: candidate.ritual.id,
          versionId: getRitualVersionIdentity(candidate.ritual).versionId,
          score: candidate.score,
          breakdown: candidate.breakdown ? { ...candidate.breakdown } : undefined,
        })),
      exclusionSummary: input.selectorSnapshot.exclusionSummary
        ? { ...input.selectorSnapshot.exclusionSummary }
        : undefined,
    },
    ritualSnapshot: createRecommendationRitualSnapshot(input.selectedRitual),
  };
}

export function createRecommendationEventStore(
  initialInstances: readonly RecommendationInstance[] = [],
  initialEvents: readonly RitualInteractionEvent[] = [],
  options: StoreOptions = {},
): RecommendationEventStore {
  const now = options.now ?? defaultNow;
  const instances = initialInstances.map(cloneRecommendationInstance);
  const events = initialEvents.map(cloneEvent);

  return {
    createRecommendationInstance(input: RecommendationInstanceInput) {
      const instance = createRecommendationInstance(input);
      instances.push(cloneRecommendationInstance(instance));

      return cloneRecommendationInstance(instance);
    },
    recordRecommendationShown(instance: RecommendationInstance) {
      const existing = events.find(
        (event) =>
          event.eventType === "recommendation_shown" &&
          event.recommendationInstanceId === instance.id,
      );

      if (existing) {
        return cloneEvent(existing);
      }

      const event: RitualInteractionEvent = {
        id: createEventId(
          "recommendation_shown",
          instance.selectedRitualId,
          instance.createdAt,
          instance.id,
        ),
        ritualId: instance.selectedRitualId,
        eventType: "recommendation_shown",
        surface: "choose_with_me",
        createdAt: instance.createdAt,
        recommendationInstanceId: instance.id,
      };

      events.push(event);

      return cloneEvent(event);
    },
    recordRitualFeedback(input) {
      getSelectedInstanceForEvent(
        instances,
        input.recommendationInstanceId,
        input.ritualId,
      );

      const createdAt = input.createdAt ?? now();
      const event: RitualInteractionEvent = {
        id: createEventId(
          "feedback_submitted",
          input.ritualId,
          createdAt,
          input.recommendationInstanceId,
        ),
        ritualId: input.ritualId,
        eventType: "feedback_submitted",
        surface: "choose_with_me",
        createdAt,
        actor: input.actor,
        recommendationInstanceId: input.recommendationInstanceId,
        feedback: cloneFeedback(input.feedback),
      };

      events.push(event);

      return cloneEvent(event);
    },
    recordTryAnotherRequested(input) {
      getSelectedInstanceForEvent(
        instances,
        input.recommendationInstanceId,
        input.ritualId,
      );

      const createdAt = input.createdAt ?? now();
      const event: RitualInteractionEvent = {
        id: createEventId(
          "try_another_requested",
          input.ritualId,
          createdAt,
          input.recommendationInstanceId,
        ),
        ritualId: input.ritualId,
        eventType: "try_another_requested",
        surface: "choose_with_me",
        createdAt,
        actor: input.actor,
        recommendationInstanceId: input.recommendationInstanceId,
      };

      events.push(event);

      return cloneEvent(event);
    },
    listRecommendationInstances() {
      return instances.map(cloneRecommendationInstance);
    },
    listRitualInteractionEvents() {
      return events.map(cloneEvent);
    },
  };
}
