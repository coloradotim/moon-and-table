import { MoonPhase } from "astronomy-engine";

export type MoonPhaseGlyphState =
  | "new"
  | "waxing_crescent"
  | "first_quarter"
  | "waxing_gibbous"
  | "full"
  | "waning_gibbous"
  | "last_quarter"
  | "waning_crescent";

type MoonPhaseGlyphShape = {
  label: string;
  lightCx: number;
  darkCx: number;
  darkOpacity: number;
};

const GLYPH_SHAPES: Record<MoonPhaseGlyphState, MoonPhaseGlyphShape> = {
  new: { label: "New moon", lightCx: -20, darkCx: 9, darkOpacity: 1 },
  waxing_crescent: { label: "Waxing crescent moon", lightCx: 9, darkCx: 5, darkOpacity: 1 },
  first_quarter: { label: "First quarter moon", lightCx: 9, darkCx: 0, darkOpacity: 1 },
  waxing_gibbous: { label: "Waxing gibbous moon", lightCx: 9, darkCx: -4, darkOpacity: 1 },
  full: { label: "Full moon", lightCx: 9, darkCx: 40, darkOpacity: 0 },
  waning_gibbous: { label: "Waning gibbous moon", lightCx: 9, darkCx: 14, darkOpacity: 1 },
  last_quarter: { label: "Last quarter moon", lightCx: 9, darkCx: 18, darkOpacity: 1 },
  waning_crescent: { label: "Waning crescent moon", lightCx: 9, darkCx: 22, darkOpacity: 1 },
};

function normalizePhaseAngle(angleDegrees: number): number {
  return ((angleDegrees % 360) + 360) % 360;
}

export function getMoonPhaseGlyphStateForAngle(
  angleDegrees: number,
): MoonPhaseGlyphState {
  const normalized = normalizePhaseAngle(angleDegrees);

  if (normalized < 22.5 || normalized >= 337.5) {
    return "new";
  }

  if (normalized < 67.5) {
    return "waxing_crescent";
  }

  if (normalized < 112.5) {
    return "first_quarter";
  }

  if (normalized < 157.5) {
    return "waxing_gibbous";
  }

  if (normalized < 202.5) {
    return "full";
  }

  if (normalized < 247.5) {
    return "waning_gibbous";
  }

  if (normalized < 292.5) {
    return "last_quarter";
  }

  return "waning_crescent";
}

export function getMoonPhaseGlyphSvgForAngle(angleDegrees: number): string {
  const state = getMoonPhaseGlyphStateForAngle(angleDegrees);
  const shape = GLYPH_SHAPES[state];
  const darkCircle =
    shape.darkOpacity > 0
      ? `<circle cx="${shape.darkCx}" cy="9" r="7.15" fill="var(--moon-glyph-shadow, #eef1eb)" opacity="${shape.darkOpacity}" />`
      : "";

  return `
    <svg
      class="moon-glyph moon-glyph--${state}"
      aria-hidden="true"
      viewBox="0 0 18 18"
      width="18"
      height="18"
      focusable="false"
      data-moon-phase-glyph="${state}"
      data-moon-phase-label="${shape.label}"
    >
      <circle cx="9" cy="9" r="7.25" fill="none" stroke="currentColor" stroke-width="1.4" />
      <clipPath id="moon-glyph-clip-${state}">
        <circle cx="9" cy="9" r="7.25" />
      </clipPath>
      <g clip-path="url(#moon-glyph-clip-${state})">
        <circle cx="${shape.lightCx}" cy="9" r="7.25" fill="currentColor" />
        ${darkCircle}
      </g>
    </svg>
  `;
}

export function getMoonPhaseGlyphSvg(date: Date | string = new Date()): string {
  const resolvedDate = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(resolvedDate.getTime())) {
    throw new Error("A valid date is required for the moon phase glyph.");
  }

  return getMoonPhaseGlyphSvgForAngle(MoonPhase(resolvedDate));
}
