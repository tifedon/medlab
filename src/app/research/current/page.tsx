import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Notice from '@/components/Notice';
import ResearchListing from '@/components/ResearchListing';
import { param } from '@/components/FilterBar';
import { getResearchByStatuses, currentStatuses } from '@/lib/research';

export const metadata: Metadata = {
  title: 'Current research',
  description: 'Studies that are recruiting, in progress, analysing data or preparing a manuscript.',
  alternates: { canonical: '/research/current' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { status: param(sp.status), division: param(sp.division), type: param(sp.type) };
  const records = getResearchByStatuses(currentStatuses);

  return (
    <div>
      <PageHero kicker="Research" title="Current research" lead="Studies that are recruiting, in progress, analysing data or preparing a manuscript." breadcrumbs={[{ label: 'Research', href: '/research' }, { label: 'Current research' }]} stats={[{ value: records.length, label: 'studies' }]} />
      <Section>
        <Notice>Registered studies tracked by Sterling IMRES. Each is run by the sponsor and investigators named on its record.</Notice>
      </Section>
      <Section last>
        <ResearchListing records={records} basePath="/research/current" current={current} />
      </Section>
    </div>
  );
}
