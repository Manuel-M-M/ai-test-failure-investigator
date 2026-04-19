import { useState } from "react";
import { EmptyState } from "./components/EmptyState";
import { InvestigationForm } from "./components/InvestigationForm";
import { LoadingState } from "./components/LoadingState";
import { investigateFailure } from "./services/api";
import type {
  InvestigationInput,
  InvestigationResult
} from "./types/investigation";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestigationResult | null>(null);
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

      {!loading && result ? (
        <section className="result-placeholder">
          <h2>Investigation received</h2>
          <p>
            The React client is now connected to the backend. Next step: render
            the structured investigation result.
          </p>
        </section>
      ) : null}
    </div>
  );
}