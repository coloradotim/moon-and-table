import { sourcePipelineDoctrine } from "./doctrine";
import type { ClassificationOutput, SourceScanOutput } from "../types";

export function buildExtractionPrompt(input: {
  sourceId: string;
  title?: string;
  author?: string;
  scan: SourceScanOutput;
  classification: ClassificationOutput;
}): string {
  const extractRows = input.classification.rows.filter(
    (row) => row.outcome === "candidate_extract_now",
  );

  return `${sourcePipelineDoctrine}

Task: author packet-shaped Moon & Table Ritual candidates for rows classified
candidate_extract_now. Produce data aligned with the current runtime Ritual
model. Do not invent a parallel schema.

Every runtimeRitual should initially use:
- status: "draft"
- availability.findable: true
- availability.directUseEligible: false
- availability.recommendationEligible: false
- recommendationMetadata.eligibility.recommendable: false
- recommendationMetadata.eligibility.missing includes direct_use_review and recommendation_review

The practice must be self-contained, source-backed, and include an intentional
open, concrete source-supported action, and intentional close. Preserve the
actual ritual purpose and carrier. Use repository-safe prose only.

Source ID: ${input.sourceId}
Title: ${input.title ?? "unknown"}
Author: ${input.author ?? "unknown"}

Inventory rows to extract:
${JSON.stringify(
  input.scan.inventory_rows.filter((row) =>
    extractRows.some((classification) => classification.row_id === row.row_id),
  ),
  null,
  2,
)}

Classification notes:
${JSON.stringify(extractRows, null, 2)}

Return JSON only.
`;
}
