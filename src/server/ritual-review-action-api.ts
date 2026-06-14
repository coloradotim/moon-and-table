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
  const result = await applyRitualReviewAction({
    request: request.body as RitualReviewActionRequest,
    caller,
    store: dependencies.store,
    authorize: dependencies.authorize,
    createdAtIso: dependencies.now?.() ?? new Date().toISOString(),
  });
  const body = summarizeReviewActionResult(result);

  send(response, body.valid ? 200 : 400, body);
}
