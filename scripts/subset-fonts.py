#!/usr/bin/env python3
"""Re-subsets the shipped web fonts to the character set this site can render.

Google's `latin` / `latin-ext` subsets carry glyphs for a dozen languages we
never show. Romanian needs basic Latin, Latin-1, Ă ă, Ș ș, Ț ț (plus the legacy
cedilla spellings people paste) and a handful of punctuation marks — roughly a
third of what ships by default.

The `unicode-range` declarations in `src/styles/fonts.css` stay as they are:
they remain supersets of what the files now contain, so the browser still picks
the right file and simply never asks for a glyph that is gone.

Run after replacing a font file:

    python3 -m venv .venv && .venv/bin/pip install fonttools brotli
    .venv/bin/python scripts/subset-fonts.py
"""
import pathlib
import subprocess
import sys

FONTS = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'fonts'

UNICODES = ','.join([
    'U+0020-007E',   # basic latin
    'U+00A0-00FF',   # latin-1: © ° Â â Î î, accented vowels
    'U+0102-0103',   # Ă ă
    'U+0131',        # ı
    'U+0152-0153',   # Œ œ
    'U+015E-0161',   # Ş ş Š š  (cedilla spelling of Ș, still common in pasted text)
    'U+0162-0165',   # Ţ ţ Ť ť
    'U+0218-021B',   # Ș ș Ț ț  (the correct comma-below Romanian letters)
    'U+02C6-02DC',   # modifier letters used by some name spellings
    'U+2000-200B',   # spaces
    'U+2010-2015',   # hyphens and dashes
    'U+2018-201A',   # ' ' ‚
    'U+201C-201E',   # " " „
    'U+2020-2022',   # † ‡ •
    'U+2026',        # …
    'U+2030',        # ‰
    'U+2039-203A',   # ‹ ›
    'U+2044',        # ⁄
    'U+20AC',        # €
    'U+2122',        # ™
    'U+2190-2193',   # ← ↑ → ↓
    'U+2212',        # −
    'U+FEFF',
    'U+FFFD',
])

LAYOUT_FEATURES = 'kern,liga,clig,calt,rlig,locl,ccmp,mark,mkmk,ss01,tnum,onum,lnum'


def main() -> int:
    files = sorted(FONTS.glob('*.woff2'))
    if not files:
        print('no fonts found', file=sys.stderr)
        return 1

    before = after = 0
    for path in files:
        out = path.with_suffix('.subset.woff2')
        subprocess.run(
            [
                sys.executable, '-m', 'fontTools.subset', str(path),
                f'--output-file={out}',
                '--flavor=woff2',
                f'--unicodes={UNICODES}',
                f'--layout-features={LAYOUT_FEATURES}',
                '--no-hinting',
                '--drop-tables+=DSIG',
                '--notdef-outline',
            ],
            check=True,
        )
        before += path.stat().st_size
        after += out.stat().st_size
        print(f'{path.name:46} {path.stat().st_size / 1024:6.1f} KB -> {out.stat().st_size / 1024:6.1f} KB')
        out.replace(path)

    print(f'\ntotal {before / 1024:.1f} KB -> {after / 1024:.1f} KB  ({100 - after / before * 100:.0f}% mai puțin)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
