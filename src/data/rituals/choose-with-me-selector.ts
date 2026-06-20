import type {
  Ritual,
  RitualCapacityMode,
  RitualCarrier,
  RitualPurpose,
  RitualWithRecommendationMetadata,
} from "./types";
import { hasRitualRecommendationMetadata } from "./types";
import {
  getStrongTimingWindowCandidates,
  type TimingWindowCandidate,
} from "../../lib/timing-window-candidates";
import type { TimingFact } from "../../lib/timing-facts";
import type { LunarTimingFact } from "../../lib/lunar-timing";
import type {
  RitualCheckInAudience,
  RitualCheckInEnergyCapacity,
  RitualCheckInTimeScope,
} from "../../lib/current-ritual-check-in";
import type { CapacityMode, TimingFactKey } from "../../lib/generate-weekly-brief";

export type ChooseWithMeRequest = {
  timeScope: RitualCheckInTimeScope;
  energyCapacity: RitualCheckInEnergyCapacity;
  capacityMode: CapacityMode;
  audience?: RitualCheckInAudience;
  purpose?: RitualPurpose | null;
  carrier?: RitualCarrier | null;
  refinement?: string | null;
  freeTextIntent?: string | null;
  materialsAvailable?: string[];
  excludedRitualIds?: string[];
  timingContext?: {
    timingFacts?: TimingFactKey[];
    timingFactDetails?: LunarTimingFact[];
    computedTimingFacts?: TimingFact[];
    timingWindowCandidates?: TimingWindowCandidate[];
    timingWindowCandidateIds?: string[];
    selectedTimingWindow?: TimingWindowCandidate;
  };
};

export type ChooseWithMeScoreBreakdown = {
  purpose: number;
  carrier: number;
  refinement: number;
  audience: number;
  capacity: number;
  timing: number;
  materialPlaceFit: number;
  freeText: number;
  sourceConfidence: number;
  penalties: number;
  total: number;
};

export type ChooseWithMeDebugCandidate = {
  ritualId: string;
  headline: string;
  score: number;
  breakdown: ChooseWithMeScoreBreakdown;
  evidence: string[];
  timing: ChooseWithMeTimingDebug;
};

export type ChooseWithMeTimingDebug = {
  suppliedFacts: string[];
  suppliedWindows: string[];
  selectedWindow?: string;
  matchedRitualTiming: string[];
  timingScore: number;
  requiredTimingSatisfied: boolean;
  timingCouldNotBeVerified: string[];
};

export type ChooseWithMeDebug = {
  normalizedRequest: ChooseWithMeRequest;
  eligibleCount: number;
  excludedCount: number;
  selectedRitualId?: string;
  selectedScore?: number;
  selectedBreakdown?: ChooseWithMeScoreBreakdown;
  topCandidates: ChooseWithMeDebugCandidate[];
  exclusions: Record<string, number>;
  fallback?: string;
  timing: ChooseWithMeTimingDebug;
  timingEvidence: string[];
  explanationEvidence: string[];
};

export type GeneratedRecommendationExplanation = {
  whyThisFits: string;
  howThisWasChosen: string;
};

export type ChooseWithMeResult =
  | (GeneratedRecommendationExplanation & {
      status: "selected";
      selectedRitual: Ritual;
      debug: ChooseWithMeDebug;
    })
  | (GeneratedRecommendationExplanation & {
      status: "no_result";
      selectedRitual?: undefined;
      debug: ChooseWithMeDebug;
    });

type ScoredRitual = {
  ritual: RitualWithRecommendationMetadata;
  breakdown: ChooseWithMeScoreBreakdown;
  evidence: string[];
  timing: ChooseWithMeTimingDebug;
};

const purposeLabels: Record<RitualPurpose, string> = {
  steadying: "steadying",
  opening: "opening",
  releasing: "releasing",
  tending: "tending",
  connecting: "connecting",
  voicing: "voicing",
  marking: "marking",
  blessing: "blessing",
  protecting: "protecting",
  remembering: "remembering",
};

const carrierLabels: Record<RitualCarrier, string> = {
  candlelight: "candlelight",
  table: "the table",
  doorway: "the doorway",
  plant: "a plant",
  words: "words",
  vessel: "a vessel",
  body: "the body",
};

