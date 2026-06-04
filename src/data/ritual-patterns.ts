import type { CapacityMode } from "../lib/generate-weekly-brief";
import {
  lowRiskRitualSafetyFlags,
  validateRitualSafety,
  withSafetyOverrides,
  type RitualSafetyFlags,
} from "../lib/ritual-safety";

export const RITUAL_PATTERN_APPROVAL_STATUSES = [
  "draft",
  "reviewed",
  "approved",
  "rejected",
] as const;

export type RitualPatternApprovalStatus =
  (typeof RITUAL_PATTERN_APPROVAL_STATUSES)[number];

export type RitualPresentationVariant = {
  invitation: string;
  whyThisPractice: string;
  approach: string[];
  steps: string[];
  carry: string;
  closing: string;
};

export type RitualPresentation = RitualPresentationVariant & {
  variants?: Partial<
    Record<
      | CapacityMode
      | "solo"
      | "together"
      | "candleFree"
      | "evening",
      Partial<RitualPresentationVariant>
    >
  >;
};

export type RitualPattern = {
  id: string;
  key: string;
  title: string;
  summary: string;
  ritualStyles: string[];
  capacityModes: CapacityMode[];
  defaultDurationMinutes: number;
  materials: string[];
  steps: string[];
  presentation?: RitualPresentation;
  safetyFlags: RitualSafetyFlags;
  safetyNotes: string[];
  avoidIf: string[];
  capacityGuidance?: Partial<Record<CapacityMode, string>>;
  toneGuidance?: string[];
  burdenAvoidFlags?: string[];
  contraindications?: string[];
  sourceNoteKeys?: string[];
  generatorUseNotes?: string[];
  audienceFit?: Array<"person_a" | "person_b" | "together" | "either" | "household">;
  sourceReferences: string[];
  approvalStatus: RitualPatternApprovalStatus;
};

export type RitualPatternValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

const CAPACITY_MODES: CapacityMode[] = ["pause", "low", "steady", "high"];
const MAX_PATTERN_STEPS = 5;
const MAX_STEP_LENGTH = 180;
const MAX_PRESENTATION_LIST_ITEMS = 4;
const MAX_PRESENTATION_FIELD_LENGTH = 260;

