import {
  getApprovedRitualPatterns,
  starterRitualPatterns,
} from "../data/ritual-patterns";
import { seedSymbolicCards } from "../data/seed-symbolic-cards";
import { starterSourceNotes } from "../data/source-registry";
import {
  CAPACITY_MODES,
  generateWeeklyBrief,
  type CapacityMode,
  type GenerateWeeklyBriefInput,
  type WeeklyBrief,
} from "./generate-weekly-brief";
import type { PrivateAudience } from "./private-data-schema";
import type { PrivateProfileSignalInput } from "./private-profile-signals";
import { getEligibleTimingInterpretationRules } from "./timing-interpretation-rules";

export type ContentReachabilityScenario = {
  id: string;
  label: string;
  input: GenerateWeeklyBriefInput;
};

export type ContentReachabilityScenarioResult = {
  id: string;
  label: string;
  dateIso: string;
  capacityMode: CapacityMode;
  audience: PrivateAudience;
  selectedTimingRuleIds: string[];
  selectedTimingSignalLabels: string[];
  computedTimingFactTypes: string[];
  selectedSymbolicCardKeys: string[];
  selectedRitualPatternKey: string;
  evaluatedRitualPatternKeys: string[];
  rejectedRitualPatternKeys: string[];
  sourceReviewIds: string[];
  sourceNoteIds: string[];
};

export type ContentReachabilityReport = {
  scenarioCount: number;
  scenarioResults: ContentReachabilityScenarioResult[];
  coverage: {
    selectedTimingRuleIds: string[];
    computedTimingFactTypes: string[];
    selectedSymbolicCardKeys: string[];
    selectedRitualPatternKeys: string[];
    evaluatedRitualPatternKeys: string[];
    rejectedRitualPatternKeys: string[];
    selectedSourceReviewIds: string[];
    selectedSourceNoteIds: string[];
  };
  gaps: {
    approvedSymbolicCardsNotSelected: string[];
    approvedRitualPatternsNotSelected: string[];
    approvedRitualPatternsNotEvaluated: string[];
    eligibleTimingRulesNotSelected: string[];
    sourceNotesNotSelected: string[];
    sourceNotesNotReferencedByContent: string[];
  };
};

const SAMPLE_DATES = [
  "2026-03-20T12:00:00.000Z",
  "2026-06-03T12:00:00.000Z",
  "2026-06-21T12:00:00.000Z",
  "2026-09-22T12:00:00.000Z",
  "2026-12-21T12:00:00.000Z",
  "2026-07-10T12:00:00.000Z",
] as const;

const CAPACITY_LIMITS: Record<CapacityMode, number> = {
  pause: 0,
  low: 5,
  steady: 20,
  high: 30,
};

const SAMPLE_PROFILE_INPUTS: PrivateProfileSignalInput[] = [
  {
    audience: "person_a",
    label: "Profile A",
    profileThemeKeys: ["private_profile.practical_tending"],
    astrologyProfileThemeKeys: ["private_profile.structured_action"],
    preferredRitualStyles: ["home_tending", "plant_tending"],
    avoidedRitualStyles: ["shopping_required", "long_journaling"],
  },
  {
    audience: "person_b",
    label: "Profile B",
    profileThemeKeys: ["private_profile.beauty_warmth"],
    astrologyProfileThemeKeys: ["private_profile.beauty_warmth"],
    preferredRitualStyles: ["candle_or_light", "kitchen", "gratitude"],
    avoidedRitualStyles: ["heavy_cleanup", "elaborate_setup"],
  },
];

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort();
}

function slugPart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 64);
}

function getBestCapacityModeForPattern(
  capacityModes: CapacityMode[],
  defaultDurationMinutes: number,
): CapacityMode {
  const matchingMode = capacityModes.find((mode) =>
    mode === "pause"
      ? true
      : defaultDurationMinutes <= CAPACITY_LIMITS[mode],
  );

  return matchingMode ?? capacityModes[0] ?? "low";
}

function getAudienceForIndex(index: number): PrivateAudience {
  const audiences: PrivateAudience[] = ["person_a", "person_b", "together", "either"];

  return audiences[index % audiences.length];
}

function getProfileKeysForAudience(
  audience: PrivateAudience,
): GenerateWeeklyBriefInput["privateProfileKeys"] {
  if (audience === "person_b") {
    return ["private_profile.beauty_warmth"];
  }

  if (audience === "together") {
    return [
      "private_profile.practical_tending",
      "private_profile.beauty_warmth",
      "private_profile.structured_action",
    ];
  }

  if (audience === "either") {
    return [
      "private_profile.practical_tending",
      "private_profile.beauty_warmth",
    ];
  }

  return ["private_profile.practical_tending"];
}