const carrierFormLabels: Record<RitualCarrier, string> = {
  candlelight: "candlelight form",
  table: "table form",
  doorway: "doorway form",
  plant: "plant form",
  words: "word form",
  vessel: "vessel form",
  body: "body form",
};

const capacityLabels: Record<RitualCheckInEnergyCapacity, string> = {
  barely_any: "barely any capacity",
  a_little: "a little capacity",
  enough_to_engage: "enough to engage",
  room_for_something_deeper: "room for something deeper",
};

const allowedCapacityByMode: Record<CapacityMode, RitualCapacityMode[]> = {
  pause: ["barely_any", "only_a_little"],
  low: ["barely_any", "only_a_little"],
  steady: ["barely_any", "only_a_little", "enough_to_participate"],
  high: ["barely_any", "only_a_little", "enough_to_participate", "room_for_something_deeper"],
};

const capacityRank: Record<RitualCapacityMode, number> = {
  barely_any: 1,
  only_a_little: 2,
  enough_to_participate: 3,
  room_for_something_deeper: 4,
};

function emptyBreakdown(): ChooseWithMeScoreBreakdown {
  return {
    purpose: 0,
    carrier: 0,
    refinement: 0,
    audience: 0,
    capacity: 0,
    timing: 0,
    materialPlaceFit: 0,
    freeText: 0,
    sourceConfidence: 0,
    penalties: 0,
    total: 0,
  };
}

function addExclusion(
  exclusions: Record<string, number>,
  reason: string,
): void {
  exclusions[reason] = (exclusions[reason] ?? 0) + 1;
}

function ritualSupportsCapacity(
  ritual: RitualWithRecommendationMetadata,
  allowedCapacities: RitualCapacityMode[],
): boolean {
  return ritual.recommendationMetadata.capacity.supports.some((capacity) =>
    allowedCapacities.includes(capacity),
  );
}

function getHighestAllowedCapacity(
  allowedCapacities: RitualCapacityMode[],
): RitualCapacityMode {
  return [...allowedCapacities].sort(
    (a, b) => capacityRank[b] - capacityRank[a],
  )[0];
}

function getSearchableText(ritual: RitualWithRecommendationMetadata): string {
  return [
    ritual.presentation.headline,
    ritual.presentation.practice,
    ritual.presentation.intention,
    ritual.presentation.whyThisFits,
    ritual.presentation.questionToCarry,
    ritual.recommendationMetadata.purposes.refinement,
    ...ritual.searchMetadata.tags,
    ...ritual.searchMetadata.keywords,
    ...(ritual.searchMetadata.materials ?? []),
    ...(ritual.searchMetadata.places ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

function countQueryMatches(
  text: string,
  query: string | null | undefined,
): number {
  if (!query) {
    return 0;
  }

  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 2);

  return terms.filter((term) => text.includes(term)).length;
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))];
}

function normalizeTimingText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[_./-]+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function timingTokens(value: string): string[] {
  return normalizeTimingText(value)
    .split(" ")
    .filter((token) => token.length > 2);
}

function timingFactEvidence(fact: TimingFact): string[] {
  const common = [fact.id, fact.label, fact.type];

  switch (fact.type) {
    case "moon_phase":
      return [...common, fact.phase, `${fact.phase} moon`];
    case "lunation":
      return [...common, fact.lunation, fact.lunation.replaceAll("_", " ")];
    case "moon_sign":
    case "sun_sign":
      return [...common, fact.sign, `${fact.type.replace("_", " ")} ${fact.sign}`];
    case "planet_sign":
      return [...common, fact.planet, fact.sign, `${fact.planet} in ${fact.sign}`];
    case "planet_retrograde":
      return [
        ...common,
        fact.planet,
        fact.isRetrograde ? "retrograde" : "direct",
        `${fact.planet} retrograde`,
      ];
    case "planetary_aspect":
      return [
        ...common,
        fact.bodyA,
        fact.bodyB,
        fact.aspect,
        `${fact.bodyA} ${fact.aspect} ${fact.bodyB}`,
        `${fact.bodyB} ${fact.aspect} ${fact.bodyA}`,
      ];
    case "numerology_date":
      return [...common, "numerology", String(fact.number)];
    case "calendar_threshold":
      return [
        ...common,
        fact.threshold,
        fact.threshold.replaceAll("_", " "),
        fact.monthName,
      ];
    case "solar_season":
      return [...common, fact.marker, fact.marker.replaceAll("_", " ")];
  }
}

