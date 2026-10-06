import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import BookCard from '@/components/BookCard';
import EmptyState from '@/components/EmptyState';
import LibraryNotice from '@/components/LibraryNotice';
import { bookShelves, getBooksByShelf } from '@/lib/books';
import ui from '@/components/ui.module.css';

const shelf = bookShelves['handbooks'];

export const metadata: Metadata = {
  title: shelf.label,
  description: shelf.description,
  alternates: { canonical: '/books/handbooks' },
};

export default function Page() {
  const records = getBooksByShelf('handbooks');
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
