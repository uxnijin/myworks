const PROJECT_FIGMA_CMYK_EXPORT = {
  slug: 'figma-cmyk-export',
  name: 'Figma CMYK Export',
  tag: 'Figma',
  icon: 'download',
  group: 'Figma Plugins',
  url: 'https://www.figma.com/community/plugin/1655421789860044772',
  summary: 'Export designs directly to print-ready CMYK PDF and JPEG.',
  lede: 'Figma works in RGB, but print shops require CMYK. Figma CMYK Export bridges the gap, allowing you to export any design directly into print-ready CMYK formats.',
  status: 'Live',
  blocks: [
    {
      t: 'stats',
      items: [
        { v: '50+', l: 'Unique Runs' },
        { v: '5+', l: 'Installs' },
        { v: '100% Free', l: 'No limitations' }
      ]
    },
    {
      t: 'p',
      x: `Figma works in RGB (screen colors), but print shops require CMYK. This plugin bridges the gap by letting you export any design directly into print-ready CMYK formats. Perfect for business cards, flyers, posters, and merchandise layouts.`
    },
    {
      t: 'image',
      src: 'https://www.figma.com/community/thumbnail?resource_id=1655421789860044772&resource_type=plugin',
      alt: 'Figma CMYK Export Thumbnail',
      caption: 'Figma CMYK Export plugin cover on Figma Community',
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
          icon: 'file',
          title: 'True CMYK PDFs',
          desc: 'Generates print-ready PDFs using a native CMYK profile for perfect color accuracy.'
        },
        {
          icon: 'image',
          title: 'Soft-Proofed JPEGs',
          desc: 'Preview how your colors will map to physical ink on screen before printing.'
        },
        {
          icon: 'gauge',
          title: 'High Resolution (300 DPI)',
          desc: 'Scale your exports automatically to ensure crystal-clear physical prints.'
        },
        {
          icon: 'zap',
          title: '100% Private & Fast',
          desc: 'All conversions happen locally inside Figma. Your design data is never uploaded to any external server.'
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
          title: 'Select your design',
          desc: 'Select any frame, group, or element on your Figma canvas that you want to export.'
        },
        {
          title: 'Run the plugin',
          desc: 'Launch Figma CMYK Export from your plugins menu.'
        },
        {
          title: 'Choose format & resolution',
          desc: 'Select your file format (PDF or JPEG) and choose your target resolution.'
        },
        {
          title: 'Export design',
          desc: 'Click "Export Design" to generate and download your print-ready file instantly.'
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
          title: 'v3 — Version Polish (July 2026)',
          desc: 'Updates to thumbnail and icon layouts, performance improvements, and renaming to Figma CMYK Export.'
        },
        {
          title: 'v2 — Format Options',
          desc: 'Added support for high-resolution 300 DPI exports and soft-proofed JPEG exports.'
        },
        {
          title: 'v1 — Initial Release',
          desc: 'Released the core CMYK export functionality, enabling direct conversion of Figma design frames into print-ready CMYK PDFs.'
        }
      ]
    }
  ]
};
