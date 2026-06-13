import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

import {
  renderAppShell,
  renderLoadingShell,
  renderPrivateDataLoadingShell,
  renderPrivateFirstLoginWelcomeShell,
  renderRitualPreview,
  renderRitualCheckInLoadingShell,
  renderManageRitualsSection,
  renderProfileTuningSection,
  renderRitualCheckInShell,
  renderSearchRitualsSection,
  renderSignedInShell,
  renderSignedOutShell,
  renderUnauthorizedShell,
} from "../../src/ui/app-shell";
import { resolvePrivateBriefData } from "../../src/lib/private-data";
import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import { getTimingWindowCandidates } from "../../src/lib/timing-window-candidates";
import type { ChooseWithMeResult } from "../../src/data/rituals/choose-with-me-selector";
import type { RitualFavorite } from "../../src/data/rituals/household-state";

function getNewMoonWindow() {
  const window = getTimingWindowCandidates({
    startDate: "2026-06-12T12:00:00.000Z",
    timezone: "UTC",
    daysAhead: 4,
    options: { maxCandidates: 8 },
  }).find((candidate) => candidate.label === "New Moon");

  if (!window) {
    throw new Error("Expected a New Moon timing window fixture.");
  }

  return window;
}

const chooseWithMeFixtureRitual =
  sourceBackedRituals.find(
    (ritual) => ritual.id === "ritual-woodward-bread-table-offering",
  ) ?? sourceBackedRituals[0];

function createChooseWithMeResultFixture(): ChooseWithMeResult {
  return {
    status: "selected",
    selectedRitual: chooseWithMeFixtureRitual,
    whyThisFits: "This fits the selected check-in.",
    howThisWasChosen: "Moon & Table chose one eligible Ritual.",
    debug: {
      normalizedRequest: {
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "me",
        purpose: "tending",
        carrier: "table",
        refinement: null,
        freeTextIntent: null,
      },
      eligibleCount: 1,
      excludedCount: 0,
      selectedRitualId: chooseWithMeFixtureRitual.id,
      selectedScore: 42,
      selectedBreakdown: {
        purpose: 10,
        carrier: 10,
        refinement: 0,
        audience: 6,
        capacity: 8,
        timing: 0,
        materialPlaceFit: 4,
        freeText: 0,
        sourceConfidence: 4,
        penalties: 0,
        total: 42,
      },
      topCandidates: [
        {
          ritualId: chooseWithMeFixtureRitual.id,
          headline: chooseWithMeFixtureRitual.presentation.headline,
          score: 42,
          breakdown: {
            purpose: 10,
            carrier: 10,
            refinement: 0,
            audience: 6,
            capacity: 8,
            timing: 0,
            materialPlaceFit: 4,
            freeText: 0,
            sourceConfidence: 4,
            penalties: 0,
            total: 42,
          },
          evidence: ["purpose match"],
          timing: {
            suppliedFacts: [],
            suppliedWindows: [],
            matchedRitualTiming: [],
            timingScore: 0,
            requiredTimingSatisfied: true,
            timingCouldNotBeVerified: [],
          },
        },
      ],
      exclusions: {},
      timing: {
        suppliedFacts: [],
        suppliedWindows: [],
        matchedRitualTiming: [],
        timingScore: 0,
        requiredTimingSatisfied: true,
        timingCouldNotBeVerified: [],
      },
      timingEvidence: [],
      explanationEvidence: [],
    },
  };
}

function createFavorite(ritualId: string): RitualFavorite {
  return {
    ritualId,
    favoritedVersionId: "test-version",
    active: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    sourceSurface: "search",
  };
}

