<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import AcademySection from '@/components/AcademySection.vue'
import GroupsSection from '@/components/GroupsSection.vue'
import DevelopmentSection from '@/components/DevelopmentSection.vue'
import PhilosophySection from '@/components/PhilosophySection.vue'
import CoachSection from '@/components/CoachSection.vue'
import GallerySection from '@/components/GallerySection.vue'
import EnrollmentSection from '@/components/EnrollmentSection.vue'
import LocationSection from '@/components/LocationSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#top">Sari la conținut</a>
  <SiteHeader />
  <main id="top" class="overflow-hidden bg-background text-foreground">
    <HeroSection />
    <AcademySection />
    <GroupsSection />
    <DevelopmentSection />
    <PhilosophySection />
    <CoachSection />
    <GallerySection />
    <EnrollmentSection />
    <LocationSection />
  </main>
  <SiteFooter />
</template>
