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
  safetyFlags: RitualSafetyFlags;
  safetyNotes: string[];
  avoidIf: string[];
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
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.safety_reference_families",
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
    safetyFlags: withSafetyOverrides({
      pets: "review_required",
      cleanupBurden: "tiny",
    }),
    safetyNotes: [
      "Keep plant material away from pets and children unless the plant has been reviewed as safe.",
    ],
    avoidIf: [
      "avoid if the plant may be toxic and pets or children can access it",
      "avoid if plant care would become a larger cleanup task",
    ],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.safety_reference_families",
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
      "Set the candle on a stable heat-safe surface away from fabric, pets, and children.",
      "Light the candle and name the focus for this short pause.",
      "Blow the candle out before leaving the space.",
    ],
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
    sourceReferences: [
      "source.safety_reference_families",
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
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.safety_reference_families",
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
    safetyFlags: withSafetyOverrides({
      cleanupBurden: "low",
    }),
    safetyNotes: [
      "Keep doorways physically clear and do not block exits.",
    ],
    avoidIf: [
      "avoid if the entry area needs a larger safety or repair fix",
    ],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.safety_reference_families",
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
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.safety_reference_families",
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
    safetyFlags: lowRiskRitualSafetyFlags,
    safetyNotes: [
      "Keep this as permission to stop, not a list of tasks.",
    ],
    avoidIf: [
      "avoid if any reflection prompt would feel emotionally heavy",
    ],
    sourceReferences: [
      "source.arin_murphy_hiscock",
      "source.safety_reference_families",
      "docs/source-ingestion-plan.md#batch-6--home-tending-starter-patterns",
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
    sourceReferences: [
      "source.laurel_woodward",
      "source.rachel_patterson_moon",
      "source.safety_reference_families",
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
    sourceReferences: [
      "source.laurel_woodward",
      "source.rachel_patterson_moon",
      "source.safety_reference_families",
      "docs/source-ingestion-plan.md#batch-7--kitchen-plant-and-light-starter-set",
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
    sourceReferences: [
      "source.laurel_woodward",
      "source.safety_reference_families",
      "note.safety_overrides_symbolism",
      "docs/source-ingestion-plan.md#batch-7--kitchen-plant-and-light-starter-set",
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
