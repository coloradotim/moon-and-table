import { describe, expect, it } from "vitest";

import {
  getMoonPhaseGlyphLabelForAngle,
  getMoonPhaseGlyphStateForAngle,
  getMoonPhaseGlyphSvg,
  getMoonPhaseGlyphSvgForAngle,
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
