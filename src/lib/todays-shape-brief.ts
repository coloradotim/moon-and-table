import type {
  AstrologyVisibility,
  PrivateNatalProfile,
} from "./private-data-schema";
import {
  getMoonPhaseGlyphLabelForAngle,
  getNextMoonPhaseMilestoneForAngle,
} from "./moon-phase-glyph";
import {
  getDefaultTimingTimezone,
  getTimingFactsForDate,
  type CalendarThresholdFact,
  type LunationFact,
  type MoonPhaseFact,
  type MoonSignFact,
  type NumerologyDateFact,
  type PlanetSignFact,
  type SeasonalMarkerFact,
  type SunSignFact,
  type TimingFact,
  type ZodiacSign,
} from "./timing-facts";
import {
  getTimingWindowCandidates,
  type TimingWindowCandidate,
} from "./timing-window-candidates";

export type TodaysShapeTimingAuthority = "shape_only" | "may_lead";

export type TodaysShapeChip = {
  label: string;
  kind:
    | "moon"
    | "calendar"
    | "seasonal"
    | "astrology"
    | "private_contact"
    | "numerology";
  emphasis: "primary" | "supporting" | "accent";
};

export type TodaysShapeDetail = {
  title: "Moon" | "Calendar" | "Season" | "Private timing" | "Numerology";
  body: string;
};

export type TodaysShapeBrief = {
  title: "Today’s shape";
  summary: string;
  chips: TodaysShapeChip[];
  details?: TodaysShapeDetail[];
  timingAuthority: TodaysShapeTimingAuthority;
  majorEventPresent: boolean;
};

export type CreateTodaysShapeBriefInput = {
  currentDate?: Date | string;
  timezone?: string;
  timeScope?: "today" | "best_moment_this_week";
  computedTimingFacts?: TimingFact[];
  timingWindowCandidates?: TimingWindowCandidate[];
  privateNatalProfiles?: PrivateNatalProfile[];
  astrologyVisibility?: AstrologyVisibility;
  majorNumerologyNumbers?: number[];
};

const NUMEROLOGY_ACCENT_COPY: Record<number, string> = {
  1: "A 1 note supports one small beginning.",
  2: "A 2 note adds cooperation and balance.",
  3: "A 3 note adds warmth and expression.",
  4: "A 4 note adds structure and repair.",
  5: "A 5 note adds movement and fresh air.",
  6: "A 6 note adds home care.",
  7: "A 7 note adds reflection and sorting.",
  8: "An 8 note adds steadiness and capacity.",
  9: "A 9 note adds completion and release.",
};

function resolveDate(value: Date | string | undefined): Date {
  const date =
    value === undefined
      ? new Date()
      : value instanceof Date
        ? new Date(value)
        : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("A valid date is required for Today’s shape.");
  }

  return date;
}

function localDateKey(date: Date, timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    calendar: "gregory",
    numberingSystem: "latn",
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const valueByType = new Map(parts.map((part) => [part.type, part.value]));

  return [
    valueByType.get("year"),
    valueByType.get("month"),
    valueByType.get("day"),
  ].join("-");
}

function localCalendarDaysBetween(
  startDate: Date,
  endIso: string,
  timezone: string,
): number {
  const [startYear, startMonth, startDay] = localDateKey(startDate, timezone)
    .split("-")
    .map(Number);
  const [endYear, endMonth, endDay] = localDateKey(new Date(endIso), timezone)
    .split("-")
    .map(Number);
  const startUtc = Date.UTC(startYear, startMonth - 1, startDay);
  const endUtc = Date.UTC(endYear, endMonth - 1, endDay);

  return Math.round((endUtc - startUtc) / 86_400_000);
}

function weekdayLabel(iso: string, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: timezone,
  }).format(new Date(iso));
}

function dateLabel(iso: string, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    timeZone: timezone,
  }).format(new Date(iso));
}

function factDateMatchesToday(
  fact: Pick<TimingFact, "exactIso" | "startIso">,
  todayKey: string,
  timezone: string,
): boolean {
  const iso = fact.exactIso ?? fact.startIso;

  return iso ? localDateKey(new Date(iso), timezone) === todayKey : false;
}

