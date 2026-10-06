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
  { key: 'all', label: 'All types' },
  { key: 'publications', label: 'Publications' },
  { key: 'books', label: 'Books' },
  { key: 'research', label: 'Research' },
  { key: 'projects', label: 'Projects' },
  { key: 'insights', label: 'Insights' },
  { key: 'people', label: 'People' },
  { key: 'divisions', label: 'Divisions' },
];

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const q = (param(sp.q) ?? '').trim().slice(0, 200);
  const type = tabs.some(t => t.key === param(sp.type)) ? (param(sp.type) as (typeof tabs)[number]['key']) : 'all';
  const sort = param(sp.sort) === 'date' ? 'date' : 'relevance';
  const sinceStr = param(sp.since);
  const since = sinceStr ? parseInt(sinceStr, 10) : undefined;

  const rawResults = q ? searchResources(q) : null;
  
  type UnifiedItem = { kind: keyof SearchResults; item: any; year: number | null };
  let unified: UnifiedItem[] = [];

  if (rawResults) {
    if (type === 'all' || type === 'publications') unified.push(...rawResults.publications.map(p => ({ kind: 'publications' as const, item: p, year: Number(p.publishedDate.slice(0, 4)) })));
    if (type === 'all' || type === 'books') unified.push(...rawResults.books.map(b => ({ kind: 'books' as const, item: b, year: b.year })));
    if (type === 'all' || type === 'research') unified.push(...rawResults.research.map(r => ({ kind: 'research' as const, item: r, year: r.startDate ? Number(r.startDate.slice(0, 4)) : null })));
    if (type === 'all' || type === 'projects') unified.push(...rawResults.projects.map(p => ({ kind: 'projects' as const, item: p, year: null })));
    if (type === 'all' || type === 'insights') unified.push(...rawResults.insights.map(i => ({ kind: 'insights' as const, item: i, year: Number(i.publishedDate.slice(0, 4)) })));
    if (type === 'all' || type === 'people') unified.push(...rawResults.people.map(p => ({ kind: 'people' as const, item: p, year: null })));
    if (type === 'all' || type === 'divisions') unified.push(...rawResults.divisions.map(d => ({ kind: 'divisions' as const, item: d, year: null })));

    if (since) {
      unified = unified.filter(x => x.year !== null && x.year >= since);
    }

    if (sort === 'date') {
      unified.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    }
  }

  const buildHref = (overrides: { type?: string; sort?: string; since?: string }) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    
    const newType = overrides.type !== undefined ? overrides.type : type;
    if (newType !== 'all') params.set('type', newType);
    
    const newSort = overrides.sort !== undefined ? overrides.sort : sort;
    if (newSort !== 'relevance') params.set('sort', newSort);
    
    const newSince = overrides.since !== undefined ? overrides.since : sinceStr;
    if (newSince) params.set('since', newSince);
    
    return `/search?${params.toString()}`;
  };

  const currentYear = new Date().getFullYear();

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
          {sort !== 'relevance' && <input type="hidden" name="sort" value={sort} />}
          {since && <input type="hidden" name="since" value={since} />}
          <button type="submit" className="btn btn--primary" style={{ height: 48 }}><SearchIcon size={16} /> Search</button>
        </form>
      </PageHero>

      <Section last>
        {!q && <EmptyState title="Start with a search term">Search covers every record in the library and every page of the institute.</EmptyState>}
        {rawResults && (
          <div className={ui.searchLayout}>
            <aside className={ui.searchSidebar}>
              <div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--gray-200)' }}>Time</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                  <li><Link href={buildHref({ since: '' })} style={{ color: !since ? 'var(--navy-900)' : 'var(--teal-700)', fontWeight: !since ? 600 : 400 }}>Any time</Link></li>
                  <li><Link href={buildHref({ since: currentYear.toString() })} style={{ color: since === currentYear ? 'var(--navy-900)' : 'var(--teal-700)', fontWeight: since === currentYear ? 600 : 400 }}>Since {currentYear}</Link></li>
                  <li><Link href={buildHref({ since: (currentYear - 1).toString() })} style={{ color: since === currentYear - 1 ? 'var(--navy-900)' : 'var(--teal-700)', fontWeight: since === currentYear - 1 ? 600 : 400 }}>Since {currentYear - 1}</Link></li>
                  <li><Link href={buildHref({ since: (currentYear - 4).toString() })} style={{ color: since === currentYear - 4 ? 'var(--navy-900)' : 'var(--teal-700)', fontWeight: since === currentYear - 4 ? 600 : 400 }}>Since {currentYear - 4}</Link></li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--gray-200)' }}>Sort by</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                  <li><Link href={buildHref({ sort: 'relevance' })} style={{ color: sort === 'relevance' ? 'var(--navy-900)' : 'var(--teal-700)', fontWeight: sort === 'relevance' ? 600 : 400 }}>Relevance</Link></li>
                  <li><Link href={buildHref({ sort: 'date' })} style={{ color: sort === 'date' ? 'var(--navy-900)' : 'var(--teal-700)', fontWeight: sort === 'date' ? 600 : 400 }}>Date</Link></li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--gray-200)' }}>Type</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
                  {tabs.map(t => (
                    <li key={t.key}>
                      <Link href={buildHref({ type: t.key })} style={{ color: type === t.key ? 'var(--navy-900)' : 'var(--teal-700)', fontWeight: type === t.key ? 600 : 400 }}>
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className={ui.searchMain}>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '1.5rem' }}>About {unified.length} results</p>
              
              {unified.length === 0 && <EmptyState title="No results">Try a broader term or clear your filters.</EmptyState>}
              
              <div className={ui.flatList}>
                {unified.map((u, i) => {
                   if (u.kind === 'publications') return <PublicationCard key={`pub-${i}`} publication={u.item} />;
                   if (u.kind === 'books') return <BookCard key={`book-${i}`} book={u.item} />;
                   if (u.kind === 'research') return <ResearchCard key={`res-${i}`} study={u.item} />;
                   if (u.kind === 'projects') return <ProjectCard key={`proj-${i}`} project={u.item} />;
                   if (u.kind === 'insights') return <ArticleCard key={`ins-${i}`} insight={u.item} />;
                   if (u.kind === 'people') return <ProfileCard key={`peo-${i}`} person={u.item} />;
                   if (u.kind === 'divisions') return <div key={`div-${i}`} style={{ padding: '1rem 0' }}><DivisionCard division={u.item} /></div>;
                   return null;
                })}
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}
