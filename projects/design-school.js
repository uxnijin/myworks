const PROJECT_DESIGN_SCHOOL = {
  slug: 'design-school',
  name: 'Design School',
  tag: 'Resource',
  icon: 'book',
  group: 'Resources',
  url: 'https://design.nijin.site/',
  summary: 'A curated collection of resources for learning design.',
  lede: 'What I actually send students, instead of a bookmark folder with four hundred links and no opinion.',
  status: 'Live',
  blocks: [
    {
      t: 'p',
      x: `After mentoring 500+ students at <a href="https://harisandcoacademy.com" target="_blank" rel="noopener">HACA</a>, I noticed I was answering the same question every intake: <em>"what should I read?"</em> — and answering it badly, with a link dump.`,
    },
    {
      t: 'p',
      x: `A link dump is a failure of nerve. It looks generous and it's actually the opposite: it hands the hardest part of the job — deciding what's worth your time — back to the person least equipped to do it.`,
    },
    { t: 'h2', x: 'The principle' },
    {
      t: 'callout',
      kind: 'info',
      title: 'Curation is subtraction',
      x: `The value of this collection is everything I <strong>left out</strong>. A list of 40 resources someone will actually finish beats a list of 400 they'll bounce off in a week.`,
    },
    {
      t: 'p',
      x: `So the rule is: if I wouldn't personally hand it to a specific student for a specific reason, it doesn't go in. Every entry has to answer "who is this for, and when in their learning?" — not just "is this good?"`,
    },
    { t: 'h2', x: 'Design decisions' },
    {
      t: 'p',
      x: `<strong>Ordered by learning stage, not by category.</strong> Categories are a librarian's mental model. Beginners don't need "Typography / Color / Layout" — they need "start here, then this."`,
    },
    {
      t: 'p',
      x: `<strong>No account, no email capture, no drip sequence.</strong> The point is to help, and a resource list gated behind a signup is a lead magnet wearing a teacher's clothes.`,
    },
    {
      t: 'p',
      x: `<strong>Fast and boring.</strong> A static page that loads instantly on a bad connection, because a meaningful share of the students I'm writing for are on one.`,
    },
    {
      t: 'image',
      src: '',
      alt: 'Design School resource index',
      caption: 'The index — grouped by where you are, not by what it is.',
      ratio: '16-9',
    },
    { t: 'h2', x: 'What I\'d change' },
    {
      t: 'p',
      x: `The hard part of a curated list isn't building it — it's the maintenance. Links rot, tools get acquired and enshittified, and a stale recommendation is worse than none, because it spends trust I need for the rest of the list. There's no review cadence on this yet, and there should be.`,
    },
  ],
};
