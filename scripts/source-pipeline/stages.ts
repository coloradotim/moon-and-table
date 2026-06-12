import fs from "node:fs";
import path from "node:path";

import { callOpenAiForJson } from "./openai-client";
import { buildCandidateRevisionPrompt } from "./prompts/candidate-revision.prompt";
import { buildClassificationPrompt } from "./prompts/ritual-classification.prompt";
import { buildExtractionPrompt } from "./prompts/extraction.prompt";
import { buildSourceScanPrompt } from "./prompts/source-scan.prompt";
import { preprocessSourceRun, readChunks } from "./preprocess";
import { validateExtractionPacket } from "./qa";
import {
  classificationJsonSchema,
  extractionPacketJsonSchema,
  sourceScanJsonSchema,
} from "./schemas";
import {
  getRunArtifactPath,
  markStage,
  readSourceRun,
  updateSourceRun,
} from "./state";
import {
  appendJsonLine,
  ensureDir,
  readJsonFile,
  writeJsonFile,
  writeTextFile,
} from "./json";
import type {
  CandidateDisposition,
  CandidateRevision,
  ClassificationOutput,
  ExtractionPacket,
  PacketQaReport,
  RecommendationTargetDecision,
  ReviewDecision,
  RevisionInstruction,
  SourcePipelineCandidate,
  SourceScanOutput,
  TargetDecision,
} from "./types";

