import { type CapacityMode } from "../lib/generate-weekly-brief";
import { MoonPhase } from "astronomy-engine";
import {
  audienceOptions,
  carrierOptions,
  energyCapacityOptions,
  getRefinementGroupForPurpose,
  purposeOptions,
  timeScopeOptions,
  type RitualCheckInDraft,
  type RitualCheckInEnergyCapacity,
  type RitualCheckInTimeScope,
} from "../lib/current-ritual-check-in";
import type { AppAuthState } from "../lib/auth";
import {
  getMoonPhaseGlyphLabelForAngle,
  getMoonPhaseGlyphSvgForAngle,
  getNextMoonPhaseMilestoneForAngle,
} from "../lib/moon-phase-glyph";
import type { PrivateBriefData } from "../lib/private-data";
import {
  createTodaysShapeBrief,
  type TodaysShapeBrief,
} from "../lib/todays-shape-brief";
import {
  PROFILE_TUNING_ASTROLOGY_VISIBILITY,
  type ProfileTuningProfile,
  type ProfileTuningSettings,
} from "../lib/profile-tuning";
import { staticRitualRepository } from "../data/rituals/ritual-repository";
import {
  createManageRitualsViewModel,
  defaultManageRitualFilters,
  MANAGE_RITUAL_AVAILABILITY_FILTERS,
  MANAGE_RITUAL_ORIGIN_FILTERS,
  MANAGE_RITUAL_READINESS_FILTERS,
  MANAGE_RITUAL_VALIDATION_FILTERS,
  type ManageRitualAvailabilityFilter,
  type ManageRitualFilters,
  type ManageRitualOriginFilter,
  type ManageRitualReadinessFilter,
  type ManageRitualSortKey,
  type ManageRitualStatusFilter,
  type ManageRitualValidationFilter,
} from "../data/rituals/manage-rituals";
import {
  getRitualAudienceOptions,
  getRitualCapacityOptions,
  getRitualCarrierOptions,
  getRitualPurposeOptions,
  getRitualSourceLabels,
  getRitualSourceOptions,
  getRitualTimingSearchTarget,
  getRitualTimingSearchMatch,
  ritualTimingPresetOptions,
  searchRituals,
  type RitualTimingFilter,
  type RitualSortKey,
} from "../data/rituals/search-rituals";
import type { ChooseWithMeResult } from "../data/rituals/choose-with-me-selector";
import type {
  RitualFavorite,
  RitualFavoriteSourceSurface,
  RitualFeedbackReason,
} from "../data/rituals/household-state";
import { RITUAL_STATUSES, type Ritual } from "../data/rituals/types";
import type { TimingWindowCandidate } from "../lib/timing-window-candidates";

const capacityModes: CapacityMode[] = ["pause", "low", "steady", "high"];
const profileCapacityLabels: Record<CapacityMode, string> = {
  pause: "Barely any",
  low: "A little",
  steady: "Enough to engage",
  high: "Room for something deeper",
};
const ritualSizeChoices = ["five", "ten", "twenty", "thirty", "custom"] as const;
const ritualSizeLabels: Record<(typeof ritualSizeChoices)[number], string> = {
  five: "Five minutes or less",
  ten: "About ten minutes",
  twenty: "About twenty minutes",
  thirty: "About half an hour",
  custom: "Custom",
};
const astrologyVisibilityLabels: Record<string, string> = {
  subtle: "Subtle",
  balanced: "Balanced",
  explicit: "Explicit",
};
const profileWorksOptions = [
  { value: "home_tending", label: "Home" },
  { value: "kitchen", label: "Kitchen" },
  { value: "plant_tending", label: "Plant" },
  { value: "candle_or_light", label: "Candle or light" },
  { value: "reflection", label: "Reflection" },
  { value: "seasonal", label: "Seasonal" },
];

const ritualCapacityFilterLabels: Record<string, string> = {
  only_a_little: "Only a little",
  enough_to_participate: "Enough to participate",
  room_for_something_deeper: "Room for something deeper",
};

const ritualAudienceFilterLabels: Record<string, string> = {
  me: "Me",
  both_of_us: "Both of us",
};

export type SignedInView =
  | "this_week"
  | "search_rituals"
  | "manage_rituals"
  | "profile_settings"
  | "how_it_works";

export type RitualSearchSort = RitualSortKey;

