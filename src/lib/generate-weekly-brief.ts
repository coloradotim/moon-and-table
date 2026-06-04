import {
  getApprovedRitualPatterns,
  starterRitualPatterns,
  type RitualPattern,
  type RitualPresentation,
} from "../data/ritual-patterns";
import {
  seedSymbolicCards,
  type SymbolicCard,
} from "../data/seed-symbolic-cards";
import {
  starterSourceReviews,
  starterSourceNotes,
} from "../data/source-registry";
import type {
  AstrologyVisibility,
  PrivateAudience,
  PrivateNatalProfile,
} from "./private-data-schema";
import {
  getPracticeOptionsForEnergy,
  type CurrentRitualCheckIn,
} from "./current-ritual-check-in";
import {
  getNatalContactsForTimingFacts,
  type NatalContact,
} from "./private-natal-contacts";
import {
  getLunarTimingFact,
  type LunarTimingFact,
} from "./lunar-timing";
import {
  getProfilePreferenceGroup,
  getProfilePreferenceLabel,
  normalizeProfilePreferenceValues,
} from "./profile-preference-taxonomy";
import {
  getProfileSignalInputsForAudience,
  mapPrivateProfileThemesToSignals,
  type PrivateProfileSignal,
  type PrivateProfileSignalInput,
} from "./private-profile-signals";
import { validateRitualSafety, type RitualSafetyFlags } from "./ritual-safety";
import {
  getTimingFactsForDate,
  type TimingFact,
} from "./timing-facts";
import {
  getTimingSignalsForFacts,
  selectTimingSignals,
  type TimingSignal,
} from "./timing-interpretation-rules";
import {
  getTimingWindowCandidates,
  type TimingWindowCandidate,
} from "./timing-window-candidates";
import {
  getRitualFocusOptionByKey,
  type RitualFocusOption,
} from "../data/ritual-focus-options";

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
  computedTimingFacts: Array<
    Pick<
      TimingFact,
      | "id"
      | "type"
      | "label"
      | "exactIso"
      | "startIso"
      | "endIso"
      | "timezone"
      | "computedBy"
      | "confidence"
    >
  >;
  selectedTimingSignals: Array<
    Pick<
      TimingSignal,
      | "ruleId"
      | "timingFactId"
      | "timingFactType"
      | "signalLabel"
      | "symbolicCardKeys"
      | "strength"
    >
  >;
  timingFactDetails: Array<
    Pick<
      LunarTimingFact,
      | "key"
      | "label"
      | "exactIso"
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
  patternSelection: {
    selectedPatternKey: string;
    eligiblePatternKeys: string[];
    excludedPatternKeys: string[];
    capacityLimitMinutes: number;
    preferenceMatches: string[];
    profileSignalKeys: string[];
    noAlternateAvailable: boolean;
  };
  sourceReviewIds: string[];
  sourceNoteIds: string[];
  privateProfileKeys: PrivateProfilePlaceholderKey[];
  profileSignalKeys: string[];
  privateNatalDiagnostics: PrivateNatalDiagnostics;
  selectedNatalContacts: NatalContactSummary[];
  profilePreferenceKeys: string[];
  currentRitualCheckIn?: CurrentRitualCheckIn;
  selectedTimingWindow?: SelectedTimingWindowSummary;
  capacityMode: CapacityMode;
  audience: PrivateAudience;
  scheduleAssumptions: ScheduleAssumptionKey[];
  safety: {
    excludedPatternKeys: string[];
    notes: string[];
  };
};

export type ScoreReason = {
  code: string;
  label: string;
  points: number;
  detail?: string;
};

export type EvaluatedSymbolicCard = {
  key: string;
  title: string;
  matchedTimingFacts: string[];
  matchedProfileKeys: string[];
  sourceReferences: string[];
  score: number;
  scoreReasons: ScoreReason[];
};

export type EvaluatedRitualPattern = {
  key: string;
  title: string;
  approvalStatus: RitualPattern["approvalStatus"];
  capacityModes: CapacityMode[];
  ritualStyles: string[];
  sourceReferences: string[];
  safetyAllowed: boolean;
  score: number;
  scoreReasons: ScoreReason[];
  natalContactKeys: string[];
};

export type RejectedCandidate = {
  key: string;
  title?: string;
  kind: "symbolic_card" | "ritual_pattern" | "timing_fact";
  reasons: ScoreReason[];
};

export type RecommendationDecision = {
  inputs: {
    timingFacts: string[];
    computedTimingFactIds: string[];
    capacityMode: CapacityMode;
    capacityLimitMinutes: number;
    audience: PrivateAudience;
    preferredRitualStyles: string[];
    avoidedRitualStyles: string[];
    excludedRitualPatternKeys: string[];
    astrologyVisibility: AstrologyVisibility;
    privateNatalProfilesLoaded: boolean;
    privateNatalProfileCount: number;
    natalPlacementCounts: Partial<Record<"person_a" | "person_b", number>>;
    natalContactsComputed: number;
    numerology?: NumerologyDiagnostic;
    timeScope: "today" | "best_moment_this_week";
    selectedTimingWindow?: SelectedTimingWindowSummary;
    checkInInfluences: string[];
    practiceChoice?: PracticeChoiceDiagnostic;
    currentRitualCheckIn?: CurrentRitualCheckIn;
  };
  candidates: {
    symbolicCards: EvaluatedSymbolicCard[];
    ritualPatterns: EvaluatedRitualPattern[];
  };
  selected: {
    timingSignalLabels: string[];
    symbolicCardKeys: string[];
    ritualPatternKey: string;
    sourceReferences: string[];
    natalContacts: NatalContactSummary[];
    natalContactThemeKeys: string[];
  };
  rejected: {
    ritualPatterns: RejectedCandidate[];
  };
  explanation: {
    scoreSummary: string;
    safetySummary: string;
    noAlternateAvailable: boolean;
  };
};

export type PracticeChoiceDiagnostic = {
  visibleOptions: Array<{
    label: string;
    practiceTypeHints: string[];
  }>;
  selectedLabel?: string;
  selectedHints: string[];
  selectedPatternMatches: string[];
  status:
    | "not_asked"
    | "open_preference"
    | "resolved_open_preference"
    | "matched_selected_pattern"
    | "set_aside";
  note: string;
};

export type NumerologyDiagnostic = {
  computedFactIds: string[];
  eligibleSignalLabels: string[];
  selectedSignalLabels: string[];
  matchedSignalLabels: string[];
  status: "not_computed" | "eligible_hidden" | "matched_selected" | "computed_unmatched";
  note: string;
};

export type SelectedTimingWindowSummary = {
  id: string;
  label: string;
  userWindow: string;
  startsAtIso: string;
  endsAtIso?: string;
  score: number;
  strength: TimingSignal["strength"];
  isStrong: boolean;
  reasonLabels: string[];
  scoreReasons: Array<{
    label: string;
    points: number;
    detail?: string;
  }>;
};

export type NatalContactSummary = {
  key: string;
  personKey: "person_a" | "person_b";
  transitingBody: string;
  natalBodyOrPoint: string;
  contactType: NatalContact["contactType"];
  aspectType?: NatalContact["aspectType"];
  orbDegrees?: number;
  transitSign?: string;
  natalSign?: string;
  themeKeys: string[];
  strength: NatalContact["strength"];
  visibility: AstrologyVisibility;
};

export type PrivateNatalDiagnostics = {
  privateNatalProfilesLoaded: boolean;
  privateNatalProfileCount: number;
  natalPlacementCounts: Partial<Record<"person_a" | "person_b", number>>;
  natalContactsComputed: number;
};

export type BriefSignal = {
  label: string;
  type:
    | "moon"
    | "planetary"
    | "numerology"
    | "seasonal"
    | "profile"
    | "capacity"
    | "schedule";
  summary: string;
  strength: "primary" | "supporting" | "accent";
};

export type BriefReason = {
  label: string;
  summary: string;
};

export type BriefFilterNote = {
  label: string;
  summary: string;
};

export type BriefSourceSummary = {
  label: string;
  kind:
    | "source_review"
    | "symbolic_card"
    | "ritual_pattern"
    | "safety_guardrail"
    | "timing_fact";
  summary?: string;
};

export type ExplanationSectionKind =
  | "timing_choice"
  | "numerology_accent"
  | "check_in_fit"
  | "ritual_focus"
  | "ritual_fit"
  | "profile_fit"
  | "natal_fit"
  | "capacity_boundary"
  | "tradeoff_or_alternative"
  | "sources";

export type ExplanationSection = {
  kind: ExplanationSectionKind;
  title: string;
  body: string;
  visibility?: "default" | "expanded" | "debug";
  sourceLabels?: string[];
};

export type BriefExplanation = {
  whyThisFits: string;
  howThisWasChosen: ExplanationSection[];
  signals: BriefSignal[];
  reasoning: BriefReason[];
  filtersApplied: BriefFilterNote[];
  sourcesUsed: BriefSourceSummary[];
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
  explanation: BriefExplanation;
  decision: RecommendationDecision;
  trace: WeeklyBriefTrace;
};

export type GenerateWeeklyBriefInput = {
  currentDate?: Date | string;
  dateRange?: string;
  timingFacts?: TimingFactKey[];
  timingFactDetails?: LunarTimingFact[];
  computedTimingFacts?: TimingFact[];
  privateProfileKeys?: PrivateProfilePlaceholderKey[];
  capacityMode?: CapacityMode;
  scheduleConstraints?: Partial<ManualScheduleConstraints>;
  preferredRitualStyles?: string[];
  avoidedRitualStyles?: string[];
  tonePreferences?: string[];
  profileInputs?: PrivateProfileSignalInput[];
  natalProfiles?: PrivateNatalProfile[];
  astrologyVisibility?: AstrologyVisibility;
  audience?: PrivateAudience;
  excludedRitualPatternKeys?: string[];
  currentRitualCheckIn?: CurrentRitualCheckIn;
  timingWindowCandidates?: TimingWindowCandidate[];
};

type ResolvedGenerateWeeklyBriefInput = {
  currentDate: Date;
  dateRange: string;
  timingFacts: TimingFactKey[];
  timingFactDetails: LunarTimingFact[];
  computedTimingFacts: TimingFact[];
  privateProfileKeys: PrivateProfilePlaceholderKey[];
  capacityMode: CapacityMode;
  scheduleConstraints: ManualScheduleConstraints;
  preferredRitualStyles: string[];
  avoidedRitualStyles: string[];
  tonePreferences: string[];
  profileInputs: PrivateProfileSignalInput[];
  selectedProfileInputs: PrivateProfileSignalInput[];
  profileSignals: PrivateProfileSignal[];
  natalProfiles: PrivateNatalProfile[];
  selectedNatalProfiles: PrivateNatalProfile[];
  natalContacts: NatalContact[];
  selectedNatalContacts: NatalContact[];
  natalDiagnostics: PrivateNatalDiagnostics;
  astrologyVisibility: AstrologyVisibility;
  audience: PrivateAudience;
  excludedRitualPatternKeys: string[];
  currentRitualCheckIn?: CurrentRitualCheckIn;
  timeScope: "today" | "best_moment_this_week";
  timingWindowCandidates: TimingWindowCandidate[];
  selectedTimingWindow?: TimingWindowCandidate;
  selectedRitualFocus?: RitualFocusOption;
};

type PatternCandidate = {
  pattern: RitualPattern;
  score: number;
  scoreReasons: ScoreReason[];
  preferenceMatches: string[];
  profileSignalMatches: PrivateProfileSignal[];
  natalContactMatches: NatalContact[];
};

type PatternSelectionResult = {
  pattern: RitualPattern;
  preferenceMatches: string[];
  profileSignalMatches: PrivateProfileSignal[];
  natalContactMatches: NatalContact[];
  evaluatedPatterns: EvaluatedRitualPattern[];
  rejectedPatterns: RejectedCandidate[];
  eligiblePatternKeys: string[];
  excludedPatternKeys: string[];
  safetyNotes: string[];
  noAlternateAvailable: boolean;
};

const DEFAULT_SCHEDULE_CONSTRAINTS: ManualScheduleConstraints = {
  unavailableDaysOrNights: [],
  preferredRitualWindows: [],
  recurringHouseholdConstraintNotes: [],
  workOrSchoolConstraintNotes: [],
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
  pause: "bank_the_house_light",
  low: "threshold_bowl",
  steady: "house_from_root_to_roof",
  high: "house_from_root_to_roof",
};

const MAX_PROFILE_THEME_SCORE = 8;
const MAX_SELECTED_NATAL_CONTACTS = 3;

const NATAL_CONTACT_THEME_STYLE_HINTS: Record<string, string[]> = {
  practical_care: ["plant", "plant_tending", "home_tending", "surface_reset", "small_repair"],
  home_and_belonging: ["home_tending", "kitchen", "table_reset", "threshold_reset"],
  careful_words: ["conversation", "reflection", "simple planning"],
  visible_warmth: ["candle_or_light", "light_focus", "gratitude", "atmosphere"],
  relationship_balance: ["shared_space", "table_reset", "conversation", "gratitude"],
  direct_action: ["single-action ritual", "surface_reset", "threshold_reset"],
  embodied_tending: ["plant", "plant_tending", "home_tending", "warm"],
  structure_and_repair: ["small_repair", "surface_reset", "table_reset", "simple planning"],
  beauty_and_affection: ["candle_or_light", "light_focus", "gratitude", "atmosphere"],
  quiet_integration: ["reflection", "close_evening", "home_tending"],
  steady_care: ["plant_tending", "home_tending", "table_reset"],
  soft_release: ["reflection", "close_evening", "low_woo"],
  focused_contact: ["single-action ritual", "reflection"],
  balance_and_contrast: ["shared_space", "table_reset", "reflection"],
  practical_adjustment: ["small_repair", "surface_reset", "home_tending"],
  available_support: ["gratitude", "home_tending", "warm"],
  small_opening: ["simple planning", "conversation", "single-action ritual"],
};

