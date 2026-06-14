import { describe, expect, it } from "vitest";

import { createRitualVersionDocumentFromRitual } from "../../src/data/rituals/db-documents";
import {
  createAdminFirestoreRitualEditDraftStore,
  autosaveRitualEditDraft,
  createBlankHouseholdRitualDraft,
  createDraftFromRitualVersion,
  createInMemoryRitualEditDraftStore,
  discardRitualEditDraft,
  listRitualEditDraftsForRitual,
  loadRitualEditDraft,
  markRitualEditDraftSubmitted,
  RITUAL_EDIT_DRAFT_ACTORS,
  RITUAL_EDIT_DRAFT_SAVE_STATES,
  saveRitualEditDraft,
} from "../../src/data/rituals/ritual-edit-drafts";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

const createdAtIso = "2026-06-14T12:00:00.000Z";
const autosavedAtIso = "2026-06-14T12:03:00.000Z";
const manuallySavedAtIso = "2026-06-14T12:04:00.000Z";
const submittedAtIso = "2026-06-14T12:05:00.000Z";
const discardedAtIso = "2026-06-14T12:06:00.000Z";
const baseRitual = sourceBackedRituals[0];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe("Ritual edit drafts", () => {
  it("creates an active edit draft from an existing immutable Ritual version", async () => {
    const store = createInMemoryRitualEditDraftStore();
    const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
      createdBy: "codex",
    });

    const draft = await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-existing",
      actor: "person_a",
      createdAtIso,
    });

    expect(draft).toMatchObject({
      id: "draft-existing",
      collection: "ritualEditDrafts",
      ritualId: baseRitual.id,
      baseVersionId: versionDocument.versionId,
      baseContentHash: versionDocument.contentHash,
      draftSource: "existing_version",
      status: "active",
      saveState: "saved",
      createdBy: "person_a",
      updatedBy: "person_a",
    });
    expect(draft.draftBuffer.presentation).toEqual({
      headline: baseRitual.presentation.headline,
      practice: baseRitual.presentation.practice,
      intention: baseRitual.presentation.intention,
      bestWindow: baseRitual.presentation.bestWindow,
      questionToCarry: baseRitual.presentation.questionToCarry,
    });
    expect(draft.draftBuffer).not.toHaveProperty("whyThisFits");
    await expect(loadRitualEditDraft(store, "draft-existing")).resolves.toEqual(
      draft,
    );
  });

  it("creates a blank household-origin draft without source grounding", async () => {
    const store = createInMemoryRitualEditDraftStore();

    const draft = await createBlankHouseholdRitualDraft({
      store,
      ritualId: "household.new_ritual",
      draftId: "draft-household",
      actor: "person_b",
      createdAtIso,
    });

    expect(draft.baseVersionId).toBeUndefined();
    expect(draft.baseContentHash).toBeUndefined();
    expect(draft.draftSource).toBe("household_blank");
    expect(draft.draftBuffer.origin).toEqual({
      type: "household",
      householdContext: "",
    });
    expect(draft.draftBuffer.presentation).toEqual({
      headline: "",
      practice: "",
      intention: "",
      bestWindow: "",
      questionToCarry: "",
    });
    expect(draft.draftBuffer.availability).toEqual({
      findable: false,
      directUseEligible: false,
      recommendationEligible: false,
    });
  });

  it("autosaves only the mutable draft buffer", async () => {
    const store = createInMemoryRitualEditDraftStore();
    const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
    });
    const originalVersionDocument = clone(versionDocument);
    const draft = await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-autosave",
      actor: "person_a",
      createdAtIso,
    });

    const nextBuffer = {
      ...draft.draftBuffer,
      presentation: {
        ...draft.draftBuffer.presentation,
        headline: "Edited headline",
      },
    };
    const updated = await autosaveRitualEditDraft({
      store,
      draftId: draft.id,
      draftBuffer: nextBuffer,
      actor: "person_b",
      updatedAtIso: autosavedAtIso,
    });

    expect(updated.draftBuffer.presentation.headline).toBe("Edited headline");
    expect(updated.lastAutosavedAtIso).toBe(autosavedAtIso);
    expect(updated.lastManuallySavedAtIso).toBeUndefined();
    expect(updated.saveState).toBe("saved");
    expect(versionDocument).toEqual(originalVersionDocument);
  });

  it("manual save updates only the mutable draft buffer", async () => {
    const store = createInMemoryRitualEditDraftStore();
    const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
    });
    const originalVersionDocument = clone(versionDocument);
    const draft = await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-save-now",
      actor: "person_a",
      createdAtIso,
    });

    const updated = await saveRitualEditDraft({
      store,
      draftId: draft.id,
      draftBuffer: {
        ...draft.draftBuffer,
        presentation: {
          ...draft.draftBuffer.presentation,
          intention: "A cleaner intention.",
        },
      },
      actor: "person_a",
      updatedAtIso: manuallySavedAtIso,
    });

    expect(updated.draftBuffer.presentation.intention).toBe(
      "A cleaner intention.",
    );
    expect(updated.lastManuallySavedAtIso).toBe(manuallySavedAtIso);
    expect(updated.lastAutosavedAtIso).toBeUndefined();
    expect(versionDocument).toEqual(originalVersionDocument);
  });

  it("marks drafts discarded without mutating published content", async () => {
    const store = createInMemoryRitualEditDraftStore();
    const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
    });
    const originalPublishedRitual = clone(versionDocument.ritual);
    const draft = await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-discard",
      actor: "person_a",
      createdAtIso,
    });

    const discarded = await discardRitualEditDraft({
      store,
      draftId: draft.id,
      actor: "household",
      updatedAtIso: discardedAtIso,
    });

    expect(discarded.status).toBe("discarded");
    expect(discarded.discardedBy).toBe("household");
    expect(discarded.discardedAtIso).toBe(discardedAtIso);
    expect(versionDocument.ritual).toEqual(originalPublishedRitual);
  });

  it("marks drafts submitted without creating or mutating immutable versions", async () => {
    const store = createInMemoryRitualEditDraftStore();
    const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
    });
    const originalVersionDocument = clone(versionDocument);
    const draft = await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-submit",
      actor: "person_a",
      createdAtIso,
    });

    const submitted = await markRitualEditDraftSubmitted({
      store,
      draftId: draft.id,
      actor: "person_b",
      updatedAtIso: submittedAtIso,
    });

    expect(submitted.status).toBe("submitted");
    expect(submitted.submittedBy).toBe("person_b");
    expect(submitted.submittedAtIso).toBe(submittedAtIso);
    expect(store.getAllDrafts()).toHaveLength(1);
    expect(versionDocument).toEqual(originalVersionDocument);
  });

  it("lists drafts for a Ritual and represents both household maintainers with safe actor IDs", async () => {
    const store = createInMemoryRitualEditDraftStore();
    const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
    });
    const first = await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-person-a",
      actor: "person_a",
      createdAtIso,
    });
    const second = await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-person-b",
      actor: "person_b",
      createdAtIso: manuallySavedAtIso,
    });

    const drafts = await listRitualEditDraftsForRitual(store, baseRitual.id);

    expect(drafts.map((draft) => draft.id)).toEqual([second.id, first.id]);
    expect(drafts.map((draft) => draft.createdBy)).toEqual([
      "person_b",
      "person_a",
    ]);
    expect(RITUAL_EDIT_DRAFT_ACTORS).toEqual(
      expect.arrayContaining(["person_a", "person_b", "household"]),
    );
    expect(RITUAL_EDIT_DRAFT_SAVE_STATES).toEqual([
      "idle",
      "saving",
      "saved",
      "unsaved_changes",
      "save_failed",
    ]);
    expect(JSON.stringify(drafts)).not.toContain("contributedBy");
  });

  it("rejects draft saves that target a different Ritual id", async () => {
    const store = createInMemoryRitualEditDraftStore();
    const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
    });
    const draft = await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-wrong-buffer",
      actor: "person_a",
      createdAtIso,
    });

    await expect(
      saveRitualEditDraft({
        store,
        draftId: draft.id,
        draftBuffer: {
          ...draft.draftBuffer,
          id: "different-ritual",
        },
        actor: "person_a",
        updatedAtIso: manuallySavedAtIso,
      }),
    ).rejects.toThrow("Draft buffer ritual id must match");
  });

  it("persists drafts through the Admin Firestore ritualEditDrafts store adapter", async () => {
    const documents = new Map<string, unknown>();
    const store = createAdminFirestoreRitualEditDraftStore({
      collection(collectionName) {
        expect(collectionName).toBe("ritualEditDrafts");

        return {
          doc(id) {
            return {
              async get() {
                return {
                  exists: documents.has(id),
                  data: () => documents.get(id),
                };
              },
              async set(document) {
                documents.set(id, document);
              },
            };
          },
          async get() {
            return {
              docs: [...documents.values()].map((document) => ({
                exists: true,
                data: () => document,
              })),
            };
          },
        };
      },
    });
    const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
      createdAtIso,
    });

    await createDraftFromRitualVersion({
      store,
      versionDocument,
      draftId: "draft-admin-firestore",
      actor: "person_a",
      createdAtIso,
    });

    await expect(
      loadRitualEditDraft(store, "draft-admin-firestore"),
    ).resolves.toMatchObject({
      id: "draft-admin-firestore",
      collection: "ritualEditDrafts",
      ritualId: baseRitual.id,
    });
    await expect(
      listRitualEditDraftsForRitual(store, baseRitual.id),
    ).resolves.toHaveLength(1);
  });
});
