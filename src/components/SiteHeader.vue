<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import BrandMark from '@/components/BrandMark.vue'
import { useEscapeKey } from '@/composables/useEscapeKey'
import { NAV_LINKS } from '@/content/site'

const isMenuOpen = ref(false)
const header = useTemplateRef<HTMLElement>('header')
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')

function closeMenu({ restoreFocus = false } = {}) {
  if (!isMenuOpen.value) return
  isMenuOpen.value = false
  if (restoreFocus) menuButton.value?.focus()
}

useEscapeKey(() => closeMenu({ restoreFocus: true }))

/** Close the mobile menu when the user interacts anywhere outside the header. */
function onPointerDown(event: PointerEvent) {
  if (isMenuOpen.value && event.target instanceof Node && !header.value?.contains(event.target)) {
    closeMenu()
  }
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>

<template>
  <header ref="header" class="site-nav">
    <BrandMark />

    <nav class="desktop-nav" aria-label="Navigație principală">
      <a v-for="link in NAV_LINKS" :key="link.href" :href="link.href">{{ link.label }}</a>
    </nav>

    <a class="nav-cta" href="#contact">
      Înscrieri deschise <AppIcon name="arrow-right" :size="16" />
    </a>

    <button
      ref="menuButton"
      type="button"
      class="menu-button"
      :aria-label="isMenuOpen ? 'Închide meniul' : 'Deschide meniul'"
      :aria-expanded="isMenuOpen"
      aria-controls="meniu-mobil"
      @click="isMenuOpen ? closeMenu() : (isMenuOpen = true)"
    >
      <AppIcon v-if="isMenuOpen" name="x" />
      <AppIcon v-else name="menu" />
    </button>

    <nav v-if="isMenuOpen" id="meniu-mobil" class="mobile-nav" aria-label="Navigație mobilă">
      <a v-for="link in NAV_LINKS" :key="link.href" :href="link.href" @click="closeMenu()">
        {{ link.label }}
      </a>
      <a class="button-primary" href="#contact" @click="closeMenu()">Înscrieri deschise</a>
    </nav>
  </header>
</template>
<style>
.site-nav {
  z-index: 40;
  border-bottom: 1px solid color-mix(in oklab, var(--foreground) 16%, transparent);
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: min(100% - 40px, 1360px);
  height: 96px;
  display: grid;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  color: var(--secondary-foreground);
}

.desktop-nav {
  text-transform: uppercase;
  justify-content: center;
  gap: clamp(20px, 3vw, 44px);
  font-size: 11px;
  font-weight: 700;
  display: flex;
}

.desktop-nav a {
  padding-block: 12px;
  transition: color 0.2s;
}

.desktop-nav a:hover {
  color: var(--primary);
}

.menu-button,
.mobile-nav {
  display: none;
}

@media (max-width: 900px) {
  .site-nav {
    grid-template-columns: 1fr auto;
    height: 78px;
  }

  .desktop-nav,
  .nav-cta {
    display: none;
  }

  .menu-button {
    border: 1px solid color-mix(in oklab, var(--secondary-foreground) 35%, transparent);
    place-items: center;
    width: 44px;
    height: 44px;
    display: grid;
    color: inherit;
    background: none;
  }

  .mobile-nav {
    background: var(--secondary);
    border-top: 1px solid color-mix(in oklab, var(--secondary-foreground) 18%, transparent);
    flex-direction: column;
    padding: 28px max(28px, env(safe-area-inset-right, 0px)) 28px
      max(28px, env(safe-area-inset-left, 0px));
    max-height: calc(100svh - 78px);
    overflow-y: auto;
    overscroll-behavior: contain;
    display: flex;
    position: absolute;
    top: 78px;
    left: 0;
    right: 0;
  }

  .mobile-nav > a:not(.button-primary) {
    border-bottom: 1px solid color-mix(in oklab, var(--secondary-foreground) 14%, transparent);
    padding: 16px 0;
    font-family: var(--font-display);
    text-transform: uppercase;
    font-size: 28px;
    font-weight: 700;
  }

  .mobile-nav .button-primary {
    margin-top: 24px;
  }
}
</style>
