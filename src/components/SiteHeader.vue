<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import BrandMark from '@/components/BrandMark.vue'
import { NAV_LINKS } from '@/content/site'
</script>

<template>
  <!--
    Below 900px the bar keeps only the logo: the page is read by scrolling, so
    the links and the call to action step aside. They stay in the markup for
    crawlers and for anyone who resizes a window back up.
  -->
  <header class="site-nav">
    <BrandMark />

    <nav class="desktop-nav" aria-label="Navigație principală">
      <a v-for="link in NAV_LINKS" :key="link.href" :href="link.href">{{ link.label }}</a>
    </nav>

    <a class="nav-cta" href="#contact">
      Înscrieri deschise <AppIcon name="arrow-right" :size="16" />
    </a>
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

@media (max-width: 900px) {
  .site-nav {
    grid-template-columns: 1fr;
    justify-items: center;
    height: 76px;
  }

  .desktop-nav,
  .nav-cta {
    display: none;
  }
}
</style>