type ResolvedPracticeChoice = {
  label: string;
  practiceTypeHints: string[];
};

const DEFAULT_SURPRISE_ME_CATEGORY: ResolvedPracticeChoice = {
  label: "Home",
  practiceTypeHints: ["home_tending"],
};

const SURPRISE_ME_CATEGORY_BY_FOCUS: Partial<
  Record<RitualFocusOption["key"], ResolvedPracticeChoice>
> = {
  getting_grounded: {
    label: "Home",
    practiceTypeHints: ["home_tending", "grounding"],
  },
  making_a_beginning: {
    label: "Home",
    practiceTypeHints: ["home_tending", "threshold_reset", "beginning"],
  },
  clearing_something_out: {
    label: "Home",
    practiceTypeHints: ["home_tending", "threshold_reset", "clearing"],
  },
  resting: {
    label: "Candle or light",
    practiceTypeHints: ["candle_or_light", "light_focus", "rest"],
  },
  saying_something_clearly: {
    label: "Reflection",
    practiceTypeHints: ["reflection", "naming"],
  },
  tending_us: {
    label: "Kitchen",
    practiceTypeHints: ["kitchen", "shared_space", "table_reset"],
  },
  tending_the_home: {
    label: "Home",
    practiceTypeHints: ["home_tending"],
  },
  marking_a_threshold: {
    label: "Seasonal",
    practiceTypeHints: ["seasonal", "threshold_reset"],
  },
};

function resolveSurpriseMePracticeChoice(
  checkIn?: CurrentRitualCheckIn,
): CurrentRitualCheckIn | undefined {
  if (!checkIn) {
    return undefined;
  }

  const selectedLabel = checkIn.practiceTypeLabel?.trim().toLowerCase();
  const selectedHints = checkIn.practiceTypeHints ?? [];

  if (selectedLabel !== "surprise me" || selectedHints.length > 0) {
    return checkIn;
  }

  const resolved =
    (checkIn.ritualFocusKey
      ? SURPRISE_ME_CATEGORY_BY_FOCUS[checkIn.ritualFocusKey]
      : undefined) ?? DEFAULT_SURPRISE_ME_CATEGORY;

  return {
    ...checkIn,
    practiceTypeLabel: `Surprise me -> ${resolved.label}`,
    practiceTypeHints: resolved.practiceTypeHints,
  };
}

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

function getPartOfDay(date: Date): string {
  const hour = date.getUTCHours();

  if (hour < 5) {
    return "overnight";
  }

  if (hour < 12) {
    return "morning";
  }

  if (hour < 17) {
    return "afternoon";
  }

  if (hour < 21) {
    return "evening";
  }

  return "late evening";
}

function formatTimingWindowDate(iso: string): string {
  const date = new Date(iso);
  const dayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
  const hasSpecificTime =
    date.getUTCHours() !== 0 ||
    date.getUTCMinutes() !== 0 ||
    date.getUTCSeconds() !== 0;

  return hasSpecificTime
    ? `${dayLabel} ${getPartOfDay(date)}`
    : dayLabel;
}

function isStrongTimingWindow(
  candidate: TimingWindowCandidate | undefined,
): candidate is TimingWindowCandidate {
  return candidate !== undefined && candidate.strength !== "accent" && candidate.score >= 10;
}

function getTimingWindowUserWindow(candidate: TimingWindowCandidate): string {
  return `Around ${formatTimingWindowDate(candidate.startsAtIso)}.`;
}

function getBestWindow(
  capacityMode: CapacityMode,
  input?: ResolvedGenerateWeeklyBriefInput,
): string {
  const labelByCapacity: Record<CapacityMode, string> = {
    pause: "No timing needed.",
    low: "When you have five quiet minutes.",
    steady: "When you have a little space this week.",
    high: "When you have room to linger this week.",
  };
  const capacityWindow = labelByCapacity[capacityMode];

  if (input?.timeScope === "best_moment_this_week") {
    if (isStrongTimingWindow(input.selectedTimingWindow)) {
      return `${getTimingWindowUserWindow(input.selectedTimingWindow)} ${capacityWindow}`;
    }

    return `No strong timing window stood out this week. ${capacityWindow}`;
  }

  return capacityWindow;
}

function getScheduleAssumptions(
  _scheduleConstraints: ManualScheduleConstraints,
): ScheduleAssumptionKey[] {
  return [];
}

function normalizeStyleList(values: string[] | undefined): string[] {
  return normalizeProfilePreferenceValues(values ?? []);
}

function uniqueValues<T extends string>(values: T[]): T[] {
  return [...new Set(values.filter(Boolean))];
}

function getProfileThemeKeysFromInputs(
  profileInputs: PrivateProfileSignalInput[],
): PrivateProfilePlaceholderKey[] {
  return uniqueValues(
    profileInputs.flatMap((profile) => [
      ...profile.profileThemeKeys,
      ...(profile.astrologyProfileThemeKeys ?? []),
    ]),
  );
}

function getProfilePreferredStyles(
  profileInputs: PrivateProfileSignalInput[],
): string[] {
  return normalizeStyleList(
    profileInputs.flatMap((profile) => profile.preferredRitualStyles ?? []),
  );
}

function getProfileAvoidedStyles(
  profileInputs: PrivateProfileSignalInput[],
): string[] {
  return normalizeStyleList(
    profileInputs.flatMap((profile) => profile.avoidedRitualStyles ?? []),
  );
}

function getProfileTonePreferences(
  profileInputs: PrivateProfileSignalInput[],
): string[] {
  return normalizeStyleList(
    profileInputs.flatMap((profile) => profile.tonePreferences ?? []),
  );
}

function isPersonAudience(audience: PrivateAudience): audience is "person_a" | "person_b" {
  return audience === "person_a" || audience === "person_b";
}

function getNatalProfilesForAudience(
  natalProfiles: PrivateNatalProfile[],
  audience: PrivateAudience,
): PrivateNatalProfile[] {
  if (isPersonAudience(audience)) {
    return natalProfiles.filter((profile) => profile.personKey === audience);
  }

  return natalProfiles;
}

function getNatalDiagnostics(
  natalProfiles: PrivateNatalProfile[],
  natalContacts: NatalContact[],
): PrivateNatalDiagnostics {
  return {
    privateNatalProfilesLoaded: natalProfiles.length > 0,
    privateNatalProfileCount: natalProfiles.length,
    natalPlacementCounts: Object.fromEntries(
      natalProfiles.map((profile) => [
        profile.personKey,
        profile.placements.length,
      ]),
    ),
    natalContactsComputed: natalContacts.length,
  };
}

function getCardStyleMatches(cards: SymbolicCard[], pattern: RitualPattern): string[] {
  const cardStyles = new Set(
    cards.flatMap((card) => normalizeStyleList(card.ritual_styles)),
  );

  return pattern.ritualStyles.filter((style) => cardStyles.has(style));
}

function getProfileSignalMatches(
  profileSignals: PrivateProfileSignal[],
  pattern: RitualPattern,
): PrivateProfileSignal[] {
  return profileSignals.filter((signal) =>
    signal.ritualStyleHints.some(
      (hint) => hint === pattern.key || pattern.ritualStyles.includes(hint),
    ),
  );
}

function getContactKey(contact: NatalContact): string {
  return [
    contact.personKey,
    contact.transitingBody,
    contact.contactType,
    contact.aspectType,
    contact.natalBodyOrPoint,
    contact.transitSign,
    contact.natalSign,
    contact.orbDegrees,
  ].filter((part) => part !== undefined).join(".");
}

function getNatalContactStyleHints(contact: NatalContact): string[] {
  return uniqueValues(
    contact.themeKeys.flatMap((themeKey) =>
      NATAL_CONTACT_THEME_STYLE_HINTS[themeKey] ?? [],
    ),
  );
}

function getNatalContactMatches(
  natalContacts: NatalContact[],
  pattern: RitualPattern,
): NatalContact[] {
  return natalContacts.filter((contact) => {
    const styleHints = getNatalContactStyleHints(contact);

    return styleHints.some(
      (hint) => hint === pattern.key || pattern.ritualStyles.includes(hint),
    );
  });
}

function getNatalContactRank(
  contact: NatalContact,
  pattern: RitualPattern,
): number {
  const contactTypeScore: Record<NatalContact["contactType"], number> = {
    near_conjunction: 8,
    major_aspect: 6,
    same_sign: 2,
    elemental_resonance: 1,
    modality_resonance: 1,
  };
  const strengthScore: Record<NatalContact["strength"], number> = {
    primary: 4,
    supporting: 2,
    accent: 1,
  };
  const styleMatchCount = getNatalContactStyleHints(contact).filter(
    (hint) => hint === pattern.key || pattern.ritualStyles.includes(hint),
  ).length;
  const orbScore =
    contact.orbDegrees === undefined
      ? 0
      : Math.max(0, 3 - contact.orbDegrees);

  return contactTypeScore[contact.contactType] +
    strengthScore[contact.strength] +
    styleMatchCount * 2 +
    orbScore;
}

function selectNatalContactMatches(
  natalContacts: NatalContact[],
  pattern: RitualPattern,
): NatalContact[] {
  const selected: NatalContact[] = [];
  const perPersonCount = new Map<NatalContact["personKey"], number>();
  const matches = [...getNatalContactMatches(natalContacts, pattern)].sort(
    (a, b) =>
      getNatalContactRank(b, pattern) - getNatalContactRank(a, pattern) ||
      getContactKey(a).localeCompare(getContactKey(b)),
  );

  for (const contact of matches) {
    const personCount = perPersonCount.get(contact.personKey) ?? 0;

    if (
      personCount >= 2 &&
      selected.length < MAX_SELECTED_NATAL_CONTACTS - 1
    ) {
      continue;
    }

    selected.push(contact);
    perPersonCount.set(contact.personKey, personCount + 1);

    if (selected.length >= MAX_SELECTED_NATAL_CONTACTS) {
      break;
    }
  }

  return selected;
}

function getSharedNatalThemeKeys(
  contacts: NatalContact[],
): string[] {
  const themeCounts = new Map<string, Set<NatalContact["personKey"]>>();

  for (const contact of contacts) {
    for (const themeKey of contact.themeKeys) {
      const people = themeCounts.get(themeKey) ?? new Set<NatalContact["personKey"]>();

      people.add(contact.personKey);
      themeCounts.set(themeKey, people);
    }
  }

  return [...themeCounts.entries()]
    .filter(([, people]) => people.size > 1)
    .map(([themeKey]) => themeKey);
}

function getNatalContactScoreReasons(
  contacts: NatalContact[],
  pattern: RitualPattern,
  audience: PrivateAudience,
): ScoreReason[] {
  if (contacts.length === 0) {
    return [];
  }

  const contactKeys = contacts.map(getContactKey);
  const scoreReasons = [
    scoreReason(
      "natal_contact_theme_match",
      "Private natal contact theme match",
      Math.min(2, contacts.length),
      contactKeys.slice(0, MAX_SELECTED_NATAL_CONTACTS).join(", "),
    ),
  ];
  const sharedThemeKeys = getSharedNatalThemeKeys(contacts);

  if ((audience === "together" || audience === "either") && sharedThemeKeys.length > 0) {
    scoreReasons.push(
      scoreReason(
        "shared_natal_contact_match",
        "Shared natal contact match",
        1,
        sharedThemeKeys.slice(0, 3).join(", "),
      ),
    );
  }

  if (
    contacts.some((contact) =>
      getNatalContactStyleHints(contact).some((hint) =>
        pattern.ritualStyles.includes(hint),
      ),
    )
  ) {
    scoreReasons.push(
      scoreReason(
        "profile_timing_resonance",
        "Profile timing resonance",
        1,
        uniqueValues(
          contacts.flatMap((contact) =>
            getNatalContactStyleHints(contact).filter((hint) =>
              pattern.ritualStyles.includes(hint),
            ),
          ),
        ).slice(0, 3).join(", "),
      ),
    );
  }

  return scoreReasons;
}

function summarizeNatalContact(contact: NatalContact): NatalContactSummary {
  return {
    key: getContactKey(contact),
    personKey: contact.personKey,
    transitingBody: contact.transitingBody,
    natalBodyOrPoint: contact.natalBodyOrPoint,
    contactType: contact.contactType,
    aspectType: contact.aspectType,
    orbDegrees: contact.orbDegrees,
    transitSign: contact.transitSign,
    natalSign: contact.natalSign,
    themeKeys: contact.themeKeys,
    strength: contact.strength,
    visibility: contact.visibility,
  };
}

function getNatalContactThemeKeys(contacts: NatalContact[]): string[] {
  return uniqueValues(contacts.flatMap((contact) => contact.themeKeys));
}

