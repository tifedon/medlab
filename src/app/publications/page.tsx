import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import LibraryNotice from '@/components/LibraryNotice';
import PublicationListing from '@/components/PublicationListing';
import { param } from '@/components/FilterBar';
import { getPublicationsByCategory, publicationCategories, publications, type PublicationCategory } from '@/lib/publications';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Articles, reviews, evidence reviews and reports in the Sterling IMRES reference library, each verified against Crossref with its DOI.',
  alternates: { canonical: '/publications' },
};

export default async function PublicationsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { category: param(sp.category), type: param(sp.type), division: param(sp.division), period: param(sp.period), access: param(sp.access) };

  return (
    <div>
      <PageHero
        kicker="Publications"
        title="Publications hub"
        lead="Scholarly outputs other than full-length books, discoverable by type, division, year and access."
        breadcrumbs={[{ label: 'Publications' }]}
      />
      <Section>
        <div className={ui.grid4}>
          {(Object.keys(publicationCategories) as PublicationCategory[]).map(key => (
            <article key={key} className={ui.card}>
              <h2 className={ui.cardTitle}><Link href={`/publications?category=${key}`}>{publicationCategories[key].label}</Link></h2>
              <p className={ui.cardText}>{publicationCategories[key].description}</p>
              <div className={ui.cardMeta}><span>{getPublicationsByCategory(key).length} records</span></div>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <LibraryNotice source="Crossref" />
      </Section>
      <Section last>
        <SectionHeader kicker="Catalogue" title="All publications" lead="DOI fields are shown only where a real DOI exists, and full texts link to the publisher, which holds distribution rights." />
        <PublicationListing records={publications} basePath="/publications" current={current} />
      </Section>
    </div>
  );
}
