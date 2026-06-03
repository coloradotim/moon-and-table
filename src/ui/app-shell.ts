import {
  generateWeeklyBrief,
  type BriefExplanation,
  type BriefSourceSummary,
  type CapacityMode,
  type WeeklyBrief,
} from "../lib/generate-weekly-brief";
import type { AppAuthState } from "../lib/auth";
import {
  BRIEF_FEEDBACK_TYPES,
  type BriefFeedbackType,
} from "../lib/brief-feedback";
import {
  getMoonPhaseGlyphLabelForAngle,
  getMoonPhaseGlyphSvgForAngle,
  getNextMoonPhaseMilestoneForAngle,
} from "../lib/moon-phase-glyph";
import type { PrivateBriefData } from "../lib/private-data";
import { getGroupedProfilePreferenceOptions } from "../lib/profile-preference-taxonomy";
import {
  PROFILE_TUNING_ASTROLOGY_VISIBILITY,
  type ProfileTuningProfile,
  type ProfileTuningSettings,
} from "../lib/profile-tuning";

const feedbackLabels: Record<BriefFeedbackType, string> = {
  good: "Save this",
  too_much: "Simpler, please",
  too_generic: "Tone is off",
  more_like_this: "More like this",
  not_this_style: "Not this style",
  skipped: "I skipped it",
  try_again: "Try something else",
};
const capacityModes: CapacityMode[] = ["pause", "low", "steady", "high"];
const capacityDisplayLabels: Record<CapacityMode, string> = {
  pause: "Surviving",
  low: "Bare minimum",
  steady: "Steady",
  high: "Energized",
};
const capacityPickerDescriptions: Record<CapacityMode, string> = {
  pause: "nothing required",
  low: "five minutes or less",
  steady: "about twenty minutes",
  high: "about half an hour",
};

export type SignedInView = "this_week" | "profile_settings";

export type SignedInShellOptions = {
  activeView?: SignedInView;
  brief?: WeeklyBrief;
  capacityModeOverride?: CapacityMode | null;
  capacityPickerOpen?: boolean;
  feedbackStatus?: string;
  tryAgainStatus?: string;
  selectedFeedbackType?: BriefFeedbackType;
  savingFeedbackType?: BriefFeedbackType;
  showDebugTrace?: boolean;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderOptionalAddOn(value: string): string {
  if (value.trim() === "No add-on needed.") {
    return "";
  }

  const softenedValue = value.charAt(0).toLowerCase() + value.slice(1);

  return `<p class="brief__optional">Optional: ${escapeHtml(softenedValue)}</p>`;
}

function renderBriefSignals(explanation: BriefExplanation): string {
  if (explanation.signals.length === 0) {
    return "";
  }

  return `
    <section class="brief__signals" aria-label="This week's signals">
      <h3>This week's signals</h3>
      <ul class="brief__signal-list">
        ${explanation.signals.map((signal) => `
          <li class="brief__signal" data-signal-type="${escapeHtml(signal.type)}">
            <span>${escapeHtml(signal.label)}</span>
          </li>
        `).join("")}
      </ul>
    </section>
  `;
}

function renderBriefReasoning(explanation: BriefExplanation): string {
  const primaryReason =
    explanation.reasoning.find((reason) => reason.label === "Why this ritual") ??
    explanation.reasoning[0];

  if (!primaryReason) {
    return "";
  }

  return `
    <section class="why-this" aria-label="Why this ritual">
      <h3>Why this ritual</h3>
      <p>${escapeHtml(primaryReason.summary)}</p>
    </section>
  `;
}

function getSourceKindLabel(kind: BriefSourceSummary["kind"]): string {
  switch (kind) {
    case "source_review":
      return "Source review";
    case "symbolic_card":
      return "Symbolic card";
    case "ritual_pattern":
      return "Ritual pattern";
    case "safety_guardrail":
      return "Safety";
    case "timing_fact":
      return "Timing fact";
  }
}

function renderBriefSources(explanation: BriefExplanation): string {
  if (explanation.sourcesUsed.length === 0) {
    return "";
  }

  return `
    <section class="brief__sources" aria-label="Sources used">
      <h3>Sources used</h3>
      <div class="brief__source-list">
        ${explanation.sourcesUsed.map((source) => `
          <article class="brief__source">
            <p class="brief__source-label">${escapeHtml(source.label)}</p>
            <p><span>${escapeHtml(getSourceKindLabel(source.kind))}</span>${source.summary ? ` — ${escapeHtml(source.summary)}` : ""}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBriefChoiceDetails(explanation: BriefExplanation): string {
  const signals = renderBriefSignals(explanation);
  const sources = renderBriefSources(explanation);

  if (!signals && !sources) {
    return "";
  }

  return `
    <details class="brief__choice-details" aria-label="How this was chosen">
      <summary>How this was chosen</summary>
      <div class="brief__choice-details-body">
        ${signals}
        ${sources}
      </div>
    </details>
  `;
}

function renderMoonGlyph(brief: WeeklyBrief): string {
  const lunarTiming = brief.trace.timingFactDetails[0];
  const phaseAngle = lunarTiming?.phaseAngleDegrees ?? 0;
  const phaseDate = lunarTiming?.exactIso ?? lunarTiming?.dateStart ?? new Date().toISOString();
  const currentPhase = getMoonPhaseGlyphLabelForAngle(phaseAngle);
  const nextMilestone = getNextMoonPhaseMilestoneForAngle(phaseAngle, phaseDate);
  const nextMilestoneDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: lunarTiming?.timezone ?? "UTC",
  }).format(new Date(nextMilestone.exactIso));
  const tooltip = `Current phase: ${currentPhase}. Next lunar milestone: ${nextMilestone.label} on ${nextMilestoneDate}.`;

  return `
    <span
      class="moon-phase-indicator"
      tabindex="0"
      aria-label="${escapeHtml(tooltip)}"
    >
      ${getMoonPhaseGlyphSvgForAngle(phaseAngle)}
      <span class="moon-phase-tooltip" role="tooltip">
        <span><strong>Current phase:</strong> ${escapeHtml(currentPhase)}</span>
        <span><strong>Next lunar milestone:</strong> ${escapeHtml(`${nextMilestone.label} on ${nextMilestoneDate}`)}</span>
      </span>
    </span>
  `;
}

