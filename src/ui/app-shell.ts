import {
  generateWeeklyBrief,
  type BriefExplanation,
  type BriefSourceSummary,
  type CapacityMode,
  type WeeklyBrief,
} from "../lib/generate-weekly-brief";
import { MoonPhase } from "astronomy-engine";
import {
  audienceOptions,
  carrierOptions,
  energyCapacityOptions,
  getPracticeOptionsForEnergy,
  getRefinementGroupForPurpose,
  purposeOptions,
  timeScopeOptions,
  type RitualCheckInDraft,
  type RitualCheckInEnergyCapacity,
  type RitualCheckInTimeScope,
} from "../lib/current-ritual-check-in";
import { ritualFocusOptions } from "../data/ritual-focus-options";
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
import {
  createTodaysShapeBrief,
  type TodaysShapeBrief,
} from "../lib/todays-shape-brief";
import {
  PROFILE_TUNING_ASTROLOGY_VISIBILITY,
  type ProfileTuningProfile,
  type ProfileTuningSettings,
} from "../lib/profile-tuning";
import { sourceBackedRituals } from "../data/rituals/source-backed-rituals";
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
  type ManageRitualStatusFilter,
  type ManageRitualValidationFilter,
} from "../data/rituals/manage-rituals";
import {
  getRitualSearchChips,
  searchRituals,
} from "../data/rituals/search-rituals";
import type { ChooseWithMeResult } from "../data/rituals/choose-with-me-selector";
import { RITUAL_STATUSES, type Ritual } from "../data/rituals/types";

const feedbackLabels: Record<BriefFeedbackType, string> = {
  good: "This feels right.",
  too_much: "Simpler, please",
  too_generic: "This feels off",
  more_like_this: "More like this",
  not_this_style: "Not this kind of ritual",
  skipped: "I skipped it",
  try_again: "Give me another option",
};
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

export type SignedInView =
  | "this_week"
  | "search_rituals"
  | "manage_rituals"
  | "profile_settings"
  | "how_it_works";

export type RitualSearchSort = "match" | "title" | "purpose" | "material";

export type SignedInShellOptions = {
  activeView?: SignedInView;
  brief?: WeeklyBrief;
  chooseWithMeResult?: ChooseWithMeResult;
  feedbackStatus?: string;
  tryAgainStatus?: string;
  selectedFeedbackType?: BriefFeedbackType;
  savingFeedbackType?: BriefFeedbackType;
  showDebugTrace?: boolean;
  activeProfileSettingsTabId?: string | null;
  ritualSearchQuery?: string;
  selectedRitualSearchChips?: string[];
  selectedRitualId?: string | null;
  ritualSearchSort?: RitualSearchSort;
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

function getReasonLead(summary: string): string {
  const sentences = summary.match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()) ?? [];

  if (sentences.length === 0) {
    return summary;
  }

  return sentences.slice(0, 2).join(" ");
}

