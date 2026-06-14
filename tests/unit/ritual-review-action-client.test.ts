import { describe, expect, it } from "vitest";

import { submitRitualReviewAction } from "../../src/data/rituals/review-action-client";

describe("Ritual review action client", () => {
  it("submits the Firebase token and review action payload", async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), init });

      return new Response(JSON.stringify({
        valid: true,
        reviewDecisionId: "review_1",
        auditEventId: "audit_1",
        ritualId: "ritual-1",
        versionId: "version-1",
        currentVersionId: "version-1",
        latestReviewDecisionId: "review_1",
        lifecycleState: "reviewed",
        findable: true,
        directUseEligible: true,
        recommendationEligible: false,
        recommendable: false,
        missingReadiness: ["manual_hold"],
        holdReasons: ["manual hold"],
      }), { status: 200 });
    }) as typeof fetch;

    const result = await submitRitualReviewAction({
      idToken: "token-1",
      fetchImpl,
      request: {
        ritualId: "ritual-1",
        versionId: "version-1",
        action: "hold_recommendation",
        reasons: ["manual hold"],
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        valid: true,
        reviewDecisionId: "review_1",
      }),
    );
    expect(calls[0].url).toBe("/api/ritual-review-action");
    expect(calls[0].init?.headers).toEqual(
      expect.objectContaining({
        Authorization: "Bearer token-1",
      }),
    );
    expect(calls[0].init?.credentials).toBe("same-origin");
    expect(calls[0].init?.body).toBe(JSON.stringify({
      ritualId: "ritual-1",
      versionId: "version-1",
      action: "hold_recommendation",
      reasons: ["manual hold"],
    }));
  });

  it("returns server validation findings for blocked actions", async () => {
    const fetchImpl = (async () =>
      new Response(JSON.stringify({
        valid: false,
        findings: [
          {
            path: "validationSnapshot",
            message: "A passing validation snapshot is required.",
            severity: "error",
          },
        ],
      }), { status: 400 })) as typeof fetch;

    await expect(submitRitualReviewAction({
      idToken: "token-1",
      fetchImpl,
      request: {
        ritualId: "ritual-1",
        versionId: "version-1",
        action: "promote_recommendation",
        reasons: [],
      },
    })).resolves.toEqual({
      valid: false,
      findings: [
        {
          path: "validationSnapshot",
          message: "A passing validation snapshot is required.",
          severity: "error",
        },
      ],
    });
  });

  it("surfaces Vercel deployment protection instead of a vague JSON error", async () => {
    const fetchImpl = (async () =>
      new Response("<title>Authentication Required</title>Vercel Authentication", {
        status: 401,
        headers: { "Content-Type": "text/html" },
      })) as typeof fetch;

    await expect(submitRitualReviewAction({
      idToken: "token-1",
      fetchImpl,
      request: {
        ritualId: "ritual-1",
        versionId: "version-1",
        action: "hold_recommendation",
        reasons: ["manual hold"],
      },
    })).resolves.toEqual({
      valid: false,
      findings: [
        {
          path: "reviewAction",
          message: "Review action API was blocked by Vercel deployment protection.",
          severity: "error",
        },
      ],
    });
  });

  it("surfaces missing API endpoints for Vite-only local dev", async () => {
    const fetchImpl = (async () =>
      new Response("<!doctype html><div id=\"app\"></div>", {
        status: 404,
        headers: { "Content-Type": "text/html" },
      })) as typeof fetch;

    await expect(submitRitualReviewAction({
      idToken: "token-1",
      fetchImpl,
      request: {
        ritualId: "ritual-1",
        versionId: "version-1",
        action: "hold_recommendation",
        reasons: ["manual hold"],
      },
    })).resolves.toEqual({
      valid: false,
      findings: [
        {
          path: "reviewAction",
          message: "Review action API endpoint was not found. Use a deployment or dev server that serves /api/ritual-review-action.",
          severity: "error",
        },
      ],
    });
  });

  it("surfaces network failures without throwing raw fetch errors", async () => {
    const fetchImpl = (async () => {
      throw new TypeError("Failed to fetch");
    }) as typeof fetch;

    await expect(submitRitualReviewAction({
      idToken: "token-1",
      fetchImpl,
      request: {
        ritualId: "ritual-1",
        versionId: "version-1",
        action: "hold_recommendation",
        reasons: ["manual hold"],
      },
    })).resolves.toEqual({
      valid: false,
      findings: [
        {
          path: "reviewAction",
          message: "Review action API could not be reached. Restart the dev server and refresh the page, then try again.",
          severity: "error",
        },
      ],
    });
  });
});
