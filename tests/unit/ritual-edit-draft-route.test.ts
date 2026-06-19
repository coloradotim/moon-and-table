import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

const firebaseAppMocks = vi.hoisted(() => ({
  applicationDefault: vi.fn(() => ({ credential: "applicationDefault" })),
  cert: vi.fn((value: object) => ({ credential: "cert", value })),
  getApps: vi.fn(() => []),
  initializeApp: vi.fn(),
}));

const firebaseAuthMocks = vi.hoisted(() => ({
  getAuth: vi.fn(() => ({
    verifyIdToken: vi.fn(),
  })),
}));

const firestoreMocks = vi.hoisted(() => ({
  getFirestore: vi.fn(),
}));

vi.mock("firebase-admin/app", () => firebaseAppMocks);
vi.mock("firebase-admin/auth", () => firebaseAuthMocks);
vi.mock("firebase-admin/firestore", () => firestoreMocks);

const { default: handler } = await import("../../api/ritual-edit-draft");

function createResponse() {
  let statusCode = 0;
  let body: unknown;
  const headers = new Map<string, string>();

  return {
    response: {
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(value: unknown) {
        body = value;
      },
      setHeader(name: string, value: string) {
        headers.set(name, value);
      },
    },
    get statusCode() {
      return statusCode;
    },
    get body() {
      return body;
    },
    get headers() {
      return headers;
    },
  };
}

describe("Ritual edit draft Vercel route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses deployable ESM specifiers in the serverless runtime import chain", () => {
    const runtimeFiles = [
      "api/ritual-edit-draft.ts",
      "src/data/rituals/ritual-edit-draft-apply.ts",
      "src/data/rituals/db-documents.ts",
      "src/data/rituals/ritual-edit-drafts.ts",
      "src/data/rituals/ritual-edit-draft-validation.ts",
      "src/data/rituals/validate-rituals.ts",
      "src/data/rituals/version-identity.ts",
    ];
    const extensionlessImports: string[] = [];

    for (const file of runtimeFiles) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      const importPattern =
        /import\s+(?!type\b)[\s\S]*?\sfrom\s+["'](\.{1,2}\/[^"']+)["']/g;

      for (const match of source.matchAll(importPattern)) {
        const importPath = match[1];

        if (!/\.[cm]?js$/.test(importPath)) {
          extensionlessImports.push(`${file}: ${importPath}`);
        }
      }
    }

    expect(extensionlessImports).toEqual([]);
  });

  it("rejects non-POST requests before starting Firebase", async () => {
    const response = createResponse();

    await handler({ method: "GET", headers: {}, body: undefined }, response.response);

    expect(response.statusCode).toBe(405);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.body).toEqual({
      valid: false,
      findings: [
        {
          path: "method",
          message: "Ritual edit drafts require POST.",
          severity: "error",
        },
      ],
    });
    expect(firebaseAppMocks.initializeApp).not.toHaveBeenCalled();
    expect(firebaseAuthMocks.getAuth).not.toHaveBeenCalled();
    expect(firestoreMocks.getFirestore).not.toHaveBeenCalled();
  });

  it("rejects unauthenticated POST requests before starting Firebase", async () => {
    const response = createResponse();

    await handler(
      {
        method: "POST",
        headers: {},
        body: {
          action: "load_or_create",
          ritualId: "candidate.example",
          versionId: "version.example",
        },
      },
      response.response,
    );

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      valid: false,
      findings: [
        {
          path: "authorization",
          message: "A Firebase ID token is required.",
          severity: "error",
        },
      ],
    });
    expect(firebaseAppMocks.initializeApp).not.toHaveBeenCalled();
    expect(firebaseAuthMocks.getAuth).not.toHaveBeenCalled();
    expect(firestoreMocks.getFirestore).not.toHaveBeenCalled();
  });
});
