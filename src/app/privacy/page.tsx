import type { Metadata } from 'next';
import PolicyPage from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Privacy', description: 'How Sterling IMRES collects, uses, stores and protects personal information.', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy notice" lead="We collect only what we need to reply to you or to run your account, and we never ask for patient medical data." updated="October 2026">
      <h2>What we collect</h2>
      <ul>
        <li><strong>Enquiries:</strong> your name, email address, optional organisation and division, the subject and your message.</li>
        <li><strong>Accounts:</strong> your email address, display name, account role and upload permission, held by our authentication provider.</li>
        <li><strong>Technical data:</strong> session cookies needed to keep you signed in. We do not use advertising cookies.</li>
      </ul>
      <h2>What we do not collect</h2>
      <p>Do not send personal medical information through the contact form. The institute does not provide medical care and cannot give individual medical advice.</p>
      <h2>How we use it</h2>
      <p>Enquiries are used only to reply to you and route your request to the right team. Account data is used only to sign you in and control access to features.</p>
      <h2>Where it is stored and who can see it</h2>
      <p>Enquiries and accounts are stored with our database and authentication provider (Supabase). Enquiries can be read only by Sterling IMRES administrators.</p>
      <h2>How long we keep it</h2>
      <p>Enquiries are kept for no longer than 24 months after the conversation ends, unless they become part of an agreed collaboration. You can ask us to delete your enquiry or account at any time.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete the personal information we hold about you. Use the contact form and choose “General inquiry”.</p>
      <h2>Newsletters</h2>
      <p>We do not send newsletters. If we add them, they will be strictly opt-in with an unsubscribe link in every message.</p>
    </PolicyPage>
  );
}
