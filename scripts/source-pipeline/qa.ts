import {
  RITUAL_WORD_MODES,
  type Ritual,
} from "../../src/data/rituals/types";
import { validateRitual } from "../../src/data/rituals/validate-rituals";
import type {
  ExtractionPacket,
  PacketQaReport,
  QaFinding,
  QaOutcome,
  SourcePipelineCandidate,
} from "./types";

function addFinding(
  findings: QaFinding[],
  outcome: QaOutcome,
  path: string,
  message: string,
  candidateId?: string,
): void {
  findings.push({ candidateId, outcome, path, message });
}

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function hasLongSourceTextRisk(value: unknown): boolean {
  if (typeof value === "string") {
    return value.length > 1800 && /source|quote|excerpt|verbatim/i.test(value);
  }

  if (Array.isArray(value)) {
    return value.some(hasLongSourceTextRisk);
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(hasLongSourceTextRisk);
  }

  return false;
}

function hasStaleMetadataKey(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return value.some(hasStaleMetadataKey);
  }

  return Object.entries(value).some(([key, nested]) =>
    /privateSourceText|sourceExcerpt|verbatimSource|exactSourceText|ritualWordsPrivate/i
      .test(key) || hasStaleMetadataKey(nested),
  );
}

function qaRitual(
  candidate: SourcePipelineCandidate,
  ritual: Ritual,
  findings: QaFinding[],
): void {
  const validation = validateRitual(ritual);

  for (const finding of validation.findings) {
    addFinding(
      findings,
      finding.message.includes("invalid")
        ? "blocked_invalid_enum"
        : "blocked_missing_required_field",
      `runtimeRitual.${finding.path}`,
      finding.message,
      candidate.candidateId,
    );
  }

  if (ritual.status !== "draft") {
    addFinding(
      findings,
      "needs_human_review",
      "runtimeRitual.status",
      "Pipeline candidates should import initially as draft records.",
      candidate.candidateId,
    );
  }

  if (!ritual.origin || ritual.origin.type !== "source") {
    addFinding(
      findings,
      "blocked_missing_required_field",
      "runtimeRitual.origin",
      "Pipeline candidates must be source-backed.",
      candidate.candidateId,
    );
  }

  if (ritual.ritualWords) {
    for (const [index, words] of ritual.ritualWords.entries()) {
      if (!RITUAL_WORD_MODES.includes(words.mode)) {
        addFinding(
          findings,
          "blocked_stale_metadata",
          `runtimeRitual.ritualWords.${index}.mode`,
          "Unsupported ritualWords mode.",
          candidate.candidateId,
        );
      }

      if (
        words.mode === "source_exact_short" &&
        words.text &&
        countWords(words.text) > 20
      ) {
        addFinding(
          findings,
          "blocked_source_text_risk",
          `runtimeRitual.ritualWords.${index}.text`,
          "source_exact_short ritualWords text exceeds 20 words.",
          candidate.candidateId,
        );
      }
    }
  }

  if (hasLongSourceTextRisk(candidate)) {
    addFinding(
      findings,
      "blocked_source_text_risk",
      "candidate",
      "Candidate may contain long source text or copied excerpt material.",
      candidate.candidateId,
    );
  }

  if (hasStaleMetadataKey(candidate)) {
    addFinding(
      findings,
      "blocked_stale_metadata",
      "candidate",
      "Candidate contains stale restricted-excerpt metadata keys.",
      candidate.candidateId,
    );
  }
}

export function validateExtractionPacket(
  sourceId: string,
  packet: ExtractionPacket,
): PacketQaReport {
  const findings: QaFinding[] = [];

  if (packet.source_id !== sourceId) {
    addFinding(
      findings,
      "blocked_count_mismatch",
      "source_id",
      "Packet source_id does not match source run.",
    );
  }

  for (const candidate of packet.candidates) {
    if (!candidate.runtimeRitual) {
      addFinding(
        findings,
        "blocked_missing_required_field",
        "runtimeRitual",
        "Candidate is missing runtimeRitual.",
        candidate.candidateId,
      );
      continue;
    }

    qaRitual(candidate, candidate.runtimeRitual, findings);
  }

  return {
    source_id: sourceId,
    checked_at: new Date().toISOString(),
    valid: findings.length === 0,
    pass_count: packet.candidates.length -
      new Set(findings.map((finding) => finding.candidateId).filter(Boolean))
        .size,
    findings,
  };
}
