import ResearchCard from './ResearchCard';
import EmptyState from './EmptyState';
import FilterBar from './FilterBar';
import { divisions } from '@/lib/divisions';
import {
  completedStatuses,
  currentStatuses,
  researchStatusLabel,
  upcomingStatuses,
  type ResearchRecord,
  type ResearchStatus,
} from '@/lib/research';
import ui from './ui.module.css';

/** Filterable grid of research records, shared by the research status pages. */
export default function ResearchListing({ records, basePath, current }: { records: ResearchRecord[]; basePath: string; current: Record<string, string | undefined> }) {
  const statuses = [...new Set(records.map(r => r.status))];
  const usedDivisions = divisions.filter(d => records.some(r => r.divisions.includes(d.id)));
  const stageStatuses: Record<string, ResearchStatus[]> = {
    current: currentStatuses,
    upcoming: upcomingStatuses,
    completed: completedStatuses,
  };
  const filtered = records.filter(
    r =>
      (!current.stage || stageStatuses[current.stage]?.includes(r.status)) &&
      (!current.division || r.divisions.includes(current.division)) &&
      (!current.status || r.status === current.status) &&
      (!current.type || r.studyType === current.type),
  );

  return (
    <>
      <FilterBar
        basePath={basePath}
        current={current}
        groups={[
          {
            param: 'stage',
            label: 'Stage',
            clears: ['status'],
            options: [
              { value: 'current', label: 'Current' },
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'completed', label: 'Completed' },
            ],
          },
          { param: 'status', label: 'Status', clears: ['stage'], options: statuses.map(status => ({ value: status, label: researchStatusLabel(status) })) },
          { param: 'division', label: 'Division', options: usedDivisions.map(d => ({ value: d.id, label: d.shortName })) },
          {
            param: 'type',
            label: 'Study type',
            options: [
              { value: 'INTERVENTIONAL', label: 'Interventional' },
              { value: 'OBSERVATIONAL', label: 'Observational' },
            ],
          },
        ]}
      />
      <p className={ui.resultCount} aria-live="polite">{filtered.length} {filtered.length === 1 ? 'study' : 'studies'}</p>
      {filtered.length ? (
        <div className={ui.flatList}>{filtered.map(r => <ResearchCard key={r.slug} study={r} />)}</div>
      ) : (
        <EmptyState title="No studies match these filters">Clear a filter to see more research.</EmptyState>
      )}
    </>
  );
}
