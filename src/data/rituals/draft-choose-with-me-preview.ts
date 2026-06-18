import {
  chooseWithMeRitual,
  type ChooseWithMeRequest,
  type ChooseWithMeResult,
} from "./choose-with-me-selector";
import type { RitualEditDraftDocument } from "./ritual-edit-drafts";
import type {
  Ritual,
  RitualAudience,
  RitualCapacityMode,
  RitualCarrier,
  RitualPurpose,
  RitualRecommendationMetadata,
  RitualSearchMetadata,
} from "./types";
import type { CapacityMode } from "../../lib/generate-weekly-brief";
import type {
  RitualCheckInAudience,
  RitualCheckInEnergyCapacity,
} from "../../lib/current-ritual-check-in";
import type { TimingFact } from "../../lib/timing-facts";
import type { TimingWindowCandidate } from "../../lib/timing-window-candidates";

export const RITUAL_DRAFT_CHOOSE_PREVIEW_TIMING_SAMPLES = [
  "none",
  "current",
  "new_moon",
  "full_moon",
  "mercury_retrograde",
] as const;

export type RitualDraftChoosePreviewTimingSample =
  (typeof RITUAL_DRAFT_CHOOSE_PREVIEW_TIMING_SAMPLES)[number];

export type RitualDraftChoosePreviewSampleInput = {
  energyCapacity: RitualCheckInEnergyCapacity;
  audience: RitualCheckInAudience;
  purpose: RitualPurpose;
  carrier: RitualCarrier;
  timing: RitualDraftChoosePreviewTimingSample;
};

export type RitualDraftChoosePreviewStatus = "eligible" | "blocked";

export type RitualDraftChoosePreviewModel = {
  status: RitualDraftChoosePreviewStatus;
  statusLabel: string;
  sampleInput: RitualDraftChoosePreviewSampleInput;
  blockers: string[];
  whyThisFits?: string;
  howThisWasChosen?: string;
  timingImpact: string;
  capacityFit: string;
  audienceFit: string;
  purposeCarrierFit: string;
  selectedHeadline?: string;
};

type CreateRitualDraftChoosePreviewInput = {
  baseRitual: Ritual;
  draft?: RitualEditDraftDocument;
  sampleInput?: Partial<RitualDraftChoosePreviewSampleInput>;
  currentTimingWindow?: TimingWindowCandidate;
  currentTimingWindows?: TimingWindowCandidate[];
};

const capacityModesByEnergy: Record<RitualCheckInEnergyCapacity, CapacityMode> = {
  barely_any: "pause",
  a_little: "low",
  enough_to_engage: "steady",
  room_for_something_deeper: "high",
};

const supportedCapacityByEnergy: Record<RitualCheckInEnergyCapacity, RitualCapacityMode> = {
  barely_any: "barely_any",
  a_little: "only_a_little",
  enough_to_engage: "enough_to_participate",
  room_for_something_deeper: "room_for_something_deeper",
};

const energyLabels: Record<RitualCheckInEnergyCapacity, string> = {
  barely_any: "barely any",
  a_little: "a little",
  enough_to_engage: "enough to participate",
  room_for_something_deeper: "room for something deeper",
};

const audienceLabels: Record<RitualAudience, string> = {
  me: "me",
  both_of_us: "both of us",
};

const timingLabels: Record<RitualDraftChoosePreviewTimingSample, string> = {
  none: "no timing",
  current: "current timing",
  new_moon: "new moon",
  full_moon: "full moon",
  mercury_retrograde: "Mercury retrograde",
};

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function completeRecommendationMetadata(
  value: Partial<RitualRecommendationMetadata> | undefined,
): RitualRecommendationMetadata | undefined {
  if (
    !value?.purposes?.primary ||
    !Array.isArray(value.purposes.secondary) ||
    !value?.carriers?.primary ||
    !Array.isArray(value.carriers.secondary) ||
    !Array.isArray(value.capacity?.supports) ||
    !Array.isArray(value.audience?.supports) ||
    !value.timing?.relationship ||
    typeof value.eligibility?.recommendable !== "boolean"
  ) {
    return undefined;
  }

  return {
    purposes: {
      primary: value.purposes.primary,
      secondary: value.purposes.secondary,
      refinement: value.purposes.refinement ?? "",
    },
    carriers: {
      primary: value.carriers.primary,
      secondary: value.carriers.secondary,
    },
    capacity: {
      supports: value.capacity.supports,
      ...(value.capacity.default ? { default: value.capacity.default } : {}),
    },
    audience: {
      supports: value.audience.supports,
      ...(value.audience.default ? { default: value.audience.default } : {}),
      ...(value.audience.bothOfUsStructure
        ? { bothOfUsStructure: value.audience.bothOfUsStructure }
        : {}),
    },
    timing: {
      relationship: value.timing.relationship,
      ...(value.timing.contexts ? { contexts: value.timing.contexts } : {}),
    },
    eligibility: {
      recommendable: value.eligibility.recommendable,
      ...(value.eligibility.missing ? { missing: value.eligibility.missing } : {}),
      ...(value.eligibility.notFor ? { notFor: value.eligibility.notFor } : {}),
    },
  };
}

