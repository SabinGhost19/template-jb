<template>
  <section class="philosophy-section section-pad" aria-labelledby="filosofie-titlu">
    <div class="page-shell philosophy-grid">
      <p class="eyebrow">Filosofia noastră</p>
      <h2 id="filosofie-titlu">NU FORMĂM DOAR<br /><span>FOTBALIȘTI.</span></h2>
      <p class="philosophy-copy">
        Formăm copii responsabili, disciplinați și pasionați de sport, într-un cadru modern, pozitiv
        și prietenos.
      </p>
      <div class="values">
        <span>Respect.</span>
        <span>Disciplină.</span>
        <span>Pasiune.</span>
      </div>
    </div>
  </section>
</template>

<style>
.philosophy-section {
  background: var(--pitch);
  color: var(--secondary-foreground);
}

.philosophy-grid {
  grid-template-columns: 1fr 1fr;
  gap: 36px 80px;
  display: grid;
}

.philosophy-grid .eyebrow {
  grid-column: 1 / -1;
}

.philosophy-grid h2 {
  font-family: var(--font-display);
  text-transform: uppercase;
  grid-column: 1 / -1;
  margin: 28px 0 24px;
  font-size: clamp(60px, 9.2vw, 140px);
  font-weight: 800;
  line-height: 0.96;
}

.philosophy-grid h2 span {
  color: var(--primary);
}

.philosophy-copy {
  max-width: 480px;
  margin: 0;
  font-size: 17px;
  line-height: 1.7;
}

.values {
  color: var(--primary);
  font-family: var(--font-display);
  text-transform: uppercase;
  flex-direction: column;
  font-size: clamp(26px, 3vw, 42px);
  font-weight: 700;
  display: flex;
}

@media (max-width: 640px) {
  .philosophy-grid {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .philosophy-grid .eyebrow,
  .philosophy-grid h2 {
    grid-column: 1;
  }

  .philosophy-grid h2 {
    font-size: 62px;
  }
}
</style>
