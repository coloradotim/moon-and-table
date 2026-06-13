import { describe, expect, it } from "vitest";

import {
  createRitualDbDocumentPair,
  createRitualDocumentFromRitual,
  createRitualValidationSnapshotDocument,
  createRitualVersionDocumentFromRitual,
  type ImportBatchDocument,
  type ReviewDecisionDocument,
  type RitualAuditEventDocument,
  type RitualDocument,
  type RitualLifecycleSnapshot,
  validateImportBatchDocument,
  validateReviewDecisionDocument,
  validateRitualAuditEventDocument,
  validateRitualDocument,
  validateRitualDocumentPair,
  validateRitualValidationSnapshotDocument,
  validateRitualVersionDocument,
} from "../../src/data/rituals/db-documents";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";
import { getRitualVersionIdentity } from "../../src/data/rituals/version-identity";

const baseRitual = sourceBackedRituals[0];
const createdAtIso = "2026-06-13T00:00:00.000Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function expectFindingPath(
  findings: Array<{ path: string }>,
  expectedPath: string,
): void {
  expect(findings.map((finding) => finding.path)).toContain(expectedPath);
}

function toLifecycleSnapshot(document: RitualDocument): RitualLifecycleSnapshot {
  return {
    lifecycleState: document.lifecycle.state,
    findable: document.lifecycle.findable,
    directUseEligible: document.lifecycle.directUseEligible,
    recommendationEligible: document.lifecycle.recommendationEligible,
    recommendable: document.lifecycle.recommendable,
    missingReadiness: [...document.lifecycle.missingReadiness],
  };
}

