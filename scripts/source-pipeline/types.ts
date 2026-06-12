import type { Ritual } from "../../src/data/rituals/types";

export const SOURCE_PIPELINE_STAGES = [
  "init",
  "preprocess",
  "scan",
  "classify",
  "extract",
  "qa-packet",
  "review",
  "import",
  "validate-import",
  "promote",
  "audit",
] as const;

export type SourcePipelineStage = (typeof SOURCE_PIPELINE_STAGES)[number];

export const SOURCE_FIT_VALUES = [
  "high",
  "medium",
  "low",
  "none",
  "needs_human_scope_decision",
] as const;

export type SourceFit = (typeof SOURCE_FIT_VALUES)[number];

export const CONTINUE_RECOMMENDATION_VALUES = [
  "continue",
  "stop",
  "needs_human_scope_decision",
] as const;

export type ContinueRecommendation =
  (typeof CONTINUE_RECOMMENDATION_VALUES)[number];

export const SOURCE_INVENTORY_ITEM_TYPES = [
  "ritual",
  "spell",
  "blessing",
  "prayer",
  "invocation",
  "prompt",
  "meditation",
  "recipe",
  "charm",
  "spoken_formula",
  "craft",
  "cleansing",
  "consecration",
  "correspondence_with_action",
  "body_practice",
  "household_practice",
  "timing_practice",
  "context_only",
] as const;

export type SourceInventoryItemType =
  (typeof SOURCE_INVENTORY_ITEM_TYPES)[number];

export const SOURCE_REVIEW_LABELS = [
  "adult_intimacy",
  "explicit",
  "sex_forward",
  "consent_sensitive",
  "kink_adjacent",
  "body_fluid",
  "technique_heavy",
  "cultural_or_gender_load",
  "therapy_adjacent",
  "medical_or_somatic_claim",
  "coercive_or_target_control",
  "exact_text_sensitive",
  "house_voice_challenge",
  "direct_source_only_candidate",
  "recommendation_lane_unclear",
] as const;

export type SourceReviewLabel = (typeof SOURCE_REVIEW_LABELS)[number];

export const CLASSIFICATION_OUTCOMES = [
  "candidate_extract_now",
  "candidate_extract_later",
  "needs_more_source_review",
  "metadata_symbolism_only",
  "context_only",
  "source_note_only",
  "reject_not_ritual",
  "reject_not_self_contained",
  "reject_insufficient_source_support",
  "reject_architectural",
  "duplicate",
  "needs_human_decision",
] as const;

export type ClassificationOutcome = (typeof CLASSIFICATION_OUTCOMES)[number];

export const CANDIDATE_DISPOSITIONS = [
  "approved_for_mechanical_import",
  "hold_before_import",
  "needs_source_recheck",
  "needs_packet_correction",
  "candidate_extract_later",
  "reject_architectural",
  "reject_product_fit",
  "duplicate",
] as const;

export type CandidateDisposition = (typeof CANDIDATE_DISPOSITIONS)[number];

export const TARGET_DECISIONS = ["yes", "no", "later_review"] as const;

export type TargetDecision = (typeof TARGET_DECISIONS)[number];

export const RECOMMENDATION_TARGET_DECISIONS = [
  "yes",
  "no",
  "later_review",
  "context_only",
] as const;

export type RecommendationTargetDecision =
  (typeof RECOMMENDATION_TARGET_DECISIONS)[number];

export const QA_OUTCOMES = [
  "qa_passed",
  "qa_failed",
  "needs_human_review",
  "blocked_missing_required_field",
  "blocked_invalid_enum",
  "blocked_stale_metadata",
  "blocked_source_text_risk",
  "blocked_count_mismatch",
] as const;

export type QaOutcome = (typeof QA_OUTCOMES)[number];

