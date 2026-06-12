import { sourcePipelineDoctrine } from "./doctrine";
import type { SourceScanOutput } from "../types";

export function buildClassificationPrompt(scan: SourceScanOutput): string {
  return `${sourcePipelineDoctrine}

Task: classify each inventory row against the Moon & Table Ritual architecture
gate. This stage decides what can become a Ritual candidate; it does not author
the Ritual.

Use only architecture/source/model reasons for reject/defer outcomes. Content
category is a review label, not a blocker.

Return JSON only.

Scan inventory:
${JSON.stringify(scan.inventory_rows, null, 2)}
`;
}