export const starterRitualPatterns: RitualPattern[] = [
  {
    id: "ritual_pattern_clear_one_surface",
    key: "clear_one_surface",
    title: "Clear One Surface",
    summary: "Reset one small surface and stop before it turns into a bigger project.",
    ritualStyles: ["home_tending", "surface_reset", "low_woo"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["one small surface", "trash or return-home spot"],
    steps: [
      "Choose one surface no larger than a small table or counter section.",
      "Remove trash, dishes, or items that already have a place.",
      "Pause when the chosen surface is clearer, even if the rest of the room is not.",
    ],
    presentation: {
      invitation: "Let one small surface breathe.",
      whyThisPractice: "A single cleared place can make room without asking the whole home to change.",
      approach: [
        "Choose the surface before you begin, and keep the boundary small.",
        "Treat this as making room, not catching up.",
      ],
      steps: [
        "Clear only what obviously belongs somewhere else.",
        "Leave the surface when it has a little more space around it.",
      ],
      carry: "What becomes easier to notice when one surface is no longer asking for attention?",
      closing: "Close the practice by turning away before it becomes the next surface.",
    },
    safetyFlags: withSafetyOverrides({
      cleanupBurden: "low",
    }),
    safetyNotes: [
      "Do not lift heavy items or stir dust if that is not a good fit today.",
    ],
    avoidIf: [
      "avoid when cleanup would expand into a full-room project",
      "avoid when the household needs rest more than tidying",
    ],
    capacityGuidance: {
      low: "One small surface only, five minutes or less.",
      steady: "A bounded reset can include a wipe only if supplies are already nearby.",
    },
    toneGuidance: ["practical", "finite", "non-moralizing"],
    burdenAvoidFlags: ["heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid when dust, lifting, or cleanup sprawl is likely"],
    sourceNoteKeys: ["note.home_tending_small_enough", "note.safety_overrides_symbolism"],
    generatorUseNotes: ["Good default for waning moon and low-capacity clearing."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.cheryl_mendelson",
      "source.safety_reference_families",
      "note.home_tending_small_enough",
      "note.safety_overrides_symbolism",
      "docs/source-ingestion-plan.md#batch-6--home-tending-starter-patterns",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_tend_one_plant",
    key: "tend_one_plant",
    title: "Tend One Plant",
    summary: "Offer one practical care action to a plant as a quiet tending ritual.",
    ritualStyles: ["plant", "plant_tending", "home_tending"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["one household plant", "water if needed"],
    steps: [
      "Choose one plant that is already part of the home.",
      "Check the soil or leaves before doing anything.",
      "Water, trim a dead leaf, or simply notice what kind of care is actually needed.",
    ],
    presentation: {
      invitation: "Tend one living thing.",
      whyThisPractice: "A plant makes care visible: attention first, action only if it is actually needed.",
      approach: [
        "Let the plant set the size of the ritual.",
        "Look before helping; not every kind of care is an action.",
      ],
      steps: [
        "Choose one plant already living in this home.",
        "Check soil, leaves, light, and access before acting.",
        "Offer one useful care action, or simply notice what care is not needed today.",
      ],
      carry: "What kind of care is this home asking for only after you look closely?",
      closing: "Close by leaving the plant settled and letting the rest of the room wait.",
    },
    safetyFlags: withSafetyOverrides({
      pets: "review_required",
      children: "supervision",
      allergies: ["use only with plants reviewed for household allergies and handling safety"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Keep plant material away from pets and children unless the plant has been reviewed as safe.",
    ],
    avoidIf: [
      "avoid if the plant may be toxic and pets or children can access it",
      "avoid if plant care would become a larger cleanup task",
    ],
    capacityGuidance: {
      low: "Check one plant and do only the care it actually needs.",
      steady: "One plant can receive water, pruning, rotation, or observation.",
    },
    toneGuidance: ["attentive", "gentle", "practical"],
    burdenAvoidFlags: ["heavy_cleanup", "shopping_required"],
    contraindications: ["avoid when pet or child access has not been reviewed"],
    sourceNoteKeys: [
      "note.plant_tending_check_first",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    generatorUseNotes: ["Good fit for waxing moon, practical profile themes, and plant preferences."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.plant_tending_check_first",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
      "docs/source-ingestion-plan.md#batch-7--kitchen-plant-and-light-starter-set",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_candle_light_focus",
    key: "candle_light_focus",
    title: "Candle Light Focus",
    summary: "Use a candle flame as a small marker for attention and closure.",
    ritualStyles: ["candle_or_light", "light_focus", "reflection"],
    capacityModes: ["pause", "low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["candle", "matches or lighter", "stable heat-safe surface"],
    steps: [
      "Light a candle.",
      "Let the flame mark one small focus for this short pause.",
      "Blow it out when you are done.",
    ],
    presentation: {
      invitation: "Let the flame hold one small focus.",
      whyThisPractice: "Candlelight can mark the edge of attention: begin, stay briefly, close cleanly.",
      approach: [
        "Keep the focus small enough to fit the flame.",
        "Let the candle mark attention, not urgency.",
      ],
      steps: [
        "Light the candle and name one focus for this short pause.",
        "Stay with the flame for a few breaths.",
        "Blow it out before the focus turns into a plan.",
      ],
      carry: "What can be held by a small light instead of by effort?",
      closing: "Close the practice when the flame is out and the focus has been named.",
      variants: {
        pause: {
          steps: [
            "Light the candle only if that is already easy.",
            "Let one breath near the flame be the whole ritual.",
          ],
          carry: "What is small enough to hold for one breath?",
          closing: "Blow out the candle before this becomes something to finish.",
        },
      },
    },
    safetyFlags: withSafetyOverrides({
      fire: "live_flame",
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Never leave a flame unattended.",
      "Keep flame away from fabric, pets, children, drafts, and clutter.",
    ],
    avoidIf: [
      "avoid if even a brief focus practice feels like pressure",
    ],
    capacityGuidance: {
      pause: "One breath with candlelight is enough; no intention required.",
      low: "Keep the flame practice short and supervised.",
      steady: "Use as a brief focus marker before or after another small ritual.",
    },
    toneGuidance: ["quiet", "focused", "optional"],
    burdenAvoidFlags: ["live_flame"],
    contraindications: ["avoid when live flame is not a good fit"],
    sourceNoteKeys: ["note.light_focus_optional_flame"],
    generatorUseNotes: ["Use for light focus only when live flame is not explicitly avoided."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.nfpa_fire_safety",
      "source.safety_reference_families",
      "note.light_focus_optional_flame",
      "docs/source-ingestion-plan.md#batch-7--kitchen-plant-and-light-starter-set",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_table_reset",
    key: "table_reset",
    title: "Table Reset",
    summary: "Make the table a little more ready for ordinary care, food, or conversation.",
    ritualStyles: ["home_tending", "kitchen", "table_reset"],
    capacityModes: ["low", "steady", "high"],
    defaultDurationMinutes: 15,
    materials: ["table or shared surface", "cloth if already nearby"],
    steps: [
      "Clear only the table or one shared eating surface.",
      "Wipe it only if the supplies are already nearby.",
      "Place back what supports the next ordinary use and leave the rest for later.",
    ],
    presentation: {
      invitation: "Make the table easier to return to.",
      whyThisPractice: "The table can become a small household altar by becoming usable again.",
      approach: [
        "Stay with the table itself; do not follow the mess into another room.",
        "Let ordinary use be enough of a blessing.",
      ],
      steps: [
        "Clear what does not belong on the table right now.",
        "Wipe only if what you need is already nearby.",
        "Put back one thing that helps the table welcome its next use.",
      ],
      carry: "What does this table want to hold less of, and what can it hold more clearly?",
      closing: "Close by leaving the table ready for ordinary life, not perfect.",
      variants: {
        together: {
          carry: "What can the table hold for both of you without becoming a discussion?",
          closing: "Close by letting the table hold the rest for now.",
        },
      },
    },
    safetyFlags: withSafetyOverrides({
      cleanupBurden: "medium",
    }),
    safetyNotes: [
      "Do not use strong scents or cleaners if anyone in the household may be sensitive.",
    ],
    avoidIf: [
      "avoid during low capacity",
      "avoid if cleaning supplies would require extra setup or shopping",
    ],
    capacityGuidance: {
      steady: "Reset the table without expanding into the whole kitchen.",
      high: "Can include clearing, wiping, and placing one supportive object.",
    },
    toneGuidance: ["welcoming", "practical", "shared"],
    burdenAvoidFlags: ["heavy_cleanup", "shopping_required"],
    contraindications: ["avoid if the table reset would become a full kitchen cleanup"],
    sourceNoteKeys: ["note.home_tending_small_enough", "note.kitchen_magic_normal_use"],
    generatorUseNotes: ["Good for shared household care, full moon gratitude, and steady capacity."],
    audienceFit: ["household", "together"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.cheryl_mendelson",
      "source.safety_reference_families",
      "note.home_tending_small_enough",
      "note.kitchen_magic_normal_use",
      "note.safety_overrides_symbolism",
      "docs/source-ingestion-plan.md#batch-6--home-tending-starter-patterns",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_threshold_reset",
    key: "threshold_reset",
    title: "Threshold Reset",
    summary: "Tend an entry point as a practical cue for arriving, leaving, and returning.",
    ritualStyles: ["home_tending", "threshold_reset", "low_woo"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 10,
    materials: ["entry area", "one return-home spot"],
    steps: [
      "Choose one doorway, entry shelf, or landing spot.",
      "Remove one thing that does not belong there.",
      "Name one quality the household wants when crossing that threshold.",
    ],
    presentation: {
      invitation: "Give the threshold one clear welcome.",
      whyThisPractice: "A threshold marks the shift between outside and inside, leaving and returning.",
      approach: [
        "Work with the edge of the home, not the whole entryway.",
        "Keep the quality plain enough to cross through.",
      ],
      steps: [
        "Choose one doorway, entry shelf, or landing spot.",
        "Move one thing that does not belong there.",
        "Name the quality this threshold should quietly remind the home to carry.",
      ],
      carry: "What should this threshold help you remember as you cross it?",
      closing: "Close by crossing the threshold once and letting the cue stand.",
    },
    safetyFlags: withSafetyOverrides({
      cleanupBurden: "low",
    }),
    safetyNotes: [
      "Keep doorways physically clear and do not block exits.",
    ],
    avoidIf: [
      "avoid if the entry area needs a larger safety or repair fix",
    ],
    capacityGuidance: {
      low: "Move one object or name one arrival quality.",
      steady: "Tend the threshold and stop before it becomes an entryway project.",
    },
    toneGuidance: ["transitional", "grounded", "plainspoken"],
    burdenAvoidFlags: ["heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid protection-from-danger claims"],
    sourceNoteKeys: ["note.home_threshold_as_transition", "note.home_atmosphere_without_overclaim"],
    generatorUseNotes: ["Use for transitions, new moon resets, or seasonal threshold signals."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.tess_whitehurst",
      "source.safety_reference_families",
      "note.home_threshold_as_transition",
      "note.home_atmosphere_without_overclaim",
      "note.safety_overrides_symbolism",
      "docs/source-ingestion-plan.md#batch-6--home-tending-starter-patterns",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_room_reset",
    key: "room_reset",
    title: "Room Reset",
    summary: "Choose one room cue to make the space feel a little easier to be in.",
    ritualStyles: ["home_tending", "surface_reset", "low_woo"],
    capacityModes: ["low", "steady", "high"],
    defaultDurationMinutes: 10,
    materials: ["one room or room corner", "one return-home spot"],
    steps: [
      "Choose one room or one corner of a room.",
      "Remove one thing that clearly belongs elsewhere.",
      "Adjust one practical cue, such as a chair, blanket, light, or clear path.",
      "Stop before it becomes a full-room cleanup.",
    ],
    safetyFlags: withSafetyOverrides({
      cleanupBurden: "low",
    }),
    safetyNotes: [
      "Keep paths clear and avoid moving heavy items.",
      "Use existing room lighting only; do not add candles, smoke, oils, strong scents, or special supplies.",
    ],
    avoidIf: [
      "avoid if the room needs repair, heavy lifting, or deep cleaning",
      "avoid if any safety issue needs a practical fix instead of a ritual frame",
    ],
    capacityGuidance: {
      low: "Adjust one cue only.",
      steady: "Reset one room corner without deep cleaning.",
      high: "A room cue can be more active but should stay under half an hour.",
    },
    toneGuidance: ["domestic", "useful", "bounded"],
    burdenAvoidFlags: ["heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid heavy lifting, repair problems, or deep cleaning"],
    sourceNoteKeys: ["note.home_tending_small_enough", "note.home_tending_attention_care"],
    generatorUseNotes: ["Good default for high capacity without turning into a task list."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.cheryl_mendelson",
      "source.safety_reference_families",
      "note.home_tending_small_enough",
      "note.home_tending_attention_care",
      "note.safety_overrides_symbolism",
      "docs/source-ingestion-plan.md#batch-6--home-tending-starter-patterns",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_close_the_evening",
    key: "close_the_evening",
    title: "Close the Evening",
    summary: "Mark the end of the day with one small action that asks for less intensity.",
    ritualStyles: ["home_tending", "reflection", "low_woo"],
    capacityModes: ["pause", "low"],
    defaultDurationMinutes: 3,
    materials: ["nothing required"],
    steps: [
      "Choose one tiny closing action, such as putting one item away.",
      "Say, silently or aloud, that this is enough for tonight.",
    ],
    presentation: {
      invitation: "Let the evening close gently.",
      whyThisPractice: "The end of the day sometimes needs a boundary more than another useful act.",
      approach: [
        "Let stopping be the point.",
        "Choose a closing cue only if it lowers the intensity.",
      ],
      steps: [
        "Notice one thing asking for less attention.",
        "If one tiny action would help, do only that.",
      ],
      carry: "What can be complete enough for tonight?",
      closing: "Close by saying, in plain words, that the day does not need more from you.",
      variants: {
        pause: {
          steps: [
            "Let the ritual be only a pause.",
            "Notice the one thing asking for less attention, then stop there.",
          ],
          carry: "What can be left alone until tomorrow?",
          closing: "Close by letting the pause be the practice.",
        },
      },
    },
    safetyFlags: lowRiskRitualSafetyFlags,
    safetyNotes: [
      "Keep this as permission to stop, not a list of tasks.",
    ],
    avoidIf: [
      "avoid if any reflection prompt would feel emotionally heavy",
    ],
    capacityGuidance: {
      pause: "No task required; permission to stop can be the whole practice.",
      low: "One tiny closing action, then stop.",
    },
    toneGuidance: ["rest-friendly", "gentle", "non-demanding"],
    burdenAvoidFlags: ["emotionally_heavy", "heavy_cleanup"],
    contraindications: ["avoid if reflection feels like processing homework"],
    sourceNoteKeys: ["note.home_tending_attention_care"],
    generatorUseNotes: ["Fallback pattern when capacity is pause or low."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.shoukei_matsumoto",
      "source.safety_reference_families",
      "note.home_tending_attention_care",
      "docs/source-ingestion-plan.md#batch-6--home-tending-starter-patterns",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_one_clear_sentence",
    key: "one_clear_sentence",
    title: "One Clear Sentence",
    summary: "Name one small household need, appreciation, or next step without turning it into a heavy talk.",
    ritualStyles: ["conversation", "naming"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["nothing required"],
    steps: [
      "Choose one sentence that brings a little clarity to the household.",
      "Say it only when a small exchange is welcome; otherwise write it down for yourself.",
      "Stop after the sentence and one response, without opening a larger conversation.",
    ],
    safetyFlags: withSafetyOverrides({
      emotionalIntensity: "low",
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Conversation practices require consent, capacity, and an easy stop.",
    ],
    avoidIf: [
      "avoid if it would become conflict, advice, or heavy relationship processing",
      "avoid if either person does not have capacity for a small exchange",
    ],
    capacityGuidance: {
      low: "One sentence, or write it privately if saying it would be too much.",
      steady: "One short exchange is enough; do not turn it into a discussion agenda.",
    },
    toneGuidance: ["clear", "consent-aware", "gentle", "bounded"],
    burdenAvoidFlags: ["emotionally_heavy", "long_journaling"],
    contraindications: ["avoid forced vulnerability", "avoid conflict resolution claims"],
    sourceNoteKeys: [
      "note.astrology_body_mercury_words_sorting",
      "note.astrology_combo_mercury_cancer_careful_words",
      "note.numerology_2_cooperation_balance",
    ],
    generatorUseNotes: [
      "Starter conversation coverage for check-in and profile practice preferences.",
      "Use when conversation is requested but capacity should stay low-pressure.",
    ],
    audienceFit: ["either", "together", "household"],
    sourceReferences: [
      "source.kevin_burk",
      "source.april_elliott_kent",
      "source.safety_reference_families",
      "note.astrology_body_mercury_words_sorting",
      "note.astrology_combo_mercury_cancer_careful_words",
      "note.numerology_2_cooperation_balance",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_tea_ritual",
    key: "tea_ritual",
    title: "Tea Pause",
    summary: "Use an ordinary safe drink as a small cue for warmth and settling.",
    ritualStyles: ["kitchen", "tea", "warm"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 10,
    materials: ["ordinary tea or warm drink already safe for the household"],
    steps: [
      "Prepare a normal drink already used safely in the household.",
      "Hold the cup for a short pause before doing the next thing.",
      "Name one thing that can be softened tonight.",
    ],
    presentation: {
      invitation: "Let the cup make a warm pause.",
      whyThisPractice: "An ordinary drink can mark care without turning the kitchen into a project.",
      approach: [
        "Use what already belongs in this home.",
        "Let warmth be a cue, not a recipe.",
      ],
      steps: [
        "Make or pour a drink already ordinary and safe here.",
        "Hold the cup before moving on.",
        "Name one thing that can soften without being solved.",
      ],
      carry: "What feels a little easier when warmth is allowed to be simple?",
      closing: "Close by setting the cup down and letting the kitchen stay ordinary.",
    },
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only foods or drinks already known to fit the household"],
      cleanupBurden: "low",
    }),
    safetyNotes: [
      "Normal food use only. Do not use herbs, supplements, or ingredients for health claims.",
    ],
    avoidIf: [
      "avoid if food or drink safety is uncertain",
      "avoid if it would require shopping or unfamiliar ingredients",
    ],
    capacityGuidance: {
      low: "Use only an already-safe drink with no added ingredients.",
      steady: "A warm drink can mark a settling pause under twenty minutes.",
    },
    toneGuidance: ["warm", "settling", "ordinary"],
    burdenAvoidFlags: ["shopping_required", "elaborate_setup"],
    contraindications: ["avoid when food, drink, allergy, or caffeine fit is uncertain"],
    sourceNoteKeys: [
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.poison_control_essential_oil_block",
    ],
    generatorUseNotes: ["Good for warmth, kitchen, and low-overwhelm care signals."],
    audienceFit: ["household", "either", "together"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.rachel_patterson_moon",
      "source.safety_reference_families",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.poison_control_essential_oil_block",
      "docs/source-ingestion-plan.md#batch-7--kitchen-plant-and-light-starter-set",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_simple_warm_drink",
    key: "simple_warm_drink",
    title: "Simple Warm Drink",
    summary: "Make an ordinary warm drink or simple soup already familiar to the household.",
    ritualStyles: ["kitchen", "simple_food", "warm"],
    capacityModes: ["steady"],
    defaultDurationMinutes: 15,
    materials: ["ordinary drink or simple soup ingredients already safe for the household"],
    steps: [
      "Choose a drink or simple soup the household already uses safely.",
      "Prepare it without adding unfamiliar ingredients.",
      "Let the warmth mark one ordinary care moment.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only foods already known to fit the household"],
      cleanupBurden: "low",
    }),
    safetyNotes: [
      "Normal food use only. No medicinal herbs, supplements, essential oils, or health claims.",
      "Avoid this pattern if food safety, allergy fit, or cleanup burden is uncertain.",
    ],
    avoidIf: [
      "avoid if it requires shopping or unfamiliar ingredients",
      "avoid if food or drink safety is uncertain",
      "avoid if cleanup would be more than low burden",
    ],
    capacityGuidance: {
      steady: "Use only familiar food or drink already safe for the household.",
    },
    toneGuidance: ["warm", "nourishing", "simple"],
    burdenAvoidFlags: ["shopping_required", "heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid recipes, health claims, unfamiliar ingredients, and high cleanup"],
    sourceNoteKeys: [
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.poison_control_essential_oil_block",
    ],
    generatorUseNotes: ["Use when kitchen warmth is a fit and capacity is steady."],
    audienceFit: ["household", "together"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.rachel_patterson_moon",
      "source.safety_reference_families",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.poison_control_essential_oil_block",
      "docs/source-ingestion-plan.md#batch-7--kitchen-plant-and-light-starter-set",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_bread_enoughness_cue",
    key: "bread_enoughness_cue",
    title: "Bread Enoughness Cue",
    summary: "Use ordinary bread already in the kitchen as a small cue for enoughness and shared care.",
    ritualStyles: ["kitchen", "bread", "simple_food", "grounding"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["ordinary bread already safe for the household"],
    steps: [
      "Use bread already in the kitchen only if it fits normal household use.",
      "Let it mark one thing that is enough for now.",
      "Return it to ordinary kitchen use.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only bread already known to fit the household"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Normal food use only; no eating requirement.",
      "Avoid uncooked dough or flour crafts, unfamiliar ingredients, and allergy assumptions.",
    ],
    avoidIf: [
      "avoid if bread, gluten, allergy, or household food fit is uncertain",
      "avoid if it would require buying or preparing anything",
    ],
    capacityGuidance: {
      low: "Use bread only as a brief visual cue.",
      steady: "Can pair with setting one ordinary place or table cue.",
    },
    toneGuidance: ["grounded", "plain", "enough"],
    burdenAvoidFlags: ["shopping_required", "elaborate_setup"],
    contraindications: ["avoid uncooked dough or flour crafts, unfamiliar foods, health claims, and abundance claims"],
    sourceNoteKeys: [
      "note.bread_everyday_nourishment",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    generatorUseNotes: ["Use for ordinary nourishment and enoughness themes without adding recipe work."],
    audienceFit: ["household", "either", "together"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.cdc_cleaning_safety",
      "source.safety_reference_families",
      "note.bread_everyday_nourishment",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_oats_steady_care_cue",
    key: "oats_steady_care_cue",
    title: "Oats Steady Care Cue",
    summary: "Use ordinary oats already in the kitchen as a small cue for steadiness and patient care.",
    ritualStyles: ["kitchen", "oats", "simple_food", "warm"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["ordinary oats already safe for the household"],
    steps: [
      "Use oats already in the kitchen only if they fit normal household use.",
      "Let the jar, bag, or bowl cue one thing that can happen slowly.",
      "Return them to ordinary kitchen use.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only oats already known to fit the household"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Normal food use only; no eating or cooking requirement.",
      "Avoid health, diet, or unfamiliar ingredient claims.",
    ],
    avoidIf: [
      "avoid if oats, allergy, or household food fit is uncertain",
      "avoid if it would require shopping, cooking, or extra cleanup",
    ],
    capacityGuidance: {
      low: "Use oats only as a brief kitchen cue.",
      steady: "Can pair with a warm drink or table reset if already practical.",
    },
    toneGuidance: ["steady", "warm", "patient"],
    burdenAvoidFlags: ["shopping_required", "heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid health claims, unfamiliar foods, and cleanup-heavy cooking"],
    sourceNoteKeys: [
      "note.oats_steady_care",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    generatorUseNotes: ["Use for steady care and warmth themes without adding a recipe."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.safety_reference_families",
      "note.oats_steady_care",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_apple_fresh_choice_cue",
    key: "apple_fresh_choice_cue",
    title: "Apple Fresh Choice Cue",
    summary: "Use an ordinary apple already in the kitchen as a cue for freshness and one small choice.",
    ritualStyles: ["kitchen", "apple", "freshness", "simple_food"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["ordinary apple already safe for the household"],
    steps: [
      "Use an apple already in the kitchen only if it fits normal household use.",
      "Let it cue one fresh choice or one thing to simplify.",
      "Return it to ordinary kitchen use.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only apples already known to fit the household"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Normal food use only; no eating requirement.",
      "Avoid attraction, health, or forced-sweetness claims.",
    ],
    avoidIf: [
      "avoid if apple, allergy, pet, child, or household food fit is uncertain",
      "avoid if it would require shopping or extra preparation",
    ],
    capacityGuidance: {
      low: "Use apple only as a brief freshness cue.",
      steady: "Can pair with a small kitchen or table reset.",
    },
    toneGuidance: ["fresh", "gentle", "choiceful"],
    burdenAvoidFlags: ["shopping_required", "elaborate_setup"],
    contraindications: ["avoid attraction claims, health claims, and unfamiliar foods"],
    sourceNoteKeys: [
      "note.apple_freshness_choice",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    generatorUseNotes: ["Use for freshness and choice themes without food or relationship claims."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.safety_reference_families",
      "note.apple_freshness_choice",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_ordinary_cooking_care_cue",
    key: "ordinary_cooking_care_cue",
    title: "Ordinary Cooking Care Cue",
    summary: "Let one already-planned kitchen action become the ritual cue without adding a recipe.",
    ritualStyles: ["kitchen", "ordinary_cooking", "simple_food", "home_tending"],
    capacityModes: ["steady"],
    defaultDurationMinutes: 15,
    materials: ["one already-planned ordinary kitchen action"],
    steps: [
      "Choose a kitchen action already planned and safe for the household.",
      "Name the kind of care it is already providing.",
      "Stop before adding new ingredients, steps, or cleanup.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      allergies: ["use only foods already known to fit the household"],
      cleanupBurden: "low",
    }),
    safetyNotes: [
      "Normal food safety, allergy fit, and cleanup burden override symbolism.",
      "No recipes, health claims, essential oils, supplements, or unfamiliar ingredients.",
    ],
    avoidIf: [
      "avoid if no ordinary kitchen action is already planned",
      "avoid if food safety, allergies, or cleanup burden are uncertain",
    ],
    capacityGuidance: {
      steady: "Only use a kitchen action already happening; do not add a new recipe.",
    },
    toneGuidance: ["ordinary", "caring", "non-performative"],
    burdenAvoidFlags: ["shopping_required", "heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid recipes, unfamiliar ingredients, health claims, and heavy cleanup"],
    sourceNoteKeys: [
      "note.ordinary_cooking_as_care",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.poison_control_essential_oil_block",
    ],
    generatorUseNotes: ["Use only when a familiar kitchen action already fits capacity and food safety."],
    audienceFit: ["household", "together"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.poison_control",
      "source.safety_reference_families",
      "note.ordinary_cooking_as_care",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.poison_control_essential_oil_block",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_kitchen_reset",
    key: "kitchen_reset",
    title: "Kitchen Reset",
    summary: "Reset one small kitchen area so care feels easier and less noisy.",
    ritualStyles: ["kitchen", "home_tending", "surface_reset"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 10,
    materials: ["one counter, sink area, or table section", "ordinary cleaning supplies already nearby"],
    steps: [
      "Choose one small kitchen zone.",
      "Put away or discard one obvious thing.",
      "Wipe only if the safe supplies are already nearby.",
      "Stop before it becomes a full kitchen cleanup.",
    ],
    presentation: {
      invitation: "Quiet one kitchen corner.",
      whyThisPractice: "A small kitchen reset can make care easier without asking for a whole cleanup.",
      approach: [
        "Choose one zone and keep the ritual there.",
        "Let freshness mean less noise, not more work.",
      ],
      steps: [
        "Choose one counter, sink edge, or table section.",
        "Put away or discard one obvious thing.",
        "Wipe only if the supplies are already there.",
      ],
      carry: "What kind of care becomes easier when this one kitchen place is quieter?",
      closing: "Close by leaving the rest of the kitchen outside the ritual.",
    },
    safetyFlags: withSafetyOverrides({
      cleanupBurden: "low",
    }),
    safetyNotes: [
      "Use ordinary cleaning safety and ventilation.",
      "Do not mix cleaning products or add scents, oils, smoke, or special supplies.",
    ],
    avoidIf: [
      "avoid if it would become heavy cleanup",
      "avoid if cleaning products or ventilation are uncertain",
      "avoid if the kitchen needs repair or food-safety action instead of a ritual frame",
    ],
    capacityGuidance: {
      low: "One small kitchen zone only.",
      steady: "A small counter, sink, or table section can be reset under twenty minutes.",
    },
    toneGuidance: ["practical", "fresh", "finite"],
    burdenAvoidFlags: ["heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid mixing products, strong scents, or food-safety claims"],
    sourceNoteKeys: ["note.kitchen_magic_normal_use", "note.home_tending_small_enough", "note.air_reset_without_smoke"],
    generatorUseNotes: ["Good for kitchen, waning, and practical-tending signals."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.cdc_cleaning_safety",
      "source.epa_household_air",
      "source.safety_reference_families",
      "note.kitchen_magic_normal_use",
      "note.home_tending_small_enough",
      "note.air_reset_without_smoke",
      "note.safety_overrides_symbolism",
      "docs/source-ingestion-plan.md#batch-7--kitchen-plant-and-light-starter-set",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_return_one_object",
    key: "return_one_object",
    title: "Return One Object",
    summary: "Put one out-of-place object back where it belongs and let that be enough.",
    ritualStyles: ["home_tending", "surface_reset", "low_woo"],
    capacityModes: ["pause", "low"],
    defaultDurationMinutes: 2,
    materials: ["one object already in the home"],
    steps: [
      "Choose one object that has an obvious home.",
      "Return it there.",
      "Let the small return count without looking for another task.",
    ],
    safetyFlags: withSafetyOverrides({ cleanupBurden: "tiny" }),
    safetyNotes: ["Do not move heavy, sharp, hot, fragile, or unsafe items."],
    avoidIf: ["avoid if choosing the object would turn into tidying the room"],
    capacityGuidance: {
      pause: "One return can be the whole practice.",
      low: "Keep it under two minutes.",
    },
    toneGuidance: ["tiny", "relieving", "non-demanding"],
    burdenAvoidFlags: ["heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid heavy or unsafe objects"],
    sourceNoteKeys: ["note.home_tending_small_enough"],
    generatorUseNotes: ["Good alternate for new or waning moon when capacity is very low."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.cheryl_mendelson",
      "source.safety_reference_families",
      "note.home_tending_small_enough",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_soften_one_corner",
    key: "soften_one_corner",
    title: "Soften One Corner",
    summary: "Adjust one small corner so it feels easier to enter or rest near.",
    ritualStyles: ["home_tending", "atmosphere", "low_woo"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 8,
    materials: ["one existing blanket, chair, lamp, or cleared spot"],
    steps: [
      "Choose one corner or small area.",
      "Remove one thing that adds visual noise.",
      "Adjust one existing comfort cue, such as a blanket, chair, or lamp.",
      "Stop when the corner feels a little easier.",
    ],
    safetyFlags: withSafetyOverrides({ cleanupBurden: "low" }),
    safetyNotes: ["Keep walkways clear and do not move heavy furniture."],
    avoidIf: ["avoid if it would require shopping, lifting, candles, oils, or fragrance"],
    capacityGuidance: {
      low: "Make one small adjustment only.",
      steady: "Use existing objects to soften one area under twenty minutes.",
    },
    toneGuidance: ["warm", "domestic", "rest-friendly"],
    burdenAvoidFlags: ["shopping_required", "heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid heavy moving and special supplies"],
    sourceNoteKeys: ["note.home_atmosphere_without_overclaim", "note.home_tending_small_enough"],
    generatorUseNotes: ["Good for warmth and beauty themes without requiring flame."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.tess_whitehurst",
      "source.cheryl_mendelson",
      "source.safety_reference_families",
      "note.home_atmosphere_without_overclaim",
      "note.home_tending_small_enough",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_window_open_air_reset",
    key: "window_open_air_reset",
    title: "Window Open-Air Reset",
    summary: "Use a safe window or fresh-air cue to mark a small reset without smoke or fragrance.",
    ritualStyles: ["home_tending", "air", "seasonal", "low_woo"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["a safe window or doorway if conditions fit"],
    steps: [
      "Check that weather, air quality, pets, children, and security make opening a window reasonable.",
      "Open the window briefly, or stand near natural air or light if opening it is not a fit.",
      "Name one thing the household can let feel a little fresher.",
      "Close the window if it should not stay open.",
    ],
    safetyFlags: withSafetyOverrides({ cleanupBurden: "tiny" }),
    safetyNotes: [
      "Do not open windows when air quality, weather, pets, children, security, or allergies make it a poor fit.",
      "No smoke, fragrance, oils, or cleansing-air claims.",
    ],
    avoidIf: ["avoid if open air is unsafe, irritating, or impractical"],
    capacityGuidance: {
      low: "Use a window or light cue for five minutes or less.",
      steady: "Can pair with a small room reset if conditions fit.",
    },
    toneGuidance: ["fresh", "plain", "unscented"],
    burdenAvoidFlags: ["smoke", "elaborate_setup"],
    contraindications: ["avoid smoke, fragrance, poor air quality, unsafe windows, and allergy triggers"],
    sourceNoteKeys: ["note.air_reset_without_smoke"],
    generatorUseNotes: ["Use for freshness and seasonal signals without smoke defaults."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.epa_household_air",
      "source.safety_reference_families",
      "note.air_reset_without_smoke",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_bed_blanket_rest_cue",
    key: "bed_blanket_rest_cue",
    title: "Bed or Blanket Rest Cue",
    summary: "Make one rest cue easier without turning rest into another task.",
    ritualStyles: ["home_tending", "rest", "low_woo"],
    capacityModes: ["pause", "low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["bed, blanket, pillow, or resting spot already in use"],
    steps: [
      "Choose one rest spot.",
      "Smooth a blanket, move one item away, or place the pillow where it belongs.",
      "Say that rest is allowed to be simple.",
    ],
    presentation: {
      invitation: "Let one rest cue become easier.",
      whyThisPractice: "A bed, blanket, or pillow can remind the body that the home has a place to land.",
      approach: [
        "Keep the action close to the rest spot.",
        "Do not turn rest into something to earn.",
      ],
      steps: [
        "Choose one blanket, pillow, or resting place.",
        "Make one small adjustment that makes it easier to use.",
      ],
      carry: "What would help rest feel less like another thing to manage?",
      closing: "Close by leaving the rest spot ready and walking away from any extra fixing.",
      variants: {
        pause: {
          steps: [
            "Let the ritual be noticing the rest spot.",
            "Change nothing unless one small adjustment would genuinely ease it.",
          ],
          carry: "Where can the body land without earning it?",
          closing: "Close by letting the rest cue stay simple.",
        },
      },
    },
    safetyFlags: lowRiskRitualSafetyFlags,
    safetyNotes: ["Do not move heavy furniture or make sleep, health, or recovery claims."],
    avoidIf: ["avoid if the prompt would make rest feel like a performance"],
    capacityGuidance: {
      pause: "Rest is the practice.",
      low: "One blanket or pillow cue is enough.",
      steady: "Reset one rest spot without changing the room.",
    },
    toneGuidance: ["restful", "permission-giving", "soft"],
    burdenAvoidFlags: ["emotionally_heavy", "heavy_cleanup"],
    contraindications: ["avoid health claims and sleep guarantees"],
    sourceNoteKeys: ["note.home_tending_attention_care"],
    generatorUseNotes: ["Good for waning moon, pause capacity, and rest themes."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.shoukei_matsumoto",
      "source.safety_reference_families",
      "note.home_tending_attention_care",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_shared_space_reset",
    key: "shared_space_reset",
    title: "Shared-Space Reset",
    summary: "Make one shared spot easier for the next ordinary use.",
    ritualStyles: ["home_tending", "shared_space", "table_reset"],
    capacityModes: ["steady", "high"],
    defaultDurationMinutes: 15,
    materials: ["one shared surface or sitting area"],
    steps: [
      "Choose one shared spot.",
      "Remove only what clearly belongs elsewhere.",
      "Leave one practical cue for the next use, such as a clear seat or open surface.",
      "Stop before discussing every shared-space issue.",
    ],
    safetyFlags: withSafetyOverrides({ cleanupBurden: "medium" }),
    safetyNotes: ["Keep the action practical and do not turn it into a heavy conversation."],
    avoidIf: ["avoid if it would become conflict, deep cleaning, or furniture moving"],
    capacityGuidance: {
      steady: "One shared spot under twenty minutes.",
      high: "Can be active, but still one primary reset.",
    },
    toneGuidance: ["shared", "practical", "low-drama"],
    burdenAvoidFlags: ["heavy_cleanup", "emotionally_heavy"],
    contraindications: ["avoid forced relationship processing"],
    sourceNoteKeys: ["note.home_tending_small_enough", "note.home_atmosphere_without_overclaim"],
    generatorUseNotes: ["Good for together recommendations and full moon acknowledgement."],
    audienceFit: ["household", "together"],
    sourceReferences: [
      "source.cheryl_mendelson",
      "source.tess_whitehurst",
      "source.safety_reference_families",
      "note.home_tending_small_enough",
      "note.home_atmosphere_without_overclaim",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_small_repair",
    key: "small_repair",
    title: "Make One Thing Easier",
    summary: "Do one small practical repair or adjustment that makes daily use easier.",
    ritualStyles: ["home_tending", "small_repair", "structured_action"],
    capacityModes: ["steady", "high"],
    defaultDurationMinutes: 20,
    materials: ["ordinary household item already safe to adjust"],
    steps: [
      "Choose one small nuisance with an obvious safe fix.",
      "Make only the easy adjustment, such as tightening, labeling, replacing, or moving something light.",
      "Stop before it becomes a repair project.",
    ],
    safetyFlags: withSafetyOverrides({ cleanupBurden: "low" }),
    safetyNotes: [
      "Do not do electrical, plumbing, ladder, sharp-tool, heavy, or safety-critical repairs as ritual.",
    ],
    avoidIf: ["avoid if the fix requires tools, expertise, shopping, or safety judgment"],
    capacityGuidance: {
      steady: "Only an obvious small fix under twenty minutes.",
      high: "A more active fix is fine if it remains safe and bounded.",
    },
    toneGuidance: ["competent", "bounded", "practical"],
    burdenAvoidFlags: ["shopping_required", "heavy_cleanup", "elaborate_setup"],
    contraindications: ["avoid safety-critical repairs and unfamiliar tools"],
    sourceNoteKeys: ["note.home_tending_small_enough"],
    generatorUseNotes: ["Good for structured-action profile themes and Mars/Capricorn-style signals."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.cheryl_mendelson",
      "source.safety_reference_families",
      "note.home_tending_small_enough",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_end_of_week_closing",
    key: "end_of_week_closing",
    title: "End-of-Week Closing",
    summary: "Close one small loop from the week and leave the rest for later.",
    ritualStyles: ["home_tending", "reflection", "closing"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 10,
    materials: ["nothing required"],
    steps: [
      "Name one thing from the week that is complete enough.",
      "Put away, delete, or set down one small reminder if that is easy.",
      "Name one thing that can wait.",
    ],
    safetyFlags: withSafetyOverrides({ emotionalIntensity: "low", cleanupBurden: "tiny" }),
    safetyNotes: ["Keep reflection concrete and do not review the whole week if that feels heavy."],
    avoidIf: ["avoid if weekly review would feel emotionally heavy"],
    capacityGuidance: {
      low: "One closed loop and one thing allowed to wait.",
      steady: "Can include a small physical closing action under twenty minutes.",
    },
    toneGuidance: ["settling", "complete-enough", "gentle"],
    burdenAvoidFlags: ["emotionally_heavy", "long_journaling"],
    contraindications: ["avoid heavy review or journaling requirements"],
    sourceNoteKeys: ["note.home_tending_attention_care", "note.waning_moon_clear_and_rest"],
    generatorUseNotes: ["Good for waning moon and end-of-week timing."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.shoukei_matsumoto",
      "source.rachel_patterson_moon",
      "source.safety_reference_families",
      "note.home_tending_attention_care",
      "note.waning_moon_clear_and_rest",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_seasonal_table_home_reset",
    key: "seasonal_table_home_reset",
    title: "Seasonal Table or Home Reset",
    summary: "Mark a seasonal shift with one ordinary object, surface, or cleared spot.",
    ritualStyles: ["seasonal", "table_reset", "home_tending", "threshold_reset"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 10,
    materials: ["one ordinary household object or small surface already available"],
    steps: [
      "Choose one table, shelf, threshold, or small home spot.",
      "Clear or place one ordinary object that already belongs in the home.",
      "Name the seasonal shift in plain words, then stop before adding decor or tasks.",
    ],
    presentation: {
      invitation: "Let the season touch one ordinary place.",
      whyThisPractice: "A seasonal shift can be marked by one small change inside the home, not a whole display.",
      approach: [
        "Use what already belongs here.",
        "Let the season be noticed, not performed.",
      ],
      steps: [
        "Choose one table, shelf, threshold, or small home spot.",
        "Clear or place one ordinary object that fits the season in plain words.",
        "Name the shift and stop before it becomes decorating.",
      ],
      carry: "What is this season asking this home to make room for?",
      closing: "Close by letting one ordinary place carry the seasonal note.",
    },
    safetyFlags: withSafetyOverrides({ cleanupBurden: "low" }),
    safetyNotes: [
      "Use only ordinary items already safe and available.",
      "Do not add flame, smoke, scent, food handling, shopping, or outdoor activity by default.",
    ],
    avoidIf: [
      "avoid if it would become decorating, shopping, deep cleaning, or a festival script",
    ],
    capacityGuidance: {
      low: "One object or one cleared spot is enough.",
      steady: "A small table, threshold, or home reset can stay under twenty minutes.",
    },
    toneGuidance: ["seasonal", "domestic", "plain", "low-pressure"],
    burdenAvoidFlags: ["shopping_required", "heavy_cleanup", "elaborate_setup"],
    contraindications: [
      "avoid decor pressure, copied seasonal rituals, culturally flattened festival language, and unsafe objects",
    ],
    sourceNoteKeys: [
      "note.seasonal_table_home_reset",
      "note.almanac_context_not_authority",
      "note.safety_overrides_symbolism",
    ],
    generatorUseNotes: [
      "Use when a seasonal anchor or home-transition signal should become one practical domestic marker.",
    ],
    audienceFit: ["household", "either", "together"],
    sourceReferences: [
      "source.anna_franklin_seasonal_home",
      "source.temperance_alden_seasonal_practice",
      "source.old_farmers_almanac_context",
      "source.safety_reference_families",
      "note.seasonal_table_home_reset",
      "note.almanac_context_not_authority",
      "note.safety_overrides_symbolism",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_morning_light_pause",
    key: "morning_light_pause",
    title: "Morning Light Pause",
    summary: "Use ordinary morning light as a brief focus cue without requiring a candle.",
    ritualStyles: ["light_focus", "candle_or_light", "reflection", "low_woo"],
    capacityModes: ["pause", "low"],
    defaultDurationMinutes: 3,
    materials: ["safe natural light or ordinary room light"],
    steps: [
      "Stand or sit near safe natural light or turn on one ordinary light.",
      "Let the light mark one small focus for the day.",
      "Move on without adding another step.",
    ],
    presentation: {
      invitation: "Let ordinary light mark the next small thing.",
      whyThisPractice: "Light can give attention a shape without requiring flame, setup, or a long pause.",
      approach: [
        "Use the light already available.",
        "Keep the focus small enough to leave with you.",
      ],
      steps: [
        "Stand or sit near natural light, or turn on one ordinary light.",
        "Name the one thing the light can help you notice.",
        "Move on before this becomes a plan.",
      ],
      carry: "What can the light clarify without asking you to solve it now?",
      closing: "Close by turning away from the light and carrying only the focus.",
      variants: {
        pause: {
          steps: [
            "Let ordinary light be enough.",
            "Notice one small focus, then move on.",
          ],
          carry: "What is clear enough for one breath?",
          closing: "Close by leaving the light as it is.",
        },
      },
    },
    safetyFlags: withSafetyOverrides({ fire: "led_or_no_flame", cleanupBurden: "tiny" }),
    safetyNotes: ["No live flame, smoke, oils, or sun-exposure claims are required."],
    avoidIf: ["avoid if light sensitivity or privacy makes this a poor fit"],
    capacityGuidance: {
      pause: "One light cue is enough.",
      low: "Keep the pause under three minutes.",
    },
    toneGuidance: ["clear", "gentle", "simple"],
    burdenAvoidFlags: ["live_flame", "smoke", "elaborate_setup"],
    contraindications: ["avoid sun, health, or energy claims"],
    sourceNoteKeys: ["note.light_focus_optional_flame"],
    generatorUseNotes: ["Good fire-free alternative to candle focus."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.nfpa_fire_safety",
      "source.safety_reference_families",
      "note.light_focus_optional_flame",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_prune_one_dead_leaf",
    key: "prune_one_dead_leaf",
    title: "Prune One Dead Leaf",
    summary: "Remove one dead leaf as a small plant-tending and release practice.",
    ritualStyles: ["plant", "plant_tending", "home_tending"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["one household plant", "clean hands or ordinary safe scissors if already appropriate"],
    steps: [
      "Choose one reviewed household plant.",
      "Check soil, leaves, light, and pet access before acting.",
      "Remove one dead leaf only if it comes away safely.",
      "Throw it away or compost it in the normal household way.",
    ],
    safetyFlags: withSafetyOverrides({
      pets: "review_required",
      children: "supervision",
      allergies: ["use only with plants reviewed for household allergies and handling safety"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Keep plant material away from pets and children unless reviewed safe.",
      "Do not use sharp tools unless they are ordinary and safe for the household.",
    ],
    avoidIf: ["avoid if plant safety, pet access, or tool safety is uncertain"],
    capacityGuidance: {
      low: "One leaf only.",
      steady: "Can pair with checking soil or light.",
    },
    toneGuidance: ["attentive", "finite", "gentle"],
    burdenAvoidFlags: ["heavy_cleanup"],
    contraindications: ["avoid toxic plants and unreviewed pet access"],
    sourceNoteKeys: [
      "note.plant_tending_check_first",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    generatorUseNotes: ["Good plant-specific waning or waxing option."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.plant_tending_check_first",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_rotate_plant_for_light",
    key: "rotate_plant_for_light",
    title: "Rotate a Plant for Light",
    summary: "Move or rotate one plant only if it is safe, light, and actually needs the change.",
    ritualStyles: ["plant", "plant_tending", "light_focus"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["one light, safe-to-move household plant"],
    steps: [
      "Choose one plant that is safe to touch and light enough to move.",
      "Check the leaves, soil, light, and pet access before acting.",
      "Rotate it slightly or move it to a safer light spot only if that is clearly useful.",
    ],
    safetyFlags: withSafetyOverrides({
      pets: "review_required",
      children: "supervision",
      allergies: ["use only with plants reviewed for household allergies and handling safety"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Do not move heavy planters.",
      "Keep plants away from unsafe pet or child access unless reviewed safe.",
    ],
    avoidIf: ["avoid heavy pots, unstable shelves, toxic plants, or uncertain light needs"],
    capacityGuidance: {
      low: "One small rotation only.",
      steady: "A short light adjustment can pair with plant observation.",
    },
    toneGuidance: ["attentive", "practical", "light-aware"],
    burdenAvoidFlags: ["heavy_cleanup"],
    contraindications: ["avoid heavy lifting and unreviewed plant safety"],
    sourceNoteKeys: [
      "note.plant_tending_check_first",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    generatorUseNotes: ["Use when plant and light signals overlap."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.plant_tending_check_first",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_salt_boundary_bowl",
    key: "salt_boundary_bowl",
    title: "Salt Boundary Bowl",
    summary: "Use ordinary salt as a small symbolic boundary cue, not as cleansing or protection from danger.",
    ritualStyles: ["kitchen", "salt", "boundary", "low_woo"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["a pinch of ordinary household salt", "small dish"],
    steps: [
      "Place a pinch of ordinary salt in a small dish.",
      "Name one boundary for attention, such as what does not need focus tonight.",
      "Throw the salt away later in the normal household way.",
    ],
    safetyFlags: withSafetyOverrides({ ingestion: "normal_food_use_only", pets: "keep_away", children: "supervision", cleanupBurden: "tiny" }),
    safetyNotes: [
      "Keep salt away from pets and children.",
      "Normal household use only; no ingestion instruction or protection claim.",
    ],
    avoidIf: ["avoid if pets or children may access the salt"],
    capacityGuidance: {
      low: "A single pinch and one boundary sentence.",
      steady: "Can pair with a threshold or table reset.",
    },
    toneGuidance: ["plain", "bounded", "symbolic"],
    burdenAvoidFlags: ["shopping_required", "heavy_cleanup"],
    contraindications: ["avoid protection-from-danger claims and pet access"],
    sourceNoteKeys: ["note.kitchen_magic_normal_use", "note.ingredient_symbolism_cross_check"],
    generatorUseNotes: ["Use for boundary symbolism when food/pet safety fits."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.scott_cunningham_cross_check",
      "source.safety_reference_families",
      "note.kitchen_magic_normal_use",
      "note.ingredient_symbolism_cross_check",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_lemon_freshness_cue",
    key: "lemon_freshness_cue",
    title: "Lemon Freshness Cue",
    summary: "Use ordinary lemon already in the kitchen as a freshness symbol without scent, cleaning, or health claims.",
    ritualStyles: ["kitchen", "lemon", "freshness", "low_woo"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["ordinary lemon already safe and available"],
    steps: [
      "Use a lemon already in the kitchen only if it fits normal household use.",
      "Notice its brightness or freshness as a cue.",
      "Return it to normal kitchen use or dispose of it normally if it is spent.",
    ],
    safetyFlags: withSafetyOverrides({ ingestion: "normal_food_use_only", allergies: ["use only if citrus is already safe for the household"], cleanupBurden: "tiny" }),
    safetyNotes: [
      "Normal food use only.",
      "Do not use lemon for health, cleaning, skin, pet, or strong-scent claims.",
    ],
    avoidIf: ["avoid if citrus, scent, skin, pet, or food safety is uncertain"],
    capacityGuidance: {
      low: "Use as a simple noticing cue.",
      steady: "Can pair with a small kitchen reset.",
    },
    toneGuidance: ["fresh", "clear", "ordinary"],
    burdenAvoidFlags: ["shopping_required", "elaborate_setup"],
    contraindications: ["avoid citrus sensitivity, skin use, and cleaning claims"],
    sourceNoteKeys: ["note.kitchen_magic_normal_use", "note.food_herb_safety_override", "note.ingredient_symbolism_cross_check"],
    generatorUseNotes: ["Use for clarity/freshness symbolism only when normal kitchen use fits."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.scott_cunningham_cross_check",
      "source.fda_food_safety",
      "source.safety_reference_families",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.ingredient_symbolism_cross_check",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_rosemary_kitchen_memory",
    key: "rosemary_kitchen_memory",
    title: "Rosemary Kitchen Memory Cue",
    summary: "Use rosemary only as a normal kitchen herb already safe for the household, with memory as a symbolic accent.",
    ritualStyles: ["kitchen", "herb", "rosemary", "reflection"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 5,
    materials: ["ordinary rosemary already used safely in the household"],
    steps: [
      "Use rosemary only if it is already normal and safe in the household kitchen.",
      "Let it cue one useful memory, such as what the household already knows how to do.",
      "Return it to ordinary kitchen use.",
    ],
    safetyFlags: withSafetyOverrides({ ingestion: "normal_food_use_only", essentialOils: "none", pets: "review_required", allergies: ["use only if rosemary is already safe for the household"], cleanupBurden: "tiny" }),
    safetyNotes: [
      "Normal food use only; no medicinal claims.",
      "No essential oils, supplements, smoke, or pet-access assumptions.",
    ],
    avoidIf: ["avoid if herb, allergy, pregnancy, pet, or food safety is uncertain"],
    capacityGuidance: {
      low: "Use as a brief kitchen-memory cue.",
      steady: "Can pair with a warm drink or kitchen reset when safe.",
    },
    toneGuidance: ["remembering", "practical", "kitchen-safe"],
    burdenAvoidFlags: ["shopping_required", "smoke"],
    contraindications: ["avoid medicinal claims, essential oils, smoke, and unreviewed pet access"],
    sourceNoteKeys: ["note.kitchen_magic_normal_use", "note.food_herb_safety_override", "note.pet_plant_access_review", "note.ingredient_symbolism_cross_check"],
    generatorUseNotes: ["Use only as a normal kitchen-use herb cue."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.scott_cunningham_cross_check",
      "source.fda_food_safety",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.kitchen_magic_normal_use",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
      "note.ingredient_symbolism_cross_check",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_houseplant_check_in",
    key: "houseplant_check_in",
    title: "Houseplant Check-In",
    summary: "Check one reviewed houseplant as a tiny observation and care cue.",
    ritualStyles: ["plant", "plant_tending", "houseplant", "home_tending"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["one reviewed household plant"],
    steps: [
      "Choose one houseplant only if it is safe for the household to approach.",
      "Check soil, leaves, light, and pet access before touching anything.",
      "Do one tiny care action, or simply stop after noticing what is needed.",
    ],
    safetyFlags: withSafetyOverrides({
      pets: "review_required",
      children: "supervision",
      allergies: ["use only with plants reviewed for household allergies and handling safety"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Pet, child, allergy, and plant safety review come before contact.",
      "Choose observation without touching when plant safety is uncertain.",
    ],
    avoidIf: ["avoid contact if plant toxicity, allergies, or pet access are uncertain"],
    capacityGuidance: {
      low: "One plant check, three minutes or less.",
      steady: "One reviewed plant can receive one practical care action.",
    },
    toneGuidance: ["attentive", "practical", "gentle"],
    burdenAvoidFlags: ["heavy_cleanup", "shopping_required"],
    contraindications: ["avoid unreviewed plant contact, heavy planters, and unsafe pet access"],
    sourceNoteKeys: [
      "note.houseplant_observation_first",
      "note.plant_tending_check_first",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    generatorUseNotes: ["Use as a compact plant option when broader plant tending would be too much."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.houseplant_observation_first",
      "note.plant_tending_check_first",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_basil_kitchen_warmth_cue",
    key: "basil_kitchen_warmth_cue",
    title: "Basil Kitchen Warmth Cue",
    summary: "Use basil as an ordinary kitchen-herb cue for welcome and household warmth.",
    ritualStyles: ["kitchen", "herb", "basil", "warmth"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["ordinary basil already safe in the household"],
    steps: [
      "Use basil only if it is already ordinary and safe in the household kitchen.",
      "Let it cue one welcoming action, such as clearing a spot or setting out a cup.",
      "Return it to normal kitchen use.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      pets: "review_required",
      pregnancy: "review_required",
      allergies: ["use only if basil is already safe for the household"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Normal food use only; no medicinal claims.",
      "No essential oils, supplements, smoke, or pet-access assumptions.",
    ],
    avoidIf: ["avoid if herb, allergy, pregnancy, pet, or food safety is uncertain"],
    capacityGuidance: {
      low: "Use as a brief warmth cue.",
      steady: "Can pair with one small kitchen-tending action.",
    },
    toneGuidance: ["warm", "welcoming", "kitchen-safe"],
    burdenAvoidFlags: ["shopping_required", "smoke", "elaborate_setup"],
    contraindications: ["avoid medicinal claims, essential oils, smoke, and unreviewed pet access"],
    sourceNoteKeys: [
      "note.basil_kitchen_warmth",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    generatorUseNotes: ["Use only as a normal kitchen-use herb cue."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.basil_kitchen_warmth",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_mint_freshness_cue",
    key: "mint_freshness_cue",
    title: "Mint Freshness Cue",
    summary: "Use mint as an ordinary kitchen-herb cue for freshness and one clear next step.",
    ritualStyles: ["kitchen", "herb", "mint", "freshness"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["ordinary mint already safe in the household"],
    steps: [
      "Use mint only if it is already ordinary and safe in the household kitchen.",
      "Let it cue one small thing that can feel fresher or clearer.",
      "Return it to normal kitchen use.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      pets: "review_required",
      pregnancy: "review_required",
      allergies: ["use only if mint is already safe for the household"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Normal food use only; no digestive, energy, or medicinal claims.",
      "No essential oils, supplements, smoke, or pet-access assumptions.",
    ],
    avoidIf: ["avoid if herb, allergy, pregnancy, pet, or food safety is uncertain"],
    capacityGuidance: {
      low: "Use as a brief freshness cue.",
      steady: "Can pair with clearing one small kitchen item.",
    },
    toneGuidance: ["fresh", "light", "clear"],
    burdenAvoidFlags: ["shopping_required", "smoke", "elaborate_setup"],
    contraindications: ["avoid therapeutic claims, essential oils, smoke, and unreviewed pet access"],
    sourceNoteKeys: [
      "note.mint_freshness_clear",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    generatorUseNotes: ["Use only as a normal kitchen-use herb cue."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.mint_freshness_clear",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_thyme_steady_care_cue",
    key: "thyme_steady_care_cue",
    title: "Thyme Steady Care Cue",
    summary: "Use thyme as an ordinary kitchen-herb cue for steadiness and one bounded practical action.",
    ritualStyles: ["kitchen", "herb", "thyme", "steady_care"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["ordinary thyme already safe in the household"],
    steps: [
      "Use thyme only if it is already ordinary and safe in the household kitchen.",
      "Let it cue one steady, bounded household action.",
      "Return it to normal kitchen use.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      pets: "review_required",
      pregnancy: "review_required",
      allergies: ["use only if thyme is already safe for the household"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Normal food use only; no medicinal or endurance claims.",
      "No essential oils, supplements, smoke, or pet-access assumptions.",
    ],
    avoidIf: ["avoid if herb, allergy, pregnancy, pet, or food safety is uncertain"],
    capacityGuidance: {
      low: "Use as a brief steady-care cue.",
      steady: "Can pair with making one household detail easier.",
    },
    toneGuidance: ["steady", "patient", "practical"],
    burdenAvoidFlags: ["shopping_required", "smoke", "elaborate_setup"],
    contraindications: ["avoid medicinal claims, essential oils, smoke, and unreviewed pet access"],
    sourceNoteKeys: [
      "note.thyme_steady_care",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
      "note.ingredient_symbolism_cross_check",
    ],
    generatorUseNotes: ["Use only as a normal kitchen-use herb cue."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.scott_cunningham_cross_check",
      "source.fda_food_safety",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.thyme_steady_care",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
      "note.ingredient_symbolism_cross_check",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_sage_clear_reflection_cue",
    key: "sage_clear_reflection_cue",
    title: "Sage Clear Reflection Cue",
    summary: "Use sage as an ordinary kitchen-herb cue for clear reflection without smoke.",
    ritualStyles: ["kitchen", "herb", "sage", "reflection"],
    capacityModes: ["low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["ordinary sage already safe in the household"],
    steps: [
      "Use sage only if it is already ordinary and safe in the household kitchen.",
      "Let it cue one clear thought or one ordinary next step.",
      "Return it to normal kitchen use.",
    ],
    safetyFlags: withSafetyOverrides({
      ingestion: "normal_food_use_only",
      pets: "review_required",
      pregnancy: "review_required",
      allergies: ["use only if sage is already safe for the household"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Normal food use only; no medicinal claims.",
      "No essential oils, supplements, smoke, burned herb practices, or pet-access assumptions.",
    ],
    avoidIf: ["avoid if herb, allergy, pregnancy, pet, cultural, or food safety is uncertain"],
    capacityGuidance: {
      low: "Use as a brief clear-reflection cue.",
      steady: "Can pair with writing one practical next step.",
    },
    toneGuidance: ["clear", "plain", "careful"],
    burdenAvoidFlags: ["shopping_required", "smoke", "elaborate_setup"],
    contraindications: ["avoid smoke practices, medicinal claims, essential oils, and unreviewed pet access"],
    sourceNoteKeys: [
      "note.sage_clear_reflection_no_smoke",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
      "note.ingredient_symbolism_cross_check",
    ],
    generatorUseNotes: ["Use only as a normal kitchen-use herb cue with smoke practices excluded."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.scott_cunningham_cross_check",
      "source.fda_food_safety",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.sage_clear_reflection_no_smoke",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
      "note.ingredient_symbolism_cross_check",
    ],
    approvalStatus: "approved",
  },
  {
    id: "ritual_pattern_lavender_soft_rest_cue",
    key: "lavender_soft_rest_cue",
    title: "Lavender Soft Rest Cue",
    summary: "Use lavender as an ordinary household cue for softness and rest without health claims.",
    ritualStyles: ["herb", "lavender", "rest", "home_tending"],
    capacityModes: ["pause", "low", "steady"],
    defaultDurationMinutes: 3,
    materials: ["safe lavender label, image, or already reviewed household item"],
    steps: [
      "Use a scent-free cue unless lavender contact and scent are already safe for the household.",
      "Let it mark one permission to lower intensity.",
      "Stop there without adding another task.",
    ],
    safetyFlags: withSafetyOverrides({
      pets: "review_required",
      pregnancy: "review_required",
      allergies: ["use only if lavender scent and contact are safe for the household"],
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "No sleep, calm, anxiety, or health claims.",
      "No essential oils, supplements, smoke, or pet-access assumptions.",
    ],
    avoidIf: ["avoid scent or plant contact if allergy, pregnancy, pet, or household fit is uncertain"],
    capacityGuidance: {
      pause: "A visual cue and one breath are enough.",
      low: "Use as a brief rest cue.",
      steady: "Can pair with a close-the-evening practice.",
    },
    toneGuidance: ["soft", "restful", "non-demanding"],
    burdenAvoidFlags: ["shopping_required", "smoke", "elaborate_setup"],
    contraindications: ["avoid scent, essential oils, health claims, and unreviewed pet access"],
    sourceNoteKeys: [
      "note.lavender_soft_rest_cue",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    generatorUseNotes: ["Use as a rest-oriented herb cue; prefer visual or no-contact options by default."],
    audienceFit: ["household", "either"],
    sourceReferences: [
      "source.laurel_woodward",
      "source.fda_food_safety",
      "source.aspca_plant_safety",
      "source.vca_pet_plant_safety",
      "source.safety_reference_families",
      "note.lavender_soft_rest_cue",
      "note.food_herb_safety_override",
      "note.pet_plant_access_review",
      "note.vca_pet_plant_allergy_guardrail",
    ],
    approvalStatus: "approved",
  },
];

function hasRequiredString(value: string): boolean {
  return value.trim().length > 0;
}

function hasAllowedCapacityMode(value: CapacityMode): boolean {
  return CAPACITY_MODES.includes(value);
}

function validatePresentationPart({
  patternId,
  label,
  value,
  errors,
}: {
  patternId: string;
  label: string;
  value: string | undefined;
  errors: string[];
}): void {
  if (!value || !hasRequiredString(value)) {
    errors.push(`${patternId}: presentation ${label} is required`);
    return;
  }

  if (value.length > MAX_PRESENTATION_FIELD_LENGTH) {
    errors.push(`${patternId}: presentation ${label} must stay concise`);
  }
}

function validatePresentationList({
  patternId,
  label,
  values,
  errors,
}: {
  patternId: string;
  label: string;
  values: string[] | undefined;
  errors: string[];
}): void {
  if (!values || values.length === 0) {
    errors.push(`${patternId}: presentation ${label} is required`);
    return;
  }

  if (values.length > MAX_PRESENTATION_LIST_ITEMS) {
    errors.push(`${patternId}: presentation ${label} has too many items`);
  }

  for (const value of values) {
    validatePresentationPart({ patternId, label, value, errors });
  }
}

function validatePresentation(
  pattern: RitualPattern,
  errors: string[],
): void {
  const presentation = pattern.presentation;

  if (!presentation) {
    return;
  }

  validatePresentationPart({
    patternId: pattern.id,
    label: "invitation",
    value: presentation.invitation,
    errors,
  });
  validatePresentationPart({
    patternId: pattern.id,
    label: "whyThisPractice",
    value: presentation.whyThisPractice,
    errors,
  });
  validatePresentationList({
    patternId: pattern.id,
    label: "approach",
    values: presentation.approach,
    errors,
  });
  validatePresentationList({
    patternId: pattern.id,
    label: "steps",
    values: presentation.steps,
    errors,
  });
  validatePresentationPart({
    patternId: pattern.id,
    label: "carry",
    value: presentation.carry,
    errors,
  });
  validatePresentationPart({
    patternId: pattern.id,
    label: "closing",
    value: presentation.closing,
    errors,
  });

  const instructions = [
    presentation.invitation,
    presentation.whyThisPractice,
    ...presentation.approach,
    ...presentation.steps,
    presentation.carry,
    presentation.closing,
    ...Object.values(presentation.variants ?? {}).flatMap((variant) => [
      variant.invitation,
      variant.whyThisPractice,
      ...(variant.approach ?? []),
      ...(variant.steps ?? []),
      variant.carry,
      variant.closing,
    ]),
  ].filter((value): value is string => typeof value === "string");
  const safetyResult = validateRitualSafety(pattern.safetyFlags, instructions);

  if (!safetyResult.allowed) {
    errors.push(
      ...safetyResult.blocks.map((block) => `${pattern.id}: presentation ${block}`),
    );
  }
}

export function validateRitualPattern(
  pattern: RitualPattern,
): RitualPatternValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!hasRequiredString(pattern.id)) {
    errors.push("ritual pattern id is required");
  }

  if (!hasRequiredString(pattern.key)) {
    errors.push(`${pattern.id}: ritual pattern key is required`);
  }

  if (!hasRequiredString(pattern.title)) {
    errors.push(`${pattern.id}: ritual pattern title is required`);
  }

  if (pattern.capacityModes.length === 0) {
    errors.push(`${pattern.id}: at least one capacity mode is required`);
  }

  if (!pattern.capacityModes.every(hasAllowedCapacityMode)) {
    errors.push(`${pattern.id}: unsupported capacity mode`);
  }

  if (
    !Number.isFinite(pattern.defaultDurationMinutes) ||
    pattern.defaultDurationMinutes < 0 ||
    pattern.defaultDurationMinutes > 30
  ) {
    errors.push(`${pattern.id}: default duration must be between 0 and 30 minutes`);
  }

  if (pattern.steps.length === 0) {
    errors.push(`${pattern.id}: at least one step is required`);
  }

  if (pattern.steps.length > MAX_PATTERN_STEPS) {
    errors.push(`${pattern.id}: too many steps for a starter pattern`);
  }

  if (pattern.steps.some((step) => step.length > MAX_STEP_LENGTH)) {
    errors.push(`${pattern.id}: steps must stay short and paraphrased`);
  }

  if (pattern.safetyNotes.length === 0) {
    errors.push(`${pattern.id}: safety notes are required`);
  }

  if (pattern.sourceReferences.length === 0) {
    errors.push(`${pattern.id}: source references are required`);
  }

  if (!RITUAL_PATTERN_APPROVAL_STATUSES.includes(pattern.approvalStatus)) {
    errors.push(`${pattern.id}: approval status is not supported`);
  }

  const safetyResult = validateRitualSafety(pattern.safetyFlags, pattern.steps);

  if (!safetyResult.allowed) {
    errors.push(...safetyResult.blocks.map((block) => `${pattern.id}: ${block}`));
  }

  validatePresentation(pattern, errors);

  warnings.push(...safetyResult.warnings.map((warning) => `${pattern.id}: ${warning}`));

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function getApprovedRitualPatterns(
  patterns: RitualPattern[] = starterRitualPatterns,
): RitualPattern[] {
  return patterns.filter((pattern) => pattern.approvalStatus === "approved");
}

export function getEligibleRitualPatterns(
  capacityMode: CapacityMode,
  patterns: RitualPattern[] = starterRitualPatterns,
): RitualPattern[] {
  return getApprovedRitualPatterns(patterns).filter((pattern) => {
    const safetyResult = validateRitualSafety(pattern.safetyFlags, pattern.steps);

    return safetyResult.allowed && pattern.capacityModes.includes(capacityMode);
  });
}
