import type { RitualPattern } from "./ritual-patterns";
import type { SymbolicCard } from "./seed-symbolic-cards";
import { lowRiskRitualSafetyFlags, withSafetyOverrides } from "../lib/ritual-safety";
import type { TimingInterpretationRule } from "../lib/timing-interpretation-rules";

export type CurationLifecycleExampleReason =
  | "copied_source_risk"
  | "safety_risk"
  | "deterministic_claim_risk"
  | "too_much_burden"
  | "weak_source_support"
  | "superseded_by_better_content";

export type CurationLifecycleExample<T> = {
  exampleId: string;
  reviewReason: CurationLifecycleExampleReason;
  curatorNote: string;
  item: T;
};

export const symbolicCardLifecycleExamples: Array<
  CurationLifecycleExample<SymbolicCard>
> = [
  {
    exampleId: "lifecycle_card_candidate_color_accent",
    reviewReason: "weak_source_support",
    curatorNote:
      "Candidate card can be held for the candle/color source batch until source notes are stronger.",
    item: {
      id: "card_lifecycle_candidate_color_accent",
      key: "lifecycle_candidate_color_accent",
      title: "Color Accent Candidate",
      category: "home_magic",
      summary: "A possible color accent card waiting for reviewed color source notes.",
      themes: ["color", "atmosphere", "attention"],
      good_for: ["future candle or light refinement"],
      ritual_styles: ["candle_or_light", "atmosphere"],
      ritual_ideas: ["Hold until reviewed color notes support a plain, optional accent."],
      avoid_saying: ["Do not imply color creates an outcome."],
      safety_notes: ["Keep color use optional and supply-free."],
      source_references: ["docs/content-audit.md#2-build-reviewed-candle-and-color-source-batch"],
      confidence: "experimental",
      approval_status: "candidate",
    },
  },
  {
    exampleId: "lifecycle_card_needs_revision_household_protection",
    reviewReason: "deterministic_claim_risk",
    curatorNote:
      "Needs revision because protection language can slide into overclaiming; revise toward protecting attention or rest.",
    item: {
      id: "card_lifecycle_needs_revision_household_protection",
      key: "lifecycle_needs_revision_household_protection",
      title: "Household Protection Revision Example",
      category: "home_magic",
      summary: "A revision example for shifting protection language toward attention, rest, and boundaries.",
      themes: ["attention", "rest", "boundaries"],
      good_for: ["curation review of overclaiming language"],
      ritual_styles: ["reflection", "home_tending"],
      ritual_ideas: ["Revise before use; do not generate from this example."],
      avoid_saying: ["Do not frame household protection as removing danger."],
      safety_notes: ["Safety and emergency needs require practical action outside ritual framing."],
      source_references: ["docs/content-audit.md#9-add-curation-lifecycle-examples"],
      confidence: "avoid",
      approval_status: "needs_revision",
    },
  },
  {
    exampleId: "lifecycle_card_rejected_copied_prompt",
    reviewReason: "copied_source_risk",
    curatorNote:
      "Rejected because a distinctive source prompt would need to be transformed before any card could be approved.",
    item: {
      id: "card_lifecycle_rejected_copied_prompt",
      key: "lifecycle_rejected_copied_prompt",
      title: "Rejected Copied Prompt Example",
      category: "moon_phase",
      summary: "Rejected fixture showing that source-like prompt wording is not eligible.",
      themes: ["review", "copyright", "transformation"],
      good_for: ["testing curation exclusion"],
      ritual_styles: ["reflection"],
      ritual_ideas: ["Do not use; transform the idea into original product language first."],
      avoid_saying: ["Do not copy a source prompt or ritual script."],
      safety_notes: ["No user-facing generation should use this fixture."],
      source_references: ["docs/curation-pipeline.md#knowledge-extraction"],
      confidence: "avoid",
      approval_status: "rejected",
    },
  },
  {
    exampleId: "lifecycle_card_retired_old_moon_wording",
    reviewReason: "superseded_by_better_content",
    curatorNote:
      "Retired because the current four-phase lunar cards are clearer and safer.",
    item: {
      id: "card_lifecycle_retired_old_moon_wording",
      key: "lifecycle_retired_old_moon_wording",
      title: "Retired Moon Wording Example",
      category: "moon_phase",
      summary: "Retired fixture for old lunar language replaced by the approved four-phase cards.",
      themes: ["retired", "lunar", "review"],
      good_for: ["testing retired-card exclusion"],
      ritual_styles: ["reflection"],
      ritual_ideas: ["Do not use; keep only as a lifecycle example."],
      avoid_saying: ["Do not revive retired wording without review."],
      safety_notes: ["Retired content is not eligible for generation."],
      source_references: ["docs/content-audit.md#symboliccard-coverage"],
      confidence: "avoid",
      approval_status: "retired",
    },
  },
];

