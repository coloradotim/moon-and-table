import { fileURLToPath } from "node:url";

import { recommendationQualityScenarios, type RecommendationQualityScenario } from "../tests/fixtures/recommendation-quality-scenarios";
import {
  batchOneDemotedRitualPatternKeys,
  batchOneMustSupportCoverage,
  batchOneNiceToHaveStatus,
  batchOneRebuiltPatternKeys,
  batchOneSourceNotes,
  batchOneSourceReviews,
  batchOneTaskDressedPatternKeys,
} from "../src/data/batch-1-ritual-library";
import {
  getApprovedRitualPatterns,
  starterRitualPatterns,
} from "../src/data/ritual-patterns";
import {
  generateWeeklyBrief,
  type ScoreReason,
  type WeeklyBrief,
} from "../src/lib/generate-weekly-brief";
import {
  getExpectedRitualFormFamilies,
  getRitualFormFamiliesForPattern,
  getRitualFormFamilyLabels,
  ritualFormFamiliesMatch,
} from "../src/lib/ritual-form-families";

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
  "missing_presentation_selected",
  "task_dressed_pattern_selected",
  "surprise_me_unresolved",
  "explicit_category_overridden_without_blocker",
  "explicit_focus_overridden_by_timing",
  "explicit_focus_overridden_without_bridge",
  "high_capacity_selected_low_depth_pattern",
  "audience_not_reflected_in_action",
  "normal_copy_rationalizes_set_aside",
  "resolved_surprise_category_not_preserved",
  "duplicate_explanation_section_headings",
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
  selectedRitualFormFamilies: string[];
  expectedRitualFormFamilies: string[];
  ritualFormFamilyMatched: boolean;
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
  contentHealth: RecommendationQualityContentHealth;
};

