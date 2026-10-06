import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import EmptyState from '@/components/EmptyState';
import ResearchCard from '@/components/ResearchCard';
import PublicationCard from '@/components/PublicationCard';
import BookCard from '@/components/BookCard';
import ProfileCard from '@/components/ProfileCard';
import ProjectCard from '@/components/ProjectCard';
import ArticleCard from '@/components/ArticleCard';
import DivisionCard from '@/components/DivisionCard';
import { SearchIcon } from '@/components/Icons';
import { param } from '@/components/FilterBar';
import { searchResources, type SearchResults } from '@/lib/data';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search people, research, projects, publications, books, insights and divisions across Sterling IMRES.',
  robots: { index: false, follow: true },
};

const tabs: { key: keyof SearchResults | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'people', label: 'People' },
  { key: 'research', label: 'Research' },
  { key: 'projects', label: 'Projects' },
  { key: 'publications', label: 'Publications' },
  { key: 'books', label: 'Books' },
  { key: 'insights', label: 'Insights' },
  { key: 'divisions', label: 'Divisions' },
];

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const q = (param(sp.q) ?? '').trim().slice(0, 200);
  const type = tabs.some(t => t.key === param(sp.type)) ? (param(sp.type) as (typeof tabs)[number]['key']) : 'all';
  const results = q ? searchResources(q) : null;
  const count = (key: keyof SearchResults) => results?.[key].length ?? 0;
  const total = results ? (Object.keys(results) as (keyof SearchResults)[]).reduce((n, k) => n + count(k), 0) : 0;
  const show = (key: keyof SearchResults) => results && (type === 'all' || type === key) && count(key) > 0;
  const href = (key: string) => `/search?q=${encodeURIComponent(q)}${key === 'all' ? '' : `&type=${key}`}`;

  return (
    <div>
      <PageHero kicker="Search" title="Search Sterling IMRES" lead="Search people, research, projects, publications, books, insights and divisions. Try a topic, a name, a DOI, an ISBN or a trial number." breadcrumbs={[{ label: 'Search' }]}>
        <form action="/search" method="GET" role="search" style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', maxWidth: 680 }}>
          <label htmlFor="search-page-input" className="sr-only">Search terms</label>
          <input
            id="search-page-input"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="e.g. periodontitis, Higgins, 10.1136/bmj.n71"
            className="input"
            style={{ flex: 1, fontSize: '1rem', height: 48 }}
          />
          {type !== 'all' && <input type="hidden" name="type" value={type} />}
          <button type="submit" className="btn btn--primary" style={{ height: 48 }}><SearchIcon size={16} /> Search</button>
        </form>
      </PageHero>

      <Section last>
        {!q && <EmptyState title="Start with a search term">Search covers every record in the library and every page of the institute.</EmptyState>}
        {results && (
          <>
            <nav className={ui.tagRow} aria-label="Result types">
              {tabs.map(t => {
                const n = t.key === 'all' ? total : count(t.key);
                const active = type === t.key;
                return (
                  <Link key={t.key} href={href(t.key)} className={`${ui.filterChip} ${active ? ui.filterChipActive : ''}`} aria-current={active ? 'true' : undefined}>
                    {t.label} ({n})
                  </Link>
                );
              })}
            </nav>
            <p className={ui.resultCount} aria-live="polite">{total} results for “{q}”</p>
            {total === 0 && <EmptyState title="No results">Try a broader term, a division name, or an author’s surname.</EmptyState>}
            {show('people') && <ResultGroup title="People" n={count('people')}><div className={ui.grid3}>{results.people.slice(0, type === 'all' ? 6 : undefined).map(p => <ProfileCard key={p.slug} person={p} />)}</div></ResultGroup>}
            {show('research') && <ResultGroup title="Research" n={count('research')}><div className={ui.grid3}>{results.research.map(r => <ResearchCard key={r.slug} study={r} />)}</div></ResultGroup>}
            {show('projects') && <ResultGroup title="Projects" n={count('projects')}><div className={ui.grid3}>{results.projects.map(p => <ProjectCard key={p.slug} project={p} />)}</div></ResultGroup>}
            {show('publications') && <ResultGroup title="Publications" n={count('publications')}><div className={ui.grid2}>{results.publications.map(p => <PublicationCard key={p.slug} publication={p} />)}</div></ResultGroup>}
            {show('books') && <ResultGroup title="Books" n={count('books')}><div className={ui.grid2}>{results.books.map(b => <BookCard key={b.slug} book={b} />)}</div></ResultGroup>}
            {show('insights') && <ResultGroup title="Insights" n={count('insights')}><div className={ui.grid3}>{results.insights.map(i => <ArticleCard key={i.slug} insight={i} />)}</div></ResultGroup>}
            {show('divisions') && <ResultGroup title="Divisions" n={count('divisions')}><div className="division-grid">{results.divisions.map(d => <DivisionCard key={d.id} division={d} />)}</div></ResultGroup>}
          </>
        )}
      </Section>
    </div>
  );
}

function ResultGroup({ title, n, children }: { title: string; n: number; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h2 className={ui.sectionTitle} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title} <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>({n})</span></h2>
      {children}
    </section>
  );
}
