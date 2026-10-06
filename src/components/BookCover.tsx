import type { Book } from '@/lib/books';
import { getDivisionById } from '@/lib/divisions';
import styles from './ui.module.css';

/** Typographic cover so no publisher cover art is reproduced. */
export default function BookCover({ book, large }: { book: Book; large?: boolean }) {
  const color = getDivisionById(book.divisions[0])?.color ?? '#112240';
  return (
    <div className={`${styles.cover} ${large ? styles.coverLarge : ''}`} style={{ background: `linear-gradient(160deg, ${color}, #0a1628)` }} aria-hidden="true">
      <div>
        <div className={styles.coverTitle}>{book.title}</div>
        <div className={styles.coverRule} />
        {book.edition && <div className={styles.coverMeta}>{book.edition}</div>}
      </div>
      <div className={styles.coverMeta}>{book.publisher}</div>
    </div>
  );
}
