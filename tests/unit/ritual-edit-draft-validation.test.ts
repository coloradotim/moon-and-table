import { describe, expect, it } from "vitest";

import { createRitualVersionDocumentFromRitual } from "../../src/data/rituals/db-documents";
import {
  createDraftFromRitualVersion,
  createInMemoryRitualEditDraftStore,
  type RitualEditDraftDocument,
} from "../../src/data/rituals/ritual-edit-drafts";
import { validateRitualEditDraft } from "../../src/data/rituals/ritual-edit-draft-validation";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

const createdAtIso = "2026-06-14T12:00:00.000Z";
const baseRitual = sourceBackedRituals.find((ritual) =>
  ritual.status === "recommendable" &&
  (ritual.recommendationMetadata.eligibility.missing ?? []).length === 0
) ?? sourceBackedRituals[0];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

async function createCleanDraft(): Promise<{
  draft: RitualEditDraftDocument;
  versionDocument: ReturnType<typeof createRitualVersionDocumentFromRitual>;
}> {
  const store = createInMemoryRitualEditDraftStore();
  const versionDocument = createRitualVersionDocumentFromRitual(baseRitual, {
    createdAtIso,
  });
  const draft = await createDraftFromRitualVersion({
    store,
    versionDocument,
    draftId: "draft-validation",
    actor: "owner",
    createdAtIso,
  });

  return { draft, versionDocument };
}

