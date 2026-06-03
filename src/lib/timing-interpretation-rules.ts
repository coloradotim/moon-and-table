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

const ENRICHED_CARD_SIGNAL_SUMMARY_BY_KEY = new Map(
  seedSymbolicCards
    .filter((card) => card.approval_status === "approved" && card.signalSummary)
    .map((card) => [card.key, card.signalSummary as string]),
);

const LUNAR_PHASE_RULES: TimingInterpretationRule[] = [
  {
    id: "timing_rule.moon_phase.new",
    timingFactType: "moon_phase",
    condition: { phase: "new" },
    signalLabel: "New moon",
    signalSummary: ENRICHED_CARD_SIGNAL_SUMMARY_BY_KEY.get("new_moon") ?? "A quiet reset can support one small focus.",
    symbolicCardKeys: ["new_moon"],
    ritualStyleHints: ["reflection", "candle_or_light", "simple planning"],
    weight: 90,
    strength: "primary",
    avoidIf: ["emotionally_heavy"],
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.computed_facts_are_not_meanings",
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
    signalSummary: ENRICHED_CARD_SIGNAL_SUMMARY_BY_KEY.get("waxing_moon") ?? "A building phase can support one small bit of care or follow-through.",
    symbolicCardKeys: ["waxing_moon"],
    ritualStyleHints: ["plant_tending", "home_tending", "simple planning"],
    weight: 88,
    strength: "primary",
    avoidIf: ["productivity_pressure"],
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.computed_facts_are_not_meanings",
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
    signalSummary: ENRICHED_CARD_SIGNAL_SUMMARY_BY_KEY.get("full_moon") ?? "A visible point in the cycle can support noticing what is already clear.",
    symbolicCardKeys: ["full_moon"],
    ritualStyleHints: ["reflection", "candle_or_light", "gratitude"],
    weight: 90,
    strength: "primary",
    avoidIf: ["emotional_overreach"],
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.computed_facts_are_not_meanings",
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
    signalSummary: ENRICHED_CARD_SIGNAL_SUMMARY_BY_KEY.get("waning_moon") ?? "A settling phase can support clearing one small burden.",
    symbolicCardKeys: ["waning_moon"],
    ritualStyleHints: ["surface_reset", "plant_tending", "home_tending"],
    weight: 88,
    strength: "primary",
    avoidIf: ["large_cleanup"],
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.computed_facts_are_not_meanings",
      "note.four_phase_moon_mvp",
      "note.lunar_cards_stay_invitational",
    ],
    approvalStatus: "approved",
  },
];

const NUMEROLOGY_SOURCE_REFERENCES = [
  "source.hans_decoz_tom_monte",
  "source.david_phillips_numerology",
  "source.barnum_forer_guardrail",
  "note.numerology_calculation_reduced_universal_dates",
  "note.numerology_guardrail_accent_only",
];

const NUMEROLOGY_STYLE_HINTS_BY_NUMBER: Record<number, string[]> = {
  1: ["single-action ritual", "simple planning"],
  2: ["conversation", "shared care task"],
  3: ["atmosphere", "candle_or_light"],
  4: ["home_tending", "surface_reset"],
  5: ["air_reset", "single-action ritual"],
  6: ["home_tending", "kitchen", "plant_tending"],
  7: ["reflection", "quiet pause"],
  8: ["single-action ritual", "simple planning"],
  9: ["reflection", "clearing"],
};

const NUMEROLOGY_NOTE_BY_NUMBER: Record<number, string> = {
  1: "note.numerology_1_beginning_focus",
  2: "note.numerology_2_cooperation_balance",
  3: "note.numerology_3_expression_warmth",
  4: "note.numerology_4_structure_repair",
  5: "note.numerology_5_change_freshness",
  6: "note.numerology_6_home_care",
  7: "note.numerology_7_reflection_pause",
  8: "note.numerology_8_capacity_power",
  9: "note.numerology_9_completion_release",
};

