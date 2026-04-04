import OpenAI from "openai";
import type {
  InvestigationRequest,
  InvestigationResponse
} from "../types/investigation.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

export async function investigateFailure(
  input: InvestigationRequest
): Promise<InvestigationResponse> {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: buildPrompt(input)
  });

  const outputText = response.output_text;

  if (!outputText) {
    throw new Error("OpenAI returned an empty response");
  }

  return JSON.parse(outputText) as InvestigationResponse;
}