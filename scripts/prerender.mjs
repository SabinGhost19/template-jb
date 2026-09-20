/**
 * Prerenders the single page to static HTML after the client build:
 *   1. builds the SSR entry into dist/server,
 *   2. renders the app to a string,
 *   3. injects the markup into dist/index.html (the client bundle hydrates it),
 *   4. preloads the hero image, which is the LCP element,
 *   5. removes the temporary server build.
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { build } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const distDir = path.join(root, 'dist')
const serverDir = path.join(distDir, 'server')
const indexFile = path.join(distDir, 'index.html')
const mountPoint = '<div id="app"></div>'

await build({
  root,
  configFile: path.join(root, 'vite.config.ts'),
  logLevel: 'warn',
  build: {
    ssr: path.join(root, 'src/entry-server.ts'),
    outDir: serverDir,
    emptyOutDir: true,
    ssrEmitAssets: false,
  },
})

try {
  const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
  const template = await readFile(indexFile, 'utf8')

  if (!template.includes(mountPoint)) {
    throw new Error(`Mount point ${mountPoint} not found in ${indexFile}`)
  }

  const body = await render()
  const html = injectHeroPreload(template, body).replace(mountPoint, `<div id="app">${body}</div>`)
  await writeFile(indexFile, html)
  console.log('prerendered dist/index.html')
} finally {
  await rm(serverDir, { recursive: true, force: true })
}

/**
 * The hero image is the LCP element, but the browser only discovers it after
 * the render-blocking stylesheet has been fetched and parsed. A `<link
 * rel="preload">` carrying the same srcset starts that download during head
 * parsing instead. The `type` attribute means a browser without AVIF support
 * simply skips the preload and falls back to the `<picture>` negotiation.
 */
function injectHeroPreload(template, body) {
  // Anchored on the element, not on a file name: the hero photograph gets
  // replaced from time to time, and a regex that knows its name goes quiet the
  // moment it does — the preload simply stops being emitted, with nothing
  // failing. Vue's SSR output interleaves `<!--[-->` markers between <picture>
  // and <source>, so the sources are found by scanning back from the <img>.
  const imgAt = body.indexOf('class="hero-image"')
  const sources =
    imgAt === -1
      ? []
      : [
          ...body
            .slice(0, imgAt)
            .matchAll(/<source type="image\/avif" srcset="([^"]+)" sizes="([^"]+)"/g),
        ]
  const hero = sources.at(-1)

  if (!hero) {
    console.warn('hero preload skipped: no AVIF source found in the rendered markup')
    return template
  }

  const [, srcset, sizes] = hero
  const tag =
    `    <link rel="preload" as="image" type="image/avif" fetchpriority="high" ` +
    `imagesrcset="${srcset}" imagesizes="${sizes}" />\n`

  return template.replace('  </head>', `${tag}  </head>`)
}
