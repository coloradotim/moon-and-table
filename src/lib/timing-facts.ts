import {
  Body,
  Ecliptic,
  EclipticGeoMoon,
  GeoVector,
  MoonPhase,
  SearchMoonPhase,
  Seasons,
  SunPosition,
} from "astronomy-engine";

import {
  classifyLunarPhaseAngle,
  type LunarPhaseBucket,
} from "./lunar-timing";
import {
  getNumerologyTimingFacts,
  type NumerologyTimingFact,
  type NumerologyTimingScope,
} from "./numerology-timing";

export { getUniversalNumerologyNumbers } from "./numerology-timing";

export const TIMING_FACT_TYPES = [
  "moon_phase",
  "lunation",
  "moon_sign",
  "sun_sign",
  "solar_season",
  "planet_sign",
  "planet_retrograde",
  "planetary_aspect",
  "numerology_date",
  "calendar_threshold",
] as const;

export type TimingFactType = (typeof TIMING_FACT_TYPES)[number];

export type TimingFactComputedBy =
  | "astronomy_engine"
  | "app_numerology"
  | "app_calendar"
  | "manual";

export type TimingFactConfidence = "computed" | "estimated" | "manual";

export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type PlanetName =
  | "mercury"
  | "venus"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto";

export type SeasonalMarker =
  | "march_equinox"
  | "june_solstice"
  | "september_equinox"
  | "december_solstice";

export type MajorAspect =
  | "conjunction"
  | "opposition"
  | "square"
  | "trine"
  | "sextile";

export type NumerologyScope = NumerologyTimingScope;

export type CalendarThreshold =
  | "first_day_of_month"
  | "last_day_of_month"
  | "month_turn";

export type BaseTimingFact = {
  id: string;
  type: TimingFactType;
  label: string;
  startIso?: string;
  endIso?: string;
  exactIso?: string;
  timezone?: string;
  computedBy: TimingFactComputedBy;
  confidence: TimingFactConfidence;
};

export type SkyEvent = BaseTimingFact & {
  eventKey: string;
};

export type MoonPhaseFact = BaseTimingFact & {
  type: "moon_phase";
  phase: LunarPhaseBucket;
  phaseAngleDegrees: number;
};

export type LunationFact = BaseTimingFact & {
  type: "lunation";
  lunation: "new_moon" | "full_moon";
  phaseAngleDegrees: 0 | 180;
};

export type MoonSignFact = BaseTimingFact & {
  type: "moon_sign";
  sign: ZodiacSign;
  degree: number;
  eclipticLongitudeDegrees: number;
};

export type SunSignFact = BaseTimingFact & {
  type: "sun_sign";
  sign: ZodiacSign;
  degree: number;
  eclipticLongitudeDegrees: number;
};

export type SeasonalMarkerFact = BaseTimingFact & {
  type: "solar_season";
  marker: SeasonalMarker;
};

export type PlanetSignFact = BaseTimingFact & {
  type: "planet_sign";
  planet: PlanetName;
  sign: ZodiacSign;
  degree: number;
  eclipticLongitudeDegrees: number;
};

export type PlanetRetrogradeFact = BaseTimingFact & {
  type: "planet_retrograde";
  planet: PlanetName;
  isRetrograde: boolean;
  apparentDailyMotionDegrees: number;
};

export type PlanetaryAspectFact = BaseTimingFact & {
  type: "planetary_aspect";
  bodyA: "sun" | "moon" | PlanetName;
  bodyB: "sun" | "moon" | PlanetName;
  aspect: MajorAspect;
  angleDegrees: number;
  orbDegrees: number;
};

export type NumerologyDateFact = BaseTimingFact & NumerologyTimingFact;

export type CalendarThresholdFact = BaseTimingFact & {
  type: "calendar_threshold";
  threshold: CalendarThreshold;
  calendarUnit: "month";
  dateIso: string;
  monthName: string;
  previousMonthName?: string;
  nextMonthName?: string;
};

