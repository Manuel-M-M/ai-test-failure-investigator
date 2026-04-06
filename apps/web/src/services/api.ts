import type {
  InvestigationInput,
  InvestigationResult
} from "../types/investigation";

const API_URL = import.meta.env.VITE_API_URL;

export async function getHealth() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Failed to fetch health");
  }

  return response.json();
}

export async function investigateFailure(
  payload: InvestigationInput
): Promise<InvestigationResult> {
  const response = await fetch(`${API_URL}/investigate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.error || "Failed to investigate test failure"
    );
  }

  return response.json() as Promise<InvestigationResult>;
}