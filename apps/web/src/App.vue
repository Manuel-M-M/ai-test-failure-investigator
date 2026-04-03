<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getHealth } from "./services/api";

const loading = ref(true);
const error = ref<string | null>(null);
const data = ref<any>(null);

onMounted(async () => {
  try {
    const result = await getHealth();
    data.value = result;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main style="padding: 2rem; font-family: sans-serif">
    <h1>AI Test Failure Investigator</h1>

    <div v-if="loading">Loading API status...</div>

    <div v-else-if="error" style="color: red">
      Error: {{ error }}
    </div>

    <div v-else>
      <h2>API Status</h2>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </main>
</template>