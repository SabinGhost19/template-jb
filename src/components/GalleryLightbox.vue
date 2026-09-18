<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import ResponsivePicture from '@/components/ResponsivePicture.vue'
import { useEscapeKey } from '@/composables/useEscapeKey'
import type { SiteImage } from '@/config/images'

defineProps<{ image: SiteImage }>()
const emit = defineEmits<{ close: [] }>()

/** Root of the page, made inert while the dialog is open so focus stays inside it. */
const APP_ROOT_ID = 'app'

const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')

useEscapeKey(() => emit('close'))

/** Restored on close: the page behind the dialog must not scroll under it. */
let previousBodyOverflow = ''

onMounted(() => {
  document.getElementById(APP_ROOT_ID)?.setAttribute('inert', '')
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  closeButton.value?.focus()
})

onBeforeUnmount(() => {
  document.getElementById(APP_ROOT_ID)?.removeAttribute('inert')
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <Teleport to="body">
    <div
      class="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Imagine mărită"
      @click="emit('close')"
    >
      <button
        ref="closeButton"
        type="button"
        aria-label="Închide imaginea"
        @click.stop="emit('close')"
      >
        <AppIcon name="x" />
      </button>
      <ResponsivePicture
        :picture="image.picture"
        :alt="image.alt"
        sizes="(max-width: 800px) calc(100vw - 32px), min(1100px, 92vw)"
        :background="image.bg"
        loading="eager"
      />
    </div>
  </Teleport>
</template>
<style>
/*
 * A single grid cell that is exactly the visible viewport minus its padding,
 * with the image constrained to that cell. `100dvh` rather than `100vh` so the
 * collapsing browser chrome on a phone cannot push the bottom off screen.
 */
.lightbox {
  --lightbox-gap: clamp(14px, 4vw, 40px);

  z-index: 100;
  background: color-mix(in oklab, var(--secondary) 94%, transparent);
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
  place-items: center;
  padding: var(--lightbox-gap);
  padding-top: calc(var(--lightbox-gap) + env(safe-area-inset-top, 0px));
  padding-bottom: calc(var(--lightbox-gap) + env(safe-area-inset-bottom, 0px));
  display: grid;
  position: fixed;
  inset: 0;
  height: 100dvh;
  overscroll-behavior: contain;
  cursor: zoom-out;
}

/*
 * `width`/`height` are reset to auto so the intrinsic size coming from the
 * element's own attributes cannot be clamped on each axis independently, which
 * is what stretched the box out of proportion. With both dimensions auto, the
 * two maximums scale the image together and keep its aspect ratio.
 */
.lightbox img {
  object-fit: contain;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.lightbox button {
  z-index: 2;
  border: 1px solid var(--muted-foreground);
  background: var(--secondary);
  width: 46px;
  height: 46px;
  color: var(--secondary-foreground);
  cursor: pointer;
  border-radius: 50%;
  place-items: center;
  display: grid;
  position: absolute;
  top: calc(16px + env(safe-area-inset-top, 0px));
  right: 16px;
}

@media (min-width: 801px) {
  .lightbox button {
    top: calc(24px + env(safe-area-inset-top, 0px));
    right: 24px;
  }
}
</style>
