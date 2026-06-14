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
        lifecycleState: "reviewed",
        directUseEligible: true,
        recommendable: false,
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
});
