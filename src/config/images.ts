import coachCareer01 from '@/assets/images/coach-career-01.jpg?responsive'
import coachCareer01Thumb from '@/assets/images/coach-career-01.jpg?thumb'
import coachCareer02 from '@/assets/images/coach-career-02.jpg?responsive'
import coachCareer02Thumb from '@/assets/images/coach-career-02.jpg?thumb'
import coachCareer03 from '@/assets/images/coach-career-03.jpg?responsive'
import coachCareer03Thumb from '@/assets/images/coach-career-03.jpg?thumb'
import coachCareer04 from '@/assets/images/coach-career-04.jpg?responsive'
import coachCareer04Thumb from '@/assets/images/coach-career-04.jpg?thumb'
import coachCareer05 from '@/assets/images/coach-career-05.jpg?responsive'
import coachCareer05Thumb from '@/assets/images/coach-career-05.jpg?thumb'
import gallery01 from '@/assets/images/gallery-01.jpg?responsive'
import gallery02 from '@/assets/images/gallery-02.jpg?responsive'
import gallery03 from '@/assets/images/gallery-03.jpg?responsive'
import gallery04 from '@/assets/images/gallery-04.jpg?responsive'
import gallery05 from '@/assets/images/gallery-05.jpg?responsive'
import gallery06 from '@/assets/images/gallery-06.jpg?responsive'
import heroFootball from '@/assets/images/hero-football.jpg?responsive'
import matchday01 from '@/assets/images/matchday-01.jpg?responsive'
import matchday02 from '@/assets/images/matchday-02.jpg?responsive'
import matchday03 from '@/assets/images/matchday-03.jpg?responsive'
import matchday04 from '@/assets/images/matchday-04.jpg?responsive'
import matchday05 from '@/assets/images/matchday-05.jpg?responsive'
import locationAerial from '@/assets/images/location-aerial.png?responsive'
import valueDiscipline from '@/assets/images/value-discipline.jpg?responsive'
import valuePassion from '@/assets/images/value-passion.jpg?responsive'
import valueRespect from '@/assets/images/value-respect.jpg?responsive'
/** Output of the `?responsive` image preset (see `vite.config.ts`). */
export interface ResponsivePicture {
  /** `srcset` per modern format (e.g. `avif`, `webp`). */
  sources: Record<string, string>
  /** JPEG fallback plus intrinsic size, used for the `<img>` element. */
  img: { src: string; w: number; h: number }
}

export interface SiteImage {
  picture: ResponsivePicture
  /** Accessible description. */
  alt: string
  /** `sizes` attribute describing the rendered width of the slot. */
  sizes: string
  /**
   * Average colour, shown while the file loads. Recompute after swapping a
   * photo — see the note in `src/assets/images/README.md`. A stale value only
   * means a slightly off placeholder, never a broken image.
   */
  bg: string
}

/** A career photo: a large variant for the frame plus a small one for the strip. */
export interface CoachCareerImage extends SiteImage {
  thumb: ResponsivePicture
}

/**
 * `sizes` for the archive strip. The slot is ~110 px wide, but the square crop
 * scales landscape sources by height, so we ask for ~1.5× that width.
 */
export const COACH_THUMB_SIZES = '(max-width: 560px) 30vw, 160px'

/**
 * `sizes` for a philosophy panel. The panels grow and shrink as you pick one,
 * so this declares the widest state — the browser must never be caught with a
 * variant that is too small for the expanded panel.
 */
const VALUE_PANEL_SIZES = '(max-width: 860px) calc(100vw - 32px), (max-width: 1360px) 52vw, 700px'

/**
 * `sizes` for the academy carousel. It spans the whole shell, so on a wide
 * screen the frame is the shell's own maximum width.
 */
const MATCHDAY_SIZES = '(max-width: 1320px) calc(100vw - 40px), 1280px'

/** `sizes` for the large frame of the coach archive. */
const COACH_FRAME_SIZES =
  '(max-width: 560px) calc(100vw - 32px), (max-width: 860px) 520px, (max-width: 1360px) 44vw, 570px'

/**
 * Central image map — the single place that decides which file is shown where.
 * Replace a file in `src/assets/images` (keeping its name) and everything updates.
 */
