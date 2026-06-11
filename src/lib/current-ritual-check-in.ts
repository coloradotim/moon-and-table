import {
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  type RitualCarrier,
  type RitualPurpose,
} from "../data/rituals/types";
import type { RitualFocusOptionKey } from "../data/ritual-focus-options";
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
  | "carrier"
  | "purpose"
  | "refinement"
  | "review";

export type CurrentRitualCheckIn = {
  timeScope: RitualCheckInTimeScope;
  energyCapacity: RitualCheckInEnergyCapacity;
  capacityMode: CapacityMode;
  audience?: RitualCheckInAudience;
  practiceTypeHints?: string[];
  practiceTypeLabel?: string;
  carrier?: RitualCarrier;
  carrierLabel?: string;
  carrierOpen?: boolean;
  purpose?: RitualPurpose;
  purposeLabel?: string;
  refinement?: string;
  refinementLabel?: string;
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

export type RitualCheckInRefinementOption = {
  key: string;
  label: string;
};

export type RitualCheckInRefinementGroup = {
  purpose: RitualPurpose;
  question: string;
  options: RitualCheckInRefinementOption[];
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

export const carrierOptions: RitualCheckInOption[] = [
  {
    key: "candlelight",
    label: "In candlelight",
    description: "Flame, lamp, glow, witness.",
  },
  {
    key: "table",
    label: "At the table",
    description: "Bread, cup, shared surface, enough.",
  },
  {
    key: "doorway",
    label: "At the doorway",
    description: "Threshold, entry, crossing, month-turn.",
  },
  {
    key: "plant",
    label: "With a plant",
    description: "Growth, witness, rest, living thing.",
  },
  {
    key: "words",
    label: "In words",
    description: "Spoken, written, folded, carried.",
  },
  {
    key: "vessel",
    label: "In a vessel",
    description: "Bowl, cup, plate, holding, emptying.",
  },
  {
    key: "body",
    label: "In the body",
    description: "Touch, breath, sensuality, movement.",
  },
];

export const purposeOptions: RitualCheckInOption[] = [
  { key: "steadying", label: "Steadying", description: "Ground, rest, settle." },
  { key: "opening", label: "Opening", description: "Begin, invite, receive." },
  { key: "releasing", label: "Releasing", description: "Let go, clear, finish." },
  { key: "tending", label: "Tending", description: "Home, us, body, what's here." },
  { key: "connecting", label: "Connecting", description: "Touch, intimacy, closeness." },
  { key: "voicing", label: "Voicing", description: "Speak, write, name." },
  { key: "marking", label: "Marking", description: "Threshold, season, change." },
  { key: "blessing", label: "Blessing", description: "Honor, welcome, make sacred." },
  {
    key: "protecting",
    label: "Protecting",
    description: "Boundary, belonging, what stays held.",
  },
  {
    key: "remembering",
    label: "Remembering",
    description: "Memory, gratitude, meaning.",
  },
];

export const refinementGroups: RitualCheckInRefinementGroup[] = [
  {
    purpose: "steadying",
    question: "What needs steadying?",
    options: ["My body", "The room", "Us", "The moment"].map((label) => ({
      key: slugifyRefinement(label),
      label,
    })),
  },
  {
    purpose: "opening",
    question: "What is opening?",
    options: ["A beginning", "A welcome", "A threshold", "The month"].map((label) => ({
      key: slugifyRefinement(label),
      label,
    })),
  },
  {
    purpose: "releasing",
    question: "What is being released?",
    options: ["A hold", "A finished thing", "A small space", "A burden"].map((label) => ({
      key: slugifyRefinement(label),
      label,
    })),
  },
  {
    purpose: "tending",
    question: "What needs tending?",
    options: [
      "Me",
      "Us",
      "The home",
      "A living thing",
      "What is already here",
    ].map((label) => ({ key: slugifyRefinement(label), label })),
  },
  {
    purpose: "connecting",
    question: "What kind of connection?",
    options: ["Touch", "Sensuality", "Tenderness", "Play", "Desire", "Closeness"].map((label) => ({
      key: slugifyRefinement(label),
      label,
    })),
  },
  {
    purpose: "voicing",
    question: "What needs voice?",
    options: [
      "A clear sentence",
      "A truth",
      "A written phrase",
      "Something between us",
    ].map((label) => ({ key: slugifyRefinement(label), label })),
  },
  {
    purpose: "marking",
    question: "What are you marking?",
    options: ["A threshold", "A season", "A change", "The month turning"].map((label) => ({
      key: slugifyRefinement(label),
      label,
    })),
  },
  {
    purpose: "blessing",
    question: "What are you blessing?",
    options: ["The room", "The table", "Us", "A beginning", "What is already here"].map((label) => ({
      key: slugifyRefinement(label),
      label,
    })),
  },
  {
    purpose: "protecting",
    question: "What are you protecting?",
    options: ["Rest", "A boundary", "The threshold", "What belongs here", "Us"].map((label) => ({
      key: slugifyRefinement(label),
      label,
    })),
  },
  {
    purpose: "remembering",
    question: "What are you remembering?",
    options: ["Someone", "What changed", "What mattered", "What is still here", "Gratitude"].map((label) => ({
      key: slugifyRefinement(label),
      label,
    })),
  },
];

export function createInitialRitualCheckInDraft(): RitualCheckInDraft {
  return { step: "entry_path" };
}

function slugifyRefinement(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
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
  energyCapacity: RitualCheckInEnergyCapacity,
): RitualCheckInStep {
  return energyCapacity === "barely_any" ? "purpose" : "time_scope";
}

export function getNextStepAfterAudience(
  _energyCapacity: RitualCheckInEnergyCapacity,
): RitualCheckInStep {
  return "purpose";
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
  return "review";
}

export function getRefinementGroupForPurpose(
  purpose: RitualPurpose,
): RitualCheckInRefinementGroup {
  return refinementGroups.find((group) => group.purpose === purpose)!;
}

export function isRitualCarrier(value: string): value is RitualCarrier {
  return RITUAL_CARRIERS.includes(value as RitualCarrier);
}

export function isRitualPurpose(value: string): value is RitualPurpose {
  return RITUAL_PURPOSES.includes(value as RitualPurpose);
}

export function isRitualRefinementOption(
  purpose: RitualPurpose,
  value: string,
): boolean {
  return getRefinementGroupForPurpose(purpose).options.some(
    (option) => option.key === value,
  );
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
