<script setup lang="ts">
import { computed, ref } from 'vue'

import ResponsivePicture from '@/components/ResponsivePicture.vue'
import { COACH_THUMB_SIZES, images } from '@/config/images'
import { COACH } from '@/content/site'

const career = images.coachCareer
const activeIndex = ref(0)

/**
 * Frames whose large variant is in the DOM: the visible one plus any the pointer
 * or keyboard has already touched. Switching stays instant without paying for
 * five full-size downloads on load, and the prerendered HTML holds only frame 01.
 */
const mounted = ref(new Set([0]))

function warm(index: number) {
  mounted.value.add(index)
}

function select(index: number) {
  warm(index)
  activeIndex.value = index
}

const pad = (value: number) => String(value).padStart(2, '0')
const counter = computed(() => `${pad(activeIndex.value + 1)} / ${pad(career.length)}`)
</script>

<template>
  <section id="antrenor" class="coach-section section-pad" aria-labelledby="antrenor-titlu">
    <div class="page-shell coach-grid">
      <div class="coach-archive">
        <figure class="coach-frame">
          <template v-for="(image, index) in career" :key="index">
            <ResponsivePicture
              v-if="mounted.has(index)"
              class="coach-frame-image"
              :class="{ 'is-active': index === activeIndex }"
              :picture="image.picture"
              :alt="index === activeIndex ? image.alt : ''"
              :aria-hidden="index === activeIndex ? undefined : 'true'"
              :sizes="image.sizes"
              :background="image.bg"
            />
          </template>
          <figcaption>Conducem prin exemplu.</figcaption>
        </figure>

        <div class="coach-strip-head">
          <p class="coach-strip-label">Din arhiva de jucător</p>
          <p class="coach-counter">{{ counter }}</p>
        </div>

        <ul class="coach-strip" aria-label="Fotografii din cariera de jucător">
          <li v-for="(image, index) in career" :key="index">
            <button
              type="button"
              class="coach-thumb"
              :class="{ 'is-active': index === activeIndex }"
              :aria-pressed="index === activeIndex"
              :aria-label="`Fotografia ${pad(index + 1)}: ${image.alt}`"
              @click="select(index)"
              @pointerenter="warm(index)"
              @focus="warm(index)"
            >
              <ResponsivePicture
                :picture="image.thumb"
                alt=""
                :sizes="COACH_THUMB_SIZES"
                :background="image.bg"
              />
            </button>
          </li>
        </ul>
      </div>

      <div class="coach-copy">
        <h2 id="antrenor-titlu">AMIHĂESEI<br /><em>TEODOR</em></h2>
        <p class="coach-role">{{ COACH.role }}</p>
        <p class="coach-lead">{{ COACH.lead }}</p>

        <p class="coach-label">A jucat pentru</p>
        <ul class="coach-clubs">
          <li v-for="club in COACH.clubs" :key="club">{{ club }}</li>
        </ul>

        <p class="coach-label">Educație</p>
        <p class="coach-education">{{ COACH.education }}</p>
      </div>
    </div>
  </section>
</template>

<style>
.coach-section {
  background: var(--background);
}

.coach-grid {
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1fr);
  align-items: start;
  gap: clamp(40px, 6vw, 96px);
  display: grid;
}

/* Archive: one large frame, five selectable thumbnails ---------------------- */

.coach-archive {
  min-width: 0;
}

.coach-frame {
  aspect-ratio: 4 / 5;
  background: var(--muted);
  margin: 0;
  position: relative;
}

.coach-frame-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition:
    opacity 0.55s ease,
    transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.035);
}

/* The grade is baked into the source files, so no CSS filter here. */
.coach-frame-image.is-active {
  opacity: 1;
  transform: scale(1);
}

.coach-frame figcaption {
  background: var(--primary);
  color: var(--primary-foreground);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  writing-mode: vertical-rl;
  padding: 14px 18px;
  font-size: 10px;
  font-weight: 800;
  position: absolute;
  bottom: 28px;
  right: -22px;
}

.coach-strip-head {
  border-bottom: 1px solid var(--border);
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-top: 26px;
  padding-bottom: 10px;
  display: flex;
}

.coach-strip-label {
  color: var(--muted-foreground);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin: 0;
  font-size: 10px;
  font-weight: 800;
}

.coach-counter {
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.06em;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
}

.coach-strip {
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
}

.coach-thumb {
  aspect-ratio: 1 / 1;
  background: var(--foreground);
  cursor: pointer;
  border: 0;
  width: 100%;
  padding: 0;
  display: block;
  position: relative;
  overflow: hidden;
}

.coach-thumb img {
  object-fit: cover;
  filter: saturate(0.45) brightness(0.76);
  width: 100%;
  height: 100%;
  transition:
    filter 0.3s,
    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  display: block;
}

.coach-thumb:hover img,
.coach-thumb:focus-visible img {
  filter: none;
  transform: scale(1.06);
}

.coach-thumb.is-active img {
  filter: none;
}

/* Amber underline marks the frame currently in the viewer. */
.coach-thumb::after {
  content: '';
  background: var(--primary);
  height: 3px;
  transform-origin: 0;
  transition: transform 0.35s;
  position: absolute;
  inset: auto 0 0;
  transform: scaleX(0);
}

.coach-thumb.is-active::after {
  transform: scaleX(1);
}

/* Copy --------------------------------------------------------------------- */

.coach-copy {
  min-width: 0;
}

.coach-copy h2 {
  margin-top: 18px;
}

.coach-role {
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin: -12px 0 26px;
  font-size: 11px;
  font-weight: 800;
}

.coach-lead {
  max-width: 44ch;
  color: var(--muted-foreground);
  margin: 0 0 46px;
  font-size: 16px;
  line-height: 1.75;
}

.coach-label {
  color: var(--muted-foreground);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin: 0 0 14px;
  font-size: 10px;
  font-weight: 800;
}

/* The three clubs read as a team sheet: condensed caps, hairline between. */
.coach-clubs {
  border-bottom: 1px solid var(--border);
  margin: 0 0 40px;
  padding: 0;
  list-style: none;
}

.coach-clubs li {
  font-family: var(--font-display);
  text-transform: uppercase;
  border-top: 1px solid var(--border);
  padding: 15px 0;
  font-size: clamp(26px, 2.5vw, 36px);
  font-weight: 700;
  line-height: 1;
}

.coach-education {
  max-width: 50ch;
  color: var(--muted-foreground);
  margin: 0;
  font-size: 14px;
  line-height: 1.75;
}

@media (hover: none), (max-width: 860px) {
  .coach-thumb img,
  .coach-thumb.is-active img {
    filter: none;
  }

  /* Without the colour difference, the inactive frames are held back by a
     slight dim instead, so the selected one still reads as selected. */
  .coach-thumb:not(.is-active) img {
    opacity: 0.55;
  }
}

@media (max-width: 1100px) {
  .coach-grid {
    gap: 44px;
  }
}

@media (max-width: 860px) {
  .coach-grid {
    grid-template-columns: 1fr;
    gap: 52px;
  }

  .coach-archive {
    max-width: 520px;
  }

  .coach-lead {
    margin-bottom: 36px;
  }
}

@media (max-width: 560px) {
  .coach-frame figcaption {
    bottom: 18px;
    right: -6px;
  }

  .coach-strip {
    gap: 6px;
  }

  .coach-clubs li {
    padding: 13px 0;
    font-size: 24px;
  }
}
</style>