export type SourceRunArtifactPaths = {
  extractedTextDir?: string;
  pageImagesDir?: string;
  pageManifest?: string;
  chunksDir?: string;
  scanOutput?: string;
  classificationOutput?: string;
  extractionPacket?: string;
  qaReport?: string;
  reviewQueue?: string;
  reviewDecisions?: string;
  revisionInstructions?: string;
  auditReport?: string;
};

export type SourceRunState = {
  source_id: string;
  pdf_path: string;
  title?: string;
  author?: string;
  editor?: string;
  translator?: string;
  current_stage: SourcePipelineStage;
  artifact_paths: SourceRunArtifactPaths;
  inventory_count: number;
  classified_candidate_count: number;
  extracted_candidate_count: number;
  qa_pass_count: number;
  approved_for_import_count: number;
  imported_count: number;
  direct_use_count: number;
  recommendable_count: number;
  held_count: number;
  validation_results: string[];
  open_review_items: string[];
  created_at: string;
  updated_at: string;
};

export type PageManifestEntry = {
  page: number;
  textPath: string;
  imagePath?: string;
  textCharCount: number;
  needsImageReview: boolean;
  visualSignals: string[];
};

export type PageChunk = {
  chunkId: string;
  sourceId: string;
  pageStart: number;
  pageEnd: number;
  text: string;
  pageRefs: Array<{
    page: number;
    textPath: string;
    imagePath?: string;
    visualSignals: string[];
  }>;
};

export type SourceInventoryRow = {
  row_id: string;
  source_location: string;
  item_type: SourceInventoryItemType;
  brief_source_safe_description: string;
  practice_action_signals: string[];
  beginning_middle_end_signals: string[];
  likely_carriers: string[];
  likely_purposes: string[];
  review_labels: SourceReviewLabel[];
  source_support_strength: "strong" | "medium" | "weak" | "unclear";
  visual_dependency: boolean;
  initial_disposition_placeholder: string;
};

export type SourceScanOutput = {
  source_id: string;
  source_fit: SourceFit;
  continue_recommendation: ContinueRecommendation;
  visual_processing_needed: boolean;
  source_sections_reviewed: string[];
  inventory_rows: SourceInventoryRow[];
  item_type_counts: Record<string, number>;
  expected_carriers: string[];
  expected_purposes: string[];
  review_labels_found: SourceReviewLabel[];
  open_questions: string[];
};

export type ClassificationRow = {
  row_id: string;
  outcome: ClassificationOutcome;
  reason: string;
  architecture_notes: string;
  source_support_notes: string;
  tim_decision_required?: boolean;
};

export type ClassificationOutput = {
  source_id: string;
  rows: ClassificationRow[];
  counts: Record<string, number>;
  open_questions: string[];
};

export type SourcePipelineCandidate = {
  candidateId: string;
  inventoryRowIds: string[];
  status: "draft_candidate";
  disposition?: CandidateDisposition;
  direct_use_target: TargetDecision;
  recommendation_target: RecommendationTargetDecision;
  reviewLabels: SourceReviewLabel[];
  sourceSupportSummary: string;
  knownConcerns: string[];
  runtimeRitual: Ritual;
};

export type ExtractionPacket = {
  source_id: string;
  packet_version: 1;
  candidates: SourcePipelineCandidate[];
  packet_notes: string[];
};

export type QaFinding = {
  candidateId?: string;
  outcome: QaOutcome;
  path: string;
  message: string;
};

export type PacketQaReport = {
  source_id: string;
  checked_at: string;
  valid: boolean;
  pass_count: number;
  findings: QaFinding[];
};

export type ReviewDecision = {
  candidateId: string;
  disposition: CandidateDisposition;
  direct_use_target: TargetDecision;
  recommendation_target: RecommendationTargetDecision;
  notes?: string;
  decided_at: string;
};

export type RevisionInstruction = {
  candidateId: string;
  instruction: string;
  created_at: string;
};

export type CandidateRevision = {
  candidate: SourcePipelineCandidate;
  changeSummary: string;
};
