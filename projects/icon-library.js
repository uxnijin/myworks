const PROJECT_ICON_LIBRARY = {
  slug: 'icon-library',
  name: 'Icon Library',
  tag: 'Resource',
  icon: 'palette',
  group: 'Resources',
  url: 'https://icons.nijin.site/',
  summary: 'Search, recolor and download 314,000+ open-source icons — free, no account.',
  lede: 'One search box over every good open-source icon set, so you can find the right glyph, tune it, and paste it — without leaving the browser or making an account.',
  status: 'Live',
  blocks: [
    {
      t: 'stats',
      items: [
        { v: '314,000+', l: 'Icons' },
        { v: '230', l: 'Icon sets' },
        { v: 'SVG · PNG', l: 'Copy or download' },
        { v: '100% free', l: 'No account' },
      ],
    },
    {
      t: 'p',
      x: `Every designer keeps three icon tabs open — one library has the outline style, another has the brand glyph, a third has the arrow that actually points the right way. So you tab, search, screenshot, and re-color by hand. <strong>Icon Library</strong> collapses that into a single search box that reaches across 230 of the best open-source sets at once.`,
    },
    {
      t: 'image',
      src: '/icon-library-assets/landing.png',
      alt: 'Icon Library landing page showing 314,000+ open-source icons and set folders',
      caption: 'Open it with no search and every set shows up as a browsable folder, grouped by category.',
    },
    { t: 'h2', x: 'The idea' },
    {
      t: 'callout',
      kind: 'info',
      title: 'Find, tune, paste — nothing in between',
      x: `Picking an icon should be three seconds, not three tabs. So the whole tool is built around one loop: search everything at once, recolor and resize it live, then copy or download the exact file you need. No sign-up, no install, no "export project" step.`,
    },
    {
      t: 'p',
      x: `It's the web companion to my Figma plugin, running entirely in the browser on the free <a href="https://iconify.design" target="_blank" rel="noopener">Iconify</a> API. There's no backend and no API key — your favorites, recents and color choices stay in your own browser and never leave it.`,
    },
    { t: 'h2', x: 'What it does' },
    {
      t: 'cards',
      items: [
        {
          icon: 'search',
          title: 'One search, every set',
          desc: 'Type a plain word and it searches all 230 sets together. A built-in synonym map means "delete", "buy" and "profile" find the right glyphs, not just literal name matches.',
        },
        {
          icon: 'slider',
          title: 'Recolor & resize live',
          desc: 'Set any hex color and a pixel size from the toolbar and every icon updates instantly, so you preview exactly what lands in your design.',
        },
        {
          icon: 'download',
          title: 'Copy or download',
          desc: 'One tap for Copy SVG, Copy PNG, or a downloaded SVG / PNG at your chosen size. Paste straight into Figma or your codebase.',
        },
        {
          icon: 'layers',
          title: 'Favorites & find similar',
          desc: 'Star the icons you reuse, revisit recents, and jump to the same concept across every other set and style to keep a consistent family.',
        },
      ],
    },
    { t: 'h2', x: 'Search that finds all of it' },
    {
      t: 'p',
      x: `The public API caps a single query at 999 results, which quietly hides most of what exists. So the app fans out per-set in the background and streams matches in as you scroll — a search for <em>arrow</em> gathers over 5,500 icons instead of stopping at a thousand.`,
    },
    {
      t: 'image',
      src: '/icon-library-assets/search.png',
      alt: 'Search results for "arrow" showing 5,506 matching icons across sets',
      caption: '5,506 matches for one word — every set, in one grid, recolorable from the toolbar.',
    },
    { t: 'h2', x: 'Grab it exactly how you need it' },
    {
      t: 'p',
      x: `Click any icon and a detail panel opens with a large preview, a size slider with quick presets, and a color picker with hex input. From there it's one tap to copy or download as SVG or PNG — and <strong>Find similar</strong> jumps to the same concept across every other set so your icons stay a family, not a pile.`,
    },
    {
      t: 'image',
      src: '/icon-library-assets/drawer.png',
      alt: 'Icon detail panel with size presets, color picker and copy/download buttons',
      caption: 'The detail panel: size, color, copy or download — and the source set and license, right there.',
    },
    { t: 'h2', x: 'How designers use it' },
    {
      t: 'steps',
      items: [
        { title: 'Search a plain word', desc: 'Type what the icon means — "cart", "back", "settings". Results stream in from every set at once.' },
        { title: 'Tune color and size', desc: 'Match your brand hex and target pixel size and preview it live before you commit.' },
        { title: 'Copy or download', desc: 'Grab the SVG or PNG in one tap and paste it into Figma or your code. Star it if you\'ll want it again.' },
      ],
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'Free, private, and no account',
      x: `No sign-up, no email capture, nothing to install. It runs client-side, so nothing you search or favorite leaves your browser. Each icon keeps its original open-source license (mostly MIT / Apache-2.0 / CC0) — check the source set before commercial use.`,
    },
    {
      t: 'launch',
      title: 'Open Icon Library',
      desc: 'Search 314,000+ open-source icons and copy them in a couple of seconds.',
      url: 'https://icons.nijin.site/',
      label: 'Open the tool',
    },
  ],
};
