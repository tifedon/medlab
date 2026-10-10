import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Sterling IMRES.',
};

export default function TermsPage() {
  return (
    <div>
      <PageHero
        kicker="Legal"
        title="Terms of Service"
        lead="Rules and guidelines for using Sterling IMRES services."
        breadcrumbs={[{ label: 'Terms of Service' }]}
      />
      <Section last>
        <div className={ui.legalGrid}>
          <section><h2>1. Acceptance of Terms</h2><p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p></section>
          <section><h2>2. User Accounts</h2><p>You must provide accurate and complete information when creating an account. You are responsible for safeguarding the password that you use to access the service.</p></section>
          <section><h2>3. Intellectual Property</h2><p>The Service and its original content, features, and functionality are and will remain the exclusive property of Sterling IMRES and its licensors.</p></section>
          <section><h2>4. Termination</h2><p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p></section>
          <section><h2>5. Changes</h2><p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p></section>
        </div>
      </Section>
    </div>
  );
}
