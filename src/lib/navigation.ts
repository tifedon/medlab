export interface NavLink {
  href: string;
  label: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  intro: string;
  columns: { title: string; links: NavLink[] }[];
}

export const primaryNav: NavGroup[] = [
  {
    label: 'Institute',
    href: '/about',
    intro: 'Who we are, how we are governed and the nine divisions that make up Sterling IMRES.',
    columns: [
      {
        title: 'About',
        links: [
          { href: '/about', label: 'About Sterling IMRES' },
          { href: '/about#mission', label: 'Mission and vision' },
          { href: '/about#values', label: 'Values' },
          { href: '/about#leadership', label: 'Leadership' },
          { href: '/about#governance', label: 'Governance' },
        ],
      },
      {
        title: 'Structure',
        links: [
          { href: '/divisions', label: 'Divisions and units' },
          { href: '/people', label: 'People directory' },
          { href: '/collaborate', label: 'Collaborate' },
          { href: '/contact', label: 'Contact' },
        ],
      },
    ],
  },
  {
    label: 'Research and Publications',
    href: '/research',
    intro: 'Studies, publications and books brought together in one research hub.',
    columns: [
      {
        title: 'Research',
        links: [
          { href: '/research', label: 'Research and publications hub' },
          { href: '/research?stage=current', label: 'Current research' },
          { href: '/research?stage=upcoming', label: 'Upcoming research' },
          { href: '/research?stage=completed', label: 'Completed research' },
          { href: '/research#themes', label: 'Research themes' },
          { href: '/research#methodology', label: 'Methodology' },
        ],
      },
      {
        title: 'Publications',
        links: [
          { href: '/research#publications', label: 'All publications' },
        ],
      },
      {
        title: 'Books',
        links: [
          { href: '/research#books', label: 'Books in the research hub' },
          { href: '/books', label: 'All books' },
          { href: '/books/reference', label: 'Reference books' },
          { href: '/books/textbooks', label: 'Textbooks' },
          { href: '/books/handbooks', label: 'Handbooks' },
          { href: '/books/monographs', label: 'Monographs' },
        ],
      },
      {
        title: 'Projects and integrity',
        links: [
          { href: '/projects', label: 'Projects' },
          { href: '/scientific-integrity', label: 'Scientific integrity' },
          { href: '/scientific-integrity/evidence-review', label: 'Evidence review' },
          { href: '/scientific-integrity/research-standards', label: 'Research standards' },
        ],
      },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/disclaimer', label: 'Medical disclaimer' },
  { href: '/corrections', label: 'Corrections policy' },
];
