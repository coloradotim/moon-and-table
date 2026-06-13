import { describe, expect, it } from "vitest";

import {
  createManageRitualsViewModel,
  defaultManageRitualFilters,
} from "../../src/data/rituals/manage-rituals";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

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
});
