import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ResearchListing from '@/components/ResearchListing';
import { param } from '@/components/FilterBar';
import { researchRecords, researchStatusModel, researchThemes } from '@/lib/research';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Research',
  description: 'The research lifecycle at Sterling IMRES: upcoming, recruiting, in-progress, completed and published studies across the nine divisions.',
  alternates: { canonical: '/research' },
};

export default async function ResearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { stage: param(sp.stage), status: param(sp.status), division: param(sp.division), type: param(sp.type) };

  return (
    <div>
      <PageHero
        kicker="Research"
        title="Research hub"
        lead="Not only published results: the full lifecycle, so visitors can see what is upcoming, underway, completed and published."
        breadcrumbs={[{ label: 'Research' }]}
      />
      <Section id="themes">
        <SectionHeader kicker="Themes" title="Research themes" lead="The questions and methods that connect studies across the institute." />
        <div className={ui.grid3}>
          {researchThemes.map(theme => (
            <article key={theme.id} className={ui.card}>
              <h2 className={ui.cardTitle}>{theme.title}</h2>
              <p className={ui.cardText}>{theme.description}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section id="methodology">
        <SectionHeader kicker="Methodology" title="A visible research lifecycle" lead="Every record uses a consistent status so planned, active and completed work is not mixed together." />
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead><tr><th scope="col">Status</th><th scope="col">Meaning</th></tr></thead>
            <tbody>
              {researchStatusModel.map(item => <tr key={item.status}><td>{item.label}</td><td>{item.meaning}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Section>
      <Section last>
        <SectionHeader kicker="Catalogue" title="Research records" lead="Filter by lifecycle stage, status, division or study type." />
        <ResearchListing records={researchRecords} basePath="/research" current={current} />
      </Section>
    </div>
  );
}