const NUMEROLOGY_RULES: TimingInterpretationRule[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
  (number): TimingInterpretationRule => {
    const cardKey = `numerology_${number}`;

    return {
      id: `timing_rule.numerology.${number}`,
      timingFactType: "numerology_date",
      condition: { numerologyNumber: number },
      signalLabel: `Numerology ${number}`,
      signalSummary:
        ENRICHED_CARD_SIGNAL_SUMMARY_BY_KEY.get(cardKey) ??
        `Numerology ${number} can add a light symbolic accent without driving the brief.`,
      symbolicCardKeys: [cardKey],
      ritualStyleHints: NUMEROLOGY_STYLE_HINTS_BY_NUMBER[number],
      weight: 28,
      strength: "accent",
      avoidIf: [
        "numerology_as_primary_driver",
        "destiny_language",
        "personality_certainty",
      ],
      sourceReferences: [
        ...NUMEROLOGY_SOURCE_REFERENCES,
        NUMEROLOGY_NOTE_BY_NUMBER[number],
      ],
      approvalStatus: "approved",
    };
  },
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
  sourceNote: string;
}> = [
  {
    aspect: "conjunction",
    label: "Conjunction",
    styleHint: "single-action ritual",
    summary: "A conjunction can support one joined focus without treating emphasis as urgency.",
    sourceNote: "note.astrology_aspect_conjunction_joined_focus",
  },
  {
    aspect: "opposition",
    label: "Opposition",
    styleHint: "reflection",
    summary: "An opposition can support noticing contrast, balance, or mirroring without assuming conflict.",
    sourceNote: "note.astrology_aspect_opposition_balance_contrast",
  },
  {
    aspect: "square",
    label: "Square",
    styleHint: "home_tending",
    summary: "A square can point to one useful adjustment, not a crisis or a prediction of difficulty.",
    sourceNote: "note.astrology_aspect_square_useful_adjustment",
  },
  {
    aspect: "trine",
    label: "Trine",
    styleHint: "gratitude",
    summary: "A trine can point toward available support or ease without promising an outcome.",
    sourceNote: "note.astrology_aspect_trine_available_support",
  },
  {
    aspect: "sextile",
    label: "Sextile",
    styleHint: "simple planning",
    summary: "A sextile can suggest a small cooperative opening that still needs a conscious choice.",
    sourceNote: "note.astrology_aspect_sextile_small_opening",
  },
];

const BODY_NOTE_BY_KEY: Record<string, string> = {
  sun: "note.astrology_body_sun_focus_visibility",
  moon: "note.astrology_body_moon_care_rhythm",
  mercury: "note.astrology_body_mercury_words_sorting",
  venus: "note.astrology_body_venus_warmth_worth",
  mars: "note.astrology_body_mars_bounded_action",
  jupiter: "note.astrology_body_jupiter_perspective_support",
  saturn: "note.astrology_body_saturn_limits_structure",
};

const SIGN_DETAILS: Record<
  ZodiacSign,
  { note: string; phrase: string; avoid: string }
> = {
  aries: {
    note: "note.astrology_sign_aries_direct_start",
    phrase: "direct initiative and one bounded start",
    avoid: "avoid urgency or confrontation",
  },
  taurus: {
    note: "note.astrology_sign_taurus_steady_care",
    phrase: "steady care, comfort, and practical maintenance",
    avoid: "avoid treating comfort as avoidance",
  },
  gemini: {
    note: "note.astrology_sign_gemini_light_sorting",
    phrase: "light sorting, naming, and small exchange",
    avoid: "avoid forcing a conversation",
  },
  cancer: {
    note: "note.astrology_sign_cancer_home_containment",
    phrase: "care, containment, memory, and home rhythm",
    avoid: "avoid emotional pressure",
  },
  leo: {
    note: "note.astrology_sign_leo_visible_warmth",
    phrase: "visible warmth, appreciation, and heartfelt expression",
    avoid: "avoid forced celebration",
  },
  virgo: {
    note: "note.astrology_sign_virgo_useful_tending",
    phrase: "useful tending, repair, and enoughness",
    avoid: "avoid perfectionism",
  },
  libra: {
    note: "note.astrology_sign_libra_shared_balance",
    phrase: "balance, beauty, fairness, and shared-space adjustment",
    avoid: "avoid fixed relationship-fit claims",
  },
  scorpio: {
    note: "note.astrology_sign_scorpio_private_release",
    phrase: "privacy, discernment, release, and honest boundaries",
    avoid: "avoid crisis language",
  },
  sagittarius: {
    note: "note.astrology_sign_sagittarius_wider_view",
    phrase: "a wider view, learning, and encouragement",
    avoid: "avoid forced positivity",
  },
  capricorn: {
    note: "note.astrology_sign_capricorn_bounded_effort",
    phrase: "bounded effort, structure, and realistic commitment",
    avoid: "avoid overwork",
  },
  aquarius: {
    note: "note.astrology_sign_aquarius_system_experiment",
    phrase: "pattern-seeing, systems, and small reversible experiments",
    avoid: "avoid disruption for its own sake",
  },
  pisces: {
    note: "note.astrology_sign_pisces_soft_release",
    phrase: "compassion, rest, imagination, and gentle release",
    avoid: "avoid emotional flooding",
  },
};