function renderBriefTheme(theme: string): string {
  const sentences = theme.match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()) ?? [];
  const shouldSplit = sentences.length === 2 && sentences.join(" ") === theme.trim();

  if (!shouldSplit) {
    return escapeHtml(theme);
  }

  return sentences
    .map((sentence) => `<span class="brief__theme-line">${escapeHtml(sentence)}</span>`)
    .join("");
}

function renderCapacityControl(
  capacityMode: CapacityMode,
  isOpen: boolean,
): string {
  const pickerId = "current-capacity-picker";
  const openClass = isOpen ? " capacity-control--open" : "";
  const picker = isOpen
    ? `
      <div class="capacity-control__popover" id="${pickerId}" role="listbox" aria-label="How much do you have this week?">
        <p class="capacity-control__title">How much do you have this week?</p>
        <div class="capacity-control__options">
          ${capacityModes.map((mode) => {
            const selected = mode === capacityMode;

            return `
              <button
                type="button"
                role="option"
                data-capacity-mode="${escapeHtml(mode)}"
                aria-selected="${selected ? "true" : "false"}"
              >${escapeHtml(`${capacityDisplayLabels[mode]} — ${capacityPickerDescriptions[mode]}`)}</button>
            `;
          }).join("")}
        </div>
        <p class="capacity-control__helper">This only changes the current view.</p>
      </div>
    `
    : "";

  return `
    <section class="capacity-control${openClass}" data-capacity-control="true" aria-label="Capacity">
      <button
        class="capacity-control__toggle"
        type="button"
        data-capacity-toggle="true"
        aria-expanded="${isOpen ? "true" : "false"}"
        aria-controls="${pickerId}"
      >Capacity: <span>${escapeHtml(capacityDisplayLabels[capacityMode])}</span><span class="capacity-control__chevron" aria-hidden="true">▾</span></button>
      ${picker}
    </section>
  `;
}

