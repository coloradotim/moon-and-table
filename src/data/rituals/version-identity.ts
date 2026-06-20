import type {
  Ritual,
  RitualPresentation,
  RitualRecommendationMetadata,
} from "./types.js";

export type RitualVersionIdentity = {
  ritualId: string;
  versionId: string;
  contentHash: string;
};

export type RitualPresentationSnapshot = RitualPresentation;
export type RitualRecommendationMetadataSnapshot =
  RitualRecommendationMetadata | undefined;

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
  if (!ritual.recommendationMetadata) {
    return undefined;
  }

  const metadata = ritual.recommendationMetadata;
  return {
    purposes: {
      primary: metadata.purposes.primary,
      secondary: [...metadata.purposes.secondary],
      refinement: metadata.purposes.refinement,
    },
    carriers: {
      primary: metadata.carriers.primary,
      secondary: [...metadata.carriers.secondary],
    },
    capacity: {
      supports: [...metadata.capacity.supports],
      default: metadata.capacity.default,
    },
    audience: {
      supports: [...metadata.audience.supports],
      default: metadata.audience.default,
      bothOfUsStructure: metadata.audience.bothOfUsStructure,
    },
    timing: {
      relationship: metadata.timing.relationship,
      contexts: metadata.timing.contexts
        ? [...metadata.timing.contexts]
        : undefined,
    },
    eligibility: {
      recommendable: metadata.eligibility.recommendable,
      missing: metadata.eligibility.missing
        ? [...metadata.eligibility.missing]
        : undefined,
      notFor: metadata.eligibility.notFor
        ? [...metadata.eligibility.notFor]
        : undefined,
    },
  };
}
