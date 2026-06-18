import { describe, expect, it } from "vitest";

import { createRitualDbMirrorDryRun } from "../../src/data/rituals/db-mirror";
import {
  createDraftFromRitualVersion,
  createInMemoryRitualEditDraftStore,
  type RitualEditDraftDocument,
} from "../../src/data/rituals/ritual-edit-drafts";
import {
  createRitualDraftChooseWithMePreview,
} from "../../src/data/rituals/draft-choose-with-me-preview";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";

const baseRitual = sourceBackedRituals.find(
  (ritual) => ritual.id === "ritual-buckland-candle-prepare-table",
) ?? sourceBackedRituals[0];

async function createDraft(
  ritual: Ritual = baseRitual,
): Promise<RitualEditDraftDocument> {
  const report = createRitualDbMirrorDryRun([ritual], {
    generatedAtIso: "2026-06-13T00:00:00.000Z",
  });
  const store = createInMemoryRitualEditDraftStore();

  expect(report.skipped).toEqual([]);

  return createDraftFromRitualVersion({
    store,
    versionDocument: report.mirrored[0].versionDocument,
    actor: "owner",
    draftId: `draft-${ritual.id}`,
  });
}

function cloneRitual(ritual: Ritual): Ritual {
  return JSON.parse(JSON.stringify(ritual)) as Ritual;
}

describe("Ritual draft Choose with me preview", () => {
  it("shows an eligible draft with generated explanation and fit details", async () => {
    const draft = await createDraft();
    const preview = createRitualDraftChooseWithMePreview({
      baseRitual,
      draft,
      sampleInput: {
        energyCapacity: "enough_to_engage",
        audience: "me",
        purpose: "opening",
        carrier: "table",
        timing: "none",
      },
    });

    expect(preview.status).toBe("eligible");
    expect(preview.statusLabel).toBe("Eligible for this sample");
    expect(preview.blockers).toEqual([]);
    expect(preview.selectedHeadline).toBe(baseRitual.presentation.headline);
    expect(preview.whyThisFits).toContain("This ritual turns opening");
    expect(preview.howThisWasChosen).toContain("Selection gates");
    expect(preview.capacityFit).toContain("Supports enough to participate");
    expect(preview.audienceFit).toBe("Supports me.");
    expect(preview.purposeCarrierFit).toBe("primary purpose matches; primary carrier matches.");
  });

  it("shows blocking gates when the draft is not recommendation eligible", async () => {
    const draft = await createDraft();
    const blockedDraft: RitualEditDraftDocument = {
      ...draft,
      draftBuffer: {
        ...draft.draftBuffer,
        availability: {
          ...draft.draftBuffer.availability,
          directUseEligible: false,
          recommendationEligible: false,
        },
      },
    };
    const preview = createRitualDraftChooseWithMePreview({
      baseRitual,
      draft: blockedDraft,
    });

    expect(preview.status).toBe("blocked");
    expect(preview.blockers).toContain(
      "Not eligible because the draft is not direct-use eligible yet.",
    );
    expect(preview.blockers).toContain(
      "Not eligible because the draft has not been promoted for recommendations.",
    );
    expect(preview.whyThisFits).toBeUndefined();
  });

  it("shows a timing block without leaking selector keys", async () => {
    const timingRitual: Ritual = {
      ...cloneRitual(baseRitual),
      recommendationMetadata: {
        ...cloneRitual(baseRitual).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["new moon"],
        },
      },
    };
    const draft = await createDraft(timingRitual);
    const preview = createRitualDraftChooseWithMePreview({
      baseRitual: timingRitual,
      draft,
      sampleInput: {
        energyCapacity: "enough_to_engage",
        audience: "me",
        purpose: "opening",
        carrier: "table",
        timing: "full_moon",
      },
    });
    const renderedText = [
      preview.statusLabel,
      ...preview.blockers,
      preview.timingImpact,
      preview.whyThisFits,
      preview.howThisWasChosen,
    ].join(" ");

    expect(preview.status).toBe("blocked");
    expect(preview.blockers).toEqual([
      "Not eligible because required timing is unsupported by the selected timing sample.",
    ]);
    expect(preview.timingImpact).toBe(
      "full moon did not satisfy the draft's required timing.",
    );
    expect(renderedText).not.toContain("required_timing_unmatched");
    expect(renderedText).not.toContain("preview.timing_window");
    expect(renderedText).not.toContain("moon_phase");
  });

  it("allows a required timing draft when the sample timing matches", async () => {
    const timingRitual: Ritual = {
      ...cloneRitual(baseRitual),
      recommendationMetadata: {
        ...cloneRitual(baseRitual).recommendationMetadata,
        timing: {
          relationship: "required",
          contexts: ["new moon"],
        },
      },
    };
    const draft = await createDraft(timingRitual);
    const preview = createRitualDraftChooseWithMePreview({
      baseRitual: timingRitual,
      draft,
      sampleInput: {
        energyCapacity: "enough_to_engage",
        audience: "me",
        purpose: "opening",
        carrier: "table",
        timing: "new_moon",
      },
    });

    expect(preview.status).toBe("eligible");
    expect(preview.timingImpact).toContain("new moon matched new moon");
    expect(preview.whyThisFits).toContain("This ritual turns opening");
  });

  it("does not mutate the draft or published Ritual while previewing", async () => {
    const draft = await createDraft();
    const beforeRitual = JSON.stringify(baseRitual);
    const beforeDraft = JSON.stringify(draft);

    createRitualDraftChooseWithMePreview({
      baseRitual,
      draft,
      sampleInput: {
        energyCapacity: "room_for_something_deeper",
        audience: "me",
        purpose: "opening",
        carrier: "table",
        timing: "mercury_retrograde",
      },
    });

    expect(JSON.stringify(baseRitual)).toBe(beforeRitual);
    expect(JSON.stringify(draft)).toBe(beforeDraft);
  });
});
