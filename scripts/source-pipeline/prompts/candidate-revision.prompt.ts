import { sourcePipelineDoctrine } from "./doctrine";
import type { PacketQaReport, SourcePipelineCandidate } from "../types";

export function buildCandidateRevisionPrompt(input: {
  candidate: SourcePipelineCandidate;
  qaReport?: PacketQaReport;
  instruction: string;
}): string {
  return `${sourcePipelineDoctrine}

Task: revise one Moon & Table source-backed Ritual candidate according to Tim's
instruction. Preserve source support, runtime schema alignment, and repository
safe paraphrase. Return revised candidate data and a short change summary.

Tim instruction:
${input.instruction}

Candidate:
${JSON.stringify(input.candidate, null, 2)}

QA findings:
${JSON.stringify(input.qaReport?.findings ?? [], null, 2)}

Return JSON only.
`;
}
