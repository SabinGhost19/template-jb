#!/usr/bin/env python3
"""Renders every poster in this directory to a 1080x1350 PNG.

The HTML files are the design source — edit those, then run this. There is no
browser involved: WeasyPrint lays the page out and writes a PDF, poppler
rasterises it at exactly one CSS pixel per image pixel.

    python3 -m venv .venv && .venv/bin/pip install weasyprint
    .venv/bin/python marketing/render.py        # needs poppler-utils for pdftocairo
"""
import pathlib
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent


def main() -> int:
    posters = sorted(p for p in HERE.glob('*/index.html'))
    if not posters:
        print('nicio postare găsită', file=sys.stderr)
        return 1

    try:
        from weasyprint import HTML
    except ImportError:
        print('lipsește weasyprint: pip install weasyprint', file=sys.stderr)
        return 1

    for html in posters:
        folder = html.parent
        pdf = folder / '.render.pdf'
        png = folder / f'{folder.name}.png'

        HTML(filename=str(html)).write_pdf(str(pdf))
        # @page is declared in CSS pixels, so 96 dpi gives a 1:1 pixel map.
        subprocess.run(
            ['pdftocairo', '-png', '-r', '96', '-singlefile', str(pdf), str(png.with_suffix(''))],
            check=True,
        )
        pdf.unlink()

        size = png.stat().st_size
        print(f'  {png.relative_to(HERE)}  {size // 1024} KB')

    return 0


if __name__ == '__main__':
    raise SystemExit(main())
