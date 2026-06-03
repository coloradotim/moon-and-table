import { describe, expect, it } from "vitest";

import {
  FIRESTORE_COLLECTIONS,
  getMissingPrivateDataFallback,
} from "../../src/lib/private-data-schema";

describe("private data schema", () => {
  it("documents the starter Firestore collections", () => {
    expect([...FIRESTORE_COLLECTIONS].sort()).toEqual(
      [
        "briefs",
        "capacitySettings",
        "feedback",
        "households",
        "profileEmailLinks",
        "profiles",
        "ritualNotes",
        "scheduleConstraints",
      ].sort(),
    );
  });

  it("uses a generic fallback when private profile data is missing", () => {
    expect(getMissingPrivateDataFallback()).toEqual({
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
    });
  });

  it("keeps fallback output privacy-safe", () => {
    const fallback = JSON.stringify(getMissingPrivateDataFallback()).toLowerCase();

    expect(fallback).not.toContain("birth");
    expect(fallback).not.toContain("natal");
    expect(fallback).not.toContain("relationship details");
    expect(fallback).not.toContain("private source text");
  });
});