describe("Ritual edit draft validation", () => {
  it("accepts a clean draft created from a published Ritual version", async () => {
    const { draft } = await createCleanDraft();

    const report = validateRitualEditDraft(draft);

    expect(report.valid).toBe(true);
    expect(report.summaryLabel).toBe("Validation clean");
    expect(report.findings).toEqual([]);
    expect(report.sectionSummaries.find((summary) => summary.section === "body"))
      .toMatchObject({ errors: 0, warnings: 0 });
  });

  it("reports blocking body errors with field and section mapping", async () => {
    const { draft } = await createCleanDraft();
    const invalidDraft: RitualEditDraftDocument = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        presentation: {
          ...draft.draftBuffer.presentation,
          headline: " ",
          practice: "",
        },
      },
    };

    const report = validateRitualEditDraft(invalidDraft);

    expect(report.valid).toBe(false);
    expect(report.summaryLabel).toBe("2 blocking issues");
    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "draftBuffer.presentation.headline",
          section: "body",
          field: "headline",
          severity: "error",
        }),
        expect.objectContaining({
          path: "draftBuffer.presentation.practice",
          section: "body",
          field: "practice",
          severity: "error",
        }),
      ]),
    );
    expect(report.sectionSummaries.find((summary) => summary.section === "body"))
      .toMatchObject({ errors: 2, warnings: 0 });
  });

  it("reports recommendation readiness holds as warnings", async () => {
    const { draft } = await createCleanDraft();
    const warningDraft: RitualEditDraftDocument = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        recommendationMetadata: {
          ...draft.draftBuffer.recommendationMetadata,
          eligibility: {
            ...draft.draftBuffer.recommendationMetadata?.eligibility,
            recommendable: true,
            missing: ["needs_household_review"],
          },
        },
      },
    };

    const report = validateRitualEditDraft(warningDraft);

    expect(report.valid).toBe(true);
    expect(report.summaryLabel).toBe("1 warning");
    expect(report.findings).toEqual([
      expect.objectContaining({
        path: "draftBuffer.recommendationMetadata.eligibility.missing",
        section: "fit",
        severity: "warning",
      }),
    ]);
  });

  it("maps invalid selection metadata to editor fields", async () => {
    const { draft } = await createCleanDraft();
    const invalidDraft = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        recommendationMetadata: {
          ...draft.draftBuffer.recommendationMetadata,
          purposes: {
            primary: "unsupported-purpose",
            secondary: ["tending", "unsupported-purpose"],
            refinement: "",
          },
          carriers: {
            primary: "unsupported-carrier",
            secondary: ["words"],
          },
          capacity: {
            supports: ["only_a_little", "too_much"],
          },
          audience: {
            supports: [],
          },
          timing: {
            relationship: "whenever",
            contexts: ["new_moon", ""],
          },
          eligibility: {
            recommendable: true,
            missing: [],
          },
        },
      },
    } as unknown as RitualEditDraftDocument;

    const report = validateRitualEditDraft(invalidDraft);

    expect(report.valid).toBe(false);
    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "primaryPurpose",
          section: "fit",
        }),
        expect.objectContaining({
          field: "primaryCarrier",
          section: "fit",
        }),
        expect.objectContaining({
          field: "capacitySupports",
          section: "fit",
        }),
        expect.objectContaining({
          field: "audienceSupports",
          section: "fit",
        }),
        expect.objectContaining({
          field: "timingRelationship",
          section: "fit",
        }),
        expect.objectContaining({
          field: "timingContexts",
          section: "fit",
        }),
      ]),
    );
  });

  it("warns when timing contexts use broad bucket labels instead of specific signals", async () => {
    const { draft } = await createCleanDraft();
    const warningDraft: RitualEditDraftDocument = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        recommendationMetadata: {
          ...draft.draftBuffer.recommendationMetadata,
          timing: {
            relationship: "helpful",
            contexts: ["moon sign", "new moon"],
          },
        },
      },
    };

    const report = validateRitualEditDraft(warningDraft);

    expect(report.valid).toBe(true);
    expect(report.summaryLabel).toBe("1 warning");
    expect(report.findings).toEqual([
      expect.objectContaining({
        path: "draftBuffer.recommendationMetadata.timing.contexts.0",
        field: "timingContexts",
        section: "fit",
        severity: "warning",
        message: expect.stringContaining("specific timing signal"),
      }),
    ]);
  });

  it("warns when secondary purpose or carrier repeats the primary value", async () => {
    const { draft } = await createCleanDraft();
    const warningDraft: RitualEditDraftDocument = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        recommendationMetadata: {
          ...draft.draftBuffer.recommendationMetadata,
          purposes: {
            primary: "tending",
            secondary: ["tending", "marking"],
            refinement: "",
          },
          carriers: {
            primary: "table",
            secondary: ["table", "words"],
          },
        },
      },
    };

    const report = validateRitualEditDraft(warningDraft);

    expect(report.valid).toBe(true);
    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({
        field: "secondaryPurposes",
        severity: "warning",
        message: expect.stringContaining("repeat the primary purpose"),
      }),
      expect.objectContaining({
        field: "secondaryCarriers",
        severity: "warning",
        message: expect.stringContaining("repeat the primary carrier"),
      }),
    ]));
  });

  it("maps invalid search metadata to editor fields", async () => {
    const { draft } = await createCleanDraft();
    const invalidDraft = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        searchMetadata: {
          ...draft.draftBuffer.searchMetadata,
          tags: ["table", "table", ""],
          keywords: [],
          materials: ["paper"],
          places: ["altar"],
        },
      },
    } as unknown as RitualEditDraftDocument;

    const report = validateRitualEditDraft(invalidDraft);

    expect(report.valid).toBe(false);
    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "searchTags",
          section: "search",
          severity: "warning",
        }),
        expect.objectContaining({
          field: "searchTags",
          section: "search",
          severity: "error",
        }),
      ]),
    );
  });

  it("leaves unmapped findings in the other section", async () => {
    const { draft } = await createCleanDraft();
    const invalidDraft = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        unreviewedEditorMetadata: { note: "not part of the draft model" },
      },
    } as unknown as RitualEditDraftDocument;

    const report = validateRitualEditDraft(invalidDraft);

    expect(report.valid).toBe(false);
    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "draftBuffer.unreviewedEditorMetadata",
          section: "other",
        }),
      ]),
    );
  });

  it("detects unsafe private/source/debug fields without exposing contents", async () => {
    const { draft } = await createCleanDraft();
    const unsafeDraft = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        privateSourceText: "private copied source passage that must not render",
        searchMetadata: {
          ...draft.draftBuffer.searchMetadata,
          email: "person_a@example.com",
        },
      },
    } as unknown as RitualEditDraftDocument;

    const report = validateRitualEditDraft(unsafeDraft);
    const serializedReport = JSON.stringify(report);

    expect(report.valid).toBe(false);
    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "draftBuffer.privateSourceText",
          unsafeContentHidden: true,
        }),
        expect.objectContaining({
          path: "draftBuffer.searchMetadata.email",
          unsafeContentHidden: true,
        }),
      ]),
    );
    expect(serializedReport).not.toContain("private copied source passage");
    expect(serializedReport).not.toContain("person_a@example.com");
  });

  it("does not mutate the published Ritual version while validating drafts", async () => {
    const { draft, versionDocument } = await createCleanDraft();
    const originalVersionDocument = clone(versionDocument);

    validateRitualEditDraft({
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        presentation: {
          ...draft.draftBuffer.presentation,
          bestWindow: "",
        },
      },
    });

    expect(versionDocument).toEqual(originalVersionDocument);
  });
});
