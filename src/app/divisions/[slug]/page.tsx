import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import DivisionIcon from '@/components/DivisionIcon';
import ResearchCard from '@/components/ResearchCard';
import PublicationCard from '@/components/PublicationCard';
import BookCard from '@/components/BookCard';
import ProfileCard from '@/components/ProfileCard';
import ProjectCard from '@/components/ProjectCard';
import ProgrammeCard from '@/components/ProgrammeCard';
import ResourceCard from '@/components/ResourceCard';
import IllustrationCard from '@/components/IllustrationCard';
import EmptyState from '@/components/EmptyState';
import CTASection from '@/components/CTASection';
import {
  completedStatuses,
  divisions,
  getBooksByDivision,
  getTeamMembersByDivision,
  getDivisionById,
  getIllustrationsByDivision,
  getProgrammesByDivision,
  getProjectsByDivision,
  getPublicationsByDivision,
  getResearchByDivision,
  getResourcesByDivision,
} from '@/lib/data';
import ui from '@/components/ui.module.css';

export function generateStaticParams() {
  return divisions.map(d => ({ slug: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivisionById(slug);
  if (!division) return { title: 'Division not found' };
  return { title: division.name, description: division.overview, alternates: { canonical: `/divisions/${slug}` } };
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const division = getDivisionById(slug);
  if (!division) notFound();

  const research = getResearchByDivision(division.id);
  const active = research.filter(r => !completedStatuses.includes(r.status));
  const completed = research.filter(r => completedStatuses.includes(r.status));
  const pubs = getPublicationsByDivision(division.id);
  const books = getBooksByDivision(division.id);
  const people = getTeamMembersByDivision(division.id).sort((a, b) => a.name.localeCompare(b.name));
  const projects = getProjectsByDivision(division.id);
  const programmes = getProgrammesByDivision(division.id);
  const resources = getResourcesByDivision(division.id);
  const figures = getIllustrationsByDivision(division.id);

  const anchors = [
    ['scope', 'Scope'],
    ['people', 'People'],
    ['research', 'Research'],
    ['publications', 'Publications and books'],
    ['education', 'Education'],
    ['collaborate', 'Collaborate'],
  ];

  return (
    <div>
      <header className={ui.hero} style={{ background: `linear-gradient(180deg, ${division.colorLight}, var(--white))` }}>
        <div className="container">
          <div className={ui.heroInner}>
            <Breadcrumbs items={[{ label: 'Divisions', href: '/divisions' }, { label: division.name }]} />
            <div className={ui.profileHead}>
              <DivisionIcon division={division} size={64} />
              <span className={ui.kicker} style={{ color: division.color }}>{division.kind === 'unit' ? 'Unit' : 'Division'}</span>
            </div>
            <h1 className={ui.heroTitle}>{division.name}</h1>
            <p className={ui.heroLead}>{division.overview}</p>
            <div className={ui.heroStats}>
              <div className={ui.heroStat}><strong>{pubs.length}</strong><span>publications</span></div>
              <div className={ui.heroStat}><strong>{books.length}</strong><span>books</span></div>
              <div className={ui.heroStat}><strong>{research.length}</strong><span>registered studies</span></div>
              <div className={ui.heroStat}><strong>{people.length}</strong><span>team members</span></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <nav aria-label="On this page" className={ui.tagRow} style={{ marginTop: '1.5rem' }}>
          {anchors.map(([id, label]) => <a key={id} href={`#${id}`} className={ui.tag}>{label}</a>)}
        </nav>
      </div>

      <Section id="scope">
        <SectionHeader kicker="Overview and scope" title="Key subject areas" lead={division.role} />
        <div className={ui.grid3}>
          {division.keyAreas.map(area => (
            <div key={area} className={ui.card} style={{ borderLeft: `3px solid ${division.color}` }}>
              <h3 className={ui.cardTitle} style={{ fontSize: '1.05rem', margin: 0 }}>{area}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section id="people">
        <SectionHeader
          kicker="Staff and contributors"
          title="People"
          lead="Sterling IMRES team members working across this division’s subject areas."
          link={{ href: `/people?division=${division.id}`, label: 'All people in this division' }}
        />
        {people.length ? (
          <div className={ui.grid4}>{people.slice(0, 8).map(p => <ProfileCard key={p.slug} person={p} />)}</div>
        ) : (
          <EmptyState title="No team members assigned">Team members will appear here when they are assigned to this division.</EmptyState>
        )}
      </Section>

      <Section id="research">
        <SectionHeader kicker="Active research" title="Registered studies" link={{ href: '/research', label: 'Research hub' }} />
        {active.length ? (
          <div className={ui.flatList}>{active.map(s => <ResearchCard key={s.slug} study={s} />)}</div>
        ) : (
          <EmptyState title="No active studies tracked">This division’s scope is mainly methodological or editorial, so no registered clinical studies are tracked yet.</EmptyState>
        )}
        {completed.length > 0 && (
          <>
            <h3 className={ui.sectionTitle} style={{ fontSize: '1.5rem', margin: '2.5rem 0 1rem' }}>Completed and published</h3>
            <div className={ui.flatList}>{completed.map(s => <ResearchCard key={s.slug} study={s} />)}</div>
          </>
        )}
      </Section>

      {projects.length > 0 && (
        <Section>
          <SectionHeader kicker="Projects" title="Institutional projects" link={{ href: '/projects', label: 'All projects' }} />
          <div className={ui.flatList}>{projects.slice(0, 3).map(p => <ProjectCard key={p.slug} project={p} />)}</div>
        </Section>
      )}

      <Section id="publications">
        <SectionHeader kicker="Publications and books" title="Reference library" link={{ href: '/publications', label: 'All publications' }} />
        <div className={ui.grid2}>{pubs.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
        {books.length > 0 && (
          <>
            <h3 className={ui.sectionTitle} style={{ fontSize: '1.5rem', margin: '2.5rem 0 1rem' }}>Books</h3>
            <div className={ui.grid2}>{books.map(b => <BookCard key={b.slug} book={b} />)}</div>
          </>
        )}
      </Section>

      {figures.length > 0 && (
        <Section>
          <SectionHeader kicker="Visual resources" title="Illustrations" link={{ href: '/medical-illustration/gallery', label: 'Gallery' }} />
          <div className={ui.grid4}>{figures.slice(0, 4).map(i => <IllustrationCard key={i.slug} illustration={i} />)}</div>
        </Section>
      )}

      <Section id="education">
        <SectionHeader kicker="Educational activities" title="Planned teaching" lead={`Focus areas: ${division.educationFocus.join(', ')}.`} link={{ href: '/education', label: 'Education' }} />
        {programmes.length > 0 && <div className={ui.grid3}>{programmes.map(p => <ProgrammeCard key={p.slug} programme={p} />)}</div>}
        {resources.length > 0 && (
          <>
            <h3 className={ui.sectionTitle} style={{ fontSize: '1.5rem', margin: '2.5rem 0 1rem' }}>Related resources</h3>
            <div className={ui.grid3}>{resources.map(r => <ResourceCard key={r.slug} resource={r} />)}</div>
          </>
        )}
      </Section>

      <Section id="collaborate" last>
        <CTASection
          title={`Collaborate with the ${division.shortName} ${division.kind}`}
          text={<>Opportunities: {division.collaboration.join('; ')}.</>}
          actions={<><Link href={`/contact?topic=${division.id === 'editorial-publications' ? 'editorial-publications' : 'research-collaboration'}`} className="btn btn--primary">Start a conversation</Link><Link href="/collaborate" className="btn btn--dark">Ways to collaborate</Link></>}
        />
      </Section>
    </div>
  );
}
