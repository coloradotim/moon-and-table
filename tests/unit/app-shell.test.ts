import { describe, expect, it } from "vitest";

import {
  renderAppShell,
  renderLoadingShell,
  renderPrivateDataLoadingShell,
  renderPrivateFirstLoginWelcomeShell,
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
    expect(html).not.toContain("Go back");
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

  it("renders first-login check-in copy without a welcome-back greeting", () => {
    const html = renderRitualCheckInShell({
      draft: { step: "time_scope" },
      displayName: "Morgan Example",
      introMode: "first_login",
    });

    expect(html).toContain("Let&rsquo;s choose your first ritual.");
    expect(html).not.toContain("Welcome back");
    expect(html).not.toContain("Morgan");
    expect(html).toContain("Are you wanting something for today, or looking across the week?");
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
    expect(html).toContain("Go back");
    expect(html).toContain('data-check-in-action="go_back"');
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
    expect(html).toContain("Surprise me");
    expect(html).not.toContain("Conversation");
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
    expect(audienceHtml).toContain("Go back");
    expect(audienceHtml).toContain("Me");
    expect(audienceHtml).toContain("Both of us");
    expect(practiceHtml).toContain("Go back");
    expect(practiceHtml).toContain("Seasonal");
    expect(focusHtml).toContain("Go back");
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
    const privateBriefData = resolvePrivateBriefData({});
    const html = renderSignedInShell(privateBriefData);
    const moonIndex = html.indexOf("Moon &amp; Table");
    const practiceIndex = html.indexOf('data-testid="recommended-ritual"');
    const intentionIndex = html.indexOf('class="brief__intention"');
    const windowIndex = html.indexOf("When you have five quiet minutes.");
    const questionIndex = html.indexOf("Question to carry");
    const howIndex = html.indexOf("How this was chosen");
    const whyIndex = html.indexOf("Why this fits");
    const sourcesIndex = html.indexOf("<h3>Sources</h3>");
    const rightIndex = html.indexOf("This feels right.");
    const tryAgainIndex = html.indexOf("Give me another option");
    const checkInAgainIndex = html.indexOf("I want to check in again");
    const feedbackIndex = html.indexOf("Give feedback");
    const actionsIndex = html.indexOf('class="brief__actions"');

    expect(html).toContain('class="brief__core"');
    expect(html).toContain('class="brief__theme"');
    expect(html).toContain("<h2");
    expect(html).toContain('class="brief__depth"');
    expect(html).toContain('class="brief__actions"');
    expect(html).toContain('class="brief__closing-actions"');
    expect(html).toContain('class="brief__actions-question"');
    expect(html).toContain('class="brief__closing-secondary"');
    expect(html).toContain('class="brief__meta-actions"');
    expect(html).toContain("This feels right.");
    expect(html).toContain("How does this feel to you?");
    expect(html).toContain("Give me another option");
    expect(html).toContain("I want to check in again");
    expect(html).not.toContain("Capacity: <span>Bare minimum</span>");
    expect(html).not.toContain("Current capacity:");
    expect(html).not.toContain('data-capacity-toggle="true"');
    expect(html).not.toContain('data-capacity-control="true"');
    expect(html).not.toContain("How much do you have this week?");
    expect(actionsIndex).toBeGreaterThan(-1);
    expect(rightIndex).toBeGreaterThan(actionsIndex);
    expect(tryAgainIndex).toBeGreaterThan(rightIndex);
    expect(checkInAgainIndex).toBeGreaterThan(tryAgainIndex);
    expect(feedbackIndex).toBeGreaterThan(checkInAgainIndex);
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
    expect(html).not.toContain("This week's signals");
    expect(html).not.toContain('class="brief__signal-list"');
    expect(html).not.toContain('data-signal-type="schedule"');
    expect(html).not.toContain('data-signal-type="schedule"');
    expect(html).toMatch(
      new RegExp("Current phase:</strong> [A-Z][a-z]+(?: [a-z]+)* moon"),
    );
    expect(html).toContain("Capacity boundary");
    expect(html).not.toContain("Schedule — realistic window");
    expect(html).toContain("Why this fits");
    expect(html).not.toContain("Private chart fit");
    expect(html).not.toContain("No saved natal placements were loaded for this brief.");
    expect(html).toContain("How this was chosen");
    expect(html).toContain("Ritual fit");
    expect(html).toContain("Profile fit");
    expect(html).not.toContain("Safety and fit");
    expect(html).not.toContain("Household safety guardrails");
    expect(html).not.toContain("Safety filters applied");
    expect(html).toContain('<details class="brief__choice-details" aria-label="How this was chosen">');
    expect(html).not.toContain('<details class="brief__choice-details" aria-label="How this was chosen" open');
    expect(html).toContain('class="brief__chosen-section" aria-label="Sources"');
    expect(html).not.toContain('<section class="brief__sources" aria-label="Sources used">');
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
    expect(html).toContain("Give me another option");
    expect(html).toContain("I want to check in again");
    expect(html).not.toContain("Try something else");
    expect(html).not.toContain(">Start over</button>");
    expect(html).toContain('data-check-in-start-over="true"');
    expect(html).toContain('<section class="brief__question" aria-label="Question to carry">');
    expect(html).not.toContain('class="brief__question-details"');
    expect(html).toContain('<section class="why-this" aria-label="Why this fits">');
    expect(html).toContain("<h3>Why this fits</h3>");
    expect(html).not.toContain('class="why-this__reasons"');
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
    expect(questionIndex).toBeLessThan(howIndex);
    expect(howIndex).toBeLessThan(sourcesIndex);
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
    expect(html).not.toContain("source.sarah");
    expect(html).not.toContain("source.rachel");
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
    expect(html).toContain("My love");
    expect(html).toContain("I made just for us");
    expect(html).toContain("We met on 8/8");
    expect(html).toContain("the day before a full moon");
    expect(html).toContain("candle magic");
    expect(html).toContain("The basic idea");
    expect(html).toContain("What happens under the hood");
    expect(html).toContain("The check-in flow");
    expect(html).toContain("This part of the app is very solid");
    expect(html).toContain("This part of the app is currently a little too black box for me");
    expect(html).not.toContain("How timing becomes meaning");
    expect(html).not.toContain("Where the symbolic library comes from");
    expect(html).not.toContain("How current context changes the answer");
    expect(html).not.toContain("How it chooses one ritual");
    expect(html).not.toContain("What shows up in the ritual brief");
    expect(html).not.toContain("How it learns and stays private");
    expect(html).not.toContain("How we can shape it together");
    expect(html).toContain("To Us");
    expect(html).toContain("One small ritual, for us, built with love and chosen with care.");
    expect(html).toContain("I love you.");
    expect(html).toContain("natal charts");
    expect(html).not.toContain('class="how-it-works__sections"');
    expect(html).not.toContain('class="how-it-works__section"');
    expect(html).not.toContain(">Safety<");
    expect(html).not.toContain("Safety comes before symbolism");
    expect(html).toContain('data-home-action="this_week"');
    expect(html).toContain("Back to this week");
    expect(html).not.toContain('data-testid="recommended-ritual"');
    expect(html).not.toContain("person_a@example.com");
    expect(html).not.toContain("service-account");
    expect(html).not.toContain("firebase config");
  });

  it("renders the one-time private welcome without onboarding links", () => {
    const html = renderPrivateFirstLoginWelcomeShell();

    expect(html).toContain("Welcome, my love.");
    expect(html).toContain("I built this just for us");
    expect(html).toContain("and the quiet ways we keep choosing each other.");
    expect(html).toContain("and brings us together in our new home.");
    expect(html).toContain("/assets/private-first-login-moon-candle.svg");
    expect(html).toContain("Get Started");
    expect(html).toContain('data-private-welcome-action="dismiss"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain("How Moon &amp; Table Works");
    expect(html).not.toContain("How it works");
    expect(html).not.toContain("Skip");
    expect(html).not.toContain("Close");
    expect(html).not.toContain("person_b@example.com");
    expect(html).not.toContain("birth");
    expect(html).not.toContain("natal placement");
  });

  it("does not render the capacity picker in the brief footer", () => {
    const privateBriefData = resolvePrivateBriefData({});
    const brief = generateWeeklyBrief({
      ...privateBriefData.input,
      capacityMode: "steady",
    });
    const html = renderSignedInShell(privateBriefData, {
      brief,
    });

    const actionsIndex = html.indexOf('class="brief__actions"');

    expect(html).not.toContain("Capacity: <span>Steady</span>");
    expect(html).not.toContain("Current capacity:");
    expect(actionsIndex).toBeGreaterThan(-1);
    expect(html).not.toContain('data-capacity-control="true"');
    expect(html).not.toContain('data-capacity-toggle="true"');
    expect(html).not.toContain('aria-expanded="true"');
    expect(html).not.toContain("How much do you have this week?");
    expect(html).not.toContain("This only changes the current view.");
    expect(html).not.toContain('data-capacity-mode="pause"');
    expect(html).not.toContain('data-capacity-mode="low"');
    expect(html).not.toContain('data-capacity-mode="steady"');
    expect(html).not.toContain('data-capacity-mode="high"');
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
    expect(defaultHtml).not.toContain("What is usually true?");
    expect(settingsHtml).toContain("Profile settings");
    expect(settingsHtml).toContain("Profile settings will appear here");
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
        practiceTypeLabel: "Seasonal",
        ritualFocusKey: "marking_a_threshold",
        ritualFocusLabel: "Marking a threshold",
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
    expect(html).toContain("Check-in choices");
    expect(html).toContain("Timing:</strong> Best moment this week");
    expect(html).toContain("Capacity:</strong> Room for something deeper");
    expect(html).toContain("Audience:</strong> Both of us");
    expect(html).toContain("Practice:</strong> Seasonal");
    expect(html).toContain("Intention:</strong> Marking a threshold");
    expect(html).toContain("Check-in contribution:");
    expect(html).toContain("Private chart status:");
    expect(html).toContain("No placement records loaded.");
    expect(html).toContain("Check-in intention match");
    expect(html).toContain("Private profile theme match");
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
    expect(html).toContain('class="quiet-action try-again-button"');
    expect(html).toContain('data-try-again-action="true"');
    expect(html).toContain('aria-pressed="false"');
    expect(html).not.toContain("try-again-button feedback-button--selected");
    expect(html).not.toContain("Feedback saves to your private profile.");
  });

  it("renders the positive acknowledgement status copy", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      feedbackStatus: "I’m very glad.",
      selectedFeedbackType: "good",
    });

    expect(html).toContain("This feels right.");
    expect(html).toContain("I’m very glad.");
    expect(html).toContain('data-feedback-type="good"');
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
          personKey: "person_a",
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
          astrologyProfile: {
            source: "manual_entry",
            confidence: "low",
            placementKeys: ["placement.sun.placeholder", "placement.moon.placeholder"],
            placements: [
              {
                bodyOrPoint: "sun",
                sign: "libra",
                degree: 13.25,
              },
              {
                bodyOrPoint: "moon",
                sign: "virgo",
              },
            ],
            profileThemeKeys: ["private_profile.structured_action"],
            updatedAtIso: "2026-01-01T00:00:00.000Z",
          },
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

    expect(html).toContain("Profile settings");
    expect(html).not.toContain("What is usually true?");
    expect(html).toContain("Long-term defaults.");
    expect(html).toContain("Usual energy");
    expect(html).toContain("Maximum ritual size");
    expect(html).toContain("Astrology visibility");
    expect(html).toContain("Alex");
    expect(html).toContain("Blair");
    expect(html).toContain('data-profile-tuning-id="profile_alex"');
    expect(html).not.toContain('data-profile-tuning-id="profile_blair"');
    expect(html).toContain('data-profile-settings-tab="profile_alex"');
    expect(html).toContain('data-profile-settings-tab="profile_blair"');
    expect(html).not.toContain('data-profile-settings-tab="household"');
    expect(html).toContain('aria-selected="true"');
    expect(html).not.toContain("Use this profile when brief is for");
    expect(html).not.toContain('name="defaultAudience"');
    expect(html).not.toContain(">person_a<");
    expect(html).toContain("Long-term fit");
    expect(html).toContain("What kinds of practices usually fit?");
    expect(html).not.toContain("Avoid by default");
    expect(html).not.toContain("Language");
    expect(html).not.toContain("How should the recommendation sound?");
    expect(html).not.toContain('type="radio"');
    expect(html).not.toContain('name="tonePreference"');
    expect(html).not.toContain("Plain, useful, low-fuss.");
    expect(html).not.toContain("Clear, brief, not precious.");
    expect(html).not.toContain("Tender");
    expect(html).not.toContain("Soft, affectionate, intimate.");
    expect(html).not.toContain("Ritual styles");
    expect(html).not.toContain("Action patterns");
    expect(html).not.toContain("Burden / avoid flags");
    expect(html).not.toContain("Tone preferences");
    expect(html).toContain("Plant");
    expect(html).toContain("Candle or light");
    expect(html).not.toContain("Conversation");
    expect(html).toContain("About ten minutes");
    expect(html).not.toContain("Custom Saved Value");
    expect(html).not.toContain("Shopping required");
    expect(html).not.toContain("Heavy cleanup");
    expect(html).not.toContain("Long journaling");
    expect(html).not.toContain("Elaborate setup");
    expect(html).not.toContain("Emotionally heavy");
    expect(html).not.toContain("Live flame");
    expect(html).not.toContain("Smoke");
    expect(html).not.toContain("Too vague");
    expect(html).not.toContain("Too precious");
    expect(html).not.toContain("Too clinical");
    expect(html).not.toContain("private placements available");
    expect(html).toContain("View chart context");
    expect(html).toContain("Sun");
    expect(html).toContain("in Libra, 13.3 degrees");
    expect(html).toContain("Moon");
    expect(html).toContain("in Virgo");
    expect(html).not.toContain("Assumptions");
    expect(html).not.toContain("Advanced tuning");
    expect(html).not.toContain("Specific saved tags");
    expect(html).not.toContain("Basil");
    expect(html).not.toContain("Mint");
    expect(html).not.toContain("Bread");
    expect(html).not.toContain("Oats");
    expect(html).toContain('name="preferredRitualStyles"');
    expect(html).not.toContain('name="preferredRitualStyles"\n            value="practical"');
    expect(html).not.toContain('name="preferredRitualStyles"\n            type="text"');
    expect(html).toContain("Save Alex&#39;s settings");
    expect(html).not.toContain("Save Blair&#39;s settings");
    expect(html).not.toContain("Saved to this profile.");
    expect(html).not.toContain("Open to edit settings");
    expect(html).not.toContain("low woo");
    expect(html).not.toContain("avoid vague mush");
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
