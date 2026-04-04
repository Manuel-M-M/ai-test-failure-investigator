<script setup lang="ts">
import type { InvestigationResult } from "../types/investigation";

defineProps<{
  result: InvestigationResult;
}>();
</script>

<template>
  <section class="result-container">
    <div class="result-header">
      <h2>Investigation Result</h2>
      <span class="confidence-badge">
        Confidence: {{ result.confidence }}
      </span>
    </div>

    <div class="result-section">
      <h3>Likely root cause</h3>
      <p>{{ result.rootCause }}</p>
    </div>

    <div class="result-section">
      <h3>Debugging steps</h3>
      <ol>
        <li v-for="step in result.debuggingSteps" :key="step">
          {{ step }}
        </li>
      </ol>
    </div>

    <div class="result-section">
      <h3>Suggested fix</h3>
      <p>{{ result.suggestedFix }}</p>
    </div>

    <div class="result-section">
      <h3>Improved test snippet</h3>
      <pre>{{ result.improvedTestSnippet }}</pre>
    </div>

    <div class="result-section">
      <h3>Confidence / caveats</h3>
      <ul>
        <li v-for="caveat in result.caveats" :key="caveat">
          {{ caveat }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.result-container {
  max-width: 720px;
  margin: 2rem auto 0;
  padding: 1.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  background: #fafafa;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.result-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.confidence-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.result-section + .result-section {
  margin-top: 1.5rem;
}

.result-section h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.result-section p,
.result-section li {
  color: #333;
  line-height: 1.6;
}

.result-section ol,
.result-section ul {
  margin: 0;
  padding-left: 1.25rem;
}

pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 8px;
  background: #111;
  color: #f5f5f5;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>