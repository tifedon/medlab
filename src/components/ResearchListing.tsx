import ResearchCard from './ResearchCard';
import EmptyState from './EmptyState';
import FilterBar from './FilterBar';
import { divisions } from '@/lib/divisions';
import type { ResearchRecord } from '@/lib/research';
import ui from './ui.module.css';

/** Filterable grid of research records, shared by the research status pages. */
export default function ResearchListing({ records, basePath, current }: { records: ResearchRecord[]; basePath: string; current: Record<string, string | undefined> }) {
  const usedDivisions = divisions.filter(d => records.some(r => r.divisions.includes(d.id)));
  const query = current.q?.trim().toLowerCase();
  const filtered = records.filter((r) => {
    const matchesDivision = !current.division || r.divisions.includes(current.division);
    if (!matchesDivision) return false;
    if (!query) return true;

    const searchableText = [
      r.title,
      r.officialTitle ?? '',
      r.summary,
      r.sponsor,
      r.design ?? '',
      r.conditions.join(' '),
      r.primaryOutcome ?? '',
      r.objectives?.join(' ') ?? '',
      r.countries?.join(' ') ?? '',
      r.investigators?.map(i => `${i.name} ${i.role ?? ''} ${i.affiliation ?? ''}`).join(' ') ?? '',
    ].join(' ').toLowerCase();

    return searchableText.includes(query);
  });

  return (
    <>
      <div className={ui.searchToolbar}>
        <form method="get" action={basePath} className={ui.searchForm}>
          {current.division && <input type="hidden" name="division" value={current.division} />}
          <label htmlFor="research-search" className={ui.searchLabel}>Search</label>
          <input
            id="research-search"
            name="q"
            type="search"
            defaultValue={current.q ?? ''}
            placeholder="Search studies, conditions, sponsors or methods"
            className={ui.searchInput}
            aria-label="Search research records"
          />
        </form>
        <FilterBar
          basePath={basePath}
          current={current}
          groups={[
            { param: 'division', label: 'Division', options: usedDivisions.map(d => ({ value: d.id, label: d.shortName })) },
          ]}
        />
      </div>
      <p className={ui.resultCount} aria-live="polite">{filtered.length} {filtered.length === 1 ? 'study' : 'studies'}</p>
      {filtered.length ? (
        <div className={ui.flatList}>{filtered.map(r => <ResearchCard key={r.slug} study={r} />)}</div>
      ) : (
        <EmptyState title="No studies match these filters">Clear a filter or search term to see more research.</EmptyState>
      )}
    </>
  );
}
