<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import GalleryLightbox from '@/components/GalleryLightbox.vue'
import ResponsivePicture from '@/components/ResponsivePicture.vue'
import { images } from '@/config/images'

const activeIndex = ref<number | null>(null)
let trigger: HTMLElement | null = null

const activeImage = computed(() =>
  activeIndex.value === null ? null : (images.gallery[activeIndex.value] ?? null),
)

function openLightbox(index: number, event: MouseEvent) {
  trigger = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  activeIndex.value = index
}

function closeLightbox() {
  activeIndex.value = null
  void nextTick(() => trigger?.focus())
}

const formatIndex = (index: number) => String(index + 1).padStart(2, '0')
</script>

<template>
  <section id="galerie" class="gallery-section section-pad" aria-labelledby="galerie-titlu">
    <div class="page-shell">
      <div class="section-head gallery-heading">
        <h2 id="galerie-titlu">MOMENTE CARE<br />NE FORMEAZĂ</h2>
        <p>Fiecare antrenament adaugă o lecție. Fiecare meci construiește o echipă.</p>
      </div>

      <div class="gallery-grid">
        <button
          v-for="(image, index) in images.gallery"
          :key="index"
          type="button"
          class="gallery-item"
          :class="`gallery-item-${index + 1}`"
          :aria-label="`Mărește imaginea ${formatIndex(index)}: ${image.alt}`"
          @click="openLightbox(index, $event)"
        >
          <ResponsivePicture
            :picture="image.picture"
            :alt="image.alt"
            :sizes="image.sizes"
            :background="image.bg"
          />
          <span aria-hidden="true"
            >{{ formatIndex(index) }} <AppIcon name="arrow-right" :size="16"
          /></span>
        </button>
      </div>
    </div>

    <GalleryLightbox v-if="activeImage" :image="activeImage" @close="closeLightbox" />
  </section>
</template>
<style>
.gallery-heading {
  margin-bottom: 64px;
}

/*
 * Six frames on an asymmetric mosaic: one tall portrait anchors the left, two
 * wide frames carry the group shots, three squares hold the close action. The
 * shapes follow what is in each photograph rather than a uniform grid.
 */
.gallery-grid {
  grid-template-rows: 280px 360px 320px;
  grid-template-columns: 1.15fr 0.8fr 0.8fr;
  gap: 16px;
  display: grid;
}

.gallery-item {
  background: var(--foreground);
  cursor: zoom-in;
  border: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.gallery-item-1 {
  grid-row: 1 / 3;
}

.gallery-item-2 {
  grid-column: 2 / 4;
}

.gallery-item-5 {
  grid-column: 1 / 3;
  grid-row: 3;
}

.gallery-item-6 {
  grid-column: 3;
  grid-row: 3;
}

.gallery-item img {
  object-fit: cover;
  filter: saturate(0.72);
  width: 100%;
  height: 100%;
  transition:
    transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
    filter 0.4s;
  display: block;
}

.gallery-item:hover img {
  filter: saturate(1);
  transform: scale(1.035);
}

.gallery-item > span {
  background: var(--primary);
  color: var(--primary-foreground);
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  position: absolute;
  bottom: 14px;
  right: 14px;
}

/*
 * Below this width the muted state is dropped entirely. It exists to reward a
 * hover, and on a touch screen there is no hover to reward — the photographs
 * would simply sit there washed out for everyone.
 */
@media (hover: none), (max-width: 900px) {
  .gallery-item img {
    filter: none;
  }
}

@media (max-width: 900px) {
  .gallery-grid {
    grid-template-rows: 380px 300px 260px 300px;
    grid-template-columns: 1fr 1fr;
  }

  .gallery-item-1 {
    grid-row: 1;
  }

  .gallery-item-2 {
    grid-area: 1 / 2;
  }

  .gallery-item-3 {
    grid-area: 2 / 1 / 2 / -1;
  }

  .gallery-item-4,
  .gallery-item-5,
  .gallery-item-6 {
    grid-column: auto;
    grid-row: auto;
  }
}

@media (max-width: 640px) {
  .gallery-heading {
    margin-bottom: 44px;
  }

  .gallery-grid {
    grid-template-rows: repeat(6, 300px);
    grid-template-columns: 1fr;
    display: grid;
  }

  .gallery-item-1,
  .gallery-item-2,
  .gallery-item-3,
  .gallery-item-4,
  .gallery-item-5,
  .gallery-item-6 {
    grid-area: auto / 1;
  }
}
</style>
