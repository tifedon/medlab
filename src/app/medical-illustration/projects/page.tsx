import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import EmptyState from '@/components/EmptyState';
import { projects } from '@/lib/projects';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Illustration projects',
  description: 'Medical illustration and visualisation projects at Sterling IMRES.',
  alternates: { canonical: '/medical-illustration/projects' },
};

const pipeline = ['Brief agreed with the author or editor', 'Scientific accuracy check of references and sketches', 'Illustration and visual editing', 'Review by a subject expert', 'Licensing, attribution and metadata recorded', 'Publication and archiving of source files'];

export default function IllustrationProjectsPage() {
  const records = projects.filter(p => p.type === 'medical-illustration' || p.divisions.includes('medical-illustration-visualization'));
  return (
    <div>
      <PageHero kicker="Medical illustration" title="Illustration projects" lead="Visual work tracked from brief to publication, including atlases and figure series that later appear as books or publications." breadcrumbs={[{ label: 'Medical illustration', href: '/medical-illustration' }, { label: 'Projects' }]} />
      <Section>
        {records.length ? <div className={ui.grid3}>{records.map(p => <ProjectCard key={p.slug} project={p} />)}</div> : <EmptyState title="No illustration projects yet">Projects will appear here once approved.</EmptyState>}
      </Section>
      <Section last>
        <SectionHeader kicker="Process" title="How an illustration project runs" />
        <ol className={ui.numbered}>{pipeline.map(s => <li key={s}>{s}</li>)}</ol>
      </Section>
    </div>
  );
}
