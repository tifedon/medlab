import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import PublicationCard from '@/components/PublicationCard';
import { getPublicationsByDivision } from '@/lib/publications';
import { contentStates } from '@/lib/institute';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Editorial standards',
  description: 'Authorship, peer review, conflicts of interest, record verification, corrections and retractions at Sterling IMRES.',
  alternates: { canonical: '/scientific-integrity/editorial-standards' },
};

const verification = [
  ['Articles', 'Title, authors, journal, volume, pages, date and licence are taken from Crossref using the DOI. PubMed and PMC identifiers come from NCBI.'],
  ['Books', 'Authors, editors, edition, publisher, year and ISBN-13 are checked against the publisher’s page or a library catalogue such as Open Library.'],
  ['Registered studies', 'Status, design, sponsor, investigators, dates and enrolment come from the ClinicalTrials.gov record, and the registry’s last-updated date is shown.'],
  ['Images', 'Creator, licence and source are taken from Wikimedia Commons metadata, and the image is credited on every page where it appears.'],
  ['Summaries', 'Summaries are written by Sterling IMRES editors in their own words. Original abstracts stay with the publisher.'],
  ['Identifiers', 'DOIs, PMIDs and ISBNs are shown only when a real identifier exists. None are invented.'],
];

const policies = [
  ['Authorship', 'Authors are people who made substantial contributions, drafted or revised the work, approved the final version and accept accountability, following ICMJE criteria. Other contributors are acknowledged.'],
  ['Peer review', 'Institutional publications are reviewed by people with relevant expertise who declare conflicts of interest and keep manuscripts confidential.'],
  ['Conflicts of interest', 'Authors, reviewers and editors disclose financial and non-financial interests relevant to the work.'],
  ['Corrections', 'Material errors are corrected openly with a dated notice rather than silently replaced.'],
  ['Retractions', 'Work found to be unreliable is retracted with a notice explaining why, and the record remains visible.'],
  ['Predatory publishing', 'Institute authors are advised against journals that fail recognised standards of transparency and peer review.'],
];

export default function EditorialStandardsPage() {
  const pubs = getPublicationsByDivision('editorial-publications').slice(0, 4);
  return (
    <div>
      <PageHero kicker="Scientific integrity" title="Editorial standards" lead="How records are verified, how authorship is credited and how the scientific record is corrected." breadcrumbs={[{ label: 'Scientific integrity', href: '/scientific-integrity' }, { label: 'Editorial standards' }]} />
      <Section id="verification">
        <SectionHeader kicker="Verification" title="How library records are verified" />
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead><tr><th scope="col">Record</th><th scope="col">How it is checked</th></tr></thead>
            <tbody>{verification.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>
      <Section>
        <SectionHeader kicker="Policies" title="Editorial policies" />
        <div className={ui.grid2}>
          {policies.map(([t, d]) => (
            <article key={t} className={ui.card}>
              <h3 className={ui.cardTitle}>{t}</h3>
              <p className={ui.cardText}>{d}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader kicker="Workflow" title="Content states" />
        <ol className={ui.tagRow}>{contentStates.map((s, i) => <li key={s} className={ui.tag}>{i + 1}. {s}</li>)}</ol>
        <p className={ui.sectionLead}>Read the full <Link href="/corrections">corrections policy</Link> and <Link href="/about#governance">governance roles</Link>.</p>
      </Section>
      <Section last>
        <SectionHeader kicker="Evidence" title="Research on peer review and publishing" />
        <div className={ui.grid2}>{pubs.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
      </Section>
    </div>
  );
}
