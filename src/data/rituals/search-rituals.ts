import {
  RITUAL_AUDIENCES,
  RITUAL_CAPACITY_MODES,
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  hasRitualRecommendationMetadata,
  type Ritual,
  type RitualAudience,
  type RitualCapacityMode,
  type RitualCarrier,
  type RitualPurpose,
  type RitualRecommendationMetadata,
} from "./types";
import type {
  TimingWindowCandidate,
} from "../../lib/timing-window-candidates";
import type { TimingFact } from "../../lib/timing-facts";

export type RitualSearchChipKind = "carrier" | "purpose" | "material";
export type RitualOriginFilter = "all" | "source" | "household";
export type RitualTimingPresetFilter =
  | "new_moon"
  | "full_moon"
  | "waxing_moon"
  | "waning_moon"
  | "spring_equinox"
  | "fall_equinox"
  | "winter_solstice"
  | "summer_solstice"
  | "beginning_of_month"
  | "beginning_of_year"
  | "end_of_year";
export type RitualTimingFilter =
  | "all"
  | "current"
  | RitualTimingPresetFilter;
export type RitualSortKey =
  | "match"
  | "title"
  | "recently_added"
  | "oldest_added"
  | "source"
  | "purpose"
  | "carrier"
  | "material"
  | "capacity";

export type RitualSearchChip = {
  value: string;
  label: string;
  kind: RitualSearchChipKind;
};

export type RitualSourceOption = {
  value: string;
  label: string;
};

export type RitualSearchCriteria = {
  query?: string;
  selectedChips?: string[];
  origin?: RitualOriginFilter;
  source?: string;
  purpose?: string;
  carrier?: string;
  capacity?: string;
  audience?: string;
  includeNonFindable?: boolean;
  includeNonDirectUse?: boolean;
  sort?: RitualSortKey;
  timingWindow?: TimingWindowCandidate;
  timingWindows?: TimingWindowCandidate[];
  timingFilter?: RitualTimingFilter;
};

export type RitualTimingSearchMatch = {
  matchedContexts: string[];
  relationship: Exclude<
    RitualRecommendationMetadata["timing"]["relationship"],
    "none"
  >;
  windowLabel: string;
};

export type RitualTimingSearchTarget = {
  label: string;
  evidence: string[];
  timingWindow?: TimingWindowCandidate;
  timingWindows?: TimingWindowCandidate[];
};

export type RitualTimingFilterOption = {
  value: RitualTimingPresetFilter;
  label: string;
};

export const ritualTimingPresetOptions: RitualTimingFilterOption[] = [
  { value: "new_moon", label: "New Moon" },
  { value: "full_moon", label: "Full Moon" },
  { value: "waxing_moon", label: "Waxing Moon" },
  { value: "waning_moon", label: "Waning Moon" },
  { value: "spring_equinox", label: "Spring Equinox" },
  { value: "fall_equinox", label: "Fall Equinox" },
  { value: "winter_solstice", label: "Winter Solstice" },
  { value: "summer_solstice", label: "Summer Solstice" },
  { value: "beginning_of_month", label: "Beginning of month" },
  { value: "end_of_year", label: "End of year" },
  { value: "beginning_of_year", label: "Beginning of year" },
];

const ritualTimingPresetTargets: Record<
  RitualTimingPresetFilter,
  RitualTimingSearchTarget