export type SignedInShellOptions = {
  activeView?: SignedInView;
  chooseWithMeResult?: ChooseWithMeResult;
  activeProfileSettingsTabId?: string | null;
  ritualSearchQuery?: string;
  selectedRitualSearchChips?: string[];
  selectedRitualId?: string | null;
  ritualSearchSort?: RitualSearchSort;
  ritualSearchSource?: string;
  ritualSearchPurpose?: string;
  ritualSearchCarrier?: string;
  ritualSearchCapacity?: string;
  ritualSearchAudience?: string;
  ritualSearchTiming?: RitualTimingFilter;
  ritualSearchFavoritesOnly?: boolean;
  ritualFavorites?: RitualFavorite[];
  chooseWithMeRecommendationInstanceId?: string;
  chooseWithMeInteractionStatus?: string;
  currentTimingWindow?: TimingWindowCandidate;
  manageRitualFilters?: Partial<ManageRitualFilters>;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getFirstName(value: string | null | undefined): string {
  const firstName = value?.trim().split(/\s+/)[0];

  return firstName && firstName.length > 0 ? firstName : "there";
}

function renderMoonGlyph(
  currentDate: Date | string = new Date(),
  timezone = "UTC",
): string {
  const phaseDate = currentDate instanceof Date ? currentDate : new Date(currentDate);
  const resolvedPhaseDate = Number.isNaN(phaseDate.getTime())
    ? new Date()
    : phaseDate;
  const phaseAngle = MoonPhase(resolvedPhaseDate);
  const currentPhase = getMoonPhaseGlyphLabelForAngle(phaseAngle);
  const nextMilestone = getNextMoonPhaseMilestoneForAngle(phaseAngle, resolvedPhaseDate);
  const nextMilestoneDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: timezone,
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

function renderChoiceOptions(
  name: "preferredRitualStyles",
  selectedValues: string[],
  options: Array<{ value: string; label: string; description?: string }>,
): string {
  const selectedValueSet = new Set(selectedValues);

  return options
    .map((option) => {
      const checkedAttribute = selectedValueSet.has(option.value) ? " checked" : "";

      return `
        <label class="profile-option">
          <input
            type="checkbox"
            name="${name}"
            value="${escapeHtml(option.value)}"${checkedAttribute}
          />
          <span>
            <strong>${escapeHtml(option.label)}</strong>
            ${option.description ? `<small>${escapeHtml(option.description)}</small>` : ""}
          </span>
        </label>
      `;
    })
    .join("");
}

function getRitualSizeChoice(minutes: number): (typeof ritualSizeChoices)[number] {
  if (minutes <= 5) {
    return "five";
  }

  if (minutes <= 10) {
    return "ten";
  }

  if (minutes <= 20) {
    return "twenty";
  }

  if (minutes <= 30) {
    return "thirty";
  }

  return "custom";
}

function renderRitualSizeControls(minutes: number): string {
  const selectedChoice = getRitualSizeChoice(minutes);
  const customHiddenAttribute = selectedChoice === "custom" ? "" : " hidden";

  return `
    <label>
      <span>Maximum ritual size</span>
      <select name="ritualSizeChoice">
        ${renderSelectOptions(ritualSizeChoices, selectedChoice, ritualSizeLabels)}
      </select>
    </label>

    <label class="custom-duration-field"${customHiddenAttribute}>
      <span>Custom minutes</span>
      <input
        name="maxRitualDurationMinutes"
        type="number"
        min="0"
        max="30"
        step="1"
        value="${minutes}"
      />
    </label>
  `;
}

function formatProfileAstrologyLabel(value: string): string {
  return value
    .split("_")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function renderAstrologyProfileContext(settings: ProfileTuningSettings): string {
  const placements = settings.natalProfile?.placements ?? [];

  if (placements.length === 0) {
    return "";
  }

  return `
    <details class="profile-chart-context">
      <summary>View chart context</summary>
      <ul>
        ${placements
          .map((placement) => {
            const degree =
              typeof placement.degree === "number"
                ? `, ${placement.degree.toFixed(1).replace(/\\.0$/, "")} degrees`
                : "";

            return `
              <li>
                <strong>${escapeHtml(formatProfileAstrologyLabel(placement.bodyOrPoint))}</strong>
                <span>${escapeHtml(`in ${formatProfileAstrologyLabel(placement.sign)}${degree}`)}</span>
              </li>
            `;
          })
          .join("")}
      </ul>
    </details>
  `;
}

function renderProfileSettingsForm(profile: ProfileTuningProfile): string {
  const settings = profile.settings;

  return `
    <form
      class="tuning-form profile-settings-form"
      data-profile-tuning-form="true"
      data-profile-tuning-id="${escapeHtml(profile.id)}"
    >
      <section class="profile-settings-block">
        <div class="tuning-grid">
          <label>
            <span>Usual energy</span>
            <select name="defaultCapacityMode">
              ${renderSelectOptions(capacityModes, settings.defaultCapacityMode, profileCapacityLabels)}
            </select>
          </label>

          ${renderRitualSizeControls(settings.maxRitualDurationMinutes)}

          <label>
            <span>Astrology visibility</span>
            <select name="astrologyVisibility">
              ${renderSelectOptions(PROFILE_TUNING_ASTROLOGY_VISIBILITY, settings.astrologyVisibility, astrologyVisibilityLabels)}
            </select>
            ${renderAstrologyProfileContext(settings)}
          </label>
        </div>
      </section>

      <section class="profile-settings-block">
        <h3>Long-term fit</h3>
        <fieldset>
          <legend>What kinds of practices usually fit?</legend>
          <div class="profile-option-list">
            ${renderChoiceOptions("preferredRitualStyles", settings.preferredRitualStyles, profileWorksOptions)}
          </div>
        </fieldset>
      </section>

      <div class="tuning-actions">
        <button class="primary-action" type="submit">${escapeHtml(`Save ${profile.label}'s settings`)}</button>
        <p class="muted" data-profile-tuning-status="true" aria-live="polite"></p>
      </div>
    </form>
  `;
}

function renderProfileSettingsPanel(profile: ProfileTuningProfile): string {
  return `
    <article class="profile-settings-panel" data-profile-settings-panel="${escapeHtml(profile.id)}">
      ${renderProfileSettingsForm(profile)}
    </article>
  `;
}

function formatRitualLabel(value: string): string {
  return value
    .split("_")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function getRitualSearchSummary(ritual: Ritual): string {
  return ritual.presentation.intention || ritual.presentation.questionToCarry;
}

function formatTimingRelationshipLabel(
  relationship: Exclude<
    Ritual["recommendationMetadata"]["timing"]["relationship"],
    "none"
  >,
): string {
  if (relationship === "required") {
    return "Timing required";
  }

  if (relationship === "preferred") {
    return "Timing preferred";
  }

  return "Timing helpful";
}

function getTimingWindowTimezone(timingWindow: TimingWindowCandidate): string {
  return timingWindow.timingFacts.find((fact) => fact.timezone)?.timezone ?? "UTC";
}

function formatTimingWindowDay(timingWindow: TimingWindowCandidate): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: getTimingWindowTimezone(timingWindow),
  }).format(new Date(timingWindow.startsAtIso));
}

export function renderRitualPreview(
  ritual: Ritual,
  options: {
    showWhyThisFits?: boolean;
    favoriteControl?: {
      favorites?: readonly RitualFavorite[];
      sourceSurface: RitualFavoriteSourceSurface;
      recommendationInstanceId?: string;
    };
  } = {},
): string {
  const showWhyThisFits = options.showWhyThisFits ?? true;
  const sourceLabel = getRitualSourceLabels(ritual)[0] ?? "none";

  return `
    <article class="ritual-preview" aria-label="${escapeHtml(ritual.presentation.headline)}">
      <div class="ritual-preview__header">
        <div>
          <h2>${escapeHtml(ritual.presentation.headline)}</h2>
          <p class="ritual-preview__intention">${escapeHtml(ritual.presentation.intention)}</p>
        </div>
        ${options.favoriteControl
          ? renderRitualFavoriteButton({
              ritual,
              favorites: options.favoriteControl.favorites,
              sourceSurface: options.favoriteControl.sourceSurface,
              recommendationInstanceId:
                options.favoriteControl.recommendationInstanceId,
            })
          : ""}
      </div>

      <section class="ritual-preview__section" aria-label="Practice">
        <p class="brief__section-label">Practice</p>
        <p>${escapeHtml(ritual.presentation.practice)}</p>
      </section>

      <section class="ritual-preview__section" aria-label="Best window">
        <p class="brief__section-label">Best window</p>
        <p>${escapeHtml(ritual.presentation.bestWindow)}</p>
      </section>

      ${showWhyThisFits
        ? `
          <section class="ritual-preview__section" aria-label="Why this fits">
            <p class="brief__section-label">Why this fits</p>
            <p>${escapeHtml(ritual.presentation.whyThisFits)}</p>
          </section>
        `
        : ""}

      <section class="ritual-preview__section" aria-label="Question to carry">
        <p class="brief__section-label">Question to carry</p>
        <p>${escapeHtml(ritual.presentation.questionToCarry)}</p>
      </section>

      <details class="ritual-readiness-details" aria-label="Readiness and source details">
        <summary>Readiness and source details</summary>
        <dl>
          <div>
            <dt>Status</dt>
            <dd>${escapeHtml(ritual.status)}</dd>
          </div>
          <div>
            <dt>Findable</dt>
            <dd>${ritual.availability.findable ? "yes" : "no"}</dd>
          </div>
          <div>
            <dt>Direct-use eligible</dt>
            <dd>${ritual.availability.directUseEligible ? "yes" : "no"}</dd>
          </div>
          <div>
            <dt>Recommendation eligible</dt>
            <dd>${ritual.availability.recommendationEligible ? "yes" : "no"}</dd>
          </div>
          <div>
            <dt>Missing readiness</dt>
            <dd>${escapeHtml(ritual.recommendationMetadata.eligibility.missing?.join(", ") || "none")}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>${escapeHtml(ritual.origin.type)}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>${escapeHtml(sourceLabel)}</dd>
          </div>
        </dl>
      </details>
    </article>
  `;
}

function renderChooseWithMeDebug(result: ChooseWithMeResult): string {
  return `
    <details class="choose-result__debug" aria-label="Recommendation debug">
      <summary>Recommendation debug</summary>
      <dl>
        <div>
          <dt>Status</dt>
          <dd>${escapeHtml(result.status)}</dd>
        </div>
        <div>
          <dt>Eligible</dt>
          <dd>${result.debug.eligibleCount}</dd>
        </div>
        <div>
          <dt>Excluded</dt>
          <dd>${result.debug.excludedCount}</dd>
        </div>
        <div>
          <dt>Selected</dt>
          <dd>${escapeHtml(result.debug.selectedRitualId ?? "none")}</dd>
        </div>
      </dl>
      <pre>${escapeHtml(JSON.stringify(result.debug, null, 2))}</pre>
    </details>
  `;
}

const chooseWithMeFeedbackReasons: Array<{
  label: string;
  value: RitualFeedbackReason;
}> = [
  { label: "More like this", value: "more_like_this" },
  { label: "Wrong purpose", value: "wrong_purpose" },
  { label: "Wrong carrier", value: "wrong_carrier" },
  { label: "Wrong timing", value: "wrong_timing" },
  { label: "Too much", value: "too_much" },
  { label: "Too small", value: "too_small" },
  { label: "Not for me/us tonight", value: "not_tonight" },
  { label: "Too generic", value: "too_generic" },
  { label: "Not magical enough", value: "not_magical_enough" },
  { label: "Wording felt off", value: "wording_felt_off" },
  { label: "Wanted more body/bedroom", value: "wanted_more_body_or_bedroom" },
  { label: "Wanted less body/bedroom", value: "wanted_less_body_or_bedroom" },
  { label: "Never recommend this", value: "never_recommend_this" },
];

function renderChooseWithMeFeedbackReasonChip(reason: {
  label: string;
  value: RitualFeedbackReason;
}): string {
  return `
    <label class="choice-pill choose-result__feedback-chip">
      <input
        type="checkbox"
        name="ritualFeedbackReason"
        value="${escapeHtml(reason.value)}"
      />
      <span>${escapeHtml(reason.label)}</span>
    </label>
  `;
}

function renderChooseWithMeActions(
  result: Extract<ChooseWithMeResult, { status: "selected" }>,
  options: {
    favorites?: readonly RitualFavorite[];
    recommendationInstanceId?: string;
    interactionStatus?: string;
  },
): string {
  const recommendationInstanceAttribute = options.recommendationInstanceId
    ? `data-recommendation-instance-id="${escapeHtml(options.recommendationInstanceId)}"`
    : "";

  return `
    <section class="brief__actions choose-result__actions" aria-label="Ritual actions">
      <div class="brief__closing-actions">
        <p class="brief__actions-question">How does this feel to you?</p>
        <div class="choose-result__primary-actions">
          <button
            class="quiet-action"
            type="button"
            data-ritual-feedback-fit="fit"
            data-ritual-id="${escapeHtml(result.selectedRitual.id)}"
            ${recommendationInstanceAttribute}
          >This feels right.</button>
          <button
            class="quiet-action"
            type="button"
            data-ritual-try-another="true"
            data-ritual-id="${escapeHtml(result.selectedRitual.id)}"
            ${recommendationInstanceAttribute}
          >Give me another option</button>
          <button
            class="quiet-action"
            type="button"
            data-check-in-start-over="true"
          >I want to check in again</button>
        </div>
        <div class="choose-result__secondary-actions">
          ${renderRitualFavoriteButton({
            ritual: result.selectedRitual,
            favorites: options.favorites,
            sourceSurface: "choose_with_me",
            recommendationInstanceId: options.recommendationInstanceId,
            variant: "quiet",
          })}
          <details class="choose-result__feedback" aria-label="Feedback">
            <summary>Give feedback</summary>
            <form
              class="choose-result__feedback-form"
              data-ritual-feedback-form="feedback"
              data-ritual-id="${escapeHtml(result.selectedRitual.id)}"
              ${recommendationInstanceAttribute}
            >
              <div class="choose-result__feedback-chips">
                ${chooseWithMeFeedbackReasons
                  .map(renderChooseWithMeFeedbackReasonChip)
                  .join("")}
              </div>
              <label class="choose-result__feedback-note">
                <span>Optional note</span>
                <textarea name="ritualFeedbackNote" rows="2"></textarea>
              </label>
              <button class="secondary-action" type="submit">Save feedback</button>
            </form>
          </details>
        </div>
        ${options.interactionStatus
          ? `<p class="muted feedback__status" data-ritual-interaction-status="true">${escapeHtml(options.interactionStatus)}</p>`
          : ""}
      </div>
    </section>
  `;
}

function renderChooseWithMeResult(
  result: ChooseWithMeResult,
  options: {
    favorites?: readonly RitualFavorite[];
    recommendationInstanceId?: string;
    interactionStatus?: string;
  } = {},
): string {
  if (result.status === "no_result") {
    return `
      <article class="choose-result choose-result--empty" aria-label="Chosen ritual">
        <section class="brief__core" aria-label="No recommendation">
          <h2 class="brief__theme">Nothing fit that exact reach.</h2>
          <p>${escapeHtml(result.whyThisFits)}</p>
          <p>${escapeHtml(result.howThisWasChosen)}</p>
          <button
            class="quiet-action"
            type="button"
            data-check-in-start-over="true"
          >Check in again</button>
        </section>
        ${renderChooseWithMeDebug(result)}
      </article>
    `;
  }

  const ritual = result.selectedRitual;

  return `
    <article class="choose-result" aria-label="Chosen ritual">
      <section class="brief__core choose-result__intro" aria-label="Ritual summary">
        <div class="choose-result__title-row">
          <h2 class="brief__theme">${escapeHtml(ritual.presentation.headline)}</h2>
          ${renderRitualFavoriteButton({
            ritual,
            favorites: options.favorites,
            sourceSurface: "choose_with_me",
            recommendationInstanceId: options.recommendationInstanceId,
            variant: "icon",
          })}
        </div>
        <p class="brief__practice" data-testid="recommended-ritual">${escapeHtml(ritual.presentation.intention)}</p>
      </section>

      <section class="choose-result__body" aria-label="Ritual">
        ${renderRitualPreview(ritual)}
      </section>

      <section class="brief__depth choose-result__reasoning" aria-label="Why this ritual">
        <details class="choose-result__reason" aria-label="Why this fits now">
          <summary>Why this fits</summary>
          <p>${escapeHtml(result.whyThisFits)}</p>
        </details>
        <details class="choose-result__reason" aria-label="How this was chosen">
          <summary>How this was chosen</summary>
          <p>${escapeHtml(result.howThisWasChosen)}</p>
        </details>
      </section>

      ${renderChooseWithMeActions(result, options)}

      ${renderChooseWithMeDebug(result)}
    </article>
  `;
}

function renderRitualResultCard(
  ritual: Ritual,
  selectedRitualId: string,
  options: {
    timingWindow?: TimingWindowCandidate;
    timingFilter?: RitualTimingFilter;
    favorites?: readonly RitualFavorite[];
  } = {},
): string {
  const isSelected = ritual.id === selectedRitualId;
  const materialsAndTags = [
    ...(ritual.searchMetadata.materials ?? []),
    ...ritual.searchMetadata.tags.slice(0, 3),
  ].slice(0, 5);
  const sourceLabel = getRitualSourceLabels(ritual)[0];
  const capacity = ritual.recommendationMetadata.capacity.default ??
    ritual.recommendationMetadata.capacity.supports[0];
  const metadata = [
    sourceLabel ? `Source: ${sourceLabel}` : undefined,
    `Work: ${formatRitualLabel(ritual.recommendationMetadata.purposes.primary)}`,
    `Carrier: ${formatRitualLabel(ritual.recommendationMetadata.carriers.primary)}`,
    capacity ? `Energy: ${formatRitualLabel(capacity)}` : undefined,
    ritual.recommendationMetadata.audience.supports.length > 0
      ? `For: ${ritual.recommendationMetadata.audience.supports.map(formatRitualLabel).join(", ")}`
      : undefined,
  ].filter((item): item is string => Boolean(item));
  const timingMatch =
    options.timingFilter && options.timingFilter !== "all"
      ? getRitualTimingSearchMatch(
          ritual,
          getRitualTimingSearchTarget(
            options.timingFilter,
            options.timingWindow,
          ),
        )
      : null;
  const timingLine =
    timingMatch
      ? [
          `Matches: ${timingMatch.windowLabel}`,
          formatTimingRelationshipLabel(timingMatch.relationship),
          ...(options.timingFilter === "current" && options.timingWindow
            ? [`Best around: ${formatTimingWindowDay(options.timingWindow)}`]
            : []),
        ].join(" · ")
      : "";

  return `
    <details class="ritual-result-card-shell" ${isSelected ? "open" : ""}>
      <summary
        class="ritual-result-card${isSelected ? " ritual-result-card--selected" : ""}"
        data-ritual-select="${escapeHtml(ritual.id)}"
        aria-current="${isSelected ? "true" : "false"}"
      >
        <span class="ritual-result-card__title-row">
          <strong>${escapeHtml(ritual.presentation.headline)}</strong>
          ${renderRitualFavoriteButton({
            ritual,
            favorites: options.favorites,
            sourceSurface: "search",
          })}
        </span>
        <span>${escapeHtml(getRitualSearchSummary(ritual))}</span>
        <span class="ritual-result-card__metadata">${escapeHtml(metadata.join(" · "))}</span>
        ${timingLine ? `<span class="ritual-result-card__timing">${escapeHtml(timingLine)}</span>` : ""}
        <span class="ritual-result-card__tags">${escapeHtml(materialsAndTags.join(" · ") || "No materials listed")}</span>
      </summary>
      ${isSelected
        ? `<div class="ritual-result-card__expanded">${renderRitualPreview(
            ritual,
            {
              showWhyThisFits: false,
              favoriteControl: {
                favorites: options.favorites,
                sourceSurface: "search",
              },
            },
          )}</div>`
        : ""}
    </details>
  `;
}

const ritualSearchSortOptions: Array<{ value: RitualSearchSort; label: string }> = [
  { value: "match", label: "Best match" },
  { value: "title", label: "Title" },
  { value: "recently_added", label: "Recently added" },
  { value: "oldest_added", label: "Oldest added" },
  { value: "source", label: "Source" },
  { value: "purpose", label: "Purpose" },
  { value: "carrier", label: "Carrier" },
  { value: "material", label: "Material" },
  { value: "capacity", label: "Capacity" },
];

function renderRitualSearchSortOption(
  value: RitualSearchSort,
  label: string,
  selectedSort: RitualSearchSort,
): string {
  return `<option value="${value}"${selectedSort === value ? " selected" : ""}>${label}</option>`;
}

function renderSelectOption(
  value: string,
  label: string,
  selectedValue: string,
): string {
  return `<option value="${escapeHtml(value)}"${selectedValue === value ? " selected" : ""}>${escapeHtml(label)}</option>`;
}

function getActiveFavoriteIds(favorites: readonly RitualFavorite[] = []): Set<string> {
  return new Set(
    favorites
      .filter((favorite) => favorite.active)
      .map((favorite) => favorite.ritualId),
  );
}

function isRitualFavorited(
  ritualId: string,
  favorites: readonly RitualFavorite[] = [],
): boolean {
  return getActiveFavoriteIds(favorites).has(ritualId);
}

function renderRitualFavoriteButton(options: {
  ritual: Ritual;
  favorites?: readonly RitualFavorite[];
  sourceSurface: RitualFavoriteSourceSurface;
  recommendationInstanceId?: string;
  variant?: "icon" | "quiet" | "text";
}): string {
  const isSaved = isRitualFavorited(options.ritual.id, options.favorites);
  const isIcon = options.variant === "icon" || options.sourceSurface === "search";
  const isQuiet = options.variant === "quiet";
  const label = isIcon
    ? isSaved ? "♥" : "♡"
    : isSaved ? "Saved" : "Save favorite";
  const ariaLabel = isSaved
    ? `Remove ${options.ritual.presentation.headline} from favorites`
    : `Save ${options.ritual.presentation.headline} as favorite`;

  return `
    <button
      class="${isQuiet
        ? "quiet-action ritual-favorite-button--quiet"
        : `ritual-favorite-button${isIcon ? " ritual-favorite-button--icon" : ""}${isSaved ? " ritual-favorite-button--saved" : ""}`}"
      type="button"
      data-ritual-favorite-toggle="${escapeHtml(options.ritual.id)}"
      data-ritual-favorite-source="${escapeHtml(options.sourceSurface)}"
      data-ritual-favorite-state="${isSaved ? "saved" : "unsaved"}"
      ${options.recommendationInstanceId
        ? `data-recommendation-instance-id="${escapeHtml(options.recommendationInstanceId)}"`
        : ""}
      aria-pressed="${isSaved ? "true" : "false"}"
      aria-label="${escapeHtml(ariaLabel)}"
      title="${escapeHtml(isSaved ? "Saved" : "Save favorite")}"
    >${label}</button>
  `;
}

export function renderSearchRitualsSection(options: {
  query?: string;
  selectedChips?: string[];
  selectedRitualId?: string | null;
  sort?: RitualSearchSort;
  source?: string;
  purpose?: string;
  carrier?: string;
  capacity?: string;
  audience?: string;
  timing?: RitualTimingFilter;
  favoritesOnly?: boolean;
  favorites?: RitualFavorite[];
  currentTimingWindow?: TimingWindowCandidate;
} = {}): string {
  const query = options.query ?? "";
  const selectedChips = options.selectedChips ?? [];
  const selectedSort = options.sort ?? "match";
  const selectedSource = options.source ?? "all";
  const selectedPurpose = options.purpose ?? "all";
  const selectedCarrier = options.carrier ?? "all";
  const selectedCapacity = options.capacity ?? "all";
  const selectedAudience = options.audience ?? "all";
  const selectedTiming = options.timing === "current" && !options.currentTimingWindow
    ? "all"
    : options.timing ?? "all";
  const favorites = options.favorites ?? [];
  const activeFavoriteIds = getActiveFavoriteIds(favorites);
  const favoritesOnly = options.favoritesOnly ?? false;
  const searchRitualLibrary =
    staticRitualRepository.getFindableDirectUseRitualsForSearch();
  const sourceOptions = getRitualSourceOptions(searchRitualLibrary);
  const purposeOptions = getRitualPurposeOptions(searchRitualLibrary);
  const carrierOptions = getRitualCarrierOptions(searchRitualLibrary);
  const capacityOptions = getRitualCapacityOptions(searchRitualLibrary);
  const audienceOptions = getRitualAudienceOptions(searchRitualLibrary);
  const searchedResults = searchRituals(searchRitualLibrary, {
    query,
    selectedChips,
    source: selectedSource,
    purpose: selectedPurpose,
    carrier: selectedCarrier,
    capacity: selectedCapacity,
    audience: selectedAudience,
    sort: selectedSort,
    timingFilter: selectedTiming,
    timingWindow: options.currentTimingWindow,
  });
  const results = favoritesOnly
    ? searchedResults.filter((ritual) => activeFavoriteIds.has(ritual.id))
    : searchedResults;
  const hasSearchCriteria =
    query.trim().length > 0 ||
    selectedChips.length > 0 ||
    selectedSource !== "all" ||
    selectedPurpose !== "all" ||
    selectedCarrier !== "all" ||
    selectedCapacity !== "all" ||
    selectedAudience !== "all" ||
    selectedTiming !== "all" ||
    favoritesOnly;
  const activeRefinementCount = [
    selectedSource !== "all",
    selectedPurpose !== "all",
    selectedCarrier !== "all",
    selectedCapacity !== "all",
    selectedAudience !== "all",
    selectedTiming !== "all",
  ].filter(Boolean).length;
  const selectedRitual =
    results.find((ritual) => ritual.id === options.selectedRitualId) ??
    results[0];

  return `
    <article class="ritual-search" aria-label="Search rituals">
      <header class="ritual-search__header">
        <button
          class="check-in__back"
          type="button"
          data-ritual-search-back="true"
        >&larr; Go back</button>
        <h2>Search rituals</h2>
        <p>Search by material, mood, purpose, place, or phrase.</p>
      </header>

      <form id="ritual-search-form" class="ritual-search__controls" data-ritual-search-form="true">
        <div class="ritual-search__field">
          <label>
            <span>What are you looking for?</span>
            <input
              name="ritualSearchQuery"
              type="search"
              value="${escapeHtml(query)}"
              autocomplete="off"
              placeholder="seed, bread, lamp, opening..."
            />
          </label>
        </div>
        <div class="ritual-search__filter-bar" aria-label="Refine search results">
          <details class="ritual-search__filter-menu"${activeRefinementCount > 0 ? " open" : ""}>
            <summary>${activeRefinementCount > 0
              ? `Filters (${activeRefinementCount})`
              : "Filters"}</summary>
            <div class="ritual-search__filters-row" aria-label="Search filters">
              <label class="ritual-search__select">
                <span>Source</span>
                <select
                  name="ritualSearchSource"
                  form="ritual-search-form"
                  data-ritual-search-source="true"
                >
                  ${renderSelectOption("all", "All sources", selectedSource)}
                  ${sourceOptions.map((option) =>
                    renderSelectOption(option.value, option.label, selectedSource),
                  ).join("")}
                </select>
              </label>
              <label class="ritual-search__select">
                <span>Purpose</span>
                <select
                  name="ritualSearchPurpose"
                  form="ritual-search-form"
                  data-ritual-search-purpose="true"
                >
                  ${renderSelectOption("all", "All purposes", selectedPurpose)}
                  ${purposeOptions.map((option) =>
                    renderSelectOption(option.value, formatRitualLabel(option.label), selectedPurpose),
                  ).join("")}
                </select>
              </label>
              <label class="ritual-search__select">
                <span>Carrier</span>
                <select
                  name="ritualSearchCarrier"
                  form="ritual-search-form"
                  data-ritual-search-carrier="true"
                >
                  ${renderSelectOption("all", "All carriers", selectedCarrier)}
                  ${carrierOptions.map((option) =>
                    renderSelectOption(option.value, formatRitualLabel(option.label), selectedCarrier),
                  ).join("")}
                </select>
              </label>
              <label class="ritual-search__select">
                <span>Energy</span>
                <select
                  name="ritualSearchCapacity"
                  form="ritual-search-form"
                  data-ritual-search-capacity="true"
                >
                  ${renderSelectOption("all", "Any energy", selectedCapacity)}
                  ${capacityOptions.map((option) =>
                    renderSelectOption(
                      option.value,
                      ritualCapacityFilterLabels[option.label] ?? formatRitualLabel(option.label),
                      selectedCapacity,
                    ),
                  ).join("")}
                </select>
              </label>
              <label class="ritual-search__select">
                <span>For</span>
                <select
                  name="ritualSearchAudience"
                  form="ritual-search-form"
                  data-ritual-search-audience="true"
                >
                  ${renderSelectOption("all", "Anyone", selectedAudience)}
                  ${audienceOptions.map((option) =>
                    renderSelectOption(
                      option.value,
                      ritualAudienceFilterLabels[option.label] ?? formatRitualLabel(option.label),
                      selectedAudience,
                    ),
                  ).join("")}
                </select>
              </label>
              <label class="ritual-search__select">
                <span>Timing</span>
                <select
                  name="ritualSearchTiming"
                  form="ritual-search-form"
                  data-ritual-search-timing="true"
                >
                  ${renderSelectOption("all", "Any timing", selectedTiming)}
                  ${options.currentTimingWindow
                    ? renderSelectOption("current", "This timing window", selectedTiming)
                    : ""}
                  ${ritualTimingPresetOptions.map((option) =>
                    renderSelectOption(option.value, option.label, selectedTiming),
                  ).join("")}
                </select>
              </label>
            </div>
          </details>
          <label class="ritual-search__sort-control">
            <span>Sort</span>
            <select
              name="ritualSearchSort"
              form="ritual-search-form"
              data-ritual-search-sort="true"
            >
              ${ritualSearchSortOptions.map((option) =>
                renderRitualSearchSortOption(option.value, option.label, selectedSort),
              ).join("")}
            </select>
          </label>
          <label class="ritual-search__favorite-chip">
            <input
              name="ritualSearchFavoritesOnly"
              type="checkbox"
              data-ritual-search-favorites-only="true"
              ${favoritesOnly ? "checked" : ""}
            />
            <span>Favorites only</span>
          </label>
          <div class="ritual-search__clear-slot">
            <button
              class="ritual-search__clear"
              type="button"
              data-ritual-search-clear="true"
            >Clear filters</button>
          </div>
        </div>
      </form>

      <div class="ritual-search__body">
        <section class="ritual-search__results" aria-label="Ritual results">
          <div class="ritual-search__results-header">
            <div>
              <h3>Select a ritual</h3>
              <p>${results.length === 1 ? "1 ritual" : `${results.length} rituals`}${hasSearchCriteria ? " found" : " available"}</p>
            </div>
          </div>
          ${results.length > 0
            ? results.map((ritual) => renderRitualResultCard(
              ritual,
              selectedRitual?.id ?? "",
              {
                timingFilter: selectedTiming,
                timingWindow: options.currentTimingWindow,
                favorites,
              },
            )).join("")
            : `
              <div class="ritual-search__empty" role="status">
                <p>${favoritesOnly
                  ? "No saved favorites matched that exact reach."
                  : "Nothing matched that exact reach."}</p>
                <p>Try one material, purpose, place, or phrase from the ritual you are reaching for.</p>
              </div>
            `}
        </section>

        <section class="ritual-search__preview" aria-label="Selected ritual">
          ${selectedRitual
            ? renderRitualPreview(selectedRitual, {
                showWhyThisFits: false,
                favoriteControl: {
                  favorites,
                  sourceSurface: "search",
                },
              })
            : `
              <div class="ritual-search__preview-empty">
                <p>Selected ritual</p>
                <p>Choose a ritual from the left to see its shape here.</p>
              </div>
            `}
        </section>
      </div>
    </article>
  `;
}

function renderManageRitualFilterOption(
  value: string,
  label: string,
  selectedValue: string,
): string {
  return `<option value="${escapeHtml(value)}"${selectedValue === value ? " selected" : ""}>${escapeHtml(label)}</option>`;
}

function getManageStatusFilterLabel(status: ManageRitualStatusFilter): string {
  if (status === "all") {
    return "All states";
  }

  if (status === "reviewed") {
    return "Reviewed for direct use";
  }

  if (status === "recommendable") {
    return "Recommendation-ready";
  }

  return `${formatRitualLabel(status)} import`;
}

function getManageAvailabilityFilterLabel(
  availability: ManageRitualAvailabilityFilter,
): string {
  const labels: Record<ManageRitualAvailabilityFilter, string> = {
    all: "All use paths",
    findable: "Findable in search",
    direct_use: "Usable directly",
    recommendation_eligible: "Can be recommended",
    recommendable: "Recommendation-ready",
  };

  return labels[availability];
}

function getManageReadinessFilterLabel(
  readiness: ManageRitualReadinessFilter,
): string {
  const labels: Record<ManageRitualReadinessFilter, string> = {
    all: "All work states",
    missing_readiness: "Missing recommendation work",
    review_flags: "Has review flags",
    validation_findings: "Has validation findings",
    recommendation_ready: "No recommendation work missing",
  };

  return labels[readiness];
}

function getManageValidationFilterLabel(
  validation: ManageRitualValidationFilter,
): string {
  const labels: Record<ManageRitualValidationFilter, string> = {
    all: "All validation",
    valid: "No findings",
    findings: "Has findings",
  };

  return labels[validation];
}

function formatManageList(values: string[]): string {
  return values.length > 0 ? values.join(", ") : "none";
}

function renderYesNo(value: boolean): string {
  return value ? "yes" : "no";
}

function renderManageRitualsFilters(
  filters: ManageRitualFilters,
  sourceOptions: Array<{ value: string; label: string }>,
  statusCounts: Record<string, number>,
): string {
  const visibleStatuses = RITUAL_STATUSES.filter(
    (status) => statusCounts[status] > 0 || filters.status === status,
  );
  const visibleReadinessFilters = MANAGE_RITUAL_READINESS_FILTERS.filter(
    (readiness) =>
      readiness !== "recommendation_ready" ||
      filters.readiness === "recommendation_ready",
  );

  return `
    <form class="manage-rituals__filters" data-manage-rituals-filter-form="true" aria-label="Manage Rituals filters">
      <label>
        <span>State</span>
        <select name="manageRitualStatus" data-manage-rituals-filter="true">
          ${renderManageRitualFilterOption("all", getManageStatusFilterLabel("all"), filters.status)}
          ${visibleStatuses.map((status) =>
            renderManageRitualFilterOption(status, getManageStatusFilterLabel(status), filters.status),
          ).join("")}
        </select>
      </label>
      <label>
        <span>Origin</span>
        <select name="manageRitualOrigin" data-manage-rituals-filter="true">
          ${MANAGE_RITUAL_ORIGIN_FILTERS.map((origin) =>
            renderManageRitualFilterOption(
              origin,
              origin === "all" ? "All origins" : formatRitualLabel(origin),
              filters.origin,
            ),
          ).join("")}
        </select>
      </label>
      <label>
        <span>Source</span>
        <select name="manageRitualSource" data-manage-rituals-filter="true" ${filters.origin === "household" ? "disabled" : ""}>
          ${renderManageRitualFilterOption("all", "All sources", filters.source)}
          ${sourceOptions.map((option) =>
            renderManageRitualFilterOption(option.value, option.label, filters.source),
          ).join("")}
        </select>
      </label>
      <label>
        <span>Availability</span>
        <select name="manageRitualAvailability" data-manage-rituals-filter="true">
          ${MANAGE_RITUAL_AVAILABILITY_FILTERS.map((availability) =>
            renderManageRitualFilterOption(
              availability,
              getManageAvailabilityFilterLabel(availability),
              filters.availability,
            ),
          ).join("")}
        </select>
      </label>
      <label>
        <span>Readiness</span>
        <select name="manageRitualReadiness" data-manage-rituals-filter="true">
          ${visibleReadinessFilters.map((readiness) =>
            renderManageRitualFilterOption(
              readiness,
              getManageReadinessFilterLabel(readiness),
              filters.readiness,
            ),
          ).join("")}
        </select>
      </label>
      <label>
        <span>Findings</span>
        <select name="manageRitualValidation" data-manage-rituals-filter="true">
          ${MANAGE_RITUAL_VALIDATION_FILTERS.map((validation) =>
            renderManageRitualFilterOption(
              validation,
              getManageValidationFilterLabel(validation),
              filters.validation,
            ),
          ).join("")}
        </select>
      </label>
      <button
        class="manage-rituals__clear"
        type="button"
        data-manage-rituals-clear="true"
      >Clear filters</button>
    </form>
  `;
}

function getManageAriaSort(
  key: ManageRitualSortKey,
  filters: ManageRitualFilters,
): "none" | "ascending" | "descending" {
  if (filters.sort !== key) {
    return "none";
  }

  return filters.direction === "asc" ? "ascending" : "descending";
}

function renderManageSortHeader(
  key: ManageRitualSortKey,
  label: string,
  filters: ManageRitualFilters,
): string {
  const directionLabel = filters.sort !== key
    ? ""
    : filters.direction === "asc"
      ? " ↑"
      : " ↓";

  return `
    <span role="columnheader" aria-sort="${getManageAriaSort(key, filters)}">
      <button
        class="manage-rituals__sort-button${filters.sort === key ? " manage-rituals__sort-button--active" : ""}"
        type="button"
        data-manage-ritual-sort="${key}"
      >${escapeHtml(label)}<span aria-hidden="true">${directionLabel}</span></button>
    </span>
  `;
}

export function renderManageRitualsSection(options: {
  filters?: Partial<ManageRitualFilters>;
} = {}): string {
  const viewModel = createManageRitualsViewModel(
    staticRitualRepository.getAllRitualsForManager(),
    options.filters,
  );
  const counts = viewModel.counts;
  const statusSummary = [
    `${viewModel.total} imported Ritual${viewModel.total === 1 ? "" : "s"}`,
    `${counts.byStatus.reviewed} reviewed`,
    `${counts.directUseEligible} direct-use eligible`,
    `${counts.recommendable} recommendation-ready`,
    `${counts.withMissingReadiness} missing readiness`,
  ].join(". ");

  return `
    <article class="manage-rituals" aria-label="Manage Rituals">
      <header class="manage-rituals__header">
        <h2>Manage rituals</h2>
        <p>${escapeHtml(statusSummary)}.</p>
      </header>

      <details class="manage-rituals__summary">
        <summary>Readiness summary</summary>
        <dl>
          <div><dt>Statuses</dt><dd>${escapeHtml(`pilot ${counts.byStatus.pilot}, draft ${counts.byStatus.draft}, reviewed ${counts.byStatus.reviewed}, recommendable ${counts.byStatus.recommendable}`)}</dd></div>
          <div><dt>Origins</dt><dd>${escapeHtml(`source ${counts.byOrigin.source}, household ${counts.byOrigin.household}`)}</dd></div>
          <div><dt>Availability</dt><dd>${escapeHtml(`findable ${counts.findable}, direct-use eligible ${counts.directUseEligible}, recommendation eligible ${counts.recommendationEligible}`)}</dd></div>
          <div><dt>Findings</dt><dd>${escapeHtml(`validation findings ${counts.withValidationFindings}, missing readiness ${counts.withMissingReadiness}`)}</dd></div>
        </dl>
      </details>

      ${renderManageRitualsFilters(viewModel.filters, viewModel.sourceOptions, viewModel.counts.byStatus)}

      <section class="manage-rituals__table-section" aria-label="Imported Ritual records">
        <div class="manage-rituals__table-heading">
          <h3>Imported Ritual records</h3>
          <p>${viewModel.filteredTotal === 1 ? "1 Ritual shown" : `${viewModel.filteredTotal} Rituals shown`}</p>
        </div>
        <div class="manage-rituals__records" role="table" aria-label="Imported Ritual records table">
          <div class="manage-rituals__record-head" role="row">
            ${renderManageSortHeader("headline", "Ritual", viewModel.filters)}
            ${renderManageSortHeader("status", "Status", viewModel.filters)}
            ${renderManageSortHeader("origin", "Origin", viewModel.filters)}
            ${renderManageSortHeader("direct_use", "Direct use", viewModel.filters)}
            ${renderManageSortHeader("recommendation", "Recommendation", viewModel.filters)}
            ${renderManageSortHeader("issues", "Findings", viewModel.filters)}
          </div>
          ${viewModel.rows.map((row) => `
            <details class="manage-rituals__record">
              <summary class="manage-rituals__record-summary">
                <span class="manage-rituals__ritual-cell">
                  <span class="manage-rituals__ritual-title">${escapeHtml(row.headline)}</span>
                </span>
                <span class="manage-rituals__record-status">${escapeHtml(row.status)}</span>
                <span class="manage-rituals__record-origin">${escapeHtml(row.origin)}</span>
                <span class="manage-rituals__record-direct-use">${renderYesNo(row.directUseEligible)}</span>
                <span class="manage-rituals__record-recommendation">${row.recommendable ? "ready" : row.recommendationEligible ? "eligible" : "no"}</span>
                <span class="manage-rituals__record-issues">${escapeHtml(formatManageList(row.issues))}</span>
              </summary>
              <div class="manage-rituals__record-detail">
                      <div class="manage-rituals__detail-grid">
                        <section>
                          <h4>Presentation</h4>
                          <dl>
                            <div><dt>Headline</dt><dd>${escapeHtml(row.ritual.presentation.headline)}</dd></div>
                            <div><dt>Practice</dt><dd>${escapeHtml(row.ritual.presentation.practice)}</dd></div>
                            <div><dt>Intention</dt><dd>${escapeHtml(row.ritual.presentation.intention)}</dd></div>
                            <div><dt>Best window</dt><dd>${escapeHtml(row.ritual.presentation.bestWindow)}</dd></div>
                            <div><dt>Question to carry</dt><dd>${escapeHtml(row.ritual.presentation.questionToCarry)}</dd></div>
                          </dl>
                        </section>
                        <section>
                          <h4>Metadata</h4>
                          <dl>
                            <div><dt>Findable</dt><dd>${renderYesNo(row.findable)}</dd></div>
                            <div><dt>Primary purpose</dt><dd>${escapeHtml(row.primaryPurpose)}</dd></div>
                            <div><dt>Primary carrier</dt><dd>${escapeHtml(row.primaryCarrier)}</dd></div>
                            <div><dt>Audience</dt><dd>${escapeHtml(formatManageList(row.audience))}</dd></div>
                            <div><dt>Capacity</dt><dd>${escapeHtml(formatManageList(row.capacity))}</dd></div>
                            <div><dt>Review flags</dt><dd>${escapeHtml(formatManageList(row.reviewFlags))}</dd></div>
                            <div><dt>Source label / origin label</dt><dd>${escapeHtml([row.sourceLabel, row.originLabel].filter(Boolean).join(" / ") || "none")}</dd></div>
                            <div><dt>Recommendation metadata</dt><dd><pre>${escapeHtml(JSON.stringify(row.ritual.recommendationMetadata, null, 2))}</pre></dd></div>
                            <div><dt>Search metadata</dt><dd><pre>${escapeHtml(JSON.stringify(row.ritual.searchMetadata, null, 2))}</pre></dd></div>
                            <div><dt>Origin / source grounding</dt><dd><pre>${escapeHtml(JSON.stringify(row.ritual.origin, null, 2))}</pre></dd></div>
                            <div><dt>Ritual words</dt><dd><pre>${escapeHtml(JSON.stringify(row.ritual.ritualWords ?? null, null, 2))}</pre></dd></div>
                            <div><dt>Review flags</dt><dd><pre>${escapeHtml(JSON.stringify(row.ritual.reviewFlags ?? null, null, 2))}</pre></dd></div>
                            <div><dt>Adaptation policy</dt><dd><pre>${escapeHtml(JSON.stringify(row.ritual.adaptationPolicy ?? null, null, 2))}</pre></dd></div>
                            <div><dt>Validation findings</dt><dd><pre>${escapeHtml(JSON.stringify(row.validationFindings, null, 2))}</pre></dd></div>
                            <div><dt>Missing readiness</dt><dd>${escapeHtml(formatManageList(row.missingReadiness))}</dd></div>
                          </dl>
                        </section>
                      </div>
                      <section class="manage-rituals__raw-object">
                        <h4>Raw full object</h4>
                        <pre>${escapeHtml(JSON.stringify(row.ritual, null, 2))}</pre>
                      </section>
              </div>
            </details>
          `).join("")}
        </div>
      </section>
    </article>
  `;
}

export function renderProfileTuningSection(
  privateBriefData: PrivateBriefData,
  activeTabId?: string | null,
): string {
  const profiles = privateBriefData.tuningProfiles;

  if (profiles.length === 0) {
    return `
      <section class="tuning-panel" aria-label="Profile tuning">
        <div>
          <h2>Profile settings</h2>
        </div>
        <p class="muted">Profile settings will appear here when private profile data is available.</p>
      </section>
    `;
  }

  const tabItems = [
    ...profiles.map((profile) => ({ id: profile.id, label: profile.label })),
  ];
  const selectedTabId = tabItems.some((item) => item.id === activeTabId)
    ? activeTabId
    : tabItems[0]?.id;
  const activeProfile = profiles.find((profile) => profile.id === selectedTabId) ?? profiles[0];
  const activePanel = renderProfileSettingsPanel(activeProfile);

  return `
    <section class="tuning-panel" aria-label="Profile tuning">
      <div>
        <h2>Profile settings</h2>
        <p class="muted">Long-term defaults. The check-in handles what is true right now.</p>
      </div>

      <div class="profile-settings-tabs" role="tablist" aria-label="Profile settings">
        ${tabItems
          .map((item) => {
            const selected = item.id === selectedTabId;

            return `
              <button
                class="profile-settings-tab${selected ? " profile-settings-tab--active" : ""}"
                type="button"
                role="tab"
                aria-selected="${selected ? "true" : "false"}"
                data-profile-settings-tab="${escapeHtml(item.id)}"
              >${escapeHtml(item.label)}</button>
            `;
          })
          .join("")}
      </div>

      ${activePanel}
    </section>
  `;
}

function renderHowItWorksSection(): string {
  return `
    <article class="how-it-works" aria-label="How Moon &amp; Table works">
      <div class="how-it-works__body">
        <h2>How Moon &amp; Table Works</h2>

        <p>My love &mdash; Moon &amp; Table is a tool I made just for us.</p>

        <p>I started building it because I&rsquo;ve been thinking more about us coming together into a shared home, and I want us to have shared rituals for our new space. Until that time, I want a small place where the things you care about &mdash; timing, symbolism, the body, the home, plants, candles, numbers, tarot, the sky &mdash; can meet the way I tend to understand things: structure, systems, computation, order.</p>

        <p>You take these things &mdash; lunar cycles, astrology, numerology, tarot &mdash; seriously. As you know, before we met, I was&hellip; not interested in these things. But since we met, I&rsquo;ve leaned in. We met on 8/8, the day before a full moon. You welcomed me into your home with candle magic. I have leaned in, and I&rsquo;ve enjoyed it. I love seeing what you think and believe, what parts of this you lean into, and what parts you take with a grain of salt. I enjoy the quiet moments of ritual, of card reading, of sharing the same space with intention. I want to understand all of this better so that I can continue to understand you better. So, this app.</p>

        <h3>The basic idea</h3>

        <p>Moon &amp; Table looks at meaningful timings and symbolic patterns and then offers one small ritual for the week.</p>

        <p>I&rsquo;ve asked you to do more magic with me, but I&rsquo;ve realized that ask then puts more on you. You have to do research to figure out what&rsquo;s going on from a timing perspective&ndash; lunar phases, planetary motion, numerology, etc&ndash; translate that into meaning, and then find a ritual or some magic that meets the moment. That&rsquo;s a big ask! I realized, then, that I have the skills to help with this.</p>

        <p>So, Moon &amp; Table doesn&rsquo;t give us lots of options or possibilities to choose from. The point is for it to choose one practice with enough care that it feels like it belongs in our lives and to the week. If we don&rsquo;t like what&rsquo;s offered, we can ask it to try again, we can give it feedback on how it did, and hopefully we&rsquo;ll make it work better for us as we go.</p>

        <h3>What happens under the hood</h3>

        <p>Moon &amp; Table has three separate jobs: calculate facts, interpret meaning, and choose an action.</p>

        <p>The first job is computation. The app calculates timing facts for the current date or for the next several days: lunar phase, lunations, moon sign, sun sign, seasonal markers, planetary signs, retrogrades, major aspects, and numerology values. This part of the app is very solid and is a great foundation to build the rest on. Down the road we could have it surface interesting timings, contacts, etc that I&rsquo;m not using today. Something to think on. The timing layer also includes our natal charts, and hopefully it will use those smartly and well. This is obviously an area I know little about and we&rsquo;ll need to keep an eye on.</p>

        <p>The second job is interpretation. A timing fact becomes useful only if there is an approved symbolic rule or card that knows what to do with it. &ldquo;Full moon&rdquo; is a calculated fact. &ldquo;This may be a moment to notice what has become visible&rdquo; is interpretation. &ldquo;Tend one plant&rdquo; is a ritual action. Those are three different layers, and I want the app to keep them separate. This part of the app has been interesting to build. It&rsquo;s a lot of finding open source / online resources like Carmina Gadelica, The Folk-lore of Plants, Culpeper&rsquo;s Complete Herbal and English Physician, Current Superstitions: Collected from the Oral Tradition of English Speaking Folk&hellip; fun! And then, of course, using my AI friends to cull and organize from them. This is an easy part of the app to continue to expand or to choose different sources if we find we don&rsquo;t love some of them.</p>

        <p>The third job is selection. Once the app has timing facts and possible symbolic signals, it looks for approved ritual patterns that match the moment. Then it weighs those patterns against current context: energy and capacity, whether the ritual is for one person or both of us, what kind of practice feels welcome, what the ritual should focus on, our private profile context, and feedback from past recommendations. It does not try to display everything it knows. It chooses a small number of signals and one ritual that actually fits. This part of the app is currently a little too black box for me, though it does expose the scoring algorithm and explains why and how it chose certain things. This should be easy to tweak, though, if we feel the recommendations are off.</p>

        <h3>The check-in flow</h3>

        <p>I realized that a recommendation is only useful if it fits our current state of being. Thus, Moon &amp; Table asks a few questions before choosing. First, it asks whether we want something for today or whether it should look for the best moment this week. If we choose today, it works with current timing. If we choose the best moment this week, it looks ahead for meaningful timing windows. If it doesn&rsquo;t find any when the calculations happen and the recommendations are presented, it says so!</p>

        <p>Then it asks how much energy or capacity we have:</p>

        <ul>
          <li><strong>Barely any</strong> means the ritual should be almost weightless: a pause, a noticing, or one tiny act.</li>
          <li><strong>A little</strong> means five minutes or less.</li>
          <li><strong>Enough to engage</strong> means there is room for a simple ritual with some attention.</li>
          <li><strong>Room for something deeper</strong> means there may be space for more time, reflection, conversation, or ritual shape.</li>
        </ul>

        <p>If there is very little capacity, the app doesn&rsquo;t keep asking questions, but chooses something small. If there is more capacity, it can ask whether the ritual is for one of us or both of us, what kind of practice feels welcome, and what the ritual should focus on.</p>

        <h3>To Us</h3>

        <p>Underneath the implementation details, the point is simple. I want us to have shared rituals for the life we are building. I want something we can use while we are apart, and something that can help us come together when we are in the same home. I want a small place where the things you care about and the things I know how to build can meet.</p>

        <p>One small ritual, for us, built with love and chosen with care.</p>

        <p>I love you.</p>
      </div>

      <div class="how-it-works__actions">
        <button class="secondary-action" type="button" data-home-action="this_week">Back to this week</button>
      </div>
    </article>
  `;
}

function renderAppMenu(activeView: SignedInView): string {
  const thisWeekPressed = activeView === "this_week" ? "true" : "false";
  const searchRitualsPressed =
    activeView === "search_rituals" ? "true" : "false";
  const manageRitualsPressed =
    activeView === "manage_rituals" ? "true" : "false";
  const profilePressed = activeView === "profile_settings" ? "true" : "false";
  const howItWorksPressed = activeView === "how_it_works" ? "true" : "false";

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
        <button type="button" role="menuitem" data-menu-action="this_week" aria-pressed="${thisWeekPressed}">Current ritual</button>
        <button type="button" role="menuitem" data-menu-action="choose_ritual">Choose a ritual</button>
        <button type="button" role="menuitem" data-menu-action="search_rituals" aria-pressed="${searchRitualsPressed}">Search rituals</button>
        <button type="button" role="menuitem" data-menu-action="manage_rituals" aria-pressed="${manageRitualsPressed}">Manage rituals</button>
        <button type="button" role="menuitem" data-menu-action="profile_settings" aria-pressed="${profilePressed}">Profile settings</button>
        <button type="button" role="menuitem" data-menu-action="how_it_works" aria-pressed="${howItWorksPressed}">How it works</button>
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
  return renderMoonOnlyLoadingShell("Loading sign-in state");
}

export function renderPrivateDataLoadingShell(): string {
  return renderMoonOnlyLoadingShell("Loading household settings");
}

function renderMoonOnlyLoadingShell(ariaLabel: string): string {
  return `
    <section class="shell shell--moon-loading" aria-label="${escapeHtml(ariaLabel)}">
      <span class="entry-moon-loader" aria-hidden="true"></span>
    </section>
  `;
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

export function renderPrivateFirstLoginWelcomeShell(): string {
  return `
    <section class="shell shell--welcome" aria-labelledby="private-welcome-title">
      <article class="private-welcome" aria-label="Welcome">
        <div class="private-welcome__visual" aria-hidden="true">
          <img
            src="/assets/private-first-login-moon-candle.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
        <div class="private-welcome__copy">
          <h1 id="private-welcome-title">Welcome, my love.</h1>
          <p>I built this just for us &mdash;<br />a small space for shared rituals<br />and the quiet ways we keep choosing each other.</p>
          <p>I hope it helps keep us close while we are apart<br />and brings us together in our new home.</p>
        </div>
        <button
          class="primary-action private-welcome__action"
          type="button"
          data-private-welcome-action="dismiss"
        >Get Started</button>
      </article>
    </section>
  `;
}

function renderCheckInOptionButton({
  action,
  value,
  label,
  description,
  className,
}: {
  action: string;
  value: string;
  label: string;
  description?: string;
  className?: string;
}): string {
  const classes = ["check-in-option", className].filter(Boolean).join(" ");

  return `
    <button
      class="${escapeHtml(classes)}"
      type="button"
      data-check-in-action="${escapeHtml(action)}"
      data-check-in-value="${escapeHtml(value)}"
    >
      <span>${escapeHtml(label)}</span>
      ${description ? `<small>${escapeHtml(description)}</small>` : ""}
    </button>
  `;
}

const timeScopeAcknowledgements: Record<RitualCheckInTimeScope, string> = {
  today: "For today",
  best_moment_this_week: "Looking across the week",
};

const timeScopeReviewLabels: Record<RitualCheckInTimeScope, string> = {
  today: "For today",
  best_moment_this_week: "Across the week",
};

const energyAcknowledgements: Record<RitualCheckInEnergyCapacity, string> = {
  barely_any: "Barely any capacity",
  a_little: "A little capacity",
  enough_to_engage: "Enough to engage",
  room_for_something_deeper: "Room for something deeper",
};

const energyReviewLabels: Record<RitualCheckInEnergyCapacity, string> = {
  barely_any: "Barely any",
  a_little: "A little",
  enough_to_engage: "Enough to engage",
  room_for_something_deeper: "Room for something deeper",
};

function renderCheckInAcknowledgement(draft: RitualCheckInDraft): string {
  const acknowledgement = (() => {
    switch (draft.step) {
      case "time_scope":
        return draft.energyCapacity
          ? energyAcknowledgements[draft.energyCapacity]
          : undefined;
      case "audience":
        return draft.timeScope
          ? timeScopeAcknowledgements[draft.timeScope]
          : undefined;
      case "purpose":
        if (draft.energyCapacity === "barely_any") {
          return undefined;
        }

        return draft.audience
          ? audienceOptions.find((option) => option.key === draft.audience)?.label
          : undefined;
      case "carrier":
        return draft.purposeLabel;
      case "refinement":
        return draft.purposeLabel;
      case "entry_path":
      case "energy_capacity":
      case "review":
      default:
        return undefined;
    }
  })();

  return acknowledgement
    ? `<p class="check-in__acknowledgement">${escapeHtml(acknowledgement)}</p>`
    : "";
}

function renderCheckInQuestion(draft: RitualCheckInDraft): string {
  if (draft.step === "time_scope") {
    return `
      <section class="check-in-step" aria-label="Time scope">
        <h3>Are you wanting something for today, or looking across the week?</h3>
        <div class="check-in-options">
          ${timeScopeOptions.map((option) => renderCheckInOptionButton({
            action: "time_scope",
            value: option.key,
            label: option.key === "best_moment_this_week" ? "Across the week" : option.label,
          })).join("")}
        </div>
      </section>
    `;
  }

  if (draft.step === "energy_capacity") {
    return `
      <section class="check-in-step" aria-label="Energy and capacity">
        <h3>How much energy or capacity do you have?</h3>
        <div class="check-in-options">
          ${energyCapacityOptions.map((option) => renderCheckInOptionButton({
            action: "energy_capacity",
            value: option.key,
            label: option.label,
            description: option.description,
          })).join("")}
        </div>
      </section>
    `;
  }

  if (draft.step === "audience") {
    return `
      <section class="check-in-step" aria-label="Audience">
        <h3>Who is this for?</h3>
        <div class="check-in-options check-in-options--two">
          ${audienceOptions.map((option) => renderCheckInOptionButton({
            action: "audience",
            value: option.key,
            label: option.label,
          })).join("")}
        </div>
      </section>
    `;
  }

  if (draft.step === "carrier") {
    const openOption = renderCheckInOptionButton({
      action: "carrier",
      value: "open",
      label: "I'm open",
      description: "Let Moon & Table choose the carrier.",
      className: "check-in-option--open",
    });

    return `
      <section class="check-in-step" aria-label="Carrier">
        <h3>Where should the ritual live?</h3>
        <div class="check-in-options">
          ${carrierOptions.map((option) => renderCheckInOptionButton({
            action: "carrier",
            value: option.key,
            label: option.label,
            description: option.description,
          })).join("")}
          ${openOption}
        </div>
      </section>
    `;
  }

  if (draft.step === "purpose") {
    return `
      <section class="check-in-step" aria-label="Purpose">
        <h3>What work should the ritual hold?</h3>
        <div class="check-in-options">
          ${purposeOptions.map((option) => renderCheckInOptionButton({
            action: "purpose",
            value: option.key,
            label: option.label,
            description: option.description,
          })).join("")}
        </div>
      </section>
    `;
  }

  if (draft.step === "refinement" && draft.purpose) {
    const group = getRefinementGroupForPurpose(draft.purpose);

    return `
      <section class="check-in-step" aria-label="Refinement">
        <h3>${escapeHtml(group.question)}</h3>
        <div class="check-in-options">
          ${group.options.map((option) => renderCheckInOptionButton({
            action: "refinement",
            value: option.key,
            label: option.label,
          })).join("")}
        </div>
      </section>
    `;
  }

  return "";
}

function renderTodaysShapeBrief(brief: TodaysShapeBrief): string {
  const summaryParagraphValues = brief.summary
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const synthesisIndex = summaryParagraphValues.length - 1;
  const summaryParagraphs = summaryParagraphValues
    .map((paragraph, index) => `
      <p class="${index === synthesisIndex ? "todays-shape__synthesis" : "todays-shape__fact"}">
        ${escapeHtml(paragraph)}
      </p>
    `)
    .join("");
  const details = brief.majorEventPresent &&
    brief.details &&
    brief.details.some((detail) => detail.title !== "Moon")
    ? `
        <details class="todays-shape__details">
          <summary>More</summary>
          <div class="todays-shape__detail-list">
            ${brief.details.filter((detail) => detail.title !== "Moon").map((detail) => `
              <section class="todays-shape__detail" aria-label="${escapeHtml(detail.title)}">
                <h3>${escapeHtml(detail.title)}</h3>
                <p>${escapeHtml(detail.body)}</p>
              </section>
            `).join("")}
          </div>
        </details>
      `
    : "";

  return `
    <section
      class="todays-shape"
      aria-label="${escapeHtml(brief.title)}"
      data-timing-authority="${escapeHtml(brief.timingAuthority)}"
    >
      <div class="todays-shape__body">
        ${summaryParagraphs}
      </div>
      ${details}
    </section>
  `;
}

function renderRitualEntryPaths(
  currentTimingWindow?: TimingWindowCandidate,
): string {
  return `
    <section class="ritual-entry-paths" aria-label="Choose how to find a ritual">
      <button
        class="ritual-entry-action"
        type="button"
        data-check-in-action="start_guided"
        data-check-in-value="choose_with_me"
      >
        <span>Choose with me</span>
        <small>Answer a few questions and let Moon &amp; Table choose one ritual.</small>
      </button>
      <button
        class="ritual-entry-action"
        type="button"
        data-search-rituals-entry="true"
      >
        <span>I have something in mind</span>
        <small>Search by material, mood, purpose, place, or phrase.</small>
      </button>
      ${currentTimingWindow ? `
        <button
          class="ritual-entry-action"
          type="button"
          data-timing-rituals-entry="true"
        >
          <span>Rituals for this timing</span>
          <small>Browse rituals that match ${escapeHtml(currentTimingWindow.label.toLowerCase())}.</small>
        </button>
      ` : ""}
    </section>
  `;
}

function renderCheckInBackControl(draft: RitualCheckInDraft): string {
  if (draft.step === "entry_path") {
    return "";
  }

  return `
    <button
      class="check-in__back"
      type="button"
      data-check-in-action="go_back"
      data-check-in-value="previous"
    >&larr; Go back</button>
  `;
}

function lowercaseFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function renderReviewBullet(value: string | undefined): string {
  return value ? `<li>${escapeHtml(value)}</li>` : "";
}

function getCapacityReviewPhrase(
  energyCapacity: RitualCheckInEnergyCapacity,
): string {
  if (energyCapacity === "room_for_something_deeper") {
    return "with room for something deeper";
  }

  if (energyCapacity === "enough_to_engage") {
    return "with enough to engage";
  }

  return `with ${lowercaseFirst(energyReviewLabels[energyCapacity])} capacity`;
}

function renderReviewBullets(draft: RitualCheckInDraft): string {
  const timing = draft.timeScope
    ? lowercaseFirst(timeScopeReviewLabels[draft.timeScope])
    : undefined;
  const capacity = draft.energyCapacity
    ? getCapacityReviewPhrase(draft.energyCapacity)
    : undefined;
  const audience = draft.audience
    ? draft.audience === "both_of_us"
      ? "for both of you"
      : "for you"
    : undefined;
  const carrier = draft.carrierLabel
    ? draft.carrierOpen
      ? "with Moon & Table choosing where it lives"
      : `living ${lowercaseFirst(draft.carrierLabel)}`
    : undefined;
  const purpose = draft.purposeLabel
    ? lowercaseFirst(draft.purposeLabel)
    : undefined;
  const refinement = draft.refinementLabel
    ? `around ${lowercaseFirst(draft.refinementLabel)}`
    : undefined;

  return [
    renderReviewBullet(timing),
    renderReviewBullet(audience),
    renderReviewBullet(capacity),
    renderReviewBullet(carrier),
    renderReviewBullet(purpose),
    renderReviewBullet(refinement),
  ].join("");
}

function renderCheckInReview(draft: RitualCheckInDraft): string {
  if (draft.step !== "review" || !draft.timeScope || !draft.energyCapacity) {
    return "";
  }

  return `
    <section class="check-in-review" aria-label="Review your choices">
      <h3>Ready.</h3>
      <p>I’ll look for something:</p>
      <ul>
        ${renderReviewBullets(draft)}
      </ul>
      <p>I’ll use this with your saved profile to recommend one ritual.</p>
      <div class="check-in-review__actions">
        <button class="primary-action" type="button" data-check-in-action="confirm_review" data-check-in-value="confirm">Recommend a ritual</button>
        <button class="secondary-action" type="button" data-check-in-start-over="true">Start over</button>
      </div>
    </section>
  `;
}

export function renderRitualCheckInShell({
  draft,
  displayName,
  introMode = "returning",
  todaysShapeBrief,
  currentTimingWindow,
}: {
  draft: RitualCheckInDraft;
  displayName?: string | null;
  introMode?: "returning" | "first_login";
  todaysShapeBrief?: TodaysShapeBrief | null;
  currentTimingWindow?: TimingWindowCandidate;
}): string {
  const intro = draft.step === "entry_path"
    ? `
        <header class="check-in__header">
          <p>${introMode === "first_login"
            ? "Let&rsquo;s choose your first ritual."
            : `Welcome back, ${escapeHtml(getFirstName(displayName))}.`
          }</p>
          ${renderAppMenu("this_week")}
        </header>
      `
    : "";
  const todaysShape = draft.step === "entry_path"
    ? renderTodaysShapeBrief(todaysShapeBrief ?? createTodaysShapeBrief())
    : "";
  const entryPaths = draft.step === "entry_path"
    ? renderRitualEntryPaths(currentTimingWindow)
    : "";
  const checkInContent = draft.step === "entry_path"
    ? ""
    : draft.step === "review"
      ? renderCheckInReview(draft)
      : renderCheckInQuestion(draft);

  return `
    <section class="shell shell--check-in" aria-labelledby="app-title">
      <header class="masthead masthead--check-in">
        <div class="masthead__nameplate">
          <h1 id="app-title">Moon &amp; Table</h1>
        </div>
      </header>

      <article class="check-in" aria-label="Ritual check-in">
        ${draft.step !== "entry_path"
          ? `<div class="check-in__topline">
              ${renderCheckInBackControl(draft)}
              ${renderAppMenu("this_week")}
            </div>`
          : ""}
        ${intro}
        ${todaysShape}
        ${entryPaths}
        ${renderCheckInAcknowledgement(draft)}

        ${checkInContent}
      </article>
    </section>
  `;
}

export function renderRitualCheckInLoadingShell(): string {
  return `
    <section class="shell shell--check-in" aria-labelledby="app-title">
      <header class="masthead masthead--check-in">
        <div class="masthead__nameplate">
          <h1 id="app-title">Moon &amp; Table</h1>
        </div>
      </header>

      <article class="check-in check-in--loading" aria-label="Choosing ritual">
        <span class="entry-moon-loader" aria-hidden="true"></span>
        <p>Reading the moon.</p>
        <p>Choosing one ritual.</p>
      </article>
    </section>
  `;
}

function renderCurrentRitualEntry(
  currentTimingWindow?: TimingWindowCandidate,
): string {
  return `
    <article class="check-in check-in--embedded" aria-label="Choose a ritual">
      <header class="check-in__header">
        <h2>Choose a ritual</h2>
        <p>Start with a few questions, or go straight to the library.</p>
      </header>
      ${renderRitualEntryPaths(currentTimingWindow)}
    </article>
  `;
}

export function renderSignedInShell(
  privateBriefData: PrivateBriefData,
  options: SignedInShellOptions = {},
): string {
  const activeView = options.activeView ?? "this_week";
  const thisWeekContent = options.chooseWithMeResult
    ? renderChooseWithMeResult(options.chooseWithMeResult, {
        favorites: options.ritualFavorites,
        recommendationInstanceId: options.chooseWithMeRecommendationInstanceId,
        interactionStatus: options.chooseWithMeInteractionStatus,
      })
    : renderCurrentRitualEntry(options.currentTimingWindow);
  const profileSettings = renderProfileTuningSection(
    privateBriefData,
    options.activeProfileSettingsTabId,
  );
  const searchRituals = renderSearchRitualsSection({
    query: options.ritualSearchQuery,
    selectedChips: options.selectedRitualSearchChips,
    selectedRitualId: options.selectedRitualId,
    sort: options.ritualSearchSort,
    source: options.ritualSearchSource,
    purpose: options.ritualSearchPurpose,
    carrier: options.ritualSearchCarrier,
    capacity: options.ritualSearchCapacity,
    audience: options.ritualSearchAudience,
    timing: options.ritualSearchTiming,
    favoritesOnly: options.ritualSearchFavoritesOnly,
    favorites: options.ritualFavorites,
    currentTimingWindow: options.currentTimingWindow,
  });
  const manageRituals = renderManageRitualsSection({
    filters: options.manageRitualFilters,
  });
  const howItWorks = renderHowItWorksSection();
  const activeContent =
    activeView === "profile_settings"
      ? profileSettings
      : activeView === "search_rituals"
        ? searchRituals
      : activeView === "manage_rituals"
        ? manageRituals
      : activeView === "how_it_works"
        ? howItWorks
      : thisWeekContent;

  return `
    <section class="shell" aria-labelledby="app-title">
      <header class="masthead masthead--with-session">
        <div class="masthead__nameplate">
          ${renderMoonGlyph(privateBriefData.input.currentDate, privateBriefData.input.timezone)}
          <button
            class="masthead__home"
            type="button"
            data-home-action="this_week"
            aria-label="Show current ritual"
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