const COMBINATION_DETAILS: Partial<
  Record<
    `${"sun" | "moon" | PlanetName}.${ZodiacSign}`,
    {
      label: string;
      summary: string;
      ritualStyleHints: string[];
      sourceNote: string;
    }
  >
> = {
  "mercury.cancer": {
    label: "Mercury in Cancer — careful words for home",
    summary:
      "A signal for naming one household need gently, with careful words and without turning it into a heavy talk.",
    ritualStyleHints: ["simple planning", "conversation", "home_tending"],
    sourceNote: "note.astrology_combo_mercury_cancer_careful_words",
  },
  "mercury.virgo": {
    label: "Mercury in Virgo — sort one useful detail",
    summary:
      "A signal for sorting one practical detail, naming the next useful step, and stopping before perfectionism.",
    ritualStyleHints: ["simple planning", "surface_reset", "home_tending"],
    sourceNote: "note.astrology_combo_mercury_virgo_practical_detail",
  },
  "venus.leo": {
    label: "Venus in Leo — visible warmth",
    summary:
      "A signal for appreciation, beauty, playfulness, or making care easier to feel.",
    ritualStyleHints: ["gratitude", "atmosphere", "candle_or_light"],
    sourceNote: "note.astrology_combo_venus_leo_visible_warmth",
  },
  "mars.capricorn": {
    label: "Mars in Capricorn — bounded practical action",
    summary:
      "A signal for one disciplined household action that stays bounded and stops before overwork.",
    ritualStyleHints: ["single-action ritual", "home_tending", "simple planning"],
    sourceNote: "note.astrology_combo_mars_capricorn_bounded_action",
  },
  "moon.virgo": {
    label: "Moon in Virgo — useful tending",
    summary:
      "A signal for small repairs, practical care, and noticing what is needed without chasing perfection.",
    ritualStyleHints: ["home_tending", "surface_reset", "plant_tending"],
    sourceNote: "note.astrology_combo_moon_virgo_useful_tending",
  },
  "moon.cancer": {
    label: "Moon in Cancer — home rhythm",
    summary:
      "A signal for care, containment, kitchen or home rhythm, and gentler pacing without emotional pressure.",
    ritualStyleHints: ["home_tending", "kitchen", "reflection"],
    sourceNote: "note.astrology_combo_moon_cancer_home_rhythm",
  },
  "sun.cancer": {
    label: "Sun in Cancer — household attention",
    summary:
      "A signal for home focus, belonging, nourishment, and putting household care at the center briefly.",
    ritualStyleHints: ["home_tending", "kitchen", "reflection"],
    sourceNote: "note.astrology_combo_sun_cancer_household_attention",
  },
};

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
  ({ sign, label, styleHint }): TimingInterpretationRule => {
    const combination = COMBINATION_DETAILS[`moon.${sign}`];
    const signDetails = SIGN_DETAILS[sign];

    return {
      id: `timing_rule.moon_sign.${sign}`,
      timingFactType: "moon_sign",
      condition: { sign },
      signalLabel: combination?.label ?? `Moon in ${label} — ${signDetails.phrase.split(",")[0]}`,
      signalSummary:
        combination?.summary ??
        `A signal for ${signDetails.phrase}, paced as care rather than personality description; ${signDetails.avoid}.`,
      symbolicCardKeys: ["astrology_body_moon", `astrology_sign_${sign}`],
      ritualStyleHints: combination?.ritualStyleHints ?? ["home_tending", "reflection", styleHint],
      weight: combination ? 68 : 62,
      strength: "supporting",
      avoidIf: ["unsupported_zodiac_interpretation", "personal_identity_claims"],
      sourceReferences: [
        ...ASTROLOGY_RULE_SOURCE_REFERENCES,
        "note.astrology_planets_as_functions",
        "note.astrology_signs_as_styles",
        BODY_NOTE_BY_KEY.moon,
        signDetails.note,
        ...(combination ? [combination.sourceNote] : []),
      ],
      approvalStatus: "approved",
    };
  },
);

