<script setup lang="ts">
import { DEVELOPMENT_PILLARS } from '@/content/site'
</script>

<template>
  <section class="benefits-section section-pad" aria-labelledby="dezvoltare-titlu">
    <div class="page-shell">
      <div class="section-head">
        <h2 id="dezvoltare-titlu">DEZVOLTĂM MAI MULT<br />DECÂT TEHNICĂ</h2>
      </div>

      <div class="benefits-grid">
        <article v-for="pillar in DEVELOPMENT_PILLARS" :key="pillar.index" class="benefit">
          <span>{{ pillar.index }}</span>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style>
.benefits-section {
  background: var(--card);
}

.benefits-grid {
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
  grid-template-columns: repeat(3, 1fr);
  display: grid;
}

.benefit {
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  min-height: 290px;
  padding: 32px;
}

.benefit > span {
  color: var(--muted-foreground);
  font-size: 10px;
  font-weight: 800;
}

.benefit h3 {
  max-width: 240px;
  font-family: var(--font-display);
  text-transform: uppercase;
  margin: 72px 0 14px;
  font-size: 30px;
  line-height: 1;
}

.benefit p {
  max-width: 290px;
  color: var(--muted-foreground);
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .benefit {
    min-height: 230px;
  }

  .benefit h3 {
    margin-top: 50px;
  }
}
</style>
