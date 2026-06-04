import { fileURLToPath } from "node:url";

import { recommendationQualityScenarios, type RecommendationQualityScenario } from "../tests/fixtures/recommendation-quality-scenarios";
import {
  generateWeeklyBrief,
  type ScoreReason,
  type WeeklyBrief,
} from "../src/lib/generate-weekly-brief";

export const RECOMMENDATION_QUALITY_WARNING_IDS = [
  "pause_with_imperative_steps",
  "generic_optional_candle",
  "candle_ritual_with_candle_addon",
  "focus_timing_unbridged",
  "raw_score_language_in_user_copy",
  "debug_key_in_user_copy",
  "generic_closing_repeated",
  "carry_prompt_contradicts_focus",
  "best_window_reason_too_thin",
  "source_id_visible_in_normal_copy",
] as const;

export type RecommendationQualityWarningId =
  (typeof RECOMMENDATION_QUALITY_WARNING_IDS)[number];

export type RecommendationQualityWarning = {
  id: RecommendationQualityWarningId;
  message: string;
};

export type RecommendationQualityCopyFields = {
  theme: string;
  recommendedRitual: string;
  intention: string;
  bestWindow: string;
  optionalAddOn: string;
  reflectionPrompt: string;
  whyThisFits: string;
  howThisWasChosen: Array<{ title: string; body: string }>;
};

export type RecommendationQualityScenarioResult = {
  scenario: RecommendationQualityScenario;
  brief: WeeklyBrief;
  selectedRitualPattern: {
    key: string;
    title: string;
  };
  howThisWasChosen: Array<{ title: string; body: string }>;
  selectedTimingSignals: string[];
  selectedTimingWindow?: {
    label: string;
    userWindow: string;
    isStrong: boolean;
    reasonLabels: string[];
  };
  numerologyStatus: string;
  practiceChoiceStatus: string;
  topPositiveScoreReasons: ScoreReason[];
  topRejectedAlternatives: Array<{
    key: string;
    title?: string;
    reasons: ScoreReason[];
  }>;
  warnings: RecommendationQualityWarning[];
};

export type RecommendationQualityReport = {
  scenarioCount: number;
  scenarioResults: RecommendationQualityScenarioResult[];
  warningCounts: Record<RecommendationQualityWarningId, number>;
};

const IMPERATIVE_STARTERS = [
  "choose",
  "clear",
  "close",
  "light",
  "move",
  "name",
  "notice",
  "open",
  "place",
  "put",
  "return",
  "set",
  "stand",
  "take",
  "tend",
  "trim",
  "turn",
  "water",
] as const;

const SOURCE_ID_PATTERN =
  /\b(?:source|note|docs\/source|private_profile|profile_theme|natal_theme|timing_rule|moon|numerology|schedule)\.[a-z0-9_.-]+\b/i;

const DEBUG_KEY_PATTERN =
  /\b(?:score|scored|points|trace|candidate|candidates|rejected|decision|debug|sourceReferences|ritualPatternKey|selectedPatternKey)\b/i;

function normalCopyText(copy: RecommendationQualityCopyFields): string {
  return [
    copy.theme,
    copy.recommendedRitual,
    copy.intention,
    copy.bestWindow,
    copy.optionalAddOn,
    copy.reflectionPrompt,
    copy.whyThisFits,
    ...copy.howThisWasChosen.flatMap((section) => [section.title, section.body]),
  ].join("\n");
}

function defaultCopyFields(brief: WeeklyBrief): RecommendationQualityCopyFields {
  return {
    theme: brief.theme,
    recommendedRitual: brief.recommendedRitual,
    intention: brief.intention,
    bestWindow: brief.bestWindow,
    optionalAddOn: brief.optionalAddOn,
    reflectionPrompt: brief.reflectionPrompt,
    whyThisFits: brief.explanation.whyThisFits,
    howThisWasChosen: brief.explanation.howThisWasChosen.map((section) => ({
      title: section.title,
      body: section.body,
    })),
  };
}

function sentenceCount(value: string): number {
  return value.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length;
}

function startsWithImperative(value: string): boolean {
  const firstWord = value.trim().toLowerCase().match(/^[a-z]+/)?.[0];

  return firstWord ? IMPERATIVE_STARTERS.includes(firstWord as typeof IMPERATIVE_STARTERS[number]) : false;
}

function hasMeaningBridge(value: string): boolean {
  return /\b(prepar|making room|make room|first step|beginning|start|reclaim|threshold|clear room|set up|ready)\b/i.test(value);
}

function warning(id: RecommendationQualityWarningId, message: string): RecommendationQualityWarning {
  return { id, message };
}

