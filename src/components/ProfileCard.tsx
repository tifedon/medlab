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
    <article className={styles.listItem} style={{ display: 'block', padding: '1.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', width: '100%' }}>
        <span className={styles.avatar} style={{ marginTop: '0.2rem' }} aria-hidden="true">{initials(person.name)}</span>
        <div className={styles.listItemMain}>
          <h3 className={styles.listItemTitle}>
            <Link href={`/people/${person.slug}`}>{person.name}</Link>
          </h3>
          <p className={styles.listItemByline}>
            {person.roles.join(' · ')}
            {person.affiliations[0] && <span> · {person.affiliations[0]}</span>}
          </p>
          
          {person.works.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray-500)', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                Works ({person.works.length})
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
                {person.works.map(work => (
                  <li key={work.href} style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                    <Link href={work.href} className={styles.listItemTitle} style={{ color: 'var(--navy-900)', fontSize: '0.95rem' }}>
                      {work.title}
                    </Link>
                    <span style={{ color: 'var(--gray-500)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                      ({work.year || 'N/A'})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.listItemRight} style={{ textAlign: 'right' }}>
           <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gray-500)' }}>
             {person.divisions.map(d => getDivisionById(d)?.shortName).filter(Boolean).slice(0, 2).join(', ')}
           </span>
        </div>
      </div>
    </article>
  );
}
