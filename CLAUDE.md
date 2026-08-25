# Working on this portfolio

## Figures — the house style

**Every figure is a screenshot of the real running app.** No generated
illustrations, no composed "anatomy" panels, no painted hero banners, no
invented research, pilots, metrics or user quotes. If a claim can't be
screenshotted, cut it or write it as prose.

**Screenshots go into a bezel, on a plain white 16:9 canvas, with no shadow.**

```
Canvas        1920 × 1080, pure white (#FFFFFF), nothing else on it
Bezel         onboarding-assets/iphone-bezels/Bezel.png (852 × 1741)
Screen hole   x 46–804, y 44–1695  → 759 × 1652, matches a 1206 × 2622 2× capture
Phone height  61.6% of the canvas height (665px on a 1080 canvas)
Layout        evenly spaced, centred horizontally and vertically
Shadows       none. No drop shadow, no glow, no gradient canvas, no tint.
```

Build them with `tools/compose_bezels.py` — it does the geometry, so don't
hand-place phones:

```bash
python3 tools/compose_bezels.py out.png 01-splash.png 02-intro.png 03-account.png
```

Five phones per figure reads best; four is fine for a shorter set.

## Screenshots

**Save every screen individually first, then compose.** Nijin makes his own
composites sometimes, so the individual captures are the real deliverable.

```
onboarding-assets/<app>-screens/           individual 2× PNGs, numbered in flow order
onboarding-assets/<app>-screens/images/    the finished 16:9 composites
```

Number the screens in flow order and put each error state next to the step it
belongs to (`09-error-email-unfinished.png` sits after `08-…-sending.png`).
Include a `README.md` in the screens folder mapping every file to its screen.

Capture at 2× on an iPhone 17 Pro simulator, status bar frozen:

```bash
xcrun simctl status_bar $DEV override --time "9:41" --cellularMode active \
  --cellularBars 4 --wifiMode active --wifiBars 3 --batteryState discharging --batteryLevel 92
```

This Mac's `xcode-select` points at CommandLineTools, so the iOS Simulator MCP
refuses. Use `export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer`
and drive the simulator through Bash instead — and say so rather than switching
silently.

## In a case study, say why

**`/case-studies` is where the reasoning goes.** A design entry points at
screens; a case study explains them. Naming what was used is the least
interesting half of a sentence — a reader can see the colour. What they cannot
see is why it beat the alternative.

So: a typeface gets a reason, a colour gets a reason, a merged tab gets a
reason. Keep them plain and short enough to read once:

- *"#65558F is not a new colour. It is the purple the app already wears, so the
  redesign arrives as the same app rather than a different one that took the
  name."*
- *"Courses and Coaching were one intent wearing two names, so they are a
  single tab called Learn."*

**Reasons have to be real.** A checkable fact is worth more than an elegant
argument — contrast ratios, a font's weight range, what the old screen actually
did. Compute the number rather than asserting it. What is still banned is what
the house style has always banned: invented research, invented users, invented
metrics. "Testing showed" is not available; "white on it clears AA at 6.5:1" is,
once you have worked it out.

**No grand theories.** One or two sentences per decision. If a reason needs a
paragraph to land, it is probably being dressed up.

## A design entry is figures, not a case study

**`/designs` is a design section. It is not where the long-form writing goes.**
The screens are the work; the prose exists to point at them. An entry is:

- one or two sentences of lede on the record in `data.js` — what the thing is,
  and nothing about how it was built
- a first paragraph in the body saying **it is a prototype build** and what it
  runs on
- then the figures, each with at most one short sentence in front of it and a
  terse caption under it — a list of the screens, not an argument
- an `h2` only when there are enough figures to need grouping (roughly eight or
  more), and then in plain words: "The plumbing", "Dark", "The therapist's side"

Around 150-400 words for the whole page, figures included. What does **not**
belong: numbered section runs ("1 · The problem"), research and discovery,
personas, user quotes, metrics, trade-off tables, "what I'd do next". If a
sentence is not pointing at something visible in a screenshot, cut it.

