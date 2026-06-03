import { doc, getDoc, type Firestore } from "firebase/firestore";

import type { AppAuthState } from "./auth";
import type {
  CapacityMode,
  GenerateWeeklyBriefInput,
  ManualScheduleConstraints,
  PrivateProfilePlaceholderKey,
  ScheduleAssumptionKey,
} from "./generate-weekly-brief";
import {
  getMissingPrivateDataFallback,
  getPrivateEmailDocumentId,
  type CapacitySettingsDocument,
  type PrivateAstrologyProfile,
  type PrivateProfileAssumption,
  type PrivateProfileDocument,
  type PrivateProfileThemeKey,
  type ProfileEmailLinkDocument,
  type ScheduleConstraintsDocument,
} from "./private-data-schema";

export type FirestorePrivateDocuments = {
  profile?: Partial<PrivateProfileDocument> | null;
  capacitySettings?: Partial<CapacitySettingsDocument> | null;
  scheduleConstraints?: Partial<ScheduleConstraintsDocument> | null;
};

export type PrivateBriefData = {
  status: "loaded_private_data" | "using_starter_settings";
  input: GenerateWeeklyBriefInput;
  assumptions: PrivateProfileAssumption[];
  astrologyProfile?: PrivateAstrologyProfile;
};

export function shouldLoadPrivateData(state: AppAuthState): boolean {
  return state.status === "signed_in";
}

const CAPACITY_MODES: CapacityMode[] = ["pause", "low", "steady", "high"];
const PROFILE_KEYS: PrivateProfileThemeKey[] = [
  "private_profile.practical_tending",
  "private_profile.beauty_warmth",
  "private_profile.structured_action",
];
const SCHEDULE_WINDOWS: ScheduleAssumptionKey[] = [
  "schedule.symbolic_event_tuesday",
  "schedule.realistic_window_thursday",
  "schedule.preferred_window_saturday_morning",
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCapacityMode(value: unknown): value is CapacityMode {
  return typeof value === "string" && CAPACITY_MODES.includes(value as CapacityMode);
}

function isProfileKey(value: unknown): value is PrivateProfileThemeKey {
  return typeof value === "string" && PROFILE_KEYS.includes(value as PrivateProfileThemeKey);
}

function sanitizeProfileKeys(value: unknown): PrivateProfilePlaceholderKey[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isProfileKey);
}

function sanitizeScheduleWindows(value: unknown): ScheduleAssumptionKey[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is ScheduleAssumptionKey =>
      typeof item === "string" &&
      SCHEDULE_WINDOWS.includes(item as ScheduleAssumptionKey),
  );
}

function sanitizeAssumptions(value: unknown): PrivateProfileAssumption[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is PrivateProfileAssumption => {
    if (!isRecord(item)) {
      return false;
    }

    const assumptionValue = item.value;

    return (
      typeof item.key === "string" &&
      typeof item.label === "string" &&
      (typeof assumptionValue === "boolean" ||
        typeof assumptionValue === "string" ||
        typeof assumptionValue === "number" ||
        isStringArray(assumptionValue)) &&
      typeof item.source === "string" &&
      ASSUMPTION_SOURCES.includes(item.source as PrivateProfileAssumption["source"]) &&
      typeof item.confidence === "string" &&
      CONFIDENCE_VALUES.includes(item.confidence as PrivateProfileAssumption["confidence"]) &&
      typeof item.editable === "boolean" &&
      typeof item.updatedAtIso === "string"
    );
  });
}

function sanitizeAstrologyProfile(
  value: unknown,
): PrivateAstrologyProfile | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.source !== "string" ||
    !ASTROLOGY_SOURCES.includes(value.source as PrivateAstrologyProfile["source"]) ||
    typeof value.confidence !== "string" ||
    !CONFIDENCE_VALUES.includes(value.confidence as PrivateAstrologyProfile["confidence"]) ||
    !isStringArray(value.placementKeys) ||
    typeof value.updatedAtIso !== "string"
  ) {
    return undefined;
  }

  const profileThemeKeys = sanitizeProfileKeys(value.profileThemeKeys);

  return {
    source: value.source as PrivateAstrologyProfile["source"],
    confidence: value.confidence as PrivateAstrologyProfile["confidence"],
    placementKeys: value.placementKeys,
    profileThemeKeys,
    updatedAtIso: value.updatedAtIso,
  };
}

