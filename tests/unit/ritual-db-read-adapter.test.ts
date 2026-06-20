import { describe, expect, it } from "vitest";

import {
  createRitualDbReadRepository,
  isRitualDbReadFeatureEnabled,
  loadRitualDbReadRepository,
  RITUAL_DB_READ_FEATURE_FLAG,
} from "../../src/data/rituals/db-read-adapter";
import { createRitualDbMirrorDryRun } from "../../src/data/rituals/db-mirror";
import { createStaticRitualRepository } from "../../src/data/rituals/ritual-repository";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

const generatedAtIso = "2026-06-13T00:00:00.000Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createDbDocuments(count = 2) {
  const report = createRitualDbMirrorDryRun(
    sourceBackedRituals.slice(0, count),
    { generatedAtIso },
  );

  expect(report.skipped).toEqual([]);

  return {
    ritualDocuments: report.mirrored.map((record) => record.ritualDocument),
    versionDocuments: report.mirrored.map((record) => record.versionDocument),
    validationSnapshots: report.mirrored.map((record) => record.validationSnapshot),
  };
}

function createFallbackRepository(count = 2) {
  return createStaticRitualRepository(sourceBackedRituals.slice(0, count));
}

describe("Ritual DB read adapter", () => {
  it("keeps DB reads off unless the feature flag is exactly true", () => {
    expect(isRitualDbReadFeatureEnabled({})).toBe(false);
    expect(isRitualDbReadFeatureEnabled({
      [RITUAL_DB_READ_FEATURE_FLAG]: "false",
    })).toBe(false);
    expect(isRitualDbReadFeatureEnabled({
      [RITUAL_DB_READ_FEATURE_FLAG]: true,
    })).toBe(false);
    expect(isRitualDbReadFeatureEnabled({
      [RITUAL_DB_READ_FEATURE_FLAG]: "true",
    })).toBe(true);
  });

  it("uses the static repository fallback when DB reads are disabled", () => {
    const fallback = createFallbackRepository(2);
    const result = createRitualDbReadRepository({
      ...createDbDocuments(2),
      enabled: false,
      staticFallbackRepository: fallback,
      staticParityRituals: sourceBackedRituals.slice(0, 2),
    });

    expect(result.source).toBe("static_fallback_disabled");
    expect(result.repository).toBe(fallback);
    expect(result.repository.getAllRitualsForManager()).toHaveLength(2);
  });

  it("builds a repository from published, validated DB Rituals after parity passes", () => {
    const result = createRitualDbReadRepository({
      ...createDbDocuments(2),
      enabled: true,
      staticFallbackRepository: createFallbackRepository(2),
      staticParityRituals: sourceBackedRituals.slice(0, 2),
    });

    expect(result.source).toBe("db");
    expect(result.findings).toEqual([]);
    expect(result.repository.getAllRitualsForManager()).toEqual(
      sourceBackedRituals.slice(0, 2),
    );
    expect(result.repository.getRitualById(sourceBackedRituals[0].id)).toEqual(
      sourceBackedRituals[0],
    );
  });

  it("falls back when DB documents are unavailable", async () => {
    const fallback = createFallbackRepository(1);
    const result = await loadRitualDbReadRepository({
      enabled: true,
      loadDbDocuments: async () => {
        throw new Error("Firestore unavailable");
      },
      staticFallbackRepository: fallback,
      staticParityRituals: sourceBackedRituals.slice(0, 1),
    });

    expect(result.source).toBe("static_fallback_unavailable");
    expect(result.repository).toBe(fallback);
    expect(result.fallbackReason).toBe("Firestore unavailable");
  });

  it("falls back instead of reading unvalidated or unpublished versions", () => {
    const documents = createDbDocuments(1);
    const missingValidation = createRitualDbReadRepository({
      ritualDocuments: documents.ritualDocuments,
      versionDocuments: documents.versionDocuments,
      validationSnapshots: [],
      enabled: true,
      staticFallbackRepository: createFallbackRepository(1),
      staticParityRituals: sourceBackedRituals.slice(0, 1),
    });
    const unpublished = clone(documents);

    delete unpublished.ritualDocuments[0].publishedVersionId;

    const unpublishedResult = createRitualDbReadRepository({
      ...unpublished,
      enabled: true,
      staticFallbackRepository: createFallbackRepository(1),
      staticParityRituals: sourceBackedRituals.slice(0, 1),
    });

    expect(missingValidation.source).toBe("static_fallback_invalid");
    expect(missingValidation.findings.map((finding) => finding.path)).toContain(
      `${sourceBackedRituals[0].id}.ritualDocument.latestValidationSnapshotId`,
    );
    expect(unpublishedResult.source).toBe("static_fallback_invalid");
    expect(unpublishedResult.findings.map((finding) => finding.path)).toContain(
      `${sourceBackedRituals[0].id}.ritualDocument.publishedVersionId`,
    );
  });

  it("falls back when DB content does not validate", () => {
    const documents = createDbDocuments(1);
    const mismatched = clone(documents);

    mismatched.versionDocuments[0].contentHash =
      "fnv1a128:00000000000000000000000000000000";

    const result = createRitualDbReadRepository({
      ...mismatched,
      enabled: true,
      staticFallbackRepository: createFallbackRepository(1),
      staticParityRituals: sourceBackedRituals.slice(0, 1),
    });

    expect(result.source).toBe("static_fallback_invalid");
    expect(result.repository.getAllRitualsForManager()).toEqual(
      sourceBackedRituals.slice(0, 1),
    );
  });

  it("keeps using DB reads while reporting static parity diagnostics", () => {
    const result = createRitualDbReadRepository({
      ...createDbDocuments(1),
      enabled: true,
      staticFallbackRepository: createFallbackRepository(1),
      staticParityRituals: sourceBackedRituals.slice(1, 2),
    });

    expect(result.source).toBe("db");
    expect(result.dbDocuments?.ritualDocuments).toHaveLength(1);
    expect(result.findings.map((finding) => finding.message)).toContain(
      "Static Ritual is missing from DB read payload.",
    );
    expect(result.repository.getAllRitualsForManager()).toEqual(
      sourceBackedRituals.slice(0, 1),
    );
  });

  it("reads DB lifecycle review decisions that have moved ahead of the repo", () => {
    const documents = createDbDocuments(1);
    const held = clone(documents);

    held.ritualDocuments[0].lifecycle = {
      ...held.ritualDocuments[0].lifecycle,
      state: "held",
      directUseEligible: false,
      recommendationEligible: false,
      recommendable: false,
      missingReadiness: ["direct_use_review", "recommendation_review"],
      holdReasons: ["direct_use_hold"],
    };

    const result = createRitualDbReadRepository({
      ...held,
      enabled: true,
      staticFallbackRepository: createFallbackRepository(1),
      staticParityRituals: sourceBackedRituals.slice(0, 1),
    });
    const ritual = result.repository.getRitualById(sourceBackedRituals[0].id);

    expect(result.source).toBe("db");
    expect(result.dbDocuments?.ritualDocuments[0].id).toBe(sourceBackedRituals[0].id);
    expect(ritual?.availability.directUseEligible).toBe(false);
    expect(ritual?.availability.recommendationEligible).toBe(false);
    expect(ritual?.recommendationMetadata?.eligibility.recommendable).toBe(false);
    expect(ritual?.recommendationMetadata?.eligibility.missing).toEqual([
      "direct_use_review",
      "recommendation_review",
    ]);
  });

  it("reads the rollback target when the published pointer moves to an older valid version", () => {
    const documents = createDbDocuments(1);
    const newerVersionDocument = clone(documents.versionDocuments[0]);
    const newerValidationSnapshot = clone(documents.validationSnapshots[0]);
    const newerVersionId = "ritual_version_newer_valid_unpublished";

    newerVersionDocument.id = newerVersionId;
    newerVersionDocument.versionId = newerVersionId;
    newerValidationSnapshot.id = "validation_newer_valid_unpublished";
    newerValidationSnapshot.versionId = newerVersionId;
    documents.ritualDocuments[0].currentVersionId = newerVersionId;
    documents.ritualDocuments[0].versionHistory.versionIds = [
      documents.versionDocuments[0].versionId,
      newerVersionId,
    ];

    const result = createRitualDbReadRepository({
      ritualDocuments: documents.ritualDocuments,
      versionDocuments: [
        ...documents.versionDocuments,
        newerVersionDocument,
      ],
      validationSnapshots: [
        ...documents.validationSnapshots,
        newerValidationSnapshot,
      ],
      enabled: true,
      staticFallbackRepository: createFallbackRepository(1),
      staticParityRituals: sourceBackedRituals.slice(0, 1),
    });

    expect(result.source).toBe("db");
    expect(result.repository.getAllRitualsForManager()).toEqual(
      sourceBackedRituals.slice(0, 1),
    );
  });
});
