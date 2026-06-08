import { fileURLToPath } from "node:url";

import { pilotRituals } from "../src/data/rituals/pilot-rituals";
import {
  createRitualReadinessReport,
  formatRitualReadinessReport,
} from "../src/data/rituals/readiness-report";

export function createCurrentRitualReadinessReport(): string {
  return formatRitualReadinessReport(
    createRitualReadinessReport(pilotRituals),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.stdout.write(createCurrentRitualReadinessReport());
}