export type RecommendationQualityContentHealth = {
  approvedPatternCount: number;
  approvedPatternsWithPresentation: string[];
  approvedPatternsWithoutPresentation: string[];
  batchOneSourceReviewIds: string[];
  batchOneSourceNoteIds: string[];
  selectedPatternCounts: Array<{ key: string; count: number }>;
  distinctSelectedPatternCount: number;
  overusedBroadPatterns: Array<{ key: string; count: number }>;
  concentratedSelectedPatterns: Array<{ key: string; count: number }>;
  strongUnselectedPatternKeys: string[];
  sourceCoverage: Array<{
    patternKey: string;
    sourceReviewIds: string[];
    sourceNoteKeys: string[];
  }>;
  categoryCoverage: Array<{
    category: string;
    patternKeys: string[];
  }>;
  weakPatternFlags: Array<{
    key: string;
    status: "active" | "demoted";
    reason: string;
  }>;
  mustSupportGaps: Array<{
    category: string;
    coverage: string;
    status: string;
    patternKeys: string[];
  }>;
  niceToHaveStatus: Array<{
    item: string;
    status: string;
    patternKeys: string[];
    note: string;
  }>;
  demotionList: Array<{
    key: string;
    status: "demoted" | "not_found";
    reason: string;
  }>;
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
  /\b(?:score|scored|points|candidate|candidates|rejected|decision|debug|sourceReferences|ritualPatternKey|selectedPatternKey)\b/i;

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
  const selectedPattern = args.brief
    ? getApprovedRitualPatterns().find(
        (pattern) => pattern.key === args.brief?.decision.selected.ritualPatternKey,
      )
    : undefined;
  const selectedPatternStyles = selectedPattern?.ritualStyles ?? args.selectedRitualPatternStyles ?? [];
  const expectedFamilies =
    args.brief && selectedPattern
      ? getExpectedRitualFormFamilies(
          scenario.currentRitualCheckIn,
          scenario.currentRitualCheckIn.practiceTypeHints ?? [],
        )
      : [];
  const selectedFamilies = selectedPattern
    ? getRitualFormFamiliesForPattern(selectedPattern)
    : [];
  const selectedFamilyMatches = ritualFormFamiliesMatch(
    selectedFamilies,
    expectedFamilies,
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

  if (args.brief) {
    const selectedPattern = getApprovedRitualPatterns().find(
      (pattern) => pattern.key === args.brief?.decision.selected.ritualPatternKey,
    );

    if (!selectedPattern?.presentation) {
      warnings.push(
        warning(
          "missing_presentation_selected",
          "Selected pattern has no RitualPresentation and is using legacy fallback copy.",
        ),
      );
    }
  }

  if (
    args.selectedRitualPatternKey &&
    batchOneTaskDressedPatternKeys.includes(args.selectedRitualPatternKey as never)
  ) {
    warnings.push(
      warning(
        "task_dressed_pattern_selected",
        "Selected pattern is flagged as task-dressed or weak content.",
      ),
    );
  }

  if (
    scenario.currentRitualCheckIn.practiceTypeLabel === "Surprise me" &&
    args.brief?.decision.inputs.practiceChoice?.status !== "resolved_open_preference"
  ) {
    warnings.push(
      warning(
        "surprise_me_unresolved",
        "Surprise me did not resolve to one real visible category before recommendation.",
      ),
    );
  }

  if (args.brief?.decision.inputs.practiceChoice?.status === "set_aside") {
    warnings.push(
      warning(
        "explicit_category_overridden_without_blocker",
        "Explicit practice category was not preserved by the selected ritual.",
      ),
    );
  }

  if (
    args.brief?.decision.inputs.practiceChoice?.status === "resolved_open_preference" &&
    args.brief.decision.inputs.practiceChoice.selectedPatternMatches.length === 0
  ) {
    warnings.push(
      warning(
        "resolved_surprise_category_not_preserved",
        "Surprise me resolved to a real category, but the selected pattern did not preserve it.",
      ),
    );
  }

  if (
    scenario.currentRitualCheckIn.ritualFocusKey &&
    expectedFamilies.length > 0 &&
    !selectedFamilyMatches
  ) {
    warnings.push(
      warning(
        "explicit_focus_overridden_without_bridge",
        "Explicit ritual focus was not preserved by the selected ritual form.",
      ),
    );

    if (
      args.brief?.trace.selectedTimingSignals.some((signal) =>
        ["moon_phase", "lunation", "solar_season", "planet_sign", "planetary_aspect"].includes(
          signal.timingFactType,
        ),
      )
    ) {
      warnings.push(
        warning(
          "explicit_focus_overridden_by_timing",
          "Timing appears to have displaced the explicit ritual focus.",
        ),
      );
    }
  }

  if (
    scenario.currentRitualCheckIn.capacityMode === "high" &&
    selectedPattern &&
    !selectedPattern.capacityModes.includes("high") &&
    !selectedPattern.capacityModes.includes("steady")
  ) {
    warnings.push(
      warning(
        "high_capacity_selected_low_depth_pattern",
        "High capacity selected a pause/low-only pattern instead of a deeper or steady form.",
      ),
    );
  }

  if (
    scenario.currentRitualCheckIn.audience === "both_of_us" &&
    !/\b(both|together|each|between you|one of you|the other|shared|for both of you)\b/i.test(
      copy.recommendedRitual,
    ) &&
    !selectedPatternStyles.some((style) => ["shared_space", "conversation", "table_reset"].includes(style))
  ) {
    warnings.push(
      warning(
        "audience_not_reflected_in_action",
        "Both-of-us selection is not reflected in the ritual action.",
      ),
    );
  }

  if (
    /\b(held lightly|stronger material form|better fit elsewhere|timing overrode|moon phase overrode|helped point toward)\b/i.test(
      allCopy,
    )
  ) {
    warnings.push(
      warning(
        "normal_copy_rationalizes_set_aside",
        "Normal copy appears to smooth over an ignored explicit selection.",
      ),
    );
  }

  const duplicateSectionTitles = copy.howThisWasChosen
    .map((section) => section.title.trim().toLowerCase())
    .filter((title, index, titles) => title && titles.indexOf(title) !== index);

  if (duplicateSectionTitles.length > 0) {
    warnings.push(
      warning(
        "duplicate_explanation_section_headings",
        "How this was chosen contains duplicate normal-copy section headings.",
      ),
    );
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

function countBy(values: string[]): Array<{ key: string; count: number }> {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

function getSourceCoverage() {
  const batchOnePatternKeySet = new Set<string>(batchOneRebuiltPatternKeys);

  return getApprovedRitualPatterns()
    .filter((pattern) => batchOnePatternKeySet.has(pattern.key))
    .map((pattern) => ({
      patternKey: pattern.key,
      sourceReviewIds: pattern.sourceReferences.filter((reference) =>
        reference.startsWith("source."),
      ),
      sourceNoteKeys: pattern.sourceNoteKeys ?? [],
    }));
}

function getCategoryCoverage() {
  const visibleCategoryStyles = [
    { category: "Home", styles: ["home_tending", "threshold_reset", "table_reset"] },
    { category: "Plant", styles: ["plant", "plant_tending"] },
    { category: "Kitchen", styles: ["kitchen"] },
    { category: "Candle or light", styles: ["candle_or_light", "light_focus"] },
    { category: "Reflection", styles: ["reflection", "naming"] },
    { category: "Seasonal", styles: ["seasonal"] },
  ];
  const approvedPatterns = getApprovedRitualPatterns();

  return visibleCategoryStyles.map(({ category, styles }) => ({
    category,
    patternKeys: approvedPatterns
      .filter((pattern) =>
        styles.some((style) => pattern.ritualStyles.includes(style)),
      )
      .map((pattern) => pattern.key)
      .sort(),
  }));
}

function getContentHealth(
  scenarioResults: RecommendationQualityScenarioResult[],
): RecommendationQualityContentHealth {
  const approvedPatterns = getApprovedRitualPatterns();
  const approvedPatternKeys = approvedPatterns.map((pattern) => pattern.key);
  const selectedPatternKeys = scenarioResults.map(
    (result) => result.selectedRitualPattern.key,
  );
  const selectedPatternKeySet = new Set(selectedPatternKeys);
  const selectedPatternCounts = countBy(
    selectedPatternKeys,
  );
  const batchDemotionKeySet = new Set<string>(batchOneDemotedRitualPatternKeys);
  const batchTaskDressedKeySet = new Set<string>(batchOneTaskDressedPatternKeys);
  const broadPatternKeys = new Set(["two_words_at_the_table", "full_light_on_the_table"]);
  const concentrationReviewThreshold = 4;

  return {
    approvedPatternCount: approvedPatterns.length,
    approvedPatternsWithPresentation: approvedPatterns
      .filter((pattern) => pattern.presentation)
      .map((pattern) => pattern.key)
      .sort(),
    approvedPatternsWithoutPresentation: approvedPatterns
      .filter((pattern) => !pattern.presentation)
      .map((pattern) => pattern.key)
      .sort(),
    batchOneSourceReviewIds: batchOneSourceReviews.map((review) => review.id),
    batchOneSourceNoteIds: batchOneSourceNotes.map((note) => note.id),
    selectedPatternCounts,
    distinctSelectedPatternCount: selectedPatternCounts.length,
    overusedBroadPatterns: selectedPatternCounts.filter(
      (item) => broadPatternKeys.has(item.key) && item.count > 3,
    ),
    concentratedSelectedPatterns: selectedPatternCounts.filter(
      (item) => item.count >= concentrationReviewThreshold,
    ),
    strongUnselectedPatternKeys: approvedPatterns
      .filter((pattern) => pattern.presentation)
      .filter((pattern) => getRitualFormFamiliesForPattern(pattern).length > 0)
      .filter((pattern) => !selectedPatternKeySet.has(pattern.key))
      .map((pattern) => pattern.key)
      .sort(),
    sourceCoverage: getSourceCoverage(),
    categoryCoverage: getCategoryCoverage(),
    weakPatternFlags: [
      ...approvedPatternKeys
        .filter((key) => batchTaskDressedKeySet.has(key))
        .map((key) => ({
          key,
          status: "active" as const,
          reason: "Flagged as task-dressed or weak by Batch 1 audit.",
        })),
      ...starterRitualPatterns
        .filter((pattern) => batchDemotionKeySet.has(pattern.key))
        .map((pattern) => ({
          key: pattern.key,
          status: "demoted" as const,
          reason: "Demoted by Batch 1 because a stronger source-backed ritual form replaced it.",
        })),
    ].sort((a, b) => a.key.localeCompare(b.key)),
    mustSupportGaps: batchOneMustSupportCoverage.map((item) => ({
      category: item.category,
      coverage: item.coverage,
      status: item.status,
      patternKeys: [...item.patternKeys],
    })),
    niceToHaveStatus: batchOneNiceToHaveStatus.map((item) => ({
      item: item.item,
      status: item.status,
      patternKeys: [...item.patternKeys],
      note: item.note,
    })),
    demotionList: batchOneDemotedRitualPatternKeys.map((key) => ({
      key,
      status: starterRitualPatterns.some((pattern) => pattern.key === key)
        ? "demoted"
        : "not_found",
      reason: "Rebuilt, merged, hidden, or deferred by Batch 1.",
    })),
  };
}

export function createRecommendationQualityReport(
  scenarios: RecommendationQualityScenario[] = recommendationQualityScenarios,
): RecommendationQualityReport {
  const scenarioResults = scenarios.map((scenario) => {
    const brief = generateWeeklyBrief(scenario.input);
    const selectedPattern = getSelectedPattern(brief);
    const selectedRitualFormFamilies = selectedPattern
      ? getRitualFormFamiliesForPattern(selectedPattern)
      : [];
    const expectedRitualFormFamilies = getExpectedRitualFormFamilies(
      scenario.currentRitualCheckIn,
      scenario.currentRitualCheckIn.practiceTypeHints ?? [],
    );
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
      selectedRitualFormFamilies: getRitualFormFamilyLabels(selectedRitualFormFamilies),
      expectedRitualFormFamilies: getRitualFormFamilyLabels(expectedRitualFormFamilies),
      ritualFormFamilyMatched: ritualFormFamiliesMatch(
        selectedRitualFormFamilies,
        expectedRitualFormFamilies,
      ),
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
    contentHealth: getContentHealth(scenarioResults),
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
    "## Content Health",
    "",
    `- Approved pattern count: ${report.contentHealth.approvedPatternCount}`,
    `- Distinct selected patterns: ${report.contentHealth.distinctSelectedPatternCount}`,
    `- Batch 1 SourceReviews: ${report.contentHealth.batchOneSourceReviewIds.length}`,
    `- Batch 1 SourceNotes: ${report.contentHealth.batchOneSourceNoteIds.length}`,
    "",
    "### RitualPresentation Coverage",
    "",
    `- Approved patterns with presentation (${report.contentHealth.approvedPatternsWithPresentation.length}): ${formatList(report.contentHealth.approvedPatternsWithPresentation)}`,
    `- Approved patterns without presentation (${report.contentHealth.approvedPatternsWithoutPresentation.length}): ${formatList(report.contentHealth.approvedPatternsWithoutPresentation)}`,
    "",
    "### Scenario Selection Diversity",
    "",
    ...report.contentHealth.selectedPatternCounts.map(
      (item) => `- ${item.key}: ${item.count}`,
    ),
    "",
    "### Broad Pattern Concentration",
    "",
    ...(report.contentHealth.overusedBroadPatterns.length > 0
      ? report.contentHealth.overusedBroadPatterns.map(
          (item) => `- ${item.key}: ${item.count}`,
        )
      : ["- none"]),
    "",
    "### Pattern Concentration Review",
    "",
    ...(report.contentHealth.concentratedSelectedPatterns.length > 0
      ? report.contentHealth.concentratedSelectedPatterns.map(
          (item) => `- ${item.key}: ${item.count}`,
        )
      : ["- none"]),
    "",
    "### Strong Patterns Not Selected",
    "",
    `- ${formatList(report.contentHealth.strongUnselectedPatternKeys)}`,
    "",
    "### Batch 1 Source Coverage",
    "",
    `- SourceReviews: ${formatList(report.contentHealth.batchOneSourceReviewIds)}`,
    `- SourceNotes: ${formatList(report.contentHealth.batchOneSourceNoteIds)}`,
    "",
    ...report.contentHealth.sourceCoverage.map(
      (item) =>
        `- ${item.patternKey}: sources=${formatList(item.sourceReviewIds)}; notes=${formatList(item.sourceNoteKeys)}`,
    ),
    "",
    "### Category Coverage",
    "",
    ...report.contentHealth.categoryCoverage.map(
      (item) => `- ${item.category}: ${formatList(item.patternKeys)}`,
    ),
    "",
    "### Must-Support Gaps",
    "",
    ...report.contentHealth.mustSupportGaps.map(
      (item) =>
        `- ${item.category} / ${item.coverage}: ${item.status}; patterns=${formatList(item.patternKeys)}`,
    ),
    "",
    "### Nice-to-Have Status",
    "",
    ...report.contentHealth.niceToHaveStatus.map(
      (item) =>
        `- ${item.item}: ${item.status}; patterns=${formatList(item.patternKeys)}; note=${item.note}`,
    ),
    "",
    "### Weak-Pattern Flags",
    "",
    ...(report.contentHealth.weakPatternFlags.length > 0
      ? report.contentHealth.weakPatternFlags.map(
          (item) => `- ${item.key}: ${item.status}; ${item.reason}`,
        )
      : ["- none"]),
    "",
    "### Demotion List",
    "",
    ...report.contentHealth.demotionList.map(
      (item) => `- ${item.key}: ${item.status}; ${item.reason}`,
    ),
    "",
    "### Timing Honesty Check",
    "",
    "- See scenario warnings for `best_window_reason_too_thin`, `focus_timing_unbridged`, and source/debug leakage.",
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
      `- Selected ritual form family: ${formatList(result.selectedRitualFormFamilies)}`,
      `- Expected ritual form family: ${formatList(result.expectedRitualFormFamilies)}`,
      `- Ritual form family matched: ${result.ritualFormFamilyMatched ? "yes" : "no"}`,
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
