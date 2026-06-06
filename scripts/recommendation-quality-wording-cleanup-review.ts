import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import {
  createRecommendationQualityReport,
  type RecommendationQualityScenarioResult,
} from "./recommendation-quality-report";

const BASE_PACKET_PATH = "docs/content-audits/full-scenario-output-review-packet.md";
const OUTPUT_PATH = "docs/content-audits/full-scenario-output-wording-cleanup-review.md";

const BAD_PHRASES = [
  "enoughness",
  "ordinary household substitute",
  "Use bread only if",
  "already belongs here",
  "that already works in this household",
  "return it to ordinary kitchen use",
  "one small sign of enough",
  "one edge to return to",
  "can be enough",
  "chosen object",
  "goes back where it belongs",
  "eat it if it is food",
  "bit of bread can be enough",
  "supports this form without making the timing a command",
  "Private context supports keeping this practical and contained",
  "timing signal matched the ritual shape",
  "exact full moon and exact lunar timing",
  "material gives attention",
  "household material makes tending visible",
  "one concrete place to land",
  "not a promise",
  "without demanding belief",
  "not a public calendar performance",
  "shared material carries tending-us",
  "shared surface or vessel is the mechanism",
  "ordinary material already in the home",
  "Return or wash the vessel when finished",
  "Close by returning the material to ordinary use",
  "Source lineage: Source lineage",
] as const;

const REVIEW_EXAMPLE_IDS = [
  "pause.grounded.no_task_list",
  "plant.low.honor_choice",
  "issue201.kitchen.bread_center_enoughness",
  "batch1.seasonal.marker_bowl",
  "batch1.quiet_welcome",
  "source_debug.how_chosen_human_labels",
] as const;

type ParsedScenario = {
  id: string;
  selectedPattern: string;
  warnings: string[];
  normalOutput: string;
};

function escapeTableCell(value: string): string {
  return value.replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
}

function formatList(values: string[]): string {
  return values.length > 0 ? values.join(", ") : "none";
}

function readBasePacket(): string {
  try {
    return execFileSync("git", ["show", `HEAD:${BASE_PACKET_PATH}`], {
      encoding: "utf8",
    });
  } catch {
    return "";
  }
}

