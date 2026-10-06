import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ProjectListing from '@/components/ProjectListing';
import { param } from '@/components/FilterBar';
import { getProjectsByStatus } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Completed projects',
  description: 'Projects whose deliverables are finished.',
  alternates: { canonical: '/projects/completed' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const records = getProjectsByStatus('completed');
  return (
    <div>
      <PageHero kicker="Projects" title="Completed projects" lead="Projects whose deliverables are finished." breadcrumbs={[{ label: 'Projects', href: '/projects' }, { label: 'Completed projects' }]} stats={[{ value: records.length, label: 'projects' }]} />
      <Section last>
        <ProjectListing records={records} basePath="/projects/completed" current={{ type: param(sp.type) }} />
      </Section>
    </div>
  );
}
