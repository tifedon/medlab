import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import LibraryNotice from '@/components/LibraryNotice';
import PublicationListing from '@/components/PublicationListing';
import { param } from '@/components/FilterBar';
import { getPublicationsByCategory, publicationCategories } from '@/lib/publications';

const category = publicationCategories['articles'];

export const metadata: Metadata = {
  title: category.label,
  description: category.description,
  alternates: { canonical: '/publications/articles' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { type: param(sp.type), division: param(sp.division), period: param(sp.period), access: param(sp.access) };
  const records = getPublicationsByCategory('articles');
  return (
    <div>
      <PageHero kicker="Publications" title={category.label} lead={category.description} breadcrumbs={[{ label: 'Publications', href: '/publications' }, { label: category.label }]} stats={[{ value: records.length, label: 'records' }]} />
      <Section>
        <LibraryNotice source="Crossref" />
      </Section>
      <Section last>
        <PublicationListing records={records} basePath="/publications/articles" current={current} />
      </Section>
    </div>
  );
}
