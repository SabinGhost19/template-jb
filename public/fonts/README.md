# Fonturi

Barlow Condensed (600, 700, 700 italic, 800) și Manrope (variabil 400–800), de la
Google Fonts, licență SIL Open Font License, găzduite local.

Fișierele **nu sunt cele descărcate de la Google**: au fost re-subsetate la setul de
caractere pe care îl poate randa acest site (latin de bază, Latin-1, Ă ă, Ș ș, Ț ț,
variantele cu sedilă și câteva semne de punctuație). Subsetul implicit `latin` +
`latin-ext` al Google conține glife pentru încă vreo zece limbi, pe care nu le
afișăm niciodată — 185 KB au devenit 83 KB, adică 36 KB mai puțin pe primul ecran.

Împărțirea `latin` / `latin-ext` și declarațiile `unicode-range` din
`src/styles/fonts.css` au rămas neschimbate: sunt în continuare supramulțimi ale
conținutului fișierelor.

## După ce înlocuiești un fișier de font

```sh
python3 -m venv .venv && .venv/bin/pip install fonttools brotli
.venv/bin/python scripts/subset-fonts.py
```

Scriptul rescrie fișierele pe loc. Rulează-l o singură dată per fișier nou —
re-subsetarea unui fișier deja subsetat nu strică nimic, dar nici nu mai câștigă.
