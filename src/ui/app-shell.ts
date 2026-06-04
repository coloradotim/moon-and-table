import {
  generateWeeklyBrief,
  type BriefExplanation,
  type BriefSourceSummary,
  type CapacityMode,
  type WeeklyBrief,
} from "../lib/generate-weekly-brief";
import {
  audienceOptions,
  energyCapacityOptions,
  getPracticeOptionsForEnergy,
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
const profileCapacityLabels: Record<CapacityMode, string> = {
  pause: "Barely any",
  low: "A little",
  steady: "Enough to engage",
  high: "Room for something deeper",
};
const ritualSizeChoices = ["five", "twenty", "thirty", "custom"] as const;
const ritualSizeLabels: Record<(typeof ritualSizeChoices)[number], string> = {
  five: "Five minutes or less",
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
  { value: "home_tending", label: "Home tending" },
  { value: "kitchen", label: "Kitchen" },
  { value: "plant_tending", label: "Plants" },
  { value: "candle_or_light", label: "Candle or light" },
  { value: "conversation", label: "Conversation" },
  { value: "reflection", label: "Reflection" },
  { value: "seasonal", label: "Seasonal" },
];
const profileAvoidOptions = [
  { value: "shopping_required", label: "Shopping required" },
  { value: "heavy_cleanup", label: "Heavy cleanup" },
  { value: "long_journaling", label: "Long journaling" },
  { value: "elaborate_setup", label: "Elaborate setup" },
  { value: "emotionally_heavy", label: "Emotionally heavy" },
  { value: "live_flame", label: "Live flame" },
  { value: "smoke", label: "Smoke" },
];
const profileToneOptions = [
  { value: "practical", label: "Practical", description: "Plain, useful, low-fuss." },
  { value: "warm", label: "Warm", description: "Gentle and encouraging." },
  { value: "direct", label: "Direct", description: "Clear, brief, not precious." },
  { value: "symbolic", label: "Symbolic", description: "A little more magical." },
  { value: "playful", label: "Playful", description: "Lighter and less solemn." },
  { value: "romantic", label: "Tender", description: "Soft, affectionate, intimate." },
];

export type SignedInView = "this_week" | "profile_settings" | "how_it_works";

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
  activeProfileSettingsTabId?: string | null;
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

function renderChoiceOptions(
  name: "preferredRitualStyles" | "avoidedRitualStyles",
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

function renderSummaryItem(label: string, value: string): string {
  return `
    <div class="profile-summary__item">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>
  `;
}

function getRitualSizeChoice(minutes: number): (typeof ritualSizeChoices)[number] {
  if (minutes <= 5) {
    return "five";
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

function renderAstrologyProfileNote(settings: ProfileTuningSettings): string {
  const placementCount = settings.natalProfile?.placements.length ?? 0;
  const hasThemeMetadata =
    (settings.profileThemeKeys?.length ?? 0) > 0 ||
    (settings.astrologyProfileThemeKeys?.length ?? 0) > 0;
  const status = placementCount > 0
    ? "loaded privately"
    : hasThemeMetadata
      ? "theme metadata loaded"
      : "not loaded";
  const placements = placementCount > 0
    ? `${placementCount} private placements available`
    : "No private placements available";

  return `${status}. ${placements}.`;
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
        <h3>Defaults</h3>
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
            <small>${escapeHtml(renderAstrologyProfileNote(settings))}</small>
          </label>
        </div>
      </section>

      <section class="profile-settings-block">
        <h3>Long-term fit</h3>
        <fieldset>
          <legend>What usually works</legend>
          <div class="profile-option-list">
            ${renderChoiceOptions("preferredRitualStyles", settings.preferredRitualStyles, profileWorksOptions)}
          </div>
        </fieldset>

        <fieldset>
          <legend>Avoid by default</legend>
          <div class="profile-option-list">
            ${renderChoiceOptions("avoidedRitualStyles", settings.avoidedRitualStyles, profileAvoidOptions)}
          </div>
        </fieldset>
      </section>

      <section class="profile-settings-block">
        <h3>Language</h3>
        <fieldset>
          <legend>How should the recommendation sound?</legend>
          <div class="profile-option-list">
            ${renderChoiceOptions("preferredRitualStyles", settings.preferredRitualStyles, profileToneOptions)}
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
      <div class="profile-settings-panel__header">
        <h3>${escapeHtml(profile.label)}</h3>
        <p class="muted">What is usually true for this profile.</p>
      </div>

      ${renderProfileSettingsForm(profile)}
    </article>
  `;
}

function renderHouseholdSettingsPanel(profiles: ProfileTuningProfile[]): string {
  const loadedProfileLabels = profiles
    .filter((profile) => (profile.settings.natalProfile?.placements.length ?? 0) > 0)
    .map((profile) => profile.label);
  const firstProfile = profiles[0];
  const householdLabels = firstProfile?.settings.audienceLabels;

  return `
    <article class="profile-settings-panel" data-profile-settings-panel="household">
      <div class="profile-settings-panel__header">
        <h3>Household</h3>
        <p class="muted">Shared defaults and household-level fit.</p>
      </div>

      <dl class="profile-summary">
        ${renderSummaryItem("Default audience", householdLabels?.together ?? "Together")}
        ${renderSummaryItem("Usually works well", "Home tending, kitchen, conversation, plants")}
        ${renderSummaryItem("Usually avoid", "Shopping required, elaborate setup, heavy cleanup")}
        ${renderSummaryItem("Private astrology context", loadedProfileLabels.length > 0 ? `${loadedProfileLabels.join(", ")} loaded privately` : "No private placements loaded")}
      </dl>

      <section class="profile-settings-block">
        <h3>Household editing</h3>
        <p class="muted">Household-level editing is separate from personal profile defaults and is not wired to a dedicated Firestore document yet.</p>
      </section>

      <details class="profile-advanced">
        <summary>Advanced tuning</summary>
        <div class="profile-advanced__body">
          <p class="muted">Future household-only exclusions, shared defaults, and diagnostics can live here without crowding the main profile page.</p>
        </div>
      </details>
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
          <p class="label">Profile settings</p>
          <h2>What is usually true?</h2>
        </div>
        <p class="muted">Household settings will appear here when they are available.</p>
      </section>
    `;
  }

  const tabItems = [
    ...profiles.map((profile) => ({ id: profile.id, label: profile.label })),
    { id: "household", label: "Household" },
  ];
  const selectedTabId = tabItems.some((item) => item.id === activeTabId)
    ? activeTabId
    : tabItems[0]?.id;
  const activeProfile = profiles.find((profile) => profile.id === selectedTabId);
  const activePanel = activeProfile
    ? renderProfileSettingsPanel(activeProfile)
    : renderHouseholdSettingsPanel(profiles);

  return `
    <section class="tuning-panel" aria-label="Profile tuning">
      <div>
        <p class="label">Profile settings</p>
        <h2>What is usually true?</h2>
        <p class="muted">Profiles hold long-term defaults. The check-in handles what is true right now.</p>
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

        <p>Moon &amp; Table looks at meaningful timing, symbolic patterns, and the real shape of our lives, then offers one small ritual for the week.</p>

        <p>I&rsquo;ve asked you to do more magic with me, but I&rsquo;ve realized that ask then puts more on you. You have to do research to figure out what&rsquo;s going on from a timing perspective&ndash; lunar phases, planetary motion, numerology, etc&ndash; translate that into meaning, and then find a ritual or some magic that meets the moment. That&rsquo;s a big ask! I realized, then, that I have the skills to help with this.</p>

        <p>So, this app doesn&rsquo;t try to give us ten options or a feed of possibilities. The point is for it to choose one practice with enough care that it feels like it belongs in our lives and to the week. We can ask it to try again, we can give it feedback on how it did, and hopefully we&rsquo;ll make it work for us better every week.</p>

        <h3>What happens under the hood</h3>

        <p>Moon &amp; Table has three separate jobs: calculate facts, interpret meaning, and choose an action.</p>

        <p>The first job is computation. The app calculates timing facts for the current date or for the next several days: lunar phase, lunations, moon sign, sun sign, seasonal markers, planetary signs, retrogrades, major aspects, and numerology values. These are not recommendations. They are raw facts about timing. They tell the app what is happening, not what it means.</p>

        <p>The second job is interpretation. A timing fact becomes useful only if there is an approved symbolic rule or card that knows what to do with it. &ldquo;Full moon&rdquo; is a calculated fact. &ldquo;This may be a moment to notice what has become visible&rdquo; is interpretation. &ldquo;Tend one plant&rdquo; is a ritual action. Those are three different layers, and I want the app to keep them separate.</p>

        <p>The third job is selection. Once the app has timing facts and possible symbolic signals, it looks for approved ritual patterns that match the moment. Then it weighs those patterns against current context: energy and capacity, whether the ritual is for one person or both of us, what kind of practice feels welcome, what the ritual should focus on, our private profile context, and feedback from past recommendations. It does not try to display everything it knows. It chooses a small number of signals and one ritual that actually fits.</p>

        <h3>How timing becomes meaning</h3>

        <p>The timing layer is intentionally literal. It uses computation to determine where the moon, sun, and planets are; whether a lunation or seasonal marker falls today or in the next several days; whether a planet appears retrograde; what major aspects are present; and what the universal numerology values are for the date.</p>

        <p>That layer does not interpret anything by itself. It should never say that a transit means something will happen, or that a number defines the day, or that a planet tells us what we have to do. The timing layer only produces structured facts.</p>

        <p>The interpretation layer is where meaning enters. It maps certain timing facts to approved symbolic signals. A lunar phase might point toward beginning, tending, clarity, release, integration, or rest. A planetary signal might point toward communication, beauty, structure, courage, repair, pressure, or useful adjustment. A numerology signal might add a secondary accent around home, care, motion, completion, or form. But those signals only matter when they are source-backed, approved, and useful for choosing the ritual.</p>

        <p>The private astrology layer adds another kind of timing. The app can look at how current sky timing touches our private natal profiles and shared themes. That does not mean prediction. It does not mean the chart tells us what to do. It means some timing may be more relevant because it resonates with us, with the relationship, or with the kind of ritual we are asking for.</p>

        <p>That restraint is part of the system. The app may calculate many things for today or for the next several days, but most of them should stay in the background. A ritual brief should not become a dump of sky data. It should show the few signals that actually shaped the recommendation.</p>

        <h3>Where the symbolic library comes from</h3>

        <p>The symbolic library is curated. It is not generated freely from the internet.</p>

        <p>The path is source review, then transformed source note, then symbolic card or ritual pattern, then approval. A source note is not copied source text. It is a short, transformed note that records a reviewed idea in a way that can be traced without lifting someone else&rsquo;s language. A symbolic card describes meaning. A ritual pattern describes what to do.</p>

        <p>That distinction matters. A card might say that a waning moon can support clearing, release, or integration. A ritual pattern might say to clear one surface, return one object, make tea, water a plant, or close the evening gently. The app should not invent an action directly from a symbol. It should choose from approved patterns that already have materials, steps, duration, source references, practical notes, and capacity guidance.</p>

        <p>This is how the app avoids becoming vague or sloppy. Meaning is allowed, but it has to be traceable. Practice is allowed, but it has to be reviewed. A ritual does not become eligible just because it sounds beautiful. It has to fit the moment, the context, and the kind of ritual we are actually asking for.</p>

        <h3>How current context changes the answer</h3>

        <p>A recommendation is only useful if it fits the moment we are actually in.</p>

        <p>That is why Moon &amp; Table asks a few questions before choosing. First, it asks whether we want something for today or whether it should look for the best moment this week. If we choose today, it works with current timing. If we choose the best moment this week, it looks ahead for meaningful timing windows instead of pretending that some generic weekday is special.</p>

        <p>Then it asks how much energy or capacity we have:</p>

        <ul>
          <li><strong>Barely any</strong> means the ritual should be almost weightless: a pause, a noticing, or one tiny act.</li>
          <li><strong>A little</strong> means five minutes or less.</li>
          <li><strong>Enough to engage</strong> means there is room for a simple ritual with some attention.</li>
          <li><strong>Room for something deeper</strong> means there may be space for more time, reflection, conversation, or ritual shape.</li>
        </ul>

        <p>If there is very little capacity, the app should not keep asking questions. It should choose something small. If there is more capacity, it can ask whether the ritual is for one of us or both of us, what kind of practice feels welcome, and what the ritual should focus on.</p>

        <p>The ritual focus is important. If we say the ritual should focus on getting grounded, making a beginning, clearing something out, resting, saying something clearly, tending us, tending the home, or marking a threshold, the app should use that. Timing can shape the form, but it should not veto the intention. If we ask for making a beginning during a waning moon, the answer should not be &ldquo;wrong timing.&rdquo; It should be a quieter version of beginning: preparing the ground, naming the first step, or clearing room for what comes next.</p>

        <h3>How it chooses one ritual</h3>

        <p>The generator evaluates candidates rather than simply picking from a list.</p>

        <p>For each brief, the app considers timing signals, symbolic cards, approved ritual patterns, current energy and capacity, audience, practice preferences, ritual focus, private profile themes, natal contacts, avoid flags, and prior feedback. Patterns can be selected, rejected, or scored lower for specific reasons. A pattern might be rejected because it is not approved, does not fit the active capacity mode, takes too long, conflicts with something we&rsquo;ve asked to avoid, or was explicitly excluded because we asked the app to try something else.</p>

        <p>The app keeps a recommendation decision record. That means the choice is inspectable. It records the normalized inputs, selected timing signals, selected natal contacts when they matter, selected cards, selected ritual pattern, evaluated candidates, rejected candidates, score reasons, and source references.</p>

        <p>The normal ritual brief should not show all of that. I do not want the app to feel like a debug screen. But the decision record should exist so we can ask better questions when the recommendation feels wrong. Did it choose this because of lunar timing? Because of the best timing window this week? Because of a natal contact? Because of our current capacity? Because we asked for tending the home or tending us? Because a preferred style matched? If the answer is bad, we can change the card, the pattern, the scoring, the profile, or the feedback.</p>

        <p>That is important to me. If this app is going to work with meaning, it should also be accountable for its choices.</p>

        <h3>What shows up in the ritual brief</h3>

        <p>The ritual brief is the user-facing result of all that work.</p>

        <p>It should show one ritual, not a menu of competing options. It can include an intention, a question to carry, a few selected signals, a short explanation of why the ritual fits, and source details for when we want to look deeper. It can also let us try again or give feedback.</p>

        <p>The brief should reflect the inputs that mattered. If we asked for the best moment this week, it should say what timing window it chose. If we said we barely had capacity, the ritual should be small and the explanation should not pretend otherwise. If we chose tending us or marking a threshold, that should show up in the shape of the ritual and in why it fits.</p>

        <p>The brief should not show every calculation. It should not expose raw trace keys, internal file paths, Firestore details, source ids, or private profile data. The app can use private context without putting all of that context on display. It can calculate more than it says. It can keep technical detail available for debugging without making the ritual feel technical.</p>

        <p>That balance is the point: enough transparency to trust it, not so much machinery that the ritual disappears.</p>

        <h3>How it learns and stays private</h3>

        <p>Feedback is how the app changes with us.</p>

        <p>If a ritual lands, that matters. If it feels too generic, too much, the wrong style, or just not right for the moment, that matters too. &ldquo;Try something else&rdquo; also matters, but it is an action, not just a reaction. It should ask the generator for another approved option using the same check-in context, rather than rewriting the same idea in different words.</p>

        <p>The learning should be gradual. One click should not whiplash the whole system. Over time, feedback can help the app understand which styles, tones, capacities, ritual focuses, timing patterns, and ritual patterns actually fit us.</p>

        <p>The private data stays private. Household profiles, capacity settings, feedback, natal data, and real personal context live in private storage. Local seed files stay local. The repository should only contain generic examples, source reviews, source notes, cards, patterns, tests, and documentation. Real names, real emails, birth data, natal placements tied to people, relationship details, private schedules, service credentials, and private source text do not belong in source control.</p>

        <p>The app can be personal without being exposed.</p>

        <h3>How we can shape it together</h3>

        <p>Moon &amp; Table is not finished, and I do not think it should be treated as fixed.</p>

        <p>We can change the sources. We can add cards. We can remove cards. We can revise ritual patterns. We can adjust the decision rules. We can tune the voice. We can decide that something is too generic, too precious, too clinical, too much, or simply not ours. If a recommendation feels wrong, I want that to be useful information, not a failure.</p>

        <p>There are also things I do not want it to pretend yet. Schedule awareness is one of them. Eventually, it may make sense for the app to understand real availability or preferred ritual windows. But until we design that properly, it should not pretend that Thursday evening is meaningful just because some placeholder logic said so.</p>

        <p>For now, the right next step is simpler: keep using it, notice what lands, notice what does not, and shape it together if it feels worth keeping.</p>

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
        <button type="button" role="menuitem" data-menu-action="this_week" aria-pressed="${thisWeekPressed}">This week</button>
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

export function renderPrivateFirstLoginWelcomeShell(): string {
  return `
    <section class="shell shell--welcome" aria-labelledby="private-welcome-title">
      <article class="private-welcome" aria-label="Welcome">
        <div class="private-welcome__visual" aria-hidden="true">
          <svg viewBox="0 0 220 180" role="img" focusable="false">
            <defs>
              <radialGradient id="welcome-candle-glow" cx="50%" cy="58%" r="58%">
                <stop offset="0%" stop-color="#f7dca7" stop-opacity="0.9" />
                <stop offset="54%" stop-color="#f7dca7" stop-opacity="0.22" />
                <stop offset="100%" stop-color="#f7dca7" stop-opacity="0" />
              </radialGradient>
            </defs>
            <circle cx="110" cy="104" r="78" fill="url(#welcome-candle-glow)" />
            <circle cx="82" cy="52" r="26" fill="#fffdf7" stroke="#26312c" stroke-width="3" />
            <circle cx="92" cy="48" r="27" fill="#f5f1e9" />
            <path d="M111 124c0-17 12-28 12-28s12 11 12 28c0 8-5 14-12 14s-12-6-12-14Z" fill="#d49646" />
            <path d="M119 124c0-8 4-14 4-14s4 6 4 14c0 3-2 5-4 5s-4-2-4-5Z" fill="#fff3cf" />
            <rect x="105" y="136" width="36" height="42" rx="6" fill="#fffdf7" stroke="#26312c" stroke-width="3" />
            <path d="M96 178h52" stroke="#26312c" stroke-linecap="round" stroke-width="3" />
          </svg>
        </div>
        <div class="private-welcome__copy">
          <h1 id="private-welcome-title">Welcome, my love.</h1>
          <p>I built this for us &mdash;<br />a small space for ritual, timing, home,<br />and the quiet ways we keep choosing each other.</p>
          <p>I hope it helps bring us closer together,<br />while we are apart and when we are home.</p>
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
  const acknowledgement =
    draft.step === "review"
      ? undefined
      : draft.ritualFocusText
        ? draft.ritualFocusText
        : draft.ritualFocusLabel
          ? draft.ritualFocusLabel
          : draft.practiceTypeLabel
            ? draft.practiceTypeLabel
            : draft.audience
              ? audienceOptions.find((option) => option.key === draft.audience)?.label
              : draft.energyCapacity
      ? energyAcknowledgements[draft.energyCapacity]
      : draft.timeScope
        ? timeScopeAcknowledgements[draft.timeScope]
        : undefined;

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

  if (draft.step === "practice_type" && draft.energyCapacity) {
    return `
      <section class="check-in-step" aria-label="Practice type">
        <h3>What feels welcome?</h3>
        <div class="check-in-options">
          ${getPracticeOptionsForEnergy(draft.energyCapacity).map((option) => renderCheckInOptionButton({
            action: "practice_type",
            value: option.key,
            label: option.label,
          })).join("")}
        </div>
      </section>
    `;
  }

  if (draft.step === "ritual_focus") {
    return `
      <section class="check-in-step" aria-label="Ritual focus">
        <h3>What intention should this hold?</h3>
        <div class="check-in-options">
          ${ritualFocusOptions.map((option) => renderCheckInOptionButton({
            action: "ritual_focus",
            value: option.key,
            label: option.label,
          })).join("")}
        </div>
      </section>
    `;
  }

  if (draft.step === "ritual_focus_text") {
    return `
      <section class="check-in-step" aria-label="Something else">
        <h3>What intention should this hold?</h3>
        <form class="check-in-text-form" data-check-in-text-form="true">
          <label>
            <span>Something else</span>
            <input
              name="ritualFocusText"
              type="text"
              maxlength="120"
              autocomplete="off"
            />
          </label>
          <button class="primary-action" type="submit">Choose ritual</button>
        </form>
      </section>
    `;
  }

  return "";
}

function renderCheckInBackControl(draft: RitualCheckInDraft): string {
  if (draft.step === "time_scope") {
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

function renderReviewBullets(draft: RitualCheckInDraft): string {
  const timing = draft.timeScope
    ? lowercaseFirst(timeScopeReviewLabels[draft.timeScope])
    : undefined;
  const capacity = draft.energyCapacity
    ? `with ${lowercaseFirst(energyReviewLabels[draft.energyCapacity])} capacity`
    : undefined;
  const audience = draft.audience
    ? draft.audience === "both_of_us"
      ? "for both of you"
      : "for you"
    : undefined;
  const practice = draft.practiceTypeLabel
    ? `with ${lowercaseFirst(draft.practiceTypeLabel)}`
    : undefined;
  const intention = draft.ritualFocusText ?? draft.ritualFocusLabel;
  const intentionPhrase = intention
    ? `holding ${lowercaseFirst(intention)}`
    : undefined;

  return [
    renderReviewBullet(timing),
    renderReviewBullet(audience),
    renderReviewBullet(capacity),
    renderReviewBullet(practice),
    renderReviewBullet(intentionPhrase),
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
}: {
  draft: RitualCheckInDraft;
  displayName?: string | null;
}): string {
  const intro = draft.step === "time_scope"
    ? `
        <header class="check-in__header">
          <p>Welcome back, ${escapeHtml(getFirstName(displayName))}.</p>
        </header>
      `
    : "";

  return `
    <section class="shell shell--check-in" aria-labelledby="app-title">
      <header class="masthead masthead--check-in">
        <div class="masthead__nameplate">
          <h1 id="app-title">Moon &amp; Table</h1>
        </div>
      </header>

      <article class="check-in" aria-label="Ritual check-in">
        ${intro}
        ${renderCheckInBackControl(draft)}
        ${renderCheckInAcknowledgement(draft)}

        ${draft.step === "review" ? renderCheckInReview(draft) : renderCheckInQuestion(draft)}
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
  const brief = options.brief ?? generateWeeklyBrief(privateBriefData.input);
  const capacityMode =
    options.capacityModeOverride ?? brief.trace.capacityMode;
  const debugTrace = options.showDebugTrace ? renderDeveloperDecision(brief) : "";
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
        ${renderBriefReasoning(brief)}
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
          <button
            class="secondary-action"
            type="button"
            data-check-in-start-over="true"
          >Start over</button>
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
  const profileSettings = renderProfileTuningSection(
    privateBriefData,
    options.activeProfileSettingsTabId,
  );
  const howItWorks = renderHowItWorksSection();
  const activeContent =
    activeView === "profile_settings"
      ? profileSettings
      : activeView === "how_it_works"
        ? howItWorks
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
