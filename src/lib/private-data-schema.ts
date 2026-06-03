import type { CapacityMode, ManualScheduleConstraints } from "./generate-weekly-brief";

export const FIRESTORE_COLLECTIONS = [
  "households",
  "profileEmailLinks",
  "profiles",
  "scheduleConstraints",
  "capacitySettings",
  "briefs",
  "feedback",
  "ritualNotes",
] as const;

export type FirestoreCollection = (typeof FIRESTORE_COLLECTIONS)[number];

export type PrivateProfileThemeKey =
  | "private_profile.practical_tending"
  | "private_profile.beauty_warmth"
  | "private_profile.structured_action";

export type PrivateProfileAssumption = {
  key: string;
  label: string;
  value: boolean | string | string[] | number;
  source: "starter_assumption" | "astro_material" | "user_confirmed" | "feedback";
  confidence: "low" | "medium" | "high";
  editable: boolean;
  updatedAtIso: string;
};

export type PrivateAudience = "person_a" | "person_b" | "together" | "either";

export type AstrologyVisibility = "subtle" | "balanced" | "explicit";

export type PrivateAstrologyProfile = {
  source: "user_provided_chart" | "astro_material" | "manual_entry";
  confidence: "low" | "medium" | "high";
  placementKeys: string[];
  profileThemeKeys: PrivateProfileThemeKey[];
  updatedAtIso: string;
};

export type HouseholdDocument = {
  id: string;
  ownerUserId?: string | null;
  displayLabel: "household";
  memberUserIds: string[];
  memberEmails: string[];
  createdAtIso: string;
  updatedAtIso: string;
};

export type ProfileEmailLinkDocument = {
  id: string;
  email: string;
  householdId: string;
  profileId: string;
  userId?: string | null;
  status: "pending" | "linked";
  updatedAtIso: string;
};

export type PrivateProfileDocument = {
  id: string;
  householdId: string;
  userId?: string | null;
  email?: string;
  personKey?: PrivateAudience;
  displayLabel?: string;
  audienceLabels?: Partial<Record<PrivateAudience, string>>;
  profileThemeKeys: PrivateProfileThemeKey[];
  preferredRitualStyles: string[];
  avoidedRitualStyles: string[];
  defaultAudience?: PrivateAudience;
  enabledAudiences?: PrivateAudience[];
  tonePreferences?: string[];
  astrologyVisibility?: AstrologyVisibility;
  assumptions: PrivateProfileAssumption[];
  astrologyProfile?: PrivateAstrologyProfile;
  updatedAtIso: string;
};

export type ScheduleConstraintsDocument = ManualScheduleConstraints & {
  id: string;
  householdId: string;
  userId?: string | null;
  email?: string;
  updatedAtIso: string;
};

export type CapacitySettingsDocument = {
  id: string;
  householdId: string;
  userId?: string | null;
  email?: string;
  defaultCapacityMode: CapacityMode;
  maxRitualDurationMinutes: number;
  updatedAtIso: string;
};

export type SavedBriefDocument = {
  id: string;
  householdId: string;
  userId: string;
  dateRange: string;
  theme: string;
  symbolicCardKeys: string[];
  privateProfileKeys: PrivateProfileThemeKey[];
  createdAtIso: string;
};

export type FeedbackDocument = {
  id: string;
  householdId?: string;
  userId: string;
  userEmail?: string;
  briefId: string;
  feedbackType:
    | "good"
    | "too_much"
    | "too_generic"
    | "more_like_this"
    | "not_this_style"
    | "skipped"
    | "try_again";
  symbolicCardKeys: string[];
  ritualPatternKeys: string[];
  timingFactKeys: string[];
  capacityMode: string;
  audience: PrivateAudience;
  sourceReviewIds: string[];
  sourceNoteIds: string[];
  note?: string;
  createdAtIso: string;
};

export type RitualNoteDocument = {
  id: string;
  householdId: string;
  userId: string;
  briefId?: string;
  genericNoteLabel: "ritual_note";
  createdAtIso: string;
  updatedAtIso: string;
};

export type PrivateDataFallback = {
  status: "missing_private_profile";
  privateProfileKeys: ["private_profile.practical_tending"];
  capacityMode: "low";
  scheduleConstraints: {
    unavailableDaysOrNights: ["Tuesday night"];
    preferredRitualWindows: ["schedule.realistic_window_thursday"];
    recurringHouseholdConstraintNotes: [
      "Generic household constraint: weeknights need low setup.",
    ];
    workOrSchoolConstraintNotes: [
      "Generic work or school constraint: avoid the busiest night.",
    ];
    maxRitualDurationMinutes: 20;
    defaultCapacityMode: "low";
  };
};

export function getMissingPrivateDataFallback(): PrivateDataFallback {
  return {
    status: "missing_private_profile",
    privateProfileKeys: ["private_profile.practical_tending"],
    capacityMode: "low",
    scheduleConstraints: {
      unavailableDaysOrNights: ["Tuesday night"],
      preferredRitualWindows: ["schedule.realistic_window_thursday"],
      recurringHouseholdConstraintNotes: [
        "Generic household constraint: weeknights need low setup.",
      ],
      workOrSchoolConstraintNotes: [
        "Generic work or school constraint: avoid the busiest night.",
      ],
      maxRitualDurationMinutes: 20,
      defaultCapacityMode: "low",
    },
  };
}

export function getPrivateEmailDocumentId(email: string): string {
  return encodeURIComponent(email.trim().toLowerCase());
}
