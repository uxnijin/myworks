#!/usr/bin/env python3
"""The Route Planner card thumbnail.

Same reasoning as the other two: five phones on white is right for a 720px
column and unreadable at card size. Three big screens instead, on the app's own
pale blue-grey with the accent glowing behind them — light, to match the
figures in the case study.
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
SHOTS = ['04-overview', '10-driving', '20-summary']
SET = 'light'

TOP = (247, 249, 252)      # background, light — a grey-blue, never pure white
BOTTOM = (219, 229, 246)
GLOW = (61, 125, 255)      # accent — the route line


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
    cx, cy, r = w // 2, round(h * 0.52), round(h * 0.60)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=42)
    glow = glow.filter(ImageFilter.GaussianBlur(200))
    return Image.composite(Image.new('RGB', CANVAS, GLOW), base, glow)


def main():
    src = os.path.join(ROOT, 'route-planner-assets', 'screens', SET)
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

    dst = os.path.join(ROOT, 'route-planner-assets', 'thumb.png')
    out.save(dst, quality=95)
    print(dst, out.size)


if __name__ == '__main__':
    main()