export function getRecommendationQualityWarnings(args: {
  scenario: Pick<RecommendationQualityScenario, "currentRitualCheckIn">;
  brief?: WeeklyBrief;
  copy: RecommendationQualityCopyFields;
  selectedRitualPatternKey?: string;
  selectedRitualPatternStyles?: string[];
  selectedTimingWindow?: { isStrong: boolean; reasonLabels: string[] };
}): RecommendationQualityWarning[] {
  const warnings: RecommendationQualityWarning[] = [];
  const { scenario, copy } = args;
  const allCopy = normalCopyText(copy);
  const lowerCopy = allCopy.toLowerCase();
  const ritualLower = copy.recommendedRitual.toLowerCase();
  const optionalLower = copy.optionalAddOn.toLowerCase();
  const isPause = scenario.currentRitualCheckIn.capacityMode === "pause";
  const isCandleOrLight =
    args.selectedRitualPatternKey?.includes("candle") ||
    args.selectedRitualPatternKey?.includes("light") ||
    args.selectedRitualPatternStyles?.some((style) =>
      ["candle_or_light", "light_focus"].includes(style),
    ) ||
    scenario.currentRitualCheckIn.practiceTypeHints?.some((hint) =>
      ["candle_or_light", "light_focus"].includes(hint),
    );
  const focusKey = scenario.currentRitualCheckIn.ritualFocusKey;
  const hasWaningSignal =
    args.brief?.trace.timingFacts.includes("moon.waning") ||
    args.brief?.trace.selectedTimingSignals.some((signal) =>
      signal.signalLabel.toLowerCase().includes("waning"),
    );

  if (
    isPause &&
    (/no required ritual/i.test(copy.recommendedRitual) ||
      /no required ritual/i.test(copy.theme)) &&
    (sentenceCount(copy.recommendedRitual) > 1 || startsWithImperative(copy.recommendedRitual))
  ) {
    warnings.push(
      warning(
        "pause_with_imperative_steps",
        "Pause capacity appears to offer no required ritual while still giving imperative steps.",
      ),
    );
  }

  if (/^(?:optional:\s*)?light a candle if that feels supportive\.?$/i.test(copy.optionalAddOn.trim())) {
    warnings.push(
      warning(
        "generic_optional_candle",
        "Optional add-on is the generic candle fallback.",
      ),
    );
  }

  if (isCandleOrLight && /\blight a candle\b/i.test(copy.optionalAddOn)) {
    warnings.push(
      warning(
        "candle_ritual_with_candle_addon",
        "Candle or light ritual received a redundant candle add-on.",
      ),
    );
  }

  if (
    focusKey === "making_a_beginning" &&
    hasWaningSignal &&
    !hasMeaningBridge([copy.whyThisFits, copy.reflectionPrompt, copy.recommendedRitual].join(" "))
  ) {
    warnings.push(
      warning(
        "focus_timing_unbridged",
        "Making-a-beginning focus under waning timing lacks a preparation or first-step bridge.",
      ),
    );
  }

  if (DEBUG_KEY_PATTERN.test(allCopy)) {
    warnings.push(
      warning(
        "raw_score_language_in_user_copy",
        "User-facing copy appears to include score, debug, or candidate language.",
      ),
    );
  }

  if (SOURCE_ID_PATTERN.test(allCopy)) {
    warnings.push(
      warning(
        "debug_key_in_user_copy",
        "User-facing copy appears to include a raw trace, source, timing, or profile key.",
      ),
    );
  }

  const genericClosingMatches = allCopy.match(/keep it simple and useful/gi) ?? [];
  if (genericClosingMatches.length > 0) {
    warnings.push(
      warning(
        "generic_closing_repeated",
        "`Keep it simple and useful` appears as generic filler.",
      ),
    );
  }

  if (
    focusKey === "making_a_beginning" &&
    /\b(stop feeding|release|let go|clear out|what can .* stop)\b/i.test(copy.reflectionPrompt) &&
    !hasMeaningBridge(copy.reflectionPrompt)
  ) {
    warnings.push(
      warning(
        "carry_prompt_contradicts_focus",
        "Carry prompt leans on release language without bridging the beginning focus.",
      ),
    );
  }

  if (
    scenario.currentRitualCheckIn.timeScope === "best_moment_this_week" &&
    args.selectedTimingWindow?.isStrong &&
    (args.selectedTimingWindow.reasonLabels.length === 0 ||
      !/\b(stood out|because|strong|timing|window|signal|matched)\b/i.test(copy.whyThisFits))
  ) {
    warnings.push(
      warning(
        "best_window_reason_too_thin",
        "Across-week best window appears without a clear reason in the main explanation.",
      ),
    );
  }

  if (SOURCE_ID_PATTERN.test(allCopy) || /\b(?:sourceReviewIds|sourceNoteIds|docs\/)\b/i.test(allCopy)) {
    warnings.push(
      warning(
        "source_id_visible_in_normal_copy",
        "Normal copy appears to expose raw source ids or repository paths.",
      ),
    );
  }

  if (isPause && startsWithImperative(ritualLower) && !/\bpermission|nothing|pause|notice\b/i.test(ritualLower)) {
    warnings.push(
      warning(
        "pause_with_imperative_steps",
        "Pause-capacity ritual begins with an action verb instead of permission or closure.",
      ),
    );
  }

  if (optionalLower.includes("light a candle") && isCandleOrLight) {
    const alreadyWarned = warnings.some((item) => item.id === "candle_ritual_with_candle_addon");
    if (!alreadyWarned) {
      warnings.push(
        warning(
          "candle_ritual_with_candle_addon",
          "Candle/light context repeats candle-lighting as an add-on.",
        ),
      );
    }
  }

  return warnings.filter(
    (item, index, all) =>
      all.findIndex((candidate) => candidate.id === item.id) === index,
  );
}

