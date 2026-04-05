import type {
  InvestigationInput,
  InvestigationResult
} from "../types/investigation";

const STORAGE_KEY = "ai-investigations";
const MAX_INVESTIGATIONS = 5;

export interface StoredInvestigation {
  input: InvestigationInput;
  result: InvestigationResult;
  date: string;
}

export function getInvestigations(): StoredInvestigation[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as StoredInvestigation[];
  } catch {
    return [];
  }
}

export function saveInvestigation(entry: {
  input: InvestigationInput;
  result: InvestigationResult;
}) {
  const existing = getInvestigations();

  const updated: StoredInvestigation[] = [
    {
      ...entry,
      date: new Date().toISOString()
    },
    ...existing
  ].slice(0, MAX_INVESTIGATIONS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  window.dispatchEvent(new Event("investigations-updated"));
}