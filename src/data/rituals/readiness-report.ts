import { RITUAL_STATUSES, type Ritual, type RitualStatus } from "./types";
import {
  validateRituals,
  type RitualValidationFinding,
} from "./validate-rituals";

export type RitualReadinessRecord = {
  id: string;
  status: RitualStatus;
  findable: boolean;
  directUseEligible: boolean;
  recommendationEligible: boolean;
  recommendable: boolean;
  missing: string[];
};

export type RitualReadinessReport = {
  total: number;
  byStatus: Record<RitualStatus, number>;
  availability: {
    findable: number;
    directUseEligible: number;
    recommendationEligible: number;
  };
  validation: {
    valid: boolean;
    findings: RitualValidationFinding[];
  };
  records: RitualReadinessRecord[];
};

function emptyStatusCounts(): Record<RitualStatus, number> {
  return Object.fromEntries(
    RITUAL_STATUSES.map((status) => [status, 0]),
  ) as Record<RitualStatus, number>;
}

function yesNo(value: boolean): "yes" | "no" {
  return value ? "yes" : "no";
}

export function createRitualReadinessReport(
  rituals: Ritual[],
): RitualReadinessReport {
  const byStatus = emptyStatusCounts();

  for (const ritual of rituals) {
    if (RITUAL_STATUSES.includes(ritual.status)) {
      byStatus[ritual.status] += 1;
    }
  }

  const records = rituals.map((ritual) => ({
    id: ritual.id,
    status: ritual.status,
    findable: ritual.availability.findable,
    directUseEligible: ritual.availability.directUseEligible,
    recommendationEligible: ritual.availability.recommendationEligible,
    recommendable: ritual.recommendationMetadata.eligibility.recommendable,
    missing: ritual.recommendationMetadata.eligibility.missing ?? [],
  }));

  return {
    total: rituals.length,
    byStatus,
    availability: {
      findable: records.filter((record) => record.findable).length,
      directUseEligible: records.filter((record) => record.directUseEligible)
        .length,
      recommendationEligible: records.filter(
        (record) => record.recommendationEligible,
      ).length,
    },
    validation: validateRituals(rituals),
    records,
  };
}

export function formatRitualReadinessReport(
  report: RitualReadinessReport,
): string {
  const lines = [
    "Ritual readiness report",
    "",
    `Total Rituals: ${report.total}`,
    "",
    "By status:",
    ...RITUAL_STATUSES.map(
      (status) => `- ${status}: ${report.byStatus[status]}`,
    ),
    "",
    "Availability:",
    `- findable: ${report.availability.findable}`,
    `- direct-use eligible: ${report.availability.directUseEligible}`,
    `- recommendation eligible: ${report.availability.recommendationEligible}`,
    "",
    "Validation:",
    `- valid: ${report.validation.valid}`,
    `- findings: ${report.validation.findings.length}`,
  ];

  if (report.validation.findings.length > 0) {
    lines.push(
      "",
      "Validation findings:",
      ...report.validation.findings.map(
        (finding) =>
          `- ${finding.ritualId} | ${finding.path} | ${finding.message}`,
      ),
    );
  }

  lines.push(
    "",
    "Records:",
    ...report.records.map((record) => {
      const missing =
        record.missing.length > 0 ? record.missing.join(", ") : "none";

      return [
        `- ${record.id}`,
        record.status,
        `findable ${yesNo(record.findable)}`,
        `direct-use ${yesNo(record.directUseEligible)}`,
        `recommendation ${yesNo(record.recommendationEligible)}`,
        `recommendable ${yesNo(record.recommendable)}`,
        `missing: ${missing}`,
      ].join(" | ");
    }),
  );

  return `${lines.join("\n")}\n`;
}
