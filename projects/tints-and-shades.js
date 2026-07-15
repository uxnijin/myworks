const PROJECT_TINTS_AND_SHADES = {
  slug: 'tints-and-shades',
  name: 'Tints & Shades',
  tag: 'Figma Plugin',
  icon: 'droplet',
  group: 'Figma Plugins',
  url: 'https://tintsandshades.nijin.site/',
  productUrl: 'https://www.figma.com/community/plugins',
  summary: 'A Figma plugin that generates color scales of tints and shades in seconds.',
  lede: 'Pick a base color, get a mathematically uniform scale, push it straight into Figma variables — or out as Tailwind config, CSS custom properties, or Style Dictionary JSON.',
  status: 'Open source',
  blocks: [
    {
      t: 'p',
      x: `Building a color scale by hand is a special kind of tedious. You pick a brand color, then eyeball nine variations of it, then discover halfway through the UI that your 300 and your 400 are indistinguishable and your 700 has quietly gone purple.`,
    },
    {
      t: 'p',
      x: `The maths to avoid that is not complicated. It's linear interpolation. The plugin's whole job is to run it consistently and put the result where you need it.`,
    },
    { t: 'h2', x: 'The algorithm' },
    {
      t: 'p',
      x: `Two operations, one formula each. A <strong>tint</strong> blends the base color's channels toward white. A <strong>shade</strong> blends them toward black. Steps are interpolated at even intervals so no two neighbours jump.`,
    },
    {
      t: 'code',
      lang: 'js',
      file: 'the entire engine',
      x: `// Tint — blend each RGB channel toward 255 (white)
const tint = (c, factor) => Math.round(c + (255 - c) * factor);

// Shade — blend each RGB channel toward 0 (black)
const shade = (c, factor) => Math.round(c * (1 - factor));

// Even intervals prevent visible jumps between neighbours
for (let i = 1; i <= steps; i++) {
  const factor = i / (steps + 1);
  scale.unshift(rgb.map(c => shade(c, factor)));  // darker side
  scale.push(rgb.map(c => tint(c, factor)));      // lighter side
}`,
    },
    {
      t: 'p',
      x: `That's it. That's the plugin. The interesting design work wasn't the maths — it was deciding what to do with the output.`,
    },
    { t: 'h3', x: 'Try it' },
    {
      t: 'p',
      x: `This runs the exact formula above, live. Change the base color, drag the step count, click any swatch to copy its hex.`,
    },
    { t: 'demo', kind: 'scale' },
    {
      t: 'callout',
      kind: 'warning',
      title: 'The honest limitation of RGB interpolation',
      x: `Linear RGB blending is <strong>mathematically</strong> uniform, not <strong>perceptually</strong> uniform. Human vision isn't linear in RGB, so evenly-spaced RGB steps don't look evenly spaced — mid-tones bunch up and saturated hues can drift as they lighten. A perceptual space like OKLCH would fix this. That's the single biggest improvement available to this plugin, and it isn't done.`,
    },
    { t: 'h2', x: 'Design decisions' },
    { t: 'h3', x: 'Output where the work actually happens' },
    {
      t: 'p',
      x: `A color scale that lives in a plugin panel is useless. The scale has to land in the file, or in the codebase, without a copy-paste round trip:`,
    },
    {
      t: 'cards',
      items: [
        { icon: 'layers', title: 'Figma variables', desc: 'Any generated scale saves directly into the document\'s variable list. Batch-sync several scales at once.' },
        { icon: 'code', title: 'Tailwind config', desc: 'Hex arrays formatted for a tailwind.config file — paste and go.' },
        { icon: 'braces', title: 'CSS variables', desc: 'Root custom properties, ready for a stylesheet.' },
        { icon: 'file', title: 'Design tokens JSON', desc: 'Style Dictionary–shaped schema for handoff pipelines.' },
      ],
    },
    { t: 'h3', x: 'Contrast is a design constraint, not a report' },
    {
      t: 'p',
      x: `The scale is built to help hit WCAG AA and AAA — but the useful move is surfacing contrast <em>while</em> you're picking, not auditing it after you've shipped. A scale that tells you the 400 fails on white before you've built forty components with it has saved you a day.`,
    },
    {
      t: 'p',
      x: `Everything is calculated in memory, inside Figma's sandboxed iframe. Step preferences persist via <code>figma.clientStorage</code>. No registration, no analytics, no network calls — your design libraries never leave the client.`,
    },
    { t: 'h2', x: 'Where it gets used' },
    {
      t: 'table',
      head: ['Role', 'What they reach for it for'],
      rows: [
        ['Product designers', 'Hover and active states that relate to the base color instead of being guessed.'],
        ['Design system leads', 'Standard 50–950 scales with uniform intervals across every brand color.'],
        ['Frontend developers', 'Exact hex arrays, so "which blue?" stops being a question.'],
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'The plugin panel running inside Figma',
      caption: 'The plugin panel inside Figma.',
      ratio: '16-9',
    },
    { t: 'h2', x: 'What I\'d change' },
    {
      t: 'p',
      x: `<strong>Move to OKLCH.</strong> The whole limitation above collapses if the interpolation happens in a perceptual space. It's the one change that would make the output <em>look</em> as uniform as it measures.`,
    },
    {
      t: 'p',
      x: `<strong>Publish the source.</strong> The plugin is MIT licensed and there's no public repo behind that claim yet — which makes the claim close to meaningless. Either the repo goes up or the line comes off the page.`,
    },
  ],
  privacyBlocks: [
    { t: 'p', x: '<em>Last updated: July 8, 2026</em>' },
    {
      t: 'p',
      x: 'This privacy policy describes how we collect, protect, and use user information in the Tints & Shades Figma plugin. We are committed to protecting your privacy. The plugin runs entirely inside Figma\'s sandboxed iframe environment, and we do not collect, process, or send any of your file colors or design assets to external servers.'
    },
    { t: 'h2', x: 'Data Collection & Processing' },
    {
      t: 'p',
      x: 'Tints & Shades does not require user registration or profile tracking. It runs purely on the frontend of your local computer. When you select colors and click export options, the code calculates the RGB color variations entirely in-memory.'
    },
    {
      t: 'p',
      x: 'No analytics cookies, tracking scripts, or database queries are utilized, ensuring that your corporate design libraries remain fully private.'
    },
    { t: 'h2', x: 'Figma Integration Compliance' },
    {
      t: 'p',
      x: 'The plugin\'s operations and variables binding functions fully comply with Figma API terms of service and user data policies. We request access strictly to edit selection nodes when you choose to "Save Styles" inside your active document canvas.'
    },
    { t: 'h2', x: 'Security & Safety' },
    {
      t: 'p',
      x: 'All temporary user configurations (such as your chosen steps count) are saved within Figma\'s client storage sandbox (`figma.clientStorage`). Since no data leaves the Figma client, your design files are completely secure from external breaches.'
    },
    { t: 'h2', x: 'Contact' },
    {
      t: 'p',
      x: 'If you have questions or feedback regarding this policy, please reach out to us at <a href="mailto:privacy@uxnijin.com">privacy@uxnijin.com</a>.'
    }
  ],
  termsBlocks: [
    { t: 'p', x: '<em>Last updated: July 8, 2026</em>' },
    { t: 'h2', x: 'Acceptance of Terms' },
    {
      t: 'p',
      x: 'By using the Tints & Shades Figma plugin, you agree to comply with and be bound by the following Terms of Service. If you do not agree, please uninstall the plugin immediately.'
    },
    { t: 'h2', x: 'Description of Service' },
    {
      t: 'p',
      x: 'Tints & Shades is a design productivity plugin built for the Figma platform. It allows users to automatically compute, map, and export palette layers and styles. The tool is provided completely free of charge "as is".'
    },
    { t: 'h2', x: 'License to Use' },
    {
      t: 'p',
      x: 'We grant you a personal, worldwide, royalty-free, and non-exclusive license to use the plugin within your Figma editor environment. You may not copy, reverse-engineer, or redistribute the source code for commercial sale without direct authorization.'
    },
    { t: 'h2', x: 'Responsibilities' },
    {
      t: 'p',
      x: 'You agree to use the plugin responsibly and avoid making malicious actions that disrupt Figma\'s editor API channels. You are responsible for maintaining your Figma account safety guidelines.'
    },
    { t: 'h2', x: 'Disclaimer of Warranties' },
    {
      t: 'p',
      x: 'The plugin is provided "as is". The developers offer no warranties, express or implied, regarding its performance, suitability for a particular system architecture, or completeness. Use at your own discretion.'
    },
    { t: 'h2', x: 'Contact' },
    {
      t: 'p',
      x: 'For support queries regarding these terms, please contact us at <a href="mailto:support@uxnijin.com">support@uxnijin.com</a>.'
    }
  ]
};
