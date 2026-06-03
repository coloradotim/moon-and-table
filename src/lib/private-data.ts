import { doc, getDoc, updateDoc, type Firestore } from "firebase/firestore";

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
  type AstrologyVisibility,
  type CapacitySettingsDocument,
  type HouseholdDocument,
  type PrivateAstrologyProfile,
  type PrivateAudience,
  type PrivateProfileAssumption,
  type PrivateProfileDocument,
  type PrivateProfileThemeKey,
  type ProfileEmailLinkDocument,
  type ScheduleConstraintsDocument,
} from "./private-data-schema";
import {
  buildProfileTuningUpdate,
  type ProfileTuningFormInput,
  type ProfileTuningProfile,
  type ProfileTuningSettings,
} from "./profile-tuning";
import { normalizeProfilePreferenceValues } from "./profile-preference-taxonomy";
import type { PrivateProfileSignalInput } from "./private-profile-signals";

export type FirestorePrivateDocuments = {
  profile?: Partial<PrivateProfileDocument> | null;
  capacitySettings?: Partial<CapacitySettingsDocument> | null;
  scheduleConstraints?: Partial<ScheduleConstraintsDocument> | null;
};

export type PrivateDocumentRefs = {
  profileId?: string;
  capacitySettingsId?: string;
  scheduleConstraintsId?: string;
};

export type PrivateDisplayContext = {
  currentUserDisplayName?: string | null;
};

export type PrivateBriefData = {
  status: "loaded_private_data" | "using_starter_settings";
  input: GenerateWeeklyBriefInput;
  householdId?: string;
  assumptions: PrivateProfileAssumption[];
  astrologyProfile?: PrivateAstrologyProfile;
  tuning: ProfileTuningSettings | null;
  tuningProfiles: ProfileTuningProfile[];
  documentRefs: PrivateDocumentRefs;
};

export function shouldLoadPrivateData(state: AppAuthState): boolean {
  return state.status === "signed_in";
}