export type TimingFact =
  | MoonPhaseFact
  | LunationFact
  | MoonSignFact
  | SunSignFact
  | SeasonalMarkerFact
  | PlanetSignFact
  | PlanetRetrogradeFact
  | PlanetaryAspectFact
  | NumerologyDateFact
  | CalendarThresholdFact;

export type TimingFactOptions = {
  timezone?: string;
  aspectOrbDegrees?: number;
  includePlanetaryAspects?: boolean;
  includeRetrogrades?: boolean;
};

const ZODIAC_SIGNS: ZodiacSign[] = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const PLANET_BODIES: Record<PlanetName, Body> = {
  mercury: Body.Mercury,
  venus: Body.Venus,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
  uranus: Body.Uranus,
  neptune: Body.Neptune,
  pluto: Body.Pluto,
};

const ASPECT_ANGLES: Record<MajorAspect, number> = {
  conjunction: 0,
  opposition: 180,
  square: 90,
  trine: 120,
  sextile: 60,
};

const MOON_PHASE_LABELS: Record<LunarPhaseBucket, string> = {
  new: "New moon",
  waxing: "Waxing moon",
  full: "Full moon",
  waning: "Waning moon",
};

const SEASON_LABELS: Record<SeasonalMarker, string> = {
  march_equinox: "March equinox",
  june_solstice: "June solstice",
  september_equinox: "September equinox",
  december_solstice: "December solstice",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function resolveDate(value: Date | string): Date {
  const date = value instanceof Date ? new Date(value) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("A valid date is required for timing facts.");
  }

  return date;
}

function normalizeDegrees(value: number): number {
  return ((value % 360) + 360) % 360;
}

function signedLongitudeDelta(fromDegrees: number, toDegrees: number): number {
  const delta = normalizeDegrees(toDegrees - fromDegrees);

  return delta > 180 ? delta - 360 : delta;
}

