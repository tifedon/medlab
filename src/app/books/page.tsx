import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import BookCard from '@/components/BookCard';
import LibraryNotice from '@/components/LibraryNotice';
import Notice from '@/components/Notice';
import StatusBadge from '@/components/StatusBadge';
import EmptyState from '@/components/EmptyState';
import FilterBar, { param } from '@/components/FilterBar';
import { bookShelves, books, bookStatusModel, getBooksByShelf, type BookShelf } from '@/lib/books';
import { divisions } from '@/lib/divisions';
import { publishingMetadata, publishingWorkflow } from '@/lib/institute';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Books and the publishing programme',
  description: `Reference books, textbooks, handbooks and monographs in the Sterling IMRES library, and the ${siteConfig.press} publishing programme.`,
  alternates: { canonical: '/books' },
};

const programmeCategories = ['Reference books', 'Medical textbooks', 'Clinical handbooks', 'Research methodology books', 'Evidence-based medicine books', 'Biomedical science books', 'Dentistry books', 'Nursing books', 'Pharmacology books', 'Public health books', 'Medical atlases', 'Visual learning books', 'Monographs'];

export default async function BooksPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { division: param(sp.division) };
  const filtered = books.filter(b => !current.division || b.divisions.includes(current.division));

  return (
    <div>
      <PageHero
        kicker="Books"
        title="Books and the publishing programme"
        lead={`Books are a major part of the institute, not a side section. ${siteConfig.press} is the proposed imprint for reference works, textbooks, handbooks, monographs, atlases and visual learning books.`}
        breadcrumbs={[{ label: 'Books' }]}
        stats={[
          { value: books.length, label: 'books in the reference library' },
          { value: 0, label: `${siteConfig.press} titles published` },
        ]}
      />

      <Section>
        <div className={ui.grid4}>
          {(Object.keys(bookShelves) as BookShelf[]).map(key => (
            <article key={key} className={ui.card}>
              <h2 className={ui.cardTitle}><Link href={`/books/${key}`}>{bookShelves[key].label}</Link></h2>
              <p className={ui.cardText}>{bookShelves[key].description}</p>
              <div className={ui.cardMeta}><span>{getBooksByShelf(key).length} books</span></div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader kicker="Reference library" title="Books in the library" lead="Standard works chosen for each division, with authors, editors, edition and ISBN checked against publisher or library catalogues." />
        <LibraryNotice />
        <div style={{ height: '1.5rem' }} />
        <FilterBar basePath="/books" current={current} groups={[{ param: 'division', label: 'Division', options: divisions.map(d => ({ value: d.id, label: d.shortName })) }]} />
        <div className={ui.grid2}>{filtered.map(book => <BookCard key={book.slug} book={book} />)}</div>
      </Section>

      <Section id="press">
        <SectionHeader kicker={siteConfig.press} title="Titles from the Press" />
        <EmptyState title="No Press titles yet" actions={<Link href="/contact?topic=editorial-publications" className="btn btn--primary">Propose a book</Link>}>
          {siteConfig.press} has not published any titles yet. Approved projects will appear here as Upcoming, In development or In editing, then as Published once distributed.
        </EmptyState>
      </Section>

      <Section>
        <div className={ui.grid2}>
          <div>
            <SectionHeader kicker="Programme" title="What the Press will publish" />
            <ul className={ui.tagRow}>{programmeCategories.map(c => <li key={c} className={ui.tag}>{c}</li>)}</ul>
          </div>
          <div>
            <SectionHeader kicker="Lifecycle" title="Book status model" />
            <div className={ui.tableWrap}>
              <table className={ui.table}>
                <thead><tr><th scope="col">Status</th><th scope="col">Use</th></tr></thead>
                <tbody>{bookStatusModel.map(s => <tr key={s.status}><td><StatusBadge status={s.status} label={s.label} /></td><td>{s.use}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader kicker="Authorship" title="Authorship and imprint model" />
        <Notice>
          Real doctors, researchers, editors and qualified subject experts are named as authors or editors. Sterling IMRES is the institutional affiliation and {siteConfig.press} the publisher. Sterling IMRES is used as a corporate author mainly for official reports, standards, consensus documents and evidence summaries. Contributors need not be physicians — respiratory therapists, nurses, pharmacists, biomedical scientists, statisticians, illustrators, methodologists and medical editors all contribute where qualified, and clinically sensitive material receives clinical review.
        </Notice>
      </Section>

      <Section>
        <div className={ui.grid2}>
          <div>
            <SectionHeader kicker="Distribution" title="PublishDrive metadata" lead="The website is the catalogue and authority layer; PublishDrive distributes approved titles to retail and library channels." />
            <div className={ui.tableWrap}>
              <table className={ui.table}>
                <tbody>{publishingMetadata.map(m => <tr key={m.field}><td>{m.field}</td><td>{m.value}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <div>
            <SectionHeader kicker="Workflow" title="From proposal to published book" />
            <ol className={ui.numbered}>{publishingWorkflow.map(step => <li key={step}>{step}</li>)}</ol>
          </div>
        </div>
      </Section>
      <div style={{ height: '5rem' }} />
    </div>
  );
}