const SUN_SIGN_RULES: TimingInterpretationRule[] = ZODIAC_SIGNS.map(
  ({ sign, label, styleHint }): TimingInterpretationRule => {
    const combination = COMBINATION_DETAILS[`sun.${sign}`];
    const signDetails = SIGN_DETAILS[sign];

    return {
      id: `timing_rule.sun_sign.${sign}`,
      timingFactType: "sun_sign",
      condition: { sign },
      signalLabel: combination?.label ?? `Sun in ${label} — ${signDetails.phrase.split(",")[0]}`,
      signalSummary:
        combination?.summary ??
        `A signal for bringing ${signDetails.phrase} into the week's main focus without making an identity claim.`,
      symbolicCardKeys: ["astrology_body_sun", `astrology_sign_${sign}`],
      ritualStyleHints: combination?.ritualStyleHints ?? ["reflection", "simple planning", styleHint],
      weight: combination ? 60 : 54,
      strength: "supporting",
      avoidIf: ["unsupported_zodiac_interpretation", "identity_certainty"],
      sourceReferences: [
        ...ASTROLOGY_RULE_SOURCE_REFERENCES,
        "note.astrology_planets_as_functions",
        "note.astrology_signs_as_styles",
        BODY_NOTE_BY_KEY.sun,
        signDetails.note,
        ...(combination ? [combination.sourceNote] : []),
      ],
      approvalStatus: "approved",
    };
  },
);

const PLANET_SIGN_RULES: TimingInterpretationRule[] = CORE_PLANETS.flatMap(
  ({ planet, label: planetLabel, styleHint }) =>
    ZODIAC_SIGNS.map(
      ({ sign, label: signLabel }): TimingInterpretationRule => {
        const combination = COMBINATION_DETAILS[`${planet}.${sign}`];
        const signDetails = SIGN_DETAILS[sign];

        return {
          id: `timing_rule.planet_sign.${planet}.${sign}`,
          timingFactType: "planet_sign",
          condition: { planet, sign },
          signalLabel:
            combination?.label ?? `${planetLabel} in ${signLabel} — ${signDetails.phrase.split(",")[0]}`,
          signalSummary:
            combination?.summary ??
            `${planetLabel} can bring ${signDetails.phrase} into ritual choice without predicting events or describing anyone personally.`,
          symbolicCardKeys: [`astrology_body_${planet}`, `astrology_sign_${sign}`],
          ritualStyleHints: combination?.ritualStyleHints ?? ["reflection", styleHint],
          weight: combination ? 72 : 66,
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
            BODY_NOTE_BY_KEY[planet],
            signDetails.note,
            ...(combination ? [combination.sourceNote] : []),
          ],
          approvalStatus: "approved",
        };
      },
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
      BODY_NOTE_BY_KEY[planet],
    ],
    approvalStatus: "approved",
  }),
);

const PLANETARY_ASPECT_RULES: TimingInterpretationRule[] = ASPECTS.map(
  ({ aspect, label, styleHint, summary, sourceNote }): TimingInterpretationRule => ({
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
      sourceNote,
    ],
    approvalStatus: "approved",
  }),
);

const SEASONAL_RULE_SOURCE_REFERENCES = [
  "source.astronomy_engine",
  "source.noaa_nws_seasonal_facts",
  "source.temperance_alden_seasonal_practice",
  "source.anna_franklin_seasonal_home",
  "source.old_farmers_almanac_context",
  "note.computed_facts_are_not_meanings",
  "note.seasonal_facts_as_markers",
  "note.noaa_seasons_fact_guardrail",
  "note.almanac_context_not_authority",
];

