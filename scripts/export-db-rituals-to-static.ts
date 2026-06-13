import fs from "node:fs";

import {
  createRitualStaticExport,
  formatRitualStaticExportReport,
  isRitualStaticExportSuccessful,
} from "../src/data/rituals/db-static-export";
import { createSourceBackedRitualDbMirrorDryRun } from "../src/data/rituals/db-mirror";

const OUT_FILE = "src/data/rituals/source-backed-rituals.ts";

function hasFlag(flag: string): boolean {
  return process.argv.slice(2).includes(flag);
}

const writeOutput = hasFlag("--write");
const mirrorReport = createSourceBackedRitualDbMirrorDryRun();
const exportReport = createRitualStaticExport({
  ritualDocuments: mirrorReport.mirrored.map((record) => record.ritualDocument),
  versionDocuments: mirrorReport.mirrored.map((record) => record.versionDocument),
  validationSnapshots: mirrorReport.mirrored.map(
    (record) => record.validationSnapshot,
  ),
});

process.stdout.write(formatRitualStaticExportReport(exportReport));

if (!isRitualStaticExportSuccessful(exportReport)) {
  process.exitCode = 1;
} else if (writeOutput) {
  fs.writeFileSync(OUT_FILE, exportReport.sourceText);
  process.stdout.write(`\nWrote ${OUT_FILE}\n`);
} else {
  process.stdout.write("\nDry run only. Pass --write to update the static file.\n");
}
