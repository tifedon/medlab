import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import BookCard from '@/components/BookCard';
import EmptyState from '@/components/EmptyState';
import LibraryNotice from '@/components/LibraryNotice';
import { bookShelves } from '@/lib/books';
import { getCatalogueBooks } from '@/lib/press-catalogue';
import ui from '@/components/ui.module.css';

const shelf = bookShelves['monographs'];

export const metadata: Metadata = {
  title: shelf.label,
  description: shelf.description,
  alternates: { canonical: '/books/monographs' },
};

export default async function Page() {
  const records = (await getCatalogueBooks()).filter(book => shelf.categories.includes(book.category));
  return (
    <div>
      <PageHero kicker="Books" title={shelf.label} lead={shelf.description} breadcrumbs={[{ label: 'Books', href: '/books' }, { label: shelf.label }]} stats={[{ value: records.length, label: 'books' }]} />
      <Section>
        <LibraryNotice />
      </Section>
      <Section last>
        {records.length ? (
          <div className={ui.grid2}>{records.map(b => <BookCard key={b.slug} book={b} />)}</div>
        ) : (
          <EmptyState title="Nothing on this shelf yet">Verified {shelf.label.toLowerCase()} will be added to the library, and {'Sterling IMRES Press'} titles will appear here once published.</EmptyState>
        )}
      </Section>
    </div>
  );
}