function renderBriefReasoning(brief: WeeklyBrief): string {
  const whyThisFits =
    brief.explanation.whyThisFits ??
    brief.explanation.reasoning[0]?.summary ??
    brief.whyThis;

  if (!whyThisFits) {
    return "";
  }

  return `
    <section class="why-this" aria-label="Why this fits">
      <h3>Why this fits</h3>
      <p>${escapeHtml(getReasonLead(whyThisFits))}</p>
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
      return "Practical fit";
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

function renderBriefFilterNotes(explanation: BriefExplanation): string {
  if (explanation.filtersApplied.length === 0) {
    return "";
  }

  return `
    <section class="brief__filter-notes" aria-label="Fit notes">
      <h3>Fit notes</h3>
      ${explanation.filtersApplied.map((note) => `
        <p><strong>${escapeHtml(note.label)}:</strong> ${escapeHtml(note.summary)}</p>
      `).join("")}
    </section>
  `;
}

function renderHowThisWasChosenSections(explanation: BriefExplanation): string {
  if (!explanation.howThisWasChosen || explanation.howThisWasChosen.length === 0) {
    return "";
  }

  return `
    <div class="brief__chosen-sections">
      ${explanation.howThisWasChosen
        .filter((section) => section.visibility !== "debug")
        .map((section) => `
          <section class="brief__chosen-section" aria-label="${escapeHtml(section.title)}">
            <h3>${escapeHtml(section.title)}</h3>
            <p>${escapeHtml(section.body)}</p>
          </section>
        `).join("")}
    </div>
  `;
}

function renderBriefChoiceDetails(explanation: BriefExplanation): string {
  const chosenSections = renderHowThisWasChosenSections(explanation);
  const signals = renderBriefSignals(explanation);
  const filterNotes = renderBriefFilterNotes(explanation);
  const sources = renderBriefSources(explanation);

  if (!chosenSections && !signals && !filterNotes && !sources) {
    return "";
  }

  return `
    <details class="brief__choice-details" aria-label="How this was chosen">
      <summary>How this was chosen</summary>
      <div class="brief__choice-details-body">
        ${chosenSections || `${signals}${filterNotes}${sources}`}
      </div>
    </details>
  `;
}

function renderScoreReasons(
  reasons: Array<{ code: string; label: string; points: number; detail?: string }>,
): string {
  if (reasons.length === 0) {
    return "<li>No scoring reasons recorded.</li>";
  }

  return reasons.map((reason) => `
    <li>
      <span>${escapeHtml(reason.points > 0 ? `+${reason.points}` : `${reason.points}`)}</span>
      ${escapeHtml(reason.label)}
      ${reason.detail ? `<small>${escapeHtml(reason.detail)}</small>` : ""}
    </li>
  `).join("");
}

function getMeaningfulScoreReasons(
  reasons: Array<{ code: string; label: string; points: number; detail?: string }>,
): Array<{ code: string; label: string; points: number; detail?: string }> {
  const lowSignalCodes = new Set([
    "approved_pattern",
    "capacity_fit",
    "duration_fit",
  ]);

  return reasons
    .filter((reason) => !lowSignalCodes.has(reason.code))
    .sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      return a.label.localeCompare(b.label);
    });
}

function renderTopReasonCodes(
  reasons: Array<{ code: string; label: string; points: number; detail?: string }>,
): string {
  const meaningfulReasons = getMeaningfulScoreReasons(reasons).slice(0, 4);
  const renderedReasons =
    meaningfulReasons.length > 0
      ? meaningfulReasons
      : reasons.slice(0, 3);

  return renderedReasons
    .map((reason) =>
      reason.points > 0
        ? `${reason.label} (+${reason.points})`
        : reason.label,
    )
    .join(" · ");
}

function getOptionLabel(
  options: readonly { key: string; label: string }[],
  value: string | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  return options.find((option) => option.key === value)?.label ?? value;
}

function renderCheckInDebug(brief: WeeklyBrief): string {
  const checkIn = brief.decision.inputs.currentRitualCheckIn;

  if (!checkIn) {
    return "<p><strong>Check-in:</strong> none</p>";
  }

  const practiceOptions = getPracticeOptionsForEnergy(checkIn.energyCapacity);
  const practiceLabel =
    checkIn.practiceTypeLabel ??
    (checkIn.practiceTypeHints && checkIn.practiceTypeHints.length > 0
      ? checkIn.practiceTypeHints.join(" · ")
      : undefined);
  const focusLabel =
    checkIn.ritualFocusLabel ??
    ritualFocusOptions.find((option) => option.key === checkIn.ritualFocusKey)?.label ??
    checkIn.ritualFocusText;
  const selectedPattern = brief.decision.candidates.ritualPatterns.find(
    (candidate) => candidate.key === brief.decision.selected.ritualPatternKey,
  );
  const checkInReasons =
    selectedPattern?.scoreReasons.filter((reason) =>
      reason.code.startsWith("checkin_"),
    ) ?? [];
  const checkInPoints = checkInReasons.reduce(
    (total, reason) => total + reason.points,
    0,
  );
  const practiceChoice = brief.decision.inputs.practiceChoice;
  const practiceDiagnostic = practiceChoice
    ? `
      <p><strong>Visible practice options:</strong> ${escapeHtml(practiceChoice.visibleOptions.map((option) => option.label).join(" · ") || "none")}</p>
      <p><strong>Practice diagnostic:</strong> ${escapeHtml(`${practiceChoice.status}: ${practiceChoice.note}`)}</p>
      <p><strong>Practice matches selected pattern:</strong> ${escapeHtml(practiceChoice.selectedPatternMatches.join(" · ") || "none")}</p>
    `
    : "";

  return `
    <div class="decision-debug__check-in">
      <p><strong>Check-in choices</strong></p>
      <ul>
        <li><strong>Timing:</strong> ${escapeHtml(getOptionLabel(timeScopeOptions, checkIn.timeScope) ?? checkIn.timeScope)}</li>
        <li><strong>Capacity:</strong> ${escapeHtml(getOptionLabel(energyCapacityOptions, checkIn.energyCapacity) ?? checkIn.energyCapacity)}</li>
        <li><strong>Audience:</strong> ${escapeHtml(getOptionLabel(audienceOptions, checkIn.audience) ?? checkIn.audience ?? "none")}</li>
        <li><strong>Practice:</strong> ${escapeHtml(practiceLabel ?? getOptionLabel(practiceOptions, checkIn.practiceTypeHints?.[0]) ?? "none")}</li>
        <li><strong>Intention:</strong> ${escapeHtml(focusLabel ?? "none")}</li>
      </ul>
      <p><strong>Check-in contribution:</strong> ${escapeHtml(
        checkInReasons.length > 0
          ? `+${checkInPoints} from ${checkInReasons.map((reason) => reason.label.toLowerCase()).join(", ")}`
          : "none recorded on the selected pattern",
      )}</p>
      <p><strong>Check-in influence:</strong> ${escapeHtml(brief.decision.inputs.checkInInfluences.join(" · ") || "none")}</p>
      ${practiceDiagnostic}
    </div>
  `;
}

function renderTimingWindowDebug(brief: WeeklyBrief): string {
  const timingWindow = brief.decision.inputs.selectedTimingWindow;

  if (!timingWindow) {
    return "<p><strong>Timing window:</strong> none</p>";
  }

  const scoreReasonText = timingWindow.scoreReasons
    .map((reason) =>
      reason.detail
        ? `${reason.label} (+${reason.points}, ${reason.detail})`
        : `${reason.label} (+${reason.points})`,
    )
    .join(" · ");

  return `
    <div class="decision-debug__timing-window">
      <p><strong>Timing window:</strong> ${escapeHtml(timingWindow.label)} (${escapeHtml(`${timingWindow.score}`)} points)</p>
      <p><strong>User window:</strong> ${escapeHtml(timingWindow.isStrong ? timingWindow.userWindow : "No strong timing window stood out; go whenever capacity allows.")}</p>
      <p><strong>Starts:</strong> ${escapeHtml(timingWindow.startsAtIso)}</p>
      <p><strong>Strength:</strong> ${escapeHtml(`${timingWindow.strength}${timingWindow.isStrong ? " / strong enough" : " / not strong enough"}`)}</p>
      <p><strong>Why this window:</strong> ${escapeHtml(scoreReasonText || timingWindow.reasonLabels.join(" · ") || "no score reasons recorded")}</p>
    </div>
  `;
}

function renderNumerologyDebug(brief: WeeklyBrief): string {
  const numerology = brief.decision.inputs.numerology;

  if (!numerology) {
    return "<p><strong>Numerology:</strong> no diagnostic recorded</p>";
  }

  return `
    <div class="decision-debug__numerology">
      <p><strong>Numerology:</strong> ${escapeHtml(`${numerology.status}: ${numerology.note}`)}</p>
      <p><strong>Computed facts:</strong> ${escapeHtml(numerology.computedFactIds.join(" · ") || "none")}</p>
      <p><strong>Eligible signals:</strong> ${escapeHtml(numerology.eligibleSignalLabels.join(" · ") || "none")}</p>
      <p><strong>Matched signals:</strong> ${escapeHtml(numerology.matchedSignalLabels.join(" · ") || "none")}</p>
      <p><strong>Selected signals:</strong> ${escapeHtml(numerology.selectedSignalLabels.join(" · ") || "none")}</p>
    </div>
  `;
}

function renderNatalContactDebug(
  contacts: WeeklyBrief["decision"]["selected"]["natalContacts"],
): string {
  if (contacts.length === 0) {
    return "<p>No selected natal contacts affected this recommendation.</p>";
  }

  return `<ol>${contacts.map((contact) => `
    <li>
      <strong>${escapeHtml(contact.key)}</strong>
      <small>${escapeHtml([
        contact.personKey,
        contact.transitingBody,
        contact.contactType,
        contact.aspectType,
        contact.natalBodyOrPoint,
        contact.orbDegrees !== undefined ? `${contact.orbDegrees}° orb` : undefined,
      ].filter(Boolean).join(" · "))}</small>
      <small>${escapeHtml(contact.themeKeys.join(" · "))}</small>
    </li>
  `).join("")}</ol>`;
}

function renderNatalDebugStatus(brief: WeeklyBrief): string {
  const placementCount = Object.values(
    brief.decision.inputs.natalPlacementCounts,
  ).reduce((total, count) => total + (count ?? 0), 0);
  const selectedContactCount = brief.decision.selected.natalContacts.length;

  if (placementCount === 0) {
    return "No placement records loaded. Saved private profile theme cards can still affect fit, but private timing contacts require astrologyProfile.placements in Firestore.";
  }

  if (selectedContactCount === 0) {
    return `${placementCount} placement record${placementCount === 1 ? "" : "s"} loaded and checked; none affected the selected ritual.`;
  }

  return `${placementCount} placement record${placementCount === 1 ? "" : "s"} loaded; ${selectedContactCount} ranked private timing contact${selectedContactCount === 1 ? "" : "s"} affected the selected ritual.`;
}

function renderDiagnosticExplanationDebug(brief: WeeklyBrief): string {
  const sections = brief.explanation.diagnosticHowThisWasChosen;

  if (!sections || sections.length === 0) {
    return "<p>No diagnostic explanation sections recorded.</p>";
  }

  return `
    <ol>
      ${sections.map((section) => `
        <li>
          <strong>${escapeHtml(section.title)}</strong>
          <small>${escapeHtml(section.kind)}</small>
          <p>${escapeHtml(section.body)}</p>
        </li>
      `).join("")}
    </ol>
  `;
}

function renderDeveloperDecision(brief: WeeklyBrief): string {
  const selectedPattern = brief.decision.candidates.ritualPatterns.find(
    (candidate) => candidate.key === brief.decision.selected.ritualPatternKey,
  );
  const evaluatedPatterns = brief.decision.candidates.ritualPatterns.slice(0, 8);
  const rejectedPatterns = brief.decision.rejected.ritualPatterns.slice(0, 8);

  return `
    <details class="trace decision-debug" aria-label="Developer decision record">
      <summary>Developer decision record</summary>
      <div class="decision-debug__grid">
        <section>
          <h3>Selected</h3>
          <p><strong>Pattern:</strong> ${escapeHtml(brief.decision.selected.ritualPatternKey)}</p>
          <p><strong>Cards:</strong> ${escapeHtml(brief.decision.selected.symbolicCardKeys.join(" · "))}</p>
          <p><strong>Timing signals:</strong> ${escapeHtml(brief.decision.selected.timingSignalLabels.join(" · ") || "none")}</p>
          <p><strong>Summary:</strong> ${escapeHtml(brief.decision.explanation.scoreSummary)}</p>
        </section>
        <section>
          <h3>Inputs</h3>
          <p><strong>Capacity:</strong> ${escapeHtml(brief.decision.inputs.capacityMode)} (${escapeHtml(`${brief.decision.inputs.capacityLimitMinutes}`)} min)</p>
          <p><strong>Audience:</strong> ${escapeHtml(brief.decision.inputs.audience)}</p>
          <p><strong>Preferred:</strong> ${escapeHtml(brief.decision.inputs.preferredRitualStyles.join(" · ") || "none")}</p>
          <p><strong>Avoided:</strong> ${escapeHtml(brief.decision.inputs.avoidedRitualStyles.join(" · ") || "none")}</p>
          ${renderCheckInDebug(brief)}
          ${renderTimingWindowDebug(brief)}
          ${renderNumerologyDebug(brief)}
          <p><strong>Natal profiles:</strong> ${escapeHtml(`${brief.decision.inputs.privateNatalProfileCount}`)} loaded</p>
          <p><strong>Natal contacts:</strong> ${escapeHtml(`${brief.decision.inputs.natalContactsComputed}`)} computed</p>
          <p><strong>Private chart status:</strong> ${escapeHtml(renderNatalDebugStatus(brief))}</p>
        </section>
      </div>
      ${selectedPattern ? `
      <section class="decision-debug__section">
        <h3>Selected score reasons</h3>
        <ul>${renderScoreReasons(selectedPattern.scoreReasons)}</ul>
      </section>
      ` : ""}
      <section class="decision-debug__section">
        <h3>Diagnostic explanation</h3>
        ${renderDiagnosticExplanationDebug(brief)}
      </section>
      <section class="decision-debug__section">
        <h3>Evaluated ritual patterns</h3>
        <ol>
          ${evaluatedPatterns.map((candidate) => `
            <li>
              <strong>${escapeHtml(candidate.key)}</strong>
              <span>${escapeHtml(`${candidate.score}`)} points</span>
              <small>${escapeHtml(renderTopReasonCodes(candidate.scoreReasons) || "no meaningful score reasons")}</small>
            </li>
          `).join("")}
        </ol>
      </section>
      <section class="decision-debug__section">
        <h3>Rejected ritual patterns</h3>
        ${rejectedPatterns.length > 0
          ? `<ol>${rejectedPatterns.map((candidate) => `
              <li>
                <strong>${escapeHtml(candidate.key)}</strong>
                <small>${escapeHtml(candidate.reasons.map((reason) => reason.code).join(", "))}</small>
              </li>
            `).join("")}</ol>`
          : "<p>No rejected ritual patterns recorded.</p>"
        }
      </section>
      <section class="decision-debug__section">
        <h3>Selected natal contacts</h3>
        ${renderNatalContactDebug(brief.decision.selected.natalContacts)}
      </section>
      <section class="decision-debug__section">
        <h3>Source references</h3>
        <p>${escapeHtml(brief.decision.selected.sourceReferences.join(" · "))}</p>
      </section>
    </details>
  `;
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

export function renderRitualPreview(ritual: Ritual): string {
  return `
    <article class="ritual-preview" aria-label="${escapeHtml(ritual.presentation.headline)}">
      <div class="ritual-preview__header">
        <h2>${escapeHtml(ritual.presentation.headline)}</h2>
        <p class="ritual-preview__intention">${escapeHtml(ritual.presentation.intention)}</p>
      </div>

      <section class="ritual-preview__section" aria-label="Practice">
        <p class="brief__section-label">Practice</p>
        <p>${escapeHtml(ritual.presentation.practice)}</p>
      </section>

      <section class="ritual-preview__section" aria-label="Best window">
        <p class="brief__section-label">Best window</p>
        <p>${escapeHtml(ritual.presentation.bestWindow)}</p>
      </section>

      <section class="ritual-preview__section" aria-label="Why this fits">
        <p class="brief__section-label">Why this fits</p>
        <p>${escapeHtml(ritual.presentation.whyThisFits)}</p>
      </section>

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
            <dd>${escapeHtml(ritual.searchMetadata.sourceLabel ?? "none")}</dd>
          </div>
          <div>
            <dt>Source cluster</dt>
            <dd>${escapeHtml(ritual.searchMetadata.originLabel ?? "none")}</dd>
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

function renderChooseWithMeResult(result: ChooseWithMeResult): string {
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
        <h2 class="brief__theme">${escapeHtml(ritual.presentation.headline)}</h2>
        <p class="brief__practice" data-testid="recommended-ritual">${escapeHtml(ritual.presentation.intention)}</p>
      </section>

      <section class="choose-result__body" aria-label="Ritual">
        ${renderRitualPreview(ritual)}
      </section>

      <section class="brief__depth choose-result__reasoning" aria-label="Why this ritual">
        <section class="ritual-preview__section" aria-label="Why this fits now">
          <p class="brief__section-label">Why this fits</p>
          <p>${escapeHtml(result.whyThisFits)}</p>
        </section>
        <section class="ritual-preview__section" aria-label="How this was chosen">
          <p class="brief__section-label">How this was chosen</p>
          <p>${escapeHtml(result.howThisWasChosen)}</p>
        </section>
      </section>

      <section class="brief__actions" aria-label="Ritual actions">
        <div class="brief__closing-actions">
          <button
            class="quiet-action"
            type="button"
            data-check-in-start-over="true"
          >I want to check in again</button>
        </div>
      </section>

      ${renderChooseWithMeDebug(result)}
    </article>
  `;
}

function renderRitualResultCard(ritual: Ritual, selectedRitualId: string): string {
  const isSelected = ritual.id === selectedRitualId;
  const materialsAndTags = [
    ...(ritual.searchMetadata.materials ?? []),
    ...ritual.searchMetadata.tags.slice(0, 3),
  ].slice(0, 5);

  return `
    <button
      class="ritual-result-card${isSelected ? " ritual-result-card--selected" : ""}"
      type="button"
      data-ritual-select="${escapeHtml(ritual.id)}"
      aria-pressed="${isSelected ? "true" : "false"}"
    >
      <strong>${escapeHtml(ritual.presentation.headline)}</strong>
      <span>${escapeHtml(getRitualSearchSummary(ritual))}</span>
      <small>${escapeHtml([
        formatRitualLabel(ritual.recommendationMetadata.purposes.primary),
        formatRitualLabel(ritual.recommendationMetadata.carriers.primary),
      ].join(" · "))}</small>
      <small>${escapeHtml(materialsAndTags.join(" · ") || "No materials listed")}</small>
    </button>
  `;
}

function getPrimaryRitualMaterial(ritual: Ritual): string {
  return ritual.searchMetadata.materials?.[0] ??
    ritual.searchMetadata.tags[0] ??
    ritual.recommendationMetadata.carriers.primary;
}

function sortRitualSearchResults(
  results: Ritual[],
  sort: RitualSearchSort,
): Ritual[] {
  const sorted = [...results];

  if (sort === "title") {
    return sorted.sort((a, b) =>
      a.presentation.headline.localeCompare(b.presentation.headline),
    );
  }

  if (sort === "purpose") {
    return sorted.sort((a, b) =>
      a.recommendationMetadata.purposes.primary.localeCompare(
        b.recommendationMetadata.purposes.primary,
      ) || a.presentation.headline.localeCompare(b.presentation.headline),
    );
  }

  if (sort === "material") {
    return sorted.sort((a, b) =>
      getPrimaryRitualMaterial(a).localeCompare(getPrimaryRitualMaterial(b)) ||
      a.presentation.headline.localeCompare(b.presentation.headline),
    );
  }

  return sorted;
}

function renderRitualSearchSortOption(
  value: RitualSearchSort,
  label: string,
  selectedSort: RitualSearchSort,
): string {
  return `<option value="${value}"${selectedSort === value ? " selected" : ""}>${label}</option>`;
}

const ritualSearchStarterChipValues = [
  "candlelight",
  "plant",
  "table",
  "vessel",
  "beginning",
  "bread",
  "grain",
  "household light",
  "first light",
  "water",
  "opening",
  "tending",
] as const;

function getVisibleRitualSearchChips(
  chips: ReturnType<typeof getRitualSearchChips>,
  selectedChips: string[],
): ReturnType<typeof getRitualSearchChips> {
  const chipByValue = new Map(chips.map((chip) => [chip.value, chip]));
  const visibleValues = [
    ...ritualSearchStarterChipValues,
    ...selectedChips,
  ];
  const visibleChips = visibleValues
    .map((value) => chipByValue.get(value))
    .filter((chip): chip is NonNullable<typeof chip> => Boolean(chip));

  return [...new Map(visibleChips.map((chip) => [chip.value, chip])).values()];
}

export function renderSearchRitualsSection(options: {
  query?: string;
  selectedChips?: string[];
  selectedRitualId?: string | null;
  sort?: RitualSearchSort;
} = {}): string {
  const query = options.query ?? "";
  const selectedChips = options.selectedChips ?? [];
  const selectedSort = options.sort ?? "match";
  const selectedChipSet = new Set(selectedChips);
  const chips = getRitualSearchChips(sourceBackedRituals);
  const visibleChips = getVisibleRitualSearchChips(chips, selectedChips);
  const results = sortRitualSearchResults(searchRituals(sourceBackedRituals, {
    query,
    selectedChips,
  }), selectedSort);
  const hasSearchCriteria = query.trim().length > 0 || selectedChips.length > 0;
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
          <button class="ritual-search__submit" type="submit">Search</button>
        </div>
        <div class="ritual-search__chips" aria-label="Search filters">
          ${visibleChips.map((chip) => {
            const selected = selectedChipSet.has(chip.value);

            return `
              <button
                class="ritual-search-chip${selected ? " ritual-search-chip--selected" : ""}"
                type="button"
                data-ritual-search-chip="${escapeHtml(chip.value)}"
                aria-pressed="${selected ? "true" : "false"}"
              >${escapeHtml(chip.label)}</button>
            `;
          }).join("")}
        </div>
      </form>

      <div class="ritual-search__body">
        <section class="ritual-search__results" aria-label="Ritual results">
          <div class="ritual-search__results-header">
            <div>
              <h3>Select a ritual</h3>
              <p>${results.length === 1 ? "1 ritual" : `${results.length} rituals`}${hasSearchCriteria ? " found" : " available"}</p>
            </div>
            <label class="ritual-search__sort">
              <span>Sort</span>
              <select
                name="ritualSearchSort"
                form="ritual-search-form"
                data-ritual-search-sort="true"
              >
                ${renderRitualSearchSortOption("match", "Best match", selectedSort)}
                ${renderRitualSearchSortOption("title", "Title", selectedSort)}
                ${renderRitualSearchSortOption("purpose", "Purpose", selectedSort)}
                ${renderRitualSearchSortOption("material", "Material", selectedSort)}
              </select>
            </label>
          </div>
          ${results.length > 0
            ? results.map((ritual) => renderRitualResultCard(ritual, selectedRitual?.id ?? "")).join("")
            : `
              <div class="ritual-search__empty" role="status">
                <p>Nothing matched that exact reach.</p>
                <p>Try one material, purpose, place, or phrase from the ritual you are reaching for.</p>
              </div>
            `}
        </section>

        <section class="ritual-search__preview" aria-label="Selected ritual">
          ${selectedRitual
            ? renderRitualPreview(selectedRitual)
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

function formatManageList(values: string[]): string {
  return values.length > 0 ? values.join(", ") : "none";
}

function renderYesNo(value: boolean): string {
  return value ? "yes" : "no";
}

function renderManageRitualsFilters(filters: ManageRitualFilters): string {
  return `
    <form class="manage-rituals__filters" data-manage-rituals-filter-form="true" aria-label="Manage Rituals filters">
      <label>
        <span>Status</span>
        <select name="manageRitualStatus" data-manage-rituals-filter="true">
          ${renderManageRitualFilterOption("all", "All statuses", filters.status)}
          ${RITUAL_STATUSES.map((status) =>
            renderManageRitualFilterOption(status, formatRitualLabel(status), filters.status),
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
        <span>Availability</span>
        <select name="manageRitualAvailability" data-manage-rituals-filter="true">
          ${MANAGE_RITUAL_AVAILABILITY_FILTERS.map((availability) =>
            renderManageRitualFilterOption(
              availability,
              availability === "all" ? "All availability" : formatRitualLabel(availability),
              filters.availability,
            ),
          ).join("")}
        </select>
      </label>
      <label>
        <span>Readiness</span>
        <select name="manageRitualReadiness" data-manage-rituals-filter="true">
          ${MANAGE_RITUAL_READINESS_FILTERS.map((readiness) =>
            renderManageRitualFilterOption(
              readiness,
              readiness === "all" ? "All readiness" : formatRitualLabel(readiness),
              filters.readiness,
            ),
          ).join("")}
        </select>
      </label>
      <label>
        <span>Issues</span>
        <select name="manageRitualValidation" data-manage-rituals-filter="true">
          ${MANAGE_RITUAL_VALIDATION_FILTERS.map((validation) =>
            renderManageRitualFilterOption(
              validation,
              validation === "all" ? "All issues" : formatRitualLabel(validation),
              filters.validation,
            ),
          ).join("")}
        </select>
      </label>
    </form>
  `;
}

export function renderManageRitualsSection(options: {
  filters?: Partial<ManageRitualFilters>;
} = {}): string {
  const viewModel = createManageRitualsViewModel(sourceBackedRituals, options.filters);
  const counts = viewModel.counts;
  const statusSummary = [
    `${viewModel.total} imported Ritual${viewModel.total === 1 ? "" : "s"}`,
    `${counts.byStatus.pilot} pilot`,
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
          <div><dt>Issues</dt><dd>${escapeHtml(`validation findings ${counts.withValidationFindings}, missing readiness ${counts.withMissingReadiness}`)}</dd></div>
        </dl>
      </details>

      ${renderManageRitualsFilters(viewModel.filters)}

      <section class="manage-rituals__table-section" aria-label="Imported Ritual records">
        <div class="manage-rituals__table-heading">
          <h3>Imported Ritual records</h3>
          <p>${viewModel.filteredTotal === 1 ? "1 Ritual shown" : `${viewModel.filteredTotal} Rituals shown`}</p>
        </div>
        <div class="manage-rituals__records" role="table" aria-label="Imported Ritual records table">
          <div class="manage-rituals__record-head" role="row">
            <span role="columnheader">Ritual</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Origin</span>
            <span role="columnheader">Direct use</span>
            <span role="columnheader">Recommendation</span>
            <span role="columnheader">Issues</span>
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
                            <div><dt>Why this fits</dt><dd>${escapeHtml(row.ritual.presentation.whyThisFits)}</dd></div>
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
}: {
  action: string;
  value: string;
  label: string;
  description?: string;
}): string {
  return `
    <button
      class="check-in-option"
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
  today: "For today.",
  best_moment_this_week: "Looking across the week.",
};

const timeScopeReviewLabels: Record<RitualCheckInTimeScope, string> = {
  today: "For today",
  best_moment_this_week: "Across the week",
};

const energyAcknowledgements: Record<RitualCheckInEnergyCapacity, string> = {
  barely_any: "Barely any capacity.",
  a_little: "A little capacity.",
  enough_to_engage: "Enough to engage.",
  room_for_something_deeper: "Room for something deeper.",
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
        <div class="check-in-options check-in-options--choice-pair">
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
    });

    return `
      <section class="check-in-step" aria-label="Carrier">
        <h3>Where should the ritual live?</h3>
        <div class="check-in-options">
          ${openOption}
          ${carrierOptions.map((option) => renderCheckInOptionButton({
            action: "carrier",
            value: option.key,
            label: option.label,
            description: option.description,
          })).join("")}
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

function renderRitualEntryPaths(): string {
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
}: {
  draft: RitualCheckInDraft;
  displayName?: string | null;
  introMode?: "returning" | "first_login";
  todaysShapeBrief?: TodaysShapeBrief | null;
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
  const entryPaths = draft.step === "entry_path" ? renderRitualEntryPaths() : "";
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

export function renderSignedInShell(
  privateBriefData: PrivateBriefData,
  options: SignedInShellOptions = {},
): string {
  const activeView = options.activeView ?? "this_week";
  const weeklyBrief = (() => {
    const brief = options.brief ?? generateWeeklyBrief(privateBriefData.input);
    const debugTrace = options.showDebugTrace
      ? renderDeveloperDecision(brief)
      : "";

    return `
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
        ${renderBriefReasoning(brief)}
        <section class="brief__question" aria-label="Question to carry">
          <p class="brief__section-label">Question to carry</p>
          <p class="prompt">${escapeHtml(brief.reflectionPrompt)}</p>
        </section>
        ${renderBriefChoiceDetails(brief.explanation)}
      </section>

      <section class="brief__actions" aria-label="Brief actions">
        <div class="brief__closing-actions">
          <p class="brief__actions-question">How does this feel to you?</p>
          <div class="brief__closing-secondary">
            ${renderFeedbackButton("good", options)}
            <button
              class="quiet-action try-again-button"
              type="button"
              data-feedback-type="try_again"
              data-try-again-action="true"
              aria-pressed="false"${options.savingFeedbackType ? " disabled" : ""}
            >${escapeHtml(options.savingFeedbackType === "try_again" ? "Saving" : feedbackLabels.try_again)}</button>
            <button
              class="quiet-action"
              type="button"
              data-check-in-start-over="true"
            >I want to check in again</button>
          </div>
          ${options.feedbackStatus ? `<p class="muted feedback__status" data-feedback-status="true">${escapeHtml(options.feedbackStatus)}</p>` : ""}
        </div>
        <div class="brief__meta-actions">
          <details class="feedback" aria-label="Feedback">
            <summary>Give feedback</summary>
            <div class="feedback__chips">
              ${BRIEF_FEEDBACK_TYPES.filter((type) => type !== "try_again" && type !== "too_much" && type !== "good").map((type) => renderFeedbackButton(type, options)).join("")}
            </div>
          </details>
        </div>
        ${options.tryAgainStatus ? `<p class="muted feedback__status" data-try-again-status="true">${escapeHtml(options.tryAgainStatus)}</p>` : ""}
      </section>

      ${debugTrace}
    </article>
  `;
  });
  const thisWeekContent = options.chooseWithMeResult
    ? renderChooseWithMeResult(options.chooseWithMeResult)
    : weeklyBrief();
  const profileSettings = renderProfileTuningSection(
    privateBriefData,
    options.activeProfileSettingsTabId,
  );
  const searchRituals = renderSearchRitualsSection({
    query: options.ritualSearchQuery,
    selectedChips: options.selectedRitualSearchChips,
    selectedRitualId: options.selectedRitualId,
    sort: options.ritualSearchSort,
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
