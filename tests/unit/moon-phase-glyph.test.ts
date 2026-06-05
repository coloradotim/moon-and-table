import { describe, expect, it } from "vitest";

import {
  getMoonPhaseGlyphLabelForAngle,
  getMoonPhaseGlyphStateForAngle,
  getMoonPhaseGlyphSvg,
  getMoonPhaseGlyphSvgForAngle,
  getMoonPhaseGlyphVisualStepForAngle,
  getNextMoonPhaseMilestoneForAngle,
  getNextQuarterLabelForAngle,
} from "../../src/lib/moon-phase-glyph";

describe("moon phase glyph", () => {
  it("maps representative phase angles to stable visual states", () => {
    expect(getMoonPhaseGlyphStateForAngle(0)).toBe("new");
    expect(getMoonPhaseGlyphStateForAngle(45)).toBe("waxing_crescent");
    expect(getMoonPhaseGlyphStateForAngle(90)).toBe("first_quarter");
    expect(getMoonPhaseGlyphStateForAngle(135)).toBe("waxing_gibbous");
    expect(getMoonPhaseGlyphStateForAngle(180)).toBe("full");
    expect(getMoonPhaseGlyphStateForAngle(225)).toBe("waning_gibbous");
    expect(getMoonPhaseGlyphStateForAngle(270)).toBe("last_quarter");
    expect(getMoonPhaseGlyphStateForAngle(315)).toBe("waning_crescent");
  });

  it("renders decorative app-generated SVG with currentColor and no external refs", () => {
    const svg = getMoonPhaseGlyphSvgForAngle(180);

    expect(svg).toContain('aria-hidden="true"');
    expect(svg).toContain('data-moon-phase-glyph="full"');
    expect(svg).toContain('width="24"');
    expect(svg).toContain('height="24"');
    expect(svg).toContain("currentColor");
    expect(svg).not.toContain("<script");
    expect(svg).not.toContain("http");
  });

  it("returns current phase and next-quarter labels", () => {
    expect(getMoonPhaseGlyphLabelForAngle(180)).toBe("Full moon");
    expect(getNextQuarterLabelForAngle(180)).toBe("Last quarter moon");
    expect(getMoonPhaseGlyphLabelForAngle(45)).toBe("Waxing crescent moon");
    expect(getNextQuarterLabelForAngle(45)).toBe("First quarter moon");
  });

  it("renders waxing and waning gibbous glyphs with physical light-side orientation", () => {
    const waxingGibbous = getMoonPhaseGlyphSvgForAngle(135);
    const waningGibbous = getMoonPhaseGlyphSvgForAngle(225);

    expect(waxingGibbous).toContain('data-moon-phase-glyph="waxing_gibbous"');
    expect(waxingGibbous).toContain('data-moon-phase-lit-side="right"');
    expect(waxingGibbous).toContain('data-moon-phase-visual-step="6"');
    expect(waxingGibbous).toContain('cx="14.64"');
    expect(waningGibbous).toContain('data-moon-phase-glyph="waning_gibbous"');
    expect(waningGibbous).toContain('data-moon-phase-lit-side="left"');
    expect(waningGibbous).toContain('data-moon-phase-visual-step="10"');
    expect(waningGibbous).toContain('cx="9.36"');
  });

  it("uses sixteen visual steps for smoother phase rendering", () => {
    expect(getMoonPhaseGlyphVisualStepForAngle(0)).toBe(0);
    expect(getMoonPhaseGlyphVisualStepForAngle(11)).toBe(0);
    expect(getMoonPhaseGlyphVisualStepForAngle(12)).toBe(1);
    expect(getMoonPhaseGlyphVisualStepForAngle(135)).toBe(6);
    expect(getMoonPhaseGlyphVisualStepForAngle(180)).toBe(8);
    expect(getMoonPhaseGlyphVisualStepForAngle(225)).toBe(10);
    expect(getMoonPhaseGlyphVisualStepForAngle(359)).toBe(0);
  });

  it("renders June 5, 2026 as a waning gibbous glyph with light on the left", () => {
    const juneFifth = getMoonPhaseGlyphSvg("2026-06-05T12:00:00-06:00");

    expect(juneFifth).toContain('data-moon-phase-glyph="waning_gibbous"');
    expect(juneFifth).toContain('data-moon-phase-lit-side="left"');
    expect(juneFifth).not.toContain('data-moon-phase-lit-side="none"');
  });

  it("finds the next lunar milestone date from astronomy calculations", () => {
    const milestone = getNextMoonPhaseMilestoneForAngle(
      225,
      "2026-06-03T12:00:00.000Z",
    );

    expect(milestone.label).toBe("Last quarter moon");
    expect(milestone.exactIso.slice(0, 10)).toBe("2026-06-08");
  });

  it("changes SVG state for different phase dates", () => {
    const newMoon = getMoonPhaseGlyphSvg("2026-06-15T03:00:00.000Z");
    const fullMoon = getMoonPhaseGlyphSvg("2026-06-30T00:00:00.000Z");

    expect(newMoon).toContain('data-moon-phase-glyph="new"');
    expect(fullMoon).toContain('data-moon-phase-glyph="full"');
    expect(newMoon).not.toEqual(fullMoon);
  });

  it("rejects invalid dates", () => {
    expect(() => getMoonPhaseGlyphSvg("not-a-date")).toThrow(
      "A valid date is required for the moon phase glyph.",
    );
  });
});
