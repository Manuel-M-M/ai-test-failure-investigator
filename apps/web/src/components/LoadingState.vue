<template>
  <section class="loading-state">
    <div class="spinner" />
    <div>
      <h2>Investigating failure...</h2>
      <p>Analyzing the log, possible root cause, and suggested fix.</p>
    </div>
  </section>
</template>

<style scoped>
.loading-state {
  max-width: 720px;
  margin: 2rem auto 0;
  padding: 1.5rem;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
  background: #f9fafb;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid #d0d5dd;
  border-top-color: #111827;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

.loading-state h2 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.loading-state p {
  margin: 0;
  color: #667085;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>