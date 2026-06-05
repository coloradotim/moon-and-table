import type { RitualPattern } from "../data/ritual-patterns";
import type { CurrentRitualCheckIn } from "./current-ritual-check-in";

export const RITUAL_FORM_FAMILIES = [
  "banked_or_darkening_light",
  "first_light_threshold",
  "full_light_clarity",
  "plant_release_removal",
  "plant_seed_beginning",
  "plant_rest_dormancy",
  "plant_witness_growth",
  "plant_phrase",
  "grain_seed_bowl",
  "warm_cup_bowl",
  "welcome_offering_vessel",
  "bread_grain_center",
  "honey_sweetening",
  "threshold_crossing_bowl_key",
  "salt_water_release",
  "vessel_empty_return",
  "house_map",
  "written_folded_container",
  "spoken_table_phrase",
  "waning_phrase_release",
  "carried_phrase",
  "seasonal_marker",
  "first_last_threshold",
] as const;

export type RitualFormFamily = (typeof RITUAL_FORM_FAMILIES)[number];

const FORM_FAMILY_LABELS: Record<RitualFormFamily, string> = {
  banked_or_darkening_light: "banked/darkening light",
  first_light_threshold: "first light / threshold",
  full_light_clarity: "full light / clarity",
  plant_release_removal: "plant release/removal",
  plant_seed_beginning: "plant seed/beginning",
  plant_rest_dormancy: "plant rest/dormancy",
  plant_witness_growth: "plant witness/growth",
  plant_phrase: "plant phrase",
  grain_seed_bowl: "grain/seed/bowl",
  warm_cup_bowl: "warm cup/bowl",
  welcome_offering_vessel: "welcome/offering/vessel",
  bread_grain_center: "bread/grain center",
  honey_sweetening: "honey/sweetening",
  threshold_crossing_bowl_key: "threshold/crossing/bowl/key",
  salt_water_release: "salt/water release",
  vessel_empty_return: "vessel emptying/return",
  house_map: "house map",
  written_folded_container: "written/folded/container",
  spoken_table_phrase: "spoken/table phrase",
  waning_phrase_release: "waning phrase/release",
  carried_phrase: "carried phrase",
  seasonal_marker: "seasonal marker",
  first_last_threshold: "first/last threshold",
};

const FORM_FAMILIES_BY_PATTERN_KEY: Record<string, RitualFormFamily[]> = {
  bank_the_house_light: ["banked_or_darkening_light"],
  darkening_light: ["banked_or_darkening_light", "seasonal_marker"],
  first_light_at_the_threshold: ["first_light_threshold", "threshold_crossing_bowl_key"],
  full_light_on_the_table: ["full_light_clarity"],
  dead_leaf_release: ["plant_release_removal"],
  seed_waiting: ["plant_seed_beginning"],
  plant_witness_to_growth: ["plant_witness_growth"],
  dormant_green_rest: ["plant_rest_dormancy"],
  plant_phrase_under_the_pot: ["plant_phrase", "written_folded_container"],
  grain_bowl_beginning: ["grain_seed_bowl"],
  warm_cup_between_us: ["warm_cup_bowl"],
  quiet_welcome: ["welcome_offering_vessel", "warm_cup_bowl"],
  bread_at_the_center: ["bread_grain_center", "welcome_offering_vessel"],
  honeyed_word: ["honey_sweetening", "welcome_offering_vessel"],
  threshold_bowl: ["threshold_crossing_bowl_key"],
  clear_the_threshold_bowl: ["threshold_crossing_bowl_key", "vessel_empty_return", "seasonal_marker"],
  salt_clear_water_release: ["salt_water_release", "vessel_empty_return"],
  house_from_root_to_roof: ["house_map", "threshold_crossing_bowl_key"],
  folded_phrase_vessel: ["written_folded_container", "vessel_empty_return"],
  two_words_at_the_table: ["spoken_table_phrase"],
  waning_phrase_release: ["waning_phrase_release", "written_folded_container"],
  carried_key_word: ["carried_phrase", "threshold_crossing_bowl_key"],
  seasonal_marker_bowl: ["seasonal_marker", "welcome_offering_vessel", "vessel_empty_return"],
  seasonal_entry_bowl: ["seasonal_marker", "threshold_crossing_bowl_key"],
  first_day_last_day: ["first_last_threshold", "seasonal_marker"],
  last_word_first_word: ["first_last_threshold", "written_folded_container"],
};