export function getDefaultContentReachabilityScenarios(): ContentReachabilityScenario[] {
  const patternScenarios = getApprovedRitualPatterns().map((pattern, index) => {
    const audience = getAudienceForIndex(index);

    return {
      id: `pattern.${pattern.key}`,
      label: `Pattern reachability: ${pattern.title}`,
      input: {
        currentDate: SAMPLE_DATES[index % SAMPLE_DATES.length],
        capacityMode: getBestCapacityModeForPattern(
          pattern.capacityModes,
          pattern.defaultDurationMinutes,
        ),
        audience,
        privateProfileKeys: getProfileKeysForAudience(audience),
        profileInputs: SAMPLE_PROFILE_INPUTS,
        preferredRitualStyles: [
          pattern.key,
          ...pattern.ritualStyles.slice(0, 2),
        ],
        avoidedRitualStyles: ["smoke", "essential_oils"],
      },
    } satisfies ContentReachabilityScenario;
  });

  const timingScenarios: ContentReachabilityScenario[] = SAMPLE_DATES.flatMap(
    (dateIso, index) =>
      CAPACITY_MODES.map((capacityMode) => {
        const audience = getAudienceForIndex(index);

        return {
          id: `timing.${slugPart(dateIso)}.${capacityMode}`,
          label: `Timing reachability: ${dateIso.slice(0, 10)} ${capacityMode}`,
          input: {
            currentDate: dateIso,
            capacityMode,
            audience,
            privateProfileKeys: getProfileKeysForAudience(audience),
            profileInputs: SAMPLE_PROFILE_INPUTS,
            preferredRitualStyles:
              capacityMode === "pause"
                ? ["quiet pause", "rest"]
                : ["home_tending", "kitchen", "plant_tending", "candle_or_light"],
            avoidedRitualStyles: ["shopping_required", "long_journaling"],
          },
        };
      }),
  );

  return [...patternScenarios, ...timingScenarios];
}

function toScenarioResult(
  scenario: ContentReachabilityScenario,
  brief: WeeklyBrief,
): ContentReachabilityScenarioResult {
  return {
    id: scenario.id,
    label: scenario.label,
    dateIso:
      typeof scenario.input.currentDate === "string"
        ? scenario.input.currentDate
        : scenario.input.currentDate?.toISOString() ?? "runtime-current-date",
    capacityMode: brief.trace.capacityMode,
    audience: brief.trace.audience,
    selectedTimingRuleIds: brief.trace.selectedTimingSignals.map(
      (signal) => signal.ruleId,
    ),
    selectedTimingSignalLabels: brief.trace.selectedTimingSignals.map(
      (signal) => signal.signalLabel,
    ),
    computedTimingFactTypes: uniqueSorted(
      brief.trace.computedTimingFacts.map((fact) => fact.type),
    ),
    selectedSymbolicCardKeys: uniqueSorted([
      ...brief.decision.selected.symbolicCardKeys,
      ...brief.trace.selectedTimingSignals.flatMap(
        (signal) => signal.symbolicCardKeys,
      ),
    ]),
    selectedRitualPatternKey: brief.decision.selected.ritualPatternKey,
    evaluatedRitualPatternKeys: brief.decision.candidates.ritualPatterns.map(
      (pattern) => pattern.key,
    ),
    rejectedRitualPatternKeys: brief.decision.rejected.ritualPatterns.map(
      (pattern) => pattern.key,
    ),
    sourceReviewIds: brief.trace.sourceReviewIds,
    sourceNoteIds: brief.trace.sourceNoteIds,
  };
}

function getSourceNotesReferencedByContent(): string[] {
  return uniqueSorted([
    ...seedSymbolicCards.flatMap((card) => card.sourceNoteKeys ?? []),
    ...seedSymbolicCards.flatMap((card) =>
      card.source_references.filter((reference) => reference.startsWith("note.")),
    ),
    ...starterRitualPatterns.flatMap((pattern) => pattern.sourceNoteKeys ?? []),
    ...starterRitualPatterns.flatMap((pattern) =>
      pattern.sourceReferences.filter((reference) => reference.startsWith("note.")),
    ),
    ...getEligibleTimingInterpretationRules().flatMap((rule) =>
      rule.sourceReferences.filter((reference) => reference.startsWith("note.")),
    ),
  ]);
}

