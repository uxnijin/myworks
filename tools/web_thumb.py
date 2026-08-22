#!/usr/bin/env python3
"""Card thumbnail for a web case study.

The iOS entries put three phones on a tinted ground. A desktop product gets the
same treatment with one browser-sized screenshot: inset on a 16:9 tinted
canvas, rounded, no shadow — so it reads as a product at ~330px on the Designs
index instead of dissolving into the white page.

    python3 tools/web_thumb.py <shot.png> <out.png> <top-hex> <bottom-hex> <glow-hex>
"""
import sys
from PIL import Image, ImageDraw, ImageFilter

CANVAS = (1920, 1080)
INSET = 0.86          # share of canvas width the screenshot takes
RADIUS = 20


def hexrgb(s):
    s = s.lstrip('#')
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def ground(top, bottom, glow):
    w, h = CANVAS
    strip = Image.new('RGB', (1, h))
    px = strip.load()
    for y in range(h):
        t = y / (h - 1)
        px[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    base = strip.resize(CANVAS, Image.BILINEAR)

    mask = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(mask)
    cx, cy, r = w // 2, round(h * 0.62), round(h * 0.58)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=40)
    mask = mask.filter(ImageFilter.GaussianBlur(190))
    return Image.composite(Image.new('RGB', CANVAS, glow), base, mask)


def rounded(img, radius):
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, img.width - 1, img.height - 1),
                                           radius=radius, fill=255)
    img = img.convert('RGBA')
    img.putalpha(mask)
    return img


def main():
    shot_path, out_path, top, bottom, glow = sys.argv[1:6]
    out = ground(hexrgb(top), hexrgb(bottom), hexrgb(glow))

    shot = Image.open(shot_path).convert('RGB')
    w = round(CANVAS[0] * INSET)
    h = round(shot.height * w / shot.width)
    if h > CANVAS[1] * 0.88:                       # keep it inside the canvas
        h = round(CANVAS[1] * 0.88)
        w = round(shot.width * h / shot.height)
    shot = rounded(shot.resize((w, h), Image.LANCZOS), RADIUS)

    out.paste(shot, ((CANVAS[0] - w) // 2, (CANVAS[1] - h) // 2), shot)
    out.save(out_path, quality=95)
    print(out_path, out.size)


if __name__ == '__main__':
    main()
