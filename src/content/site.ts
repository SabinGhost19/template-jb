/**
 * Editorial content of the site (navigation, lists, contact details).
 * Headings with presentational line breaks stay inside their components.
 */

export const CONTACT = {
  phoneDisplay: '0747\u00a0357\u00a0974',
  /** `tel:` în format E.164 — deschide direct formatorul telefonului. */
  phoneHref: 'tel:+40747357974',
} as const

export const LOCATION = {
  /** Reperul locației: Școala Mastacăn, chiar lângă teren. */
  mapsUrl:
    'https://www.google.com/maps/place/Scoala+Mastacan/@46.785954,26.4890516,640m/data=!3m2!1e3!4b1!4m6!3m5!1s0x40b556b592fef3f5:0x4cf20baabd338e20!8m2!3d46.785954!4d26.4916265!16s%2Fg%2F11c30rm873',
  coordinates: '46.79° N / 26.49° E',
} as const

export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Academie', href: '#academie' },
  { label: 'Grupe', href: '#grupe' },
  { label: 'Antrenor', href: '#antrenor' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Contact', href: '#contact' },
]

export interface AgeGroup {
  code: string
  birthYear: string
  focus: string
  description: string
}

export const AGE_GROUPS: readonly AgeGroup[] = [
  {
    code: 'U6',
    birthYear: '2020',
    focus: 'Primii pași',
    description: 'Coordonare și bucuria jocului',
  },
  {
    code: 'U7',
    birthYear: '2019',
    focus: 'Control',
    description: 'Relația cu mingea și echilibrul',
  },
  { code: 'U8', birthYear: '2018', focus: 'Tehnică', description: 'Pasă, dribling și orientare' },
  { code: 'U9', birthYear: '2017', focus: 'Decizie', description: 'Înțelegerea jocului colectiv' },
  { code: 'U10', birthYear: '2016', focus: 'Progres', description: 'Tehnică în regim de viteză' },
  {
    code: 'U11',
    birthYear: '2015',
    focus: 'Performanță',
    description: 'Caracter și responsabilitate',
  },
]

export interface DevelopmentPillar {
  index: string
  title: string
  description: string
}

export const DEVELOPMENT_PILLARS: readonly DevelopmentPillar[] = [
  {
    index: '01',
    title: 'Dezvoltare tehnică',
    description: 'Conducerea mingii, pasa, driblingul și finalizarea.',
  },
  {
    index: '02',
    title: 'Dezvoltare fizică',
    description: 'Viteză, coordonare, mobilitate și agilitate.',
  },
  {
    index: '03',
    title: 'Inteligență de joc',
    description: 'Înțelegerea jocului și luarea deciziilor.',
  },
  {
    index: '04',
    title: 'Caracter',
    description: 'Disciplină, respect, fair-play și responsabilitate.',
  },
  {
    index: '05',
    title: 'Încredere',
    description: 'Îi ajutăm pe copii să capete încredere în propriile forțe.',
  },
  {
    index: '06',
    title: 'Comunitate',
    description: 'Un mediu sigur, pozitiv și prietenos pentru fiecare copil.',
  },
]

export interface Value {
  /** Cuvântul afișat mare pe panou. */
  word: string
  /** O singură frază, citibilă dintr-o privire. */
  line: string
}

/** Cele trei valori din secțiunea „Filosofia noastră”. */
export const VALUES: readonly Value[] = [
  {
    word: 'Respect',
    line: 'Față de coechipier, de adversar și de arbitru. Se învață pe teren și se vede în afara lui.',
  },
  {
    word: 'Disciplină',
    line: 'Vii la timp, dai tot ce poți, duci lucrurile până la capăt. Simplu de spus, greu de făcut.',
  },
  {
    word: 'Pasiune',
    line: 'Copiii care iubesc jocul nu trebuie împinși de la spate. Asta hrănim la fiecare antrenament.',
  },
]

export interface CoachProfile {
  role: string
  /** Fraza de introducere de sub nume. */
  lead: string
  /** Cluburile de seniori la care a jucat. */
  clubs: readonly string[]
  education: string
}

/** Profilul antrenorului (numele, cu împărțirea lui pe rânduri, stă în componentă). */
export const COACH: CoachProfile = {
  role: 'Antrenor Junior Borlești',
  lead: 'Experiența din fotbalul de seniori, tradusă în antrenamente pe înțelesul copiilor.',
  clubs: ['Ceahlăul Piatra Neamț', 'CSU Alba Iulia', 'Șomuz Fălticeni'],
  education:
    'Licențiat la Universitatea „Vasile Alecsandri” din Bacău, Facultatea de Științe ale Mișcării.',
}
