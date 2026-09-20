<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import ResponsivePicture from '@/components/ResponsivePicture.vue'
import { images } from '@/config/images'

const slides = images.matchday
const activeIndex = ref(0)

/**
 * Frames that are in the DOM: the visible one plus the ones already reached.
 * The prerendered HTML therefore holds a single photograph, and the rest are
 * fetched as the carousel is used.
 */
const mounted = ref(new Set([0]))

/**
 * The carousel advances on its own until the first interaction, then stops for
 * good — a control that keeps moving after you have taken hold of it is the
 * most irritating thing a carousel can do. It never starts under
 * `prefers-reduced-motion`.
 */
const AUTOPLAY_MS = 6000
let timer: ReturnType<typeof setInterval> | undefined

function show(index: number) {
  const next = (index + slides.length) % slides.length
  mounted.value.add(next)
  activeIndex.value = next
}

function stopAutoplay() {
  if (timer !== undefined) {
    clearInterval(timer)
    timer = undefined
  }
}

function go(index: number) {
  stopAutoplay()
  show(index)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => show(activeIndex.value + 1), AUTOPLAY_MS)
})

onBeforeUnmount(stopAutoplay)

const pad = (value: number) => String(value).padStart(2, '0')
const counter = computed(() => `${pad(activeIndex.value + 1)} / ${pad(slides.length)}`)
</script>

<template>
  <section id="academie" class="intro-section section-pad" aria-labelledby="academie-titlu">
    <div class="page-shell">
      <div class="intro-head">
        <div class="intro-copy">
          <p class="eyebrow dark">Mai mult decât un antrenament</p>
          <h2 id="academie-titlu">FOTBAL PENTRU<br /><em>VIITOR</em></h2>
        </div>
        <p class="intro-lede">
          Dăm startul unei experiențe în care fiecare copil învață să joace, să aibă încredere și să
          crească alături de o echipă.
        </p>
      </div>

      <div
        class="matchday"
        role="group"
        aria-roledescription="carusel"
        aria-label="Momente de la joc"
        @pointerenter="stopAutoplay"
      >
        <div class="matchday-frame">
          <template v-for="(slide, index) in slides" :key="index">
            <ResponsivePicture
              v-if="mounted.has(index)"
              class="matchday-image"
              :class="{ 'is-active': index === activeIndex }"
              :picture="slide.picture"
              :alt="index === activeIndex ? slide.alt : ''"
              :aria-hidden="index === activeIndex ? undefined : 'true'"
              :background="slide.bg"
              :sizes="slide.sizes"
              :loading="index === 0 ? 'eager' : 'lazy'"
            />
          </template>

          <p class="matchday-counter">{{ counter }}</p>

          <div class="matchday-nav">
            <button type="button" aria-label="Fotografia anterioară" @click="go(activeIndex - 1)">
              <AppIcon name="arrow-right" :size="20" />
            </button>
            <button type="button" aria-label="Fotografia următoare" @click="go(activeIndex + 1)">
              <AppIcon name="arrow-right" :size="20" />
            </button>
          </div>
        </div>

        <div class="matchday-dots">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            type="button"
            :class="{ 'is-active': index === activeIndex }"
            :aria-label="`Fotografia ${pad(index + 1)}: ${slide.alt}`"
            :aria-current="index === activeIndex"
            @click="go(index)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.intro-head {
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  align-items: end;
  gap: clamp(26px, 5vw, 80px);
  margin-bottom: clamp(36px, 4.5vw, 60px);
  display: grid;
}

.intro-copy h2 {
  margin-top: 18px;
  margin-bottom: 0;
}

.intro-lede {
  max-width: 46ch;
  color: var(--muted-foreground);
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.8;
}

/* Match-day carousel -------------------------------------------------------
 * One wide frame across the full shell. The photographs are the argument this
 * section is making, so they get the room rather than a column beside the text.
 * ------------------------------------------------------------------------- */

.matchday-frame {
  aspect-ratio: 16 / 9;
  background: var(--muted);
  position: relative;
  overflow: hidden;
}

.matchday-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition:
    opacity 0.6s ease,
    transform 1.1s cubic-bezier(0.22, 0.85, 0.24, 1);
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.03);
}

.matchday-image.is-active {
  opacity: 1;
  transform: none;
}

.matchday-counter {
  background: var(--primary);
  color: var(--primary-foreground);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.12em;
  margin: 0;
  padding: 9px 14px;
  font-size: 12px;
  font-weight: 800;
  position: absolute;
  top: 0;
  left: 0;
}

.matchday-nav {
  gap: 10px;
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.matchday-nav button {
  background: color-mix(in oklab, var(--secondary) 76%, transparent);
  color: var(--secondary-foreground);
  cursor: pointer;
  border: 1px solid color-mix(in oklab, var(--secondary-foreground) 34%, transparent);
  place-items: center;
  width: 52px;
  height: 52px;
  transition:
    background-color 0.2s,
    color 0.2s;
  display: grid;
}

.matchday-nav button:hover {
  background: var(--primary);
  color: var(--primary-foreground);
}

.matchday-nav button:first-child svg {
  transform: rotate(180deg);
}

.matchday-dots {
  gap: 8px;
  margin-top: 14px;
  display: flex;
}

.matchday-dots button {
  background: var(--border);
  cursor: pointer;
  border: 0;
  flex: 1;
  height: 4px;
  padding: 0;
  transition:
    background-color 0.3s,
    height 0.3s;
}

.matchday-dots button.is-active {
  background: var(--primary);
  height: 7px;
}

@media (max-width: 860px) {
  .intro-head {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .intro-lede {
    margin-bottom: 0;
  }

  .matchday-frame {
    aspect-ratio: 4 / 3;
  }

  .matchday-nav {
    right: 14px;
    bottom: 14px;
  }

  .matchday-nav button {
    width: 46px;
    height: 46px;
  }
}

@media (max-width: 560px) {
  .matchday-frame {
    aspect-ratio: 5 / 4;
  }
}
</style>
