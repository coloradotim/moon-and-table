import {
  collection,
  doc,
  getDocs,
  setDoc,
  type Firestore,
} from "firebase/firestore";

import {
  RITUAL_FAVORITE_SOURCE_SURFACES,
  RITUAL_FEEDBACK_FITS,
  RITUAL_FEEDBACK_REASONS,
  RITUAL_HOUSEHOLD_ACTORS,
  RITUAL_INTERACTION_EVENT_TYPES,
  RITUAL_INTERACTION_SURFACES,
  type RecommendationCandidateSnapshot,
  type RecommendationCheckInSnapshot,
  type RecommendationInstance,
  type RecommendationRitualSnapshot,
  type RitualFavorite,
  type RitualFavoriteSnapshot,
  type RitualFeedback,
  type RitualInteractionEvent,
} from "./household-state";

export type HouseholdRitualStateSnapshot = {
  favorites: RitualFavorite[];
  recommendationInstances: RecommendationInstance[];
  interactionEvents: RitualInteractionEvent[];
};

type FirestoreDocumentSnapshot = {
  id: string;
  data(): unknown;
};

const FORBIDDEN_HOUSEHOLD_STATE_KEYS = [
  "birthDate",
  "birthPlace",
  "birthTime",
  "copiedSourceText",
  "email",
  "extractedSourceText",
  "natalPlacements",
  "ocrText",
  "pageImage",
  "pageImages",
  "privateArtifactPath",
  "privateProfile",
  "privateSourceExcerpt",
  "privateSourceText",
  "rawDebugBlob",
  "rawSourceExcerpt",
  "rawSourceText",
  "realName",
  "schedule",
  "secret",
  "sourceExcerpt",
  "token",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasForbiddenHouseholdStateKey(value: Record<string, unknown>): boolean {
  return FORBIDDEN_HOUSEHOLD_STATE_KEYS.some((key) => key in value);
}

function assertHouseholdStateDocumentSafe(value: Record<string, unknown>): void {
  if (hasForbiddenHouseholdStateKey(value)) {
    throw new Error("Household Ritual state cannot include private/source/debug fields.");
  }
}

function stripUndefinedValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripUndefinedValues);
  }

  if (!isRecord(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, entryValue]) => entryValue !== undefined)
      .map(([key, entryValue]) => [key, stripUndefinedValues(entryValue)]),
  );
}

function isRitualFavoriteSourceSurface(
  value: unknown,
): value is RitualFavorite["sourceSurface"] {
  return (
    typeof value === "string" &&
    RITUAL_FAVORITE_SOURCE_SURFACES.includes(value as RitualFavorite["sourceSurface"])
  );
}

function isRitualHouseholdActor(value: unknown): value is NonNullable<RitualFavorite["createdBy"]> {
  return (
    typeof value === "string" &&
    RITUAL_HOUSEHOLD_ACTORS.includes(value as NonNullable<RitualFavorite["createdBy"]>)
  );
}

function isRitualInteractionEventType(
  value: unknown,
): value is RitualInteractionEvent["eventType"] {
  return (
    typeof value === "string" &&
    RITUAL_INTERACTION_EVENT_TYPES.includes(value as RitualInteractionEvent["eventType"])
  );
}

function isRitualInteractionSurface(
  value: unknown,
): value is RitualInteractionEvent["surface"] {
  return (
    typeof value === "string" &&
    RITUAL_INTERACTION_SURFACES.includes(value as RitualInteractionEvent["surface"])
  );
}

function isRitualFeedbackFit(value: unknown): value is RitualFeedback["fit"] {
  return (
    typeof value === "string" &&
    RITUAL_FEEDBACK_FITS.includes(value as RitualFeedback["fit"])
  );
}

