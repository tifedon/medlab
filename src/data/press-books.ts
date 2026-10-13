import type { Book } from '@/lib/books';

/** Sterling IMRES Press titles supplied directly by the institute. */
export const pressBookRecords: Book[] = [
  {
    slug: 'encyclopedia-of-pulmonary-medicine',
    title: 'The Encyclopedia of Pulmonary Medicine',
    subtitle: 'A Clinical Reference on Lung Disease, Diagnostic Testing, and Therapy for Students, Nurses, Respiratory Therapists, and Physicians in Training',
    category: 'reference',
    authors: [],
    editors: [
      {
        name: 'Robert H. Glassman, MD, MACP, FCCP',
        role: 'Editor-in-Chief',
      },
    ],
    publisher: 'Sterling IMRES Press',
    pages: 800,
    summary: 'A structured clinical reference that brings together pulmonary diagnostics, imaging, respiratory physiology, critical care and therapeutics in 200 self-contained entries across 15 sections. It is written for medical, nursing, respiratory therapy and physician assistant students, as well as physicians in training.',
    keywords: [
      'pulmonary medicine',
      'lung disease',
      'respiratory medicine',
      'diagnostic testing',
      'critical care',
      'therapeutics',
    ],
    divisions: ['clinical-medicine', 'nursing-allied-health', 'editorial-publications'],
    verifiedVia: 'Sterling IMRES Press production files',
    status: 'published',
    isPressTitle: true,
    coverImage: '/books/encyclopedia-of-pulmonary-medicine/front-cover.png',
    backCoverImage: '/books/encyclopedia-of-pulmonary-medicine/back-cover.jpg',
  },
];
