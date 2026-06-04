import { describe, expect, it } from "vitest";

import { starterRitualPatterns } from "../../src/data/ritual-patterns";
import { seedSymbolicCards } from "../../src/data/seed-symbolic-cards";
import {
  CAPACITY_MODES,
  generateWeeklyBrief,
} from "../../src/lib/generate-weekly-brief";
import { getLunarTimingFact } from "../../src/lib/lunar-timing";
import type { PrivateNatalProfile } from "../../src/lib/private-data-schema";
import type { TimingFact, ZodiacSign } from "../../src/lib/timing-facts";

const supersededCapacityModes = [
  "tiny",
  "normal",
  "spacious",
  "celebration",
  "survival",
];

const approvedCardTraceKeys = new Set(
  seedSymbolicCards
    .filter((card) => card.approval_status === "approved")
    .flatMap((card) => [
      card.key,
      card.key.replace("new_moon", "moon.new")
        .replace("waxing_moon", "moon.waxing")
        .replace("full_moon", "moon.full")
        .replace("waning_moon", "moon.waning")
        .replace("private_profile_practical_care_theme", "private_profile.practical_tending")
        .replace("private_profile_beauty_warmth_theme", "private_profile.beauty_warmth")
        .replace("private_profile_structured_action_theme", "private_profile.structured_action"),
    ]),
);

const approvedPatternKeys = new Set(
  starterRitualPatterns
    .filter((pattern) => pattern.approvalStatus === "approved")
    .map((pattern) => pattern.key),
);

const fakeTimingBase = {
  exactIso: "2026-01-01T00:00:00.000Z",
  timezone: "UTC",
  computedBy: "manual" as const,
  confidence: "manual" as const,
};

function fakePlanetSignFact({
  planet,
  sign,
  degree,
  longitude,
}: {
  planet: "moon" | "venus" | "mars";
  sign: ZodiacSign;
  degree: number;
  longitude: number;
}): TimingFact {
  if (planet === "moon") {
    return {
      ...fakeTimingBase,
      id: "fake.timing.moon",
      type: "moon_sign",
      label: "Moon fake position",
      sign,
      degree,
      eclipticLongitudeDegrees: longitude,
    };
  }

  return {
    ...fakeTimingBase,
    id: `fake.timing.${planet}`,
    type: "planet_sign",
    label: `${planet} fake position`,
    planet,
    sign,
    degree,
    eclipticLongitudeDegrees: longitude,
  };
}

const fakeVenusWarmthProfile: PrivateNatalProfile = {
  personKey: "person_b",
  placements: [
    {
      bodyOrPoint: "venus",
      sign: "leo",
      degree: 13,
      themeKeys: ["visible_warmth"],
    },
  ],
  profileThemeKeys: [],
};