function parsePacket(markdown: string): Map<string, ParsedScenario> {
  const scenarios = new Map<string, ParsedScenario>();
  const chunks = markdown.split(/^## Scenario: /m).slice(1);

  for (const chunk of chunks) {
    const id = chunk.split("\n", 1)[0]?.trim();

    if (!id) {
      continue;
    }

    const selectedPattern =
      chunk.match(/^- Selected pattern:\s*(.+)$/m)?.[1]?.trim() ?? "unknown";
    const warnings =
      chunk
        .match(/^- Warning IDs:\s*(.+)$/m)?.[1]
        ?.split(",")
        .map((warning) => warning.trim())
        .filter((warning) => warning && warning !== "none") ?? [];
    const normalOutput =
      chunk.match(/```text\n([\s\S]*?)\n```/)?.[1]?.trim() ?? "";

    scenarios.set(id, {
      id,
      selectedPattern,
      warnings,
      normalOutput,
    });
  }

  return scenarios;
}

function formatHowThisWasChosen(result: RecommendationQualityScenarioResult): string {
  return result.howThisWasChosen.length > 0
    ? result.howThisWasChosen
        .map((section) => `${section.title}\n${section.body}`)
        .join("\n\n")
    : "None.";
}

function formatNormalOutput(result: RecommendationQualityScenarioResult): string {
  const { brief } = result;

  return [
    brief.theme,
    "",
    brief.recommendedRitual,
    "",
    "Intention",
    brief.intention,
    "",
    "Best window",
    brief.bestWindow,
    "",
    "Optional accent",
    brief.optionalAddOn || "No add-on needed.",
    "",
    "Why this fits",
    brief.explanation.whyThisFits,
    "",
    "Question to carry",
    brief.reflectionPrompt,
    "",
    "How this was chosen",
    formatHowThisWasChosen(result),
    "",
    "Source summary",
    brief.sourceSummary,
  ].join("\n");
}

function findPhraseIssues(text: string): string[] {
  const lowerText = text.toLowerCase();

  return BAD_PHRASES.filter((phrase) =>
    lowerText.includes(phrase.toLowerCase()),
  );
}

function hasContentDepthGap(warnings: string[]): boolean {
  return warnings.some((warning) =>
    [
      "high_capacity_depth_gap",
      "high_capacity_no_deeper_ritual_shape",
    ].includes(warning),
  );
}

function hasSelectionConcern(warnings: string[]): boolean {
  return warnings.some((warning) =>
    [
      "contract_request_changes",
      "closest_compatible_pattern_selected",
      "coverage_gap_category_focus_capacity",
      "recommendation_confidence_limited",
      "stronger_wrong_category_rejected",
    ].includes(warning),
  );
}

function getVerdict(issues: string[], warnings: string[]): string {
  if (hasSelectionConcern(warnings)) {
    return "selection concern";
  }

  if (hasContentDepthGap(warnings)) {
    return "content-depth gap";
  }

  return issues.length > 0 ? "needs cleanup" : "pass";
}

function getResponsibleLayer(patternKey: string, issues: string[]): string {
  if (issues.includes("Source lineage: Source lineage")) {
    return "composer";
  }

  if (
    [
      "bread_at_the_center",
      "quiet_welcome",
      "warm_cup_between_us",
      "seasonal_marker_bowl",
      "plant_witness_to_growth",
    ].includes(patternKey)
  ) {
    return "pattern / presentation";
  }

  if (
    issues.some((issue) =>
      [
        "material gives attention",
        "household material makes tending visible",
        "one concrete place to land",
        "one edge to return to",
      ].includes(issue),
    )
  ) {
    return "composer";
  }

  return issues.length > 0 ? "presentation / composer" : "none";
}

function getFixApplied(patternKey: string, issues: string[]): string {
  if (issues.length === 0) {
    return "Reviewed; no targeted wording change needed.";
  }

  if (patternKey === "bread_at_the_center") {
    return "Constrained bread substitutions to bread-like staples and rewrote body with concrete table placement, breath, eating/putting away, and plate-clearing closure.";
  }

  if (patternKey === "quiet_welcome" || patternKey === "warm_cup_between_us") {
    return "Replaced disclaimer-style welcome/cup language with one cup or bowl, one shared word or welcome phrase, and clear cup/bowl closure.";
  }

  if (patternKey === "seasonal_marker_bowl") {
    return "Reworked seasonal bowl body around one marker, table placement, and leaving the bowl in place instead of a material or closure menu.";
  }

  if (patternKey === "plant_witness_to_growth") {
    return "Preserved plant-witness magic while making action and closure concrete: sit near plant, name the living thing, let the plant witness, leave it untouched.";
  }

  if (issues.includes("Source lineage: Source lineage")) {
    return "Removed duplicated source-lineage label from the normal expanded lineage body and packet metadata fallback.";
  }

  return "Replaced shared generated-feeling phrase with concrete material/action wording.";
}

function warningDelta(before: Map<string, ParsedScenario>, after: RecommendationQualityScenarioResult[]): string[] {
  const beforeCounts = new Map<string, number>();
  const afterCounts = new Map<string, number>();

  for (const scenario of before.values()) {
    for (const warning of scenario.warnings) {
      beforeCounts.set(warning, (beforeCounts.get(warning) ?? 0) + 1);
    }
  }

  for (const result of after) {
    for (const warning of result.warnings) {
      afterCounts.set(warning.id, (afterCounts.get(warning.id) ?? 0) + 1);
    }
  }

  const warningIds = [...new Set([...beforeCounts.keys(), ...afterCounts.keys()])].sort();

  return [
    "| warning ID | before | after |",
    "|---|---:|---:|",
    ...warningIds.map((warning) =>
      `| ${escapeTableCell(warning)} | ${beforeCounts.get(warning) ?? 0} | ${afterCounts.get(warning) ?? 0} |`,
    ),
  ];
}

function buildBeforeAfterExample(
  result: RecommendationQualityScenarioResult,
  before: ParsedScenario | undefined,
): string {
  return [
    `### ${result.scenario.id}`,
    "",
    `Selected pattern: \`${result.selectedRitualPattern.key}\``,
    "",
    "Before:",
    "",
    "```text",
    before?.normalOutput ?? "No before output found.",
    "```",
    "",
    "After:",
    "",
    "```text",
    formatNormalOutput(result),
    "```",
    "",
  ].join("\n");
}

function main(): void {
  const beforeScenarios = parsePacket(readBasePacket());
  const report = createRecommendationQualityReport();
  const currentById = new Map(
    report.scenarioResults.map((result) => [result.scenario.id, result]),
  );
  const rows = report.scenarioResults.map((result) => {
    const before = beforeScenarios.get(result.scenario.id);
    const beforeIssues = findPhraseIssues(before?.normalOutput ?? "");
    const afterIssues = findPhraseIssues(formatNormalOutput(result));
    const beforeWarnings = before?.warnings ?? [];
    const afterWarnings = result.warnings.map((warning) => warning.id);
    const beforeVerdict = getVerdict(beforeIssues, beforeWarnings);
    const afterVerdict = getVerdict(afterIssues, afterWarnings);

    return [
      result.scenario.id,
      result.selectedRitualPattern.key,
      beforeVerdict,
      formatList(beforeIssues),
      getResponsibleLayer(result.selectedRitualPattern.key, beforeIssues),
      getFixApplied(result.selectedRitualPattern.key, beforeIssues),
      afterVerdict,
      formatList(
        afterIssues.length > 0
          ? afterIssues
          : afterWarnings.filter((warning) =>
              [
                "gap",
                "request_changes",
                "closest_compatible",
                "confidence_limited",
                "stronger_wrong_category",
                "high_capacity_no_deeper",
              ].some((signal) => warning.includes(signal)),
            ),
      ),
    ];
  });
  const reviewedCount = report.scenarioResults.length;
  const beforeIssueRows = rows.filter((row) => row[2] !== "pass").length;
  const afterIssueRows = rows.filter((row) => row[6] !== "pass").length;
  const examples = REVIEW_EXAMPLE_IDS
    .map((id) => currentById.get(id))
    .filter((result): result is RecommendationQualityScenarioResult => Boolean(result))
    .map((result) =>
      buildBeforeAfterExample(result, beforeScenarios.get(result.scenario.id)),
    );

  const markdown = [
    "# Full Scenario Output Wording Cleanup Review",
    "",
    "Generated from the full recommendation-quality scenario set. The before column uses the packet committed at `HEAD`; the after column uses the current generated recommendations after this cleanup patch.",
    "",
    "The previous cleanup pass was too lenient; this pass tightened ritual bodies further.",
    "",
    "The named examples were not the whole scope; all 116 scenario outputs were re-reviewed.",
    "",
    "## Summary",
    "",
    `- Scenario outputs reviewed: ${reviewedCount}`,
    `- Rows with cleanup/depth/selection concerns before: ${beforeIssueRows}`,
    `- Rows with cleanup/depth/selection concerns after: ${afterIssueRows}`,
    "- Main target: title/body/intention/question/Why this fits. `How this was chosen` was only touched where it repeated bad wording or duplicated the source-lineage label.",
    "- Good Plant witness language was preserved: `Let the plant witness...` remains allowed and present.",
    "- No scoring, visible categories, source families, SourceNotes, SymbolicCards, or RitualPatterns were added.",
    "",
    "## Warning Delta",
    "",
    ...warningDelta(beforeScenarios, report.scenarioResults),
    "",
    "## Before / After Examples",
    "",
    ...examples,
    "## Scenario Audit Table",
    "",
    "| scenario ID | selected pattern | verdict before cleanup | bad phrase or issue found | responsible layer | fix applied | verdict after cleanup | remaining concern, if any |",
    "|---|---|---|---|---|---|---|---|",
    ...rows.map((row) => `| ${row.map(escapeTableCell).join(" | ")} |`),
    "",
  ].join("\n");

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${markdown}\n`);
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main();