const SEASONAL_MARKER_RULES: TimingInterpretationRule[] = [
  {
    id: "timing_rule.solar_season.spring_equinox",
    timingFactType: "solar_season",
    condition: { marker: "march_equinox" },
    signalLabel: "Spring equinox — opening and balance",
    signalSummary:
      "A seasonal marker for balance, opening, freshening, and one small household reset without spring-cleaning pressure.",
    symbolicCardKeys: ["seasonal_spring_equinox", "seasonal_opening_freshening"],
    ritualStyleHints: ["seasonal", "air", "threshold_reset", "home_tending"],
    weight: 74,
    strength: "supporting",
    avoidIf: [
      "seasonal_practice_as_requirement",
      "spring_cleaning_pressure",
      "weather_assumptions",
    ],
    sourceReferences: [
      ...SEASONAL_RULE_SOURCE_REFERENCES,
      "note.spring_equinox_opening_balance",
      "note.seasonal_opening_airing_freshening",
    ],
    approvalStatus: "approved",
  },
  {
    id: "timing_rule.solar_season.summer_solstice",
    timingFactType: "solar_season",
    condition: { marker: "june_solstice" },
    signalLabel: "Summer solstice — light and tending",
    signalSummary:
      "A seasonal marker for light, warmth, gratitude, and tending what is already present without requiring heat, sun, or celebration.",
    symbolicCardKeys: ["seasonal_summer_solstice", "seasonal_warmth_light_rest"],
    ritualStyleHints: ["seasonal", "light_focus", "gratitude", "home_tending"],
    weight: 74,
    strength: "supporting",
    avoidIf: [
      "seasonal_practice_as_requirement",
      "sun_exposure_assumption",
      "forced_celebration",
    ],
    sourceReferences: [
      ...SEASONAL_RULE_SOURCE_REFERENCES,
      "note.summer_solstice_light_tending",
      "note.seasonal_warmth_light_rest",
    ],
    approvalStatus: "approved",
  },
  {
    id: "timing_rule.solar_season.autumn_equinox",
    timingFactType: "solar_season",
    condition: { marker: "september_equinox" },
    signalLabel: "Autumn equinox — gratitude and storing",
    signalSummary:
      "A seasonal marker for balance, gratitude, using what is present, and storing one useful thing without abundance claims.",
    symbolicCardKeys: ["seasonal_autumn_equinox", "seasonal_harvest_gratitude_storing"],
    ritualStyleHints: ["seasonal", "gratitude", "table_reset", "home_tending"],
    weight: 74,
    strength: "supporting",
    avoidIf: [
      "seasonal_practice_as_requirement",
      "abundance_guarantees",
      "food_preservation_advice",
    ],
    sourceReferences: [
      ...SEASONAL_RULE_SOURCE_REFERENCES,
      "note.autumn_equinox_harvest_storing",
      "note.seasonal_harvest_gratitude_storing",
    ],
    approvalStatus: "approved",
  },
  {
    id: "timing_rule.solar_season.winter_solstice",
    timingFactType: "solar_season",
    condition: { marker: "december_solstice" },
    signalLabel: "Winter solstice — quiet and returning light",
    signalSummary:
      "A seasonal marker for quiet, warmth, rest, attention protection, and a small return of light without darkness fear.",
    symbolicCardKeys: ["seasonal_winter_solstice", "seasonal_wintering_attention"],
    ritualStyleHints: ["seasonal", "rest", "light_focus", "home_tending"],
    weight: 74,
    strength: "supporting",
    avoidIf: [
      "seasonal_practice_as_requirement",
      "darkness_fear",
      "protection_from_danger_claims",
    ],
    sourceReferences: [
      ...SEASONAL_RULE_SOURCE_REFERENCES,
      "note.winter_solstice_rest_warmth",
      "note.wintering_quiet_attention_protection",
    ],
    approvalStatus: "approved",
  },
];

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
  ...SEASONAL_MARKER_RULES,
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
