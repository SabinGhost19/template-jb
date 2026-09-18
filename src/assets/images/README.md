# Imagini sursă

Fișierele de aici sunt mapate în `src/config/images.ts`. La build, fiecare imagine este
convertită automat în AVIF + WebP + JPEG la mai multe lățimi (480–1920 px), deci este
suficient să înlocuiești fișierul păstrând același nume.

| Fișier                | Folosit în                           | Format recomandat   |
| --------------------- | ------------------------------------ | ------------------- |
| `hero-football.jpg`   | Hero (fundal) și Galerie 04          | 3:2, landscape      |
| `training-team.jpg`   | Secțiunea Academia și Galerie 01     | 4:3, landscape      |
| `coach-career-01.jpg` | Antrenor — cadrul principal (arhiva) | 4:5, portrait       |
| `coach-career-02..05` | Antrenor — restul benzii de arhivă   | orice, se decupează |
| `gallery-huddle.jpg`  | Galerie 02                           | 4:5, portrait       |
| `gallery-detail.jpg`  | Galerie 03                           | 7:5, landscape      |

Recomandare: sursa să aibă cel puțin 1600 px pe latura lungă (1920 px pentru hero).

Banda de arhivă din secțiunea Antrenor folosește și varianta `?thumb` (160–320 px) a
acelorași fișiere, deci o poză nouă acoperă automat și miniatura.

Fișierele `coach-career-*` sunt deja procesate (denoise de crominanță, mărire Lanczos 1,7×,
unsharp, gradare caldă, vignetă, grain fin). Gradarea e în fișier, nu în CSS — o poză nouă
pusă aici va arăta mai plată decât restul până trece prin același proces.

`coach-portrait.jpg` nu mai este folosit de niciun component — a fost înlocuit de
fotografiile reale din arhiva antrenorului și poate fi șters.
