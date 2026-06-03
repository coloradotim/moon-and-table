import { describe, expect, it } from "vitest";

import {
  renderAppShell,
  renderLoadingShell,
  renderPrivateDataLoadingShell,
  renderProfileTuningSection,
  renderSignedInShell,
  renderSignedOutShell,
  renderUnauthorizedShell,
} from "../../src/ui/app-shell";
import { resolvePrivateBriefData } from "../../src/lib/private-data";

describe("app shell rendering", () => {
  it("renders a loading state", () => {
    const html = renderLoadingShell();

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Checking sign-in state.");
  });

  it("renders a signed-out Google sign-in state", () => {
    const html = renderSignedOutShell(true);

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Sign in with Google");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
  });

  it("renders a config-missing signed-out state without private data", () => {
    const html = renderSignedOutShell(false).toLowerCase();

    expect(html).toContain("firebase is not configured yet");
    expect(html).toContain("sign in with google");
    expect(html).toContain("disabled");
    expect(html).not.toContain("birth");
    expect(html).not.toContain("natal");
    expect(html).not.toContain("relationship details");
  });

  it("renders the weekly brief only when signed in", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}));

    expect(html).toContain("Signed in");
    expect(html).toContain("Sign out");
    expect(html).toContain("data-testid=\"recommended-ritual\"");
    expect(html).toContain("Clear one small thing. Feed one living thing.");
    expect(html).toContain("Thursday evening, 0-5 minutes.");
    expect(html).toContain("Using starter settings until private settings are created.");
    expect(html).toContain("Private settings will appear here");
  });

  it("renders editable profile tuning for loaded private data", () => {
    const privateBriefData = resolvePrivateBriefData(
      {
        profile: {
          displayLabel: "Alex",
          defaultAudience: "person_a",
          audienceLabels: {
            person_a: "Alex",
            person_b: "Blair",
            together: "Together",
            either: "Either",
          },
          preferredRitualStyles: ["plant_tending", "candle", "custom_saved_value"],
          avoidedRitualStyles: ["shopping", "vague_mush"],
          astrologyVisibility: "subtle",
          assumptions: [
            {
              key: "assumption.low_overwhelm",
              label: "Suggestions usually work better when they stay small",
              value: true,
              source: "starter_assumption",
              confidence: "low",
              editable: true,
              updatedAtIso: "2026-01-01T00:00:00.000Z",
            },
          ],
        },
        capacitySettings: {
          defaultCapacityMode: "steady",
          maxRitualDurationMinutes: 20,
        },
      },
      {
        profileId: "profile_alex",
        capacitySettingsId: "profile_alex",
        scheduleConstraintsId: "profile_alex",
      },
    );
    const alexProfile = privateBriefData.tuningProfiles[0];

    if (!alexProfile) {
      throw new Error("Expected test profile tuning data");
    }

    privateBriefData.tuningProfiles.push({
      ...alexProfile,
      id: "profile_blair",
      label: "Blair",
      documentRefs: {
        profileId: "profile_blair",
        capacitySettingsId: "profile_blair",
        scheduleConstraintsId: "profile_blair",
      },
    });

    const html = renderProfileTuningSection(privateBriefData);

    expect(html).toContain("Tune profiles");
    expect(html).toContain("Adjust each household profile separately.");
    expect(html).toContain("Default capacity");
    expect(html).toContain("Max ritual time");
    expect(html).toContain("Make astrology");
    expect(html).toContain("Alex");
    expect(html).toContain("Blair");
    expect(html).toContain('data-profile-tuning-id="profile_alex"');
    expect(html).toContain('data-profile-tuning-id="profile_blair"');
    expect(html).not.toContain("Use this profile when brief is for");
    expect(html).not.toContain('name="defaultAudience"');
    expect(html).not.toContain(">person_a<");
    expect(html).toContain("Ritual styles");
    expect(html).toContain("Action patterns");
    expect(html).toContain("Burden / avoid flags");
    expect(html).toContain("Tone preferences");
    expect(html).toContain("Other saved values");
    expect(html).toContain("Plant tending");
    expect(html).toContain("Candle or light");
    expect(html).toContain("Custom Saved Value");
    expect(html).toContain("Shopping required");
    expect(html).toContain("Avoid vague mush");
    expect(html).toContain('name="preferredRitualStyles"');
    expect(html).not.toContain('name="preferredRitualStyles"\n            type="text"');
    expect(html).toContain("Save Alex");
    expect(html).toContain("Save Blair");
    expect(html).not.toContain("starter assumption");
  });

  it("renders private data loading while signed-in Firestore data loads", () => {
    const html = renderPrivateDataLoadingShell();

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Loading private settings for this household.");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
  });

  it("renders unauthorized accounts without showing the brief", () => {
    const html = renderUnauthorizedShell();

    expect(html).toContain("This account is not invited yet.");
    expect(html).toContain("Sign in with Google");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
  });

  it("routes auth states to the correct shell", () => {
    expect(renderAppShell({ status: "loading" })).toContain(
      "Checking sign-in state.",
    );
    expect(
      renderAppShell({ status: "signed_out", configReady: true }),
    ).toContain("Sign in with Google");
    expect(
      renderAppShell({ status: "unauthorized", configReady: true }),
    ).toContain("not invited");
    expect(
      renderAppShell({
        status: "signed_in",
        user: {
          uid: "placeholder-user-id",
          email: "person_a@example.com",
          displayName: "Person A",
        },
      }),
    ).toContain("Loading private settings for this household.");
  });
});
