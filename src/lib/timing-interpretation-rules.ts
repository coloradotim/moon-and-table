import { seedSymbolicCards } from "../data/seed-symbolic-cards";
import type {
  TimingFact,
  TimingFactType,
  ZodiacSign,
} from "./timing-facts";

export const TIMING_RULE_APPROVAL_STATUSES = [
  "draft",
  "reviewed",
  "approved",
  "rejected",
] as const;

export type TimingRuleApprovalStatus =
  (typeof TIMING_RULE_APPROVAL_STATUSES)[number];

export type TimingSignalStrength = "primary" | "supporting" | "accent";

export type TimingInterpretationRule = {
  id: string;
  timingFactType: TimingFactType;
  condition: Record<string, unknown>;
  signalLabel: string;
  signalSummary: string;
  symbolicCardKeys: string[];
  ritualStyleHints: string[];
  weight: number;
  strength: TimingSignalStrength;
  avoidIf: string[];
  sourceReferences: string[];
  approvalStatus: TimingRuleApprovalStatus;
};

export type TimingSignal = {
  ruleId: string;
  timingFactId: string;
  timingFactType: TimingFactType;
  signalLabel: string;
  signalSummary: string;
  symbolicCardKeys: string[];
  ritualStyleHints: string[];
  weight: number;
  strength: TimingSignalStrength;
  sourceReferences: string[];
};

export type TimingSignalSelectionOptions = {
  maxSignals?: number;
  preferredRitualStyles?: string[];
  avoidedRitualStyles?: string[];
};

const APPROVED_CARD_KEYS = new Set(
  seedSymbolicCards
    .filter((card) => card.approval_status === "approved")
    .map((card) => card.key),
);

const LUNAR_PHASE_RULES: TimingInterpretationRule[] = [
  {
    id: "timing_rule.moon_phase.new",
    timingFactType: "moon_phase",
    condition: { phase: "new" },
    signalLabel: "New moon",
    signalSummary: "A quiet reset can support one small focus.",
    symbolicCardKeys: ["new_moon"],
    ritualStyleHints: ["reflection", "candle_or_light", "simple planning"],
    weight: 90,
    strength: "primary",
    avoidIf: ["emotionally_heavy"],
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
      "note.lunar_cards_stay_invitational",
    ],
    approvalStatus: "approved",
  },
  {
    id: "timing_rule.moon_phase.waxing",
    timingFactType: "moon_phase",
    condition: { phase: "waxing" },
    signalLabel: "Waxing moon",
    signalSummary: "A building phase can support one small bit of care or follow-through.",
    symbolicCardKeys: ["waxing_moon"],
    ritualStyleHints: ["plant_tending", "home_tending", "simple planning"],
    weight: 88,
    strength: "primary",
    avoidIf: ["productivity_pressure"],
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
      "note.lunar_cards_stay_invitational",
    ],
    approvalStatus: "approved",
  },
  {
    id: "timing_rule.moon_phase.full",
    timingFactType: "moon_phase",
    condition: { phase: "full" },
    signalLabel: "Full moon",
    signalSummary: "A visible point in the cycle can support noticing what is already clear.",
    symbolicCardKeys: ["full_moon"],
    ritualStyleHints: ["reflection", "candle_or_light", "gratitude"],
    weight: 90,
    strength: "primary",
    avoidIf: ["emotional_overreach"],
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
      "note.lunar_cards_stay_invitational",
    ],
    approvalStatus: "approved",
  },
  {
    id: "timing_rule.moon_phase.waning",
    timingFactType: "moon_phase",
    condition: { phase: "waning" },
    signalLabel: "Waning moon",
    signalSummary: "A settling phase can support clearing one small burden.",
    symbolicCardKeys: ["waning_moon"],
    ritualStyleHints: ["surface_reset", "plant_tending", "home_tending"],
    weight: 88,
    strength: "primary",
    avoidIf: ["large_cleanup"],
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
      "note.lunar_cards_stay_invitational",
    ],
    approvalStatus: "approved",
  },
];

