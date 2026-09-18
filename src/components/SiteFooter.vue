<script setup lang="ts">
import BrandMark from '@/components/BrandMark.vue'
import { CONTACT } from '@/content/site'
</script>

<template>
  <footer class="footer">
    <div class="page-shell footer-main">
      <BrandMark />
      <p>Mai mult decât fotbal.</p>
      <a :href="CONTACT.phoneHref">{{ CONTACT.phoneDisplay }}</a>
    </div>
    <div class="page-shell footer-bottom">
      <span>© 2026 Junior Borlești</span>
      <span>Borlești, Neamț</span>
    </div>
  </footer>
</template>

<style>
.footer {
  border-top: 1px solid color-mix(in oklab, var(--secondary-foreground) 16%, transparent);
}

.footer-main {
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  min-height: 180px;
  display: grid;
}

.footer-main > p {
  color: var(--primary);
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: 24px;
  font-style: italic;
}

.footer-main > a:last-child {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
}

.footer-bottom {
  border-top: 1px solid color-mix(in oklab, var(--secondary-foreground) 12%, transparent);
  justify-content: space-between;
  padding-block: 18px;
  padding-bottom: calc(18px + env(safe-area-inset-bottom, 0px));
  display: flex;
  color: var(--muted-foreground);
  text-transform: uppercase;
  font-size: 9px;
}

@media (max-width: 640px) {
  .footer-main {
    grid-template-columns: 1fr auto;
    gap: 30px;
    padding-block: 48px;
  }

  .footer-main > p {
    grid-column: 1 / -1;
    margin: 0;
  }

  .footer-main > a:last-child {
    grid-column: 1 / -1;
  }
}
</style>
