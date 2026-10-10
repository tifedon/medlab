import Link from 'next/link';
import type { Division } from '@/lib/divisions';
import DivisionIcon from './DivisionIcon';
import styles from './DivisionCard.module.css';

export default function DivisionCard({ division, counts }: { division: Division; counts?: { label: string; value: number }[] }) {
  return (
    <Link href={`/divisions/${division.id}`} className={styles.card} id={`division-${division.id}`}>
      <DivisionIcon division={division} />
      <div className={styles.content}>
        <span className={styles.kind}>{division.kind === 'unit' ? 'Unit' : 'Division'}</span>
        <h3 className={styles.name}>{division.name}</h3>
        <p className={styles.description}>{division.role}</p>
        {counts && (
          <div className={styles.stats}>
            {counts.map(c => (
              <span key={c.label} className={styles.stat}>
                <span className={styles.statNum}>{c.value}</span> {c.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
