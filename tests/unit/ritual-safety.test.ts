import { describe, expect, it } from "vitest";

import {
  isLowCapacitySafe,
  lowRiskRitualSafetyFlags,
  requiresSafetyReview,
  validateRitualSafety,
  withSafetyOverrides,
} from "../../src/lib/ritual-safety";

describe("ritual safety guardrails", () => {
  it("defines safe low-risk defaults", () => {
    expect(validateRitualSafety(lowRiskRitualSafetyFlags)).toEqual({
      allowed: true,
      blocks: [],
      warnings: [],
    });
    expect(isLowCapacitySafe(lowRiskRitualSafetyFlags)).toBe(true);
  });

  it("blocks essential oil ingestion", () => {
    const result = validateRitualSafety(lowRiskRitualSafetyFlags, [
      "Add essential oil to a drink and consume it.",
    ]);

    expect(result.allowed).toBe(false);
    expect(result.blocks).toContain("essential oil ingestion is blocked");
  });

  it("blocks smoke-cleansing defaults", () => {
    const result = validateRitualSafety(lowRiskRitualSafetyFlags, [
      "Smoke cleanse the room before the ritual.",
    ]);

    expect(result.allowed).toBe(false);
    expect(result.blocks).toContain("smoke-cleansing defaults are blocked");
  });

  it("allows real candle flame when fire safety is declared", () => {
    const unsafe = validateRitualSafety(lowRiskRitualSafetyFlags, [
      "Light a candle and sit quietly for two minutes.",
    ]);
    const liveFlame = validateRitualSafety(
      withSafetyOverrides({ fire: "live_flame" }),
      ["Light a candle and sit quietly for two minutes."],
    );

    expect(unsafe.allowed).toBe(false);
    expect(unsafe.blocks).toContain("candle work must declare fire safety");
    expect(liveFlame.allowed).toBe(true);
    expect(liveFlame.warnings).toContain(
      "live flame requires ordinary candle safety and supervision",
    );
  });

  it("blocks medical, fertility, pregnancy, legal, financial, and safety advice claims", () => {
    const medical = validateRitualSafety(lowRiskRitualSafetyFlags, [
      "Use this ritual to cure anxiety.",
    ]);
    const legal = validateRitualSafety(lowRiskRitualSafetyFlags, [
      "Treat this as legal advice for the household.",
    ]);

    expect(medical.allowed).toBe(false);
    expect(medical.blocks).toContain(
      "medical, fertility, and pregnancy claims are blocked",
    );
    expect(legal.allowed).toBe(false);
    expect(legal.blocks).toContain(
      "legal, financial, and physical safety advice is blocked",
    );
  });

  it("blocks crystal elixirs, raw flour crafts, and controlling another person", () => {
    const result = validateRitualSafety(lowRiskRitualSafetyFlags, [
      "Make crystal-infused water, use raw flour for a charm, and compel another person to call.",
    ]);

    expect(result.allowed).toBe(false);
    expect(result.blocks).toEqual(
      expect.arrayContaining([
        "crystal elixirs are blocked",
        "raw dough or flour crafts are blocked",
        "rituals aimed at controlling another person are blocked",
      ]),
    );
  });

  it("identifies review-required and low-capacity risks", () => {
    const flags = withSafetyOverrides({
      ingestion: "review_required",
      pets: "review_required",
      emotionalIntensity: "avoid_when_low_capacity",
      cleanupBurden: "high",
    });
    const result = validateRitualSafety(flags);

    expect(result.allowed).toBe(true);
    expect(result.warnings).toEqual(
      expect.arrayContaining([
        "ingestion requires safety review",
        "pet access needs explicit handling",
      ]),
    );
    expect(requiresSafetyReview(flags)).toBe(true);
    expect(isLowCapacitySafe(flags)).toBe(false);
  });

  it("keeps medical claims forbidden even when overrides are provided", () => {
    const flags = withSafetyOverrides({
      medicalClaims: "forbidden",
      allergies: ["placeholder allergy note"],
    });

    expect(flags.medicalClaims).toBe("forbidden");
    expect(flags.allergies).toEqual(["placeholder allergy note"]);
  });
});
