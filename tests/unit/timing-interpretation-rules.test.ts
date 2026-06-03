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

    expect(eligibleRules.length).toBeGreaterThan(80);
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

  it("creates approved source-backed astrology signals from computed facts", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const signals = getTimingSignalsForFacts(facts);
    const astrologySignals = signals.filter((signal) =>
      [
        "moon_sign",
        "sun_sign",
        "planet_sign",
        "planet_retrograde",
        "planetary_aspect",
      ].includes(signal.timingFactType),
    );

    expect(astrologySignals.length).toBeGreaterThan(0);
    expect(signals.some((signal) => signal.timingFactType === "moon_sign")).toBe(true);
    expect(signals.some((signal) => signal.timingFactType === "sun_sign")).toBe(true);
    expect(signals.some((signal) => signal.timingFactType === "planet_sign")).toBe(true);
    expect(signals.some((signal) => signal.timingFactType === "planetary_aspect")).toBe(true);

    for (const signal of astrologySignals) {
      expect(signal.sourceReferences).toEqual(
        expect.arrayContaining([
          "source.steven_forrest",
          "source.kevin_burk",
          "source.astrology_ethics_sources",
          "source.barnum_forer_guardrail",
        ]),
      );
      expect(signal.signalLabel).not.toMatch(/uranus|neptune|pluto/i);
      expect(signal.signalSummary.toLowerCase()).not.toContain("will cause");
      expect(signal.signalSummary.toLowerCase()).not.toContain("will happen");
      expect(signal.signalSummary.toLowerCase()).not.toContain("your chart says");
      expect(signal.signalSummary.toLowerCase()).not.toContain("compatibility");
    }
  });

  it("uses specific source-backed summaries for approved astrology combinations", () => {
    const facts = getTimingFactsForDate("2026-06-03T12:00:00.000Z");
    const signals = getTimingSignalsForFacts(facts);
    const mercuryCancer = signals.find(
      (signal) => signal.ruleId === "timing_rule.planet_sign.mercury.cancer",
    );

    expect(mercuryCancer).toMatchObject({
      signalLabel: "Mercury in Cancer — careful words for home",
      signalSummary:
        "A signal for naming one household need gently, with careful words and without turning it into a heavy talk.",
      symbolicCardKeys: ["astrology_body_mercury", "astrology_sign_cancer"],
    });
    expect(mercuryCancer?.sourceReferences).toEqual(
      expect.arrayContaining([
        "note.astrology_body_mercury_words_sorting",
        "note.astrology_sign_cancer_home_containment",
        "note.astrology_combo_mercury_cancer_careful_words",
      ]),
    );
  });

  it("keeps approved astrology rule summaries practical and non-deterministic", () => {
    const rules = getEligibleTimingInterpretationRules().filter((rule) =>
      [
        "moon_sign",
        "sun_sign",
        "planet_sign",
        "planet_retrograde",
        "planetary_aspect",
      ].includes(rule.timingFactType),
    );
    const requiredRuleIds = [
      "timing_rule.moon_sign.virgo",
      "timing_rule.moon_sign.cancer",
      "timing_rule.sun_sign.cancer",
      "timing_rule.planet_sign.mercury.cancer",
      "timing_rule.planet_sign.mercury.virgo",
      "timing_rule.planet_sign.venus.leo",
      "timing_rule.planet_sign.mars.capricorn",
      "timing_rule.planetary_aspect.square",
      "timing_rule.planetary_aspect.trine",
      "timing_rule.planetary_aspect.sextile",
    ];
    const serializedRules = JSON.stringify(rules).toLowerCase();

    expect(rules.map((rule) => rule.id)).toEqual(
      expect.arrayContaining(requiredRuleIds),
    );

    for (const rule of rules) {
      expect(rule.signalLabel).not.toMatch(/^[a-z_]+\.[a-z_]+/);
      expect(rule.signalSummary.length).toBeGreaterThan(50);
      expect(rule.sourceReferences.some((reference) => reference.startsWith("note."))).toBe(true);
      expect(rule.sourceReferences).toEqual(
        expect.arrayContaining([
          "source.steven_forrest",
          "source.kevin_burk",
          "source.astrology_ethics_sources",
          "source.barnum_forer_guardrail",
        ]),
      );
    }

    expect(serializedRules).not.toContain("will happen");
    expect(serializedRules).not.toContain("will create conflict");
    expect(serializedRules).not.toContain("your chart");
    expect(serializedRules).not.toContain("you are");
    expect(serializedRules).not.toContain("synastry");
    expect(serializedRules).not.toContain("compatibility");
    expect(serializedRules).not.toContain("natal");
  });

  it("keeps draft outer-planet placeholders ineligible", () => {
    const eligibleRules = getEligibleTimingInterpretationRules();
    const draftRules = starterTimingInterpretationRules.filter(
      (rule) => rule.approvalStatus === "draft",
    );

    expect(draftRules.map((rule) => rule.id)).toEqual(
      expect.arrayContaining([
        "timing_rule.outer_planet.uranus.placeholder",
        "timing_rule.outer_planet.neptune.placeholder",
        "timing_rule.outer_planet.pluto.placeholder",
      ]),
    );
    expect(
      eligibleRules.some((rule) => rule.id.includes("outer_planet")),
    ).toBe(false);
  });

  it("limits selected signals to a small set and keeps numerology as an accent", () => {
    const facts = getTimingFactsForDate("2026-06-21T00:00:00.000Z");
    const signals = getTimingSignalsForFacts(facts);
    const selectedSignals = selectTimingSignals(signals, { maxSignals: 3 });

    expect(selectedSignals.length).toBeLessThanOrEqual(3);
    expect(selectedSignals[0].strength).toBe("primary");
    expect(selectedSignals[0].signalLabel).not.toContain("Numerology");

    const numerologyOnly = getTimingSignalsForFacts(
      facts.filter((fact) => fact.type === "numerology_date"),
    );
    expect(selectTimingSignals(numerologyOnly, { maxSignals: 3 })).toEqual([]);
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