function getProfileSignalScore(
  profileSignalMatches: PrivateProfileSignal[],
): number {
  const bestWeightByTheme = new Map<string, number>();

  for (const signal of profileSignalMatches) {
    bestWeightByTheme.set(
      signal.themeKey,
      Math.max(bestWeightByTheme.get(signal.themeKey) ?? 0, signal.weight),
    );
  }

  return Math.min(
    MAX_PROFILE_THEME_SCORE,
    [...bestWeightByTheme.values()].reduce((total, weight) => total + weight, 0),
  );
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
  const materialText = pattern.materials.join(" ").toLowerCase();
  const avoidText = [...pattern.avoidIf, materialText].join(" ").toLowerCase();
  const matches = getCleanupAvoidanceMatches(pattern.safetyFlags, avoidedStyles);

  if (
    avoidedStyles.includes("shopping_required") &&
    (materialText.includes("shopping") || materialText.includes("special"))
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

function scoreReason(
  code: string,
  label: string,
  points: number,
  detail?: string,
): ScoreReason {
  return detail === undefined
    ? { code, label, points }
    : { code, label, points, detail };
}

function sumScoreReasons(scoreReasons: ScoreReason[]): number {
  return scoreReasons.reduce((total, reason) => total + reason.points, 0);
}

function toRejectedPattern(
  pattern: RitualPattern,
  reasons: ScoreReason[],
): RejectedCandidate {
  return {
    key: pattern.key,
    title: pattern.title,
    kind: "ritual_pattern",
    reasons,
  };
}

function getPatternStyleMatches(
  pattern: RitualPattern,
  styles: string[],
): string[] {
  return uniqueValues(
    styles.filter((style) => pattern.key === style || pattern.ritualStyles.includes(style)),
  );
}

function getCheckInTextStyleHints(text: string | undefined): string[] {
  if (!text) {
    return [];
  }

  const normalized = text.toLowerCase();
  const hintsByToken: Array<[string, string[]]> = [
    ["plant", ["plant", "plant_tending"]],
    ["kitchen", ["kitchen", "ordinary_cooking"]],
    ["table", ["table_reset"]],
    ["candle", ["candle_or_light", "light_focus"]],
    ["light", ["candle_or_light", "light_focus"]],
    ["rest", ["rest", "closing"]],
    ["ground", ["grounding", "home_tending"]],
    ["clear", ["surface_reset", "threshold_reset"]],
    ["begin", ["threshold_reset", "reflection"]],
    ["start", ["threshold_reset", "reflection"]],
    ["talk", ["conversation", "reflection"]],
    ["speak", ["conversation", "reflection"]],
    ["home", ["home_tending"]],
  ];

  return uniqueValues(
    hintsByToken.flatMap(([token, hints]) =>
      normalized.includes(token) ? hints : [],
    ),
  );
}

function selectedTimingWindowStyleHints(
  candidate: TimingWindowCandidate,
  input: ResolvedGenerateWeeklyBriefInput,
): string[] {
  const signalHints = getTimingSignalsForFacts(candidate.timingFacts)
    .filter(
      (signal) =>
        candidate.signalKeys.length === 0 ||
        candidate.signalKeys.includes(signal.ruleId),
    )
    .flatMap((signal) => signal.ritualStyleHints);
  const natalHints = candidate.natalContactThemeKeys.flatMap(
    (themeKey) => NATAL_CONTACT_THEME_STYLE_HINTS[themeKey] ?? [],
  );
  const focusHints = input.selectedRitualFocus?.timingSignalKeys?.some((key) =>
    candidate.timingFacts.some((fact) => fact.id.includes(key) || fact.label.toLowerCase().includes(key.replaceAll("_", " "))),
  )
    ? input.selectedRitualFocus.ritualStyleHints
    : [];

  return uniqueValues([...signalHints, ...natalHints, ...focusHints]);
}

function getFocusStyleHints(input: ResolvedGenerateWeeklyBriefInput): string[] {
  const checkIn = input.currentRitualCheckIn;
  const focus = input.selectedRitualFocus;

  if (focus?.drivesScoringByDefault === false) {
    return getCheckInTextStyleHints(checkIn?.ritualFocusText);
  }

  return uniqueValues([
    ...(focus?.ritualStyleHints ?? []),
    ...getCheckInTextStyleHints(checkIn?.ritualFocusText),
  ]);
}

function getAccentRitualStyles(input: ResolvedGenerateWeeklyBriefInput): string[] {
  return uniqueValues([
    ...input.preferredRitualStyles,
    ...(input.currentRitualCheckIn?.practiceTypeHints ?? []),
    ...getFocusStyleHints(input),
  ]);
}

function getCheckInPatternScoreReasons(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
): ScoreReason[] {
  const checkIn = input.currentRitualCheckIn;

  if (!checkIn) {
    return [];
  }

  const reasons: ScoreReason[] = [
    scoreReason(
      "checkin_capacity_answer",
      "Check-in capacity answer",
      1,
      checkIn.energyCapacity,
    ),
  ];
  const practiceMatches = getPatternStyleMatches(
    pattern,
    checkIn.practiceTypeHints ?? [],
  );

  if (practiceMatches.length > 0) {
    reasons.push(
      scoreReason(
        "checkin_practice_type_match",
        "Check-in practice match",
        4,
        practiceMatches.join(", "),
      ),
    );
  }

  const focus = input.selectedRitualFocus;
  const focusStyleHints = getFocusStyleHints(input);
  const focusMatches = getPatternStyleMatches(pattern, focusStyleHints);

  if (focusMatches.length > 0) {
    reasons.push(
      scoreReason(
        "checkin_ritual_focus_match",
        "Check-in intention match",
        5,
        focus?.label ?? checkIn.ritualFocusText ?? focusMatches.join(", "),
      ),
    );
  }

  if (checkIn.audience === "both_of_us") {
    const fitsTogether =
      pattern.audienceFit?.includes("together") ||
      pattern.ritualStyles.some((style) =>
        ["shared_space", "conversation", "table_reset", "candle_or_light"].includes(style),
      );

    if (fitsTogether) {
      reasons.push(
        scoreReason(
          "checkin_audience_match",
          "Check-in audience match",
          3,
          "both_of_us",
        ),
      );
    }
  }

  if (checkIn.audience === "me" && pattern.audienceFit?.includes("either")) {
    reasons.push(
      scoreReason(
        "checkin_audience_match",
        "Check-in audience match",
        2,
        "me",
      ),
    );
  }

  const timingWindowStyleHints = isStrongTimingWindow(input.selectedTimingWindow)
    ? selectedTimingWindowStyleHints(input.selectedTimingWindow, input)
    : [];
  const timingWindowMatches = getPatternStyleMatches(pattern, timingWindowStyleHints);

  if (timingWindowMatches.length > 0) {
    reasons.push(
      scoreReason(
        "checkin_timing_window_match",
        "Check-in timing window match",
        2,
        timingWindowMatches.join(", "),
      ),
    );
  }

  return reasons;
}

function getEligiblePatternCandidates(
  input: ResolvedGenerateWeeklyBriefInput,
  selectedCards: SymbolicCard[],
  selectedTimingSignals: TimingSignal[],
): {
  candidates: PatternCandidate[];
  evaluatedPatterns: EvaluatedRitualPattern[];
  rejectedPatterns: RejectedCandidate[];
  excludedPatternKeys: string[];
  safetyNotes: string[];
} {
  const approvedPatternKeys = new Set(
    getApprovedRitualPatterns().map((pattern) => pattern.key),
  );
  const excludedPatternKeys: string[] = [];
  const safetyNotes: string[] = [];
  const rejectedPatterns: RejectedCandidate[] = [];
  const evaluatedPatterns: EvaluatedRitualPattern[] = [];
  const durationLimitMinutes = getEffectiveDurationMinutes(
    input.capacityMode,
    input.scheduleConstraints,
  );
  const candidates = starterRitualPatterns.flatMap((pattern): PatternCandidate[] => {
    const safetyResult = validateRitualSafety(pattern.safetyFlags, pattern.steps);
    const rejectionReasons: ScoreReason[] = [];
    const scoreReasons: ScoreReason[] = [];

    safetyNotes.push(...safetyResult.warnings);

    if (!approvedPatternKeys.has(pattern.key)) {
      rejectionReasons.push(
        scoreReason(
          "not_approved",
          "Not approved",
          -99,
          `approval status is ${pattern.approvalStatus}`,
        ),
      );
    }

    if (input.excludedRitualPatternKeys.includes(pattern.key)) {
      rejectionReasons.push(
        scoreReason(
          "try_again_excluded",
          "Excluded by try-again",
          -5,
          "try-again requested a different approved pattern",
        ),
      );
    }

    if (!safetyResult.allowed) {
      rejectionReasons.push(
        ...safetyResult.blocks.map((block) =>
          scoreReason("safety_block", "Safety exclusion", -99, block),
        ),
      );
    }

    if (!pattern.capacityModes.includes(input.capacityMode)) {
      rejectionReasons.push(
        scoreReason(
          "capacity_mode_mismatch",
          "Capacity mode mismatch",
          -20,
          `${input.capacityMode} is not supported by this pattern`,
        ),
      );
    }

    if (
      input.capacityMode !== "pause" &&
      pattern.defaultDurationMinutes > durationLimitMinutes
    ) {
      rejectionReasons.push(
        scoreReason(
          "too_long_for_capacity",
          "Too long for capacity",
          -10,
          `${pattern.defaultDurationMinutes} minutes exceeds the current ${durationLimitMinutes}-minute limit`,
        ),
      );
    }

    const avoidanceMatches = getAvoidanceMatches(
      pattern,
      input.avoidedRitualStyles,
    );

    if (avoidanceMatches.length > 0) {
      rejectionReasons.push(
        scoreReason(
          "avoided_style_conflict",
          "Avoided style conflict",
          -20,
          avoidanceMatches.join(", "),
        ),
      );
    }

    if (rejectionReasons.length > 0) {
      excludedPatternKeys.push(pattern.key);
      rejectedPatterns.push(toRejectedPattern(pattern, rejectionReasons));
      evaluatedPatterns.push({
        key: pattern.key,
        title: pattern.title,
        approvalStatus: pattern.approvalStatus,
        capacityModes: pattern.capacityModes,
        ritualStyles: pattern.ritualStyles,
        sourceReferences: pattern.sourceReferences,
        safetyAllowed: safetyResult.allowed,
        score: sumScoreReasons(rejectionReasons),
        scoreReasons: rejectionReasons,
        natalContactKeys: [],
      });

      for (const reason of rejectionReasons) {
        if (
          reason.code === "try_again_excluded" ||
          reason.code === "too_long_for_capacity" ||
          reason.code === "avoided_style_conflict"
        ) {
          safetyNotes.push(`${pattern.key} skipped: ${reason.detail ?? reason.label}`);
        }
      }

      return [];
    }

    const preferenceMatches = [
      ...(input.preferredRitualStyles.includes(pattern.key)
        ? [pattern.key]
        : []),
      ...pattern.ritualStyles.filter((style) =>
        input.preferredRitualStyles.includes(style),
      ),
    ];
    const cardStyleMatches = getCardStyleMatches(selectedCards, pattern);
    const timingSignalStyleMatches = pattern.ritualStyles.filter((style) =>
      selectedTimingSignals.some((signal) =>
        signal.ritualStyleHints.includes(style),
      ),
    );
    const profileSignalMatches = getProfileSignalMatches(
      input.profileSignals,
      pattern,
    );
    const natalContactMatches = selectNatalContactMatches(
      input.selectedNatalContacts,
      pattern,
    );
    const profileSignalBoost = getProfileSignalScore(profileSignalMatches);
    const profileSignalReason =
      profileSignalBoost > 0
        ? [
            scoreReason(
              "profile_theme_match",
              "Private profile theme match",
              profileSignalBoost,
              profileSignalMatches.map((signal) => signal.key).slice(0, 6).join(", "),
            ),
          ]
        : [];
    const defaultPatternReason =
      pattern.key === DEFAULT_PATTERN_BY_CAPACITY[input.capacityMode]
        ? [
            scoreReason(
              "capacity_default_pattern",
              "Default pattern for capacity",
              1,
              input.capacityMode,
            ),
          ]
        : [];
    const highCapacityReason =
      input.capacityMode === "high" && pattern.defaultDurationMinutes >= 10
        ? [
            scoreReason(
              "high_capacity_active_fit",
              "Active high-capacity fit",
              1,
              `${pattern.defaultDurationMinutes} minutes`,
            ),
          ]
        : [];
    const natalContactReasons = getNatalContactScoreReasons(
      natalContactMatches,
      pattern,
      input.audience,
    );

    scoreReasons.push(
      scoreReason("approved_pattern", "Approved ritual pattern", 0),
      scoreReason("capacity_fit", "Capacity fit", 2, input.capacityMode),
      scoreReason(
        "duration_fit",
        "Duration fit",
        0,
        `${pattern.defaultDurationMinutes} minutes within ${durationLimitMinutes}-minute limit`,
      ),
      ...preferenceMatches.map((match) =>
        scoreReason("preferred_style_match", "Preferred style match", 3, match),
      ),
      ...cardStyleMatches.map((match) =>
        scoreReason("symbolic_card_style_match", "Timing/card style match", 2, match),
      ),
      ...timingSignalStyleMatches.map((match) =>
        scoreReason("timing_signal_style_match", "Timing signal style match", 2, match),
      ),
      ...profileSignalReason,
      ...natalContactReasons,
      ...getCheckInPatternScoreReasons(input, pattern),
      ...defaultPatternReason,
      ...highCapacityReason,
    );

    const score = sumScoreReasons(scoreReasons);

    evaluatedPatterns.push({
      key: pattern.key,
      title: pattern.title,
      approvalStatus: pattern.approvalStatus,
      capacityModes: pattern.capacityModes,
      ritualStyles: pattern.ritualStyles,
      sourceReferences: pattern.sourceReferences,
      safetyAllowed: safetyResult.allowed,
      score,
      scoreReasons,
      natalContactKeys: natalContactMatches.map(getContactKey),
    });

    return [{
      pattern,
      score,
      scoreReasons,
      preferenceMatches,
      profileSignalMatches,
      natalContactMatches,
    }];
  });

  return {
    candidates,
    evaluatedPatterns,
    rejectedPatterns,
    excludedPatternKeys: [...new Set(excludedPatternKeys)],
    safetyNotes: [...new Set(safetyNotes)],
  };
}

function selectPattern(
  input: ResolvedGenerateWeeklyBriefInput,
  selectedCards: SymbolicCard[],
  selectedTimingSignals: TimingSignal[],
): PatternSelectionResult {
  const {
    candidates,
    evaluatedPatterns,
    rejectedPatterns,
    excludedPatternKeys,
    safetyNotes,
  } =
    getEligiblePatternCandidates(input, selectedCards, selectedTimingSignals);
  const sortedCandidates = [...candidates].sort(
    (a, b) => b.score - a.score,
  );
  const eligiblePatternKeys = sortedCandidates.map(
    (candidate) => candidate.pattern.key,
  );

  if (sortedCandidates[0]) {
    return {
      pattern: sortedCandidates[0].pattern,
      preferenceMatches: sortedCandidates[0].preferenceMatches,
      profileSignalMatches: sortedCandidates[0].profileSignalMatches,
      natalContactMatches: sortedCandidates[0].natalContactMatches,
      evaluatedPatterns,
      rejectedPatterns,
      eligiblePatternKeys,
      excludedPatternKeys,
      safetyNotes,
      noAlternateAvailable: false,
    };
  }

  const fallbackPattern = getApprovedRitualPatterns().find(
    (pattern) => pattern.key === "bank_the_house_light",
  );

  if (!fallbackPattern) {
    throw new Error("Missing approved fallback ritual pattern: bank_the_house_light");
  }

  return {
    pattern: fallbackPattern,
    preferenceMatches: [],
    profileSignalMatches: [],
    natalContactMatches: [],
    evaluatedPatterns,
    rejectedPatterns,
    eligiblePatternKeys,
    excludedPatternKeys,
    safetyNotes: [
      ...safetyNotes,
      input.excludedRitualPatternKeys.length > 0
        ? "no alternate approved ritual pattern fit capacity, safety, and profile constraints"
        : "fallback pattern selected because no preferred pattern fit capacity and safety constraints",
    ],
    noAlternateAvailable: input.excludedRitualPatternKeys.length > 0,
  };
}

function getRecommendedRitual(
  pattern: RitualPattern,
  capacityMode: CapacityMode,
  tonePreferences: string[],
  audience: PrivateAudience,
): string {
  const presentation = getEffectivePresentation(pattern, capacityMode, audience);

  if (presentation) {
    return [
      ...presentation.approach,
      ...presentation.steps,
      presentation.closing,
    ].filter(Boolean).map(ensureSentence).join(" ");
  }

  const toneClosing = getToneClosing(tonePreferences);
  const closing = toneClosing ? ` ${toneClosing}` : "";

  if (capacityMode === "pause") {
    return `No required ritual. ${pattern.steps.join(" ")}${closing}`;
  }

  return `${pattern.steps.join(" ")}${closing}`;
}

function getEffectivePresentation(
  pattern: RitualPattern,
  capacityMode: CapacityMode,
  audience: PrivateAudience,
): Omit<RitualPresentation, "variants"> | undefined {
  const presentation = pattern.presentation;

  if (!presentation) {
    return undefined;
  }

  const audienceVariant =
    audience === "together" ? presentation.variants?.together : undefined;
  const capacityVariant = presentation.variants?.[capacityMode];
  const merged = {
    ...presentation,
    ...audienceVariant,
    ...capacityVariant,
  };

  return {
    invitation: merged.invitation ?? presentation.invitation,
    whyThisPractice: merged.whyThisPractice ?? presentation.whyThisPractice,
    approach: merged.approach ?? presentation.approach,
    steps: merged.steps ?? presentation.steps,
    carry: merged.carry ?? presentation.carry,
    closing: merged.closing ?? presentation.closing,
  };
}

function getToneClosing(tonePreferences: string[]): string {
  const selectedTone = tonePreferences[0];

  switch (selectedTone) {
    case "practical":
      return "Keep it simple and useful.";
    case "warm":
      return "Keep it gentle.";
    case "direct":
      return "Stop there.";
    case "symbolic":
      return "Let the action mark the moment.";
    case "playful":
      return "No need to make it fancy.";
    case "romantic":
      return "Keep it soft.";
    default:
      return "";
  }
}

function getOptionalAddOn(
  _pattern: RitualPattern,
  _avoidedRitualStyles: string[],
): string {
  return "No add-on needed.";
}

function getTimingReason(card: SymbolicCard, timingFact?: LunarTimingFact): string {
  if (timingFact) {
    return `The ${timingFact.label.toLowerCase()} points toward ${card.themes[0]} and ${card.themes[1]}.`;
  }

  return `${card.title} brings in themes of ${card.themes[0]} and ${card.themes[1]}.`;
}

function toTimingFact(timingFact: LunarTimingFact): TimingFact {
  return {
    id: timingFact.id,
    type: timingFact.type,
    label: timingFact.label,
    startIso: timingFact.dateStart,
    endIso: timingFact.dateEnd,
    exactIso: timingFact.exactIso,
    timezone: timingFact.timezone,
    computedBy: timingFact.computedBy,
    confidence: timingFact.confidence,
    phase: timingFact.phase,
    phaseAngleDegrees: timingFact.phaseAngleDegrees,
  };
}

function getSelectedTimingSignals(
  input: ResolvedGenerateWeeklyBriefInput,
): TimingSignal[] {
  const baselineLunarFacts = input.timingFactDetails.map(toTimingFact);
  const computedFacts = [
    ...input.computedTimingFacts,
    ...baselineLunarFacts,
  ].filter(
    (fact, index, facts) =>
      facts.findIndex((candidate) => candidate.id === fact.id) === index,
  );
  const signals = getTimingSignalsForFacts(computedFacts);
  const selectedWindowSignals = isStrongTimingWindow(input.selectedTimingWindow)
    ? getTimingSignalsForFacts(input.selectedTimingWindow.timingFacts).filter(
        (signal) =>
          input.selectedTimingWindow?.signalKeys.length === 0 ||
          input.selectedTimingWindow?.signalKeys.includes(signal.ruleId),
      )
    : [];
  const candidateFirstSignals = [
    ...selectedWindowSignals,
    ...signals,
  ].filter(
    (signal, index, allSignals) =>
      allSignals.findIndex((candidate) => candidate.ruleId === signal.ruleId) === index,
  );

  return selectTimingSignals(candidateFirstSignals, {
    maxSignals: 3,
    preferredRitualStyles: input.preferredRitualStyles,
    avoidedRitualStyles: input.avoidedRitualStyles,
    accentRitualStyles: getAccentRitualStyles(input),
    includeMatchedAccent: true,
  });
}

function getNumerologyDiagnostic(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
  selectedTimingSignals: TimingSignal[],
): NumerologyDiagnostic {
  const numerologyFacts = input.computedTimingFacts.filter(
    (fact) => fact.type === "numerology_date",
  );

  if (numerologyFacts.length === 0) {
    return {
      computedFactIds: [],
      eligibleSignalLabels: [],
      selectedSignalLabels: [],
      matchedSignalLabels: [],
      status: "not_computed",
      note: "No universal date numerology facts were available for this brief.",
    };
  }

  const eligibleSignals = getTimingSignalsForFacts(numerologyFacts);
  const selectedNumerologySignals = selectedTimingSignals.filter(
    (signal) => signal.timingFactType === "numerology_date",
  );
  const accentStyles = uniqueValues([
    ...getAccentRitualStyles(input),
    ...pattern.ritualStyles,
  ]);
  const matchedSignals = eligibleSignals.filter((signal) =>
    signal.ritualStyleHints.some((style) => accentStyles.includes(style)),
  );
  const status: NumerologyDiagnostic["status"] =
    selectedNumerologySignals.length > 0
      ? "matched_selected"
      : matchedSignals.length > 0
        ? "eligible_hidden"
        : "computed_unmatched";

  return {
    computedFactIds: numerologyFacts.map((fact) => fact.id),
    eligibleSignalLabels: eligibleSignals.map((signal) => signal.signalLabel),
    selectedSignalLabels: selectedNumerologySignals.map((signal) => signal.signalLabel),
    matchedSignalLabels: matchedSignals.map((signal) => signal.signalLabel),
    status,
    note:
      status === "matched_selected"
        ? "Universal date numerology was used as a small accent because it matched the selected ritual context."
        : status === "eligible_hidden"
          ? "Universal date numerology matched some context but stayed behind stronger timing signals."
          : "Universal date numerology was computed but did not match the selected ritual strongly enough to surface.",
  };
}

function getSignalType(signal: TimingSignal): BriefSignal["type"] {
  switch (signal.timingFactType) {
    case "moon_phase":
    case "lunation":
      return "moon";
    case "numerology_date":
      return "numerology";
    case "solar_season":
      return "seasonal";
    case "moon_sign":
    case "sun_sign":
    case "planet_sign":
    case "planet_retrograde":
    case "planetary_aspect":
      return "planetary";
  }
}

function getCapacitySignal(
  capacityMode: CapacityMode,
  durationMinutes: number,
): BriefSignal {
  const labelByCapacity: Record<CapacityMode, string> = {
    pause: "Capacity — pause",
    low: "Capacity — low",
    steady: "Capacity — steady",
    high: "Capacity — high",
  };
  const summaryByCapacity: Record<CapacityMode, string> = {
    pause: "No ritual is required; the brief can offer permission to stop.",
    low: "The recommendation stays very short and avoids extra setup.",
    steady: "The recommendation can be practical while staying under twenty minutes.",
    high: "The recommendation can be more active without becoming a task list.",
  };

  return {
    label: labelByCapacity[capacityMode],
    type: "capacity",
    summary:
      capacityMode === "pause"
        ? summaryByCapacity[capacityMode]
        : `${summaryByCapacity[capacityMode]} Current limit: ${durationMinutes} minutes or less.`,
    strength: "supporting",
  };
}

function getProfileSignal(
  privateProfileCard: SymbolicCard | undefined,
  preferenceMatches: string[],
  profileSignalMatches: PrivateProfileSignal[],
  audience: PrivateAudience,
): BriefSignal | undefined {
  if (profileSignalMatches.length > 0) {
    const natalSignals = profileSignalMatches.filter(
      (signal) => signal.source === "natal_theme",
    );
    const profileLabels = getProfileLabels(natalSignals.length > 0
      ? natalSignals
      : profileSignalMatches);

    return {
      label: natalSignals.length > 0
        ? `Natal chart themes — ${profileLabels.join(" and ")}`
        : audience === "together"
          ? "Saved profile themes — shared fit"
          : `Saved profile theme — ${getProfileThemeLabels(profileSignalMatches, audience)[0]}`,
      type: "profile",
      summary: getProfileThemeReason(profileSignalMatches, audience),
      strength: "supporting",
    };
  }

  if (preferenceMatches.length > 0) {
    const label = preferenceMatches
      .slice(0, 2)
      .map((preference) => getProfilePreferenceLabel(preference).toLowerCase())
      .join(" and ");

    return {
      label: `Saved preference — ${label}`,
      type: "profile",
      summary: "This fits a saved preference that shaped the ritual choice.",
      strength: "supporting",
    };
  }

  if (privateProfileCard) {
    return {
      label: "Saved preference — practical home tending",
      type: "profile",
      summary:
        "This fits the saved preference for practical, useful home-tending rituals.",
      strength: "supporting",
    };
  }

  return undefined;
}

function getBriefSignals(
  input: ResolvedGenerateWeeklyBriefInput,
  privateProfileCard: SymbolicCard | undefined,
  preferenceMatches: string[],
  profileSignalMatches: PrivateProfileSignal[],
  selectedTimingSignals: TimingSignal[],
): BriefSignal[] {
  const durationMinutes = getEffectiveDurationMinutes(
    input.capacityMode,
    input.scheduleConstraints,
  );
  const timingSignals = selectedTimingSignals.map((signal) => ({
    label: signal.signalLabel,
    type: getSignalType(signal),
    summary: signal.signalSummary,
    strength: signal.strength,
  }));
  const capacitySignal = getCapacitySignal(input.capacityMode, durationMinutes);
  const profileSignal = getProfileSignal(
    privateProfileCard,
    preferenceMatches,
    profileSignalMatches,
    input.audience,
  );

  return [
    ...timingSignals,
    capacitySignal,
    profileSignal,
  ]
    .filter((signal): signal is BriefSignal => signal !== undefined)
    .slice(0, 4);
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

function getProfileThemeLabels(
  profileSignalMatches: PrivateProfileSignal[],
  audience: PrivateAudience,
): string[] {
  const labels = profileSignalMatches.map((signal) => signal.label);
  const uniqueLabels = labels.filter(
    (label, index) => labels.indexOf(label) === index,
  );

  if (audience === "together" && uniqueLabels.length > 1) {
    return uniqueLabels.slice(0, 2);
  }

  return uniqueLabels.slice(0, 1);
}

function getProfileLabels(
  profileSignalMatches: PrivateProfileSignal[],
): string[] {
  const labels = profileSignalMatches.map((signal) => {
    if (signal.profileLabel) {
      return signal.profileLabel;
    }

    if (signal.audience === "person_a") {
      return "Person A";
    }

    if (signal.audience === "person_b") {
      return "Person B";
    }

    return "Household";
  });

  return labels.filter((label, index) => labels.indexOf(label) === index).slice(0, 2);
}

function getProfileThemeReason(
  profileSignalMatches: PrivateProfileSignal[],
  audience: PrivateAudience,
): string {
  const labels = getProfileThemeLabels(profileSignalMatches, audience);
  const natalSignals = profileSignalMatches.filter(
    (signal) => signal.source === "natal_theme",
  );

  if (labels.length === 0) {
    return "Saved profile themes helped shape the fit without exposing private chart details.";
  }

  if (natalSignals.length > 0) {
    const people = getProfileLabels(natalSignals);
    const themeText = labels.join(" and ");

    if (audience === "together" && labels.length > 1) {
      return `For a together recommendation, saved profile and natal-chart themes for ${people.join(" and ")} balance ${labels[0]} with ${labels[1]}.`;
    }

    if (audience === "either") {
      return `Saved profile and natal-chart themes for ${people.join(" and ")} fit at least one profile around ${labels[0]} without conflicting with household avoid flags.`;
    }

    if (people.length > 1) {
      return `Saved natal-chart themes for ${people.join(" and ")} point toward ${themeText}; the brief uses that as private fit context, not a prediction.`;
    }

    return `Saved natal-chart themes for ${people[0]} point toward ${themeText}; the brief uses that as private fit context, not a prediction.`;
  }

  if (audience === "together" && labels.length > 1) {
    return `For a together recommendation, this balances ${labels[0]} with ${labels[1]}.`;
  }

  if (audience === "either") {
    return `This fits at least one saved profile theme around ${labels[0]} without conflicting with household avoid flags.`;
  }

  return `This also fits the saved profile theme for ${labels[0]}.`;
}

function getAudienceLabel(audience: PrivateAudience): string {
  switch (audience) {
    case "person_a":
      return "one saved profile";
    case "person_b":
      return "one saved profile";
    case "together":
      return "both profiles together";
    case "either":
      return "at least one saved profile";
  }
}

function getCheckInAudienceLabel(
  audience: CurrentRitualCheckIn["audience"],
): string | undefined {
  if (audience === "both_of_us") {
    return "both of you";
  }

  if (audience === "me") {
    return "you";
  }

  return undefined;
}

function getEnergyCapacityLabel(
  energyCapacity: CurrentRitualCheckIn["energyCapacity"],
): string {
  switch (energyCapacity) {
    case "barely_any":
      return "Barely any";
    case "a_little":
      return "A little";
    case "enough_to_engage":
      return "Enough to engage";
    case "room_for_something_deeper":
      return "Room for something deeper";
  }
}

function getPatternTitle(pattern: RitualPattern): string {
  return pattern.title;
}

function getReadableStyleList(values: string[], limit = 2): string {
  return values
    .slice(0, limit)
    .map((value) => getProfilePreferenceLabel(value).toLowerCase())
    .join(" and ");
}

function getPracticeFit(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
): {
  label?: string;
  matched: boolean;
  matches: string[];
  openPreference: boolean;
} {
  const checkIn = input.currentRitualCheckIn;
  const hints = checkIn?.practiceTypeHints ?? [];
  const matches = getPatternStyleMatches(pattern, hints);
  const openPreference = Boolean(checkIn?.practiceTypeLabel && hints.length === 0);

  return {
    label: checkIn?.practiceTypeLabel,
    matched: hints.length > 0 && matches.length > 0,
    matches,
    openPreference,
  };
}

function getPracticeChoiceDiagnostic(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
): PracticeChoiceDiagnostic | undefined {
  const checkIn = input.currentRitualCheckIn;

  if (!checkIn) {
    return undefined;
  }

  const visibleOptions = getPracticeOptionsForEnergy(checkIn.energyCapacity).map(
    (option) => ({
      label: option.label,
      practiceTypeHints: option.practiceTypeHints ?? [],
    }),
  );

  if (visibleOptions.length === 0) {
    return {
      visibleOptions,
      selectedHints: [],
      selectedPatternMatches: [],
      status: "not_asked",
      note: "This capacity level skips the practice-choice step.",
    };
  }

  const selectedHints = checkIn.practiceTypeHints ?? [];
  const selectedPatternMatches = getPatternStyleMatches(pattern, selectedHints);

  if (checkIn.practiceTypeLabel?.startsWith("Surprise me ->")) {
    return {
      visibleOptions,
      selectedLabel: checkIn.practiceTypeLabel,
      selectedHints,
      selectedPatternMatches,
      status: "resolved_open_preference",
      note: "Surprise me resolved to one visible practice category before recommendation.",
    };
  }

  if (checkIn.practiceTypeLabel && selectedHints.length === 0) {
    return {
      visibleOptions,
      selectedLabel: checkIn.practiceTypeLabel,
      selectedHints,
      selectedPatternMatches,
      status: "open_preference",
      note: "The selected practice answer was open, so no practice style was boosted.",
    };
  }

  if (selectedPatternMatches.length > 0) {
    return {
      visibleOptions,
      selectedLabel: checkIn.practiceTypeLabel,
      selectedHints,
      selectedPatternMatches,
      status: "matched_selected_pattern",
      note: "The selected practice answer matched the winning ritual pattern.",
    };
  }

  return {
    visibleOptions,
    selectedLabel: checkIn.practiceTypeLabel,
    selectedHints,
    selectedPatternMatches,
    status: "set_aside",
    note: "The selected practice answer did not match the winning ritual pattern and was set aside for stronger fit signals.",
  };
}

function getFocusFit(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
): {
  label?: string;
  matched: boolean;
  matches: string[];
} {
  const checkIn = input.currentRitualCheckIn;
  const focus = input.selectedRitualFocus;
  const focusStyleHints = getFocusStyleHints(input);
  const matches = getPatternStyleMatches(pattern, focusStyleHints);

  return {
    label: focus?.label ?? checkIn?.ritualFocusLabel ?? checkIn?.ritualFocusText,
    matched: focusStyleHints.length === 0 || matches.length > 0,
    matches,
  };
}

function getPrimaryTimingPhrase(
  timingCard: SymbolicCard,
  input: ResolvedGenerateWeeklyBriefInput,
  selectedTimingSignals: TimingSignal[],
): string {
  const signal = selectedTimingSignals
    .map((candidate) => ({
      label: candidate.signalLabel,
      type: getSignalType(candidate),
    }))
    .find((candidate) => ["moon", "planetary", "seasonal"].includes(candidate.type));

  if (input.timeScope === "best_moment_this_week") {
    if (isStrongTimingWindow(input.selectedTimingWindow)) {
      return `${formatTimingWindowDate(input.selectedTimingWindow.startsAtIso)} stood out as the strongest timing window this week.`;
    }

    return "No single timing window stood out strongly this week.";
  }

  if (signal) {
    return `${signal.label} shaped the timing tone.`;
  }

  return `${timingCard.title} shaped the timing tone.`;
}

function getWhyThisFits(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  input: ResolvedGenerateWeeklyBriefInput,
  preferenceMatches: string[],
  profileSignalMatches: PrivateProfileSignal[],
  natalContactMatches: NatalContact[],
  selectedTimingSignals: TimingSignal[],
): string {
  const practiceFit = getPracticeFit(input, pattern);
  const focusFit = getFocusFit(input, pattern);
  const driverParts: string[] = [];

  driverParts.push(getPrimaryTimingPhrase(timingCard, input, selectedTimingSignals));

  if (practiceFit.label && practiceFit.matched) {
    driverParts.push(`Your ${practiceFit.label.toLowerCase()} choice helped point toward ${getPatternTitle(pattern)}.`);
  } else if (focusFit.label && focusFit.matched) {
    driverParts.push(`Your focus on ${focusFit.label.toLowerCase()} helped point toward ${getPatternTitle(pattern)}.`);
  } else {
    driverParts.push(`${getPatternTitle(pattern)} gave the timing a practical household shape.`);
  }

  if (
    input.currentRitualCheckIn?.ritualFocusKey === "making_a_beginning" &&
    input.timingFacts.includes("moon.waning")
  ) {
    driverParts.push(
      "Because this is waning timing, the beginning is treated as preparation: making room, naming the first step, or clearing attention.",
    );
  }

  if (preferenceMatches.length > 0) {
    driverParts.push(`It also fits saved preferences for ${getReadableStyleList(preferenceMatches)}.`);
  } else if (profileSignalMatches.length > 0) {
    driverParts.push(getProfileThemeReason(profileSignalMatches, input.audience));
  } else if (natalContactMatches.length > 0) {
    driverParts.push("Private timing contacts added a small thematic fit note without making a certain claim.");
  }

  driverParts.push(getCapacityReason(
    input.capacityMode,
    getEffectiveDurationMinutes(input.capacityMode, input.scheduleConstraints),
  ));

  return driverParts.slice(0, 3).join(" ").replace(/\s+/g, " ").trim();
}

function getTimingChoiceSection(
  timingCard: SymbolicCard,
  input: ResolvedGenerateWeeklyBriefInput,
  selectedTimingSignals: TimingSignal[],
): ExplanationSection {
  if (input.timeScope === "best_moment_this_week") {
    if (isStrongTimingWindow(input.selectedTimingWindow)) {
      return {
        kind: "timing_choice",
        title: "Timing",
        body: `${formatTimingWindowDate(input.selectedTimingWindow.startsAtIso)} was the strongest timing window in the next several days. ${getTimingWindowReason(input.selectedTimingWindow)}`,
      };
    }

    return {
      kind: "timing_choice",
      title: "Timing",
      body: "No single timing window stood out strongly this week, so the recommendation stays close to your check-in and current capacity. You can do it whenever it feels workable.",
    };
  }

  const primarySignal =
    selectedTimingSignals.find((signal) =>
      ["moon_phase", "lunation", "planet_sign", "planetary_aspect", "solar_season"].includes(signal.timingFactType),
    );

  return {
    kind: "timing_choice",
    title: "Timing",
    body: primarySignal
      ? `${primarySignal.signalLabel} was the main timing signal used here: ${ensureSentence(primarySignal.signalSummary)}`
      : `${timingCard.title} shaped the timing theme: ${ensureSentence(timingCard.summary)}`,
  };
}

function getCheckInFitSection(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
): ExplanationSection | undefined {
  const checkIn = input.currentRitualCheckIn;

  if (!checkIn) {
    return undefined;
  }

  const parts: string[] = [];
  const practiceFit = getPracticeFit(input, pattern);
  const audienceLabel = getCheckInAudienceLabel(checkIn.audience);

  parts.push(
    checkIn.timeScope === "best_moment_this_week"
      ? "You asked to look across the week."
      : "You asked for something for today.",
  );
  parts.push(`You chose ${getEnergyCapacityLabel(checkIn.energyCapacity).toLowerCase()} capacity.`);

  if (audienceLabel) {
    parts.push(`This is for ${audienceLabel}.`);
  }

  if (practiceFit.label) {
    if (practiceFit.openPreference) {
      parts.push(`${practiceFit.label} left the practice type open, so it did not boost any one ritual style.`);
    } else {
      parts.push(
        practiceFit.matched
          ? `Your ${practiceFit.label.toLowerCase()} choice matched ${getPatternTitle(pattern)}.`
          : `You leaned toward ${practiceFit.label.toLowerCase()}, but ${getPatternTitle(pattern)} was a stronger fit for the rest of the check-in.`,
      );
    }
  }

  return {
    kind: "check_in_fit",
    title: "Your check-in",
    body: parts.join(" "),
  };
}

function getNumerologyAccentSection(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
  selectedTimingSignals: TimingSignal[],
): ExplanationSection | undefined {
  const diagnostic = getNumerologyDiagnostic(input, pattern, selectedTimingSignals);

  if (diagnostic.status !== "matched_selected") {
    return undefined;
  }

  return {
    kind: "numerology_accent",
    title: "Numerology accent",
    body: `${diagnostic.selectedSignalLabels.join(" and ")} matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.`,
  };
}

function getRitualFocusSection(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
): ExplanationSection | undefined {
  const focus = input.selectedRitualFocus;
  const focusLabel =
    focus?.label ??
    input.currentRitualCheckIn?.ritualFocusLabel ??
    input.currentRitualCheckIn?.ritualFocusText;

  if (!focusLabel) {
    return undefined;
  }

  const focusFit = getFocusFit(input, pattern);
  const primaryMoonFact = getPrimaryMoonTimingFact(input.timingFacts);
  let body: string;

  if (
    focus?.key === "making_a_beginning" &&
    (primaryMoonFact === "moon.waning" || primaryMoonFact === "moon.new")
  ) {
    body = `You chose ${focusLabel.toLowerCase()}, and the timing was better for preparation than a big launch. The recommendation keeps the beginning focus by making room for a first step.`;
  } else if (focus?.key === "tending_us" && input.capacityMode !== "high") {
    body = `You chose ${focusLabel.toLowerCase()}, but current capacity called for a smaller shared ritual rather than a long conversation or heavy emotional process.`;
  } else if (focusFit.matched) {
    body = `Your focus on ${focusLabel.toLowerCase()} matched the selected ritual shape.`;
  } else {
    body = `Your focus was ${focusLabel.toLowerCase()}, but ${getPatternTitle(pattern)} was chosen as the closest approved ritual that still fit capacity and safety.`;
  }

  return {
    kind: "ritual_focus",
    title: "Ritual focus",
    body,
  };
}

function getRitualFitSection(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
  preferenceMatches: string[],
): ExplanationSection {
  const presentation = getEffectivePresentation(
    pattern,
    input.capacityMode,
    input.audience,
  );
  const styleText =
    preferenceMatches.length > 0
      ? ` It also matched ${getReadableStyleList(preferenceMatches, 3)}.`
      : "";
  const summary = presentation
    ? `${presentation.whyThisPractice} ${presentation.closing}`
    : ensureSentence(pattern.summary);

  return {
    kind: "ritual_fit",
    title: "Ritual fit",
    body: `${pattern.title} was selected as the approved ritual container. It takes about ${pattern.defaultDurationMinutes} minute${pattern.defaultDurationMinutes === 1 ? "" : "s"} and keeps the action concrete: ${ensureSentence(summary)}${styleText}`,
  };
}

function getProfileFitSection(
  input: ResolvedGenerateWeeklyBriefInput,
  profileSignalMatches: PrivateProfileSignal[],
  preferenceMatches: string[],
): ExplanationSection | undefined {
  if (profileSignalMatches.length > 0) {
    return {
      kind: "profile_fit",
      title: "Profile fit",
      body: `${getProfileThemeReason(profileSignalMatches, input.audience)} This is used as fit context for ${getAudienceLabel(input.audience)}, not as a prediction.`,
    };
  }

  if (preferenceMatches.length > 0) {
    return {
      kind: "profile_fit",
      title: "Profile fit",
      body: `Saved preferences gave extra weight to ${getReadableStyleList(preferenceMatches, 3)}.`,
    };
  }

  return undefined;
}

function getNatalContactSection(
  contacts: NatalContact[],
  visibility: AstrologyVisibility,
): ExplanationSection | undefined {
  if (contacts.length === 0) {
    return undefined;
  }

  const themeLabels = uniqueValues(
    contacts.map((contact) => getNatalContactThemeLabel(contact)),
  ).slice(0, 2);
  const defaultBody = `Private timing contacts added weight to ${themeLabels.join(" and ")}. The recommendation uses those contacts as symbolic fit context, not as a prediction.`;

  if (visibility !== "explicit") {
    return {
      kind: "natal_fit",
      title: "Private timing fit",
      body: defaultBody,
    };
  }

  const contact = contacts[0];
  const contactLabel = [
    labelFromSnake(contact.transitingBody),
    contact.aspectType ? labelFromSnake(contact.aspectType) : labelFromSnake(contact.contactType),
    "private natal",
    labelFromSnake(contact.natalBodyOrPoint),
  ].filter(Boolean).join(" ");

  return {
    kind: "natal_fit",
    title: "Private timing fit",
    body: `${contactLabel} added weight to ${themeLabels[0] ?? "private fit"}. This stays symbolic and does not turn the chart contact into an instruction.`,
  };
}

function getCapacityBoundarySection(
  input: ResolvedGenerateWeeklyBriefInput,
): ExplanationSection {
  const durationMinutes = getEffectiveDurationMinutes(
    input.capacityMode,
    input.scheduleConstraints,
  );

  return {
    kind: "capacity_boundary",
    title: "Capacity boundary",
    body: getCapacityReason(input.capacityMode, durationMinutes),
  };
}

function getTradeoffSection(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
  excludedPatternKeys: string[],
  safetyNotes: string[],
): ExplanationSection | undefined {
  const practiceFit = getPracticeFit(input, pattern);
  const focusFit = getFocusFit(input, pattern);
  const mismatchParts: string[] = [];

  if (practiceFit.label && !practiceFit.matched && !practiceFit.openPreference) {
    mismatchParts.push(`The practice answer leaned toward ${practiceFit.label.toLowerCase()}, but the selected ritual fit capacity, timing, and profile context better.`);
  }

  if (focusFit.label && !focusFit.matched) {
    mismatchParts.push(`The focus answer was ${focusFit.label.toLowerCase()}, so the selected ritual kept that as a tone rather than forcing an exact pattern match.`);
  }

  if (excludedPatternKeys.length > 0 || safetyNotes.length > 0) {
    mismatchParts.push("Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.");
  }

  if (mismatchParts.length === 0) {
    return undefined;
  }

  return {
    kind: "tradeoff_or_alternative",
    title: "Tradeoff",
    body: mismatchParts.join(" "),
  };
}

function getSourcesSection(
  sourcesUsed: BriefSourceSummary[],
): ExplanationSection | undefined {
  if (sourcesUsed.length === 0) {
    return undefined;
  }

  const labels = sourcesUsed.slice(0, 4).map((source) => source.label);

  return {
    kind: "sources",
    title: "Sources",
    body: `This drew from ${labels.join("; ")}.`,
    sourceLabels: labels,
  };
}

function getHowThisWasChosen(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  input: ResolvedGenerateWeeklyBriefInput,
  preferenceMatches: string[],
  profileSignalMatches: PrivateProfileSignal[],
  natalContactMatches: NatalContact[],
  excludedPatternKeys: string[],
  safetyNotes: string[],
  selectedTimingSignals: TimingSignal[],
  sourcesUsed: BriefSourceSummary[],
): ExplanationSection[] {
  return [
    getTimingChoiceSection(timingCard, input, selectedTimingSignals),
    getNumerologyAccentSection(input, pattern, selectedTimingSignals),
    getCheckInFitSection(input, pattern),
    getRitualFocusSection(input, pattern),
    getRitualFitSection(input, pattern, preferenceMatches),
    getProfileFitSection(input, profileSignalMatches, preferenceMatches),
    getNatalContactSection(natalContactMatches, input.astrologyVisibility),
    getCapacityBoundarySection(input),
    getTradeoffSection(input, pattern, excludedPatternKeys, safetyNotes),
    getSourcesSection(sourcesUsed),
  ].filter((section): section is ExplanationSection => section !== undefined);
}

function labelFromSnake(value: string | undefined): string {
  if (!value) {
    return "";
  }

  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getNatalContactThemeLabel(contact: NatalContact): string {
  const firstTheme = contact.themeKeys.find(
    (themeKey) =>
      themeKey !== "private_natal_contact" &&
      !themeKey.startsWith("private_profile."),
  );

  if (firstTheme) {
    return getHumanThemeLabel(firstTheme);
  }

  const privateProfileTheme = contact.themeKeys.find((themeKey) =>
    themeKey.startsWith("private_profile."),
  );

  return privateProfileTheme
    ? getHumanThemeLabel(privateProfileTheme)
    : "private timing";
}

function getHumanThemeLabel(themeKey: string): string {
  const knownLabels: Record<string, string> = {
    "private_profile.practical_tending": "practical tending",
    "private_profile.beauty_warmth": "warmth and beauty",
    "private_profile.structured_action": "structured action",
    practical_tending: "practical tending",
    practical_care: "practical care",
    beauty_warmth: "warmth and beauty",
    visible_warmth: "visible warmth",
    beauty_and_affection: "beauty and affection",
    structure_and_repair: "structure and repair",
    careful_words: "careful words",
    soft_release: "soft release",
    practical_adjustment: "practical adjustment",
    focus_and_visibility: "focus and visibility",
  };

  return knownLabels[themeKey] ?? themeKey
    .replace(/^private_profile\./, "")
    .replaceAll("_", " ");
}

function getNatalContactReason(
  contacts: NatalContact[],
  _visibility: AstrologyVisibility,
): string {
  if (contacts.length === 0) {
    return "";
  }

  const primary = contacts[0];
  const themeLabel = getNatalContactThemeLabel(primary);

  return `Private-profile scoring added a small fit note for ${themeLabel}; exact chart contacts stay in debug.`;
}

function getTimingWindowReason(candidate: TimingWindowCandidate): string {
  const reasons = candidate.scoreReasons
    .filter((reason) => reason.points > 0)
    .sort((a, b) => b.points - a.points);
  const primaryReason = reasons[0];
  const hasNatalReason = reasons.some((reason) =>
    [
      "natal_contact_present",
      "shared_natal_contact_match",
      "multiple_natal_contacts_same_theme",
    ].includes(reason.code),
  );
  const hasExactMoonReason = reasons.some((reason) =>
    ["exact_full_moon", "exact_new_moon"].includes(reason.code),
  );
  const reasonParts: string[] = [];

  if (primaryReason && ![
    "natal_contact_present",
    "shared_natal_contact_match",
    "multiple_natal_contacts_same_theme",
  ].includes(primaryReason.code)) {
    reasonParts.push(primaryReason.label.toLowerCase());
  }

  if (hasNatalReason) {
    reasonParts.push("a stronger match with saved household themes");
  }

  if (hasExactMoonReason) {
    reasonParts.push("exact lunar timing");
  }

  return reasonParts.length > 0
    ? `The window stood out because of ${uniqueValues(reasonParts).join(" and ")}.`
    : "The window stood out because its timing score was stronger than the other available options.";
}

function getFitReason(
  privateProfileCard: SymbolicCard | undefined,
  preferenceMatches: string[],
  avoidedRitualStyles: string[],
  profileSignalMatches: PrivateProfileSignal[],
  natalContactMatches: NatalContact[],
  astrologyVisibility: AstrologyVisibility,
  audience: PrivateAudience,
): string {
  const natalContactReason = getNatalContactReason(
    natalContactMatches,
    astrologyVisibility,
  );

  if (preferenceMatches.length > 0) {
    const labels = preferenceMatches
      .slice(0, 2)
      .map((preference) => getProfilePreferenceLabel(preference).toLowerCase());
    const preferenceReason = `Your saved preferences lean toward ${labels.join(" and ")}.`;

    if (profileSignalMatches.length > 0) {
      return `${preferenceReason} ${getProfileThemeReason(profileSignalMatches, audience)} ${natalContactReason}`.trim();
    }

    return `${preferenceReason} ${natalContactReason}`.trim();
  }

  if (profileSignalMatches.length > 0) {
    return `${getProfileThemeReason(profileSignalMatches, audience)} ${natalContactReason}`.trim();
  }

  if (natalContactReason) {
    return natalContactReason;
  }

  if (privateProfileCard) {
    return `Your saved settings favor ${privateProfileCard.themes[0]}.`;
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

  return "Your household settings keep the suggestion practical.";
}

function getCheckInReason(
  input: ResolvedGenerateWeeklyBriefInput,
  pattern: RitualPattern,
): string {
  const checkIn = input.currentRitualCheckIn;

  if (!checkIn) {
    return "";
  }

  const reasons: string[] = [];

  if (checkIn.timeScope === "best_moment_this_week") {
    if (isStrongTimingWindow(input.selectedTimingWindow)) {
      reasons.push(
        `You asked the app to look across the week, so it chose ${formatTimingWindowDate(input.selectedTimingWindow.startsAtIso)} as the strongest available timing window. ${getTimingWindowReason(input.selectedTimingWindow)}`,
      );
    } else {
      reasons.push(
        "You asked the app to look across the week, but no timing window stood out strongly enough; this can happen whenever you have the capacity for it.",
      );
    }
  } else {
    reasons.push("You asked for something for today, so the recommendation stays close to the current moment.");
  }

  const practiceFit = getPracticeFit(input, pattern);

  if (practiceFit.label && practiceFit.matched) {
    reasons.push(`Your practice choice, ${practiceFit.label.toLowerCase()}, shaped which approved patterns fit well.`);
  } else if (practiceFit.openPreference) {
    reasons.push(`${practiceFit.label} left the practice style open instead of boosting one practice category.`);
  }

  const focusLabel = input.selectedRitualFocus?.label ?? checkIn.ritualFocusText;

  if (focusLabel) {
    reasons.push(`Your intention around ${focusLabel.toLowerCase()} helped steer the fit.`);
  }

  if (
    checkIn.ritualFocusKey === "making_a_beginning" &&
    input.timingFacts.includes("moon.waning")
  ) {
    reasons.push(
      "Because the timing is waning, the beginning is treated as preparation: making room, naming the first step, or clearing attention before pushing forward.",
    );
  }

  if (checkIn.audience === "both_of_us") {
    reasons.push("Because this is for both of you, shared household fit mattered.");
  } else if (checkIn.audience === "me") {
    reasons.push("Because this is for you, the app leaned on your saved profile fit.");
  }

  return reasons.join(" ");
}

function getWhyThis(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  privateProfileCard: SymbolicCard | undefined,
  input: ResolvedGenerateWeeklyBriefInput,
  preferenceMatches: string[],
  profileSignalMatches: PrivateProfileSignal[],
  natalContactMatches: NatalContact[],
  excludedPatternKeys: string[],
): string {
  const durationMinutes = getEffectiveDurationMinutes(
    input.capacityMode,
    input.scheduleConstraints,
  );
  const fitReason =
    excludedPatternKeys.length > 0
      ? `A few options were set aside because they did not fit current capacity, preferences, or practical constraints.`
      : "";
  const capacityReason = getCapacityReason(input.capacityMode, durationMinutes);
  return `${getTimingReason(timingCard, input.timingFactDetails[0])} ${getCheckInReason(input, pattern)} ${pattern.title} was chosen as one small approved home practice for that theme. ${getFitReason(privateProfileCard, preferenceMatches, input.avoidedRitualStyles, profileSignalMatches, natalContactMatches, input.astrologyVisibility, input.audience)} ${capacityReason} ${fitReason}`.replace(/\s+/g, " ").trim();
}

function getReasoning(
  whyThis: string,
  pattern: RitualPattern,
  input: ResolvedGenerateWeeklyBriefInput,
): BriefReason[] {
  return [
    {
      label: "Why this ritual",
      summary: whyThis,
    },
    {
      label: "Why only one thing",
      summary:
        input.capacityMode === "high"
          ? `${pattern.title} is still kept to one primary recommendation so the week does not turn into a task list.`
          : `${pattern.title} is kept to one primary recommendation so the brief stays low-overwhelm.`,
    },
  ];
}

function getFilterNotes(
  input: ResolvedGenerateWeeklyBriefInput,
  preferenceMatches: string[],
  profileSignalMatches: PrivateProfileSignal[],
  natalContactMatches: NatalContact[],
  excludedPatternKeys: string[],
  safetyNotes: string[],
): BriefFilterNote[] {
  const durationMinutes = getEffectiveDurationMinutes(
    input.capacityMode,
    input.scheduleConstraints,
  );
  const notes: BriefFilterNote[] = [
    {
      label: "Capacity",
      summary: getCapacityReason(input.capacityMode, durationMinutes),
    },
  ];

  if (preferenceMatches.length > 0 || input.avoidedRitualStyles.length > 0) {
    notes.push({
      label: "Preferences",
      summary: getPreferenceReason(preferenceMatches, input.avoidedRitualStyles),
    });
  }

  if (profileSignalMatches.length > 0) {
    notes.push({
      label: "Profile themes",
      summary: getProfileThemeReason(profileSignalMatches, input.audience),
    });
  }

  if (natalContactMatches.length > 0) {
    notes.push({
      label: "Private timing resonance",
      summary: getNatalContactReason(
        natalContactMatches,
        input.astrologyVisibility,
      ),
    });
  }

  if (excludedPatternKeys.length > 0 || safetyNotes.length > 0) {
    notes.push({
      label: "Practical fit",
      summary:
        "Some options were set aside when they did not fit current capacity, preferences, or practical household constraints.",
    });
  }

  return notes;
}

function getTheme(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  capacityMode: CapacityMode,
  audience: PrivateAudience,
): string {
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
  const presentation = getEffectivePresentation(pattern, capacityMode, audience);
  const patternPhrase =
    presentation?.invitation ?? patternPhraseByKey[pattern.key] ?? pattern.summary;

  return `${timingPhrase} ${patternPhrase}`;
}

function getIntention(
  pattern: RitualPattern,
  capacityMode: CapacityMode,
  audience: PrivateAudience,
): string {
  const presentation = getEffectivePresentation(pattern, capacityMode, audience);

  if (presentation) {
    return presentation.invitation;
  }

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

function getReflectionPrompt(
  pattern: RitualPattern,
  capacityMode: CapacityMode,
  audience: PrivateAudience,
  timingFact: TimingFactKey,
): string {
  const presentation = getEffectivePresentation(pattern, capacityMode, audience);

  if (presentation) {
    return presentation.carry;
  }

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
  const fitSummary =
    safetyNotes.length > 0 ? ", practical guardrails" : "";

  return `Sources: ${timingCard.title.toLowerCase()} card, ${pattern.title.toLowerCase()} pattern${fitSummary}.`;
}

function getHumanSourceLabel(reference: string): string | undefined {
  if (reference.startsWith("source.")) {
    const review = starterSourceReviews.find((source) => source.id === reference);

    return review?.title;
  }

  if (reference.includes("#2-moon-phase-reference-set")) {
    return "Moon phase source packet";
  }

  if (reference.includes("#3-numerology-reference-set")) {
    return "Numerology source packet";
  }

  if (reference.includes("#4-home-magic-starter-set")) {
    return "Home magic source packet";
  }

  if (reference.includes("source-ingestion-plan")) {
    return "Source ingestion plan";
  }

  return undefined;
}

function sentenceCase(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}`;
}

function ensureSentence(value: string): string {
  const trimmed = value.trim();

  if (!trimmed || /[.!?]$/.test(trimmed)) {
    return trimmed;
  }

  return `${trimmed}.`;
}

function getHumanStyleLabel(value: string): string {
  if (value === "candle_or_light") {
    return "candle or light";
  }

  return value.replaceAll("_", " ");
}

function getAvoidSummary(value: string): string {
  const trimmed = value.replace(/\.$/, "");
  const withoutPrefix = trimmed.replace(/^Do not\s+/i, "");
  const firstWord = withoutPrefix.split(/\s+/)[0]?.toLowerCase();
  const gerunds: Record<string, string> = {
    claim: "claiming",
    frame: "framing",
    imply: "implying",
    make: "making",
    predict: "predicting",
    push: "pushing",
    require: "requiring",
    say: "saying",
    suggest: "suggesting",
    turn: "turning",
    use: "using",
  };

  if (firstWord && gerunds[firstWord]) {
    return `avoid ${withoutPrefix.replace(new RegExp(`^${firstWord}`, "i"), gerunds[firstWord])}`;
  }

  return `avoid ${withoutPrefix}`;
}

function getSourceReviewSummary(
  reference: string,
  selectedNoteReferences: string[],
): string | undefined {
  const review = starterSourceReviews.find((source) => source.id === reference);

  if (!review) {
    return undefined;
  }

  const selectedNotes = selectedNoteReferences
    .map((noteReference) =>
      starterSourceNotes.find(
        (sourceNote) =>
          sourceNote.id === noteReference && sourceNote.sourceId === review.id,
      ),
    )
    .filter((note): note is NonNullable<typeof note> => note !== undefined);
  const genericNoteIds = new Set([
    "note.four_phase_moon_mvp",
    "note.lunar_cards_stay_invitational",
    "note.astrology_ethics_no_personal_certainty",
    "note.barnum_forer_specificity_guardrail",
  ]);
  const uniqueNotes = selectedNotes
    .filter(
      (note, index, notes) =>
        notes.findIndex(
          (candidate) => candidate.paraphrasedNote === note.paraphrasedNote,
        ) === index,
    )
    .sort((a, b) => {
      const aIsGeneric = genericNoteIds.has(a.id);
      const bIsGeneric = genericNoteIds.has(b.id);

      if (aIsGeneric === bIsGeneric) {
        return 0;
      }

      return aIsGeneric ? 1 : -1;
    });
  const usedHere =
    uniqueNotes.length > 0
      ? uniqueNotes
          .slice(0, 2)
          .map((note) => ensureSentence(note.paraphrasedNote))
          .join(" ")
      : `This source shaped ${review.bestFor
          .slice(0, 2)
          .map((value) => value.toLowerCase())
          .join(" and ")}.`;
  const helpfulBecause = review.bestFor[0]
    ? ` Helpful because: ${ensureSentence(review.bestFor[0])}`
    : "";
  const guardrail = uniqueNotes[0]?.riskNotes[0] ?? review.concerns[0];
  const guardrailText = guardrail
    ? ` Guardrail: ${ensureSentence(guardrail)}`
    : "";

  return `Used here: ${usedHere}${helpfulBecause}${guardrailText}`;
}

function getSymbolicCardSourceSummary(card: SymbolicCard): string {
  return `Used here: ${card.themes.slice(0, 4).join(", ")}. Why helpful: ${card.summary} Guardrails: ${card.avoid_saying
    .slice(0, 2)
    .map(getAvoidSummary)
    .join("; ")}`;
}

function getPatternSourceSummary(pattern: RitualPattern): string {
  const firstStep = pattern.steps[0] ? ` Action: ${pattern.steps[0]}` : "";
  const whyHelpful = `${pattern.summary} It fit ${pattern.defaultDurationMinutes} minutes and ${pattern.ritualStyles
    .slice(0, 3)
    .map(getHumanStyleLabel)
    .join(", ")}.`;

  return `Used here: ${pattern.title.toLowerCase()} as the actual ritual container.${firstStep} Why helpful: ${whyHelpful}`;
}

function getSourceSummaries(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  timingSignals: TimingSignal[],
  safetyNotes: string[],
): BriefSourceSummary[] {
  const sourceSummaries: BriefSourceSummary[] = [
    {
      label: `${timingCard.title} card`,
      kind: "symbolic_card",
      summary: getSymbolicCardSourceSummary(timingCard),
    },
    {
      label: `${pattern.title} pattern`,
      kind: "ritual_pattern",
      summary: getPatternSourceSummary(pattern),
    },
  ];

  const selectedReferences = [
    ...timingSignals.flatMap((signal) => signal.sourceReferences),
    ...timingCard.source_references,
    ...pattern.sourceReferences,
  ];
  const selectedNoteReferences = selectedReferences.filter((reference) =>
    reference.startsWith("note."),
  );
  const selectedNoteSourceIds = new Set(
    selectedNoteReferences
      .map((reference) =>
        starterSourceNotes.find((sourceNote) => sourceNote.id === reference),
      )
      .filter((note): note is NonNullable<typeof note> => note !== undefined)
      .map((note) => note.sourceId),
  );
  const sourceReferences = selectedReferences
    .filter((reference) => reference.startsWith("source.") || reference.startsWith("docs/"))
    .filter((reference) => {
      if (!reference.startsWith("source.")) {
        return true;
      }

      return selectedNoteSourceIds.has(reference);
    });

  for (const reference of [...new Set(sourceReferences)].slice(0, 5)) {
    const label = getHumanSourceLabel(reference);

    if (!label) {
      continue;
    }

    sourceSummaries.push({
      label,
      kind: "source_review",
      summary:
        getSourceReviewSummary(reference, selectedNoteReferences) ??
        "Reviewed source context; no source prose is copied into the brief.",
    });
  }

  if (safetyNotes.length > 0 || pattern.sourceReferences.includes("source.safety_reference_families")) {
    sourceSummaries.push({
      label: "Practical household guardrails",
      kind: "safety_guardrail",
      summary:
        pattern.safetyFlags.fire === "live_flame"
          ? "Used here: kept candle handling ordinary and optional while letting the brief itself say candle plainly."
          : "Used here: checked whether the selected ritual needed reshaping for capacity, setup burden, or household fit.",
    });
  }

  return sourceSummaries.filter(
    (source, index, allSources) =>
      allSources.findIndex((candidate) => candidate.label === source.label) === index,
  );
}

function getExplanation(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  privateProfileCard: SymbolicCard | undefined,
  input: ResolvedGenerateWeeklyBriefInput,
  preferenceMatches: string[],
  profileSignalMatches: PrivateProfileSignal[],
  natalContactMatches: NatalContact[],
  excludedPatternKeys: string[],
  safetyNotes: string[],
  whyThis: string,
  selectedTimingSignals: TimingSignal[],
): BriefExplanation {
  const sourcesUsed = getSourceSummaries(
    timingCard,
    pattern,
    selectedTimingSignals,
    safetyNotes,
  );

  return {
    whyThisFits: getWhyThisFits(
      timingCard,
      pattern,
      input,
      preferenceMatches,
      profileSignalMatches,
      natalContactMatches,
      selectedTimingSignals,
    ),
    howThisWasChosen: getHowThisWasChosen(
      timingCard,
      pattern,
      input,
      preferenceMatches,
      profileSignalMatches,
      natalContactMatches,
      excludedPatternKeys,
      safetyNotes,
      selectedTimingSignals,
      sourcesUsed,
    ),
    signals: getBriefSignals(
      input,
      privateProfileCard,
      preferenceMatches,
      profileSignalMatches,
      selectedTimingSignals,
    ),
    reasoning: getReasoning(whyThis, pattern, input),
    filtersApplied: getFilterNotes(
      input,
      preferenceMatches,
      profileSignalMatches,
      natalContactMatches,
      excludedPatternKeys,
      safetyNotes,
    ),
    sourcesUsed,
  };
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

function getEvaluatedSymbolicCards(
  cards: SymbolicCard[],
  input: ResolvedGenerateWeeklyBriefInput,
): EvaluatedSymbolicCard[] {
  return cards.map((card) => {
    const traceKey = TRACE_KEY_BY_CARD_KEY[card.key] ?? card.key;
    const matchedTimingFacts = input.timingFacts.filter(
      (fact) => fact === traceKey,
    );
    const matchedProfileKeys = input.privateProfileKeys.filter(
      (key) => PRIVATE_PROFILE_CARD_KEY_BY_PLACEHOLDER_KEY[key] === card.key,
    );
    const scoreReasons = [
      ...(matchedTimingFacts.length > 0
        ? [
            scoreReason(
              "timing_fact_match",
              "Timing fact match",
              4,
              matchedTimingFacts.join(", "),
            ),
          ]
        : []),
      ...(matchedProfileKeys.length > 0
        ? [
            scoreReason(
              "profile_theme_card",
              "Private profile theme card",
              1,
              matchedProfileKeys.join(", "),
            ),
          ]
        : []),
      scoreReason("approved_symbolic_card", "Approved symbolic card", 0),
    ];

    return {
      key: card.key,
      title: card.title,
      matchedTimingFacts,
      matchedProfileKeys,
      sourceReferences: card.source_references,
      score: sumScoreReasons(scoreReasons),
      scoreReasons,
    };
  });
}

function getDecisionScoreSummary(
  pattern: RitualPattern,
  evaluatedPatterns: EvaluatedRitualPattern[],
): string {
  const selectedPattern = evaluatedPatterns.find(
    (candidate) => candidate.key === pattern.key,
  );

  if (!selectedPattern) {
    return `${pattern.title} was selected as the safe fallback.`;
  }

  const priorityByCode: Record<string, number> = {
    checkin_ritual_focus_match: 100,
    checkin_practice_type_match: 95,
    checkin_audience_match: 90,
    checkin_timing_window_match: 85,
    profile_theme_match: 80,
    natal_contact_theme_match: 75,
    shared_natal_contact_match: 70,
    profile_timing_resonance: 65,
    timing_signal_style_match: 60,
    symbolic_card_style_match: 55,
    preferred_style_match: 50,
    capacity_fit: 30,
    checkin_capacity_answer: 25,
  };
  const positiveReasons = selectedPattern.scoreReasons
    .filter((reason) => reason.points > 0)
    .sort((a, b) => {
      const priorityDiff =
        (priorityByCode[b.code] ?? 0) - (priorityByCode[a.code] ?? 0);

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return b.points - a.points;
    })
    .slice(0, 3)
    .map((reason) => reason.label.toLowerCase());

  if (positiveReasons.length === 0) {
    return `${pattern.title} was selected with a score of ${selectedPattern.score}.`;
  }

  return `${pattern.title} scored ${selectedPattern.score} from ${positiveReasons.join(", ")}.`;
}

function getDecisionSafetySummary(
  rejectedPatterns: RejectedCandidate[],
  safetyNotes: string[],
): string {
  const safetyRejectedCount = rejectedPatterns.filter((candidate) =>
    candidate.reasons.some((reason) => reason.code === "safety_block"),
  ).length;

  if (safetyRejectedCount > 0) {
    return `${safetyRejectedCount} ritual pattern(s) were rejected by hard safety rules.`;
  }

  if (safetyNotes.length > 0) {
    return "Practical fit notes were recorded for reviewed pattern selection.";
  }

  return "No hard safety exclusions affected the selected ritual.";
}

function getCheckInInfluences(input: ResolvedGenerateWeeklyBriefInput): string[] {
  const checkIn = input.currentRitualCheckIn;

  if (!checkIn) {
    return [];
  }

  return [
    "capacity",
    ...(checkIn.audience ? ["audience"] : []),
    ...(checkIn.practiceTypeHints && checkIn.practiceTypeHints.length > 0
      ? ["practice_type"]
      : []),
    ...(checkIn.ritualFocusKey || checkIn.ritualFocusText
      ? ["ritual_focus"]
      : []),
    ...(isStrongTimingWindow(input.selectedTimingWindow) ? ["timing_window"] : []),
  ];
}

function getRecommendationDecision({
  input,
  selectedCards,
  selectedTimingSignals,
  pattern,
  evaluatedPatterns,
  rejectedPatterns,
  sourceReferences,
  safetyNotes,
  noAlternateAvailable,
  natalContactMatches,
}: {
  input: ResolvedGenerateWeeklyBriefInput;
  selectedCards: SymbolicCard[];
  selectedTimingSignals: TimingSignal[];
  pattern: RitualPattern;
  evaluatedPatterns: EvaluatedRitualPattern[];
  rejectedPatterns: RejectedCandidate[];
  sourceReferences: string[];
  safetyNotes: string[];
  noAlternateAvailable: boolean;
  natalContactMatches: NatalContact[];
}): RecommendationDecision {
  return {
    inputs: {
      timingFacts: input.timingFacts,
      computedTimingFactIds: input.computedTimingFacts.map((fact) => fact.id),
      capacityMode: input.capacityMode,
      capacityLimitMinutes: getEffectiveDurationMinutes(
        input.capacityMode,
        input.scheduleConstraints,
      ),
      audience: input.audience,
      preferredRitualStyles: input.preferredRitualStyles,
      avoidedRitualStyles: input.avoidedRitualStyles,
      excludedRitualPatternKeys: input.excludedRitualPatternKeys,
      astrologyVisibility: input.astrologyVisibility,
      privateNatalProfilesLoaded: input.natalDiagnostics.privateNatalProfilesLoaded,
      privateNatalProfileCount: input.natalDiagnostics.privateNatalProfileCount,
      natalPlacementCounts: input.natalDiagnostics.natalPlacementCounts,
      natalContactsComputed: input.natalDiagnostics.natalContactsComputed,
      numerology: getNumerologyDiagnostic(input, pattern, selectedTimingSignals),
      timeScope: input.timeScope,
      ...(input.selectedTimingWindow
        ? { selectedTimingWindow: summarizeTimingWindow(input.selectedTimingWindow) }
        : {}),
      checkInInfluences: getCheckInInfluences(input),
      ...(input.currentRitualCheckIn
        ? { practiceChoice: getPracticeChoiceDiagnostic(input, pattern) }
        : {}),
      ...(input.currentRitualCheckIn
        ? { currentRitualCheckIn: input.currentRitualCheckIn }
        : {}),
    },
    candidates: {
      symbolicCards: getEvaluatedSymbolicCards(selectedCards, input),
      ritualPatterns: evaluatedPatterns.sort((a, b) => b.score - a.score),
    },
    selected: {
      timingSignalLabels: selectedTimingSignals.map(
        (signal) => signal.signalLabel,
      ),
      symbolicCardKeys: selectedCards.map((card) => card.key),
      ritualPatternKey: pattern.key,
      sourceReferences,
      natalContacts: natalContactMatches.map(summarizeNatalContact),
      natalContactThemeKeys: getNatalContactThemeKeys(natalContactMatches),
    },
    rejected: {
      ritualPatterns: rejectedPatterns,
    },
    explanation: {
      scoreSummary: getDecisionScoreSummary(pattern, evaluatedPatterns),
      safetySummary: getDecisionSafetySummary(rejectedPatterns, safetyNotes),
      noAlternateAvailable,
    },
  };
}

function selectTimingWindowCandidate(
  candidates: TimingWindowCandidate[],
  checkIn: CurrentRitualCheckIn | undefined,
): TimingWindowCandidate | undefined {
  if (candidates.length === 0) {
    return undefined;
  }

  for (const candidateId of checkIn?.timingWindowCandidateIds ?? []) {
    const match = candidates.find((candidate) => candidate.id === candidateId);

    if (match) {
      return match;
    }
  }

  return candidates[0];
}

function summarizeTimingWindow(
  candidate: TimingWindowCandidate | undefined,
): SelectedTimingWindowSummary | undefined {
  if (!candidate) {
    return undefined;
  }

  return {
    id: candidate.id,
    label: candidate.label,
    userWindow: getTimingWindowUserWindow(candidate),
    startsAtIso: candidate.startsAtIso,
    endsAtIso: candidate.endsAtIso,
    score: candidate.score,
    strength: candidate.strength,
    isStrong: isStrongTimingWindow(candidate),
    reasonLabels: candidate.scoreReasons.map((reason) => reason.label),
    scoreReasons: candidate.scoreReasons.map((reason) => ({
      label: reason.label,
      points: reason.points,
      detail: reason.detail,
    })),
  };
}

function mergeTimingFacts(facts: TimingFact[]): TimingFact[] {
  return facts.filter(
    (fact, index, allFacts) =>
      allFacts.findIndex((candidate) => candidate.id === fact.id) === index,
  );
}

function resolveInput(input: GenerateWeeklyBriefInput): ResolvedGenerateWeeklyBriefInput {
  const currentDate = resolveCurrentDate(input.currentDate);
  const currentRitualCheckIn = resolveSurpriseMePracticeChoice(
    input.currentRitualCheckIn,
  );
  const scheduleConstraints = resolveScheduleConstraints(
    input.scheduleConstraints,
  );
  const capacityMode =
    input.capacityMode ?? scheduleConstraints.defaultCapacityMode;
  const audience = input.audience ?? "either";
  const timeScope = currentRitualCheckIn?.timeScope ?? "today";
  const fallbackPrivateProfileKeys =
    input.privateProfileKeys ?? DEFAULT_PRIVATE_PROFILE_KEYS;
  const profileInputs =
    input.profileInputs && input.profileInputs.length > 0
      ? input.profileInputs
      : [
          {
            audience,
            profileThemeKeys: fallbackPrivateProfileKeys,
            preferredRitualStyles: input.preferredRitualStyles,
            avoidedRitualStyles: input.avoidedRitualStyles,
          },
        ];
  const selectedProfileInputs = getProfileSignalInputsForAudience(
    profileInputs,
    audience,
  );
  const privateProfileKeys = uniqueValues([
    ...fallbackPrivateProfileKeys,
    ...getProfileThemeKeysFromInputs(selectedProfileInputs),
  ]);
  const profileSignals = mapPrivateProfileThemesToSignals(
    profileInputs,
    audience,
  );
  const natalProfiles = input.natalProfiles ?? [];
  const selectedNatalProfiles = getNatalProfilesForAudience(
    natalProfiles,
    audience,
  );
  const astrologyVisibility = input.astrologyVisibility ?? "balanced";
  const timingWindowCandidates =
    timeScope === "best_moment_this_week"
      ? input.timingWindowCandidates ??
        getTimingWindowCandidates({
          startDate: currentDate,
          privateNatalProfiles: selectedNatalProfiles,
          astrologyVisibility,
          options: { maxCandidates: 8 },
        })
      : [];
  const selectedTimingWindow = selectTimingWindowCandidate(
    timingWindowCandidates,
    currentRitualCheckIn,
  );
  const strongSelectedTimingWindow = isStrongTimingWindow(selectedTimingWindow)
    ? selectedTimingWindow
    : undefined;
  const timingDate = strongSelectedTimingWindow
    ? resolveCurrentDate(strongSelectedTimingWindow.startsAtIso)
    : currentDate;
  const lunarTimingFact = getLunarTimingFact(timingDate);
  const timingFactDetails =
    input.timingFactDetails ??
    (input.timingFacts === undefined ? [lunarTimingFact] : []);
  const timingFacts =
    input.timingFacts ??
    (timingFactDetails.length > 0
      ? timingFactDetails.map((fact) => fact.key)
      : [lunarTimingFact.key]);
  const computedTimingFacts =
    input.computedTimingFacts ??
    mergeTimingFacts([
      ...(strongSelectedTimingWindow?.timingFacts ?? []),
      ...getTimingFactsForDate(timingDate),
    ]);
  const natalContacts = getNatalContactsForTimingFacts({
    timingFacts: computedTimingFacts,
    natalProfiles,
    options: { visibility: astrologyVisibility },
  });
  const selectedNatalContacts = getNatalContactsForTimingFacts({
    timingFacts: computedTimingFacts,
    natalProfiles: selectedNatalProfiles,
    options: { visibility: astrologyVisibility },
  });
  const natalDiagnostics = getNatalDiagnostics(natalProfiles, natalContacts);
  const preferredRitualStyles = uniqueValues([
    ...normalizeStyleList(input.preferredRitualStyles),
    ...getProfilePreferredStyles(selectedProfileInputs),
  ]);
  const avoidedRitualStyles = uniqueValues([
    ...normalizeStyleList(input.avoidedRitualStyles),
    ...getProfileAvoidedStyles(selectedProfileInputs),
  ]);
  const tonePreferences = uniqueValues([
    ...normalizeStyleList(input.tonePreferences),
    ...getProfileTonePreferences(selectedProfileInputs),
  ]);

  return {
    currentDate,
    dateRange: input.dateRange ?? getWeekDateRange(currentDate),
    timingFacts,
    timingFactDetails,
    computedTimingFacts,
    privateProfileKeys,
    capacityMode,
    scheduleConstraints,
    preferredRitualStyles,
    avoidedRitualStyles,
    tonePreferences,
    profileInputs,
    selectedProfileInputs,
    profileSignals,
    natalProfiles,
    selectedNatalProfiles,
    natalContacts,
    selectedNatalContacts,
    natalDiagnostics,
    astrologyVisibility,
    audience,
    excludedRitualPatternKeys: input.excludedRitualPatternKeys ?? [],
    currentRitualCheckIn,
    timeScope,
    timingWindowCandidates,
    selectedTimingWindow,
    selectedRitualFocus: currentRitualCheckIn?.ritualFocusKey
      ? getRitualFocusOptionByKey(currentRitualCheckIn.ritualFocusKey)
      : undefined,
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
  const selectedTimingSignals = getSelectedTimingSignals(resolvedInput);
  const {
    pattern,
    preferenceMatches,
    profileSignalMatches,
    natalContactMatches,
    evaluatedPatterns,
    rejectedPatterns,
    eligiblePatternKeys,
    excludedPatternKeys,
    safetyNotes,
    noAlternateAvailable,
  } = selectPattern(resolvedInput, selectedCards, selectedTimingSignals);
  const sourceReferences = [
    ...timingCard.source_references,
    ...pattern.sourceReferences,
    ...(privateProfileCard?.source_references ?? []),
    ...selectedTimingSignals.flatMap((signal) => signal.sourceReferences),
  ];
  const { sourceReviewIds, sourceNoteIds } = splitSourceReferences([
    ...new Set(sourceReferences),
  ]);
  const decision = getRecommendationDecision({
    input: resolvedInput,
    selectedCards,
    selectedTimingSignals,
    pattern,
    evaluatedPatterns,
    rejectedPatterns,
    sourceReferences: [...new Set(sourceReferences)],
    safetyNotes,
    noAlternateAvailable,
    natalContactMatches,
  });
  const whyThis = getWhyThis(
    timingCard,
    pattern,
    privateProfileCard,
    resolvedInput,
    preferenceMatches,
    profileSignalMatches,
    natalContactMatches,
    excludedPatternKeys,
  );

  return {
    briefKey: getBriefKey(resolvedInput, pattern),
    dateRange: resolvedInput.dateRange,
    theme: getTheme(
      timingCard,
      pattern,
      resolvedInput.capacityMode,
      resolvedInput.audience,
    ),
    intention: getIntention(
      pattern,
      resolvedInput.capacityMode,
      resolvedInput.audience,
    ),
    bestWindow: getBestWindow(resolvedInput.capacityMode, resolvedInput),
    recommendedRitual: getRecommendedRitual(
      pattern,
      resolvedInput.capacityMode,
      resolvedInput.tonePreferences,
      resolvedInput.audience,
    ),
    optionalAddOn: getOptionalAddOn(
      pattern,
      resolvedInput.avoidedRitualStyles,
    ),
    reflectionPrompt: getReflectionPrompt(
      pattern,
      resolvedInput.capacityMode,
      resolvedInput.audience,
      getPrimaryMoonTimingFact(resolvedInput.timingFacts),
    ),
    whyThis,
    sourceSummary: getSourceSummary(timingCard, pattern, safetyNotes),
    explanation: getExplanation(
      timingCard,
      pattern,
      privateProfileCard,
      resolvedInput,
      preferenceMatches,
      profileSignalMatches,
      natalContactMatches,
      excludedPatternKeys,
      safetyNotes,
      whyThis,
      selectedTimingSignals,
    ),
    decision,
    trace: {
      timingFacts: resolvedInput.timingFacts,
      computedTimingFacts: resolvedInput.computedTimingFacts.map((fact) => ({
        id: fact.id,
        type: fact.type,
        label: fact.label,
        exactIso: fact.exactIso,
        startIso: fact.startIso,
        endIso: fact.endIso,
        timezone: fact.timezone,
        computedBy: fact.computedBy,
        confidence: fact.confidence,
      })),
      selectedTimingSignals: selectedTimingSignals.map((signal) => ({
        ruleId: signal.ruleId,
        timingFactId: signal.timingFactId,
        timingFactType: signal.timingFactType,
        signalLabel: signal.signalLabel,
        symbolicCardKeys: signal.symbolicCardKeys,
        strength: signal.strength,
      })),
      timingFactDetails: resolvedInput.timingFactDetails.map((fact) => ({
        key: fact.key,
        label: fact.label,
        exactIso: fact.exactIso,
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
      patternSelection: {
        selectedPatternKey: pattern.key,
        eligiblePatternKeys,
        excludedPatternKeys,
        capacityLimitMinutes: decision.inputs.capacityLimitMinutes,
        preferenceMatches,
        profileSignalKeys: profileSignalMatches.map((signal) => signal.key),
        noAlternateAvailable,
      },
      sourceReviewIds,
      sourceNoteIds,
      privateProfileKeys: resolvedInput.privateProfileKeys,
      profileSignalKeys: profileSignalMatches.map((signal) => signal.key),
      privateNatalDiagnostics: resolvedInput.natalDiagnostics,
      selectedNatalContacts: natalContactMatches.map(summarizeNatalContact),
      profilePreferenceKeys: [
        ...resolvedInput.preferredRitualStyles,
        ...resolvedInput.avoidedRitualStyles,
      ],
      ...(resolvedInput.currentRitualCheckIn
        ? { currentRitualCheckIn: resolvedInput.currentRitualCheckIn }
        : {}),
      ...(resolvedInput.selectedTimingWindow
        ? { selectedTimingWindow: summarizeTimingWindow(resolvedInput.selectedTimingWindow) }
        : {}),
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
