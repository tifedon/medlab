import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import PublicationCard from '@/components/PublicationCard';
import ResourceCard from '@/components/ResourceCard';
import { getPublicationBySlug } from '@/lib/publications';
import { learningResources } from '@/lib/education';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Research standards',
  description: 'Registration, reporting guidelines, reproducibility, data stewardship and responsible conduct standards for Sterling IMRES research.',
  alternates: { canonical: '/scientific-integrity/research-standards' },
};

const standards = [
  ['Registration', 'Clinical trials are registered in a public registry before the first participant is enrolled.'],
  ['Reporting guidelines', 'Studies are reported to the relevant EQUATOR guideline: CONSORT for trials, PRISMA for systematic reviews and equivalents for other designs.'],
  ['Reproducibility', 'Protocols, analysis code and materials are documented so that others can repeat the work.'],
  ['Data stewardship', 'Data are managed to FAIR principles and shared where ethics and consent allow.'],
  ['Statistical reporting', 'Effect sizes and uncertainty are reported, and p-values are not used as the sole basis for conclusions.'],
  ['Ethics and consent', 'Research with people has ethics approval and informed consent, and follows Good Clinical Practice.'],
  ['No overstatement', 'Methods, status and findings are described without overstating what the evidence can support.'],
];

export default function ResearchStandardsPage() {
  const refs = ['consort-2025-statement-reporting-randomised-trials', 'manifesto-for-reproducible-science-2017', 'fair-guiding-principles-data-stewardship-2016', 'asa-statement-on-p-values-2016'].map(getPublicationBySlug).filter(p => p !== undefined);
  const resources = learningResources.filter(r => ['equator-reporting-guidelines-library', 'spirit-consort-2025', 'tghn-ich-gcp-e6-r3'].includes(r.slug));
  return (
    <div>
      <PageHero kicker="Scientific integrity" title="Research standards" lead="The minimum standards for research conducted or reported under the Sterling IMRES name." breadcrumbs={[{ label: 'Scientific integrity', href: '/scientific-integrity' }, { label: 'Research standards' }]} />
      <Section>
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead><tr><th scope="col">Standard</th><th scope="col">Requirement</th></tr></thead>
            <tbody>{standards.map(([s, r]) => <tr key={s}><td>{s}</td><td>{r}</td></tr>)}</tbody>
          </table>
        </div>
        <p className={ui.sectionLead} style={{ marginTop: '1rem' }}>See also <Link href="/research#methodology">research methodology</Link>.</p>
      </Section>
      <Section>
        <SectionHeader kicker="Sources" title="Where the standards come from" />
        <div className={ui.grid2}>{refs.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
      </Section>
      <Section last>
        <SectionHeader kicker="Resources" title="Guideline libraries and training" />
        <div className={ui.grid3}>{resources.map(r => <ResourceCard key={r.slug} resource={r} />)}</div>
      </Section>
    </div>
  );
}
