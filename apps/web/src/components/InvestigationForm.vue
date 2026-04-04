<script setup lang="ts">
import { ref, computed } from "vue";
import type { Framework } from "../types/investigation";

const errorLog = ref("");
const context = ref("");
const framework = ref<Framework>("vitest");
const loading = ref(false);

const isDisabled = computed(() => {
  return !errorLog.value.trim() || loading.value;
});

function handleSubmit() {
  if (isDisabled.value) return;

  loading.value = true;

  // Placeholder temporal (luego conectamos con backend)
  setTimeout(() => {
    console.log({
      errorLog: errorLog.value,
      context: context.value,
      framework: framework.value
    });

    loading.value = false;
  }, 800);
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
  </div>
</template>

<style scoped>
.form-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  font-family: system-ui, sans-serif;
}

/* 🔥 Título adaptativo */
h1 {
  margin: 0 0 1rem;
  text-align: center;
  font-weight: 700;

  /* clave */
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
}

/* 🔥 Subtítulo equilibrado */
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
  padding: 0.75rem 1.25rem;
  border: none;
  background: black;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 auto;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}
</style>
