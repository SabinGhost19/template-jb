import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

import App from './App.vue'

/** Renders the whole page to static HTML (used by `scripts/prerender.mjs`). */
export function render(): Promise<string> {
  return renderToString(createSSRApp(App))
}
