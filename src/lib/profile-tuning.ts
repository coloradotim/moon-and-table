import type { CapacityMode } from "./generate-weekly-brief";
import type {
  AstrologyVisibility,
  PrivateAudience,
  PrivateProfileAssumption,
} from "./private-data-schema";
import {
  getGroupedProfilePreferenceOptions,
  normalizeProfilePreferenceValues,
} from "./profile-preference-taxonomy";

export { normalizeProfilePreferenceValues } from "./profile-preference-taxonomy";

export const PROFILE_TUNING_AUDIENCES = [
  "person_a",
  "person_b",
  "together",
  "either",
] as const satisfies PrivateAudience[];

export const PROFILE_TUNING_ASTROLOGY_VISIBILITY = [
  "subtle",
  "balanced",
  "explicit",
] as const satisfies AstrologyVisibility[];

export type ProfileTuningSettings = {
  defaultAudience: PrivateAudience;
  audienceLabels: Record<PrivateAudience, string>;
  defaultCapacityMode: CapacityMode;
  maxRitualDurationMinutes: number;
  preferredRitualStyles: string[];
  avoidedRitualStyles: string[];
  astrologyVisibility: AstrologyVisibility;
  assumptions: PrivateProfileAssumption[];
};

export type ProfileTuningProfile = {
  id: string;
  label: string;
  settings: ProfileTuningSettings;
  documentRefs: {
    profileId: string;
    capacitySettingsId: string;
    scheduleConstraintsId: string;
  };
};

export type ProfileTuningFormInput = {
  defaultAudience: PrivateAudience;
  defaultCapacityMode: CapacityMode;
  maxRitualDurationMinutes: number;
  preferredRitualStyles: string[];
  avoidedRitualStyles: string[];
  astrologyVisibility: AstrologyVisibility;
  assumptionValues: Record<string, boolean>;
};

export type ProfileTuningUpdate = {
  profile: {
    defaultAudience: PrivateAudience;
    preferredRitualStyles: string[];
    avoidedRitualStyles: string[];
    astrologyVisibility: AstrologyVisibility;
    assumptions: PrivateProfileAssumption[];
    updatedAtIso: string;
  };
  capacitySettings: {
    defaultCapacityMode: CapacityMode;
    maxRitualDurationMinutes: number;
    updatedAtIso: string;
  };
  scheduleConstraints: {
    defaultCapacityMode: CapacityMode;
    maxRitualDurationMinutes: number;
    updatedAtIso: string;
  };
};

export function splitStyleList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinStyleList(values: string[]): string {
  return values.join(", ");
}

export function getRitualStyleOptions(selectedValues: string[]) {
  return getGroupedProfilePreferenceOptions(selectedValues).flatMap(
    (group) => group.options,
  );
}

export function buildProfileTuningUpdate(
  currentSettings: ProfileTuningSettings,
  input: ProfileTuningFormInput,
  updatedAtIso: string,
): ProfileTuningUpdate {
  return {
    profile: {
      defaultAudience: input.defaultAudience,
      preferredRitualStyles: normalizeProfilePreferenceValues(
        input.preferredRitualStyles,
      ),
      avoidedRitualStyles: normalizeProfilePreferenceValues(
        input.avoidedRitualStyles,
      ),
      astrologyVisibility: input.astrologyVisibility,
      assumptions: currentSettings.assumptions.map((assumption) => {
        const nextValue = input.assumptionValues[assumption.key];

        if (!assumption.editable || typeof assumption.value !== "boolean") {
          return assumption;
        }

        return {
          ...assumption,
          value: Boolean(nextValue),
          source: "user_confirmed",
          confidence: "high",
          updatedAtIso,
        };
      }),
      updatedAtIso,
    },
    capacitySettings: {
      defaultCapacityMode: input.defaultCapacityMode,
      maxRitualDurationMinutes: input.maxRitualDurationMinutes,
      updatedAtIso,
    },
    scheduleConstraints: {
      defaultCapacityMode: input.defaultCapacityMode,
      maxRitualDurationMinutes: input.maxRitualDurationMinutes,
      updatedAtIso,
    },
  };
}
