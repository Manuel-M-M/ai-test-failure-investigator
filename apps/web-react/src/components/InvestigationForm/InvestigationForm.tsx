import { useMemo, useState } from "react";
import type { Framework } from "../../types/investigation";
import "./InvestigationForm.css";

interface InvestigationFormProps {
  onSubmit: (payload: {
    errorLog: string;
    context?: string;
    framework: Framework;
  }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function InvestigationForm({
  onSubmit,
  loading,
  error,
}: InvestigationFormProps) {
  const [errorLog, setErrorLog] = useState("");
  const [context, setContext] = useState("");
  const [framework, setFramework] = useState<Framework>("playwright");

  const isDisabled = useMemo(() => {
    return !errorLog.trim() || loading;
  }, [errorLog, loading]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    await onSubmit({
      errorLog,
      context: context.trim() || undefined,
      framework,
    });
  }

  function fillSample() {
    setFramework("playwright");
    setErrorLog(`Timeout 5000ms exceeded.

waiting for selector ".submit-button"

Error: page.waitForSelector: Timeout 5000ms exceeded.
=========================== logs ===========================
waiting for selector ".submit-button"
===========================================================

  at tests/e2e/checkout.spec.ts:42:18

  40 | await page.goto('/checkout');
  41 | await page.fill('#email', 'test@example.com');
> 42 | await page.waitForSelector('.submit-button');
     |                  ^
  43 | await page.click('.submit-button');
  44 |
  45 | await expect(page.locator('.success')).toBeVisible();`);
    setContext(
      "The submit button is rendered only after fetching user data from an API. The test sometimes fails in CI but passes locally.",
    );
  }

  return (
    <section className="form-container">
      <h1>AI Test Failure Investigator</h1>

      <p className="subtitle">
        Paste a failing test log and get an AI-powered investigation with root
        cause, debugging steps, suggested fixes, and an improved test snippet.
      </p>

      <div className="actions-row">
        <button type="button" className="secondary-button" onClick={fillSample}>
          Use sample Playwright error
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="errorLog">Error / Stack Trace *</label>
          <textarea
            id="errorLog"
            value={errorLog}
            onChange={(event) => setErrorLog(event.target.value)}
            placeholder="Paste your test error, stack trace, or logs here..."
            rows={10}
          />
        </div>

        <div className="field">
          <label htmlFor="context">Context (optional)</label>
          <textarea
            id="context"
            value={context}
            onChange={(event) => setContext(event.target.value)}
            placeholder="What were you expecting? Any relevant details..."
            rows={3}
          />
        </div>

        <div className="field">
          <label htmlFor="framework">Framework</label>
          <select
            id="framework"
            value={framework}
            onChange={(event) => setFramework(event.target.value as Framework)}
          >
            <option value="vitest">Vitest</option>
            <option value="jest">Jest</option>
            <option value="playwright">Playwright</option>
            <option value="cypress">Cypress</option>
            <option value="generic">Generic</option>
          </select>
        </div>

        <button type="submit" className="primary-button" disabled={isDisabled}>
          {loading ? "Investigating..." : "Investigate failure"}
        </button>

        {error ? <p className="error-message">{error}</p> : null}
      </form>
    </section>
  );
}
