import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { imagetools } from 'vite-imagetools'

/** Widths generated for every `?responsive` image import (larger than the source are skipped). */
const RESPONSIVE_WIDTHS = '480;800;1200;1600;1920'

/** Widths for `?thumb` imports — small square previews (coach archive strip). */
const THUMB_WIDTHS = '160;240;320'

/** Emits `robots.txt` and `sitemap.xml` for the configured public site URL. */
function seoFiles(siteUrl: string): Plugin {
  let isServerBuild = false

  return {
    name: 'junior-borlesti:seo-files',
    apply: 'build',
    configResolved(config) {
      isServerBuild = Boolean(config.build.ssr)
    },
    generateBundle() {
      if (isServerBuild) return

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `  <url>\n    <loc>${siteUrl}/</loc>\n  </url>\n` +
          '</urlset>\n',
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

  if (!/^https?:\/\/[^/\s]+$/.test(siteUrl)) {
    throw new Error(
      'VITE_SITE_URL must be an absolute origin without a path or trailing slash (see .env.example).',
    )
  }

  return {
    plugins: [
      vue(),
      tailwindcss(),
      imagetools({
        defaultDirectives: (url) => {
          if (url.searchParams.has('responsive')) {
            return new URLSearchParams({
              w: RESPONSIVE_WIDTHS,
              format: 'avif;webp;jpg',
              as: 'picture',
            })
          }
          if (url.searchParams.has('thumb')) {
            return new URLSearchParams({ w: THUMB_WIDTHS, format: 'avif;webp;jpg', as: 'picture' })
          }
          return new URLSearchParams()
        },
      }),
      seoFiles(siteUrl),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      // Lightning CSS emits fallbacks (e.g. for color-mix()) for these browsers without changing modern output.
      cssTarget: ['chrome100', 'safari15', 'firefox100', 'edge100'],
      // Keep image variants as files so the prerendered HTML and the client bundle share the same URLs.
      assetsInlineLimit: 0,
      // One stylesheet for both pages: fewer render-blocking requests on the critical path.
      cssCodeSplit: false,
      rolldownOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
        },
      },
    },
  }
})
