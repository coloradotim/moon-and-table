import {
  createRitualDbParityReport,
  formatRitualDbParityReport,
  isRitualDbParitySuccessful,
} from "../src/data/rituals/db-parity";
import { createSourceBackedRitualDbMirrorDryRun } from "../src/data/rituals/db-mirror";
import { sourceBackedRituals } from "../src/data/rituals/source-backed-rituals";

const mirrorReport = createSourceBackedRitualDbMirrorDryRun();
const parityReport = createRitualDbParityReport({
  staticRituals: sourceBackedRituals,
  ritualDocuments: mirrorReport.mirrored.map((record) => record.ritualDocument),
  versionDocuments: mirrorReport.mirrored.map((record) => record.versionDocument),
  validationSnapshots: mirrorReport.mirrored.map(
    (record) => record.validationSnapshot,
  ),
});

process.stdout.write(formatRitualDbParityReport(parityReport));

if (!isRitualDbParitySuccessful(parityReport)) {
  process.exitCode = 1;
}
