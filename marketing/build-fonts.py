#!/usr/bin/env python3
"""Builds one self-contained font file per style, for the posters.

Google splits these fonts into a `latin` and a `latin-ext` subset. Romanian
needs both — ă, ș and ț live only in `latin-ext` — and a renderer handed two
faces with the same family and weight can end up measuring text against one
file while drawing glyphs from the other, which turns Ș into U and Ț into W.

Merging the two subsets removes the ambiguity: one family, one weight, one
file, no unicode-range. Variable fonts are pinned to the weight we use first,
because merging keeps no variation data.

    .venv/bin/python marketing/build-fonts.py
"""
import pathlib
import sys

from fontTools.ttLib import TTFont
from fontTools.merge import Merger
from fontTools.varLib.instancer import instantiateVariableFont

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE / 'assets' / 'fonts'

# (output name, subset stem, weight to pin a variable font to)
STYLES = [
    ('barlow-condensed-800', 'barlow-condensed-800', None),
    ('barlow-condensed-700', 'barlow-condensed-700', None),
    ('manrope-400', 'manrope-400', 400),
    ('manrope-800', 'manrope-400', 800),
]

ROMANIAN = 'ăĂâÂîÎșȘțȚ„”—•'


def load(path: pathlib.Path, weight: int | None) -> TTFont:
    font = TTFont(path)
    font.flavor = None
    if 'fvar' in font and weight is not None:
        font = instantiateVariableFont(font, {'wght': weight}, updateFontNames=True)
    return font


def main() -> int:
    tmp = HERE / '.fonts-tmp'
    tmp.mkdir(exist_ok=True)
    built = []

    for name, stem, weight in STYLES:
        parts = []
        for subset in ('latin', 'latin-ext'):
            source = SRC / f'{stem}-{subset}.woff2'
            if not source.exists():
                print(f'lipsește {source}', file=sys.stderr)
                return 1
            part = tmp / f'{name}-{subset}.ttf'
            load(source, weight).save(part)
            parts.append(str(part))

        merged = Merger().merge(parts)
        out = SRC / f'{name}.ttf'
        merged.save(out)

        cmap = set(TTFont(out).getBestCmap())
        missing = [c for c in ROMANIAN if ord(c) not in cmap]
        built.append((out, len(cmap), missing))

    for path, glyphs, missing in built:
        state = 'OK' if not missing else f'LIPSESC {"".join(missing)}'
        print(f'  {path.name:28} {glyphs:4} caractere   {state}')

    for f in tmp.iterdir():
        f.unlink()
    tmp.rmdir()

    return 1 if any(m for _, _, m in built) else 0


if __name__ == '__main__':
    raise SystemExit(main())
