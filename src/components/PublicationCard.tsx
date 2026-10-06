import Link from 'next/link';
import { publicationTypeLabels, publicationYear, type Publication } from '@/lib/publications';
import { byline } from './AuthorList';
import DivisionTags from './DivisionTags';
import styles from './ui.module.css';

export default function PublicationCard({ publication: p }: { publication: Publication }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.label}>{publicationTypeLabels[p.type]}</span>
        {p.openAccess && <span className="access-badge access-badge--open">Open access</span>}
      </div>
      <h3 className={styles.cardTitle}>
        <Link href={`/publications/${p.slug}`}>{p.title}</Link>
      </h3>
      <p className={styles.cardByline}>{byline(p.authors, 3, p.authorsTruncated) || p.corporateAuthor}</p>
      <p className={styles.cardText}>{p.summary}</p>
      <DivisionTags ids={p.divisions} />
      <div className={styles.cardMeta}>
        <span><em>{p.journal}</em></span>
        <span>{publicationYear(p)}</span>
        {p.doi && <span>DOI {p.doi}</span>}
      </div>
    </article>
  );
}
