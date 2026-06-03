import { MoonPhase, SearchMoonPhase } from "astronomy-engine";

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

type MoonPhaseMilestone = {
  label: string;
  angleDegrees: 0 | 90 | 180 | 270;
};

const NEXT_MILESTONES: Record<MoonPhaseGlyphState, MoonPhaseMilestone> = {
  new: { label: "First quarter moon", angleDegrees: 90 },
  waxing_crescent: { label: "First quarter moon", angleDegrees: 90 },
  first_quarter: { label: "Full moon", angleDegrees: 180 },
  waxing_gibbous: { label: "Full moon", angleDegrees: 180 },
  full: { label: "Last quarter moon", angleDegrees: 270 },
  waning_gibbous: { label: "Last quarter moon", angleDegrees: 270 },
  last_quarter: { label: "New moon", angleDegrees: 0 },
  waning_crescent: { label: "New moon", angleDegrees: 0 },
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
  return NEXT_MILESTONES[getMoonPhaseGlyphStateForAngle(angleDegrees)].label;
}

function resolveDate(value: Date | string): Date {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("A valid date is required for the moon phase milestone.");
  }

  return date;
}

export function getNextMoonPhaseMilestoneForAngle(
  angleDegrees: number,
  date: Date | string = new Date(),
): { label: string; exactIso: string } {
  const start = resolveDate(date);
  const milestone = NEXT_MILESTONES[getMoonPhaseGlyphStateForAngle(angleDegrees)];
  const searchStart = new Date(start.getTime() + 60 * 1000);
  const eventTime = SearchMoonPhase(
    milestone.angleDegrees,
    searchStart,
    40,
  );

  if (!eventTime) {
    throw new Error("Could not find the next moon phase milestone.");
  }

  return {
    label: milestone.label,
    exactIso: eventTime.date.toISOString(),
  };
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
