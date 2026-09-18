/**
 * Prerenders the single page to static HTML after the client build:
 *   1. builds the SSR entry into dist/server,
 *   2. renders the app to a string,
 *   3. injects the markup into dist/index.html (the client bundle hydrates it),
 *   4. removes the temporary server build.
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

  const html = template.replace(mountPoint, `<div id="app">${await render()}</div>`)
  await writeFile(indexFile, html)
  console.log('prerendered dist/index.html')
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