function countBy<T extends string>(values: T[]): Record<string, number> {
  return values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

function readScan(sourceId: string): SourceScanOutput {
  const state = readSourceRun(sourceId);

  if (!state.artifact_paths.scanOutput) {
    throw new Error(`No source scan found for ${sourceId}. Run source:scan first.`);
  }

  return readJsonFile<SourceScanOutput>(state.artifact_paths.scanOutput);
}

function readClassification(sourceId: string): ClassificationOutput {
  const state = readSourceRun(sourceId);

  if (!state.artifact_paths.classificationOutput) {
    throw new Error(
      `No classification found for ${sourceId}. Run source:classify first.`,
    );
  }

  return readJsonFile<ClassificationOutput>(
    state.artifact_paths.classificationOutput,
  );
}

export function readExtractionPacket(sourceId: string): ExtractionPacket {
  const state = readSourceRun(sourceId);

  if (!state.artifact_paths.extractionPacket) {
    throw new Error(
      `No extraction packet found for ${sourceId}. Run source:extract first.`,
    );
  }

  return readJsonFile<ExtractionPacket>(state.artifact_paths.extractionPacket);
}

function writeExtractionPacket(sourceId: string, packet: ExtractionPacket): void {
  const packetPath = getRunArtifactPath(sourceId, "packet", "extraction-packet.json");
  writeJsonFile(packetPath, packet);
  updateSourceRun(sourceId, (state) => ({
    ...state,
    artifact_paths: {
      ...state.artifact_paths,
      extractionPacket: packetPath,
    },
    extracted_candidate_count: packet.candidates.length,
  }));
}

export function runPreprocess(sourceId: string): void {
  preprocessSourceRun(sourceId);
}

export async function runScan(sourceId: string): Promise<void> {
  const state = readSourceRun(sourceId);
  const chunks = readChunks(sourceId);
  const outputPath = getRunArtifactPath(sourceId, "ai-output", "source-scan.json");
  const scan = await callOpenAiForJson<SourceScanOutput>({
    prompt: buildSourceScanPrompt({
      sourceId,
      title: state.title,
      author: state.author,
      chunks,
    }),
    schemaName: "moon_table_source_scan",
    schema: sourceScanJsonSchema,
  });

  writeJsonFile(outputPath, scan);
  updateSourceRun(sourceId, (current) => ({
    ...current,
    current_stage: "scan",
    artifact_paths: {
      ...current.artifact_paths,
      scanOutput: outputPath,
    },
    inventory_count: scan.inventory_rows.length,
    open_review_items: scan.open_questions,
  }));
}

export async function runClassify(sourceId: string): Promise<void> {
  const scan = readScan(sourceId);
  const outputPath = getRunArtifactPath(
    sourceId,
    "ai-output",
    "classification.json",
  );
  const classification = await callOpenAiForJson<ClassificationOutput>({
    prompt: buildClassificationPrompt(scan),
    schemaName: "moon_table_ritual_classification",
    schema: classificationJsonSchema,
  });

  classification.counts = countBy(classification.rows.map((row) => row.outcome));
  writeJsonFile(outputPath, classification);
  updateSourceRun(sourceId, (current) => ({
    ...current,
    current_stage: "classify",
    artifact_paths: {
      ...current.artifact_paths,
      classificationOutput: outputPath,
    },
    classified_candidate_count:
      classification.counts.candidate_extract_now ?? 0,
    open_review_items: classification.open_questions,
  }));
}

export async function runExtract(sourceId: string): Promise<void> {
  const state = readSourceRun(sourceId);
  const scan = readScan(sourceId);
  const classification = readClassification(sourceId);
  const packet = await callOpenAiForJson<ExtractionPacket>({
    prompt: buildExtractionPrompt({
      sourceId,
      title: state.title,
      author: state.author,
      scan,
      classification,
    }),
    schemaName: "moon_table_extraction_packet",
    schema: extractionPacketJsonSchema,
  });

  writeExtractionPacket(sourceId, packet);
  markStage(sourceId, "extract");
}

export function runQaPacket(sourceId: string): PacketQaReport {
  const packet = readExtractionPacket(sourceId);
  const report = validateExtractionPacket(sourceId, packet);
  const reportPath = getRunArtifactPath(sourceId, "qa", "packet-qa.json");

  writeJsonFile(reportPath, report);
  updateSourceRun(sourceId, (state) => ({
    ...state,
    current_stage: "qa-packet",
    artifact_paths: {
      ...state.artifact_paths,
      qaReport: reportPath,
    },
    qa_pass_count: report.pass_count,
    validation_results: report.valid
      ? ["packet_qa_passed"]
      : report.findings.map((finding) => `${finding.outcome}:${finding.path}`),
  }));

  return report;
}

function getReviewPaths(sourceId: string): {
  queuePath: string;
  decisionsPath: string;
  instructionsPath: string;
  revisionsDir: string;
} {
  return {
    queuePath: getRunArtifactPath(sourceId, "review", "review-queue.json"),
    decisionsPath: getRunArtifactPath(sourceId, "review", "review-decisions.json"),
    instructionsPath: getRunArtifactPath(
      sourceId,
      "review",
      "revision-instructions.jsonl",
    ),
    revisionsDir: getRunArtifactPath(sourceId, "review", "candidate-revisions"),
  };
}

export function initializeReviewQueue(sourceId: string): SourcePipelineCandidate[] {
  const packet = readExtractionPacket(sourceId);
  const paths = getReviewPaths(sourceId);

  writeJsonFile(paths.queuePath, packet.candidates);
  if (!fs.existsSync(paths.decisionsPath)) {
    writeJsonFile(paths.decisionsPath, []);
  }

  updateSourceRun(sourceId, (state) => ({
    ...state,
    current_stage: "review",
    artifact_paths: {
      ...state.artifact_paths,
      reviewQueue: paths.queuePath,
      reviewDecisions: paths.decisionsPath,
      revisionInstructions: paths.instructionsPath,
    },
    open_review_items: packet.candidates.map((candidate) => candidate.candidateId),
  }));

  return packet.candidates;
}

export function listReviewQueue(sourceId: string): SourcePipelineCandidate[] {
  const state = readSourceRun(sourceId);
  const queuePath =
    state.artifact_paths.reviewQueue ?? getReviewPaths(sourceId).queuePath;

  if (!fs.existsSync(queuePath)) {
    return initializeReviewQueue(sourceId);
  }

  return readJsonFile<SourcePipelineCandidate[]>(queuePath);
}

export function recordReviewDecision(input: {
  sourceId: string;
  candidateId: string;
  disposition: CandidateDisposition;
  directUseTarget: TargetDecision;
  recommendationTarget: RecommendationTargetDecision;
  notes?: string;
}): ReviewDecision {
  const paths = getReviewPaths(input.sourceId);
  const queue = listReviewQueue(input.sourceId);
  const candidate = queue.find((item) => item.candidateId === input.candidateId);

  if (!candidate) {
    throw new Error(`Candidate not found: ${input.candidateId}`);
  }

  const decision: ReviewDecision = {
    candidateId: input.candidateId,
    disposition: input.disposition,
    direct_use_target: input.directUseTarget,
    recommendation_target: input.recommendationTarget,
    notes: input.notes,
    decided_at: new Date().toISOString(),
  };
  const decisions = fs.existsSync(paths.decisionsPath)
    ? readJsonFile<ReviewDecision[]>(paths.decisionsPath)
    : [];
  const nextDecisions = [
    ...decisions.filter((item) => item.candidateId !== input.candidateId),
    decision,
  ].sort((a, b) => a.candidateId.localeCompare(b.candidateId));
  const nextQueue = queue.map((item) =>
    item.candidateId === input.candidateId
      ? {
          ...item,
          disposition: input.disposition,
          direct_use_target: input.directUseTarget,
          recommendation_target: input.recommendationTarget,
        }
      : item,
  );

  writeJsonFile(paths.queuePath, nextQueue);
  writeJsonFile(paths.decisionsPath, nextDecisions);
  updateSourceRun(input.sourceId, (state) => ({
    ...state,
    current_stage: "review",
    approved_for_import_count: nextQueue.filter(
      (item) => item.disposition === "approved_for_mechanical_import",
    ).length,
    direct_use_count: nextQueue.filter((item) => item.direct_use_target === "yes")
      .length,
    recommendable_count: nextQueue.filter(
      (item) => item.recommendation_target === "yes",
    ).length,
    held_count: nextQueue.filter(
      (item) =>
        item.disposition &&
        item.disposition !== "approved_for_mechanical_import",
    ).length,
    open_review_items: nextQueue
      .filter((item) => !item.disposition)
      .map((item) => item.candidateId),
  }));

  return decision;
}

export async function reviseCandidate(input: {
  sourceId: string;
  candidateId: string;
  instruction: string;
}): Promise<CandidateRevision> {
  const queue = listReviewQueue(input.sourceId);
  const candidate = queue.find((item) => item.candidateId === input.candidateId);

  if (!candidate) {
    throw new Error(`Candidate not found: ${input.candidateId}`);
  }

  const state = readSourceRun(input.sourceId);
  const qaReport = state.artifact_paths.qaReport
    ? readJsonFile<PacketQaReport>(state.artifact_paths.qaReport)
    : undefined;
  const revision = await callOpenAiForJson<CandidateRevision>({
    prompt: buildCandidateRevisionPrompt({
      candidate,
      qaReport,
      instruction: input.instruction,
    }),
    schemaName: "moon_table_candidate_revision",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["candidate", "changeSummary"],
      properties: {
        candidate: { type: "object" },
        changeSummary: { type: "string" },
      },
    },
  });
  const paths = getReviewPaths(input.sourceId);
  const existingVersions = fs.existsSync(paths.revisionsDir)
    ? fs.readdirSync(paths.revisionsDir).filter((file) =>
        file.startsWith(`${input.candidateId}.v`),
      )
    : [];
  const revisionPath = path.join(
    paths.revisionsDir,
    `${input.candidateId}.v${existingVersions.length + 1}.json`,
  );
  const instruction: RevisionInstruction = {
    candidateId: input.candidateId,
    instruction: input.instruction,
    created_at: new Date().toISOString(),
  };
  const nextQueue = queue.map((item) =>
    item.candidateId === input.candidateId ? revision.candidate : item,
  );

  ensureDir(paths.revisionsDir);
  writeJsonFile(revisionPath, revision);
  appendJsonLine(paths.instructionsPath, instruction);
  writeJsonFile(paths.queuePath, nextQueue);
  writeExtractionPacket(input.sourceId, {
    ...readExtractionPacket(input.sourceId),
    candidates: nextQueue,
  });
  runQaPacket(input.sourceId);

  return revision;
}

export function writeStageNotImplementedReport(
  sourceId: string,
  stage: "import" | "validate-import" | "promote" | "audit",
): void {
  const reportPath = getRunArtifactPath(sourceId, "reports", `${stage}.md`);
  writeTextFile(
    reportPath,
    `# ${stage}\n\nThis stage is wired into the source-run state model but is not implemented in the #417 MVP. It should be completed in a follow-up before using this pipeline for mechanical runtime imports or eligibility promotion.\n`,
  );
  updateSourceRun(sourceId, (state) => ({
    ...state,
    current_stage: stage,
    artifact_paths: {
      ...state.artifact_paths,
      auditReport: stage === "audit" ? reportPath : state.artifact_paths.auditReport,
    },
    validation_results: [
      ...state.validation_results,
      `${stage}_not_implemented_in_mvp`,
    ],
  }));
}