const FORM_FAMILIES_BY_STYLE: Record<string, RitualFormFamily[]> = {
  first_light: ["first_light_threshold"],
  full_light: ["full_light_clarity"],
  darkening_light: ["banked_or_darkening_light"],
  banked_light: ["banked_or_darkening_light"],
  seed: ["plant_seed_beginning", "grain_seed_bowl"],
  grain: ["grain_seed_bowl", "bread_grain_center"],
  bread: ["bread_grain_center"],
  cup: ["warm_cup_bowl"],
  warm: ["warm_cup_bowl"],
  welcome: ["welcome_offering_vessel"],
  honey: ["honey_sweetening", "welcome_offering_vessel"],
  salt: ["salt_water_release"],
  vessel: ["vessel_empty_return"],
  emptying: ["vessel_empty_return"],
  return: ["vessel_empty_return"],
  rinsing: ["vessel_empty_return"],
  folded_word: ["written_folded_container"],
  carrying: ["carried_phrase", "written_folded_container"],
  seasonal: ["seasonal_marker"],
};

export function getRitualFormFamilyLabel(family: RitualFormFamily): string {
  return FORM_FAMILY_LABELS[family];
}

export function getRitualFormFamilyLabels(families: RitualFormFamily[]): string[] {
  return families.map(getRitualFormFamilyLabel);
}

function uniqueFamilies(families: RitualFormFamily[]): RitualFormFamily[] {
  return families.filter(
    (family, index, values) => values.indexOf(family) === index,
  );
}

export function getRitualFormFamiliesForPattern(
  pattern: Pick<RitualPattern, "key" | "ritualStyles">,
): RitualFormFamily[] {
  return uniqueFamilies([
    ...(FORM_FAMILIES_BY_PATTERN_KEY[pattern.key] ?? []),
    ...pattern.ritualStyles.flatMap(
      (style) => FORM_FAMILIES_BY_STYLE[style] ?? [],
    ),
  ]);
}

function practiceLabel(checkIn?: CurrentRitualCheckIn): string {
  return checkIn?.practiceTypeLabel?.toLowerCase() ?? "";
}

function practiceHints(checkIn?: CurrentRitualCheckIn): string[] {
  return checkIn?.practiceTypeHints ?? [];
}

function hasPractice(checkIn: CurrentRitualCheckIn | undefined, label: string, styles: string[]): boolean {
  const lowerLabel = practiceLabel(checkIn);
  const hints = practiceHints(checkIn);

  return lowerLabel === label || styles.some((style) => hints.includes(style));
}

export function getExplicitPracticeCategory(checkIn?: CurrentRitualCheckIn): string | undefined {
  if (!checkIn || checkIn.practiceTypeLabel === "Surprise me") {
    return undefined;
  }

  if (hasPractice(checkIn, "plant", ["plant", "plant_tending"])) {
    return "Plant";
  }

  if (hasPractice(checkIn, "kitchen", ["kitchen"])) {
    return "Kitchen";
  }

  if (hasPractice(checkIn, "candle or light", ["candle_or_light", "light_focus"])) {
    return "Candle or light";
  }

  if (hasPractice(checkIn, "reflection", ["reflection"])) {
    return "Reflection";
  }

  if (hasPractice(checkIn, "seasonal", ["seasonal"])) {
    return "Seasonal";
  }

  if (hasPractice(checkIn, "home", ["home_tending", "threshold_reset"])) {
    return "Home";
  }

  return undefined;
}

