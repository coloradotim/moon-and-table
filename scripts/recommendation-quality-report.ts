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
  "coverage_gap_category_focus_capacity",
  "closest_compatible_pattern_selected",
  "high_capacity_depth_gap",
  "stronger_wrong_category_rejected",
  "recommendation_confidence_limited",
  "contract_request_changes",
  "fragmentary_option_menu_body",
  "title_intention_duplicate_without_depth",
  "why_this_fits_describes_matching_not_meaning",
  "how_chosen_reads_like_system_report",
  "source_lineage_too_raw_or_academic",
  "high_capacity_no_deeper_ritual_shape",
  "audience_only_pronoun_change",
  "normal_copy_rationalizes_mismatch",
  "ritual_body_lacks_activation_or_closure",
  "material_used_as_prop_not_ritual_matter",
  "closest_match_overclaims_fit",
  "coverage_gap_not_disclosed_in_expanded_explanation",
  "coverage_gap_disclosed_as_broken_app_language",
  "timing_led_without_major_event",
  "timing_overrode_explicit_contract",
  "minor_numerology_overweighted",
  "major_timing_event_not_used_for_best_week",
  "resolved_surprise_category_not_preserved",
  "surprise_me_used_as_category_or_style",
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
  sourceSummary: string;
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
  contractStatus?: {
    categorySelectionMode: string;
    expectedCategory?: string;
    resolvedCategory?: string;
    timingAuthority: string;
    categoryPreserved: boolean;
    acceptablePattern: boolean;
    acceptableFamily: boolean;
    blockedPatternAvoided: boolean;
    blockedFamilyAvoided: boolean;
    requiredExplanationPresent: boolean;
    coverageGapExpected: boolean;
    closestCompatiblePatternExpected: boolean;
    reviewVerdict: string;
    reviewReason?: string;
  };
  authoredOutputStatus?: {
    verdict: string;
    matchType: string;
    centralMaterialAction: string;
    ritualFunction: string;
    expectedWarningIds: string[];
    reviewReason?: string;
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

export type RecommendationQualityVerdict = "pass" | "review_required" | "request_changes";

export type RecommendationQualityVerdictCounts = Record<RecommendationQualityVerdict, number>;

export type RecommendationQualityScenarioTrend = {
  id: string;
  selectedPatternKey: string;
  warningIds: RecommendationQualityWarningId[];
  contractVerdict?: RecommendationQualityVerdict;
  authoredOutputVerdict?: RecommendationQualityVerdict;
};

export type RecommendationQualitySummary = {
  generatedAtIso: string;
  scenarioCounts: {
    total: number;
    contract: number;
    authoredOutput: number;
    highCapacity: number;
    bothOfUs: number;
    openPreferenceOrResolvedCategory: number;
  };
  warningCounts: Record<RecommendationQualityWarningId, number>;
  verdictCounts: {
    contract: RecommendationQualityVerdictCounts;
    authoredOutput: RecommendationQualityVerdictCounts;
  };
  selectionDistribution: {
    distinctSelectedPatternCount: number;
    topSelectedPatterns: Array<{ key: string; count: number }>;
    selectedCategoryDistribution: Array<{ key: string; count: number }>;
    selectedRitualFormFamilyDistribution: Array<{ key: string; count: number }>;
    concentrationWarnings: string[];
  };
  scenarios: RecommendationQualityScenarioTrend[];
};

export type RecommendationQualityDelta = {
  baseline: RecommendationQualitySummary;
  current: RecommendationQualitySummary;
  changedSelectedPatterns: Array<{
    id: string;
    before: string;
    after: string;
  }>;
  changedWarnings: Array<{
    id: string;
    before: RecommendationQualityWarningId[];
    after: RecommendationQualityWarningId[];
  }>;
  changedContractStatus: Array<{
    id: string;
    before?: RecommendationQualityVerdict;
    after?: RecommendationQualityVerdict;
  }>;
  changedAuthoredOutputStatus: Array<{
    id: string;
    before?: RecommendationQualityVerdict;
    after?: RecommendationQualityVerdict;
  }>;
  improvedScenarios: string[];
  worsenedScenarios: string[];
  newWarnings: Array<{
    id: RecommendationQualityWarningId;
    before: number;
    after: number;
  }>;
  resolvedWarnings: Array<{
    id: RecommendationQualityWarningId;
    before: number;
    after: number;
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

const CONTRACT_NORMAL_COPY_BLOCKED_PATTERN =
  /\b(held lightly|stronger material form|better fit elsewhere|timing overrode|moon phase overrode|helped point toward|surprise me matched|surprise me ritual|surprise me category)\b/i;

const FRAGMENTARY_OPTION_MENU_PATTERN =
  /\b(?:doorway, window, or table|doorway, table, or bowl|cross or turn away|crossing once or folding|lamp, window light, morning light, or supervised candle|lower, turn from, or extinguish|move the bowl back, leave it empty, or return it)\b/i;

const BROKEN_APP_COVERAGE_GAP_PATTERN =
  /\b(?:sorry|content is limited|the app could not|no ritual available|failed to|cannot produce)\b/i;

const SOURCE_LINEAGE_RAW_OR_ACADEMIC_PATTERN =
  /\b(?:source\.[a-z0-9_.-]+|note\.[a-z0-9_.-]+|sourceReviewIds|sourceNoteIds|NASA says|according to NASA|bibliography|citation)\b/i;

const PROP_OR_DEMYSTIFYING_PATTERN =
  /\b(?:just a visual reminder|only symbolic|just symbolic|decorative prop|productivity reset|works because psychology|psychological cue)\b/i;

const MATCHING_NOT_MEANING_PATTERN =
  /\b(?:matched the selected ritual context|timing shaped the tone|your choice helped point toward|stronger material form|score reason|raw score|exact pattern match)\b/i;

const SYSTEM_REPORT_PATTERN =
  /\b(?:candidate|rejected|score|raw score|exact pattern match|ritual form family matched|selected pattern|approved ritual container|selected ritual context|tradeoff)\b/i;

function normalCopyText(copy: RecommendationQualityCopyFields): string {
  return [
    copy.theme,
    copy.recommendedRitual,
    copy.intention,
    copy.bestWindow,
    copy.optionalAddOn,
    copy.reflectionPrompt,
    copy.whyThisFits,
    copy.sourceSummary,
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
    sourceSummary: brief.sourceSummary,
    howThisWasChosen: brief.explanation.howThisWasChosen.map((section) => ({
      title: section.title,
      body: section.body,
    })),
  };
}

function sentenceCount(value: string): number {
  return value.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length;
}

function normalizeTitleIntention(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleAndIntentionDuplicate(copy: RecommendationQualityCopyFields): boolean {
  const title = normalizeTitleIntention(copy.theme);
  const intention = normalizeTitleIntention(copy.intention);

  return title.length > 0 && title === intention;
}

function startsWithImperative(value: string): boolean {
  const firstWord = value.trim().toLowerCase().match(/^[a-z]+/)?.[0];

  return firstWord ? IMPERATIVE_STARTERS.includes(firstWord as typeof IMPERATIVE_STARTERS[number]) : false;
}

function hasMeaningBridge(value: string): boolean {
  return /\b(prepar|making room|make room|first step|beginning|start|reclaim|threshold|clear room|set up|ready)\b/i.test(value);
}

function hasActivationAndClosure(value: string): boolean {
  return (
    /\b(?:choose|set|stand|place|put|name|speak|write|fold|touch|return|lower|light|turn|empty|rinse)\b/i.test(
      value,
    ) &&
    /\b(?:close|closed|closure|return|returned|leave|left|stop|end|until|tomorrow|back in|empty|rinsed|extinguish|lowered)\b/i.test(
      value,
    )
  );
}

function hasHighCapacityShape(value: string): boolean {
  const ritualSentences = sentenceCount(value);

  return (
    ritualSentences >= 5 &&
    /\b(?:one of you|the other|each|both|write|written|fold|place|return|until tomorrow|next return|through one quiet minute|leave it|back in its ordinary place|close when)\b/i.test(
      value,
    )
  );
}

function hasAudienceStructureInRitualBody(value: string): boolean {
  return /\b(?:one of you|the other|each|both|together|between you|shared)\b/i.test(
    value,
  );
}

function hasCoverageGapDisclosure(copy: RecommendationQualityCopyFields): boolean {
  const expandedText = copy.howThisWasChosen
    .flatMap((section) => [section.title, section.body])
    .join("\n");

  return /\b(?:coverage gap|closest compatible|grimoire does not yet|grimoire is still shallow|strongest compatible|coverage is thin|thin coverage)\b/i.test(
    expandedText,
  );
}

const AUTHORED_OUTPUT_WARNING_MESSAGES: Partial<Record<RecommendationQualityWarningId, string>> = {
  fragmentary_option_menu_body:
    "Ritual body asks the user to choose the core place, action, or closure instead of authoring one path.",
  title_intention_duplicate_without_depth:
    "Title and intention duplicate each other without adding enough ritual depth.",
  why_this_fits_describes_matching_not_meaning:
    "Why this fits describes selection mechanics instead of ritual meaning.",
  how_chosen_reads_like_system_report:
    "How this was chosen reads like a diagnostics report instead of readable secondary explanation.",
  source_lineage_too_raw_or_academic:
    "Source lineage is too raw, academic, or compliance-forward for normal copy.",
  high_capacity_no_deeper_ritual_shape:
    "High capacity does not show a deeper ritual architecture in the body.",
  audience_only_pronoun_change:
    "Both-of-us audience appears in copy but not in an embodied action.",
  ritual_body_lacks_activation_or_closure:
    "Ritual body lacks a clear activation and closure.",
  material_used_as_prop_not_ritual_matter:
    "Material is treated as a reminder, prop, or psychology cue instead of ritual matter.",
  closest_match_overclaims_fit:
    "Closest-compatible output overclaims fit instead of staying modest and accurate.",
  coverage_gap_not_disclosed_in_expanded_explanation:
    "Closest-compatible or coverage-gap scenario does not disclose the gap in expanded explanation.",
  coverage_gap_disclosed_as_broken_app_language:
    "Coverage gap is disclosed in broken-app or apology language.",
};

function warning(id: RecommendationQualityWarningId, message: string): RecommendationQualityWarning {
  return { id, message };
}

function includesAny(value: string, phrases: string[] = []): boolean {
  const lower = value.toLowerCase();

  return phrases.some((phrase) => lower.includes(phrase.toLowerCase()));
}

function hasContractMajorTimingEvidence(args: {
  scenario: Pick<RecommendationQualityScenario, "currentRitualCheckIn">;
  brief?: WeeklyBrief;
  selectedTimingWindow?: { isStrong: boolean; reasonLabels: string[] };
}): boolean {
  if (args.selectedTimingWindow?.isStrong) {
    return true;
  }

  return args.brief?.trace.selectedTimingSignals.some((signal) =>
    signal.strength === "primary" ||
    ["lunation", "solar_season", "calendar_threshold", "planetary_aspect"].includes(
      signal.timingFactType,
    ),
  ) ?? false;
}

export function getRecommendationQualityWarnings(args: {
  scenario: Pick<
    RecommendationQualityScenario,
    "authoredOutput" | "contract" | "currentRitualCheckIn"
  >;
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
        "Surprise me did not resolve to one real visible practice before recommendation.",
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
        "Surprise me resolved to a visible practice, but the selected pattern did not preserve it.",
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

  if (CONTRACT_NORMAL_COPY_BLOCKED_PATTERN.test(allCopy)) {
    warnings.push(
      warning(
        "normal_copy_rationalizes_set_aside",
        "Normal copy appears to smooth over an ignored explicit selection.",
      ),
    );
    warnings.push(
      warning(
        "normal_copy_rationalizes_mismatch",
        "Normal copy rationalizes mismatch instead of naming it honestly in expanded explanation.",
      ),
    );
  }

  if (FRAGMENTARY_OPTION_MENU_PATTERN.test(copy.recommendedRitual)) {
    warnings.push(
      warning(
        "fragmentary_option_menu_body",
        AUTHORED_OUTPUT_WARNING_MESSAGES.fragmentary_option_menu_body!,
      ),
    );
  }

  if (titleAndIntentionDuplicate(copy)) {
    warnings.push(
      warning(
        "title_intention_duplicate_without_depth",
        AUTHORED_OUTPUT_WARNING_MESSAGES.title_intention_duplicate_without_depth!,
      ),
    );
  }

  if (MATCHING_NOT_MEANING_PATTERN.test(copy.whyThisFits)) {
    warnings.push(
      warning(
        "why_this_fits_describes_matching_not_meaning",
        AUTHORED_OUTPUT_WARNING_MESSAGES.why_this_fits_describes_matching_not_meaning!,
      ),
    );
  }

  if (
    copy.howThisWasChosen.some((section) =>
      SYSTEM_REPORT_PATTERN.test(`${section.title}\n${section.body}`),
    )
  ) {
    warnings.push(
      warning(
        "how_chosen_reads_like_system_report",
        AUTHORED_OUTPUT_WARNING_MESSAGES.how_chosen_reads_like_system_report!,
      ),
    );
  }

  if (SOURCE_LINEAGE_RAW_OR_ACADEMIC_PATTERN.test(copy.sourceSummary)) {
    warnings.push(
      warning(
        "source_lineage_too_raw_or_academic",
        AUTHORED_OUTPUT_WARNING_MESSAGES.source_lineage_too_raw_or_academic!,
      ),
    );
  }

  if (
    scenario.currentRitualCheckIn.capacityMode === "high" &&
    !hasHighCapacityShape(copy.recommendedRitual)
  ) {
    warnings.push(
      warning(
        "high_capacity_no_deeper_ritual_shape",
        AUTHORED_OUTPUT_WARNING_MESSAGES.high_capacity_no_deeper_ritual_shape!,
      ),
    );
  }

  if (
    scenario.currentRitualCheckIn.audience === "both_of_us" &&
    !hasAudienceStructureInRitualBody(copy.recommendedRitual)
  ) {
    warnings.push(
      warning(
        "audience_only_pronoun_change",
        AUTHORED_OUTPUT_WARNING_MESSAGES.audience_only_pronoun_change!,
      ),
    );
  }

  if (!hasActivationAndClosure(copy.recommendedRitual)) {
    warnings.push(
      warning(
        "ritual_body_lacks_activation_or_closure",
        AUTHORED_OUTPUT_WARNING_MESSAGES.ritual_body_lacks_activation_or_closure!,
      ),
    );
  }

  if (PROP_OR_DEMYSTIFYING_PATTERN.test(allCopy)) {
    warnings.push(
      warning(
        "material_used_as_prop_not_ritual_matter",
        AUTHORED_OUTPUT_WARNING_MESSAGES.material_used_as_prop_not_ritual_matter!,
      ),
    );
  }

  if (
    (scenario.contract?.coverageGapExpected ||
      scenario.contract?.closestCompatiblePatternExpected ||
      scenario.authoredOutput?.matchType === "closest_compatible_match") &&
    !hasCoverageGapDisclosure(copy)
  ) {
    warnings.push(
      warning(
        "coverage_gap_not_disclosed_in_expanded_explanation",
        AUTHORED_OUTPUT_WARNING_MESSAGES.coverage_gap_not_disclosed_in_expanded_explanation!,
      ),
    );
  }

  if (
    (scenario.contract?.coverageGapExpected ||
      scenario.contract?.closestCompatiblePatternExpected ||
      scenario.authoredOutput?.matchType === "closest_compatible_match") &&
    /\b(?:perfect|exactly fits|everything aligned|strong fit|ideal)\b/i.test(
      copy.whyThisFits,
    )
  ) {
    warnings.push(
      warning(
        "closest_match_overclaims_fit",
        AUTHORED_OUTPUT_WARNING_MESSAGES.closest_match_overclaims_fit!,
      ),
    );
  }

  if (BROKEN_APP_COVERAGE_GAP_PATTERN.test(allCopy)) {
    warnings.push(
      warning(
        "coverage_gap_disclosed_as_broken_app_language",
        AUTHORED_OUTPUT_WARNING_MESSAGES.coverage_gap_disclosed_as_broken_app_language!,
      ),
    );
  }

  if (
    /\bsurprise_me\b/i.test(allCopy) ||
    /\bSurprise me\b/i.test(allCopy) ||
    selectedPatternStyles.includes("surprise_me")
  ) {
    warnings.push(
      warning(
        "surprise_me_used_as_category_or_style",
        "Surprise me appeared as a practice, style, source lineage, or normal-copy ritual family.",
      ),
    );
  }

  if (scenario.contract) {
    const contract = scenario.contract;

    if (includesAny(allCopy, contract.disallowedNormalCopyPhrases)) {
      warnings.push(
        warning(
          "normal_copy_rationalizes_set_aside",
          "Normal copy included a phrase blocked by the scenario contract.",
        ),
      );
      warnings.push(
        warning(
          "normal_copy_rationalizes_mismatch",
          "Normal copy included mismatch-smoothing language blocked by the scenario contract.",
        ),
      );
    }

    if (
      contract.disallowedPatternKeys?.includes(args.brief?.decision.selected.ritualPatternKey ?? "")
    ) {
      warnings.push(
        warning(
          "explicit_category_overridden_without_blocker",
          "Selected pattern is explicitly disallowed by the recommendation contract.",
        ),
      );
    }

    if (
      contract.disallowedRitualFormFamilies?.some((family) =>
        getRitualFormFamilyLabels(selectedFamilies).includes(family),
      )
    ) {
      warnings.push(
        warning(
          "explicit_focus_overridden_without_bridge",
          "Selected ritual form family is explicitly disallowed by the recommendation contract.",
        ),
      );
    }

    if (
      contract.timingAuthority === "must_not_lead" &&
      (args.selectedTimingWindow?.isStrong ||
        args.brief?.decision.inputs.practiceChoice?.status === "set_aside")
    ) {
      warnings.push(
        warning(
          "timing_led_without_major_event",
          "Scenario contract says timing must not lead, but the selected recommendation used major timing authority.",
        ),
      );
    }

    if (
      contract.timingAuthority === "shape_only" &&
      args.brief?.decision.inputs.practiceChoice?.status === "set_aside"
    ) {
      warnings.push(
        warning(
          "timing_overrode_explicit_contract",
          "Shape-only timing appears to have overridden an explicit check-in contract.",
        ),
      );
    }

    if (
      contract.timingAuthority === "may_lead" &&
      scenario.currentRitualCheckIn.timeScope === "best_moment_this_week" &&
      !hasContractMajorTimingEvidence(args)
    ) {
      warnings.push(
        warning(
          "major_timing_event_not_used_for_best_week",
          "Best-week scenario expected a major timing event to be available for timing-led selection.",
        ),
      );
    }

    if (
      args.brief?.decision.inputs.numerology?.status === "matched_selected" &&
      contract.timingAuthority !== "may_lead" &&
      args.brief.decision.inputs.numerology.selectedSignalLabels.length > 0 &&
      args.brief.decision.selected.timingSignalLabels.every((label) =>
        args.brief?.decision.inputs.numerology?.selectedSignalLabels.includes(label),
      )
    ) {
      warnings.push(
        warning(
          "minor_numerology_overweighted",
          "Numerology appears to be the dominant timing reason where the contract allows it only as an accent.",
        ),
      );
    }

    if (contract.coverageGapExpected) {
      warnings.push(
        warning(
          "coverage_gap_category_focus_capacity",
          "Scenario intentionally marks thin category/focus/capacity coverage for human review.",
        ),
      );
      warnings.push(
        warning(
          "recommendation_confidence_limited",
          "Recommendation confidence is limited by the scenario's documented coverage gap.",
        ),
      );

      if (scenario.currentRitualCheckIn.capacityMode === "high") {
        warnings.push(
          warning(
            "high_capacity_depth_gap",
            "High-capacity scenario is served by the closest compatible approved form rather than a fully high-depth pattern.",
          ),
        );
      }
    }

    if (contract.closestCompatiblePatternExpected) {
      warnings.push(
        warning(
          "closest_compatible_pattern_selected",
          "Scenario expects the closest compatible approved pattern rather than a wrong-category higher-polish ritual.",
        ),
      );
      warnings.push(
        warning(
          "stronger_wrong_category_rejected",
          "Scenario expects stronger wrong-category alternatives to stay rejected.",
        ),
      );
    }

    if (contract.reviewVerdict === "request_changes") {
      warnings.push(
        warning(
          "contract_request_changes",
          contract.reviewReason ??
            "Scenario contract marks the selected recommendation as requiring product changes before it should become baseline.",
        ),
      );
    }
  }

  if (scenario.authoredOutput) {
    for (const warningId of scenario.authoredOutput.expectedWarningIds ?? []) {
      warnings.push(
        warning(
          warningId,
          scenario.authoredOutput.reviewReason ??
            AUTHORED_OUTPUT_WARNING_MESSAGES[warningId] ??
            "Authored-output scenario marks this output for human review.",
        ),
      );
    }
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

function getContractStatus(args: {
  scenario: RecommendationQualityScenario;
  brief: WeeklyBrief;
  selectedRitualPatternKey: string;
  selectedRitualFormFamilies: string[];
}): RecommendationQualityScenarioResult["contractStatus"] {
  const { scenario, brief, selectedRitualPatternKey, selectedRitualFormFamilies } = args;
  const contract = scenario.contract;

  if (!contract) {
    return undefined;
  }

  const practiceChoice = brief.decision.inputs.practiceChoice;
  const allCopy = normalCopyText(defaultCopyFields(brief));

  return {
    categorySelectionMode: contract.categorySelectionMode,
    expectedCategory: contract.expectedCategory,
    resolvedCategory: contract.resolvedCategory,
    timingAuthority: contract.timingAuthority,
    categoryPreserved:
      contract.categorySelectionMode === "surprise_me_open_preference"
        ? practiceChoice?.status === "resolved_open_preference" &&
          (practiceChoice.selectedPatternMatches.length > 0 ||
            !contract.resolvedCategory)
        : practiceChoice?.status !== "set_aside",
    acceptablePattern:
      !contract.acceptablePatternKeys ||
      contract.acceptablePatternKeys.includes(selectedRitualPatternKey),
    acceptableFamily:
      !contract.acceptableRitualFormFamilies ||
      selectedRitualFormFamilies.some((family) =>
        contract.acceptableRitualFormFamilies?.includes(family),
      ),
    blockedPatternAvoided:
      !contract.disallowedPatternKeys?.includes(selectedRitualPatternKey),
    blockedFamilyAvoided:
      !contract.disallowedRitualFormFamilies?.some((family) =>
        selectedRitualFormFamilies.includes(family),
      ),
    requiredExplanationPresent:
      !contract.requiredExplanationTerms ||
      contract.requiredExplanationTerms.every((term) =>
        allCopy.toLowerCase().includes(term.toLowerCase()),
      ),
    coverageGapExpected: contract.coverageGapExpected ?? false,
    closestCompatiblePatternExpected:
      contract.closestCompatiblePatternExpected ?? false,
    reviewVerdict: contract.reviewVerdict ?? "pass",
    reviewReason: contract.reviewReason,
  };
}

function getAuthoredOutputStatus(
  scenario: RecommendationQualityScenario,
): RecommendationQualityScenarioResult["authoredOutputStatus"] {
  const authoredOutput = scenario.authoredOutput;

  if (!authoredOutput) {
    return undefined;
  }

  return {
    verdict: authoredOutput.verdict,
    matchType: authoredOutput.matchType,
    centralMaterialAction: authoredOutput.centralMaterialAction,
    ritualFunction: authoredOutput.ritualFunction,
    expectedWarningIds: authoredOutput.expectedWarningIds ?? [],
    reviewReason: authoredOutput.reviewReason,
  };
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
    const selectedRitualFormFamilyLabels =
      getRitualFormFamilyLabels(selectedRitualFormFamilies);
    const expectedRitualFormFamilies = getExpectedRitualFormFamilies(
      scenario.currentRitualCheckIn,
      scenario.currentRitualCheckIn.practiceTypeHints ?? [],
    );
    const howThisWasChosen = (
      brief.explanation.diagnosticHowThisWasChosen ?? brief.explanation.howThisWasChosen
    ).map((section) => ({
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
      selectedRitualFormFamilies: selectedRitualFormFamilyLabels,
      expectedRitualFormFamilies: getRitualFormFamilyLabels(expectedRitualFormFamilies),
      ritualFormFamilyMatched: ritualFormFamiliesMatch(
        selectedRitualFormFamilies,
        expectedRitualFormFamilies,
      ),
      contractStatus: getContractStatus({
        scenario,
        brief,
        selectedRitualPatternKey: brief.decision.selected.ritualPatternKey,
        selectedRitualFormFamilies: selectedRitualFormFamilyLabels,
      }),
      authoredOutputStatus: getAuthoredOutputStatus(scenario),
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

function emptyVerdictCounts(): RecommendationQualityVerdictCounts {
  return {
    pass: 0,
    review_required: 0,
    request_changes: 0,
  };
}

function selectedCategoryForResult(result: RecommendationQualityScenarioResult): string {
  const practiceLabel =
    result.brief.decision.inputs.practiceChoice?.selectedLabel ??
    result.scenario.currentRitualCheckIn.practiceTypeLabel;

  if (!practiceLabel) {
    return "not_asked";
  }

  return practiceLabel.replace(/^Surprise me ->\s*/, "");
}

function scenarioTrend(result: RecommendationQualityScenarioResult): RecommendationQualityScenarioTrend {
  return {
    id: result.scenario.id,
    selectedPatternKey: result.selectedRitualPattern.key,
    warningIds: result.warnings.map((warningItem) => warningItem.id).sort(),
    contractVerdict: result.contractStatus?.reviewVerdict as RecommendationQualityVerdict | undefined,
    authoredOutputVerdict: result.authoredOutputStatus?.verdict as RecommendationQualityVerdict | undefined,
  };
}

function trendSeverity(result: RecommendationQualityScenarioTrend): number {
  const verdictSeverity: Record<RecommendationQualityVerdict, number> = {
    pass: 0,
    review_required: 2,
    request_changes: 4,
  };

  return [
    result.contractVerdict ? verdictSeverity[result.contractVerdict] : 0,
    result.authoredOutputVerdict ? verdictSeverity[result.authoredOutputVerdict] : 0,
    result.warningIds.length,
  ].reduce((total, value) => total + value, 0);
}

function warningSetChanged(
  before: RecommendationQualityWarningId[],
  after: RecommendationQualityWarningId[],
): boolean {
  return before.join("\0") !== after.join("\0");
}

export function createRecommendationQualitySummary(
  report: RecommendationQualityReport,
  options: { generatedAtIso?: string } = {},
): RecommendationQualitySummary {
  const contractVerdicts = emptyVerdictCounts();
  const authoredOutputVerdicts = emptyVerdictCounts();

  for (const result of report.scenarioResults) {
    if (result.contractStatus) {
      contractVerdicts[result.contractStatus.reviewVerdict as RecommendationQualityVerdict] += 1;
    }

    if (result.authoredOutputStatus) {
      authoredOutputVerdicts[result.authoredOutputStatus.verdict as RecommendationQualityVerdict] += 1;
    }
  }

  const selectedFamilyCounts = countBy(
    report.scenarioResults.flatMap((result) => result.selectedRitualFormFamilies),
  );
  const scenarioCount = report.scenarioResults.length;
  const familyConcentrationWarnings = selectedFamilyCounts
    .filter((item) => item.count >= Math.max(8, Math.ceil(scenarioCount * 0.15)))
    .map((item) => `${item.key}: ${item.count}`);

  return {
    generatedAtIso: options.generatedAtIso ?? new Date().toISOString(),
    scenarioCounts: {
      total: report.scenarioCount,
      contract: report.scenarioResults.filter((result) => result.contractStatus).length,
      authoredOutput: report.scenarioResults.filter((result) => result.authoredOutputStatus).length,
      highCapacity: report.scenarioResults.filter(
        (result) => result.scenario.currentRitualCheckIn.capacityMode === "high",
      ).length,
      bothOfUs: report.scenarioResults.filter(
        (result) => result.scenario.currentRitualCheckIn.audience === "both_of_us",
      ).length,
      openPreferenceOrResolvedCategory: report.scenarioResults.filter(
        (result) =>
          result.scenario.contract?.categorySelectionMode === "surprise_me_open_preference" ||
          result.practiceChoiceStatus === "open_preference" ||
          result.practiceChoiceStatus === "resolved_open_preference",
      ).length,
    },
    warningCounts: report.warningCounts,
    verdictCounts: {
      contract: contractVerdicts,
      authoredOutput: authoredOutputVerdicts,
    },
    selectionDistribution: {
      distinctSelectedPatternCount: report.contentHealth.distinctSelectedPatternCount,
      topSelectedPatterns: report.contentHealth.selectedPatternCounts.slice(0, 12),
      selectedCategoryDistribution: countBy(
        report.scenarioResults.map(selectedCategoryForResult),
      ),
      selectedRitualFormFamilyDistribution: selectedFamilyCounts,
      concentrationWarnings: [
        ...report.contentHealth.concentratedSelectedPatterns.map(
          (item) => `selected pattern ${item.key}: ${item.count}`,
        ),
        ...familyConcentrationWarnings.map((item) => `ritual form family ${item}`),
      ],
    },
    scenarios: report.scenarioResults.map(scenarioTrend),
  };
}

export function createRecommendationQualityDelta({
  baseline,
  current,
}: {
  baseline: RecommendationQualitySummary;
  current: RecommendationQualitySummary;
}): RecommendationQualityDelta {
  const baselineById = new Map(baseline.scenarios.map((scenario) => [scenario.id, scenario]));
  const currentById = new Map(current.scenarios.map((scenario) => [scenario.id, scenario]));
  const sharedIds = [...currentById.keys()].filter((id) => baselineById.has(id)).sort();
  const changedSelectedPatterns: RecommendationQualityDelta["changedSelectedPatterns"] = [];
  const changedWarnings: RecommendationQualityDelta["changedWarnings"] = [];
  const changedContractStatus: RecommendationQualityDelta["changedContractStatus"] = [];
  const changedAuthoredOutputStatus: RecommendationQualityDelta["changedAuthoredOutputStatus"] = [];
  const improvedScenarios: string[] = [];
  const worsenedScenarios: string[] = [];

  for (const id of sharedIds) {
    const before = baselineById.get(id)!;
    const after = currentById.get(id)!;

    if (before.selectedPatternKey !== after.selectedPatternKey) {
      changedSelectedPatterns.push({
        id,
        before: before.selectedPatternKey,
        after: after.selectedPatternKey,
      });
    }

    if (warningSetChanged(before.warningIds, after.warningIds)) {
      changedWarnings.push({
        id,
        before: before.warningIds,
        after: after.warningIds,
      });
    }

    if (before.contractVerdict !== after.contractVerdict) {
      changedContractStatus.push({
        id,
        before: before.contractVerdict,
        after: after.contractVerdict,
      });
    }

    if (before.authoredOutputVerdict !== after.authoredOutputVerdict) {
      changedAuthoredOutputStatus.push({
        id,
        before: before.authoredOutputVerdict,
        after: after.authoredOutputVerdict,
      });
    }

    const beforeSeverity = trendSeverity(before);
    const afterSeverity = trendSeverity(after);

    if (afterSeverity < beforeSeverity) {
      improvedScenarios.push(id);
    } else if (afterSeverity > beforeSeverity) {
      worsenedScenarios.push(id);
    }
  }

  return {
    baseline,
    current,
    changedSelectedPatterns,
    changedWarnings,
    changedContractStatus,
    changedAuthoredOutputStatus,
    improvedScenarios,
    worsenedScenarios,
    newWarnings: RECOMMENDATION_QUALITY_WARNING_IDS
      .filter((id) => current.warningCounts[id] > baseline.warningCounts[id])
      .map((id) => ({
        id,
        before: baseline.warningCounts[id],
        after: current.warningCounts[id],
      })),
    resolvedWarnings: RECOMMENDATION_QUALITY_WARNING_IDS
      .filter((id) => current.warningCounts[id] < baseline.warningCounts[id])
      .map((id) => ({
        id,
        before: baseline.warningCounts[id],
        after: current.warningCounts[id],
      })),
  };
}

function formatScoreReason(reason: ScoreReason): string {
  return `${reason.points > 0 ? "+" : ""}${reason.points} ${reason.label}${reason.detail ? ` (${reason.detail})` : ""}`;
}

function deltaValue(before: number, after: number): string {
  return `${before} → ${after}`;
}

function formatDeltaScenarioList(
  values: string[],
  emptyLabel = "none",
): string[] {
  return values.length > 0 ? values.map((value) => `- ${value}`) : [`- ${emptyLabel}`];
}

function formatChangedPatternList(
  values: RecommendationQualityDelta["changedSelectedPatterns"],
): string[] {
  return values.length > 0
    ? values.map((value) => `- ${value.id}: ${value.before} → ${value.after}`)
    : ["- none"];
}

function countAuthoredRequestChanges(summary: RecommendationQualitySummary): number {
  return summary.verdictCounts.authoredOutput.request_changes;
}

export function formatRecommendationQualitySummary(
  summary: RecommendationQualitySummary,
): string {
  return [
    "# Recommendation Quality Summary",
    "",
    `Generated: ${summary.generatedAtIso}`,
    "",
    "## Scenario Counts",
    "",
    `- Total scenarios: ${summary.scenarioCounts.total}`,
    `- Contract scenarios: ${summary.scenarioCounts.contract}`,
    `- Authored-output scenarios: ${summary.scenarioCounts.authoredOutput}`,
    `- High-capacity scenarios: ${summary.scenarioCounts.highCapacity}`,
    `- Both-of-us scenarios: ${summary.scenarioCounts.bothOfUs}`,
    `- Open-preference / resolved-practice scenarios: ${summary.scenarioCounts.openPreferenceOrResolvedCategory}`,
    "",
    "## Verdict Counts",
    "",
    `- Contract pass: ${summary.verdictCounts.contract.pass}`,
    `- Contract review_required: ${summary.verdictCounts.contract.review_required}`,
    `- Contract request_changes: ${summary.verdictCounts.contract.request_changes}`,
    `- Authored pass: ${summary.verdictCounts.authoredOutput.pass}`,
    `- Authored review_required: ${summary.verdictCounts.authoredOutput.review_required}`,
    `- Authored request_changes: ${summary.verdictCounts.authoredOutput.request_changes}`,
    "",
    "## Required Warning Counts",
    "",
    ...[
      "contract_request_changes",
      "fragmentary_option_menu_body",
      "audience_only_pronoun_change",
      "high_capacity_no_deeper_ritual_shape",
      "closest_match_overclaims_fit",
      "coverage_gap_not_disclosed_in_expanded_explanation",
      "coverage_gap_category_focus_capacity",
      "closest_compatible_pattern_selected",
      "recommendation_confidence_limited",
      "timing_overrode_explicit_contract",
      "resolved_surprise_category_not_preserved",
    ].map((id) => `- ${id}: ${summary.warningCounts[id as RecommendationQualityWarningId]}`),
    "",
    "## Selection Distribution",
    "",
    `- Distinct selected patterns: ${summary.selectionDistribution.distinctSelectedPatternCount}`,
    `- Top selected patterns: ${summary.selectionDistribution.topSelectedPatterns.map((item) => `${item.key} (${item.count})`).join(", ") || "none"}`,
    `- Concentration warnings: ${summary.selectionDistribution.concentrationWarnings.join(", ") || "none"}`,
    "",
  ].join("\n");
}

export function formatRecommendationQualityDelta(
  delta: RecommendationQualityDelta,
): string {
  const { baseline, current } = delta;

  return [
    "## Quality delta",
    "",
    `Baseline: ${baseline.generatedAtIso}`,
    `Current: ${current.generatedAtIso}`,
    "",
    "### Summary",
    `- Total scenarios: ${deltaValue(baseline.scenarioCounts.total, current.scenarioCounts.total)}`,
    `- Contract request changes: ${deltaValue(baseline.warningCounts.contract_request_changes, current.warningCounts.contract_request_changes)}`,
    `- Authored request changes: ${deltaValue(countAuthoredRequestChanges(baseline), countAuthoredRequestChanges(current))}`,
    `- Review required: ${deltaValue(
      baseline.verdictCounts.contract.review_required + baseline.verdictCounts.authoredOutput.review_required,
      current.verdictCounts.contract.review_required + current.verdictCounts.authoredOutput.review_required,
    )}`,
    `- High-capacity depth warnings: ${deltaValue(baseline.warningCounts.high_capacity_no_deeper_ritual_shape, current.warningCounts.high_capacity_no_deeper_ritual_shape)}`,
    `- Audience-only warnings: ${deltaValue(baseline.warningCounts.audience_only_pronoun_change, current.warningCounts.audience_only_pronoun_change)}`,
    `- Coverage-gap hidden warnings: ${deltaValue(baseline.warningCounts.coverage_gap_not_disclosed_in_expanded_explanation, current.warningCounts.coverage_gap_not_disclosed_in_expanded_explanation)}`,
    `- Option-menu warnings: ${deltaValue(baseline.warningCounts.fragmentary_option_menu_body, current.warningCounts.fragmentary_option_menu_body)}`,
    `- Distinct selected patterns: ${deltaValue(baseline.selectionDistribution.distinctSelectedPatternCount, current.selectionDistribution.distinctSelectedPatternCount)}`,
    "",
    "### Improved scenarios",
    ...formatDeltaScenarioList(delta.improvedScenarios),
    "",
    "### Worsened scenarios",
    ...formatDeltaScenarioList(delta.worsenedScenarios),
    "",
    "### Changed selected patterns",
    ...formatChangedPatternList(delta.changedSelectedPatterns),
    "",
    "### New warnings",
    ...(delta.newWarnings.length > 0
      ? delta.newWarnings.map((item) => `- ${item.id}: ${item.before} → ${item.after}`)
      : ["- none"]),
    "",
    "### Resolved warnings",
    ...(delta.resolvedWarnings.length > 0
      ? delta.resolvedWarnings.map((item) => `- ${item.id}: ${item.before} → ${item.after}`)
      : ["- none"]),
    "",
    "### Remaining blockers",
    `- Contract request changes: ${current.warningCounts.contract_request_changes}`,
    `- Authored request changes: ${current.verdictCounts.authoredOutput.request_changes}`,
    `- Review required: ${current.verdictCounts.contract.review_required + current.verdictCounts.authoredOutput.review_required}`,
    "",
    "### Diagnostic integrity",
    "- Confirm no warnings were removed by weakening checks rather than improving output.",
    "",
  ].join("\n");
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
    "Authored-output warnings are product review findings, not acceptable baselines. A scenario can be contract-correct and still not be product-ready. In authored-output scenarios, `pass` means good enough to show, not merely coherent.",
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
      ...(scenario.contract
        ? [
            "",
            "Recommendation contract:",
            "",
            `- Practice-selection mode: ${scenario.contract.categorySelectionMode}`,
            `- Expected category: ${scenario.contract.expectedCategory ?? "not pinned"}`,
            `- Resolved practice: ${scenario.contract.resolvedCategory ?? "not applicable"}`,
            `- Expected focus behavior: ${scenario.contract.expectedFocusBehavior}`,
            `- Expected capacity behavior: ${scenario.contract.expectedCapacityBehavior}`,
            `- Expected audience behavior: ${scenario.contract.expectedAudienceBehavior}`,
            `- Timing authority: ${scenario.contract.timingAuthority}`,
            `- Acceptable patterns: ${formatList(scenario.contract.acceptablePatternKeys ?? [])}`,
            `- Acceptable ritual form families: ${formatList(scenario.contract.acceptableRitualFormFamilies ?? [])}`,
            `- Disallowed patterns: ${formatList(scenario.contract.disallowedPatternKeys ?? [])}`,
            `- Disallowed ritual form families: ${formatList(scenario.contract.disallowedRitualFormFamilies ?? [])}`,
            `- Disallowed normal-copy phrases: ${formatList(scenario.contract.disallowedNormalCopyPhrases ?? [])}`,
            `- Expected warning ids: ${formatList(scenario.contract.expectedWarningIds ?? [])}`,
            `- Review verdict: ${scenario.contract.reviewVerdict ?? "pass"}`,
            `- Review reason: ${scenario.contract.reviewReason ?? "none"}`,
            `- Rationale: ${scenario.contract.rationale}`,
          ]
        : []),
      ...(scenario.authoredOutput
        ? [
            "",
            "Authored-output expectation:",
            "",
            `- Verdict: ${scenario.authoredOutput.verdict}`,
            `- Good output should feel like: ${scenario.authoredOutput.goodOutputShouldFeelLike}`,
            `- Central material/action: ${scenario.authoredOutput.centralMaterialAction}`,
            `- Ritual function: ${scenario.authoredOutput.ritualFunction}`,
            `- Timing may do: ${scenario.authoredOutput.timingMayDo}`,
            `- Capacity should change: ${scenario.authoredOutput.capacityShouldChange}`,
            `- Audience should change: ${scenario.authoredOutput.audienceShouldChange}`,
            `- Match type: ${scenario.authoredOutput.matchType}`,
            `- Imperfect-fit disclosure: ${scenario.authoredOutput.imperfectFitDisclosure ?? "not applicable"}`,
            `- Disallowed copy patterns: ${formatList(scenario.authoredOutput.disallowedCopyPatterns)}`,
            `- Expected authored-output warnings: ${formatList(scenario.authoredOutput.expectedWarningIds ?? [])}`,
            `- Review reason: ${scenario.authoredOutput.reviewReason ?? "none"}`,
          ]
        : []),
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
      ...(result.contractStatus
        ? [
            "",
            "Contract status:",
            "",
            `- Category preserved: ${result.contractStatus.categoryPreserved ? "yes" : "no"}`,
            `- Acceptable pattern: ${result.contractStatus.acceptablePattern ? "yes" : "no"}`,
            `- Acceptable family: ${result.contractStatus.acceptableFamily ? "yes" : "no"}`,
            `- Blocked pattern avoided: ${result.contractStatus.blockedPatternAvoided ? "yes" : "no"}`,
            `- Blocked family avoided: ${result.contractStatus.blockedFamilyAvoided ? "yes" : "no"}`,
            `- Required explanation present: ${result.contractStatus.requiredExplanationPresent ? "yes" : "no"}`,
            `- Coverage gap expected: ${result.contractStatus.coverageGapExpected ? "yes" : "no"}`,
            `- Closest compatible expected: ${result.contractStatus.closestCompatiblePatternExpected ? "yes" : "no"}`,
            `- Review verdict: ${result.contractStatus.reviewVerdict}`,
            `- Review reason: ${result.contractStatus.reviewReason ?? "none"}`,
          ]
        : []),
      ...(result.authoredOutputStatus
        ? [
            "",
            "Authored-output status:",
            "",
            `- Verdict: ${result.authoredOutputStatus.verdict}`,
            `- Match type: ${result.authoredOutputStatus.matchType}`,
            `- Central material/action: ${result.authoredOutputStatus.centralMaterialAction}`,
            `- Ritual function: ${result.authoredOutputStatus.ritualFunction}`,
            `- Expected warnings: ${formatList(result.authoredOutputStatus.expectedWarningIds)}`,
            `- Review reason: ${result.authoredOutputStatus.reviewReason ?? "none"}`,
          ]
        : []),
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
