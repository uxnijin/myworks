const PROJECT_FIGMA_TABLE_CREATOR = {
  slug: 'figma-table-creator',
  name: 'Figma Table Creator',
  tag: 'Figma',
  icon: 'hash',
  group: 'Figma Plugins',
  url: 'https://www.figma.com/community/plugin/1655589087289276591',
  summary: 'Generate fully editable, responsive tables in seconds.',
  lede: 'Create fully responsive tables without the headache. Populate with blank templates or import real data from external files in one click.',
  status: 'Live',
  blocks: [
    {
      t: 'stats',
      items: [
        { v: '150+', l: 'Unique Runs' },
        { v: '10+', l: 'Installs' },
        { v: '100% Free', l: 'No limitations' }
      ]
    },
    {
      t: 'p',
      x: `Create fully responsive tables without the headache. Whether you need a blank spreadsheet template or want to bring in real data from an external file, Smart Table Generator handles it in one click. The plugin reads your data and styles it automatically, creating badges for statuses, formatting dates, and right-aligning currencies.`,
    },
    {
      t: 'h2',
      x: 'Key Features'
    },
    {
      t: 'cards',
      items: [
        {
          icon: 'palette',
          title: 'Smart Style Presets',
          desc: 'Instantly pick a style—Minimal, Notion, Stripe, Linear, or Material—and fine-tune your paddings or border radius.'
        },
        {
          icon: 'upload',
          title: 'CSV Data Import',
          desc: 'Populate your table with real data in one click by importing CSV or external text data.'
        },
        {
          icon: 'layers',
          title: 'Auto Layout Structure',
          desc: 'Generated tables use native Figma Auto Layout constraints, making them fully responsive and easy to resize.'
        }
      ]
    },
    {
      t: 'h2',
      x: 'Automatic Cell Styling & Formatting'
    },
    {
      t: 'p',
      x: `No more manual styling. The plugin dynamically formats status indicators into colorful badges, detects and formats dates, and automatically right-aligns currency and numeric fields. Toggle columns on or off, add row and column paddings, and customize corners in seconds.`
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'Built for UI Designers',
      x: `Designed as a high-fidelity utility to save hours of manual component building, Figma Table Creator is the ultimate time-saver for UX/UI designers.`
    },
    {
      t: 'h2',
      x: 'Version History'
    },
    {
      t: 'steps',
      items: [
        {
          title: 'v1 — Initial Launch',
          desc: 'Released the core table generator to the Figma community, featuring 5 style presets, automatic status/date/currency cell styling, column toggling, and layout controls.'
        }
      ]
    }
  ]
};
