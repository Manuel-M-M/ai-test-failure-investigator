import type {
  InvestigationRequest,
  InvestigationResponse
} from "../types/investigation.js";

function buildPrompt(input: InvestigationRequest): string {
  return `
You are a senior product engineer specialized in developer tooling, testing, and debugging.

Analyze the failing test information and return JSON only.

Return exactly this shape:
{
  "rootCause": "string",
  "debuggingSteps": ["string"],
  "suggestedFix": "string",
  "improvedTestSnippet": "string",
  "confidence": "high" | "medium" | "low",
  "caveats": ["string"]
}

Rules:
- Return valid JSON only.
- No markdown fences.
- Be practical and product-oriented.
- debuggingSteps must be short, actionable, and ordered.
- caveats should mention ambiguity, missing context, or assumptions when relevant.
- improvedTestSnippet should be realistic and aligned with the chosen framework.
- If the failure is ambiguous, say so clearly.

Framework: ${input.framework}
Context: ${input.context?.trim() || "No additional context provided"}

Failure log:
${input.errorLog}
`.trim();
}

interface ResponsesApiOutputText {
  type: "output_text";
  text: string;
}

interface ResponsesApiMessage {
  type: "message";
  content?: Array<ResponsesApiOutputText | { type: string; [key: string]: unknown }>;
}

interface ResponsesApiResponse {
  output?: Array<ResponsesApiMessage | { type: string; [key: string]: unknown }>;
}

function extractOutputText(data: ResponsesApiResponse): string | null {
  const output = data.output;

  if (!Array.isArray(output)) {
    return null;
  }

  for (const item of output) {
    if (item.type !== "message" || !Array.isArray(item.content)) {
      continue;
    }

    for (const contentItem of item.content) {
      if (contentItem.type === "output_text" && typeof contentItem.text === "string") {
        return contentItem.text;
      }
    }
  }

  return null;
}

export async function investigateFailure(
  input: InvestigationRequest
): Promise<InvestigationResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: buildPrompt(input),
      text: {
        format: {
          type: "text"
        }
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `OpenAI request failed with ${response.status}: ${errorBody}`
    );
  }

  const data = (await response.json()) as ResponsesApiResponse;
  const outputText = extractOutputText(data);

  if (!outputText) {
    throw new Error(`OpenAI returned no output_text. Raw response: ${JSON.stringify(data)}`);
  }

  return JSON.parse(outputText) as InvestigationResponse;
}