describe("app shell rendering", () => {
  it("aligns entry/loading and check-in headlines while keeping check-in top-anchored", () => {
    const css = readFileSync(new URL("../../src/styles.css", import.meta.url), "utf8");
    const checkInRule = css.match(/\.shell--check-in\s*\{[^}]+\}/)?.[0] ?? "";
    const entryRule = css.match(/\.shell--entry\s*\{[^}]+\}/)?.[0] ?? "";
    const checkInMastheadRule = css.match(/\.masthead--check-in\s*\{[^}]+\}/)?.[0] ?? "";
    const checkInMastheadTitleRule =
      css.match(/\.masthead--check-in \.masthead__nameplate h1\s*\{[^}]+\}/)?.[0] ?? "";
    const entryBrandTitleRule = css.match(/\.entry-brand h1\s*\{[^}]+\}/)?.[0] ?? "";

    expect(entryRule).toContain("align-content: start");
    expect(entryRule).toContain("width: min(100%, 680px)");
    expect(entryRule).toContain("gap: 16px");
    expect(entryRule).toContain("padding-block: var(--opening-shell-padding-block)");
    expect(checkInRule).toContain("align-content: start");
    expect(checkInRule).toContain("width: min(100%, 680px)");
    expect(checkInRule).toContain("padding-block: var(--opening-shell-padding-block)");
    expect(checkInMastheadRule).toContain("--text-masthead: var(--text-entry-title)");
    expect(checkInMastheadTitleRule).toContain("line-height: 0.95");
    expect(entryBrandTitleRule).toContain("font-size: var(--text-entry-title)");
  });

  it("renders the pre-brief check-in before a generated brief", () => {
    const html = renderRitualCheckInShell({
      draft: { step: "entry_path" },
      displayName: "Morgan Example",
    });

    expect(html).toContain(
      "Welcome back, Morgan.",
    );
    expect(html).toContain("Choose with me");
    expect(html).toContain("I have something in mind");
    expect(html).toContain('aria-label="Choose how to find a ritual"');
    expect(html).not.toContain("Rituals for this timing");
    expect(html).toContain('data-check-in-action="start_guided"');
    expect(html).toContain('data-check-in-value="choose_with_me"');
    expect(html).toContain('data-search-rituals-entry="true"');
    expect(html).toContain("Today’s shape");
    expect(html).not.toContain("Are you wanting something for today, or looking across the week?");
    expect(html).not.toContain("For today");
    expect(html).not.toContain("Across the week");
    expect(html).not.toContain("Go back");
    expect(html).not.toContain("Use this moment and keep the ritual close at hand.");
    expect(html).not.toContain("Let the timing layer look for a stronger fit.");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
    expect(html).toContain('aria-label="Open menu"');
    expect(html).toContain('class="app-menu__icon"');
    expect(html).toContain('data-menu-action="this_week"');
    expect(html).toContain('data-menu-action="choose_ritual"');
    expect(html).toContain('data-menu-action="search_rituals"');
    expect(html).toContain('data-menu-action="manage_rituals"');
    expect(html).toContain("Manage rituals");
    expect(html).not.toContain("before it chooses");
    expect(html).not.toContain("what are we making space for");
    expect(html).not.toContain("tune this week");
    expect(html).not.toContain("use usual settings");
    expect(html).not.toContain("AI");
    expect(html).not.toContain("algorithm");
    expect(html).not.toContain("generated");
  });

  it("adds a timing-window entry path when a strong timing window is available", () => {
    const html = renderRitualCheckInShell({
      draft: { step: "entry_path" },
      displayName: "Morgan Example",
      currentTimingWindow: getNewMoonWindow(),
    });

    expect(html).toContain("Choose with me");
    expect(html).toContain("I have something in mind");
    expect(html).toContain("Rituals for this timing");
    expect(html).toContain("Browse rituals that match new moon.");
    expect(html).toContain('data-timing-rituals-entry="true"');
  });

  it("renders the guided check-in first question after the entry path is chosen", () => {
    const html = renderRitualCheckInShell({
      draft: { step: "time_scope" },
      displayName: "Morgan Example",
    });

    expect(html).not.toContain("Welcome back, Morgan.");
    expect(html).not.toContain("Today’s shape");
    expect(html).not.toContain("Choose with me");
    expect(html).not.toContain("I have something in mind");
    expect(html).toContain("Are you wanting something for today, or looking across the week?");
    expect(html).toContain("For today");
    expect(html).toContain("Across the week");
    expect(html).toContain("Go back");
  });

  it("renders Today's shape near the first check-in question with curated timing copy", () => {
    const html = renderRitualCheckInShell({
      draft: { step: "entry_path" },
      displayName: "Morgan Example",
      todaysShapeBrief: {
        title: "Today’s shape",
        summary: "Waning gibbous moon. Next lunar milestone: Last quarter moon on Sunday. No large timing marker is at the center today; the day can stay simple.",
        chips: [
          { label: "Waning gibbous moon; next last quarter moon", kind: "moon", emphasis: "supporting" },
          { label: "7 note", kind: "numerology", emphasis: "accent" },
        ],
        details: [
          {
            title: "Moon",
            body: "Waning gibbous moon. Next lunar milestone: Last quarter moon on June 8.",
          },
          {
            title: "Numerology",
            body: "A 7 note adds reflection and sorting.",
          },
        ],
        timingAuthority: "shape_only",
        majorEventPresent: false,
      },
    });

    expect(html.indexOf("Today’s shape")).toBeLessThan(
      html.indexOf("Choose with me"),
    );
    expect(html).toContain("Waning gibbous moon");
    expect(html).toContain("Next lunar milestone: Last quarter moon on Sunday");
    expect(html).not.toContain("7 note");
    expect(html).not.toContain("A 7 note adds reflection and sorting.");
    expect(html).not.toContain("<summary>More</summary>");
    expect(html).not.toContain("Timing weather");
    expect(html).not.toContain("you should");
    expect(html).not.toContain("timing overrides check-in");
    expect(html).not.toContain("score");
    expect(html).not.toContain("source");
    expect(html).not.toContain("degree");
    expect(html).not.toContain("debug");
    expect(html).not.toContain("person_a");
    expect(html).not.toContain("person_b");
  });

  it("can show a major event in Today's shape without making it the ritual", () => {
    const html = renderRitualCheckInShell({
      draft: { step: "entry_path" },
      todaysShapeBrief: {
        title: "Today’s shape",
        summary: "New moon today, with a 1 note in the date. Good weather for a small beginning, first light, or one phrase that does not need to become a plan.",
        chips: [
          { label: "New moon today", kind: "moon", emphasis: "primary" },
          { label: "1 note", kind: "numerology", emphasis: "supporting" },
        ],
        details: [],
        timingAuthority: "may_lead",
        majorEventPresent: true,
      },
    });

    expect(html).toContain("New moon today");
    expect(html).toContain("Good weather for a small beginning");
    expect(html).toContain("Choose with me");
    expect(html).toContain("I have something in mind");
    expect(html).not.toContain("Choose ritual");
    expect(html).not.toContain("This timing overrides");
  });

  it("renders first-login check-in copy without a welcome-back greeting", () => {
    const html = renderRitualCheckInShell({
      draft: { step: "entry_path" },
      displayName: "Morgan Example",
      introMode: "first_login",
    });

    expect(html).toContain("Let&rsquo;s choose your first ritual.");
    expect(html).not.toContain("Welcome back");
    expect(html).not.toContain("Morgan");
    expect(html).toContain("Choose with me");
    expect(html).not.toContain("Are you wanting something for today, or looking across the week?");
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
    expect(html).not.toContain("For today");
    expect(html).toContain("Barely any");
    expect(html).toContain("A pause, a noticing, or one tiny act.");
    expect(html).toContain("A little");
    expect(html).toContain("Five minutes or less.");
    expect(html).toContain("Enough to engage");
    expect(html).toContain("A simple ritual with some attention.");
    expect(html).toContain("Room for something deeper");
    expect(html).toContain("More time, reflection, conversation, or ritual shape.");
    expect(html).not.toContain("Who is this for?");
    expect(html).not.toContain("Where should the ritual live?");
    expect(html).not.toContain("What work should the ritual hold?");
  });

  it("acknowledges the selected week scope before the next question", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "energy_capacity",
        timeScope: "best_moment_this_week",
      },
      displayName: "Morgan Example",
    });

    expect(html).not.toContain("Looking across the week");
    expect(html).toContain("How much energy or capacity do you have?");
    expect(html).not.toContain("Welcome back");
  });

  it("renders carrier options for A little capacity", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "carrier",
        timeScope: "today",
        energyCapacity: "a_little",
        capacityMode: "low",
      },
    });

    expect(html).toContain("Where should the ritual live?");
    expect(html).toContain("In candlelight");
    expect(html).toContain("At the table");
    expect(html).toContain("At the doorway");
    expect(html).toContain("With a plant");
    expect(html).toContain("In words");
    expect(html).toContain("In a vessel");
    expect(html).toContain("In the body");
    expect(html).not.toContain("Today’s shape");
    expect(html).not.toContain("Conversation");
    expect(html).not.toContain("Who is this for?");
    expect(html).not.toContain("What work should the ritual hold?");
  });

  it("renders audience, purpose, and carrier steps", () => {
    const audienceHtml = renderRitualCheckInShell({
      draft: {
        step: "audience",
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
      },
    });
    const purposeHtml = renderRitualCheckInShell({
      draft: {
        step: "purpose",
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
        audience: "both_of_us",
      },
    });
    const carrierHtml = renderRitualCheckInShell({
      draft: {
        step: "carrier",
        timeScope: "best_moment_this_week",
        energyCapacity: "room_for_something_deeper",
        capacityMode: "high",
        audience: "both_of_us",
        purpose: "connecting",
        purposeLabel: "Connecting",
      },
    });

    expect(audienceHtml).toContain("Who is this for?");
    expect(audienceHtml).toContain("Go back");
    expect(audienceHtml).toContain("Me");
    expect(audienceHtml).toContain("Both of us");
    expect(purposeHtml).toContain("Go back");
    expect(purposeHtml).toContain("What work should the ritual hold?");
    expect(purposeHtml).toContain("Steadying");
    expect(purposeHtml).toContain("Opening");
    expect(purposeHtml).toContain("Releasing");
    expect(purposeHtml).toContain("Tending");
    expect(purposeHtml).toContain("Connecting");
    expect(purposeHtml).toContain("Voicing");
    expect(purposeHtml).toContain("Marking");
    expect(purposeHtml).toContain("Blessing");
    expect(purposeHtml).toContain("Protecting");
    expect(purposeHtml).toContain("Remembering");
    expect(carrierHtml).toContain("Go back");
    expect(carrierHtml).toContain("Where should the ritual live?");
    const tableIndex = carrierHtml.indexOf("At the table");
    const openIndex = carrierHtml.indexOf("I&#39;m open");

    expect(carrierHtml).toContain("I&#39;m open");
    expect(carrierHtml).toContain("Let Moon &amp; Table choose the carrier.");
    expect(carrierHtml).toContain("At the table");
    expect(tableIndex).toBeLessThan(openIndex);
  });

  it("renders a purpose step even for barely-any capacity", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "purpose",
        timeScope: "today",
        energyCapacity: "barely_any",
        capacityMode: "pause",
        audience: "me",
      },
    });

    expect(html).toContain("Me");
    expect(html).not.toContain("Barely any capacity");
    expect(html).toContain("What work should the ritual hold?");
    expect(html).toContain("Steadying");
    expect(html).toContain("Remembering");
  });

  it("renders a review screen before generating the brief", () => {
    const html = renderRitualCheckInShell({
      draft: {
        step: "review",
        timeScope: "best_moment_this_week",
        energyCapacity: "a_little",
        capacityMode: "low",
        audience: "both_of_us",
        carrier: "plant",
        carrierLabel: "With a plant",
        purpose: "tending",
        purposeLabel: "Tending",
      },
    });

    expect(html).toContain("Ready.");
    expect(html).toContain("I’ll look for something:");
    expect(html).toContain("<li>across the week</li>");
    expect(html).toContain("<li>for both of you</li>");
    expect(html).toContain("<li>with a little capacity</li>");
    expect(html).toContain("<li>living with a plant</li>");
    expect(html).toContain("<li>tending</li>");
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
        purpose: "steadying",
        purposeLabel: "Steadying",
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

  it("renders a loading state", () => {
    const html = renderLoadingShell();

    expect(html).toContain('class="shell shell--moon-loading"');
    expect(html).toContain('aria-label="Loading sign-in state"');
    expect(html).toContain("entry-moon-loader");
    expect(html).not.toContain("Moon &amp; Table");
    expect(html).not.toContain("Opening Moon &amp; Table.");
    expect(html).not.toContain("Checking sign-in.");
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

  it("renders Ritual-first entry choices when signed in without a selected ritual", () => {
    const privateBriefData = resolvePrivateBriefData({});
    const html = renderSignedInShell(privateBriefData);
    const moonIndex = html.indexOf("Moon &amp; Table");
    const menuThisWeekIndex = html.indexOf('data-menu-action="this_week"');
    const menuChooseRitualIndex = html.indexOf(
      'data-menu-action="choose_ritual"',
    );
    const menuSearchRitualsIndex = html.indexOf(
      'data-menu-action="search_rituals"',
    );
    const menuManageRitualsIndex = html.indexOf(
      'data-menu-action="manage_rituals"',
    );
    const menuHowItWorksIndex = html.indexOf('data-menu-action="how_it_works"');
    const menuProfileIndex = html.indexOf('data-menu-action="profile_settings"');
    const menuSignOutIndex = html.indexOf('data-auth-action="sign-out"');

    expect(html).toContain('class="check-in check-in--embedded"');
    expect(html).toContain('aria-label="Choose a ritual"');
    expect(html).toContain("Current ritual");
    expect(html).toContain("Choose a ritual");
    expect(html).toContain("Choose with me");
    expect(html).toContain("I have something in mind");
    expect(html).toContain('data-check-in-action="start_guided"');
    expect(html).toContain('data-check-in-value="choose_with_me"');
    expect(html).toContain('data-search-rituals-entry="true"');
    expect(html).toContain("Search rituals");
    expect(html).toContain("Manage rituals");
    expect(html).toContain("Profile settings");
    expect(html).toContain("How it works");
    expect(html).toContain("Sign out");
    expect(html).toContain("moon-glyph");
    expect(html).toContain("moon-phase-indicator");
    expect(html).toContain("moon-phase-tooltip");
    expect(html).toContain("Current phase:");
    expect(html).toContain("Next lunar milestone:");
    expect(html).toMatch(/Next lunar milestone:<\/strong> [^<]+ moon on /);
    expect(html).toContain('class="masthead__home"');
    expect(html).toContain('data-home-action="this_week"');
    expect(html).toContain('aria-label="Show current ritual"');
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
    expect(html).toContain('data-menu-action="choose_ritual"');
    expect(html).toContain('data-menu-action="search_rituals"');
    expect(html).toContain('data-menu-action="manage_rituals"');
    expect(html).toContain('data-menu-action="profile_settings"');
    expect(html).toContain('data-menu-action="how_it_works"');
    expect(menuThisWeekIndex).toBeLessThan(menuChooseRitualIndex);
    expect(menuChooseRitualIndex).toBeLessThan(menuSearchRitualsIndex);
    expect(menuSearchRitualsIndex).toBeLessThan(menuManageRitualsIndex);
    expect(menuManageRitualsIndex).toBeLessThan(menuProfileIndex);
    expect(menuProfileIndex).toBeLessThan(menuHowItWorksIndex);
    expect(menuHowItWorksIndex).toBeLessThan(menuSignOutIndex);
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
    expect(html).not.toContain('class="brief__core"');
    expect(html).not.toContain('class="brief__theme"');
    expect(html).not.toContain('class="brief__depth"');
    expect(html).not.toContain('class="brief__actions"');
    expect(html).not.toContain('data-feedback-type="good"');
    expect(html).not.toContain("How does this feel to you?");
    expect(html).not.toContain("Give me another option");
    expect(html).not.toContain("I want to check in again");
    expect(html).not.toContain("This week's signals");
    expect(html).not.toContain('class="brief__signal-list"');
    expect(html).not.toContain('data-signal-type="schedule"');
    expect(html).not.toContain('data-signal-type="schedule"');
    expect(html).toMatch(
      new RegExp("Current phase:</strong> [A-Z][a-z]+(?: [a-z]+)* moon"),
    );
    expect(html).not.toContain("Capacity and audience fit");
    expect(html).not.toContain("Schedule — realistic window");
    expect(html).not.toContain("Why this fits");
    expect(html).not.toContain("Private chart fit");
    expect(html).not.toContain("No saved natal placements were loaded for this brief.");
    expect(html).not.toContain("How this was chosen");
    expect(html).not.toContain("Material and ritual fit");
    expect(html).not.toContain("Timing fit");
    expect(html).not.toContain("Private timing fit");
    expect(html).not.toContain("Safety and fit");
    expect(html).not.toContain("Household safety guardrails");
    expect(html).not.toContain("Safety filters applied");
    expect(html).not.toContain('<details class="brief__choice-details" aria-label="How this was chosen">');
    expect(html).not.toContain('<details class="brief__choice-details" aria-label="How this was chosen" open');
    expect(html).not.toContain('class="brief__chosen-section" aria-label="Material lineage"');
    expect(html).not.toContain("hearth/table first-and-last logic");
    expect(html).not.toContain('<section class="brief__sources" aria-label="Sources used">');
    expect(html).not.toContain("When you have five quiet minutes.");
    expect(html).not.toContain("Thursday evening");
    expect(html).not.toContain("Tuesday evening");
    expect(html).not.toContain("Saturday morning");
    expect(html).not.toContain("0-5 minutes");
    expect(html).not.toContain(">The practice<");
    expect(html).not.toContain(">A good window<");
    expect(html).not.toContain(">Optional<");
    expect(html).not.toContain(">Intention<");
    expect(html).not.toContain(">Best window<");
    expect(html).not.toContain("No add-on needed.");
    expect(html).not.toContain('class="brief__intention"');
    expect(html).not.toContain("Question to carry");
    expect(html).not.toContain("Need a different suggestion?");
    expect(html).not.toContain("Give feedback");
    expect(html).not.toContain("Share feedback");
    expect(html).not.toContain('data-feedback-type="too_much"');
    expect(html).not.toContain("Simpler, please");
    expect(html).not.toContain('data-feedback-type="too_generic"');
    expect(html).not.toContain('data-feedback-type="more_like_this"');
    expect(html).not.toContain('data-feedback-type="not_this_style"');
    expect(html).not.toContain('data-feedback-type="skipped"');
    expect(html).not.toContain('data-feedback-type="try_again"');
    expect(html).not.toContain("Try something else");
    expect(html).not.toContain(">Start over</button>");
    expect(html).not.toContain('data-check-in-start-over="true"');
    expect(html).not.toContain('<section class="brief__question" aria-label="Question to carry">');
    expect(html).not.toContain('class="brief__question-details"');
    expect(html).not.toContain('<section class="why-this" aria-label="Why this fits">');
    expect(html).not.toContain("<h3>Why this fits</h3>");
    expect(html).not.toContain('class="why-this__reasons"');
    expect(html).not.toContain('<details class="why-this"');
    expect(html).not.toContain('<details class="feedback" aria-label="Feedback">');
    expect(html).not.toContain('<details class="feedback" open');
    expect(moonIndex).toBeGreaterThan(-1);
    expect(html.slice(0, moonIndex)).not.toContain("Private weekly ritual brief");
    expect(html).not.toContain("Private weekly ritual brief");
    expect(html).not.toContain("Using your household settings.");
    expect(html).not.toContain("Using starter settings until your private settings are ready.");
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

  it("renders the masthead moon from the current date, not selected ritual timing", () => {
    const starterPrivateBriefData = resolvePrivateBriefData({});
    const privateBriefData = {
      ...starterPrivateBriefData,
      input: {
        ...starterPrivateBriefData.input,
        currentDate: "2026-06-05T12:00:00-06:00",
        timezone: "America/Denver",
      },
    };
    const html = renderSignedInShell(privateBriefData);

    expect(html).toContain("Current phase:</strong> Waning gibbous moon");
    expect(html).toContain("Next lunar milestone:</strong> Last quarter moon on June 8, 2026");
    expect(html).toContain('data-moon-phase-glyph="waning_gibbous"');
    expect(html).not.toContain("Current phase:</strong> Last quarter moon");
    expect(html).not.toContain("Next lunar milestone:</strong> New moon");
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

  it("renders the Search rituals view as cards with a read-only preview", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      activeView: "search_rituals",
    });

    expect(html).toContain('data-menu-action="search_rituals"');
    expect(html).toContain('aria-pressed="true">Search rituals</button>');
    expect(html).toContain("&larr; Go back</button>");
    expect(html).toContain('data-ritual-search-back="true"');
    expect(html).not.toContain("I have something in mind.");
    expect(html).toContain("Search by material, mood, purpose, place, or phrase.");
    expect(html).toContain('data-ritual-search-form="true"');
    expect(html).toContain('type="search"');
    expect(html).not.toContain('data-ritual-search-chip="plant"');
    expect(html).not.toContain('data-ritual-search-chip="table"');
    expect(html).toContain('name="ritualSearchSource"');
    expect(html).toContain('name="ritualSearchPurpose"');
    expect(html).toContain('name="ritualSearchCarrier"');
    expect(html).toContain('name="ritualSearchTiming"');
    expect(html).toContain("New Moon");
    expect(html).toContain("Full Moon");
    expect(html).toContain("Spring Equinox");
    expect(html).toContain("End of year");
    expect(html).toContain('data-ritual-select=');
    expect(html).toContain('class="ritual-result-card__expanded"');
    expect(html).not.toContain("Wet the seed and wait.");
    expect(html).not.toContain("Set grain at the table.");
    expect(html).not.toContain("Kindle the first household light.");
    expect(html).toContain("Select a ritual");
    expect(html).toContain("528 rituals available");
    expect(html).toContain('name="ritualSearchSort"');
    expect(html).toContain("Best match");
    expect(html).toContain("Recently added");
    expect(html).toContain("Carrier");
    expect(html).toContain("Capacity");
    expect(html).toContain('data-ritual-search-clear="true"');
    expect(html).toContain("Clear filters");
    expect(html).not.toContain("Preview only");
    expect(html).not.toContain("Pilot · Preview only");
    expect(html).not.toContain("Browse the pilot ritual library");
    expect(html).not.toContain("Reach by one word");
    expect(html).toContain("Recommendation eligible");
    expect(html).not.toContain("Source cluster");
    expect(html).not.toContain("direct_use_review");
    expect(html).toContain("Readiness and source details");
    expect(html).not.toContain("<table");
    expect(html).not.toContain("Ritual library");
    expect(html).toContain("Manage rituals");
    expect(html).not.toContain('data-testid="recommended-ritual"');
  });

  it("renders the Manage rituals view as a read-only inspection table", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      activeView: "manage_rituals",
    });

    expect(html).toContain('aria-label="Manage Rituals"');
    expect(html).toContain('aria-pressed="true">Manage rituals</button>');
    expect(html).toContain("528 imported Rituals. 63 reviewed. 528 direct-use eligible.");
    expect(html).toContain("Readiness summary");
    expect(html).toContain("recommendation-ready");
    expect(html).toContain("Missing readiness");
    expect(html).toContain("Findings");
    expect(html).toContain('data-manage-rituals-filter-form="true"');
    expect(html).toContain('name="manageRitualStatus"');
    expect(html).toContain("All states");
    expect(html).not.toContain(">Pilot import<");
    expect(html).not.toContain(">Draft import<");
    expect(html).toContain('name="manageRitualOrigin"');
    expect(html).toContain('name="manageRitualSource"');
    expect(html).toContain('name="manageRitualAvailability"');
    expect(html).toContain('name="manageRitualReadiness"');
    expect(html).toContain('name="manageRitualValidation"');
    expect(html).toContain('data-manage-rituals-clear="true"');
    expect(html).toContain('role="table"');
    expect(html).toContain("Imported Ritual records");
    expect(html).toContain("Ritual");
    expect(html).toContain('data-manage-ritual-sort="headline"');
    expect(html).toContain('data-manage-ritual-sort="recommendation"');
    expect(html).toContain('class="manage-rituals__record-summary"');
    expect(html).toContain("Direct use");
    expect(html).toContain("Validation findings");
    expect(html).toContain("Source label / origin label");
    expect(html).toContain("Prepare the Candle Table");
    expect(html).not.toContain("<dt>Why this fits</dt>");
    expect(html).toContain("ritual-buckland-candle-prepare-table");
    expect(html).not.toContain("direct_use_review");
    expect(html).toContain("planetary_day_or_hour_not_supported");
    expect(html).toContain("Raw full object");
    expect(html).toContain("&quot;id&quot;: &quot;ritual-buckland-candle-prepare-table&quot;");
    expect(html).not.toContain("Search by material, mood, purpose, place, or phrase.");
    expect(html).not.toContain("Choose with me");
    expect(html).not.toContain("I have something in mind");
    expect(html).not.toContain("data-ritual-select");
  });

  it("filters the Manage rituals view without changing Ritual records", () => {
    const sourceHtml = renderManageRitualsSection({
      filters: { origin: "source" },
    });
    const householdHtml = renderManageRitualsSection({
      filters: { origin: "household" },
    });
    const missingReadinessHtml = renderManageRitualsSection({
      filters: { readiness: "missing_readiness" },
    });

    expect(sourceHtml).toContain("528 Rituals shown");
    expect(sourceHtml).toContain("Prepare the Candle Table");
    expect(householdHtml).toContain("0 Rituals shown");
    expect(householdHtml).not.toContain("Prepare the Candle Table");
    expect(missingReadinessHtml).toContain("63 Rituals shown");
    expect(missingReadinessHtml).not.toContain("direct_use_review");
    expect(missingReadinessHtml).toContain("planetary_day_or_hour_not_supported");
  });

  it("keeps the search ritual path renderable before a brief exists", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      activeView: "search_rituals",
    });
    const mainSource = readFileSync(
      new URL("../../src/main.ts", import.meta.url),
      "utf8",
    );
    const renderSearchRitualsSource =
      mainSource.match(/function renderSearchRituals\(\): void \{[\s\S]+?\n\}/)?.[0] ??
      "";

    expect(html).toContain("Search rituals");
    expect(html).toContain("&larr; Go back</button>");
    expect(html).not.toContain("I have something in mind.");
    expect(html).toContain("528 rituals available");
    expect(html).toContain('data-ritual-select=');
    expect(html).not.toContain('data-testid="recommended-ritual"');
    expect(renderSearchRitualsSource).toContain(
      "if (activePrivateBriefData) {\n    renderActiveSignedInShell();",
    );
    expect(renderSearchRitualsSource).not.toContain("activeBrief");
  });

  it("wires the timing-window entry path into a prefiltered search view", () => {
    const mainSource = readFileSync(
      new URL("../../src/main.ts", import.meta.url),
      "utf8",
    );

    expect(mainSource).toContain("data-timing-rituals-entry");
    expect(mainSource).toContain('activeRitualSearchTiming = "current"');
    expect(mainSource).toContain('activeRitualSearchSort = "match"');
    expect(mainSource).toContain("data-ritual-search-timing");
  });

  it("renders Choose with me favorites and fit feedback on the selected result", () => {
    const favorite = createFavorite(chooseWithMeFixtureRitual.id);
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      chooseWithMeResult: createChooseWithMeResultFixture(),
      chooseWithMeRecommendationInstanceId: "recommendation_fixture",
      ritualFavorites: [],
    });
    const savedHtml = renderSignedInShell(resolvePrivateBriefData({}), {
      chooseWithMeResult: createChooseWithMeResultFixture(),
      chooseWithMeRecommendationInstanceId: "recommendation_fixture",
      ritualFavorites: [favorite],
    });
    const checkInAgainIndex = html.indexOf("I want to check in again");
    const secondaryActionsIndex = html.indexOf('class="choose-result__secondary-actions"');
    const saveFavoriteIndex = html.indexOf(">Save favorite</button>");
    const feedbackIndex = html.indexOf(">Give feedback</summary>");

    expect(html).toContain("How does this feel to you?");
    expect(html).toContain("This feels right.");
    expect(html).toContain("Give feedback");
    expect(html).toContain("Give me another option");
    expect(html).toContain("I want to check in again");
    expect(html).toContain('class="choose-result__title-row"');
    expect(html).toContain("ritual-favorite-button--icon");
    expect(html).toContain(">♡</button>");
    expect(html).toContain(">Save favorite</button>");
    expect(savedHtml).toContain(">♥</button>");
    expect(savedHtml).toContain(">Saved</button>");
    expect(html).toContain('data-ritual-favorite-source="choose_with_me"');
    expect(html).toContain('data-recommendation-instance-id="recommendation_fixture"');
    expect(html).toContain('data-ritual-feedback-fit="fit"');
    expect(html).toContain('data-ritual-feedback-form="feedback"');
    expect(html).toContain('value="more_like_this"');
    expect(html).toContain('value="never_recommend_this"');
    expect(html).toContain("Optional note");
    expect(html).not.toContain("This fit</button>");
    expect(html).not.toContain(">Not quite</summary>");
    expect(secondaryActionsIndex).toBeGreaterThan(checkInAgainIndex);
    expect(saveFavoriteIndex).toBeGreaterThan(secondaryActionsIndex);
    expect(feedbackIndex).toBeGreaterThan(saveFavoriteIndex);
  });

  it("does not render favorite or feedback controls for a no-result Choose with me state", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}), {
      chooseWithMeResult: {
        status: "no_result",
        whyThisFits: "Nothing matched that exact reach.",
        howThisWasChosen: "No eligible Ritual remained.",
        debug: {
          normalizedRequest: {
            timeScope: "today",
            energyCapacity: "a_little",
            capacityMode: "low",
          },
          eligibleCount: 0,
          excludedCount: 1,
          topCandidates: [],
          exclusions: { not_recommendation_eligible: 1 },
          timing: {
            suppliedFacts: [],
            suppliedWindows: [],
            matchedRitualTiming: [],
            timingScore: 0,
            requiredTimingSatisfied: true,
            timingCouldNotBeVerified: [],
          },
          timingEvidence: [],
          explanationEvidence: [],
        },
      },
    });

    expect(html).toContain("Nothing fit that exact reach.");
    expect(html).not.toContain("data-ritual-favorite-toggle");
    expect(html).not.toContain("data-ritual-feedback-fit");
    expect(html).not.toContain("data-ritual-feedback-form");
    expect(html).not.toContain("data-ritual-try-another");
  });

  it("filters the Search rituals view by query, source, and chips", () => {
    const seedHtml = renderSearchRitualsSection({ query: "seed" });
    const tableHtml = renderSearchRitualsSection({
      selectedChips: ["table"],
    });
    const bucklandHtml = renderSearchRitualsSection({
      source: "raymond_buckland_practical_candleburning_rituals",
    });
    const emptyHtml = renderSearchRitualsSection({
      query: "no such ritual",
      selectedChips: ["table"],
    });

    expect(seedHtml).toContain("ritual");
    expect(seedHtml).toContain("Set the Seed on the Dark Table");
    expect(tableHtml).toContain("ritual");
    expect(tableHtml).toContain("Bread on the Table");
    expect(bucklandHtml).toContain("Raymond Buckland, Practical Candleburning Rituals");
    expect(bucklandHtml).toContain("13 rituals found");
    expect(emptyHtml).toContain("Nothing matched that exact reach.");
  });

  it("renders Search favorites as small heart controls and filters to favorites only", () => {
    const favorite = createFavorite(chooseWithMeFixtureRitual.id);
    const unsavedHtml = renderSearchRitualsSection({
      query: chooseWithMeFixtureRitual.presentation.headline,
      favorites: [],
    });
    const savedHtml = renderSearchRitualsSection({
      favorites: [favorite],
      favoritesOnly: true,
      selectedRitualId: chooseWithMeFixtureRitual.id,
    });
    const emptyFavoritesHtml = renderSearchRitualsSection({
      favorites: [],
      favoritesOnly: true,
    });

    expect(unsavedHtml).toContain('class="ritual-result-card__title-row"');
    expect(unsavedHtml).toContain('data-ritual-favorite-source="search"');
    expect(unsavedHtml).toContain('aria-label="Save ');
    expect(unsavedHtml).toContain(">♡</button>");
    expect(unsavedHtml).not.toContain(">Save favorite</button>");
    expect(savedHtml).toContain('name="ritualSearchFavoritesOnly"');
    expect(savedHtml).toContain('data-ritual-search-favorites-only="true"');
    expect(savedHtml).toContain("checked");
    expect(savedHtml).toContain("1 ritual found");
    expect(savedHtml).toContain(">♥</button>");
    expect(savedHtml).not.toContain(">Saved</button>");
    expect(emptyFavoritesHtml).toContain("No saved favorites matched that exact reach.");
  });

  it("wires Ritual-first favorite and feedback interactions through main", () => {
    const mainSource = readFileSync(
      new URL("../../src/main.ts", import.meta.url),
      "utf8",
    );

    expect(mainSource).toContain("createRitualFavoriteStore");
    expect(mainSource).toContain("createRecommendationEventStore");
    expect(mainSource).toContain("recordFavoriteAdded");
    expect(mainSource).toContain("recordFavoriteRemoved");
    expect(mainSource).toContain("recordRitualFeedback");
    expect(mainSource).toContain("recordTryAnotherRequested");
    expect(mainSource).toContain("activeChooseWithMeExcludedRitualIds");
    expect(mainSource).toContain("chooseRitualForActiveCheckIn");
    expect(mainSource).toContain("Here is another strong option.");
    expect(mainSource).toContain("recordRitualSelected");
    expect(mainSource).toContain("data-ritual-search-favorites-only");
    expect(mainSource).toContain('surface: "search"');
    expect(mainSource).not.toContain("handleTryAgainClick");
  });

  it("renders a timing-match search filter with timing-specific results", () => {
    const html = renderSearchRitualsSection({
      timing: "current",
      currentTimingWindow: getNewMoonWindow(),
    });

    expect(html).toContain('name="ritualSearchTiming"');
    expect(html).toContain('data-ritual-search-timing="true"');
    expect(html).toContain(">This timing window</option>");
    expect(html).toContain("17 rituals found");
    expect(html).toContain("Matches: New Moon");
    expect(html).toContain("Timing required");
    expect(html).toContain("Timing preferred");
    expect(html).toContain("Timing helpful");
    expect(html).toContain("Best around: Monday");
    expect(html).not.toContain("timing_window_signal");
    expect(html).not.toContain("timing.lunation");
    expect(html).not.toContain("candidate.saint_thomas.long_distance_calendar_light");
  });

  it("renders named timing filter results without needing a current timing window", () => {
    const html = renderSearchRitualsSection({
      timing: "full_moon",
    });

    expect(html).toContain('name="ritualSearchTiming"');
    expect(html).toContain('<option value="full_moon" selected>Full Moon</option>');
    expect(html).not.toContain("This timing window");
    expect(html).toContain("16 rituals found");
    expect(html).toContain("Matches: Full Moon");
    expect(html).toContain("Timing required");
    expect(html).not.toContain("Best around:");
    expect(html).not.toContain("timing_window_signal");
  });

  it("renders the shared Ritual preview from presentation fields", () => {
    const html = renderRitualPreview(
      sourceBackedRituals.find(
        (ritual) => ritual.id === "ritual-woodward-bread-table-offering",
      ) ?? sourceBackedRituals[0],
    );

    expect(html).toContain("Bread on the Table");
    expect(html).toContain("Make bread a visible household offering.");
    expect(html).toContain("Place the bread on a plate at the center of the table.");
    expect(html).toContain("Best window");
    expect(html).toContain("Why this fits");
    expect(html).toContain("Question to carry");
    expect(html).toContain("What does this table need to be fed?");
    expect(html).toContain("Recommendation eligible");
    expect(html).toContain("<dd>yes</dd>");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
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

  it("does not render legacy weekly brief content on the current ritual surface", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}));

    expect(html).toContain('class="check-in check-in--embedded"');
    expect(html).toContain("Choose with me");
    expect(html).toContain("I have something in mind");
    expect(html).not.toContain('data-testid="recommended-ritual"');
    expect(html).not.toContain('class="brief__actions"');
    expect(html).not.toContain('class="brief__intention"');
    expect(html).not.toContain("Optional: light a candle if that feels supportive and safe.");
    expect(html).not.toContain("Notice what is already clear.");
    expect(html).not.toContain("Question to carry");
    expect(html).not.toContain("Developer decision record");
    expect(html).not.toContain("Selected score reasons");
    expect(html).not.toContain("Evaluated ritual patterns");
    expect(html).not.toContain("Here is another approved option.");
    expect(html).not.toContain("Got it.");
    expect(html).not.toContain(">Saving</button>");
    expect(html).not.toContain("feedback-button--selected");
    expect(html).not.toContain('data-feedback-type="too_generic"');
    expect(html).not.toContain("Capacity: <span>Steady</span>");
    expect(html).not.toContain("Current capacity:");
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

  it("renders profile tuning only when the profile settings view is selected", () => {
    const defaultHtml = renderSignedInShell(resolvePrivateBriefData({}));
    const settingsHtml = renderSignedInShell(resolvePrivateBriefData({}), {
      activeView: "profile_settings",
    });

    expect(defaultHtml).toContain('class="check-in check-in--embedded"');
    expect(defaultHtml).not.toContain("data-testid=\"recommended-ritual\"");
    expect(defaultHtml).not.toContain("What is usually true?");
    expect(settingsHtml).toContain("Profile settings");
    expect(settingsHtml).toContain("Profile settings will appear here");
    expect(settingsHtml).not.toContain("data-testid=\"recommended-ritual\"");
    expect(settingsHtml).toContain('data-menu-action="this_week"');
    expect(settingsHtml).toContain('aria-pressed="true">Profile settings');
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

    expect(html).toContain('class="shell shell--moon-loading"');
    expect(html).toContain('aria-label="Loading household settings"');
    expect(html).toContain("entry-moon-loader");
    expect(html).not.toContain("Moon &amp; Table");
    expect(html).not.toContain("Preparing this week.");
    expect(html).not.toContain("Loading household settings.");
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
      'aria-label="Loading sign-in state"',
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
    ).toContain('aria-label="Loading household settings"');
  });
});
