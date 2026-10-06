import type { PlannedProgramme } from '@/lib/education';
import DivisionTags from './DivisionTags';
import StatusBadge from './StatusBadge';
import styles from './ui.module.css';

export default function ProgrammeCard({ programme: p }: { programme: PlannedProgramme }) {
  return (
    <article className={styles.card} id={p.slug}>
      <div className={styles.cardTop}>
        <StatusBadge status={p.status} label={p.status === 'in-development' ? 'In development' : 'Upcoming'} />
        <span className={styles.label}>{p.format}</span>
      </div>
      <h3 className={styles.cardTitle}>{p.title}</h3>
      <p className={styles.cardByline}>For: {p.audience}</p>
      <p className={styles.cardText}>{p.description}</p>
      <ul className={styles.cardText} style={{ paddingLeft: '1.1rem', listStyle: 'disc' }}>
        {p.outcomes.map(o => <li key={o}>{o}</li>)}
      </ul>
      <DivisionTags ids={p.divisions} />
      <div className={styles.cardMeta}>
        <span>Not yet enrolling · no accredited award</span>
      </div>
    </article>
  );
}