function lunarTimingFactEvidence(fact: LunarTimingFact): string[] {
  return [fact.id, fact.key, fact.label, fact.phase, `${fact.phase} moon`];
}

function timingWindowEvidence(candidate: TimingWindowCandidate): string[] {
  return [
    candidate.id,
    candidate.label,
    candidate.strength,
    ...candidate.signalKeys,
    ...candidate.scoreReasons.flatMap((reason) => [
      reason.code,
      reason.label,
      reason.detail ?? "",
    ]),
    ...candidate.timingFacts.flatMap(timingFactEvidence),
  ];
}

function selectTimingWindows(
  request: ChooseWithMeRequest,
): TimingWindowCandidate[] {
  const context = request.timingContext;

  if (request.timeScope !== "best_moment_this_week") {
    return [];
  }

  const candidates = context?.selectedTimingWindow
    ? [
        context.selectedTimingWindow,
        ...(context.timingWindowCandidates ?? []).filter(
          (candidate) => candidate.id !== context.selectedTimingWindow?.id,
        ),
      ]
    : context?.timingWindowCandidates ?? [];

  return getStrongTimingWindowCandidates(
    candidates,
    context?.timingWindowCandidateIds,
  );
}

function selectTimingWindow(
  request: ChooseWithMeRequest,
): TimingWindowCandidate | undefined {
  return selectTimingWindows(request)[0];
}

function getSuppliedTimingEvidence(request: ChooseWithMeRequest): {
  facts: string[];
  windows: string[];
  selectedWindow?: TimingWindowCandidate;
  evidenceText: string[];
} {
  const context = request.timingContext;
  const selectedWindows = selectTimingWindows(request);
  const selectedWindow = selectedWindows[0];
  const factEvidence = uniqueStrings([
    ...(context?.timingFacts ?? []),
    ...(context?.timingFactDetails ?? []).flatMap(lunarTimingFactEvidence),
    ...(context?.computedTimingFacts ?? []).flatMap(timingFactEvidence),
    ...selectedWindows.flatMap(timingWindowEvidence),
  ]);
  const windowEvidence = uniqueStrings(
    (context?.timingWindowCandidates ?? []).flatMap((candidate) => [
      candidate.id,
      candidate.label,
      candidate.strength,
      ...candidate.signalKeys,
    ]),
  );

  return {
    facts: factEvidence,
    windows: windowEvidence,
    selectedWindow,
    evidenceText: factEvidence,
  };
}

function getRitualTimingContexts(ritual: RitualWithRecommendationMetadata): string[] {
  return ritual.recommendationMetadata.timing.contexts ?? [];
}

