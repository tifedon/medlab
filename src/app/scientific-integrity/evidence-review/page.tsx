import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import PublicationCard from '@/components/PublicationCard';
import BookCard from '@/components/BookCard';
import { getPublicationBySlug, getPublicationsByCategory } from '@/lib/publications';
import { getBookBySlug } from '@/lib/books';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Evidence review',
  description: 'How Sterling IMRES conducts and appraises systematic reviews: protocols, risk of bias, certainty of evidence and transparent reporting.',
  alternates: { canonical: '/scientific-integrity/evidence-review' },
};

const steps = [
  ['Register a protocol', 'Define the question, eligibility criteria and planned methods before searching, and register the protocol.'],
  ['Search comprehensively', 'Search multiple databases and trial registries with a documented, reproducible strategy.'],
  ['Assess risk of bias', 'Use RoB 2 for randomised trials and ROBINS-I for non-randomised studies.'],
  ['Synthesise appropriately', 'Pool results only where studies are similar enough, and explore heterogeneity rather than hide it.'],
  ['Rate certainty', 'Rate the certainty of each key outcome with GRADE and present it in a summary of findings table.'],
  ['Report fully', 'Report against PRISMA 2020, including the flow of studies and every deviation from the protocol.'],
  ['Appraise others’ reviews', 'Appraise existing systematic reviews with AMSTAR 2 before relying on them.'],
];

const tools = ['prisma-2020-statement-reporting-systematic-reviews', 'rob-2-risk-of-bias-tool-randomised-trials', 'robins-i-risk-of-bias-non-randomised-studies', 'grade-guidelines-1-evidence-profiles-summary-of-findings', 'amstar-2-critical-appraisal-tool-systematic-reviews'];

export default function EvidenceReviewPage() {
  const toolPubs = tools.map(getPublicationBySlug).filter(p => p !== undefined);
  const handbooks = ['cochrane-handbook-systematic-reviews-interventions-2e', 'introduction-to-meta-analysis-2e'].map(getBookBySlug).filter(b => b !== undefined);
  const reviews = getPublicationsByCategory('evidence-reviews');
  return (
    <div>
      <PageHero kicker="Scientific integrity" title="Evidence review" lead="Systematic review and critical appraisal with explicit, reproducible methods." breadcrumbs={[{ label: 'Scientific integrity', href: '/scientific-integrity' }, { label: 'Evidence review' }]} />
      <Section>
        <SectionHeader kicker="Method" title="How a review is conducted" />
        <ol className={ui.numbered}>{steps.map(([t, d]) => <li key={t}><span><strong>{t}.</strong> {d}</span></li>)}</ol>
      </Section>
      <Section>
        <SectionHeader kicker="Tools" title="Appraisal and reporting tools" />
        <div className={ui.grid2}>{toolPubs.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
      </Section>
      <Section>
        <SectionHeader kicker="Handbooks" title="Reference handbooks" />
        <div className={ui.grid2}>{handbooks.map(b => <BookCard key={b.slug} book={b} />)}</div>
      </Section>
      <Section last>
        <SectionHeader kicker="Examples" title="Systematic reviews and meta-analyses in the library" link={{ href: '/publications?category=evidence-reviews', label: 'All evidence reviews' }} />
        <div className={ui.grid2}>{reviews.slice(0, 4).map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
        <p className={ui.sectionLead} style={{ marginTop: '1.5rem' }}>Need a review conducted or appraised? <Link href="/contact?topic=scientific-review">Contact the Evidence Review unit</Link>.</p>
      </Section>
    </div>
  );
}
