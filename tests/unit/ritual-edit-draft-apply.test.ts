import { describe, expect, it } from "vitest";

import { createRitualDbMirrorDryRun } from "../../src/data/rituals/db-mirror";
import type {
  ReviewDecisionDocument,
  RitualAuditEventDocument,
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "../../src/data/rituals/db-documents";
import {
  applyRitualEditDraft,
  type ApplyRitualEditDraftStore,
} from "../../src/data/rituals/ritual-edit-draft-apply";
import {
  createDraftFromRitualVersion,
  createInMemoryRitualEditDraftStore,
  saveRitualEditDraft,
  type RitualEditDraftDocument,
} from "../../src/data/rituals/ritual-edit-drafts";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

const createdAtIso = "2026-06-14T12:00:00.000Z";
const savedAtIso = "2026-06-14T12:05:00.000Z";
const appliedAtIso = "2026-06-14T12:10:00.000Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createFixture() {
  const report = createRitualDbMirrorDryRun(sourceBackedRituals.slice(0, 1), {
    generatedAtIso: createdAtIso,
  });
  const record = report.mirrored[0];
  const drafts = createInMemoryRitualEditDraftStore();
  const rituals = new Map<string, RitualDocument>([
    [record.ritualDocument.id, clone(record.ritualDocument)],
  ]);
  const versions = new Map<string, RitualVersionDocument>([
    [record.versionDocument.versionId, clone(record.versionDocument)],
  ]);
  const snapshots = new Map<string, RitualValidationSnapshotDocument>();
  const decisions = new Map<string, ReviewDecisionDocument>();
  const audits = new Map<string, RitualAuditEventDocument>();
  const store: ApplyRitualEditDraftStore = {
    ...drafts,
    async getRitualDocument(ritualId) {
      const document = rituals.get(ritualId);

      return document ? clone(document) : undefined;
    },
    async getRitualVersionDocument(versionId) {
      const document = versions.get(versionId);

      return document ? clone(document) : undefined;
    },
    async commitApplyRitualEditDraftPlan(plan) {
      for (const write of plan.writes) {
        switch (write.collection) {
          case "rituals":
            rituals.set(write.id, clone(write.document));
            break;
          case "ritualVersions":
            versions.set(write.id, clone(write.document));
            break;
          case "ritualValidationSnapshots":
            snapshots.set(write.id, clone(write.document));
            break;
          case "reviewDecisions":
            decisions.set(write.id, clone(write.document));
            break;
          case "ritualAuditEvents":
            audits.set(write.id, clone(write.document));
            break;
          case "ritualEditDrafts":
            await drafts.setDraft(write.document);
            break;
        }
      }
    },
  };

  return { record, store, drafts, rituals, versions, snapshots, decisions, audits };
}

async function createSavedDraft(input: {
  store: ApplyRitualEditDraftStore;
  versionDocument: RitualVersionDocument;
  mutate?: (draft: RitualEditDraftDocument) => RitualEditDraftDocument;
}): Promise<RitualEditDraftDocument> {
  const draft = await createDraftFromRitualVersion({
    store: input.store,
    versionDocument: input.versionDocument,
    draftId: "draft-apply",
    actor: "person_a",
    createdAtIso,
  });
  const mutated = input.mutate ? input.mutate(clone(draft)) : draft;

  return saveRitualEditDraft({
    store: input.store,
    draftId: draft.id,
    draftBuffer: mutated.draftBuffer,
    actor: "person_a",
    updatedAtIso: savedAtIso,
  });
}