export function getExpectedRitualFormFamilies(
  checkIn?: CurrentRitualCheckIn,
  styleHints: string[] = [],
): RitualFormFamily[] {
  if (!checkIn) {
    return [];
  }

  const category = getExplicitPracticeCategory(checkIn);
  const focus = checkIn.ritualFocusKey;
  const expected: RitualFormFamily[] = [];
  const hintSet = new Set(styleHints);

  if (hintSet.has("folded_word")) {
    expected.push("written_folded_container");
  }

  if (hintSet.has("grain") || hintSet.has("seed")) {
    expected.push("grain_seed_bowl");
  }

  if (hintSet.has("welcome")) {
    expected.push("welcome_offering_vessel");
  }

  if (hintSet.has("warm") || hintSet.has("tea")) {
    expected.push("warm_cup_bowl");
  }

  if (category === "Plant") {
    if (focus === "clearing_something_out") {
      expected.push("plant_release_removal");
    } else if (focus === "making_a_beginning") {
      expected.push("plant_seed_beginning");
    } else if (focus === "resting") {
      expected.push("plant_rest_dormancy");
    } else if (focus === "saying_something_clearly") {
      expected.push("plant_phrase");
    } else {
      expected.push("plant_witness_growth", "plant_seed_beginning", "plant_rest_dormancy");
    }
  }

  if (category === "Kitchen") {
    if (focus === "making_a_beginning") {
      expected.push("grain_seed_bowl");
    } else if (focus === "resting") {
      expected.push("warm_cup_bowl");
    } else if (focus === "clearing_something_out") {
      expected.push("salt_water_release");
    } else if (focus === "tending_us") {
      expected.push("warm_cup_bowl", "welcome_offering_vessel", "bread_grain_center", "honey_sweetening");
    } else {
      expected.push("warm_cup_bowl", "grain_seed_bowl", "welcome_offering_vessel");
    }
  }

  if (category === "Home") {
    if (focus === "marking_a_threshold") {
      expected.push("threshold_crossing_bowl_key", "first_light_threshold", "first_last_threshold");
    } else if (focus === "clearing_something_out") {
      expected.push("salt_water_release", "vessel_empty_return", "threshold_crossing_bowl_key");
    } else if (focus === "tending_the_home" || focus === "getting_grounded") {
      expected.push("house_map", "threshold_crossing_bowl_key", "bread_grain_center");
    }
  }

  if (category === "Candle or light") {
    if (focus === "making_a_beginning" || focus === "marking_a_threshold") {
      expected.push("first_light_threshold");
    } else if (focus === "resting") {
      expected.push("banked_or_darkening_light");
    } else if (focus === "saying_something_clearly" || focus === "tending_us") {
      expected.push("full_light_clarity");
    } else {
      expected.push("banked_or_darkening_light", "first_light_threshold");
    }
  }

  if (category === "Reflection") {
    if (hintSet.has("folded_word")) {
      expected.push("written_folded_container");
    } else if (focus === "saying_something_clearly" || focus === "making_a_beginning") {
      expected.push("written_folded_container");
    } else if (focus === "clearing_something_out") {
      expected.push("waning_phrase_release");
    } else {
      expected.push("written_folded_container", "carried_phrase", "spoken_table_phrase");
    }
  }

  if (category === "Seasonal") {
    expected.push("seasonal_marker", "vessel_empty_return", "first_last_threshold", "threshold_crossing_bowl_key");
  }

  if (
    focus === "clearing_something_out" &&
    category !== "Reflection"
  ) {
    expected.push("salt_water_release", "vessel_empty_return", "plant_release_removal", "waning_phrase_release");
  }

  if (focus === "marking_a_threshold") {
    expected.push("threshold_crossing_bowl_key", "first_light_threshold", "first_last_threshold");
  }

  if (focus === "tending_us" && category !== "Candle or light") {
    expected.push("warm_cup_bowl", "welcome_offering_vessel", "bread_grain_center", "honey_sweetening");
  }

  return uniqueFamilies(expected);
}

export function ritualFormFamiliesMatch(
  selected: RitualFormFamily[],
  expected: RitualFormFamily[],
): boolean {
  return expected.length === 0 || selected.some((family) => expected.includes(family));
}
