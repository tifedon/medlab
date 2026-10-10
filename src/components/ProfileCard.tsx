import Link from 'next/link';
import Image from 'next/image';
import type { TeamMember } from '@/lib/people';
import DivisionTags from './DivisionTags';
import styles from './ui.module.css';

export default function ProfileCard({ person }: { person: TeamMember }) {
  return (
    <article className={styles.card} style={{ padding: '1.25rem 0 0', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', width: '100%' }}>
        <div style={{ width: 80, height: 80, flex: '0 0 80px', position: 'relative', overflow: 'hidden', borderRadius: 0, background: 'var(--gray-100)' }}>
          <Image src={person.image} alt="" fill sizes="80px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
        </div>
        <div className={styles.listItemMain}>
          <h3 className={styles.listItemTitle}>
            <Link href={`/people/${person.slug}`}>{person.name}</Link>
          </h3>
          <p className={styles.listItemByline}>{person.degrees.join(', ')}</p>
          <p className={styles.listItemText}>{person.title} · {person.specialty}</p>
          <DivisionTags ids={person.divisions} />
        </div>
      </div>
    </article>
  );
}
