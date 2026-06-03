import type {
  PrivateAudience,
  PrivateProfileThemeKey,
} from "./private-data-schema";
import { normalizeProfilePreferenceValues } from "./profile-preference-taxonomy";

export type PrivateProfileSignalSource =
  | "private_profile"
  | "profile_theme"
  | "natal_theme";

export type PrivateProfileSignalInput = {
  audience: PrivateAudience;
  label?: string;
  profileThemeKeys: PrivateProfileThemeKey[];
  astrologyProfileThemeKeys?: PrivateProfileThemeKey[];
  preferredRitualStyles?: string[];
  avoidedRitualStyles?: string[];
  tonePreferences?: string[];
};

export type PrivateProfileSignal = {
  key: string;
  audience: PrivateAudience;
  label: string;
  themeKey: PrivateProfileThemeKey;
  themes: string[];
  ritualStyleHints: string[];
  toneHints: string[];
  weight: number;
  source: PrivateProfileSignalSource;
};

type ThemeSignalDefinition = {
  label: string;
  themes: string[];
  ritualStyleHints: string[];
  toneHints: string[];
  weight: number;
};

const THEME_SIGNAL_DEFINITIONS: Record<
  PrivateProfileThemeKey,
  ThemeSignalDefinition
> = {
  "private_profile.practical_tending": {
    label: "practical home-tending magic",
    themes: ["practical care", "useful tending", "ordinary maintenance"],
    ritualStyleHints: ["home_tending", "plant", "plant_tending", "kitchen", "surface_reset"],
    toneHints: ["practical", "direct", "low_woo"],
    weight: 4,
  },
  "private_profile.beauty_warmth": {
    label: "warmth, beauty, and affection",
    themes: ["warmth", "beauty", "appreciation", "connection"],
    ritualStyleHints: ["candle_or_light", "light_focus", "warm", "kitchen", "gratitude", "reflection"],
    toneHints: ["warm", "playful", "symbolic"],
    weight: 4,
  },
  "private_profile.structured_action": {
    label: "clear structure and bounded action",
    themes: ["structure", "bounded action", "clear next step"],
    ritualStyleHints: ["surface_reset", "threshold_reset", "table_reset", "single-action ritual"],
    toneHints: ["direct", "practical", "low_woo"],
    weight: 4,
  },
};

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function isPersonAudience(audience: PrivateAudience): boolean {
  return audience === "person_a" || audience === "person_b";
}

export function getProfileSignalInputsForAudience(
  profileInputs: PrivateProfileSignalInput[],
  audience: PrivateAudience,
): PrivateProfileSignalInput[] {
  const personProfiles = profileInputs.filter((profile) =>
    isPersonAudience(profile.audience),
  );

  if (audience === "person_a" || audience === "person_b") {
    const matchingProfiles = profileInputs.filter(
      (profile) => profile.audience === audience,
    );

    return matchingProfiles.length > 0 ? matchingProfiles : profileInputs;
  }

  if (audience === "together" || audience === "either") {
    return personProfiles.length > 0 ? personProfiles : profileInputs;
  }

  return profileInputs;
}

function makeSignal(
  profile: PrivateProfileSignalInput,
  themeKey: PrivateProfileThemeKey,
  source: PrivateProfileSignalSource,
  overlapCount: number,
  audience: PrivateAudience,
): PrivateProfileSignal {
  const definition = THEME_SIGNAL_DEFINITIONS[themeKey];
  const overlapBoost = overlapCount > 1 ? 2 : 0;
  const togetherSoftening = audience === "together" && overlapCount === 1 ? -1 : 0;
  const natalThemeBoost = source === "natal_theme" ? 1 : 0;

  return {
    key: `${source}.${profile.audience}.${themeKey}`,
    audience: profile.audience,
    label: definition.label,
    themeKey,
    themes: definition.themes,
    ritualStyleHints: uniqueValues([
      ...definition.ritualStyleHints,
      ...normalizeProfilePreferenceValues(profile.preferredRitualStyles ?? []),
    ]),
    toneHints: uniqueValues([
      ...definition.toneHints,
      ...normalizeProfilePreferenceValues(profile.tonePreferences ?? []),
    ]),
    weight: Math.max(1, definition.weight + overlapBoost + togetherSoftening + natalThemeBoost),
    source,
  };
}

export function mapPrivateProfileThemesToSignals(
  profileInputs: PrivateProfileSignalInput[],
  audience: PrivateAudience,
): PrivateProfileSignal[] {
  const selectedProfiles = getProfileSignalInputsForAudience(profileInputs, audience);
  const themeCounts = new Map<PrivateProfileThemeKey, number>();

  for (const profile of selectedProfiles) {
    for (const themeKey of uniqueValues([
      ...profile.profileThemeKeys,
      ...(profile.astrologyProfileThemeKeys ?? []),
    ]) as PrivateProfileThemeKey[]) {
      themeCounts.set(themeKey, (themeCounts.get(themeKey) ?? 0) + 1);
    }
  }

  return selectedProfiles.flatMap((profile) => {
    const profileSignals = uniqueValues(profile.profileThemeKeys).map((themeKey) =>
      makeSignal(
        profile,
        themeKey as PrivateProfileThemeKey,
        "profile_theme",
        themeCounts.get(themeKey as PrivateProfileThemeKey) ?? 1,
        audience,
      ),
    );
    const astrologySignals = uniqueValues(
      profile.astrologyProfileThemeKeys ?? [],
    ).map((themeKey) =>
      makeSignal(
        profile,
        themeKey as PrivateProfileThemeKey,
        "natal_theme",
        themeCounts.get(themeKey as PrivateProfileThemeKey) ?? 1,
        audience,
      ),
    );

    return [...profileSignals, ...astrologySignals];
  }).filter(
    (signal, index, signals) =>
      signals.findIndex(
        (candidate) =>
          candidate.key === signal.key &&
          candidate.themeKey === signal.themeKey,
      ) === index,
  );
}
