import type { InvestigationResult as InvestigationResultType } from "../../types/investigation";
import "./InvestigationResult.css";

interface InvestigationResultProps {
  result: InvestigationResultType;
}

function buildFullInvestigationText(result: InvestigationResultType) {
  return `Likely root cause:
${result.rootCause}

Debugging steps:
${result.debuggingSteps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

Suggested fix:
${result.suggestedFix}

Improved test snippet:
${result.improvedTestSnippet}

Confidence:
${result.confidence}

Caveats:
${result.caveats.map((caveat) => `- ${caveat}`).join("\n")}`;
}

export default function InvestigationResult({
  result,
}: InvestigationResultProps) {
  async function copyToClipboard(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return (
    <section className="result-container">
      <div className="result-header">
        <div className="result-header-copy">
          <p className="eyebrow">Analysis complete</p>
          <h2>Investigation Result</h2>
        </div>

        <span className={`confidence-badge ${result.confidence}`}>
          Confidence: {result.confidence}
        </span>
      </div>

      <div className="result-section">
        <h3>Likely root cause</h3>
        <p>{result.rootCause}</p>
      </div>

      <div className="result-section">
        <h3>Debugging steps</h3>
        <ol>
          {result.debuggingSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="result-section">
        <div className="section-title-row">
          <h3>Suggested fix</h3>
          <button
            type="button"
            className="copy-button"
            onClick={() => copyToClipboard(result.suggestedFix)}
          >
            Copy
          </button>
        </div>
        <p>{result.suggestedFix}</p>
      </div>

      <div className="result-section">
        <div className="section-title-row">
          <h3>Improved test snippet</h3>
          <button
            type="button"
            className="copy-button"
            onClick={() => copyToClipboard(result.improvedTestSnippet)}
          >
            Copy
          </button>
        </div>
        <pre>{result.improvedTestSnippet}</pre>
      </div>

      <div className="result-section">
        <div className="section-title-row">
          <h3>Confidence / caveats</h3>
          <button
            type="button"
            className="copy-button"
            onClick={() => copyToClipboard(buildFullInvestigationText(result))}
          >
            Copy full result
          </button>
        </div>
        <ul>
          {result.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