function completeSearchMetadata(
  value: Partial<RitualSearchMetadata> | undefined,
): RitualSearchMetadata {
  return {
    tags: value?.tags ?? [],
    keywords: value?.keywords ?? [],
    ...(value?.materials ? { materials: value.materials } : {}),
    ...(value?.places ? { places: value.places } : {}),
    ...(value?.sourceLabel ? { sourceLabel: value.sourceLabel } : {}),
    ...(value?.originLabel ? { originLabel: value.originLabel } : {}),
  };
}

function createPreviewRitual(
  baseRitual: Ritual,
  draft: RitualEditDraftDocument,
  recommendationMetadata: RitualRecommendationMetadata,
): Ritual {
  const draftBuffer = draft.draftBuffer;

  return {
    ...cloneJson(baseRitual),
    id: draftBuffer.id,
    status: draftBuffer.status ?? baseRitual.status,
    origin: cloneJson(draftBuffer.origin),
    presentation: {
      ...cloneJson(baseRitual.presentation),
      ...cloneJson(draftBuffer.presentation),
      whyThisFits: baseRitual.presentation.whyThisFits,
    },
    recommendationMetadata,
    searchMetadata: completeSearchMetadata(draftBuffer.searchMetadata),
    availability: {
      ...baseRitual.availability,
      ...cloneJson(draftBuffer.availability ?? {}),
    },
    ritualWords: draftBuffer.ritualWords
      ? cloneJson(draftBuffer.ritualWords)
      : baseRitual.ritualWords,
    reviewFlags: draftBuffer.reviewFlags
      ? cloneJson(draftBuffer.reviewFlags)
      : baseRitual.reviewFlags,
    adaptationPolicy: draftBuffer.adaptationPolicy
      ? cloneJson(draftBuffer.adaptationPolicy)
      : baseRitual.adaptationPolicy,
  };
}

function makeMoonPhaseFact(phase: "new" | "full"): TimingFact {
  return {
    id: `preview.moon_phase.${phase}`,
    type: "moon_phase",
    label: `${phase} moon`,
    phase,
    phaseAngleDegrees: phase === "full" ? 180 : 0,
    computedBy: "manual",
    confidence: "manual",
  };
}

function makeMercuryRetrogradeFact(): TimingFact {
  return {
    id: "preview.planet_retrograde.mercury",
    type: "planet_retrograde",
    label: "Mercury retrograde",
    planet: "mercury",
    isRetrograde: true,
    apparentDailyMotionDegrees: -0.4,
    computedBy: "manual",
    confidence: "manual",
  };
}

function makeTimingWindow(
  id: string,
  label: string,
  fact: TimingFact,
): TimingWindowCandidate {
  return {
    id,
    startsAtIso: "2026-01-01T00:00:00.000Z",
    label,
    timingFacts: [fact],
    signalKeys: [id],
    natalContactKeys: [],
    natalContactThemeKeys: [],
    strength: "supporting",
    score: 12,
    scoreReasons: [
      {
        code: id,
        label,
        points: 12,
      },
    ],
  };
}

function getTimingContext(input: {
  sample: RitualDraftChoosePreviewTimingSample;
  currentTimingWindow?: TimingWindowCandidate;
  currentTimingWindows?: TimingWindowCandidate[];
}): ChooseWithMeRequest["timingContext"] {
  if (input.sample === "none") {
    return {};
  }

  if (input.sample === "current") {
    return {
      selectedTimingWindow: input.currentTimingWindow,
      timingWindowCandidates: input.currentTimingWindows,
      timingWindowCandidateIds: input.currentTimingWindow
        ? [input.currentTimingWindow.id]
        : undefined,
    };
  }

  if (input.sample === "mercury_retrograde") {
    const fact = makeMercuryRetrogradeFact();
    return {
      computedTimingFacts: [fact],
    };
  }

  const phase = input.sample === "full_moon" ? "full" : "new";
  const fact = makeMoonPhaseFact(phase);
  const window = makeTimingWindow(
    `preview.timing_window.${input.sample}`,
    timingLabels[input.sample],
    fact,
  );

  return {
    computedTimingFacts: [fact],
    selectedTimingWindow: window,
    timingWindowCandidates: [window],
    timingWindowCandidateIds: [window.id],
  };
}

