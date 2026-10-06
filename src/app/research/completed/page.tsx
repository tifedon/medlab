import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Notice from '@/components/Notice';
import ResearchListing from '@/components/ResearchListing';
import { param } from '@/components/FilterBar';
import { getResearchByStatuses, completedStatuses } from '@/lib/research';

export const metadata: Metadata = {
  title: 'Completed research',
  description: 'Studies whose activity has finished, including those with published results.',
  alternates: { canonical: '/research/completed' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { status: param(sp.status), division: param(sp.division), type: param(sp.type) };
  const records = getResearchByStatuses(completedStatuses);

  return (
    <div>
      <PageHero kicker="Research" title="Completed research" lead="Studies whose activity has finished, including those with published results." breadcrumbs={[{ label: 'Research', href: '/research' }, { label: 'Completed research' }]} stats={[{ value: records.length, label: 'studies' }]} />
      <Section>
        <Notice>Registered studies tracked by Sterling IMRES. Each is run by the sponsor and investigators named on its record.</Notice>
      </Section>
      <Section last>
        <ResearchListing records={records} basePath="/research/completed" current={current} />
      </Section>
    </div>
  );
}
