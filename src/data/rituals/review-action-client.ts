import type {
  RitualReviewActionBoundaryResult,
  RitualReviewActionRequest,
} from "./db-review-action-boundary";
import type {
  RitualDbLifecycleState,
  RitualDbValidationFinding,
} from "./db-documents";

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
    currentVersionId: string;
    publishedVersionId?: string;
    latestReviewDecisionId: string;
    lifecycleState: RitualDbLifecycleState;
    findable: boolean;
    directUseEligible: boolean;
    recommendationEligible: boolean;
    recommendable: boolean;
    missingReadiness: string[];
    holdReasons: string[];
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
    typeof payload.currentVersionId === "string" &&
    (payload.publishedVersionId === undefined ||
      typeof payload.publishedVersionId === "string") &&
    typeof payload.latestReviewDecisionId === "string" &&
    typeof payload.lifecycleState === "string" &&
    typeof payload.findable === "boolean" &&
    typeof payload.directUseEligible === "boolean" &&
    typeof payload.recommendationEligible === "boolean" &&
    typeof payload.recommendable === "boolean" &&
    Array.isArray(payload.missingReadiness) &&
    Array.isArray(payload.holdReasons)
  ) {
    return payload as SubmitRitualReviewActionResult;
  }

  return {
    valid: false,
    findings: [fallbackFinding("Review action response was incomplete.")],
  };
}

function parseJsonResponseText(text: string): unknown {
  if (text.trim().length === 0) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

function createNonJsonFinding(input: {
  response: Response;
  text: string;
}): RitualDbValidationFinding {
  const normalizedText = input.text.toLowerCase();

  if (
    normalizedText.includes("authentication required") ||
    normalizedText.includes("vercel authentication")
  ) {
    return fallbackFinding(
      "Review action API was blocked by Vercel deployment protection.",
    );
  }

  if (input.response.status === 404) {
    return fallbackFinding(
      "Review action API endpoint was not found. Use a deployment or dev server that serves /api/ritual-review-action.",
    );
  }

  return fallbackFinding(
    `Review action API returned a non-JSON response (${input.response.status}).`,
  );
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
    currentVersionId: after.currentVersionId,
    publishedVersionId: after.publishedVersionId,
    latestReviewDecisionId: result.plan.reviewDecisionDocument.id,
    lifecycleState: after.lifecycle.state,
    findable: after.lifecycle.findable,
    directUseEligible: after.lifecycle.directUseEligible,
    recommendationEligible: after.lifecycle.recommendationEligible,
    recommendable: after.lifecycle.recommendable,
    missingReadiness: [...after.lifecycle.missingReadiness],
    holdReasons: [...after.lifecycle.holdReasons],
  };
}

export async function submitRitualReviewAction(
  input: SubmitRitualReviewActionInput,
): Promise<SubmitRitualReviewActionResult> {
  let response: Response;

  try {
    response = await (input.fetchImpl ?? fetch)(input.endpoint ?? "/api/ritual-review-action", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${input.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input.request),
    });
  } catch {
    return {
      valid: false,
      findings: [
        fallbackFinding(
          "Review action API could not be reached. Restart the dev server and refresh the page, then try again.",
        ),
      ],
    };
  }

  const responseText = await response.text();
  const payload = parseJsonResponseText(responseText);
  if (payload === undefined) {
    return {
      valid: false,
      findings: [createNonJsonFinding({ response, text: responseText })],
    };
  }
  const parsed = parseClientResult(payload);

  if (!response.ok && parsed.valid) {
    return {
      valid: false,
      findings: [fallbackFinding("Review action request failed.")],
    };
  }

  return parsed;
}
