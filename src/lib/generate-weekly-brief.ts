import {
  getApprovedRitualPatterns,
  type RitualPattern,
} from "../data/ritual-patterns";
import {
  seedSymbolicCards,
  type SymbolicCard,
} from "../data/seed-symbolic-cards";
import type { PrivateAudience } from "./private-data-schema";
import {
  getLunarTimingFact,
  type LunarTimingFact,
} from "./lunar-timing";
import {
  getProfilePreferenceGroup,
  getProfilePreferenceLabel,
  normalizeProfilePreferenceValues,
} from "./profile-preference-taxonomy";
import { validateRitualSafety, type RitualSafetyFlags } from "./ritual-safety";

export const CAPACITY_MODES = ["pause", "low", "steady", "high"] as const;

export type CapacityMode = (typeof CAPACITY_MODES)[number];

export type TimingFactKey =
  | "moon.new"
  | "moon.waxing"
  | "moon.full"
  | "moon.waning"
  | "numerology.6";

export type PrivateProfilePlaceholderKey =
  | "private_profile.practical_tending"
  | "private_profile.beauty_warmth"
  | "private_profile.structured_action";

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
  timingFactDetails: Array<
    Pick<
      LunarTimingFact,
      | "key"
      | "label"
      | "dateStart"
      | "dateEnd"
      | "timezone"
      | "phaseAngleDegrees"
      | "computedBy"
      | "confidence"
      | "relatedSymbolicKeys"
    >
  >;
  symbolicCards: string[];
  ritualPatterns: string[];
  sourceReviewIds: string[];
  sourceNoteIds: string[];
  privateProfileKeys: PrivateProfilePlaceholderKey[];
  profilePreferenceKeys: string[];
  capacityMode: CapacityMode;
  audience: PrivateAudience;
  scheduleAssumptions: ScheduleAssumptionKey[];
  safety: {
    excludedPatternKeys: string[];
    notes: string[];
  };
};

export type WeeklyBrief = {
  briefKey: string;
  dateRange: string;
  theme: string;
  intention: string;
  bestWindow: string;
  recommendedRitual: string;
  optionalAddOn: string;
  reflectionPrompt: string;
  whyThis: string;
  sourceSummary: string;
  trace: WeeklyBriefTrace;
};

export type GenerateWeeklyBriefInput = {
  currentDate?: Date | string;
  dateRange?: string;
  timingFacts?: TimingFactKey[];
  timingFactDetails?: LunarTimingFact[];
  privateProfileKeys?: PrivateProfilePlaceholderKey[];
  capacityMode?: CapacityMode;
  scheduleConstraints?: Partial<ManualScheduleConstraints>;
  preferredRitualStyles?: string[];
  avoidedRitualStyles?: string[];
  audience?: PrivateAudience;
  excludedRitualPatternKeys?: string[];
};

type ResolvedGenerateWeeklyBriefInput = {
  currentDate: Date;
  dateRange: string;
  timingFacts: TimingFactKey[];
  timingFactDetails: LunarTimingFact[];
  privateProfileKeys: PrivateProfilePlaceholderKey[];
  capacityMode: CapacityMode;
  scheduleConstraints: ManualScheduleConstraints;
  preferredRitualStyles: string[];
  avoidedRitualStyles: string[];
  audience: PrivateAudience;
  excludedRitualPatternKeys: string[];
};