function titleCase(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function roundDegrees(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export function getZodiacSignForLongitude(longitudeDegrees: number): {
  sign: ZodiacSign;
  degree: number;
} {
  const normalized = normalizeDegrees(longitudeDegrees);
  const signIndex = Math.floor(normalized / 30);

  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: roundDegrees(normalized - signIndex * 30),
  };
}

function getUtcWeekBounds(date: Date): { start: Date; end: Date } {
  const start = new Date(date);
  const day = start.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  start.setUTCDate(start.getUTCDate() + diffToMonday);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  end.setUTCHours(23, 59, 59, 999);

  return { start, end };
}

function getPlanetLongitude(planet: PlanetName, date: Date): number {
  return normalizeDegrees(Ecliptic(GeoVector(PLANET_BODIES[planet], date, true)).elon);
}

function getBodyLongitude(body: "sun" | "moon" | PlanetName, date: Date): number {
  if (body === "sun") {
    return normalizeDegrees(SunPosition(date).elon);
  }

  if (body === "moon") {
    return normalizeDegrees(EclipticGeoMoon(date).lon);
  }

  return getPlanetLongitude(body, date);
}

function buildMoonPhaseFact(
  date: Date,
  timezone: string,
): MoonPhaseFact {
  const { start, end } = getUtcWeekBounds(date);
  const phaseAngleDegrees = roundDegrees(MoonPhase(date));
  const phase = classifyLunarPhaseAngle(phaseAngleDegrees);

  return {
    id: `timing.moon_phase.${phase}.${start.toISOString().slice(0, 10)}`,
    type: "moon_phase",
    label: MOON_PHASE_LABELS[phase],
    startIso: start.toISOString(),
    endIso: end.toISOString(),
    timezone,
    phase,
    phaseAngleDegrees,
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function buildLunationFacts(date: Date, timezone: string): LunationFact[] {
  const { start, end } = getUtcWeekBounds(date);
  const targets = [
    { lunation: "new_moon" as const, angle: 0 as const, label: "New moon" },
    { lunation: "full_moon" as const, angle: 180 as const, label: "Full moon" },
  ];

  return targets.flatMap((target): LunationFact[] => {
    const eventTime = SearchMoonPhase(target.angle, start, 8);

    if (!eventTime || eventTime.date < start || eventTime.date > end) {
      return [];
    }

    return [{
      id: `timing.lunation.${target.lunation}.${eventTime.date.toISOString().slice(0, 10)}`,
      type: "lunation",
      label: `${target.label} exact`,
      exactIso: eventTime.date.toISOString(),
      timezone,
      lunation: target.lunation,
      phaseAngleDegrees: target.angle,
      computedBy: "astronomy_engine",
      confidence: "computed",
    }];
  });
}

function buildMoonSignFact(date: Date, timezone: string): MoonSignFact {
  const longitude = normalizeDegrees(EclipticGeoMoon(date).lon);
  const { sign, degree } = getZodiacSignForLongitude(longitude);

  return {
    id: `timing.moon_sign.${sign}.${date.toISOString().slice(0, 10)}`,
    type: "moon_sign",
    label: `Moon in ${titleCase(sign)}`,
    exactIso: date.toISOString(),
    timezone,
    sign,
    degree,
    eclipticLongitudeDegrees: roundDegrees(longitude),
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function buildSunSignFact(date: Date, timezone: string): SunSignFact {
  const longitude = normalizeDegrees(SunPosition(date).elon);
  const { sign, degree } = getZodiacSignForLongitude(longitude);

  return {
    id: `timing.sun_sign.${sign}.${date.toISOString().slice(0, 10)}`,
    type: "sun_sign",
    label: `Sun in ${titleCase(sign)}`,
    exactIso: date.toISOString(),
    timezone,
    sign,
    degree,
    eclipticLongitudeDegrees: roundDegrees(longitude),
    computedBy: "astronomy_engine",
    confidence: "computed",
  };
}

function buildSeasonalMarkerFacts(
  date: Date,
  timezone: string,
): SeasonalMarkerFact[] {
  const { start, end } = getUtcWeekBounds(date);
  const seasonInfo = Seasons(date.getUTCFullYear());
  const markers: Array<{ marker: SeasonalMarker; date: Date }> = [
    { marker: "march_equinox", date: seasonInfo.mar_equinox.date },
    { marker: "june_solstice", date: seasonInfo.jun_solstice.date },
    { marker: "september_equinox", date: seasonInfo.sep_equinox.date },
    { marker: "december_solstice", date: seasonInfo.dec_solstice.date },
  ];

  return markers
    .filter((marker) => marker.date >= start && marker.date <= end)
    .map((marker) => ({
      id: `timing.solar_season.${marker.marker}.${marker.date.toISOString().slice(0, 10)}`,
      type: "solar_season" as const,
      label: SEASON_LABELS[marker.marker],
      exactIso: marker.date.toISOString(),
      timezone,
      marker: marker.marker,
      computedBy: "astronomy_engine" as const,
      confidence: "computed" as const,
    }));
}

function startOfUtcDay(date: Date): Date {
  const start = new Date(date);

  start.setUTCHours(0, 0, 0, 0);

  return start;
}

function endOfUtcDay(date: Date): Date {
  const end = new Date(date);

  end.setUTCHours(23, 59, 59, 999);

  return end;
}

function lastUtcDateOfMonth(date: Date): number {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
}

function monthNameFor(year: number, monthIndex: number): string {
  const normalized = ((monthIndex % 12) + 12) % 12;

  return MONTH_NAMES[normalized];
}

function buildCalendarThresholdFact({
  date,
  timezone,
  threshold,
  label,
  previousMonthName,
  nextMonthName,
}: {
  date: Date;
  timezone: string;
  threshold: CalendarThreshold;
  label: string;
  previousMonthName?: string;
  nextMonthName?: string;
}): CalendarThresholdFact {
  const dayStart = startOfUtcDay(date);
  const dayEnd = endOfUtcDay(date);
  const dateIso = dayStart.toISOString().slice(0, 10);
  const monthName = monthNameFor(date.getUTCFullYear(), date.getUTCMonth());

  return {
    id: `timing.calendar_threshold.${threshold}.${dateIso}`,
    type: "calendar_threshold",
    label,
    startIso: dayStart.toISOString(),
    endIso: dayEnd.toISOString(),
    exactIso: dayStart.toISOString(),
    timezone,
    threshold,
    calendarUnit: "month",
    dateIso,
    monthName,
    previousMonthName,
    nextMonthName,
    computedBy: "app_calendar",
    confidence: "computed",
  };
}

export function getCalendarThresholdFacts(
  value: Date | string,
  timezone = "UTC",
): CalendarThresholdFact[] {
  const date = resolveDate(value);
  const dayOfMonth = date.getUTCDate();
  const lastDay = lastUtcDateOfMonth(date);
  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth();
  const monthName = monthNameFor(year, monthIndex);
  const previousMonthName = monthNameFor(year, monthIndex - 1);
  const nextMonthName = monthNameFor(year, monthIndex + 1);
  const facts: CalendarThresholdFact[] = [];

  if (dayOfMonth === 1) {
    facts.push(
      buildCalendarThresholdFact({
        date,
        timezone,
        threshold: "first_day_of_month",
        label: `First day of ${monthName}`,
        previousMonthName,
      }),
      buildCalendarThresholdFact({
        date,
        timezone,
        threshold: "month_turn",
        label: `Month turn into ${monthName}`,
        previousMonthName,
      }),
    );
  }

  if (dayOfMonth === lastDay) {
    facts.push(
      buildCalendarThresholdFact({
        date,
        timezone,
        threshold: "last_day_of_month",
        label: `Last day of ${monthName}`,
        nextMonthName,
      }),
      buildCalendarThresholdFact({
        date,
        timezone,
        threshold: "month_turn",
        label: `Month turn out of ${monthName}`,
        nextMonthName,
      }),
    );
  }

  return facts;
}

function buildPlanetSignFacts(date: Date, timezone: string): PlanetSignFact[] {
  return (Object.keys(PLANET_BODIES) as PlanetName[]).map((planet) => {
    const longitude = getPlanetLongitude(planet, date);
    const { sign, degree } = getZodiacSignForLongitude(longitude);

    return {
      id: `timing.planet_sign.${planet}.${sign}.${date.toISOString().slice(0, 10)}`,
      type: "planet_sign",
      label: `${titleCase(planet)} in ${titleCase(sign)}`,
      exactIso: date.toISOString(),
      timezone,
      planet,
      sign,
      degree,
      eclipticLongitudeDegrees: roundDegrees(longitude),
      computedBy: "astronomy_engine",
      confidence: "computed",
    };
  });
}

function buildPlanetRetrogradeFacts(
  date: Date,
  timezone: string,
): PlanetRetrogradeFact[] {
  const previous = new Date(date);
  const next = new Date(date);

  previous.setUTCDate(previous.getUTCDate() - 1);
  next.setUTCDate(next.getUTCDate() + 1);

  return (Object.keys(PLANET_BODIES) as PlanetName[]).map((planet) => {
    const previousLongitude = getPlanetLongitude(planet, previous);
    const nextLongitude = getPlanetLongitude(planet, next);
    const apparentDailyMotionDegrees = roundDegrees(
      signedLongitudeDelta(previousLongitude, nextLongitude) / 2,
    );
    const isRetrograde = apparentDailyMotionDegrees < 0;

    return {
      id: `timing.planet_retrograde.${planet}.${isRetrograde ? "retrograde" : "direct"}.${date.toISOString().slice(0, 10)}`,
      type: "planet_retrograde",
      label: `${titleCase(planet)} ${isRetrograde ? "retrograde" : "direct"}`,
      exactIso: date.toISOString(),
      timezone,
      planet,
      isRetrograde,
      apparentDailyMotionDegrees,
      computedBy: "astronomy_engine",
      confidence: "computed",
    };
  });
}

function closestAspect(
  angleDegrees: number,
  orbLimitDegrees: number,
): { aspect: MajorAspect; orbDegrees: number } | undefined {
  const normalizedAngle = normalizeDegrees(angleDegrees);
  const shortestAngle =
    normalizedAngle > 180 ? 360 - normalizedAngle : normalizedAngle;

  for (const [aspect, targetAngle] of Object.entries(ASPECT_ANGLES) as Array<[MajorAspect, number]>) {
    const orbDegrees = Math.abs(shortestAngle - targetAngle);

    if (orbDegrees <= orbLimitDegrees) {
      return { aspect, orbDegrees: roundDegrees(orbDegrees) };
    }
  }

  return undefined;
}

function buildPlanetaryAspectFacts(
  date: Date,
  timezone: string,
  orbLimitDegrees: number,
): PlanetaryAspectFact[] {
  const bodies: Array<"sun" | "moon" | PlanetName> = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
  ];
  const longitudes = new Map(
    bodies.map((body) => [body, getBodyLongitude(body, date)]),
  );
  const facts: PlanetaryAspectFact[] = [];

  for (let bodyIndex = 0; bodyIndex < bodies.length; bodyIndex += 1) {
    for (
      let comparisonIndex = bodyIndex + 1;
      comparisonIndex < bodies.length;
      comparisonIndex += 1
    ) {
      const bodyA = bodies[bodyIndex];
      const bodyB = bodies[comparisonIndex];
      const angleDegrees = Math.abs(
        signedLongitudeDelta(
          longitudes.get(bodyA) ?? 0,
          longitudes.get(bodyB) ?? 0,
        ),
      );
      const aspect = closestAspect(angleDegrees, orbLimitDegrees);

      if (aspect) {
        facts.push({
          id: `timing.planetary_aspect.${bodyA}.${aspect.aspect}.${bodyB}.${date.toISOString().slice(0, 10)}`,
          type: "planetary_aspect",
          label: `${titleCase(bodyA)} ${aspect.aspect} ${titleCase(bodyB)}`,
          exactIso: date.toISOString(),
          timezone,
          bodyA,
          bodyB,
          aspect: aspect.aspect,
          angleDegrees: roundDegrees(angleDegrees),
          orbDegrees: aspect.orbDegrees,
          computedBy: "astronomy_engine",
          confidence: "computed",
        });
      }
    }
  }

  return facts;
}

export function getTimingFactsForDate(
  value: Date | string,
  options: TimingFactOptions = {},
): TimingFact[] {
  const date = resolveDate(value);
  const timezone = options.timezone ?? "UTC";
  const includeRetrogrades = options.includeRetrogrades ?? true;
  const includePlanetaryAspects = options.includePlanetaryAspects ?? true;
  const aspectOrbDegrees = options.aspectOrbDegrees ?? 3;

  return [
    buildMoonPhaseFact(date, timezone),
    ...buildLunationFacts(date, timezone),
    buildMoonSignFact(date, timezone),
    buildSunSignFact(date, timezone),
    ...buildSeasonalMarkerFacts(date, timezone),
    ...buildPlanetSignFacts(date, timezone),
    ...(includeRetrogrades ? buildPlanetRetrogradeFacts(date, timezone) : []),
    ...(includePlanetaryAspects
      ? buildPlanetaryAspectFacts(date, timezone, aspectOrbDegrees)
      : []),
    ...getNumerologyTimingFacts(date, timezone),
    ...getCalendarThresholdFacts(date, timezone),
  ];
}
