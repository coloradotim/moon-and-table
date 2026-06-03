import type { CapacityMode, ManualScheduleConstraints } from "./generate-weekly-brief";

export const FIRESTORE_COLLECTIONS = [
  "households",
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

export type HouseholdDocument = {
  id: string;
  ownerUserId: string;
  displayLabel: "household";
  memberUserIds: string[];
  createdAtIso: string;
  updatedAtIso: string;
};

export type PrivateProfileDocument = {
  id: string;
  householdId: string;
  userId: string;
  profileThemeKeys: PrivateProfileThemeKey[];
  preferredRitualStyles: string[];
  avoidedRitualStyles: string[];
  updatedAtIso: string;
};

export type ScheduleConstraintsDocument = ManualScheduleConstraints & {
  id: string;
  householdId: string;
  userId: string;
  updatedAtIso: string;
};

export type CapacitySettingsDocument = {
  id: string;
  householdId: string;
  userId: string;
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
  householdId: string;
  userId: string;
  briefId: string;
  feedbackType:
    | "saved"
    | "too_much"
    | "too_cheesy"
    | "do_again"
    | "bad_timing"
    | "good_timing";
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
