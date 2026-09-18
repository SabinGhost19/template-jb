import { createApp, createSSRApp } from 'vue'

import '@/styles/main.css'
import '@/styles/print.css'
import App from './App.vue'

const root = document.getElementById('app')

if (!root) {
  throw new Error('Elementul rădăcină #app lipsește din document.')
}

const target = root

function mount() {
  // The production build ships prerendered markup that only needs hydration;
  // the dev server starts from an empty root and mounts normally.
  const app = target.hasChildNodes() ? createSSRApp(App) : createApp(App)
  app.mount(target)
}

if (!target.hasChildNodes()) {
  mount()
} else {
  /*
   * The prerendered page is already readable and scrollable, and the only
   * things that need Vue are the mobile menu, the gallery lightbox and the
   * coach archive. So hydration waits for the browser to go idle — which keeps
   * the main thread free while the hero image and fonts land — or for the first
   * real interaction, whichever comes first.
   *
   * Hydrating inside the `pointerdown`/`touchstart`/`keydown` handler is
   * synchronous, so Vue's listeners exist before the matching `click` fires:
   * a tap on the menu button during that window still opens the menu.
   */
  const WAKE_EVENTS = ['pointerdown', 'touchstart', 'keydown'] as const
  let hydrated = false

  const hydrate = () => {
    if (hydrated) return
    hydrated = true
    for (const event of WAKE_EVENTS) document.removeEventListener(event, hydrate)
    mount()
  }

  for (const event of WAKE_EVENTS) {
    document.addEventListener(event, hydrate, { passive: true })
  }

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(hydrate, { timeout: 3000 })
  } else {
    setTimeout(hydrate, 1500)
  }
}
