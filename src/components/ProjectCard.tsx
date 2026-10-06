import Link from 'next/link';
import { projectStatusLabels, projectTypeLabels, type Project } from '@/lib/projects';
import DivisionTags from './DivisionTags';
import StatusBadge from './StatusBadge';
import styles from './ui.module.css';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.listItem}>
      <div className={styles.listItemMain}>
        <div className={styles.listItemTop}>
          <StatusBadge status={project.status} label={projectStatusLabels[project.status]} />
          <span className={styles.label}>{projectTypeLabels[project.type]}</span>
        </div>
        <h3 className={styles.listItemTitle}>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className={styles.listItemByline}>{project.team}</p>
        <p className={styles.listItemText}>{project.overview}</p>
      </div>
      <div className={styles.listItemRight}>
        {project.phase && <span>{project.phase}</span>}
      </div>
    </article>
  );
}
