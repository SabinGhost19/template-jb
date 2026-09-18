<script setup lang="ts">
import { ref } from 'vue'

import ResponsivePicture from '@/components/ResponsivePicture.vue'
import { images } from '@/config/images'
import { VALUES } from '@/content/site'

const activeIndex = ref(0)

/**
 * Pointer devices reveal a panel on hover, touch needs a tap, the keyboard
 * needs focus — all three land here. Below 860px the panels stack open and
 * this state stops mattering.
 */
function open(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <section class="philosophy-section section-pad" aria-labelledby="filosofie-titlu">
    <div class="page-shell">
      <div class="philosophy-head">
        <div>
          <p class="eyebrow">Filosofia noastră</p>
          <h2 id="filosofie-titlu">NU FORMĂM DOAR<br /><span>FOTBALIȘTI</span></h2>
        </div>
        <p class="philosophy-copy">
          Formăm copii responsabili, disciplinați și pasionați de sport, într-un cadru modern,
          pozitiv și prietenos.
        </p>
      </div>

      <ul class="values" role="list">
        <li v-for="(value, index) in VALUES" :key="value.word">
          <button
            type="button"
            class="value-panel"
            :class="{ 'is-open': index === activeIndex }"
            :aria-expanded="index === activeIndex"
            @click="open(index)"
            @pointerenter="open(index)"
            @focus="open(index)"
          >
            <ResponsivePicture
              :picture="images.values[index]!.picture"
              :alt="images.values[index]!.alt"
              :sizes="images.values[index]!.sizes"
              :background="images.values[index]!.bg"
            />
            <span class="value-body">
              <span class="value-word">{{ value.word }}</span>
              <span class="value-line">{{ value.line }}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style>
.philosophy-section {
  background: var(--pitch);
  color: var(--secondary-foreground);
}

.philosophy-head {
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  align-items: end;
  gap: clamp(26px, 5vw, 80px);
  margin-bottom: clamp(36px, 5vw, 64px);
  display: grid;
}

.philosophy-head h2 {
  font-family: var(--font-display);
  text-transform: uppercase;
  margin: 24px 0 0;
  font-size: clamp(44px, 9.2vw, 140px);
  font-weight: 800;
  line-height: 0.96;
}

.philosophy-head h2 span {
  color: var(--primary);
}

.philosophy-copy {
  max-width: 44ch;
  margin: 0 0 10px;
  font-size: clamp(15px, 1.3vw, 17px);
  line-height: 1.75;
}

/* Values: three panels that trade width -------------------------------------
 * The one you point at opens and says what the word means; the other two fall
 * back to a vertical spine. Nothing moves on its own.
 * ------------------------------------------------------------------------- */

.values {
  gap: 10px;
  height: clamp(420px, 52vw, 560px);
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}

.values li {
  flex: 1;
  min-width: 0;
  transition: flex-grow 0.55s cubic-bezier(0.22, 0.85, 0.24, 1);
  display: flex;
}

.values li:has(.is-open) {
  flex-grow: 2.6;
}

.value-panel {
  background: var(--secondary);
  cursor: pointer;
  text-align: left;
  border: 0;
  width: 100%;
  padding: 0;
  display: block;
  position: relative;
  overflow: hidden;
}

.value-panel img {
  object-fit: cover;
  filter: saturate(0.25) brightness(0.52);
  width: 100%;
  height: 100%;
  transition:
    filter 0.55s,
    transform 0.9s cubic-bezier(0.22, 0.85, 0.24, 1);
  display: block;
}

.value-panel.is-open img {
  filter: saturate(1) brightness(0.78);
  transform: scale(1.04);
}

/* Scrim, so the word stays readable over any part of a photo. */
.value-panel::after {
  content: '';
  background: linear-gradient(0deg, rgb(11 10 10 / 88%) 4%, rgb(11 10 10 / 10%) 62%);
  position: absolute;
  inset: 0;
}

.value-body {
  z-index: 1;
  flex-direction: column;
  justify-content: flex-end;
  padding: 26px;
  display: flex;
  position: absolute;
  inset: 0;
}

.value-word {
  color: var(--primary);
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: clamp(30px, 3.4vw, 52px);
  font-weight: 800;
  line-height: 0.92;
  /* Closed panels are narrow, so the word turns and runs up the spine. */
  writing-mode: vertical-rl;
  rotate: 180deg;
}

.value-panel.is-open .value-word {
  writing-mode: horizontal-tb;
  rotate: none;
}

.value-line {
  max-width: 34ch;
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.7;
  /* Kept in the accessibility tree and in the prerendered HTML while hidden. */
  opacity: 0;
  transition:
    opacity 0.45s,
    translate 0.55s cubic-bezier(0.22, 0.85, 0.24, 1);
  translate: 0 12px;
}

.value-panel.is-open .value-line {
  opacity: 1;
  translate: none;
}

@media (max-width: 1100px) {
  .value-body {
    padding: 20px;
  }

  .value-line {
    font-size: 13px;
  }
}

/*
 * Touch has no hover and a third of a phone screen has no room for a sentence,
 * so below this width the three panels simply stack open.
 */
@media (max-width: 860px) {
  .philosophy-head {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .philosophy-copy {
    margin-bottom: 0;
  }

  .values {
    flex-direction: column;
    gap: 12px;
    height: auto;
  }

  .values li,
  .values li:has(.is-open) {
    flex: none;
  }

  .value-panel {
    cursor: default;
  }

  .value-panel img {
    aspect-ratio: 16 / 10;
    filter: saturate(1) brightness(0.72);
    height: auto;
    transform: none;
  }

  .value-word,
  .value-panel.is-open .value-word {
    writing-mode: horizontal-tb;
    rotate: none;
    font-size: 34px;
  }

  .value-line {
    max-width: 46ch;
    opacity: 1;
    translate: none;
  }
}

@media (max-width: 560px) {
  .value-panel img {
    aspect-ratio: 4 / 3;
  }

  .value-body {
    padding: 18px;
  }

  .value-word {
    font-size: 30px;
  }
}
</style>