> = {
  new_moon: {
    label: "New Moon",
    evidence: [
      "new moon",
      "new_moon",
      "pre new moon",
      "before new moon",
      "start of lunation",
      "early lunation",
    ],
  },
  full_moon: {
    label: "Full Moon",
    evidence: [
      "full moon",
      "full_moon",
      "seven days before the full moon",
    ],
  },
  waxing_moon: {
    label: "Waxing Moon",
    evidence: ["waxing moon", "waxing"],
  },
  waning_moon: {
    label: "Waning Moon",
    evidence: [
      "waning moon",
      "waning",
      "last quarter",
    ],
  },
  spring_equinox: {
    label: "Spring Equinox",
    evidence: [
      "spring equinox",
      "march equinox",
      "equinox",
      "spring",
      "seasonal turn",
      "seasonal marker",
    ],
  },
  fall_equinox: {
    label: "Fall Equinox",
    evidence: [
      "fall equinox",
      "autumn equinox",
      "september equinox",
      "equinox",
      "fall",
      "autumn",
      "harvest",
      "seasonal turn",
      "seasonal marker",
    ],
  },
  winter_solstice: {
    label: "Winter Solstice",
    evidence: [
      "winter solstice",
      "december solstice",
      "solstice",
      "winter",
      "seasonal turn",
      "seasonal marker",
    ],
  },
  summer_solstice: {
    label: "Summer Solstice",
    evidence: [
      "summer solstice",
      "june solstice",
      "solstice",
      "summer",
      "seasonal turn",
      "seasonal marker",
    ],
  },
  beginning_of_month: {
    label: "Beginning of month",
    evidence: [
      "beginning of month",
      "first day of month",
      "month turn",
      "calendar threshold",
    ],
  },
  beginning_of_year: {
    label: "Beginning of year",
    evidence: [
      "beginning of year",
      "new year",
      "year start",
      "first day of year",
      "year",
      "seasonal turn",
    ],
  },
  end_of_year: {
    label: "End of year",
    evidence: [
      "end of year",
      "year end",
      "last day of year",
      "year",
      "seasonal turn",
    ],
  },
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
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

function uniqueValues(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))]
    .map(normalize)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function stableSourceValue(label: string): string {
  return normalize(label)
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const canonicalSourceLabels: Record<string, string> = {
  "Buckland, Practical Candleburning Rituals":
    "Raymond Buckland, Practical Candleburning Rituals",
  "The House Witch":
    "Arin Murphy-Hiscock, The House Witch: Your Complete Guide to Creating a Magical Space with Rituals and Spells for Hearth and Home",
  "The Magical Household":
    "Scott Cunningham and David Harrington, The Magical Household: Spells & Rituals for the Home",
  "The Green Witch's Garden":
    "Arin Murphy-Hiscock, The Green Witch's Garden: Your Complete Guide to Creating and Cultivating a Magical Garden Space",
  "Whitehurst flower magic":
    "Tess Whitehurst, The Magic of Flowers: A Guide to Their Metaphysical Uses & Properties",
  "Saint Thomas, Sex Witch":
    "Sophie Saint Thomas, Sex Witch: Magickal Spells for Love, Lust, and Self-Protection",
  "Woodward, The Magical Household Cookbook":
    "Laurel Woodward, Kitchen Witchery: Unlocking the Magick in Everyday Ingredients",
  "Sarah Faith Gottesdiener, The Moon Book":
    "Sarah Faith Gottesdiener, The Moon Book: Lunar Magic to Change Your Life",
  "Margot Anand, The Art of Sexual Magic":
    "Margot Anand, The Art of Sexual Magic: Cultivating Sexual Energy to Transform Your Life",
  "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans":
    "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick",
};

function getCanonicalSourceLabel(label: string): string {
  return canonicalSourceLabels[label] ?? label;
}

function isRitualPurpose(value: string): value is RitualPurpose {
  return RITUAL_PURPOSES.includes(value as RitualPurpose);
}

function isRitualCarrier(value: string): value is RitualCarrier {
  return RITUAL_CARRIERS.includes(value as RitualCarrier);
}

function isRitualCapacityMode(value: string): value is RitualCapacityMode {
  return RITUAL_CAPACITY_MODES.includes(value as RitualCapacityMode);
}

function isRitualAudience(value: string): value is RitualAudience {
  return RITUAL_AUDIENCES.includes(value as RitualAudience);
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

function isRitualTimingSearchTarget(
  target: RitualTimingSearchTarget | TimingWindowCandidate,
): target is RitualTimingSearchTarget {
  return "evidence" in target;
}

function getTimingWindowSearchTarget(
  timingWindow: TimingWindowCandidate,
): RitualTimingSearchTarget {
  return {
    label: timingWindow.label,
    evidence: timingWindowEvidence(timingWindow),
    timingWindow,
  };
}

function getTimingWindowsSearchTarget(
  timingWindows: TimingWindowCandidate[],
): RitualTimingSearchTarget | undefined {
  const usefulTimingWindows = timingWindows.filter(
    (timingWindow, index, candidates) =>
      candidates.findIndex((candidate) => candidate.id === timingWindow.id) ===
        index,
  );

  if (usefulTimingWindows.length === 0) {
    return undefined;
  }

  return {
    label: usefulTimingWindows[0].label,
    evidence: usefulTimingWindows.flatMap(timingWindowEvidence),
    timingWindow: usefulTimingWindows[0],
    timingWindows: usefulTimingWindows,
  };
}

export function getRitualTimingSearchTarget(
  timingFilter: RitualTimingFilter,
  timingWindow?: TimingWindowCandidate,
  timingWindows: TimingWindowCandidate[] = timingWindow ? [timingWindow] : [],
): RitualTimingSearchTarget | undefined {
  if (timingFilter === "all") {
    return undefined;
  }

  if (timingFilter === "current") {
    return getTimingWindowsSearchTarget(timingWindows) ??
      (timingWindow ? getTimingWindowSearchTarget(timingWindow) : undefined);
  }

  return ritualTimingPresetTargets[timingFilter];
}

function contextMatchesEvidence(context: string, evidence: string[]): boolean {
  const normalizedContext = normalizeTimingText(context);

  if (!normalizedContext) {
    return false;
  }

  const normalizedEvidence = evidence.map(normalizeTimingText);

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
    "year",
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
  const lunarPhaseTokens = [
    "full",
    "new",
    "dark",
    "balsamic",
    "quarter",
    "waxing",
    "waning",
  ];
  const hasStandaloneLunarPhaseToken = lunarPhaseTokens.some((word) =>
    contextTokenSet.has(word),
  );
  const hasExplicitLunarContext =
    contextTokenSet.has("moon") ||
    contextTokenSet.has("lunation") ||
    contextTokenSet.has("phase");
  const hasCalendarThresholdContext =
    contextTokenSet.has("calendar") ||
    contextTokenSet.has("month") ||
    contextTokenSet.has("year");

  if (timingContextTokens.length === 0) {
    return false;
  }

  if (hasStandaloneLunarPhaseToken && !hasExplicitLunarContext) {
    return false;
  }

  if (contextTokenSet.has("threshold") && !hasCalendarThresholdContext) {
    return false;
  }

  return normalizedEvidence.some((candidate) => {
    const candidateTokens = new Set(timingTokens(candidate));
    const candidateHasLunarPhaseToken = lunarPhaseTokens.some((word) =>
      candidateTokens.has(word),
    );

    if (
      candidateHasLunarPhaseToken &&
      !hasStandaloneLunarPhaseToken &&
      !contextTokenSet.has("lunation")
    ) {
      return false;
    }

    return timingContextTokens.every((token) => candidateTokens.has(token));
  });
}

export function getRitualTimingSearchMatch(
  ritual: Ritual,
  target: RitualTimingSearchTarget | TimingWindowCandidate | undefined,
): RitualTimingSearchMatch | null {
  const relationship = ritual.recommendationMetadata?.timing.relationship;

  if (!target || !relationship || relationship === "none") {
    return null;
  }

  const timingTarget = isRitualTimingSearchTarget(target)
    ? target
    : getTimingWindowSearchTarget(target);
  const matchedContexts =
    ritual.recommendationMetadata?.timing.contexts?.filter((context) =>
      contextMatchesEvidence(context, timingTarget.evidence),
    ) ?? [];

  if (matchedContexts.length === 0) {
    return null;
  }

  return {
    matchedContexts,
    relationship,
    windowLabel: timingTarget.label,
  };
}

export function getRitualSourceLabels(ritual: Ritual): string[] {
  const labels = [ritual.searchMetadata.sourceLabel].map((label) =>
    label ? getCanonicalSourceLabel(label) : label,
  );

  return [...new Set(labels.filter((label): label is string => Boolean(label)))]
    .sort((a, b) => a.localeCompare(b));
}

export function getRitualSourceFilterValue(label: string): string {
  return stableSourceValue(label);
}

export function getRitualSourceOptions(rituals: Ritual[]): RitualSourceOption[] {
  const options = new Map<string, RitualSourceOption>();

  for (const ritual of rituals) {
    if (ritual.origin.type !== "source") {
      continue;
    }

    for (const label of getRitualSourceLabels(ritual)) {
      const value = getRitualSourceFilterValue(label);

      if (!value || options.has(value)) {
        continue;
      }

      options.set(value, { value, label });
    }
  }

  return [...options.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function getRitualPurposeOptions(rituals: Ritual[]): RitualSourceOption[] {
  const values = new Set<string>();

  for (const ritual of rituals.filter(isSearchEligible).filter(hasRitualRecommendationMetadata)) {
    for (const purpose of [
      ritual.recommendationMetadata.purposes.primary,
      ...ritual.recommendationMetadata.purposes.secondary,
    ]) {
      values.add(purpose);
    }
  }

  return [...values]
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value, label: value }));
}

export function getRitualCarrierOptions(rituals: Ritual[]): RitualSourceOption[] {
  const values = new Set<string>();

  for (const ritual of rituals.filter(isSearchEligible).filter(hasRitualRecommendationMetadata)) {
    for (const carrier of [
      ritual.recommendationMetadata.carriers.primary,
      ...ritual.recommendationMetadata.carriers.secondary,
    ]) {
      values.add(carrier);
    }
  }

  return [...values]
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value, label: value }));
}

