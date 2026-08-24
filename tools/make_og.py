#!/usr/bin/env python3
"""
tools/make_og.py — the 1200x630 card a link unfurls into.

Why: og:image used to point at avatar.jpg, which is 1024x1024. Every platform
that renders a large card wants 1.91:1, so the square was being letterboxed or
centre-cropped into a chin and a forehead, on every link to every page.

What it makes, into /images/og/:

    default.png        the site card, used by any page with nothing of its own
    <slug>.png         one per entry that has a thumbnail

The layout is the site's: white, Inter-ish display type, a mono kicker, and the
entry's own screenshot filling the right third. Nothing is invented here — the
picture on the card is the same capture that is on the page.

    python3 tools/make_og.py           # only what is missing or out of date
    python3 tools/make_og.py --force   # all of them again

Re-run it after adding an entry with a thumbUrl, and commit the result.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "images" / "og"
FORCE = "--force" in sys.argv

W, H = 1200, 630
PAD = 72
INK = (11, 11, 12)
SOFT = (110, 112, 118)
LINE = (228, 229, 232)
BG = (255, 255, 255)

FONT_PATH = "/System/Library/Fonts/SFNS.ttf"
MONO_PATH = "/System/Library/Fonts/SFNSMono.ttf"


def font(size, weight="Semibold", path=FONT_PATH):
    f = ImageFont.truetype(path, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


# ---------------------------------------------------------------- the records
#
# data.js is read by Node rather than parsed here: it is JavaScript, and the
# only correct parser for JavaScript is a JavaScript engine.

READ = r"""
const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={console};ctx.window=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(process.argv[1]+'/data.js','utf8'),ctx);
const g=(e)=>vm.runInContext(e,ctx);
const pick=(arr,kind)=>g(arr).map(e=>({
  slug:e.slug, name:e.name||e.title, category:e.category||e.group||'',
  tag:e.tag||'', thumb:e.thumbUrl||'', kind
}));
console.log(JSON.stringify({
  profile: g('PROFILE'), seo: g('SEO'),
  entries: [].concat(
    pick('CASE_STUDIES','Case study'), pick('DESIGNS','Design'),
    pick('PROJECTS','Product'), pick('FINDINGS','UX finding'))
}));
"""


def load():
    out = subprocess.run(
        ["node", "-e", READ, str(ROOT)], capture_output=True, text=True, check=True
    )
    return json.loads(out.stdout)


# ------------------------------------------------------------------- drawing


def wrap(draw, text, fnt, max_w, max_lines=3):
    words = str(text).split()
    lines, cur = [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
            if len(lines) == max_lines:
                break
    if cur and len(lines) < max_lines:
        lines.append(cur)
    if len(lines) == max_lines and len(" ".join(lines).split()) < len(words):
        while lines[-1] and draw.textlength(lines[-1] + "…", font=fnt) > max_w:
            lines[-1] = lines[-1].rsplit(" ", 1)[0]
        lines[-1] += "…"
    return lines


def rounded(im, radius):
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1], radius, fill=255)
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    return out


def cover(im, size):
    """Fill `size` without distorting — the screenshot's proportions are the work."""
    tw, th = size
    r = max(tw / im.width, th / im.height)
    im = im.resize((max(1, round(im.width * r)), max(1, round(im.height * r))), Image.LANCZOS)
    left = (im.width - tw) // 2
    top = (im.height - th) // 2
    return im.crop((left, top, left + tw, top + th))


def avatar(path, size):
    im = Image.open(path).convert("RGB")
    im = cover(im, (size, size))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size - 1, size - 1], fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    return out


def card(title, kicker, thumb_path, profile, seo, sub=None):
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    # The screenshot sits top right at its own 16:9, uncropped. A tall panel
    # filled by centre-cropping looked tidier and threw away two thirds of the
    # design it was supposed to be showing.
    text_w = W - PAD * 2
    if thumb_path and thumb_path.exists():
        panel_w = 448
        panel_h = round(panel_w * 9 / 16)
        try:
            shot = Image.open(thumb_path).convert("RGB")
            shot = rounded(cover(shot, (panel_w, panel_h)), 16)
            x = W - PAD - panel_w
            y = PAD + 4
            im.paste(shot, (x, y), shot)
            d.rounded_rectangle([x, y, x + panel_w - 1, y + panel_h - 1], 16, outline=LINE, width=2)
            text_w = W - PAD * 3 - panel_w + 60
        except Exception as e:
            print(f"  ! {thumb_path.name}: {e}")

    # identity, top left
    try:
        av = avatar(ROOT / profile["avatar"].lstrip("/"), 56)
        im.paste(av, (PAD, PAD), av)
        d.text((PAD + 72, PAD + 16), seo["fullName"], font=font(24, "Semibold"), fill=INK)
    except Exception:
        d.text((PAD, PAD + 16), seo["fullName"], font=font(24, "Semibold"), fill=INK)

    # the kicker, in the site's mono, pinned to the bottom
    ktop = H - PAD - 26
    if kicker:
        d.text((PAD, ktop), kicker.upper(), font=font(19, "Medium", MONO_PATH), fill=SOFT)

    # a supporting line above it, where there is one
    sub_lines = []
    sub_f = font(27, "Regular")
    if sub:
        sub_lines = wrap(d, sub, sub_f, W - PAD * 2, 2)
    sub_h = len(sub_lines) * 38
    floor = ktop - 56 - sub_h

    # the title, set as large as the room allows
    ceiling = PAD + 96 + 24
    size = 62
    while size > 32:
        f = font(size, "Semibold")
        lines = wrap(d, title, f, text_w, 3)
        if len(lines) * round(size * 1.16) <= floor - ceiling:
            break
        size -= 4
    f = font(size, "Semibold")
    lines = wrap(d, title, f, text_w, 3)
    lh = round(size * 1.16)
    y = floor - len(lines) * lh
    for ln in lines:
        d.text((PAD, y), ln, font=f, fill=INK)
        y += lh

    y = floor + 26
    for ln in sub_lines:
        d.text((PAD, y), ln, font=sub_f, fill=SOFT)
        y += 38

    return im


def save(im, path):
    OUT.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True)


def main():
    data = load()
    profile, seo, entries = data["profile"], data["seo"], data["entries"]

    made = skipped = 0

    # the site card
    default = OUT / "default.png"
    if FORCE or not default.exists():
        save(
            card(
                f"{seo['jobTitle']} in {seo['locality']}, {seo['region']}",
                f"{seo['siteUrl'].split('//')[1]} · app, web and product design",
                None,
                profile,
                seo,
                "Mobile apps, web products and design systems, designed and built end to end. "
                "30+ clients, 500+ design students mentored.",
            ),
            default,
        )
        made += 1
    else:
        skipped += 1

    for e in entries:
        if not e["thumb"]:
            skipped += 1
            continue
        thumb = ROOT / e["thumb"].lstrip("/")
        out = OUT / f"{e['slug']}.png"
        if not FORCE and out.exists() and thumb.exists() and out.stat().st_mtime > thumb.stat().st_mtime:
            skipped += 1
            continue
        kicker = " · ".join(x for x in [e["kind"], e["category"]] if x)
        save(card(e["name"], kicker, thumb, profile, seo), out)
        made += 1

    print(f"og: {made} written, {skipped} unchanged or without a thumbnail")


if __name__ == "__main__":
    main()
