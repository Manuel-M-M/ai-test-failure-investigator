import type { InvestigationHistoryItem } from "../types/investigation";

const STORAGE_KEY = "ai-test-investigations";

export function getHistory(): InvestigationHistoryItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveToHistory(item: InvestigationHistoryItem) {
  const current = getHistory();

  const updated = [item, ...current].slice(0, 10); // max 10

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}