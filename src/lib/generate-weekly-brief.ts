import {
  seedSymbolicCards,
  type SymbolicCard,
} from "../data/seed-symbolic-cards";

export type TimingFactKey = "moon.waning" | "numerology.6";

export type PrivateProfilePlaceholderKey =
  | "private_profile.practical_tending";

export type CapacityMode = "tiny" | "normal";

export type ScheduleAssumptionKey = "schedule.realistic_window_thursday";

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
  scheduleAssumptions?: ScheduleAssumptionKey[];
};

const DEFAULT_INPUT: Required<GenerateWeeklyBriefInput> = {
  dateRange: "Mock week",
  timingFacts: ["moon.waning", "numerology.6"],
  privateProfileKeys: ["private_profile.practical_tending"],
  capacityMode: "tiny",
  scheduleAssumptions: ["schedule.realistic_window_thursday"],
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

function getBestWindow(
  capacityMode: CapacityMode,
  scheduleAssumptions: ScheduleAssumptionKey[],
): string {
  const usesThursdayWindow = scheduleAssumptions.includes(
    "schedule.realistic_window_thursday",
  );
  const windowLabel = usesThursdayWindow
    ? "Thursday evening"
    : "A realistic window";

  return capacityMode === "tiny"
    ? `${windowLabel}, 3-5 minutes.`
    : `${windowLabel}, 10-20 minutes.`;
}

function getRecommendedRitual(
  plantTendingCard: SymbolicCard,
  capacityMode: CapacityMode,
): string {
  const plantAction =
    plantTendingCard.ritual_ideas[1] ?? plantTendingCard.ritual_ideas[0];

  return capacityMode === "tiny"
    ? `Tend one plant. ${plantAction}`
    : `Tend one plant. ${plantAction} Then pause and name one small support the household can keep offering.`;
}

function getOptionalAddOn(capacityMode: CapacityMode): string {
  return capacityMode === "tiny"
    ? "Light a candle only if that feels supportive and safe."
    : "Light a candle nearby if that feels supportive and safe.";
}

function getWhyThis(
  waningMoonCard: SymbolicCard,
  numerologySixCard: SymbolicCard,
  privateProfileCard: SymbolicCard,
  capacityMode: CapacityMode,
  scheduleAssumptions: ScheduleAssumptionKey[],
): string {
  const capacityReason =
    capacityMode === "tiny"
      ? "Because capacity is tiny, the ritual stays to 3-5 minutes."
      : "Because capacity is normal, the ritual stays under 20 minutes.";
  const scheduleReason = scheduleAssumptions.includes(
    "schedule.realistic_window_thursday",
  )
    ? "The Thursday window keeps the timing realistic."
    : "The schedule assumption keeps the timing realistic.";

  return `${waningMoonCard.title} supports ${waningMoonCard.themes[0]} and ${waningMoonCard.themes[1]}. ${numerologySixCard.title} adds a home-and-care emphasis. The ${privateProfileCard.title.toLowerCase()} favors concrete tending over abstract processing. ${scheduleReason} ${capacityReason}`;
}

export function generateWeeklyBrief(
  input: GenerateWeeklyBriefInput = {},
): WeeklyBrief {
  const resolvedInput: Required<GenerateWeeklyBriefInput> = {
    dateRange: input.dateRange ?? DEFAULT_INPUT.dateRange,
    timingFacts: input.timingFacts ?? DEFAULT_INPUT.timingFacts,
    privateProfileKeys:
      input.privateProfileKeys ?? DEFAULT_INPUT.privateProfileKeys,
    capacityMode: input.capacityMode ?? DEFAULT_INPUT.capacityMode,
    scheduleAssumptions:
      input.scheduleAssumptions ?? DEFAULT_INPUT.scheduleAssumptions,
  };

  const selectedCards = getApprovedCardsForBrief();
  const [
    waningMoonCard,
    numerologySixCard,
    plantTendingCard,
    privateProfileCard,
  ] = selectedCards;

  return {
    dateRange: resolvedInput.dateRange,
    theme: "Clear one small thing. Feed one living thing.",
    bestWindow: getBestWindow(
      resolvedInput.capacityMode,
      resolvedInput.scheduleAssumptions,
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
      resolvedInput.scheduleAssumptions,
    ),
    trace: {
      timingFacts: resolvedInput.timingFacts,
      symbolicCards: selectedCards.map(
        (card) => TRACE_KEY_BY_CARD_KEY[card.key] ?? card.key,
      ),
      privateProfileKeys: resolvedInput.privateProfileKeys,
      capacityMode: resolvedInput.capacityMode,
      scheduleAssumptions: resolvedInput.scheduleAssumptions,
    },
  };
}
