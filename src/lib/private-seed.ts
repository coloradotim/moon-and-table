import { CAPACITY_MODES, type CapacityMode } from "./generate-weekly-brief";
import type {
  PrivateAstrologyProfile,
  PrivateProfileAssumption,
  PrivateProfileThemeKey,
} from "./private-data-schema";

export type AstrologyVisibility = "private" | "placeholder_keys_only";

export type PrivateHouseholdSeedSchedule = {
  unavailableDaysOrNights: string[];
  preferredRitualWindows: string[];
  recurringHouseholdConstraintNotes: string[];
  workOrSchoolConstraintNotes: string[];
};

export type PrivateHouseholdSeedProfile = {
  personKey: string;
  displayLabel?: string;
  email: string;
  profileThemeKeys: PrivateProfileThemeKey[];
  assumptions: PrivateProfileAssumption[];
  astrologyProfile: PrivateAstrologyProfile;
  preferredRitualStyles?: string[];
  avoidedRitualStyles?: string[];
  defaultCapacityMode?: CapacityMode;
  maxRitualDurationMinutes?: number;
  scheduleConstraints?: Partial<PrivateHouseholdSeedSchedule>;
};

export type PrivateHouseholdSeed = {
  household: {
    id: string;
    memberEmails: string[];
    defaultCapacityMode: CapacityMode;
    maxRitualDurationMinutes: number;
    preferredRitualStyles: string[];
    avoidedRitualStyles: string[];
    astrologyVisibility: AstrologyVisibility;
    scheduleConstraints: PrivateHouseholdSeedSchedule;
  };
  profiles: PrivateHouseholdSeedProfile[];
};

const PROFILE_THEME_KEYS: PrivateProfileThemeKey[] = [
  "private_profile.practical_tending",
  "private_profile.beauty_warmth",
  "private_profile.structured_action",
];

const ASSUMPTION_SOURCES: PrivateProfileAssumption["source"][] = [
  "starter_assumption",
  "astro_material",
  "user_confirmed",
  "feedback",
];

const CONFIDENCE_VALUES: PrivateProfileAssumption["confidence"][] = [
  "low",
  "medium",
  "high",
];

const ASTROLOGY_SOURCES: PrivateAstrologyProfile["source"][] = [
  "user_provided_chart",
  "astro_material",
  "manual_entry",
];

const ASTROLOGY_VISIBILITY_VALUES: AstrologyVisibility[] = [
  "private",
  "placeholder_keys_only",
];

