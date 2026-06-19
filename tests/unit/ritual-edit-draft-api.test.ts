import { describe, expect, it } from "vitest";

import { createRitualDbMirrorDryRun } from "../../src/data/rituals/db-mirror";
import type {
  ReviewDecisionDocument,
  RitualAuditEventDocument,
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "../../src/data/rituals/db-documents";
import type { ApplyRitualEditDraftStore } from "../../src/data/rituals/ritual-edit-draft-apply";
import {
  createInMemoryRitualEditDraftStore,
  type RitualEditDraftStore,
} from "../../src/data/rituals/ritual-edit-drafts";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import { handleRitualEditDraftApi } from "../../src/server/ritual-edit-draft-api";

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

function createFixtureStore() {
  const report = createRitualDbMirrorDryRun(sourceBackedRituals.slice(0, 1), {
    generatedAtIso: "2026-06-13T00:00:00.000Z",
  });
  const record = report.mirrored[0];
  const store = createInMemoryRitualEditDraftStore();

  return { record, store };
}

function createApplyFixtureStore() {
  const report = createRitualDbMirrorDryRun(sourceBackedRituals.slice(0, 1), {
    generatedAtIso: "2026-06-13T00:00:00.000Z",
  });
  const record = report.mirrored[0];
  const drafts = createInMemoryRitualEditDraftStore();
  const rituals = new Map<string, RitualDocument>([
    [record.ritualDocument.id, JSON.parse(JSON.stringify(record.ritualDocument))],
  ]);
  const versions = new Map<string, RitualVersionDocument>([
    [record.versionDocument.versionId, JSON.parse(JSON.stringify(record.versionDocument))],
  ]);
  const snapshots = new Map<string, RitualValidationSnapshotDocument>();
  const decisions = new Map<string, ReviewDecisionDocument>();
  const audits = new Map<string, RitualAuditEventDocument>();
  const store: ApplyRitualEditDraftStore = {
    ...drafts,
    async getRitualDocument(ritualId) {
      const document = rituals.get(ritualId);

      return document ? JSON.parse(JSON.stringify(document)) : undefined;
    },
    async getRitualVersionDocument(versionId) {
      const document = versions.get(versionId);

      return document ? JSON.parse(JSON.stringify(document)) : undefined;
    },
    async commitApplyRitualEditDraftPlan(plan) {
      for (const write of plan.writes) {
        switch (write.collection) {
          case "rituals":
            rituals.set(write.id, JSON.parse(JSON.stringify(write.document)));
            break;
          case "ritualVersions":
            versions.set(write.id, JSON.parse(JSON.stringify(write.document)));
            break;
          case "ritualValidationSnapshots":
            snapshots.set(write.id, JSON.parse(JSON.stringify(write.document)));
            break;
          case "reviewDecisions":
            decisions.set(write.id, JSON.parse(JSON.stringify(write.document)));
            break;
          case "ritualAuditEvents":
            audits.set(write.id, JSON.parse(JSON.stringify(write.document)));
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

function createDependencies(input: {
  store: RitualEditDraftStore;
  versionDocument: ReturnType<typeof createFixtureStore>["record"]["versionDocument"];
  applyStore?: ApplyRitualEditDraftStore;
}) {
  return {
    draftStore: input.store,
    applyStore: input.applyStore,
    verifyIdToken: async () => ({ uid: "editor-1" }),
    authorize: () => true,
    getRitualVersionDocument: async (versionId: string) =>
      input.versionDocument.versionId === versionId
        ? input.versionDocument
        : undefined,
    now: () => "2026-06-14T12:00:00.000Z",
  };
}

describe("Ritual edit draft API", () => {
  it("creates an edit draft from an existing version without mutating the published version", async () => {
    const { record, store } = createFixtureStore();
    const response = createResponse();
    const beforeVersion = JSON.stringify(record.versionDocument);

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "load_or_create",
          ritualId: record.ritualDocument.id,
          versionId: record.versionDocument.versionId,
        },
      },
      response.response,
      createDependencies({ store, versionDocument: record.versionDocument }),
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        valid: true,
        draft: expect.objectContaining({
          collection: "ritualEditDrafts",
          ritualId: record.ritualDocument.id,
          baseVersionId: record.versionDocument.versionId,
          baseContentHash: record.versionDocument.contentHash,
        }),
      }),
    );
    expect(JSON.stringify(record.versionDocument)).toBe(beforeVersion);
  });

  it("saves edited draft body, search metadata, and selection metadata without mutating published state", async () => {
    const { record, store } = createFixtureStore();
    const dependencies = createDependencies({
      store,
      versionDocument: record.versionDocument,
    });
    const createResponseBody = createResponse();

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "load_or_create",
          ritualId: record.ritualDocument.id,
          versionId: record.versionDocument.versionId,
        },
      },
      createResponseBody.response,
      dependencies,
    );

    const created = createResponseBody.body as {
      valid: true;
      draft: { id: string };
    };
    const draftBeforeSave = store.getAllDrafts()[0];
    const lifecycleBeforeSave = JSON.stringify(record.ritualDocument.lifecycle);
    const response = createResponse();

    const nextDraftBuffer = {
      ...draftBeforeSave.draftBuffer,
      presentation: {
        headline: "Edited headline",
        practice: "Edited practice with words inline.",
        intention: "Edited intention",
        bestWindow: "Edited window",
        questionToCarry: "Edited question?",
      },
      searchMetadata: {
        ...draftBeforeSave.draftBuffer.searchMetadata,
        tags: ["edited", "table"],
        keywords: ["opening", "table"],
        materials: ["cloth"],
        places: ["altar"],
      },
      recommendationMetadata: {
        ...draftBeforeSave.draftBuffer.recommendationMetadata,
        purposes: {
          primary: "opening" as const,
          secondary: ["tending" as const],
          refinement: "edited fit",
        },
        carriers: {
          primary: "table" as const,
          secondary: ["words" as const],
        },
      },
    };

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "save",
          draftId: created.draft.id,
          draftBuffer: nextDraftBuffer,
        },
      },
      response.response,
      dependencies,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        valid: true,
        draft: expect.objectContaining({
          saveState: "saved",
          draftBuffer: expect.objectContaining({
            presentation: {
              headline: "Edited headline",
              practice: "Edited practice with words inline.",
              intention: "Edited intention",
              bestWindow: "Edited window",
              questionToCarry: "Edited question?",
            },
            searchMetadata: expect.objectContaining({
              tags: ["edited", "table"],
              keywords: ["opening", "table"],
              materials: ["cloth"],
              places: ["altar"],
            }),
            recommendationMetadata: expect.objectContaining({
              purposes: expect.objectContaining({
                primary: "opening",
                secondary: ["tending"],
              }),
              carriers: expect.objectContaining({
                primary: "table",
                secondary: ["words"],
              }),
            }),
          }),
        }),
      }),
    );
    const draftAfterSave = store.getAllDrafts()[0];
    expect(draftAfterSave.draftBuffer.availability).toEqual(
      draftBeforeSave.draftBuffer.availability,
    );
    expect(JSON.stringify(record.ritualDocument.lifecycle)).toBe(lifecycleBeforeSave);
  });

  it("saves through one draft read instead of reading before the save helper", async () => {
    const { record, store } = createFixtureStore();
    let getDraftCalls = 0;
    const countedStore: RitualEditDraftStore = {
      getDraft: async (draftId) => {
        getDraftCalls += 1;
        return store.getDraft(draftId);
      },
      setDraft: (draft) => store.setDraft(draft),
      listDraftsForRitual: (ritualId) => store.listDraftsForRitual(ritualId),
    };
    const dependencies = createDependencies({
      store: countedStore,
      versionDocument: record.versionDocument,
    });
    const createResponseBody = createResponse();

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "load_or_create",
          ritualId: record.ritualDocument.id,
          versionId: record.versionDocument.versionId,
        },
      },
      createResponseBody.response,
      dependencies,
    );

    const created = createResponseBody.body as {
      valid: true;
      draft: { id: string; draftBuffer: typeof record.versionDocument.ritual };
    };
    const draftBeforeSave = store.getAllDrafts()[0];
    const response = createResponse();
    getDraftCalls = 0;

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "save",
          draftId: created.draft.id,
          draftBuffer: draftBeforeSave.draftBuffer,
        },
      },
      response.response,
      dependencies,
    );

    expect(response.statusCode).toBe(200);
    expect(getDraftCalls).toBe(1);
  });

  it("returns a quota-specific save failure when Firestore refuses the draft read", async () => {
    const { record } = createFixtureStore();
    const quotaError = Object.assign(
      new Error("8 RESOURCE_EXHAUSTED: Quota exceeded."),
      { code: 8 },
    );
    const store: RitualEditDraftStore = {
      getDraft: async () => {
        throw quotaError;
      },
      setDraft: async () => undefined,
      listDraftsForRitual: async () => [],
    };
    const response = createResponse();

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "save",
          draftId: "draft-quota",
          draftBuffer: {
            id: record.ritualDocument.id,
            origin: {
              type: "source",
              sourceGrounding: [],
            },
            presentation: {
              headline: "Quota draft",
              practice: "Practice",
              intention: "Intention",
              bestWindow: "Window",
              questionToCarry: "Question?",
            },
          },
        },
      },
      response.response,
      createDependencies({ store, versionDocument: record.versionDocument }),
    );

    expect(response.statusCode).toBe(429);
    expect(response.body).toEqual({
      valid: false,
      findings: [
        {
          path: "firestore",
          message: "Firestore quota was exceeded, so the Ritual edit draft was not saved.",
          severity: "error",
        },
      ],
    });
  });

  it("applies a saved draft through the protected API action", async () => {
    const { record, store, drafts, rituals, versions, snapshots, decisions, audits } =
      createApplyFixtureStore();
    const dependencies = createDependencies({
      store,
      applyStore: store,
      versionDocument: record.versionDocument,
    });
    const createResponseBody = createResponse();

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "load_or_create",
          ritualId: record.ritualDocument.id,
          versionId: record.versionDocument.versionId,
        },
      },
      createResponseBody.response,
      dependencies,
    );

    const draft = drafts.getAllDrafts()[0];
    const saveResponse = createResponse();

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "save",
          draftId: draft.id,
          draftBuffer: {
            ...draft.draftBuffer,
            presentation: {
              ...draft.draftBuffer.presentation,
              headline: "API applied headline",
            },
          },
        },
      },
      saveResponse.response,
      dependencies,
    );

    const applyResponse = createResponse();
    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "apply_changes",
          draftId: draft.id,
        },
      },
      applyResponse.response,
      dependencies,
    );

    expect(applyResponse.statusCode).toBe(200);
    expect(applyResponse.body).toEqual(
      expect.objectContaining({
        valid: true,
        draft: expect.objectContaining({
          status: "applied",
          appliedVersionId: expect.any(String),
        }),
        appliedVersionId: expect.any(String),
        recommendationHeld: false,
      }),
    );
    const body = applyResponse.body as {
      valid: true;
      appliedVersionId: string;
    };
    expect(rituals.get(record.ritualDocument.id)?.currentVersionId).toBe(
      body.appliedVersionId,
    );
    expect(versions.get(body.appliedVersionId)?.ritual.presentation.headline).toBe(
      "API applied headline",
    );
    expect(snapshots.size).toBe(1);
    expect(decisions.size).toBe(1);
    expect(audits.size).toBe(1);
  });

  it("rejects attempts to save whyThisFits as a canonical draft body field", async () => {
    const { record, store } = createFixtureStore();
    const dependencies = createDependencies({
      store,
      versionDocument: record.versionDocument,
    });
    const createResponseBody = createResponse();

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "load_or_create",
          ritualId: record.ritualDocument.id,
          versionId: record.versionDocument.versionId,
        },
      },
      createResponseBody.response,
      dependencies,
    );

    const created = createResponseBody.body as {
      valid: true;
      draft: { id: string };
    };
    const draftBeforeSave = store.getAllDrafts()[0];
    const response = createResponse();

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "save",
          draftId: created.draft.id,
          draftBuffer: {
            ...draftBeforeSave.draftBuffer,
            presentation: {
              headline: "Edited headline",
              practice: "Edited practice",
              intention: "Edited intention",
              bestWindow: "Edited window",
              whyThisFits: "Do not save me",
              questionToCarry: "Edited question?",
            },
          },
        },
      },
      response.response,
      dependencies,
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        valid: false,
        findings: [
          expect.objectContaining({
            path: "request",
          }),
        ],
      }),
    );
  });
});
