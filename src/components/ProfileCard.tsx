import Link from 'next/link';
import type { LibraryContributor } from '@/lib/people';
import { getDivisionById } from '@/lib/divisions';
import styles from './ui.module.css';

export function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

export default function ProfileCard({ person }: { person: LibraryContributor }) {
  return (
    <article className={styles.card}>
      <div className={styles.profileHead}>
        <span className={styles.avatar} aria-hidden="true">{initials(person.name)}</span>
        <div style={{ minWidth: 0 }}>
          <h3 className={styles.cardTitle}>
            <Link href={`/people/${person.slug}`}>{person.name}</Link>
          </h3>
          <p className={styles.cardByline} style={{ margin: 0 }}>{person.roles.join(' · ')}</p>
        </div>
      </div>
      {person.affiliations[0] && <p className={styles.cardText}>{person.affiliations[0]}</p>}
      <div className={styles.cardMeta}>
        <span>{person.works.length} {person.works.length === 1 ? 'work' : 'works'} in the library</span>
        <span>{person.divisions.map(d => getDivisionById(d)?.shortName).filter(Boolean).slice(0, 2).join(', ')}</span>
      </div>
    </article>
  );
}
