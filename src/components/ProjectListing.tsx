import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import FilterBar from './FilterBar';
import { projectTypeLabels, type Project } from '@/lib/projects';
import ui from './ui.module.css';

export default function ProjectListing({ records, basePath, current }: { records: Project[]; basePath: string; current: Record<string, string | undefined> }) {
  const types = [...new Set(records.map(p => p.type))];
  const filtered = records.filter(p => !current.type || p.type === current.type);
  return (
    <>
      <FilterBar basePath={basePath} current={current} groups={[{ param: 'type', label: 'Project type', options: types.map(t => ({ value: t, label: projectTypeLabels[t] })) }]} />
      {filtered.length ? (
        <div className={ui.flatList}>{filtered.map(p => <ProjectCard key={p.slug} project={p} />)}</div>
      ) : (
        <EmptyState title="No projects here yet">Projects appear as they are approved.</EmptyState>
      )}
    </>
  );
}
