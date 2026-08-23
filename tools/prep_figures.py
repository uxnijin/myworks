#!/usr/bin/env python3
"""
Prepare a supplied design image for the site.

Every figure on a detail page is a 16:9 webp at 2400x1350, and every card
thumbnail is 1600x900 — both sitting somewhere around 80-150KB. A PNG straight
out of Figma is usually 1-4MB, which is the whole page budget spent on one
picture, so nothing goes in without passing through here.

    python3 tools/prep_figures.py ember-assets/hero.webp ~/Desktop/hero.png
    python3 tools/prep_figures.py --thumb ember-assets/thumb.webp ~/Desktop/list.png
    python3 tools/prep_figures.py --thumb --crop 0,230,804,452 out.webp screen.png

A card thumbnail usually wants a band out of a full-length screen rather than
the whole thing padded into a letterbox, so --crop x,y,w,h takes that band
first, in the source image's own pixels.

An image that is not already 16:9 is padded — never cropped, never stretched —
onto white, because the house canvas is white anyway and a phone that has been
squeezed reads as a mistake. Quality steps down from 88 until the file fits the
budget, so a busy screenshot costs a little sharpness rather than 900KB.
"""
import subprocess, sys, tempfile, os
from PIL import Image

FIGURE = (2400, 1350, 150_000)   # width, height, max bytes
THUMB  = (1600,  900,  90_000)


def prep(src, dst, spec, crop=None):
    w, h, budget = spec
    im = Image.open(src).convert('RGB')
    if crop:
        x, y, cw, ch = crop
        im = im.crop((x, y, x + cw, y + ch))

    # pad to 16:9 on white rather than crop — the canvas is white already
    target = w / h
    if abs(im.width / im.height - target) > 0.005:
        if im.width / im.height < target:
            box = (int(round(im.height * target)), im.height)
        else:
            box = (im.width, int(round(im.width / target)))
        canvas = Image.new('RGB', box, 'white')
        canvas.paste(im, ((box[0] - im.width) // 2, (box[1] - im.height) // 2))
        im = canvas

    im = im.resize((w, h), Image.LANCZOS)

    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as tmp:
        im.save(tmp.name)
        for q in (88, 82, 76, 70, 64, 58):
            subprocess.run(['cwebp', '-quiet', '-q', str(q), '-m', '6',
                            tmp.name, '-o', dst], check=True)
            size = os.path.getsize(dst)
            if size <= budget:
                break
        os.unlink(tmp.name)

    print(f'{dst}  {w}x{h}  {size/1024:.0f}KB  q{q}')


if __name__ == '__main__':
    args = sys.argv[1:]
    spec = THUMB if '--thumb' in args else FIGURE
    args = [a for a in args if a != '--thumb']
    crop = None
    if '--crop' in args:
        i = args.index('--crop')
        crop = [int(v) for v in args[i + 1].split(',')]
        del args[i:i + 2]
    if len(args) != 2:
        sys.exit(__doc__)
    dst, src = args
    os.makedirs(os.path.dirname(dst) or '.', exist_ok=True)
    prep(src, dst, spec, crop)
