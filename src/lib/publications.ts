import { publicationRecords } from '@/data/publications';

export type PublicationType =
  | 'research-article'
  | 'review-article'
  | 'systematic-review'
  | 'meta-analysis'
  | 'evidence-summary'
  | 'clinical-review'
  | 'research-report'
  | 'technical-report'
  | 'educational-article'
  | 'position-paper'
  | 'editorial'
  | 'guideline'
  | 'monograph';

export interface Contributor {
  name: string;
  affiliation?: string;
  orcid?: string;
  role?: string;
}

export interface Publication {
  slug: string;
  title: string;
  type: PublicationType;
  authors: Contributor[];
  authorsTruncated?: boolean;
  corporateAuthor?: string;
  journal: string;
  publisher: string;
  volume?: string;
  issue?: string;
  pages?: string;
  publishedDate: string;
  doi?: string;
  pmid?: string;
  pmcid?: string;
  url: string;
  openAccess: boolean;
  license?: string;
  keywords: string[];
  summary: string;
  divisions: string[];
  verifiedVia: string;
}

export const publicationTypeLabels: Record<PublicationType, string> = {
  'research-article': 'Research article',
  'review-article': 'Review article',
  'systematic-review': 'Systematic review',
  'meta-analysis': 'Meta-analysis',
  'evidence-summary': 'Evidence summary',
  'clinical-review': 'Clinical review',
  'research-report': 'Research report',
  'technical-report': 'Technical report',
  'educational-article': 'Educational article',
  'position-paper': 'Position paper',
  editorial: 'Editorial',
  guideline: 'Guideline / statement',
  monograph: 'Monograph',
};

export const publicationCategories = {
  articles: {
    label: 'Articles',
    description: 'Original research, educational articles, editorials, position papers and reporting statements.',
    types: ['research-article', 'educational-article', 'editorial', 'position-paper', 'guideline'] as PublicationType[],
  },
  reviews: {
    label: 'Reviews',
    description: 'Narrative and clinical reviews that synthesise a field for clinicians, scientists and students.',
    types: ['review-article', 'clinical-review'] as PublicationType[],
  },
  'evidence-reviews': {
    label: 'Evidence reviews',
    description: 'Systematic reviews, meta-analyses and evidence summaries built on explicit, reproducible methods.',
    types: ['systematic-review', 'meta-analysis', 'evidence-summary'] as PublicationType[],
  },
  reports: {
    label: 'Reports',
    description: 'Research reports, technical reports and monographs.',
    types: ['research-report', 'technical-report', 'monograph'] as PublicationType[],
  },
};

export type PublicationCategory = keyof typeof publicationCategories;

export const publications: Publication[] = [...publicationRecords].sort((a, b) =>
  b.publishedDate.localeCompare(a.publishedDate),
);

export function getPublicationBySlug(slug: string) {
  return publications.find(p => p.slug === slug);
}

export function getPublicationsByDivision(divisionId: string) {
  return publications.filter(p => p.divisions.includes(divisionId));
}

export function getPublicationsByCategory(category: PublicationCategory) {
  const types = publicationCategories[category].types;
  return publications.filter(p => types.includes(p.type));
}

export function publicationYear(p: Publication) {
  return Number(p.publishedDate.slice(0, 4));
}

function citationName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const family = parts[parts.length - 1];
  const initials = parts
    .slice(0, -1)
    .map(part => part.replace(/[^A-Za-zÀ-ÿ-]/g, '').split('-').map(p => p.charAt(0)).join(''))
    .join('');
  return `${family} ${initials}`;
}

/** Vancouver-style citation built only from verified metadata. */
export function formatCitation(p: Publication) {
  const names = p.authors.map(a => citationName(a.name));
  const shown = names.length > 6 ? `${names.slice(0, 6).join(', ')}, et al` : names.join(', ');
  const authorPart = shown || p.corporateAuthor || '';
  const volumePart = [p.volume, p.issue ? `(${p.issue})` : ''].join('');
  const location = [volumePart, p.pages].filter(Boolean).join(':');
  return [
    authorPart ? `${authorPart}.` : '',
    `${p.title.replace(/\.$/, '')}.`,
    `${p.journal}.`,
    `${publicationYear(p)}${location ? `;${location}` : ''}.`,
    p.doi ? `doi:${p.doi}` : '',
  ]
    .filter(Boolean)
    .join(' ');
}
