import { useState } from "react";
import { EmptyState } from "./components/EmptyState/EmptyState";
import { InvestigationForm } from "./components/InvestigationForm/InvestigationForm";
import { InvestigationResult } from "./components/InvestigationResult/InvestigationResult";
import { LoadingState } from "./components/LoadingState/LoadingState";
import { investigateFailure } from "./services/api";
import type {
  InvestigationInput,
  InvestigationResult as InvestigationResultType
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
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while investigating the failure"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <InvestigationForm
        onSubmit={handleInvestigation}
        loading={loading}
        error={error}
      />

      {loading ? <LoadingState /> : null}

      {!loading && !result && !hasSubmitted ? <EmptyState /> : null}

      {!loading && result ? <InvestigationResult result={result} /> : null}
    </div>
  );
}