import Link from 'next/link';
import Notice from './Notice';
import { LIBRARY_NOTICE } from '@/lib/site';

export default function LibraryNotice({ source }: { source?: string }) {
  return (
    <Notice>
      <strong>Reference library record.</strong> {LIBRARY_NOTICE}
      {source && <> Metadata verified via {source}.</>} <Link href="/scientific-integrity/editorial-standards">How records are verified</Link>
    </Notice>
  );
}
