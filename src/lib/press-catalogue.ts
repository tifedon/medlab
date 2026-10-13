import 'server-only';

import { cache } from 'react';
import { books as staticBooks, type Book, type BookCategory, type BookStatus } from '@/lib/books';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/database.types';

type PressBookRow = Database['public']['Tables']['press_books']['Row'];
type PurchaseLinkRow = Database['public']['Tables']['book_purchase_links']['Row'];

export interface AdminPressBook extends PressBookRow {
  book_purchase_links: PurchaseLinkRow[];
}

function mapPressBook(row: AdminPressBook): Book {
  return {
    databaseId: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    category: row.category as BookCategory,
    authors: row.author_names.map(name => ({ name, role: 'Author' })),
    editors: row.editor_names.map(name => ({ name, role: 'Editor' })),
    publisher: row.publisher,
    year: row.publication_year ?? undefined,
    isbn13: row.isbn13 ?? undefined,
    pages: row.page_count ?? undefined,
    summary: row.summary,
    keywords: row.keywords,
    divisions: row.division_ids,
    verifiedVia: 'Sterling IMRES Press catalogue',
    status: row.status as BookStatus,
    isPressTitle: true,
    coverImage: row.cover_image_url ?? undefined,
    backCoverImage: row.back_cover_image_url ?? undefined,
    purchaseLinks: [...row.book_purchase_links]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(link => ({
        id: link.id,
        retailerName: link.retailer_name,
        url: link.url,
        format: link.format ?? undefined,
        priceLabel: link.price_label ?? undefined,
      })),
  };
}

export const getCatalogueBooks = cache(async (): Promise<Book[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('press_books')
      .select('*, book_purchase_links(*)')
      .eq('is_visible', true)
      .order('title');

    if (error) return staticBooks;

    const merged = new Map(staticBooks.map(book => [book.slug, book]));
    for (const row of (data ?? []) as AdminPressBook[]) merged.set(row.slug, mapPressBook(row));
    return [...merged.values()].sort((a, b) => a.title.localeCompare(b.title));
  } catch {
    return staticBooks;
  }
});

export async function getAdminPressBooks(): Promise<{ books: AdminPressBook[]; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('press_books')
    .select('*, book_purchase_links(*)')
    .order('updated_at', { ascending: false });

  return { books: (data ?? []) as AdminPressBook[], error: error?.message ?? null };
}

export async function getAdminPressBook(id: string): Promise<AdminPressBook | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('press_books')
    .select('*, book_purchase_links(*)')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) return null;
  return data as AdminPressBook;
}