export function createContentReachabilityReport(
  scenarios: ContentReachabilityScenario[] = getDefaultContentReachabilityScenarios(),
): ContentReachabilityReport {
  const scenarioResults = scenarios.map((scenario) =>
    toScenarioResult(scenario, generateWeeklyBrief(scenario.input)),
  );
  const selectedTimingRuleIds = uniqueSorted(
    scenarioResults.flatMap((result) => result.selectedTimingRuleIds),
  );
  const computedTimingFactTypes = uniqueSorted(
    scenarioResults.flatMap((result) => result.computedTimingFactTypes),
  );
  const selectedSymbolicCardKeys = uniqueSorted(
    scenarioResults.flatMap((result) => result.selectedSymbolicCardKeys),
  );
  const selectedRitualPatternKeys = uniqueSorted(
    scenarioResults.map((result) => result.selectedRitualPatternKey),
  );
  const evaluatedRitualPatternKeys = uniqueSorted(
    scenarioResults.flatMap((result) => result.evaluatedRitualPatternKeys),
  );
  const rejectedRitualPatternKeys = uniqueSorted(
    scenarioResults.flatMap((result) => result.rejectedRitualPatternKeys),
  );
  const selectedSourceReviewIds = uniqueSorted(
    scenarioResults.flatMap((result) => result.sourceReviewIds),
  );
  const selectedSourceNoteIds = uniqueSorted(
    scenarioResults.flatMap((result) => result.sourceNoteIds),
  );
  const approvedCardKeys = seedSymbolicCards
    .filter((card) => card.approval_status === "approved")
    .map((card) => card.key);
  const approvedPatternKeys = getApprovedRitualPatterns().map(
    (pattern) => pattern.key,
  );
  const eligibleTimingRuleIds = getEligibleTimingInterpretationRules().map(
    (rule) => rule.id,
  );
  const sourceNoteIds = starterSourceNotes.map((note) => note.id);
  const referencedSourceNoteIds = getSourceNotesReferencedByContent();

  return {
    scenarioCount: scenarioResults.length,
    scenarioResults,
    coverage: {
      selectedTimingRuleIds,
      computedTimingFactTypes,
      selectedSymbolicCardKeys,
      selectedRitualPatternKeys,
      evaluatedRitualPatternKeys,
      rejectedRitualPatternKeys,
      selectedSourceReviewIds,
      selectedSourceNoteIds,
    },
    gaps: {
      approvedSymbolicCardsNotSelected: uniqueSorted(
        approvedCardKeys.filter((key) => !selectedSymbolicCardKeys.includes(key)),
      ),
      approvedRitualPatternsNotSelected: uniqueSorted(
        approvedPatternKeys.filter((key) => !selectedRitualPatternKeys.includes(key)),
      ),
      approvedRitualPatternsNotEvaluated: uniqueSorted(
        approvedPatternKeys.filter((key) => !evaluatedRitualPatternKeys.includes(key)),
      ),
      eligibleTimingRulesNotSelected: uniqueSorted(
        eligibleTimingRuleIds.filter((id) => !selectedTimingRuleIds.includes(id)),
      ),
      sourceNotesNotSelected: uniqueSorted(
        sourceNoteIds.filter((id) => !selectedSourceNoteIds.includes(id)),
      ),
      sourceNotesNotReferencedByContent: uniqueSorted(
        sourceNoteIds.filter((id) => !referencedSourceNoteIds.includes(id)),
      ),
    },
  };
}

function formatList(values: string[], emptyLabel = "none"): string {
  if (values.length === 0) {
    return emptyLabel;
  }

  return values.join(", ");
}

export function formatContentReachabilityReport(
  report: ContentReachabilityReport,
): string {
  const lines = [
    "# Content Reachability Diagnostics",
    "",
    `Scenarios sampled: ${report.scenarioCount}`,
    "",
    "## Coverage",
    "",
    `- Computed timing fact types: ${formatList(report.coverage.computedTimingFactTypes)}`,
    `- Selected timing rules: ${report.coverage.selectedTimingRuleIds.length}`,
    `- Selected symbolic cards: ${report.coverage.selectedSymbolicCardKeys.length}`,
    `- Selected ritual patterns: ${report.coverage.selectedRitualPatternKeys.length}`,
    `- Evaluated ritual patterns: ${report.coverage.evaluatedRitualPatternKeys.length}`,
    `- Selected source/doc refs: ${report.coverage.selectedSourceReviewIds.length}`,
    `- Selected source notes: ${report.coverage.selectedSourceNoteIds.length}`,
    "",
    "## Gaps",
    "",
    `- Approved ritual patterns not selected: ${formatList(report.gaps.approvedRitualPatternsNotSelected)}`,
    `- Approved ritual patterns not evaluated: ${formatList(report.gaps.approvedRitualPatternsNotEvaluated)}`,
    `- Approved symbolic cards not selected: ${formatList(report.gaps.approvedSymbolicCardsNotSelected)}`,
    `- Eligible timing rules not selected in sampled scenarios: ${report.gaps.eligibleTimingRulesNotSelected.length}`,
    `- Source notes not selected in sampled scenarios: ${report.gaps.sourceNotesNotSelected.length}`,
    `- Source notes not referenced by cards, rules, or patterns: ${formatList(report.gaps.sourceNotesNotReferencedByContent)}`,
    "",
    "## Selected Ritual Pattern Samples",
    "",
    ...report.scenarioResults.slice(0, 12).map(
      (result) =>
        `- ${result.id}: ${result.selectedRitualPatternKey}; signals: ${formatList(result.selectedTimingSignalLabels)}`,
    ),
  ];

  return lines.join("\n");
}
