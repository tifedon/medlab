import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Sterling IMRES.',
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        lead="Information about how we collect, use, and protect your data."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />
      <Section last>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, update your profile, use the interactive features of our services, or communicate with us.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users.</p>
          
          <h2>3. Information Sharing</h2>
          <p>We do not share your personal information with third parties except as described in this privacy policy.</p>
          
          <h2>4. Data Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.</p>
          
          <h2>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </Section>
    </div>
  );
}
