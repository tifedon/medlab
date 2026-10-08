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
          { href: '/about/mission', label: 'Mission and vision' },
          { href: '/about/values', label: 'Values' },
          { href: '/about/leadership', label: 'Leadership' },
          { href: '/about/governance', label: 'Governance' },
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
    label: 'Research',
    href: '/research',
    intro: 'The research lifecycle from upcoming to published, with methods and integrity standards.',
    columns: [
      {
        title: 'Research',
        links: [
          { href: '/research', label: 'Research hub' },
          { href: '/research/current', label: 'Current research' },
          { href: '/research/upcoming', label: 'Upcoming research' },
          { href: '/research/completed', label: 'Completed research' },
          { href: '/research/themes', label: 'Research themes' },
          { href: '/research/methodology', label: 'Methodology' },
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
  {
    label: 'Publishing',
    href: '/publications',
    intro: 'Publications, books and the Sterling IMRES Press publishing programme.',
    columns: [
      {
        title: 'Publications',
        links: [
          { href: '/publications', label: 'All publications' },
          { href: '/publications/articles', label: 'Articles' },
          { href: '/publications/reviews', label: 'Reviews' },
          { href: '/publications/evidence-reviews', label: 'Evidence reviews' },
          { href: '/publications/reports', label: 'Reports' },
        ],
      },
      {
        title: 'Books and Press',
        links: [
          { href: '/press', label: 'Sterling IMRES Press' },
          { href: '/books', label: 'All books' },
          { href: '/books/reference', label: 'Reference books' },
          { href: '/books/textbooks', label: 'Textbooks' },
          { href: '/books/handbooks', label: 'Handbooks' },
          { href: '/books/monographs', label: 'Monographs' },
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
