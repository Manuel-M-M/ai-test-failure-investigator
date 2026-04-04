<script setup lang="ts">
import { computed, ref } from "vue";
import { investigateFailure } from "../services/api";
import type {
  Framework,
  InvestigationResult
} from "../types/investigation";
import InvestigationResultView from "./InvestigationResult.vue";

const errorLog = ref("");
const context = ref("");
const framework = ref<Framework>("vitest");
const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<InvestigationResult | null>(null);

const isDisabled = computed(() => {
  return !errorLog.value.trim() || loading.value;
});

async function handleSubmit() {
  if (isDisabled.value) {
    return;
  }

  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    const investigation = await investigateFailure({
      errorLog: errorLog.value,
      context: context.value.trim() || undefined,
      framework: framework.value
    });

    result.value = investigation;
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : "Something went wrong while investigating the failure";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="form-container">
    <h1>AI Test Failure Investigator</h1>

    <p class="subtitle">
      Paste a failing test log and get an AI-powered investigation with root cause,
      debugging steps, and suggested fixes.
    </p>

    <div class="field">
      <label>Error / Stack Trace *</label>
      <textarea
        v-model="errorLog"
        placeholder="Paste your test error, stack trace, or logs here..."
        rows="10"
      />
    </div>

    <div class="field">
      <label>Context (optional)</label>
      <textarea
        v-model="context"
        placeholder="What were you expecting? Any relevant details..."
        rows="3"
      />
    </div>

    <div class="field">
      <label>Framework</label>
      <select v-model="framework">
        <option value="vitest">Vitest</option>
        <option value="jest">Jest</option>
        <option value="playwright">Playwright</option>
        <option value="cypress">Cypress</option>
        <option value="generic">Generic</option>
      </select>
    </div>

    <button :disabled="isDisabled" @click="handleSubmit">
      {{ loading ? "Investigating..." : "Investigate failure" }}
    </button>

    <p v-if="error" class="error-message">
      {{ error }}
    </p>

    <InvestigationResultView v-if="result" :result="result" />
  </div>
</template>

<style scoped>
.form-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  font-family: system-ui, sans-serif;
}

h1 {
  margin: 0 0 1rem;
  text-align: center;
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
}

.subtitle {
  color: #666;
  margin: 0 auto 2rem;
  text-align: center;
  max-width: 600px;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.6;
}

.field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

textarea,
select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.95rem;
}

button {
  display: block;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  border: none;
  background: black;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  color: #b42318;
  text-align: center;
}
</style>