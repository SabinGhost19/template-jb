#!/usr/bin/env python3
"""Turns the raw training photos into the site's image set.

The source files are phone photographs taken on an overcast afternoon: flat,
slightly milky in the shadows, with a cool cast from the clouds. Left as they
are they look like snapshots next to the site's editorial layout. The grade
below is deliberately restrained — these are photographs of real children at a
real session, and the job is to make them look well shot, not retouched.

Each step and why it is here:

  exif      phone panoramas are stored rotated; without this they land sideways
  crop      only where the frame needs tightening, given per photo below
  denoise   blurs chroma only, so JPEG colour mottling goes without softening edges
  levels    sets a true black point from percentiles; overcast frames never have one
  curve     a gentle S, plus a warm lift in the highlights and a neutral shadow,
            which cancels the blue cast without turning the grass yellow
  vibrance  saturates the flat midtones and leaves the already-vivid bibs alone
  unsharp   small radius with a threshold, so grass texture is not amplified
  vignette  barely there; enough to hold the eye in frame

    python3 scripts/grade-photos.py
"""
import pathlib
import sys

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'src' / 'assets' / 'new-images-training'
OUT = ROOT / 'src' / 'assets' / 'images'

# (source, output, target aspect ratio or None, focus 0..1 along the cropped axis)
PHOTOS = [
    # "01 Academia" — a wide carousel of match-day frames, in display order.
    # The hero is not produced here: it is `hero-football.jpg`, kept as supplied.
    ('during-match/IMG_8167.JPEG', 'matchday-01.jpg', 16 / 9, 0.46),
    ('during-match/IMG_8115.JPEG', 'matchday-02.jpg', 16 / 9, 0.5),
    ('during-match/IMG_8184.JPEG', 'matchday-03.jpg', 16 / 9, 0.48),
    ('during-match/IMG_8176.JPEG', 'matchday-04.jpg', 16 / 9, 0.52),
    ('during-match/IMG_8201.JPEG', 'matchday-05.jpg', 16 / 9, 0.52),
    # The three values in the philosophy section.
    ('relationship-teamwork/IMG_8137.JPEG', 'value-respect.jpg', 4 / 5, 0.44),
    ('training/IMG_8170.JPEG', 'value-discipline.jpg', 4 / 5, 0.46),
    ('relationship-teamwork/IMG_8182.JPEG', 'value-passion.jpg', 4 / 5, 0.5),
    # Gallery mosaic, in display order.
    ('relationship-teamwork/IMG_8192.JPEG', 'gallery-01.jpg', 3 / 4, 0.42),
    ('training/IMG_8058.JPEG', 'gallery-02.jpg', 16 / 9, 0.55),
    ('relationship-teamwork/IMG_8132.JPEG', 'gallery-03.jpg', 4 / 3, 0.5),
    # Squared up and held left: the ball in the foreground is the whole point
    # of this frame, and a centred crop in its grid cell loses it.
    ('training/IMG_8190.JPEG', 'gallery-04.jpg', 1 / 1, 0.3),
    ('relationship-teamwork/IMG_8140.JPEG', 'gallery-05.jpg', 16 / 9, 0.46),
    ('training/IMG_8164.JPEG', 'gallery-06.jpg', 4 / 3, 0.5),
]

# Frames kept in `new-images-training` but not published: relationship-teamwork
# IMG_8134, training IMG_8064 and IMG_8065. They duplicate the framing of ones
# already in use — add them here if a section needs more.
_RESERVE = [
]

MAX_LONG_EDGE = 2200


def lut(points):
    xs, ys = zip(*points)
    return np.interp(np.arange(256), xs, ys).clip(0, 255)


# Shadows stay neutral (the cast to remove is blue, so blue is pulled down least
# in the dark end and most in the light end), highlights drift warm.
LUT_R = lut([(0, 0), (34, 30), (128, 137), (216, 226), (255, 255)])
LUT_G = lut([(0, 0), (34, 29), (128, 132), (216, 221), (255, 254)])
LUT_B = lut([(0, 2), (34, 30), (128, 126), (216, 210), (255, 250)])


def crop_to(im, ratio, focus):
    """Crops to `ratio`; `focus` slides the window along whichever axis is cut."""
    if ratio is None:
        return im
    w, h = im.size
    if w / h > ratio:
        new_w = round(h * ratio)
        left = int(round((w - new_w) * focus))
        return im.crop((left, 0, left + new_w, h))
    new_h = round(w / ratio)
    top = int(round((h - new_h) * focus))
    return im.crop((0, top, w, top + new_h))


def vignette(h, w, strength=0.16, radius=0.8):
    yy, xx = np.mgrid[0:h, 0:w]
    cy, cx = (h - 1) / 2, (w - 1) / 2
    d = np.sqrt(((yy - cy) / cy) ** 2 + ((xx - cx) / cx) ** 2) / np.sqrt(2)
    return (1 - strength * np.clip((d - radius) / (1 - radius), 0, 1) ** 1.7)[..., None]


def grade(im):
    y, cb, cr = im.convert('YCbCr').split()
    cb = cb.filter(ImageFilter.GaussianBlur(1.0))
    cr = cr.filter(ImageFilter.GaussianBlur(1.0))
    im = Image.merge('YCbCr', (y, cb, cr)).convert('RGB')
    im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=88, threshold=4))

    a = np.asarray(im).astype(np.float32)

    # Per-channel levels from percentiles: an overcast frame has no true black
    # and no clean white, and stretching each channel also removes the cast.
    for c in range(3):
        lo, hi = np.percentile(a[..., c], (0.4, 99.6))
        a[..., c] = (a[..., c] - lo) * (255.0 / max(hi - lo, 1e-3))
    a = a.clip(0, 255)

    idx = a.astype(np.uint8)
    a = np.stack([LUT_R[idx[..., 0]], LUT_G[idx[..., 1]], LUT_B[idx[..., 2]]], axis=-1)

    # Vibrance, not saturation: the boost fades out as a pixel gets more
    # colourful, so the orange bibs do not turn into blocks.
    luma = a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    chroma = np.abs(a - luma[..., None]).max(axis=-1)
    boost = 1.0 + 0.28 * (1.0 - np.clip(chroma / 70.0, 0, 1))[..., None]
    a = luma[..., None] + (a - luma[..., None]) * boost

    a *= vignette(*a.shape[:2])
    return Image.fromarray(a.clip(0, 255).astype(np.uint8))


def main() -> int:
    if not SRC.exists():
        print(f'lipsește {SRC}', file=sys.stderr)
        return 1

    for name, out_name, ratio, focus in PHOTOS:
        source = SRC / name
        if not source.exists():
            print(f'lipsește {source}', file=sys.stderr)
            return 1

        im = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
        im = crop_to(im, ratio, focus)

        if max(im.size) > MAX_LONG_EDGE:
            scale = MAX_LONG_EDGE / max(im.size)
            im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)

        out = OUT / out_name
        grade(im).save(out, quality=90, subsampling=0, optimize=True, progressive=True)
        print(f'  {name:42} -> {out_name:22} {im.size[0]}x{im.size[1]}  {out.stat().st_size // 1024} KB')

    return 0


if __name__ == '__main__':
    raise SystemExit(main())