describe("generateWeeklyBrief", () => {
  it("returns the required weekly brief shape", () => {
    const brief = generateWeeklyBrief({ currentDate: "2026-06-03T12:00:00.000Z" });

    expect(brief).toMatchObject({
      dateRange: expect.any(String),
      briefKey: expect.any(String),
      theme: expect.any(String),
      intention: expect.any(String),
      bestWindow: expect.any(String),
      recommendedRitual: expect.any(String),
      optionalAddOn: expect.any(String),
      reflectionPrompt: expect.any(String),
      whyThis: expect.any(String),
      sourceSummary: expect.any(String),
      explanation: expect.any(Object),
      decision: expect.any(Object),
      trace: expect.any(Object),
    });
    expect(brief.whyThis.length).toBeGreaterThan(0);
    expect(brief.sourceSummary).toContain("Sources:");
    expect(brief.explanation.signals.length).toBeGreaterThan(0);
    expect(brief.explanation.reasoning[0]).toMatchObject({
      label: "Why this ritual",
      summary: expect.any(String),
    });
    expect(brief.theme).toMatch(/^[A-Z].*[.!?]$/);
    expect(brief.intention).toMatch(/^[A-Z].*[.!?]$/);
    expect(brief.theme).not.toContain(" with offer ");
    expect(brief.theme).not.toContain("beginning with");
    expect(brief.theme).not.toContain(":");
  });

  it("limits capacity modes to pause, low, steady, and high", () => {
    expect([...CAPACITY_MODES].sort()).toEqual(
      ["high", "low", "pause", "steady"].sort(),
    );
  });

  it("does not use old capacity modes in generated traces", () => {
    for (const mode of CAPACITY_MODES) {
      const brief = generateWeeklyBrief({ capacityMode: mode });

      expect(supersededCapacityModes).not.toContain(brief.trace.capacityMode);
    }
  });

  it("uses approved cards only", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      privateProfileKeys: ["private_profile.beauty_warmth"],
    });

    for (const cardKey of brief.trace.symbolicCards) {
      expect(approvedCardTraceKeys).toContain(cardKey);
    }
  });

  it("uses approved ritual patterns only", () => {
    const brief = generateWeeklyBrief({ capacityMode: "steady" });

    expect(brief.trace.ritualPatterns).toHaveLength(1);
    expect(approvedPatternKeys).toContain(brief.trace.ritualPatterns[0]);
    expect(brief.decision.selected.ritualPatternKey).toBe(
      brief.trace.ritualPatterns[0],
    );
    expect(brief.decision.candidates.ritualPatterns.length).toBeGreaterThan(1);
    expect(brief.decision.candidates.ritualPatterns.every(
      (pattern) => pattern.approvalStatus === "approved" || pattern.score < 0,
    )).toBe(true);
  });

  it("returns one primary ritual as a single string", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "steady",
      preferredRitualStyles: ["table_reset"],
    });

    expect(typeof brief.recommendedRitual).toBe("string");
    expect(brief.trace.ritualPatterns).toHaveLength(1);
    expect(brief.recommendedRitual.split("\n")).toHaveLength(1);
    expect(brief.recommendedRitual).not.toContain("1.");
    expect(brief.recommendedRitual).not.toContain("2.");
  });

  it("pause produces no required ritual", () => {
    const brief = generateWeeklyBrief({ capacityMode: "pause" });

    expect(brief.bestWindow).toBe("No timing needed.");
    expect(brief.recommendedRitual).toContain("No required ritual");
    expect(brief.whyThis).toContain("pause week");
  });

  it("low produces a five-minute-or-less recommendation with no setup burden", () => {
    const brief = generateWeeklyBrief({ capacityMode: "low" });

    expect(brief.bestWindow).toBe("When you have five quiet minutes.");
    expect(brief.bestWindow).not.toContain("0-5 minutes");
    expect(brief.whyThis).toContain("stays small");
    expect(brief.decision.inputs.capacityLimitMinutes).toBe(5);
    expect(brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === brief.trace.ritualPatterns[0],
    )?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "capacity_fit" }),
        expect.objectContaining({ code: "duration_fit" }),
      ]),
    );
  });

  it("does not expose fallback schedule assumptions in default output", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
    });
    const defaultOutput = JSON.stringify({
      bestWindow: brief.bestWindow,
      whyThis: brief.whyThis,
      signals: brief.explanation.signals,
      filtersApplied: brief.explanation.filtersApplied,
      scheduleAssumptions: brief.trace.scheduleAssumptions,
    });

    expect(defaultOutput).not.toContain("Schedule — Thursday evening");
    expect(defaultOutput).not.toContain("Schedule — Tuesday evening");
    expect(defaultOutput).not.toContain("Schedule — realistic window");
    expect(defaultOutput).not.toContain("Thursday evening");
    expect(defaultOutput).not.toContain("Tuesday evening");
    expect(defaultOutput).not.toContain("Saturday morning");
    expect(defaultOutput).not.toContain("schedule.realistic_window_thursday");
    expect(defaultOutput).not.toContain("schedule.symbolic_event_tuesday");
  });

  it("steady produces a practical recommendation around twenty minutes or less", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "steady",
      scheduleConstraints: { maxRitualDurationMinutes: 20 },
      preferredRitualStyles: ["table_reset"],
    });

    expect(brief.bestWindow).toBe("When you have a little space this week.");
    expect(brief.bestWindow).not.toContain("10-20 minutes");
    expect(brief.trace.ritualPatterns).toEqual(["table_reset"]);
    expect(brief.whyThis).toContain("steady week");
  });

  it("high produces an active recommendation without creating a task list", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "high",
      scheduleConstraints: { maxRitualDurationMinutes: 30 },
      preferredRitualStyles: ["surface_reset"],
    });

    expect(brief.bestWindow).toBe("When you have room to linger this week.");
    expect(brief.bestWindow).not.toContain("20-30 minutes");
    expect(brief.recommendedRitual.split("\n")).toHaveLength(1);
    expect(brief.recommendedRitual).not.toContain("1.");
    expect(brief.recommendedRitual).not.toContain("2.");
    expect(brief.trace.ritualPatterns).toHaveLength(1);
  });

  it("legacy schedule constraints do not shape user-facing timing", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      scheduleConstraints: {
        unavailableDaysOrNights: ["Tuesday night"],
        preferredRitualWindows: ["schedule.preferred_window_saturday_morning"],
        maxRitualDurationMinutes: 5,
      },
    });

    expect(brief.bestWindow).toBe("When you have five quiet minutes.");
    expect(brief.bestWindow).not.toContain("Thursday evening");
    expect(brief.bestWindow).not.toContain("Tuesday evening");
    expect(brief.bestWindow).not.toContain("Tuesday");
    expect(brief.bestWindow).not.toContain("Saturday morning");
    expect(brief.whyThis).not.toContain("fits real life");
    expect(brief.whyThis).not.toContain("best window moves");
    expect(brief.trace.scheduleAssumptions).toEqual([]);
  });

  it("avoided styles and burdens can exclude a pattern", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "steady",
      preferredRitualStyles: ["table_reset", "surface_reset"],
      avoidedRitualStyles: ["table_reset", "heavy_cleanup"],
    });

    expect(brief.trace.ritualPatterns).not.toEqual(["table_reset"]);
    expect(brief.trace.safety.excludedPatternKeys).toContain("table_reset");
    expect(brief.decision.rejected.ritualPatterns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "table_reset",
          reasons: expect.arrayContaining([
            expect.objectContaining({ code: "avoided_style_conflict" }),
          ]),
        }),
      ]),
    );
    expect(brief.whyThis).toContain("A few options were set aside");
    expect(brief.whyThis).not.toContain("filter");
    expect(brief.whyThis).not.toContain("pattern option");
  });

  it("records explicit recommendation decision inputs, candidates, and score reasons", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending"],
      avoidedRitualStyles: ["shopping_required"],
    });
    const selectedPattern = brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
    );

    expect(brief.decision.inputs).toMatchObject({
      capacityMode: "low",
      capacityLimitMinutes: 5,
      preferredRitualStyles: ["plant_tending"],
      avoidedRitualStyles: ["shopping_required"],
    });
    expect(brief.decision.candidates.symbolicCards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "full_moon",
          matchedTimingFacts: ["moon.full"],
          scoreReasons: expect.arrayContaining([
            expect.objectContaining({ code: "timing_fact_match" }),
          ]),
        }),
      ]),
    );
    expect(selectedPattern).toBeDefined();
    expect(selectedPattern?.key).toBe("tend_one_plant");
    expect(selectedPattern?.score).toBeGreaterThan(0);
    expect(selectedPattern?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "preferred_style_match" }),
        expect.objectContaining({ code: "timing_signal_style_match" }),
        expect.objectContaining({ code: "profile_theme_match" }),
      ]),
    );
    expect(brief.decision.selected.sourceReferences.length).toBeGreaterThan(0);
    expect(brief.trace.patternSelection.selectedPatternKey).toBe("tend_one_plant");
    expect(brief.trace.patternSelection.eligiblePatternKeys).toContain(
      "tend_one_plant",
    );
  });

  it("does not treat shopping guardrail prose as a shopping requirement", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "steady",
      preferredRitualStyles: ["tea_ritual", "kitchen", "tea"],
      avoidedRitualStyles: ["shopping_required"],
    });
    const teaCandidate = brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === "tea_ritual",
    );
    const rejectedTea = brief.decision.rejected.ritualPatterns.find(
      (pattern) => pattern.key === "tea_ritual",
    );

    expect(teaCandidate).toBeDefined();
    expect(teaCandidate?.score).toBeGreaterThan(0);
    expect(rejectedTea).toBeUndefined();
  });

  it("records capacity and max duration exclusions in the decision", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "steady",
      scheduleConstraints: { maxRitualDurationMinutes: 8 },
      preferredRitualStyles: ["table_reset"],
    });

    expect(brief.trace.ritualPatterns).not.toEqual(["table_reset"]);
    expect(brief.decision.inputs.capacityLimitMinutes).toBe(8);
    expect(brief.decision.rejected.ritualPatterns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "table_reset",
          reasons: expect.arrayContaining([
            expect.objectContaining({ code: "too_long_for_capacity" }),
          ]),
        }),
      ]),
    );
  });

  it("records live-flame safety preference exclusions", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      preferredRitualStyles: ["candle_or_light", "light_focus"],
      avoidedRitualStyles: ["live_flame"],
    });

    expect(brief.trace.ritualPatterns).not.toEqual(["candle_light_focus"]);
    expect(brief.decision.rejected.ritualPatterns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "candle_light_focus",
          reasons: expect.arrayContaining([
            expect.objectContaining({ code: "avoided_style_conflict" }),
          ]),
        }),
      ]),
    );
  });

  it("includes source and trace data for selected cards and patterns", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending"],
      avoidedRitualStyles: ["shopping"],
      audience: "person_a",
    });

    expect(brief.trace.timingFacts).toEqual(["moon.full"]);
    expect(brief.trace.computedTimingFacts.length).toBeGreaterThan(10);
    expect(brief.trace.computedTimingFacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "moon_sign" }),
        expect.objectContaining({ type: "sun_sign" }),
        expect.objectContaining({ type: "planet_sign" }),
        expect.objectContaining({ type: "planetary_aspect" }),
      ]),
    );
    expect(brief.trace.selectedTimingSignals.length).toBeGreaterThan(0);
    expect(brief.trace.timingFactDetails).toHaveLength(1);
    expect(brief.trace.timingFactDetails[0]).toMatchObject({
      key: "moon.full",
      label: "Full moon",
      exactIso: "2026-06-03T12:00:00.000Z",
      computedBy: "astronomy_engine",
      confidence: "computed",
      relatedSymbolicKeys: ["full_moon"],
    });
    expect(brief.trace.symbolicCards).toContain("moon.full");
    expect(brief.trace.ritualPatterns).toHaveLength(1);
    expect(brief.trace.sourceReviewIds.length).toBeGreaterThan(0);
    expect(brief.trace.privateProfileKeys).toEqual([
      "private_profile.practical_tending",
    ]);
    expect(brief.trace.profilePreferenceKeys).toEqual([
      "plant_tending",
      "shopping_required",
    ]);
    expect(brief.trace.capacityMode).toBe("low");
    expect(brief.trace.audience).toBe("person_a");
    expect(brief.trace.scheduleAssumptions).toEqual([]);
  });

  it("returns only selected user-facing signals for the recommendation", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending"],
    });
    const labels = brief.explanation.signals.map((signal) => signal.label);

    expect(brief.explanation.signals).toHaveLength(4);
    expect(labels).toContain("Full moon");
    expect(labels.some((label) => label.includes(" in "))).toBe(true);
    expect(labels).toContain("Capacity — low");
    expect(labels).not.toContain("Schedule — realistic window");
    expect(labels).not.toContain("Schedule — Thursday evening");
    expect(JSON.stringify(brief.explanation.signals)).not.toContain("moon.full");
    expect(JSON.stringify(brief.explanation.signals)).not.toContain("private_profile.");
    expect(JSON.stringify(brief.explanation.signals).toLowerCase()).not.toContain("your chart");
  });

  it("keeps explanation source labels human-readable", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending"],
    });
    const serializedExplanation = JSON.stringify(brief.explanation);

    expect(brief.explanation.sourcesUsed.length).toBeGreaterThan(0);
    expect(brief.explanation.sourcesUsed).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Full Moon card",
          kind: "symbolic_card",
        }),
        expect.objectContaining({
          kind: "ritual_pattern",
        }),
        expect.objectContaining({
          label: "Steven Forrest astrology works",
          kind: "source_review",
        }),
      ]),
    );
    expect(serializedExplanation).not.toContain("source.");
    expect(serializedExplanation).not.toContain("docs/source-");
    expect(serializedExplanation).not.toContain("private_profile.");
  });

  it("explains profile and capacity effects without fake schedule knowledge", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending"],
      scheduleConstraints: {
        unavailableDaysOrNights: ["Tuesday night"],
        preferredRitualWindows: ["schedule.preferred_window_saturday_morning"],
      },
    });
    const explanationText = JSON.stringify(brief.explanation);

    expect(explanationText).toContain("Capacity");
    expect(explanationText).toContain("saved profile theme");
    expect(explanationText).not.toContain("Schedule");
    expect(explanationText).not.toContain("Saturday morning");
    expect(explanationText).not.toContain("Thursday evening");
    expect(explanationText).not.toContain("Tuesday evening");
    expect(explanationText).not.toContain("realistic window");
    expect(explanationText).not.toContain("your chart says");
    expect(explanationText).not.toContain("will cause");
  });

  it("uses current-sky astrology without using private natal interpretation", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending"],
    });
    const serializedBrief = JSON.stringify(brief).toLowerCase();

    expect(brief.trace.selectedTimingSignals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ timingFactType: "moon_phase" }),
      ]),
    );
    expect(
      brief.trace.selectedTimingSignals.some((signal) =>
        ["moon_sign", "sun_sign", "planet_sign", "planetary_aspect"].includes(
          signal.timingFactType,
        ),
      ),
    ).toBe(true);
    expect(brief.explanation.signals.some((signal) => signal.type === "planetary")).toBe(true);
    expect(serializedBrief).not.toContain("birth");
    expect(brief.decision.inputs.privateNatalProfilesLoaded).toBe(false);
    expect(brief.decision.selected.natalContacts).toEqual([]);
    expect(serializedBrief).not.toContain("synastry");
    expect(serializedBrief).not.toContain("compatibility");
    expect(serializedBrief).not.toContain("your chart");
  });

  it("computes private natal contacts from generator inputs and records count-only diagnostics", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-01-01T00:00:00.000Z",
      timingFacts: ["moon.full"],
      computedTimingFacts: [
        fakePlanetSignFact({
          planet: "venus",
          sign: "leo",
          degree: 13,
          longitude: 133,
        }),
      ],
      capacityMode: "low",
      audience: "person_b",
      natalProfiles: [fakeVenusWarmthProfile],
      astrologyVisibility: "balanced",
    });

    expect(brief.trace.privateNatalDiagnostics).toEqual({
      privateNatalProfilesLoaded: true,
      privateNatalProfileCount: 1,
      natalPlacementCounts: { person_b: 1 },
      natalContactsComputed: 2,
    });
    expect(brief.decision.inputs).toMatchObject({
      privateNatalProfilesLoaded: true,
      privateNatalProfileCount: 1,
      natalPlacementCounts: { person_b: 1 },
      natalContactsComputed: 2,
    });
    expect(brief.trace.selectedNatalContacts.length).toBeGreaterThan(0);
    expect(JSON.stringify(brief.trace.privateNatalDiagnostics)).not.toContain("leo");
    expect(JSON.stringify(brief.trace.privateNatalDiagnostics)).not.toContain("venus");
  });

  it("uses natal contacts as bounded score reasons for eligible ritual candidates", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-01-01T00:00:00.000Z",
      timingFacts: ["moon.full"],
      computedTimingFacts: [
        fakePlanetSignFact({
          planet: "venus",
          sign: "leo",
          degree: 13,
          longitude: 133,
        }),
      ],
      capacityMode: "low",
      audience: "person_b",
      natalProfiles: [fakeVenusWarmthProfile],
      astrologyVisibility: "balanced",
    });
    const selectedPattern = brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
    );

    expect(selectedPattern?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "natal_contact_theme_match" }),
        expect.objectContaining({ code: "profile_timing_resonance" }),
      ]),
    );
    expect(brief.decision.selected.natalContacts.length).toBeGreaterThan(0);
    expect(brief.decision.selected.natalContactThemeKeys).toEqual(
      expect.arrayContaining(["visible_warmth", "private_natal_contact"]),
    );
    expect(brief.whyThis).toContain("Current timing lines up with a visible warmth theme");
    expect(brief.whyThis).not.toContain("Your chart says");
    expect(brief.whyThis).not.toContain("will bring");
  });

  it("uses subtle natal visibility as theme language only", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-01-01T00:00:00.000Z",
      timingFacts: ["moon.full"],
      computedTimingFacts: [
        fakePlanetSignFact({
          planet: "venus",
          sign: "leo",
          degree: 13,
          longitude: 133,
        }),
      ],
      capacityMode: "low",
      audience: "person_b",
      natalProfiles: [fakeVenusWarmthProfile],
      astrologyVisibility: "subtle",
    });

    expect(brief.whyThis).toContain("private timing pattern around visible warmth");
    expect(brief.whyThis).not.toContain("Venus in Leo");
    expect(brief.whyThis).not.toContain("natal Venus");
  });

  it("uses explicit natal visibility without deterministic claims", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-01-01T00:00:00.000Z",
      timingFacts: ["moon.full"],
      computedTimingFacts: [
        fakePlanetSignFact({
          planet: "venus",
          sign: "leo",
          degree: 13,
          longitude: 133,
        }),
      ],
      capacityMode: "low",
      audience: "person_b",
      natalProfiles: [fakeVenusWarmthProfile],
      astrologyVisibility: "explicit",
    });

    expect(brief.whyThis).toContain("Venus in Leo");
    expect(brief.whyThis).toContain("private natal Venus in Leo");
    expect(brief.whyThis).toContain("not a prediction");
    expect(brief.whyThis).not.toContain("chart says");
    expect(brief.whyThis).not.toContain("will cause");
  });

  it("does not let natal contacts override capacity or avoided-style exclusions", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-01-01T00:00:00.000Z",
      timingFacts: ["moon.full"],
      computedTimingFacts: [
        fakePlanetSignFact({
          planet: "venus",
          sign: "leo",
          degree: 13,
          longitude: 133,
        }),
      ],
      capacityMode: "pause",
      audience: "person_b",
      avoidedRitualStyles: ["live_flame"],
      natalProfiles: [fakeVenusWarmthProfile],
      astrologyVisibility: "explicit",
    });

    expect(brief.decision.rejected.ritualPatterns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "candle_light_focus",
          reasons: expect.arrayContaining([
            expect.objectContaining({ code: "avoided_style_conflict" }),
          ]),
        }),
        expect.objectContaining({
          key: "tend_one_plant",
          reasons: expect.arrayContaining([
            expect.objectContaining({ code: "capacity_mode_mismatch" }),
          ]),
        }),
      ]),
    );
    expect(brief.trace.ritualPatterns).not.toEqual(["candle_light_focus"]);
  });

  it("can consume a lunar timing fact object from the timing helper", () => {
    const timingFact = getLunarTimingFact("2026-06-15T03:00:00.000Z");
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-15T03:00:00.000Z",
      timingFactDetails: [timingFact],
    });

    expect(brief.trace.timingFacts).toEqual(["moon.new"]);
    expect(brief.trace.timingFactDetails).toEqual([
      expect.objectContaining({
        key: "moon.new",
        label: "New moon",
        exactIso: "2026-06-15T03:00:00.000Z",
        computedBy: "astronomy_engine",
      }),
    ]);
    expect(brief.whyThis).toContain("The new moon points toward");
  });

  it("can produce an alternate approved pattern when the current pattern is excluded", () => {
    const input = {
      currentDate: "2026-06-30T00:00:00.000Z",
      capacityMode: "low" as const,
      preferredRitualStyles: ["plant_tending"],
    };
    const firstBrief = generateWeeklyBrief(input);
    const alternateBrief = generateWeeklyBrief({
      ...input,
      excludedRitualPatternKeys: firstBrief.trace.ritualPatterns,
    });

    expect(alternateBrief.trace.ritualPatterns).toHaveLength(1);
    expect(alternateBrief.trace.ritualPatterns[0]).not.toBe(
      firstBrief.trace.ritualPatterns[0],
    );
    expect(alternateBrief.trace.safety.excludedPatternKeys).toContain(
      firstBrief.trace.ritualPatterns[0],
    );
    expect(alternateBrief.decision.rejected.ritualPatterns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: firstBrief.trace.ritualPatterns[0],
          reasons: expect.arrayContaining([
            expect.objectContaining({ code: "try_again_excluded" }),
          ]),
        }),
      ]),
    );
  });

  it("reports no safe alternate when try-again excludes every eligible low-capacity pattern", () => {
    const lowEligiblePatternKeys = starterRitualPatterns
      .filter(
        (pattern) =>
          pattern.approvalStatus === "approved" &&
          pattern.capacityModes.includes("low") &&
          pattern.defaultDurationMinutes <= 5,
      )
      .map((pattern) => pattern.key);
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      excludedRitualPatternKeys: lowEligiblePatternKeys,
    });

    expect(brief.decision.explanation.noAlternateAvailable).toBe(true);
    expect(brief.trace.patternSelection.noAlternateAvailable).toBe(true);
    expect(brief.trace.safety.notes.join(" ")).toContain(
      "no alternate approved ritual pattern fit",
    );
  });

  it("does not treat private profile inputs as public source citations", () => {
    const brief = generateWeeklyBrief({
      privateProfileKeys: ["private_profile.structured_action"],
      preferredRitualStyles: ["kitchen"],
      audience: "person_b",
    });

    expect(brief.trace.privateProfileKeys).toContain(
      "private_profile.structured_action",
    );
    expect(brief.trace.sourceReviewIds).not.toContain(
      "private_profile.structured_action",
    );
    expect(brief.sourceSummary).not.toContain("private_profile");
    expect(JSON.stringify(brief.explanation)).not.toContain("private_profile");
  });

  it("uses person A profile themes when the brief is for person A", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      audience: "person_a",
      profileInputs: [
        {
          audience: "person_a",
          profileThemeKeys: ["private_profile.practical_tending"],
        },
        {
          audience: "person_b",
          profileThemeKeys: ["private_profile.beauty_warmth"],
        },
      ],
    });

    expect(brief.trace.profileSignalKeys).toEqual([
      "profile_theme.person_a.private_profile.practical_tending",
    ]);
    expect(brief.whyThis).toContain("practical home-tending magic");
    expect(brief.whyThis).not.toContain("warmth, beauty, and affection");
  });

  it("uses person B profile themes when the brief is for person B", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      audience: "person_b",
      profileInputs: [
        {
          audience: "person_a",
          profileThemeKeys: ["private_profile.practical_tending"],
        },
        {
          audience: "person_b",
          profileThemeKeys: ["private_profile.beauty_warmth"],
          astrologyProfileThemeKeys: ["private_profile.beauty_warmth"],
        },
      ],
    });

    expect(brief.trace.ritualPatterns).toEqual(["candle_light_focus"]);
    expect(brief.trace.profileSignalKeys).toEqual([
      "profile_theme.person_b.private_profile.beauty_warmth",
      "natal_theme.person_b.private_profile.beauty_warmth",
    ]);
    expect(brief.whyThis).toContain("warmth, beauty, and affection");
    expect(brief.whyThis).toContain("Saved natal-chart themes");
    expect(brief.whyThis).not.toContain("placement");
    expect(brief.whyThis).not.toContain("chart says");
  });

  it("blends both profiles safely for together recommendations", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      audience: "together",
      profileInputs: [
        {
          audience: "person_a",
          profileThemeKeys: ["private_profile.practical_tending"],
        },
        {
          audience: "person_b",
          profileThemeKeys: ["private_profile.beauty_warmth"],
          astrologyProfileThemeKeys: ["private_profile.beauty_warmth"],
        },
      ],
    });

    expect(brief.trace.profileSignalKeys).toEqual([
      "profile_theme.person_a.private_profile.practical_tending",
      "profile_theme.person_b.private_profile.beauty_warmth",
      "natal_theme.person_b.private_profile.beauty_warmth",
    ]);
    expect(brief.whyThis).toContain(
      "saved profile and natal-chart themes",
    );
    expect(brief.whyThis).toContain(
      "practical home-tending magic with warmth, beauty, and affection",
    );
    expect(brief.trace.ritualPatterns).toHaveLength(1);
  });

  it("keeps either recommendations from conflicting with either profile avoid flags", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      audience: "either",
      profileInputs: [
        {
          audience: "person_a",
          profileThemeKeys: ["private_profile.practical_tending"],
          avoidedRitualStyles: ["live_flame"],
        },
        {
          audience: "person_b",
          profileThemeKeys: ["private_profile.beauty_warmth"],
          astrologyProfileThemeKeys: ["private_profile.beauty_warmth"],
        },
      ],
    });

    expect(brief.trace.ritualPatterns).not.toEqual(["candle_light_focus"]);
    expect(brief.trace.safety.excludedPatternKeys).toContain("candle_light_focus");
    expect(brief.whyThis).toContain("without conflicting with household avoid flags");
  });

  it("lets profile themes influence scoring when multiple patterns are eligible", () => {
    const withoutBeautyTheme = generateWeeklyBrief({
      capacityMode: "low",
      audience: "person_b",
      profileInputs: [
        {
          audience: "person_b",
          profileThemeKeys: ["private_profile.practical_tending"],
        },
      ],
    });
    const withBeautyTheme = generateWeeklyBrief({
      capacityMode: "low",
      audience: "person_b",
      profileInputs: [
        {
          audience: "person_b",
          profileThemeKeys: ["private_profile.beauty_warmth"],
          astrologyProfileThemeKeys: ["private_profile.beauty_warmth"],
        },
      ],
    });

    expect(withBeautyTheme.trace.ritualPatterns).toEqual(["candle_light_focus"]);
    expect(withBeautyTheme.trace.ritualPatterns).not.toEqual(
      withoutBeautyTheme.trace.ritualPatterns,
    );
  });

  it("lets safety and explicit avoid flags override profile theme fit", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      audience: "person_b",
      profileInputs: [
        {
          audience: "person_b",
          profileThemeKeys: ["private_profile.beauty_warmth"],
          astrologyProfileThemeKeys: ["private_profile.beauty_warmth"],
          avoidedRitualStyles: ["live_flame"],
        },
      ],
    });

    expect(brief.trace.ritualPatterns).not.toEqual(["candle_light_focus"]);
    expect(brief.trace.safety.excludedPatternKeys).toContain("candle_light_focus");
    expect(brief.whyThis).toContain("A few options were set aside");
  });

  it("keeps generated output non-identifying", () => {
    const serializedBrief = JSON.stringify(generateWeeklyBrief()).toLowerCase();

    expect(serializedBrief).toContain("private_profile.practical_tending");
    expect(serializedBrief).not.toContain("birth");
    expect(serializedBrief).not.toContain("relationship details");
    expect(serializedBrief).not.toContain("private source text");
    expect(serializedBrief).not.toContain("jessica");
    expect(serializedBrief).not.toMatch(/\btim\b/);
  });
});
