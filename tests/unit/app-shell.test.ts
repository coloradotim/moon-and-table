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

    expect(html).toContain("Menu");
    expect(html).toContain("This week");
    expect(html).toContain("Profile settings");
    expect(html).toContain("Sign out");
    expect(html).toContain('data-menu-action="this_week"');
    expect(html).toContain('data-menu-action="profile_settings"');
    expect(html).toContain("data-testid=\"recommended-ritual\"");
    expect(html).toContain("Sources:");
    expect(html).toContain("Why this");
    expect(html).toContain("Thursday evening, 0-5 minutes.");
    expect(html).toContain("Using starter settings until your private settings are ready.");
    expect(html).toContain("How was this?");
    expect(html).toContain('data-feedback-type="good"');
    expect(html).toContain('data-feedback-type="too_much"');
    expect(html).toContain('data-feedback-type="too_generic"');
    expect(html).toContain('data-feedback-type="more_like_this"');
    expect(html).toContain('data-feedback-type="not_this_style"');
    expect(html).toContain('data-feedback-type="skipped"');
    expect(html).toContain('data-feedback-type="try_again"');
    expect(html).toContain("Try something else");
    expect(html).toContain("Feedback saves to your private profile.");
    expect(html).toContain('<details class="why-this"');
    expect(html).not.toContain('<details class="why-this" open');
    expect(html).not.toContain("Firestore");
    expect(html).not.toContain("Developer trace");
    expect(html).not.toContain("private_profile.");
    expect(html).not.toContain("docs/source-");
    expect(html).not.toContain("astronomy_engine");
    expect(html).not.toContain("Tune profiles");
    expect(html).not.toContain("Make the suggestions fit better");
    expect(html).not.toContain("About this");
    expect(html).not.toContain("Journal");
    expect(html).not.toContain("Calendar");
  });

  it("renders profile tuning only when the profile settings view is selected", () => {
    const defaultHtml = renderSignedInShell(resolvePrivateBriefData({}));
    const settingsHtml = renderSignedInShell(resolvePrivateBriefData({}), {
      activeView: "profile_settings",
    });

    expect(defaultHtml).toContain("data-testid=\"recommended-ritual\"");
    expect(defaultHtml).not.toContain("Tune profiles");
    expect(settingsHtml).toContain("Tune profiles");
    expect(settingsHtml).toContain("Make the suggestions fit better");
    expect(settingsHtml).toContain("Private settings will appear here");
    expect(settingsHtml).not.toContain("data-testid=\"recommended-ritual\"");
    expect(settingsHtml).toContain('data-menu-action="this_week"');
    expect(settingsHtml).toContain('aria-pressed="true">Profile settings');
  });

  it("renders developer trace only when debug trace is requested", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      showDebugTrace: true,
    });

    expect(html).toContain("Developer trace");
    expect(html).toContain("astronomy_engine");
    expect(html).toContain("private_profile.");
  });

  it("renders feedback status after save or try-again", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      feedbackStatus: "Saved. Thank you.",
      tryAgainStatus: "Saved. Here is another approved option.",
      selectedFeedbackType: "try_again",
    });

    expect(html).toContain("Saved. Here is another approved option.");
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain("feedback-button--selected");
    expect(html).not.toContain("Feedback saves to your private profile.");
  });

  it("renders a saving state for clicked feedback buttons", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      feedbackStatus: "Saving too much.",
      selectedFeedbackType: "too_much",
      savingFeedbackType: "too_much",
    });

    expect(html).toContain("Saving too much");
    expect(html).toContain("Saving too much.");
    expect(html).toContain("feedback-button--selected");
    expect(html).toContain(" disabled");
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
    expect(html).toContain("Fine-tune each household profile separately.");
    expect(html).toContain("Default capacity");
    expect(html).toContain("Max ritual time (minutes)");
    expect(html).toContain("Astrology detail");
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
    expect(html).toContain("Save Alex&#39;s settings");
    expect(html).toContain("Save Blair&#39;s settings");
    expect(html).toContain("Saved to this private profile.");
    expect(html).toContain("Open to edit settings");
    expect(html).not.toContain("starter assumption");
    expect(html).not.toContain("Firestore");
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
    expect(html).toContain("Sign out");
    expect(html).toContain('data-auth-action="sign-out"');
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
