import { describe, expect, it } from "vitest";

import {
  createRitualReviewTransactionPlan,
  isRitualReviewTransactionPlanSuccessful,
} from "../../src/data/rituals/db-review-transactions";
import {
  createRitualDbDocumentPair,
  createRitualValidationSnapshotDocument,
  type RitualDocument,
} from "../../src/data/rituals/db-documents";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

const createdAtIso = "2026-06-13T00:00:00.000Z";
const laterCreatedAtIso = "2026-06-13T00:01:00.000Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createRecord() {
  const { ritualDocument, versionDocument } = createRitualDbDocumentPair(
    sourceBackedRituals[0],
    {
      createdAtIso,
      updatedAtIso: createdAtIso,
      currentVersionId: undefined,
      publishedVersionId: undefined,
    },
  );
  const validationSnapshot = createRitualValidationSnapshotDocument({
    id: "validation-test",
    ritualDocument,
    versionDocument,
    validatorVersion: "unit-test",
    generatedAtIso: createdAtIso,
  });

  return { ritualDocument, versionDocument, validationSnapshot };
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

function expectSuccessful(
  result: ReturnType<typeof createRitualReviewTransactionPlan>,
) {
  expect(isRitualReviewTransactionPlanSuccessful(result)).toBe(true);

  if (!result.valid) {
    throw new Error(result.findings.map((finding) => finding.message).join("\n"));
  }

  return result.plan;
}

