import { MoonPhase } from "astronomy-engine";

import type { TimingFactKey } from "./generate-weekly-brief";

export const LUNAR_PHASE_BUCKETS = ["new", "waxing", "full", "waning"] as const;

export type LunarPhaseBucket = (typeof LUNAR_PHASE_BUCKETS)[number];

export type LunarTimingFact = {
  id: string;
  type: "moon_phase";
  key: Exclude<TimingFactKey, "numerology.6">;
  phase: LunarPhaseBucket;
  label: string;
  exactIso: string;
  dateStart: string;
  dateEnd: string;
  timezone: string;
  phaseAngleDegrees: number;
  computedBy: "astronomy_engine";
  confidence: "computed";
  relatedSymbolicKeys: string[];
};

const LUNAR_CARD_KEY_BY_PHASE: Record<LunarPhaseBucket, string> = {
  new: "new_moon",
  waxing: "waxing_moon",
  full: "full_moon",
  waning: "waning_moon",
};

const TIMING_FACT_KEY_BY_PHASE: Record<
  LunarPhaseBucket,
  Exclude<TimingFactKey, "numerology.6">
> = {
  new: "moon.new",
  waxing: "moon.waxing",
  full: "moon.full",
  waning: "moon.waning",
};

const LUNAR_PHASE_LABEL_BY_PHASE: Record<LunarPhaseBucket, string> = {
  new: "New moon",
  waxing: "Waxing moon",
  full: "Full moon",
  waning: "Waning moon",
};

function resolveDate(value: Date | string): Date {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("A valid date is required for lunar timing.");
  }

  return date;
}

function normalizePhaseAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

export function classifyLunarPhaseAngle(angle: number): LunarPhaseBucket {
  const normalizedAngle = normalizePhaseAngle(angle);

  if (normalizedAngle >= 315 || normalizedAngle < 45) {
    return "new";
  }

  if (normalizedAngle < 135) {
    return "waxing";
  }

  if (normalizedAngle < 225) {
    return "full";
  }

  return "waning";
}

function getUtcWeekBounds(date: Date): { dateStart: string; dateEnd: string } {
  const start = new Date(date);
  const day = start.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  start.setUTCDate(start.getUTCDate() + diffToMonday);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  end.setUTCHours(23, 59, 59, 999);

  return {
    dateStart: start.toISOString(),
    dateEnd: end.toISOString(),
  };
}

export function getLunarTimingFact(
  value: Date | string,
  timezone = "UTC",
): LunarTimingFact {
  const date = resolveDate(value);
  const phaseAngleDegrees = MoonPhase(date);
  const phase = classifyLunarPhaseAngle(phaseAngleDegrees);
  const { dateStart, dateEnd } = getUtcWeekBounds(date);

  return {
    id: `timing.moon_phase.${phase}.${dateStart.slice(0, 10)}`,
    type: "moon_phase",
    key: TIMING_FACT_KEY_BY_PHASE[phase],
    phase,
    label: LUNAR_PHASE_LABEL_BY_PHASE[phase],
    exactIso: date.toISOString(),
    dateStart,
    dateEnd,
    timezone,
    phaseAngleDegrees,
    computedBy: "astronomy_engine",
    confidence: "computed",
    relatedSymbolicKeys: [LUNAR_CARD_KEY_BY_PHASE[phase]],
  };
}