export const ritualPatternLifecycleExamples: Array<
  CurationLifecycleExample<RitualPattern>
> = [
  {
    exampleId: "lifecycle_pattern_draft_shared_reset",
    reviewReason: "weak_source_support",
    curatorNote:
      "Draft pattern shows a plausible idea that needs better source notes and fit testing before approval.",
    item: {
      id: "ritual_pattern_lifecycle_draft_shared_reset",
      key: "lifecycle_draft_shared_reset",
      title: "Draft Shared Reset Example",
      summary: "Draft fixture for a shared-space practice that needs more review.",
      ritualStyles: ["shared_space", "home_tending"],
      capacityModes: ["steady"],
      defaultDurationMinutes: 15,
      materials: ["one shared space"],
      steps: ["Hold as a draft until source and fit review are complete."],
      safetyFlags: lowRiskRitualSafetyFlags,
      safetyNotes: ["Draft content is not eligible for generation."],
      avoidIf: ["avoid until reviewed"],
      sourceReferences: ["docs/content-audit.md#9-add-curation-lifecycle-examples"],
      approvalStatus: "draft",
    },
  },
  {
    exampleId: "lifecycle_pattern_rejected_high_burden",
    reviewReason: "too_much_burden",
    curatorNote:
      "Rejected because it would turn a supportive ritual into a large household project.",
    item: {
      id: "ritual_pattern_lifecycle_rejected_high_burden",
      key: "lifecycle_rejected_high_burden",
      title: "Rejected High-Burden Reset Example",
      summary: "Rejected fixture for a ritual that is too large for Moon & Table.",
      ritualStyles: ["home_tending", "large_task"],
      capacityModes: ["high"],
      defaultDurationMinutes: 30,
      materials: ["multiple rooms"],
      steps: ["Do not use; this belongs outside the approved low-overwhelm pattern set."],
      safetyFlags: withSafetyOverrides({ cleanupBurden: "high" }),
      safetyNotes: ["High-burden cleanup is not a good default ritual."],
      avoidIf: ["avoid when ritual would become a full household project"],
      sourceReferences: ["docs/content-audit.md#ritualpattern-coverage"],
      approvalStatus: "rejected",
    },
  },
];

export const timingRuleLifecycleExamples: Array<
  CurationLifecycleExample<TimingInterpretationRule>
> = [
  {
    exampleId: "lifecycle_timing_rule_draft_outer_planet",
    reviewReason: "weak_source_support",
    curatorNote:
      "Draft example for fact-only outer planet material that needs source-backed cards before eligibility.",
    item: {
      id: "timing_rule.lifecycle.draft_outer_planet",
      timingFactType: "planet_sign",
      condition: { planet: "uranus", sign: "taurus" },
      signalLabel: "Draft outer planet example",
      signalSummary:
        "Draft fixture only; outer planet facts stay fact-only until a reviewed source pass approves interpretation.",
      symbolicCardKeys: ["lifecycle_candidate_color_accent"],
      ritualStyleHints: ["reflection"],
      weight: 1,
      strength: "accent",
      avoidIf: ["unsupported_outer_planet_interpretation"],
      sourceReferences: ["docs/timing-engine-decision.md#deferred"],
      approvalStatus: "draft",
    },
  },
  {
    exampleId: "lifecycle_timing_rule_rejected_safety",
    reviewReason: "safety_risk",
    curatorNote:
      "Rejected example for timing interpretation that would overstep into advice outside ritual fit.",
    item: {
      id: "timing_rule.lifecycle.rejected_safety_advice",
      timingFactType: "moon_phase",
      condition: { phase: "full" },
      signalLabel: "Rejected safety advice example",
      signalSummary:
        "Rejected fixture only; timing rules cannot provide safety, health, legal, or emergency advice.",
      symbolicCardKeys: ["full_moon"],
      ritualStyleHints: ["reflection"],
      weight: 1,
      strength: "accent",
      avoidIf: ["advice_beyond_ritual_fit"],
      sourceReferences: ["docs/curation-pipeline.md#human-approval"],
      approvalStatus: "rejected",
    },
  },
];
