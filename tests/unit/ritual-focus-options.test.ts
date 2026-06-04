import { describe, expect, it } from "vitest";

import {
  getRitualFocusOptionByKey,
  heldForLaterRitualFocusLabels,
  internalOnlyRitualFocusThemeKeys,
  ritualFocusOptions,
  RITUAL_FOCUS_VISIBLE_LABELS,
} from "../../src/data/ritual-focus-options";

const requiredLabels = [
  "Getting grounded",
  "Making a beginning",
  "Clearing something out",
  "Resting",
  "Saying something clearly",
  "Tending us",
  "Tending the home",
  "Marking a threshold",
  "Something else",
];

describe("ritual focus options", () => {
  it("defines the required visible v1 labels in order", () => {
    expect(RITUAL_FOCUS_VISIBLE_LABELS).toEqual(requiredLabels);
  });

  it("keeps each scoring focus connected to generator-usable metadata", () => {
    for (const option of ritualFocusOptions) {
      expect(option.themeKeys.length, option.key).toBeGreaterThan(0);

      if (!option.drivesScoringByDefault) {
        continue;
      }

      const metadataCount =
        option.ritualStyleHints.length +
        (option.timingSignalKeys?.length ?? 0) +
        (option.symbolicCardKeys?.length ?? 0);

      expect(metadataCount, option.key).toBeGreaterThan(0);
    }
  });

  it("keeps Something else from driving scoring by default", () => {
    const option = getRitualFocusOptionByKey("something_else");

    expect(option.label).toBe("Something else");
    expect(option.drivesScoringByDefault).toBe(false);
    expect(option.ritualStyleHints).toEqual([]);
    expect(option.timingSignalKeys ?? []).toEqual([]);
    expect(option.symbolicCardKeys ?? []).toEqual([]);
  });

  it("does not make Making a beginning ineligible because of waning or dark timing", () => {
    const option = getRitualFocusOptionByKey("making_a_beginning");
    const serializedOption = JSON.stringify(option).toLowerCase();

    expect(option.label).toBe("Making a beginning");
    expect(option.timingSignalKeys).toContain("moon.new");
    expect(option.ritualStyleHints).toEqual(
      expect.arrayContaining(["threshold_reset", "reflection"]),
    );
    expect(serializedOption).not.toContain("waning");
    expect(serializedOption).not.toContain("dark");
  });

  it("keeps held-for-later and internal-only options out of visible v1 labels", () => {
    for (const label of heldForLaterRitualFocusLabels) {
      expect(RITUAL_FOCUS_VISIBLE_LABELS).not.toContain(label);
    }

    for (const themeKey of internalOnlyRitualFocusThemeKeys) {
      expect(RITUAL_FOCUS_VISIBLE_LABELS.join(" ").toLowerCase()).not.toContain(
        themeKey.replaceAll("_", " "),
      );
    }
  });

  it("contains no private real data", () => {
    const serializedOptions = JSON.stringify(ritualFocusOptions).toLowerCase();

    expect(serializedOptions).not.toContain("birth");
    expect(serializedOptions).not.toContain("@");
    expect(serializedOptions).not.toContain("birth place");
    expect(serializedOptions).not.toContain("birth time");
  });
});
