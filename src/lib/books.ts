import { bookRecords } from '@/data/books';
import type { Contributor } from './publications';

export type BookCategory = 'reference' | 'textbook' | 'handbook' | 'monograph' | 'atlas';
export type BookStatus = 'upcoming' | 'in-development' | 'in-editing' | 'published' | 'archived';

export interface Book {
  slug: string;
  title: string;
  subtitle?: string;
  edition?: string;
  category: BookCategory;
  authors: Contributor[];
  editors: Contributor[];
  publisher: string;
  year: number;
  isbn13?: string;
  pages?: number;
  url: string;
  summary: string;
  keywords: string[];
  divisions: string[];
  verifiedVia: string;
}

export const bookCategoryLabels: Record<BookCategory, string> = {
  reference: 'Reference book',
  textbook: 'Textbook',
  handbook: 'Handbook',
  monograph: 'Monograph',
  atlas: 'Atlas',
};

export const bookShelves = {
  reference: {
    label: 'Reference books',
    description: 'Comprehensive reference works and atlases consulted across clinical and scientific practice.',
    categories: ['reference', 'atlas'] as BookCategory[],
  },
  textbooks: {
    label: 'Textbooks',
    description: 'Core teaching texts used in medical, dental, nursing and biomedical education.',
    categories: ['textbook'] as BookCategory[],
  },
  handbooks: {
    label: 'Handbooks',
    description: 'Practical handbooks and manuals for methods, style and day-to-day practice.',
    categories: ['handbook'] as BookCategory[],
  },
  monographs: {
    label: 'Monographs',
    description: 'Focused, single-subject scholarly works.',
    categories: ['monograph'] as BookCategory[],
  },
};

export type BookShelf = keyof typeof bookShelves;

export const bookStatusModel: { status: BookStatus; label: string; use: string }[] = [
  { status: 'upcoming', label: 'Upcoming', use: 'Announced or approved for development.' },
  { status: 'in-development', label: 'In development', use: 'Writing, research or content creation underway.' },
  { status: 'in-editing', label: 'In editing', use: 'Editorial, review, illustration or production stage.' },
  { status: 'published', label: 'Published', use: 'Available through approved distribution channels.' },
  { status: 'archived', label: 'Archived', use: 'Retained in catalogue but no longer actively promoted.' },
];

export const books: Book[] = [...bookRecords].sort((a, b) => a.title.localeCompare(b.title));

export function getBookBySlug(slug: string) {
  return books.find(b => b.slug === slug);
}

export function getBooksByDivision(divisionId: string) {
  return books.filter(b => b.divisions.includes(divisionId));
}

export function getBooksByShelf(shelf: BookShelf) {
  const categories = bookShelves[shelf].categories;
  return books.filter(b => categories.includes(b.category));
}

export function bookContributors(book: Book) {
  return [...book.authors.map(a => ({ ...a, role: a.role ?? 'Author' })), ...book.editors.map(e => ({ ...e, role: e.role ?? 'Editor' }))];
}
