import type {
  AstrologyVisibility,
  PrivateNatalProfile,
} from "./private-data-schema";
import {
  getNatalContactsForTimingFacts,
  type NatalContact,
} from "./private-natal-contacts";
import {
  getTimingFactsForDate,
  type LunationFact,
  type PlanetaryAspectFact,
  type TimingFact,
  type TimingFactOptions,
} from "./timing-facts";
import {
  getTimingSignalsForFacts,
  type TimingSignal,
  type TimingSignalStrength,
} from "./timing-interpretation-rules";

export type TimingWindowScoreReason = {
  code: string;
  label: string;
  points: number;
  detail?: string;
};

export type TimingWindowCandidate = {
  id: string;
  startsAtIso: string;
  endsAtIso?: string;
  label: string;
  timingFacts: TimingFact[];
  signalKeys: string[];
  natalContactKeys: string[];
  natalContactThemeKeys: string[];
  strength: TimingSignalStrength;
  score: number;
  scoreReasons: TimingWindowScoreReason[];
};

export type TimingWindowCandidateOptions = TimingFactOptions & {
  maxCandidates?: number;
  natalContactOrbDegrees?: number;
};

export type TimingWindowCandidateInput = {
  startDate: Date | string;
  daysAhead?: number;
  timezone?: string;
  privateNatalProfiles?: PrivateNatalProfile[];
  astrologyVisibility?: AstrologyVisibility;
  options?: TimingWindowCandidateOptions;
};

const DEFAULT_DAYS_AHEAD = 7;
const DEFAULT_MAX_CANDIDATES = 12;
const CORE_TRANSIT_BODIES = new Set([
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
]);

function resolveDate(value: Date | string): Date {
  const date = value instanceof Date ? new Date(value) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("A valid start date is required for timing window candidates.");
  }

  return date;
}

function addUtcDays(date: Date, days: number): Date {
  const next = new Date(date);

  next.setUTCDate(next.getUTCDate() + days);

  return next;
}

function startOfUtcDay(date: Date): Date {
  const next = new Date(date);

  next.setUTCHours(0, 0, 0, 0);

  return next;
}

function endOfLookahead(start: Date, daysAhead: number): Date {
  const end = new Date(start);

  end.setUTCDate(end.getUTCDate() + daysAhead);

  return end;
}

function isWithinRange(iso: string, start: Date, end: Date): boolean {
  const date = new Date(iso);

  return date >= start && date < end;
}

function getFactStartIso(fact: TimingFact, sampleDate: Date): string {
  if (fact.exactIso) {
    return fact.exactIso;
  }

  if (fact.type === "moon_phase") {
    return sampleDate.toISOString();
  }

  return fact.startIso ?? sampleDate.toISOString();
}

function getFactEndIso(fact: TimingFact, sampleDate: Date): string | undefined {
  if (
    fact.type === "moon_phase" ||
    fact.type === "moon_sign" ||
    fact.type === "numerology_date" ||
    fact.type === "calendar_threshold"
  ) {
    return addUtcDays(sampleDate, 1).toISOString();
  }

  return fact.endIso;
}

function isCorePlanetaryAspect(fact: PlanetaryAspectFact): boolean {
  return CORE_TRANSIT_BODIES.has(fact.bodyA) && CORE_TRANSIT_BODIES.has(fact.bodyB);
}

function isCandidateFact(fact: TimingFact): boolean {
  if (
    fact.type === "lunation" ||
    fact.type === "solar_season" ||
    fact.type === "calendar_threshold"
  ) {
    return true;
  }

  if (fact.type === "moon_phase" || fact.type === "moon_sign") {
    return true;
  }

  if (fact.type === "planetary_aspect") {
    return isCorePlanetaryAspect(fact);
  }

  if (fact.type === "planet_retrograde") {
    return fact.isRetrograde && CORE_TRANSIT_BODIES.has(fact.planet);
  }

  if (fact.type === "numerology_date") {
    return fact.scope === "universal_day";
  }

  return false;
}

function makeLunationSignal(fact: LunationFact): TimingSignal {
  const isNewMoon = fact.lunation === "new_moon";

  return {
    ruleId: `timing_window_signal.lunation.${fact.lunation}`,
    timingFactId: fact.id,
    timingFactType: fact.type,
    signalLabel: isNewMoon ? "New Moon" : "Full Moon",
    signalSummary: isNewMoon
      ? "An exact new moon can mark a quiet reset point for one small beginning."
      : "An exact full moon can mark a visible point for noticing what is clear or complete.",
    symbolicCardKeys: [isNewMoon ? "new_moon" : "full_moon"],
    ritualStyleHints: isNewMoon
      ? ["reflection", "candle_or_light", "threshold_reset"]
      : ["reflection", "candle_or_light", "gratitude"],
    weight: 96,
    strength: "primary",
    sourceReferences: [
      "source.sarah_faith_gottesdiener",
      "source.rachel_patterson_moon",
      "note.computed_facts_are_not_meanings",
      "note.four_phase_moon_mvp",
      "note.lunar_cards_stay_invitational",
    ],
  };
}

