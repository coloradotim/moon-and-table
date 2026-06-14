import type {
  RitualReviewActionBoundaryResult,
  RitualReviewActionRequest,
} from "./db-review-action-boundary";
import type { RitualDbValidationFinding } from "./db-documents";

export type SubmitRitualReviewActionInput = {
  request: RitualReviewActionRequest;
  idToken: string;
  endpoint?: string;
  fetchImpl?: typeof fetch;
};

export type SubmitRitualReviewActionResult =
  | {
    valid: true;
    reviewDecisionId: string;
    auditEventId: string;
    ritualId: string;
    versionId: string;
    lifecycleState: string;
    directUseEligible: boolean;
    recommendable: boolean;
  }
  | {
    valid: false;
    findings: RitualDbValidationFinding[];
  };

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function fallbackFinding(message: string): RitualDbValidationFinding {
  return { path: "reviewAction", message, severity: "error" };
}

function parseClientResult(payload: unknown): SubmitRitualReviewActionResult {
  if (!isObject(payload)) {
    return {
      valid: false,
      findings: [fallbackFinding("Review action response was not valid JSON.")],
    };
  }

  if (payload.valid === false && Array.isArray(payload.findings)) {
    return {
      valid: false,
      findings: payload.findings as RitualDbValidationFinding[],
    };
  }

  if (
    payload.valid === true &&
    typeof payload.reviewDecisionId === "string" &&
    typeof payload.auditEventId === "string" &&
    typeof payload.ritualId === "string" &&
    typeof payload.versionId === "string" &&
    typeof payload.lifecycleState === "string" &&
    typeof payload.directUseEligible === "boolean" &&
    typeof payload.recommendable === "boolean"
  ) {
    return payload as SubmitRitualReviewActionResult;
  }

  return {
    valid: false,
    findings: [fallbackFinding("Review action response was incomplete.")],
  };
}

export function summarizeReviewActionResult(
  result: RitualReviewActionBoundaryResult,
): SubmitRitualReviewActionResult {
  if (!result.valid) {
    return result;
  }

  const after = result.plan.ritualDocumentAfter;

  return {
    valid: true,
    reviewDecisionId: result.plan.reviewDecisionDocument.id,
    auditEventId: result.plan.auditEventDocument.id,
    ritualId: after.id,
    versionId: result.plan.reviewDecisionDocument.versionId,
    lifecycleState: after.lifecycle.state,
    directUseEligible: after.lifecycle.directUseEligible,
    recommendable: after.lifecycle.recommendable,
  };
}

export async function submitRitualReviewAction(
  input: SubmitRitualReviewActionInput,
): Promise<SubmitRitualReviewActionResult> {
  const response = await (input.fetchImpl ?? fetch)(input.endpoint ?? "/api/ritual-review-action", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input.request),
  });
  const payload = await response.json().catch(() => undefined);
  const parsed = parseClientResult(payload);

  if (!response.ok && parsed.valid) {
    return {
      valid: false,
      findings: [fallbackFinding("Review action request failed.")],
    };
  }

  return parsed;
}
