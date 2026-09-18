<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'

import { CONTACT } from '@/content/site'
</script>

<template>
  <section id="contact" class="cta-section" aria-labelledby="contact-titlu">
    <div class="page-shell cta-inner">
      <p class="eyebrow dark">Înscrieri 2026</p>
      <h2 id="contact-titlu">VIITORII CAMPIONI<br /><em>ÎNCEP AICI.</em></h2>
      <p>Înscrierile pentru grupele de juniori sunt deschise.</p>

      <div class="cta-actions">
        <a class="button-dark" :href="CONTACT.phoneHref">
          Înscrie-ți copilul <AppIcon name="arrow-right" :size="18" />
        </a>
        <a class="phone-link" :href="CONTACT.phoneHref">
          <AppIcon name="phone" :size="20" /> {{ CONTACT.phoneDisplay }}
        </a>
      </div>
    </div>
  </section>
</template>

<style>
.cta-section {
  background: var(--primary);
  color: var(--primary-foreground);
}

.cta-inner {
  text-align: center;
  padding-block: 110px;
}

.cta-inner h2 {
  margin-block: 28px;
  font-size: clamp(44px, 9vw, 132px);
}

.cta-inner h2 em {
  color: transparent;
  -webkit-text-stroke: 1px var(--foreground);
}

.cta-inner > p:not(.eyebrow) {
  margin: 0;
  font-size: 16px;
}

.cta-actions {
  justify-content: center;
  align-items: center;
  gap: 28px;
  margin-top: 38px;
  display: flex;
}

.phone-link {
  font-family: var(--font-display);
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  display: inline-flex;
}

@media (max-width: 640px) {
  .cta-inner {
    text-align: left;
    padding-block: 80px;
  }

  .cta-inner h2 {
    font-size: 62px;
  }

  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .phone-link {
    justify-content: center;
  }
}
</style>
