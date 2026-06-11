import { fileURLToPath } from "node:url";

import { sourceBackedRituals } from "../src/data/rituals/source-backed-rituals";
import {
  createRitualReadinessReport,
  formatRitualReadinessReport,
} from "../src/data/rituals/readiness-report";

export function createCurrentRitualReadinessReport(): string {
  return formatRitualReadinessReport(
    createRitualReadinessReport(sourceBackedRituals),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.stdout.write(createCurrentRitualReadinessReport());
}