function getSignalsForCandidateFact(fact: TimingFact): TimingSignal[] {
  if (fact.type === "lunation") {
    return [makeLunationSignal(fact)];
  }

  return getTimingSignalsForFacts([fact]);
}

function baseStrengthPoints(strength: TimingSignalStrength): number {
  switch (strength) {
    case "primary":
      return 8;
    case "supporting":
      return 5;
    case "accent":
      return 2;
  }
}

function factScoreReason(fact: TimingFact): TimingWindowScoreReason {
  switch (fact.type) {
    case "lunation":
      return {
        code: fact.lunation === "full_moon" ? "exact_full_moon" : "exact_new_moon",
        label: fact.lunation === "full_moon" ? "Exact full moon" : "Exact new moon",
        points: 12,
      };
    case "solar_season":
      return {
        code: "seasonal_marker",
        label: "Seasonal marker",
        points: 9,
      };
    case "calendar_threshold":
      return {
        code: "calendar_threshold",
        label: "Calendar threshold",
        points: fact.threshold === "month_turn" ? 11 : 10,
        detail: fact.label,
      };
    case "planetary_aspect":
      return {
        code: "major_aspect",
        label: "Major aspect",
        points: 6,
        detail: fact.label,
      };
    case "moon_sign":
      return {
        code: "moon_sign_change",
        label: "Moon sign timing",
        points: 4,
      };
    case "numerology_date":
      return {
        code: "numerology_theme_match",
        label: "Universal day numerology accent",
        points: 2,
        detail: fact.label,
      };
    case "planet_retrograde":
      return {
        code: "retrograde_status",
        label: "Retrograde review cue",
        points: 3,
        detail: fact.label,
      };
    case "moon_phase":
    default:
      return {
        code: "lunar_phase_baseline",
        label: "Lunar phase baseline",
        points: 5,
        detail: fact.label,
      };
  }
}

function makeNatalContactKey(contact: NatalContact, index: number): string {
  const themeKey = contact.themeKeys.find((key) => key !== "private_natal_contact") ?? "theme";

  return [
    "natal_contact",
    contact.personKey,
    contact.contactType,
    contact.aspectType,
    themeKey,
    String(index),
  ]
    .filter(Boolean)
    .join(".");
}

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function getNatalContactScoreReasons(
  contacts: NatalContact[],
): TimingWindowScoreReason[] {
  if (contacts.length === 0) {
    return [];
  }

  const reasons: TimingWindowScoreReason[] = [{
    code: "natal_contact_present",
    label: "Private timing contact present",
    points: Math.min(6, contacts.length * 2),
    detail: `${contacts.length} safe contact${contacts.length === 1 ? "" : "s"} computed`,
  }];
  const personKeys = new Set(contacts.map((contact) => contact.personKey));

  if (personKeys.size > 1) {
    reasons.push({
      code: "shared_natal_contact_match",
      label: "Shared private timing contact",
      points: 3,
      detail: "Contacts are present for both private profiles.",
    });
  }

  const themeCounts = new Map<string, number>();

  for (const contact of contacts) {
    for (const themeKey of contact.themeKeys) {
      if (themeKey === "private_natal_contact") {
        continue;
      }

      themeCounts.set(themeKey, (themeCounts.get(themeKey) ?? 0) + 1);
    }
  }

  const repeatedThemeKeys = [...themeCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([key]) => key);

  if (repeatedThemeKeys.length > 0) {
    reasons.push({
      code: "multiple_natal_contacts_same_theme",
      label: "Multiple contacts share a theme",
      points: Math.min(4, repeatedThemeKeys.length * 2),
      detail: repeatedThemeKeys.slice(0, 3).join(", "),
    });
  }

  return reasons;
}

function labelForCandidate(
  fact: TimingFact,
  signal: TimingSignal,
  natalContacts: NatalContact[],
): string {
  if (natalContacts.length > 0) {
    const personKeys = new Set(natalContacts.map((contact) => contact.personKey));

    return personKeys.size > 1 ? "Shared timing contact" : "Private timing contact";
  }

  if (fact.type === "lunation") {
    return fact.lunation === "full_moon" ? "Full Moon" : "New Moon";
  }

  if (fact.type === "solar_season") {
    return fact.label.replace("June", "Summer").replace("December", "Winter");
  }

  if (fact.type === "numerology_date") {
    return `Universal day ${fact.number}`;
  }

  if (fact.type === "calendar_threshold") {
    return fact.label;
  }

  return signal.signalLabel;
}

