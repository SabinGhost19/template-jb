<script setup lang="ts">
import ResponsivePicture from '@/components/ResponsivePicture.vue'
import { images } from '@/config/images'
</script>

<template>
  <section id="academie" class="intro-section section-pad" aria-labelledby="academie-titlu">
    <div class="page-shell intro-grid">
      <div class="intro-copy">
        <p class="eyebrow dark">Mai mult decât un antrenament</p>
        <h2 id="academie-titlu">FOTBAL PENTRU<br /><em>VIITOR</em></h2>
        <p>
          Dăm startul unei experiențe în care fiecare copil învață să joace, să aibă încredere și să
          crească alături de o echipă.
        </p>
      </div>

      <figure class="intro-image-wrap">
        <ResponsivePicture
          :picture="images.academy.picture"
          :alt="images.academy.alt"
          :sizes="images.academy.sizes"
          :background="images.academy.bg"
        />
        <figcaption>Metodă. Energie. Bucuria jocului.</figcaption>
      </figure>
    </div>
  </section>
</template>

<style>
.intro-grid {
  grid-template-columns: 1.1fr 1fr;
  align-items: start;
  gap: clamp(30px, 5vw, 80px);
  display: grid;
}

.intro-copy > p:last-child {
  max-width: 560px;
  color: var(--muted-foreground);
  font-size: 16px;
  line-height: 1.8;
}

.intro-image-wrap {
  margin: 70px 0 0;
}

.intro-image-wrap img {
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: saturate(0.8);
  width: 100%;
  display: block;
}

.intro-image-wrap figcaption {
  color: var(--muted-foreground);
  text-transform: uppercase;
  margin-top: 12px;
  font-size: 10px;
}

@media (max-width: 900px) {
  .intro-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .intro-grid {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .intro-image-wrap {
    margin-top: 10px;
  }

  .intro-image-wrap img {
    aspect-ratio: 4 / 3;
  }

  .intro-image-wrap figcaption {
    display: none;
  }
}
</style>
