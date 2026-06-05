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

type LocalDateParts = {
  year: number;
  month: number;
  day: number;
};

const LOCAL_DATE_PART_FORMATTERS = new Map<string, Intl.DateTimeFormat>();

function resolveNumerologyDate(value: Date | string): Date {
  const date = value instanceof Date ? new Date(value) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("A valid date is required for numerology timing facts.");
  }

  return date;
}

function getDefaultNumerologyTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
}

function getLocalDatePartFormatter(timezone: string): Intl.DateTimeFormat {
  const existing = LOCAL_DATE_PART_FORMATTERS.get(timezone);

  if (existing) {
    return existing;
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    calendar: "gregory",
    numberingSystem: "latn",
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  LOCAL_DATE_PART_FORMATTERS.set(timezone, formatter);

  return formatter;
}

function getLocalDateParts(date: Date, timezone: string): LocalDateParts {
  const parts = getLocalDatePartFormatter(timezone).formatToParts(date);
  const valueByType = new Map(parts.map((part) => [part.type, part.value]));
  const year = Number(valueByType.get("year"));
  const month = Number(valueByType.get("month"));
  const day = Number(valueByType.get("day"));

  if (!year || !month || !day) {
    throw new Error(`Unable to resolve numerology date parts for timezone ${timezone}.`);
  }

  return { year, month, day };
}

function formatDateIso({ year, month, day }: LocalDateParts): string {
  return [
    year,
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
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
  timezone = getDefaultNumerologyTimezone(),
): UniversalNumerologyNumbers {
  const date = resolveNumerologyDate(value);
  const { year, month, day } = getLocalDateParts(date, timezone);
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
  timezone = getDefaultNumerologyTimezone(),
): NumerologyTimingFact[] {
  const date = resolveNumerologyDate(value);
  const dateIso = formatDateIso(getLocalDateParts(date, timezone));
  const numbers = getUniversalNumerologyNumbers(date, timezone);

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
