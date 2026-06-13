import type {
  Ritual,
  RitualPresentation,
  RitualRecommendationMetadata,
} from "./types";

export type RitualVersionIdentity = {
  ritualId: string;
  versionId: string;
  contentHash: string;
};

export type RitualPresentationSnapshot = RitualPresentation;
export type RitualRecommendationMetadataSnapshot = RitualRecommendationMetadata;

type StableJsonValue =
  | null
  | string
  | number
  | boolean
  | StableJsonValue[]
  | { [key: string]: StableJsonValue | undefined };

const FNV_128_OFFSET = 0x6c62272e07bb014262b821756295c58dn;
const FNV_128_PRIME = 0x0000000001000000000000000000013bn;
const FNV_128_MASK = (1n << 128n) - 1n;

function stableSerialize(value: StableJsonValue): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableSerialize).join(",")}]`;
  }

  return `{${Object.keys(value)
    .filter((key) => value[key] !== undefined)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key] ?? null)}`)
    .join(",")}}`;
}

function createDeterministicHash(value: StableJsonValue): string {
  const serialized = stableSerialize(value);
  let hash = FNV_128_OFFSET;

  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= BigInt(serialized.charCodeAt(index));
    hash = (hash * FNV_128_PRIME) & FNV_128_MASK;
  }

  return `fnv1a128:${hash.toString(16).padStart(32, "0")}`;
}

function getRitualContentHashPayload(ritual: Ritual): StableJsonValue {
  return {
    adaptationPolicy: ritual.adaptationPolicy,
    availability: ritual.availability,
    id: ritual.id,
    origin: ritual.origin,
    presentation: ritual.presentation,
    recommendationMetadata: ritual.recommendationMetadata,
    reviewFlags: ritual.reviewFlags,
    ritualWords: ritual.ritualWords,
    searchMetadata: ritual.searchMetadata,
  };
}

export function getRitualContentHash(ritual: Ritual): string {
  return createDeterministicHash(getRitualContentHashPayload(ritual));
}

export function getRitualVersionIdentity(
  ritual: Ritual,
): RitualVersionIdentity {
  const contentHash = getRitualContentHash(ritual);
  const shortHash = contentHash.split(":")[1]?.slice(0, 12) ?? contentHash;

  return {
    ritualId: ritual.id,
    versionId: `${ritual.id}__${shortHash}`,
    contentHash,
  };
}

export function getRitualPresentationSnapshot(
  ritual: Ritual,
): RitualPresentationSnapshot {
  return { ...ritual.presentation };
}

export function getRitualRecommendationMetadataSnapshot(
  ritual: Ritual,
): RitualRecommendationMetadataSnapshot {
  return {
    purposes: {
      primary: ritual.recommendationMetadata.purposes.primary,
      secondary: [...ritual.recommendationMetadata.purposes.secondary],
      refinement: ritual.recommendationMetadata.purposes.refinement,
    },
    carriers: {
      primary: ritual.recommendationMetadata.carriers.primary,
      secondary: [...ritual.recommendationMetadata.carriers.secondary],
    },
    capacity: {
      supports: [...ritual.recommendationMetadata.capacity.supports],
      default: ritual.recommendationMetadata.capacity.default,
    },
    audience: {
      supports: [...ritual.recommendationMetadata.audience.supports],
      default: ritual.recommendationMetadata.audience.default,
      bothOfUsStructure:
        ritual.recommendationMetadata.audience.bothOfUsStructure,
    },
    timing: {
      relationship: ritual.recommendationMetadata.timing.relationship,
      contexts: ritual.recommendationMetadata.timing.contexts
        ? [...ritual.recommendationMetadata.timing.contexts]
        : undefined,
    },
    eligibility: {
      recommendable:
        ritual.recommendationMetadata.eligibility.recommendable,
      missing: ritual.recommendationMetadata.eligibility.missing
        ? [...ritual.recommendationMetadata.eligibility.missing]
        : undefined,
      notFor: ritual.recommendationMetadata.eligibility.notFor
        ? [...ritual.recommendationMetadata.eligibility.notFor]
        : undefined,
    },
  };
}