The tone to match is `/findings`: short sentences, one idea per paragraph,
ordinary words. Read `findings/slow-doesnt-always-mean-broken.js` before
writing a new entry.

Long-form work goes in **`/case-studies`** instead — its own collection in
`data.js`, its own body files under `case-studies/`.

## Onboarding case studies

**One project per flow.** Each onboarding flow is its own entry in `DESIGNS`
with its own file under `designs/` — they are not collected into a single page.

**One heading and one paragraph is the whole entry.** Around 130 words. Say
what the app is, and why the flow is shaped the way it is. The figures carry
the rest. Long case studies get rejected.

**Never name a reference app or say the flow is derived from anything.** Each
entry is presented as its own design.

**Names:** short, pronounceable English product names. Not Malayalam words.

**Provider marks are the real ones.** SF Symbol `apple.logo` for Apple; Google's
four-colour G from its published outline data — there is an SVG path parser in
the Kili app (`Design/Logos.swift`) to reuse.

## Paywalls

**Opposite rule to onboarding: they all collect on one page.** A paywall is one
or two screens, so `designs/paywalls.js` holds every one of them — a new offer
is an `h2` + a paragraph + its figures, not a new entry in `DESIGNS`. Same
length discipline as onboarding: around 130 words a paywall.

**One app, with a menu.** They all live in `/Users/nijin/Files/Code/paywalls-ios`
(`dev.curiousobjects.Paywalls`, `-pShot`, `-pSelfTest`) under a `Design` enum,
each with its own `Skin` — brand colour, its shade, a second colour, the wash
behind the hero. Shared: tokens, type, the small parts in `Design/Components`.

**Not one layout in six colours.** Each paywall answers a different problem — a
bundle, a quiet two-price switch, a mid-task limit, a comparison table, a tier
list, a one-off purchase — and gets the layout that problem wants. A re-skin
reads as filler. Pick the product to fit the design, as with onboarding.

**Screens live in `paywall-assets/<app>-screens/`** with the composites in
`images/` beside them, same as onboarding.

**Derive every number, then assert it.** A wrong number on a paywall is a
refund, so the monthly equivalent, the saving on the badge and the charge date
are computed from the prices in `Model/Offer.swift`, never typed into a label —
and `-pSelfTest` fails if they drift. Pin "today" to a fixed date so a
re-capture says the same thing.

**Capture the states either side of the button** — a plan switched, restore
with nothing to restore, a declined card. They're the part that makes it a
design rather than a poster.

**No confirmation screens.** What happens once the money moves belongs to the
app being sold, not to the paywall, and a "you're in" screen per paywall is the
same screen over and over. A paywall stops at the button.

**Two screens is a fine figure** — compose it with `--height 0.76` so the
phones fill the canvas instead of floating in white.

The onboarding rules about never naming a reference app, and about short
pronounceable English names, apply here too — and go further: a reference is a
style to learn from, never a composition to reproduce. The published original
has to be unrecognisable in the result.

## Content lives in code, and loads on demand

There is no CMS. Sanity is gone — every word and every entry is a file in this
repo, edited in the editor. What used to be a Studio round-trip on first paint
is now nothing at all.

**The split that matters is index vs body.** `data.js` is the only content file
loaded on every page. It holds `PROFILE`, the site copy (`SITE`, `HOME`,
`CONTACT`, `PAGE_COPY`), `CLIENTS`, and the **card-level fields** for every
design, product and finding. It does not hold a single `blocks` array.

Each entry's body lives in its own file and is fetched the first time that
entry is opened:

```
designs/<slug>.js     BODY('<slug>', { blocks: [...] })
projects/<slug>.js    BODY('<slug>', { blocks, privacyBlocks?, termsBlocks? })
findings/<slug>.js    BODY('<slug>', { blocks: [...] })
pages/about.js        PAGE('about', {...})
pages/graphics.js     PAGE('graphics', [...])
```

`BODY` and `PAGE` are globals defined in `script.js`; a body file is injected
as a plain `<script>`, which is why it reads as the data it is with no module
wrapper. `BODY` merges onto the index record matched on slug — slugs are unique
across all three collections, and the loader relies on that.