export const images = {
  /** Hero background. */
  hero: {
    picture: heroFootball,
    bg: '#332f20',
    alt: 'Tânăr fotbalist conducând mingea pe teren, la apus',
    sizes: '100vw',
  },
  /** "01 Academia" — carusel cu momente de la joc, în ordinea afișării. */
  matchday: [
    {
      picture: matchday01,
      bg: '#909671',
      alt: 'Copiii desfășurați pe teren în timpul unui joc la antrenament',
      sizes: MATCHDAY_SIZES,
    },
    {
      picture: matchday02,
      bg: '#7b7d55',
      alt: 'Duel pentru minge între doi copii, cu restul echipei în urmărire',
      sizes: MATCHDAY_SIZES,
    },
    {
      picture: matchday03,
      bg: '#737b65',
      alt: 'Antrenorul traversează terenul, copiii desfășurați în spatele lui, sub un cer înnorat',
      sizes: MATCHDAY_SIZES,
    },
    {
      picture: matchday04,
      bg: '#757f4d',
      alt: 'Dispută pentru minge între trei copii, în mijlocul terenului',
      sizes: MATCHDAY_SIZES,
    },
    {
      picture: matchday05,
      bg: '#778155',
      alt: 'Grup de copii disputând mingea în mijlocul terenului',
      sizes: MATCHDAY_SIZES,
    },
  ],
  /** "04 Antrenor" — arhiva de jucător, în ordinea din bandă (01 → 05). */
  coachCareer: [
    {
      picture: coachCareer01,
      bg: '#4a4a2e',
      thumb: coachCareer01Thumb,
      alt: 'Amihăesei Teodor, în echipament portocaliu, protejează mingea într-un meci de seniori',
      sizes: COACH_FRAME_SIZES,
    },
    {
      picture: coachCareer02,
      bg: '#7c7854',
      thumb: coachCareer02Thumb,
      alt: 'Amihăesei Teodor conduce mingea pe extremă, în tricou roșu cu alb',
      sizes: COACH_FRAME_SIZES,
    },
    {
      picture: coachCareer03,
      bg: '#726b56',
      thumb: coachCareer03Thumb,
      alt: 'Amihăesei Teodor pornește pe contraatac, în echipament bleu',
      sizes: COACH_FRAME_SIZES,
    },
    {
      picture: coachCareer04,
      bg: '#78713a',
      thumb: coachCareer04Thumb,
      alt: 'Amihăesei Teodor controlează mingea lângă linia de margine, în echipament galben',
      sizes: COACH_FRAME_SIZES,
    },
    {
      picture: coachCareer05,
      bg: '#9d995b',
      thumb: coachCareer05Thumb,
      alt: 'Amihăesei Teodor în timpul unui meci disputat pe stadion',
      sizes: COACH_FRAME_SIZES,
    },
  ],
  /** "Filosofia noastră" — câte o fotografie pentru fiecare valoare, în ordinea din VALUES. */
  values: [
    {
      picture: valueRespect,
      bg: '#76684f',
      alt: 'Copiii strânși în jurul antrenorului, ascultând indicațiile',
      sizes: VALUE_PANEL_SIZES,
    },
    {
      picture: valueDiscipline,
      bg: '#787d5b',
      alt: 'Antrenorul conduce un exercițiu, copiii lucrează pe teren',
      sizes: VALUE_PANEL_SIZES,
    },
    {
      picture: valuePassion,
      bg: '#72704d',
      alt: 'Antrenorul împarte mingile, copiii se strâng nerăbdători în jurul lui',
      sizes: VALUE_PANEL_SIZES,
    },
  ],
  /** Secțiunea "Unde ne găsești" — vedere aeriană cu terenul și Școala Mastacăn. */
  location: {
    picture: locationAerial,
    bg: '#4d553c',
    alt: 'Vedere aeriană cu terenul de fotbal din Borlești și Școala Mastacăn alăturată, pe Strada Școlii',
    sizes: '(max-width: 640px) calc(100vw - 32px), (max-width: 1100px) 58vw, 708px',
  },
  /** "05 Galerie" — mozaic de șase, ordinea contează (vezi grila din GallerySection). */
  gallery: [
    {
      picture: gallery01,
      bg: '#6f6f48',
      alt: 'Antrenorul explică unui grup de copii, în picioare pe teren',
      sizes: '(max-width: 640px) 100vw, (max-width: 900px) 49vw, (max-width: 1320px) 41vw, 522px',
    },
    {
      picture: gallery02,
      bg: '#5e684b',
      alt: 'Vedere largă a terenului, cu întreaga grupă la exerciții cu mingea',
      sizes: '(max-width: 640px) 100vw, (max-width: 900px) 49vw, (max-width: 1320px) 57vw, 742px',
    },
    {
      picture: gallery03,
      bg: '#777c56',
      alt: 'Antrenorul printre copii, la marginea terenului',
      sizes: '(max-width: 900px) 100vw, (max-width: 1320px) 28vw, 363px',
    },
    {
      picture: gallery04,
      bg: '#748161',
      alt: 'Antrenament văzut de la nivelul ierbii, cu mingea în prim-plan',
      sizes: '(max-width: 900px) 100vw, (max-width: 1320px) 28vw, 363px',
    },
    {
      picture: gallery05,
      bg: '#6f6146',
      alt: 'Antrenorul aplecat între copii, la finalul unui exercițiu',
      sizes: '(max-width: 640px) 100vw, (max-width: 900px) 66vw, (max-width: 1320px) 53vw, 690px',
    },
    {
      picture: gallery06,
      bg: '#737962',
      alt: 'Antrenorul demonstrează o mișcare, copiii privesc',
      sizes: '(max-width: 640px) 100vw, (max-width: 900px) 33vw, (max-width: 1320px) 28vw, 363px',
    },
  ],
} satisfies {
  hero: SiteImage
  matchday: readonly SiteImage[]
  coachCareer: readonly CoachCareerImage[]
  values: readonly SiteImage[]
  location: SiteImage
  gallery: readonly SiteImage[]
}
