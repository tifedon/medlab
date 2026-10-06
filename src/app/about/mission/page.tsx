import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import { mission, vision } from '@/lib/institute';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mission and vision',
  description: mission,
  alternates: { canonical: '/about/mission' },
};

export default function MissionPage() {
  return (
    <div>
      <PageHero 
        kicker="Mission and vision" 
        title="Why Sterling IMRES exists" 
        lead={siteConfig.positioning} 
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Mission and vision' }]} 
      />
      
      <Section last>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--teal-700)' }}>
              Mission
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-900)' }}>
              {mission}
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--teal-700)' }}>
              Vision
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-900)' }}>
              {vision}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
