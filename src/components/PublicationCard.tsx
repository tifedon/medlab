import Link from 'next/link';
import { publicationTypeLabels, publicationYear, type Publication } from '@/lib/publications';
import { byline } from './AuthorList';
import DivisionTags from './DivisionTags';
import styles from './ui.module.css';

export default function PublicationCard({ publication: p }: { publication: Publication }) {
  return (
    <article className={styles.listItem}>
      <div className={styles.listItemMain}>
        <div className={styles.listItemTop}>
          <span className={styles.label}>{publicationTypeLabels[p.type]}</span>
        </div>
        <h3 className={styles.listItemTitle}>
          <Link href={`/publications/${p.slug}`}>{p.title}</Link>
          {p.openAccess && <span className={styles.listItemBadge}>OPEN ACCESS</span>}
        </h3>
        <p className={styles.listItemByline}>{byline(p.authors, 3, p.authorsTruncated) || p.corporateAuthor}</p>
        <p className={styles.listItemText}>
          <em>{p.journal}</em> {p.doi && <span> · DOI: {p.doi}</span>}
        </p>
        <DivisionTags ids={p.divisions} />
      </div>
      <div className={styles.listItemRight}>
        {publicationYear(p)}
      </div>
    </article>
  );
}
