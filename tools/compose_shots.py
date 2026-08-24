#!/usr/bin/env python3
"""
Lay raw frame exports out as one figure.

The slides Nijin usually supplies are already composed. Frames exported
straight out of Figma are not: they are full-page captures, one per screen,
far too tall to read on their own in a 720px reading column. This puts a few
of them side by side on a ground of their own instead.

    python3 tools/compose_shots.py out.png a.png b.png c.png
    python3 tools/compose_shots.py --bg '#0B0B0B' --trim out.png a.png b.png

Panels are scaled to a common width and hung from the top, so a longer screen
simply runs further down — a design board, not a grid that crops to fit.
`--trim` cuts each panel to the tallest one's height when a page scrolls far
past what is worth showing.

The canvas is whatever size the contents make it. Nothing is padded out to
16:9; `prep_figures.py` then carries that ratio through to the webp.
"""
import sys
from PIL import Image

PAD, GAP = 90, 60
PANEL_W = 1100


def compose(out, srcs, bg='#0B0B0B', trim=False):
    ims = [Image.open(s).convert('RGB') for s in srcs]
    ims = [im.resize((PANEL_W, round(im.height * PANEL_W / im.width)), Image.LANCZOS)
           for im in ims]

    if trim:
        h = min(im.height for im in ims)
        ims = [im.crop((0, 0, im.width, h)) for im in ims]

    body_h = max(im.height for im in ims)
    W = PAD * 2 + len(ims) * PANEL_W + (len(ims) - 1) * GAP
    H = PAD * 2 + body_h

    canvas = Image.new('RGB', (W, H), bg)
    x = PAD
    for im in ims:
        canvas.paste(im, (x, PAD))
        x += PANEL_W + GAP
    canvas.save(out)
    print(f'{out}  {W}x{H}  {len(ims)} panels')


if __name__ == '__main__':
    args = sys.argv[1:]
    bg = '#0B0B0B'
    if '--bg' in args:
        i = args.index('--bg'); bg = args[i + 1]; del args[i:i + 2]
    trim = '--trim' in args
    args = [a for a in args if a != '--trim']
    if len(args) < 2:
        sys.exit(__doc__)
    compose(args[0], args[1:], bg, trim)
