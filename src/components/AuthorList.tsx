import type { Contributor } from '@/lib/publications';
import styles from './ui.module.css';

/** External contributors are credited exactly as supplied by the source record. */
export default function AuthorList({ people }: { people: Contributor[] }) {
  return (
    <ul className={styles.authorList}>
      {people.map((person, i) => {
        const metaParts = [person.role, person.affiliation].filter(Boolean);
        return (
          <li key={`${person.name}-${i}`} className={styles.authorItem}>
            <span className={styles.authorName}>{person.name}</span>
            {(metaParts.length > 0 || person.orcid) && (
              <span className={styles.authorMeta}>
                {metaParts.map((part, j) => (
                  <span key={j}>{part}</span>
                ))}
                {person.orcid && (
                  <span>
                    <a href={`https://orcid.org/${person.orcid}`} target="_blank" rel="noopener noreferrer">
                      ORCID {person.orcid}
                    </a>
                  </span>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Short byline: "A, B, C et al." */
export function byline(people: { name: string }[], max = 3, truncated = false) {
  const names = people.map(p => p.name.split(',')[0].trim());
  if (!names.length) return '';
  const shown = names.slice(0, max).join(', ');
  return names.length > max || truncated ? `${shown} et al.` : shown;
}