export function getRitualCapacityOptions(rituals: Ritual[]): RitualSourceOption[] {
  const values = new Set<string>();

  for (const ritual of rituals.filter(isSearchEligible).filter(hasRitualRecommendationMetadata)) {
    for (const capacity of ritual.recommendationMetadata.capacity.supports) {
      values.add(capacity);
    }
  }

  return RITUAL_CAPACITY_MODES
    .filter((value) => values.has(value))
    .map((value) => ({ value, label: value }));
}

export function getRitualAudienceOptions(rituals: Ritual[]): RitualSourceOption[] {
  const values = new Set<string>();

  for (const ritual of rituals.filter(isSearchEligible).filter(hasRitualRecommendationMetadata)) {
    for (const audience of ritual.recommendationMetadata.audience.supports) {
      values.add(audience);
    }
  }

  return RITUAL_AUDIENCES
    .filter((value) => values.has(value))
    .map((value) => ({ value, label: value }));
}

export function getRitualSearchableValues(ritual: Ritual): string[] {
  return [
    ritual.presentation.headline,
    ritual.presentation.intention,
    ritual.presentation.questionToCarry,
    ritual.presentation.whyThisFits,
    ...ritual.searchMetadata.tags,
    ...ritual.searchMetadata.keywords,
    ...(ritual.searchMetadata.materials ?? []),
    ...(ritual.searchMetadata.places ?? []),
    ritual.searchMetadata.sourceLabel,
    ritual.searchMetadata.originLabel,
    ritual.recommendationMetadata?.purposes.primary,
    ...(ritual.recommendationMetadata?.purposes.secondary ?? []),
    ritual.recommendationMetadata?.carriers.primary,
    ...(ritual.recommendationMetadata?.carriers.secondary ?? []),
  ].filter((value): value is string => Boolean(value));
}

