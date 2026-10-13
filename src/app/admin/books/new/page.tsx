import type { Metadata } from 'next';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import BookEditor from '../BookEditor';
import styles from '../page.module.css';

export const metadata: Metadata = { title: 'Add a book', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function NewBookPage() {
  await requireRole('admin');
  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/admin">Administrator</Link><span>/</span><Link href="/admin/books">Books</Link><span>/</span><span aria-current="page">New</span></nav>
        <div className={styles.heading}><div><p className={styles.kicker}>Publishing catalogue</p><h1>Add a book</h1></div><p>Create the catalogue record, add cover images, and publish approved places where readers can buy it.</p></div>
        <BookEditor book={null} />
      </main>
    </div>
  );
}
