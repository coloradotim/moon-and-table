import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, loadEnv, type Plugin } from "vite";

import editDraftHandler from "./api/ritual-edit-draft";
import reviewActionHandler from "./api/ritual-review-action";

function loadServerEnv(mode: string): void {
  const env = loadEnv(mode, process.cwd(), "");

  for (const [key, value] of Object.entries(env)) {
    process.env[key] ??= value;
  }
}

function normalizeHeaders(
  headers: IncomingMessage["headers"],
): Record<string, string | string[] | undefined> {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key,
      typeof value === "number" ? String(value) : value,
    ]),
  );
}

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const body = Buffer.concat(chunks).toString("utf8").trim();

  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return undefined;
  }
}

function createJsonResponse(response: ServerResponse) {
  return {
    setHeader(name: string, value: string) {
      response.setHeader(name, value);
    },
    status(code: number) {
      response.statusCode = code;
      return this;
    },
    json(body: unknown) {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(body));
    },
  };
}

function localApiPlugin(): Plugin {
  return {
    name: "moon-table-local-api",
    configureServer(server) {
      server.middlewares.use("/api/ritual-review-action", async (request, response) => {
        try {
          await reviewActionHandler(
            {
              method: request.method,
              headers: normalizeHeaders(request.headers),
              body: await readJsonBody(request),
            },
            createJsonResponse(response),
          );
        } catch (error) {
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({
            valid: false,
            findings: [
              {
                path: "reviewAction",
                message: error instanceof Error
                  ? error.message
                  : "Review action API failed.",
                severity: "error",
              },
            ],
          }));
        }
      });

      server.middlewares.use("/api/ritual-edit-draft", async (request, response) => {
        try {
          await editDraftHandler(
            {
              method: request.method,
              headers: normalizeHeaders(request.headers),
              body: await readJsonBody(request),
            },
            createJsonResponse(response),
          );
        } catch (error) {
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({
            valid: false,
            findings: [
              {
                path: "ritualEditDraft",
                message: error instanceof Error
                  ? error.message
                  : "Ritual edit draft API failed.",
                severity: "error",
              },
            ],
          }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  loadServerEnv(mode);

  return {
    plugins: [localApiPlugin()],
  };
});
