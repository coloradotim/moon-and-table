import { describe, expect, it } from "vitest";

import {
  createManageRitualsViewModel,
  defaultManageRitualFilters,
} from "../../src/data/rituals/manage-rituals";
import { pilotRituals } from "../../src/data/rituals/pilot-rituals";

describe("Manage Rituals view model", () => {
  it("summarizes imported Ritual records without changing eligibility", () => {
    const viewModel = createManageRitualsViewModel(pilotRituals);

    expect(viewModel.total).toBe(3);
    expect(viewModel.filteredTotal).toBe(3);
    expect(viewModel.filters).toEqual(defaultManageRitualFilters);
    expect(viewModel.counts.byStatus).toEqual({
      pilot: 3,
      draft: 0,
      reviewed: 0,
      recommendable: 0,
    });
    expect(viewModel.counts.byOrigin).toEqual({
      source: 3,
      household: 0,
    });
    expect(viewModel.counts.findable).toBe(3);
    expect(viewModel.counts.directUseEligible).toBe(3);
    expect(viewModel.counts.recommendationEligible).toBe(0);
    expect(viewModel.counts.recommendable).toBe(0);
    expect(viewModel.counts.withValidationFindings).toBe(0);
    expect(viewModel.counts.withMissingReadiness).toBe(3);
    expect(viewModel.rows.map((row) => row.id)).toEqual([
      "ritual.wet_the_seed_and_wait",
      "ritual.set_grain_at_the_table",
      "ritual.kindle_the_first_household_light",
    ]);
    expect(
      viewModel.rows.every((row) =>
        row.missingReadiness.includes("pilot_review"),
      ),
    ).toBe(true);
  });

  it("filters by status, origin, readiness, and validation state", () => {
    expect(
      createManageRitualsViewModel(pilotRituals, { status: "pilot" })
        .filteredTotal,
    ).toBe(3);
    expect(
      createManageRitualsViewModel(pilotRituals, { status: "reviewed" })
        .filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(pilotRituals, { origin: "source" })
        .filteredTotal,
    ).toBe(3);
    expect(
      createManageRitualsViewModel(pilotRituals, { origin: "household" })
        .filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(pilotRituals, {
        readiness: "missing_readiness",
      }).filteredTotal,
    ).toBe(3);
    expect(
      createManageRitualsViewModel(pilotRituals, {
        readiness: "validation_findings",
      }).filteredTotal,
    ).toBe(0);
    expect(
      createManageRitualsViewModel(pilotRituals, { validation: "valid" })
        .filteredTotal,
    ).toBe(3);
    expect(
      createManageRitualsViewModel(pilotRituals, { validation: "findings" })
        .filteredTotal,
    ).toBe(0);
  });

  it("surfaces validation findings in the table rows", () => {
    const invalid = {
      ...pilotRituals[0],
      presentation: {
        ...pilotRituals[0].presentation,
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
