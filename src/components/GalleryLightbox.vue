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

onMounted(() => {
  document.getElementById(APP_ROOT_ID)?.setAttribute('inert', '')
  closeButton.value?.focus()
})

onBeforeUnmount(() => {
  document.getElementById(APP_ROOT_ID)?.removeAttribute('inert')
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
        sizes="min(1100px, 90vw)"
        :background="image.bg"
        loading="eager"
      />
    </div>
  </Teleport>
</template>
<style>
.lightbox {
  z-index: 100;
  background: color-mix(in oklab, var(--secondary) 94%, transparent);
  place-items: center;
  padding: 40px;
  display: grid;
  position: fixed;
  inset: 0;
  cursor: zoom-out;
}

.lightbox img {
  object-fit: contain;
  max-width: min(1100px, 90vw);
  max-height: 84vh;
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
  top: 24px;
  right: 24px;
}
</style>