describe("Ritual DB review transaction plans", () => {
  it("promotes direct-use with a review decision, audit event, and pointer update", () => {
    const { ritualDocument, versionDocument, validationSnapshot } = createRecord();
    const result = createRitualReviewTransactionPlan({
      action: "promote_direct_use",
      ritualDocument: makeDraft(ritualDocument),
      targetVersionDocument: versionDocument,
      validationSnapshot,
      reasons: ["Owner approved direct use."],
      createdAtIso,
    });
    const plan = expectSuccessful(result);

    expect(plan.ritualDocumentAfter.lifecycle.state).toBe("reviewed");
    expect(plan.ritualDocumentAfter.lifecycle.directUseEligible).toBe(true);
    expect(plan.ritualDocumentAfter.lifecycle.recommendationEligible).toBe(false);
    expect(plan.ritualDocumentAfter.publishedVersionId).toBe(versionDocument.versionId);
    expect(plan.ritualDocumentAfter.latestReviewDecisionId).toBe(
      plan.reviewDecisionDocument.id,
    );
    expect(plan.ritualDocumentAfter.latestValidationSnapshotId).toBe(
      validationSnapshot.id,
    );
    expect(plan.reviewDecisionDocument.decisionType).toBe("promote_direct_use");
    expect(plan.reviewDecisionDocument.decision).toBe("approved");
    expect(plan.auditEventDocument.eventType).toBe("review_decision_recorded");
    expect(plan.writes.map((write) => write.collection)).toEqual([
      "rituals",
      "reviewDecisions",
      "ritualAuditEvents",
    ]);
  });

  it("keeps recommendation promotion separate from direct-use promotion", () => {
    const { ritualDocument, versionDocument, validationSnapshot } = createRecord();
    const blocked = createRitualReviewTransactionPlan({
      action: "promote_recommendation",
      ritualDocument: makeDraft(ritualDocument),
      targetVersionDocument: versionDocument,
      validationSnapshot,
      createdAtIso,
    });

    expect(blocked.valid).toBe(false);
    expect(blocked.findings.map((finding) => finding.path)).toContain(
      "ritualDocument.lifecycle.directUseEligible",
    );

    const reviewed = clone(ritualDocument);
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

    const promoted = expectSuccessful(createRitualReviewTransactionPlan({
      action: "promote_recommendation",
      ritualDocument: reviewed,
      targetVersionDocument: versionDocument,
      validationSnapshot,
      reasons: ["Owner approved recommendation use."],
      createdAtIso: laterCreatedAtIso,
    }));

    expect(promoted.ritualDocumentAfter.lifecycle.state).toBe("recommendable");
    expect(promoted.ritualDocumentAfter.lifecycle.directUseEligible).toBe(true);
    expect(promoted.ritualDocumentAfter.lifecycle.recommendationEligible).toBe(true);
    expect(promoted.ritualDocumentAfter.lifecycle.missingReadiness).toEqual([]);
    expect(promoted.reviewDecisionDocument.decisionType).toBe(
      "promote_recommendation",
    );
  });

  it("records holds and notes without collapsing lifecycle meanings", () => {
    const { ritualDocument, versionDocument } = createRecord();
    const directUseHold = expectSuccessful(createRitualReviewTransactionPlan({
      action: "hold_direct_use",
      ritualDocument,
      targetVersionDocument: versionDocument,
      reasons: ["Needs material safety review."],
      createdAtIso,
    }));
    const recommendationHold = expectSuccessful(createRitualReviewTransactionPlan({
      action: "hold_recommendation",
      ritualDocument,
      targetVersionDocument: versionDocument,
      reasons: ["Recommendation context needs owner review."],
      createdAtIso: laterCreatedAtIso,
    }));
    const note = expectSuccessful(createRitualReviewTransactionPlan({
      action: "add_review_note",
      ritualDocument,
      targetVersionDocument: versionDocument,
      reasons: ["Good candidate for later seasonal framing."],
      createdAtIso,
    }));

    expect(directUseHold.ritualDocumentAfter.lifecycle.state).toBe("held");
    expect(directUseHold.ritualDocumentAfter.lifecycle.directUseEligible).toBe(false);
    expect(recommendationHold.ritualDocumentAfter.lifecycle.state).toBe("reviewed");
    expect(recommendationHold.ritualDocumentAfter.lifecycle.directUseEligible).toBe(
      true,
    );
    expect(recommendationHold.ritualDocumentAfter.lifecycle.recommendationEligible)
      .toBe(false);
    expect(note.ritualDocumentAfter.lifecycle).toEqual(ritualDocument.lifecycle);
    expect(note.reviewDecisionDocument.decision).toBe("noted");
  });

  it("archives a Ritual as a non-candidate with explicit audit history", () => {
    const { ritualDocument, versionDocument, validationSnapshot } = createRecord();
    const plan = expectSuccessful(createRitualReviewTransactionPlan({
      action: "archive_ritual",
      ritualDocument,
      targetVersionDocument: versionDocument,
      validationSnapshot,
      reasons: ["No longer part of the active grimoire."],
      createdAtIso,
    }));

    expect(plan.ritualDocumentAfter.lifecycle.state).toBe("archived");
    expect(plan.ritualDocumentAfter.lifecycle.findable).toBe(false);
    expect(plan.ritualDocumentAfter.lifecycle.directUseEligible).toBe(false);
    expect(plan.ritualDocumentAfter.versionHistory.archivedVersionIds).toContain(
      versionDocument.versionId,
    );
    expect(plan.reviewDecisionDocument.decisionType).toBe("archive_ritual");
    expect(plan.reviewDecisionDocument.decision).toBe("archived");
  });

  it("rolls back the published pointer while preserving the previous pointer in audit", () => {
    const { ritualDocument, versionDocument, validationSnapshot } = createRecord();
    const newerVersionId = "ritual_version_newer_for_rollback";
    const current = clone(ritualDocument);

    current.currentVersionId = newerVersionId;
    current.publishedVersionId = newerVersionId;
    current.versionHistory.versionIds = [versionDocument.versionId, newerVersionId];

    const plan = expectSuccessful(createRitualReviewTransactionPlan({
      action: "rollback_published_version",
      ritualDocument: current,
      targetVersionDocument: versionDocument,
      validationSnapshot,
      reasons: ["Rollback after review."],
      createdAtIso,
    }));

    expect(plan.ritualDocumentAfter.currentVersionId).toBe(versionDocument.versionId);
    expect(plan.ritualDocumentAfter.publishedVersionId).toBe(
      versionDocument.versionId,
    );
    expect(plan.auditEventDocument.eventType).toBe("rollback_performed");
    expect(plan.auditEventDocument.summary).toContain(newerVersionId);
    expect(plan.auditEventDocument.summary).toContain(versionDocument.versionId);
  });

  it("rejects invalid promotions before producing writes", () => {
    const { ritualDocument, versionDocument, validationSnapshot } = createRecord();
    const failingSnapshot = {
      ...validationSnapshot,
      valid: false,
      findings: [{
        path: "presentation.practice",
        message: "Practice is missing.",
        severity: "error" as const,
      }],
    };
    const result = createRitualReviewTransactionPlan({
      action: "promote_direct_use",
      ritualDocument: makeDraft(ritualDocument),
      targetVersionDocument: versionDocument,
      validationSnapshot: failingSnapshot,
      createdAtIso,
    });

    expect(result.valid).toBe(false);
    expect(result.findings.map((finding) => finding.path)).toContain(
      "validationSnapshot.valid",
    );
  });

  it("rejects promotions when a target version is missing", () => {
    const { ritualDocument, validationSnapshot } = createRecord();
    const result = createRitualReviewTransactionPlan({
      action: "promote_direct_use",
      ritualDocument,
      validationSnapshot,
      createdAtIso,
    });

    expect(result.valid).toBe(false);
    expect(result.findings.map((finding) => finding.path)).toContain(
      "targetVersionDocument",
    );
  });
});
