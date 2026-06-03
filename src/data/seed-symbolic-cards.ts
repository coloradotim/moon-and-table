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

function makeAstrologyCard(seed: AstrologyCardSeed): SymbolicCard {
  return {
    ...seed,
    id: `card_${seed.key}`,
    source_references: seed.source_references ?? ASTROLOGY_SOURCE_REFERENCES,
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
    summary: "A simple number theme for initiative, focus, and one clear first step.",
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
    source_references: ["docs/source-review-packets.md#3-numerology-reference-set"],
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
    ],
    safety_notes: ["Keep shared prompts optional and consent-based."],
    source_references: ["docs/source-review-packets.md#3-numerology-reference-set"],
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
    ],
    safety_notes: ["Avoid heavy lifting or cleanup that exceeds the household's capacity mode."],
    source_references: ["docs/source-review-packets.md#3-numerology-reference-set"],
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
    ],
    safety_notes: ["Treat food or drink rituals as optional and account for allergies in private storage only."],
    source_references: ["docs/source-review-packets.md#3-numerology-reference-set"],
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
    ],
    safety_notes: ["Keep release rituals gentle and avoid emotionally loaded prompts by default."],
    source_references: ["docs/source-review-packets.md#3-numerology-reference-set"],
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
    source_references: [
      "source.safety_reference_families",
      "docs/source-review-packets.md#4-home-magic-starter-set",
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