function contextMatchesEvidence(context: string, evidence: string[]): boolean {
  const normalizedContext = normalizeTimingText(context);

  if (!normalizedContext) {
    return false;
  }

  const normalizedEvidence = evidence.map(normalizeTimingText);

  if (
    normalizedEvidence.some(
      (candidate) =>
        candidate.length > 0 &&
        (candidate.includes(normalizedContext) ||
          normalizedContext.includes(candidate)),
    )
  ) {
    return true;
  }

  const contextTokenSet = new Set(timingTokens(context));
  const timingWords = [
    "moon",
    "phase",
    "sign",
    "lunation",
    "full",
    "new",
    "dark",
    "balsamic",
    "quarter",
    "waxing",
    "waning",
    "void",
    "retrograde",
    "conjunction",
    "opposition",
    "square",
    "trine",
    "sextile",
    "applying",
    "solstice",
    "equinox",
    "month",
    "threshold",
    "season",
    "seasonal",
    "hour",
    "weekday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "lunar",
    "solar",
    "spring",
    "summer",
    "autumn",
    "fall",
    "winter",
    "venus",
    "mars",
    "mercury",
    "jupiter",
    "saturn",
    "sun",
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
  const timingContextTokens = timingWords.filter((word) =>
    contextTokenSet.has(word),
  );

  if (timingContextTokens.length === 0) {
    return false;
  }

  return normalizedEvidence.some((candidate) => {
    const candidateTokens = new Set(timingTokens(candidate));

    return timingContextTokens.every((token) => candidateTokens.has(token));
  });
}

function evaluateTimingFit(
  ritual: RitualWithRecommendationMetadata,
  request: ChooseWithMeRequest,
): ChooseWithMeTimingDebug {
  const relationship = ritual.recommendationMetadata.timing.relationship;
  const contexts = getRitualTimingContexts(ritual);
  const supplied = getSuppliedTimingEvidence(request);
  const matchedRitualTiming =
    relationship === "none"
      ? []
      : contexts.filter((context) =>
          contextMatchesEvidence(context, supplied.evidenceText),
        );
  const timingCouldNotBeVerified =
    relationship !== "none" && contexts.length === 0
      ? ["ritual_timing_context_missing"]
      : [];
  const hasTimingMatch = matchedRitualTiming.length > 0;
  const requiredTimingSatisfied =
    relationship !== "required" ||
    (contexts.length > 0 && hasTimingMatch);
  let timingScore = 0;

  if (hasTimingMatch) {
    if (relationship === "required") {
      timingScore = 24;
    } else if (relationship === "preferred") {
      timingScore = 16;
    } else if (relationship === "helpful") {
      timingScore = 6;
    }
  }

  return {
    suppliedFacts: supplied.facts,
    suppliedWindows: supplied.windows,
    selectedWindow: supplied.selectedWindow?.id,
    matchedRitualTiming,
    timingScore,
    requiredTimingSatisfied,
    timingCouldNotBeVerified:
      relationship === "required" && contexts.length > 0 && !hasTimingMatch
        ? [...timingCouldNotBeVerified, ...contexts]
        : timingCouldNotBeVerified,
  };
}

function emptyTimingDebug(request: ChooseWithMeRequest): ChooseWithMeTimingDebug {
  const supplied = getSuppliedTimingEvidence(request);

  return {
    suppliedFacts: supplied.facts,
    suppliedWindows: supplied.windows,
    selectedWindow: supplied.selectedWindow?.id,
    matchedRitualTiming: [],
    timingScore: 0,
    requiredTimingSatisfied: true,
    timingCouldNotBeVerified: [],
  };
}

function scoreRitual(
  ritual: RitualWithRecommendationMetadata,
  request: ChooseWithMeRequest,
  allowedCapacities: RitualCapacityMode[],
): ScoredRitual {
  const breakdown = emptyBreakdown();
  const evidence: string[] = [];
  const metadata = ritual.recommendationMetadata;
  const searchableText = getSearchableText(ritual);

  if (request.purpose && metadata.purposes.primary === request.purpose) {
    breakdown.purpose += 36;
    evidence.push(`primary purpose matched ${request.purpose}`);
  } else if (
    request.purpose &&
    metadata.purposes.secondary.includes(request.purpose)
  ) {
    breakdown.purpose += 14;
    evidence.push(`secondary purpose matched ${request.purpose}`);
  }

  if (request.carrier && metadata.carriers.primary === request.carrier) {
    breakdown.carrier += 30;
    evidence.push(`primary carrier matched ${request.carrier}`);
  } else if (
    request.carrier &&
    metadata.carriers.secondary.includes(request.carrier)
  ) {
    breakdown.carrier += 10;
    evidence.push(`secondary carrier matched ${request.carrier}`);
  } else if (
    !request.carrier &&
    (metadata.capacity.supports.includes("barely_any") ||
      metadata.capacity.supports.includes("only_a_little"))
  ) {
    breakdown.carrier += 5;
    evidence.push("carrier inferred from a low-capacity ritual");
  }

  const refinementMatches = countQueryMatches(
    searchableText,
    request.refinement,
  );
  if (refinementMatches > 0) {
    breakdown.refinement += Math.min(12, refinementMatches * 4);
    evidence.push(`refinement matched ${request.refinement}`);
  }

  if (request.audience && metadata.audience.default === request.audience) {
    breakdown.audience += 8;
  } else if (
    request.audience &&
    metadata.audience.supports.includes(request.audience)
  ) {
    breakdown.audience += 5;
  }

  const highestAllowed = getHighestAllowedCapacity(allowedCapacities);
  const defaultCapacity =
    metadata.capacity.default ?? metadata.capacity.supports[0];
  if (defaultCapacity && allowedCapacities.includes(defaultCapacity)) {
    breakdown.capacity += defaultCapacity === highestAllowed ? 12 : 8;
  } else {
    breakdown.capacity += 4;
  }

  const timing = evaluateTimingFit(ritual, request);
  breakdown.timing += timing.timingScore;

  if (timing.matchedRitualTiming.length > 0) {
    evidence.push(
      `timing matched ${joinNaturalList(timing.matchedRitualTiming)}`,
    );
  }

  if (
    metadata.timing.relationship === "required" &&
    timing.timingCouldNotBeVerified.length > 0
  ) {
    evidence.push("required timing could not be verified");
  }

  const availableMaterials = request.materialsAvailable ?? [];
  if (availableMaterials.length > 0) {
    const materialText = [
      ...(ritual.searchMetadata.materials ?? []),
      ...(ritual.searchMetadata.places ?? []),
      ...ritual.searchMetadata.tags,
    ]
      .join(" ")
      .toLowerCase();
    const matches = availableMaterials.filter((material) =>
      materialText.includes(material.toLowerCase()),
    );
    breakdown.materialPlaceFit += Math.min(8, matches.length * 3);
  }

  const freeTextMatches = countQueryMatches(
    searchableText,
    request.freeTextIntent,
  );
  if (freeTextMatches > 0) {
    breakdown.freeText += Math.min(8, freeTextMatches * 2);
  }

  if (ritual.status === "recommendable") {
    breakdown.sourceConfidence += 8;
  } else if (ritual.status === "reviewed") {
    breakdown.sourceConfidence += 5;
  }

  if (metadata.eligibility.missing && metadata.eligibility.missing.length > 0) {
    breakdown.penalties -= metadata.eligibility.missing.length * 3;
  }

  breakdown.total = Object.entries(breakdown)
    .filter(([key]) => key !== "total")
    .reduce((sum, [, value]) => sum + value, 0);

  return { ritual, breakdown, evidence, timing };
}

function getEligibleRituals(
  rituals: Ritual[],
  request: ChooseWithMeRequest,
  exclusions: Record<string, number>,
): RitualWithRecommendationMetadata[] {
  const allowedCapacities = allowedCapacityByMode[request.capacityMode];
  const eligible: RitualWithRecommendationMetadata[] = [];

  for (const ritual of rituals) {
    if (ritual.status === "draft") {
      addExclusion(exclusions, "draft_status");
      continue;
    }

    if (!hasRitualRecommendationMetadata(ritual)) {
      addExclusion(exclusions, "missing_recommendation_metadata");
      continue;
    }

    const metadata = ritual.recommendationMetadata;

    if (!ritual.availability.recommendationEligible) {
      addExclusion(exclusions, "not_recommendation_eligible");
      continue;
    }

    if (!metadata.eligibility.recommendable) {
      addExclusion(exclusions, "metadata_not_recommendable");
      continue;
    }

    if (
      request.audience &&
      !metadata.audience.supports.includes(request.audience)
    ) {
      addExclusion(exclusions, "audience_mismatch");
      continue;
    }

    if (!ritualSupportsCapacity(ritual, allowedCapacities)) {
      addExclusion(exclusions, "capacity_exceeds_user");
      continue;
    }

    if (request.purpose && metadata.purposes.primary !== request.purpose) {
      addExclusion(exclusions, "requested_primary_purpose_unmatched");
      continue;
    }

    if (request.carrier && metadata.carriers.primary !== request.carrier) {
      addExclusion(exclusions, "requested_primary_carrier_unmatched");
      continue;
    }

    if (metadata.eligibility.notFor && metadata.eligibility.notFor.length > 0) {
      addExclusion(exclusions, "eligibility_not_for");
      continue;
    }

    const timing = evaluateTimingFit(ritual, request);

    if (!timing.requiredTimingSatisfied) {
      addExclusion(exclusions, "required_timing_unmatched");
      continue;
    }

    eligible.push(ritual);
  }

  return eligible;
}

function sortScoredRituals(a: ScoredRitual, b: ScoredRitual): number {
  return (
    b.breakdown.total - a.breakdown.total ||
    a.ritual.presentation.headline.localeCompare(b.ritual.presentation.headline)
  );
}

function joinNaturalList(items: string[]): string {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getFirstSentence(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  const sentenceMatch = normalized.match(/^.+?[.!?](?=\s|$)/);

  return sentenceMatch?.[0] ?? normalized;
}

function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
): string {
  return count === 1 ? singular : plural;
}

function describeHardGates(request: ChooseWithMeRequest): string {
  const gates = [
    request.purpose ? purposeLabels[request.purpose] : undefined,
    request.carrier ? carrierLabels[request.carrier] : undefined,
    request.audience === "both_of_us" ? "both of you" : "one person",
    capacityLabels[request.energyCapacity],
  ].filter(Boolean) as string[];

  return joinNaturalList(gates);
}

function describeRitualMetadataFit(
  ritual: RitualWithRecommendationMetadata,
  request: ChooseWithMeRequest,
): string {
  const primaryPurpose =
    purposeLabels[ritual.recommendationMetadata.purposes.primary];

  if (request.carrier) {
    return `Its record names ${primaryPurpose} as its primary work and ${carrierLabels[ritual.recommendationMetadata.carriers.primary]} as its primary carrier.`;
  }

  return `Its record names ${primaryPurpose} as its primary work, and its own ${carrierFormLabels[ritual.recommendationMetadata.carriers.primary]} could lead because carrier was open.`;
}

function describeRankingSignals(debug: ChooseWithMeDebug): string {
  const breakdown = debug.selectedBreakdown;

  if (!breakdown) {
    return "Moon & Table did not choose randomly from that lane.";
  }

  const signals = [
    { label: "capacity fit", value: breakdown.capacity },
    { label: "audience fit", value: breakdown.audience },
    { label: "timing fit", value: breakdown.timing },
    { label: "review status", value: breakdown.sourceConfidence },
    { label: "refinement match", value: breakdown.refinement },
    { label: "material/place fit", value: breakdown.materialPlaceFit },
    { label: "free-text match", value: breakdown.freeText },
  ]
    .filter((signal) => signal.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((signal) => signal.label);

  if (signals.length === 0) {
    return "Moon & Table did not choose randomly from that lane.";
  }

  return `From there, Moon & Table ranked the remaining rituals; this one scored highest with ${joinNaturalList(signals)}.`;
}

function describeTimingSelection(debug: ChooseWithMeDebug): string | null {
  const timing = debug.timing;

  if (timing.matchedRitualTiming.length > 0) {
    return `Timing mattered here: ${joinNaturalList(timing.matchedRitualTiming)} matched the ritual's timing record.`;
  }

  if (timing.selectedWindow) {
    return "The week had a usable timing window, but it did not match this ritual's timing record strongly enough to drive the choice.";
  }

  return null;
}

function describePracticeFit(ritual: Ritual): string {
  const practiceOpening = getFirstSentence(ritual.presentation.practice);

  if (practiceOpening.length > 0) {
    return practiceOpening;
  }

  return ritual.presentation.intention;
}

function buildWhyThisFits(
  ritual: Ritual,
  request: ChooseWithMeRequest,
): string {
  const practiceFit = describePracticeFit(ritual);
  const purpose = request.purpose ? purposeLabels[request.purpose] : "the work";
  const capacityShape =
    request.energyCapacity === "room_for_something_deeper"
      ? "with room to unfold"
      : "without making the moment larger";
  const audienceShape =
    request.audience === "both_of_us"
      ? "something both of you can enter"
      : "something one person can do";

  return `This ritual turns ${purpose} into ${audienceShape}: ${practiceFit} It keeps the work concrete ${capacityShape}.`;
}

function buildHowThisWasChosen(
  request: ChooseWithMeRequest,
  debug: ChooseWithMeDebug,
  ritual?: RitualWithRecommendationMetadata,
): string {
  const timingPhrase =
    request.timeScope === "today" ? "for today" : "for this week";
  const hardGates = describeHardGates(request);
  const remainingCount = debug.eligibleCount;
  const remainingPhrase = `${remainingCount} approved ${pluralize(remainingCount, "ritual")} stayed in that lane ${timingPhrase}`;
  const metadataFit = ritual
    ? describeRitualMetadataFit(ritual, request)
    : "Moon & Table did not choose a ritual outside that request.";
  const ranking = describeRankingSignals(debug);
  const timing = describeTimingSelection(debug);

  return [
    `Selection gates: ${hardGates}.`,
    `${remainingPhrase}.`,
    metadataFit,
    timing,
    ranking,
  ]
    .filter(Boolean)
    .join(" ");
}

function buildDebug(
  request: ChooseWithMeRequest,
  eligible: Ritual[],
  exclusions: Record<string, number>,
  scored: ScoredRitual[],
): ChooseWithMeDebug {
  const selected = scored[0];
  const topCandidates = scored.slice(0, 3).map((candidate) => ({
    ritualId: candidate.ritual.id,
    headline: candidate.ritual.presentation.headline,
    score: candidate.breakdown.total,
    breakdown: candidate.breakdown,
    evidence: candidate.evidence,
    timing: candidate.timing,
  }));
  const selectedTiming = selected?.timing ?? emptyTimingDebug(request);

  return {
    normalizedRequest: request,
    eligibleCount: eligible.length,
    excludedCount: Object.values(exclusions).reduce(
      (sum, count) => sum + count,
      0,
    ),
    selectedRitualId: selected?.ritual.id,
    selectedScore: selected?.breakdown.total,
    selectedBreakdown: selected?.breakdown,
    topCandidates,
    exclusions,
    fallback:
      eligible.length === 0
        ? "no_eligible_ritual_for_requested_cell"
        : undefined,
    timing: selectedTiming,
    timingEvidence: [
      ...selectedTiming.matchedRitualTiming.map(
        (context) => `matched timing: ${context}`,
      ),
      ...(selectedTiming.selectedWindow
        ? [`selected timing window: ${selectedTiming.selectedWindow}`]
        : []),
      ...(selectedTiming.timingScore === 0
        ? ["timing did not override the selected carrier and purpose"]
        : []),
    ],
    explanationEvidence: selected?.evidence ?? [],
  };
}

export function chooseWithMeRitual(
  rituals: Ritual[],
  request: ChooseWithMeRequest,
): ChooseWithMeResult {
  const normalizedRequest: ChooseWithMeRequest = {
    ...request,
    purpose: request.purpose ?? null,
    carrier: request.carrier ?? null,
    refinement: request.refinement ?? null,
    freeTextIntent: request.freeTextIntent ?? null,
    materialsAvailable: request.materialsAvailable ?? [],
    excludedRitualIds: uniqueStrings(request.excludedRitualIds ?? []),
    timingContext: request.timingContext ?? {},
  };
  const exclusions: Record<string, number> = {};
  const allowedCapacities =
    allowedCapacityByMode[normalizedRequest.capacityMode];
  const excludedRitualIds = new Set(normalizedRequest.excludedRitualIds);
  const eligible = getEligibleRituals(rituals, normalizedRequest, exclusions)
    .filter((ritual) => {
      if (excludedRitualIds.has(ritual.id)) {
        addExclusion(exclusions, "already_offered");
        return false;
      }

      return true;
    });
  const scored = eligible
    .map((ritual) => scoreRitual(ritual, normalizedRequest, allowedCapacities))
    .sort(sortScoredRituals);
  const debug = buildDebug(normalizedRequest, eligible, exclusions, scored);
  const selected = scored[0];

  if (!selected) {
    return {
      status: "no_result",
      whyThisFits:
        "I could not find a recommendation-ready ritual for that exact carrier, purpose, audience, and capacity.",
      howThisWasChosen: buildHowThisWasChosen(normalizedRequest, debug),
      debug,
    };
  }

  return {
    status: "selected",
    selectedRitual: selected.ritual,
    whyThisFits: buildWhyThisFits(selected.ritual, normalizedRequest),
    howThisWasChosen: buildHowThisWasChosen(
      normalizedRequest,
      debug,
      selected.ritual,
    ),
    debug,
  };
}
