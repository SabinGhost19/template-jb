<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import { AGE_GROUPS } from '@/content/site'
</script>

<template>
  <section id="grupe" class="groups-section section-pad" aria-labelledby="grupe-titlu">
    <div class="page-shell">
      <div class="section-head">
        <h2 id="grupe-titlu">GRUPELE<br />NOASTRE</h2>
        <p>
          Un traseu de dezvoltare adaptat fiecărei vârste, de la primele atingeri de minge la jocul
          colectiv.
        </p>
      </div>

      <ul class="group-list" role="list">
        <li v-for="group in AGE_GROUPS" :key="group.code" class="group-row">
          <strong>{{ group.code }}</strong>
          <span class="group-year">Născuți în {{ group.birthYear }}</span>
          <div class="group-detail">
            <b>{{ group.focus }}</b>
            <span>{{ group.description }}</span>
          </div>
          <AppIcon name="arrow-right" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style>
.group-list {
  border-top: 1px solid color-mix(in oklab, var(--secondary-foreground) 18%, transparent);
}

.group-row {
  border-bottom: 1px solid color-mix(in oklab, var(--secondary-foreground) 18%, transparent);
  grid-template-columns: 0.8fr 1fr 1.6fr auto;
  align-items: center;
  gap: 30px;
  min-height: 116px;
  display: grid;
  cursor: default;
  transition:
    background-color 0.25s,
    padding 0.25s;
}

.group-row strong {
  color: var(--primary);
  font-family: var(--font-display);
  font-size: clamp(54px, 6vw, 88px);
  line-height: 1;
}

.group-year {
  color: var(--muted-foreground);
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
}

.group-detail {
  opacity: 0.35;
  flex-direction: column;
  gap: 4px;
  transition:
    opacity 0.25s,
    transform 0.25s;
  display: flex;
}

.group-detail b {
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 24px;
}

.group-detail span {
  color: var(--muted-foreground);
  font-size: 12px;
}

.group-row svg {
  color: var(--primary);
  transition: transform 0.25s;
  transform: rotate(-45deg);
}

.group-row:hover {
  background: color-mix(in oklab, var(--pitch) 42%, transparent);
  padding-inline: 20px;
}

.group-row:hover .group-detail {
  opacity: 1;
  transform: translate(8px);
}

.group-row:hover svg {
  transform: rotate(0);
}

@media (max-width: 900px) {
  .group-row {
    grid-template-columns: 0.7fr 1fr 1.5fr auto;
  }
}

@media (max-width: 640px) {
  .group-row {
    grid-template-columns: 90px 1fr auto;
    gap: 12px;
    min-height: 100px;
  }

  .group-row strong {
    font-size: 54px;
  }

  .group-detail {
    display: none;
  }
}
</style>
