#!/usr/bin/env tsx
import {
  createSourceRun,
  readSourceRun,
} from "./state";
import {
  initializeReviewQueue,
  listReviewQueue,
  recordReviewDecision,
  reviseCandidate,
  runClassify,
  runExtract,
  runPreprocess,
  runQaPacket,
  runScan,
  writeStageNotImplementedReport,
} from "./stages";
import {
  CANDIDATE_DISPOSITIONS,
  RECOMMENDATION_TARGET_DECISIONS,
  TARGET_DECISIONS,
  type CandidateDisposition,
  type RecommendationTargetDecision,
  type TargetDecision,
} from "./types";

type Args = Record<string, string | boolean>;

function parseArgs(argv: string[]): Args {
  const args: Args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function requireArg(args: Args, key: string): string {
  const value = args[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`--${key} is required.`);
  }

  return value;
}

function optionalString(args: Args, key: string): string | undefined {
  const value = args[key];
  return typeof value === "string" ? value : undefined;
}

function parseTargetDecision(value: string | undefined): TargetDecision {
  if (value && TARGET_DECISIONS.includes(value as TargetDecision)) {
    return value as TargetDecision;
  }

  return "later_review";
}

function parseRecommendationTarget(
  value: string | undefined,
): RecommendationTargetDecision {
  if (
    value &&
    RECOMMENDATION_TARGET_DECISIONS.includes(
      value as RecommendationTargetDecision,
    )
  ) {
    return value as RecommendationTargetDecision;
  }

  return "later_review";
}

function parseDisposition(value: string): CandidateDisposition {
  if (CANDIDATE_DISPOSITIONS.includes(value as CandidateDisposition)) {
    return value as CandidateDisposition;
  }

  throw new Error(
    `Invalid --decision. Expected one of: ${CANDIDATE_DISPOSITIONS.join(", ")}`,
  );
}

async function main(): Promise<void> {
  const [stage] = process.argv.slice(2);
  const args = parseArgs(process.argv.slice(3));
  const sourceId = typeof args["source-id"] === "string"
    ? args["source-id"]
    : undefined;

  switch (stage) {
    case "init": {
      const state = createSourceRun({
        sourceId: requireArg(args, "source-id"),
        pdfPath: requireArg(args, "pdf"),
        title: optionalString(args, "title"),
        author: optionalString(args, "author"),
        editor: optionalString(args, "editor"),
        translator: optionalString(args, "translator"),
      });
      console.log(`Created source run ${state.source_id}`);
      return;
    }
    case "preprocess":
      runPreprocess(requireArg(args, "source-id"));
      console.log("Preprocess complete.");
      return;
    case "scan":
      await runScan(requireArg(args, "source-id"));
      console.log("Source scan complete.");
      return;
    case "classify":
      await runClassify(requireArg(args, "source-id"));
      console.log("Classification complete.");
      return;
    case "extract":
      await runExtract(requireArg(args, "source-id"));
      console.log("Extraction packet complete.");
      return;
    case "qa-packet": {
      const report = runQaPacket(requireArg(args, "source-id"));
      console.log(report.valid ? "Packet QA passed." : "Packet QA failed.");
      if (!report.valid) {
        console.log(JSON.stringify(report.findings, null, 2));
      }
      return;
    }
    case "review": {
      const id = requireArg(args, "source-id");

      if (args.list) {
        console.log(JSON.stringify(listReviewQueue(id), null, 2));
        return;
      }

      if (args.init) {
        initializeReviewQueue(id);
        console.log("Review queue initialized.");
        return;
      }

      const candidateId = requireArg(args, "candidate-id");
      const instruction = optionalString(args, "instruction");

      if (instruction) {
        const revision = await reviseCandidate({ sourceId: id, candidateId, instruction });
        console.log(revision.changeSummary);
        return;
      }

      const decision = recordReviewDecision({
        sourceId: id,
        candidateId,
        disposition: parseDisposition(requireArg(args, "decision")),
        directUseTarget: parseTargetDecision(optionalString(args, "direct-use")),
        recommendationTarget: parseRecommendationTarget(
          optionalString(args, "recommendation"),
        ),
        notes: optionalString(args, "notes"),
      });
      console.log(JSON.stringify(decision, null, 2));
      return;
    }
    case "import":
    case "validate-import":
    case "promote":
    case "audit":
      writeStageNotImplementedReport(requireArg(args, "source-id"), stage);
      console.log(`${stage} is stubbed for follow-up implementation.`);
      return;
    case "state":
      console.log(JSON.stringify(readSourceRun(requireArg(args, "source-id")), null, 2));
      return;
    default:
      throw new Error(
        `Unknown source pipeline stage "${stage ?? ""}". Use init, preprocess, scan, classify, extract, qa-packet, review, import, validate-import, promote, audit, or state.`,
      );
  }
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
