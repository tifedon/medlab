import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import BookCard from '@/components/BookCard';
import LibraryNotice from '@/components/LibraryNotice';
import FilterBar, { param } from '@/components/FilterBar';
import { bookShelves, type BookShelf } from '@/lib/books';
import { getCatalogueBooks } from '@/lib/press-catalogue';
import { divisions } from '@/lib/divisions';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Books',
  description: `Reference books, textbooks, handbooks and monographs in the Sterling IMRES library, and the ${siteConfig.press} publishing programme.`,
  alternates: { canonical: '/books' },
};

export default async function BooksPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const books = await getCatalogueBooks();
  const pressBooks = books.filter(book => book.isPressTitle);
  const current = { division: param(sp.division) };
  const filtered = books.filter(b => !current.division || b.divisions.includes(current.division));

  return (
    <div>
      <PageHero
        title="Books"
        breadcrumbs={[{ label: 'Books' }]}
      />

      <Section>
        <div className={ui.grid4}>
          {(Object.keys(bookShelves) as BookShelf[]).map(key => (
            <article key={key} className={ui.card}>
              <h2 className={ui.cardTitle}><Link href={`/books/${key}`}>{bookShelves[key].label}</Link></h2>
              <p className={ui.cardText}>{bookShelves[key].description}</p>
              <div className={ui.cardMeta}><span>{books.filter(book => bookShelves[key].categories.includes(book.category)).length} books</span></div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader kicker="Reference library" title="Books in the library" />
        <LibraryNotice />
        <div style={{ height: '1.5rem' }} />
        <FilterBar basePath="/books" current={current} groups={[{ param: 'division', label: 'Division', options: divisions.map(d => ({ value: d.id, label: d.shortName })) }]} />
        <div className={ui.grid2}>{filtered.map(book => <BookCard key={book.slug} book={book} />)}</div>
      </Section>

      <Section id="press">
        <SectionHeader
          kicker={siteConfig.press}
          title="Titles from the Press"
        />
        <div className={ui.grid2}>{pressBooks.map(book => <BookCard key={book.slug} book={book} />)}</div>
        <div className={ui.sectionActions}>
          <Link href="/contact?topic=editorial-publications" className="btn btn--secondary">Propose a book</Link>
        </div>
      </Section>

      <div style={{ height: '5rem' }} />
    </div>
  );
}
