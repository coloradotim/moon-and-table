import {
  RITUAL_AUDIENCES,
  RITUAL_CAPACITY_MODES,
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  RITUAL_STATUSES,
  RITUAL_TIMING_RELATIONSHIPS,
  type Ritual,
} from "./types";

export type RitualValidationFinding = {
  ritualId: string;
  path: string;
  message: string;
};

export type RitualValidationResult = {
  valid: boolean;
  findings: RitualValidationFinding[];
};

const REQUIRED_PRESENTATION_FIELDS = [
  "headline",
  "practice",
  "intention",
  "bestWindow",
  "whyThisFits",
  "questionToCarry",
] as const satisfies ReadonlyArray<keyof Ritual["presentation"]>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function includesValue<const T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

function addFinding(
  findings: RitualValidationFinding[],
  ritualId: string,
  path: string,
  message: string,
) {
  findings.push({ ritualId, path, message });
}

export function validateRitual(ritual: Ritual): RitualValidationResult {
  const findings: RitualValidationFinding[] = [];
  const ritualId = isNonEmptyString(ritual.id) ? ritual.id : "(missing id)";

  if (!isNonEmptyString(ritual.id)) {
    addFinding(findings, ritualId, "id", "Ritual id is required.");
  }

  if (!includesValue(RITUAL_STATUSES, ritual.status)) {
    addFinding(findings, ritualId, "status", "Ritual status is invalid.");
  }

  for (const field of REQUIRED_PRESENTATION_FIELDS) {
    if (!isNonEmptyString(ritual.presentation?.[field])) {
      addFinding(
        findings,
        ritualId,
        `presentation.${field}`,
        "Required presentation field is missing.",
      );
    }
  }

  const primaryPurpose = ritual.recommendationMetadata?.purposes?.primary;
  if (!includesValue(RITUAL_PURPOSES, primaryPurpose)) {
    addFinding(
      findings,
      ritualId,
      "recommendationMetadata.purposes.primary",
      "Primary purpose is invalid.",
    );
  }

  const primaryCarrier = ritual.recommendationMetadata?.carriers?.primary;
  if (!includesValue(RITUAL_CARRIERS, primaryCarrier)) {
    addFinding(
      findings,
      ritualId,
      "recommendationMetadata.carriers.primary",
      "Primary carrier is invalid.",
    );
  }

  const timingRelationship = ritual.recommendationMetadata?.timing?.relationship;
  if (!includesValue(RITUAL_TIMING_RELATIONSHIPS, timingRelationship)) {
    addFinding(
      findings,
      ritualId,
      "recommendationMetadata.timing.relationship",
      "Timing relationship is invalid.",
    );
  }

  for (const [index, capacity] of (
    ritual.recommendationMetadata?.capacity?.supports ?? []
  ).entries()) {
    if (!includesValue(RITUAL_CAPACITY_MODES, capacity)) {
      addFinding(
        findings,
        ritualId,
        `recommendationMetadata.capacity.supports.${index}`,
        "Capacity support value is invalid.",
      );
    }
  }

  for (const [index, audience] of (
    ritual.recommendationMetadata?.audience?.supports ?? []
  ).entries()) {
    if (!includesValue(RITUAL_AUDIENCES, audience)) {
      addFinding(
        findings,
        ritualId,
        `recommendationMetadata.audience.supports.${index}`,
        "Audience support value is invalid.",
      );
    }
  }

  if (
    ritual.status === "pilot" &&
    ritual.availability?.recommendationEligible === true
  ) {
    addFinding(
      findings,
      ritualId,
      "availability.recommendationEligible",
      "Pilot Rituals must not be recommendation eligible.",
    );
  }

  if (
    ritual.status === "pilot" &&
    ritual.recommendationMetadata?.eligibility?.recommendable === true
  ) {
    addFinding(
      findings,
      ritualId,
      "recommendationMetadata.eligibility.recommendable",
      "Pilot Rituals must not be recommendable.",
    );
  }

  if (
    ritual.availability?.recommendationEligible === true &&
    ritual.status !== "recommendable"
  ) {
    addFinding(
      findings,
      ritualId,
      "availability.recommendationEligible",
      "Recommendation-eligible Rituals must have recommendable status.",
    );
  }

  if (
    ritual.recommendationMetadata?.eligibility?.recommendable === true &&
    ritual.status !== "recommendable"
  ) {
    addFinding(
      findings,
      ritualId,
      "recommendationMetadata.eligibility.recommendable",
      "Recommendable Rituals must have recommendable status.",
    );
  }

  if (
    ritual.availability?.recommendationEligible ||
    ritual.recommendationMetadata?.eligibility?.recommendable
  ) {
    if (!ritual.recommendationMetadata) {
      addFinding(
        findings,
        ritualId,
        "recommendationMetadata",
        "Recommendation-eligible records require recommendation metadata.",
      );
    }

    if ((ritual.recommendationMetadata?.capacity?.supports.length ?? 0) === 0) {
      addFinding(
        findings,
        ritualId,
        "recommendationMetadata.capacity.supports",
        "Recommendation-eligible records require capacity support metadata.",
      );
    }

    if ((ritual.recommendationMetadata?.audience?.supports.length ?? 0) === 0) {
      addFinding(
        findings,
        ritualId,
        "recommendationMetadata.audience.supports",
        "Recommendation-eligible records require audience support metadata.",
      );
    }
  }

  if (ritual.origin?.type === "source") {
    if ((ritual.origin.sourceGrounding?.length ?? 0) === 0) {
      addFinding(
        findings,
        ritualId,
        "origin.sourceGrounding",
        "Source-origin Rituals require local source grounding.",
      );
    }
  } else if (ritual.origin?.type === "household") {
    if (!isNonEmptyString(ritual.origin.householdContext)) {
      addFinding(
        findings,
        ritualId,
        "origin.householdContext",
        "Household-origin Rituals require household context.",
      );
    }
  } else {
    addFinding(
      findings,
      ritualId,
      "origin.type",
      "Ritual origin type is invalid.",
    );
  }

  return {
    valid: findings.length === 0,
    findings,
  };
}

export function validateRituals(rituals: Ritual[]): RitualValidationResult {
  const findings = rituals.flatMap((ritual) => validateRitual(ritual).findings);
  const seenIds = new Set<string>();

  for (const ritual of rituals) {
    if (!isNonEmptyString(ritual.id)) {
      continue;
    }

    if (seenIds.has(ritual.id)) {
      addFinding(findings, ritual.id, "id", "Duplicate Ritual id.");
    }

    seenIds.add(ritual.id);
  }

  return {
    valid: findings.length === 0,
    findings,
  };
}
