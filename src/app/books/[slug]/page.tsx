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
import LockedBookPreview from '@/components/LockedBookPreview';
import { ExternalLinkIcon } from '@/components/Icons';
import { bookCategoryLabels, bookContributors, books as staticBooks, getBookStatusLabel } from '@/lib/books';
import { getCatalogueBooks } from '@/lib/press-catalogue';
import { publications } from '@/lib/publications';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';

export function generateStaticParams() {
  return staticBooks.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = (await getCatalogueBooks()).find(item => item.slug === slug);
  if (!book) return { title: 'Book not found' };
  return {
    title: book.title,
    description: book.summary,
    alternates: { canonical: `/books/${slug}` },
    openGraph: {
      title: book.title,
      description: book.summary,
      type: 'book',
      images: book.coverImage ? [{ url: book.coverImage, width: 2550, height: 3300, alt: `${book.title} front cover` }] : undefined,
    },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const books = await getCatalogueBooks();
  const book = books.find(item => item.slug === slug);
  if (!book) notFound();

  const relatedBooks = books.filter(b => b.slug !== book.slug && b.divisions.some(d => book.divisions.includes(d))).slice(0, 2);
  const relatedPubs = publications.filter(p => p.divisions[0] === book.divisions[0]).slice(0, 2);

  return (
    <div>
      <header className={ui.hero}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Books', href: '/books' }, { label: book.title }]} />
          <div className={ui.bookHeroGrid}>
            <BookCover book={book} large />
            <div>
              <div className={ui.cardTop}>
                <span className={ui.label}>{bookCategoryLabels[book.category]}</span>
                {book.edition && <span className={ui.label}>{book.edition}</span>}
              </div>
              <h1 className={ui.heroTitle}>{book.title}</h1>
              {book.subtitle && <p className={ui.heroLead}>{book.subtitle}</p>}
              <p className={ui.heroLead}>{book.publisher}{book.year ? ` · ${book.year}` : ''}</p>
              <div className={ui.heroActions}>
                {book.purchaseLinks?.length ? (
                  <a href={book.purchaseLinks[0].url} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Buy this book <ExternalLinkIcon size={14} /></a>
                ) : book.url ? (
                  <a href={book.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer">View at publisher or catalogue <ExternalLinkIcon size={14} /></a>
                ) : null}
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
              {book.coverImage && book.backCoverImage ? (
                <LockedBookPreview
                  title={book.title}
                  frontCover={book.coverImage}
                  backCover={book.backCoverImage}
                  purchaseLinks={book.purchaseLinks ?? []}
                />
              ) : null}
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
            {book.purchaseLinks?.length ? (
              <div className={ui.panel}>
                <h3>Where to buy</h3>
                <ul className={ui.purchaseLinks}>
                  {book.purchaseLinks.map(link => (
                    <li key={link.id ?? link.url}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <span>{link.retailerName}</span>
                        <small>{[link.format, link.priceLabel].filter(Boolean).join(' · ') || 'Open retailer'} <ExternalLinkIcon size={12} /></small>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className={ui.panel}>
              <h3>Book details</h3>
              <MetaList
                items={[
                  ['Edition', book.edition],
                  ['Publisher', book.publisher],
                  ['Year', book.year],
                  ['ISBN-13', book.isbn13],
                  ['Pages', book.pages?.toLocaleString('en-GB')],
                  ['Status', book.isPressTitle ? getBookStatusLabel(book) : 'Published (external publisher)'],
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
          datePublished: book.year ? String(book.year) : undefined,
          publisher: { '@type': 'Organization', name: book.publisher },
          author: book.authors.map(a => ({ '@type': 'Person', name: a.name })),
          editor: book.editors.map(e => ({ '@type': 'Person', name: e.name })),
          image: book.coverImage ? (book.coverImage.startsWith('http') ? book.coverImage : `${siteConfig.url}${book.coverImage}`) : undefined,
          offers: book.purchaseLinks?.map(link => ({ '@type': 'Offer', url: link.url, seller: { '@type': 'Organization', name: link.retailerName } })),
          url: `${siteConfig.url}/books/${book.slug}`,
        }}
      />
    </div>
  );
}