const NUMEROLOGY_RULES: TimingInterpretationRule[] = [1, 2, 4, 6, 9].map(
  (number): TimingInterpretationRule => ({
    id: `timing_rule.numerology.${number}`,
    timingFactType: "numerology_date",
    condition: { numerologyNumber: number },
    signalLabel: `Numerology ${number}`,
    signalSummary: "A light numerology accent can color the brief without driving it.",
    symbolicCardKeys: [`numerology_${number}`],
    ritualStyleHints: ["reflection"],
    weight: 28,
    strength: "accent",
    avoidIf: ["numerology_as_primary_driver"],
    sourceReferences: [
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    approvalStatus: "approved",
  }),
);

const DRAFT_PLACEHOLDER_RULES: TimingInterpretationRule[] = [
  {
    id: "timing_rule.moon_sign.virgo.placeholder",
    timingFactType: "moon_sign",
    condition: { sign: "virgo" satisfies ZodiacSign },
    signalLabel: "Moon sign placeholder",
    signalSummary: "Moon sign interpretation is deferred until reviewed zodiac cards exist.",
    symbolicCardKeys: [],
    ritualStyleHints: [],
    weight: 20,
    strength: "supporting",
    avoidIf: ["unsupported_zodiac_interpretation"],
    sourceReferences: ["source.steven_forrest", "source.kevin_burk"],
    approvalStatus: "draft",
  },
  {
    id: "timing_rule.sun_sign.season.placeholder",
    timingFactType: "sun_sign",
    condition: {},
    signalLabel: "Sun sign placeholder",
    signalSummary: "Sun sign interpretation is deferred until reviewed zodiac cards exist.",
    symbolicCardKeys: [],
    ritualStyleHints: [],
    weight: 18,
    strength: "supporting",
    avoidIf: ["unsupported_zodiac_interpretation"],
    sourceReferences: ["source.steven_forrest", "source.kevin_burk"],
    approvalStatus: "draft",
  },
  {
    id: "timing_rule.solar_season.placeholder",
    timingFactType: "solar_season",
    condition: {},
    signalLabel: "Solar season placeholder",
    signalSummary: "Seasonal interpretation is deferred until reviewed seasonal cards exist.",
    symbolicCardKeys: [],
    ritualStyleHints: [],
    weight: 22,
    strength: "supporting",
    avoidIf: ["unsupported_seasonal_interpretation"],
    sourceReferences: ["source.astronomy_engine"],
    approvalStatus: "draft",
  },
  {
    id: "timing_rule.planetary.placeholder",
    timingFactType: "planet_sign",
    condition: {},
    signalLabel: "Planetary placeholder",
    signalSummary: "Planetary sign interpretation is deferred until reviewed astrology cards exist.",
    symbolicCardKeys: [],
    ritualStyleHints: [],
    weight: 10,
    strength: "accent",
    avoidIf: ["unsupported_planetary_interpretation"],
    sourceReferences: ["source.steven_forrest", "source.kevin_burk"],
    approvalStatus: "draft",
  },
];

export const starterTimingInterpretationRules: TimingInterpretationRule[] = [
  ...LUNAR_PHASE_RULES,
  ...NUMEROLOGY_RULES,
  ...DRAFT_PLACEHOLDER_RULES,
];

function matchesCondition(
  fact: TimingFact,
  condition: Record<string, unknown>,
): boolean {
  return Object.entries(condition).every(([key, value]) => {
    const factValue = (fact as unknown as Record<string, unknown>)[key];

    return value === undefined || factValue === value;
  });
}

export function isTimingInterpretationRuleEligible(
  rule: TimingInterpretationRule,
): boolean {
  return (
    rule.approvalStatus === "approved" &&
    rule.symbolicCardKeys.length > 0 &&
    rule.symbolicCardKeys.every((key) => APPROVED_CARD_KEYS.has(key))
  );
}

export function getEligibleTimingInterpretationRules(): TimingInterpretationRule[] {
  return starterTimingInterpretationRules.filter(
    isTimingInterpretationRuleEligible,
  );
}

export function getTimingSignalsForFacts(
  facts: TimingFact[],
  rules: TimingInterpretationRule[] = starterTimingInterpretationRules,
): TimingSignal[] {
  return facts.flatMap((fact): TimingSignal[] =>
    rules
      .filter((rule) => rule.timingFactType === fact.type)
      .filter(isTimingInterpretationRuleEligible)
      .filter((rule) => matchesCondition(fact, rule.condition))
      .map((rule) => ({
        ruleId: rule.id,
        timingFactId: fact.id,
        timingFactType: fact.type,
        signalLabel: rule.signalLabel,
        signalSummary: rule.signalSummary,
        symbolicCardKeys: rule.symbolicCardKeys,
        ritualStyleHints: rule.ritualStyleHints,
        weight: rule.weight,
        strength: rule.strength,
        sourceReferences: rule.sourceReferences,
      })),
  );
}

function strengthRank(strength: TimingSignalStrength): number {
  switch (strength) {
    case "primary":
      return 3;
    case "supporting":
      return 2;
    case "accent":
      return 1;
  }
}

function scoreSignal(
  signal: TimingSignal,
  options: TimingSignalSelectionOptions,
): number {
  const preferredMatches = signal.ritualStyleHints.filter((style) =>
    options.preferredRitualStyles?.includes(style),
  ).length;
  const avoidedMatches = signal.ritualStyleHints.filter((style) =>
    options.avoidedRitualStyles?.includes(style),
  ).length;

  return (
    signal.weight +
    strengthRank(signal.strength) * 10 +
    preferredMatches * 4 -
    avoidedMatches * 8
  );
}

export function selectTimingSignals(
  signals: TimingSignal[],
  options: TimingSignalSelectionOptions = {},
): TimingSignal[] {
  const maxSignals = options.maxSignals ?? 4;
  const sortedSignals = [...signals].sort(
    (a, b) => scoreSignal(b, options) - scoreSignal(a, options),
  );
  const selectedSignals: TimingSignal[] = [];
  let accentSelected = false;

  for (const signal of sortedSignals) {
    if (selectedSignals.length >= maxSignals) {
      break;
    }

    if (signal.strength === "accent") {
      if (accentSelected || selectedSignals.length === 0) {
        continue;
      }

      accentSelected = true;
    }

    selectedSignals.push(signal);
  }

  return selectedSignals;
}