function getLocalDateParts(
  date: Date,
  timezone: string,
): {
  month: number;
  day: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    calendar: "gregory",
    numberingSystem: "latn",
    timeZone: timezone,
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const valueByType = new Map(parts.map((part) => [part.type, part.value]));

  return {
    month: Number(valueByType.get("month")),
    day: Number(valueByType.get("day")),
  };
}

function findMoonPhaseFact(facts: TimingFact[]): MoonPhaseFact {
  const fact = facts.find(
    (item): item is MoonPhaseFact => item.type === "moon_phase",
  );

  if (!fact) {
    throw new Error("Today’s shape needs a moon phase fact.");
  }

  return fact;
}

function findMoonSignFact(facts: TimingFact[]): MoonSignFact | undefined {
  return facts.find((fact): fact is MoonSignFact => fact.type === "moon_sign");
}

function findSunSignFact(facts: TimingFact[]): SunSignFact | undefined {
  return facts.find((fact): fact is SunSignFact => fact.type === "sun_sign");
}

function findPlanetSignFact(
  facts: TimingFact[],
  planet: PlanetSignFact["planet"],
): PlanetSignFact | undefined {
  return facts.find(
    (fact): fact is PlanetSignFact =>
      fact.type === "planet_sign" && fact.planet === planet,
  );
}

function findTodayLunation(
  facts: TimingFact[],
  todayKey: string,
  timezone: string,
): LunationFact | undefined {
  return facts.find(
    (fact): fact is LunationFact =>
      fact.type === "lunation" &&
      factDateMatchesToday(fact, todayKey, timezone),
  );
}

function findTodaySeasonalMarker(
  facts: TimingFact[],
  todayKey: string,
  timezone: string,
): SeasonalMarkerFact | undefined {
  return facts.find(
    (fact): fact is SeasonalMarkerFact =>
      fact.type === "solar_season" &&
      factDateMatchesToday(fact, todayKey, timezone),
  );
}

function findTodayCalendarThreshold(
  facts: TimingFact[],
): CalendarThresholdFact | undefined {
  return facts.find(
    (fact): fact is CalendarThresholdFact => fact.type === "calendar_threshold",
  );
}

function findNumerologyAccent(
  facts: TimingFact[],
): NumerologyDateFact | undefined {
  return facts.find(
    (fact): fact is NumerologyDateFact =>
      fact.type === "numerology_date" && fact.scope === "universal_day",
  );
}

function findBestWeekMajorCandidate(
  candidates: TimingWindowCandidate[],
): TimingWindowCandidate | undefined {
  return candidates.find(isMajorCandidate);
}

function isMajorCandidate(candidate: TimingWindowCandidate): boolean {
  return (
    candidate.strength === "primary" &&
    candidate.timingFacts.some(
      (fact) =>
        fact.type === "lunation" ||
        fact.type === "solar_season" ||
        fact.type === "calendar_threshold" ||
        fact.type === "planetary_aspect",
    )
  );
}

function findNearbyMajorCandidate(
  candidates: TimingWindowCandidate[],
  currentDate: Date,
  timezone: string,
): TimingWindowCandidate | undefined {
  return candidates
    .filter(isMajorCandidate)
    .map((candidate) => ({
      candidate,
      daysAway: localCalendarDaysBetween(
        currentDate,
        candidate.startsAtIso,
        timezone,
      ),
    }))
    .filter(({ daysAway }) => daysAway > 0 && daysAway <= 3)
    .sort(
      (a, b) =>
        a.daysAway - b.daysAway || b.candidate.score - a.candidate.score,
    )
    .map(({ candidate }) => candidate)[0];
}

function calendarSummary(fact: CalendarThresholdFact): string {
  if (fact.threshold === "month_turn") {
    return "The month is turning. This is threshold weather: last word, first word, returning one object, or marking what crosses forward.";
  }

  if (fact.threshold === "first_day_of_month") {
    return `${fact.label}. This is threshold weather: first word, first step, or one object crossing forward.`;
  }

  return `${fact.label}. This is threshold weather: last word, return, emptying, or setting one thing down.`;
}

function yearThresholdSummary(
  date: Date,
  timezone: string,
): string | undefined {
  const { month, day } = getLocalDateParts(date, timezone);

  if (month === 1 && day === 1) {
    return "The year has just opened. This is threshold weather: first word, first light, or one small beginning that does not need to become a plan.";
  }

  if (month === 12 && day === 31) {
    return "The year is closing. This is threshold weather: last word, return, putting away, or letting one thing be complete.";
  }

  return undefined;
}

