#!/usr/bin/env python3
"""The Oppam card thumbnail.

The in-article figures are five phones on plain white — right for a 720px
column, far too small at card size, where a thumbnail is about 330px wide and
the only things that survive are shape, colour and the companion's face. So the
card gets its own composition: three big phones on Kerala morning light, with a
sun behind the middle one.
"""
import os
import importlib.util
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location('cb', os.path.join(ROOT, 'tools', 'compose_bezels.py'))
cb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cb)

CANVAS = (1920, 1080)
PHONE_H = 0.82
GAP = 54
SHOTS = ['01-onboarding-0', '10-home-morning', '22-therapist']

TOP = (255, 252, 242)      # warm paper, top of the sky
BOTTOM = (253, 233, 190)   # haldi light, settling at the bottom
GLOW = (255, 206, 92)      # the sun itself


def ground():
    """Warm vertical light, with a sun low behind the middle phone."""
    w, h = CANVAS
    sky = Image.new('RGB', (1, h))
    px = sky.load()
    for y in range(h):
        t = y / (h - 1)
        px[0, y] = tuple(round(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(3))
    base = sky.resize(CANVAS, Image.BILINEAR)

    glow = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(glow)
    cx, cy, r = w // 2, round(h * 0.60), round(h * 0.52)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=190)
    glow = glow.filter(ImageFilter.GaussianBlur(160))
    return Image.composite(Image.new('RGB', CANVAS, GLOW), base, glow)


def main():
    src = os.path.join(ROOT, 'oppam-assets', 'screens', 'light')
    bezel = Image.open(cb.BEZEL).convert('RGBA')
    mask = cb.screen_mask(bezel)

    ph = round(CANVAS[1] * PHONE_H)
    pw = round(bezel.width * ph / bezel.height)
    total = len(SHOTS) * pw + GAP * (len(SHOTS) - 1)

    out = ground()
    x = (CANVAS[0] - total) // 2
    y = (CANVAS[1] - ph) // 2
    for name in SHOTS:
        p = cb.phone(os.path.join(src, name + '.png'), bezel, mask).resize((pw, ph), Image.LANCZOS)
        out.paste(p, (x, y), p)
        x += pw + GAP

    dst = os.path.join(ROOT, 'oppam-assets', 'thumb.png')
    out.save(dst, quality=95)
    print(dst, out.size)


if __name__ == '__main__':
    main()