function candidateIdFor({
  fact,
  signal,
  startsAtIso,
}: {
  fact: TimingFact;
  signal: TimingSignal;
  startsAtIso: string;
}): string {
  return [
    "timing_window",
    fact.type,
    signal.ruleId.replace(/^timing_rule\./, ""),
    startsAtIso.slice(0, 10),
  ].join(".");
}

function makeCandidate({
  fact,
  signal,
  sampleDate,
  natalContacts,
}: {
  fact: TimingFact;
  signal: TimingSignal;
  sampleDate: Date;
  natalContacts: NatalContact[];
}): TimingWindowCandidate {
  const factReason = factScoreReason(fact);
  const signalReason: TimingWindowScoreReason = {
    code: "strong_timing_signal_count",
    label: `${signal.strength} timing signal`,
    points: baseStrengthPoints(signal.strength),
    detail: signal.signalLabel,
  };
  const natalReasons = getNatalContactScoreReasons(natalContacts);
  const scoreReasons = [factReason, signalReason, ...natalReasons];
  const startsAtIso = getFactStartIso(fact, sampleDate);
  const natalContactKeys = natalContacts.map(makeNatalContactKey);
  const natalContactThemeKeys = uniqueValues(
    natalContacts.flatMap((contact) => contact.themeKeys),
  );

  return {
    id: candidateIdFor({ fact, signal, startsAtIso }),
    startsAtIso,
    endsAtIso: getFactEndIso(fact, sampleDate),
    label: labelForCandidate(fact, signal, natalContacts),
    timingFacts: [fact],
    signalKeys: [signal.ruleId],
    natalContactKeys,
    natalContactThemeKeys,
    strength: signal.strength,
    score: scoreReasons.reduce((total, reason) => total + reason.points, 0),
    scoreReasons,
  };
}

function sortCandidates(
  candidates: TimingWindowCandidate[],
): TimingWindowCandidate[] {
  return [...candidates].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    const dateCompare = a.startsAtIso.localeCompare(b.startsAtIso);

    if (dateCompare !== 0) {
      return dateCompare;
    }

    return a.id.localeCompare(b.id);
  });
}

function dedupeCandidates(
  candidates: TimingWindowCandidate[],
): TimingWindowCandidate[] {
  const deduped = new Map<string, TimingWindowCandidate>();

  for (const candidate of candidates) {
    const existing = deduped.get(candidate.id);

    if (!existing || candidate.score > existing.score) {
      deduped.set(candidate.id, candidate);
    }
  }

  return [...deduped.values()];
}

export function getTimingWindowCandidates({
  startDate,
  daysAhead = DEFAULT_DAYS_AHEAD,
  timezone = "UTC",
  privateNatalProfiles = [],
  astrologyVisibility = "balanced",
  options = {},
}: TimingWindowCandidateInput): TimingWindowCandidate[] {
  const start = resolveDate(startDate);
  const scanStart = startOfUtcDay(start);
  const scanEnd = endOfLookahead(scanStart, daysAhead);
  const maxCandidates = options.maxCandidates ?? DEFAULT_MAX_CANDIDATES;
  const candidates: TimingWindowCandidate[] = [];

  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset += 1) {
    const sampleDate = addUtcDays(scanStart, dayOffset);
    const facts = getTimingFactsForDate(sampleDate, {
      timezone,
      aspectOrbDegrees: options.aspectOrbDegrees,
      includePlanetaryAspects: options.includePlanetaryAspects,
      includeRetrogrades: options.includeRetrogrades,
    }).filter((fact) => {
      const startsAtIso = getFactStartIso(fact, sampleDate);

      return isCandidateFact(fact) && isWithinRange(startsAtIso, scanStart, scanEnd);
    });
    const signals = facts.flatMap(getSignalsForCandidateFact);

    for (const signal of signals) {
      const fact = facts.find((candidateFact) => candidateFact.id === signal.timingFactId);

      if (!fact) {
        continue;
      }

      const natalContacts = privateNatalProfiles.length > 0
        ? getNatalContactsForTimingFacts({
          timingFacts: [fact],
          natalProfiles: privateNatalProfiles,
          options: {
            orbDegrees: options.natalContactOrbDegrees,
            visibility: astrologyVisibility,
          },
        })
        : [];

      candidates.push(makeCandidate({
        fact,
        signal,
        sampleDate,
        natalContacts,
      }));
    }
  }

  return sortCandidates(dedupeCandidates(candidates)).slice(0, maxCandidates);
}