function sentenceCase(value: string): string {
  return value
    .split("_")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function getMoonIlluminationPercent(phaseAngleDegrees: number): number {
  const radians = phaseAngleDegrees * (Math.PI / 180);

  return Math.round(((1 - Math.cos(radians)) / 2) * 100);
}

function getLunarCycleDay(phaseAngleDegrees: number): number {
  return Math.max(1, Math.round((phaseAngleDegrees / 360) * 29.53));
}

function moonObservationSummary(
  moonLabel: string,
  phaseAngleDegrees: number,
): string {
  const illumination = getMoonIlluminationPercent(phaseAngleDegrees);
  const cycleDay = getLunarCycleDay(phaseAngleDegrees);
  const phaseLabel = moonLabel.replace(/\s+moon$/i, "");

  return `Today, the moon is in its ${phaseLabel.toLowerCase()} phase, about ${illumination}% illuminated and roughly ${cycleDay} days into its 29.5-day cycle.`;
}

function zodiacSummary(facts: TimingFact[]): string | undefined {
  const moonSign = findMoonSignFact(facts);
  const sunSign = findSunSignFact(facts);
  const mercurySign = findPlanetSignFact(facts, "mercury");
  const venusSign = findPlanetSignFact(facts, "venus");

  if (!moonSign && !sunSign) {
    return undefined;
  }

  const moonSun = [
    moonSign ? `The Moon is in ${sentenceCase(moonSign.sign)}` : undefined,
    sunSign ? `the Sun is in ${sentenceCase(sunSign.sign)}` : undefined,
  ]
    .filter(Boolean)
    .join(" and ");
  const personalPlanets =
    mercurySign && venusSign && mercurySign.sign === venusSign.sign
      ? `Mercury and Venus are in ${sentenceCase(mercurySign.sign)}`
      : [
          mercurySign
            ? `Mercury is in ${sentenceCase(mercurySign.sign)}`
            : undefined,
          venusSign ? `Venus is in ${sentenceCase(venusSign.sign)}` : undefined,
        ]
          .filter(Boolean)
          .join(" and ");

  if (personalPlanets) {
    return `${moonSun}; ${personalPlanets}.`;
  }

  return `${moonSun}.`;
}

const AIR_SIGNS = new Set<ZodiacSign>(["gemini", "libra", "aquarius"]);

function timingSynthesis({
  facts,
  moonLabel,
  nextMilestoneLabel,
  nextMilestoneDay,
  nextMilestoneDaysAway,
  nearbyMajorCandidate,
  timezone,
}: {
  facts: TimingFact[];
  moonLabel: string;
  nextMilestoneLabel: string;
  nextMilestoneDay: string;
  nextMilestoneDaysAway: number;
  nearbyMajorCandidate?: TimingWindowCandidate;
  timezone: string;
}): string {
  const moonSign = findMoonSignFact(facts);
  const sunSign = findSunSignFact(facts);
  const mercurySign = findPlanetSignFact(facts, "mercury");
  const venusSign = findPlanetSignFact(facts, "venus");
  const waning = /waning/i.test(moonLabel);
  const movingTowardLastQuarter = /last quarter/i.test(nextMilestoneLabel);
  const airMoonSun =
    moonSign &&
    sunSign &&
    AIR_SIGNS.has(moonSign.sign) &&
    AIR_SIGNS.has(sunSign.sign);
  const mercuryVenusCancer =
    mercurySign?.sign === "cancer" && venusSign?.sign === "cancer";

  if (waning && movingTowardLastQuarter && airMoonSun && mercuryVenusCancer) {
    return `Today’s timing is more for noticing the pattern than forcing a turn. The waning moon is moving toward ${nextMilestoneDay}’s last quarter, while the Moon in Aquarius and Sun in Gemini keep the day mental and observational. Mercury and Venus in Cancer pull that attention back toward home and care.`;
  }

  if (waning && movingTowardLastQuarter) {
    return "Today’s timing is more for noticing what is already changing than forcing a turn. The waning moon is moving toward the last quarter, so the day can stay simple and observational.";
  }

  if (nextMilestoneDaysAway > 0 && nextMilestoneDaysAway <= 3) {
    const lunarSummary = nearbyLunarMilestoneSummary(
      nextMilestoneLabel,
      nextMilestoneDay,
    );

    if (lunarSummary) {
      return lunarSummary;
    }
  }

  if (nearbyMajorCandidate) {
    return nearbyMarkerSummary(nearbyMajorCandidate, timezone);
  }

  return "No large timing marker is at the center today; the day can stay simple.";
}

function joinSummaryParagraphs(paragraphs: Array<string | undefined>): string {
  return paragraphs.filter(Boolean).join("\n\n");
}

function moonPhaseSummary(
  moonLabel: string,
  nextLabel: string,
  nextIso: string,
  timezone: string,
): string {
  if (/waning/i.test(moonLabel)) {
    return `${moonLabel}. Next lunar milestone: ${nextLabel} on ${weekdayLabel(nextIso, timezone)}. The moment favors lowering, returning, and letting one thing take up less room.`;
  }

  if (/waxing/i.test(moonLabel)) {
    return `${moonLabel}. Next lunar milestone: ${nextLabel} on ${weekdayLabel(nextIso, timezone)}. The moment favors tending what is growing without rushing it.`;
  }

  if (/full/i.test(moonLabel)) {
    return `${moonLabel}. Next lunar milestone: ${nextLabel} on ${weekdayLabel(nextIso, timezone)}. The moment favors witnessing what is visible, then closing it cleanly.`;
  }

  return `${moonLabel}. Next lunar milestone: ${nextLabel} on ${weekdayLabel(nextIso, timezone)}. The moment favors one small beginning, first light, or a phrase that does not need to become a plan.`;
}

function lunationSummary(
  fact: LunationFact,
  numerology?: NumerologyDateFact,
): string {
  if (fact.lunation === "new_moon") {
    return `New moon today${numerology ? `, with a ${numerology.number} note in the date` : ""}.\n\nGood weather for a small beginning: first light, one clear phrase, or one small place made ready.\n\nLet the beginning stay quiet and chosen, not big enough to become a project.`;
  }

  return `Full moon today${numerology ? `, with a ${numerology.number} note in the date` : ""}.\n\nGood weather for witnessing one clear thing: name what is visible, close what is complete, and leave the rest unargued.`;
}

function seasonalSummary(fact: SeasonalMarkerFact): string {
  if (fact.marker.includes("solstice")) {
    return `${fact.label} is in the weather. Let light and dark mark the room without turning the day into a public script.`;
  }

  return `${fact.label} is in the weather. Let balance, threshold, and return stay small enough for the check-in to choose the path.`;
}

function bestWeekSummary(
  candidate: TimingWindowCandidate,
  timezone: string,
): string {
  const day = dateLabel(candidate.startsAtIso, timezone);

  if (/full moon/i.test(candidate.label)) {
    return `Full moon comes within the week, around ${day}. It can stand near the front if your check-in wants visible light, witness, or a clear closing.`;
  }

  if (/new moon/i.test(candidate.label)) {
    return `New moon comes within the week, around ${day}. It can stand near the front if your check-in wants a beginning, first light, or one quiet reset.`;
  }

  if (/solstice|equinox/i.test(candidate.label)) {
    return `${candidate.label} comes within the week, around ${day}. This is seasonal threshold weather, but the check-in still chooses the path.`;
  }

  return `${candidate.label} stands out within the week, around ${day}. It is real threshold weather, but the check-in still chooses the ritual.`;
}

function nearbyMarkerSummary(
  candidate: TimingWindowCandidate,
  timezone: string,
): string {
  const day = weekdayLabel(candidate.startsAtIso, timezone);
  const label = candidate.label;

  if (/new moon/i.test(label)) {
    return `The new moon is close enough to be in the weather, but not here yet. This is good timing for lowering the lights, clearing one small place, or letting a beginning stay quiet until ${day}.`;
  }

  if (/full moon/i.test(label)) {
    return `The full moon is close enough to be in the weather, but not here yet. This is good timing for noticing what is becoming visible without making the day perform like the full moon has already arrived.`;
  }

  if (/solstice|equinox/i.test(label)) {
    return `${label} is close enough to be in the weather, but not here yet. Let the threshold gather quietly before it becomes the center.`;
  }

  return `${label} is close enough to be in the weather, but not here yet. Let it color the day without making the check-in serve only that timing.`;
}

function nearbyLunarMilestoneSummary(
  nextMilestoneLabel: string,
  nextMilestoneDay: string,
): string | undefined {
  if (/new moon/i.test(nextMilestoneLabel)) {
    return `The new moon is close enough to be in the weather, but not here yet. This is good timing for lowering the lights, clearing one small place, or letting a beginning stay quiet until ${nextMilestoneDay}.`;
  }

  if (/full moon/i.test(nextMilestoneLabel)) {
    return `The full moon is close enough to be in the weather, but not here yet. This is good timing for noticing what is becoming visible without making the day perform like the full moon has already arrived.`;
  }

  if (/last quarter/i.test(nextMilestoneLabel)) {
    return `The last quarter moon is close enough to be in the weather, but not here yet. This is good timing for noticing what is ready to be reduced, returned, or made simpler by ${nextMilestoneDay}.`;
  }

  if (/first quarter/i.test(nextMilestoneLabel)) {
    return `The first quarter moon is close enough to be in the weather, but not here yet. This is good timing for giving one small beginning a little structure before ${nextMilestoneDay}.`;
  }

  return undefined;
}

function makeChip(
  label: string,
  kind: TodaysShapeChip["kind"],
  emphasis: TodaysShapeChip["emphasis"],
): TodaysShapeChip {
  return { label, kind, emphasis };
}

function uniqueChips(chips: TodaysShapeChip[]): TodaysShapeChip[] {
  const seen = new Set<string>();

  return chips.filter((chip) => {
    const key = `${chip.kind}:${chip.label}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function createTodaysShapeBrief(
  input: CreateTodaysShapeBriefInput = {},
): TodaysShapeBrief {
  const currentDate = resolveDate(input.currentDate);
  const timezone = input.timezone ?? getDefaultTimingTimezone();
  const timeScope = input.timeScope ?? "today";
  const facts =
    input.computedTimingFacts ??
    getTimingFactsForDate(currentDate, {
      timezone,
    });
  const todayKey = localDateKey(currentDate, timezone);
  const moon = findMoonPhaseFact(facts);
  const moonLabel = getMoonPhaseGlyphLabelForAngle(moon.phaseAngleDegrees);
  const moonObservation = moonObservationSummary(
    moonLabel,
    moon.phaseAngleDegrees,
  );
  const zodiac = zodiacSummary(facts);
  const nextMilestone = getNextMoonPhaseMilestoneForAngle(
    moon.phaseAngleDegrees,
    currentDate,
  );
  const numerology = findNumerologyAccent(facts);
  const majorNumerologyNumbers = new Set(input.majorNumerologyNumbers ?? []);
  const numerologyIsMajor = numerology
    ? majorNumerologyNumbers.has(numerology.number)
    : false;
  const privateCandidates =
    input.timingWindowCandidates ??
    (input.privateNatalProfiles && input.privateNatalProfiles.length > 0
      ? getTimingWindowCandidates({
          startDate: currentDate,
          timezone,
          privateNatalProfiles: input.privateNatalProfiles,
          astrologyVisibility: input.astrologyVisibility,
          daysAhead: timeScope === "best_moment_this_week" ? 7 : 1,
          options: {
            includePlanetaryAspects: false,
            includeRetrogrades: false,
            maxCandidates: 12,
          },
        })
      : []);
  const privateContact = privateCandidates.find(
    (candidate) => candidate.natalContactKeys.length > 0,
  );
  const chips: TodaysShapeChip[] = [
    makeChip(
      `${moonLabel}; next ${nextMilestone.label.toLowerCase()}`,
      "moon",
      "supporting",
    ),
  ];
  const details: TodaysShapeDetail[] = [
    {
      title: "Moon",
      body: `${moonLabel}. Next lunar milestone: ${nextMilestone.label} on ${dateLabel(nextMilestone.exactIso, timezone)}.`,
    },
  ];
  let summary = moonPhaseSummary(
    moonLabel,
    nextMilestone.label,
    nextMilestone.exactIso,
    timezone,
  );
  let majorEventPresent = false;
  let timingAuthority: TodaysShapeTimingAuthority = "shape_only";

  const todayLunation = findTodayLunation(facts, todayKey, timezone);
  const todayCalendarThreshold = findTodayCalendarThreshold(facts);
  const todaySeasonalMarker = findTodaySeasonalMarker(
    facts,
    todayKey,
    timezone,
  );
  const yearThreshold = yearThresholdSummary(currentDate, timezone);
  const nearbyCandidatePool =
    input.timingWindowCandidates ??
    getTimingWindowCandidates({
      startDate: currentDate,
      timezone,
      daysAhead: 4,
      options: { maxCandidates: 12 },
    });
  const nearbyMajorCandidate =
    timeScope === "today"
      ? findNearbyMajorCandidate(nearbyCandidatePool, currentDate, timezone)
      : undefined;
  const bestWeekMajorCandidate =
    timeScope === "best_moment_this_week"
      ? findBestWeekMajorCandidate(
          input.timingWindowCandidates ??
            getTimingWindowCandidates({
              startDate: currentDate,
              timezone,
              daysAhead: 7,
              options: { maxCandidates: 12 },
            }),
        )
      : undefined;

  if (todayLunation) {
    summary = lunationSummary(
      todayLunation,
      numerologyIsMajor ? numerology : undefined,
    );
    chips.push(
      makeChip(
        todayLunation.lunation === "new_moon"
          ? "New moon today"
          : "Full moon today",
        "moon",
        "primary",
      ),
    );
    majorEventPresent = true;
    timingAuthority = "may_lead";
  } else if (yearThreshold) {
    summary = yearThreshold;
    chips.push(
      makeChip(
        summary.startsWith("The year has") ? "Year beginning" : "Year ending",
        "calendar",
        "primary",
      ),
    );
    details.push({
      title: "Calendar",
      body: summary.startsWith("The year has")
        ? "First day of the year."
        : "Last day of the year.",
    });
    majorEventPresent = true;
    timingAuthority = "may_lead";
  } else if (todayCalendarThreshold) {
    summary = calendarSummary(todayCalendarThreshold);
    chips.push(makeChip(todayCalendarThreshold.label, "calendar", "primary"));
    details.push({ title: "Calendar", body: todayCalendarThreshold.label });
    majorEventPresent = true;
    timingAuthority = "may_lead";
  } else if (todaySeasonalMarker) {
    summary = seasonalSummary(todaySeasonalMarker);
    chips.push(makeChip(todaySeasonalMarker.label, "seasonal", "primary"));
    details.push({ title: "Season", body: todaySeasonalMarker.label });
    majorEventPresent = true;
    timingAuthority = "may_lead";
  } else if (bestWeekMajorCandidate) {
    summary = bestWeekSummary(bestWeekMajorCandidate, timezone);
    chips.push(makeChip(bestWeekMajorCandidate.label, "moon", "primary"));
    majorEventPresent = true;
    timingAuthority = "may_lead";
  } else {
    summary = joinSummaryParagraphs([
      moonObservation,
      `Next lunar milestone: ${nextMilestone.label} on ${weekdayLabel(nextMilestone.exactIso, timezone)}.`,
      zodiac,
      timingSynthesis({
        facts,
        moonLabel,
        nextMilestoneLabel: nextMilestone.label,
        nextMilestoneDay: weekdayLabel(nextMilestone.exactIso, timezone),
        nextMilestoneDaysAway: localCalendarDaysBetween(
          currentDate,
          nextMilestone.exactIso,
          timezone,
        ),
        nearbyMajorCandidate,
        timezone,
      }),
    ]);
  }

  if (numerologyIsMajor && numerology) {
    chips.push(
      makeChip(
        `${numerology.number} note`,
        "numerology",
        numerologyIsMajor ? "supporting" : "accent",
      ),
    );
    details.push({
      title: "Numerology",
      body: NUMEROLOGY_ACCENT_COPY[numerology.number],
    });

    if (numerologyIsMajor && !majorEventPresent) {
      summary = `${NUMEROLOGY_ACCENT_COPY[numerology.number]} The check-in still chooses the path.`;
      majorEventPresent = true;
      timingAuthority = "may_lead";
    }
  }

  if (privateContact) {
    details.push({
      title: "Private timing",
      body:
        privateContact.label === "Shared timing contact"
          ? "A shared private timing note adds careful words and practical care."
          : "Private timing adds a quiet note of structure and return.",
    });
  }

  return {
    title: "Today’s shape",
    summary,
    chips: uniqueChips(chips).slice(0, 3),
    details,
    timingAuthority,
    majorEventPresent,
  };
}
