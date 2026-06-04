import { describe, expect, it } from "vitest";

import { generateWeeklyBrief } from "../../src/lib/generate-weekly-brief";
import {
  hasLoadedPrivateData,
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
    expect(hasLoadedPrivateData(privateBriefData)).toBe(false);
    expect(privateBriefData.input.privateProfileKeys).toEqual([
      "private_profile.practical_tending",
    ]);
    expect(privateBriefData.input.capacityMode).toBe("low");
    expect(brief.bestWindow).toBe("When you have five quiet minutes.");
  });

  it("passes loaded private profile keys into the generator", () => {
    const privateBriefData = resolvePrivateBriefData({
      profile: {
        profileThemeKeys: ["private_profile.beauty_warmth"],
      },
    });
    const brief = generateWeeklyBrief(privateBriefData.input);

    expect(privateBriefData.status).toBe("loaded_private_data");
    expect(hasLoadedPrivateData(privateBriefData)).toBe(true);
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
    expect(brief.bestWindow).toBe("When you have a little space this week.");
  });

  it("keeps loaded schedule constraints inert for user-facing timing", () => {
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

    expect(brief.bestWindow).toBe("When you have five quiet minutes.");
    expect(brief.bestWindow).not.toContain("Saturday morning");
    expect(brief.trace.scheduleAssumptions).toEqual([]);
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
          placements: [
            {
              bodyOrPoint: "moon",
              sign: "virgo",
              degree: 12,
              themeKeys: ["practical_care"],
            },
            {
              bodyOrPoint: "unknown" as never,
              sign: "virgo",
              degree: 12,
            },
          ],
          profileThemeKeys: ["private_profile.structured_action"],
          updatedAtIso: "2026-01-01T00:00:00.000Z",
        },
      },
    });

    expect(privateBriefData.astrologyProfile).toEqual({
      source: "manual_entry",
      confidence: "low",
      placementKeys: ["placement.sun.placeholder"],
      placements: [
        {
          bodyOrPoint: "moon",
          sign: "virgo",
          degree: 12,
          themeKeys: ["practical_care"],
        },
      ],
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
        user: {
          uid: "placeholder-user-id",
          email: "person_a@example.com",
          displayName: "Person A",
        },
      }),
    ).toBe(true);
  });

  it("uses private or signed-in display labels for audience options", () => {
    const privateBriefData = resolvePrivateBriefData(
      {
        profile: {
          personKey: "person_a",
          audienceLabels: {
            person_a: "Alex",
            person_b: "Blair",
          },
          profileThemeKeys: ["private_profile.practical_tending"],
        },
        capacitySettings: {
          defaultCapacityMode: "low",
          maxRitualDurationMinutes: 5,
        },
      },
      {
        profileId: "profile_morgan",
        capacitySettingsId: "profile_morgan",
        scheduleConstraintsId: "profile_morgan",
      },
      { currentUserDisplayName: "Morgan Example" },
    );

    expect(privateBriefData.tuning?.audienceLabels).toEqual({
      person_a: "Morgan",
      person_b: "Blair",
      together: "Together",
      either: "Either",
    });
    expect(privateBriefData.tuningProfiles[0]?.label).toBe("Morgan");
  });

  it("keeps profile tuning records separated by private profile id", () => {
    const privateBriefData = resolvePrivateBriefData(
      {
        profile: {
          displayLabel: "Alex",
          defaultAudience: "person_a",
        },
        capacitySettings: {
          defaultCapacityMode: "low",
          maxRitualDurationMinutes: 5,
        },
      },
      {
        profileId: "profile_alex",
        capacitySettingsId: "profile_alex",
        scheduleConstraintsId: "profile_alex",
      },
      {},
      [
        {
          id: "profile_blair",
          label: "Blair",
          settings: {
            defaultAudience: "person_b",
            audienceLabels: {
              person_a: "Alex",
              person_b: "Blair",
              together: "Together",
              either: "Either",
            },
            defaultCapacityMode: "steady",
            maxRitualDurationMinutes: 20,
            preferredRitualStyles: ["candle"],
            avoidedRitualStyles: ["shopping_required"],
            profileThemeKeys: ["private_profile.beauty_warmth"],
            astrologyProfileThemeKeys: ["private_profile.structured_action"],
            tonePreferences: ["warm"],
            astrologyVisibility: "subtle",
            assumptions: [],
          },
          documentRefs: {
            profileId: "profile_blair",
            capacitySettingsId: "profile_blair",
            scheduleConstraintsId: "profile_blair",
          },
        },
      ],
    );

    expect(privateBriefData.tuningProfiles.map((profile) => profile.id)).toEqual([
      "profile_alex",
      "profile_blair",
    ]);
    expect(privateBriefData.tuningProfiles.map((profile) => profile.label)).toEqual([
      "Alex",
      "Blair",
    ]);
    expect(privateBriefData.input.profileInputs).toEqual([
      expect.objectContaining({
        audience: "person_a",
        profileThemeKeys: ["private_profile.practical_tending"],
      }),
      expect.objectContaining({
        audience: "person_b",
        profileThemeKeys: ["private_profile.beauty_warmth"],
        astrologyProfileThemeKeys: ["private_profile.structured_action"],
        preferredRitualStyles: ["candle"],
        avoidedRitualStyles: ["shopping_required"],
        tonePreferences: ["warm"],
      }),
    ]);
  });

  it("normalizes bootstrap preference values when resolving private profile data", () => {
    const privateBriefData = resolvePrivateBriefData({
      profile: {
        preferredRitualStyles: ["candle", "home_care", "kitchen_clearing"],
        avoidedRitualStyles: ["shopping", "elaborate_ceremony", "vague_mush"],
      },
      capacitySettings: {
        defaultCapacityMode: "low",
        maxRitualDurationMinutes: 5,
      },
    });

    expect(privateBriefData.tuning?.preferredRitualStyles).toEqual([
      "candle_or_light",
      "home_tending",
      "surface_reset",
    ]);
    expect(privateBriefData.tuning?.avoidedRitualStyles).toEqual([
      "shopping_required",
      "elaborate_setup",
      "avoid_vague_mush",
    ]);
    expect(privateBriefData.input.preferredRitualStyles).toEqual([
      "candle_or_light",
      "home_tending",
      "surface_reset",
    ]);
    expect(privateBriefData.input.avoidedRitualStyles).toEqual([
      "shopping_required",
      "elaborate_setup",
      "avoid_vague_mush",
    ]);
    expect(privateBriefData.input.audience).toBe("either");
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
