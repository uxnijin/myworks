const PROJECT_FIGMA_CONTRAST_CHECKER = {
  slug: 'figma-contrast-checker',
  name: 'Figma Contrast Checker',
  tag: 'Figma',
  icon: 'check',
  group: 'Figma Plugins',
  url: 'https://www.figma.com/community/plugin/1655498565773835300',
  summary: 'Real-time WCAG contrast checks, bulk frames audit, and instant color fixes.',
  lede: 'Ensure your designs are accessible to everyone. Contrast Checker is a lightweight, real-time accessibility companion built directly for Figma that helps you design for compliance under WCAG 2.1 guidelines (AA & AAA standards).',
  status: 'Live',
  blocks: [
    {
      t: 'stats',
      items: [
        { v: '5+', l: 'Unique Runs' },
        { v: '2+', l: 'Installs' },
        { v: 'WCAG 2.1', l: 'Compliance' }
      ]
    },
    {
      t: 'p',
      x: `Ensure your designs are accessible to everyone. Contrast Checker is a lightweight, real-time accessibility companion built directly for Figma. It helps you design for compliance under WCAG 2.1 guidelines (AA & AAA standards) with instant feedback and smart, automated corrections.`
    },
    {
      t: 'image',
      src: 'https://www.figma.com/community/thumbnail?resource_id=1655498565773835300&resource_type=plugin',
      alt: 'Figma Contrast Checker Thumbnail',
      caption: 'Figma Contrast Checker plugin cover on Figma Community',
      ratio: '16-9',
      bleed: true
    },
    {
      t: 'h2',
      x: 'Key Features'
    },
    {
      t: 'cards',
      items: [
        {
          icon: 'eye',
          title: 'Real-time Contrast Analysis',
          desc: 'Select any text layer to instantly verify its contrast ratio against its solid background. The plugin automatically crawls parent frames and overlapping geometries to accurately find fills.'
        },
        {
          icon: 'grid',
          title: 'Bulk Audit Frame Mode',
          desc: 'Select a frame, group, or component set to scan all nested text layers at once. View a compliance checklist in a clean dashboard and jump to failing layers instantly.'
        },
        {
          icon: 'zap',
          title: 'Smart Color Fixer',
          desc: 'If a text layer fails guidelines, the plugin uses an HSL-shifting binary search to suggest the closest color lightness that passes AA or AAA standards. Apply with a single click.'
        },
        {
          icon: 'shield',
          title: 'WCAG 2.1 Compliance Badging',
          desc: 'Clear, glanceable indicator ratings separating AA Normal/Large and AAA Normal/Large checks.'
        }
      ]
    },
    {
      t: 'h2',
      x: 'How It Works'
    },
    {
      t: 'steps',
      items: [
        {
          title: 'Run the plugin',
          desc: 'Launch Figma Contrast Checker from your plugins menu.'
        },
        {
          title: 'Select a text layer or layout shape',
          desc: 'Instantly view its live contrast metrics and color swatches in the interface.'
        },
        {
          title: 'Get suggested color fixes',
          desc: 'If it fails, click one of the suggested color fix buttons to automatically update the text fill on your canvas.'
        },
        {
          title: 'Audit bulk layouts',
          desc: 'Select a parent frame or group to switch into Bulk Check Mode and audit multiple nested layers at once.'
        }
      ]
    },
    {
      t: 'h2',
      x: 'Version History'
    },
    {
      t: 'steps',
      items: [
        {
          title: 'v2 — Version Polish (July 2026)',
          desc: 'Updates to thumbnail and icon layouts, performance improvements, and renaming to Figma Contrast Checker.'
        },
        {
          title: 'v1 — Initial Release',
          desc: 'Released the core real-time WCAG contrast analysis, bulk frame checker, and automated HSL-shifting color corrector.'
        }
      ]
    }
  ]
};
