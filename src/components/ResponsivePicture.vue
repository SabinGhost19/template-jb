<script setup lang="ts">
import type { ResponsivePicture } from '@/config/images'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    picture: ResponsivePicture
    alt: string
    /** `sizes` attribute describing the rendered width of the slot. */
    sizes: string
    loading?: 'lazy' | 'eager'
    /** Set to `high` for the LCP image only. */
    fetchpriority?: 'high' | 'auto'
    /**
     * Average colour of the photo, painted as the `<img>` background until the
     * file decodes. Costs nothing on the wire and removes the blank box you
     * otherwise get when scrolling past a lazy image faster than it loads.
     */
    background?: string
  }>(),
  { loading: 'lazy', fetchpriority: 'auto', background: undefined },
)

const MIME_TYPES: Record<string, string> = {
  avif: 'image/avif',
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
}

const mimeType = (format: string) => MIME_TYPES[format] ?? `image/${format}`
</script>

<template>
  <picture>
    <source
      v-for="(srcset, format) in picture.sources"
      :key="format"
      :type="mimeType(String(format))"
      :srcset="srcset"
      :sizes="sizes"
    />
    <img
      v-bind="$attrs"
      :src="picture.img.src"
      :width="picture.img.w"
      :height="picture.img.h"
      :alt="alt"
      :style="background ? { backgroundColor: background } : undefined"
      :loading="loading"
      :fetchpriority="props.fetchpriority === 'high' ? 'high' : undefined"
      :decoding="loading === 'lazy' ? 'async' : undefined"
    />
  </picture>
</template>