describe("Ritual DB documents", () => {
  it("creates deterministic Ritual pointer and immutable version documents", () => {
    const first = createRitualDbDocumentPair(baseRitual, {
      createdAtIso,
      createdBy: "codex",
      importBatchId: "batch-test",
      packetCandidateId: "candidate-test",
      packetPath: "docs/research/ritual-candidates/example.md",
      sourceRunId: "source-run-test",
    });
    const second = createRitualDbDocumentPair(baseRitual, {
      createdAtIso,
      createdBy: "codex",
      importBatchId: "batch-test",
      packetCandidateId: "candidate-test",
      packetPath: "docs/research/ritual-candidates/example.md",
      sourceRunId: "source-run-test",
    });
    const identity = getRitualVersionIdentity(baseRitual);

    expect(second).toEqual(first);
    expect(first.ritualDocument.id).toBe(baseRitual.id);
    expect(first.ritualDocument.currentVersionId).toBe(identity.versionId);
    expect(first.ritualDocument.versionHistory.versionIds).toEqual([
      identity.versionId,
    ]);
    expect(first.versionDocument.versionId).toBe(identity.versionId);
    expect(first.versionDocument.contentHash).toBe(identity.contentHash);
    expect(first.versionDocument.provenance.sourceGrounding).toEqual(
      baseRitual.origin.type === "source" ? baseRitual.origin.sourceGrounding : [],
    );
    expect(first.versionDocument.ritual).toEqual(baseRitual);
  });

  it("validates DB-shaped Ritual documents and related review documents", () => {
    const { ritualDocument, versionDocument } = createRitualDbDocumentPair(
      baseRitual,
      { createdAtIso },
    );
    const lifecycleSnapshot = toLifecycleSnapshot(ritualDocument);
    const importBatch: ImportBatchDocument = {
      id: "batch-test",
      sourceLabel: versionDocument.provenance.sourceIds?.[0] ?? "source-test",
      importer: "codex",
      createdAtIso,
      candidateResults: [{
        packetCandidateId: "candidate-test",
        ritualId: ritualDocument.id,
        versionId: versionDocument.versionId,
        disposition: "imported",
        notes: [],
      }],
    };
    const reviewDecision: ReviewDecisionDocument = {
      id: "decision-test",
      ritualId: ritualDocument.id,
      versionId: versionDocument.versionId,
      decisionType: "promote_recommendation",
      decision: "approved",
      reasons: ["Validation passed."],
      reviewer: "codex",
      before: lifecycleSnapshot,
      after: lifecycleSnapshot,
      createdAtIso,
    };
    const validationSnapshot = createRitualValidationSnapshotDocument({
      id: "validation-test",
      ritualDocument,
      versionDocument,
      validatorVersion: "unit-test",
      generatedAtIso: createdAtIso,
    });
    const auditEvent: RitualAuditEventDocument = {
      id: "audit-test",
      ritualId: ritualDocument.id,
      versionId: versionDocument.versionId,
      eventType: "validation_snapshot_created",
      actor: "codex",
      summary: "Created validation snapshot.",
      relatedValidationSnapshotId: validationSnapshot.id,
      createdAtIso,
    };

    expect(validateRitualDocument(ritualDocument).valid).toBe(true);
    expect(validateRitualVersionDocument(versionDocument).valid).toBe(true);
    expect(validateRitualDocumentPair(ritualDocument, versionDocument).valid).toBe(
      true,
    );
    expect(validateImportBatchDocument(importBatch).valid).toBe(true);
    expect(validateReviewDecisionDocument(reviewDecision).valid).toBe(true);
    expect(validateRitualValidationSnapshotDocument(
      validationSnapshot,
      versionDocument,
    ).valid).toBe(true);
    expect(validateRitualAuditEventDocument(auditEvent).valid).toBe(true);
  });

  it("reports invalid lifecycle, availability, and recommendability combinations", () => {
    const document = createRitualDocumentFromRitual(baseRitual, { createdAtIso });

    document.lifecycle.directUseEligible = false;
    document.lifecycle.missingReadiness = ["recommendation_review"];

    const result = validateRitualDocument(document);

    expect(result.valid).toBe(false);
    expectFindingPath(result.findings, "lifecycle.recommendationEligible");
    expectFindingPath(result.findings, "lifecycle.missingReadiness");
  });

  it("reports mismatched content hash and version identity", () => {
    const document = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
    });

    document.versionId = "wrong-version";
    document.contentHash = "fnv1a128:00000000000000000000000000000000";

    const result = validateRitualVersionDocument(document);

    expect(result.valid).toBe(false);
    expectFindingPath(result.findings, "id");
    expectFindingPath(result.findings, "versionId");
    expectFindingPath(result.findings, "contentHash");
  });

  it("reports missing source grounding for source-backed version snapshots", () => {
    const ritual = clone(baseRitual);

    if (ritual.origin.type !== "source") {
      throw new Error("Expected source-backed test ritual.");
    }

    ritual.origin.sourceGrounding = [];

    const document = createRitualVersionDocumentFromRitual(ritual, {
      createdAtIso,
    });
    const result = validateRitualVersionDocument(document);

    expect(result.valid).toBe(false);
    expectFindingPath(result.findings, "ritual.origin.sourceGrounding");
    expectFindingPath(result.findings, "provenance.sourceGrounding");
    expectFindingPath(result.findings, "provenance.sourceLocationLabels");
  });

  it("rejects stale private/source fields and unsupported runtime metadata", () => {
    const ritualWithStaleFields = {
      ...clone(baseRitual),
      privateSourceText: "Do not store this.",
      sourceNotes: ["legacy source-note residue"],
    } as Ritual & {
      privateSourceText: string;
      sourceNotes: string[];
    };
    const document = createRitualVersionDocumentFromRitual(
      ritualWithStaleFields,
      { createdAtIso },
    );
    const result = validateRitualVersionDocument(document);

    expect(result.valid).toBe(false);
    expectFindingPath(result.findings, "ritual.privateSourceText");
    expectFindingPath(result.findings, "ritual.sourceNotes");
  });

  it("validates snapshot payloads against the exact version document", () => {
    const { ritualDocument, versionDocument } = createRitualDbDocumentPair(
      baseRitual,
      { createdAtIso },
    );
    const snapshot = createRitualValidationSnapshotDocument({
      id: "validation-test",
      ritualDocument,
      versionDocument,
      validatorVersion: "unit-test",
      generatedAtIso: createdAtIso,
    });
    const mismatched = {
      ...snapshot,
      contentHash: "fnv1a128:00000000000000000000000000000000",
    };

    expect(validateRitualValidationSnapshotDocument(
      snapshot,
      versionDocument,
    ).valid).toBe(true);

    const result = validateRitualValidationSnapshotDocument(
      mismatched,
      versionDocument,
    );

    expect(result.valid).toBe(false);
    expectFindingPath(result.findings, "contentHash");
  });
});
