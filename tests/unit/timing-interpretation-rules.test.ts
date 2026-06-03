import { describe, expect, it } from "vitest";

import {
  getEligibleTimingInterpretationRules,
  getTimingSignalsForFacts,
  isTimingInterpretationRuleEligible,
  selectTimingSignals,
  starterTimingInterpretationRules,
  type TimingInterpretationRule,
} from "../../src/lib/timing-interpretation-rules";
import { getTimingFactsForDate } from "../../src/lib/timing-facts";

describe("timing interpretation rules", () => {
  it("keeps only approved, source-backed rules eligible", () => {
    const eligibleRules = getEligibleTimingInterpretationRules();

    expect(eligibleRules.length).toBeGreaterThan(4);
    expect(eligibleRules.every((rule) => rule.approvalStatus === "approved")).toBe(true);
    expect(
      eligibleRules.every((rule) => rule.symbolicCardKeys.length > 0),
    ).toBe(true);
    expect(
      starterTimingInterpretationRules
        .filter((rule) => rule.approvalStatus === "draft")
        .every((rule) => !isTimingInterpretationRuleEligible(rule)),
    ).toBe(true);
  });

  it("matches computed timing facts to approved candidate signals", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const signals = getTimingSignalsForFacts(facts);

    expect(signals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          signalLabel: "Waxing moon",
          symbolicCardKeys: ["waxing_moon"],
          strength: "primary",
        }),
        expect.objectContaining({
          signalLabel: "Numerology 1",
          symbolicCardKeys: ["numerology_1"],
          strength: "accent",
        }),
      ]),
    );
  });

  it("does not create unsupported visible interpretation for zodiac or planetary facts", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const signals = getTimingSignalsForFacts(facts);

    expect(signals.some((signal) => signal.timingFactType === "moon_sign")).toBe(false);
    expect(signals.some((signal) => signal.timingFactType === "sun_sign")).toBe(false);
    expect(signals.some((signal) => signal.timingFactType === "planet_sign")).toBe(false);
    expect(signals.some((signal) => signal.timingFactType === "planetary_aspect")).toBe(false);
    expect(JSON.stringify(signals).toLowerCase()).not.toContain("will cause");
    expect(JSON.stringify(signals).toLowerCase()).not.toContain("your chart says");
  });

  it("limits selected signals to a small set and keeps numerology as an accent", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const signals = getTimingSignalsForFacts(facts);
    const selectedSignals = selectTimingSignals(signals, { maxSignals: 3 });

    expect(selectedSignals.length).toBeLessThanOrEqual(3);
    expect(selectedSignals[0].strength).toBe("primary");
    expect(selectedSignals.filter((signal) => signal.strength === "accent")).toHaveLength(1);
    expect(selectedSignals[0].signalLabel).not.toContain("Numerology");
  });

  it("can account for private preference hints without exposing private data", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const signals = getTimingSignalsForFacts(facts);
    const selectedSignals = selectTimingSignals(signals, {
      maxSignals: 2,
      preferredRitualStyles: ["plant_tending"],
      avoidedRitualStyles: ["large_cleanup"],
    });
    const serializedSignals = JSON.stringify(selectedSignals).toLowerCase();

    expect(selectedSignals.length).toBeLessThanOrEqual(2);
    expect(serializedSignals).not.toContain("birth");
    expect(serializedSignals).not.toContain("relationship details");
    expect(serializedSignals).not.toContain("private source text");
  });

  it("rejects approved rules that point at missing or unapproved cards", () => {
    const rule: TimingInterpretationRule = {
      id: "timing_rule.invalid.card",
      timingFactType: "moon_phase",
      condition: { phase: "new" },
      signalLabel: "Invalid",
      signalSummary: "Invalid test rule.",
      symbolicCardKeys: ["missing_card"],
      ritualStyleHints: [],
      weight: 100,
      strength: "primary",
      avoidIf: [],
      sourceReferences: ["source.astronomy_engine"],
      approvalStatus: "approved",
    };

    expect(isTimingInterpretationRuleEligible(rule)).toBe(false);
  });
});
