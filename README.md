# Junior Borlești — website

Site de prezentare pentru academia de fotbal **Junior Borlești** (Borlești / Mastacăn, Piatra Neamț).
Reproducere fidelă a designului de referință, construită ca site static production-grade cu
**Vue 3 + TypeScript + Vite**, prerandat la build (HTML complet fără JavaScript, hidratat apoi de Vue).

## Cerințe

- Node.js `^20.19 || >=22.12` (vezi `.nvmrc`)
- npm 10+

## Comenzi

| Comandă              | Descriere                                                         |
| -------------------- | ----------------------------------------------------------------- |
| `npm install`        | instalează dependențele                                           |
| `npm run dev`        | server de dezvoltare cu HMR                                       |
| `npm run build`      | type-check → build client → prerender HTML; rezultatul în `dist/` |
| `npm run preview`    | servește local build-ul de producție                              |
| `npm run type-check` | `vue-tsc` fără emit                                               |
| `npm run lint`       | ESLint (cu auto-fix); `npm run lint:check` doar verifică          |
| `npm run format`     | Prettier; `npm run format:check` doar verifică                    |

## Configurare (domeniu)

Singura variabilă de mediu este publică și stă în `.env`:

```
VITE_SITE_URL=https://juniorborlesti.ro
```

Este folosită pentru `canonical`, Open Graph, datele structurate (JSON-LD), `robots.txt` și
`sitemap.xml`. La mutarea pe alt domeniu se schimbă doar această valoare. Build-ul eșuează
explicit dacă valoarea lipsește sau nu este o origine absolută. Nu pune niciodată secrete în
variabile `VITE_*` — sunt încorporate în bundle-ul public.

## Imagini

Fotografiile sursă stau în `src/assets/images/` și sunt mapate într-un singur loc:
`src/config/images.ts`. La build, `vite-imagetools` generează automat pentru fiecare imagine
variante AVIF + WebP + JPEG la lățimile 480–1920 px, servite prin `<picture>` cu `srcset`/`sizes`.

- Înlocuiește un fișier păstrând același nume → site-ul se actualizează fără alte modificări.
- Dacă schimbi numele fișierului, actualizează calea în `src/config/images.ts`.
- Recomandare: cel puțin 1600 px pe latura lungă (1920 px pentru hero).

Detalii: `src/assets/images/README.md`.

## Conținut

- Navigație, grupe, principii, referințe antrenor, contact și locație: `src/content/site.ts`
- Titlurile secțiunilor (cu întreruperi de linie intenționate) stau în componentele respective.
- Metadate SEO / Open Graph / JSON-LD: `index.html`. Pagina 404: `404.html`.

## Structură

```
├── index.html               # pagina principală (metadate, preload fonturi + LCP)
├── 404.html                 # pagină de eroare branduită
├── vercel.json              # framework, build, headere de securitate și cache
├── .github/workflows/ci.yml # type-check + lint + format + build la fiecare push
├── scripts/
│   ├── prerender.mjs        # SSR → dist/index.html, injectează preload-ul imaginii LCP
│   ├── build-brand.py       # logo, iconuri, favicon, og-image din brand.png
│   └── subset-fonts.py      # re-subsetează fonturile la caracterele folosite
├── public/
│   ├── _headers             # aceleași headere pentru Netlify / Cloudflare Pages
│   ├── brand/               # logo SVG colorat, pentru pagina statică 404 și uz extern
│   ├── fonts/               # Barlow Condensed + Manrope, self-hosted și subsetate
│   └── icons/, favicon.ico, og-image.jpg, site.webmanifest
└── src/
    ├── assets/brand/        # logo vectorizat + manualul de brand (paletă, reguli)
    ├── assets/images/       # fotografiile sursă
    ├── components/          # câte o componentă per secțiune, cu CSS-ul colocat
    ├── composables/         # useEscapeKey
    ├── config/              # images.ts — maparea imaginilor
    ├── content/             # site.ts — conținut editorial
    ├── styles/              # fonts.css, tokens.css, base.css, print.css, main.css
    ├── entry-server.ts      # entry pentru prerender
    ├── main.ts              # entry client (hidratare amânată)
    └── not-found.ts         # entry pentru 404.html
```

## Design system

