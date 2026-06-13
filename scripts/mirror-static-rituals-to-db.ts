import { fileURLToPath } from "node:url";

import {
  createSourceBackedRitualDbMirrorDryRun,
  formatRitualDbMirrorDryRunReport,
  isRitualDbMirrorDryRunSuccessful,
} from "../src/data/rituals/db-mirror";

function getGeneratedAtIso(args: readonly string[]): string | undefined {
  const inline = args.find((arg) => arg.startsWith("--generated-at="));

  if (inline) {
    const value = inline.slice("--generated-at=".length);
    return value === "now" ? new Date().toISOString() : value;
  }

  const index = args.indexOf("--generated-at");

  if (index >= 0) {
    const value = args[index + 1];
    return value === "now" ? new Date().toISOString() : value;
  }

  return undefined;
}

export function createCurrentStaticRitualDbMirrorDryRunReport(
  generatedAtIso?: string,
): string {
  return formatRitualDbMirrorDryRunReport(
    createSourceBackedRitualDbMirrorDryRun({ generatedAtIso }),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const report = createSourceBackedRitualDbMirrorDryRun({
    generatedAtIso: getGeneratedAtIso(process.argv.slice(2)),
  });

  process.stdout.write(formatRitualDbMirrorDryRunReport(report));

  if (!isRitualDbMirrorDryRunSuccessful(report)) {
    process.exitCode = 1;
  }
}
