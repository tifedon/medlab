import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import { libraryContributors } from '@/lib/people';
import { siteConfig } from '@/lib/site';
import { mission, vision, values } from '@/lib/institute';
import ui from '@/components/ui.module.css';
import ProfileCard from '@/components/ProfileCard';
import MeetTheTeam from '@/components/MeetTheTeam';

export const metadata: Metadata = {
  title: 'About Sterling IMRES',
  description: `About ${siteConfig.fullName}: what we do and the people behind our research.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        kicker="About"
        title={`About ${siteConfig.name}`}
        lead="Connecting research, education, and publishing in one institution."
        breadcrumbs={[{ label: 'About' }]}
      />

      <Section>
        <div style={{ maxWidth: '800px', marginBottom: 'var(--space-12)' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--teal-700)' }}>
              What happens at Sterling IMRES
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-900)', marginBottom: '1.5rem' }}>
              Sterling IMRES is a comprehensive hub for medical research, education, and sciences. We bridge the gap between clinical practice and rigorous scientific inquiry, fostering an environment where groundbreaking discoveries are made and shared with the world.
            </p>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-900)', marginBottom: '1.5rem' }}>
              Every day, our cross-disciplinary teams work across nine specialized divisions to run clinical trials, review evidence, and publish peer-reviewed studies. From parasitology and virology to cutting-edge medical illustration, our goal is to maintain the highest standards of scientific integrity while making knowledge accessible.
            </p>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-900)' }}>
              Beyond research, we are deeply committed to education. We provide robust training programs, workshops, and reference materials that empower the next generation of healthcare professionals to lead with evidence-based practice.
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--teal-700)' }}>
              Mission
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-900)' }}>
              {mission}
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--teal-700)' }}>
              Vision
            </h2>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-900)' }}>
              {vision}
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--teal-700)' }}>
              Values
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {values.map((v, i) => (
                <li key={v.title} style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
                    {i + 1}. {v.title}
                  </h3>
                  <p style={{ fontSize: '1.125rem', lineHeight: 1.5, color: 'var(--navy-700)', margin: 0 }}>
                    {v.practice}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <MeetTheTeam />

      <Section last>
        <CTASection
          title="Work with Sterling IMRES"
          text="Propose research, contribute to a book, review evidence or develop teaching with one of the nine divisions."
          actions={
            <>
              <Link href="/collaborate" className="btn btn--primary">Collaborate</Link>
              <Link href="/contact" className="btn btn--dark">Contact</Link>
            </>
          }
        />
      </Section>
    </div>
  );
}
