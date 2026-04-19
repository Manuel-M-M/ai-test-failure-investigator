import { useState } from "react";
import {
  EmptyState,
  InvestigationForm,
  InvestigationResult,
  LoadingState,
  RecentInvestigations,
} from "./components";
import { investigateFailure } from "./services/api";
import { saveToHistory } from "./services/history";
import type {
  InvestigationInput,
  InvestigationResult as InvestigationResultType,
} from "./types/investigation";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestigationResultType | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  async function handleInvestigation(payload: InvestigationInput) {
    setHasSubmitted(true);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const investigation = await investigateFailure(payload);
      setResult(investigation);

      saveToHistory({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        input: payload,
        result: investigation,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while investigating the failure",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSelectHistory(item: any) {
    setResult(item.result);
    setHasSubmitted(true);
    setError(null);
  }

  return (
    <div className="page">
      <InvestigationForm
        onSubmit={handleInvestigation}
        loading={loading}
        error={error}
      />

      <RecentInvestigations onSelect={handleSelectHistory} />

      {loading ? <LoadingState /> : null}

      {!loading && !result && !hasSubmitted ? <EmptyState /> : null}

      {!loading && result ? <InvestigationResult result={result} /> : null}
    </div>
  );
}
