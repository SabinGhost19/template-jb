#!/usr/bin/env python3
"""Derives the whole brand kit from the single source artwork.

`src/assets/images/brand.png` is the delivered brand sheet: three lockups on
black and yellow panels. Everything the site ships — the vector mark, the vector
lockup, the favicons, the app icons, the social card — is cut from it here, so
there is exactly one place where the logo lives and one command to regenerate
the rest.

    python3 -m venv .venv && .venv/bin/pip install potracer pillow numpy
    .venv/bin/python scripts/build-brand.py
"""
import pathlib
import numpy as np
import potrace
from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHEET = ROOT / 'src' / 'assets' / 'images' / 'brand.png'
BRAND = ROOT / 'src' / 'assets' / 'brand'
ICONS = ROOT / 'public' / 'icons'

# Sampled from the artwork, not eyeballed.
YELLOW = '#FAC819'
INK = '#0B0A0A'

# Regions of the top panel (yellow artwork on the dark background).
MARK = (599, 105, 938, 397)
LOCKUP = (502, 105, 1034, 560)

# potrace works on 1-bit input, so the mask is upscaled first and thresholded at
# the halfway point: the extra samples are what keep the curves smooth.
TRACE_SCALE = 3


def alpha_mask(box):
    """Coverage of the yellow artwork in `box`, as a 0..1 float array."""
    sheet = np.asarray(Image.open(SHEET).convert('RGB')).astype(np.float32)
    crop = sheet[box[1]:box[3], box[0]:box[2]]
    # Distance from the dark background, normalised against the yellow.
    ink = np.array([11, 10, 10], dtype=np.float32)
    art = np.array([250, 200, 25], dtype=np.float32)
    span = np.linalg.norm(art - ink)
    return np.clip(np.linalg.norm(crop - ink, axis=2) / span, 0, 1)


def to_svg(mask, name, title):
    big = Image.fromarray((mask * 255).astype(np.uint8)).resize(
        (mask.shape[1] * TRACE_SCALE, mask.shape[0] * TRACE_SCALE), Image.LANCZOS
    )
    # potrace reads a scanned page: zero is ink. The coverage mask is the other
    # way round, so it is inverted before tracing.
    bitmap = potrace.Bitmap(np.asarray(big) <= 127)
    path = bitmap.trace(turdsize=8, alphamax=1.0, opticurve=True, opttolerance=0.55)

    d = []
    for curve in path:
        p = lambda pt: f'{pt.x / TRACE_SCALE:.1f} {pt.y / TRACE_SCALE:.1f}'
        d.append(f'M{p(curve.start_point)}')
        for segment in curve:
            if segment.is_corner:
                d.append(f'L{p(segment.c)}L{p(segment.end_point)}')
            else:
                d.append(f'C{p(segment.c1)} {p(segment.c2)} {p(segment.end_point)}')
        d.append('Z')

    w, h = mask.shape[1], mask.shape[0]
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'role="img" aria-label="{title}">'
        f'<title>{title}</title>'
        f'<path fill="currentColor" fill-rule="nonzero" d="{"".join(d)}"/>'
        '</svg>\n'
    )
    out = BRAND / f'{name}.svg'
    out.write_text(svg, encoding='utf-8')
    print(f'  {out.relative_to(ROOT)}  {len(svg) / 1024:.1f} KB, {len(path.curves)} contururi')

    # A yellow copy in /public, for the static 404 page and for anyone who needs
    # a file rather than a component.
    public = ROOT / 'public' / 'brand'
    public.mkdir(parents=True, exist_ok=True)
    (public / f'{name}.svg').write_text(svg.replace('currentColor', YELLOW), encoding='utf-8')

    # The components inline the path instead of fetching it, so it is emitted as
    # a module too — one generated source, no copy kept by hand.
    if name == 'logo-mark':
        (BRAND / 'logo-mark.ts').write_text(
            '/* Generat de scripts/build-brand.py din src/assets/images/brand.png. Nu edita. */\n'
            f"export const MARK_VIEW_BOX = '0 0 {w} {h}'\n\n"
            f"export const MARK_PATH =\n  '{''.join(d)}'\n",
            encoding='utf-8',
        )
        print(f'  {(BRAND / "logo-mark.ts").relative_to(ROOT)}')
    return svg


def to_png(mask, name, colour, width):
    h = round(mask.shape[0] * width / mask.shape[1])
    alpha = Image.fromarray((mask * 255).astype(np.uint8)).resize((width, h), Image.LANCZOS)
    rgb = Image.new('RGB', (width, h), colour)
    art = Image.merge('RGBA', (*rgb.split(), alpha))
    out = BRAND / f'{name}.png'
    art.save(out, optimize=True)
    print(f'  {out.relative_to(ROOT)}  {width}x{h}')
    return art


def icon(mark, size, pad_ratio, bg, radius=None):
    """The mark centred on a solid tile — the favicon must read on any tab colour."""
    tile = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    if radius:
        solid = Image.new('RGBA', (size, size), bg)
        m = Image.new('L', (size, size), 0)
        ImageDraw.Draw(m).rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
        tile.paste(solid, (0, 0), m)
    else:
        tile.paste(Image.new('RGBA', (size, size), bg), (0, 0))

    inner = round(size * (1 - 2 * pad_ratio))
    art = mark.copy()
    art.thumbnail((inner, inner), Image.LANCZOS)
    tile.alpha_composite(art, ((size - art.width) // 2, (size - art.height) // 2))
    return tile


def main():
    BRAND.mkdir(parents=True, exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)

    print('vector:')
    mark_mask = alpha_mask(MARK)
    to_svg(mark_mask, 'logo-mark', 'JB Junior Borlești')
    to_svg(alpha_mask(LOCKUP), 'logo-lockup', 'JB Junior Borlești')

    print('raster:')
    mark_png = to_png(mark_mask, 'logo-mark', YELLOW, 1024)
    to_png(alpha_mask(LOCKUP), 'logo-lockup', YELLOW, 1200)

    print('iconuri:')
    # Square tile: the mark is wider than it is tall, so padding is modest.
    icon(mark_png, 512, 0.14, INK).save(ICONS / 'icon-512.png', optimize=True)
    icon(mark_png, 192, 0.14, INK).save(ICONS / 'icon-192.png', optimize=True)
    # Maskable icons get cropped to a circle on Android: keep art inside 80%.
    icon(mark_png, 512, 0.26, INK).save(ICONS / 'icon-512-maskable.png', optimize=True)
    icon(mark_png, 180, 0.16, INK).save(ICONS / 'apple-touch-icon.png', optimize=True)
    icon(mark_png, 32, 0.08, INK).save(ICONS / 'favicon-32.png', optimize=True)
    for f in ['icon-512.png', 'icon-192.png', 'icon-512-maskable.png', 'apple-touch-icon.png',
              'favicon-32.png']:
        print(f'  public/icons/{f}')

    ico = [icon(mark_png, s, 0.08, INK) for s in (16, 32, 48)]
    ico[2].save(ROOT / 'public' / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
    print('  public/favicon.ico  (16/32/48)')

    # Social card: mark on the brand black, 1200x630.
    og = Image.new('RGB', (1200, 630), INK)
    art = mark_png.copy()
    art.thumbnail((430, 430), Image.LANCZOS)
    og.paste(art, ((1200 - art.width) // 2, (630 - art.height) // 2 - 40), art)
    og.save(ROOT / 'public' / 'og-image.jpg', quality=92, optimize=True)
    print('  public/og-image.jpg  1200x630')


if __name__ == '__main__':
    main()
