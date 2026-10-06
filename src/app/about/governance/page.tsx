import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import { contentStates, governanceRoles, partnerDecisions, riskControls } from '@/lib/institute';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Governance',
  description: 'How Sterling IMRES separates creating, reviewing, approving and publishing content, and the risk controls that apply.',
  alternates: { canonical: '/about/governance' },
};

function Table({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className={ui.tableWrap}>
      <table className={ui.table}>
        <thead><tr><th scope="col">{head[0]}</th><th scope="col">{head[1]}</th></tr></thead>
        <tbody>{rows.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default function GovernancePage() {
  return (
    <div>
      <PageHero
        kicker="Governance"
        title="Who creates, reviews, approves and publishes"
        lead="Medical and scientific material can become outdated or misleading when ownership is unclear. Governance keeps each step accountable."
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Governance' }]}
      />
      <Section>
        <SectionHeader kicker="Editorial roles" title="Roles and responsibilities" />
        <Table head={['Role', 'Responsibility']} rows={governanceRoles.map(r => [r.role, r.responsibility])} />
      </Section>
      <Section>
        <SectionHeader kicker="Workflow" title="Content states" lead="Every record moves through explicit states, so readers and editors can see where it stands." />
        <ol className={ui.tagRow} aria-label="Content states in order">
          {contentStates.map((s, i) => <li key={s} className={ui.tag}>{i + 1}. {s}</li>)}
        </ol>
      </Section>
      <Section>
        <SectionHeader kicker="Risk controls" title="Clinical and scientific risk controls" />
        <Table head={['Control', 'Expected practice']} rows={riskControls.map(r => [r.control, r.practice])} />
      </Section>
      <Section last>
        <SectionHeader kicker="Open questions" title="Decisions for the partners" lead="These institutional decisions affect credibility, law, publishing and long-term operations, and are being resolved deliberately." />
        <Table head={['Decision', 'Question to resolve']} rows={partnerDecisions.map(d => [d.decision, d.question])} />
      </Section>
    </div>
  );
}
