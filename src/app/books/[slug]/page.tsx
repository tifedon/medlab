import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorList from '@/components/AuthorList';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import DivisionTags from '@/components/DivisionTags';
import LibraryNotice from '@/components/LibraryNotice';
import MetaList from '@/components/MetaList';
import PublicationCard from '@/components/PublicationCard';
import JsonLd from '@/components/JsonLd';
import { ExternalLinkIcon } from '@/components/Icons';
import { bookCategoryLabels, bookContributors, books, getBookBySlug } from '@/lib/books';
import { publications } from '@/lib/publications';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';

export function generateStaticParams() {
  return books.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: 'Book not found' };
  return { title: book.title, description: book.summary, alternates: { canonical: `/books/${slug}` }, openGraph: { title: book.title, description: book.summary, type: 'book' } };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const relatedBooks = books.filter(b => b.slug !== book.slug && b.divisions.some(d => book.divisions.includes(d))).slice(0, 2);
  const relatedPubs = publications.filter(p => p.divisions[0] === book.divisions[0]).slice(0, 2);

  return (
    <div>
      <header className={ui.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Books', href: '/books' }, { label: book.title }]} />
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 180px) 1fr', gap: '2.5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <BookCover book={book} large />
            <div>
              <div className={ui.cardTop}>
                <span className={ui.label}>{bookCategoryLabels[book.category]}</span>
                {book.edition && <span className={ui.label}>{book.edition}</span>}
              </div>
              <h1 className={ui.heroTitle}>{book.title}</h1>
              {book.subtitle && <p className={ui.heroLead}>{book.subtitle}</p>}
              <p className={ui.heroLead}>{book.publisher} · {book.year}</p>
              <div className={ui.heroActions}>
                <a href={book.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer">View at publisher or catalogue <ExternalLinkIcon size={14} /></a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className={ui.detailLayout}>
          <div className={`${ui.detailMain} ${ui.prose}`}>
            <LibraryNotice source={book.verifiedVia} />
            <section>
              <h2>About this book</h2>
              <p>{book.summary}</p>
            </section>
            <section>
              <h2>Authors and editors</h2>
              <AuthorList people={bookContributors(book)} />
            </section>
            {relatedPubs.length > 0 && (
              <section>
                <h2>Related publications</h2>
                <div className={ui.list}>{relatedPubs.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
              </section>
            )}
            {relatedBooks.length > 0 && (
              <section>
                <h2>Related books</h2>
                <div className={ui.list}>{relatedBooks.map(b => <BookCard key={b.slug} book={b} />)}</div>
              </section>
            )}
          </div>
          <aside className={ui.aside}>
            <div className={ui.panel}>
              <h3>Book details</h3>
              <MetaList
                items={[
                  ['Edition', book.edition],
                  ['Publisher', book.publisher],
                  ['Year', book.year],
                  ['ISBN-13', book.isbn13],
                  ['Pages', book.pages?.toLocaleString('en-GB')],
                  ['Status', 'Published (external publisher)'],
                  ['Metadata source', book.verifiedVia],
                ]}
              />
            </div>
            <div className={ui.panel}>
              <h3>Keywords</h3>
              <ul className={ui.tagRow}>{book.keywords.map(k => <li key={k}><Link className={ui.tag} href={`/search?q=${encodeURIComponent(k)}`}>{k}</Link></li>)}</ul>
              <h3>Divisions</h3>
              <DivisionTags ids={book.divisions} />
            </div>
          </aside>
        </div>
      </div>
      <div style={{ height: '5rem' }} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Book',
          name: book.title,
          bookEdition: book.edition,
          isbn: book.isbn13,
          datePublished: String(book.year),
          publisher: { '@type': 'Organization', name: book.publisher },
          author: book.authors.map(a => ({ '@type': 'Person', name: a.name })),
          editor: book.editors.map(e => ({ '@type': 'Person', name: e.name })),
          url: `${siteConfig.url}/books/${book.slug}`,
        }}
      />
    </div>
  );
}