**The numbers.** Every page used to carry ~500KB of JS because all 28 entry
files were `<script>` tags in `index.html`. Now a page carries ~185KB, and one
case study body (2–54KB) arrives when you open it. `index.html` has five script
tags and never needs another one.

**How a body gets there**, in `script.js`:

- `loadScript(src)` keeps one promise per URL forever, so a body is fetched once
  and a second request joins the first rather than injecting a duplicate. A
  failed load drops out of the cache so a retry is possible.
- `whenLoaded(load, paint, title)` paints a `.skeleton` of the right shape
  immediately, then swaps in the real view. It checks `asyncToken`, so a slow
  body cannot paint over a page you have since navigated to.
- `prefetch(path)` runs on `pointerover` and `touchstart` for any `a[data-link]`,
  so hovering a card fetches its body before the click lands. On a warm hover
  the click paints directly with no skeleton frame.

**A card is drawn before its body exists**, so an entry that wants a figure on
its card must name it as `thumbUrl` in `data.js`. The old behaviour of borrowing
the first image block still works, but only for an entry whose body happens to
be in memory already — never on a cold index. Onboarding entries deliberately
borrow nothing (phones on a white canvas vanish at thumbnail size) and fall
through to the gradient carrying the product name.

**Adding an entry is two files:** a record in the right array in `data.js`
(with its `body:` path), and the body file itself. There is no `<script>` tag to
add any more, and no `DESIGN_<NAME>` const.

**Site copy is plain objects.** `SITE`, `HOME`, `CONTACT` and `PAGE_COPY` in
`data.js` drive the promo bar, the hero headline and typed words, the section
headings, the footer, the contact page, and each index page's title and lede.
`cms(value, fallback)` still wraps every read, so deleting a key falls back to
the default written at the call site rather than rendering blank.

`HOME.featuredProjects` and `HOME.latestSlugs` are lists of slugs choosing what
the home page pulls forward; empty means automatic.

**The toolkit is a row on /about, not a page.** `/exploring` is gone (it 301s
to `/about`). `ABOUT.tools` in `pages/about.js` is a list of
`{ name, icon }`, where `icon` names a real product mark in `/images/tools/` —
128px favicons pulled from Google's favicon service, then normalised to a 96px
canvas: a full-bleed tile keeps its own edges, a free-standing mark is trimmed
of its dead margin and set at 84px so the two read the same optical size. A
plain string still renders as a pill with no icon. Nothing draws brand logos
in SVG any more — `BRAND_ICONS` went with the page it served.

