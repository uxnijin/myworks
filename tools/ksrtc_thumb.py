#!/usr/bin/env python3
"""The KSRTC card thumbnail.

Same reasoning as the Oppam one: the in-article figures are five phones on
plain white, which is right for a 720px column and unreadable at ~330px on the
Designs index. The card gets three big phones instead, on the app's own teal,
so it reads as public-transport infrastructure at a glance.
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
SHOTS = ['03-results', '10-seats', '21-ticket']

TOP = (243, 250, 249)      # a very pale wash of the brand teal
BOTTOM = (206, 232, 228)
GLOW = (15, 128, 116)      # BaseColor teal, the app's one accent


def ground():
    w, h = CANVAS
    strip = Image.new('RGB', (1, h))
    px = strip.load()
    for y in range(h):
        t = y / (h - 1)
        px[0, y] = tuple(round(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(3))
    base = strip.resize(CANVAS, Image.BILINEAR)

    glow = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(glow)
    cx, cy, r = w // 2, round(h * 0.72), round(h * 0.46)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=54)
    glow = glow.filter(ImageFilter.GaussianBlur(170))
    return Image.composite(Image.new('RGB', CANVAS, GLOW), base, glow)


def main():
    src = os.path.join(ROOT, 'ksrtc-assets', 'screens', 'light')
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

    dst = os.path.join(ROOT, 'ksrtc-assets', 'thumb.png')
    out.save(dst, quality=95)
    print(dst, out.size)


if __name__ == '__main__':
    main()
