import Link from 'next/link';
import { formatPhase, researchStatusLabel, type ResearchRecord } from '@/lib/research';
import DivisionTags from './DivisionTags';
import StatusBadge from './StatusBadge';
import styles from './ui.module.css';

export default function ResearchCard({ study }: { study: ResearchRecord }) {
  const phase = formatPhase(study.phase);
  return (
    <article className={styles.listItem}>
      <div className={styles.listItemMain}>
        <div className={styles.listItemTop}>
          <StatusBadge status={study.status} label={researchStatusLabel(study.status)} />
          <span className={styles.label}>{study.studyType === 'INTERVENTIONAL' ? 'Interventional' : 'Observational'}</span>
          {phase && <span className={styles.label}>{phase}</span>}
        </div>
        <h3 className={styles.listItemTitle}>
          <Link href={`/research/${study.slug}`}>{study.title}</Link>
        </h3>
        <p className={styles.listItemByline}>{study.sponsor}</p>
        <p className={styles.listItemText}>{study.summary}</p>
        <DivisionTags ids={study.divisions} />
      </div>
      <div className={styles.listItemRight}>
        {study.startDate && <span>{study.startDate.slice(0, 4)}</span>}
      </div>
    </article>
  );
}
