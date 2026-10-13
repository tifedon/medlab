import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { getAdminPressBook } from '@/lib/press-catalogue';
import BookEditor from '../BookEditor';
import styles from '../page.module.css';

export const metadata: Metadata = { title: 'Edit book', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole('admin');
  const { id } = await params;
  const book = await getAdminPressBook(id);
  if (!book) notFound();

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/admin">Administrator</Link><span>/</span><Link href="/admin/books">Books</Link><span>/</span><span aria-current="page">Edit</span></nav>
        <div className={styles.heading}><div><p className={styles.kicker}>Publishing catalogue</p><h1>Edit book</h1></div><div><p>{book.title}</p><Link className={styles.secondaryLink} href={`/books/${book.slug}`}>View public page</Link></div></div>
        <BookEditor book={book} />
      </main>
    </div>
  );
}
