import type { CapacityMode } from "./generate-weekly-brief";
import type {
  AstrologyVisibility,
  PrivateAudience,
  PrivateProfileAssumption,
} from "./private-data-schema";

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

export const PROFILE_TUNING_RITUAL_STYLE_OPTIONS = [
  { value: "plant", label: "Plant" },
  { value: "plant_tending", label: "Plant tending" },
  { value: "kitchen", label: "Kitchen" },
  { value: "kitchen_clearing", label: "Kitchen clearing" },
  { value: "candle", label: "Candle" },
  { value: "home_care", label: "Home care" },
  { value: "conversation", label: "Conversation" },
  { value: "shopping", label: "Shopping" },
  { value: "shopping_required", label: "Shopping required" },
  { value: "heavy_cleanup", label: "Heavy cleanup" },
  { value: "long_journaling", label: "Long journaling" },
  { value: "large_task_list", label: "Large task list" },
  { value: "elaborate_ceremony", label: "Elaborate ceremony" },
  { value: "vague_mush", label: "Vague mush" },
] as const;

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

function formatUnknownStyle(value: string): string {
  return value
    .split("_")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function getRitualStyleOptions(selectedValues: string[]) {
  const knownValues = new Set<string>(
    PROFILE_TUNING_RITUAL_STYLE_OPTIONS.map((option) => option.value),
  );
  const selectedUnknownOptions = selectedValues
    .filter((value) => !knownValues.has(value))
    .map((value) => ({ value, label: formatUnknownStyle(value) }));

  return [...PROFILE_TUNING_RITUAL_STYLE_OPTIONS, ...selectedUnknownOptions];
}

export function buildProfileTuningUpdate(
  currentSettings: ProfileTuningSettings,
  input: ProfileTuningFormInput,
  updatedAtIso: string,
): ProfileTuningUpdate {
  return {
    profile: {
      defaultAudience: input.defaultAudience,
      preferredRitualStyles: input.preferredRitualStyles,
      avoidedRitualStyles: input.avoidedRitualStyles,
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
