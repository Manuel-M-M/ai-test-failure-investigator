export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "720px",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            margin: "0 0 1rem",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.1
          }}
        >
          AI Test Failure Investigator
        </h1>

        <p
          style={{
            margin: 0,
            color: "#667085",
            fontSize: "1.05rem",
            lineHeight: 1.7
          }}
        >
          React frontend in progress. This will become the main product client.
        </p>
      </section>
    </main>
  );
}