describe("Ritual edit draft apply", () => {
  it("applies a saved existing draft as a new immutable live version", async () => {
    const { record, store, rituals, versions, snapshots, decisions, audits, drafts } =
      createFixture();
    const originalVersion = clone(record.versionDocument);
    const draft = await createSavedDraft({
      store,
      versionDocument: record.versionDocument,
      mutate: (input) => ({
        ...input,
        draftBuffer: {
          ...input.draftBuffer,
          presentation: {
            ...input.draftBuffer.presentation,
            headline: "Edited live headline",
          },
        },
      }),
    });

    const result = await applyRitualEditDraft({
      store,
      draftId: draft.id,
      actor: "person_a",
      appliedAtIso,
    });

    expect(result.valid).toBe(true);
    if (!result.valid) {
      return;
    }
    expect(result.plan.recommendationHeld).toBe(false);
    expect(result.plan.versionDocument.versionId).not.toBe(
      record.versionDocument.versionId,
    );
    expect(result.plan.versionDocument.ritual.presentation.headline).toBe(
      "Edited live headline",
    );
    expect(result.plan.versionDocument.supersedesVersionId).toBe(
      record.versionDocument.versionId,
    );
    expect(versions.get(record.versionDocument.versionId)).toEqual(originalVersion);
    expect(versions.get(result.plan.versionDocument.versionId)).toEqual(
      result.plan.versionDocument,
    );
    expect(rituals.get(record.ritualDocument.id)?.currentVersionId).toBe(
      result.plan.versionDocument.versionId,
    );
    expect(rituals.get(record.ritualDocument.id)?.publishedVersionId).toBe(
      result.plan.versionDocument.versionId,
    );
    expect(rituals.get(record.ritualDocument.id)?.searchIndex.headline).toBe(
      "Edited live headline",
    );
    expect(snapshots.has(result.plan.validationSnapshotDocument.id)).toBe(true);
    expect(decisions.get(result.plan.reviewDecisionDocument.id)?.decisionType).toBe(
      "apply_draft_changes",
    );
    expect(audits.get(result.plan.auditEventDocument.id)?.eventType).toBe(
      "ritual_draft_applied",
    );
    expect(drafts.getAllDrafts()[0]).toMatchObject({
      status: "applied",
      appliedBy: "person_a",
      appliedAtIso,
      appliedVersionId: result.plan.versionDocument.versionId,
    });
    expect(
      rituals.get(record.ritualDocument.id)?.versionHistory.supersededVersionIds,
    ).toContain(record.versionDocument.versionId);
  });

  it("holds Choose with me when selector-relevant metadata changes", async () => {
    const { record, store } = createFixture();
    const draft = await createSavedDraft({
      store,
      versionDocument: record.versionDocument,
      mutate: (input) => ({
        ...input,
        draftBuffer: {
          ...input.draftBuffer,
          recommendationMetadata: {
            ...input.draftBuffer.recommendationMetadata,
            timing: {
              ...input.draftBuffer.recommendationMetadata?.timing,
              relationship: "preferred",
              contexts: [
                ...(input.draftBuffer.recommendationMetadata?.timing?.contexts ?? []),
                "new moon",
              ],
            },
          },
        },
      }),
    });

    const result = await applyRitualEditDraft({
      store,
      draftId: draft.id,
      actor: "person_b",
      appliedAtIso,
    });

    expect(result.valid).toBe(true);
    if (!result.valid) {
      return;
    }
    expect(result.plan.recommendationHeld).toBe(true);
    expect(result.plan.ritualDocumentAfter.lifecycle.directUseEligible).toBe(
      record.ritualDocument.lifecycle.directUseEligible,
    );
    expect(result.plan.ritualDocumentAfter.lifecycle.recommendationEligible).toBe(
      false,
    );
    expect(result.plan.ritualDocumentAfter.lifecycle.missingReadiness).toContain(
      "recommendation_review",
    );
    expect(result.plan.ritualDocumentAfter.lifecycle.holdReasons).toContain(
      "recommendation_metadata_changed",
    );
    expect(result.plan.reviewDecisionDocument.reasons.join(" ")).toContain(
      "Choose with me held",
    );
  });

  it("refuses blocking validation errors and unsafe private/source fields", async () => {
    const { record, store } = createFixture();
    const draft = await createSavedDraft({
      store,
      versionDocument: record.versionDocument,
      mutate: (input) => ({
        ...input,
        draftBuffer: {
          ...input.draftBuffer,
          presentation: {
            ...input.draftBuffer.presentation,
            headline: "",
          },
          privateSourceText: "do not store",
        } as typeof input.draftBuffer & { privateSourceText: string },
      }),
    });

    const result = await applyRitualEditDraft({
      store,
      draftId: draft.id,
      actor: "person_a",
      appliedAtIso,
    });

    expect(result.valid).toBe(false);
    if (result.valid) {
      return;
    }
    expect(result.findings.map((finding) => finding.path)).toEqual(
      expect.arrayContaining([
        "draftBuffer.presentation.headline",
        "draftBuffer.privateSourceText",
      ]),
    );
  });

  it("refuses base-version drift instead of overwriting newer live content", async () => {
    const { record, store, drafts } = createFixture();
    const draft = await createSavedDraft({
      store,
      versionDocument: record.versionDocument,
    });
    await drafts.setDraft({
      ...draft,
      baseContentHash: "fnv1a128:00000000000000000000000000000000",
    });

    const result = await applyRitualEditDraft({
      store,
      draftId: draft.id,
      actor: "person_a",
      appliedAtIso,
    });

    expect(result.valid).toBe(false);
    if (result.valid) {
      return;
    }
    expect(result.findings).toEqual([
      expect.objectContaining({
        path: "baseVersionId",
        message:
          "This draft is based on an older live version. Reload or compare before applying.",
      }),
    ]);
  });
});