export function getRitualChipValues(ritual: Ritual): string[] {
  return uniqueValues([
    ritual.recommendationMetadata?.carriers.primary,
    ...(ritual.recommendationMetadata?.carriers.secondary ?? []),
    ritual.recommendationMetadata?.purposes.primary,
    ...(ritual.recommendationMetadata?.purposes.secondary ?? []),
    ...(ritual.searchMetadata.materials ?? []),
  ]);
}

function isSearchEligible(ritual: Ritual): boolean {
  return ritual.availability.findable && ritual.availability.directUseEligible;
}

export function getRitualSearchChips(rituals: Ritual[]): RitualSearchChip[] {
  const chips = new Map<string, RitualSearchChip>();

  for (const ritual of rituals.filter(isSearchEligible).filter(hasRitualRecommendationMetadata)) {
    for (const carrier of uniqueValues([
      ritual.recommendationMetadata.carriers.primary,
      ...ritual.recommendationMetadata.carriers.secondary,
    ])) {
      chips.set(carrier, {
        value: carrier,
        label: carrier,
        kind: "carrier",
      });
    }

    for (const purpose of uniqueValues([
      ritual.recommendationMetadata.purposes.primary,
      ...ritual.recommendationMetadata.purposes.secondary,
    ])) {
      chips.set(purpose, {
        value: purpose,
        label: purpose,
        kind: "purpose",
      });
    }

    for (const material of uniqueValues([
      ...(ritual.searchMetadata.materials ?? []),
      ...ritual.searchMetadata.tags,
      ...ritual.searchMetadata.keywords,
    ])) {
      if (chips.has(material)) {
        continue;
      }

      chips.set(material, {
        value: material,
        label: material,
        kind: "material",
      });
    }
  }

  return [...chips.values()].sort((a, b) => {
    if (a.kind !== b.kind) {
      return a.kind.localeCompare(b.kind);
    }

    return a.label.localeCompare(b.label);
  });
}

