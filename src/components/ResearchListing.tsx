import ResearchCard from './ResearchCard';
import EmptyState from './EmptyState';
import { divisions } from '@/lib/divisions';
import { researchStatusLabel, type ResearchRecord } from '@/lib/research';
import ui from './ui.module.css';

/** Filterable grid of research records, shared by the research status pages. */
export default function ResearchListing({ records, basePath, current }: { records: ResearchRecord[]; basePath: string; current: Record<string, string | undefined> }) {
  const statuses = [...new Set(records.map(r => r.status))];
  const usedDivisions = divisions.filter(d => records.some(r => r.divisions.includes(d.id)));
  const filtered = records.filter(
    r =>
      (!current.division || r.divisions.includes(current.division)) &&
      (!current.status || r.status === current.status) &&
      (!current.type || r.studyType === current.type),
  );

  return (
    <>
      <p className={ui.resultCount} aria-live="polite">{filtered.length} {filtered.length === 1 ? 'study' : 'studies'}</p>
      {filtered.length ? (
        <div className={ui.flatList}>{filtered.map(r => <ResearchCard key={r.slug} study={r} />)}</div>
      ) : (
        <EmptyState title="No studies match these filters">Clear a filter to see more research.</EmptyState>
      )}
    </>
  );
}
