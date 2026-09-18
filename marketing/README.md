# Campanie de lansare — Junior Borlești

Patru postări pentru Facebook și Instagram, gândite ca o secvență, nu ca patru
anunțuri separate. Fiecare are un folder cu trei lucruri: fișierul HTML din care
e făcută imaginea, imaginea gata de urcat și textul de copiat în postare.

## Ce se postează și în ce ordine

Ordinea contează. Publicul rece nu reacționează la „înscrieri deschise" — dar
reacționează la el după ce știe cine ești și cine îți antrenează copiii.

| # | Folder            | Ce spune                     | Rol          | Când        |
| - | ----------------- | ---------------------------- | ------------ | ----------- |
| 1 | `01-valori`       | Nu formăm doar fotbaliști    | Deschidere   | Ziua 1      |
| 2 | `02-antrenor`     | Cine îi antrenează           | Credibilitate| Ziua 4      |
| 3 | `03-site-lansat`  | Academia are site            | Anunț        | Ziua 7      |
| 4 | `04-inscrieri`    | Înscrieri deschise           | Conversie    | Ziua 10     |

Patru postări în zece zile. Mai des decât atât, într-o comună, obosește; mai rar,
se pierde legătura dintre ele.

## Înainte de prima postare

1. **Verifică domeniul.** Toate cele patru imagini scriu `juniorborlesti.ro`. Dacă
   site-ul e publicat pe altă adresă, schimbă textul în fișierele HTML și
   regenerează imaginile (vezi mai jos). O postare care trimite spre un domeniu
   care nu răspunde face mai mult rău decât una care nu există.
2. **Deschide site-ul pe telefon.** Postarea 3 promite ce se vede acolo; verifică
   întâi că se vede.
3. **Pune numărul de telefon în pagina de Facebook**, la secțiunea Contact. O
   parte din oameni nu citesc descrierea, ci caută butonul.

## Cum se postează

**Facebook.** Urcă imaginea, lipește textul din `descriere.md`. Linkul poate sta
în descriere — Facebook îl face clicabil. Nu adăuga și o previzualizare de link
peste imagine: alege una dintre ele, altfel postarea arată aglomerată.

**Instagram.** Aceleași imagini, același text, dar linkul **nu este clicabil** în
descriere. Pune `juniorborlesti.ro` în bio și scrie în text „link în bio".

**Formatul imaginilor.** 1080 × 1350 px, raport 4:5 — cel mai înalt format pe care
ambele platforme îl afișează necropat în feed, deci ocupă cât mai mult din ecranul
unui telefon. Nu le redimensiona și nu le decupa la pătrat: textul e așezat pentru
raportul ăsta.

## Ce răspunzi la comentarii

Aproape toate întrebările vor fi aceleași patru. Răspunsuri scurte, de la pagina
academiei, nu de pe profilul personal:

- *„Ce vârstă trebuie să aibă?"* — Grupele merg de la U6 (născuți în 2020) la U11
  (născuți în 2015). Sunați la 0747 357 974 și vă spunem în ce grupă intră.
- *„Cât costă?"* — Nu răspunde public cu o cifră dacă nu e stabilită. „Vă spunem
  la telefon, la 0747 357 974."
- *„Unde e terenul?"* — Lângă Școala Mastacăn, în Borlești. Harta e pe
  juniorborlesti.ro.
- *„Poate veni să încerce o dată?"* — Da. Primul antrenament nu cere echipament
  special.

Răspunde în primele două ore de la postare. Comentariile la care nu răspunde
nimeni scad vizibilitatea postării.

## Buget

Doar postarea 4 merită promovată. Celelalte trei își fac treaba organic dacă sunt
distribuite de părinții actuali — cere-le asta direct, printr-un mesaj, nu printr-o
postare.

Pentru postarea 4: targetare pe rază de 15 km în jurul Borlești, părinți cu copii
între 4 și 11 ani. Un buget mic ținut o săptămână bate un buget mare ars în două
zile.

## Ce urmărești

Nu numărul de like-uri. Trei cifre contează:

1. **Apeluri primite** — notează-le. E singurul indicator care se transformă în
   copii pe teren.
2. **Salvări și distribuiri** ale postării 4 — arată că cineva vrea să revină la
   informație.
3. **Accesări ale site-ului** din postarea 3.

---

## Regenerarea imaginilor

Imaginile sunt randate din HTML, fără browser. Sursa de design sunt fișierele
`*/index.html` — modifică acolo, apoi rulează:

```sh
python3 -m venv .venv
.venv/bin/pip install weasyprint fonttools brotli
.venv/bin/python marketing/build-fonts.py   # o singură dată, sau după schimbarea fonturilor
.venv/bin/python marketing/render.py
```

`render.py` are nevoie de `pdftocairo` din pachetul `poppler-utils`.

**Fonturile nu se împart înapoi în `latin` / `latin-ext`.** Româna are nevoie de
glife din ambele subseturi, iar un motor de randare care primește două fețe cu
aceeași familie și greutate poate măsura textul într-un fișier și desena glifele
din celălalt — așa ajunge Ș să apară ca U și Ț ca W. `build-fonts.py` le unește
într-un singur fișier per stil tocmai ca să nu se poată întâmpla asta.

## Structura folderului

```
marketing/
├── README.md              # documentul ăsta
├── build-fonts.py         # unește subseturile de font
├── render.py              # HTML → PNG
├── assets/
│   ├── fonts/             # fonturile unite + subseturile sursă
│   ├── poster.css         # paleta, tipografia și grila comune
│   ├── logo-yellow.svg    # logoul pentru fundal închis
│   ├── logo-ink.svg       # logoul pentru fundal deschis
│   └── *.jpg              # fotografiile, decupate la dimensiune
└── 0X-nume/
    ├── index.html         # sursa de design
    ├── 0X-nume.png        # imaginea de urcat
    └── descriere.md       # textul de copiat
```
