<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import ResponsivePicture from '@/components/ResponsivePicture.vue'
import { images } from '@/config/images'
import { CONTACT } from '@/content/site'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <ResponsivePicture
      class="hero-image"
      :picture="images.hero.picture"
      :alt="images.hero.alt"
      :sizes="images.hero.sizes"
      loading="eager"
      fetchpriority="high"
    />
    <div class="hero-shade"></div>

    <div class="hero-content page-shell">
      <p class="eyebrow reveal">Academie de fotbal • Borlești, Neamț</p>
      <h1 id="hero-title" class="hero-title reveal">MAI MULT<br />DECÂT <span>FOTBAL.</span></h1>
      <p class="hero-copy reveal">Formăm copii prin sport, disciplină și pasiune pentru fotbal.</p>
      <div class="hero-actions reveal">
        <a class="button-primary" :href="CONTACT.phoneHref">
          Înscrie-te la Junior Borlești <AppIcon name="arrow-right" :size="18" />
        </a>
        <a class="button-ghost" href="#academie">
          Descoperă academia <AppIcon name="arrow-down" :size="17" />
        </a>
      </div>
    </div>

    <div class="hero-meta page-shell">
      <span>U6 — U15</span>
      <span>Borlești • Piatra Neamț</span>
      <a href="#academie" aria-label="Continuă spre conținut">
        <AppIcon name="arrow-down" :size="18" />
      </a>
    </div>
  </section>
</template>
<style>
.hero {
  background: var(--secondary);
  min-height: min(900px, 100svh);
  color: var(--secondary-foreground);
  position: relative;
}

.hero-image,
.hero-shade {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.hero-shade {
  /* Fallback for browsers without color-mix(); modern browsers use the declaration below. */
  background:
    linear-gradient(
      90deg,
      rgb(19 17 15 / 92%) 0%,
      rgb(19 17 15 / 65%) 45%,
      rgb(19 17 15 / 12%) 78%
    ),
    linear-gradient(0deg, rgb(19 17 15 / 72%), transparent 45%);
  background:
    linear-gradient(
      90deg,
      color-mix(in oklab, var(--secondary) 92%, transparent) 0%,
      color-mix(in oklab, var(--secondary) 65%, transparent) 45%,
      color-mix(in oklab, var(--secondary) 12%, transparent) 78%
    ),
    linear-gradient(0deg, color-mix(in oklab, var(--secondary) 72%, transparent), transparent 45%);
}

.hero-content {
  z-index: 2;
  flex-direction: column;
  justify-content: center;
  min-height: min(900px, 100svh);
  padding-top: 96px;
  display: flex;
  position: relative;
}

.hero-title {
  max-width: 900px;
  font-family: var(--font-display);
  text-transform: uppercase;
  margin: 24px 0 26px;
  font-size: clamp(44px, 9vw, 138px);
  font-weight: 800;
  line-height: 0.96;
}

.hero-title span {
  color: var(--primary);
}

.hero-copy {
  max-width: 480px;
  color: color-mix(in oklab, var(--secondary-foreground) 78%, transparent);
  margin: 0;
  font-size: clamp(16px, 1.4vw, 20px);
  line-height: 1.6;
}

.hero-actions {
  gap: 12px;
  margin-top: 36px;
  display: flex;
}

.hero-meta {
  z-index: 3;
  border-top: 1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent);
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 40px;
  padding-block: 24px;
  padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  display: grid;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
}

.hero-meta span:nth-child(2) {
  color: color-mix(in oklab, var(--secondary-foreground) 60%, transparent);
  justify-self: start;
}

.hero-meta a {
  border: 1px solid color-mix(in oklab, var(--secondary-foreground) 35%, transparent);
  place-items: center;
  width: 40px;
  height: 40px;
  display: grid;
  border-radius: 50%;
}

/* Entrance reveal (hero only) */
.reveal {
  animation: 0.8s both rise;
}

.reveal:nth-child(2) {
  animation-delay: 0.1s;
}

.reveal:nth-child(3) {
  animation-delay: 0.2s;
}

.reveal:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Landscape phones: a 100svh hero leaves no room for the title and buttons. */
@media (orientation: landscape) and (max-height: 620px) {
  .hero,
  .hero-content {
    min-height: 560px;
  }

  .hero-content {
    padding-top: 110px;
    padding-bottom: 72px;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 760px;
  }

  .hero-content {
    justify-content: flex-end;
    min-height: 760px;
    padding: 130px 0 150px;
  }

  .hero-image {
    object-position: 63% center;
  }

  .hero-shade {
    background: linear-gradient(
      0deg,
      var(--secondary) 4%,
      rgb(19 17 15 / 76%) 45%,
      rgb(19 17 15 / 28%) 100%
    );
    background: linear-gradient(
      0deg,
      var(--secondary) 4%,
      color-mix(in oklab, var(--secondary) 76%, transparent) 45%,
      color-mix(in oklab, var(--secondary) 28%, transparent) 100%
    );
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-meta {
    grid-template-columns: 1fr auto;
    gap: 8px;
    padding-block: 16px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  }

  .hero-meta span:nth-child(2) {
    grid-column: 1;
  }

  .hero-meta a {
    grid-area: 1 / 2 / 3;
  }
}
</style>
