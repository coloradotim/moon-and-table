import { describe, expect, it } from "vitest";

import {
  formatContentLintResult,
  lintContentText,
  runContentLint,
} from "../../scripts/content-lint";

describe("content lint", () => {
  it("passes the current source-controlled content library", () => {
    const result = runContentLint({ contentSource: "git-index" });

    expect(result.valid).toBe(true);
    expect(result.findings).toEqual([]);
  }, 30_000);

  it("flags non-placeholder emails and private-data markers", () => {
    const findings = lintContentText(
      [
        "Use real.person@gmail.com in this fixture.",
        "The profile includes birth date and relationship details.",
      ].join("\n"),
    );

    expect(findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ruleId: "real-email" }),
        expect.objectContaining({ ruleId: "private-data-marker" }),
      ]),
    );
  });

  it("flags deterministic and blocked safety claims", () => {
    const findings = lintContentText(
      [
        "This ritual guarantees the outcome.",
        "Smoke cleanse the room and drink essential oil.",
        "Use this ritual to control another person.",
      ].join("\n"),
    );

    expect(findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ruleId: "deterministic-claim" }),
        expect.objectContaining({ ruleId: "blocked-safety-phrase" }),
        expect.objectContaining({ ruleId: "control-another-person" }),
      ]),
    );
  });

  it("allows explicit guardrails and placeholder emails", () => {
    const findings = lintContentText(
      [
        "Do not include birth date, relationship details, or private source text.",
        "Avoid guarantees, predictions, smoke cleansing, and essential oil ingestion.",
        "Use person_a@example.com as a placeholder email.",
      ].join("\n"),
    );

    expect(findings).toEqual([]);
  });

  it("formats findings for command-line output", () => {
    const findings = lintContentText("This guarantees success.");
    const formatted = formatContentLintResult({
      valid: false,
      findings,
    });

    expect(formatted).toContain("ERROR fixture.md:1 [deterministic-claim]");
  });
});
