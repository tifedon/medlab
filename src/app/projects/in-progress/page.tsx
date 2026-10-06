import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ProjectListing from '@/components/ProjectListing';
import { param } from '@/components/FilterBar';
import { getProjectsByStatus } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects in progress',
  description: 'Work currently underway.',
  alternates: { canonical: '/projects/in-progress' },
};

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const records = getProjectsByStatus('in-progress');
  return (
    <div>
      <PageHero kicker="Projects" title="Projects in progress" lead="Work currently underway." breadcrumbs={[{ label: 'Projects', href: '/projects' }, { label: 'Projects in progress' }]} stats={[{ value: records.length, label: 'projects' }]} />
      <Section last>
        <ProjectListing records={records} basePath="/projects/in-progress" current={{ type: param(sp.type) }} />
      </Section>
    </div>
  );
}
