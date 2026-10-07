import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import StatusBadge from '@/components/StatusBadge';
import Notice from '@/components/Notice';
import ResearchListing from '@/components/ResearchListing';
import { param } from '@/components/FilterBar';
import { completedStatuses, currentStatuses, getResearchByStatuses, researchRecords, upcomingStatuses } from '@/lib/research';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Research',
  description: 'The research lifecycle at Sterling IMRES: upcoming, recruiting, in-progress, completed and published studies across the nine divisions.',
  alternates: { canonical: '/research' },
};

export default async function ResearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { status: param(sp.status), division: param(sp.division), type: param(sp.type) };

  return (
    <div>
      <PageHero
        kicker="Research"
        title="Research hub"
        lead="Not only published results: the full lifecycle, so visitors can see what is upcoming, underway, completed and published."
        breadcrumbs={[{ label: 'Research' }]}
      />
      <Section last>
        <ResearchListing records={researchRecords} basePath="/research" current={current} />
      </Section>
    </div>
  );
}
