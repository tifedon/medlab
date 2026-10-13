'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import type { BookCategory, BookStatus } from '@/lib/books';

export interface BookLinkInput {
  retailerName: string;
  url: string;
  format: string;
  priceLabel: string;
}

export interface BookEditorInput {
  id?: string;
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  category: BookCategory;
  authors: string[];
  editors: string[];
  publisher: string;
  publicationYear: number | null;
  isbn13: string;
  pageCount: number | null;
  status: BookStatus;
  coverImageUrl: string;
  backCoverImageUrl: string;
  keywords: string[];
  divisionIds: string[];
  isVisible: boolean;
  purchaseLinks: BookLinkInput[];
}

export interface BookActionResult {
  ok: boolean;
  error?: string;
  id?: string;
  slug?: string;
}

const categories = new Set<BookCategory>(['reference', 'textbook', 'handbook', 'monograph', 'atlas']);
const statuses = new Set<BookStatus>(['upcoming', 'in-development', 'in-editing', 'published', 'archived']);

function cleanList(values: string[]) {
  return [...new Set(values.map(value => value.trim()).filter(Boolean))].slice(0, 50);
}

function cleanSlug(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function optional(value: string) {
  const cleaned = value.trim();
  return cleaned || null;
}

function validate(input: BookEditorInput): string | null {
  if (input.title.trim().length < 2 || input.title.trim().length > 240) return 'Enter a book title between 2 and 240 characters.';
  if (input.summary.trim().length < 20 || input.summary.trim().length > 5000) return 'Enter a summary between 20 and 5,000 characters.';
  if (!categories.has(input.category)) return 'Choose a valid book category.';
  if (!statuses.has(input.status)) return 'Choose a valid publication status.';
  if (!cleanSlug(input.slug || input.title)) return 'Enter a title or URL slug.';
  if (input.publicationYear !== null && (input.publicationYear < 1400 || input.publicationYear > 2100)) return 'Enter a valid publication year.';
  if (input.pageCount !== null && input.pageCount < 1) return 'Page count must be greater than zero.';
  for (const link of input.purchaseLinks) {
    if (link.retailerName.trim().length < 2) return 'Every purchase link needs a retailer name.';
    try {
      const url = new URL(link.url);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    } catch {
      return `Enter a valid web address for ${link.retailerName || 'the purchase link'}.`;
    }
  }
  return null;
}

function refreshCatalogue(slug?: string) {
  revalidatePath('/admin');
  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath('/press');
  revalidatePath('/search');
  revalidatePath('/sitemap.xml');
  if (slug) revalidatePath(`/books/${slug}`);
}

export async function saveBook(input: BookEditorInput): Promise<BookActionResult> {
  await requireRole('admin');
  const validationError = validate(input);
  if (validationError) return { ok: false, error: validationError };

  const supabase = await createClient();
  const payload = {
    title: input.title.trim(),
    slug: cleanSlug(input.slug || input.title),
    subtitle: optional(input.subtitle),
    summary: input.summary.trim(),
    category: input.category,
    author_names: cleanList(input.authors),
    editor_names: cleanList(input.editors),
    publisher: input.publisher.trim() || 'Sterling IMRES Press',
    publication_year: input.publicationYear,
    isbn13: optional(input.isbn13),
    page_count: input.pageCount,
    status: input.status,
    cover_image_url: optional(input.coverImageUrl),
    back_cover_image_url: optional(input.backCoverImageUrl),
    keywords: cleanList(input.keywords),
    division_ids: cleanList(input.divisionIds).length ? cleanList(input.divisionIds) : ['editorial-publications'],
    is_visible: input.isVisible,
  };

  const query = input.id
    ? supabase.from('press_books').update(payload).eq('id', input.id)
    : supabase.from('press_books').insert(payload);
  const { data: saved, error: bookError } = await query.select('id, slug').single();

  if (bookError || !saved) return { ok: false, error: bookError?.message ?? 'The book could not be saved.' };

  const { data: oldLinks, error: oldLinksError } = await supabase
    .from('book_purchase_links')
    .select('id')
    .eq('book_id', saved.id);
  if (oldLinksError) return { ok: false, error: oldLinksError.message };

  if (input.purchaseLinks.length) {
    const { error: linkError } = await supabase.from('book_purchase_links').insert(
      input.purchaseLinks.map((link, index) => ({
        book_id: saved.id,
        retailer_name: link.retailerName.trim(),
        url: link.url.trim(),
        format: optional(link.format),
        price_label: optional(link.priceLabel),
        sort_order: index,
      })),
    );
    if (linkError) return { ok: false, error: linkError.message };
  }

  if (oldLinks?.length) {
    const { error: removeOldError } = await supabase
      .from('book_purchase_links')
      .delete()
      .in('id', oldLinks.map(link => link.id));
    if (removeOldError) return { ok: false, error: removeOldError.message };
  }

  refreshCatalogue(saved.slug);
  return { ok: true, id: saved.id, slug: saved.slug };
}

export async function deleteBook(id: string): Promise<BookActionResult> {
  await requireRole('admin');
  if (!id) return { ok: false, error: 'Book identifier is missing.' };

  const supabase = await createClient();
  const { data: existing } = await supabase.from('press_books').select('slug').eq('id', id).maybeSingle();
  const { error } = await supabase.from('press_books').delete().eq('id', id);

  if (error) return { ok: false, error: error.message };
  refreshCatalogue(existing?.slug);
  return { ok: true };
}
