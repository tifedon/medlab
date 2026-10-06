import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ProjectListing from '@/components/ProjectListing';
import { param } from '@/components/FilterBar';
import { getProjectsByStatus } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Upcoming projects',
  description: 'Approved or planned work that has not started yet.',
  alternates: { canonical: '/projects/upcoming' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const records = getProjectsByStatus('upcoming');
  return (
    <div>
      <PageHero kicker="Projects" title="Upcoming projects" lead="Approved or planned work that has not started yet." breadcrumbs={[{ label: 'Projects', href: '/projects' }, { label: 'Upcoming projects' }]} stats={[{ value: records.length, label: 'projects' }]} />
      <Section last>
        <ProjectListing records={records} basePath="/projects/upcoming" current={{ type: param(sp.type) }} />
      </Section>
    </div>
  );
}
