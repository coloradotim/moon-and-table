import type {
  Ritual,
  RitualCapacityMode,
  RitualCarrier,
  RitualPurpose,
} from "./types";
import type {
  RitualCheckInAudience,
  RitualCheckInEnergyCapacity,
  RitualCheckInTimeScope,
} from "../../lib/current-ritual-check-in";
import type { CapacityMode } from "../../lib/generate-weekly-brief";

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
  timingContext?: {
    timingWindowCandidateIds?: string[];
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
  timingEvidence: string[];
  explanationEvidence: string[];
};

export type ChooseWithMeResult =
  | {
      status: "selected";
      selectedRitual: Ritual;
      whyThisFits: string;
      howThisWasChosen: string;
      debug: ChooseWithMeDebug;
    }
  | {
      status: "no_result";
      selectedRitual?: undefined;
      whyThisFits: string;
      howThisWasChosen: string;
      debug: ChooseWithMeDebug;
    };

type ScoredRitual = {
  ritual: Ritual;
  breakdown: ChooseWithMeScoreBreakdown;
  evidence: string[];
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

const capacityLabels: Record<RitualCheckInEnergyCapacity, string> = {
  barely_any: "barely any capacity",
  a_little: "a little capacity",
  enough_to_engage: "enough to engage",
  room_for_something_deeper: "room for something deeper",
};

const allowedCapacityByMode: Record<CapacityMode, RitualCapacityMode[]> = {
  pause: ["only_a_little"],
  low: ["only_a_little"],
  steady: ["only_a_little", "enough_to_participate"],
  high: ["only_a_little", "enough_to_participate", "room_for_something_deeper"],
};

const capacityRank: Record<RitualCapacityMode, number> = {
  only_a_little: 1,
  enough_to_participate: 2,
  room_for_something_deeper: 3,
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

function addExclusion(exclusions: Record<string, number>, reason: string): void {
  exclusions[reason] = (exclusions[reason] ?? 0) + 1;
}

function ritualSupportsCapacity(
  ritual: Ritual,
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

function getSearchableText(ritual: Ritual): string {
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
  ].join(" ").toLowerCase();
}

function countQueryMatches(text: string, query: string | null | undefined): number {
  if (!query) {
    return 0;
  }

  const terms = query.toLowerCase().split(/[^a-z0-9]+/).filter(
    (term) => term.length > 2,
  );

  return terms.filter((term) => text.includes(term)).length;
}

function scoreRitual(
  ritual: Ritual,
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
  } else if (!request.carrier && metadata.capacity.supports.includes("only_a_little")) {
    breakdown.carrier += 5;
    evidence.push("carrier inferred from a low-capacity ritual");
  }

  const refinementMatches = countQueryMatches(searchableText, request.refinement);
  if (refinementMatches > 0) {
    breakdown.refinement += Math.min(12, refinementMatches * 4);
    evidence.push(`refinement matched ${request.refinement}`);
  }

  if (request.audience && metadata.audience.default === request.audience) {
    breakdown.audience += 8;
  } else if (request.audience && metadata.audience.supports.includes(request.audience)) {
    breakdown.audience += 5;
  }

  const highestAllowed = getHighestAllowedCapacity(allowedCapacities);
  const defaultCapacity = metadata.capacity.default ?? metadata.capacity.supports[0];
  if (defaultCapacity && allowedCapacities.includes(defaultCapacity)) {
    breakdown.capacity += defaultCapacity === highestAllowed ? 12 : 8;
  } else {
    breakdown.capacity += 4;
  }

  if (metadata.timing.relationship === "required") {
    breakdown.timing += request.timeScope === "best_moment_this_week" ? 12 : 4;
  } else if (metadata.timing.relationship === "preferred") {
    breakdown.timing += request.timeScope === "best_moment_this_week" ? 8 : 3;
  } else if (metadata.timing.relationship === "helpful") {
    breakdown.timing += 4;
  }

  const availableMaterials = request.materialsAvailable ?? [];
  if (availableMaterials.length > 0) {
    const materialText = [
      ...(ritual.searchMetadata.materials ?? []),
      ...(ritual.searchMetadata.places ?? []),
      ...ritual.searchMetadata.tags,
    ].join(" ").toLowerCase();
    const matches = availableMaterials.filter((material) =>
      materialText.includes(material.toLowerCase()),
    );
    breakdown.materialPlaceFit += Math.min(8, matches.length * 3);
  }

  const freeTextMatches = countQueryMatches(searchableText, request.freeTextIntent);
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

  return { ritual, breakdown, evidence };
}

function getEligibleRituals(
  rituals: Ritual[],
  request: ChooseWithMeRequest,
  exclusions: Record<string, number>,
): Ritual[] {
  const allowedCapacities = allowedCapacityByMode[request.capacityMode];

  return rituals.filter((ritual) => {
    const metadata = ritual.recommendationMetadata;

    if (ritual.status === "draft") {
      addExclusion(exclusions, "draft_status");
      return false;
    }

    if (!ritual.availability.recommendationEligible) {
      addExclusion(exclusions, "not_recommendation_eligible");
      return false;
    }

    if (!metadata.eligibility.recommendable) {
      addExclusion(exclusions, "metadata_not_recommendable");
      return false;
    }

    if (request.audience && !metadata.audience.supports.includes(request.audience)) {
      addExclusion(exclusions, "audience_mismatch");
      return false;
    }

    if (!ritualSupportsCapacity(ritual, allowedCapacities)) {
      addExclusion(exclusions, "capacity_exceeds_user");
      return false;
    }

    if (request.purpose && metadata.purposes.primary !== request.purpose) {
      addExclusion(exclusions, "requested_primary_purpose_unmatched");
      return false;
    }

    if (request.carrier && metadata.carriers.primary !== request.carrier) {
      addExclusion(exclusions, "requested_primary_carrier_unmatched");
      return false;
    }

    if (metadata.eligibility.notFor && metadata.eligibility.notFor.length > 0) {
      addExclusion(exclusions, "eligibility_not_for");
      return false;
    }

    return true;
  });
}

function sortScoredRituals(a: ScoredRitual, b: ScoredRitual): number {
  return b.breakdown.total - a.breakdown.total ||
    a.ritual.presentation.headline.localeCompare(b.ritual.presentation.headline);
}

function describeRequest(request: ChooseWithMeRequest): string {
  const pieces = [
    capacityLabels[request.energyCapacity],
    request.audience === "both_of_us" ? "for both of you" : "for you",
    request.purpose ? `for ${purposeLabels[request.purpose]}` : undefined,
    request.carrier ? `in ${carrierLabels[request.carrier]}` : undefined,
    request.refinement ? `around ${request.refinement.toLowerCase()}` : undefined,
  ].filter(Boolean);

  return pieces.join(", ");
}

function buildWhyThisFits(
  ritual: Ritual,
  request: ChooseWithMeRequest,
  evidence: string[],
): string {
  const requestDescription = describeRequest(request);
  const evidenceSentence = evidence.length > 0
    ? ` It keeps ${evidence.slice(0, 2).join(" and ")}.`
    : "";

  return `You asked for ${requestDescription}. ${ritual.presentation.whyThisFits}${evidenceSentence}`;
}

function buildHowThisWasChosen(request: ChooseWithMeRequest, debug: ChooseWithMeDebug): string {
  const preserved = [
    request.purpose ? purposeLabels[request.purpose] : undefined,
    request.carrier ? carrierLabels[request.carrier] : "an inferred carrier",
    request.audience === "both_of_us" ? "both of you" : "you",
    capacityLabels[request.energyCapacity],
  ].filter(Boolean);

  return `Moon & Table preserved ${preserved.join(", ")} and filtered out rituals that were not recommendation-ready, did not fit the audience, or asked for more capacity than you offered.`;
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
  }));

  return {
    normalizedRequest: request,
    eligibleCount: eligible.length,
    excludedCount: Object.values(exclusions).reduce((sum, count) => sum + count, 0),
    selectedRitualId: selected?.ritual.id,
    selectedScore: selected?.breakdown.total,
    selectedBreakdown: selected?.breakdown,
    topCandidates,
    exclusions,
    fallback: eligible.length === 0 ? "no_eligible_ritual_for_requested_cell" : undefined,
    timingEvidence: request.timingContext?.timingWindowCandidateIds?.length
      ? [`${request.timingContext.timingWindowCandidateIds.length} timing windows available`]
      : ["timing did not override the selected carrier and purpose"],
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
    timingContext: request.timingContext ?? {},
  };
  const exclusions: Record<string, number> = {};
  const allowedCapacities = allowedCapacityByMode[normalizedRequest.capacityMode];
  const eligible = getEligibleRituals(rituals, normalizedRequest, exclusions);
  const scored = eligible
    .map((ritual) => scoreRitual(ritual, normalizedRequest, allowedCapacities))
    .sort(sortScoredRituals);
  const debug = buildDebug(normalizedRequest, eligible, exclusions, scored);
  const selected = scored[0];

  if (!selected) {
    return {
      status: "no_result",
      whyThisFits: "I could not find a recommendation-ready ritual for that exact carrier, purpose, audience, and capacity.",
      howThisWasChosen: buildHowThisWasChosen(normalizedRequest, debug),
      debug,
    };
  }

  return {
    status: "selected",
    selectedRitual: selected.ritual,
    whyThisFits: buildWhyThisFits(
      selected.ritual,
      normalizedRequest,
      selected.evidence,
    ),
    howThisWasChosen: buildHowThisWasChosen(normalizedRequest, debug),
    debug,
  };
}
