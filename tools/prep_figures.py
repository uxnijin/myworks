#!/usr/bin/env python3
"""
Prepare a supplied design image for the site.

    python3 tools/prep_figures.py crate-assets/hero.webp ~/Desktop/hero.png
    python3 tools/prep_figures.py --thumb crate-assets/thumb.webp ~/Desktop/hero.png
    python3 tools/prep_figures.py --crop 0,230,804,452 out.webp screen.png

**The image keeps its own aspect ratio.** `.frame img` is `width: 100%` with no
ratio box, so a figure is exactly as tall as its picture — which means padding a
1754x1080 export out to 16:9 only ever added white bands down both sides and made
the content smaller in the column. Nothing is padded, cropped or stretched here;
the only geometry is a width ceiling.

That ceiling is a ceiling, not a size: a source narrower than the target keeps
its own width, because upscaling invents detail and charges bytes for it.

Quality steps down from 88 until the file fits its budget, so a busy screenshot
costs a little sharpness rather than most of the page weight.

`--crop x,y,w,h` takes a region out of the source first, in the source image's
own pixels — for a card thumbnail that wants a band out of a full-length screen
rather than the whole thing.
"""
import subprocess, sys, tempfile, os
from PIL import Image

FIGURE = (2400, 150_000)   # max width, max bytes
THUMB  = (1600,  90_000)


def prep(src, dst, spec, crop=None):
    max_w, budget = spec
    im = Image.open(src).convert('RGB')
    if crop:
        x, y, cw, ch = crop
        im = im.crop((x, y, x + cw, y + ch))

    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)

    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as tmp:
        im.save(tmp.name)
        for q in (88, 82, 76, 70, 64, 58):
            subprocess.run(['cwebp', '-quiet', '-q', str(q), '-m', '6',
                            tmp.name, '-o', dst], check=True)
            size = os.path.getsize(dst)
            if size <= budget:
                break
        os.unlink(tmp.name)

    print(f'{dst}  {im.width}x{im.height}  {size/1024:.0f}KB  q{q}')


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
