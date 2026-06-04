export const RITUAL_FOCUS_OPTION_KEYS = [
  "getting_grounded",
  "making_a_beginning",
  "clearing_something_out",
  "resting",
  "saying_something_clearly",
  "tending_us",
  "tending_the_home",
  "marking_a_threshold",
  "something_else",
] as const;

export type RitualFocusOptionKey = (typeof RITUAL_FOCUS_OPTION_KEYS)[number];

export type RitualFocusCapacityMode = "pause" | "low" | "steady" | "high";

export type RitualFocusOption = {
  key: RitualFocusOptionKey;
  label: string;
  description: string;
  themeKeys: string[];
  ritualStyleHints: string[];
  timingSignalKeys?: string[];
  symbolicCardKeys?: string[];
  avoidIfCapacityModes?: RitualFocusCapacityMode[];
  drivesScoringByDefault: boolean;
};

export const ritualFocusOptions: RitualFocusOption[] = [
  {
    key: "getting_grounded",
    label: "Getting grounded",
    description: "A focus for stability, returning to the body, and one grounded action.",
    themeKeys: ["grounding", "stability", "return_to_body", "simple_order"],
    ritualStyleHints: ["grounding", "simple_food", "table_reset", "home_tending"],
    symbolicCardKeys: ["bread", "oats", "ordinary_cooking", "salt"],
    avoidIfCapacityModes: ["pause"],
    drivesScoringByDefault: true,
  },
  {
    key: "making_a_beginning",
    label: "Making a beginning",
    description: "A focus for one small start, first step, intention, or threshold cue.",
    themeKeys: ["beginning", "initiation", "first_step", "intention", "threshold"],
    ritualStyleHints: ["threshold_reset", "reflection", "low_woo"],
    timingSignalKeys: ["moon.new"],
    symbolicCardKeys: ["new_moon"],
    avoidIfCapacityModes: ["pause"],
    drivesScoringByDefault: true,
  },
  {
    key: "clearing_something_out",
    label: "Clearing something out",
    description: "A focus for release, making room, and a small clearing action.",
    themeKeys: ["clearing", "release", "decluttering", "making_room", "integration"],
    ritualStyleHints: ["surface_reset", "threshold_reset", "home_tending", "closing"],
    timingSignalKeys: ["moon.waning"],
    symbolicCardKeys: ["waning_moon"],
    avoidIfCapacityModes: ["pause"],
    drivesScoringByDefault: true,
  },
  {
    key: "resting",
    label: "Resting",
    description: "A focus for softness, quiet, restoration, and doing less.",
    themeKeys: ["rest", "softness", "restore", "quiet", "integration"],
    ritualStyleHints: ["rest", "tea", "warm", "light_focus", "closing"],
    symbolicCardKeys: ["tea", "lavender", "candle"],
    drivesScoringByDefault: true,
  },
  {
    key: "saying_something_clearly",
    label: "Saying something clearly",
    description: "A ritual-oriented focus for naming one truth or useful sentence.",
    themeKeys: ["voice", "naming", "declaration", "truth", "clarity"],
    ritualStyleHints: ["conversation", "naming"],
    symbolicCardKeys: ["astrology_body_mercury"],
    avoidIfCapacityModes: ["pause"],
    drivesScoringByDefault: true,
  },
  {
    key: "tending_us",
    label: "Tending us",
    description: "A focus for shared attention, connection, and household devotion.",
    themeKeys: [
      "relationship",
      "shared_attention",
      "devotion",
      "connection",
      "repair_internal_only",
    ],
    ritualStyleHints: ["shared_space", "table_reset", "conversation", "candle_or_light"],
    symbolicCardKeys: ["astrology_body_venus", "full_moon"],
    avoidIfCapacityModes: ["pause"],
    drivesScoringByDefault: true,
  },
  {
    key: "tending_the_home",
    label: "Tending the home",
    description: "A focus for hearth, belonging, domestic care, and household order.",
    themeKeys: ["home", "hearth", "domestic_care", "household_order", "belonging"],
    ritualStyleHints: [
      "home_tending",
      "plant_tending",
      "kitchen",
      "table_reset",
      "threshold_reset",
    ],
    symbolicCardKeys: ["plant_tending", "ordinary_cooking", "salt"],
    drivesScoringByDefault: true,
  },
  {
    key: "marking_a_threshold",
    label: "Marking a threshold",
    description: "A focus for transition, before-and-after moments, and simple rites of passage.",
    themeKeys: [
      "threshold",
      "liminal",
      "transition",
      "before_after",
      "seasonal_marker",
      "rite_of_passage",
    ],
    ritualStyleHints: ["threshold_reset", "seasonal", "closing", "home_tending"],
    symbolicCardKeys: [
      "seasonal_spring_equinox",
      "seasonal_autumn_equinox",
      "seasonal_table_home_reset",
    ],
    avoidIfCapacityModes: ["pause"],
    drivesScoringByDefault: true,
  },
  {
    key: "something_else",
    label: "Something else",
    description: "A placeholder for later controlled matching; it does not drive scoring by default.",
    themeKeys: ["controlled_match_required"],
    ritualStyleHints: [],
    drivesScoringByDefault: false,
  },
];

export const RITUAL_FOCUS_VISIBLE_LABELS = ritualFocusOptions.map(
  (option) => option.label,
);

export const heldForLaterRitualFocusLabels = [
  "Calling something in",
  "Celebrating something",
  "Sitting with a question",
  "Protecting the home",
] as const;

export const internalOnlyRitualFocusThemeKeys = [
  "grief",
  "mourning",
  "reconciliation",
  "repair",
  "protection",
  "warding",
  "abundance",
  "prosperity",
  "shadow_work",
  "gratitude",
  "celebration",
] as const;

export function getRitualFocusOptionByKey(
  key: RitualFocusOptionKey,
): RitualFocusOption {
  return ritualFocusOptions.find((option) => option.key === key)!;
}
