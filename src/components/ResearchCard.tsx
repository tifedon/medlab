import Link from 'next/link';
import { formatPhase, researchStatusLabel, type ResearchRecord } from '@/lib/research';
import DivisionTags from './DivisionTags';
import StatusBadge from './StatusBadge';
import styles from './ui.module.css';

export default function ResearchCard({ study }: { study: ResearchRecord }) {
  const phase = formatPhase(study.phase);
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <StatusBadge status={study.status} label={researchStatusLabel(study.status)} />
        <span className={styles.label}>{study.studyType === 'INTERVENTIONAL' ? 'Interventional' : 'Observational'}</span>
        {phase && <span className={styles.label}>{phase}</span>}
      </div>
      <h3 className={styles.cardTitle}>
        <Link href={`/research/${study.slug}`}>{study.title}</Link>
      </h3>
      <p className={styles.cardByline}>{study.sponsor}</p>
      <p className={styles.cardText}>{study.summary}</p>
      <DivisionTags ids={study.divisions} />
      <div className={styles.cardMeta}>
        <span>{study.nctId}</span>
        {study.enrollment && <span>{study.enrollment.toLocaleString('en-GB')} participants{study.enrollmentType === 'ESTIMATED' ? ' (target)' : ''}</span>}
        {study.startDate && <span>Start {study.startDate.slice(0, 7)}</span>}
      </div>
    </article>
  );
}