function getSelectedPattern(brief: WeeklyBrief) {
  return brief.decision.candidates.ritualPatterns.find(
    (pattern) => pattern.key === brief.decision.selected.ritualPatternKey,
  );
}

function getTopPositiveReasons(brief: WeeklyBrief): ScoreReason[] {
  return (
    getSelectedPattern(brief)?.scoreReasons
      .filter((reason) => reason.points > 0)
      .sort((a, b) => b.points - a.points || a.label.localeCompare(b.label))
      .slice(0, 5) ?? []
  );
}

function getTopRejectedAlternatives(brief: WeeklyBrief) {
  return brief.decision.rejected.ritualPatterns
    .filter((candidate) => candidate.reasons.length > 0)
    .slice(0, 5)
    .map((candidate) => ({
      key: candidate.key,
      title: candidate.title,
      reasons: candidate.reasons.slice(0, 3),
    }));
}

export function createRecommendationQualityReport(
  scenarios: RecommendationQualityScenario[] = recommendationQualityScenarios,
): RecommendationQualityReport {
  const scenarioResults = scenarios.map((scenario) => {
    const brief = generateWeeklyBrief(scenario.input);
    const selectedPattern = getSelectedPattern(brief);
    const howThisWasChosen = brief.explanation.howThisWasChosen.map((section) => ({
      title: section.title,
      body: section.body,
    }));
    const warnings = getRecommendationQualityWarnings({
      scenario,
      brief,
      copy: defaultCopyFields(brief),
      selectedRitualPatternKey: brief.decision.selected.ritualPatternKey,
      selectedRitualPatternStyles: selectedPattern?.ritualStyles,
      selectedTimingWindow: brief.decision.inputs.selectedTimingWindow,
    });

    return {
      scenario,
      brief,
      selectedRitualPattern: {
        key: brief.decision.selected.ritualPatternKey,
        title: selectedPattern?.title ?? brief.decision.selected.ritualPatternKey,
      },
      howThisWasChosen,
      selectedTimingSignals: brief.decision.selected.timingSignalLabels,
      selectedTimingWindow: brief.decision.inputs.selectedTimingWindow
        ? {
            label: brief.decision.inputs.selectedTimingWindow.label,
            userWindow: brief.decision.inputs.selectedTimingWindow.userWindow,
            isStrong: brief.decision.inputs.selectedTimingWindow.isStrong,
            reasonLabels: brief.decision.inputs.selectedTimingWindow.reasonLabels,
          }
        : undefined,
      numerologyStatus: brief.decision.inputs.numerology?.status ?? "missing",
      practiceChoiceStatus: brief.decision.inputs.practiceChoice?.status ?? "missing",
      topPositiveScoreReasons: getTopPositiveReasons(brief),
      topRejectedAlternatives: getTopRejectedAlternatives(brief),
      warnings,
    } satisfies RecommendationQualityScenarioResult;
  });
  const warningCounts = Object.fromEntries(
    RECOMMENDATION_QUALITY_WARNING_IDS.map((id) => [
      id,
      scenarioResults.filter((result) =>
        result.warnings.some((warningItem) => warningItem.id === id),
      ).length,
    ]),
  ) as Record<RecommendationQualityWarningId, number>;

  return {
    scenarioCount: scenarioResults.length,
    scenarioResults,
    warningCounts,
  };
}

