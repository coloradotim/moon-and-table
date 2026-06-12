import {
  RITUAL_AUDIENCES,
  RITUAL_CAPACITY_MODES,
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  RITUAL_TIMING_RELATIONSHIPS,
  RITUAL_WORD_MODES,
  RITUAL_WORD_USE_CONTEXTS,
} from "../../src/data/rituals/types";
import {
  CANDIDATE_DISPOSITIONS,
  CLASSIFICATION_OUTCOMES,
  CONTINUE_RECOMMENDATION_VALUES,
  QA_OUTCOMES,
  RECOMMENDATION_TARGET_DECISIONS,
  SOURCE_FIT_VALUES,
  SOURCE_INVENTORY_ITEM_TYPES,
  SOURCE_PIPELINE_STAGES,
  SOURCE_REVIEW_LABELS,
  TARGET_DECISIONS,
  type ExtractionPacket,
  type PacketQaReport,
  type SourceRunState,
} from "./types";

export const sourceRunSchema = {
  type: "object",
  required: [
    "source_id",
    "pdf_path",
    "current_stage",
    "artifact_paths",
    "inventory_count",
    "classified_candidate_count",
    "extracted_candidate_count",
    "qa_pass_count",
    "approved_for_import_count",
    "imported_count",
    "direct_use_count",
    "recommendable_count",
    "held_count",
    "validation_results",
    "open_review_items",
  ],
  properties: {
    current_stage: { enum: SOURCE_PIPELINE_STAGES },
  },
} as const;

export const sourceScanJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "source_id",
    "source_fit",
    "continue_recommendation",
    "visual_processing_needed",
    "source_sections_reviewed",
    "inventory_rows",
    "item_type_counts",
    "expected_carriers",
    "expected_purposes",
    "review_labels_found",
    "open_questions",
  ],
  properties: {
    source_id: { type: "string" },
    source_fit: { type: "string", enum: SOURCE_FIT_VALUES },
    continue_recommendation: {
      type: "string",
      enum: CONTINUE_RECOMMENDATION_VALUES,
    },
    visual_processing_needed: { type: "boolean" },
    source_sections_reviewed: { type: "array", items: { type: "string" } },
    inventory_rows: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "row_id",
          "source_location",
          "item_type",
          "brief_source_safe_description",
          "practice_action_signals",
          "beginning_middle_end_signals",
          "likely_carriers",
          "likely_purposes",
          "review_labels",
          "source_support_strength",
          "visual_dependency",
          "initial_disposition_placeholder",
        ],
        properties: {
          row_id: { type: "string" },
          source_location: { type: "string" },
          item_type: { type: "string", enum: SOURCE_INVENTORY_ITEM_TYPES },
          brief_source_safe_description: { type: "string" },
          practice_action_signals: { type: "array", items: { type: "string" } },
          beginning_middle_end_signals: {
            type: "array",
            items: { type: "string" },
          },
          likely_carriers: { type: "array", items: { type: "string" } },
          likely_purposes: { type: "array", items: { type: "string" } },
          review_labels: { type: "array", items: { enum: SOURCE_REVIEW_LABELS } },
          source_support_strength: {
            type: "string",
            enum: ["strong", "medium", "weak", "unclear"],
          },
          visual_dependency: { type: "boolean" },
          initial_disposition_placeholder: { type: "string" },
        },
      },
    },
    item_type_counts: { type: "object", additionalProperties: { type: "number" } },
    expected_carriers: { type: "array", items: { type: "string" } },
    expected_purposes: { type: "array", items: { type: "string" } },
    review_labels_found: { type: "array", items: { enum: SOURCE_REVIEW_LABELS } },
    open_questions: { type: "array", items: { type: "string" } },
  },
} as const;

export const classificationJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["source_id", "rows", "counts", "open_questions"],
  properties: {
    source_id: { type: "string" },
    rows: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "row_id",
          "outcome",
          "reason",
          "architecture_notes",
          "source_support_notes",
        ],
        properties: {
          row_id: { type: "string" },
          outcome: { type: "string", enum: CLASSIFICATION_OUTCOMES },
          reason: { type: "string" },
          architecture_notes: { type: "string" },
          source_support_notes: { type: "string" },
          tim_decision_required: { type: "boolean" },
        },
      },
    },
    counts: { type: "object", additionalProperties: { type: "number" } },
    open_questions: { type: "array", items: { type: "string" } },
  },
} as const;

export const extractionPacketJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["source_id", "packet_version", "candidates", "packet_notes"],
  properties: {
    source_id: { type: "string" },
    packet_version: { type: "number", enum: [1] },
    candidates: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: true,
        required: [
          "candidateId",
          "inventoryRowIds",
          "status",
          "direct_use_target",
          "recommendation_target",
          "reviewLabels",
          "sourceSupportSummary",
          "knownConcerns",
          "runtimeRitual",
        ],
        properties: {
          candidateId: { type: "string" },
          inventoryRowIds: { type: "array", items: { type: "string" } },
          status: { type: "string", enum: ["draft_candidate"] },
          direct_use_target: { type: "string", enum: TARGET_DECISIONS },
          recommendation_target: {
            type: "string",
            enum: RECOMMENDATION_TARGET_DECISIONS,
          },
          reviewLabels: { type: "array", items: { enum: SOURCE_REVIEW_LABELS } },
          sourceSupportSummary: { type: "string" },
          knownConcerns: { type: "array", items: { type: "string" } },
          runtimeRitual: { type: "object" },
        },
      },
    },
    packet_notes: { type: "array", items: { type: "string" } },
  },
} as const;

export function assertSourceRunState(value: SourceRunState): void {
  if (!SOURCE_PIPELINE_STAGES.includes(value.current_stage)) {
    throw new Error(`Invalid source-run stage: ${value.current_stage}`);
  }
}

export function assertExtractionPacket(value: ExtractionPacket): void {
  if (value.packet_version !== 1) {
    throw new Error("Unsupported extraction packet version.");
  }

  for (const candidate of value.candidates) {
    if (!candidate.candidateId) {
      throw new Error("Candidate is missing candidateId.");
    }

    if (!TARGET_DECISIONS.includes(candidate.direct_use_target)) {
      throw new Error(`Invalid direct_use_target for ${candidate.candidateId}.`);
    }

    if (!RECOMMENDATION_TARGET_DECISIONS.includes(candidate.recommendation_target)) {
      throw new Error(
        `Invalid recommendation_target for ${candidate.candidateId}.`,
      );
    }
  }
}

export function assertQaReport(value: PacketQaReport): void {
  for (const finding of value.findings) {
    if (!QA_OUTCOMES.includes(finding.outcome)) {
      throw new Error(`Invalid QA outcome: ${finding.outcome}`);
    }
  }
}

export const runtimeEnumSummary = {
  ritualStatuses: ["draft"],
  purposes: RITUAL_PURPOSES,
  carriers: RITUAL_CARRIERS,
  capacityModes: RITUAL_CAPACITY_MODES,
  audiences: RITUAL_AUDIENCES,
  timingRelationships: RITUAL_TIMING_RELATIONSHIPS,
  ritualWordModes: RITUAL_WORD_MODES,
  ritualWordUseContexts: RITUAL_WORD_USE_CONTEXTS,
  candidateDispositions: CANDIDATE_DISPOSITIONS,
};