function resolveScheduleConstraints(
  scheduleDoc: Partial<ScheduleConstraintsDocument> | null | undefined,
  fallbackSchedule: ManualScheduleConstraints,
  maxRitualDurationMinutes: number,
  defaultCapacityMode: CapacityMode,
): ManualScheduleConstraints {
  return {
    unavailableDaysOrNights: isStringArray(scheduleDoc?.unavailableDaysOrNights)
      ? scheduleDoc.unavailableDaysOrNights
      : fallbackSchedule.unavailableDaysOrNights,
    preferredRitualWindows:
      sanitizeScheduleWindows(scheduleDoc?.preferredRitualWindows).length > 0
        ? sanitizeScheduleWindows(scheduleDoc?.preferredRitualWindows)
        : fallbackSchedule.preferredRitualWindows,
    recurringHouseholdConstraintNotes: isStringArray(
      scheduleDoc?.recurringHouseholdConstraintNotes,
    )
      ? scheduleDoc.recurringHouseholdConstraintNotes
      : fallbackSchedule.recurringHouseholdConstraintNotes,
    workOrSchoolConstraintNotes: isStringArray(
      scheduleDoc?.workOrSchoolConstraintNotes,
    )
      ? scheduleDoc.workOrSchoolConstraintNotes
      : fallbackSchedule.workOrSchoolConstraintNotes,
    maxRitualDurationMinutes,
    defaultCapacityMode,
  };
}

export function resolvePrivateBriefData(
  documents: FirestorePrivateDocuments,
): PrivateBriefData {
  const fallback = getMissingPrivateDataFallback();
  const fallbackSchedule = fallback.scheduleConstraints;

  const profileKeys = sanitizeProfileKeys(documents.profile?.profileThemeKeys);
  const privateProfileKeys =
    profileKeys.length > 0 ? profileKeys : fallback.privateProfileKeys;
  const capacityMode = isCapacityMode(
    documents.capacitySettings?.defaultCapacityMode,
  )
    ? documents.capacitySettings.defaultCapacityMode
    : fallback.capacityMode;
  const maxRitualDurationMinutes =
    typeof documents.capacitySettings?.maxRitualDurationMinutes === "number"
      ? documents.capacitySettings.maxRitualDurationMinutes
      : fallbackSchedule.maxRitualDurationMinutes;
  const scheduleConstraints = resolveScheduleConstraints(
    documents.scheduleConstraints,
    fallbackSchedule,
    maxRitualDurationMinutes,
    capacityMode,
  );
  const assumptions = sanitizeAssumptions(documents.profile?.assumptions);
  const astrologyProfile = sanitizeAstrologyProfile(
    documents.profile?.astrologyProfile,
  );
  const hasLoadedData = Boolean(
    documents.profile || documents.capacitySettings || documents.scheduleConstraints,
  );

  return {
    status: hasLoadedData ? "loaded_private_data" : "using_starter_settings",
    input: {
      privateProfileKeys,
      capacityMode,
      scheduleConstraints,
    },
    assumptions,
    astrologyProfile,
  };
}

async function getUserScopedDocument<T>(
  db: Firestore,
  collectionName: string,
  userId: string,
): Promise<Partial<T> | null> {
  const snapshot = await getDoc(doc(db, collectionName, userId));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as Partial<T>;
}

async function getEmailLinkedDocuments(
  db: Firestore,
  email: string | null | undefined,
): Promise<FirestorePrivateDocuments> {
  if (!email) {
    return {};
  }

  try {
    const linkSnapshot = await getDoc(
      doc(db, "profileEmailLinks", getPrivateEmailDocumentId(email)),
    );

    if (!linkSnapshot.exists()) {
      return {};
    }

    const link = linkSnapshot.data() as Partial<ProfileEmailLinkDocument>;

    if (typeof link.profileId !== "string" || link.profileId.length === 0) {
      return {};
    }

    const [profile, capacitySettings, scheduleConstraints] = await Promise.all([
      getUserScopedDocument<PrivateProfileDocument>(db, "profiles", link.profileId),
      getUserScopedDocument<CapacitySettingsDocument>(
        db,
        "capacitySettings",
        link.profileId,
      ),
      getUserScopedDocument<ScheduleConstraintsDocument>(
        db,
        "scheduleConstraints",
        link.profileId,
      ),
    ]);

    return {
      profile,
      capacitySettings,
      scheduleConstraints,
    };
  } catch {
    return {};
  }
}

export async function loadPrivateBriefData(
  db: Firestore,
  userId: string,
  email?: string | null,
): Promise<PrivateBriefData> {
  const [profile, capacitySettings, scheduleConstraints, emailLinkedDocuments] =
    await Promise.all([
    getUserScopedDocument<PrivateProfileDocument>(db, "profiles", userId),
    getUserScopedDocument<CapacitySettingsDocument>(
      db,
      "capacitySettings",
      userId,
    ),
    getUserScopedDocument<ScheduleConstraintsDocument>(
      db,
      "scheduleConstraints",
      userId,
    ),
    getEmailLinkedDocuments(db, email),
  ]);

  return resolvePrivateBriefData({
    profile: profile ?? emailLinkedDocuments.profile,
    capacitySettings: capacitySettings ?? emailLinkedDocuments.capacitySettings,
    scheduleConstraints:
      scheduleConstraints ?? emailLinkedDocuments.scheduleConstraints,
  });
}
