import Link from 'next/link';
import { getDivisionById } from '@/lib/divisions';
import styles from './ui.module.css';

export default function DivisionTags({ ids }: { ids: string[] }) {
  return (
    <div className={styles.tagRow}>
      {ids.map(id => {
        const division = getDivisionById(id);
        if (!division) return null;
        return (
          <Link key={id} href={`/divisions/${id}`} className={styles.tag}>
            {division.shortName}
          </Link>
        );
      })}
    </div>
  );
}
