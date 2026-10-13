import type { Metadata } from 'next';
import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import FileManager, { type WebsiteFileRecord } from './FileManager';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Website file manager',
  description: 'Protected file management for Sterling IMRES website assets.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const bucket = 'website-files';

export default async function AdminFilesPage() {
  await requireRole('admin');
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(bucket).list('', {
    limit: 200,
    offset: 0,
    sortBy: { column: 'created_at', order: 'desc' },
  });

  const files: WebsiteFileRecord[] = (data ?? [])
    .filter(item => item.id)
    .map(item => {
      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(item.name);
      const metadata = item.metadata as Record<string, unknown> | null;

      return {
        name: item.name,
        id: item.id ?? item.name,
        createdAt: item.created_at ?? null,
        updatedAt: item.updated_at ?? null,
        size: typeof metadata?.size === 'number' ? metadata.size : null,
        mimeType: typeof metadata?.mimetype === 'string' ? metadata.mimetype : null,
        publicUrl: publicData.publicUrl,
      };
    });

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/admin">Administrator</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Website files</span>
        </nav>
        <div className={styles.heading}>
          <div>
            <p className={styles.kicker}>File management</p>
            <h1>Website files</h1>
          </div>
          <p>Upload approved PDFs and cover images, copy their public links, or remove assets that should no longer be available.</p>
        </div>
        <FileManager initialFiles={files} initialError={error?.message ?? null} />
      </main>
    </div>
  );
}
