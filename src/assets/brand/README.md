# Identitatea vizuală — JB Junior Borlești

Tot ce e în acest director este derivat dintr-un singur fișier sursă:
`src/assets/images/brand.png`, plansa de brand livrată. Nimic nu se desenează de
mână și nimic nu se ajustează direct aici — se rulează scriptul:

```sh
python3 -m venv .venv && .venv/bin/pip install potracer pillow numpy
.venv/bin/python scripts/build-brand.py
```

Scriptul decupează lockup-urile din planșă, le vectorizează, și regenerează
faviconul, iconurile de aplicație și imaginea de social. Dacă se schimbă logoul,
se înlocuiește `brand.png` și se rulează din nou.

## Fișiere

| Fișier                | Ce este                           | Unde se folosește                   |
| --------------------- | --------------------------------- | ----------------------------------- |
| `logo-mark.svg`       | Monograma JB, `fill=currentColor` | Header, footer, pagina 404          |
| `logo-lockup.svg`     | Monograma + „JB JUNIOR BORLEȘTI"  | Uz oficial, print, documente        |
| `logo-mark.png`       | Monograma, 1024 px, transparent   | Sursa pentru iconuri și export      |
| `logo-lockup.png`     | Lockup complet, 1200 px           | Print, parteneri, materiale externe |
| `public/icons/*`      | Iconuri de aplicație              | Manifest PWA, ecran de start        |
| `public/favicon.ico`  | 16 / 32 / 48 px                   | Tab de browser                      |
| `public/og-image.jpg` | 1200 × 630                        | Previzualizare la partajare         |

Ambele SVG-uri au `fill="currentColor"`, deci își iau culoarea din CSS. Nu există
o variantă „galbenă" și una „neagră" ca fișiere separate — este același fișier,
colorat de context.

## Paletă

| Rol               | OKLCH                   | Hex       | Utilizare                                  |
| ----------------- | ----------------------- | --------- | ------------------------------------------ |
| Galben brand      | `oklch(85% 0.17 90)`    | `#FAC819` | Accentul. Un singur element odată.         |
| Negru brand       | `oklch(15% 0.002 17)`   | `#0B0A0A` | Text, logo pe fundal deschis               |
| Antracit          | `oklch(19% 0.003 60)`   | `#141311` | Suprafețe închise (grupe, galerie, footer) |
| Cremă             | `oklch(96% 0.006 92)`   | `#F3F2ED` | Fundalul paginii                           |
| Card              | `oklch(98.5% 0.004 92)` | `#FBFAF7` | Secțiunea de dezvoltare                    |
| Galben apăsat     | `oklch(74% 0.148 88)`   | `#D9A800` | Hover / stare activă pe galben             |
| Gri text secundar | `oklch(49% 0.012 85)`   | `#636059` | Text de suport                             |
| Verde teren       | `oklch(32% 0.07 145)`   | `#193C1B` | Singura culoare non-brand; doar suprafețe  |

Valorile trăiesc în `src/styles/tokens.css`. Se schimbă acolo, nu în componente.

## Reguli

**Spațiu de gardă:** înălțimea barei lui J pe toate laturile. Nimic nu intră în
zona aceea — nici text, nici margine de imagine.

**Dimensiuni minime:** monograma 20 px pe ecran / 14 mm la tipar. Lockup-ul
complet 44 px / 22 mm. Sub acestea se folosește monograma singură.

**Contrast:** galbenul brand pe negru și negrul pe galben trec AA. Galbenul pe
cremă **nu** trece — pe fundal deschis logoul se pune în negru.

**Interzis:** degradeuri, umbre, contur, rotire, înclinare, schimbarea
proporțiilor între monogramă și text, recolorare în afara paletei, plasare pe
fotografie fără plachetă de contrast.