function formatList(values: string[], emptyLabel = "none"): string {
  return values.length > 0 ? values.join(", ") : emptyLabel;
}

function formatScoreReason(reason: ScoreReason): string {
  return `${reason.points > 0 ? "+" : ""}${reason.points} ${reason.label}${reason.detail ? ` (${reason.detail})` : ""}`;
}

function markdownEscape(value: string): string {
  return value.replace(/\n{3,}/g, "\n\n").trim();
}

export function formatRecommendationQualityReport(
  report: RecommendationQualityReport,
): string {
  const lines: string[] = [
    "# Recommendation Quality Scenario Report",
    "",
    "This report is a review bench. Warnings are prompts for human review, not proof that a recommendation is bad.",
    "",
    `Scenarios sampled: ${report.scenarioCount}`,
    "",
    "## Warning Counts",
    "",
    ...RECOMMENDATION_QUALITY_WARNING_IDS.map(
      (id) => `- ${id}: ${report.warningCounts[id]}`,
    ),
    "",
    "## Scenarios",
  ];

  for (const result of report.scenarioResults) {
    const { scenario, brief } = result;

    lines.push(
      "",
      `### ${scenario.id}: ${scenario.title}`,
      "",
      `Purpose: ${scenario.purpose}`,
      "",
      "Input summary:",
      "",
      `- Date: ${scenario.currentDate}`,
      `- Time scope: ${scenario.currentRitualCheckIn.timeScope}`,
      `- Energy/capacity: ${scenario.currentRitualCheckIn.energyCapacity} / ${scenario.currentRitualCheckIn.capacityMode}`,
      `- Audience: ${scenario.currentRitualCheckIn.audience ?? "not set"}`,
      `- Practice: ${scenario.currentRitualCheckIn.practiceTypeLabel ?? "not asked"}`,
      `- Focus: ${scenario.currentRitualCheckIn.ritualFocusLabel ?? "not set"}`,
      `- Expected qualities: ${formatList(scenario.expectedQualities)}`,
      `- Disallowed outcomes: ${formatList(scenario.disallowedOutcomes)}`,
      "",
      "Generated recommendation:",
      "",
      `- Selected ritual pattern: ${result.selectedRitualPattern.key} / ${result.selectedRitualPattern.title}`,
      `- Theme/title: ${brief.theme}`,
      `- Recommended ritual: ${brief.recommendedRitual}`,
      `- Intention: ${brief.intention}`,
      `- Best window: ${brief.bestWindow}`,
      `- Optional add-on: ${brief.optionalAddOn || "none"}`,
      `- Reflection/carry prompt: ${brief.reflectionPrompt}`,
      `- Why this fits: ${brief.explanation.whyThisFits}`,
      "",
      "How this was chosen:",
      "",
      ...result.howThisWasChosen.flatMap((section) => [
        `- ${section.title}: ${markdownEscape(section.body)}`,
      ]),
      "",
      "Signals and diagnostics:",
      "",
      `- Selected timing signals: ${formatList(result.selectedTimingSignals)}`,
      `- Selected timing window: ${
        result.selectedTimingWindow
          ? `${result.selectedTimingWindow.label}; ${result.selectedTimingWindow.userWindow}; strong=${result.selectedTimingWindow.isStrong}; reasons=${formatList(result.selectedTimingWindow.reasonLabels)}`
          : "none"
      }`,
      `- Numerology diagnostic status: ${result.numerologyStatus}`,
      `- Practice-choice diagnostic status: ${result.practiceChoiceStatus}`,
      "",
      "Top positive score reasons:",
      "",
      ...(result.topPositiveScoreReasons.length > 0
        ? result.topPositiveScoreReasons.map((reason) => `- ${formatScoreReason(reason)}`)
        : ["- none"]),
      "",
      "Top rejected near alternatives:",
      "",
      ...(result.topRejectedAlternatives.length > 0
        ? result.topRejectedAlternatives.map(
            (candidate) =>
              `- ${candidate.key}${candidate.title ? ` / ${candidate.title}` : ""}: ${candidate.reasons.map(formatScoreReason).join("; ")}`,
          )
        : ["- none"]),
      "",
      "Automatic warnings:",
      "",
      ...(result.warnings.length > 0
        ? result.warnings.map((warningItem) => `- ${warningItem.id}: ${warningItem.message}`)
        : ["- none"]),
      "",
      scenario.humanReviewNotes,
    );
  }

  return `${lines.join("\n")}\n`;
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const report = createRecommendationQualityReport();

  console.log(formatRecommendationQualityReport(report));
}
