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
import { recommendationQualityScenarios } from "../fixtures/recommendation-quality-scenarios";

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

function qualityScenarioInput(id: string) {
  const scenario = recommendationQualityScenarios.find(
    (candidate) => candidate.id === id,
  );

  if (!scenario) {
    throw new Error(`Missing recommendation quality scenario: ${id}`);
  }

  return scenario.input;
}
const approvedPatternKeyList = [...approvedPatternKeys];

function getSelectedPattern(brief: ReturnType<typeof generateWeeklyBrief>) {
  return starterRitualPatterns.find(
    (pattern) => pattern.key === brief.trace.ritualPatterns[0],
  );
}

function getSelectedPatternDecision(brief: ReturnType<typeof generateWeeklyBrief>) {
  return brief.decision.candidates.ritualPatterns.find(
    (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
  );
}

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

const fakeManyContactProfiles: PrivateNatalProfile[] = [
  {
    personKey: "person_a",
    placements: [
      { bodyOrPoint: "sun", sign: "leo", degree: 13, themeKeys: ["visible_warmth"] },
      { bodyOrPoint: "moon", sign: "taurus", degree: 10, themeKeys: ["practical_care"] },
      { bodyOrPoint: "saturn", sign: "scorpio", degree: 13, themeKeys: ["structure_and_repair"] },
    ],
    profileThemeKeys: ["private_profile.practical_tending"],
  },
  {
    personKey: "person_b",
    placements: [
      { bodyOrPoint: "venus", sign: "leo", degree: 13, themeKeys: ["visible_warmth"] },
      { bodyOrPoint: "mars", sign: "taurus", degree: 10, themeKeys: ["direct_action"] },
      { bodyOrPoint: "saturn", sign: "scorpio", degree: 13, themeKeys: ["structure_and_repair"] },
    ],
    profileThemeKeys: ["private_profile.beauty_warmth"],
  },
];

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
    expect(brief.explanation.whyThisFits).toEqual(expect.any(String));
    expect(brief.explanation.whyThisFits.length).toBeGreaterThan(0);
    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "timing_choice",
          title: "Timing",
          body: expect.any(String),
        }),
        expect.objectContaining({
          kind: "ritual_fit",
          title: "Ritual fit",
          body: expect.any(String),
        }),
      ]),
    );
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

  it("uses saved language tone only as legacy fallback copy", () => {
    const brief = generateWeeklyBrief({
      preferredRitualStyles: ["kitchen", "bread"],
      tonePreferences: ["direct"],
      capacityMode: "low",
      excludedRitualPatternKeys: approvedPatternKeyList.filter(
        (key) => key !== "bread_enoughness_cue",
      ),
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["kitchen"],
        practiceTypeLabel: "Kitchen",
        ritualFocusKey: "resting",
      },
    });

    expect(brief.trace.ritualPatterns).toEqual(["bread_enoughness_cue"]);
    expect(brief.recommendedRitual).toContain("Stop there.");
    expect(brief.recommendedRitual).not.toContain("Plain, useful");
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

  it("pause produces an intentionally minimal ritual", () => {
    const brief = generateWeeklyBrief({ capacityMode: "pause" });

    expect(brief.bestWindow).toBe("No timing needed.");
    expect(brief.recommendedRitual).not.toContain("No required ritual");
    expect(brief.whyThis).toContain("pause week");
  });

  it("uses grimoire presentation copy for updated ritual patterns", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending", "plant"],
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["plant", "plant_tending"],
        practiceTypeLabel: "Plant",
        ritualFocusKey: "tending_the_home",
      },
    });

    expect(brief.trace.ritualPatterns).toEqual(["plant_witness_to_growth"]);
    expect(brief.theme).toBe("Let a plant witness the growth.");
    expect(brief.intention).toBe("Let a plant witness the growth.");
    expect(brief.recommendedRitual).toContain("Let the plant hold attention without becoming a task.");
    expect(brief.recommendedRitual).toContain("leaving the plant untouched");
    expect(brief.reflectionPrompt).toBe(
      "What can keep growing without being handled today?",
    );
    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "ritual_fit",
          body: expect.stringContaining("Plant folklore and flower-language traditions"),
        }),
      ]),
    );
  });

  it("falls back to legacy steps for patterns without presentation", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      preferredRitualStyles: ["kitchen", "bread"],
      excludedRitualPatternKeys: approvedPatternKeyList.filter(
        (key) => key !== "bread_enoughness_cue",
      ),
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["kitchen"],
        practiceTypeLabel: "Kitchen",
        ritualFocusKey: "resting",
      },
    });

    expect(brief.trace.ritualPatterns).toEqual(["bread_enoughness_cue"]);
    expect(brief.recommendedRitual).toContain("Use bread");
    expect(brief.recommendedRitual).not.toContain("Close by");
  });

  it("uses pause presentation without no-required-ritual task-list shape", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "pause",
      preferredRitualStyles: ["candle_or_light", "home_tending", "rest"],
      excludedRitualPatternKeys: approvedPatternKeyList.filter(
        (key) => key !== "bank_the_house_light",
      ),
    });

    expect(brief.trace.ritualPatterns).toEqual(["bank_the_house_light"]);
    expect(brief.recommendedRitual).not.toContain("No required ritual");
    expect(brief.recommendedRitual).toContain("Let one lowered light be the whole ritual.");
    expect(brief.recommendedRitual).toContain("Close by letting the dimmed light hold the end.");
    expect(brief.reflectionPrompt).toBe("What can rest in the lowered light?");
  });

  it("does not add a generic candle add-on to presented candle or light rituals", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      preferredRitualStyles: ["light_focus", "candle_or_light"],
      excludedRitualPatternKeys: approvedPatternKeyList.filter(
        (key) => key !== "morning_light_pause",
      ),
    });

    expect(brief.trace.ritualPatterns).toEqual(["morning_light_pause"]);
    expect(brief.optionalAddOn).toBe("No add-on needed.");
    expect(brief.recommendedRitual).toContain("Use the light already available.");
  });

  it("uses contextual optional accents without generic candle filler", () => {
    const plantBrief = generateWeeklyBrief(
      qualityScenarioInput("batch1.plant.dead_leaf_release"),
    );
    const seedBrief = generateWeeklyBrief(
      qualityScenarioInput("issue183.plant.beginning.seed"),
    );
    const lightBrief = generateWeeklyBrief(
      qualityScenarioInput("issue183.candle.full_saying_clearly"),
    );
    const noFlameBrief = generateWeeklyBrief(
      qualityScenarioInput("candle.live_flame_avoided"),
    );

    expect(plantBrief.decision.selected.ritualPatternKey).toBe("dead_leaf_release");
    expect(plantBrief.optionalAddOn).toBe(
      "Let the plant remain untouched after the spent leaf is gone.",
    );
    expect(seedBrief.decision.selected.ritualPatternKey).toBe("seed_waiting");
    expect(seedBrief.optionalAddOn).toBe(
      "Leave the seed, grain, or pot where waiting can be seen once, then stop checking it.",
    );
    expect(lightBrief.decision.selected.ritualPatternKey).toBe("full_light_on_the_table");
    expect(lightBrief.optionalAddOn).toBe("No add-on needed.");
    expect(noFlameBrief.optionalAddOn.toLowerCase()).not.toContain("candle");
    expect(noFlameBrief.optionalAddOn.toLowerCase()).not.toContain("flame");
  });

  it("keeps carry prompts tied to selected ritual materials and actions", () => {
    const cases = [
      {
        scenarioId: "batch1.plant.dead_leaf_release",
        patternKey: "dead_leaf_release",
        expectedPrompt: "What is as complete as the spent leaf?",
      },
      {
        scenarioId: "issue183.plant.beginning.seed",
        patternKey: "seed_waiting",
        expectedPrompt: "What beginning can wait like a seed or grain?",
      },
      {
        scenarioId: "batch1.kitchen.grain_beginning",
        patternKey: "grain_bowl_beginning",
        expectedPrompt: "What beginning can be held before it is acted on?",
      },
      {
        scenarioId: "batch1.home.salt_water_clearing",
        patternKey: "salt_clear_water_release",
        expectedPrompt: "What feels cleaner when it has somewhere ordinary to go?",
      },
      {
        scenarioId: "batch1.reflection.folded_phrase",
        patternKey: "carried_key_word",
        expectedPrompt: "What word can cross the threshold with you?",
      },
      {
        scenarioId: "batch1.seasonal.marker_bowl",
        patternKey: "seasonal_marker_bowl",
        expectedPrompt: "What season is this home actually in?",
      },
      {
        scenarioId: "batch1.quiet_welcome",
        patternKey: "honeyed_word",
        expectedPrompt: "What word can the sweetness cue hold and then release?",
      },
    ];

    for (const { scenarioId, patternKey, expectedPrompt } of cases) {
      const brief = generateWeeklyBrief(qualityScenarioInput(scenarioId));

      expect(brief.decision.selected.ritualPatternKey).toBe(patternKey);
      expect(brief.reflectionPrompt).toBe(expectedPrompt);
      expect(brief.reflectionPrompt.toLowerCase()).not.toContain("private_profile");
      expect(brief.reflectionPrompt.toLowerCase()).not.toContain("source.");
    }

    const foldedPhrasePattern = starterRitualPatterns.find(
      (pattern) => pattern.key === "folded_phrase_vessel",
    );

    expect(foldedPhrasePattern?.presentation?.carry).toBe(
      "What changes when the phrase has a place to be held?",
    );
  });

  it("surfaces Batch 1 lineage in source summaries without raw ids", () => {
    const saltBrief = generateWeeklyBrief(
      qualityScenarioInput("batch1.home.salt_water_clearing"),
    );
    const grainBrief = generateWeeklyBrief(
      qualityScenarioInput("batch1.kitchen.grain_beginning"),
    );

    expect(saltBrief.sourceSummary).toContain("salt and boundary folklore");
    expect(grainBrief.sourceSummary).toContain("grain/table household rhythm");
    expect(JSON.stringify(saltBrief.explanation.sourcesUsed)).toContain(
      "salt and boundary folklore",
    );
    expect(JSON.stringify(grainBrief.explanation.howThisWasChosen)).toContain(
      "grain/table household rhythm",
    );
    expect(saltBrief.sourceSummary).not.toContain("source.");
    expect(grainBrief.sourceSummary).not.toContain("note.");
  });

  it("does not append practical tone closing to a presented ritual", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending", "plant"],
      tonePreferences: ["practical"],
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["plant", "plant_tending"],
        practiceTypeLabel: "Plant",
        ritualFocusKey: "tending_the_home",
      },
    });

    expect(brief.trace.ritualPatterns).toEqual(["plant_witness_to_growth"]);
    expect(brief.recommendedRitual).toContain(
      "Close by thanking the witness in plain words and leaving the plant untouched.",
    );
    expect(brief.recommendedRitual).not.toContain("Keep it simple and useful.");
  });

  it("uses authored presentation closing instead of legacy tone preferences", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      preferredRitualStyles: ["plant_tending", "plant"],
      tonePreferences: ["warm", "direct", "symbolic", "romantic"],
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["plant", "plant_tending"],
        practiceTypeLabel: "Plant",
        ritualFocusKey: "tending_the_home",
      },
    });

    expect(brief.trace.ritualPatterns).toEqual(["plant_witness_to_growth"]);
    expect(brief.recommendedRitual).toContain(
      "Close by thanking the witness in plain words and leaving the plant untouched.",
    );
    expect(brief.recommendedRitual).not.toContain("Keep it gentle.");
    expect(brief.recommendedRitual).not.toContain("Stop there.");
    expect(brief.recommendedRitual).not.toContain("Let the action mark the moment.");
    expect(brief.recommendedRitual).not.toContain("Keep it soft.");
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

  it("keeps routine safety language out of default explanation copy", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      preferredRitualStyles: ["candle_or_light"],
    });
    const defaultOutput = JSON.stringify({
      whyThis: brief.whyThis,
      sourceSummary: brief.sourceSummary,
      filtersApplied: brief.explanation.filtersApplied,
      sourcesUsed: brief.explanation.sourcesUsed,
    });

    expect(defaultOutput).not.toContain("Safety and fit");
    expect(defaultOutput).not.toContain("Household safety guardrails");
    expect(defaultOutput).not.toContain("safety filtering");
    expect(defaultOutput).not.toContain("safety filters");
    expect(defaultOutput).not.toContain("household safety guardrails");
    expect(defaultOutput).toContain("Practical");
  });

  it("steady produces a practical recommendation around twenty minutes or less", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "steady",
      scheduleConstraints: { maxRitualDurationMinutes: 20 },
      preferredRitualStyles: ["table_reset"],
    });

    expect(brief.bestWindow).toBe("When you have a little space this week.");
    expect(brief.bestWindow).not.toContain("10-20 minutes");
    expect(brief.trace.ritualPatterns).toHaveLength(1);
    expect(brief.decision.selected.ritualPatternKey).toBe(brief.trace.ritualPatterns[0]);
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
    expect(selectedPattern?.key).toBe(brief.decision.selected.ritualPatternKey);
    expect(selectedPattern?.score).toBeGreaterThan(0);
    expect(selectedPattern?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "timing_signal_style_match" }),
        expect.objectContaining({ code: "profile_theme_match" }),
      ]),
    );
    expect(brief.decision.selected.sourceReferences.length).toBeGreaterThan(0);
    expect(brief.trace.patternSelection.selectedPatternKey).toBe(
      brief.decision.selected.ritualPatternKey,
    );
    expect(brief.trace.patternSelection.eligiblePatternKeys).toContain(
      brief.decision.selected.ritualPatternKey,
    );
  });

  it("uses current check-in practice, intention, and audience in pattern scoring", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "high",
      currentRitualCheckIn: {
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
        audience: "both_of_us",
        practiceTypeHints: ["seasonal"],
        practiceTypeLabel: "Seasonal",
        ritualFocusKey: "marking_a_threshold",
        timingWindowCandidateIds: ["timing_window.fake.safe_key"],
      },
    });
    const selectedPattern = brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
    );
    const selectedReasonCodes = selectedPattern?.scoreReasons.map(
      (reason) => reason.code,
    ) ?? [];

    expect(brief.decision.inputs.currentRitualCheckIn).toEqual({
      timeScope: "best_moment_this_week",
      energyCapacity: "room_for_something_deeper",
      capacityMode: "high",
      audience: "both_of_us",
      practiceTypeHints: ["seasonal"],
      practiceTypeLabel: "Seasonal",
      ritualFocusKey: "marking_a_threshold",
      timingWindowCandidateIds: ["timing_window.fake.safe_key"],
    });
    expect(brief.decision.inputs.checkInInfluences).toEqual(
      expect.arrayContaining(["capacity", "audience", "practice_type", "ritual_focus"]),
    );
    expect(selectedReasonCodes).toContain("checkin_capacity_answer");
    expect(selectedReasonCodes).toContain("checkin_ritual_focus_match");
    expect(brief.trace.currentRitualCheckIn).toEqual(
      brief.decision.inputs.currentRitualCheckIn,
    );
    expect(JSON.stringify(brief.explanation)).not.toContain(
      "best_moment_this_week",
    );
    expect(JSON.stringify(brief.explanation)).not.toContain(
      "marking_a_threshold",
    );
  });

  it("resolves Surprise me to a real visible practice category before scoring", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-06T12:00:00.000Z",
      capacityMode: "low",
      preferredRitualStyles: ["home_tending", "plant_tending"],
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: [],
        practiceTypeLabel: "Surprise me",
        ritualFocusKey: "tending_the_home",
      },
    });
    const selectedPattern = brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
    );
    const serializedExplanation = JSON.stringify(brief.explanation).toLowerCase();

    expect(brief.decision.inputs.practiceChoice).toMatchObject({
      selectedLabel: "Surprise me -> Home",
      selectedHints: ["home_tending"],
      status: "resolved_open_preference",
    });
    expect(brief.decision.inputs.checkInInfluences).toContain("practice_type");
    expect(selectedPattern?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "checkin_practice_type_match" }),
      ]),
    );
    expect(serializedExplanation).not.toContain("left the practice type open");
    expect(serializedExplanation).not.toContain("surprise me choice helped");
  });

  it("honors a visible practice answer when a matching ritual form exists", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      preferredRitualStyles: ["candle_or_light", "light_focus"],
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["plant", "plant_tending"],
        practiceTypeLabel: "Plant",
        ritualFocusKey: "saying_something_clearly",
      },
    });

    expect(brief.decision.inputs.practiceChoice).toMatchObject({
      selectedLabel: "Plant",
      status: "matched_selected_pattern",
      selectedPatternMatches: ["plant"],
    });
    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "check_in_fit",
          body: expect.stringContaining("Your plant choice matched"),
        }),
      ]),
    );
  });

  it("lets matched universal numerology appear only as a small accent signal", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-06T12:00:00.000Z",
      capacityMode: "low",
      preferredRitualStyles: ["home_tending", "plant_tending"],
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["home_tending"],
        practiceTypeLabel: "Home",
        ritualFocusKey: "tending_the_home",
      },
    });
    const selectedSignals = brief.trace.selectedTimingSignals;

    expect(brief.decision.inputs.numerology).toMatchObject({
      status: "matched_selected",
      selectedSignalLabels: expect.arrayContaining(["Numerology 4"]),
      matchedSignalLabels: expect.arrayContaining(["Numerology 4"]),
    });
    expect(selectedSignals[0].strength).not.toBe("accent");
    expect(selectedSignals.filter((signal) => signal.strength === "accent")).toHaveLength(1);
    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "numerology_accent",
          body: expect.stringContaining("small accent"),
        }),
      ]),
    );
    const visibleExplanationText = JSON.stringify([
      brief.explanation.whyThisFits,
      brief.explanation.signals,
      brief.explanation.howThisWasChosen,
    ]).toLowerCase();

    expect(visibleExplanationText).not.toContain("guarantee");
    expect(visibleExplanationText).not.toContain("you are a");
  });

  it("uses an across-the-week timing candidate in the decision record and scoring", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      currentRitualCheckIn: {
        timeScope: "best_moment_this_week",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "both_of_us",
        practiceTypeHints: ["candle_or_light"],
        practiceTypeLabel: "Light",
        ritualFocusKey: "tending_us",
        timingWindowCandidateIds: ["timing_window.fake.venus_leo"],
      },
      timingWindowCandidates: [
        {
          id: "timing_window.fake.venus_leo",
          startsAtIso: "2026-06-05T12:00:00.000Z",
          label: "Venus in Leo",
          timingFacts: [
            fakePlanetSignFact({
              planet: "venus",
              sign: "leo",
              degree: 12,
              longitude: 132,
            }),
          ],
          signalKeys: [],
          natalContactKeys: [],
          natalContactThemeKeys: ["visible_warmth"],
          strength: "supporting",
          score: 99,
          scoreReasons: [
            {
              code: "natal_contact_present",
              label: "Private timing contact present",
              points: 6,
              detail: "1 safe contact computed",
            },
            {
              code: "shared_natal_contact_match",
              label: "Shared private timing contact",
              points: 3,
            },
          ],
        },
      ],
    });
    const selectedPattern = brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
    );
    const selectedReasonCodes = selectedPattern?.scoreReasons.map(
      (reason) => reason.code,
    ) ?? [];

    expect(brief.decision.inputs.timeScope).toBe("best_moment_this_week");
    expect(brief.decision.inputs.selectedTimingWindow).toMatchObject({
      id: "timing_window.fake.venus_leo",
      label: "Venus in Leo",
      userWindow: "Around Friday, June 5 morning.",
      isStrong: true,
    });
    expect(brief.trace.selectedTimingWindow).toMatchObject({
      id: "timing_window.fake.venus_leo",
      label: "Venus in Leo",
      isStrong: true,
    });
    expect(brief.bestWindow).toContain("Around Friday, June 5 morning.");
    expect(brief.decision.inputs.checkInInfluences).toContain("timing_window");
    expect(brief.trace.computedTimingFacts.map((fact) => fact.id)).toContain(
      "fake.timing.venus",
    );
    expect(selectedReasonCodes).toContain("checkin_timing_window_match");
    expect(brief.whyThis).toContain("look across the week");
    expect(brief.whyThis).toContain(
      "because of a stronger match with saved household themes",
    );
    expect(brief.explanation.whyThisFits).toContain(
      "Friday, June 5 morning stood out as the strongest timing window this week.",
    );
    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "timing_choice",
          body: expect.stringContaining("Friday, June 5 morning was the strongest timing window"),
        }),
      ]),
    );
    expect(JSON.stringify(brief.explanation)).not.toContain(
      "timing_window.fake.venus_leo",
    );
  });

  it("uses pattern-native full-light presentation when full light correctly wins", () => {
    const brief = generateWeeklyBrief(
      qualityScenarioInput("issue183.candle.full_saying_clearly"),
    );
    const acrossWeekBrief = generateWeeklyBrief(
      qualityScenarioInput("best_week.clear_reason"),
    );

    expect(brief.decision.selected.ritualPatternKey).toBe("full_light_on_the_table");
    expect(brief.theme).toBe("Put one line where the light can hold it.");
    expect(brief.intention).toBe("Put one line where the light can hold it.");
    expect(brief.recommendedRitual).toContain("Use the light as witness.");
    expect(brief.recommendedRitual).toContain("Put one spoken or written line where the light falls.");
    expect(brief.recommendedRitual).toContain("Close by changing the light.");
    expect(brief.reflectionPrompt).toBe("What line is ready to be witnessed once?");
    expect(brief.theme).not.toContain("Notice what is already clear");
    expect(brief.recommendedRitual).not.toContain("without being solved");
    expect(brief.recommendedRitual).not.toContain("no explanation");
    expect(acrossWeekBrief.decision.selected.ritualPatternKey).toBe("full_light_on_the_table");
    expect(acrossWeekBrief.theme).toBe("Put one line where the light can hold it.");
    const visibleAcrossWeekCopy = JSON.stringify([
      acrossWeekBrief.theme,
      acrossWeekBrief.recommendedRitual,
      acrossWeekBrief.intention,
      acrossWeekBrief.reflectionPrompt,
      acrossWeekBrief.whyThis,
      acrossWeekBrief.explanation.whyThisFits,
      acrossWeekBrief.explanation.howThisWasChosen,
    ]).toLowerCase();
    expect(visibleAcrossWeekCopy).toContain(
      "the timing signal matched the ritual shape",
    );
    expect(visibleAcrossWeekCopy).not.toContain("primary timing signal");
    expect(visibleAcrossWeekCopy).not.toContain("timing score");
  });

  it("uses threshold-specific table-word presentation when two words correctly wins", () => {
    const brief = generateWeeklyBrief(
      qualityScenarioInput("issue183.reflection.threshold"),
    );

    expect(brief.decision.selected.ritualPatternKey).toBe("two_words_at_the_table");
    expect(brief.theme).toBe("Put a threshold word on the table.");
    expect(brief.intention).toBe("Put a threshold word on the table.");
    expect(brief.recommendedRitual).toContain("Choose a word for the crossing.");
    expect(brief.recommendedRitual).toContain("turn toward the next room or doorway.");
    expect(brief.reflectionPrompt).toBe("What word belongs at the crossing?");
    expect(brief.theme).not.toContain("Give one small thing support");
    expect(brief.recommendedRitual).not.toContain("No explanation is required");
    expect(brief.recommendedRitual).not.toContain("without discussion");
  });

  it("surfaces when across-the-week timing is not strong enough to shape the ritual", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      currentRitualCheckIn: {
        timeScope: "best_moment_this_week",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["plant_tending"],
        practiceTypeLabel: "Plant",
        ritualFocusKey: "tending_the_home",
        timingWindowCandidateIds: ["timing_window.fake.weak"],
      },
      timingWindowCandidates: [
        {
          id: "timing_window.fake.weak",
          startsAtIso: "2026-06-07T00:00:00.000Z",
          label: "Universal day accent",
          timingFacts: [],
          signalKeys: [],
          natalContactKeys: [],
          natalContactThemeKeys: [],
          strength: "accent",
          score: 2,
          scoreReasons: [
            {
              code: "weak_accent",
              label: "Weak accent",
              points: 2,
            },
          ],
        },
      ],
    });
    const selectedPattern = brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
    );

    expect(brief.decision.inputs.selectedTimingWindow).toMatchObject({
      id: "timing_window.fake.weak",
      isStrong: false,
    });
    expect(brief.bestWindow).toBe(
      "No strong timing window stood out this week. When you have five quiet minutes.",
    );
    expect(brief.whyThis).toContain("no timing window stood out strongly enough");
    expect(brief.explanation.whyThisFits).toContain(
      "No single timing window stood out strongly this week.",
    );
    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "timing_choice",
          body: expect.stringContaining("whenever it feels workable"),
        }),
      ]),
    );
    expect(brief.decision.inputs.checkInInfluences).not.toContain("timing_window");
    expect(selectedPattern?.scoreReasons.map((reason) => reason.code)).not.toContain(
      "checkin_timing_window_match",
    );
  });

  it("shapes making-a-beginning focus during waning timing instead of pretending it fully aligns", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      timingFacts: ["moon.waning"],
      capacityMode: "low",
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        practiceTypeHints: ["home_tending"],
        practiceTypeLabel: "Home",
        ritualFocusKey: "making_a_beginning",
      },
    });

    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "ritual_focus",
          body: expect.stringContaining("better for preparation than a big launch"),
        }),
      ]),
    );
    expect(brief.explanation.whyThisFits).not.toContain("Everything aligned");
  });

  it("explains a smaller relational ritual when tending-us focus meets low capacity", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
      currentRitualCheckIn: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "both_of_us",
        practiceTypeHints: ["conversation"],
        practiceTypeLabel: "Conversation",
        ritualFocusKey: "tending_us",
      },
    });

    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "ritual_focus",
          body: expect.stringContaining("smaller shared ritual"),
        }),
        expect.objectContaining({
          kind: "capacity_boundary",
          body: expect.stringContaining("stays small"),
        }),
      ]),
    );
  });

  it("can reuse the same current check-in context when trying another approved option", () => {
    const currentRitualCheckIn = {
      timeScope: "today" as const,
      energyCapacity: "a_little" as const,
      capacityMode: "low" as const,
      practiceTypeHints: ["plant_tending"],
    };
    const firstBrief = generateWeeklyBrief({
      capacityMode: currentRitualCheckIn.capacityMode,
      currentRitualCheckIn,
    });
    const nextBrief = generateWeeklyBrief({
      capacityMode: currentRitualCheckIn.capacityMode,
      currentRitualCheckIn,
      excludedRitualPatternKeys: firstBrief.trace.ritualPatterns,
    });

    expect(nextBrief.trace.currentRitualCheckIn).toEqual(currentRitualCheckIn);
    expect(nextBrief.trace.ritualPatterns[0]).not.toBe(
      firstBrief.trace.ritualPatterns[0],
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
    expect(serializedExplanation).not.toContain("\"source.");
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
    expect(brief.decision.selected.natalContacts.length).toBeLessThanOrEqual(3);
    expect(brief.decision.selected.natalContactThemeKeys).toEqual(
      expect.arrayContaining(["visible_warmth", "private_natal_contact"]),
    );
    expect(brief.whyThis).toContain(
      "Private-profile scoring added a small fit note for visible warmth",
    );
    expect(brief.explanation.whyThisFits).not.toContain("natal Venus");
    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "natal_fit",
          body: expect.stringContaining("Private timing contacts added weight"),
        }),
      ]),
    );
    expect(brief.whyThis).not.toContain("Your chart says");
    expect(brief.whyThis).not.toContain("will bring");
  });

  it("caps selected natal contacts and private profile theme scoring", () => {
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
        fakePlanetSignFact({
          planet: "mars",
          sign: "taurus",
          degree: 10,
          longitude: 40,
        }),
        fakePlanetSignFact({
          planet: "moon",
          sign: "scorpio",
          degree: 13,
          longitude: 223,
        }),
      ],
      capacityMode: "steady",
      audience: "either",
      profileInputs: [
        {
          audience: "person_a",
          label: "Person A",
          profileThemeKeys: [
            "private_profile.practical_tending",
            "private_profile.beauty_warmth",
            "private_profile.structured_action",
          ],
          astrologyProfileThemeKeys: [
            "private_profile.practical_tending",
            "private_profile.beauty_warmth",
            "private_profile.structured_action",
          ],
        },
        {
          audience: "person_b",
          label: "Person B",
          profileThemeKeys: [
            "private_profile.practical_tending",
            "private_profile.beauty_warmth",
            "private_profile.structured_action",
          ],
          astrologyProfileThemeKeys: [
            "private_profile.practical_tending",
            "private_profile.beauty_warmth",
            "private_profile.structured_action",
          ],
        },
      ],
      natalProfiles: fakeManyContactProfiles,
      astrologyVisibility: "balanced",
    });
    const selectedPattern = brief.decision.candidates.ritualPatterns.find(
      (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
    );
    const profileThemeReason = selectedPattern?.scoreReasons.find(
      (reason) => reason.code === "profile_theme_match",
    );
    const natalContactReason = selectedPattern?.scoreReasons.find(
      (reason) => reason.code === "natal_contact_theme_match",
    );

    expect(brief.decision.inputs.natalContactsComputed).toBeGreaterThan(3);
    expect(brief.decision.selected.natalContacts.length).toBeLessThanOrEqual(3);
    expect(brief.trace.selectedNatalContacts.length).toBeLessThanOrEqual(3);
    expect(profileThemeReason?.points).toBeLessThanOrEqual(8);
    expect(natalContactReason?.points).toBeLessThanOrEqual(2);
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

    expect(brief.whyThis).toContain("small fit note for visible warmth");
    expect(brief.whyThis).toContain("exact chart contacts stay in debug");
    expect(brief.explanation.whyThisFits).not.toContain("natal Venus");
    expect(brief.whyThis).not.toContain("Venus in Leo");
    expect(brief.whyThis).not.toContain("natal Venus");
  });

  it("keeps explicit natal visibility thematic in the default why text", () => {
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

    expect(brief.whyThis).toContain("small fit note for visible warmth");
    expect(brief.whyThis).toContain("exact chart contacts stay in debug");
    expect(brief.explanation.howThisWasChosen).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "natal_fit",
          body: expect.stringContaining("private natal Venus"),
        }),
      ]),
    );
    expect(brief.whyThis).not.toContain("Venus in Leo");
    expect(brief.whyThis).not.toContain("private natal Venus");
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
    expect(brief.explanation.whyThisFits).toContain("practical home-tending magic");
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
    const selectedPattern = getSelectedPattern(brief);
    const selectedPatternDecision = getSelectedPatternDecision(brief);
    const selectedReasonCodes = selectedPatternDecision?.scoreReasons.map(
      (reason) => reason.code,
    ) ?? [];

    expect(brief.trace.ritualPatterns).toHaveLength(1);
    expect(approvedPatternKeys.has(brief.trace.ritualPatterns[0] ?? "")).toBe(true);
    expect(selectedPattern?.capacityModes).toContain("low");
    expect(selectedReasonCodes).toContain("profile_theme_match");
    expect(brief.trace.profileSignalKeys).toEqual([
      "profile_theme.person_b.private_profile.beauty_warmth",
      "natal_theme.person_b.private_profile.beauty_warmth",
    ]);
    expect(brief.whyThis).toContain("warmth, beauty, and affection");
    expect(brief.whyThis).toContain("Saved natal-chart themes");
    expect(brief.explanation.whyThisFits).toContain("warmth, beauty, and affection");
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
    const withBeautyThemeSelectedPattern = getSelectedPattern(withBeautyTheme);
    const withBeautyThemePatternDecision = getSelectedPatternDecision(withBeautyTheme);
    const withoutBeautyThemePatternDecision = getSelectedPatternDecision(withoutBeautyTheme);
    const withBeautyThemeReasonCodes = withBeautyThemePatternDecision?.scoreReasons.map(
      (reason) => reason.code,
    ) ?? [];
    const withoutBeautyThemeReasonCodes = withoutBeautyThemePatternDecision?.scoreReasons.map(
      (reason) => reason.code,
    ) ?? [];

    expect(withBeautyTheme.trace.ritualPatterns).toHaveLength(1);
    expect(approvedPatternKeys.has(withBeautyTheme.trace.ritualPatterns[0] ?? "")).toBe(true);
    expect(withBeautyThemeSelectedPattern?.capacityModes).toContain("low");
    expect(withBeautyTheme.trace.profileSignalKeys).toEqual([
      "profile_theme.person_b.private_profile.beauty_warmth",
      "natal_theme.person_b.private_profile.beauty_warmth",
    ]);
    expect(withBeautyThemeReasonCodes).toContain("profile_theme_match");
    expect(withBeautyThemePatternDecision?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "profile_theme_match",
          detail: expect.stringContaining("beauty_warmth"),
        }),
      ]),
    );
    expect(withoutBeautyThemeReasonCodes).toContain("profile_theme_match");
    expect(withoutBeautyThemePatternDecision?.scoreReasons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "profile_theme_match",
          detail: expect.stringContaining("practical_tending"),
        }),
      ]),
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
