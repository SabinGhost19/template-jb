# Junior Borlești — website

Site de prezentare pentru academia de fotbal **Junior Borlești** (Borlești / Mastacăn, Piatra Neamț).
Reproducere fidelă a designului de referință, construită ca site static production-grade cu
**Vue 3 + TypeScript + Vite**, prerandat la build (HTML complet fără JavaScript, hidratat apoi de Vue).

## Cerințe

- Node.js `^20.19 || >=22.12` (vezi `.nvmrc`)
- npm 10+

## Comenzi

| Comandă                | Descriere                                                              |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm install`          | instalează dependențele                                                |
| `npm run dev`          | server de dezvoltare cu HMR                                            |
| `npm run build`        | type-check → build client → prerender HTML; rezultatul în `dist/`      |
| `npm run preview`      | servește local build-ul de producție                                   |
| `npm run type-check`   | `vue-tsc` fără emit                                                    |
| `npm run lint`         | ESLint (cu auto-fix); `npm run lint:check` doar verifică               |
| `npm run format`       | Prettier; `npm run format:check` doar verifică                         |

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
├── index.html             # pagina principală (metadate, JSON-LD, preload fonturi)
├── 404.html               # pagină de eroare branduită (servită de hosting la 404)
├── scripts/prerender.mjs  # randare SSR → dist/index.html după build-ul client
├── public/
│   ├── _headers           # headere de securitate + cache (Netlify / Cloudflare Pages)
│   ├── fonts/             # Barlow Condensed + Manrope, self-hosted (latin, latin-ext)
│   ├── icons/, favicon.ico, og-image.jpg, site.webmanifest
├── vercel.json            # aceleași headere pentru Vercel
└── src/
    ├── components/        # câte o componentă per secțiune, cu CSS-ul colocat
    ├── composables/       # useEscapeKey
    ├── config/            # images.ts — maparea imaginilor
    ├── content/           # site.ts — conținut editorial
    ├── styles/            # fonts.css, tokens.css, base.css, print.css, not-found.css, main.css
    ├── entry-server.ts    # entry pentru prerender
    ├── main.ts            # entry client (hidratează HTML-ul prerandat)
    └── not-found.ts       # entry pentru 404.html
```

## Design system

Tokenii de culoare (OKLCH, cu fallback sRGB generat la build), fonturile (`Barlow Condensed`
pentru titluri, `Manrope` pentru text) și primitivele de layout (`.page-shell`, `.section-pad`,
`.eyebrow`, `.section-index`, butoane) sunt extrase din referință și stau în `src/styles/`.
Tailwind este folosit doar pentru Preflight. Breakpoints: `900px` (tabletă) și `640px` (mobil).

## Deployment

`npm run build` produce un site complet static în `dist/`. Orice hosting static funcționează:

- **Netlify / Cloudflare Pages**: `dist/_headers` este aplicat automat; `404.html` este servit
  pentru rute inexistente.
- **Vercel**: headerele vin din `vercel.json`; `404.html` este folosit automat.
- **Alt server (nginx etc.)**: replică headerele din `public/_headers` și rutează 404 → `/404.html`.

CSP-ul este strict (`default-src 'self'`, fără inline scripts/styles). Dacă adaugi un serviciu
extern (analytics, hărți embed), extinde directivele corespunzătoare în `public/_headers` și
`vercel.json`.

## Analytics

Nu este instalat niciun serviciu de analytics sau tracking și nu există cookie-uri, deci nu este
necesar un banner de consimțământ. Punctul de integrare, dacă va fi nevoie: `index.html` (script)
+ directivele `script-src`/`connect-src` din CSP. Orice serviciu care setează cookie-uri
non-esențiale necesită o implementare separată a consimțământului.
