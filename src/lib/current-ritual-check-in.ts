import { ritualFocusOptions, type RitualFocusOptionKey } from "../data/ritual-focus-options";
import type { CapacityMode } from "./generate-weekly-brief";

export const RITUAL_CHECK_IN_TIME_SCOPES = [
  "today",
  "best_moment_this_week",
] as const;

export type RitualCheckInTimeScope = (typeof RITUAL_CHECK_IN_TIME_SCOPES)[number];

export const RITUAL_CHECK_IN_ENERGY_CAPACITIES = [
  "barely_any",
  "a_little",
  "enough_to_engage",
  "room_for_something_deeper",
] as const;

export type RitualCheckInEnergyCapacity =
  (typeof RITUAL_CHECK_IN_ENERGY_CAPACITIES)[number];

export const RITUAL_CHECK_IN_AUDIENCES = ["me", "both_of_us"] as const;

export type RitualCheckInAudience = (typeof RITUAL_CHECK_IN_AUDIENCES)[number];

export type RitualCheckInStep =
  | "entry_path"
  | "time_scope"
  | "energy_capacity"
  | "audience"
  | "practice_type"
  | "ritual_focus"
  | "ritual_focus_text"
  | "review";

export type CurrentRitualCheckIn = {
  timeScope: RitualCheckInTimeScope;
  energyCapacity: RitualCheckInEnergyCapacity;
  capacityMode: CapacityMode;
  audience?: RitualCheckInAudience;
  practiceTypeHints?: string[];
  practiceTypeLabel?: string;
  ritualFocusKey?: RitualFocusOptionKey;
  ritualFocusLabel?: string;
  ritualFocusText?: string;
  timingWindowCandidateIds?: string[];
};

export type RitualCheckInDraft = Partial<CurrentRitualCheckIn> & {
  step: RitualCheckInStep;
};

export type RitualCheckInOption = {
  key: string;
  label: string;
  description?: string;
  practiceTypeHints?: string[];
};

export const timeScopeOptions: RitualCheckInOption[] = [
  {
    key: "today",
    label: "For today",
  },
  {
    key: "best_moment_this_week",
    label: "Best moment this week",
  },
];

export const energyCapacityOptions: RitualCheckInOption[] = [
  {
    key: "barely_any",
    label: "Barely any",
    description: "A pause, a noticing, or one tiny act.",
  },
  {
    key: "a_little",
    label: "A little",
    description: "Five minutes or less.",
  },
  {
    key: "enough_to_engage",
    label: "Enough to engage",
    description: "A simple ritual with some attention.",
  },
  {
    key: "room_for_something_deeper",
    label: "Room for something deeper",
    description: "More time, reflection, conversation, or ritual shape.",
  },
];

export const audienceOptions: RitualCheckInOption[] = [
  { key: "me", label: "Me" },
  { key: "both_of_us", label: "Both of us" },
];

const lightPracticeOptions: RitualCheckInOption[] = [
  { key: "home", label: "Home", practiceTypeHints: ["home_tending"] },
  { key: "plant", label: "Plant", practiceTypeHints: ["plant", "plant_tending"] },
  { key: "kitchen", label: "Kitchen", practiceTypeHints: ["kitchen"] },
  { key: "candle_or_light", label: "Candle or light", practiceTypeHints: ["candle_or_light", "light_focus"] },
  { key: "surprise_me", label: "Surprise me", practiceTypeHints: [] },
];

const steadyPracticeOptions: RitualCheckInOption[] = [
  { key: "home", label: "Home", practiceTypeHints: ["home_tending"] },
  { key: "kitchen", label: "Kitchen", practiceTypeHints: ["kitchen"] },
  { key: "plant", label: "Plant", practiceTypeHints: ["plant", "plant_tending"] },
  { key: "candle_or_light", label: "Candle or light", practiceTypeHints: ["candle_or_light", "light_focus"] },
  { key: "reflection", label: "Reflection", practiceTypeHints: ["reflection"] },
  { key: "surprise_me", label: "Surprise me", practiceTypeHints: [] },
];

const deeperPracticeOptions: RitualCheckInOption[] = [
  ...steadyPracticeOptions.slice(0, -1),
  { key: "seasonal", label: "Seasonal", practiceTypeHints: ["seasonal"] },
  steadyPracticeOptions[steadyPracticeOptions.length - 1],
];

export function createInitialRitualCheckInDraft(): RitualCheckInDraft {
  return { step: "entry_path" };
}

export function getCapacityModeForEnergy(
  energyCapacity: RitualCheckInEnergyCapacity,
): CapacityMode {
  switch (energyCapacity) {
    case "barely_any":
      return "pause";
    case "a_little":
      return "low";
    case "enough_to_engage":
      return "steady";
    case "room_for_something_deeper":
      return "high";
  }
}

export function getNextStepAfterEnergy(
  _energyCapacity: RitualCheckInEnergyCapacity,
): RitualCheckInStep {
  return "audience";
}

export function getNextStepAfterAudience(
  energyCapacity: RitualCheckInEnergyCapacity,
): RitualCheckInStep {
  return energyCapacity === "barely_any" ? "ritual_focus" : "practice_type";
}

export function getPracticeOptionsForEnergy(
  energyCapacity: RitualCheckInEnergyCapacity,
): RitualCheckInOption[] {
  switch (energyCapacity) {
    case "a_little":
      return lightPracticeOptions;
    case "enough_to_engage":
      return steadyPracticeOptions;
    case "room_for_something_deeper":
      return deeperPracticeOptions;
    case "barely_any":
      return [];
  }
}

export function getNextStepAfterPractice(
  _energyCapacity: RitualCheckInEnergyCapacity,
): RitualCheckInStep {
  return "ritual_focus";
}

export function isRitualFocusOptionKey(value: string): value is RitualFocusOptionKey {
  return ritualFocusOptions.some((option) => option.key === value);
}

export function isTimeScope(value: string): value is RitualCheckInTimeScope {
  return RITUAL_CHECK_IN_TIME_SCOPES.includes(value as RitualCheckInTimeScope);
}

export function isEnergyCapacity(
  value: string,
): value is RitualCheckInEnergyCapacity {
  return RITUAL_CHECK_IN_ENERGY_CAPACITIES.includes(
    value as RitualCheckInEnergyCapacity,
  );
}

export function isCheckInAudience(value: string): value is RitualCheckInAudience {
  return RITUAL_CHECK_IN_AUDIENCES.includes(value as RitualCheckInAudience);
}

export function sanitizeRitualFocusText(value: string): string | undefined {
  const trimmed = value.trim().replace(/\s+/g, " ").slice(0, 120);

  return trimmed.length > 0 ? trimmed : undefined;
}