export function hasLoadedPrivateData(privateBriefData: PrivateBriefData): boolean {
  return privateBriefData.status === "loaded_private_data";
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
const AUDIENCES: PrivateAudience[] = ["person_a", "person_b", "together", "either"];
const ASTROLOGY_VISIBILITY_VALUES: AstrologyVisibility[] = [
  "subtle",
  "balanced",
  "explicit",
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

function isAudience(value: unknown): value is PrivateAudience {
  return typeof value === "string" && AUDIENCES.includes(value as PrivateAudience);
}

function getFallbackAudienceLabel(audience: PrivateAudience): string {
  switch (audience) {
    case "person_a":
      return "Person A";
    case "person_b":
      return "Person B";
    case "together":
      return "Together";
    case "either":
      return "Either";
  }
}

function getFirstDisplayNamePart(value: string | null | undefined): string | null {
  const firstPart = value?.trim().split(/\s+/)[0];

  return firstPart && firstPart.length > 0 ? firstPart : null;
}

function resolveAudienceLabels(
  value: unknown,
  profile: Partial<PrivateProfileDocument> | null | undefined,
  displayContext: PrivateDisplayContext,
): Record<PrivateAudience, string> {
  const labels = Object.fromEntries(
    AUDIENCES.map((audience) => [audience, getFallbackAudienceLabel(audience)]),
  ) as Record<PrivateAudience, string>;

  if (!isRecord(value)) {
    return labels;
  }

  for (const audience of AUDIENCES) {
    const label = value[audience];

    if (typeof label === "string" && label.trim().length > 0) {
      labels[audience] = label.trim();
    }
  }

  if (
    isAudience(profile?.personKey) &&
    typeof profile.displayLabel === "string" &&
    profile.displayLabel.trim().length > 0
  ) {
    labels[profile.personKey] = profile.displayLabel.trim();
  }

  if (isAudience(profile?.personKey)) {
    const currentUserFirstName = getFirstDisplayNamePart(
      displayContext.currentUserDisplayName,
    );

    if (currentUserFirstName) {
      labels[profile.personKey] = currentUserFirstName;
    }
  }

  return labels;
}

function resolveProfileLabel(
  profile: Partial<PrivateProfileDocument> | null | undefined,
  displayContext: PrivateDisplayContext = {},
): string {
  const currentUserFirstName = getFirstDisplayNamePart(
    displayContext.currentUserDisplayName,
  );

  if (currentUserFirstName) {
    return currentUserFirstName;
  }

  if (typeof profile?.displayLabel === "string" && profile.displayLabel.trim()) {
    return profile.displayLabel.trim();
  }

  if (isAudience(profile?.personKey)) {
    return getFallbackAudienceLabel(profile.personKey);
  }

  return "Profile";
}

function isAstrologyVisibility(value: unknown): value is AstrologyVisibility {
  return (
    typeof value === "string" &&
    ASTROLOGY_VISIBILITY_VALUES.includes(value as AstrologyVisibility)
  );
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
  documentRefs: PrivateDocumentRefs = {},
  displayContext: PrivateDisplayContext = {},
  tuningProfiles: ProfileTuningProfile[] = [],
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
  const defaultAudience = isAudience(documents.profile?.defaultAudience)
    ? documents.profile.defaultAudience
    : "either";
  const preferredRitualStyles = isStringArray(
    documents.profile?.preferredRitualStyles,
  )
    ? normalizeProfilePreferenceValues(documents.profile.preferredRitualStyles)
    : [];
  const avoidedRitualStyles = isStringArray(documents.profile?.avoidedRitualStyles)
    ? normalizeProfilePreferenceValues(documents.profile.avoidedRitualStyles)
    : [];
  const tonePreferences = isStringArray(documents.profile?.tonePreferences)
    ? normalizeProfilePreferenceValues(documents.profile.tonePreferences)
    : [];
  const tuning =
    documents.profile || documents.capacitySettings
      ? {
          personKey: isAudience(documents.profile?.personKey)
            ? documents.profile.personKey
            : undefined,
          defaultAudience,
          audienceLabels: resolveAudienceLabels(
            documents.profile?.audienceLabels,
            documents.profile,
            displayContext,
          ),
          defaultCapacityMode: capacityMode,
          maxRitualDurationMinutes,
          preferredRitualStyles,
          avoidedRitualStyles,
          profileThemeKeys: privateProfileKeys,
          astrologyProfileThemeKeys: astrologyProfile?.profileThemeKeys ?? [],
          tonePreferences,
          astrologyVisibility: isAstrologyVisibility(
            documents.profile?.astrologyVisibility,
          )
            ? documents.profile.astrologyVisibility
            : "balanced",
          assumptions,
        }
      : null;
  const hasLoadedData = Boolean(
    documents.profile || documents.capacitySettings || documents.scheduleConstraints,
  );
  const householdId = getHouseholdId(documents);

  return {
    status: hasLoadedData ? "loaded_private_data" : "using_starter_settings",
    input: {
      privateProfileKeys,
      capacityMode,
      scheduleConstraints,
      preferredRitualStyles,
      avoidedRitualStyles,
      profileInputs: buildGeneratorProfileInputs(
        documents,
        tuningProfiles,
        {
          privateProfileKeys,
          astrologyProfileThemeKeys: astrologyProfile?.profileThemeKeys ?? [],
          preferredRitualStyles,
          avoidedRitualStyles,
          tonePreferences,
          defaultAudience,
        },
      ),
      audience: defaultAudience,
    },
    householdId,
    assumptions,
    astrologyProfile,
    tuning,
    tuningProfiles:
      tuning && documentRefs.profileId && documentRefs.capacitySettingsId && documentRefs.scheduleConstraintsId
        ? [
            {
              id: documentRefs.profileId,
              label: resolveProfileLabel(documents.profile, displayContext),
              settings: tuning,
              documentRefs: {
                profileId: documentRefs.profileId,
                capacitySettingsId: documentRefs.capacitySettingsId,
                scheduleConstraintsId: documentRefs.scheduleConstraintsId,
              },
            },
            ...tuningProfiles.filter((profile) => profile.id !== documentRefs.profileId),
          ]
        : tuningProfiles,
    documentRefs,
  };
}

function buildGeneratorProfileInputs(
  documents: FirestorePrivateDocuments,
  tuningProfiles: ProfileTuningProfile[],
  current: {
    privateProfileKeys: PrivateProfileThemeKey[];
    astrologyProfileThemeKeys: PrivateProfileThemeKey[];
    preferredRitualStyles: string[];
    avoidedRitualStyles: string[];
    tonePreferences: string[];
    defaultAudience: PrivateAudience;
  },
): PrivateProfileSignalInput[] {
  const currentAudience = isAudience(documents.profile?.personKey)
    ? documents.profile.personKey
    : current.defaultAudience;
  const currentProfileInput: PrivateProfileSignalInput = {
    audience: currentAudience,
    label: typeof documents.profile?.displayLabel === "string"
      ? documents.profile.displayLabel
      : undefined,
    profileThemeKeys: current.privateProfileKeys,
    astrologyProfileThemeKeys: current.astrologyProfileThemeKeys,
    preferredRitualStyles: current.preferredRitualStyles,
    avoidedRitualStyles: current.avoidedRitualStyles,
    tonePreferences: current.tonePreferences,
  };
  const householdProfileInputs = tuningProfiles.map((profile) => ({
    audience: profile.settings.personKey ?? profile.settings.defaultAudience,
    label: profile.label,
    profileThemeKeys: profile.settings.profileThemeKeys ?? [],
    astrologyProfileThemeKeys: profile.settings.astrologyProfileThemeKeys ?? [],
    preferredRitualStyles: profile.settings.preferredRitualStyles,
    avoidedRitualStyles: profile.settings.avoidedRitualStyles,
    tonePreferences: profile.settings.tonePreferences ?? [],
  }));

  return [
    currentProfileInput,
    ...householdProfileInputs,
  ].filter(
    (profile, index, profiles) =>
      profiles.findIndex((candidate) => candidate.audience === profile.audience) === index,
  );
}

type LoadedDocument<T> = {
  id: string;
  data: Partial<T>;
};

async function getUserScopedDocument<T>(
  db: Firestore,
  collectionName: string,
  userId: string,
): Promise<LoadedDocument<T> | null> {
  const snapshot = await getDoc(doc(db, collectionName, userId));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    data: snapshot.data() as Partial<T>,
  };
}

async function getEmailLinkedDocuments(
  db: Firestore,
  email: string | null | undefined,
): Promise<{
  documents: FirestorePrivateDocuments;
  documentRefs: PrivateDocumentRefs;
}> {
  if (!email) {
    return { documents: {}, documentRefs: {} };
  }

  try {
    const linkSnapshot = await getDoc(
      doc(db, "profileEmailLinks", getPrivateEmailDocumentId(email)),
    );

    if (!linkSnapshot.exists()) {
      return { documents: {}, documentRefs: {} };
    }

    const link = linkSnapshot.data() as Partial<ProfileEmailLinkDocument>;

    if (typeof link.profileId !== "string" || link.profileId.length === 0) {
      return { documents: {}, documentRefs: {} };
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
      documents: {
        profile: profile?.data,
        capacitySettings: capacitySettings?.data,
        scheduleConstraints: scheduleConstraints?.data,
      },
      documentRefs: {
        profileId: profile?.id,
        capacitySettingsId: capacitySettings?.id,
        scheduleConstraintsId: scheduleConstraints?.id,
      },
    };
  } catch {
    return { documents: {}, documentRefs: {} };
  }
}

async function getHouseholdDocument(
  db: Firestore,
  householdId: string | undefined,
): Promise<Partial<HouseholdDocument> | null> {
  if (!householdId) {
    return null;
  }

  const snapshot = await getDoc(doc(db, "households", householdId));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as Partial<HouseholdDocument>;
}

function getProfileTuningSettings(
  documents: FirestorePrivateDocuments,
  displayContext: PrivateDisplayContext = {},
): ProfileTuningSettings | null {
  return resolvePrivateBriefData(documents, {}, displayContext, []).tuning;
}

function getHouseholdId(documents: FirestorePrivateDocuments): string | undefined {
  return (
    documents.profile?.householdId ??
    documents.capacitySettings?.householdId ??
    documents.scheduleConstraints?.householdId
  );
}

async function getHouseholdTuningProfiles(
  db: Firestore,
  documents: FirestorePrivateDocuments,
  currentProfileId: string | undefined,
  currentEmail: string | null | undefined,
  currentDisplayName: string | null | undefined,
): Promise<ProfileTuningProfile[]> {
  const household = await getHouseholdDocument(db, getHouseholdId(documents));
  const memberEmails = Array.isArray(household?.memberEmails)
    ? household.memberEmails
    : [];

  if (memberEmails.length === 0) {
    return [];
  }

  const profiles = await Promise.all(
    memberEmails.map(async (email) => {
      const result = await getEmailLinkedDocuments(db, email);
      const isCurrentMember =
        typeof currentEmail === "string" &&
        email.trim().toLowerCase() === currentEmail.trim().toLowerCase();
      const memberDisplayContext =
        isCurrentMember
          ? { currentUserDisplayName: currentDisplayName }
          : {};
      const settings = getProfileTuningSettings(
        result.documents,
        memberDisplayContext,
      );
      const { profileId, capacitySettingsId, scheduleConstraintsId } =
        result.documentRefs;

      if (!settings || !profileId || !capacitySettingsId || !scheduleConstraintsId) {
        return null;
      }

      return {
        id: profileId,
        label: resolveProfileLabel(result.documents.profile, memberDisplayContext),
        settings,
        documentRefs: {
          profileId,
          capacitySettingsId,
          scheduleConstraintsId,
        },
      };
    }),
  );

  return profiles.filter(
    (profile): profile is ProfileTuningProfile =>
      Boolean(profile && profile.id !== currentProfileId),
  );
}

export async function loadPrivateBriefData(
  db: Firestore,
  userId: string,
  email?: string | null,
  displayName?: string | null,
): Promise<PrivateBriefData> {
  const [profile, capacitySettings, scheduleConstraints, emailLinkedResult] =
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
  const documents = {
    profile: profile?.data ?? emailLinkedResult.documents.profile,
    capacitySettings:
      capacitySettings?.data ?? emailLinkedResult.documents.capacitySettings,
    scheduleConstraints:
      scheduleConstraints?.data ?? emailLinkedResult.documents.scheduleConstraints,
  };
  const documentRefs = {
    profileId: profile?.id ?? emailLinkedResult.documentRefs.profileId,
    capacitySettingsId:
      capacitySettings?.id ?? emailLinkedResult.documentRefs.capacitySettingsId,
    scheduleConstraintsId:
      scheduleConstraints?.id ?? emailLinkedResult.documentRefs.scheduleConstraintsId,
  };

  const householdTuningProfiles = await getHouseholdTuningProfiles(
    db,
    documents,
    documentRefs.profileId,
    email,
    displayName,
  ).catch(() => []);

  return resolvePrivateBriefData(documents, documentRefs, {
    currentUserDisplayName: displayName,
  }, householdTuningProfiles);
}

export async function updatePrivateProfileTuning(
  db: Firestore,
  tuningProfile: ProfileTuningProfile,
  input: ProfileTuningFormInput,
): Promise<void> {
  const { profileId, capacitySettingsId, scheduleConstraintsId } =
    tuningProfile.documentRefs;

  if (!profileId || !capacitySettingsId || !scheduleConstraintsId) {
    throw new Error("Private profile document references are missing.");
  }

  const update = buildProfileTuningUpdate(
    tuningProfile.settings,
    input,
    new Date().toISOString(),
  );

  await Promise.all([
    updateDoc(doc(db, "profiles", profileId), update.profile),
    updateDoc(doc(db, "capacitySettings", capacitySettingsId), update.capacitySettings),
    updateDoc(
      doc(db, "scheduleConstraints", scheduleConstraintsId),
      update.scheduleConstraints,
    ),
  ]);
}