function sanitizeFavoriteSnapshot(value: unknown): RitualFavoriteSnapshot | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.headline !== "string" ||
    typeof value.primaryPurpose !== "string" ||
    typeof value.primaryCarrier !== "string"
  ) {
    return undefined;
  }

  return {
    headline: value.headline,
    ...(typeof value.sourceLabel === "string" ? { sourceLabel: value.sourceLabel } : {}),
    primaryPurpose: value.primaryPurpose,
    primaryCarrier: value.primaryCarrier,
  };
}

function sanitizeFeedback(value: unknown): RitualFeedback | undefined {
  if (!isRecord(value) || !isRitualFeedbackFit(value.fit)) {
    return undefined;
  }

  const reasons = Array.isArray(value.reasons)
    ? value.reasons.filter(
        (reason): reason is RitualFeedback["reasons"][number] =>
          typeof reason === "string" &&
          RITUAL_FEEDBACK_REASONS.includes(reason as RitualFeedback["reasons"][number]),
      )
    : [];

  return {
    fit: value.fit,
    reasons,
    ...(typeof value.note === "string" && value.note.trim()
      ? { note: value.note.trim() }
      : {}),
  };
}

function sanitizeNumberRecord(value: unknown): Record<string, number> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const entries = Object.entries(value).filter(
    (entry): entry is [string, number] =>
      typeof entry[1] === "number" && Number.isFinite(entry[1]),
  );

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

function sanitizeCheckInSnapshot(value: unknown): RecommendationCheckInSnapshot {
  if (!isRecord(value)) {
    return {};
  }

  return {
    ...(typeof value.timeScope === "string" ? { timeScope: value.timeScope } : {}),
    ...(typeof value.capacityMode === "string"
      ? { capacityMode: value.capacityMode }
      : {}),
    ...(typeof value.energyCapacity === "string"
      ? { energyCapacity: value.energyCapacity }
      : {}),
    ...(typeof value.audience === "string" ? { audience: value.audience } : {}),
    ...(
      typeof value.purpose === "string" || value.purpose === null
        ? { purpose: value.purpose }
        : {}
    ),
    ...(
      typeof value.carrier === "string" || value.carrier === null
        ? { carrier: value.carrier }
        : {}
    ),
    ...(
      typeof value.refinement === "string" || value.refinement === null
        ? { refinement: value.refinement }
        : {}
    ),
    ...(
      typeof value.freeTextIntent === "string" || value.freeTextIntent === null
        ? { freeTextIntent: value.freeTextIntent }
        : {}
    ),
  };
}

function sanitizeCandidateSnapshot(value: unknown): RecommendationCandidateSnapshot | null {
  if (!isRecord(value) || typeof value.ritualId !== "string") {
    return null;
  }

  return {
    ritualId: value.ritualId,
    ...(typeof value.versionId === "string" ? { versionId: value.versionId } : {}),
    ...(typeof value.score === "number" && Number.isFinite(value.score)
      ? { score: value.score }
      : {}),
    ...(sanitizeNumberRecord(value.breakdown)
      ? { breakdown: sanitizeNumberRecord(value.breakdown) }
      : {}),
  };
}

function sanitizeRitualSnapshot(value: unknown): RecommendationRitualSnapshot | null {
  if (
    !isRecord(value) ||
    typeof value.headline !== "string" ||
    typeof value.primaryPurpose !== "string" ||
    typeof value.primaryCarrier !== "string" ||
    typeof value.status !== "string" ||
    typeof value.recommendationEligible !== "boolean"
  ) {
    return null;
  }

  return {
    headline: value.headline,
    ...(typeof value.sourceLabel === "string" ? { sourceLabel: value.sourceLabel } : {}),
    primaryPurpose: value.primaryPurpose,
    primaryCarrier: value.primaryCarrier,
    status: value.status,
    recommendationEligible: value.recommendationEligible,
    ...(isRecord(value.presentationSnapshot)
      ? { presentationSnapshot: value.presentationSnapshot as never }
      : {}),
    ...(isRecord(value.recommendationMetadataSnapshot)
      ? { recommendationMetadataSnapshot: value.recommendationMetadataSnapshot as never }
      : {}),
  };
}