Google has no usable mark for a few products — some vendors publish only a
16px favicon (Blackmagic, Supabase, Adobe's per-product sites). Where the app
is on the App Store, take the real icon from
`itunes.apple.com/search?term=<app>&entity=macSoftware` (`artworkUrl512`, and
the URL takes a `256x256bb.png` suffix) — that is how DaVinci Resolve's icon
got here. Other routes that have paid off: a Mac app's own icon
(`sips -s format png -Z 256 "<App>.app/Contents/Resources/AppIcon.icns"` —
App Store and Icon Composer came from there), the vendor's
`apple-touch-icon.png` (usually 180px — Glide), and Google's branding assets
under `gstatic.com/images/branding/product/` (Play Store at 512px). Where
none of them has it, leave the tool out rather than shipping a blurry
upscale.

**Graphic design** is `pages/graphics.js` and the `/graphics` route: image,
title, client, year, and a `category` that groups the grid. A poster with no
`src` is skipped by the view, so the file doubles as a catalogue of work whose
artwork has not been added yet — 170 of the 171 rows are in that state. It is a
pure showcase, so a poster opens in the lightbox rather than a detail page.

**Findings are articles.** `/findings` (which was `/writings`, Medium-fed — that
fetch is long gone) holds findings, teardowns and notes. A record carries
`title`, `slug`, `category` (groups the grid), `kind`, `date`, `summary`, an
optional `sourceUrl`, and its body is the **same block DSL as a case study**.
Cards are the `.acard` from the Designs grid, so an article is exactly the size
of a case study or a product. `/writings` and `/writings/*` 301 to `/findings`
in `_redirects`, and `render()` rewrites the same pair for in-app history.

## Analytics

Microsoft Clarity, wired in `analytics.js`. It covers visitors, sessions,
clicks, scroll depth, time spent, locations and heatmaps out of the box; the
file adds the parts a single-page site has to do itself:

- `window.trackPage(path)` runs on every route change (called from `render()`),
  so heatmaps and scroll depth are recorded per page instead of all landing on
  the entry URL
- each page sets `page_type`, `page_name`, `slug`, `category` and `status` as
  Clarity custom tags, so the dashboard can filter to one case study or to all
  of them
- named events for the clicks that matter (`open_project`, `open_case_study`,
  `contact_submit`, `outbound`, …) via `window.track(name)`

The contributions graph reads `github-contributions-api.jogruber.de`, which
sends CORS headers; the older `deno.dev` host does not, so nothing ever loaded.
It returns one flat list of days, and `normaliseGitHub()` folds that back into
the week columns the painter expects.

**The project ID goes in one place:** `ANALYTICS.clarityProjectId` at the top of
`analytics.js`.
With no ID set, the whole file no-ops and `window.track` becomes a stub.

Selectors in the `CLICKS` list are matched against the click target with
`closest()`, not against a link ancestor, because some tracked things (a figure
opening the lightbox, a marquee logo) are not anchors.

## Detail pages are one centred column

Every detail page — a design case study, a product, a finding, a privacy or
terms sub-page — renders its `<article>` as `.doc-article`: `max-width: 720px`
with `margin-inline: auto`. `.prose` already capped at 720px, so this only
moves the column; it does not change the measure. The header, the figures and
the pagination all sit on that same measure.

The two surrounding layouts are sized so the column lands in the middle rather
than hugging the left gutter:

- a **design** page has no sidebar: the article centres in the container, the
  same as a finding. The library list it used to carry is the mobile drawer
- a **product** page keeps its sticky rail, but `.doc-grid` is
  `minmax(0, 720px) 240px` with a 72px gap, capped at `1032px` and centred
  inside the 1104px container, so the pair sits centred with equal margin
  either side. Do not put the rail back to `1fr 316px` — that stretches the
  grid across the whole container and pushes the reading column hard left.
- a **finding** page has neither, so the article simply centres in the container

The **rail leads with a screenshot, not a glyph**. Every product record carries
a `thumbUrl` pointing at `/images/thumbs/<slug>.webp` — a 960x540 webp, 16:9,
around 25KB — and `.rail-thumb` takes the full width of the rail with the name
underneath. `flex: 0 0 100%` on the thumbnail is what breaks the line, so a
product with no screenshot still falls back to the coloured `.rail-ico` glyph
sitting inline beside the name, with no second rule needed. The same `thumbUrl`
is what `cardThumb` reads, so a product card on an index gets the figure too.

Where the thumbnails come from: a Figma plugin's is its own 1920x1080 community
cover (the signed `s3-figma-plugin-images-production-sig` URL off the plugin
page — plain curl gets an HTML error page, it needs a browser UA **and** a
`Referer: https://www.figma.com/`). Everything else is a real capture of the
running product, driven over CDP as in the screenshotting notes. **Capture the
tool doing its job, not its empty state** — an untouched form is a black
rectangle at thumbnail size, so DNS Checker is shot mid-lookup on a real domain
and Speed Test after a real run.

**Check a capture for personal data before it ships.** Speed Test prints the
real client IP and city under the gauge, and IP Checker's whole top card is the
visitor's own address — both are cropped out with a `clip` region rather than
edited, and IP Checker's thumbnail is the result panel from looking up
`8.8.8.8`, so nothing on it belongs to anybody. Tasks Extension has no
thumbnail: it is a side panel that needs a live Google session, and its offline
render is an empty list with the icon font missing. It keeps the glyph until
there is a real screenshot to use.

**Every document opens the same way**: `.doc-h1` with the name, the mono meta
line, and one `.doc-lede` at reading size. A product page used to open quieter
than that — `.doc-name` at 22px over a small `.doc-brief` — but starting the
column in a smaller typeface than it continued in read as a different page, so
that pair is gone. The rail still carries the icon, the type and the user
count beside it; the header no longer repeats them.

**Every document is set to one reading scale.** Case studies, products, their
privacy and terms sub-pages, and findings all carry `read-doc` / `read-prose`:
a 720px measure, Inter at 18/1.65 with `-0.01em` in `--ink-soft`, and headings
in Inter's display cut — `font-variation-settings: 'opsz' 32` at weight 500,
h2 32/1.2 and h3 24/1.5. The rhythm is 18px between blocks, 48px before an h2
and 32px before an h3, and there is no hairline above a heading: space does
that job. The numbers come from designsystems.surf, which is the reading
experience being matched, and the Inter request in `index.html` carries the
`opsz` axis for it. The product page's old 17px headings are gone with it.

Two ties in the cascade need the double class (`.prose.read-prose`), because
`.prose p { margin: 0 }` and `.prose h2` would otherwise win on specificity.

Below 1080px the rail keeps 240px but the cap is dropped (`max-width: none`);
below 860px `.doc-grid` goes to `display: block` and the rail stacks underneath.

## Dark mode follows the system

**There is no toggle.** The page reads `prefers-color-scheme` and nothing
else — no attribute on `<html>`, no stored preference, no button in the
topbar. The OS switch already says which one the person wants, and a second
control on one portfolio site is a control to maintain, explain and get wrong
on the first paint.

**Only the tokens flip.** The whole theme is one
`@media (prefers-color-scheme: dark)` block at the top of `styles.css` that
restates the `:root` custom properties. Every rule below it reads tokens, so
no rule in the file knows which theme it is in. Adding a colour means adding
a token, not adding a dark rule — if you find yourself writing a selector
inside the media block, the colour underneath it is probably hardcoded and
wants tokenising instead.

The tokens that exist only because dark exists:

```
--panel / --panel-2      a card, then a popover raised above one
--panel-code             the code block
--plate                  a figure's backing — white in BOTH themes
--invert-bg / --invert-ink   the one dark pill; it swaps to black-on-white
--topbar-bg              the blurred sticky bar
--edge-strong            a focused input, a live tile
--scrim, --shadow-sm/md/lg, --scroll-thumb
--ok / --danger          green and red, lifted so both clear AA on #0c0c0d
--logo-filter            brightness(0), plus invert(1) in dark
--tk-k/s/n/f             syntax
```

**Two things deliberately stay light.**

- **A figure keeps its white plate.** Every screenshot here is phones on a
  1920x1080 white canvas, so a dark frame would only draw a border around a
  white rectangle. `--plate` is `#fff` in both themes.
- **The `.demo` widgets keep the light palette they were drawn in.** They are
  simulations of a light-mode product and each carries its own hardcoded
  blues, greens and greys, so the dark block hands the whole `.demo` subtree
  the light token values back rather than restyling two thousand lines. A new
  demo inherits that for free by being inside `.demo`.

The page is `#0c0c0d`, not black: hairlines stay readable on it, and the white
figures do not punch a hole through the page. `index.html` carries two
`theme-color` metas with `media` attributes so the browser chrome follows too.

## The mesh gradient

`mesh.js` renders the gradients, not CSS. The look being matched is a
canvas-rendered mesh gradient: one colour field that flows and folds into
itself, rather than blurred blobs sliding past each other, which is all a CSS
approach can manage.

For every pixel the position is first pushed around by a couple of sine waves
(a domain warp, which is what bends the colour boundaries), then the colour is
an inverse-distance blend of five control points drifting on slow lissajous
paths. It runs on a **64x64 buffer**; `.mesh-canvas` then scales it up 1.3x and
blurs it 14px, which turns the upscale facets into a continuous field and keeps
the blur's soft edges out of frame. A frame costs ~0.3ms.

- palettes stay in `styles.css` as `--g-base` / `--g1`…`--g4` on `.grad-1`…`.grad-6`;
  `mesh.js` reads them off the element, so colour changes never touch the JS
- `.gcard` mounts a canvas and holds one static frame; it only animates while
  its card is hovered
- `.gcard-live` (the banners) animates continuously and pauses itself when
  scrolled out of view
- the CSS blob layers underneath are hidden once the canvas mounts
  (`.gcard.has-mesh::before`), and remain the fallback if canvas fails
- `MeshGradient.scan()` runs after every route render; it is idempotent

**Colour rule, arrived at over three passes:** near-white pastels read as grey,
fully saturated read as heavy. The landing point is saturated hues lifted ~22%
toward white. White icons and labels sit on them with **no shadows** — small
white type gets `font-weight: 500` instead.

Watch for any rule that sets its own `background` after `.gcard` in the cascade
(`.show-media` did) — it kills the base colour and the card renders near-white.

## Adding a design entry

1. A record in the `DESIGNS` array in `data.js`: the card fields, plus
   `body: '/designs/<slug>.js'`. Add `thumbUrl` if the card should carry a
   figure — the index is drawn before the body loads, so it cannot borrow one.
2. `designs/<slug>.js` containing `BODY('<slug>', { blocks: [ … ] })`.
3. A new `category` also needs adding to the order list in `viewDirectory`
   (`script.js`), or its group sorts last on the /designs index.
4. **Build.** `node tools/prerender.js && python3 tools/make_og.py`, then commit
   what they write. Until you do, the new entry has no page for a crawler and
   no social card. See "The site is prerendered" below.

There is no `<script>` tag to add and no `DESIGN_<NAME>` const — the body is
fetched by the path on the record when someone opens the entry.

Entry names split on the first `:` everywhere they render — bold product name,
muted subtitle — so "Parcel: Premium Courier Booking" is the pattern to follow.

**Covers are the entry's icon on its gradient, not artwork.** Avatar colours are
hashed from the slug (`avaColor` in `script.js`) and the card gradient from
`gradClass`; the `icon` sits on top in white. The only thing that overrides it
is a `logoUrl` or `thumbUrl` on the record — `hasLogo` is `!!p.logoUrl` and
nothing else. Figma plugins used to render their store icon from
`/images/<slug>-logo.png`; six rounded-square app icons in a row read as a store
listing, so they take the plain icon like everything else. Onboarding case
studies don't borrow their first figure either (phones on a white canvas
disappear at thumbnail size) — they fall through to the gradient carrying the
product name.