Paleta este derivată din logo, nu aleasă lângă el: galbenul `#FAC819` și negrul `#0B0A0A` sunt
eșantionate din `src/assets/images/brand.png`. Tokenii (OKLCH, cu fallback sRGB generat la build)
stau în `src/styles/tokens.css`; manualul de brand — paletă completă, spațiu de gardă, dimensiuni
minime, utilizări greșite — în `src/assets/brand/README.md`.

Fonturi: `Barlow Condensed` pentru titluri, `Manrope` pentru text, self-hostate și re-subsetate la
caracterele folosite, cu fallback-uri cu metrici potrivite ca schimbarea fontului să nu mute
layoutul. Primitivele de layout (`.page-shell`, `.section-pad`, `.eyebrow`, butoane) sunt în
`src/styles/base.css`. Tailwind este folosit doar pentru Preflight.

Breakpoints: `1100px`, `900px` (tabletă), `860px`, `640px` (mobil), `560px`, `380px`. Sub `640px`
totul se aliniază pe o singură axă centrată, iar butoanele își iau lățimea din etichetă.

## Performanță

- **Prerandare** — HTML complet fără JavaScript; hidratarea Vue e amânată până la `requestIdleCallback`
  sau prima atingere, deci bundle-ul iese de pe calea critică.
- **Imagini** — AVIF/WebP/JPEG la mai multe lățimi, preload pentru imaginea LCP, culoare de
  placeholder per imagine (`bg` în `src/config/images.ts`), `content-visibility` pe secțiunile de sub fold.
- **Fonturi** — subsetate (185 KB → 83 KB) și cu fallback-uri metric-matched.

Primul ecran pe telefon: ~78 KB, din care 0 KB JavaScript.

## SEO și asistenți AI

Generate la build din `src/content/site.ts`, deci nu se pot desincroniza de conținut:

- `robots.txt` — acces permis explicit pentru 34 de crawlere, inclusiv cele AI.
- `sitemap.xml` — cu `lastmod`, `hreflang` și intrare de imagine.
- `llms.txt` — rezumat în markdown pentru asistenți AI ([llmstxt.org](https://llmstxt.org)).
- JSON-LD `@graph` — `SportsOrganization` + `LocalBusiness`, antrenorul ca `Person`, grupele de
  vârstă ca `OfferCatalog`, `WebSite` și `WebPage`.

## Deployment

`npm run build` produce un site complet static în `dist/`. Nu există server, bază de date sau
funcții — orice hosting static funcționează.

### Vercel (recomandat)

1. Push pe GitHub.
2. Pe [vercel.com/new](https://vercel.com/new) importă repository-ul.
3. Nu schimba nimic în ecranul de configurare — `vercel.json` fixează deja framework-ul,
   comanda de build (`npm run build`) și directorul de ieșire (`dist`).
4. Deploy.

`VITE_SITE_URL` este versionat în `.env` (este o valoare publică, nu un secret), deci build-ul
merge fără nicio variabilă setată în Vercel. **Dacă publici pe alt domeniu, schimbă valoarea
acolo înainte de primul deploy** — din ea se generează `canonical`, Open Graph, JSON-LD,
`sitemap.xml` și `robots.txt`. Alternativ, suprascrie `VITE_SITE_URL` din Settings → Environment
Variables în Vercel.

Domeniul propriu se leagă din Settings → Domains. Până când domeniul e activ, `canonical` va
indica spre el, nu spre `*.vercel.app` — corect pentru indexare, dar înseamnă că previzualizările
nu trebuie trimise la indexat.

### Alte platforme

- **Netlify / Cloudflare Pages**: `dist/_headers` este aplicat automat; `404.html` este servit
  pentru rute inexistente.
- **Alt server (nginx etc.)**: replică headerele din `public/_headers` și rutează 404 → `/404.html`.

CSP-ul este strict (`default-src 'self'`, fără inline scripts/styles). Dacă adaugi un serviciu
extern (analytics, hărți embed), extinde directivele corespunzătoare în `public/_headers` și
`vercel.json`.

## Analytics

Nu este instalat niciun serviciu de analytics sau tracking și nu există cookie-uri, deci nu este
necesar un banner de consimțământ. Punctul de integrare, dacă va fi nevoie: `index.html` (script)

- directivele `script-src`/`connect-src` din CSP. Orice serviciu care setează cookie-uri
  non-esențiale necesită o implementare separată a consimțământului.
