import {
  getApprovedRitualPatterns,
  starterRitualPatterns,
  type RitualPattern,
} from "../data/ritual-patterns";
import {
  seedSymbolicCards,
  type SymbolicCard,
} from "../data/seed-symbolic-cards";
import {
  starterSourceReviews,
  starterSourceNotes,
} from "../data/source-registry";
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
  profilePreferenceKeys: string[];
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

export type BriefExplanation = {
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
  profileInputs?: PrivateProfileSignalInput[];
  audience?: PrivateAudience;
  excludedRitualPatternKeys?: string[];
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
  profileInputs: PrivateProfileSignalInput[];
  selectedProfileInputs: PrivateProfileSignalInput[];
  profileSignals: PrivateProfileSignal[];
  audience: PrivateAudience;
  excludedRitualPatternKeys: string[];
};

type PatternCandidate = {
  pattern: RitualPattern;
  score: number;
  scoreReasons: ScoreReason[];
  preferenceMatches: string[];
  profileSignalMatches: PrivateProfileSignal[];
};

type PatternSelectionResult = {
  pattern: RitualPattern;
  preferenceMatches: string[];
  profileSignalMatches: PrivateProfileSignal[];
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

function getBestWindow(
  capacityMode: CapacityMode,
): string {
  const labelByCapacity: Record<CapacityMode, string> = {
    pause: "No timing needed.",
    low: "When you have five quiet minutes.",
    steady: "When you have a little space this week.",
    high: "When you have room to linger this week.",
  };

  return labelByCapacity[capacityMode];
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
    const profileSignalBoost = profileSignalMatches.reduce(
      (total, signal) => total + signal.weight,
      0,
    );
    const profileSignalReason =
      profileSignalBoost > 0
        ? [
            scoreReason(
              "profile_theme_match",
              "Private profile theme match",
              profileSignalBoost,
              profileSignalMatches.map((signal) => signal.key).join(", "),
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
    });

    return [{ pattern, score, scoreReasons, preferenceMatches, profileSignalMatches }];
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
      evaluatedPatterns,
      rejectedPatterns,
      eligiblePatternKeys,
      excludedPatternKeys,
      safetyNotes,
      noAlternateAvailable: false,
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
    profileSignalMatches: [],
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
    return "Light a candle if that feels supportive.";
  }

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

  return selectTimingSignals(signals, {
    maxSignals: 2,
    preferredRitualStyles: input.preferredRitualStyles,
    avoidedRitualStyles: input.avoidedRitualStyles,
  });
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

function getFitReason(
  privateProfileCard: SymbolicCard | undefined,
  preferenceMatches: string[],
  avoidedRitualStyles: string[],
  profileSignalMatches: PrivateProfileSignal[],
  audience: PrivateAudience,
): string {
  if (preferenceMatches.length > 0) {
    const labels = preferenceMatches
      .slice(0, 2)
      .map((preference) => getProfilePreferenceLabel(preference).toLowerCase());
    const preferenceReason = `Your saved preferences lean toward ${labels.join(" and ")}.`;

    if (profileSignalMatches.length > 0) {
      return `${preferenceReason} ${getProfileThemeReason(profileSignalMatches, audience)}`;
    }

    return preferenceReason;
  }

  if (profileSignalMatches.length > 0) {
    return getProfileThemeReason(profileSignalMatches, audience);
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

function getWhyThis(
  timingCard: SymbolicCard,
  pattern: RitualPattern,
  privateProfileCard: SymbolicCard | undefined,
  input: ResolvedGenerateWeeklyBriefInput,
  preferenceMatches: string[],
  profileSignalMatches: PrivateProfileSignal[],
  excludedPatternKeys: string[],
): string {
  const durationMinutes = getEffectiveDurationMinutes(
    input.capacityMode,
    input.scheduleConstraints,
  );
  const safetyReason =
    excludedPatternKeys.length > 0
      ? `A few options were set aside because they did not fit current capacity, safety, or preferences.`
      : "";
  const capacityReason = getCapacityReason(input.capacityMode, durationMinutes);

  return `${getTimingReason(timingCard, input.timingFactDetails[0])} ${pattern.title} was chosen as one small approved home practice for that theme. ${getFitReason(privateProfileCard, preferenceMatches, input.avoidedRitualStyles, profileSignalMatches, input.audience)} ${capacityReason} ${safetyReason}`.replace(/\s+/g, " ").trim();
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

  if (excludedPatternKeys.length > 0 || safetyNotes.length > 0) {
    notes.push({
      label: "Safety and fit",
      summary:
        "Some options were set aside when they did not fit current capacity, preferences, or household safety guardrails.",
    });
  }

  return notes;
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
      label: "Household safety guardrails",
      kind: "safety_guardrail",
      summary:
        pattern.safetyFlags.fire === "live_flame"
          ? "Used here: kept the flame handling in reviewed safety metadata while letting the brief itself say candle plainly."
          : "Used here: checked whether the selected ritual needed reshaping for household safety, capacity, or setup burden.",
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
  excludedPatternKeys: string[],
  safetyNotes: string[],
  whyThis: string,
  selectedTimingSignals: TimingSignal[],
): BriefExplanation {
  return {
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
      excludedPatternKeys,
      safetyNotes,
    ),
    sourcesUsed: getSourceSummaries(
      timingCard,
      pattern,
      selectedTimingSignals,
      safetyNotes,
    ),
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

  const positiveReasons = selectedPattern.scoreReasons
    .filter((reason) => reason.points > 0)
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
    return "Safety and fit notes were recorded for reviewed pattern selection.";
  }

  return "No hard safety exclusions affected the selected ritual.";
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

function resolveInput(input: GenerateWeeklyBriefInput): ResolvedGenerateWeeklyBriefInput {
  const currentDate = resolveCurrentDate(input.currentDate);
  const scheduleConstraints = resolveScheduleConstraints(
    input.scheduleConstraints,
  );
  const capacityMode =
    input.capacityMode ?? scheduleConstraints.defaultCapacityMode;
  const audience = input.audience ?? "either";
  const lunarTimingFact = getLunarTimingFact(currentDate);
  const timingFactDetails =
    input.timingFactDetails ??
    (input.timingFacts === undefined ? [lunarTimingFact] : []);
  const timingFacts =
    input.timingFacts ??
    (timingFactDetails.length > 0
      ? timingFactDetails.map((fact) => fact.key)
      : [lunarTimingFact.key]);
  const computedTimingFacts =
    input.computedTimingFacts ?? getTimingFactsForDate(currentDate);
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
  const preferredRitualStyles = uniqueValues([
    ...normalizeStyleList(input.preferredRitualStyles),
    ...getProfilePreferredStyles(selectedProfileInputs),
  ]);
  const avoidedRitualStyles = uniqueValues([
    ...normalizeStyleList(input.avoidedRitualStyles),
    ...getProfileAvoidedStyles(selectedProfileInputs),
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
    profileInputs,
    selectedProfileInputs,
    profileSignals,
    audience,
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
  const selectedTimingSignals = getSelectedTimingSignals(resolvedInput);
  const {
    pattern,
    preferenceMatches,
    profileSignalMatches,
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
  });
  const whyThis = getWhyThis(
    timingCard,
    pattern,
    privateProfileCard,
    resolvedInput,
    preferenceMatches,
    profileSignalMatches,
    excludedPatternKeys,
  );

  return {
    briefKey: getBriefKey(resolvedInput, pattern),
    dateRange: resolvedInput.dateRange,
    theme: getTheme(timingCard, pattern),
    intention: getIntention(pattern, resolvedInput.capacityMode),
    bestWindow: getBestWindow(resolvedInput.capacityMode),
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
    whyThis,
    sourceSummary: getSourceSummary(timingCard, pattern, safetyNotes),
    explanation: getExplanation(
      timingCard,
      pattern,
      privateProfileCard,
      resolvedInput,
      preferenceMatches,
      profileSignalMatches,
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
