import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import DivisionTags from '@/components/DivisionTags';
import MetaList from '@/components/MetaList';
import StatusBadge from '@/components/StatusBadge';
import ProjectCard from '@/components/ProjectCard';
import { ArrowRightIcon } from '@/components/Icons';
import { getProjectBySlug, projects, projectStatusLabels, projectTypeLabels } from '@/lib/projects';
import { formatDate } from '@/lib/format';
import ui from '@/components/ui.module.css';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };
  return { title: project.title, description: project.overview, alternates: { canonical: `/projects/${slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const related = projects.filter(p => p.slug !== project.slug && p.type === project.type).slice(0, 2);

  return (
    <div>
      <header className={ui.hero}>
        <div className="container">
          <div className={ui.heroInner}>
            <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }, { label: project.title }]} />
            <div className={ui.cardTop}>
              <StatusBadge status={project.status} label={projectStatusLabels[project.status]} />
              <span className={ui.label}>{projectTypeLabels[project.type]}</span>
            </div>
            <h1 className={ui.heroTitle}>{project.title}</h1>
            <p className={ui.heroLead}>{project.overview}</p>
          </div>
        </div>
      </header>
      <div className="container">
        <div className={ui.detailLayout}>
          <div className={`${ui.detailMain} ${ui.prose}`}>
            <section><h2>Objectives</h2><ul>{project.objectives.map(o => <li key={o}>{o}</li>)}</ul></section>
            <section><h2>Deliverables</h2><ul>{project.deliverables.map(d => <li key={d}>{d}</li>)}</ul></section>
            <section>
              <h2>Updates</h2>
              {project.updates.length ? (
                <ul>{project.updates.map(u => <li key={u.date + u.text}><strong>{formatDate(u.date)}:</strong> {u.text}</li>)}</ul>
              ) : (
                <p>No updates yet. Progress will be posted here as the project moves forward.</p>
              )}
            </section>
            {related.length > 0 && (
              <section>
                <h2>Related projects</h2>
                <div className={ui.grid2}>{related.map(p => <ProjectCard key={p.slug} project={p} />)}</div>
              </section>
            )}
          </div>
          <aside className={ui.aside}>
            <div className={ui.panel}>
              <h3>Project</h3>
              <MetaList items={[['Status', projectStatusLabels[project.status]], ['Roadmap phase', project.phase], ['Timeline', project.timeline], ['Team', project.team]]} />
            </div>
            {project.related.length > 0 && (
              <div className={ui.panel}>
                <h3>Related resources</h3>
                <ul className={ui.linkList}>{project.related.map(r => <li key={r.href}><Link href={r.href}>{r.label} <ArrowRightIcon size={13} /></Link></li>)}</ul>
              </div>
            )}
            <div className={ui.panel}>
              <h3>Divisions</h3>
              <DivisionTags ids={project.divisions} />
            </div>
          </aside>
        </div>
      </div>
      <div style={{ height: '5rem' }} />
    </div>
  );
}
