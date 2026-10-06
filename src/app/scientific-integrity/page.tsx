import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import PublicationCard from '@/components/PublicationCard';
import CTASection from '@/components/CTASection';
import { getPublicationsByDivision } from '@/lib/publications';
import { riskControls } from '@/lib/institute';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Scientific integrity',
  description: 'Evidence review, critical appraisal, reporting standards, reproducibility, conflicts of interest, corrections and editorial standards at Sterling IMRES.',
  alternates: { canonical: '/scientific-integrity' },
};

const areas = [
  { href: '/scientific-integrity/evidence-review', title: 'Evidence review', text: 'Systematic review, critical appraisal and certainty-of-evidence methods.' },
  { href: '/scientific-integrity/research-standards', title: 'Research standards', text: 'Registration, reporting guidelines, reproducibility and responsible research conduct.' },
  { href: '/scientific-integrity/editorial-standards', title: 'Editorial standards', text: 'Authorship, peer review, conflicts of interest, verification, corrections and retractions.' },
];

const principles = [
  ['Trace every claim', 'Records keep identifiers, publication details and links to the source, so readers can check the underlying work themselves.'],
  ['Separate identity from quality', 'A genuine publication can still carry weak evidence. Verifying metadata is never an endorsement of quality.'],
  ['Show uncertainty', 'Study design, status, access and limitations are described without overstating what the evidence supports.'],
  ['Correct the record', 'Corrections, retractions and expressions of concern are shown openly, and the audit trail is kept.'],
];

export default function IntegrityPage() {
  const unitWork = getPublicationsByDivision('evidence-review-integrity').slice(0, 4);
  return (
    <div>
      <PageHero kicker="Scientific integrity" title="Trust is built record by record" lead="Credibility depends as much on governance as on design. These standards make the provenance, status and limits of every record visible." breadcrumbs={[{ label: 'Scientific integrity' }]} />
      <Section>
        <div className={ui.grid3}>
          {areas.map(a => (
            <article key={a.href} className={ui.card}>
              <h2 className={ui.cardTitle}><Link href={a.href}>{a.title}</Link></h2>
              <p className={ui.cardText}>{a.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader kicker="Principles" title="What every record should make clear" />
        <div className={ui.grid2}>
          {principles.map(([title, text], i) => (
            <article key={title} className={ui.card}>
              <span className={ui.kicker}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={ui.cardTitle} style={{ marginTop: '0.5rem' }}>{title}</h3>
              <p className={ui.cardText}>{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader kicker="Controls" title="Clinical and scientific risk controls" />
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead><tr><th scope="col">Control</th><th scope="col">Expected practice</th></tr></thead>
            <tbody>{riskControls.map(r => <tr key={r.control}><td>{r.control}</td><td>{r.practice}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>
      <Section>
        <SectionHeader kicker="Standards we use" title="Key methods literature" link={{ href: '/divisions/evidence-review-integrity', label: 'The Evidence Review unit' }} />
        <div className={ui.grid2}>{unitWork.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
      </Section>
      <Section last>
        <CTASection
          title="Report an issue with a record"
          text="If you find a metadata error, an undisclosed conflict, a duplicate, a correction or a retraction that affects a record, tell the integrity team and include the source."
          actions={<><Link href="/contact?topic=scientific-review" className="btn btn--primary">Report an issue</Link><Link href="/corrections" className="btn btn--dark">Corrections policy</Link></>}
        />
      </Section>
    </div>
  );
}
