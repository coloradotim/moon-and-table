import { seedSymbolicCards } from "../data/seed-symbolic-cards";
import type {
  MajorAspect,
  PlanetName,
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

const ZODIAC_SIGNS: Array<{ sign: ZodiacSign; label: string; styleHint: string }> = [
  { sign: "aries", label: "Aries", styleHint: "single-action ritual" },
  { sign: "taurus", label: "Taurus", styleHint: "home_tending" },
  { sign: "gemini", label: "Gemini", styleHint: "simple planning" },
  { sign: "cancer", label: "Cancer", styleHint: "home_tending" },
  { sign: "leo", label: "Leo", styleHint: "candle_or_light" },
  { sign: "virgo", label: "Virgo", styleHint: "surface_reset" },
  { sign: "libra", label: "Libra", styleHint: "atmosphere" },
  { sign: "scorpio", label: "Scorpio", styleHint: "clearing" },
  { sign: "sagittarius", label: "Sagittarius", styleHint: "reflection" },
  { sign: "capricorn", label: "Capricorn", styleHint: "simple planning" },
  { sign: "aquarius", label: "Aquarius", styleHint: "simple planning" },
  { sign: "pisces", label: "Pisces", styleHint: "quiet pause" },
];

const CORE_PLANETS: Array<{
  planet: PlanetName;
  label: string;
  styleHint: string;
}> = [
  { planet: "mercury", label: "Mercury", styleHint: "simple planning" },
  { planet: "venus", label: "Venus", styleHint: "atmosphere" },
  { planet: "mars", label: "Mars", styleHint: "single-action ritual" },
  { planet: "jupiter", label: "Jupiter", styleHint: "reflection" },
  { planet: "saturn", label: "Saturn", styleHint: "home_tending" },
];

const ASPECTS: Array<{
  aspect: MajorAspect;
  label: string;
  styleHint: string;
  summary: string;
}> = [
  {
    aspect: "conjunction",
    label: "Conjunction",
    styleHint: "single-action ritual",
    summary: "A blending aspect can support one simple combined focus.",
  },
  {
    aspect: "opposition",
    label: "Opposition",
    styleHint: "reflection",
    summary: "A polarity aspect can support balancing two visible needs without forcing a conflict story.",
  },
  {
    aspect: "square",
    label: "Square",
    styleHint: "home_tending",
    summary: "A friction aspect can support one practical adjustment without predicting difficulty.",
  },
  {
    aspect: "trine",
    label: "Trine",
    styleHint: "gratitude",
    summary: "A supportive aspect can point toward using what is already working.",
  },
  {
    aspect: "sextile",
    label: "Sextile",
    styleHint: "simple planning",
    summary: "An opportunity aspect can support one modest opening that still stays optional.",
  },
];

const ASTROLOGY_RULE_SOURCE_REFERENCES = [
  "source.steven_forrest",
  "source.kevin_burk",
  "source.april_elliott_kent",
  "source.astrology_ethics_sources",
  "source.barnum_forer_guardrail",
  "note.astrology_symbolic_not_predictive",
  "note.astrology_ethics_no_personal_certainty",
  "note.barnum_forer_specificity_guardrail",
];

const MOON_SIGN_RULES: TimingInterpretationRule[] = ZODIAC_SIGNS.map(
  ({ sign, label, styleHint }): TimingInterpretationRule => ({
    id: `timing_rule.moon_sign.${sign}`,
    timingFactType: "moon_sign",
    condition: { sign },
    signalLabel: `Moon in ${label}`,
    signalSummary: `A ${label} Moon can color the timing with a ${styleHint.replaceAll("_", " ")} style, while staying symbolic and optional.`,
    symbolicCardKeys: ["astrology_body_moon", `astrology_sign_${sign}`],
    ritualStyleHints: ["home_tending", "reflection", styleHint],
    weight: 62,
    strength: "supporting",
    avoidIf: ["unsupported_zodiac_interpretation", "personal_identity_claims"],
    sourceReferences: [
      ...ASTROLOGY_RULE_SOURCE_REFERENCES,
      "note.astrology_planets_as_functions",
      "note.astrology_signs_as_styles",
    ],
    approvalStatus: "approved",
  }),
);

const SUN_SIGN_RULES: TimingInterpretationRule[] = ZODIAC_SIGNS.map(
  ({ sign, label, styleHint }): TimingInterpretationRule => ({
    id: `timing_rule.sun_sign.${sign}`,
    timingFactType: "sun_sign",
    condition: { sign },
    signalLabel: `Sun in ${label}`,
    signalSummary: `The Sun's current sign can add a ${label} seasonal texture without becoming the main recommendation driver.`,
    symbolicCardKeys: ["astrology_body_sun", `astrology_sign_${sign}`],
    ritualStyleHints: ["reflection", "simple planning", styleHint],
    weight: 54,
    strength: "supporting",
    avoidIf: ["unsupported_zodiac_interpretation", "identity_certainty"],
    sourceReferences: [
      ...ASTROLOGY_RULE_SOURCE_REFERENCES,
      "note.astrology_planets_as_functions",
      "note.astrology_signs_as_styles",
    ],
    approvalStatus: "approved",
  }),
);

const PLANET_SIGN_RULES: TimingInterpretationRule[] = CORE_PLANETS.flatMap(
  ({ planet, label: planetLabel, styleHint }) =>
    ZODIAC_SIGNS.map(
      ({ sign, label: signLabel }): TimingInterpretationRule => ({
        id: `timing_rule.planet_sign.${planet}.${sign}`,
        timingFactType: "planet_sign",
        condition: { planet, sign },
        signalLabel: `${planetLabel} in ${signLabel}`,
        signalSummary: `${planetLabel} can add a ${signLabel} symbolic accent to ritual choice without predicting events or describing anyone personally.`,
        symbolicCardKeys: [`astrology_body_${planet}`, `astrology_sign_${sign}`],
        ritualStyleHints: ["reflection", styleHint],
        weight: 66,
        strength: "supporting",
        avoidIf: [
          "unsupported_planetary_interpretation",
          "prediction_claims",
          "personal_identity_claims",
        ],
        sourceReferences: [
          ...ASTROLOGY_RULE_SOURCE_REFERENCES,
          "note.astrology_planets_as_functions",
          "note.astrology_signs_as_styles",
        ],
        approvalStatus: "approved",
      }),
    ),
);

const PLANET_RETROGRADE_RULES: TimingInterpretationRule[] = CORE_PLANETS.map(
  ({ planet, label: planetLabel, styleHint }): TimingInterpretationRule => ({
    id: `timing_rule.planet_retrograde.${planet}`,
    timingFactType: "planet_retrograde",
    condition: { planet, isRetrograde: true },
    signalLabel: `${planetLabel} retrograde`,
    signalSummary: `${planetLabel} retrograde can support review or slowing down without blame or disruption claims.`,
    symbolicCardKeys: [`astrology_body_${planet}`, "astrology_motion_retrograde"],
    ritualStyleHints: ["reflection", "quiet pause", styleHint],
    weight: 58,
    strength: "supporting",
    avoidIf: [
      "retrograde_fear_language",
      "prediction_claims",
      "delay_necessary_action",
    ],
    sourceReferences: [
      ...ASTROLOGY_RULE_SOURCE_REFERENCES,
      "note.astrology_planets_as_functions",
      "note.astrology_retrograde_slow_review",
    ],
    approvalStatus: "approved",
  }),
);

const PLANETARY_ASPECT_RULES: TimingInterpretationRule[] = ASPECTS.map(
  ({ aspect, label, styleHint, summary }): TimingInterpretationRule => ({
    id: `timing_rule.planetary_aspect.${aspect}`,
    timingFactType: "planetary_aspect",
    condition: { aspect },
    signalLabel: `${label} aspect`,
    signalSummary: summary,
    symbolicCardKeys: [`astrology_aspect_${aspect}`],
    ritualStyleHints: ["reflection", styleHint],
    weight: 60,
    strength: "supporting",
    avoidIf: [
      "unsupported_aspect_interpretation",
      "prediction_claims",
      "conflict_claims",
    ],
    sourceReferences: [
      ...ASTROLOGY_RULE_SOURCE_REFERENCES,
      "note.astrology_aspects_as_relationships",
    ],
    approvalStatus: "approved",
  }),
);

const DRAFT_PLACEHOLDER_RULES: TimingInterpretationRule[] = [
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
    id: "timing_rule.outer_planet.uranus.placeholder",
    timingFactType: "planet_sign",
    condition: { planet: "uranus" satisfies PlanetName },
    signalLabel: "Outer planet placeholder",
    signalSummary: "Outer planet interpretation is deferred until a later reviewed source pass.",
    symbolicCardKeys: [],
    ritualStyleHints: [],
    weight: 10,
    strength: "supporting",
    avoidIf: ["unsupported_outer_planet_interpretation"],
    sourceReferences: ["source.steven_forrest", "source.kevin_burk"],
    approvalStatus: "draft",
  },
  {
    id: "timing_rule.outer_planet.neptune.placeholder",
    timingFactType: "planet_sign",
    condition: { planet: "neptune" satisfies PlanetName },
    signalLabel: "Outer planet placeholder",
    signalSummary: "Outer planet interpretation is deferred until a later reviewed source pass.",
    symbolicCardKeys: [],
    ritualStyleHints: [],
    weight: 10,
    strength: "supporting",
    avoidIf: ["unsupported_outer_planet_interpretation"],
    sourceReferences: ["source.steven_forrest", "source.kevin_burk"],
    approvalStatus: "draft",
  },
  {
    id: "timing_rule.outer_planet.pluto.placeholder",
    timingFactType: "planet_sign",
    condition: { planet: "pluto" satisfies PlanetName },
    signalLabel: "Outer planet placeholder",
    signalSummary: "Outer planet interpretation is deferred until a later reviewed source pass.",
    symbolicCardKeys: [],
    ritualStyleHints: [],
    weight: 10,
    strength: "supporting",
    avoidIf: ["unsupported_outer_planet_interpretation"],
    sourceReferences: ["source.steven_forrest", "source.kevin_burk"],
    approvalStatus: "draft",
  },
];

export const starterTimingInterpretationRules: TimingInterpretationRule[] = [
  ...LUNAR_PHASE_RULES,
  ...NUMEROLOGY_RULES,
  ...MOON_SIGN_RULES,
  ...SUN_SIGN_RULES,
  ...PLANET_SIGN_RULES,
  ...PLANET_RETROGRADE_RULES,
  ...PLANETARY_ASPECT_RULES,
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
