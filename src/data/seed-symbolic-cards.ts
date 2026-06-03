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

export const seedSymbolicCards: SymbolicCard[] = [
  {
    id: "card_moon_phase_new_moon",
    key: "new_moon",
    title: "New Moon",
    category: "moon_phase",
    summary: "A quiet reset point for naming one small focus without forcing a fresh start.",
    themes: ["beginning", "reset", "quiet", "small focus"],
    good_for: ["choosing one small focus", "starting gently", "reducing noise"],
    ritual_styles: ["reflection", "candle_or_light", "low_woo", "simple planning"],
    ritual_ideas: [
      "Write one sentence about what the household wants to make room for.",
      "Use a small light or quiet pause to name one simple next step.",
    ],
    avoid_saying: [
      "Do not say the new moon requires a fresh start.",
      "Do not frame intention-setting as a guarantee.",
      "Do not make the ritual large or urgent.",
      "Do not imply a person has failed if they do not begin anything.",
    ],
    safety_notes: [
      "Default to LED or no-flame light for focus practices.",
      "Keep intention prompts optional and emotionally light.",
    ],
    source_references: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
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
    summary: "A building phase for adding one bit of care, attention, or follow-through at a humane pace.",
    themes: ["growth", "practice", "momentum", "support", "steady attention"],
    good_for: ["small progress", "tending a plan", "adding support to something already started"],
    ritual_styles: ["plant_tending", "kitchen", "home_tending", "simple planning"],
    ritual_ideas: [
      "Add one small support to an existing plan or shared space.",
      "Water a plant and name one thing that needs steady attention.",
    ],
    avoid_saying: [
      "Do not imply that growth must be constant.",
      "Do not turn momentum into pressure.",
      "Do not suggest taking on a new project just because the moon is waxing.",
      "Do not present productivity as the only useful response to this phase.",
    ],
    safety_notes: [
      "Keep plant and kitchen actions practical, brief, and allergy-aware.",
      "Check plant and ingredient safety before suggesting anything specific.",
    ],
    source_references: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
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
    summary: "A visible point in the cycle for noticing what is clear, complete, or gently asking for attention.",
    themes: ["visibility", "completion", "illumination", "gratitude", "attention"],
    good_for: ["noticing what is present", "marking completion", "sharing appreciation"],
    ritual_styles: ["reflection", "candle_or_light", "conversation", "gratitude"],
    ritual_ideas: [
      "Name one thing that has become clearer lately.",
      "Acknowledge one completed effort without turning it into a review of everything unfinished.",
    ],
    avoid_saying: [
      "Do not make the full moon sound ominous or overwhelming.",
      "Do not claim it causes conflict or emotional intensity.",
      "Do not require a release ritual.",
      "Do not imply visibility means exposure, confrontation, or urgency.",
    ],
    safety_notes: [
      "Use fire-free options when energy is high, space is busy, or candle safety is uncertain.",
      "Keep reflection prompts optional and avoid emotionally heavy processing by default.",
    ],
    source_references: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
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
    summary: "A settling phase for releasing one small burden, clearing a little space, or integrating what happened.",
    themes: ["release", "clearing", "integration", "rest", "enough"],
    good_for: ["letting one thing go", "small cleanup", "closing a loop", "resting after effort"],
    ritual_styles: ["surface_reset", "plant_tending", "reflection", "home_tending"],
    ritual_ideas: [
      "Clear one small surface and stop there.",
      "Compost, discard, or put away one thing that no longer needs attention.",
    ],
    avoid_saying: [
      "Do not say users must release something.",
      "Do not make clearing emotionally heavy by default.",
      "Do not frame waning timing as bad for action.",
      "Do not turn release into pressure to process the past.",
    ],
    safety_notes: [
      "Keep clearing rituals physically light and avoid stirring dust or scents if sensitivity is possible.",
      "Avoid smoke, strong scents, or large cleanup as default waning-moon actions.",
    ],
    source_references: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.four_phase_moon_mvp",
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
      fire: "led_default",
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