const DEFAULT_SEED_SCHEDULE: PrivateHouseholdSeedSchedule = {
  unavailableDaysOrNights: [],
  preferredRitualWindows: [],
  recurringHouseholdConstraintNotes: [],
  workOrSchoolConstraintNotes: [],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCapacityMode(value: unknown): value is CapacityMode {
  return typeof value === "string" && CAPACITY_MODES.includes(value as CapacityMode);
}

function isProfileThemeKey(value: unknown): value is PrivateProfileThemeKey {
  return (
    typeof value === "string" &&
    PROFILE_THEME_KEYS.includes(value as PrivateProfileThemeKey)
  );
}

function hasValidAssumptionValue(value: unknown): boolean {
  return (
    typeof value === "boolean" ||
    typeof value === "string" ||
    typeof value === "number" ||
    isStringArray(value)
  );
}

function getStringArray(
  record: Record<string, unknown>,
  key: string,
  errors: string[],
): string[] {
  const fieldName = key.split(".").at(-1) ?? key;
  const value = record[fieldName];

  if (!isStringArray(value)) {
    errors.push(`${key} must be an array of strings`);
    return [];
  }

  return value;
}

function getOptionalStringArray(
  record: Record<string, unknown>,
  key: string,
  errors: string[],
): string[] | undefined {
  const fieldName = key.split(".").at(-1) ?? key;
  const value = record[fieldName];

  if (value === undefined) {
    return undefined;
  }

  if (!isStringArray(value)) {
    errors.push(`${key} must be an array of strings when provided`);
    return undefined;
  }

  return value;
}

function getString(
  record: Record<string, unknown>,
  key: string,
  errors: string[],
): string {
  const fieldName = key.split(".").at(-1) ?? key;
  const value = record[fieldName];

  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${key} must be a non-empty string`);
    return "";
  }

  return value;
}

function normalizeSeedEmail(value: string): string {
  const trimmedValue = value.trim();
  const markdownMailtoMatch = trimmedValue.match(
    /^\[[^\]]+\]\(mailto:([^)]+)\)$/i,
  );

  if (markdownMailtoMatch?.[1]) {
    return markdownMailtoMatch[1].trim().toLowerCase();
  }

  if (trimmedValue.toLowerCase().startsWith("mailto:")) {
    return trimmedValue.slice("mailto:".length).trim().toLowerCase();
  }

  return trimmedValue.toLowerCase();
}

function isEmailLike(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getEmail(
  record: Record<string, unknown>,
  key: string,
  errors: string[],
): string {
  const value = getString(record, key, errors);
  const normalizedValue = normalizeSeedEmail(value);

  if (value && !isEmailLike(normalizedValue)) {
    errors.push(`${key} must be an email-like string`);
  }

  return normalizedValue;
}

function getNumber(
  record: Record<string, unknown>,
  key: string,
  errors: string[],
): number {
  const fieldName = key.split(".").at(-1) ?? key;
  const value = record[fieldName];

  if (typeof value !== "number" || !Number.isFinite(value)) {
    errors.push(`${key} must be a finite number`);
    return 0;
  }

  return value;
}

function parseCapacityMode(
  record: Record<string, unknown>,
  key: string,
  errors: string[],
): CapacityMode {
  const fieldName = key.split(".").at(-1) ?? key;
  const value = record[fieldName];

  if (!isCapacityMode(value)) {
    errors.push(`${key} must be one of ${CAPACITY_MODES.join(", ")}`);
    return "low";
  }

  return value;
}

function parseProfileThemeKeys(value: unknown, path: string, errors: string[]) {
  if (!Array.isArray(value)) {
    errors.push(`${path} must be an array`);
    return [];
  }

  const keys = value.filter(isProfileThemeKey);

  if (keys.length !== value.length) {
    errors.push(`${path} contains an unsupported profile theme key`);
  }

  if (keys.length === 0) {
    errors.push(`${path} must include at least one profile theme key`);
  }

  return keys;
}

function normalizeAssumptionSource(
  value: unknown,
): PrivateProfileAssumption["source"] {
  if (ASSUMPTION_SOURCES.includes(value as PrivateProfileAssumption["source"])) {
    return value as PrivateProfileAssumption["source"];
  }

  if (value === "starter") {
    return "starter_assumption";
  }

  if (value === "astrology" || value === "astro") {
    return "astro_material";
  }

  if (value === "user" || value === "confirmed") {
    return "user_confirmed";
  }

  return "starter_assumption";
}

function normalizeConfidence(value: unknown): PrivateProfileAssumption["confidence"] {
  if (CONFIDENCE_VALUES.includes(value as PrivateProfileAssumption["confidence"])) {
    return value as PrivateProfileAssumption["confidence"];
  }

  return "low";
}

function getEditableFlag(item: Record<string, unknown>): boolean {
  if (typeof item.editable === "boolean") {
    return item.editable;
  }

  if (typeof item.editability === "boolean") {
    return item.editability;
  }

  return true;
}

function normalizeUpdatedAtIso(value: unknown): string {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : new Date().toISOString();
}

function normalizeAstrologyVisibility(value: unknown): AstrologyVisibility {
  if (ASTROLOGY_VISIBILITY_VALUES.includes(value as AstrologyVisibility)) {
    return value as AstrologyVisibility;
  }

  if (value === "placeholder" || value === "placeholders") {
    return "placeholder_keys_only";
  }

  return "private";
}

function parseAssumptions(value: unknown, path: string, errors: string[]) {
  if (!Array.isArray(value)) {
    errors.push(`${path} must be an array`);
    return [];
  }

  return value.flatMap((item, index): PrivateProfileAssumption[] => {
    const itemPath = `${path}[${index}]`;

    if (!isRecord(item)) {
      errors.push(`${itemPath} must be an object`);
      return [];
    }

    const assumptionValue = item.value;
    const source = normalizeAssumptionSource(item.source);
    const confidence = normalizeConfidence(item.confidence);

    if (
      typeof item.key !== "string" ||
      typeof item.label !== "string" ||
      !hasValidAssumptionValue(assumptionValue)
    ) {
      errors.push(`${itemPath} is not a valid assumption`);
      return [];
    }

    return [
      {
        key: item.key,
        label: item.label,
        value: assumptionValue as PrivateProfileAssumption["value"],
        source,
        confidence,
        editable: getEditableFlag(item),
        updatedAtIso: normalizeUpdatedAtIso(item.updatedAtIso),
      },
    ];
  });
}

function parseAstrologyProfile(
  value: unknown,
  path: string,
  errors: string[],
): PrivateAstrologyProfile {
  if (!isRecord(value)) {
    errors.push(`${path} must be an object`);
    return {
      source: "manual_entry",
      confidence: "low",
      placementKeys: [],
      profileThemeKeys: [],
      updatedAtIso: "",
    };
  }

  const placementKeys = getStringArray(value, `${path}.placementKeys`, errors);
  const profileThemeKeys = parseProfileThemeKeys(
    value.profileThemeKeys,
    `${path}.profileThemeKeys`,
    errors,
  );

  if (
    typeof value.source !== "string" ||
    !ASTROLOGY_SOURCES.includes(value.source as PrivateAstrologyProfile["source"])
  ) {
    errors.push(`${path}.source is not supported`);
  }

  if (
    typeof value.confidence !== "string" ||
    !CONFIDENCE_VALUES.includes(value.confidence as PrivateAstrologyProfile["confidence"])
  ) {
    errors.push(`${path}.confidence is not supported`);
  }

  return {
    source: ASTROLOGY_SOURCES.includes(value.source as PrivateAstrologyProfile["source"])
      ? (value.source as PrivateAstrologyProfile["source"])
      : "manual_entry",
    confidence: CONFIDENCE_VALUES.includes(
      value.confidence as PrivateAstrologyProfile["confidence"],
    )
      ? (value.confidence as PrivateAstrologyProfile["confidence"])
      : "low",
    placementKeys,
    profileThemeKeys,
    updatedAtIso: normalizeUpdatedAtIso(value.updatedAtIso),
  };
}

function parseSchedule(
  value: unknown,
  path: string,
  errors: string[],
): PrivateHouseholdSeedSchedule {
  if (!isRecord(value)) {
    return DEFAULT_SEED_SCHEDULE;
  }

  return {
    unavailableDaysOrNights: getStringArray(
      value,
      `${path}.unavailableDaysOrNights`,
      errors,
    ),
    preferredRitualWindows: getStringArray(
      value,
      `${path}.preferredRitualWindows`,
      errors,
    ),
    recurringHouseholdConstraintNotes: getStringArray(
      value,
      `${path}.recurringHouseholdConstraintNotes`,
      errors,
    ),
    workOrSchoolConstraintNotes: getStringArray(
      value,
      `${path}.workOrSchoolConstraintNotes`,
      errors,
    ),
  };
}

function parseOptionalSchedule(
  value: unknown,
  path: string,
  errors: string[],
): Partial<PrivateHouseholdSeedSchedule> | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!isRecord(value)) {
    errors.push(`${path} must be an object when provided`);
    return undefined;
  }

  return {
    unavailableDaysOrNights: getOptionalStringArray(
      value,
      `${path}.unavailableDaysOrNights`,
      errors,
    ),
    preferredRitualWindows: getOptionalStringArray(
      value,
      `${path}.preferredRitualWindows`,
      errors,
    ),
    recurringHouseholdConstraintNotes: getOptionalStringArray(
      value,
      `${path}.recurringHouseholdConstraintNotes`,
      errors,
    ),
    workOrSchoolConstraintNotes: getOptionalStringArray(
      value,
      `${path}.workOrSchoolConstraintNotes`,
      errors,
    ),
  };
}

export function parsePrivateHouseholdSeed(input: unknown): PrivateHouseholdSeed {
  const errors: string[] = [];

  if (!isRecord(input)) {
    throw new Error("Private seed must be a JSON object");
  }

  if (!isRecord(input.household)) {
    throw new Error("Private seed must include household settings");
  }

  const household = input.household;
  const profilesInput = Array.isArray(input.profiles) ? input.profiles : [];

  if (!Array.isArray(input.profiles) || input.profiles.length === 0) {
    errors.push("profiles must include at least one profile");
  }

  const memberEmails = getStringArray(household, "household.memberEmails", errors);
  const normalizedMemberEmails = memberEmails.map(normalizeSeedEmail);
  normalizedMemberEmails.forEach((email, index) => {
    if (!isEmailLike(email)) {
      errors.push(`household.memberEmails[${index}] must be an email-like string`);
    }
  });
  const astrologyVisibility = household.astrologyVisibility;

  const parsedSeed: PrivateHouseholdSeed = {
    household: {
      id: getString(household, "household.id", errors),
      memberEmails: normalizedMemberEmails,
      defaultCapacityMode: parseCapacityMode(
        household,
        "household.defaultCapacityMode",
        errors,
      ),
      maxRitualDurationMinutes: getNumber(
        household,
        "household.maxRitualDurationMinutes",
        errors,
      ),
      preferredRitualStyles: getStringArray(
        household,
        "household.preferredRitualStyles",
        errors,
      ),
      avoidedRitualStyles: getStringArray(
        household,
        "household.avoidedRitualStyles",
        errors,
      ),
      astrologyVisibility: normalizeAstrologyVisibility(astrologyVisibility),
      scheduleConstraints: parseSchedule(
        household.scheduleConstraints,
        "household.scheduleConstraints",
        errors,
      ),
    },
    profiles: profilesInput.flatMap((profile, index): PrivateHouseholdSeedProfile[] => {
      const path = `profiles[${index}]`;

      if (!isRecord(profile)) {
        errors.push(`${path} must be an object`);
        return [];
      }

      return [
        {
          personKey: getString(profile, `${path}.personKey`, errors),
          displayLabel:
            typeof profile.displayLabel === "string" &&
            profile.displayLabel.trim().length > 0
              ? profile.displayLabel.trim()
              : undefined,
          email: getEmail(profile, `${path}.email`, errors),
          profileThemeKeys: parseProfileThemeKeys(
            profile.profileThemeKeys,
            `${path}.profileThemeKeys`,
            errors,
          ),
          assumptions: parseAssumptions(
            profile.assumptions,
            `${path}.assumptions`,
            errors,
          ),
          astrologyProfile: parseAstrologyProfile(
            profile.astrologyProfile,
            `${path}.astrologyProfile`,
            errors,
          ),
          preferredRitualStyles: getOptionalStringArray(
            profile,
            `${path}.preferredRitualStyles`,
            errors,
          ),
          avoidedRitualStyles: getOptionalStringArray(
            profile,
            `${path}.avoidedRitualStyles`,
            errors,
          ),
          defaultCapacityMode:
            profile.defaultCapacityMode === undefined
              ? undefined
              : parseCapacityMode(profile, `${path}.defaultCapacityMode`, errors),
          maxRitualDurationMinutes:
            profile.maxRitualDurationMinutes === undefined
              ? undefined
              : getNumber(profile, `${path}.maxRitualDurationMinutes`, errors),
          scheduleConstraints: parseOptionalSchedule(
            profile.scheduleConstraints,
            `${path}.scheduleConstraints`,
            errors,
          ),
        },
      ];
    }),
  };

  const profileEmails = new Set(parsedSeed.profiles.map((profile) => profile.email));
  const missingProfileEmailCount = parsedSeed.household.memberEmails.filter(
    (email) => !profileEmails.has(email),
  ).length;

  if (missingProfileEmailCount > 0) {
    errors.push(
      `household.memberEmails has ${missingProfileEmailCount} member email(s) without matching profiles`,
    );
  }

  if (errors.length > 0) {
    throw new Error(`Invalid private seed:\n${errors.join("\n")}`);
  }

  return parsedSeed;
}
