import { describe, expect, it } from "vitest";

import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";
import {
  getRitualContentHash,
  getRitualPresentationSnapshot,
  getRitualRecommendationMetadataSnapshot,
  getRitualVersionIdentity,
} from "../../src/data/rituals/version-identity";

describe("static Ritual version identity", () => {
  it("exists for every source-backed Ritual", () => {
    const identities = sourceBackedRituals.map(getRitualVersionIdentity);

    expect(identities).toHaveLength(sourceBackedRituals.length);
    expect(identities.every((identity) => identity.ritualId.length > 0)).toBe(
      true,
    );
    expect(
      identities.every((identity) =>
        identity.versionId.startsWith(`${identity.ritualId}__`),
      ),
    ).toBe(true);
    expect(
      identities.every((identity) =>
        /^fnv1a128:[0-9a-f]{32}$/.test(identity.contentHash),
      ),
    ).toBe(true);
  });

  it("creates deterministic content hashes", () => {
    const ritual = sourceBackedRituals[0];

    expect(getRitualContentHash(ritual)).toBe(getRitualContentHash(ritual));
    expect(getRitualVersionIdentity(ritual)).toEqual(
      getRitualVersionIdentity(ritual),
    );
  });

  it("changes the content hash when presentation changes", () => {
    const ritual = sourceBackedRituals[0];
    const changedPresentation = {
      ...ritual,
      presentation: {
        ...ritual.presentation,
        headline: `${ritual.presentation.headline} changed`,
      },
    } satisfies Ritual;

    expect(getRitualContentHash(changedPresentation)).not.toBe(
      getRitualContentHash(ritual),
    );
  });

  it("changes the content hash when recommendation metadata changes", () => {
    const ritual = sourceBackedRituals[0];
    const changedMetadata = {
      ...ritual,
      recommendationMetadata: {
        ...ritual.recommendationMetadata,
        purposes: {
          ...ritual.recommendationMetadata.purposes,
          refinement: `${ritual.recommendationMetadata.purposes.refinement} changed`,
        },
      },
    } satisfies Ritual;

    expect(getRitualContentHash(changedMetadata)).not.toBe(
      getRitualContentHash(ritual),
    );
  });

  it("does not depend on object key order", () => {
    const ritual = sourceBackedRituals[0];
    const reordered = {
      adaptationPolicy: ritual.adaptationPolicy,
      reviewFlags: ritual.reviewFlags,
      ritualWords: ritual.ritualWords,
      availability: ritual.availability,
      searchMetadata: ritual.searchMetadata,
      recommendationMetadata: {
        timing: ritual.recommendationMetadata.timing,
        eligibility: ritual.recommendationMetadata.eligibility,
        audience: ritual.recommendationMetadata.audience,
        capacity: ritual.recommendationMetadata.capacity,
        carriers: ritual.recommendationMetadata.carriers,
        purposes: ritual.recommendationMetadata.purposes,
      },
      presentation: ritual.presentation,
      origin: ritual.origin,
      status: ritual.status,
      id: ritual.id,
    } satisfies Ritual;

    expect(getRitualContentHash(reordered)).toBe(getRitualContentHash(ritual));
  });

  it("preserves presentation and recommendation metadata snapshots without mutating the Ritual", () => {
    const ritual = sourceBackedRituals[0];
    const original = JSON.stringify(ritual);
    const presentationSnapshot = getRitualPresentationSnapshot(ritual);
    const recommendationSnapshot =
      getRitualRecommendationMetadataSnapshot(ritual);

    expect(presentationSnapshot).toEqual(ritual.presentation);
    expect(recommendationSnapshot).toEqual(ritual.recommendationMetadata);

    presentationSnapshot.headline = "Mutated snapshot";
    recommendationSnapshot.capacity.supports.push("room_for_something_deeper");

    expect(ritual.presentation.headline).not.toBe("Mutated snapshot");
    expect(ritual.recommendationMetadata.capacity.supports).toEqual(
      sourceBackedRituals[0].recommendationMetadata.capacity.supports,
    );
    expect(JSON.stringify(ritual)).toBe(original);
  });
});