Block DSL reference is at the top of `data.js`. Callouts are a hairline rule
and a lead-in line — no tinted boxes with an icon in a circle.

## The site is prerendered

**Every route is a real HTML file, and it is generated, not written.** Run this
after any edit to `data.js`, a body file, `index.html`, or `blocks.js`:

```bash
node tools/prerender.js && python3 tools/make_og.py
```

Commit what they produce. `node tools/prerender.js --check` exits non-zero when
the committed pages are stale, which is the thing to run if you are unsure.

**Why it exists.** The site was a single-page app behind `/*  /index.html  200`,
so every URL served the same file: one `<title>`, one description, a canonical
pointing at `/`, and an empty `<div id="view">`. A visitor never saw it, because
`script.js` paints a few milliseconds later. Googlebot runs the JavaScript
eventually, but eventually is a render queue measured in days — and the social
crawlers and the answer engines (OAI-SearchBot, PerplexityBot, Claude-SearchBot)
do not run it at all. To all of them the entire portfolio was one untitled page.

**What it writes.** 58 files: `<route>.html` for every page, plus `sitemap.xml`
and `llms.txt`. Each one carries a unique title, description and canonical, the
OG and Twitter tags, a JSON-LD `@graph`, and **the article's real text**,
rendered by `renderBlocks` — the same function the browser calls, so the static
copy and the painted copy cannot say different things.

