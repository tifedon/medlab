import type { Metadata } from 'next';
import PolicyPage from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Terms of use', description: 'Terms for using the Sterling IMRES website and its reference library.', alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return (
    <PolicyPage title="Terms of use" lead="The terms for using this website, its reference library and accounts." updated="October 2026">
      <h2>Purpose of the website</h2>
      <p>This website presents the work of Sterling IMRES and a curated reference library for education and research. It is not a patient portal, a telemedicine service or an accredited university portal.</p>
      <h2>Third-party works</h2>
      <p>Articles, books, studies and images in the reference library belong to their authors, publishers, sponsors and creators. We provide citations, summaries written by our editors and links to the original source. Read and reuse those works only on the terms set by their rights holders.</p>
      <h2>Images</h2>
      <p>Illustrations in the gallery are shown under the licence stated on each record. Reuse must follow that licence and credit the creator.</p>
      <h2>Accounts</h2>
      <p>Keep your sign-in details secure. Upload access is granted only to approved contributors, and administrators may withdraw access that is misused.</p>
      <h2>Accuracy</h2>
      <p>We verify records against authoritative sources, but registry statuses and publication details can change. Always check the original source before relying on a record. Report errors through the contact form.</p>
      <h2>Changes</h2>
      <p>These terms may be updated. The review date above shows the current version.</p>
    </PolicyPage>
  );
}
