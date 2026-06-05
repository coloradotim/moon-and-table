import { readFileSync, writeFileSync } from "node:fs";

import {
  createRecommendationQualityDelta,
  createRecommendationQualityReport,
  createRecommendationQualitySummary,
  formatRecommendationQualityDelta,
  formatRecommendationQualitySummary,
  type RecommendationQualitySummary,
} from "./recommendation-quality-report";

type CliOptions = {
  baselinePath?: string;
  currentPath?: string;
  writeCurrentPath?: string;
  help?: boolean;
};

function readSummary(path: string): RecommendationQualitySummary {
  return JSON.parse(readFileSync(path, "utf8")) as RecommendationQualitySummary;
}

function usage(): string {
  return [
    "Usage:",
    "  npm run recommendation:quality:delta",
    "  npm run recommendation:quality:delta -- --write-current tmp/current-quality-summary.json",
    "  npm run recommendation:quality:delta -- --baseline tmp/main.json --current tmp/pr.json",
    "",
    "Options:",
    "  --baseline <path>       Baseline quality summary JSON.",
    "  --current <path>        Current quality summary JSON. If omitted, the current repo is generated.",
    "  --write-current <path>  Write the generated or loaded current summary JSON.",
    "  --help                  Show this help.",
  ].join("\n");
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--baseline") {
      options.baselinePath = args[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--current") {
      options.currentPath = args[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--write-current") {
      options.writeCurrentPath = args[index + 1];
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function getCurrentSummary(path?: string): RecommendationQualitySummary {
  if (path) {
    return readSummary(path);
  }

  return createRecommendationQualitySummary(createRecommendationQualityReport());
}

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  console.log(usage());
  process.exit(0);
}

const current = getCurrentSummary(options.currentPath);

if (options.writeCurrentPath) {
  writeFileSync(
    options.writeCurrentPath,
    `${JSON.stringify(current, null, 2)}\n`,
    "utf8",
  );
}

if (options.baselinePath) {
  const baseline = readSummary(options.baselinePath);

  console.log(formatRecommendationQualityDelta(
    createRecommendationQualityDelta({ baseline, current }),
  ));
} else {
  console.log(formatRecommendationQualitySummary(current));
}
