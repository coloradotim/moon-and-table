import {
  seedSymbolicCards,
  type SymbolicCard,
} from "../data/seed-symbolic-cards";

export const CAPACITY_MODES = ["pause", "low", "steady", "high"] as const;

export type CapacityMode = (typeof CAPACITY_MODES)[number];

export type TimingFactKey = "moon.waning" | "numerology.6";

export type PrivateProfilePlaceholderKey =
  | "private_profile.practical_tending";

export type ScheduleAssumptionKey =
  | "schedule.symbolic_event_tuesday"
  | "schedule.realistic_window_thursday"
  | "schedule.preferred_window_saturday_morning";

export type ManualScheduleConstraints = {
  unavailableDaysOrNights: string[];
  preferredRitualWindows: ScheduleAssumptionKey[];
  recurringHouseholdConstraintNotes: string[];
  workOrSchoolConstraintNotes: string[];
  maxRitualDurationMinutes: number;
  defaultCapacityMode: CapacityMode;
};

export type WeeklyBriefTrace = {
  timingFacts: TimingFactKey[];
  symbolicCards: string[];
  privateProfileKeys: PrivateProfilePlaceholderKey[];
  capacityMode: CapacityMode;
  scheduleAssumptions: ScheduleAssumptionKey[];
};

export type WeeklyBrief = {
  dateRange: string;
  theme: string;
  bestWindow: string;
  recommendedRitual: string;
  optionalAddOn: string;
  reflectionPrompt: string;
  whyThis: string;
  trace: WeeklyBriefTrace;
};

export type GenerateWeeklyBriefInput = {
  dateRange?: string;
  timingFacts?: TimingFactKey[];
  privateProfileKeys?: PrivateProfilePlaceholderKey[];
  capacityMode?: CapacityMode;
  scheduleConstraints?: Partial<ManualScheduleConstraints>;
};

type ResolvedGenerateWeeklyBriefInput = {
  dateRange: string;
  timingFacts: TimingFactKey[];
  privateProfileKeys: PrivateProfilePlaceholderKey[];
  capacityMode: CapacityMode;
  scheduleConstraints: ManualScheduleConstraints;
};

const DEFAULT_SCHEDULE_CONSTRAINTS: ManualScheduleConstraints = {
  unavailableDaysOrNights: ["Tuesday night"],
  preferredRitualWindows: ["schedule.realistic_window_thursday"],
  recurringHouseholdConstraintNotes: [
    "Generic household constraint: weeknights need low setup.",
  ],
  workOrSchoolConstraintNotes: [
    "Generic work or school constraint: avoid the busiest night.",
  ],
  maxRitualDurationMinutes: 20,
  defaultCapacityMode: "low",
};

const DEFAULT_INPUT: ResolvedGenerateWeeklyBriefInput = {
  dateRange: "Mock week",
  timingFacts: ["moon.waning", "numerology.6"],
  privateProfileKeys: ["private_profile.practical_tending"],
  capacityMode: DEFAULT_SCHEDULE_CONSTRAINTS.defaultCapacityMode,
  scheduleConstraints: DEFAULT_SCHEDULE_CONSTRAINTS,
};

const TRACE_KEY_BY_CARD_KEY: Record<string, string> = {
  waning_moon: "moon.waning",
  numerology_6: "numerology.6",
  plant_tending: "plant.tending",
  private_profile_practical_care_theme: "private_profile.practical_tending",
  candle: "candle",
};

const CARD_KEYS_FOR_BRIEF = [
  "waning_moon",
  "numerology_6",
  "plant_tending",
  "private_profile_practical_care_theme",
] as const;

const CAPACITY_DURATION_LIMITS: Record<CapacityMode, number> = {
  pause: 0,
  low: 5,
  steady: 20,
  high: 30,
};

function getApprovedCardByKey(key: string): SymbolicCard {
  const card = seedSymbolicCards.find(
    (candidate) =>
      candidate.key === key && candidate.approval_status === "approved",
  );

  if (!card) {
    throw new Error(`Missing approved symbolic card: ${key}`);
  }

  return card;
}

function getApprovedCardsForBrief(): SymbolicCard[] {
  return CARD_KEYS_FOR_BRIEF.map((key) => getApprovedCardByKey(key));
}

