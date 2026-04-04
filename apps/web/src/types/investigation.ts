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