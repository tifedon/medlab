import PublicationCard from './PublicationCard';
import EmptyState from './EmptyState';
import FilterBar from './FilterBar';
import { divisions } from '@/lib/divisions';
import { publicationTypeLabels, publicationYear, type Publication } from '@/lib/publications';
import ui from './ui.module.css';

const decade = (year: number) => `${Math.floor(year / 5) * 5}`;

/** Filter by type, division, period and access (blueprint §13: author, division, type, year, research area). */
export default function PublicationListing({ records, basePath, current }: { records: Publication[]; basePath: string; current: Record<string, string | undefined> }) {
  const types = [...new Set(records.map(p => p.type))];
  const periods = [...new Set(records.map(p => decade(publicationYear(p))))].sort().reverse();
  const usedDivisions = divisions.filter(d => records.some(p => p.divisions.includes(d.id)));
  const filtered = records.filter(
    p =>
      (!current.type || p.type === current.type) &&
      (!current.division || p.divisions.includes(current.division)) &&
      (!current.period || decade(publicationYear(p)) === current.period) &&
      (!current.access || (current.access === 'open') === p.openAccess),
  );

  return (
    <>
      <FilterBar
        basePath={basePath}
        current={current}
        groups={[
          { param: 'type', label: 'Type', options: types.map(t => ({ value: t, label: publicationTypeLabels[t] })) },
          { param: 'division', label: 'Division', options: usedDivisions.map(d => ({ value: d.id, label: d.shortName })) },
          { param: 'period', label: 'Published', options: periods.map(p => ({ value: p, label: `${p}–${Number(p) + 4}` })) },
          { param: 'access', label: 'Access', options: [{ value: 'open', label: 'Open access' }, { value: 'subscription', label: 'Subscription' }] },
        ]}
      />
      <p className={ui.resultCount} aria-live="polite">{filtered.length} publications</p>
      {filtered.length ? (
        <div className={ui.grid2}>{filtered.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
      ) : (
        <EmptyState title="No publications match these filters">Clear a filter to see more.</EmptyState>
      )}
    </>
  );
}
