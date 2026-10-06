import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Notice from '@/components/Notice';
import ResourceCard from '@/components/ResourceCard';
import EmptyState from '@/components/EmptyState';
import FilterBar, { param } from '@/components/FilterBar';
import { learningResources } from '@/lib/education';
import { divisions } from '@/lib/divisions';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Learning resources',
  description: 'Free, reputable learning resources for research methods, evidence review, reporting, clinical training and anatomy.',
  alternates: { canonical: '/education/resources' },
};

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { division: param(sp.division), kind: param(sp.kind) };
  const kinds = [...new Set(learningResources.map(r => r.kind))];
  const filtered = learningResources.filter(r => (!current.division || r.divisions.includes(current.division)) && (!current.kind || r.kind === current.kind));
  return (
    <div>
      <PageHero kicker="Education" title="Learning resources" lead="Free resources from other organisations. Each link was checked to be live and freely accessible." breadcrumbs={[{ label: 'Education', href: '/education' }, { label: 'Resources' }]} stats={[{ value: learningResources.length, label: 'resources' }]} />
      <Section>
        <Notice>These resources are produced and maintained by the organisations named on each card. Sterling IMRES links to them but does not run them.</Notice>
      </Section>
      <Section last>
        <FilterBar
          basePath="/education/resources"
          current={current}
          groups={[
            { param: 'kind', label: 'Type', options: kinds.map(k => ({ value: k, label: k.charAt(0).toUpperCase() + k.slice(1) })) },
            { param: 'division', label: 'Division', options: divisions.filter(d => learningResources.some(r => r.divisions.includes(d.id))).map(d => ({ value: d.id, label: d.shortName })) },
          ]}
        />
        {filtered.length ? <div className={ui.grid3}>{filtered.map(r => <ResourceCard key={r.slug} resource={r} />)}</div> : <EmptyState title="No resources match">Clear a filter to see more.</EmptyState>}
      </Section>
    </div>
  );
}
