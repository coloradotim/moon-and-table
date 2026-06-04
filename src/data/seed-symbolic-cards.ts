import { withSafetyOverrides, type RitualSafetyFlags } from "../lib/ritual-safety";

export type SymbolicCardConfidence =
  | "core"
  | "common"
  | "experimental"
  | "personal"
  | "avoid";

export type SymbolicCardApprovalStatus =
  | "candidate"
  | "approved"
  | "needs_revision"
  | "rejected"
  | "retired";

export type SymbolicCardCategory =
  | "moon_phase"
  | "numerology"
  | "astrology_body"
  | "astrology_sign"
  | "astrology_aspect"
  | "astrology_motion"
  | "seasonal"
  | "home_magic"
  | "kitchen_magic"
  | "plant_magic"
  | "herb"
  | "private_profile_theme";

export type SymbolicCard = {
  id: string;
  key: string;
  title: string;
  category: SymbolicCardCategory;
  summary: string;
  themes: string[];
  good_for: string[];
  ritual_styles: string[];
  ritual_ideas: string[];
  avoid_saying: string[];
  safety_notes: string[];
  safety_flags?: RitualSafetyFlags;
  signalSummary?: string;
  capacityGuidance?: Partial<Record<"pause" | "low" | "steady" | "high", string>>;
  ritualPatternKeys?: string[];
  sourceNoteKeys?: string[];
  interpretationNotes?: string[];
  toneGuidance?: string[];
  contraindications?: string[];
  source_references: string[];
  confidence: SymbolicCardConfidence;
  approval_status: SymbolicCardApprovalStatus;
};

type AstrologyCardSeed = Omit<
  SymbolicCard,
  "id" | "category" | "source_references" | "confidence" | "approval_status"
> & {
  category: Extract<
    SymbolicCardCategory,
    "astrology_body" | "astrology_sign" | "astrology_aspect" | "astrology_motion"
  >;
  source_references?: string[];
};

const ASTROLOGY_SOURCE_REFERENCES = [
  "source.steven_forrest",
  "source.kevin_burk",
  "source.april_elliott_kent",
  "source.astrology_ethics_sources",
  "source.barnum_forer_guardrail",
  "note.astrology_symbolic_not_predictive",
  "note.astrology_ethics_no_personal_certainty",
  "note.barnum_forer_specificity_guardrail",
];

const PLANET_SOURCE_REFERENCES = [
  ...ASTROLOGY_SOURCE_REFERENCES,
  "note.astrology_planets_as_functions",
];

const SIGN_SOURCE_REFERENCES = [
  ...ASTROLOGY_SOURCE_REFERENCES,
  "note.astrology_signs_as_styles",
];

const ASPECT_SOURCE_REFERENCES = [
  ...ASTROLOGY_SOURCE_REFERENCES,
  "note.astrology_aspects_as_relationships",
];

const MOTION_SOURCE_REFERENCES = [
  ...ASTROLOGY_SOURCE_REFERENCES,
  "note.astrology_retrograde_slow_review",
];

const signNoteSuffixes = {
  aries: "direct_start",
  taurus: "steady_care",
  gemini: "light_sorting",
  cancer: "home_containment",
  leo: "visible_warmth",
  virgo: "useful_tending",
  libra: "shared_balance",
  scorpio: "private_release",
  sagittarius: "wider_view",
  capricorn: "bounded_effort",
  aquarius: "system_experiment",
  pisces: "soft_release",
} as const;

function getAstrologySpecificSourceReferences(key: string): string[] {
  if (key.startsWith("astrology_body_")) {
    const body = key.replace("astrology_body_", "");
    const noteByBody: Record<string, string> = {
      sun: "note.astrology_body_sun_focus_visibility",
      moon: "note.astrology_body_moon_care_rhythm",
      mercury: "note.astrology_body_mercury_words_sorting",
      venus: "note.astrology_body_venus_warmth_worth",
      mars: "note.astrology_body_mars_bounded_action",
      jupiter: "note.astrology_body_jupiter_perspective_support",
      saturn: "note.astrology_body_saturn_limits_structure",
    };

    return noteByBody[body] ? [noteByBody[body]] : [];
  }

  if (key.startsWith("astrology_sign_")) {
    const sign = key.replace("astrology_sign_", "");
    const noteSuffix = signNoteSuffixes[sign as keyof typeof signNoteSuffixes];

    return noteSuffix ? [`note.astrology_sign_${sign}_${noteSuffix}`] : [];
  }

  if (key.startsWith("astrology_aspect_")) {
    const aspect = key.replace("astrology_aspect_", "");
    const noteByAspect: Record<string, string> = {
      conjunction: "note.astrology_aspect_conjunction_joined_focus",
      opposition: "note.astrology_aspect_opposition_balance_contrast",
      square: "note.astrology_aspect_square_useful_adjustment",
      trine: "note.astrology_aspect_trine_available_support",
      sextile: "note.astrology_aspect_sextile_small_opening",
    };

    return noteByAspect[aspect] ? [noteByAspect[aspect]] : [];
  }

  return [];
}

function makeAstrologyCard(seed: AstrologyCardSeed): SymbolicCard {
  return {
    ...seed,
    id: `card_${seed.key}`,
    source_references: [
      ...new Set([
        ...(seed.source_references ?? ASTROLOGY_SOURCE_REFERENCES),
        ...getAstrologySpecificSourceReferences(seed.key),
      ]),
    ],
    confidence: "common",
    approval_status: "approved",
  };
}

const astrologyBodyCards: SymbolicCard[] = [
  makeAstrologyCard({
    key: "astrology_body_sun",
    title: "Sun",
    category: "astrology_body",
    summary: "A symbolic timing cue for visibility, vitality, purpose, and what wants steady attention.",
    themes: ["visibility", "vitality", "purpose", "attention"],
    good_for: ["choosing a clear focus", "noticing what needs daylight", "supporting a steady intention"],
    ritual_styles: ["reflection", "simple planning", "candle_or_light"],
    ritual_ideas: [
      "Name one household focus that benefits from being seen plainly.",
      "Use light as a marker for one clear intention without making it a promise.",
    ],
    avoid_saying: [
      "Do not say the Sun reveals a person's purpose.",
      "Do not turn visibility into pressure to perform.",
      "Do not make solar timing the only reason for a recommendation.",
    ],
    safety_notes: [
      "Keep solar language symbolic and low-stakes.",
      "Do not use this card for identity certainty or life-purpose claims.",
    ],
    source_references: PLANET_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_body_moon",
    title: "Moon",
    category: "astrology_body",
    summary: "A symbolic cue for mood, care, home rhythm, memory, and what needs gentler tending.",
    themes: ["care", "rhythm", "home", "memory"],
    good_for: ["small household tending", "soft reflection", "choosing a gentle pace"],
    ritual_styles: ["home_tending", "plant_tending", "reflection"],
    ritual_ideas: [
      "Choose one small care action that fits the household's real capacity.",
      "Notice what needs a gentler pace before adding more effort.",
    ],
    avoid_saying: [
      "Do not claim the Moon causes moods or behavior.",
      "Do not expose private emotional assumptions.",
      "Do not make care sound mandatory.",
    ],
    safety_notes: [
      "Keep emotional language optional and light.",
      "Do not use lunar wording to push personal disclosure.",
    ],
    source_references: PLANET_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_body_mercury",
    title: "Mercury",
    category: "astrology_body",
    summary: "A symbolic cue for messages, small decisions, naming, sorting, and useful communication.",
    themes: ["communication", "sorting", "naming", "small decisions"],
    good_for: ["clarifying one note", "choosing words carefully", "sorting a small practical tangle"],
    ritual_styles: ["reflection", "simple planning", "conversation"],
    ritual_ideas: [
      "Write one plain sentence about what needs to be said or sorted.",
      "Choose one household note, list, or message to clarify and then stop.",
    ],
    avoid_saying: [
      "Do not blame Mercury for confusion or conflict.",
      "Do not imply a conversation must happen.",
      "Do not predict communication problems.",
    ],
    safety_notes: [
      "Conversation prompts should stay optional and consent-based.",
      "Do not use Mercury timing as advice to delay necessary communication.",
    ],
    source_references: PLANET_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_body_venus",
    title: "Venus",
    category: "astrology_body",
    summary: "A symbolic cue for pleasure, warmth, beauty, ease, appreciation, and what makes the home feel cared for.",
    themes: ["warmth", "beauty", "ease", "appreciation"],
    good_for: ["softening atmosphere", "choosing a gentle sensory cue", "appreciating ordinary support"],
    ritual_styles: ["candle_or_light", "kitchen", "gratitude", "atmosphere"],
    ritual_ideas: [
      "Add one small touch of warmth to a shared space using what is already there.",
      "Name one ordinary thing in the home that feels beautiful or supportive.",
    ],
    avoid_saying: [
      "Do not make beauty into a requirement.",
      "Do not imply Venus timing changes another person's feelings.",
      "Do not use relationship-control or attraction claims.",
    ],
    safety_notes: [
      "Avoid scent, food, flame, or purchases unless they fit existing household safety and preference constraints.",
    ],
    source_references: PLANET_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_body_mars",
    title: "Mars",
    category: "astrology_body",
    summary: "A symbolic cue for action, courage, directness, boundaries, and moving one contained thing forward.",
    themes: ["action", "directness", "courage", "boundaries"],
    good_for: ["one decisive small action", "setting a practical boundary", "moving energy without escalation"],
    ritual_styles: ["single-action ritual", "clearing", "home_tending"],
    ritual_ideas: [
      "Choose one bounded action that can be finished without turning into a task list.",
      "Name one practical boundary around time, attention, or household energy.",
    ],
    avoid_saying: [
      "Do not frame Mars as conflict, anger, or danger.",
      "Do not push confrontation.",
      "Do not make decisive action bigger than capacity allows.",
    ],
    safety_notes: [
      "Keep action physically safe, brief, and non-confrontational.",
      "Do not recommend heavy cleanup or emotionally charged discussion from this card alone.",
    ],
    source_references: PLANET_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_body_jupiter",
    title: "Jupiter",
    category: "astrology_body",
    summary: "A symbolic cue for perspective, generosity, learning, encouragement, and a little more room.",
    themes: ["perspective", "generosity", "learning", "encouragement"],
    good_for: ["zooming out gently", "making room for support", "choosing encouragement over pressure"],
    ritual_styles: ["reflection", "gratitude", "simple planning"],
    ritual_ideas: [
      "Name one helpful resource, lesson, or support already present.",
      "Choose a tiny expansion that makes the home feel more generous without adding burden.",
    ],
    avoid_saying: [
      "Do not promise luck, growth, abundance, or success.",
      "Do not suggest taking on more than capacity allows.",
      "Do not make optimism compulsory.",
    ],
    safety_notes: [
      "Keep expansion modest and capacity-aware.",
      "Avoid spending, shopping, or big commitments as default Jupiter responses.",
    ],
    source_references: PLANET_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_body_saturn",
    title: "Saturn",
    category: "astrology_body",
    summary: "A symbolic cue for structure, limits, maintenance, patience, and realistic care.",
    themes: ["structure", "limits", "maintenance", "patience"],
    good_for: ["choosing a realistic boundary", "supporting a routine", "making one system easier to maintain"],
    ritual_styles: ["home_tending", "simple planning", "surface_reset"],
    ritual_ideas: [
      "Choose one small structure that would make the week easier to live with.",
      "Name one limit that protects attention or rest.",
    ],
    avoid_saying: [
      "Do not frame Saturn as punishment, hardship, or judgment.",
      "Do not turn structure into moral pressure.",
      "Do not imply restriction is always the right response.",
    ],
    safety_notes: [
      "Use structure as support, not criticism.",
      "Keep maintenance rituals small enough for the selected capacity mode.",
    ],
    source_references: PLANET_SOURCE_REFERENCES,
  }),
];

