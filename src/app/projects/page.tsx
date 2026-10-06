import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ProjectListing from '@/components/ProjectListing';
import { param } from '@/components/FilterBar';
import { getProjectsByStatus, projects, projectTypeLabels } from '@/lib/projects';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Institutional projects at Sterling IMRES beyond formal research studies: reference works, publishing, illustration, education and the platform roadmap.',
  alternates: { canonical: '/projects' },
};

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  return (
    <div>
      <PageHero
        kicker="Projects"
        title="Projects hub"
        lead="Projects are broader than formal research. A new medical atlas, for example, is tracked here while it is illustrated and edited, then appears as a book once published."
        breadcrumbs={[{ label: 'Projects' }]}
        stats={[
          { value: getProjectsByStatus('in-progress').length, label: 'in progress' },
          { value: getProjectsByStatus('upcoming').length, label: 'upcoming' },
          { value: getProjectsByStatus('completed').length, label: 'completed' },
        ]}
        actions={
          <>
            <Link href="/projects/in-progress" className="btn btn--primary">In progress</Link>
            <Link href="/projects/upcoming" className="btn btn--secondary">Upcoming</Link>
            <Link href="/projects/completed" className="btn btn--secondary">Completed</Link>
          </>
        }
      />
      <Section>
        <SectionHeader kicker="Project types" title="What counts as a project" />
        <ul className={ui.tagRow}>{Object.values(projectTypeLabels).map(l => <li key={l} className={ui.tag}>{l}</li>)}</ul>
      </Section>
      <Section last>
        <SectionHeader kicker="All projects" title="Roadmap and initiatives" />
        <ProjectListing records={projects} basePath="/projects" current={{ type: param(sp.type) }} />
      </Section>
    </div>
  );
}