**`<route>.html`, never `<route>/index.html`.** Netlify serves a flat file for
an extensionless request directly, and 301s a directory index to a trailing
slash. Written the second way, `/designs/plate` answers on `/designs/plate/`,
one redirect hop from every internal link, every sitemap entry, and its own
canonical tag. This was measured against the live site, not assumed. The home
page is `index.html` because it has to be.

**Netlify serves a real file in preference to a redirect rule**, which is what
makes this work without touching `_redirects`. The catch-all stays last and
still answers anything that is not a generated page.

**Three invariants hold it together:**

- `index.html` is the shell *and* the home page. The generator fills four marked
  regions in it — `seo:head`, `seo:view`, `seo:nav`, `seo:foot` — and leaves
  everything else alone. Do not hand-edit inside those markers; edit the copy in
  `SEO` in `data.js` and re-run. Do edit outside them freely.
- **The head is decided in one place.** `SEO` in `data.js` holds every title and
  description; `tools/prerender.js` bakes them, and `applySeo()` in `script.js`
  re-applies them on a client-side navigation. No view sets its own
  `document.title` any more — one that did would win the race and undo the rest.
- **The first paint must not move.** The generated markup for the top of each
  page is byte-identical to what the router paints over it: the `.hero` on home,
  `.page-head` on an index, `.doc-head` on a document. Below that the generated
  index pages are a `.seo-list`, styled in `styles.css` for exactly this moment.
  If you change one side of that pair, change the other.

