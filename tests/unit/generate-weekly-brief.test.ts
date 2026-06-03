import { describe, expect, it } from "vitest";

import { starterRitualPatterns } from "../../src/data/ritual-patterns";
import { seedSymbolicCards } from "../../src/data/seed-symbolic-cards";
import {
  CAPACITY_MODES,
  generateWeeklyBrief,
} from "../../src/lib/generate-weekly-brief";
import { getLunarTimingFact } from "../../src/lib/lunar-timing";

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

describe("generateWeeklyBrief", () => {
  it("returns the required weekly brief shape", () => {
    const brief = generateWeeklyBrief({ currentDate: "2026-06-03T12:00:00.000Z" });

    expect(brief).toMatchObject({
      dateRange: expect.any(String),
      briefKey: expect.any(String),
      theme: expect.any(String),
      bestWindow: expect.any(String),
      recommendedRitual: expect.any(String),
      optionalAddOn: expect.any(String),
      reflectionPrompt: expect.any(String),
      whyThis: expect.any(String),
      sourceSummary: expect.any(String),
      trace: expect.any(Object),
    });
    expect(brief.whyThis.length).toBeGreaterThan(0);
    expect(brief.sourceSummary).toContain("Sources:");
    expect(brief.theme).toMatch(/^[A-Z].*[.!?]$/);
    expect(brief.theme).not.toContain(" with offer ");
    expect(brief.theme).not.toContain("beginning with");
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

    expect(brief.bestWindow).toContain("no required ritual");
    expect(brief.recommendedRitual).toContain("No required ritual");
    expect(brief.whyThis).toContain("pause week");
  });

  it("low produces a 0-5 minute recommendation with no setup burden", () => {
    const brief = generateWeeklyBrief({ capacityMode: "low" });

    expect(brief.bestWindow).toContain("0-5 minutes");
    expect(brief.whyThis).toContain("stays small");
  });

  it("steady produces a 10-20 minute practical recommendation", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "steady",
      scheduleConstraints: { maxRitualDurationMinutes: 20 },
      preferredRitualStyles: ["table_reset"],
    });

    expect(brief.bestWindow).toContain("10-20 minutes");
    expect(brief.trace.ritualPatterns).toEqual(["table_reset"]);
    expect(brief.whyThis).toContain("steady week");
  });

  it("high produces an active recommendation without creating a task list", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "high",
      scheduleConstraints: { maxRitualDurationMinutes: 30 },
      preferredRitualStyles: ["surface_reset"],
    });

    expect(brief.bestWindow).toContain("20-30 minutes");
    expect(brief.recommendedRitual.split("\n")).toHaveLength(1);
    expect(brief.recommendedRitual).not.toContain("1.");
    expect(brief.recommendedRitual).not.toContain("2.");
    expect(brief.trace.ritualPatterns).toHaveLength(1);
  });

  it("schedule constraints can move the recommended window", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "low",
      scheduleConstraints: {
        unavailableDaysOrNights: ["Tuesday night"],
        preferredRitualWindows: ["schedule.preferred_window_saturday_morning"],
        maxRitualDurationMinutes: 5,
      },
    });

    expect(brief.bestWindow).toContain("Saturday morning");
    expect(brief.bestWindow).not.toContain("Tuesday");
    expect(brief.whyThis).toContain("fits real life");
    expect(brief.trace.scheduleAssumptions).toEqual([
      "schedule.symbolic_event_tuesday",
      "schedule.preferred_window_saturday_morning",
    ]);
  });

  it("avoided styles and burdens can exclude a pattern", () => {
    const brief = generateWeeklyBrief({
      capacityMode: "steady",
      preferredRitualStyles: ["table_reset", "surface_reset"],
      avoidedRitualStyles: ["table_reset", "heavy_cleanup"],
    });

    expect(brief.trace.ritualPatterns).not.toEqual(["table_reset"]);
    expect(brief.trace.safety.excludedPatternKeys).toContain("table_reset");
    expect(brief.whyThis).toContain("A few options were set aside");
    expect(brief.whyThis).not.toContain("filter");
    expect(brief.whyThis).not.toContain("pattern option");
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
    expect(brief.trace.timingFactDetails).toHaveLength(1);
    expect(brief.trace.timingFactDetails[0]).toMatchObject({
      key: "moon.full",
      label: "Full moon",
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
    expect(brief.trace.scheduleAssumptions).toEqual([
      "schedule.symbolic_event_tuesday",
      "schedule.realistic_window_thursday",
    ]);
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
        computedBy: "astronomy_engine",
      }),
    ]);
    expect(brief.whyThis).toContain("new moon themes");
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
  });

  it("keeps generated output non-identifying", () => {
    const serializedBrief = JSON.stringify(generateWeeklyBrief()).toLowerCase();

    expect(serializedBrief).toContain("private_profile.practical_tending");
    expect(serializedBrief).not.toContain("birth");
    expect(serializedBrief).not.toContain("natal");
    expect(serializedBrief).not.toContain("relationship details");
    expect(serializedBrief).not.toContain("private source text");
  });
});
