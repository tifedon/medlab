import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ResearchListing from '@/components/ResearchListing';
import PublicationCard from '@/components/PublicationCard';
import BookCard from '@/components/BookCard';
import { param } from '@/components/FilterBar';
import { researchRecords } from '@/lib/research';
import { publications } from '@/lib/publications';
import { getCatalogueBooks } from '@/lib/press-catalogue';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Research and Publications',
  description: 'Sterling IMRES research studies, scholarly publications and medical books in one research hub.',
  alternates: { canonical: '/research' },
};

export default async function ResearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [sp, books] = await Promise.all([searchParams, getCatalogueBooks()]);
  const current = { division: param(sp.division), q: param(sp.q) };

  return (
    <div>
      <PageHero
        title="Research and Publications"
        breadcrumbs={[{ label: 'Research and Publications' }]}
      />
      <Section>
        <SectionHeader title="Research records" />
        <ResearchListing records={researchRecords} basePath="/research" current={current} />
      </Section>
      <Section id="publications">
        <SectionHeader kicker="Research outputs" title="Publications" />
        <div className={ui.flatList}>
          {publications.map(publication => <PublicationCard key={publication.slug} publication={publication} />)}
        </div>
      </Section>
      <Section id="books" last>
        <SectionHeader kicker="Research library" title="Books" />
        <div className={ui.grid2}>
          {books.map(book => <BookCard key={book.slug} book={book} />)}
        </div>
      </Section>
    </div>
  );
}
