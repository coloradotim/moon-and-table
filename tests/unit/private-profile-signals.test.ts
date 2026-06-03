import { describe, expect, it } from "vitest";

import {
  getProfileSignalInputsForAudience,
  mapPrivateProfileThemesToSignals,
} from "../../src/lib/private-profile-signals";

const profileInputs = [
  {
    audience: "person_a" as const,
    profileThemeKeys: ["private_profile.practical_tending" as const],
    preferredRitualStyles: ["plant"],
  },
  {
    audience: "person_b" as const,
    profileThemeKeys: ["private_profile.beauty_warmth" as const],
    astrologyProfileThemeKeys: ["private_profile.structured_action" as const],
    avoidedRitualStyles: ["heavy_cleanup"],
  },
];

describe("private profile signals", () => {
  it("selects the matching person profile for a person audience", () => {
    expect(getProfileSignalInputsForAudience(profileInputs, "person_a")).toEqual([
      expect.objectContaining({ audience: "person_a" }),
    ]);
    expect(getProfileSignalInputsForAudience(profileInputs, "person_b")).toEqual([
      expect.objectContaining({ audience: "person_b" }),
    ]);
  });

  it("selects both person profiles for together and either audiences", () => {
    expect(
      getProfileSignalInputsForAudience(profileInputs, "together").map(
        (profile) => profile.audience,
      ),
    ).toEqual(["person_a", "person_b"]);
    expect(
      getProfileSignalInputsForAudience(profileInputs, "either").map(
        (profile) => profile.audience,
      ),
    ).toEqual(["person_a", "person_b"]);
  });

  it("maps profile and natal-theme keys to generator-usable theme signals", () => {
    const signals = mapPrivateProfileThemesToSignals(profileInputs, "together");

    expect(signals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "profile_theme",
          key: "profile_theme.person_a.private_profile.practical_tending",
          label: "practical home-tending magic",
          ritualStyleHints: expect.arrayContaining(["plant", "home_tending"]),
        }),
        expect.objectContaining({
          source: "profile_theme",
          key: "profile_theme.person_b.private_profile.beauty_warmth",
          label: "warmth, beauty, and affection",
        }),
        expect.objectContaining({
          source: "natal_theme",
          key: "natal_theme.person_b.private_profile.structured_action",
          label: "clear structure and bounded action",
        }),
      ]),
    );
  });

  it("keeps signal content generic and free of raw private placement language", () => {
    const serializedSignals = JSON.stringify(
      mapPrivateProfileThemesToSignals(profileInputs, "together"),
    ).toLowerCase();

    expect(serializedSignals).not.toContain("birth");
    expect(serializedSignals).not.toContain("placement");
    expect(serializedSignals).not.toContain("because jessica");
    expect(serializedSignals).not.toContain("because tim");
    expect(serializedSignals).not.toContain("chart says");
  });
});

