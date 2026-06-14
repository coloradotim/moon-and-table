import { describe, expect, it } from "vitest";

import {
  applyRitualReviewAction,
  createAdminFirestoreRitualReviewActionStore,
  createRitualValidationSnapshotIdForVersion,
  type AdminFirestoreReviewActionDb,
  type RitualReviewActionStore,
  type RitualReviewActionBoundaryResult,
} from "../../src/data/rituals/db-review-action-boundary";
import {
  createRitualDbMirrorDryRun,
} from "../../src/data/rituals/db-mirror";
import type {
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "../../src/data/rituals/db-documents";
import type { RitualReviewTransactionPlan } from "../../src/data/rituals/db-review-transactions";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

const createdAtIso = "2026-06-13T12:00:00.000Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createRecord() {
  const report = createRitualDbMirrorDryRun([sourceBackedRituals[0]], {
    generatedAtIso: createdAtIso,
  });

  expect(report.skipped).toEqual([]);

  return {
    ritualDocument: clone(report.mirrored[0].ritualDocument),
    versionDocument: clone(report.mirrored[0].versionDocument),
    validationSnapshot: clone(report.mirrored[0].validationSnapshot),
  };
}

function makeDraft(document: RitualDocument): RitualDocument {
  const draft = clone(document);

  draft.lifecycle = {
    ...draft.lifecycle,
    state: "draft",
    findable: true,
    directUseEligible: false,
    recommendationEligible: false,
    recommendable: false,
    missingReadiness: ["direct_use_review", "recommendation_review"],
    holdReasons: [],
  };

  return draft;
}

function makeReviewed(document: RitualDocument): RitualDocument {
  const reviewed = clone(document);

  reviewed.lifecycle = {
    ...reviewed.lifecycle,
    state: "reviewed",
    findable: true,
    directUseEligible: true,
    recommendationEligible: false,
    recommendable: false,
    missingReadiness: ["recommendation_review"],
    holdReasons: [],
  };

  return reviewed;
}

function createStore(input: {
  ritualDocument: RitualDocument;
  versionDocument: RitualVersionDocument;
  validationSnapshot?: RitualValidationSnapshotDocument;
}): RitualReviewActionStore & {
  committedPlans: RitualReviewTransactionPlan[];
  writtenCollections: string[];
} {
  const ritualDocuments = new Map([[input.ritualDocument.id, input.ritualDocument]]);
  const versionDocuments = new Map([[input.versionDocument.versionId, input.versionDocument]]);
  const validationSnapshots = new Map<string, RitualValidationSnapshotDocument>();
  const committedPlans: RitualReviewTransactionPlan[] = [];
  const writtenCollections: string[] = [];

  if (input.validationSnapshot) {
    validationSnapshots.set(input.validationSnapshot.id, input.validationSnapshot);
  }

  return {
    committedPlans,
    writtenCollections,
    async getRitualDocument(ritualId) {
      return ritualDocuments.get(ritualId);
    },
    async getRitualVersionDocument(versionId) {
      return versionDocuments.get(versionId);
    },
    async getRitualValidationSnapshotDocument(snapshotId) {
      return validationSnapshots.get(snapshotId);
    },
    async commitReviewTransactionPlan(plan) {
      committedPlans.push(plan);

      for (const write of plan.writes) {
        writtenCollections.push(write.collection);
      }
    },
  };
}

function expectInvalid(result: RitualReviewActionBoundaryResult) {
  expect(result.valid).toBe(false);

  if (result.valid) {
    throw new Error("Expected review action boundary result to be invalid.");
  }

  return result;
}

