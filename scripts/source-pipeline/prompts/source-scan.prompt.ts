import { sourcePipelineDoctrine } from "./doctrine";

export function buildSourceScanPrompt(input: {
  sourceId: string;
  title?: string;
  author?: string;
  chunks: Array<{ chunkId: string; pageStart: number; pageEnd: number; text: string }>;
}): string {
  return `${sourcePipelineDoctrine}

Task: scan the provided private source chunks for Moon & Table practice
inventory. Answer whether the source should continue and inventory potentially
relevant practice material. This is not an import decision.

Source ID: ${input.sourceId}
Title: ${input.title ?? "unknown"}
Author: ${input.author ?? "unknown"}

Return JSON only. Include repository-safe paraphrase only.

Chunks:
${input.chunks
  .map(
    (chunk) => `
--- ${chunk.chunkId}, pages ${chunk.pageStart}-${chunk.pageEnd} ---
${chunk.text}`,
  )
  .join("\n")}
`;
}
