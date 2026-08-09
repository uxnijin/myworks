#!/usr/bin/env python3
"""Compose 2x iPhone captures into the portfolio's 16:9 figure style.

Plain white canvas, phones in the real bezel, evenly spaced, no shadow.
Geometry is measured from onboarding-assets/iphone-bezels/Bezel.png and from
the reference figure, so this file is the single source of truth for the look —
don't hand-place phones.

    python3 tools/compose_bezels.py out.png shot1.png shot2.png shot3.png
    python3 tools/compose_bezels.py --height 0.66 out.png shot1.png shot2.png
"""
import sys
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BEZEL = os.path.join(ROOT, 'onboarding-assets', 'iphone-bezels', 'Bezel.png')

CANVAS = (1920, 1080)
SCREEN = (46, 44, 805, 1696)      # left, top, right, bottom of the screen hole
PHONE_H = 0.616                   # share of canvas height
GAP = 0.019                       # share of canvas width, between phones


def screen_mask(bezel):
    """The screen hole, as a mask.

    The bezel is transparent both inside the screen and outside the phone body,
    so a plain rectangular paste leaks past the screen's rounded corners. Flood
    filling the transparent pixels from a point inside the screen picks out the
    hole alone — and leaves the dynamic island out of it, since the island is
    opaque and the fill flows around it.
    """
    trans = bezel.split()[3].point(lambda a: 255 if a < 8 else 0)
    seed = (bezel.width // 2, bezel.height // 2 + 300)
    ImageDraw.floodfill(trans, seed, 128, thresh=0)
    return trans.point(lambda v: 255 if v == 128 else 0)


def phone(shot_path, bezel, mask):
    """One capture seated in the bezel, at the bezel's native size."""
    shot = Image.open(shot_path).convert('RGB')
    w, h = SCREEN[2] - SCREEN[0], SCREEN[3] - SCREEN[1]

    # cover-fit: scale to fill the screen hole, then centre-crop the overflow
    k = max(w / shot.width, h / shot.height)
    scaled = shot.resize((round(shot.width * k), round(shot.height * k)), Image.LANCZOS)
    left = (scaled.width - w) // 2
    top = (scaled.height - h) // 2
    scaled = scaled.crop((left, top, left + w, top + h))

    layer = Image.new('RGBA', bezel.size, (0, 0, 0, 0))
    layer.paste(scaled, (SCREEN[0], SCREEN[1]))
    layer.putalpha(mask)
    return Image.alpha_composite(layer, bezel)


def compose(out_path, shots, phone_h=PHONE_H, canvas=CANVAS):
    bezel = Image.open(BEZEL).convert('RGBA')
    mask = screen_mask(bezel)
    cw, ch = canvas

    ph = round(ch * phone_h)
    pw = round(bezel.width * ph / bezel.height)
    gap = round(cw * GAP)

    total = len(shots) * pw + gap * (len(shots) - 1)
    if total > cw - 80:                       # shrink to keep a margin
        k = (cw - 80) / total
        ph = round(ph * k)
        pw = round(bezel.width * ph / bezel.height)
        gap = round(gap * k)
        total = len(shots) * pw + gap * (len(shots) - 1)

    out = Image.new('RGB', canvas, (255, 255, 255))
    x = (cw - total) // 2
    y = (ch - ph) // 2
    for s in shots:
        p = phone(s, bezel, mask).resize((pw, ph), Image.LANCZOS)
        out.paste(p, (x, y), p)           # no shadow, by design
        x += pw + gap

    out.save(out_path, quality=95)
    print(f'{out_path}  {len(shots)} phones  {cw}×{ch}')


if __name__ == '__main__':
    args = sys.argv[1:]
    height = PHONE_H
    if args and args[0] == '--height':
        height = float(args[1]); args = args[2:]
    if len(args) < 2:
        sys.exit(__doc__)
    compose(args[0], args[1:], phone_h=height)
