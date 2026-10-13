import Image from 'next/image';
import type { Book } from '@/lib/books';
import { getDivisionById } from '@/lib/divisions';
import styles from './ui.module.css';

/** Uses institute-owned cover art when supplied; external titles retain a typographic cover. */
export default function BookCover({ book, large }: { book: Book; large?: boolean }) {
  if (book.coverImage) {
    return (
      <div className={`${styles.cover} ${styles.coverArtwork} ${large ? styles.coverLarge : ''}`} aria-hidden="true">
        <Image
          src={book.coverImage}
          alt=""
          fill
          sizes={large ? '(max-width: 720px) 42vw, 220px' : '96px'}
          className={styles.coverImage}
        />
      </div>
    );
  }

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
