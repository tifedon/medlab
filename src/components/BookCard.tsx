import Link from 'next/link';
import { bookCategoryLabels, type Book } from '@/lib/books';
import { byline } from './AuthorList';
import BookCover from './BookCover';
import styles from './ui.module.css';

export default function BookCard({ book }: { book: Book }) {
  const credit = book.authors.length ? byline(book.authors) : book.editors.length ? `${byline(book.editors)} (eds.)` : '';
  return (
    <article className={`${styles.card} ${styles.bookCard}`}>
      <BookCover book={book} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div className={styles.cardTop}>
          <span className={styles.label}>{bookCategoryLabels[book.category]}</span>
        </div>
        <h3 className={styles.cardTitle}>
          <Link href={`/books/${book.slug}`}>{book.title}</Link>
        </h3>
        <p className={styles.cardByline}>{credit}</p>
        <div className={styles.cardMeta}>
          {book.edition && <span>{book.edition}</span>}
          <span>{book.publisher}</span>
          <span>{book.year}</span>
        </div>
      </div>
    </article>
  );
}