**A body file may not touch the DOM.** The generator runs `data.js`, `blocks.js`
and every body in a Node `vm` with no `document`. That is the constraint that
makes prerendering possible at all, and `blocks.js` is pure string templating
today. Keep it that way.

## SEO, the parts that are not prerendering

- **`SEO` in `data.js` is the copy.** Titles aim at 50-60 characters with the
  keyword first and the name last; descriptions at 140-160, written as a
  sentence a person would read, because the click it earns is itself a ranking
  input. `SEO.keywords` is not a meta tag — it is the list that keeps `/contact`,
  `/about` and the index ledes pointed at the same intent.
- **`/contact` is the page for someone deciding rather than browsing.** Under
  the form it carries what I do, how a project runs, and the questions that come
  up first. All three live in `SEO.services`, `SEO.process` and `SEO.faq`, read
  three times over: as the cards on the page, as the same list in the
  prerendered HTML, and as `OfferCatalog` and `FAQPage` in its schema. Change
  the object, not the markup.

  The questions are an accordion, built on `<details>`. Laid out flat they ran
  longer than the rest of the page put together; collapsed, the section is a
  scannable list of the six things people ask. `<details>` keeps its contents in
  the DOM whether it is open or not, so every answer is still in the HTML a
  crawler reads and nothing is hidden from search by collapsing it. `<summary>`
  takes one heading element as its content, so the question stays an `h3` in the
  document outline and still announces as a disclosure button.

  This was briefly a separate `/hire` page. A sales page sitting next to the
  contact page was one page too many, and the two competed for the same
  visitor; `/hire` and its aliases now 301 to `/contact`, and `render()` catches
  the in-app history the same way it catches `/projects`. The form stays at the
  top of the page: someone who already knows what they want should not have to
  scroll past a pitch to reach it.
- **Social cards are generated too.** `tools/make_og.py` writes 1200x630 PNGs
  into `/images/og/` — one per entry with a `thumbUrl`, plus `default.png`.
  `og:image` used to point at the 1024x1024 avatar, which every platform was
  cropping into a chin. The card puts the entry's own screenshot on it at its
  real 16:9; nothing on it is invented.
- **`robots.txt` blocks nothing**, and names the answer engines explicitly so
  the open default is not mistaken for an oversight. In particular the body
  files stay crawlable: blocking them would leave Googlebot's rendered copy of
  every case study showing a load error where the article should be.
- **`llms.txt` is generated** from the same route list, so it cannot go stale.
- **Analytics is not running.** `ANALYTICS.clarityProjectId` in `analytics.js`
  is still empty, so `window.track` is a stub and no traffic is being recorded
  at all. Nothing else here can be judged until it is set.

## Prototypes

The iOS apps behind the case studies live outside this repo, in
`/Users/nijin/Files/Code/<app>-ios`, and get their own GitHub repo. Note that
`/Users/nijin/Files/Code` is itself a git repo pointing at `uxnijin/parcel-copy`
with a large pile of unrelated pending changes — never push app work through it.

This repo is `uxnijin/myworks` and deploys from `main`.
