<script setup lang="ts">
import { computed, ref } from "vue";
import { investigateFailure } from "../services/api";
import type {
  Framework,
  InvestigationResult
} from "../types/investigation";
import { saveInvestigation } from "../utils/storage";

import EmptyState from "./EmptyState.vue";
import InvestigationResultView from "./InvestigationResult.vue";
import LoadingState from "./LoadingState.vue";

const errorLog = ref("");
const context = ref("");
const framework = ref<Framework>("vitest");

const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<InvestigationResult | null>(null);
const hasSubmitted = ref(false);

const isDisabled = computed(() => {
  return !errorLog.value.trim() || loading.value;
});

async function handleSubmit() {
  if (isDisabled.value) return;

  hasSubmitted.value = true;
  loading.value = true;
  error.value = null;
  result.value = null;

  const payload = {
    errorLog: errorLog.value,
    context: context.value.trim() || undefined,
    framework: framework.value
  };

  try {
    const investigation = await investigateFailure(payload);

    result.value = investigation;

    saveInvestigation({
      input: payload,
      result: investigation
    });

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
  <div class="page">
    <section class="form-container">
      <h1>AI Test Failure Investigator</h1>

      <p class="subtitle">
        Paste a failing test log and get an AI-powered investigation with root cause,
        debugging steps, suggested fixes, and an improved test snippet.
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
    </section>

    <!-- STATES -->
    <LoadingState v-if="loading" />

    <InvestigationResultView
      v-else-if="result"
      :result="result"
    />

    <EmptyState v-else-if="!hasSubmitted" />
  </div>
</template>

<style scoped>
.page {
  padding: 2.5rem 1.5rem 4rem;
}

.form-container {
  max-width: 720px;
  margin: 0 auto;
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
  color: #667085;
  margin: 0 auto 2rem;
  text-align: center;
  max-width: 640px;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.7;
}

.field {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #344054;
}

textarea,
select {
  padding: 0.85rem 0.95rem;
  border: 1px solid #d0d5dd;
  border-radius: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.95rem;
  background: #fff;
}

textarea:focus,
select:focus {
  outline: 2px solid #d9d9d9;
  outline-offset: 1px;
}

button {
  display: block;
  margin: 0 auto;
  padding: 0.85rem 1.25rem;
  border: none;
  background: #111827;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

button:hover:enabled {
  background: #0f172a;
}

button:disabled {
  background: #98a2b3;
  cursor: not-allowed;
}

.error-message {
  max-width: 720px;
  margin: 1rem auto 0;
  color: #b42318;
  text-align: center;
  line-height: 1.6;
}
</style>