function renderSelectOptions(
  options: readonly string[],
  selectedValue: string,
  labels: Record<string, string> = {},
): string {
  return options
    .map((option) => {
      const selectedAttribute = option === selectedValue ? " selected" : "";
      const label = labels[option] ?? option;

      return `<option value="${escapeHtml(option)}"${selectedAttribute}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function renderStyleOptions(
  name: "preferredRitualStyles" | "avoidedRitualStyles",
  selectedValues: string[],
): string {
  const selectedValueSet = new Set(selectedValues);

  return getGroupedProfilePreferenceOptions(selectedValues)
    .filter((group) => group.group !== "audience")
    .map((group) => {
      const options = group.options
        .map((option) => {
          const checkedAttribute = selectedValueSet.has(option.value) ? " checked" : "";

          return `
            <label class="choice-pill">
              <input
                type="checkbox"
                name="${name}"
                value="${escapeHtml(option.value)}"${checkedAttribute}
              />
              <span>${escapeHtml(option.label)}</span>
            </label>
          `;
        })
        .join("");

      return `
        <div class="preference-group">
          <p class="preference-group-label">${escapeHtml(group.label)}</p>
          <div class="choice-list">
            ${options}
          </div>
        </div>
      `;
    })
    .join("");
}

function renderAssumptionControls(settings: ProfileTuningSettings): string {
  if (settings.assumptions.length === 0) {
    return `<p class="muted">No editable preferences are saved yet.</p>`;
  }

  return settings.assumptions
    .map((assumption) => {
      const disabledAttribute =
        !assumption.editable || typeof assumption.value !== "boolean"
          ? " disabled"
          : "";
      const checkedAttribute = assumption.value === true ? " checked" : "";

      return `
        <label class="toggle-row">
          <input
            type="checkbox"
            name="assumption.${escapeHtml(assumption.key)}"
            value="true"${checkedAttribute}${disabledAttribute}
          />
          <span>${escapeHtml(assumption.label)}</span>
        </label>
      `;
    })
    .join("");
}

function renderFeedbackButton(
  type: BriefFeedbackType,
  options: SignedInShellOptions,
): string {
  const isSaving = options.savingFeedbackType === type;
  const isSelected = options.selectedFeedbackType === type || isSaving;
  const selectedClass = isSelected ? " feedback-button--selected" : "";
  const disabledAttribute = options.savingFeedbackType ? " disabled" : "";
  const pressedAttribute = isSelected ? "true" : "false";
  const label = isSaving ? "Saving" : feedbackLabels[type];

  return `
    <button
      class="feedback-button${selectedClass}"
      type="button"
      data-feedback-type="${escapeHtml(type)}"
      aria-pressed="${pressedAttribute}"${disabledAttribute}
    >${escapeHtml(label)}</button>
  `;
}

function renderTuningProfileForm(
  profile: ProfileTuningProfile,
  isOpen: boolean,
): string {
  const settings = profile.settings;
  const openAttribute = isOpen ? " open" : "";

  return `
    <details class="profile-tuning-card"${openAttribute}>
      <summary>
        <span>${escapeHtml(profile.label)}</span>
        <span class="muted">Open to edit settings</span>
      </summary>

      <form
        class="tuning-form"
        data-profile-tuning-form="true"
        data-profile-tuning-id="${escapeHtml(profile.id)}"
      >
        <div class="tuning-grid">
          <label>
            <span>Default capacity</span>
            <select name="defaultCapacityMode">
              ${renderSelectOptions(capacityModes, settings.defaultCapacityMode)}
            </select>
          </label>

          <label>
            <span>Max ritual time (minutes)</span>
            <input
              name="maxRitualDurationMinutes"
              type="number"
              min="0"
              max="30"
              step="1"
              value="${settings.maxRitualDurationMinutes}"
            />
          </label>

          <label>
            <span>Astrology detail</span>
            <select name="astrologyVisibility">
              ${renderSelectOptions(PROFILE_TUNING_ASTROLOGY_VISIBILITY, settings.astrologyVisibility)}
            </select>
          </label>
        </div>

        <fieldset>
          <legend>Prefer</legend>
          ${renderStyleOptions("preferredRitualStyles", settings.preferredRitualStyles)}
        </fieldset>

        <fieldset>
          <legend>Avoid</legend>
          ${renderStyleOptions("avoidedRitualStyles", settings.avoidedRitualStyles)}
        </fieldset>

        <fieldset>
          <legend>Suggestions usually work better when...</legend>
          <div class="toggle-list">
            ${renderAssumptionControls(settings)}
          </div>
        </fieldset>

        <div class="tuning-actions">
          <button class="primary-action" type="submit">${escapeHtml(`Save ${profile.label}'s settings`)}</button>
          <p class="muted" data-profile-tuning-status="true">Saved to this profile.</p>
        </div>
      </form>
    </details>
  `;
}

export function renderProfileTuningSection(
  privateBriefData: PrivateBriefData,
): string {
  const profiles = privateBriefData.tuningProfiles;

  if (profiles.length === 0) {
    return `
      <section class="tuning-panel" aria-label="Profile tuning">
        <div>
          <p class="label">Tune profiles</p>
          <h2>Make the suggestions fit better</h2>
        </div>
        <p class="muted">Household settings will appear here when they are available.</p>
      </section>
    `;
  }

  return `
    <section class="tuning-panel" aria-label="Profile tuning">
      <div>
        <p class="label">Tune profiles</p>
        <h2>Make the suggestions fit better</h2>
        <p class="muted">Fine-tune each household profile separately.</p>
      </div>
      <div class="profile-tuning-list">
        ${profiles.map((profile, index) => renderTuningProfileForm(profile, index === 0)).join("")}
      </div>
    </section>
  `;
}

function renderAppMenu(activeView: SignedInView): string {
  const thisWeekPressed = activeView === "this_week" ? "true" : "false";
  const profilePressed = activeView === "profile_settings" ? "true" : "false";

  return `
    <details class="app-menu" data-app-menu="true">
      <summary class="app-menu__button" aria-label="Open menu">
        <svg
          class="app-menu__icon"
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          focusable="false"
        >
          <path d="M6 7h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
          <path d="M6 12h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
          <path d="M6 17h12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
        </svg>
      </summary>
      <div class="app-menu__panel" role="menu" aria-label="App menu">
        <button type="button" role="menuitem" data-menu-action="this_week" aria-pressed="${thisWeekPressed}">This week</button>
        <button type="button" role="menuitem" data-menu-action="profile_settings" aria-pressed="${profilePressed}">Profile settings</button>
        <button type="button" role="menuitem" data-auth-action="sign-out">Sign out</button>
      </div>
    </details>
  `;
}

function renderEntryShell({
  ariaLabel,
  title,
  body,
  action,
  loading = false,
}: {
  ariaLabel: string;
  title: string;
  body?: string;
  action?: string;
  loading?: boolean;
}): string {
  return `
    <section class="shell shell--entry" aria-labelledby="app-title">
      <header class="entry-brand">
        <h1 id="app-title">Moon &amp; Table</h1>
      </header>

      <article class="entry-panel" aria-label="${escapeHtml(ariaLabel)}">
        ${loading ? '<span class="entry-moon-loader" aria-hidden="true"></span>' : ""}
        <div class="entry-panel__copy">
          <h2>${escapeHtml(title)}</h2>
          ${body ? `<p>${escapeHtml(body)}</p>` : ""}
        </div>
        ${action ?? ""}
      </article>
    </section>
  `;
}

export function renderLoadingShell(): string {
  return renderEntryShell({
    ariaLabel: "Loading sign-in state",
    title: "Opening Moon & Table.",
    body: "Checking sign-in.",
    loading: true,
  });
}

export function renderPrivateDataLoadingShell(): string {
  return renderEntryShell({
    ariaLabel: "Loading household settings",
    title: "Preparing this week.",
    body: "Loading household settings.",
    loading: true,
  });
}

export function renderSignedOutShell(configReady: boolean): string {
  const configMessage = configReady
    ? undefined
    : "Firebase is not configured yet. Add local config values in .env.local to enable sign-in.";
  const disabledAttribute = configReady ? "" : " disabled";

  return renderEntryShell({
    ariaLabel: "Sign in",
    title: "Small rituals for a more magical home.",
    body: configMessage,
    action: `<button class="primary-action entry-action" type="button" data-auth-action="sign-in"${disabledAttribute}>Sign in with Google</button>`,
  });
}

export function renderUnauthorizedShell(): string {
  return renderEntryShell({
    ariaLabel: "Access limited",
    title: "This account is not invited yet.",
    body: "Use an invited Google account to continue.",
    action: '<button class="primary-action entry-action" type="button" data-auth-action="sign-out">Sign out</button>',
  });
}

export function renderSignedInShell(
  privateBriefData: PrivateBriefData,
  options: SignedInShellOptions = {},
): string {
  const activeView = options.activeView ?? "this_week";
  const brief = options.brief ?? generateWeeklyBrief(privateBriefData.input);
  const capacityMode =
    options.capacityModeOverride ?? brief.trace.capacityMode;
  const traceSummary = [
    brief.trace.timingFacts.join(" + "),
    brief.trace.timingFactDetails
      .map((fact) => `${fact.label} (${fact.computedBy})`)
      .join(" · "),
    brief.trace.symbolicCards.join(" · "),
    brief.trace.ritualPatterns.join(" · "),
    brief.trace.sourceReviewIds.slice(0, 3).join(" · "),
    brief.trace.scheduleAssumptions.join(" · "),
  ]
    .filter(Boolean)
    .join(" · ");
  const debugTrace = options.showDebugTrace
    ? `
        <details class="trace" aria-label="Developer trace">
          <summary>Developer trace</summary>
          <p>${escapeHtml(traceSummary)}</p>
        </details>
      `
    : "";
  const weeklyBrief = `
    <article class="brief" aria-label="Weekly brief">
      <section class="brief__core" aria-label="Weekly practice">
        <h2 class="brief__theme">${renderBriefTheme(brief.theme)}</h2>
        <p class="brief__practice" data-testid="recommended-ritual">${escapeHtml(brief.recommendedRitual)}</p>
        <div class="brief__orientation" aria-label="Brief orientation">
          <section class="brief__orientation-item" aria-label="Intention">
            <p class="brief__section-label">Intention</p>
            <p class="brief__intention">${escapeHtml(brief.intention)}</p>
          </section>
          <section class="brief__orientation-item" aria-label="Best window">
            <p class="brief__section-label">Best window</p>
            <p class="brief__window">${escapeHtml(brief.bestWindow)}</p>
          </section>
        </div>
        ${renderOptionalAddOn(brief.optionalAddOn)}
      </section>

      <section class="brief__depth" aria-label="Brief explanation">
        ${renderBriefReasoning(brief.explanation)}
        <section class="brief__question" aria-label="Question to carry">
          <p class="brief__section-label">Question to carry</p>
          <p class="prompt">${escapeHtml(brief.reflectionPrompt)}</p>
        </section>
        ${renderBriefChoiceDetails(brief.explanation)}
      </section>

      <section class="brief__actions" aria-label="Brief actions">
        <div class="brief__control-group">
          ${renderCapacityControl(capacityMode, options.capacityPickerOpen ?? false)}
          <button
            class="secondary-action try-again-button"
            type="button"
            data-feedback-type="try_again"
            data-try-again-action="true"
            aria-pressed="false"${options.savingFeedbackType ? " disabled" : ""}
          >${escapeHtml(options.savingFeedbackType === "try_again" ? "Saving" : feedbackLabels.try_again)}</button>
          <details class="feedback" aria-label="Feedback">
            <summary>Give feedback</summary>
            <div class="feedback__chips">
              ${BRIEF_FEEDBACK_TYPES.filter((type) => type !== "try_again" && type !== "too_much").map((type) => renderFeedbackButton(type, options)).join("")}
            </div>
            ${options.feedbackStatus ? `<p class="muted feedback__status" data-feedback-status="true">${escapeHtml(options.feedbackStatus)}</p>` : ""}
          </details>
        </div>
        ${options.tryAgainStatus ? `<p class="muted feedback__status" data-try-again-status="true">${escapeHtml(options.tryAgainStatus)}</p>` : ""}
      </section>

      ${debugTrace}
    </article>
  `;
  const profileSettings = renderProfileTuningSection(privateBriefData);
  const activeContent =
    activeView === "profile_settings"
      ? profileSettings
      : weeklyBrief;

  return `
    <section class="shell" aria-labelledby="app-title">
      <header class="masthead masthead--with-session">
        <div class="masthead__nameplate">
          ${renderMoonGlyph(brief)}
          <button
            class="masthead__home"
            type="button"
            data-home-action="this_week"
            aria-label="Show this week's brief"
          >
            <h1 id="app-title">Moon &amp; Table</h1>
          </button>
        </div>

        ${renderAppMenu(activeView)}
      </header>

      ${activeContent}
    </section>
  `;
}

export function renderAppShell(state: AppAuthState): string {
  if (state.status === "loading") {
    return renderLoadingShell();
  }

  if (state.status === "signed_out") {
    return renderSignedOutShell(state.configReady);
  }

  if (state.status === "unauthorized") {
    return renderUnauthorizedShell();
  }

  return renderPrivateDataLoadingShell();
}
