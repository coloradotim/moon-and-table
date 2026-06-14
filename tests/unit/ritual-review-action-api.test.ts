import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

import { createRitualDbMirrorDryRun } from "../../src/data/rituals/db-mirror";
import type { RitualReviewActionStore } from "../../src/data/rituals/db-review-action-boundary";
import type { RitualReviewTransactionPlan } from "../../src/data/rituals/db-review-transactions";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import { handleRitualReviewActionApi } from "../../src/server/ritual-review-action-api";

function createResponse() {
  let statusCode = 0;
  let body: unknown;

  return {
    response: {
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(value: unknown) {
        body = value;
      },
    },
    get statusCode() {
      return statusCode;
    },
    get body() {
      return body;
    },
  };
}

function createStore(): RitualReviewActionStore & {
  committedPlans: RitualReviewTransactionPlan[];
} {
  const report = createRitualDbMirrorDryRun(sourceBackedRituals.slice(0, 1), {
    generatedAtIso: "2026-06-13T00:00:00.000Z",
  });
  const record = report.mirrored[0];
  const committedPlans: RitualReviewTransactionPlan[] = [];

  return {
    committedPlans,
    async getRitualDocument(ritualId) {
      return record.ritualDocument.id === ritualId
        ? record.ritualDocument
        : undefined;
    },
    async getRitualVersionDocument(versionId) {
      return record.versionDocument.versionId === versionId
        ? record.versionDocument
        : undefined;
    },
    async getRitualValidationSnapshotDocument(snapshotId) {
      return record.validationSnapshot.id === snapshotId
        ? record.validationSnapshot
        : undefined;
    },
    async commitReviewTransactionPlan(plan) {
      committedPlans.push(plan);
    },
  };
}

describe("Ritual review action API", () => {
  it("verifies the caller and records a review action through the boundary", async () => {
    const store = createStore();
    const response = createResponse();
    const record = createRitualDbMirrorDryRun(sourceBackedRituals.slice(0, 1))
      .mirrored[0];

    await handleRitualReviewActionApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          ritualId: record.ritualDocument.id,
          versionId: record.versionDocument.versionId,
          action: "hold_recommendation",
          reasons: ["manual hold"],
        },
      },
      response.response,
      {
        store,
        verifyIdToken: async () => ({ uid: "reviewer-1" }),
        authorize: () => true,
        now: () => "2026-06-13T12:00:00.000Z",
      },
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        valid: true,
        ritualId: record.ritualDocument.id,
        lifecycleState: "reviewed",
        directUseEligible: true,
        recommendable: false,
      }),
    );
    expect(store.committedPlans).toHaveLength(1);
  });

  it("rejects requests without a verified Firebase ID token", async () => {
    const response = createResponse();

    await handleRitualReviewActionApi(
      { method: "POST", headers: {}, body: {} },
      response.response,
      {
        store: createStore(),
        verifyIdToken: async () => {
          throw new Error("missing");
        },
        authorize: () => true,
      },
    );

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        valid: false,
        findings: [
          expect.objectContaining({
            path: "authorization",
          }),
        ],
      }),
    );
  });

  it("keeps the deployed wrapper open to any verified Firebase user", () => {
    const apiSource = readFileSync(
      new URL("../../api/ritual-review-action.ts", import.meta.url),
      "utf8",
    );

    expect(apiSource).toContain("authorize: () => true");
    expect(apiSource).not.toContain("MOON_TABLE_RITUAL_REVIEW_ADMIN");
    expect(apiSource).toContain("FIREBASE_SERVICE_ACCOUNT_PATH");
  });
});
