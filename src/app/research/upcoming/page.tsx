import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Notice from '@/components/Notice';
import ResearchListing from '@/components/ResearchListing';
import { param } from '@/components/FilterBar';
import { getResearchByStatuses, upcomingStatuses } from '@/lib/research';

export const metadata: Metadata = {
  title: 'Upcoming research',
  description: 'Studies approved or registered but not yet recruiting.',
  alternates: { canonical: '/research/upcoming' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { status: param(sp.status), division: param(sp.division), type: param(sp.type) };
  const records = getResearchByStatuses(upcomingStatuses);

  return (
    <div>
      <PageHero kicker="Research" title="Upcoming research" lead="Studies approved or registered but not yet recruiting." breadcrumbs={[{ label: 'Research', href: '/research' }, { label: 'Upcoming research' }]} stats={[{ value: records.length, label: 'studies' }]} />
      <Section>
        <Notice>Registered studies tracked by Sterling IMRES. Each is run by the sponsor and investigators named on its record.</Notice>
      </Section>
      <Section last>
        <ResearchListing records={records} basePath="/research/upcoming" current={current} />
      </Section>
    </div>
  );
}
