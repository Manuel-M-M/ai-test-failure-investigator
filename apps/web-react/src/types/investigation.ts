export type Framework =
  | "vitest"
  | "jest"
  | "playwright"
  | "cypress"
  | "generic";

export interface InvestigationInput {
  errorLog: string;
  context?: string;
  framework: Framework;
}

export type ConfidenceLevel = "high" | "medium" | "low";

export interface InvestigationResult {
  rootCause: string;
  debuggingSteps: string[];
  suggestedFix: string;
  improvedTestSnippet: string;
  confidence: ConfidenceLevel;
  caveats: string[];
}