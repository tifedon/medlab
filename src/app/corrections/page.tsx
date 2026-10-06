import type { Metadata } from 'next';
import Link from 'next/link';
import PolicyPage from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Corrections policy', description: 'How Sterling IMRES corrects errors, handles retractions and keeps the record transparent.', alternates: { canonical: '/corrections' } };

export default function CorrectionsPage() {
  return (
    <PolicyPage title="Corrections policy" lead="Errors are corrected visibly. Important changes are never made silently." updated="October 2026">
      <h2>Reporting an error</h2>
      <p>Use the <Link href="/contact?topic=scientific-review">contact form</Link> and choose “Scientific review”. Include the page, what is wrong and a source — a DOI, PubMed record, registry entry or publisher notice.</p>
      <h2>What we correct</h2>
      <ul>
        <li><strong>Metadata errors</strong> in a library record, such as an author name, date or identifier.</li>
        <li><strong>Status changes</strong>, such as a registered study that has completed or published results.</li>
        <li><strong>Retractions and expressions of concern</strong> affecting a listed work.</li>
        <li><strong>Errors in our own writing</strong>, including summaries and insights.</li>
      </ul>
      <h2>How corrections appear</h2>
      <p>Minor fixes, such as a typo, are made directly. Changes that affect meaning are shown with a dated correction note on the page. If a listed work is retracted, its record stays visible and is clearly marked as retracted, with a link to the notice.</p>
      <h2>Our own publications</h2>
      <p>For Sterling IMRES Press titles and institutional reports, corrections and new editions follow a documented update process, and errata are published with the work.</p>
      <h2>Who decides</h2>
      <p>The Evidence Review and Scientific Integrity Unit reviews each report, and the Editorial and Publications Division approves and publishes the correction. See <Link href="/about/governance">governance</Link>.</p>
    </PolicyPage>
  );
}
