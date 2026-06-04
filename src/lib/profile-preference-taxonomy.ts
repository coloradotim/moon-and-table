import type { PrivateAudience } from "./private-data-schema";

export const PROFILE_PREFERENCE_GROUPS = [
  "ritual_style",
  "action_pattern",
  "burden_avoid_flag",
  "tone_preference",
  "audience",
] as const;

export type ProfilePreferenceGroup = (typeof PROFILE_PREFERENCE_GROUPS)[number];

export type ProfilePreferenceOption = {
  value: string;
  label: string;
  group: ProfilePreferenceGroup;
};

export type GroupedProfilePreferenceOptions = {
  group: ProfilePreferenceGroup | "unknown";
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
};

export const PROFILE_PREFERENCE_GROUP_LABELS: Record<
  ProfilePreferenceGroup | "unknown",
  string
> = {
  ritual_style: "Ritual styles",
  action_pattern: "Action patterns",
  burden_avoid_flag: "Burden / avoid flags",
  tone_preference: "Tone preferences",
  audience: "Audience",
  unknown: "Other saved values",
};

export const PROFILE_PREFERENCE_OPTIONS = [
  { value: "plant", label: "Plant", group: "ritual_style" },
  { value: "kitchen", label: "Kitchen", group: "ritual_style" },
  { value: "candle_or_light", label: "Candle or light", group: "ritual_style" },
  { value: "home_tending", label: "Home tending", group: "ritual_style" },
  { value: "conversation", label: "Conversation", group: "ritual_style" },
  { value: "reflection", label: "Reflection", group: "ritual_style" },
  { value: "seasonal", label: "Seasonal", group: "ritual_style" },
  { value: "plant_tending", label: "Plant tending", group: "action_pattern" },
  { value: "surface_reset", label: "Surface reset", group: "action_pattern" },
  { value: "table_reset", label: "Table reset", group: "action_pattern" },
  { value: "threshold_reset", label: "Threshold reset", group: "action_pattern" },
  { value: "tea", label: "Tea", group: "action_pattern" },
  { value: "simple_food", label: "Simple food", group: "action_pattern" },
  { value: "bread", label: "Bread", group: "action_pattern" },
  { value: "oats", label: "Oats", group: "action_pattern" },
  { value: "apple", label: "Apple", group: "action_pattern" },
  { value: "ordinary_cooking", label: "Ordinary cooking", group: "action_pattern" },
  { value: "color_accent", label: "Color accent", group: "action_pattern" },
  { value: "light_focus", label: "Light focus", group: "action_pattern" },
  { value: "shopping_required", label: "Shopping required", group: "burden_avoid_flag" },
  { value: "heavy_cleanup", label: "Heavy cleanup", group: "burden_avoid_flag" },
  { value: "long_journaling", label: "Long journaling", group: "burden_avoid_flag" },
  { value: "elaborate_setup", label: "Elaborate setup", group: "burden_avoid_flag" },
  { value: "emotionally_heavy", label: "Emotionally heavy", group: "burden_avoid_flag" },
  { value: "live_flame", label: "Live flame", group: "burden_avoid_flag" },
  { value: "smoke", label: "Smoke", group: "burden_avoid_flag" },
  { value: "practical", label: "Practical", group: "tone_preference" },
  { value: "warm", label: "Warm", group: "tone_preference" },
  { value: "playful", label: "Playful", group: "tone_preference" },
  { value: "romantic", label: "Romantic", group: "tone_preference" },
  { value: "symbolic", label: "Symbolic", group: "tone_preference" },
  { value: "direct", label: "Direct", group: "tone_preference" },
  { value: "low_woo", label: "Low woo", group: "tone_preference" },
  { value: "avoid_vague_mush", label: "Avoid vague mush", group: "tone_preference" },
  { value: "person_a", label: "Person A", group: "audience" },
  { value: "person_b", label: "Person B", group: "audience" },
  { value: "together", label: "Together", group: "audience" },
  { value: "either", label: "Either", group: "audience" },
] as const satisfies readonly ProfilePreferenceOption[];

export const PROFILE_PREFERENCE_ALIASES: Record<string, string> = {
  candle: "candle_or_light",
  home_care: "home_tending",
  kitchen_clearing: "surface_reset",
  shopping: "shopping_required",
  elaborate_ceremony: "elaborate_setup",
  vague_mush: "avoid_vague_mush",
};

const PREFERENCE_OPTIONS_BY_VALUE: Map<string, ProfilePreferenceOption> = new Map(
  PROFILE_PREFERENCE_OPTIONS.map((option) => [option.value, option]),
);

export function getCanonicalProfilePreferenceValue(value: string): string {
  return PROFILE_PREFERENCE_ALIASES[value] ?? value;
}

export function normalizeProfilePreferenceValues(values: string[]): string[] {
  const normalizedValues = values
    .map((value) => getCanonicalProfilePreferenceValue(value.trim()))
    .filter(Boolean);

  return [...new Set(normalizedValues)];
}

export function getProfilePreferenceLabel(value: string): string {
  return (
    PREFERENCE_OPTIONS_BY_VALUE.get(value)?.label ??
    value
      .split("_")
      .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
      .join(" ")
  );
}

export function getProfilePreferenceGroup(
  value: string,
): ProfilePreferenceGroup | "unknown" {
  return PREFERENCE_OPTIONS_BY_VALUE.get(value)?.group ?? "unknown";
}

export function getGroupedProfilePreferenceOptions(
  selectedValues: string[] = [],
): GroupedProfilePreferenceOptions[] {
  const normalizedSelectedValues = normalizeProfilePreferenceValues(selectedValues);
  const knownValues = new Set<string>(
    PROFILE_PREFERENCE_OPTIONS.map((option) => option.value),
  );
  const unknownSelectedOptions = normalizedSelectedValues
    .filter((value) => !knownValues.has(value))
    .map((value) => ({
      value,
      label: getProfilePreferenceLabel(value),
    }));

  return [
    ...PROFILE_PREFERENCE_GROUPS.map((group) => ({
      group,
      label: PROFILE_PREFERENCE_GROUP_LABELS[group],
      options: PROFILE_PREFERENCE_OPTIONS.filter((option) => option.group === group).map(
        ({ value, label }) => ({ value, label }),
      ),
    })),
    ...(unknownSelectedOptions.length > 0
      ? [
          {
            group: "unknown" as const,
            label: PROFILE_PREFERENCE_GROUP_LABELS.unknown,
            options: unknownSelectedOptions,
          },
        ]
      : []),
  ];
}

export function getAudiencePreferenceLabel(
  audience: PrivateAudience,
  labels: Partial<Record<PrivateAudience, string>>,
): string {
  return labels[audience] ?? getProfilePreferenceLabel(audience);
}
