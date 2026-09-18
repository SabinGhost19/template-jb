<script setup lang="ts">
import { MARK_PATH, MARK_VIEW_BOX } from '@/assets/brand/logo-mark'
</script>

<template>
  <!--
    The JB mark is defined once and referenced with <use> by every BrandMark on
    the page, so its ~5 KB of path data ships a single time.
  -->
  <svg class="brand-sprite" aria-hidden="true" focusable="false">
    <symbol id="jb-mark" :viewBox="MARK_VIEW_BOX">
      <path fill="currentColor" fill-rule="nonzero" :d="MARK_PATH" />
    </symbol>
  </svg>
</template>

<style>
.brand-sprite {
  width: 0;
  height: 0;
  position: absolute;
  overflow: hidden;
}
</style>
