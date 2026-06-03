import { describe, expect, it } from "vitest";

import { generateWeeklyBrief } from "../../src/lib/generate-weekly-brief";
import {
  resolvePrivateBriefData,
  shouldLoadPrivateData,
} from "../../src/lib/private-data";
import { getPrivateEmailDocumentId } from "../../src/lib/private-data-schema";

describe("private Firestore data resolution", () => {
  it("creates stable private email document ids without exposing raw email in paths", () => {
    expect(getPrivateEmailDocumentId("Person_A@Example.com")).toBe(
      "person_a%40example.com",
    );
  });

  it("falls back safely when Firestore private data is missing", () => {
    const privateBriefData = resolvePrivateBriefData({});
    const brief = generateWeeklyBrief(privateBriefData.input);

    expect(privateBriefData.status).toBe("using_starter_settings");
    expect(privateBriefData.input.privateProfileKeys).toEqual([
      "private_profile.practical_tending",
    ]);
    expect(privateBriefData.input.capacityMode).toBe("low");
    expect(brief.bestWindow).toContain("Thursday evening");
  });

  it("passes loaded private profile keys into the generator", () => {
    const privateBriefData = resolvePrivateBriefData({
      profile: {
        profileThemeKeys: ["private_profile.beauty_warmth"],
      },
    });
    const brief = generateWeeklyBrief(privateBriefData.input);

    expect(privateBriefData.status).toBe("loaded_private_data");
    expect(privateBriefData.input.privateProfileKeys).toEqual([
      "private_profile.beauty_warmth",
    ]);
    expect(brief.trace.privateProfileKeys).toEqual([
      "private_profile.beauty_warmth",
    ]);
    expect(brief.trace.symbolicCards).toContain("private_profile.beauty_warmth");
  });

  it("uses loaded capacity mode to affect generated brief size", () => {
    const privateBriefData = resolvePrivateBriefData({
      capacitySettings: {
        defaultCapacityMode: "steady",
        maxRitualDurationMinutes: 20,
      },
    });
    const brief = generateWeeklyBrief(privateBriefData.input);

    expect(privateBriefData.input.capacityMode).toBe("steady");
    expect(brief.bestWindow).toContain("10-20 minutes");
  });

  it("uses loaded schedule constraints to affect best window and trace", () => {
    const privateBriefData = resolvePrivateBriefData({
      scheduleConstraints: {
        unavailableDaysOrNights: ["Tuesday night"],
        preferredRitualWindows: ["schedule.preferred_window_saturday_morning"],
        recurringHouseholdConstraintNotes: [
          "Generic household constraint: weekend mornings are calmer.",
        ],
        workOrSchoolConstraintNotes: [
          "Generic work or school constraint: avoid the busiest night.",
        ],
      },
    });
    const brief = generateWeeklyBrief(privateBriefData.input);

    expect(brief.bestWindow).toContain("Saturday morning");
    expect(brief.trace.scheduleAssumptions).toEqual([
      "schedule.symbolic_event_tuesday",
      "schedule.preferred_window_saturday_morning",
    ]);
  });

  it("represents starter assumptions with source confidence and editability", () => {
    const privateBriefData = resolvePrivateBriefData({
      profile: {
        assumptions: [
          {
            key: "assumption.low_overwhelm",
            label: "May prefer low-overwhelm suggestions",
            value: true,
            source: "starter_assumption",
            confidence: "low",
            editable: true,
            updatedAtIso: "2026-01-01T00:00:00.000Z",
          },
        ],
      },
    });

    expect(privateBriefData.assumptions).toEqual([
      {
        key: "assumption.low_overwhelm",
        label: "May prefer low-overwhelm suggestions",
        value: true,
        source: "starter_assumption",
        confidence: "low",
        editable: true,
        updatedAtIso: "2026-01-01T00:00:00.000Z",
      },
    ]);
  });

  it("represents private astrology metadata without real placements", () => {
    const privateBriefData = resolvePrivateBriefData({
      profile: {
        astrologyProfile: {
          source: "manual_entry",
          confidence: "low",
          placementKeys: ["placement.sun.placeholder"],
          profileThemeKeys: ["private_profile.structured_action"],
          updatedAtIso: "2026-01-01T00:00:00.000Z",
        },
      },
    });

    expect(privateBriefData.astrologyProfile).toEqual({
      source: "manual_entry",
      confidence: "low",
      placementKeys: ["placement.sun.placeholder"],
      profileThemeKeys: ["private_profile.structured_action"],
      updatedAtIso: "2026-01-01T00:00:00.000Z",
    });
  });

  it("does not load private data for unauthenticated states", () => {
    expect(shouldLoadPrivateData({ status: "loading" })).toBe(false);
    expect(
      shouldLoadPrivateData({ status: "signed_out", configReady: true }),
    ).toBe(false);
    expect(
      shouldLoadPrivateData({ status: "unauthorized", configReady: true }),
    ).toBe(false);
    expect(
      shouldLoadPrivateData({
        status: "signed_in",
        user: { uid: "placeholder-user-id", email: "person_a@example.com" },
      }),
    ).toBe(true);
  });

  it("keeps examples free of private real data", () => {
    const serialized = JSON.stringify(
      resolvePrivateBriefData({
        profile: {
          astrologyProfile: {
            source: "manual_entry",
            confidence: "low",
            placementKeys: ["placement.sun.placeholder"],
            profileThemeKeys: ["private_profile.structured_action"],
            updatedAtIso: "2026-01-01T00:00:00.000Z",
          },
        },
      }),
    ).toLowerCase();

    expect(serialized).not.toContain("birth");
    expect(serialized).not.toContain("natal");
    expect(serialized).not.toContain("relationship details");
    expect(serialized).not.toContain("private source text");
  });
});