export function searchRituals(
  rituals: Ritual[],
  criteria: RitualSearchCriteria = {},
): Ritual[] {
  const query = normalize(criteria.query ?? "");
  const selectedChips = uniqueValues(criteria.selectedChips ?? []);
  const origin = criteria.origin ?? "all";
  const source = criteria.source ?? "all";
  const purpose = criteria.purpose && isRitualPurpose(criteria.purpose)
    ? criteria.purpose
    : "all";
  const carrier = criteria.carrier && isRitualCarrier(criteria.carrier)
    ? criteria.carrier
    : "all";
  const capacity = criteria.capacity && isRitualCapacityMode(criteria.capacity)
    ? criteria.capacity
    : "all";
  const audience = criteria.audience && isRitualAudience(criteria.audience)
    ? criteria.audience
    : "all";
  const timingFilter = criteria.timingFilter ?? "all";
  const timingTarget = getRitualTimingSearchTarget(
    timingFilter,
    criteria.timingWindow,
    criteria.timingWindows,
  );

  const filtered = rituals.filter((ritual) => {
    if (!criteria.includeNonFindable && !ritual.availability.findable) {
      return false;
    }

    if (!criteria.includeNonDirectUse && !ritual.availability.directUseEligible) {
      return false;
    }

    if (origin !== "all" && ritual.origin.type !== origin) {
      return false;
    }

    if (
      source !== "all" &&
      !getRitualSourceLabels(ritual).some(
        (label) => getRitualSourceFilterValue(label) === source,
      )
    ) {
      return false;
    }

    if (
      purpose !== "all" &&
      (ritual.recommendationMetadata?.purposes.primary !== purpose &&
        !ritual.recommendationMetadata?.purposes.secondary.includes(purpose))
    ) {
      return false;
    }

    if (
      carrier !== "all" &&
      (ritual.recommendationMetadata?.carriers.primary !== carrier &&
        !ritual.recommendationMetadata?.carriers.secondary.includes(carrier))
    ) {
      return false;
    }

    if (
      capacity !== "all" &&
      !ritual.recommendationMetadata?.capacity.supports.includes(capacity)
    ) {
      return false;
    }

    if (
      audience !== "all" &&
      !ritual.recommendationMetadata?.audience.supports.includes(audience)
    ) {
      return false;
    }

    if (
      timingFilter !== "all" &&
      !getRitualTimingSearchMatch(ritual, timingTarget)
    ) {
      return false;
    }

    const searchableText = getRitualSearchableValues(ritual)
      .map(normalize)
      .join(" ");
    const chipValues = new Set(getRitualChipValues(ritual));
    const queryMatches = !query || searchableText.includes(query);
    const chipsMatch = selectedChips.every((chip) => chipValues.has(chip));

    return queryMatches && chipsMatch;
  });

  return sortRituals(filtered, criteria.sort ?? "match", rituals, {
    timingWindow: criteria.timingWindow,
    timingWindows: criteria.timingWindows,
    timingFilter,
  });
}