function getDefaultSampleInput(
  ritual: Ritual,
): RitualDraftChoosePreviewSampleInput {
  return {
    energyCapacity: "enough_to_engage",
    audience: ritual.recommendationMetadata.audience.default ??
      ritual.recommendationMetadata.audience.supports[0] ??
      "me",
    purpose: ritual.recommendationMetadata.purposes.primary,
    carrier: ritual.recommendationMetadata.carriers.primary,
    timing: "current",
  };
}

function mergeSampleInput(
  defaults: RitualDraftChoosePreviewSampleInput,
  sampleInput: Partial<RitualDraftChoosePreviewSampleInput> | undefined,
): RitualDraftChoosePreviewSampleInput {
  return {
    ...defaults,
    ...sampleInput,
  };
}

function blockerModel(
  sampleInput: RitualDraftChoosePreviewSampleInput,
  blockers: string[],
): RitualDraftChoosePreviewModel {
  return {
    status: "blocked",
    statusLabel: "Not eligible",
    sampleInput,
    blockers,
    timingImpact: "Timing was not evaluated because the preview is blocked.",
    capacityFit: "Capacity was not evaluated because the preview is blocked.",
    audienceFit: "Audience was not evaluated because the preview is blocked.",
    purposeCarrierFit: "Purpose and carrier were not evaluated because the preview is blocked.",
  };
}

function getPreflightBlockers(ritual: Ritual): string[] {
  const metadata = ritual.recommendationMetadata;
  const blockers: string[] = [];

  if (ritual.status === "draft") {
    blockers.push("Not eligible because the draft is still in draft status.");
  }

  if (!ritual.availability.directUseEligible) {
    blockers.push("Not eligible because the draft is not direct-use eligible yet.");
  }

  if (!ritual.availability.recommendationEligible) {
    blockers.push("Not eligible because the draft has not been promoted for recommendations.");
  }

  if (!metadata.eligibility.recommendable) {
    blockers.push("Not eligible because recommendation metadata is not marked recommendable.");
  }

  if (metadata.eligibility.missing?.length) {
    blockers.push("Not eligible because recommendation metadata still has unresolved holds.");
  }

  if (metadata.eligibility.notFor?.length) {
    blockers.push("Not eligible because this draft has recommendation exclusions.");
  }

  return blockers;
}

function getSelectorBlockers(result: ChooseWithMeResult): string[] {
  const exclusions = result.debug.exclusions;
  const blockers: string[] = [];

  if (exclusions.required_timing_unmatched) {
    blockers.push("Not eligible because required timing is unsupported by the selected timing sample.");
  }

  if (exclusions.audience_mismatch) {
    blockers.push("Not eligible because the draft does not support the selected audience.");
  }

  if (exclusions.capacity_exceeds_user) {
    blockers.push("Not eligible because the draft asks for more capacity than the sample allows.");
  }

  if (exclusions.requested_primary_purpose_unmatched) {
    blockers.push("Not eligible because the selected purpose is not the draft's primary purpose.");
  }

  if (exclusions.requested_primary_carrier_unmatched) {
    blockers.push("Not eligible because the selected carrier is not the draft's primary carrier.");
  }

  if (blockers.length === 0) {
    blockers.push("Not eligible for this sample input.");
  }

  return blockers;
}

function describeTimingImpact(
  ritual: Ritual,
  result: ChooseWithMeResult,
  sampleInput: RitualDraftChoosePreviewSampleInput,
): string {
  const timing = result.debug.timing;

  if (timing.matchedRitualTiming.length > 0) {
    return `${timingLabels[sampleInput.timing]} matched ${timing.matchedRitualTiming.join(", ")}.`;
  }

  if (ritual.recommendationMetadata.timing.relationship === "required") {
    return `${timingLabels[sampleInput.timing]} did not satisfy the draft's required timing.`;
  }

  if (ritual.recommendationMetadata.timing.relationship === "none") {
    return "Timing does not shape this draft.";
  }

  return `${timingLabels[sampleInput.timing]} did not add a timing boost.`;
}

