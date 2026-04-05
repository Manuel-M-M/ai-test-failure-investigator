<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {
  getInvestigations,
  type StoredInvestigation
} from "../utils/storage";

const investigations = ref<StoredInvestigation[]>([]);

function loadInvestigations() {
  investigations.value = getInvestigations();
}

function select(item: StoredInvestigation) {
  console.log("selected", item);
}

onMounted(() => {
  loadInvestigations();
  window.addEventListener("investigations-updated", loadInvestigations);
});

onUnmounted(() => {
  window.removeEventListener("investigations-updated", loadInvestigations);
});
</script>

<template>
  <div v-if="investigations.length" class="recent-container">
    <h3>Recent investigations</h3>

    <ul>
      <li
        v-for="(item, index) in investigations"
        :key="`${item.date}-${index}`"
        @click="select(item)"
      >
        <div class="title">
          {{ item.input.framework }} ·
          {{ item.input.errorLog.slice(0, 80) }}<span v-if="item.input.errorLog.length > 80">...</span>
        </div>

        <div class="meta">
          {{ new Date(item.date).toLocaleString() }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.recent-container {
  max-width: 720px;
  margin: 2rem auto;
}

/* Section title (centrado → correcto) */
h3 {
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #667085;
  text-align: center;
  letter-spacing: 0.02em;
}

/* Lista base */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Card */
li {
  padding: 0.85rem 1rem;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
  margin-bottom: 0.6rem;
  cursor: pointer;
  transition: all 0.18s ease;
  background: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 👈 clave: alineación izquierda */
}

/* Hover sutil (tool feeling) */
li:hover {
  background: #f9fafb;
  border-color: #d0d5dd;
}

/* Texto principal */
.title {
  font-size: 0.9rem;
  color: #101828;
  text-align: left;
  line-height: 1.4;

  /* Truncado limpio */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Metadata (fecha) */
.meta {
  font-size: 0.75rem;
  color: #667085;
  margin-top: 0.35rem;
  text-align: left;
}

/* Responsive */
@media (max-width: 640px) {
  li {
    padding: 0.75rem 0.85rem;
  }

  .title {
    font-size: 0.85rem;
  }
}
</style>