export function LoadingState() {
  return (
    <section className="loading-state">
      <div className="spinner" />
      <div>
        <h2>Investigating failure...</h2>
        <p>Analyzing the log, likely root cause, and suggested fix.</p>
      </div>
    </section>
  );
}