describe("Ritual review action boundary", () => {
  it("promotes direct use through the server-side transaction planner", async () => {
    const record = createRecord();
    const store = createStore({
      ...record,
      ritualDocument: makeDraft(record.ritualDocument),
    });
    const result = await applyRitualReviewAction({
      request: {
        ritualId: record.ritualDocument.id,
        versionId: record.versionDocument.versionId,
        action: "promote_direct_use",
        reasons: ["Owner approved direct use."],
      },
      caller: { uid: "owner-uid", reviewer: "owner" },
      store,
      authorize: () => true,
      createdAtIso,
    });

    expect(result.valid).toBe(true);

    if (!result.valid) {
      throw new Error(result.findings.map((finding) => finding.message).join("\n"));
    }

    expect(result.plan.ritualDocumentAfter.lifecycle.state).toBe("reviewed");
    expect(result.plan.ritualDocumentAfter.lifecycle.directUseEligible).toBe(true);
    expect(result.plan.ritualDocumentAfter.lifecycle.recommendationEligible).toBe(
      false,
    );
    expect(result.plan.reviewDecisionDocument.decisionType).toBe(
      "promote_direct_use",
    );
    expect(store.committedPlans).toHaveLength(1);
    expect(store.writtenCollections).toEqual([
      "rituals",
      "reviewDecisions",
      "ritualAuditEvents",
    ]);
  });

  it("rejects unauthorized callers before committing writes", async () => {
    const record = createRecord();
    const store = createStore(record);
    const result = await applyRitualReviewAction({
      request: {
        ritualId: record.ritualDocument.id,
        versionId: record.versionDocument.versionId,
        action: "hold_recommendation",
        reasons: ["Not for guided recommendation."],
      },
      caller: { uid: "other-uid" },
      store,
      authorize: () => false,
      createdAtIso,
    });

    const invalid = expectInvalid(result);

    expect(invalid.findings.map((finding) => finding.path)).toEqual(["caller"]);
    expect(store.committedPlans).toEqual([]);
  });

  it("requires reasons for hold and note actions", async () => {
    const record = createRecord();
    const store = createStore(record);
    const result = await applyRitualReviewAction({
      request: {
        ritualId: record.ritualDocument.id,
        versionId: record.versionDocument.versionId,
        action: "hold_recommendation",
        reasons: [],
      },
      caller: { uid: "owner-uid" },
      store,
      authorize: () => true,
      createdAtIso,
    });

    const invalid = expectInvalid(result);

    expect(invalid.findings.map((finding) => finding.path)).toContain("reasons");
    expect(store.committedPlans).toEqual([]);
  });

  it("requires a matching validation snapshot for promotion actions", async () => {
    const record = createRecord();
    const store = createStore({
      ritualDocument: makeDraft(record.ritualDocument),
      versionDocument: record.versionDocument,
    });
    const result = await applyRitualReviewAction({
      request: {
        ritualId: record.ritualDocument.id,
        versionId: record.versionDocument.versionId,
        action: "promote_direct_use",
        reasons: ["Owner approved direct use."],
      },
      caller: { uid: "owner-uid" },
      store,
      authorize: () => true,
      createdAtIso,
    });

    const invalid = expectInvalid(result);

    expect(invalid.findings.map((finding) => finding.path)).toContain(
      "validationSnapshot",
    );
    expect(store.committedPlans).toEqual([]);
  });

  it("falls back to the deterministic validation snapshot id for target versions", async () => {
    const record = createRecord();
    const ritualDocument = makeReviewed(record.ritualDocument);
    const deterministicSnapshot = {
      ...record.validationSnapshot,
      id: createRitualValidationSnapshotIdForVersion(record.versionDocument.versionId),
    };

    ritualDocument.latestValidationSnapshotId = "stale-latest-snapshot";

    const store = createStore({
      ritualDocument,
      versionDocument: record.versionDocument,
      validationSnapshot: deterministicSnapshot,
    });
    const result = await applyRitualReviewAction({
      request: {
        ritualId: ritualDocument.id,
        versionId: record.versionDocument.versionId,
        action: "promote_recommendation",
        reasons: ["Owner approved recommendation use."],
      },
      caller: { uid: "owner-uid" },
      store,
      authorize: () => true,
      createdAtIso,
    });

    expect(result.valid).toBe(true);

    if (!result.valid) {
      throw new Error(result.findings.map((finding) => finding.message).join("\n"));
    }

    expect(result.plan.ritualDocumentAfter.lifecycle.state).toBe("recommendable");
    expect(result.plan.ritualDocumentAfter.latestValidationSnapshotId).toBe(
      deterministicSnapshot.id,
    );
  });

  it("strips undefined values before handing review writes to Admin Firestore", async () => {
    const record = createRecord();
    const store = createStore({
      ritualDocument: makeReviewed(record.ritualDocument),
      versionDocument: record.versionDocument,
      validationSnapshot: record.validationSnapshot,
    });
    const result = await applyRitualReviewAction({
      request: {
        ritualId: record.ritualDocument.id,
        versionId: record.versionDocument.versionId,
        action: "hold_direct_use",
        reasons: ["Not ready for direct selection."],
      },
      caller: { uid: "owner-uid", reviewer: "owner" },
      store,
      authorize: () => true,
      createdAtIso,
    });

    expect(result.valid).toBe(true);

    if (!result.valid) {
      throw new Error(result.findings.map((finding) => finding.message).join("\n"));
    }

    const writtenDocuments: unknown[] = [];
    const adminStore = createAdminFirestoreRitualReviewActionStore({
      collection: (collectionName) => ({
        doc: (id) => ({
          collectionName,
          id,
          get: async () => ({ exists: false, data: () => undefined }),
        }),
      }),
      batch: () => ({
        set: (_ref, document) => {
          writtenDocuments.push(document);
        },
        create: (_ref, document) => {
          writtenDocuments.push(document);
        },
        commit: async () => undefined,
      }),
    } as AdminFirestoreReviewActionDb);

    await adminStore.commitReviewTransactionPlan(result.plan);

    expect(JSON.stringify(writtenDocuments)).not.toContain("undefined");
    expect(writtenDocuments).toHaveLength(3);
  });
});
