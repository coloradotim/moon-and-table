import { describe, expect, it } from "vitest";

import { createRitualDbMirrorDryRun } from "../../src/data/rituals/db-mirror";
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

function createDependencies(input: {
  store: RitualEditDraftStore;
  versionDocument: ReturnType<typeof createFixtureStore>["record"]["versionDocument"];
}) {
  return {
    draftStore: input.store,
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

  it("autosaves only canonical body fields into the draft buffer", async () => {
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

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "autosave",
          draftId: created.draft.id,
          presentation: {
            headline: "Edited headline",
            practice: "Edited practice with words inline.",
            intention: "Edited intention",
            bestWindow: "Edited window",
            questionToCarry: "Edited question?",
          },
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
          }),
        }),
      }),
    );
    const draftAfterSave = store.getAllDrafts()[0];
    expect(draftAfterSave.draftBuffer.availability).toEqual(
      draftBeforeSave.draftBuffer.availability,
    );
    expect(draftAfterSave.draftBuffer.recommendationMetadata).toEqual(
      draftBeforeSave.draftBuffer.recommendationMetadata,
    );
    expect(JSON.stringify(record.ritualDocument.lifecycle)).toBe(lifecycleBeforeSave);
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
    const response = createResponse();

    await handleRitualEditDraftApi(
      {
        method: "POST",
        headers: { authorization: "Bearer valid-token" },
        body: {
          action: "save",
          draftId: created.draft.id,
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
