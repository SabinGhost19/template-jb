<script setup lang="ts">
/**
 * Inline icon set. Paths are taken from Lucide (ISC License, https://lucide.dev)
 * so no icon library has to be shipped for the six glyphs the site uses.
 */
type IconNode = ['path', { d: string }] | ['circle', { cx: string; cy: string; r: string }]

const ICONS = {
  'arrow-right': [
    ['path', { d: 'M5 12h14' }],
    ['path', { d: 'm12 5 7 7-7 7' }],
  ],
  'arrow-down': [
    ['path', { d: 'M12 5v14' }],
    ['path', { d: 'm19 12-7 7-7-7' }],
  ],
  'map-pin': [
    [
      'path',
      {
        d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
      },
    ],
    ['circle', { cx: '12', cy: '10', r: '3' }],
  ],
  menu: [
    ['path', { d: 'M4 5h16' }],
    ['path', { d: 'M4 12h16' }],
    ['path', { d: 'M4 19h16' }],
  ],
  phone: [
    [
      'path',
      {
        d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
      },
    ],
  ],
  x: [
    ['path', { d: 'M18 6 6 18' }],
    ['path', { d: 'm6 6 12 12' }],
  ],
} as const satisfies Record<string, readonly IconNode[]>

export type IconName = keyof typeof ICONS

withDefaults(
  defineProps<{
    name: IconName
    /** Rendered size in CSS pixels (the icons are decorative and always hidden from AT). */
    size?: number
  }>(),
  { size: 24 },
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <component :is="node[0]" v-for="(node, index) in ICONS[name]" :key="index" v-bind="node[1]" />
  </svg>
</template>
