import type { RitualDbValidationFinding } from "./db-documents";
import type {
  RitualEditDraftBuffer,
  RitualEditDraftDocument,
} from "./ritual-edit-drafts";

export type RitualEditDraftClientAction =
  | {
      action: "load_or_create";
      ritualId: string;
      versionId: string;
    }
  | {
      action: "create_blank";
      ritualId: string;
    }
  | {
      action: "autosave" | "save";
      draftId: string;
      draftBuffer: RitualEditDraftBuffer;
    }
  | {
      action: "apply_changes";
      draftId: string;
    }
  | {
      action: "add_to_library";
      draftId: string;
    };

export type SubmitRitualEditDraftResult =
  | {
      valid: true;
      draft: RitualEditDraftDocument;
      appliedVersionId?: string;
      recommendationHeld?: boolean;
      addedToLibrary?: boolean;
    }
  | {
      valid: false;
      findings: RitualDbValidationFinding[];
    };

export type SubmitRitualEditDraftInput = {
  request: RitualEditDraftClientAction;
  idToken: string;
  endpoint?: string;
  fetchImpl?: typeof fetch;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function fallbackFinding(message: string): RitualDbValidationFinding {
  return { path: "ritualEditDraft", message, severity: "error" };
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

function parseClientResult(payload: unknown): SubmitRitualEditDraftResult {
  if (!isObject(payload)) {
    return {
      valid: false,
      findings: [fallbackFinding("Ritual edit draft response was not valid JSON.")],
    };
  }

  if (payload.valid === false && Array.isArray(payload.findings)) {
    return {
      valid: false,
      findings: payload.findings as RitualDbValidationFinding[],
    };
  }

  if (payload.valid === true && isObject(payload.draft)) {
    return {
      valid: true,
      draft: payload.draft as RitualEditDraftDocument,
      appliedVersionId: typeof payload.appliedVersionId === "string"
        ? payload.appliedVersionId
        : undefined,
      recommendationHeld: typeof payload.recommendationHeld === "boolean"
        ? payload.recommendationHeld
        : undefined,
      addedToLibrary: typeof payload.addedToLibrary === "boolean"
        ? payload.addedToLibrary
        : undefined,
    };
  }

  return {
    valid: false,
    findings: [fallbackFinding("Ritual edit draft response was incomplete.")],
  };
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
      "Ritual edit draft API was blocked by Vercel deployment protection.",
    );
  }

  if (input.response.status === 404) {
    return fallbackFinding(
      "Ritual edit draft API endpoint was not found. Use a deployment or dev server that serves /api/ritual-edit-draft.",
    );
  }

  return fallbackFinding(
    `Ritual edit draft API returned a non-JSON response (${input.response.status}).`,
  );
}

export async function submitRitualEditDraft(
  input: SubmitRitualEditDraftInput,
): Promise<SubmitRitualEditDraftResult> {
  let response: Response;

  try {
    response = await (input.fetchImpl ?? fetch)(input.endpoint ?? "/api/ritual-edit-draft", {
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
          "Ritual edit draft API could not be reached. Restart the dev server and refresh the page, then try again.",
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
      findings: [fallbackFinding("Ritual edit draft request failed.")],
    };
  }

  return parsed;
}