function resolveScheduleConstraints(
  input?: Partial<ManualScheduleConstraints>,
): ManualScheduleConstraints {
  return {
    unavailableDaysOrNights:
      input?.unavailableDaysOrNights ??
      DEFAULT_SCHEDULE_CONSTRAINTS.unavailableDaysOrNights,
    preferredRitualWindows:
      input?.preferredRitualWindows ??
      DEFAULT_SCHEDULE_CONSTRAINTS.preferredRitualWindows,
    recurringHouseholdConstraintNotes:
      input?.recurringHouseholdConstraintNotes ??
      DEFAULT_SCHEDULE_CONSTRAINTS.recurringHouseholdConstraintNotes,
    workOrSchoolConstraintNotes:
      input?.workOrSchoolConstraintNotes ??
      DEFAULT_SCHEDULE_CONSTRAINTS.workOrSchoolConstraintNotes,
    maxRitualDurationMinutes:
      input?.maxRitualDurationMinutes ??
      DEFAULT_SCHEDULE_CONSTRAINTS.maxRitualDurationMinutes,
    defaultCapacityMode:
      input?.defaultCapacityMode ??
      DEFAULT_SCHEDULE_CONSTRAINTS.defaultCapacityMode,
  };
}

function getEffectiveDurationMinutes(
  capacityMode: CapacityMode,
  scheduleConstraints: ManualScheduleConstraints,
): number {
  return Math.min(
    CAPACITY_DURATION_LIMITS[capacityMode],
    scheduleConstraints.maxRitualDurationMinutes,
  );
}

function getPrimaryScheduleAssumption(
  scheduleConstraints: ManualScheduleConstraints,
): ScheduleAssumptionKey {
  return (
    scheduleConstraints.preferredRitualWindows[0] ??
    "schedule.realistic_window_thursday"
  );
}

function getWindowLabel(scheduleAssumption: ScheduleAssumptionKey): string {
  switch (scheduleAssumption) {
    case "schedule.preferred_window_saturday_morning":
      return "Saturday morning";
    case "schedule.symbolic_event_tuesday":
      return "Tuesday evening";
    case "schedule.realistic_window_thursday":
      return "Thursday evening";
  }
}

function getDurationLabel(capacityMode: CapacityMode, minutes: number): string {
  if (capacityMode === "pause") {
    return "no required ritual";
  }

  if (capacityMode === "low") {
    return "0-5 minutes";
  }

  if (capacityMode === "steady") {
    return `${Math.min(10, minutes)}-${minutes} minutes`;
  }

  return `${Math.min(20, minutes)}-${minutes} minutes`;
}

function getBestWindow(
  capacityMode: CapacityMode,
  scheduleConstraints: ManualScheduleConstraints,
): string {
  const scheduleAssumption = getPrimaryScheduleAssumption(scheduleConstraints);
  const windowLabel = getWindowLabel(scheduleAssumption);
  const minutes = getEffectiveDurationMinutes(
    capacityMode,
    scheduleConstraints,
  );

  return `${windowLabel}, ${getDurationLabel(capacityMode, minutes)}.`;
}

function getRecommendedRitual(
  plantTendingCard: SymbolicCard,
  capacityMode: CapacityMode,
): string {
  const plantAction =
    plantTendingCard.ritual_ideas[1] ?? plantTendingCard.ritual_ideas[0];

  switch (capacityMode) {
    case "pause":
      return "No required ritual. Place one hand on the table or doorway and silently bless the household for getting through the week.";
    case "low":
      return `Tend one plant. ${plantAction}`;
    case "steady":
      return `Tend one plant. ${plantAction} Then clear one nearby surface and name one small support the household can keep offering.`;
    case "high":
      return `Tend one plant, then clear one small neglected spot with decisive care. ${plantAction} Close by naming one thing the household is ready to stop feeding.`;
  }
}

function getOptionalAddOn(capacityMode: CapacityMode): string {
  if (capacityMode === "pause") {
    return "Let the blessing be enough.";
  }

  return "Light a candle nearby if that feels supportive and safe.";
}

