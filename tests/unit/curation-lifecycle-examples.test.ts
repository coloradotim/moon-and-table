import { describe, expect, it } from "vitest";

import {
  ritualPatternLifecycleExamples,
  symbolicCardLifecycleExamples,
  timingRuleLifecycleExamples,
} from "../../src/data/curation-lifecycle-examples";
import { getApprovedRitualPatterns } from "../../src/data/ritual-patterns";
import { seedSymbolicCards } from "../../src/data/seed-symbolic-cards";
import { generateWeeklyBrief } from "../../src/lib/generate-weekly-brief";
import {
  getEligibleTimingInterpretationRules,
  isTimingInterpretationRuleEligible,
} from "../../src/lib/timing-interpretation-rules";

describe("curation lifecycle examples", () => {
  it("includes concrete privacy-safe card lifecycle states", () => {
    const statuses = symbolicCardLifecycleExamples.map(
      (example) => example.item.approval_status,
    );
    const serialized = JSON.stringify(symbolicCardLifecycleExamples).toLowerCase();

    expect(statuses).toEqual(
      expect.arrayContaining([
        "candidate",
        "needs_revision",
        "rejected",
        "retired",
      ]),
    );
    expect(symbolicCardLifecycleExamples.map((example) => example.reviewReason)).toEqual(
      expect.arrayContaining([
        "copied_source_risk",
        "deterministic_claim_risk",
        "weak_source_support",
        "superseded_by_better_content",
      ]),
    );
    expect(serialized).not.toContain("birth data");
    expect(serialized).not.toContain("relationship details");
    expect(serialized).not.toContain("private source text");
  });

  it("keeps lifecycle cards out of the active symbolic card library", () => {
    const activeCardKeys = seedSymbolicCards.map((card) => card.key);

    for (const example of symbolicCardLifecycleExamples) {
      expect(activeCardKeys).not.toContain(example.item.key);
      expect(example.item.approval_status).not.toBe("approved");
    }
  });

  it("includes draft and rejected ritual pattern lifecycle examples", () => {
    const statuses = ritualPatternLifecycleExamples.map(
      (example) => example.item.approvalStatus,
    );
    const approvedPatternKeys = getApprovedRitualPatterns().map(
      (pattern) => pattern.key,
    );

    expect(statuses).toEqual(expect.arrayContaining(["draft", "rejected"]));

    for (const example of ritualPatternLifecycleExamples) {
      expect(approvedPatternKeys).not.toContain(example.item.key);
      expect(example.item.approvalStatus).not.toBe("approved");
    }
  });

  it("keeps draft and rejected timing rule examples ineligible", () => {
    const eligibleRuleIds = getEligibleTimingInterpretationRules().map(
      (rule) => rule.id,
    );

    for (const example of timingRuleLifecycleExamples) {
      expect(eligibleRuleIds).not.toContain(example.item.id);
      expect(isTimingInterpretationRuleEligible(example.item)).toBe(false);
      expect(example.item.approvalStatus).not.toBe("approved");
    }
  });

  it("does not render lifecycle examples in generated brief output", () => {
    const brief = generateWeeklyBrief({
      currentDate: "2026-06-03T12:00:00.000Z",
      capacityMode: "low",
    });
    const generatedOutput = JSON.stringify({
      brief,
      decision: brief.decision,
      trace: brief.trace,
    });
    const lifecycleKeys = [
      ...symbolicCardLifecycleExamples.map((example) => example.item.key),
      ...ritualPatternLifecycleExamples.map((example) => example.item.key),
      ...timingRuleLifecycleExamples.map((example) => example.item.id),
    ];

    for (const key of lifecycleKeys) {
      expect(generatedOutput).not.toContain(key);
    }
  });
});