const astrologySignCards: SymbolicCard[] = [
  makeAstrologyCard({
    key: "astrology_sign_aries",
    title: "Aries",
    category: "astrology_sign",
    summary: "A direct, initiating style that supports one clear start or a small brave action.",
    themes: ["initiative", "directness", "spark", "courage"],
    good_for: ["starting one contained thing", "choosing direct action", "naming a simple boundary"],
    ritual_styles: ["single-action ritual", "candle_or_light", "clearing"],
    ritual_ideas: ["Choose one direct household action and give it a clear stopping point."],
    avoid_saying: ["Do not describe a person as impulsive or aggressive.", "Do not push urgency or confrontation."],
    safety_notes: ["Keep Aries signals bounded so action does not outrun capacity."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_taurus",
    title: "Taurus",
    category: "astrology_sign",
    summary: "A steady, sensory style that supports comfort, consistency, and practical tending.",
    themes: ["steadiness", "comfort", "senses", "maintenance"],
    good_for: ["making one thing easier to live with", "gentle maintenance", "noticing comfort"],
    ritual_styles: ["home_tending", "plant_tending", "kitchen"],
    ritual_ideas: ["Tend one physical thing slowly and stop when it feels a little more settled."],
    avoid_saying: ["Do not describe a person as stubborn.", "Do not make comfort into avoidance."],
    safety_notes: ["Avoid food, scent, or touch-based suggestions when household safety is unknown."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_gemini",
    title: "Gemini",
    category: "astrology_sign",
    summary: "A curious, connective style that supports naming, sorting, and light exchange.",
    themes: ["curiosity", "connection", "naming", "sorting"],
    good_for: ["clarifying one thought", "sorting a small list", "choosing a light check-in"],
    ritual_styles: ["reflection", "simple planning", "conversation"],
    ritual_ideas: ["Write or say one clear sentence that makes a small household tangle easier to understand."],
    avoid_saying: ["Do not call anyone scattered or inconsistent.", "Do not force a conversation."],
    safety_notes: ["Keep communication prompts optional and privacy-aware."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_cancer",
    title: "Cancer",
    category: "astrology_sign",
    summary: "A protective, home-centered style that supports care, memory, and gentle containment.",
    themes: ["care", "home", "memory", "containment"],
    good_for: ["softening the home tone", "choosing a care action", "protecting rest"],
    ritual_styles: ["home_tending", "kitchen", "reflection"],
    ritual_ideas: ["Choose one small action that makes the home feel more held without asking for emotional processing."],
    avoid_saying: ["Do not imply someone is sensitive or needy.", "Do not make family or feeling language mandatory."],
    safety_notes: ["Keep care actions consent-based and low-pressure."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_leo",
    title: "Leo",
    category: "astrology_sign",
    summary: "A warm, expressive style that supports appreciation, visibility, and a little heart in the room.",
    themes: ["warmth", "expression", "appreciation", "visibility"],
    good_for: ["acknowledging what is working", "adding warmth", "making one effort visible"],
    ritual_styles: ["candle_or_light", "gratitude", "atmosphere"],
    ritual_ideas: ["Name one effort worth appreciating and let that be enough ceremony."],
    avoid_saying: ["Do not describe anyone as dramatic or attention-seeking.", "Do not force celebration."],
    safety_notes: ["Use flame only with ordinary candle safety and supervision."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_virgo",
    title: "Virgo",
    category: "astrology_sign",
    summary: "A practical, refining style that supports small repairs, useful order, and care through attention.",
    themes: ["usefulness", "repair", "attention", "refinement"],
    good_for: ["one small repair", "making a system easier", "noticing what actually helps"],
    ritual_styles: ["home_tending", "surface_reset", "simple planning"],
    ritual_ideas: ["Improve one small thing that will be used again, then stop before perfecting it."],
    avoid_saying: ["Do not frame Virgo as criticism, perfectionism, or cleaning pressure.", "Do not turn repair into homework."],
    safety_notes: ["Avoid large cleanup and perfection pressure; capacity comes first."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_libra",
    title: "Libra",
    category: "astrology_sign",
    summary: "A balancing, relational style that supports harmony, proportion, beauty, and fair adjustment.",
    themes: ["balance", "harmony", "beauty", "adjustment"],
    good_for: ["making one shared space feel calmer", "softening tone", "choosing a fairer rhythm"],
    ritual_styles: ["atmosphere", "conversation", "reflection"],
    ritual_ideas: ["Adjust one visible thing so a shared space feels a little more balanced."],
    avoid_saying: ["Do not make relationship discussion required.", "Do not imply harmony must mean agreement."],
    safety_notes: ["Shared prompts require consent; avoid compatibility or fixing language."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_scorpio",
    title: "Scorpio",
    category: "astrology_sign",
    summary: "A focused, deepening style that supports privacy, discernment, release, and honest boundaries.",
    themes: ["focus", "privacy", "discernment", "release"],
    good_for: ["choosing what not to feed", "protecting attention", "ending one small loop"],
    ritual_styles: ["reflection", "clearing", "threshold"],
    ritual_ideas: ["Name one thing that can receive less attention and choose a small boundary around it."],
    avoid_saying: ["Do not use crisis, obsession, secrecy, or transformation pressure.", "Do not imply hidden truths must be exposed."],
    safety_notes: ["Keep depth optional; avoid emotionally intense prompts by default."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_sagittarius",
    title: "Sagittarius",
    category: "astrology_sign",
    summary: "A spacious, meaning-seeking style that supports perspective, learning, humor, and a wider view.",
    themes: ["perspective", "learning", "meaning", "spaciousness"],
    good_for: ["zooming out", "choosing a useful lesson", "making room for encouragement"],
    ritual_styles: ["reflection", "gratitude", "simple planning"],
    ritual_ideas: ["Ask what view would make the week feel a little less cramped."],
    avoid_saying: ["Do not force positivity or big beliefs.", "Do not suggest escape from practical needs."],
    safety_notes: ["Keep expansion modest and grounded in real household capacity."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_capricorn",
    title: "Capricorn",
    category: "astrology_sign",
    summary: "A grounded, durable style that supports maintenance, limits, patience, and realistic progress.",
    themes: ["maintenance", "limits", "durability", "realistic progress"],
    good_for: ["one useful structure", "protecting time", "choosing a manageable next step"],
    ritual_styles: ["home_tending", "simple planning", "surface_reset"],
    ritual_ideas: ["Set one practical limit that makes care easier to maintain."],
    avoid_saying: ["Do not moralize discipline or productivity.", "Do not imply hard work is always the answer."],
    safety_notes: ["Do not let structure override rest or low capacity."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_aquarius",
    title: "Aquarius",
    category: "astrology_sign",
    summary: "A clarifying, pattern-seeing style that supports experiments, systems, friendship, and fresh distance.",
    themes: ["patterns", "experiments", "systems", "fresh distance"],
    good_for: ["trying one small adjustment", "noticing a recurring pattern", "simplifying a shared system"],
    ritual_styles: ["simple planning", "home_tending", "reflection"],
    ritual_ideas: ["Change one small household pattern as an experiment, not a permanent fix."],
    avoid_saying: ["Do not call anyone detached or unusual.", "Do not turn experimentation into disruption."],
    safety_notes: ["Keep experiments reversible and low-risk."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_sign_pisces",
    title: "Pisces",
    category: "astrology_sign",
    summary: "A soft, imaginative style that supports compassion, rest, porousness, and gentle release.",
    themes: ["compassion", "imagination", "rest", "gentle release"],
    good_for: ["softening a hard edge", "resting attention", "choosing a compassionate pause"],
    ritual_styles: ["reflection", "quiet pause", "candle_or_light"],
    ritual_ideas: ["Offer one kind sentence to the household and let that be the whole ritual."],
    avoid_saying: ["Do not imply confusion, sacrifice, or emotional flooding.", "Do not push porous emotional language."],
    safety_notes: ["Keep prompts simple and avoid emotional overreach."],
    source_references: SIGN_SOURCE_REFERENCES,
  }),
];

const astrologyAspectCards: SymbolicCard[] = [
  makeAstrologyCard({
    key: "astrology_aspect_conjunction",
    title: "Conjunction",
    category: "astrology_aspect",
    summary: "A symbolic blending cue where two timing factors occupy the same area of attention.",
    themes: ["blending", "focus", "emphasis", "meeting"],
    good_for: ["choosing one combined focus", "noticing what is amplified", "keeping attention simple"],
    ritual_styles: ["reflection", "simple planning", "single-action ritual"],
    ritual_ideas: ["Choose one small action that lets two related themes share the same focus."],
    avoid_saying: ["Do not claim a conjunction forces intensity.", "Do not make emphasis sound urgent or fated."],
    safety_notes: ["Use as context only; capacity and safety still choose the ritual size."],
    source_references: ASPECT_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_aspect_opposition",
    title: "Opposition",
    category: "astrology_aspect",
    summary: "A symbolic polarity cue for balancing two visible needs without making them enemies.",
    themes: ["polarity", "balance", "perspective", "adjustment"],
    good_for: ["holding two needs in view", "choosing a fair adjustment", "softening either-or thinking"],
    ritual_styles: ["reflection", "conversation", "home_tending"],
    ritual_ideas: ["Name two needs and choose one tiny adjustment that respects both."],
    avoid_saying: ["Do not predict conflict.", "Do not frame polarity as a relationship problem or crisis."],
    safety_notes: ["Avoid forced conversations; shared reflection requires consent."],
    source_references: ASPECT_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_aspect_square",
    title: "Square",
    category: "astrology_aspect",
    summary: "A symbolic friction cue that can support one practical adjustment where something feels awkward.",
    themes: ["friction", "adjustment", "effort", "practical tension"],
    good_for: ["adjusting one snag", "choosing a direct but small response", "making friction usable"],
    ritual_styles: ["home_tending", "surface_reset", "single-action ritual"],
    ritual_ideas: ["Fix or soften one small snag without making it a larger problem to solve."],
    avoid_saying: ["Do not predict difficulty, conflict, or failure.", "Do not make friction sound threatening."],
    safety_notes: ["Keep action small and non-confrontational."],
    source_references: ASPECT_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_aspect_trine",
    title: "Trine",
    category: "astrology_aspect",
    summary: "A symbolic support cue that can help a ritual follow what is already moving with less effort.",
    themes: ["support", "flow", "ease", "cooperation"],
    good_for: ["using available support", "choosing the easiest helpful action", "noticing what already works"],
    ritual_styles: ["gratitude", "home_tending", "plant_tending"],
    ritual_ideas: ["Choose the helpful action that requires the least extra effort."],
    avoid_saying: ["Do not promise ease, luck, or success.", "Do not imply support means no effort is needed."],
    safety_notes: ["Do not use ease language to ignore real constraints."],
    source_references: ASPECT_SOURCE_REFERENCES,
  }),
  makeAstrologyCard({
    key: "astrology_aspect_sextile",
    title: "Sextile",
    category: "astrology_aspect",
    summary: "A symbolic opportunity cue for a small cooperative step that still needs a conscious choice.",
    themes: ["opportunity", "cooperation", "small opening", "choice"],
    good_for: ["trying a modest option", "choosing a supportive step", "connecting two helpful themes"],
    ritual_styles: ["simple planning", "home_tending", "reflection"],
    ritual_ideas: ["Take one modest opening seriously enough to act on it briefly."],
    avoid_saying: ["Do not promise opportunity, success, or improvement.", "Do not inflate a small opening into a mandate."],
    safety_notes: ["Keep opportunities optional and realistic."],
    source_references: ASPECT_SOURCE_REFERENCES,
  }),
];

const astrologyMotionCards: SymbolicCard[] = [
  makeAstrologyCard({
    key: "astrology_motion_retrograde",
    title: "Retrograde",
    category: "astrology_motion",
    summary: "A conservative timing cue for review, slowing down, revisiting, and checking assumptions.",
    themes: ["review", "slowing down", "revisiting", "checking assumptions"],
    good_for: ["reviewing one small thing", "pausing before adding more", "making a gentle correction"],
    ritual_styles: ["reflection", "simple planning", "quiet pause"],
    ritual_ideas: [
      "Review one small household assumption before changing anything.",
      "Pause and ask what can be checked instead of rushed.",
    ],
    avoid_saying: [
      "Do not blame problems on retrograde motion.",
      "Do not predict disruption or delay.",
      "Do not tell users to avoid necessary action.",
    ],
    safety_notes: [
      "Retrograde language should reduce pressure, not create fear.",
      "Do not use this card to discourage medical, safety, work, or household necessities.",
    ],
    source_references: MOTION_SOURCE_REFERENCES,
  }),
];

export const astrologySymbolicCards: SymbolicCard[] = [
  ...astrologyBodyCards,
  ...astrologySignCards,
  ...astrologyAspectCards,
  ...astrologyMotionCards,
];

const SEASONAL_SOURCE_REFERENCES = [
  "source.astronomy_engine",
  "source.noaa_nws_seasonal_facts",
  "source.temperance_alden_seasonal_practice",
  "source.anna_franklin_seasonal_home",
  "source.old_farmers_almanac_context",
  "note.seasonal_facts_as_markers",
  "note.noaa_seasons_fact_guardrail",
  "note.almanac_context_not_authority",
];

type SeasonalCardSeed = Omit<
  SymbolicCard,
  "id" | "category" | "source_references" | "confidence" | "approval_status"
> & {
  source_references?: string[];
};

function makeSeasonalCard(seed: SeasonalCardSeed): SymbolicCard {
  return {
    ...seed,
    id: `card_${seed.key}`,
    category: "seasonal",
    source_references: [
      ...new Set([
        ...SEASONAL_SOURCE_REFERENCES,
        ...(seed.source_references ?? []),
      ]),
    ],
    confidence: "common",
    approval_status: "approved",
  };
}

export const seasonalSymbolicCards: SymbolicCard[] = [
  makeSeasonalCard({
    key: "seasonal_spring_equinox",
    title: "Spring Equinox",
    summary: "A seasonal anchor for balance, opening, freshening, and one small reset as light returns.",
    themes: ["balance", "opening", "freshening", "small reset"],
    good_for: ["freshening one area", "marking transition", "choosing one modest reset"],
    ritual_styles: ["seasonal", "home_tending", "air", "threshold_reset"],
    ritual_ideas: [
      "Use a safe fresh-air cue or threshold reset to mark a small opening.",
      "Clear one ordinary spot without turning it into spring cleaning.",
    ],
    avoid_saying: [
      "Do not require a fresh start or reinvention.",
      "Do not turn spring into cleaning pressure.",
      "Do not require fragrance, smoke, or outdoor activity.",
    ],
    safety_notes: [
      "Fresh air depends on weather, air quality, pets, children, allergies, and security.",
      "Keep spring rituals small and non-fragrant by default.",
    ],
    signalSummary: "A balance point for opening, freshening, and one small household reset.",
    capacityGuidance: {
      pause: "Notice the shift without doing anything.",
      low: "Use one window, doorway, or cleared object cue for five minutes or less.",
      steady: "Pair a threshold or table reset with one freshening action.",
      high: "Make one seasonal reset active but bounded under half an hour.",
    },
    ritualPatternKeys: ["window_open_air_reset", "threshold_reset", "clear_one_surface"],
    sourceNoteKeys: [
      "note.spring_equinox_opening_balance",
      "note.seasonal_opening_airing_freshening",
    ],
    interpretationNotes: [
      "Keep the factual equinox marker separate from symbolic home practice.",
      "Use opening and balance language without making seasonal reset mandatory.",
    ],
    toneGuidance: ["fresh", "balanced", "light", "non-demanding"],
    contraindications: [
      "avoid spring-cleaning pressure",
      "avoid smoke, fragrance, or weather assumptions",
    ],
    source_references: [
      "note.spring_equinox_opening_balance",
      "note.seasonal_opening_airing_freshening",
    ],
  }),
  makeSeasonalCard({
    key: "seasonal_summer_solstice",
    title: "Summer Solstice",
    summary: "A seasonal anchor for light, warmth, visibility, gratitude, and tending what is fully present.",
    themes: ["light", "warmth", "visibility", "gratitude"],
    good_for: ["noticing what is present", "choosing a light cue", "offering gratitude without performance"],
    ritual_styles: ["seasonal", "light_focus", "gratitude", "home_tending"],
    ritual_ideas: [
      "Use ordinary light as a brief attention cue.",
      "Name one thing in the home that is already bright, useful, or appreciated.",
    ],
    avoid_saying: [
      "Do not require celebration or high energy.",
      "Do not require sun exposure, outdoor activity, or flame.",
      "Do not make brightness into productivity pressure.",
    ],
    safety_notes: [
      "Do not make sun, heat, or outdoor exposure part of the default ritual.",
      "Live flame remains optional and supervised.",
    ],
    signalSummary: "A light point for gratitude, visibility, and tending what is already present.",
    capacityGuidance: {
      pause: "Let light be noticed without adding a ritual.",
      low: "Use a lamp, window, or candle only if it is already safe and easy.",
      steady: "Pair a light cue with a small gratitude or table reset.",
      high: "Make one warm, visible care action without turning it into an event.",
    },
    ritualPatternKeys: ["morning_light_pause", "candle_light_focus", "table_reset"],
    sourceNoteKeys: [
      "note.summer_solstice_light_tending",
      "note.seasonal_warmth_light_rest",
    ],
    interpretationNotes: [
      "Use solstice light as symbolic context, not a demand for activity.",
      "Good for light-focus and gratitude patterns when capacity fits.",
    ],
    toneGuidance: ["warm", "appreciative", "clear", "unforced"],
    contraindications: [
      "avoid heat or sun-exposure assumptions",
      "avoid forced celebration",
      "avoid live-flame requirements",
    ],
    source_references: [
      "note.summer_solstice_light_tending",
      "note.seasonal_warmth_light_rest",
    ],
  }),
  makeSeasonalCard({
    key: "seasonal_autumn_equinox",
    title: "Autumn Equinox",
    summary: "A seasonal anchor for balance, gratitude, storing, and choosing what is worth keeping.",
    themes: ["balance", "gratitude", "storing", "keeping"],
    good_for: ["closing one loop", "using what is already present", "putting one useful thing in its place"],
    ritual_styles: ["seasonal", "gratitude", "home_tending", "table_reset"],
    ritual_ideas: [
      "Return or store one ordinary household thing so it can support the next season.",
      "Name one thing worth keeping without making abundance claims.",
    ],
    avoid_saying: [
      "Do not promise abundance, prosperity, or harvest rewards.",
      "Do not require shopping, decor, preservation, or food preparation.",
      "Do not moralize having enough.",
    ],
    safety_notes: [
      "Food and storage actions stay normal household use only.",
      "Avoid preservation, pantry, or food-safety advice in ritual copy.",
    ],
    signalSummary: "A balance point for gratitude, gathering, storing, and choosing what to keep.",
    capacityGuidance: {
      pause: "Notice one thing already supporting the household.",
      low: "Return or store one object.",
      steady: "Reset one table, shelf, or shared spot for ordinary use.",
      high: "Close one seasonal loop without starting a larger project.",
    },
    ritualPatternKeys: ["return_one_object", "table_reset", "end_of_week_closing"],
    sourceNoteKeys: [
      "note.autumn_equinox_harvest_storing",
      "note.seasonal_harvest_gratitude_storing",
    ],
    interpretationNotes: [
      "Use harvest language as gratitude and practical keeping, not abundance promises.",
      "Good for table, storage, and closing patterns.",
    ],
    toneGuidance: ["grateful", "balanced", "practical", "enough"],
    contraindications: [
      "avoid prosperity claims",
      "avoid food-preservation advice",
      "avoid shopping or decor pressure",
    ],
    source_references: [
      "note.autumn_equinox_harvest_storing",
      "note.seasonal_harvest_gratitude_storing",
    ],
  }),
  makeSeasonalCard({
    key: "seasonal_winter_solstice",
    title: "Winter Solstice",
    summary: "A seasonal anchor for quiet, warmth, rest, attention protection, and a small return of light.",
    themes: ["quiet", "warmth", "rest", "returning light"],
    good_for: ["protecting attention", "making rest easier", "using a small light or warmth cue"],
    ritual_styles: ["seasonal", "rest", "light_focus", "home_tending"],
    ritual_ideas: [
      "Use a blanket, lamp, or candle-safe pause to mark rest.",
      "Reduce one input so attention has somewhere quiet to land.",
    ],
    avoid_saying: [
      "Do not make darkness ominous.",
      "Do not require hope, cheer, or emotional processing.",
      "Do not claim protection from danger.",
    ],
    safety_notes: [
      "Warmth and light cues should not require flame.",
      "Do not use seasonal ritual as physical safety, health, or emergency advice.",
    ],
    signalSummary: "A quiet turning point for warmth, rest, attention, and a small return of light.",
    capacityGuidance: {
      pause: "Rest can be the whole practice.",
      low: "Use one blanket, lamp, or quiet cue.",
      steady: "Make one rest spot easier without rearranging the room.",
      high: "Create one bounded quiet cue while keeping the ritual under half an hour.",
    },
    ritualPatternKeys: ["bed_blanket_rest_cue", "morning_light_pause", "candle_light_focus"],
    sourceNoteKeys: [
      "note.winter_solstice_rest_warmth",
      "note.wintering_quiet_attention_protection",
    ],
    interpretationNotes: [
      "Use wintering as attention protection and rest, not fear or spiritual danger.",
      "Good for low-capacity rest and light cues.",
    ],
    toneGuidance: ["quiet", "warm", "restful", "protective of attention"],
    contraindications: [
      "avoid darkness fear",
      "avoid protection-from-danger claims",
      "avoid required flame",
    ],
    source_references: [
      "note.winter_solstice_rest_warmth",
      "note.wintering_quiet_attention_protection",
    ],
  }),
  makeSeasonalCard({
    key: "seasonal_opening_freshening",
    title: "Opening and Freshening",
    summary: "A seasonal home theme for safe airing, threshold attention, and making one area feel fresher without smoke or scent.",
    themes: ["opening", "freshening", "threshold", "air"],
    good_for: ["safe fresh-air cues", "threshold resets", "light room resets"],
    ritual_styles: ["seasonal", "air", "threshold_reset", "home_tending"],
    ritual_ideas: ["Open a safe window briefly, or use a doorway or light cue when opening is not a fit."],
    avoid_saying: ["Do not require smoke, scent, or deep cleaning.", "Do not make weather assumptions."],
    safety_notes: ["Check weather, air quality, pets, children, allergies, and security first."],
    signalSummary: "A seasonal cue for freshening one threshold or room without smoke or scent.",
    ritualPatternKeys: ["window_open_air_reset", "threshold_reset"],
    sourceNoteKeys: ["note.seasonal_opening_airing_freshening"],
    toneGuidance: ["fresh", "plain", "low-pressure"],
    contraindications: ["avoid unsafe windows, poor air quality, smoke, fragrance, or allergies"],
    source_references: ["note.seasonal_opening_airing_freshening"],
  }),
  makeSeasonalCard({
    key: "seasonal_warmth_light_rest",
    title: "Warmth, Light, and Rest",
    summary: "A seasonal home theme for warmth, ordinary light, and rest cues that do not require flame or performance.",
    themes: ["warmth", "light", "rest", "settling"],
    good_for: ["rest cues", "light pauses", "making a room feel held"],
    ritual_styles: ["seasonal", "light_focus", "rest", "home_tending"],
    ritual_ideas: ["Use an ordinary lamp, blanket, or supervised candle pause if that is already safe."],
    avoid_saying: ["Do not require live flame.", "Do not force cheer or celebration."],
    safety_notes: ["Live flame stays optional and supervised; no heat or sun claims."],
    signalSummary: "A seasonal cue for warmth, ordinary light, and rest.",
    ritualPatternKeys: ["morning_light_pause", "bed_blanket_rest_cue", "candle_light_focus"],
    sourceNoteKeys: ["note.seasonal_warmth_light_rest"],
    toneGuidance: ["warm", "restful", "simple"],
    contraindications: ["avoid required flame, heat exposure, or emotional pressure"],
    source_references: ["note.seasonal_warmth_light_rest"],
  }),
  makeSeasonalCard({
    key: "seasonal_harvest_gratitude_storing",
    title: "Harvest, Gratitude, and Storing",
    summary: "A seasonal home theme for gratitude, using what is present, and putting one useful thing where it belongs.",
    themes: ["gratitude", "storing", "enoughness", "use what is present"],
    good_for: ["returning one object", "table resets", "closing one loop"],
    ritual_styles: ["seasonal", "gratitude", "home_tending", "table_reset"],
    ritual_ideas: ["Put one useful object where it supports the household and name what it already helps with."],
    avoid_saying: ["Do not promise abundance.", "Do not require food, decor, shopping, or preservation."],
    safety_notes: ["No food-safety or preservation advice; normal household use only."],
    signalSummary: "A seasonal cue for gratitude, enoughness, and storing one useful thing.",
    ritualPatternKeys: ["return_one_object", "table_reset", "end_of_week_closing"],
    sourceNoteKeys: ["note.seasonal_harvest_gratitude_storing"],
    toneGuidance: ["grateful", "practical", "enough"],
    contraindications: ["avoid prosperity claims, food-safety advice, or shopping"],
    source_references: ["note.seasonal_harvest_gratitude_storing"],
  }),
  makeSeasonalCard({
    key: "seasonal_wintering_attention",
    title: "Wintering and Attention",
    summary: "A seasonal home theme for quieting inputs, protecting attention, and making rest easier.",
    themes: ["quiet", "attention protection", "rest", "less input"],
    good_for: ["rest cues", "closing tabs or inputs", "making one quiet place easier"],
    ritual_styles: ["seasonal", "rest", "reflection", "home_tending"],
    ritual_ideas: ["Reduce one input and make one rest cue easier to reach."],
    avoid_saying: ["Do not imply danger or spiritual attack.", "Do not make quiet feel like isolation."],
    safety_notes: ["Attention-protection language does not replace practical safety needs."],
    signalSummary: "A seasonal cue for quiet, rest, and protecting attention.",
    ritualPatternKeys: ["bed_blanket_rest_cue", "close_the_evening"],
    sourceNoteKeys: ["note.wintering_quiet_attention_protection"],
    toneGuidance: ["quiet", "gentle", "permission-giving"],
    contraindications: ["avoid danger-protection claims, isolation, or forced reflection"],
    source_references: ["note.wintering_quiet_attention_protection"],
  }),
  makeSeasonalCard({
    key: "seasonal_table_home_reset",
    title: "Seasonal Table or Home Reset",
    summary: "A seasonal home theme for marking transition with one ordinary object, surface, or cleared spot.",
    themes: ["transition", "table", "home reset", "ordinary marker"],
    good_for: ["table resets", "threshold resets", "marking a seasonal change without decor pressure"],
    ritual_styles: ["seasonal", "table_reset", "home_tending", "threshold_reset"],
    ritual_ideas: ["Clear or place one ordinary object so the home notices the seasonal shift without becoming a project."],
    avoid_saying: ["Do not require seasonal decor.", "Do not copy festival or folklore scripts."],
    safety_notes: ["Use only ordinary household items already safe and available."],
    signalSummary: "A seasonal cue for marking transition with one ordinary home reset.",
    ritualPatternKeys: ["table_reset", "threshold_reset", "seasonal_table_home_reset"],
    sourceNoteKeys: ["note.seasonal_table_home_reset"],
    toneGuidance: ["domestic", "transitional", "simple"],
    contraindications: ["avoid decor pressure, shopping, or culturally flattened festival language"],
    source_references: ["note.seasonal_table_home_reset"],
  }),
];

export const seedSymbolicCards: SymbolicCard[] = [
  {
    id: "card_moon_phase_new_moon",
    key: "new_moon",
    title: "New Moon",
    category: "moon_phase",
    summary: "A quiet reset point for choosing one modest intention and making room without forcing a reinvention.",
    themes: ["small beginning", "quiet reset", "one intention", "making room"],
    good_for: [
      "choosing one small focus",
      "starting gently",
      "reducing noise",
      "marking a beginning without pressure",
    ],
    ritual_styles: ["reflection", "candle_or_light", "low_woo", "simple planning"],
    ritual_ideas: [
      "Use the Candle Light Focus pattern to name one modest focus for the week.",
      "Clear one small surface before choosing what the household wants to make room for.",
      "Write one plain sentence about the next gentle step, then stop.",
    ],
    avoid_saying: [
      "Do not say the new moon requires a fresh start.",
      "Do not frame intention-setting as a guarantee.",
      "Do not make the ritual large or urgent.",
      "Do not imply a person has failed if they do not begin anything.",
      "Do not use manifestation or guaranteed-outcome language.",
    ],
    safety_notes: [
      "Use ordinary candle safety when focus practices include flame.",
      "Keep intention prompts optional and emotionally light.",
      "If capacity is low, choose no-flame reflection or one tiny home-tending action.",
    ],
    signalSummary: "A quiet reset point for one modest intention or a small beginning.",
    capacityGuidance: {
      pause: "No new practice required; simply name what can wait.",
      low: "Choose one sentence, one cleared spot, or one candle pause under five minutes.",
      steady: "Pair one intention with a small practical reset.",
      high: "Make room for one new focus without starting a larger project.",
    },
    ritualPatternKeys: ["candle_light_focus", "clear_one_surface", "return_one_object"],
    sourceNoteKeys: ["note.four_phase_moon_mvp", "note.new_moon_quiet_reset", "note.lunar_cards_stay_invitational"],
    interpretationNotes: [
      "Use as an invitation to begin quietly, not as a demand for reinvention.",
      "Best paired with low-setup reflection, light, or clearing patterns.",
    ],
    toneGuidance: ["quiet", "modest", "spacious", "non-urgent"],
    contraindications: [
      "avoid when intention-setting feels like pressure",
      "avoid manifestation guarantees",
      "avoid large fresh-start rituals",
    ],
    source_references: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
      "note.new_moon_quiet_reset",
      "note.lunar_cards_stay_invitational",
      "docs/source-review-packets.md#2-moon-phase-reference-set",
    ],
    confidence: "core",
    approval_status: "approved",
  },
  {
    id: "card_moon_phase_waxing_moon",
    key: "waxing_moon",
    title: "Waxing Moon",
    category: "moon_phase",
    summary: "A steady support phase for tending what has already begun and adding one useful bit of follow-through.",
    themes: ["steady support", "tending", "small progress", "follow-through"],
    good_for: [
      "small progress",
      "tending a plan",
      "adding support to something already started",
      "choosing one practical next action",
    ],
    ritual_styles: ["plant_tending", "kitchen", "home_tending", "simple planning"],
    ritual_ideas: [
      "Use the Tend One Plant pattern as a quiet way to support something living.",
      "Add one small support to an existing plan or shared space.",
      "Use the Table Reset pattern when a shared surface needs practical follow-through.",
    ],
    avoid_saying: [
      "Do not imply that growth must be constant.",
      "Do not turn momentum into pressure.",
      "Do not suggest taking on a new project just because the moon is waxing.",
      "Do not present productivity as the only useful response to this phase.",
      "Do not promise that support work will produce a specific result.",
    ],
    safety_notes: [
      "Keep plant and kitchen actions practical, brief, and allergy-aware.",
      "Check plant and ingredient safety before suggesting anything specific.",
      "Avoid adding shopping, unfamiliar ingredients, or elaborate setup.",
    ],
    signalSummary: "A steady support phase for tending what is already underway.",
    capacityGuidance: {
      pause: "Let support mean noticing one thing that is already receiving care.",
      low: "Offer one tiny tending action with no setup or shopping.",
      steady: "Choose one practical follow-through action under twenty minutes.",
      high: "Add one bounded support to an existing household need.",
    },
    ritualPatternKeys: ["tend_one_plant", "table_reset", "small_repair"],
    sourceNoteKeys: ["note.four_phase_moon_mvp", "note.waxing_moon_steady_support", "note.lunar_cards_stay_invitational"],
    interpretationNotes: [
      "Use for support and continuation rather than starting a brand-new project.",
      "Good fit for plant, table, and small repair patterns when capacity allows.",
    ],
    toneGuidance: ["steady", "encouraging", "practical", "low-pressure"],
    contraindications: [
      "avoid productivity pressure",
      "avoid adding supplies or tasks",
      "avoid implying growth must be constant",
    ],
    source_references: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
      "note.waxing_moon_steady_support",
      "note.lunar_cards_stay_invitational",
      "docs/source-review-packets.md#2-moon-phase-reference-set",
    ],
    confidence: "core",
    approval_status: "approved",
  },
  {
    id: "card_moon_phase_full_moon",
    key: "full_moon",
    title: "Full Moon",
    category: "moon_phase",
    summary: "A visible point in the cycle for noticing what is clear, complete, appreciated, or ready to be acknowledged.",
    themes: ["visibility", "completion", "clarity", "gratitude"],
    good_for: [
      "noticing what is present",
      "marking completion",
      "sharing appreciation",
      "acknowledging what has become clear",
    ],
    ritual_styles: ["reflection", "candle_or_light", "conversation", "gratitude"],
    ritual_ideas: [
      "Use the Candle Light Focus pattern to acknowledge one thing that is already clear.",
      "Name one completed effort without reviewing everything unfinished.",
      "Offer one sentence of gratitude for an ordinary household support.",
    ],
    avoid_saying: [
      "Do not make the full moon sound ominous or overwhelming.",
      "Do not claim it causes conflict or emotional intensity.",
      "Do not require a release ritual.",
      "Do not imply visibility means exposure, confrontation, or urgency.",
      "Do not frame full moon timing as a crisis or test.",
    ],
    safety_notes: [
      "Use fire-free options when energy is high, space is busy, or candle safety is uncertain.",
      "Keep reflection prompts optional and avoid emotionally heavy processing by default.",
      "Do not push conversation rituals when privacy, consent, or capacity is uncertain.",
    ],
    signalSummary: "A visible point for noticing clarity, gratitude, or what is complete.",
    capacityGuidance: {
      pause: "Let acknowledgement be enough without adding a ritual.",
      low: "Name one clear or appreciated thing in five minutes or less.",
      steady: "Pair acknowledgement with a small light, table, or shared-space practice.",
      high: "Mark completion with one bounded reset or appreciation action.",
    },
    ritualPatternKeys: ["candle_light_focus", "table_reset", "shared_space_reset"],
    sourceNoteKeys: ["note.four_phase_moon_mvp", "note.full_moon_visibility_without_fear", "note.lunar_cards_stay_invitational"],
    interpretationNotes: [
      "Use visibility as acknowledgement, not exposure.",
      "Best for gratitude, clarity, and completion without emotional escalation.",
    ],
    toneGuidance: ["clear", "appreciative", "grounded", "non-ominous"],
    contraindications: [
      "avoid fear-based full moon language",
      "avoid forced disclosure or confrontation",
      "avoid claiming emotional intensity is caused by the moon",
    ],
    source_references: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
      "note.full_moon_visibility_without_fear",
      "note.lunar_cards_stay_invitational",
      "docs/source-review-packets.md#2-moon-phase-reference-set",
    ],
    confidence: "core",
    approval_status: "approved",
  },
  {
    id: "card_moon_phase_waning_moon",
    key: "waning_moon",
    title: "Waning Moon",
    category: "moon_phase",
    summary: "A settling phase for releasing one small burden, clearing a little space, integrating what happened, or resting.",
    themes: ["release", "clearing", "integration", "rest"],
    good_for: [
      "letting one thing go",
      "small cleanup",
      "closing a loop",
      "resting after effort",
      "choosing what no longer needs attention",
    ],
    ritual_styles: ["surface_reset", "plant_tending", "reflection", "home_tending"],
    ritual_ideas: [
      "Use the Clear One Surface pattern and stop before it becomes a larger cleanup.",
      "Put away, discard, or compost one thing that no longer needs attention.",
      "Use the Close the Evening pattern when release needs to mean rest.",
    ],
    avoid_saying: [
      "Do not say users must release something.",
      "Do not make clearing emotionally heavy by default.",
      "Do not frame waning timing as bad for action.",
      "Do not turn release into pressure to process the past.",
      "Do not default to smoke, scent, or elaborate cleansing language.",
    ],
    safety_notes: [
      "Keep clearing rituals physically light and avoid stirring dust or scents if sensitivity is possible.",
      "Avoid smoke, strong scents, or large cleanup as default waning-moon actions.",
      "If the household needs rest, choose permission to stop instead of a clearing task.",
    ],
    signalSummary: "A settling phase for clearing, integrating, releasing, or resting.",
    capacityGuidance: {
      pause: "Choose rest or permission to stop as the ritual.",
      low: "Clear or return one small thing, then stop.",
      steady: "Use a bounded surface, room, or evening-closing pattern.",
      high: "Close one loop without turning it into a large cleanup.",
    },
    ritualPatternKeys: ["clear_one_surface", "close_the_evening", "end_of_week_closing"],
    sourceNoteKeys: ["note.four_phase_moon_mvp", "note.waning_moon_clear_and_rest", "note.lunar_cards_stay_invitational"],
    interpretationNotes: [
      "Use release as optional relief, not forced processing.",
      "Good fit for clearing, returning, closing, and rest cues.",
    ],
    toneGuidance: ["settling", "gentle", "finite", "rest-friendly"],
    contraindications: [
      "avoid smoke or scent defaults",
      "avoid large cleanup framing",
      "avoid making release emotionally mandatory",
    ],
    source_references: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
      "note.waning_moon_clear_and_rest",
      "note.lunar_cards_stay_invitational",
      "docs/source-review-packets.md#2-moon-phase-reference-set",
    ],
    confidence: "core",
    approval_status: "approved",
  },
  {
    id: "card_numerology_1",
    key: "numerology_1",
    title: "Numerology 1",
    category: "numerology",
    summary: "A light date-number accent for initiative, focus, and one clear first step.",
    themes: ["beginning", "focus", "initiative", "self-direction"],
    good_for: ["choosing a first step", "simplifying a plan", "naming a clear intention"],
    ritual_styles: ["reflection", "planning", "single-action ritual"],
    ritual_ideas: [
      "Choose one household action that would make the week easier.",
      "Write one sentence beginning with: 'The first small step is...'",
    ],
    avoid_saying: [
      "Do not say the number predicts success.",
      "Do not turn initiative into individual pressure.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["No special physical safety concerns; keep prompts low-pressure."],
    signalSummary: "Numerology 1 can add a light accent around beginning with one clear step.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_1_beginning_focus",
    ],
    interpretationNotes: [
      "Use only as an accent when the selected ritual already fits stronger timing or profile signals.",
    ],
    toneGuidance: ["plainspoken", "focused", "non-pushy"],
    contraindications: ["avoid destiny language", "avoid pressure to initiate"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_1_beginning_focus",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_numerology_2",
    key: "numerology_2",
    title: "Numerology 2",
    category: "numerology",
    summary: "A light symbolic cue for cooperation, listening, balance, and gentle pairing.",
    themes: ["partnership", "balance", "listening", "support"],
    good_for: ["softening a shared routine", "checking in", "choosing a cooperative action"],
    ritual_styles: ["conversation prompt", "shared care task", "reflection"],
    ritual_ideas: [
      "Ask what would make one shared task feel easier.",
      "Do a two-minute reset of a space used by more than one person.",
    ],
    avoid_saying: [
      "Do not imply a relationship must be fixed or discussed.",
      "Do not use the number to judge compatibility.",
      "Do not make emotional processing mandatory.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["Keep shared prompts optional and consent-based."],
    signalSummary: "Numerology 2 can add a light accent around listening, balance, or gentle cooperation.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_2_cooperation_balance",
    ],
    interpretationNotes: [
      "Use as a soft relationship-to-space cue, not a relationship reading.",
    ],
    toneGuidance: ["gentle", "consent-aware", "non-diagnostic"],
    contraindications: ["avoid compatibility claims", "avoid forced conversations"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.david_phillips_numerology",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_2_cooperation_balance",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_numerology_3",
    key: "numerology_3",
    title: "Numerology 3",
    category: "numerology",
    summary: "A light date-number accent for expression, warmth, creative ease, and a small enlivening cue.",
    themes: ["expression", "warmth", "creativity", "ease"],
    good_for: ["adding warmth", "making a small moment feel alive", "choosing a low-pressure expression"],
    ritual_styles: ["candle_or_light", "atmosphere", "reflection"],
    ritual_ideas: [
      "Name one small thing that would make the room feel more alive.",
      "Add one ordinary warmth cue already available in the home.",
    ],
    avoid_saying: [
      "Do not force cheer.",
      "Do not turn expression into performance.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["Keep expressive prompts optional and avoid pressure to perform a mood."],
    signalSummary: "Numerology 3 can add a light accent around warmth, expression, or creative ease.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_3_expression_warmth",
    ],
    interpretationNotes: [
      "Use to soften tone or add atmosphere, not to claim the day must be cheerful.",
    ],
    toneGuidance: ["warm", "light", "non-performative"],
    contraindications: ["avoid forced positivity", "avoid personality claims"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_3_expression_warmth",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_numerology_4",
    key: "numerology_4",
    title: "Numerology 4",
    category: "numerology",
    summary: "A practical number theme for structure, steadiness, repair, and small foundations.",
    themes: ["structure", "stability", "repair", "foundation"],
    good_for: ["tidying a system", "choosing a practical ritual", "making one routine easier"],
    ritual_styles: ["home care", "organizing", "kitchen clearing", "planning"],
    ritual_ideas: [
      "Choose one drawer, shelf, or list and make it slightly easier to use.",
      "Name one household structure that is helping and one that can be simplified.",
    ],
    avoid_saying: [
      "Do not turn structure into rigidity.",
      "Do not imply mess is a personal failure.",
      "Do not recommend a large reorganization.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["Avoid heavy lifting or cleanup that exceeds the household's capacity mode."],
    signalSummary: "Numerology 4 can add a light accent around structure, repair, or making one thing easier.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_4_structure_repair",
    ],
    interpretationNotes: [
      "Use for small practical structure, never for moralizing order.",
    ],
    toneGuidance: ["practical", "steady", "non-moralizing"],
    contraindications: ["avoid large cleanup", "avoid rigidity"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_4_structure_repair",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_numerology_5",
    key: "numerology_5",
    title: "Numerology 5",
    category: "numerology",
    summary: "A light date-number accent for freshness, movement, change, and one reversible adjustment.",
    themes: ["change", "freshness", "movement", "adjustment"],
    good_for: ["opening a window if safe", "trying a reversible shift", "freshening one small thing"],
    ritual_styles: ["air_reset", "home_tending", "single-action ritual"],
    ritual_ideas: [
      "Make one reversible adjustment to light, air, or placement.",
      "Freshen one small spot without adding smoke, scent, or supplies.",
    ],
    avoid_saying: [
      "Do not make change sound required.",
      "Do not encourage disruption for its own sake.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["Keep changes reversible; avoid smoke, fragrance, or unsafe window assumptions."],
    signalSummary: "Numerology 5 can add a light accent around freshness, movement, or a safe small adjustment.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_5_change_freshness",
    ],
    interpretationNotes: [
      "Use for a small shift in atmosphere or placement, not major change.",
    ],
    toneGuidance: ["fresh", "flexible", "bounded"],
    contraindications: ["avoid novelty pressure", "avoid unsafe air or scent assumptions"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.david_phillips_numerology",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_5_change_freshness",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_numerology_6",
    key: "numerology_6",
    title: "Numerology 6",
    category: "numerology",
    summary: "A domestic number theme for care, harmony, repair, and tending what supports the home.",
    themes: ["home", "care", "harmony", "responsibility"],
    good_for: ["gentle home care", "repairing a small friction point", "choosing a nurturing ritual"],
    ritual_styles: ["kitchen", "plant tending", "candle", "shared care"],
    ritual_ideas: [
      "Do one small care action for a shared space.",
      "Make a simple drink or snack and notice what helped the household today.",
    ],
    avoid_saying: [
      "Do not make care sound like obligation.",
      "Do not assign responsibility to one person.",
      "Do not overpromise harmony from one action.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["Treat food or drink rituals as optional and account for allergies in private storage only."],
    signalSummary: "Numerology 6 can add a light home-care accent without making care an obligation.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_6_home_care",
    ],
    interpretationNotes: [
      "Use for home-care tone or small repair when stronger signals already support a domestic ritual.",
    ],
    toneGuidance: ["caring", "domestic", "non-obligatory"],
    contraindications: ["avoid assigning duty", "avoid harmony guarantees"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_6_home_care",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_numerology_7",
    key: "numerology_7",
    title: "Numerology 7",
    category: "numerology",
    summary: "A light date-number accent for reflection, quiet attention, discernment, and pausing before adding more.",
    themes: ["reflection", "quiet", "discernment", "pause"],
    good_for: ["asking one simple question", "choosing not to add more", "noticing what needs quiet"],
    ritual_styles: ["reflection", "quiet pause", "no-setup ritual"],
    ritual_ideas: [
      "Pause for one breath before deciding whether anything needs to be done.",
      "Carry one question without trying to solve it immediately.",
    ],
    avoid_saying: [
      "Do not imply withdrawal is required.",
      "Do not make reflection diagnostic or heavy.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["Keep reflection brief and avoid emotionally loaded prompts by default."],
    signalSummary: "Numerology 7 can add a light accent around quiet reflection or pausing before adding more.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_7_reflection_pause",
    ],
    interpretationNotes: [
      "Use to reduce intensity or support a pause, not to prescribe solitude.",
    ],
    toneGuidance: ["quiet", "discerning", "low-pressure"],
    contraindications: ["avoid isolation claims", "avoid diagnostic language"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.david_phillips_numerology",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_7_reflection_pause",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_numerology_8",
    key: "numerology_8",
    title: "Numerology 8",
    category: "numerology",
    summary: "A light date-number accent for capacity, stewardship, practical strength, and responsible effort.",
    themes: ["capacity", "stewardship", "strength", "responsibility"],
    good_for: ["using effort wisely", "choosing one bounded action", "protecting energy"],
    ritual_styles: ["single-action ritual", "home_tending", "planning"],
    ritual_ideas: [
      "Choose one action that uses effort well and has a clear stopping point.",
      "Name one place where enough effort is better than maximum effort.",
    ],
    avoid_saying: [
      "Do not promise success, money, or power.",
      "Do not turn capacity into pressure to do more.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["Capacity and safety override ambitious framing."],
    signalSummary: "Numerology 8 can add a light accent around practical strength and responsible effort.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_8_capacity_power",
    ],
    interpretationNotes: [
      "Use only when effort is already appropriate; do not escalate the ritual.",
    ],
    toneGuidance: ["bounded", "capable", "responsible"],
    contraindications: ["avoid success claims", "avoid overwork"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_8_capacity_power",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_numerology_9",
    key: "numerology_9",
    title: "Numerology 9",
    category: "numerology",
    summary: "A light symbolic theme for completion, release, compassion, and closing a cycle gently.",
    themes: ["completion", "release", "compassion", "perspective"],
    good_for: ["ending one small loop", "soft reflection", "choosing what not to carry forward"],
    ritual_styles: ["reflection", "clearing", "journal", "quiet pause"],
    ritual_ideas: [
      "Write down one thing that can be finished enough for now.",
      "Put away one item that represents a completed effort.",
    ],
    avoid_saying: [
      "Do not make closure sound final or dramatic.",
      "Do not imply a cycle is fated to end.",
      "Do not use numerology to push emotional intensity.",
      "Do not use numerology as the main reason for a recommendation.",
    ],
    safety_notes: ["Keep release rituals gentle and avoid emotionally loaded prompts by default."],
    signalSummary: "Numerology 9 can add a light accent around completion, release, or closing one loop gently.",
    sourceNoteKeys: [
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_9_completion_release",
    ],
    interpretationNotes: [
      "Use for gentle closure only when it does not make the week emotionally heavy.",
    ],
    toneGuidance: ["gentle", "complete-enough", "compassionate"],
    contraindications: ["avoid fate language", "avoid dramatic endings"],
    source_references: [
      "source.hans_decoz_tom_monte",
      "source.barnum_forer_guardrail",
      "note.numerology_calculation_reduced_universal_dates",
      "note.numerology_guardrail_accent_only",
      "note.numerology_9_completion_release",
      "docs/source-review-packets.md#3-numerology-reference-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_home_magic_candle",
    key: "candle",
    title: "Candle",
    category: "home_magic",
    summary: "A simple focus tool for warmth, attention, atmosphere, and marking a brief ritual moment.",
    themes: ["focus", "warmth", "attention", "atmosphere"],
    good_for: ["brief reflection", "marking a start or close", "making a small ritual feel intentional"],
    ritual_styles: ["candle", "reflection", "quiet pause"],
    ritual_ideas: [
      "Light a candle for three minutes while naming one useful focus.",
      "Use an unlit candle as a visual marker when open flame is not a good fit.",
      "Use a candle color only as an optional tone cue if one is already available.",
    ],
    avoid_saying: [
      "Do not claim a candle creates guaranteed results.",
      "Do not require a specific color or purchase.",
      "Do not recommend flame when supervision is uncertain.",
    ],
    safety_notes: [
      "Never leave a flame unattended.",
      "Use a stable heat-safe surface and keep flame away from fabric, pets, and children.",
    ],
    safety_flags: withSafetyOverrides({
      fire: "live_flame",
      cleanupBurden: "tiny",
    }),
    sourceNoteKeys: [
      "note.candle_flame_attention_marker",
      "note.simple_candle_selection_no_shopping",
      "note.ordinary_candle_safety",
    ],
    toneGuidance: ["focused", "warm", "brief", "practical"],
    contraindications: ["avoid if flame supervision or safe placement is uncertain"],
    source_references: [
      "source.madame_pamita_candle",
      "source.sandra_kynes_color_cross_check",
      "source.nfpa_fire_safety",
      "source.usfa_fire_safety",
      "source.cpsc_candle_safety",
      "source.candle_association_safety",
      "source.safety_reference_families",
      "note.candle_flame_attention_marker",
      "note.simple_candle_selection_no_shopping",
      "note.ordinary_candle_safety",
      "docs/source-review-packets.md#4-home-magic-starter-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_home_magic_color_accent",
    key: "color_accent",
    title: "Color Accent",
    category: "home_magic",
    summary: "An optional visual cue for tone, focus, and atmosphere using color already present in the home.",
    themes: ["tone", "focus", "atmosphere", "choice"],
    good_for: ["choosing a gentle mood cue", "making a ritual feel intentional", "using what is already nearby"],
    ritual_styles: ["atmosphere", "candle_or_light", "low_woo"],
    ritual_ideas: [
      "Choose one color already in the room as a loose tone cue.",
      "Let a napkin, mug, candle, cloth, or object mark the desired feeling without buying anything.",
    ],
    avoid_saying: [
      "Do not claim a color has one fixed meaning.",
      "Do not require buying a specific candle or object.",
      "Do not make color the only reason for a recommendation.",
    ],
    safety_notes: [
      "Color symbolism should work without flame, scent, smoke, oils, or special supplies.",
      "If a candle is used, ordinary candle safety still applies.",
    ],
    safety_flags: withSafetyOverrides({ cleanupBurden: "tiny" }),
    sourceNoteKeys: [
      "note.color_symbolism_optional_accent",
      "note.simple_candle_selection_no_shopping",
    ],
    toneGuidance: ["optional", "visual", "light", "non-deterministic"],
    contraindications: ["avoid fixed color meanings and purchase pressure"],
    source_references: [
      "source.madame_pamita_candle",
      "source.sandra_kynes_color_cross_check",
      "source.safety_reference_families",
      "note.color_symbolism_optional_accent",
      "note.simple_candle_selection_no_shopping",
      "docs/source-research-synthesis.md#candle-magic-and-color-symbolism",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_home_magic_kitchen_clearing",
    key: "kitchen_clearing",
    title: "Kitchen Clearing",
    category: "kitchen_magic",
    summary: "A small reset of a practical kitchen area to support ease, nourishment, and less visual noise.",
    themes: ["clearing", "nourishment", "ease", "reset"],
    good_for: ["low-overwhelm cleaning", "making space for a meal", "ending a week with less clutter"],
    ritual_styles: ["kitchen", "clearing", "home care"],
    ritual_ideas: [
      "Clear one small counter area and stop before it becomes a full cleaning session.",
      "Wipe the sink or table while naming one thing the household can stop carrying today.",
    ],
    avoid_saying: [
      "Do not turn clearing into a chore list.",
      "Do not imply a kitchen must be spotless.",
      "Do not use purity language.",
    ],
    safety_notes: [
      "Use ordinary cleaning safety and ventilation.",
      "Avoid mixing cleaning products.",
    ],
    safety_flags: withSafetyOverrides({
      cleanupBurden: "low",
    }),
    source_references: [
      "source.laurel_woodward",
      "source.safety_reference_families",
      "docs/source-review-packets.md#4-home-magic-starter-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_home_magic_plant_tending",
    key: "plant_tending",
    title: "Plant Tending",
    category: "plant_magic",
    summary: "A practical tending ritual for noticing growth, removing what is spent, and supporting living things.",
    themes: ["tending", "growth", "patience", "release"],
    good_for: ["small care action", "gentle reflection", "connecting release with nourishment"],
    ritual_styles: ["plant tending", "home care", "reflection"],
    ritual_ideas: [
      "Water one plant or check soil dryness without turning it into a full plant project.",
      "Remove one dead leaf and name one thing that no longer needs energy.",
    ],
    avoid_saying: [
      "Do not imply plant health reflects personal worth.",
      "Do not require buying a plant.",
      "Do not suggest complex plant care without context.",
    ],
    safety_notes: [
      "Account for plant toxicity, pets, children, and allergies in private storage.",
      "Avoid overwatering or handling irritating plants without care.",
    ],
    safety_flags: withSafetyOverrides({
      pets: "review_required",
      children: "supervision",
      allergies: ["review plant allergies and sensitivities before recommending specific plant contact"],
      cleanupBurden: "tiny",
    }),
    source_references: [
      "source.arin_murphy_hiscock",
      "source.safety_reference_families",
      "docs/source-review-packets.md#4-home-magic-starter-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_home_magic_salt",
    key: "salt",
    title: "Salt",
    category: "kitchen_magic",
    summary: "A common household symbol for grounding, preservation, boundaries, and simple clearing.",
    themes: ["grounding", "clearing", "preservation", "boundaries"],
    good_for: ["simple threshold rituals", "grounded reflection", "kitchen-based symbolism"],
    ritual_styles: ["kitchen", "clearing", "threshold", "reflection"],
    ritual_ideas: [
      "Place a small pinch of salt in a dish while naming one boundary for the week.",
      "Use salt as a visual symbol, then dispose of it normally after the ritual.",
    ],
    avoid_saying: [
      "Do not suggest eating salt as a ritual requirement.",
      "Do not claim salt removes danger or guarantees protection.",
      "Do not use culturally specific cleansing claims without review.",
    ],
    safety_notes: [
      "Do not recommend ingestion.",
      "Keep salt away from surfaces, pets, plants, or materials it may damage.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "avoid",
      pets: "keep_away",
      cleanupBurden: "tiny",
    }),
    source_references: [
      "source.laurel_woodward",
      "source.safety_reference_families",
      "docs/source-review-packets.md#4-home-magic-starter-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_home_magic_rosemary",
    key: "rosemary",
    title: "Rosemary",
    category: "herb",
    summary: "A familiar kitchen herb used symbolically for memory, clarity, care, and practical protection.",
    themes: ["memory", "clarity", "care", "protection"],
    good_for: ["remembering an intention", "kitchen rituals", "simple scent-free symbolism when unhandled"],
    ritual_styles: ["kitchen", "herb", "reflection", "home care"],
    ritual_ideas: [
      "Place a small sprig or labeled jar nearby as a reminder of one clear intention.",
      "Write down one thing worth remembering before starting a household task.",
    ],
    avoid_saying: [
      "Do not suggest medicinal use.",
      "Do not assume herbs are safe for everyone.",
      "Do not claim rosemary guarantees protection or clarity.",
    ],
    safety_notes: [
      "Do not recommend ingestion, essential oils, or smoke by default.",
      "Account for allergies, pregnancy, pets, and sensitivities in private storage.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "avoid",
      essentialOils: "avoid",
      smoke: "avoid",
      pets: "review_required",
      pregnancy: "review_required",
      allergies: ["review herb allergies and sensitivities before recommending contact"],
      cleanupBurden: "tiny",
    }),
    source_references: [
      "source.laurel_woodward",
      "source.rachel_patterson_moon",
      "source.safety_reference_families",
      "docs/source-review-packets.md#4-home-magic-starter-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_home_magic_honey",
    key: "honey",
    title: "Honey",
    category: "kitchen_magic",
    summary: "A domestic sweetness symbol for softening tone, inviting gentleness, and choosing warmth.",
    themes: ["sweetness", "gentleness", "warmth", "attraction"],
    good_for: ["softening a ritual tone", "gratitude", "choosing gentler language"],
    ritual_styles: ["kitchen", "reflection", "gratitude"],
    ritual_ideas: [
      "Set a honey jar nearby and name one way to make the household tone gentler.",
      "Write one kind sentence the household could use more often.",
    ],
    avoid_saying: [
      "Do not suggest honey changes another person's feelings.",
      "Do not recommend eating honey as required ritual action.",
      "Do not use attraction language in a coercive way.",
    ],
    safety_notes: [
      "Do not recommend ingestion.",
      "Account for allergies, dietary needs, and infant safety outside the repository if food is ever used.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "avoid",
      allergies: ["review food allergies and infant safety before suggesting use as food"],
      cleanupBurden: "tiny",
    }),
    source_references: [
      "source.laurel_woodward",
      "source.safety_reference_families",
      "docs/source-review-packets.md#4-home-magic-starter-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_home_magic_lemon",
    key: "lemon",
    title: "Lemon",
    category: "kitchen_magic",
    summary: "A bright kitchen symbol for freshness, clarity, cutting through heaviness, and simple reset.",
    themes: ["freshness", "clarity", "reset", "brightness"],
    good_for: ["refreshing a space", "lightening a ritual", "naming what can be simplified"],
    ritual_styles: ["kitchen", "clearing", "reflection"],
    ritual_ideas: [
      "Place a lemon or lemon peel nearby as a symbol of freshness while clearing one small area.",
      "Write down one thing that would make the week feel a little lighter.",
    ],
    avoid_saying: [
      "Do not claim lemon cleanses energy in a guaranteed way.",
      "Do not recommend ingestion or skin application.",
      "Do not make brightness into forced positivity.",
    ],
    safety_notes: [
      "Lemon can irritate skin and damage some surfaces.",
      "Do not recommend ingestion, topical use, or essential oils by default.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "avoid",
      essentialOils: "avoid",
      allergies: ["review citrus allergies and surface sensitivity before contact"],
      cleanupBurden: "tiny",
    }),
    source_references: [
      "source.laurel_woodward",
      "source.safety_reference_families",
      "docs/source-review-packets.md#4-home-magic-starter-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_kitchen_magic_bread",
    key: "bread",
    title: "Bread",
    category: "kitchen_magic",
    summary: "A familiar food symbol for nourishment, sharing, enoughness, and ordinary grounding.",
    themes: ["nourishment", "sharing", "enoughness", "grounding"],
    good_for: ["simple kitchen care", "shared household attention", "marking enoughness"],
    ritual_styles: ["kitchen", "bread", "simple_food", "grounding"],
    ritual_ideas: [
      "Notice bread already in the kitchen as a cue for what is enough today.",
      "Set one ordinary place for eating or sharing without adding a recipe.",
    ],
    avoid_saying: [
      "Do not make eating bread a ritual requirement.",
      "Do not use uncooked dough or flour crafts.",
      "Do not make prosperity, abundance, or health claims.",
    ],
    safety_notes: [
      "Normal food use only; use only foods already known to fit the household.",
      "Avoid uncooked dough or flour crafts, unfamiliar ingredients, and allergy assumptions.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only bread already known to fit the household"],
      cleanupBurden: "tiny",
    }),
    sourceNoteKeys: [
      "note.bread_everyday_nourishment",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    toneGuidance: ["grounded", "plain", "enough"],
    contraindications: ["avoid uncooked dough or flour crafts, unfamiliar foods, and health claims"],
    source_references: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.cdc_cleaning_safety",
      "source.safety_reference_families",
      "note.bread_everyday_nourishment",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_kitchen_magic_oats",
    key: "oats",
    title: "Oats",
    category: "kitchen_magic",
    summary: "A simple kitchen symbol for steadiness, comfort, patience, and ordinary care.",
    themes: ["steadiness", "comfort", "patience", "care"],
    good_for: ["low-pressure kitchen ritual", "steadying a household tone", "small comfort cues"],
    ritual_styles: ["kitchen", "oats", "simple_food", "warm"],
    ritual_ideas: [
      "Use oats already in the kitchen as a cue for steady care.",
      "Let a familiar bowl, jar, or pantry spot mark one thing that can be done slowly.",
    ],
    avoid_saying: [
      "Do not make dietary or health claims.",
      "Do not require cooking or eating oats.",
      "Do not treat comfort as a cure.",
    ],
    safety_notes: [
      "Normal food use only; use only foods already known to fit the household.",
      "Account for allergies, dietary fit, and cleanup burden outside source control.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only oats already known to fit the household"],
      cleanupBurden: "tiny",
    }),
    sourceNoteKeys: [
      "note.oats_steady_care",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    toneGuidance: ["steady", "warm", "patient"],
    contraindications: ["avoid health claims, unfamiliar foods, and cleanup-heavy cooking"],
    source_references: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.safety_reference_families",
      "note.oats_steady_care",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_kitchen_magic_apple",
    key: "apple",
    title: "Apple",
    category: "kitchen_magic",
    summary: "A familiar kitchen symbol for freshness, sweetness, choice, and a small reset.",
    themes: ["freshness", "sweetness", "choice", "reset"],
    good_for: ["freshening a kitchen tone", "choosing one simple next step", "a small seasonal-feeling cue"],
    ritual_styles: ["kitchen", "apple", "freshness", "simple_food"],
    ritual_ideas: [
      "Use an apple already in the kitchen as a cue for one fresh choice.",
      "Place it near a table or counter reset, then return it to normal kitchen use.",
    ],
    avoid_saying: [
      "Do not make love, attraction, or health claims.",
      "Do not require eating an apple.",
      "Do not force positivity or sweetness.",
    ],
    safety_notes: [
      "Normal food use only; use only foods already known to fit the household.",
      "Account for allergies, dietary fit, pets, children, and surface cleanup.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only apples already known to fit the household"],
      cleanupBurden: "tiny",
    }),
    sourceNoteKeys: [
      "note.apple_freshness_choice",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    toneGuidance: ["fresh", "gentle", "choiceful"],
    contraindications: ["avoid attraction claims, health claims, and unfamiliar foods"],
    source_references: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.safety_reference_families",
      "note.apple_freshness_choice",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_kitchen_magic_ordinary_cooking",
    key: "ordinary_cooking",
    title: "Ordinary Cooking",
    category: "kitchen_magic",
    summary: "A household care symbol for familiar food preparation that is already safe, planned, and ordinary.",
    themes: ["care", "preparation", "familiarity", "nourishment"],
    good_for: ["adding intention to a planned kitchen action", "keeping food magic ordinary", "supporting household care"],
    ritual_styles: ["kitchen", "ordinary_cooking", "simple_food", "home_tending"],
    ritual_ideas: [
      "Let one already-planned kitchen action become the ritual cue.",
      "Name one kind of care the ordinary cooking is already providing.",
    ],
    avoid_saying: [
      "Do not add a recipe assignment.",
      "Do not require unfamiliar ingredients.",
      "Do not make cooking a moral or household-performance standard.",
    ],
    safety_notes: [
      "Normal food safety, allergies, and cleanup burden override symbolism.",
      "Do not recommend medicinal herbs, supplements, essential oils, or special ingredients.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only foods already known to fit the household"],
      cleanupBurden: "low",
    }),
    sourceNoteKeys: [
      "note.ordinary_cooking_as_care",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.poison_control_essential_oil_block",
    ],
    toneGuidance: ["ordinary", "caring", "non-performative"],
    contraindications: ["avoid recipes, unfamiliar ingredients, health claims, and heavy cleanup"],
    source_references: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.poison_control",
      "source.safety_reference_families",
      "note.ordinary_cooking_as_care",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.poison_control_essential_oil_block",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  {
    id: "card_kitchen_magic_tea",
    key: "tea",
    title: "Tea",
    category: "kitchen_magic",
    summary: "A familiar warm-drink symbol for pause, care, warmth, and ordinary settling.",
    themes: ["warmth", "pause", "care", "settling"],
    good_for: ["quiet kitchen ritual", "soft transition", "low-overwhelm care"],
    ritual_styles: ["kitchen", "tea", "warm"],
    ritual_ideas: [
      "Use a normal drink already safe for the household as a cue to pause.",
      "Let the cup mark one small transition without adding extra steps.",
    ],
    avoid_saying: [
      "Do not make health claims about tea or herbs.",
      "Do not require special ingredients.",
      "Do not treat food or drink as safe without allergy and household context.",
    ],
    safety_notes: [
      "Normal food use only; use drinks already known to fit the household.",
      "Do not recommend medicinal herbs, supplements, essential oils, or unfamiliar ingredients.",
    ],
    safety_flags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only foods or drinks already known to fit the household"],
      cleanupBurden: "low",
    }),
    source_references: [
      "source.laurel_woodward",
      "source.rachel_patterson_moon",
      "source.safety_reference_families",
      "docs/source-review-packets.md#4-home-magic-starter-set",
    ],
    confidence: "common",
    approval_status: "approved",
  },
  ...astrologySymbolicCards,
  ...seasonalSymbolicCards,
  {
    id: "card_private_profile_practical_care_theme",
    key: "private_profile_practical_care_theme",
    title: "Private Profile Practical-Care Theme",
    category: "private_profile_theme",
    summary: "A generic placeholder for private context that favors concrete care actions over abstract processing.",
    themes: ["practical care", "tending", "usefulness", "grounded support"],
    good_for: ["schema prototyping", "brief synthesis tests", "generic private-context matching"],
    ritual_styles: ["home care", "plant tending", "kitchen", "small repair"],
    ritual_ideas: [
      "Prefer one concrete household care action when private context indicates practical support.",
      "Choose a ritual that can be completed without a long conversation or complex setup.",
    ],
    avoid_saying: [
      "Do not attach this placeholder to a real person in source control.",
      "Do not treat practical care as a fixed identity claim.",
      "Do not include chart placements, names, schedules, or private notes.",
    ],
    safety_notes: ["Use only as a generic schema/prototype placeholder in the repository."],
    source_references: ["docs/source-review-packets.md#1-private-astrologyprofile-materials"],
    confidence: "personal",
    approval_status: "approved",
  },
  {
    id: "card_private_profile_beauty_warmth_theme",
    key: "private_profile_beauty_warmth_theme",
    title: "Private Profile Beauty/Warmth Theme",
    category: "private_profile_theme",
    summary: "A generic placeholder for private context that favors warmth, beauty, softness, and atmosphere.",
    themes: ["beauty", "warmth", "softness", "atmosphere"],
    good_for: ["schema prototyping", "tone selection", "generic private-context matching"],
    ritual_styles: ["candle", "kitchen", "reflection", "atmosphere"],
    ritual_ideas: [
      "Prefer a small atmosphere shift when private context points toward beauty or warmth.",
      "Choose one gentle sensory cue without requiring shopping or elaborate setup.",
    ],
    avoid_saying: [
      "Do not attach this placeholder to a real person in source control.",
      "Do not make beauty or warmth a requirement.",
      "Do not include private interpretations, names, birth data, or relationship details.",
    ],
    safety_notes: ["Use only as a generic schema/prototype placeholder in the repository."],
    source_references: ["docs/source-review-packets.md#1-private-astrologyprofile-materials"],
    confidence: "personal",
    approval_status: "approved",
  },
  {
    id: "card_private_profile_structured_action_theme",
    key: "private_profile_structured_action_theme",
    title: "Private Profile Structured-Action Theme",
    category: "private_profile_theme",
    summary: "A generic placeholder for private context that favors clear steps, steadiness, and bounded action.",
    themes: ["structure", "action", "steadiness", "follow-through"],
    good_for: ["schema prototyping", "capacity-aware ritual choice", "generic private-context matching"],
    ritual_styles: ["planning", "home care", "single-action ritual", "clearing"],
    ritual_ideas: [
      "Prefer a ritual with one clear step and an obvious stopping point.",
      "Choose a bounded action that supports follow-through without adding pressure.",
    ],
    avoid_saying: [
      "Do not attach this placeholder to a real person in source control.",
      "Do not imply someone must be disciplined or productive.",
      "Do not include chart placements, schedules, private summaries, or names.",
    ],
    safety_notes: ["Use only as a generic schema/prototype placeholder in the repository."],
    source_references: ["docs/source-review-packets.md#1-private-astrologyprofile-materials"],
    confidence: "personal",
    approval_status: "approved",
  },
];