function getCapacityReason(
  capacityMode: CapacityMode,
  durationMinutes: number,
): string {
  switch (capacityMode) {
    case "pause":
      return "Because capacity is pause, there is no required ritual.";
    case "low":
      return "Because capacity is low, the action stays within 0-5 minutes with no shopping, setup, or cleanup.";
    case "steady":
      return `Because capacity is steady, the ritual stays practical and within ${Math.min(10, durationMinutes)}-${durationMinutes} minutes.`;
    case "high":
      return `Because capacity is high, the ritual can be more active and decisive while staying within ${Math.min(20, durationMinutes)}-${durationMinutes} minutes.`;
  }
}

function getScheduleReason(
  scheduleConstraints: ManualScheduleConstraints,
): string {
  const primaryWindow = getPrimaryScheduleAssumption(scheduleConstraints);
  const windowLabel = getWindowLabel(primaryWindow);

  if (
    scheduleConstraints.unavailableDaysOrNights.length > 0 &&
    primaryWindow !== "schedule.symbolic_event_tuesday"
  ) {
    return `The schedule moves the ritual away from the symbolic event timing to ${windowLabel}.`;
  }

  return `The schedule points to ${windowLabel} as the realistic window.`;
}

function getWhyThis(
  waningMoonCard: SymbolicCard,
  numerologySixCard: SymbolicCard,
  privateProfileCard: SymbolicCard,
  capacityMode: CapacityMode,
  scheduleConstraints: ManualScheduleConstraints,
): string {
  const durationMinutes = getEffectiveDurationMinutes(
    capacityMode,
    scheduleConstraints,
  );

  return `${waningMoonCard.title} supports ${waningMoonCard.themes[0]} and ${waningMoonCard.themes[1]}. ${numerologySixCard.title} adds a home-and-care emphasis. The ${privateProfileCard.title.toLowerCase()} favors concrete tending over abstract processing. ${getScheduleReason(scheduleConstraints)} ${getCapacityReason(capacityMode, durationMinutes)}`;
}

export function generateWeeklyBrief(
  input: GenerateWeeklyBriefInput = {},
): WeeklyBrief {
  const scheduleConstraints = resolveScheduleConstraints(
    input.scheduleConstraints,
  );
  const capacityMode =
    input.capacityMode ?? scheduleConstraints.defaultCapacityMode;

  const resolvedInput: ResolvedGenerateWeeklyBriefInput = {
    dateRange: input.dateRange ?? DEFAULT_INPUT.dateRange,
    timingFacts: input.timingFacts ?? DEFAULT_INPUT.timingFacts,
    privateProfileKeys:
      input.privateProfileKeys ?? DEFAULT_INPUT.privateProfileKeys,
    capacityMode,
    scheduleConstraints,
  };

  const selectedCards = getApprovedCardsForBrief();
  const [
    waningMoonCard,
    numerologySixCard,
    plantTendingCard,
    privateProfileCard,
  ] = selectedCards;

  const scheduleAssumptions = [
    "schedule.symbolic_event_tuesday",
    getPrimaryScheduleAssumption(scheduleConstraints),
  ].filter(
    (scheduleAssumption, index, allScheduleAssumptions) =>
      allScheduleAssumptions.indexOf(scheduleAssumption) === index,
  ) as ScheduleAssumptionKey[];

  return {
    dateRange: resolvedInput.dateRange,
    theme: "Clear one small thing. Feed one living thing.",
    bestWindow: getBestWindow(
      resolvedInput.capacityMode,
      resolvedInput.scheduleConstraints,
    ),
    recommendedRitual: getRecommendedRitual(
      plantTendingCard,
      resolvedInput.capacityMode,
    ),
    optionalAddOn: getOptionalAddOn(resolvedInput.capacityMode),
    reflectionPrompt:
      "What part of this household needs less intensity and more tending?",
    whyThis: getWhyThis(
      waningMoonCard,
      numerologySixCard,
      privateProfileCard,
      resolvedInput.capacityMode,
      resolvedInput.scheduleConstraints,
    ),
    trace: {
      timingFacts: resolvedInput.timingFacts,
      symbolicCards: selectedCards.map(
        (card) => TRACE_KEY_BY_CARD_KEY[card.key] ?? card.key,
      ),
      privateProfileKeys: resolvedInput.privateProfileKeys,
      capacityMode: resolvedInput.capacityMode,
      scheduleAssumptions,
    },
  };
}
