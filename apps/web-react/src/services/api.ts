import type {
  InvestigationInput,
  InvestigationResult
} from "../types/investigation";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3001";

export async function investigateFailure(
  payload: InvestigationInput
): Promise<InvestigationResult> {
  const response = await fetch(`${API_BASE_URL}/investigate`, {
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