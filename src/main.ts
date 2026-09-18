import { createApp, createSSRApp } from 'vue'

import '@/styles/main.css'
import '@/styles/print.css'
import App from './App.vue'

const root = document.getElementById('app')

if (!root) {
  throw new Error('Elementul rădăcină #app lipsește din document.')
}

// The production build ships prerendered markup that only needs hydration;
// the dev server starts from an empty root and mounts normally.
const app = root.hasChildNodes() ? createSSRApp(App) : createApp(App)

app.mount(root)
