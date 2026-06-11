import type { Ritual } from "./types";

export type RitualSearchChipKind = "carrier" | "purpose" | "material";

export type RitualSearchChip = {
  value: string;
  label: string;
  kind: RitualSearchChipKind;
};

export type RitualSearchCriteria = {
  query?: string;
  selectedChips?: string[];
  includeNonFindable?: boolean;
  includeNonDirectUse?: boolean;
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

  return rituals.filter((ritual) => {
    if (!criteria.includeNonFindable && !ritual.availability.findable) {
      return false;
    }

    if (!criteria.includeNonDirectUse && !ritual.availability.directUseEligible) {
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
}
