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
  new: { label: "New moon", lightCx: -32, darkCx: 12, darkOpacity: 1 },
  waxing_crescent: { label: "Waxing crescent moon", lightCx: 12, darkCx: 7, darkOpacity: 1 },
  first_quarter: { label: "First quarter moon", lightCx: 12, darkCx: 0, darkOpacity: 1 },
  waxing_gibbous: { label: "Waxing gibbous moon", lightCx: 12, darkCx: -5, darkOpacity: 1 },
  full: { label: "Full moon", lightCx: 12, darkCx: 42, darkOpacity: 0 },
  waning_gibbous: { label: "Waning gibbous moon", lightCx: 12, darkCx: 17, darkOpacity: 1 },
  last_quarter: { label: "Last quarter moon", lightCx: 12, darkCx: 24, darkOpacity: 1 },
  waning_crescent: { label: "Waning crescent moon", lightCx: 12, darkCx: 29, darkOpacity: 1 },
};

const NEXT_QUARTER_LABELS: Record<MoonPhaseGlyphState, string> = {
  new: "First quarter moon",
  waxing_crescent: "First quarter moon",
  first_quarter: "Full moon",
  waxing_gibbous: "Full moon",
  full: "Last quarter moon",
  waning_gibbous: "Last quarter moon",
  last_quarter: "New moon",
  waning_crescent: "New moon",
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

export function getMoonPhaseGlyphLabelForAngle(angleDegrees: number): string {
  return GLYPH_SHAPES[getMoonPhaseGlyphStateForAngle(angleDegrees)].label;
}

export function getNextQuarterLabelForAngle(angleDegrees: number): string {
  return NEXT_QUARTER_LABELS[getMoonPhaseGlyphStateForAngle(angleDegrees)];
}

export function getMoonPhaseGlyphSvgForAngle(angleDegrees: number): string {
  const state = getMoonPhaseGlyphStateForAngle(angleDegrees);
  const shape = GLYPH_SHAPES[state];
  const darkCircle =
    shape.darkOpacity > 0
      ? `<circle cx="${shape.darkCx}" cy="12" r="9.6" fill="var(--moon-glyph-shadow, #f5f1e9)" opacity="${shape.darkOpacity}" />`
      : "";

  return `
    <svg
      class="moon-glyph moon-glyph--${state}"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      focusable="false"
      data-moon-phase-glyph="${state}"
      data-moon-phase-label="${shape.label}"
    >
      <circle cx="12" cy="12" r="10" fill="var(--moon-glyph-shadow, #f5f1e9)" stroke="currentColor" stroke-width="1.65" />
      <clipPath id="moon-glyph-clip-${state}">
        <circle cx="12" cy="12" r="9.25" />
      </clipPath>
      <g clip-path="url(#moon-glyph-clip-${state})">
        <circle cx="${shape.lightCx}" cy="12" r="9.25" fill="currentColor" />
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
