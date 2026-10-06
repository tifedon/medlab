import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { recordTitle } from '@/lib/data';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Research methodology',
  description: 'The methodological standards Sterling IMRES applies to study design, registration, analysis, reporting and data stewardship.',
  alternates: { canonical: '/research/methodology' },
};

const standards = [
  {
    title: 'Design the question before the study',
    text: 'Every study starts from a structured question and the design that best answers it. Observational analyses should state the target trial they emulate, so their assumptions are explicit.',
    refs: ['/publications/hernan-robins-target-trial-emulation-2016', '/books/designing-clinical-research-5th-edition', '/books/modern-epidemiology-4th-edition'],
  },
  {
    title: 'Plan sample size and analysis in advance',
    text: 'Sample size, primary outcomes and the analysis plan are fixed before data collection, including for prediction models, which need their own sample-size calculations.',
    refs: ['/publications/riley-sample-size-clinical-prediction-model-2020'],
  },
  {
    title: 'Register and report transparently',
    text: 'Trials are registered before enrolment and reported against the relevant guideline: SPIRIT and CONSORT for trials, PRISMA for systematic reviews.',
    refs: ['/publications/consort-2025-statement-reporting-randomised-trials', '/publications/prisma-2020-statement-reporting-systematic-reviews'],
  },
  {
    title: 'Interpret statistics with care',
    text: 'P-values are reported with estimates and confidence intervals and are never treated as a measure of effect size or of the probability that a hypothesis is true.',
    refs: ['/publications/asa-statement-on-p-values-2016'],
  },
  {
    title: 'Make work reproducible',
    text: 'Protocols, code and data are documented and shared where ethics and consent allow, following FAIR principles for data stewardship.',
    refs: ['/publications/manifesto-for-reproducible-science-2017', '/publications/fair-guiding-principles-data-stewardship-2016'],
  },
  {
    title: 'Assess bias and certainty',
    text: 'Evidence is appraised with established tools — RoB 2 for randomised trials, ROBINS-I for non-randomised studies — and its certainty is rated with GRADE.',
    refs: ['/publications/rob-2-risk-of-bias-tool-randomised-trials', '/publications/robins-i-risk-of-bias-non-randomised-studies', '/publications/grade-guidelines-1-evidence-profiles-summary-of-findings'],
  },
  {
    title: 'Use efficient trial designs',
    text: 'Platform and multi-arm multi-stage designs answer several questions in one infrastructure, and studies within a trial (SWATs) test ways of running trials better.',
    refs: ['/research/recovery-platform-trial', '/research/stampede-multi-arm-multi-stage-prostate-cancer', '/research/wheat-boost-video-consent-swat'],
  },
];

const recordFields = ['Title and status', 'Abstract and background', 'Objectives and research questions', 'Methodology and study design', 'Population and sample size', 'Team, principal investigator and collaborators', 'Division and research area', 'Dates', 'Funding and ethics information', 'Trial registration', 'Findings and resulting publications', 'Data availability and references'];

export default function MethodologyPage() {
  return (
    <div>
      <PageHero kicker="Research" title="Research methodology" lead="The standards the Research Division applies across every division, each grounded in a published source in our library." breadcrumbs={[{ label: 'Research', href: '/research' }, { label: 'Methodology' }]} />
      <Section>
        <div className={ui.grid2}>
          {standards.map((s, i) => (
            <article key={s.title} className={ui.card}>
              <span className={ui.kicker}>Standard {String(i + 1).padStart(2, '0')}</span>
              <h2 className={ui.cardTitle} style={{ marginTop: '0.5rem' }}>{s.title}</h2>
              <p className={ui.cardText}>{s.text}</p>
              <ul className={ui.linkList}>
                {s.refs.map(href => <li key={href}><Link href={href}>{recordTitle(href)}</Link></li>)}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <Section last>
        <SectionHeader kicker="Records" title="What a research record contains" lead="Every research detail page is designed to hold these fields. Fields stay hidden until verified." />
        <ol className={ui.tagRow}>{recordFields.map(f => <li key={f} className={ui.tag}>{f}</li>)}</ol>
      </Section>
    </div>
  );
}