function getPrimaryRitualMaterial(ritual: Ritual): string {
  return ritual.searchMetadata.materials?.[0] ??
    ritual.searchMetadata.tags[0] ??
    ritual.recommendationMetadata?.carriers.primary ??
    "";
}

function getDefaultCapacity(ritual: Ritual): string {
  return ritual.recommendationMetadata?.capacity.default ??
    ritual.recommendationMetadata?.capacity.supports[0] ??
    "";
}

function getPrimarySourceLabel(ritual: Ritual): string {
  return getRitualSourceLabels(ritual)[0] ?? ritual.origin.type;
}

function originalIndexMap(rituals: Ritual[]): Map<string, number> {
  return new Map(rituals.map((ritual, index) => [ritual.id, index]));
}

function compareText(a: string, b: string): number {
  const normalizedA = normalize(a);
  const normalizedB = normalize(b);

  if (!normalizedA && normalizedB) {
    return 1;
  }

  if (normalizedA && !normalizedB) {
    return -1;
  }

  return normalizedA.localeCompare(normalizedB);
}

function compareByHeadline(a: Ritual, b: Ritual): number {
  return compareText(a.presentation.headline, b.presentation.headline);
}

export function sortRituals(
  rituals: Ritual[],
  sort: RitualSortKey,
  originalOrder: Ritual[] = rituals,
  options: Pick<
    RitualSearchCriteria,
    "timingWindow" | "timingWindows" | "timingFilter"
  > = {},
): Ritual[] {
  const order = originalIndexMap(originalOrder);
  const sorted = [...rituals];
  const originalIndex = (ritual: Ritual) => order.get(ritual.id) ?? 0;
  const timingRelationshipRank: Record<
    Exclude<RitualRecommendationMetadata["timing"]["relationship"], "none">,
    number
  > = {
    required: 3,
    preferred: 2,
    helpful: 1,
  };

  if (
    options.timingFilter &&
    options.timingFilter !== "all" &&
    sort === "match"
  ) {
    const timingTarget = getRitualTimingSearchTarget(
      options.timingFilter,
      options.timingWindow,
      options.timingWindows,
    );

    return sorted.sort((a, b) => {
      const aMatch = getRitualTimingSearchMatch(a, timingTarget);
      const bMatch = getRitualTimingSearchMatch(b, timingTarget);
      const timingCompare =
        (bMatch ? timingRelationshipRank[bMatch.relationship] : 0) -
        (aMatch ? timingRelationshipRank[aMatch.relationship] : 0);

      return timingCompare || originalIndex(a) - originalIndex(b);
    });
  }

  switch (sort) {
    case "title":
      return sorted.sort(compareByHeadline);
    case "recently_added":
      return sorted.sort((a, b) => originalIndex(b) - originalIndex(a));
    case "oldest_added":
      return sorted.sort((a, b) => originalIndex(a) - originalIndex(b));
    case "source":
      return sorted.sort(
        (a, b) =>
          compareText(getPrimarySourceLabel(a), getPrimarySourceLabel(b)) ||
          compareByHeadline(a, b),
      );
    case "purpose":
      return sorted.sort(
        (a, b) =>
          compareText(
            a.recommendationMetadata?.purposes.primary ?? "",
            b.recommendationMetadata?.purposes.primary ?? "",
          ) || compareByHeadline(a, b),
      );
    case "carrier":
      return sorted.sort(
        (a, b) =>
          compareText(
            a.recommendationMetadata?.carriers.primary ?? "",
            b.recommendationMetadata?.carriers.primary ?? "",
          ) || compareByHeadline(a, b),
      );
    case "material":
      return sorted.sort(
        (a, b) =>
          compareText(getPrimaryRitualMaterial(a), getPrimaryRitualMaterial(b)) ||
          compareByHeadline(a, b),
      );
    case "capacity":
      return sorted.sort(
        (a, b) =>
          compareText(getDefaultCapacity(a), getDefaultCapacity(b)) ||
          compareByHeadline(a, b),
      );
    case "match":
    default:
      return sorted;
  }
}
