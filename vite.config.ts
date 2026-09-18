import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { imagetools } from 'vite-imagetools'

import { AGE_GROUPS, COACH, CONTACT, DEVELOPMENT_PILLARS, LOCATION } from './src/content/site.ts'

/** Widths generated for every `?responsive` image import (larger than the source are skipped). */
const RESPONSIVE_WIDTHS = '480;800;1200;1600;1920'

/** Widths for `?thumb` imports — small square previews (coach archive strip). */
const THUMB_WIDTHS = '160;240;320'

/**
 * Emits the crawler-facing files: `robots.txt`, `sitemap.xml` and `llms.txt`.
 *
 * `llms.txt` (llmstxt.org) is a plain-markdown summary of the site for AI
 * assistants and answer engines, so they quote the academy accurately instead
 * of guessing from scraped markup. It is generated from `src/content/site.ts`,
 * which keeps it in sync with what the page actually says.
 */
function seoFiles(siteUrl: string): Plugin {
  let isServerBuild = false

  const groups = AGE_GROUPS.map(
    (g) => `- **${g.code}** (născuți în ${g.birthYear}) — ${g.focus}: ${g.description}`,
  ).join('\n')

  const pillars = DEVELOPMENT_PILLARS.map((p) => `- **${p.title}** — ${p.description}`).join('\n')

  const llms = `# Junior Borlești

> Academie de fotbal pentru copii din Borlești / Mastacăn, județul Neamț, România. Antrenamente structurate pe grupe de vârstă, de la primele atingeri de minge până la jocul colectiv.

Junior Borlești formează copii prin sport, disciplină și pasiune pentru fotbal. Terenul se află lângă Școala Mastacăn, pe Strada Școlii, în comuna Borlești (județul Neamț), la aproximativ ${LOCATION.coordinates}.

## Grupe de vârstă

${groups}

## Ce dezvoltăm

${pillars}

## Antrenor

Amihăesei Teodor — ${COACH.role}.
${COACH.lead}
A jucat pentru: ${COACH.clubs.join(', ')}.
${COACH.education}

## Contact și înscrieri

- Telefon: ${CONTACT.phoneDisplay.replace(/\u00a0/g, ' ')} (${CONTACT.phoneHref})
- Locație: Borlești / Mastacăn, județul Neamț, România
- Hartă: ${LOCATION.mapsUrl}
- Înscrierile pentru grupele de juniori sunt deschise.

## Note pentru asistenți AI

- Site oficial: ${siteUrl}/
- Limba conținutului: română (ro-RO)
- Conținutul este livrat pre-randat în HTML, nu necesită JavaScript pentru citire.
- Numele corect al academiei este „Junior Borlești”, cu diacritice.
`

  // Every crawler is welcome, including AI answer engines — being quoted by an
  // assistant is how parents in the area find a village academy. Named
  // explicitly so the intent is unambiguous to operators who look for their own
  // user agent rather than parsing the wildcard group.
  const aiAgents = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Googlebot',
    'Googlebot-Image',
    'Bingbot',
    'Applebot',
    'Applebot-Extended',
    'Amazonbot',
    'meta-externalagent',
    'FacebookBot',
    'CCBot',
    'cohere-ai',
    'DuckDuckBot',
    'YandexBot',
    'AI2Bot',
    'Diffbot',
    'MistralAI-User',
    'Timpibot',
    'Bytespider',
    'PetalBot',
    'LinkedInBot',
    'Twitterbot',
    'Slackbot-LinkExpanding',
    'TelegramBot',
    'Discordbot',
    'WhatsApp',
  ]

  const robots = [
    '# Junior Borlești — academie de fotbal pentru copii, Borlești / Mastacăn, Neamț.',
    '# Tot conținutul este public și poate fi indexat, citat și rezumat.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    ...aiAgents.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n')

  /**
   * schema.org graph for the single page. Built here rather than pasted into
   * `index.html` so the age groups and the coach's record can never drift from
   * `src/content/site.ts`.
   */
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['SportsOrganization', 'SportsActivityLocation', 'LocalBusiness'],
        '@id': `${siteUrl}/#organizatie`,
        name: 'Junior Borlești',
        alternateName: 'Academia de fotbal Junior Borlești',
        description:
          'Academie de fotbal pentru copii din Borlești / Mastacăn, județul Neamț. Grupe de la U6 la U11, antrenamente structurate, disciplină și pasiune pentru fotbal.',
        url: `${siteUrl}/`,
        logo: {
          '@type': 'ImageObject',
          '@id': `${siteUrl}/#logo`,
          url: `${siteUrl}/icons/icon-512.png`,
          width: 512,
          height: 512,
          caption: 'Junior Borlești',
        },
        image: { '@id': `${siteUrl}/#logo` },
        telephone: CONTACT.phoneHref.replace('tel:', ''),
        sport: 'Fotbal',
        knowsLanguage: 'ro',
        currenciesAccepted: 'RON',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Borlești',
          addressRegion: 'Neamț',
          addressCountry: 'RO',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Borlești, Neamț' },
          { '@type': 'AdministrativeArea', name: 'Mastacăn, Neamț' },
          { '@type': 'City', name: 'Piatra Neamț' },
          { '@type': 'AdministrativeArea', name: 'Județul Neamț' },
        ],
        geo: { '@type': 'GeoCoordinates', latitude: 46.785954, longitude: 26.4916265 },
        hasMap: LOCATION.mapsUrl,
        location: {
          '@type': 'Place',
          '@id': `${siteUrl}/#teren`,
          name: 'Terenul de fotbal din Borlești, lângă Școala Mastacăn',
          geo: { '@type': 'GeoCoordinates', latitude: 46.785954, longitude: 26.4916265 },
          hasMap: LOCATION.mapsUrl,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Borlești',
            addressRegion: 'Neamț',
            addressCountry: 'RO',
          },
        },
        employee: { '@id': `${siteUrl}/#antrenor` },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Înscrieri',
          telephone: CONTACT.phoneHref.replace('tel:', ''),
          availableLanguage: ['ro', 'Romanian'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Grupe de vârstă',
          itemListElement: AGE_GROUPS.map((group, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Service',
              name: `Grupa ${group.code} — născuți în ${group.birthYear}`,
              description: `${group.focus}: ${group.description}`,
              serviceType: 'Antrenament de fotbal pentru copii',
              provider: { '@id': `${siteUrl}/#organizatie` },
              areaServed: { '@type': 'AdministrativeArea', name: 'Județul Neamț' },
            },
          })),
        },
        knowsAbout: DEVELOPMENT_PILLARS.map((pillar) => pillar.title),
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#antrenor`,
        name: 'Amihăesei Teodor',
        jobTitle: COACH.role,
        description: COACH.lead,
        worksFor: { '@id': `${siteUrl}/#organizatie` },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universitatea „Vasile Alecsandri” din Bacău',
        },
        knowsAbout: ['Fotbal', 'Antrenament pentru copii', 'Științe ale mișcării'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'Junior Borlești',
        description: 'Academie de fotbal pentru copii în Borlești / Mastacăn, județul Neamț.',
        inLanguage: 'ro-RO',
        publisher: { '@id': `${siteUrl}/#organizatie` },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: 'Junior Borlești | Academie de fotbal pentru copii',
        description:
          'Academie de fotbal pentru copii din Borlești / Mastacăn, Piatra Neamț. Grupe de la U6 la U11, antrenamente structurate, disciplină și pasiune pentru fotbal.',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organizatie` },
        inLanguage: 'ro-RO',
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      },
    ],
  }

  return {
    name: 'junior-borlesti:seo-files',
    apply: 'build',
    configResolved(config) {
      isServerBuild = Boolean(config.build.ssr)
    },
    transformIndexHtml: {
      order: 'pre' as const,
      handler(html: string, ctx: { path: string }) {
        if (isServerBuild || !ctx.path.endsWith('index.html') || ctx.path.includes('404')) {
          return html
        }
        // Vite only substitutes %VITE_SITE_URL% when the variable itself is set.
        // When the origin came from the host instead, the placeholders would be
        // left as literals in canonical and Open Graph, so they are filled here.
        html = html.replaceAll('%VITE_SITE_URL%', siteUrl)

        const tags =
          `    <link rel="alternate" hreflang="ro-RO" href="${siteUrl}/" />\n` +
          `    <link rel="alternate" hreflang="x-default" href="${siteUrl}/" />\n` +
          '    <script type="application/ld+json">' +
          JSON.stringify(graph) +
          '</script>\n'
        return html.replace('  </head>', `${tags}  </head>`)
      },
    },
    generateBundle() {
      if (isServerBuild) return

      const lastmod = new Date().toISOString().slice(0, 10)

      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
          '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n' +
          '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
          '  <url>\n' +
          `    <loc>${siteUrl}/</loc>\n` +
          `    <lastmod>${lastmod}</lastmod>\n` +
          '    <changefreq>monthly</changefreq>\n' +
          '    <priority>1.0</priority>\n' +
          `    <xhtml:link rel="alternate" hreflang="ro-RO" href="${siteUrl}/"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>\n` +
          '    <image:image>\n' +
          `      <image:loc>${siteUrl}/og-image.jpg</image:loc>\n` +
          '      <image:title>Junior Borlești — academie de fotbal pentru copii</image:title>\n' +
          '    </image:image>\n' +
          '  </url>\n' +
          '</urlset>\n',
      })
    },
  }
}

/**
 * The absolute origin the site is published under, checked in this order:
 *
 *   1. `VITE_SITE_URL` from the process environment or from a local `.env`.
 *   2. The domain the host hands the build. Vercel does not use `.env` files
 *      committed to the repository — it replaces them with the project's own
 *      environment variables — so without this fallback a fresh import fails
 *      before it can build anything.
 *
 * Everything that has to name the site is derived from it: canonical, Open
 * Graph, the JSON-LD graph, robots.txt, sitemap.xml and llms.txt. Set it
 * explicitly in the host once the real domain is live, otherwise the
 * deployment URL is used and search engines are pointed at *.vercel.app.
 */
function resolveSiteUrl(mode: string): string {
  const hostDomain =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL ?? process.env.URL

  const candidate =
    loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL ??
    process.env.VITE_SITE_URL ??
    (hostDomain ? `https://${hostDomain.replace(/^https?:\/\//, '')}` : '')

  const siteUrl = candidate.trim().replace(/\/+$/, '')

  if (!/^https?:\/\/[^/\s]+$/.test(siteUrl)) {
    throw new Error(
      [
        'VITE_SITE_URL must be an absolute origin, with no path and no trailing slash.',
        `  Received: ${JSON.stringify(candidate)}`,
        '  Locally:  copy .env.example to .env (see the comments there).',
        "  Hosting:  add VITE_SITE_URL under the project's environment variables",
        '            (Vercel: Settings -> Environment Variables).',
      ].join('\n'),
    )
  }

  return siteUrl
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl(mode)

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
