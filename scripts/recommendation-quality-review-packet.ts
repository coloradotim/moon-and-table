import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { getApprovedRitualPatterns } from "../src/data/ritual-patterns";
import type { RitualSafetyFlags } from "../src/lib/ritual-safety";
import { recommendationQualityScenarios } from "../tests/fixtures/recommendation-quality-scenarios";
import {
  createRecommendationQualityReport,
  type RecommendationQualityScenarioResult,
} from "./recommendation-quality-report";

const OUTPUT_PATH = "docs/content-audits/full-scenario-output-review-packet.md";

const SUSPICIOUS_PHRASES = [
  "enoughness",
  "ordinary substitute",
  "ordinary household substitute",
  "already belongs here",
  "Use bread only if",
  "that already works in this household",
  "return it to ordinary kitchen use",
  "returned to ordinary use",
  "ordinary use",
  "ordinary place",
  "one small sign of enough",
  "one edge to return to",
  "Source lineage: Source lineage",
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
  "one settled pause",
  "held lightly",
  "stronger material form",
  "helped point toward",
  "matched the selected ritual context",
  "timing shaped the tone",
  "exact pattern match",
  "best available match",
  "coverage gap",
  "the app could not",
  "set aside",
  "not a promise",
  "ordinary object",
  "substitute",
  "if it already",
  "release as rest",
  "cleansing",
  "protection",
  "healing",
  "prosperity",
  "manifestation",
  "charge",
  "purify",
  "banish",
] as const;

function formatList(values: string[]): string {
  return values.length > 0 ? values.join(", ") : "none";
}

function stripSourceLineagePrefix(value: string): string {
  return value.replace(/^Source lineage:\s*/i, "").trim();
}

function escapeTableCell(value: string): string {
  return value.replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
}

function formatSafetyFlags(flags: RitualSafetyFlags | undefined): string {
  if (!flags) {
    return "none";
  }

  return [
    `ingestion=${flags.ingestion}`,
    `essentialOils=${flags.essentialOils}`,
    `smoke=${flags.smoke}`,
    `fire=${flags.fire}`,
    `pets=${flags.pets}`,
    `children=${flags.children}`,
    `pregnancy=${flags.pregnancy}`,
    `allergies=${formatList(flags.allergies)}`,
    `medicalClaims=${flags.medicalClaims}`,
    `culturalContext=${flags.culturalContext}`,
    `emotionalIntensity=${flags.emotionalIntensity}`,
    `cleanupBurden=${flags.cleanupBurden}`,
  ].join("; ");
}

function getSelectedCategory(result: RecommendationQualityScenarioResult): string {
  return (
    result.brief.decision.inputs.practiceChoice?.selectedLabel ??
    result.scenario.currentRitualCheckIn.practiceTypeLabel ??
    "not asked"
  );
}

function getPracticeType(result: RecommendationQualityScenarioResult): string {
  const checkIn = result.scenario.currentRitualCheckIn;
  const hints = [
    ...(checkIn.practiceTypeHints ?? []),
    ...(result.brief.decision.inputs.practiceChoice?.selectedHints ?? []),
  ];
  const uniqueHints = [...new Set(hints)];

  return `${checkIn.practiceTypeLabel ?? "not asked"}; hints=${formatList(uniqueHints)}`;
}

