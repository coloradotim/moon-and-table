import { describe, expect, it } from "vitest";

import {
  createManageRitualsViewModel,
  defaultManageRitualFilters,
} from "../../src/data/rituals/manage-rituals";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";

describe("Manage Rituals view model", () => {
  it("summarizes imported Ritual records with recommendation review overlays", () => {
    const viewModel = createManageRitualsViewModel(sourceBackedRituals);

    expect(viewModel.total).toBe(218);
    expect(viewModel.filteredTotal).toBe(218);
    expect(viewModel.filters).toEqual(defaultManageRitualFilters);
    expect(viewModel.counts.byStatus).toEqual({
      pilot: 0,
      draft: 0,
      reviewed: 36,
      recommendable: 182,
    });
    expect(viewModel.counts.byOrigin).toEqual({
      source: 218,
      household: 0,
    });
    expect(viewModel.counts.findable).toBe(218);
    expect(viewModel.counts.directUseEligible).toBe(218);
    expect(viewModel.counts.recommendationEligible).toBe(182);
    expect(viewModel.counts.recommendable).toBe(182);
    expect(viewModel.counts.withValidationFindings).toBe(0);
    expect(viewModel.counts.withMissingReadiness).toBe(36);
    expect(viewModel.rows.map((row) => row.id)).toEqual(
      expect.arrayContaining([
        "ritual-buckland-candle-prepare-table",
        "whitehurst-flower-on-the-table",
        "candidate.saint_thomas.intimate_altar_table",
        "candidate.moon_book.new_moon_table_seed",
        "candidate.anand.practice_night_commitment",
        "candidate.dominguez.glyph-as-mark",
      ]),
    );
    expect(
      viewModel.rows.filter((row) => row.missingReadiness.length > 0),
    ).toHaveLength(36);
    expect(
      viewModel.rows.some((row) =>
        row.missingReadiness.includes("timing_engine_wiring"),
      ),
    ).toBe(true);
  });

  it("filters by status, origin, readiness, and validation state", () => {
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { status: "draft" })
        .filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { status: "reviewed" })
        .filteredTotal,
    ).toBe(36);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { status: "recommendable" })
        .filteredTotal,
    ).toBe(182);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { origin: "source" })
        .filteredTotal,
    ).toBe(218);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { origin: "household" })
        .filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, {
        readiness: "missing_readiness",
      }).filteredTotal,
    ).toBe(36);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, {
        readiness: "recommendation_ready",
      }).filteredTotal,
    ).toBe(182);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, {
        readiness: "validation_findings",
      }).filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { validation: "valid" })
        .filteredTotal,
    ).toBe(218);
    expect(
      createManageRitualsViewModel(sourceBackedRituals, { validation: "findings" })
        .filteredTotal,
    ).toBe(0);
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