function sanitizeFavorite(snapshot: FirestoreDocumentSnapshot): RitualFavorite | null {
  const data = snapshot.data();

  if (!isRecord(data) || hasForbiddenHouseholdStateKey(data)) {
    return null;
  }

  if (
    typeof data.ritualId !== "string" ||
    data.ritualId !== snapshot.id ||
    typeof data.active !== "boolean" ||
    typeof data.createdAt !== "string"
  ) {
    return null;
  }

  return {
    ritualId: data.ritualId,
    ...(typeof data.favoritedVersionId === "string"
      ? { favoritedVersionId: data.favoritedVersionId }
      : {}),
    active: data.active,
    createdAt: data.createdAt,
    ...(typeof data.updatedAt === "string" ? { updatedAt: data.updatedAt } : {}),
    ...(isRitualHouseholdActor(data.createdBy) ? { createdBy: data.createdBy } : {}),
    sourceSurface: isRitualFavoriteSourceSurface(data.sourceSurface)
      ? data.sourceSurface
      : "search",
    ...(sanitizeFavoriteSnapshot(data.ritualSnapshot)
      ? { ritualSnapshot: sanitizeFavoriteSnapshot(data.ritualSnapshot) }
      : {}),
    ...(typeof data.note === "string" && data.note.trim()
      ? { note: data.note.trim() }
      : {}),
  };
}

function sanitizeRecommendationInstance(
  snapshot: FirestoreDocumentSnapshot,
): RecommendationInstance | null {
  const data = snapshot.data();

  if (!isRecord(data) || hasForbiddenHouseholdStateKey(data)) {
    return null;
  }

  if (
    typeof data.id !== "string" ||
    data.id !== snapshot.id ||
    typeof data.createdAt !== "string" ||
    typeof data.selectedRitualId !== "string" ||
    data.surface !== "choose_with_me"
  ) {
    return null;
  }

  const selectorSnapshot = isRecord(data.selectorSnapshot)
    ? data.selectorSnapshot
    : {};
  const topCandidates = Array.isArray(selectorSnapshot.topCandidates)
    ? selectorSnapshot.topCandidates.flatMap((candidate) => {
        const sanitized = sanitizeCandidateSnapshot(candidate);

        return sanitized ? [sanitized] : [];
      })
    : [];
  const ritualSnapshot = sanitizeRitualSnapshot(data.ritualSnapshot);

  if (!ritualSnapshot) {
    return null;
  }

  return {
    id: data.id,
    createdAt: data.createdAt,
    selectedRitualId: data.selectedRitualId,
    ...(typeof data.selectedVersionId === "string"
      ? { selectedVersionId: data.selectedVersionId }
      : {}),
    surface: "choose_with_me",
    checkInSnapshot: sanitizeCheckInSnapshot(data.checkInSnapshot),
    selectorSnapshot: {
      ...(typeof selectorSnapshot.selectorVersion === "string"
        ? { selectorVersion: selectorSnapshot.selectorVersion }
        : {}),
      ...(typeof selectorSnapshot.selectedScore === "number" &&
      Number.isFinite(selectorSnapshot.selectedScore)
        ? { selectedScore: selectorSnapshot.selectedScore }
        : {}),
      ...(sanitizeNumberRecord(selectorSnapshot.selectedBreakdown)
        ? { selectedBreakdown: sanitizeNumberRecord(selectorSnapshot.selectedBreakdown) }
        : {}),
      ...(isStringArray(selectorSnapshot.matchedTiming)
        ? { matchedTiming: selectorSnapshot.matchedTiming }
        : {}),
      topCandidates,
      ...(sanitizeNumberRecord(selectorSnapshot.exclusionSummary)
        ? { exclusionSummary: sanitizeNumberRecord(selectorSnapshot.exclusionSummary) }
        : {}),
    },
    ritualSnapshot,
  };
}

