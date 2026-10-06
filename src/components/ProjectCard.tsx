import Link from 'next/link';
import { projectStatusLabels, projectTypeLabels, type Project } from '@/lib/projects';
import DivisionTags from './DivisionTags';
import StatusBadge from './StatusBadge';
import styles from './ui.module.css';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <StatusBadge status={project.status} label={projectStatusLabels[project.status]} />
        <span className={styles.label}>{projectTypeLabels[project.type]}</span>
      </div>
      <h3 className={styles.cardTitle}>
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className={styles.cardText}>{project.overview}</p>
      <DivisionTags ids={project.divisions} />
      <div className={styles.cardMeta}>
        {project.phase && <span>{project.phase}</span>}
        <span>{project.team}</span>
      </div>
    </article>
  );
}