function describeCapacityFit(
  ritual: Ritual,
  sampleInput: RitualDraftChoosePreviewSampleInput,
): string {
  const supportedCapacity = supportedCapacityByEnergy[sampleInput.energyCapacity];

  return ritual.recommendationMetadata.capacity.supports.includes(supportedCapacity)
    ? `Supports ${energyLabels[sampleInput.energyCapacity]}.`
    : `Does not support ${energyLabels[sampleInput.energyCapacity]}.`;
}

function describeAudienceFit(
  ritual: Ritual,
  sampleInput: RitualDraftChoosePreviewSampleInput,
): string {
  return ritual.recommendationMetadata.audience.supports.includes(sampleInput.audience)
    ? `Supports ${audienceLabels[sampleInput.audience]}.`
    : `Does not support ${audienceLabels[sampleInput.audience]}.`;
}

function describePurposeCarrierFit(
  ritual: Ritual,
  sampleInput: RitualDraftChoosePreviewSampleInput,
): string {
  const purposeFit = ritual.recommendationMetadata.purposes.primary === sampleInput.purpose
    ? "primary purpose matches"
    : "primary purpose does not match";
  const carrierFit = ritual.recommendationMetadata.carriers.primary === sampleInput.carrier
    ? "primary carrier matches"
    : "primary carrier does not match";

  return `${purposeFit}; ${carrierFit}.`;
}

export function createRitualDraftChooseWithMePreview(
  input: CreateRitualDraftChoosePreviewInput,
): RitualDraftChoosePreviewModel {
  const fallbackDefaults = getDefaultSampleInput(input.baseRitual);

  if (!input.draft) {
    return blockerModel(
      mergeSampleInput(fallbackDefaults, input.sampleInput),
      ["Open a draft to preview Choose with me behavior."],
    );
  }

  const metadata = completeRecommendationMetadata(
    input.draft.draftBuffer.recommendationMetadata,
  );
  const sampleInput = mergeSampleInput(
    metadata
      ? getDefaultSampleInput({
          ...input.baseRitual,
          recommendationMetadata: metadata,
        })
      : fallbackDefaults,
    input.sampleInput,
  );

  if (!metadata) {
    return blockerModel(
      sampleInput,
      ["Not eligible because recommendation metadata is incomplete."],
    );
  }

  const ritual = createPreviewRitual(input.baseRitual, input.draft, metadata);
  const preflightBlockers = getPreflightBlockers(ritual);

  if (preflightBlockers.length > 0) {
    return blockerModel(sampleInput, preflightBlockers);
  }

  const request: ChooseWithMeRequest = {
    timeScope: sampleInput.timing === "current" ? "best_moment_this_week" : "today",
    energyCapacity: sampleInput.energyCapacity,
    capacityMode: capacityModesByEnergy[sampleInput.energyCapacity],
    audience: sampleInput.audience,
    purpose: sampleInput.purpose,
    carrier: sampleInput.carrier,
    refinement: null,
    freeTextIntent: null,
    timingContext: getTimingContext({
      sample: sampleInput.timing,
      currentTimingWindow: input.currentTimingWindow,
      currentTimingWindows: input.currentTimingWindows,
    }),
  };
  const result = chooseWithMeRitual([ritual], request);

  if (result.status !== "selected") {
    return {
      status: "blocked",
      statusLabel: "Not eligible",
      sampleInput,
      blockers: getSelectorBlockers(result),
      whyThisFits: result.whyThisFits,
      howThisWasChosen: result.howThisWasChosen,
      timingImpact: describeTimingImpact(ritual, result, sampleInput),
      capacityFit: describeCapacityFit(ritual, sampleInput),
      audienceFit: describeAudienceFit(ritual, sampleInput),
      purposeCarrierFit: describePurposeCarrierFit(ritual, sampleInput),
    };
  }

  return {
    status: "eligible",
    statusLabel: "Eligible for this sample",
    sampleInput,
    blockers: [],
    selectedHeadline: result.selectedRitual.presentation.headline,
    whyThisFits: result.whyThisFits,
    howThisWasChosen: result.howThisWasChosen,
    timingImpact: describeTimingImpact(ritual, result, sampleInput),
    capacityFit: describeCapacityFit(ritual, sampleInput),
    audienceFit: describeAudienceFit(ritual, sampleInput),
    purposeCarrierFit: describePurposeCarrierFit(ritual, sampleInput),
  };
}
