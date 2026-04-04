export type ConfidenceLevel = "high" | "medium" | "low";

export type Framework =
  | "vitest"
  | "jest"
  | "playwright"
  | "cypress"
  | "generic";

export interface InvestigationRequest {
  errorLog: string;
  context?: string;
  framework: Framework;
}

export interface InvestigationResponse {
  rootCause: string;
  debuggingSteps: string[];
  suggestedFix: string;
  improvedTestSnippet: string;
  confidence: ConfidenceLevel;
  caveats: string[];
}