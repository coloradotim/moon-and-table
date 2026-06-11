import {
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  type Ritual,
  type RitualCarrier,
  type RitualPurpose,
} from "./types";

export type RitualSearchChipKind = "carrier" | "purpose" | "material";
export type RitualOriginFilter = "all" | "source" | "household";
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
  includeNonFindable?: boolean;
  includeNonDirectUse?: boolean;
  sort?: RitualSortKey;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
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

  for (const ritual of rituals.filter(isSearchEligible)) {
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

  for (const ritual of rituals.filter(isSearchEligible)) {
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
    ritual.recommendationMetadata.purposes.primary,
    ...ritual.recommendationMetadata.purposes.secondary,
    ritual.recommendationMetadata.carriers.primary,
    ...ritual.recommendationMetadata.carriers.secondary,
  ].filter((value): value is string => Boolean(value));
}

export function getRitualChipValues(ritual: Ritual): string[] {
  return uniqueValues([
    ritual.recommendationMetadata.carriers.primary,
    ...ritual.recommendationMetadata.carriers.secondary,
    ritual.recommendationMetadata.purposes.primary,
    ...ritual.recommendationMetadata.purposes.secondary,
    ...(ritual.searchMetadata.materials ?? []),
  ]);
}

function isSearchEligible(ritual: Ritual): boolean {
  return ritual.availability.findable && ritual.availability.directUseEligible;
}

export function getRitualSearchChips(rituals: Ritual[]): RitualSearchChip[] {
  const chips = new Map<string, RitualSearchChip>();

  for (const ritual of rituals.filter(isSearchEligible)) {
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
      ritual.recommendationMetadata.purposes.primary !== purpose &&
      !ritual.recommendationMetadata.purposes.secondary.includes(purpose)
    ) {
      return false;
    }

    if (
      carrier !== "all" &&
      ritual.recommendationMetadata.carriers.primary !== carrier &&
      !ritual.recommendationMetadata.carriers.secondary.includes(carrier)
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

  return sortRituals(filtered, criteria.sort ?? "match", rituals);
}

function getPrimaryRitualMaterial(ritual: Ritual): string {
  return ritual.searchMetadata.materials?.[0] ??
    ritual.searchMetadata.tags[0] ??
    ritual.recommendationMetadata.carriers.primary;
}

function getDefaultCapacity(ritual: Ritual): string {
  return ritual.recommendationMetadata.capacity.default ??
    ritual.recommendationMetadata.capacity.supports[0] ??
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
): Ritual[] {
  const order = originalIndexMap(originalOrder);
  const sorted = [...rituals];
  const originalIndex = (ritual: Ritual) => order.get(ritual.id) ?? 0;

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
            a.recommendationMetadata.purposes.primary,
            b.recommendationMetadata.purposes.primary,
          ) || compareByHeadline(a, b),
      );
    case "carrier":
      return sorted.sort(
        (a, b) =>
          compareText(
            a.recommendationMetadata.carriers.primary,
            b.recommendationMetadata.carriers.primary,
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
