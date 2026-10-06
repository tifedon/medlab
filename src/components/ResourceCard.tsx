import type { LearningResource } from '@/lib/education';
import { ExternalLinkIcon } from './Icons';
import DivisionTags from './DivisionTags';
import styles from './ui.module.css';

export default function ResourceCard({ resource: r }: { resource: LearningResource }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.label}>{r.kind}</span>
        <span className="access-badge access-badge--open">{r.access}</span>
      </div>
      <h3 className={styles.cardTitle}>
        <a href={r.url} target="_blank" rel="noopener noreferrer">
          {r.title} <ExternalLinkIcon size={14} />
        </a>
      </h3>
      <p className={styles.cardByline}>{r.provider}</p>
      <p className={styles.cardText}>{r.description}</p>
      <DivisionTags ids={r.divisions} />
      <div className={styles.cardMeta}>
        <span>{r.format}</span>
      </div>
    </article>
  );
}
