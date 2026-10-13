import type { Metadata } from 'next';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { getAdminPressBooks } from '@/lib/press-catalogue';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Book catalogue manager',
  description: 'Protected Sterling IMRES Press catalogue management.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminBooksPage() {
  await requireRole('admin');
  const { books, error } = await getAdminPressBooks();

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/admin">Administrator</Link><span>/</span><span aria-current="page">Books</span></nav>
        <div className={styles.heading}>
          <div><p className={styles.kicker}>Publishing catalogue</p><h1>Books</h1></div>
          <div><p>Add Sterling IMRES Press books, upload cover artwork, manage publication details and publish links to retailers.</p><Link className={styles.primaryLink} href="/admin/books/new">Add a book</Link></div>
        </div>

        {error ? (
          <div className={`${styles.message} ${styles.messageError}`}>The catalogue is not ready in this Supabase project. Apply the press book catalogue migration, then reload this page.</div>
        ) : books.length === 0 ? (
          <div className={styles.empty}><h2>No books yet</h2><p>Add the first Press title to begin the catalogue.</p></div>
        ) : (
          <section aria-labelledby="catalogue-heading">
            <div className={styles.listHeading}><h2 id="catalogue-heading">Catalogue</h2><span>{books.length} title{books.length === 1 ? '' : 's'}</span></div>
            <ul className={styles.bookList}>
              {books.map(book => (
                <li key={book.id}>
                  <div>
                    <h3><Link href={`/admin/books/${book.id}`}>{book.title}</Link></h3>
                    <p>{book.publisher} · {book.status.replaceAll('-', ' ')}{book.publication_year ? ` · ${book.publication_year}` : ''}</p>
                  </div>
                  <div className={styles.listMeta}>
                    <span>{book.is_visible ? 'Public' : 'Hidden'}</span>
                    <span>{book.book_purchase_links.length} purchase link{book.book_purchase_links.length === 1 ? '' : 's'}</span>
                    <Link href={`/books/${book.slug}`}>View page</Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
