import {
  applyRitualReviewAction,
  type RitualReviewActionAuthorizer,
  type RitualReviewActionCaller,
  type RitualReviewActionStore,
} from "../data/rituals/db-review-action-boundary";
import type { RitualReviewActionRequest } from "../data/rituals/db-review-action-boundary";
import type { RitualDbValidationFinding } from "../data/rituals/db-documents";
import {
  summarizeReviewActionResult,
  type SubmitRitualReviewActionResult,
} from "../data/rituals/review-action-client";

export type RitualReviewActionApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

export type RitualReviewActionApiResponse = {
  status: (code: number) => RitualReviewActionApiResponse;
  json: (body: SubmitRitualReviewActionResult) => void;
  setHeader?: (name: string, value: string) => void;
};

export type VerifiedRitualReviewCaller = {
  uid: string;
  email?: string;
};

export type RitualReviewActionApiDependencies = {
  verifyIdToken: (idToken: string) => Promise<VerifiedRitualReviewCaller>;
  store: RitualReviewActionStore;
  authorize: RitualReviewActionAuthorizer;
  now?: () => string;
};

function finding(path: string, message: string): RitualDbValidationFinding {
  return { path, message, severity: "error" };
}

function getHeader(
  headers: RitualReviewActionApiRequest["headers"],
  name: string,
): string | undefined {
  const value = headers?.[name] ?? headers?.[name.toLowerCase()];

  return Array.isArray(value) ? value[0] : value;
}

function getBearerToken(headers: RitualReviewActionApiRequest["headers"]): string | undefined {
  const authorization = getHeader(headers, "authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);

  return match?.[1];
}

function send(
  response: RitualReviewActionApiResponse,
  status: number,
  body: SubmitRitualReviewActionResult,
): void {
  response.status(status).json(body);
}

function invalid(
  path: string,
  message: string,
  status = 400,
): { status: number; body: SubmitRitualReviewActionResult } {
  return {
    status,
    body: {
      valid: false,
      findings: [finding(path, message)],
    },
  };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isQuotaExceededError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  const code = (error as { code?: unknown } | undefined)?.code;

  return code === 8 ||
    code === "resource-exhausted" ||
    code === "RESOURCE_EXHAUSTED" ||
    message.includes("resource_exhausted") ||
    message.includes("quota exceeded");
}

function getErrorCode(error: unknown): string {
  const code = (error as { code?: unknown } | undefined)?.code;

  return typeof code === "string" || typeof code === "number" ? String(code) : "";
}

function isPermissionDeniedError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  const code = getErrorCode(error).toLowerCase();

  return code === "7" ||
    code === "permission-denied" ||
    code === "permission_denied" ||
    message.includes("permission_denied") ||
    message.includes("permission denied") ||
    message.includes("missing or insufficient permissions");
}

function isAlreadyExistsError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  const code = getErrorCode(error).toLowerCase();

  return code === "6" ||
    code === "already-exists" ||
    code === "already_exists" ||
    message.includes("already_exists") ||
    message.includes("already exists");
}

function isInvalidArgumentError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  const code = getErrorCode(error).toLowerCase();

  return code === "3" ||
    code === "invalid-argument" ||
    code === "invalid_argument" ||
    message.includes("invalid_argument") ||
    message.includes("invalid argument") ||
    message.includes("cannot use undefined");
}

function createUnexpectedApiError(error: unknown): {
  status: number;
  body: SubmitRitualReviewActionResult;
} {
  if (isQuotaExceededError(error)) {
    return invalid(
      "firestore",
      "Firestore quota was exceeded, so the review decision was not recorded. Wait for quota to reset or check the Firebase quota page before trying again.",
      429,
    );
  }

  if (isPermissionDeniedError(error)) {
    return invalid(
      "firestore",
      "Firestore denied the review-action write. Check the server credentials for Ritual review actions.",
      403,
    );
  }

  if (isAlreadyExistsError(error)) {
    return invalid(
      "reviewAction",
      "That review decision was already recorded. Refresh Manage Rituals before trying another action.",
      409,
    );
  }

  if (isInvalidArgumentError(error)) {
    return invalid(
      "reviewAction",
      "Review action write payload was rejected by Firestore. Refresh and try again; if it repeats, the write payload needs a code fix.",
      400,
    );
  }

  return invalid(
    "reviewAction",
    "Review decision was not recorded because the review action service failed.",
    500,
  );
}

export async function handleRitualReviewActionApi(
  request: RitualReviewActionApiRequest,
  response: RitualReviewActionApiResponse,
  dependencies: RitualReviewActionApiDependencies,
): Promise<void> {
  response.setHeader?.("Cache-Control", "no-store");

  if (request.method !== "POST") {
    const result = invalid("method", "Review actions require POST.", 405);

    send(response, result.status, result.body);
    return;
  }

  const idToken = getBearerToken(request.headers);
  if (!idToken) {
    const result = invalid("authorization", "A Firebase ID token is required.", 401);

    send(response, result.status, result.body);
    return;
  }

  let verifiedCaller: VerifiedRitualReviewCaller;

  try {
    verifiedCaller = await dependencies.verifyIdToken(idToken);
  } catch {
    const result = invalid("authorization", "Firebase ID token could not be verified.", 401);

    send(response, result.status, result.body);
    return;
  }

  const caller: RitualReviewActionCaller = {
    uid: verifiedCaller.uid,
    email: verifiedCaller.email,
    reviewer: "owner",
  };

  try {
    const result = await applyRitualReviewAction({
      request: request.body as RitualReviewActionRequest,
      caller,
      store: dependencies.store,
      authorize: dependencies.authorize,
      createdAtIso: dependencies.now?.() ?? new Date().toISOString(),
    });
    const body = summarizeReviewActionResult(result);

    send(response, body.valid ? 200 : 400, body);
  } catch (error) {
    console.error("[ritual-review-action] failed", error);
    const result = createUnexpectedApiError(error);

    send(response, result.status, result.body);
  }
}
