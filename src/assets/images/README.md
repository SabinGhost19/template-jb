# Imagini

## De unde vin

`src/assets/new-images-training/` este arhiva brută: fotografii făcute la
antrenamente, grupate după ce se întâmplă în ele — `during-match`, `training`,
`relationship-teamwork`. Nu sunt folosite direct de site.

Fișierele din directorul acesta sunt generate din ele:

```sh
python3 scripts/grade-photos.py
```

Scriptul decupează fiecare cadru la raportul slotului în care intră și aplică o
gradare gândită pentru fotografii de telefon făcute pe timp înnorat: punct de
negru real (un cadru pe nori nu are unul), curbă blândă în S, umbre neutralizate
de dominanta albastră, lumini calde, vibranță în loc de saturație — ca vestele
portocalii să nu devină pete — claritate cu prag și o vignetă abia perceptibilă.
Alocarea completă (ce sursă intră în ce slot) e în capul scriptului.

Fotografiile din secțiuni sunt reale, făcute la Junior Borlești. Setul stoc/AI
anterior — `training-team`, `gallery-huddle`, `gallery-detail`, `coach-portrait`
— a fost eliminat. Excepția este `hero-football.jpg`, păstrată la cerere ca
imagine de deschidere; nu e o fotografie a academiei și nu trece prin scriptul
de gradare.

## Ce e folosit unde

| Fișier                 | Folosit în                                   |
| ---------------------- | -------------------------------------------- |
| `hero-pitch.jpg`       | Hero (fundal)                                |
| `matchday-01..04.jpg`  | Academia — caruselul de la joc               |
| `value-respect.jpg`    | Filosofia — panoul „Respect"                 |
| `value-discipline.jpg` | Filosofia — panoul „Disciplină"              |
| `value-passion.jpg`    | Filosofia — panoul „Pasiune"                 |
| `gallery-01..06.jpg`   | Galerie, în ordinea din mozaic               |
| `coach-career-01..05`  | Antrenor — banda de arhivă                   |
| `location-aerial.png`  | Unde ne găsești                              |
| `brand.png`            | Sursa identității vizuale (vezi `../brand/`) |

Maparea efectivă e în `src/config/images.ts`. La build, fiecare imagine devine
AVIF + WebP + JPEG la mai multe lățimi, servite prin `<picture>`.

## Culoarea de placeholder

Fiecare intrare din `images.ts` are un câmp `bg`: culoarea medie a fotografiei,
afișată cât timp fișierul se încarcă, ca să nu apară o casetă goală la derulare
rapidă. După ce schimbi o poză, recalculeaz-o:

```sh
python3 -c "
from PIL import Image; import numpy as np, sys
a=np.asarray(Image.open(sys.argv[1]).convert('RGB').resize((8,8))).reshape(-1,3).astype(float)
l=a@[.2126,.7152,.0722]; w=1/(1+np.exp((l-128)/60)); c=(a*w[:,None]).sum(0)/w.sum()
print('#%02x%02x%02x'%tuple(c.astype(int)))" src/assets/images/NUME.jpg
```

O valoare veche înseamnă doar un placeholder ușor nepotrivit, nu o imagine ruptă.

## Cadre nefolosite

`relationship-teamwork/IMG_8134`, `training/IMG_8064` și `training/IMG_8065` au
rămas în arhivă fără să fie publicate — dublează încadrarea unora deja folosite.
Sunt acolo dacă o secțiune nouă are nevoie de material.