function sanitizeInteractionEvent(
  snapshot: FirestoreDocumentSnapshot,
): RitualInteractionEvent | null {
  const data = snapshot.data();

  if (!isRecord(data) || hasForbiddenHouseholdStateKey(data)) {
    return null;
  }

  if (
    typeof data.id !== "string" ||
    data.id !== snapshot.id ||
    typeof data.ritualId !== "string" ||
    !isRitualInteractionEventType(data.eventType) ||
    !isRitualInteractionSurface(data.surface) ||
    typeof data.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: data.id,
    ritualId: data.ritualId,
    eventType: data.eventType,
    surface: data.surface,
    createdAt: data.createdAt,
    ...(isRitualHouseholdActor(data.actor) ? { actor: data.actor } : {}),
    ...(typeof data.recommendationInstanceId === "string"
      ? { recommendationInstanceId: data.recommendationInstanceId }
      : {}),
    ...(sanitizeFeedback(data.feedback) ? { feedback: sanitizeFeedback(data.feedback) } : {}),
  };
}

function buildFavoriteDocument(
  householdId: string,
  favorite: RitualFavorite,
): Record<string, unknown> {
  const document = {
    householdId,
    ...favorite,
  };

  assertHouseholdStateDocumentSafe(document);

  return stripUndefinedValues(document) as Record<string, unknown>;
}

function buildRecommendationInstanceDocument(
  householdId: string,
  instance: RecommendationInstance,
): Record<string, unknown> {
  const document = {
    householdId,
    ...instance,
  };

  assertHouseholdStateDocumentSafe(document);

  return stripUndefinedValues(document) as Record<string, unknown>;
}

function buildInteractionEventDocument(
  householdId: string,
  event: RitualInteractionEvent,
): Record<string, unknown> {
  const document = {
    householdId,
    ...event,
  };

  assertHouseholdStateDocumentSafe(document);

  return stripUndefinedValues(document) as Record<string, unknown>;
}

export async function loadHouseholdRitualState(
  db: Firestore,
  householdId: string,
): Promise<HouseholdRitualStateSnapshot> {
  const [
    favoriteSnapshots,
    recommendationInstanceSnapshots,
    interactionEventSnapshots,
  ] = await Promise.all([
    getDocs(collection(db, "households", householdId, "ritualFavorites")),
    getDocs(collection(db, "households", householdId, "recommendationInstances")),
    getDocs(collection(db, "households", householdId, "ritualInteractionEvents")),
  ]);

  return {
    favorites: favoriteSnapshots.docs.flatMap((snapshot) => {
      const favorite = sanitizeFavorite(snapshot);

      return favorite ? [favorite] : [];
    }),
    recommendationInstances: recommendationInstanceSnapshots.docs.flatMap((snapshot) => {
      const instance = sanitizeRecommendationInstance(snapshot);

      return instance ? [instance] : [];
    }),
    interactionEvents: interactionEventSnapshots.docs.flatMap((snapshot) => {
      const event = sanitizeInteractionEvent(snapshot);

      return event ? [event] : [];
    }),
  };
}

export async function saveRitualFavorite(
  db: Firestore,
  householdId: string,
  favorite: RitualFavorite,
): Promise<void> {
  await setDoc(
    doc(db, "households", householdId, "ritualFavorites", favorite.ritualId),
    buildFavoriteDocument(householdId, favorite),
  );
}

export async function saveRecommendationInstance(
  db: Firestore,
  householdId: string,
  instance: RecommendationInstance,
): Promise<void> {
  await setDoc(
    doc(db, "households", householdId, "recommendationInstances", instance.id),
    buildRecommendationInstanceDocument(householdId, instance),
  );
}

export async function saveRitualInteractionEvent(
  db: Firestore,
  householdId: string,
  event: RitualInteractionEvent,
): Promise<void> {
  await setDoc(
    doc(db, "households", householdId, "ritualInteractionEvents", event.id),
    buildInteractionEventDocument(householdId, event),
  );
}
