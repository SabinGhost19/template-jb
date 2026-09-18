<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import ResponsivePicture from '@/components/ResponsivePicture.vue'
import { images } from '@/config/images'
import { LOCATION } from '@/content/site'
</script>

<template>
  <section class="location-section section-pad" aria-labelledby="locatie-titlu">
    <div class="page-shell location-grid">
      <div>
        <p class="eyebrow">Unde ne găsești</p>
        <h2 id="locatie-titlu">BORLEȘTI<br /><span>MASTACĂN</span></h2>
        <p class="location-copy">
          <AppIcon name="map-pin" :size="20" /> Terenul de fotbal de lângă Școala Mastacăn<br />Borlești
          / Mastacăn, Neamț
        </p>
        <a class="text-link" :href="LOCATION.mapsUrl" target="_blank" rel="noreferrer">
          Deschide în Google Maps <AppIcon name="arrow-right" :size="17" />
        </a>
      </div>

      <figure class="location-map">
        <a
          :href="LOCATION.mapsUrl"
          target="_blank"
          rel="noreferrer"
          aria-label="Deschide locația în Google Maps"
        >
          <ResponsivePicture
            :picture="images.location.picture"
            :alt="images.location.alt"
            :sizes="images.location.sizes"
          />
        </a>
        <figcaption>{{ LOCATION.coordinates }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<style>
.location-grid {
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  gap: 100px;
  display: grid;
}

.location-grid h2 {
  margin-block: 28px;
}

.location-grid h2 span {
  color: var(--primary);
}

.location-copy {
  color: var(--muted-foreground);
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.8;
  display: flex;
}

.location-copy svg {
  color: var(--primary);
  flex: none;
}

.text-link {
  border-bottom: 1px solid var(--primary);
  color: var(--primary);
  text-transform: uppercase;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  padding-bottom: 7px;
  font-size: 11px;
  font-weight: 800;
  display: inline-flex;
}

.location-map {
  border: 1px solid color-mix(in oklab, var(--secondary-foreground) 20%, transparent);
  margin: 0;
  position: relative;
  overflow: hidden;
}

.location-map a {
  display: block;
}

.location-map img {
  aspect-ratio: 3 / 2;
  object-fit: cover;
  width: 100%;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  display: block;
}

.location-map a:hover img {
  transform: scale(1.02);
}

.location-map figcaption {
  background: color-mix(in oklab, var(--secondary) 82%, transparent);
  color: var(--secondary-foreground);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 8px 12px;
  font-size: 9px;
  font-weight: 800;
  position: absolute;
  bottom: 0;
  right: 0;
}

@media (max-width: 640px) {
  .location-grid {
    grid-template-columns: 1fr;
    gap: 54px;
  }
}
</style>
