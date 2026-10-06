import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import { libraryContributors } from '@/lib/people';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';
import ProfileCard from '@/components/ProfileCard';

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
        </div>
      </Section>

      <Section>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--teal-700)' }}>
            Meet the team
          </h2>
          <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-900)', maxWidth: '800px' }}>
            Our work is made possible by an incredible team of researchers, educators, clinicians, and academic leaders. Here are the people behind Sterling IMRES.
          </p>
        </div>
        
        <div className={ui.grid4}>
          {libraryContributors.slice(0, 8).map(person => (
            <ProfileCard key={person.slug} person={person} />
          ))}
        </div>
      </Section>

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