function getWarningIds(result: RecommendationQualityScenarioResult): string[] {
  return result.warnings.map((warning) => warning.id);
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

function buildScenarioSection(
  result: RecommendationQualityScenarioResult,
  normalOutput: string,
): string {
  const pattern = getApprovedRitualPatterns().find(
    (item) => item.key === result.selectedRitualPattern.key,
  );
  const checkIn = result.scenario.currentRitualCheckIn;
  const sourceLineage = stripSourceLineagePrefix(
    pattern?.sourceLineageLabel ?? result.brief.sourceSummary,
  );

  return [
    `## Scenario: ${result.scenario.id}`,
    "",
    "Metadata:",
    `- Title: ${result.scenario.title}`,
    `- Purpose: ${result.scenario.purpose}`,
    `- Selected category: ${getSelectedCategory(result)}`,
    `- Selected pattern: ${result.selectedRitualPattern.key}`,
    `- Selected ritual form family / families: ${formatList(result.selectedRitualFormFamilies)}`,
    `- Focus: ${checkIn.ritualFocusLabel ?? checkIn.ritualFocusKey ?? "not set"}`,
    `- Capacity: ${checkIn.capacityMode}`,
    `- Audience: ${checkIn.audience ?? "not set"}`,
    `- Practice type / hint: ${getPracticeType(result)}`,
    `- Time scope: ${checkIn.timeScope}`,
    `- Best window: ${result.brief.bestWindow}`,
    `- Contract status: ${result.contractStatus?.reviewVerdict ?? "n/a"}`,
    `- Authored-output status: ${result.authoredOutputStatus?.verdict ?? "n/a"}`,
    `- Warning IDs: ${formatList(getWarningIds(result))}`,
    `- Source summary: ${result.brief.sourceSummary}`,
    `- Source lineage: ${sourceLineage}`,
    `- Materials: ${formatList(pattern?.materials ?? [])}`,
    `- Safety flags: ${formatSafetyFlags(pattern?.safetyFlags)}`,
    "",
    "Full normal output:",
    "",
    "```text",
    normalOutput,
    "```",
    "",
  ].join("\n");
}

function buildScenarioIndex(
  results: RecommendationQualityScenarioResult[],
): string {
  const rows = results.map((result) => {
    const checkIn = result.scenario.currentRitualCheckIn;

    return [
      result.scenario.id,
      getSelectedCategory(result),
      result.selectedRitualPattern.key,
      checkIn.ritualFocusLabel ?? checkIn.ritualFocusKey ?? "not set",
      checkIn.capacityMode,
      checkIn.audience ?? "not set",
      formatList(getWarningIds(result)),
    ];
  });

  return [
    "### Scenario index",
    "",
    "| scenario ID | selected category | selected pattern | focus | capacity | audience | warning IDs |",
    "|---|---|---|---|---|---|---|",
    ...rows.map((row) => `| ${row.map(escapeTableCell).join(" | ")} |`),
    "",
  ].join("\n");
}

function buildSelectedPatternIndex(
  results: RecommendationQualityScenarioResult[],
): string {
  const patternMap = new Map<string, string[]>();

  for (const result of results) {
    const scenarios = patternMap.get(result.selectedRitualPattern.key) ?? [];
    scenarios.push(result.scenario.id);
    patternMap.set(result.selectedRitualPattern.key, scenarios);
  }

  return [
    "### Selected pattern index",
    "",
    "| selected pattern | scenario IDs |",
    "|---|---|",
    ...[...patternMap.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([pattern, scenarios]) => `| ${escapeTableCell(pattern)} | ${escapeTableCell(scenarios.join(", "))} |`),
    "",
  ].join("\n");
}

function buildWarningIndex(results: RecommendationQualityScenarioResult[]): string {
  const warningMap = new Map<string, string[]>();

  for (const result of results) {
    for (const warningId of getWarningIds(result)) {
      const scenarios = warningMap.get(warningId) ?? [];
      scenarios.push(result.scenario.id);
      warningMap.set(warningId, scenarios);
    }
  }

  return [
    "### Warning index",
    "",
    "| warning ID | scenario IDs |",
    "|---|---|",
    ...(
      warningMap.size > 0
        ? [...warningMap.entries()]
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([warningId, scenarios]) => `| ${escapeTableCell(warningId)} | ${escapeTableCell(scenarios.join(", "))} |`)
        : ["| none | none |"]
    ),
    "",
  ].join("\n");
}

function buildSuspiciousPhraseScan(normalOutputsById: Map<string, string>): string {
  const rows = SUSPICIOUS_PHRASES.map((phrase) => {
    const phraseLower = phrase.toLowerCase();
    const scenarioIds = [...normalOutputsById.entries()]
      .filter(([, output]) => output.toLowerCase().includes(phraseLower))
      .map(([scenarioId]) => scenarioId);

    return { phrase, scenarioIds };
  });

  return [
    "### Suspicious phrase scan",
    "",
    "Occurrences are review index entries only; they do not automatically fail the scenario.",
    "",
    "| phrase | scenario IDs |",
    "|---|---|",
    ...rows.map(
      ({ phrase, scenarioIds }) =>
        `| ${escapeTableCell(phrase)} | ${escapeTableCell(formatList(scenarioIds))} |`,
    ),
    "",
  ].join("\n");
}

function buildPacket(): string {
  const report = createRecommendationQualityReport(recommendationQualityScenarios);
  const normalOutputsById = new Map(
    report.scenarioResults.map((result) => [
      result.scenario.id,
      formatNormalOutput(result),
    ]),
  );

  return [
    "# Full Recommendation Scenario Output Review Packet",
    "",
    "Generated from `recommendationQualityScenarios` using the normal user-facing recommendation fields. This packet is for editorial/product review only; it does not bless current wording as final quality.",
    "",
    `Total scenarios exported: ${report.scenarioCount}`,
    "",
    "## Scenario Outputs",
    "",
    ...report.scenarioResults.map((result) =>
      buildScenarioSection(result, normalOutputsById.get(result.scenario.id) ?? ""),
    ),
    "## Summary Tables",
    "",
    buildScenarioIndex(report.scenarioResults),
    buildSelectedPatternIndex(report.scenarioResults),
    buildWarningIndex(report.scenarioResults),
    buildSuspiciousPhraseScan(normalOutputsById),
  ].join("\n");
}

const packet = buildPacket();

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, packet);

console.log(`Wrote ${OUTPUT_PATH}`);
