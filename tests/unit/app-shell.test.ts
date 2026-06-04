import { describe, expect, it } from "vitest";

import {
  renderAppShell,
  renderLoadingShell,
  renderPrivateDataLoadingShell,
  renderRitualCheckInLoadingShell,
  renderProfileTuningSection,
  renderRitualCheckInShell,
  renderSignedInShell,
  renderSignedOutShell,
  renderUnauthorizedShell,
} from "../../src/ui/app-shell";
import { resolvePrivateBriefData } from "../../src/lib/private-data";
import { generateWeeklyBrief } from "../../src/lib/generate-weekly-brief";

describe("app shell rendering", () => {
  it("renders the pre-brief check-in before a generated brief", () => {
    const html = renderRitualCheckInShell({
      draft: { step: "time_scope" },
      displayName: "Morgan Example",
    });

    expect(html).toContain(
      "Welcome back, Morgan.",
    );
    expect(html).toContain("Are you wanting something for today, or looking across the week?");
    expect(html).toContain("For today");
    expect(html).toContain("Across the week");
    expect(html).not.toContain("Use this moment and keep the ritual close at hand.");
    expect(html).not.toContain("Let the timing layer look for a stronger fit.");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
    expect(html).not.toContain('aria-label="Open menu"');
    expect(html).not.toContain('class="app-menu__icon"');
    expect(html).not.toContain("before it chooses");
    expect(html).not.toContain("what are we making space for");
    expect(html).not.toContain("tune this week");
    expect(html).not.toContain("use usual settings");
    expect(html).not.toContain("AI");
    expect(html).not.toContain("algorithm");
    expect(html).not.toContain("generated");
  });

  it("renders exact energy labels and no follow-up content before energy is chosen", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "energy_capacity",
        timeScope: "today",
      },
      displayName: "Morgan Example",
    });

    expect(html).toContain("How much energy or capacity do you have?");
    expect(html).not.toContain("Welcome back");
    expect(html).toContain("For today.");
    expect(html).toContain("Barely any");
    expect(html).toContain("A pause, a noticing, or one tiny act.");
    expect(html).toContain("A little");
    expect(html).toContain("Five minutes or less.");
    expect(html).toContain("Enough to engage");
    expect(html).toContain("A simple ritual with some attention.");
    expect(html).toContain("Room for something deeper");
    expect(html).toContain("More time, reflection, conversation, or ritual shape.");
    expect(html).not.toContain("Who is this for?");
    expect(html).not.toContain("What feels welcome?");
    expect(html).not.toContain("What intention should this hold?");
  });

  it("acknowledges the selected week scope before the next question", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "energy_capacity",
        timeScope: "best_moment_this_week",
      },
      displayName: "Morgan Example",
    });

    expect(html).toContain("Looking across the week.");
    expect(html).toContain("How much energy or capacity do you have?");
    expect(html).not.toContain("Welcome back");
  });

  it("renders adaptive A little practice options only", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "practice_type",
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
      },
    });

    expect(html).toContain("What feels welcome?");
    expect(html).toContain("Home");
    expect(html).toContain("Plant");
    expect(html).toContain("Kitchen");
    expect(html).toContain("Candle or light");
    expect(html).toContain("Conversation");
    expect(html).toContain("Surprise me");
    expect(html).not.toContain("Who is this for?");
    expect(html).not.toContain("Home tending");
    expect(html).not.toContain("Reflection");
    expect(html).not.toContain("Seasonal");
    expect(html).not.toContain("What intention should this hold?");
  });

  it("renders audience and deeper ritual-focus steps", () => {
    const audienceHtml = renderRitualCheckInShell({
      draft: {
        step: "audience",
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
      },
    });
    const practiceHtml = renderRitualCheckInShell({
      draft: {
        step: "practice_type",
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
        audience: "both_of_us",
      },
    });
    const focusHtml = renderRitualCheckInShell({
      draft: {
        step: "ritual_focus",
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
        audience: "both_of_us",
        practiceTypeHints: ["seasonal"],
      },
    });

    expect(audienceHtml).toContain("Who is this for?");
    expect(audienceHtml).toContain("Me");
    expect(audienceHtml).toContain("Both of us");
    expect(practiceHtml).toContain("Seasonal");
    expect(focusHtml).toContain("What intention should this hold?");
    expect(focusHtml).toContain("Getting grounded");
    expect(focusHtml).toContain("Making a beginning");
    expect(focusHtml).toContain("Clearing something out");
    expect(focusHtml).toContain("Resting");
    expect(focusHtml).toContain("Saying something clearly");
    expect(focusHtml).toContain("Tending us");
    expect(focusHtml).toContain("Tending the home");
    expect(focusHtml).toContain("Marking a threshold");
    expect(focusHtml).toContain("Something else");
  });

  it("renders an intention step even for barely-any capacity", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "ritual_focus",
        timeScope: "today",
        energyCapacity: "barely_any",
        capacityMode: "pause",
        audience: "me",
      },
    });

    expect(html).toContain("Me");
    expect(html).not.toContain("Barely any capacity.");
    expect(html).toContain("What intention should this hold?");
    expect(html).toContain("Resting");
    expect(html).toContain("Getting grounded");
  });

  it("renders a review screen before generating the brief", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "review",
        timeScope: "best_moment_this_week",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "both_of_us",
        practiceTypeLabel: "Plant",
        ritualFocusLabel: "Tending the home",
      },
    });

    expect(html).toContain("Ready.");
    expect(html).toContain("I’ll look for something:");
    expect(html).toContain("<li>across the week</li>");
    expect(html).toContain("<li>for both of you</li>");
    expect(html).toContain("<li>with a little capacity</li>");
    expect(html).toContain("<li>with plant</li>");
    expect(html).toContain("<li>holding tending the home</li>");
    expect(html).not.toContain("for both of us");
    expect(html).toContain(
      "I’ll use this with your saved profile to recommend one ritual.",
    );
    expect(html).toContain("Recommend a ritual");
    expect(html).not.toContain("Show my ritual");
    expect(html).toContain("Start over");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
  });

  it("uses app-facing audience wording in the review summary", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "review",
        timeScope: "today",
        energyCapacity: "barely_any",
        capacityMode: "pause",
        audience: "me",
        ritualFocusLabel: "Getting grounded",
      },
    });

    expect(html).toContain("<li>for you</li>");
    expect(html).not.toContain("<li>Me</li>");
    expect(html).not.toContain("for me");
  });

  it("renders a moon loading beat before the recommendation", () => {
    const html = renderRitualCheckInLoadingShell();

    expect(html).toContain("entry-moon-loader");
    expect(html).toContain("Reading the moon.");
    expect(html).toContain("Choosing one ritual.");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
  });

  it("renders Something else as short text without interpretation copy", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "ritual_focus_text",
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
        ritualFocusKey: "something_else",
      },
    });

    expect(html).toContain("Something else");
    expect(html).toContain('maxlength="120"');
    expect(html).toContain("Choose ritual");
    expect(html).not.toContain("AI");
    expect(html).not.toContain("free-associate");
    expect(html).not.toContain("interpret");
  });

  it("renders a loading state", () => {
    const html = renderLoadingShell();

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Opening Moon &amp; Table.");
    expect(html).toContain("Checking sign-in.");
    expect(html).toContain("entry-moon-loader");
    expect(html).not.toContain("Private access");
  });

  it("renders a signed-out Google sign-in state", () => {
    const html = renderSignedOutShell(true);

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Small rituals for a more magical home.");
    expect(html).toContain("Sign in with Google");
    expect(html).not.toContain("Sign in to continue.");
    expect(html).not.toContain("brief");
    expect(html).not.toContain("Private access");
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
    const moonIndex = html.indexOf("Moon &amp; Table");
    const practiceIndex = html.indexOf('data-testid="recommended-ritual"');
    const intentionIndex = html.indexOf('class="brief__intention"');
    const windowIndex = html.indexOf("When you have five quiet minutes.");
    const questionIndex = html.indexOf("Question to carry");
    const signalsIndex = html.indexOf("This week's signals");
    const whyIndex = html.indexOf("Why this ritual");
    const sourcesIndex = html.indexOf("Sources used");
    const tryAgainIndex = html.indexOf("Try something else");
    const feedbackIndex = html.indexOf("Give feedback");
    const actionsIndex = html.indexOf('class="brief__actions"');
    const capacityIndex = html.indexOf('data-capacity-control="true"');

    expect(html).toContain('class="brief__core"');
    expect(html).toContain('class="brief__theme"');
    expect(html).toContain('class="brief__theme-line"');
    expect(html).toContain('class="brief__depth"');
    expect(html).toContain('class="brief__actions"');
    expect(html).toContain('class="brief__control-group"');
    expect(html).toContain("Capacity: <span>Bare minimum</span>");
    expect(html).not.toContain("Current capacity:");
    expect(html).toContain('data-capacity-toggle="true"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain("How much do you have this week?");
    expect(actionsIndex).toBeGreaterThan(-1);
    expect(capacityIndex).toBeGreaterThan(actionsIndex);
    expect(html).toContain("This week");
    expect(html).toContain("Profile settings");
    expect(html).toContain("How it works");
    expect(html).toContain("Sign out");
    expect(html).toContain("moon-glyph");
    expect(html).toContain("moon-phase-indicator");
    expect(html).toContain("moon-phase-tooltip");
    expect(html).toContain("Current phase:");
    expect(html).toContain("Next lunar milestone:");
    expect(html).toContain("Last quarter moon on");
    expect(html).toContain('class="masthead__home"');
    expect(html).toContain('data-home-action="this_week"');
    expect(html).toContain('aria-label="Show this week\'s brief"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("data-moon-phase-glyph=");
    expect(html).toContain('aria-label="Open menu"');
    expect(html).toContain('class="app-menu__icon"');
    expect(html.match(/<path d="M6 /g)).toHaveLength(3);
    expect(html).not.toContain('class="app-menu__line"');
    expect(html).not.toContain(">Menu<");
    expect(html).not.toContain("ellipsis");
    expect(html).not.toContain("•••");
    expect(html).toContain('data-menu-action="this_week"');
    expect(html).toContain('data-menu-action="profile_settings"');
    expect(html).toContain('data-menu-action="how_it_works"');
    expect(html).toContain("data-testid=\"recommended-ritual\"");
    expect(html).toContain("This week's signals");
    expect(html).toContain('class="brief__signal-list"');
    expect(html).toContain('data-signal-type="moon"');
    expect(html).toContain('data-signal-type="planetary"');
    expect(html).toContain('data-signal-type="capacity"');
    expect(html).not.toContain('data-signal-type="schedule"');
    expect(html).toContain("Full moon");
    expect(html).toContain("Capacity — low");
    expect(html).not.toContain("Schedule — realistic window");
    expect(html).toContain("Why this ritual");
    expect(html).not.toContain("Private chart fit");
    expect(html).not.toContain("No saved natal placements were loaded for this brief.");
    expect(html).toContain("How this was chosen");
    expect(html).toContain("Fit notes");
    expect(html).toContain("Capacity:");
    expect(html).toContain("Sources used");
    expect(html).toContain('<details class="brief__choice-details" aria-label="How this was chosen">');
    expect(html).not.toContain('<details class="brief__choice-details" aria-label="How this was chosen" open');
    expect(html).toContain('<section class="brief__sources" aria-label="Sources used">');
    expect(html).toContain("Symbolic card");
    expect(html).toContain("Ritual pattern");
    expect(html).toContain("Source review");
    expect(html).toContain("When you have five quiet minutes.");
    expect(html).not.toContain("Thursday evening");
    expect(html).not.toContain("Tuesday evening");
    expect(html).not.toContain("Saturday morning");
    expect(html).not.toContain("0-5 minutes");
    expect(html).not.toContain(">The practice<");
    expect(html).not.toContain(">A good window<");
    expect(html).not.toContain(">Optional<");
    expect(html).toContain(">Intention<");
    expect(html).toContain(">Best window<");
    expect(html).not.toContain("No add-on needed.");
    expect(html).toContain('class="brief__intention"');
    expect(html).toContain("Question to carry");
    expect(html).not.toContain("Need a different suggestion?");
    expect(html).toContain("Give feedback");
    expect(html).not.toContain("Share feedback");
    expect(html).toContain('data-feedback-type="good"');
    expect(html).not.toContain('data-feedback-type="too_much"');
    expect(html).not.toContain("Simpler, please");
    expect(html).toContain('data-feedback-type="too_generic"');
    expect(html).toContain('data-feedback-type="more_like_this"');
    expect(html).toContain('data-feedback-type="not_this_style"');
    expect(html).toContain('data-feedback-type="skipped"');
    expect(html).toContain('data-feedback-type="try_again"');
    expect(html).toContain("Try something else");
    expect(html).toContain("Start over");
    expect(html).toContain('data-check-in-start-over="true"');
    expect(html).toContain('<section class="brief__question" aria-label="Question to carry">');
    expect(html).not.toContain('class="brief__question-details"');
    expect(html).toContain('<section class="why-this" aria-label="Why this ritual">');
    expect(html).toContain("<h3>Why this ritual</h3>");
    expect(html).not.toContain('<details class="why-this"');
    expect(html).toContain('<details class="feedback" aria-label="Feedback">');
    expect(html).not.toContain('<details class="feedback" open');
    expect(moonIndex).toBeGreaterThan(-1);
    expect(html.slice(0, moonIndex)).not.toContain("Private weekly ritual brief");
    expect(practiceIndex).toBeLessThan(intentionIndex);
    expect(intentionIndex).toBeLessThan(windowIndex);
    expect(windowIndex).toBeLessThan(whyIndex);
    expect(intentionIndex).toBeLessThan(questionIndex);
    expect(whyIndex).toBeLessThan(questionIndex);
    expect(questionIndex).toBeLessThan(signalsIndex);
    expect(signalsIndex).toBeLessThan(sourcesIndex);
    expect(sourcesIndex).toBeLessThan(tryAgainIndex);
    expect(tryAgainIndex).toBeLessThan(feedbackIndex);
    expect(html).not.toContain("Private weekly ritual brief");
    expect(html).not.toContain("Using your household settings.");
    expect(html).not.toContain("Using starter settings until your private settings are ready.");
    expect(html).not.toContain("low capacity");
    expect(html).not.toContain("This week&#39;s ritual");
    expect(html).not.toContain("Optional add-on");
    expect(html).not.toContain("Reflection prompt");
    expect(html).not.toContain("Feedback saves to your private profile.");
    expect(html).not.toContain("Firestore");
    expect(html).not.toContain("Developer trace");
    expect(html).not.toContain("Developer decision record");
    expect(html).not.toContain("Evaluated ritual patterns");
    expect(html).not.toContain("Selected score reasons");
    expect(html).not.toContain("trace.timingFacts");
    expect(html).not.toContain("private_profile.");
    expect(html).not.toContain("docs/source-");
    expect(html).not.toContain("source.");
    expect(html).not.toContain("astronomy_engine");
    expect(html).not.toContain("Jun 1-Jun 7");
    expect(html).not.toContain("Tune profiles");
    expect(html).not.toContain("Make the suggestions fit better");
    expect(html).not.toContain("About this");
    expect(html).not.toContain("Journal");
    expect(html).not.toContain("Calendar");
  });

  it("renders a signed-in How it works page from the app menu", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      activeView: "how_it_works",
    });

    expect(html).toContain('data-menu-action="how_it_works"');
    expect(html).toContain('aria-pressed="true">How it works</button>');
    expect(html).toContain('aria-label="How Moon &amp; Table works"');
    expect(html).toContain("timing, symbolism, and household magic");
    expect(html).toContain("Recommendation pipeline");
    expect(html).toContain("What it calculates");
    expect(html).toContain("Lunar timing");
    expect(html).toContain("Astrology");
    expect(html).toContain("Natal-chart themes");
    expect(html).toContain("Numerology");
    expect(html).toContain("Seasonal timing");
    expect(html).toContain("Sources");
    expect(html).toContain("Recommendation creation");
    expect(html).toContain("Capacity");
    expect(html).toContain("Safety");
    expect(html).toContain("Feedback");
    expect(html).toContain("What it does not do");
    expect(html).toContain('data-home-action="this_week"');
    expect(html).toContain("Back to this week");
    expect(html).not.toContain('data-testid="recommended-ritual"');
    expect(html).not.toContain("person_a@example.com");
    expect(html).not.toContain("birth data");
    expect(html).not.toContain("service-account");
    expect(html).not.toContain("firebase config");
  });

  it("renders the capacity picker in the brief controls when requested", () => {
    const privateBriefData = resolvePrivateBriefData({});
    const brief = generateWeeklyBrief({
      ...privateBriefData.input,
      capacityMode: "steady",
    });
    const html = renderSignedInShell(privateBriefData, {
      brief,
      capacityModeOverride: "steady",
      capacityPickerOpen: true,
    });

    const actionsIndex = html.indexOf('class="brief__actions"');
    const capacityIndex = html.indexOf('data-capacity-control="true"');

    expect(html).toContain("Capacity: <span>Steady</span>");
    expect(html).not.toContain("Current capacity:");
    expect(actionsIndex).toBeGreaterThan(-1);
    expect(capacityIndex).toBeGreaterThan(actionsIndex);
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain("How much do you have this week?");
    expect(html).toContain("Surviving — nothing required");
    expect(html).toContain("Bare minimum — five minutes or less");
    expect(html).toContain("Steady — about twenty minutes");
    expect(html).toContain("Energized — about half an hour");
    expect(html).toContain("This only changes the current view.");
    expect(html).toContain('data-capacity-mode="pause"');
    expect(html).toContain('data-capacity-mode="low"');
    expect(html).toContain('data-capacity-mode="steady"');
    expect(html).toContain('data-capacity-mode="high"');
    expect(html).toContain('aria-selected="true"');
  });

  it("renders a real optional add-on as a quiet inline line", () => {
    const privateBriefData = resolvePrivateBriefData({});
    const brief = generateWeeklyBrief(privateBriefData.input);
    const html = renderSignedInShell(privateBriefData, {
      brief: {
        ...brief,
        optionalAddOn: "Light a candle if that feels supportive and safe.",
      },
    });
    const windowIndex = html.indexOf("When you have five quiet minutes.");
    const optionalIndex = html.indexOf("Optional: light a candle if that feels supportive and safe.");
    const intentionIndex = html.indexOf("Let attention gather gently.");

    expect(html).toContain("Optional: light a candle if that feels supportive and safe.");
    expect(html).not.toContain(">Optional<");
    expect(windowIndex).toBeLessThan(optionalIndex);
    expect(intentionIndex).toBeLessThan(windowIndex);
  });

  it("splits two-sentence brief themes into two visual lines", () => {
    const privateBriefData = resolvePrivateBriefData({});
    const brief = generateWeeklyBrief(privateBriefData.input);
    const html = renderSignedInShell(privateBriefData, {
      brief: {
        ...brief,
        theme: "Notice what is already clear. Tend one living thing.",
      },
    });

    expect(html).toContain(
      '<span class="brief__theme-line">Notice what is already clear.</span><span class="brief__theme-line">Tend one living thing.</span>',
    );
  });

  it("hides the optional line when no add-on is needed", () => {
    const privateBriefData = resolvePrivateBriefData({});
    const brief = generateWeeklyBrief(privateBriefData.input);
    const html = renderSignedInShell(privateBriefData, {
      brief: {
        ...brief,
        optionalAddOn: "No add-on needed.",
      },
    });

    expect(html).not.toContain("Optional:");
    expect(html).not.toContain("No add-on needed.");
    expect(html).toContain('class="brief__intention"');
    expect(html).toContain("Question to carry");
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
    expect(settingsHtml).toContain("Household settings will appear here");
    expect(settingsHtml).not.toContain("data-testid=\"recommended-ritual\"");
    expect(settingsHtml).toContain('data-menu-action="this_week"');
    expect(settingsHtml).toContain('aria-pressed="true">Profile settings');
  });

  it("renders developer trace only when debug trace is requested", () => {
    const brief = generateWeeklyBrief({
      ...resolvePrivateBriefData({}).input,
      currentRitualCheckIn: {
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
        audience: "both_of_us",
        practiceTypeHints: ["seasonal"],
        ritualFocusKey: "marking_a_threshold",
      },
    });
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      brief,
      showDebugTrace: true,
    });

    expect(html).toContain("Developer decision record");
    expect(html).toContain("Selected score reasons");
    expect(html).toContain("Evaluated ritual patterns");
    expect(html).toContain("Rejected ritual patterns");
    expect(html).toContain("Source references");
    expect(html).toContain("Selected");
    expect(html).toContain("Inputs");
    expect(html).toContain("Check-in:");
    expect(html).toContain("best_moment_this_week");
    expect(html).toContain("room_for_something_deeper");
    expect(html).toContain("marking_a_threshold");
    expect(html).toContain("Private chart status:");
    expect(html).toContain("No placement records loaded.");
    expect(html).toContain("capacity_fit");
    expect(html).toContain("private_profile.");
    expect(html).not.toContain("Developer trace");
  });

  it("renders feedback status after save or try-again", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      feedbackStatus: "Got it.",
      tryAgainStatus: "Here is another approved option.",
      selectedFeedbackType: "try_again",
    });

    expect(html).toContain("Here is another approved option.");
    expect(html).toContain("Got it.");
    expect(html).toContain('class="secondary-action try-again-button"');
    expect(html).toContain('data-try-again-action="true"\n            aria-pressed="false"');
    expect(html).not.toContain("try-again-button feedback-button--selected");
    expect(html).not.toContain("Feedback saves to your private profile.");
  });

  it("renders a saving state for clicked feedback buttons", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      feedbackStatus: "Saving.",
      selectedFeedbackType: "too_generic",
      savingFeedbackType: "too_generic",
    });

    expect(html).toContain(">Saving</button>");
    expect(html).toContain("Saving.");
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
    expect(html).toContain("Saved to this profile.");
    expect(html).toContain("Open to edit settings");
    expect(html).not.toContain("starter assumption");
    expect(html).not.toContain("Firestore");
  });

  it("renders private data loading while signed-in Firestore data loads", () => {
    const html = renderPrivateDataLoadingShell();

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Preparing this week.");
    expect(html).toContain("Loading household settings.");
    expect(html).toContain("entry-moon-loader");
    expect(html).not.toContain("Private settings");
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
      "Checking sign-in.",
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
    ).toContain("Loading household settings.");
  });
});
