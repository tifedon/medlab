import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/lib/site';
import { governanceRoles, leadershipRoles, mission, vision, values } from '@/lib/institute';
import ui from '@/components/ui.module.css';
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
        <div className={ui.editorialFeature}>
          <h2>What happens at Sterling IMRES</h2>
          <div className={ui.editorialCopy}>
            <p>Sterling IMRES is a comprehensive hub for medical research, education, and sciences. We bridge the gap between clinical practice and rigorous scientific inquiry, fostering an environment where discoveries are made and shared responsibly.</p>
            <p>Every day, our cross-disciplinary teams work across nine specialized divisions to run clinical trials, review evidence, and publish peer-reviewed studies. From parasitology and virology to medical illustration, our goal is to maintain high standards of scientific integrity while making knowledge accessible.</p>
            <p>Beyond research, we are committed to education. We provide training programs, workshops, and reference materials that help healthcare professionals lead with evidence-based practice.</p>
          </div>
        </div>

        <div className={ui.editorialColumns}>
          <section id="mission" className={ui.editorialBlock} style={{ scrollMarginTop: 'var(--header-height)' }}>
            <h2>Mission</h2>
            <p>{mission}</p>
          </section>
          <section className={ui.editorialBlock}>
            <h2>Vision</h2>
            <p>{vision}</p>
          </section>
        </div>

        <section id="values" style={{ scrollMarginTop: 'var(--header-height)' }}>
          <ol className={ui.valuesGrid}>
            {values.map((value, index) => (
              <li key={value.title}>
                <h3>{String(index + 1).padStart(2, '0')} · {value.title}</h3>
                <p>{value.practice}</p>
              </li>
            ))}
          </ol>
        </section>
      </Section>

      <Section id="leadership">
        <SectionHeader kicker="Leadership" title="Leadership responsibilities" lead="Named appointments are published only after the role and credentials have been verified." />
        <div className={ui.grid3}>
          {leadershipRoles.map(item => (
            <article key={item.role} className={ui.card}>
              <h3 className={ui.cardTitle}>{item.role}</h3>
              <p className={ui.cardText}>{item.remit}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="governance">
        <SectionHeader kicker="Governance" title="How work is reviewed" lead="Clear ownership and review roles keep scientific, editorial and visual decisions accountable." />
        <div className={ui.grid2}>
          {governanceRoles.map(item => (
            <article key={item.role} className={ui.card}>
              <h3 className={ui.cardTitle}>{item.role}</h3>
              <p className={ui.cardText}>{item.responsibility}</p>
            </article>
          ))}
        </div>
      </Section>

      <div id="team" style={{ scrollMarginTop: 'var(--header-height)' }}>
        <MeetTheTeam />
      </div>

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
