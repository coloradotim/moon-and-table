import { loadLocalEnv } from "./env";

type StructuredJsonOptions = {
  prompt: string;
  schemaName: string;
  schema: unknown;
};

export async function callOpenAiForJson<T>({
  prompt,
  schemaName,
  schema,
}: StructuredJsonOptions): Promise<T> {
  loadLocalEnv();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required for this source-pipeline stage.");
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: schemaName,
          schema,
          strict: false,
        },
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI API request failed ${response.status}: ${body}`);
  }

  const json = await response.json() as {
    output_text?: string;
    output?: Array<{
      content?: Array<{ type?: string; text?: string }>;
    }>;
  };
  const text =
    json.output_text ??
    json.output?.flatMap((item) => item.content ?? [])
      .find((item) => item.type === "output_text" && item.text)?.text;

  if (!text) {
    throw new Error("OpenAI API response did not include output_text.");
  }

  return JSON.parse(text) as T;
}
