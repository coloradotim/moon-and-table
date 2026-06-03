import { generateWeeklyBrief, type WeeklyBrief } from "../lib/generate-weekly-brief";
import type { AppAuthState } from "../lib/auth";
import {
  BRIEF_FEEDBACK_TYPES,
  type BriefFeedbackType,
} from "../lib/brief-feedback";
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
const capacityModes = ["pause", "low", "steady", "high"];

export type SignedInShellOptions = {
  brief?: WeeklyBrief;
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
  const savingLabel = isSaving ? "Saving " : "";

  return `
    <button
      class="feedback-button${selectedClass}"
      type="button"
      data-feedback-type="${escapeHtml(type)}"
      aria-pressed="${pressedAttribute}"${disabledAttribute}
    >${escapeHtml(`${savingLabel}${feedbackLabels[type]}`)}</button>
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
          <p class="muted" data-profile-tuning-status="true">Saved to this private profile.</p>
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
        <p class="muted">Private settings will appear here after household settings are available.</p>
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

export function renderLoadingShell(): string {
  return `
    <section class="shell shell--centered" aria-labelledby="app-title">
      <header class="masthead">
        <p class="eyebrow">Private weekly ritual brief</p>
        <h1 id="app-title">Moon &amp; Table</h1>
      </header>

      <article class="brief auth-panel" aria-label="Loading auth state">
        <p class="label">Private access</p>
        <p>Checking sign-in state.</p>
      </article>
    </section>
  `;
}

export function renderPrivateDataLoadingShell(): string {
  return `
    <section class="shell shell--centered" aria-labelledby="app-title">
      <header class="masthead">
        <p class="eyebrow">Private weekly ritual brief</p>
        <h1 id="app-title">Moon &amp; Table</h1>
      </header>

      <article class="brief auth-panel" aria-label="Loading private settings">
        <p class="label">Private settings</p>
        <p>Loading private settings for this household.</p>
      </article>
    </section>
  `;
}

export function renderSignedOutShell(configReady: boolean): string {
  const configMessage = configReady
    ? "Sign in to open the private weekly brief."
    : "Firebase is not configured yet. Add local config values in .env.local to enable sign-in.";
  const disabledAttribute = configReady ? "" : " disabled";

  return `
    <section class="shell shell--centered" aria-labelledby="app-title">
      <header class="masthead">
        <p class="eyebrow">Private weekly ritual brief</p>
        <h1 id="app-title">Moon &amp; Table</h1>
      </header>

      <article class="brief auth-panel" aria-label="Private sign-in">
        <p class="label">Private access</p>
        <h2>A quiet place for one household brief.</h2>
        <p>${configMessage}</p>
        <button class="primary-action" type="button" data-auth-action="sign-in"${disabledAttribute}>Sign in with Google</button>
      </article>
    </section>
  `;
}

export function renderUnauthorizedShell(): string {
  return `
    <section class="shell shell--centered" aria-labelledby="app-title">
      <header class="masthead">
        <p class="eyebrow">Private weekly ritual brief</p>
        <h1 id="app-title">Moon &amp; Table</h1>
      </header>

      <article class="brief auth-panel" aria-label="Private access limited">
        <p class="label">Private access</p>
        <h2>This account is not invited yet.</h2>
        <p>Moon &amp; Table is limited to the private household allowlist.</p>
        <button class="primary-action" type="button" data-auth-action="sign-in">Sign in with Google</button>
      </article>
    </section>
  `;
}

export function renderSignedInShell(
  privateBriefData: PrivateBriefData,
  options: SignedInShellOptions = {},
): string {
  const brief = options.brief ?? generateWeeklyBrief(privateBriefData.input);
  const privateDataNote =
    privateBriefData.status === "using_starter_settings"
      ? "Using starter settings until your private settings are ready."
      : "Using your household settings.";
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

  return `
    <section class="shell" aria-labelledby="app-title">
      <header class="masthead masthead--with-session">
        <div>
          <p class="eyebrow">Private weekly ritual brief</p>
          <h1 id="app-title">Moon &amp; Table</h1>
        </div>

        <div class="session">
          <span>Signed in</span>
          <button type="button" data-auth-action="sign-out">Sign out</button>
        </div>
      </header>

      <article class="brief" aria-label="Weekly brief">
        <div class="brief__topline">
          <span>${escapeHtml(brief.dateRange)}</span>
          <span>${escapeHtml(brief.trace.capacityMode)} capacity</span>
        </div>

        <p class="private-note">${escapeHtml(privateDataNote)}</p>

        <section class="brief__section">
          <p class="label">Theme</p>
          <h2>${escapeHtml(brief.theme)}</h2>
        </section>

        <section class="brief__grid" aria-label="Brief details">
          <div class="detail">
            <p class="label">Best window</p>
            <p>${escapeHtml(brief.bestWindow)}</p>
          </div>

          <div class="detail" data-testid="recommended-ritual">
            <p class="label">This week's ritual</p>
            <p>${escapeHtml(brief.recommendedRitual)}</p>
          </div>

          <div class="detail">
            <p class="label">Optional add-on</p>
            <p>${escapeHtml(brief.optionalAddOn)}</p>
          </div>
        </section>

        <section class="feedback" aria-label="Brief feedback">
          <p class="label">How was this?</p>
          <div class="feedback__chips">
            ${BRIEF_FEEDBACK_TYPES.filter((type) => type !== "try_again").map((type) => renderFeedbackButton(type, options)).join("")}
          </div>
          <button
            class="primary-action feedback-button${options.selectedFeedbackType === "try_again" || options.savingFeedbackType === "try_again" ? " feedback-button--selected" : ""}"
            type="button"
            data-feedback-type="try_again"
            data-try-again-action="true"
            aria-pressed="${options.selectedFeedbackType === "try_again" || options.savingFeedbackType === "try_again" ? "true" : "false"}"${options.savingFeedbackType ? " disabled" : ""}
          >${escapeHtml(options.savingFeedbackType === "try_again" ? "Saving try again" : feedbackLabels.try_again)}</button>
          <p class="muted feedback__status" data-feedback-status="true">${escapeHtml(options.tryAgainStatus ?? options.feedbackStatus ?? "Feedback saves to your private profile.")}</p>
        </section>

        <details class="why-this" aria-label="Why this">
          <summary>Why this?</summary>
          <p>${escapeHtml(brief.whyThis)}</p>
          <p class="muted">${escapeHtml(brief.sourceSummary)}</p>
        </details>

        <section class="brief__section">
          <p class="label">Reflection prompt</p>
          <p class="prompt">${escapeHtml(brief.reflectionPrompt)}</p>
        </section>

        ${debugTrace}
      </article>

      ${renderProfileTuningSection(privateBriefData)}
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
