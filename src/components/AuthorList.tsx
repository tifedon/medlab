import Link from 'next/link';
import type { Contributor } from '@/lib/publications';
import { personSlug } from '@/lib/people';
import styles from './ui.module.css';

/** Contributors with links to their library index pages and ORCID records. */
export default function AuthorList({ people }: { people: Contributor[] }) {
  return (
    <ul className={styles.authorList}>
      {people.map((person, i) => {
        const name = person.name.split(',')[0].trim();
        return (
          <li key={`${person.name}-${i}`} className={styles.authorItem}>
            <Link href={`/people/${personSlug(name)}`}>{person.name}</Link>
            {person.role && <span>{person.role}</span>}
            {person.affiliation && <span>{person.affiliation}</span>}
            {person.orcid && (
              <span>
                <a href={`https://orcid.org/${person.orcid}`} target="_blank" rel="noopener noreferrer">ORCID {person.orcid}</a>
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
