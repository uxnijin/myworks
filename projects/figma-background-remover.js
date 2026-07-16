const PROJECT_FIGMA_BACKGROUND_REMOVER = {
  slug: 'figma-background-remover',
  name: 'Figma Background Remover',
  tag: 'Figma',
  icon: 'layers',
  group: 'Figma Plugins',
  url: 'https://www.figma.com/community/plugin/1655438283557730288',
  summary: 'Erase backgrounds from any image for free.',
  lede: 'Remove the background from any photo in just one click, processing everything safely on your own device.',
  status: 'Live',
  blocks: [
    {
      t: 'stats',
      items: [
        { v: '240+', l: 'Unique Runs' },
        { v: '20+', l: 'Installs' },
        { v: '100% Free', l: 'On-Device AI' }
      ]
    },
    {
      t: 'p',
      x: `Remove the background from any photo in just one click. Select an image on your Figma canvas or drag and drop a file from your computer. Our plugin processes everything safely on your own device without sending your images to external servers.`,
    },
    {
      t: 'h2',
      x: 'Key Features'
    },
    {
      t: 'cards',
      items: [
        {
          icon: 'zap',
          title: 'One-Click AI Removal',
          desc: 'Automated background removal utilizing advanced edge-matting technology to handle complex boundaries like hair and fine details.'
        },
        {
          icon: 'slider',
          title: 'Manual Restore / Erase',
          desc: 'Refine automated AI cuts directly within the plugin by switching between Erase (transparency) and Restore (recovers original details) modes.'
        },
        {
          icon: 'image',
          title: '2x High-Resolution Output',
          desc: 'Exports layers at double resolution from Figma, delivering much sharper images to the AI model and returning crisp output.'
        }
      ]
    },
    {
      t: 'h2',
      x: 'Feather Edge & Brush Controls'
    },
    {
      t: 'p',
      x: `Added a new Feather Edge slider (0px to 100px) in the brush editor, allowing you to draw soft, blended edges when erasing or restoring masks. You also have precise zoom controls: smooth pinch-to-zoom support for trackpads and Ctrl / Cmd + Mouse Wheel scrolling to zoom in and out of the editor canvas seamlessly.`
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'Privacy First & On-Device Processing',
      x: `Unlike other background removers, this plugin runs entirely in your local browser sandbox. The AI models run directly on your own device, meaning your images are never uploaded to third-party servers.`
    },
    {
      t: 'h2',
      x: 'Version History'
    },
    {
      t: 'steps',
      items: [
        {
          title: 'v6 — Brush Refinements & 2x Scale',
          desc: 'Introduced manual restore/erase brush option, high-resolution 2x layer exports, precise trackpad pinch-to-zoom controls, and feather edge brush options.'
        },
        {
          title: 'v5 — Ultra Quality Model',
          desc: 'Added support for the large (Ultra Quality) background removal model with advanced edge-matting for fine details.'
        },
        {
          title: 'v1 to v4 — Initial Launch & Polish',
          desc: 'Released the core on-device background remover with logo and thumbnail updates, fully free for the Figma community.'
        }
      ]
    }
  ]
};