type PatternCandidate = {
  pattern: RitualPattern;
  score: number;
  preferenceMatches: string[];
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

const DEFAULT_PRIVATE_PROFILE_KEYS: PrivateProfilePlaceholderKey[] = [
  "private_profile.practical_tending",
];

const CAPACITY_DURATION_LIMITS: Record<CapacityMode, number> = {
  pause: 0,
  low: 5,
  steady: 20,
  high: 30,
};

const MOON_CARD_KEY_BY_TIMING_FACT: Record<
  Exclude<TimingFactKey, "numerology.6">,
  string
> = {
  "moon.new": "new_moon",
  "moon.waxing": "waxing_moon",
  "moon.full": "full_moon",
  "moon.waning": "waning_moon",
};

const TRACE_KEY_BY_CARD_KEY: Record<string, string> = {
  new_moon: "moon.new",
  waxing_moon: "moon.waxing",
  full_moon: "moon.full",
  waning_moon: "moon.waning",
  numerology_6: "numerology.6",
  plant_tending: "plant.tending",
  private_profile_practical_care_theme: "private_profile.practical_tending",
  private_profile_beauty_warmth_theme: "private_profile.beauty_warmth",
  private_profile_structured_action_theme: "private_profile.structured_action",
  candle: "candle",
};

const PRIVATE_PROFILE_CARD_KEY_BY_PLACEHOLDER_KEY: Record<
  PrivateProfilePlaceholderKey,
  string
> = {
  "private_profile.practical_tending": "private_profile_practical_care_theme",
  "private_profile.beauty_warmth": "private_profile_beauty_warmth_theme",
  "private_profile.structured_action": "private_profile_structured_action_theme",
};

const DEFAULT_PATTERN_BY_CAPACITY: Record<CapacityMode, string> = {
  pause: "close_the_evening",
  low: "tend_one_plant",
  steady: "table_reset",
  high: "room_reset",
};

function isValidDate(value: Date): boolean {
  return !Number.isNaN(value.getTime());
}

function resolveCurrentDate(value: Date | string | undefined): Date {
  if (value instanceof Date && isValidDate(value)) {
    return value;
  }

  if (typeof value === "string") {
    const date = new Date(value);

    if (isValidDate(date)) {
      return date;
    }
  }

  return new Date();
}

function getWeekDateRange(date: Date): string {
  const start = new Date(date);
  const day = start.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  start.setDate(start.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${formatter.format(start)}-${formatter.format(end)}`;
}

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

function getPrimaryMoonTimingFact(timingFacts: TimingFactKey[]): Exclude<TimingFactKey, "numerology.6"> {
  return (
    timingFacts.find((fact): fact is Exclude<TimingFactKey, "numerology.6"> =>
      fact.startsWith("moon."),
    ) ?? "moon.waning"
  );
}

function getPrivateProfileCardKeys(
  privateProfileKeys: PrivateProfilePlaceholderKey[],
): string[] {
  return privateProfileKeys.map(
    (key) => PRIVATE_PROFILE_CARD_KEY_BY_PLACEHOLDER_KEY[key],
  );
}

function getApprovedCardsForBrief(
  timingFacts: TimingFactKey[],
  privateProfileKeys: PrivateProfilePlaceholderKey[],
): SymbolicCard[] {
  const moonCardKey = MOON_CARD_KEY_BY_TIMING_FACT[getPrimaryMoonTimingFact(timingFacts)];
  const cardKeys = [
    moonCardKey,
    ...getPrivateProfileCardKeys(privateProfileKeys),
  ];

  return [...new Set(cardKeys)].map((key) => getApprovedCardByKey(key));
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
    return "five minutes or less";
  }

  if (capacityMode === "steady") {
    return "about twenty minutes or less";
  }

  return "about half an hour or less";
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

function getScheduleAssumptions(
  scheduleConstraints: ManualScheduleConstraints,
): ScheduleAssumptionKey[] {
  return [
    "schedule.symbolic_event_tuesday",
    getPrimaryScheduleAssumption(scheduleConstraints),
  ].filter(
    (scheduleAssumption, index, allScheduleAssumptions) =>
      allScheduleAssumptions.indexOf(scheduleAssumption) === index,
  ) as ScheduleAssumptionKey[];
}

function normalizeStyleList(values: string[] | undefined): string[] {
  return normalizeProfilePreferenceValues(values ?? []);
}

function getCardStyleMatches(cards: SymbolicCard[], pattern: RitualPattern): string[] {
  const cardStyles = new Set(
    cards.flatMap((card) => normalizeStyleList(card.ritual_styles)),
  );

  return pattern.ritualStyles.filter((style) => cardStyles.has(style));
}

function getCleanupAvoidanceMatches(
  flags: RitualSafetyFlags,
  avoidedStyles: string[],
): string[] {
  const matches: string[] = [];

  if (
    avoidedStyles.includes("heavy_cleanup") &&
    (flags.cleanupBurden === "medium" || flags.cleanupBurden === "high")
  ) {
    matches.push("heavy_cleanup");
  }

  if (avoidedStyles.includes("live_flame") && flags.fire === "live_flame") {
    matches.push("live_flame");
  }

  if (avoidedStyles.includes("smoke") && flags.smoke !== "none") {
    matches.push("smoke");
  }

  if (
    avoidedStyles.includes("emotionally_heavy") &&
    flags.emotionalIntensity === "avoid_when_low_capacity"
  ) {
    matches.push("emotionally_heavy");
  }

  return matches;
}

function getBurdenAvoidanceMatches(
  pattern: RitualPattern,
  avoidedStyles: string[],
): string[] {
  const avoidText = [...pattern.avoidIf, ...pattern.materials].join(" ").toLowerCase();
  const matches = getCleanupAvoidanceMatches(pattern.safetyFlags, avoidedStyles);

  if (
    avoidedStyles.includes("shopping_required") &&
    (avoidText.includes("shopping") || avoidText.includes("special"))
  ) {
    matches.push("shopping_required");
  }

  if (
    avoidedStyles.includes("long_journaling") &&
    (avoidText.includes("journal") || pattern.steps.join(" ").toLowerCase().includes("write"))
  ) {
    matches.push("long_journaling");
  }

  if (
    avoidedStyles.includes("elaborate_setup") &&
    (pattern.defaultDurationMinutes > 20 || pattern.materials.length > 3)
  ) {
    matches.push("elaborate_setup");
  }

  return [...new Set(matches)];
}

function getAvoidanceMatches(pattern: RitualPattern, avoidedStyles: string[]): string[] {
  const directMatches = pattern.ritualStyles.filter((style) =>
    avoidedStyles.includes(style),
  );

  return [
    ...directMatches,
    ...getBurdenAvoidanceMatches(pattern, avoidedStyles),
  ].filter(
    (match, index, matches) => matches.indexOf(match) === index,
  );
}

function getEligiblePatternCandidates(
  input: ResolvedGenerateWeeklyBriefInput,
  selectedCards: SymbolicCard[],
): {
  candidates: PatternCandidate[];
  excludedPatternKeys: string[];
  safetyNotes: string[];
} {
  const approvedPatterns = getApprovedRitualPatterns();
  const excludedPatternKeys: string[] = [];
  const safetyNotes: string[] = [];
  const candidates = approvedPatterns.flatMap((pattern): PatternCandidate[] => {
    const safetyResult = validateRitualSafety(pattern.safetyFlags, pattern.steps);

    safetyNotes.push(...safetyResult.warnings);

    if (input.excludedRitualPatternKeys.includes(pattern.key)) {
      excludedPatternKeys.push(pattern.key);
      safetyNotes.push(`${pattern.key} skipped because try-again requested another pattern`);
      return [];
    }

    if (!safetyResult.allowed || !pattern.capacityModes.includes(input.capacityMode)) {
      excludedPatternKeys.push(pattern.key);
      return [];
    }

    const avoidanceMatches = getAvoidanceMatches(
      pattern,
      input.avoidedRitualStyles,
    );

    if (avoidanceMatches.length > 0) {
      excludedPatternKeys.push(pattern.key);
      safetyNotes.push(
        `${pattern.key} skipped for avoided preference: ${avoidanceMatches.join(", ")}`,
      );
      return [];
    }

    const preferenceMatches = pattern.ritualStyles.filter((style) =>
      input.preferredRitualStyles.includes(style),
    );
    const cardStyleMatches = getCardStyleMatches(selectedCards, pattern);
    const defaultPatternBoost =
      pattern.key === DEFAULT_PATTERN_BY_CAPACITY[input.capacityMode] ? 1 : 0;
    const practicalProfileBoost =
      input.privateProfileKeys.includes("private_profile.practical_tending") &&
      pattern.ritualStyles.some((style) =>
        ["home_tending", "plant", "plant_tending", "kitchen"].includes(style),
      )
        ? 1
        : 0;
    const highCapacityBoost =
      input.capacityMode === "high" && pattern.defaultDurationMinutes >= 10 ? 1 : 0;
    const score =
      preferenceMatches.length * 3 +
      cardStyleMatches.length * 2 +
      defaultPatternBoost +
      practicalProfileBoost +
      highCapacityBoost;

    return [{ pattern, score, preferenceMatches }];
  });

  return {
    candidates,
    excludedPatternKeys: [...new Set(excludedPatternKeys)],
    safetyNotes: [...new Set(safetyNotes)],
  };
}

function selectPattern(
  input: ResolvedGenerateWeeklyBriefInput,
  selectedCards: SymbolicCard[],
): {
  pattern: RitualPattern;
  preferenceMatches: string[];
  excludedPatternKeys: string[];
  safetyNotes: string[];
} {
  const { candidates, excludedPatternKeys, safetyNotes } =
    getEligiblePatternCandidates(input, selectedCards);
  const sortedCandidates = [...candidates].sort(
    (a, b) => b.score - a.score,
  );

  if (sortedCandidates[0]) {
    return {
      pattern: sortedCandidates[0].pattern,
      preferenceMatches: sortedCandidates[0].preferenceMatches,
      excludedPatternKeys,
      safetyNotes,
    };
  }

  const fallbackPattern = getApprovedRitualPatterns().find(
    (pattern) => pattern.key === "close_the_evening",
  );

  if (!fallbackPattern) {
    throw new Error("Missing approved fallback ritual pattern: close_the_evening");
  }

  return {
    pattern: fallbackPattern,
    preferenceMatches: [],
    excludedPatternKeys,
    safetyNotes: [
      ...safetyNotes,
      "fallback pattern selected because no preferred pattern fit capacity and safety constraints",
    ],
  };
}

function getRecommendedRitual(
  pattern: RitualPattern,
  capacityMode: CapacityMode,
): string {
  if (capacityMode === "pause") {
    return `No required ritual. ${pattern.steps.join(" ")}`;
  }

  return pattern.steps.join(" ");
}

function getOptionalAddOn(
  pattern: RitualPattern,
  avoidedRitualStyles: string[],
): string {
  if (pattern.key === "candle_light_focus") {
    return "No add-on needed.";
  }

  if (!avoidedRitualStyles.includes("live_flame")) {
    return "Light a candle if that feels supportive and safe.";
  }

  return "No add-on needed.";
}

function getTimingReason(card: SymbolicCard, timingFact?: LunarTimingFact): string {
  if (timingFact) {
    return `The lunar timing points toward ${timingFact.label.toLowerCase()} themes of ${card.themes[0]} and ${card.themes[1]}.`;
  }

  return `${card.title} brings in themes of ${card.themes[0]} and ${card.themes[1]}.`;
}

function getCapacityReason(
  capacityMode: CapacityMode,
  durationMinutes: number,
): string {
  switch (capacityMode) {
    case "pause":
      return "This is a pause week, so there is no required ritual.";
    case "low":
      return "This stays small because household capacity is low right now.";
    case "steady":
      return "This fits a steady week by staying practical and about twenty minutes or less.";
    case "high":
      return "This can be a little more active while staying about half an hour or less.";
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
    return `The best window moves to ${windowLabel} so the timing fits real life.`;
  }

  return `${windowLabel} looks like the realistic window.`;
}

function getPreferenceReason(
  preferenceMatches: string[],
  avoidedRitualStyles: string[],
): string {
  if (preferenceMatches.length > 0) {
    const labels = preferenceMatches
      .slice(0, 2)
      .map((preference) => getProfilePreferenceLabel(preference).toLowerCase());

    return `Your saved preferences lean toward ${labels.join(" and ")}.`;
  }

  const burdenAvoidances = avoidedRitualStyles.filter(
    (style) => getProfilePreferenceGroup(style) === "burden_avoid_flag",
  );

  if (burdenAvoidances.length > 0) {
    const labels = burdenAvoidances
      .slice(0, 2)
      .map((preference) => getProfilePreferenceLabel(preference).toLowerCase());

    return `It avoids ${labels.join(" and ")} because those are marked as a poor fit.`;
  }

  return "Your household settings help keep the suggestion practical and private.";
}

function getWhyThis(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  privateProfileCard: SymbolicCard | undefined,
  input: ResolvedGenerateWeeklyBriefInput,
  preferenceMatches: string[],
  excludedPatternKeys: string[],
): string {
  const durationMinutes = getEffectiveDurationMinutes(
    input.capacityMode,
    input.scheduleConstraints,
  );
  const profileReason = privateProfileCard
    ? `Your household settings point toward ${privateProfileCard.themes[0]}.`
    : "Your household settings stay private while shaping the brief.";
  const safetyReason =
    excludedPatternKeys.length > 0
      ? `A few options were set aside because they did not fit current capacity, safety, or preferences.`
      : "";

  return `${getTimingReason(timingCard, input.timingFactDetails[0])} ${pattern.title} fits as one simple home practice for that theme. ${getPreferenceReason(preferenceMatches, input.avoidedRitualStyles)} ${safetyReason} ${profileReason} ${getScheduleReason(input.scheduleConstraints)} ${getCapacityReason(input.capacityMode, durationMinutes)}`.replace(/\s+/g, " ").trim();
}

function getTheme(timingCard: SymbolicCard, pattern: RitualPattern): string {
  const timingPhraseByKey: Partial<Record<TimingFactKey, string>> = {
    "moon.new": "Begin quietly.",
    "moon.waxing": "Give one small thing support.",
    "moon.full": "Notice what is already clear.",
    "moon.waning": "Clear one small thing.",
  };
  const patternPhraseByKey: Record<string, string> = {
    clear_one_surface: "Let one surface breathe.",
    tend_one_plant: "Tend one living thing.",
    candle_light_focus: "Pause with candlelight.",
    table_reset: "Make the table easier to use.",
    threshold_reset: "Soften one threshold.",
    room_reset: "Make one room corner easier.",
    close_the_evening: "Let the evening close gently.",
    tea_ritual: "Make one warm pause.",
    simple_warm_drink: "Make one warm care moment.",
    kitchen_reset: "Quiet one kitchen corner.",
  };
  const timingPhrase =
    timingPhraseByKey[TRACE_KEY_BY_CARD_KEY[timingCard.key] as TimingFactKey] ??
    "Choose one useful household ritual.";
  const patternPhrase =
    patternPhraseByKey[pattern.key] ?? pattern.summary;

  return `${timingPhrase} ${patternPhrase}`;
}

function getIntention(pattern: RitualPattern, capacityMode: CapacityMode): string {
  if (capacityMode === "pause") {
    return "Let doing less count as care.";
  }

  const intentionByPattern: Record<string, string> = {
    clear_one_surface: "Let one small clearing make room.",
    tend_one_plant: "Let care be small and real.",
    candle_light_focus: "Let attention gather gently.",
    table_reset: "Let the table feel easier to return to.",
    threshold_reset: "Let the doorway feel kind.",
    room_reset: "Let one corner become easier.",
    close_the_evening: "Let the day end without extra effort.",
    tea_ritual: "Let warmth be enough for a moment.",
    simple_warm_drink: "Let care arrive in a simple form.",
    kitchen_reset: "Let the kitchen feel a little quieter.",
  };

  return intentionByPattern[pattern.key] ?? "Let one useful act be enough.";
}

function getReflectionPrompt(timingFact: TimingFactKey): string {
  switch (timingFact) {
    case "moon.new":
      return "What is one small thing this household can make room for this week?";
    case "moon.waxing":
      return "What ordinary support would help this household keep going gently?";
    case "moon.full":
      return "What is already clear enough to acknowledge without making it bigger?";
    case "moon.waning":
      return "What can this household stop feeding with attention this week?";
    case "numerology.6":
      return "What kind of care would feel useful instead of obligatory?";
  }
}

function getSourceSummary(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  safetyNotes: string[],
): string {
  const safetySummary =
    safetyNotes.length > 0 ? ", safety guardrails" : "";

  return `Sources: ${timingCard.title.toLowerCase()} card, ${pattern.title.toLowerCase()} pattern${safetySummary}.`;
}

function splitSourceReferences(sourceReferences: string[]): {
  sourceReviewIds: string[];
  sourceNoteIds: string[];
} {
  return {
    sourceReviewIds: sourceReferences.filter((reference) =>
      reference.startsWith("source.") || reference.startsWith("docs/"),
    ),
    sourceNoteIds: sourceReferences.filter((reference) =>
      reference.startsWith("note."),
    ),
  };
}

function resolveInput(input: GenerateWeeklyBriefInput): ResolvedGenerateWeeklyBriefInput {
  const currentDate = resolveCurrentDate(input.currentDate);
  const scheduleConstraints = resolveScheduleConstraints(
    input.scheduleConstraints,
  );
  const capacityMode =
    input.capacityMode ?? scheduleConstraints.defaultCapacityMode;
  const lunarTimingFact = getLunarTimingFact(currentDate);
  const timingFactDetails =
    input.timingFactDetails ??
    (input.timingFacts === undefined ? [lunarTimingFact] : []);
  const timingFacts =
    input.timingFacts ??
    (timingFactDetails.length > 0
      ? timingFactDetails.map((fact) => fact.key)
      : [lunarTimingFact.key]);

  return {
    currentDate,
    dateRange: input.dateRange ?? getWeekDateRange(currentDate),
    timingFacts,
    timingFactDetails,
    privateProfileKeys:
      input.privateProfileKeys ?? DEFAULT_PRIVATE_PROFILE_KEYS,
    capacityMode,
    scheduleConstraints,
    preferredRitualStyles: normalizeStyleList(input.preferredRitualStyles),
    avoidedRitualStyles: normalizeStyleList(input.avoidedRitualStyles),
    audience: input.audience ?? "either",
    excludedRitualPatternKeys: input.excludedRitualPatternKeys ?? [],
  };
}

function slugPart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}

function getBriefKey(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
): string {
  return [
    "brief",
    slugPart(input.dateRange),
    input.timingFacts.map(slugPart).join("_"),
    input.capacityMode,
    input.audience,
    pattern.key,
  ].filter(Boolean).join(".");
}

export function generateWeeklyBrief(
  input: GenerateWeeklyBriefInput = {},
): WeeklyBrief {
  const resolvedInput = resolveInput(input);
  const selectedCards = getApprovedCardsForBrief(
    resolvedInput.timingFacts,
    resolvedInput.privateProfileKeys,
  );
  const timingCard = selectedCards[0];
  const privateProfileCard = selectedCards.find(
    (card) => card.category === "private_profile_theme",
  );
  const {
    pattern,
    preferenceMatches,
    excludedPatternKeys,
    safetyNotes,
  } = selectPattern(resolvedInput, selectedCards);
  const sourceReferences = [
    ...timingCard.source_references,
    ...pattern.sourceReferences,
    ...(privateProfileCard?.source_references ?? []),
  ];
  const { sourceReviewIds, sourceNoteIds } = splitSourceReferences([
    ...new Set(sourceReferences),
  ]);

  return {
    briefKey: getBriefKey(resolvedInput, pattern),
    dateRange: resolvedInput.dateRange,
    theme: getTheme(timingCard, pattern),
    intention: getIntention(pattern, resolvedInput.capacityMode),
    bestWindow: getBestWindow(
      resolvedInput.capacityMode,
      resolvedInput.scheduleConstraints,
    ),
    recommendedRitual: getRecommendedRitual(
      pattern,
      resolvedInput.capacityMode,
    ),
    optionalAddOn: getOptionalAddOn(
      pattern,
      resolvedInput.avoidedRitualStyles,
    ),
    reflectionPrompt: getReflectionPrompt(
      getPrimaryMoonTimingFact(resolvedInput.timingFacts),
    ),
    whyThis: getWhyThis(
      timingCard,
      pattern,
      privateProfileCard,
      resolvedInput,
      preferenceMatches,
      excludedPatternKeys,
    ),
    sourceSummary: getSourceSummary(timingCard, pattern, safetyNotes),
    trace: {
      timingFacts: resolvedInput.timingFacts,
      timingFactDetails: resolvedInput.timingFactDetails.map((fact) => ({
        key: fact.key,
        label: fact.label,
        dateStart: fact.dateStart,
        dateEnd: fact.dateEnd,
        timezone: fact.timezone,
        phaseAngleDegrees: fact.phaseAngleDegrees,
        computedBy: fact.computedBy,
        confidence: fact.confidence,
        relatedSymbolicKeys: fact.relatedSymbolicKeys,
      })),
      symbolicCards: selectedCards.map(
        (card) => TRACE_KEY_BY_CARD_KEY[card.key] ?? card.key,
      ),
      ritualPatterns: [pattern.key],
      sourceReviewIds,
      sourceNoteIds,
      privateProfileKeys: resolvedInput.privateProfileKeys,
      profilePreferenceKeys: [
        ...resolvedInput.preferredRitualStyles,
        ...resolvedInput.avoidedRitualStyles,
      ],
      capacityMode: resolvedInput.capacityMode,
      audience: resolvedInput.audience,
      scheduleAssumptions: getScheduleAssumptions(
        resolvedInput.scheduleConstraints,
      ),
      safety: {
        excludedPatternKeys,
        notes: safetyNotes,
      },
    },
  };
}
