import { describe, expect, it } from "vitest";

import {
  createManageRitualsViewModel,
  defaultManageRitualFilters,
} from "../../src/data/rituals/manage-rituals";
import { createRitualDbMirrorDryRun } from "../../src/data/rituals/db-mirror";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

function createDbDocuments(rituals = sourceBackedRituals.slice(0, 3)) {
  const report = createRitualDbMirrorDryRun(rituals, {
    generatedAtIso: "2026-06-13T00:00:00.000Z",
  });

  expect(report.skipped).toEqual([]);

  return {
    ritualDocuments: report.mirrored.map((record) => record.ritualDocument),
    versionDocuments: report.mirrored.map((record) => record.versionDocument),
    validationSnapshots: report.mirrored.map((record) => record.validationSnapshot),
  };
}

describe("Manage Rituals view model", () => {
  it("summarizes imported Ritual records with recommendation review overlays", () => {
    const viewModel = createManageRitualsViewModel(sourceBackedRituals);

    expect(viewModel.total).toBe(528);
    expect(viewModel.filteredTotal).toBe(528);
    expect(viewModel.filters).toEqual(defaultManageRitualFilters);
    expect(viewModel.counts.byStatus).toEqual({
      pilot: 0,
      draft: 0,
      reviewed: 63,
      recommendable: 465,
    });
    expect(viewModel.counts.byOrigin).toEqual({
      source: 528,
      household: 0,
    });
    expect(viewModel.counts.findable).toBe(528);
    expect(viewModel.counts.directUseEligible).toBe(528);
    expect(viewModel.counts.recommendationEligible).toBe(465);
    expect(viewModel.counts.recommendable).toBe(465);
    expect(viewModel.counts.withValidationFindings).toBe(0);
    expect(viewModel.counts.withMissingReadiness).toBe(63);
    expect(viewModel.sourceOptions).toHaveLength(19);
    expect(viewModel.sourceOptions.map((option) => option.label)).toEqual(
      expect.arrayContaining([
        "Raymond Buckland, Practical Candleburning Rituals",
        "Laurel Woodward, Kitchen Witchery: Unlocking the Magick in Everyday Ingredients",
        "Herstik, Sacred Sex",
        "Carrellas, Urban Tantra",
        "Diaz, Plant Witchery",
      ]),
    );
    expect(viewModel.rows.map((row) => row.id)).toEqual(
      expect.arrayContaining([
        "ritual-buckland-candle-prepare-table",
        "whitehurst-flower-on-the-table",
        "candidate.saint_thomas.intimate_altar_table",
        "candidate.moon_book.new_moon_table_seed",
        "candidate.anand.practice_night_commitment",
        "candidate.dominguez.glyph-as-mark",
        "pw-diaz-sunflower-seed-tending",
      ]),
    );
    expect(
      viewModel.rows.filter((row) => row.missingReadiness.length > 0),
    ).toHaveLength(63);
    expect(
      viewModel.rows.some((row) =>
        row.missingReadiness.includes("planetary_day_or_hour_not_supported"),
      ),
    ).toBe(true);
  });

  it("filters by status, origin, source, readiness, and validation state", () => {
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { status: "draft" })
        .filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { status: "reviewed" })
        .filteredTotal,
    ).toBe(63);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { status: "recommendable" })
        .filteredTotal,
    ).toBe(465);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { origin: "source" })
        .filteredTotal,
    ).toBe(528);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { origin: "household" })
        .filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, {
        source: "raymond_buckland_practical_candleburning_rituals",
      }).filteredTotal,
    ).toBe(13);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, {
        readiness: "missing_readiness",
      }).filteredTotal,
    ).toBe(63);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, {
        readiness: "recommendation_ready",
      }).filteredTotal,
    ).toBe(465);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, {
        readiness: "validation_findings",
      }).filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { validation: "valid" })
        .filteredTotal,
    ).toBe(528);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { validation: "findings" })
        .filteredTotal,
    ).toBe(0);
  });

  it("sorts table rows by selected columns and direction", () => {
    const byStatus = createManageRitualsViewModel(sourceBackedRituals, {
      sort: "status",
    });
    const byRecommendationDesc = createManageRitualsViewModel(sourceBackedRituals, {
      sort: "recommendation",
      direction: "desc",
    });

    expect(byStatus.rows[0].status).toBe("reviewed");
    expect(byRecommendationDesc.rows[0].recommendable).toBe(true);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, {
        sort: "not_real" as never,
      }).filters.sort,
    ).toBe("headline");
  });

  it("surfaces validation findings in the table rows", () => {
    const invalid = {
      ...sourceBackedRituals[0],
      presentation: {
        ...sourceBackedRituals[0].presentation,
        headline: "",
      },
    };

    const viewModel = createManageRitualsViewModel([invalid]);

    expect(viewModel.counts.withValidationFindings).toBe(1);
    expect(viewModel.rows[0].validationFindings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "presentation.headline",
        }),
      ]),
    );
    expect(
      createManageRitualsViewModel([invalid], {
        validation: "findings",
      }).filteredTotal,
    ).toBe(1);
  });

  it("computes DB-backed review action eligibility from row state", () => {
    const rituals = sourceBackedRituals.slice(0, 2);
    const viewModel = createManageRitualsViewModel(
      rituals,
      undefined,
      {
        dbBacked: true,
        dbDocuments: createDbDocuments(rituals),
      },
    );
    const row = viewModel.rows[0];

    expect(row.reviewState.dbBacked).toBe(true);
    expect(row.reviewState.currentVersionId).toBeTruthy();
    expect(row.reviewState.validationSnapshotValid).toBe(true);
    expect(row.reviewState.actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: "hold_direct_use",
          enabled: true,
          requiresReason: true,
        }),
        expect.objectContaining({
          action: "add_review_note",
          enabled: true,
          requiresReason: true,
        }),
        expect.objectContaining({
          action: "promote_direct_use",
          label: "Show in library",
          enabled: false,
          disabledReason: "This Ritual is already shown in the library.",
        }),
      ]),
    );
  });

  it("overlays DB lifecycle state onto Manage rows without reloading Ritual content", () => {
    const rituals = sourceBackedRituals.slice(0, 1);
    const dbDocuments = createDbDocuments(rituals);
    const ritualDocument = dbDocuments.ritualDocuments[0];
    dbDocuments.ritualDocuments = [
      {
        ...ritualDocument,
        lifecycle: {
          ...ritualDocument.lifecycle,
          state: "reviewed",
          directUseEligible: true,
          recommendationEligible: false,
          recommendable: false,
          missingReadiness: ["manual_review_hold"],
          holdReasons: ["manual hold"],
        },
      },
    ];

    const viewModel = createManageRitualsViewModel(
      rituals,
      undefined,
      {
        dbBacked: true,
        dbDocuments,
      },
    );
    const row = viewModel.rows[0];

    expect(row.directUseEligible).toBe(true);
    expect(row.recommendationEligible).toBe(false);
    expect(row.recommendable).toBe(false);
    expect(row.missingReadiness).toEqual(["manual_review_hold"]);
    expect(row.reviewState.holdReasons).toEqual(["manual hold"]);
    expect(viewModel.counts.recommendable).toBe(0);
    expect(viewModel.counts.withMissingReadiness).toBe(1);
  });

  it("allows recommendation promotion when only recommendation review remains", () => {
    const rituals = sourceBackedRituals.slice(0, 1);
    const dbDocuments = createDbDocuments(rituals);
    const ritualDocument = dbDocuments.ritualDocuments[0];
    dbDocuments.ritualDocuments = [
      {
        ...ritualDocument,
        lifecycle: {
          ...ritualDocument.lifecycle,
          state: "reviewed",
          directUseEligible: true,
          recommendationEligible: false,
          recommendable: false,
          missingReadiness: ["recommendation_review"],
          holdReasons: ["direct_use_hold"],
        },
      },
    ];

    const viewModel = createManageRitualsViewModel(
      rituals,
      undefined,
      {
        dbBacked: true,
        dbDocuments,
      },
    );
    const promoteRecommendation = viewModel.rows[0].reviewState.actions.find(
      (action) => action.action === "promote_recommendation",
    );

    expect(promoteRecommendation).toEqual(expect.objectContaining({
      enabled: true,
      label: "Allow in Choose with me",
      disabledReason: undefined,
    }));
  });

  it("explains that direct use must be restored before recommendations", () => {
    const rituals = sourceBackedRituals.slice(0, 1);
    const dbDocuments = createDbDocuments(rituals);
    const ritualDocument = dbDocuments.ritualDocuments[0];
    dbDocuments.ritualDocuments = [
      {
        ...ritualDocument,
        lifecycle: {
          ...ritualDocument.lifecycle,
          state: "held",
          directUseEligible: false,
          recommendationEligible: false,
          recommendable: false,
          missingReadiness: ["direct_use_review", "recommendation_review"],
          holdReasons: ["direct_use_hold"],
        },
      },
    ];

    const viewModel = createManageRitualsViewModel(
      rituals,
      undefined,
      {
        dbBacked: true,
        dbDocuments,
      },
    );
    const promoteRecommendation = viewModel.rows[0].reviewState.actions.find(
      (action) => action.action === "promote_recommendation",
    );

    expect(promoteRecommendation).toEqual(expect.objectContaining({
      enabled: false,
      label: "Allow in Choose with me",
      disabledReason: "Show this Ritual in the library before allowing Choose with me.",
    }));
  });

  it("blocks review actions when the manager is not DB-backed", () => {
    const viewModel = createManageRitualsViewModel(sourceBackedRituals.slice(0, 1));
    const row = viewModel.rows[0];

    expect(row.reviewState.dbBacked).toBe(false);
    expect(row.reviewState.unavailableReason).toContain("Firestore");
    expect(row.reviewState.actions.every((action) => !action.enabled)).toBe(true);
  });
});
