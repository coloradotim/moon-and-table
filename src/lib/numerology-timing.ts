export type NumerologyNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type NumerologyTimingScope =
  | "universal_year"
  | "universal_month"
  | "universal_day";

export type NumerologyTimingFact = {
  id: string;
  type: "numerology_date";
  key: string;
  scope: NumerologyTimingScope;
  label: string;
  dateIso: string;
  exactIso: string;
  timezone: string;
  number: NumerologyNumber;
  numerologyScope: NumerologyTimingScope;
  numerologyNumber: NumerologyNumber;
  computedBy: "app_numerology";
  confidence: "computed";
  relatedSymbolicKeys: string[];
};

export type UniversalNumerologyNumbers = Record<
  NumerologyTimingScope,
  NumerologyNumber
>;

const NUMEROLOGY_SCOPES: NumerologyTimingScope[] = [
  "universal_year",
  "universal_month",
  "universal_day",
];

const SCOPE_LABELS: Record<NumerologyTimingScope, string> = {
  universal_year: "Universal year",
  universal_month: "Universal month",
  universal_day: "Universal day",
};

function resolveNumerologyDate(value: Date | string): Date {
  const date = value instanceof Date ? new Date(value) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("A valid date is required for numerology timing facts.");
  }

  return date;
}

export function reduceNumerology(value: number): NumerologyNumber {
  let result = Math.abs(Math.trunc(value));

  while (result > 9) {
    result = String(result)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return (result === 0 ? 9 : result) as NumerologyNumber;
}

export function getUniversalNumerologyNumbers(
  value: Date | string,
): UniversalNumerologyNumbers {
  const date = resolveNumerologyDate(value);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const universalYear = reduceNumerology(year);
  const universalMonth = reduceNumerology(universalYear + month);

  return {
    universal_year: universalYear,
    universal_month: universalMonth,
    universal_day: reduceNumerology(universalYear + month + day),
  };
}

export function getNumerologyTimingFacts(
  value: Date | string,
  timezone = "UTC",
): NumerologyTimingFact[] {
  const date = resolveNumerologyDate(value);
  const dateIso = date.toISOString().slice(0, 10);
  const numbers = getUniversalNumerologyNumbers(date);

  return NUMEROLOGY_SCOPES.map((scope) => {
    const number = numbers[scope];

    return {
      id: `timing.numerology.${scope}.${number}.${dateIso}`,
      type: "numerology_date",
      key: `numerology.${scope}.${number}`,
      scope,
      label: `${SCOPE_LABELS[scope]} ${number}`,
      dateIso,
      exactIso: date.toISOString(),
      timezone,
      number,
      numerologyScope: scope,
      numerologyNumber: number,
      computedBy: "app_numerology",
      confidence: "computed",
      relatedSymbolicKeys: [`numerology_${number}`],
    };
  });
}
