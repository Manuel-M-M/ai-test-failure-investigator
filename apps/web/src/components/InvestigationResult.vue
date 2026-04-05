<script setup lang="ts">
import { computed } from "vue";
import type { InvestigationResult } from "../types/investigation";

const props = defineProps<{
  result: InvestigationResult;
}>();

const confidenceClass = computed(() => {
  return {
    high: props.result.confidence === "high",
    medium: props.result.confidence === "medium",
    low: props.result.confidence === "low"
  };
});

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}
</script>

<template>
  <section class="result-container">
    <div class="result-header">
      <div>
        <p class="eyebrow">Analysis complete</p>
        <h2>Investigation Result</h2>
      </div>

      <span class="confidence-badge" :class="confidenceClass">
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
      <div class="section-title-row">
        <h3>Suggested fix</h3>
        <button class="copy-button" @click="copyToClipboard(result.suggestedFix)">
          Copy
        </button>
      </div>
      <p>{{ result.suggestedFix }}</p>
    </div>

    <div class="result-section">
      <div class="section-title-row">
        <h3>Improved test snippet</h3>
        <button
          class="copy-button"
          @click="copyToClipboard(result.improvedTestSnippet)"
        >
          Copy
        </button>
      </div>
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
  border: 1px solid #e4e7ec;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #667085;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.result-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.confidence-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
  border: 1px solid transparent;
}

.confidence-badge.high {
  background: #ecfdf3;
  color: #027a48;
  border-color: #abefc6;
}

.confidence-badge.medium {
  background: #fffaeb;
  color: #b54708;
  border-color: #fedf89;
}

.confidence-badge.low {
  background: #fef3f2;
  color: #b42318;
  border-color: #fecdca;
}

.result-section + .result-section {
  margin-top: 1.75rem;
}

.result-section {
  text-align: left;
}

.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.6rem;
}

.result-section h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  text-align: left;
}

.result-section p,
.result-section li {
  color: #344054;
  line-height: 1.7;
  text-align: left;
}

.result-section p {
  margin: 0;
}

.result-section ol,
.result-section ul {
  margin: 0;
  padding-left: 1.25rem;
  text-align: left;
}

.result-section li + li {
  margin-top: 0.45rem;
}

.copy-button {
  border: 1px solid #d0d5dd;
  background: #ffffff;
  color: #344054;
  border-radius: 8px;
  padding: 0.45rem 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;
  flex-shrink: 0;
}

.copy-button:hover {
  background: #f9fafb;
}

pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 12px;
  background: #101828;
  color: #f8fafc;
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-wrap;
  text-align: left;
}

@media (max-width: 640px) {
  .result-header {
    flex-direction: column;
  }

  .section-title-row {
    flex-direction: row;
    align-items: center;
  }
}
</style>