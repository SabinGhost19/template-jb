/**
 * Resolves a path inside `/public` against Vite's configured `base`, so the
 * site keeps working when deployed under a sub-path.
 */
export function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${path.replace(/^\/+/, '')}`
}
