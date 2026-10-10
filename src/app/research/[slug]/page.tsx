import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import DivisionTags from '@/components/DivisionTags';
import MetaList from '@/components/MetaList';
import Notice from '@/components/Notice';
import StatusBadge from '@/components/StatusBadge';
import PublicationCard from '@/components/PublicationCard';
import ResearchCard from '@/components/ResearchCard';
import JsonLd from '@/components/JsonLd';
import { ExternalLinkIcon } from '@/components/Icons';
import { formatPhase, getPublicationBySlug, getResearchBySlug, registryStatusLabels, researchRecords, researchStatusLabel } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';

export function generateStaticParams() {
  return researchRecords.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getResearchBySlug(slug);
  if (!study) return { title: 'Study not found' };
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/research/${slug}` },
    openGraph: { title: study.title, description: study.summary, type: 'article' },
  };
}

const roleLabel = (role?: string) => (role ? role.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()) : 'Investigator');

export default async function ResearchRecordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getResearchBySlug(slug);
  if (!study) notFound();

  const libraryPubs = study.libraryPublications.map(getPublicationBySlug).filter(p => p !== undefined);
  const related = researchRecords.filter(r => r.slug !== study.slug && r.divisions[0] === study.divisions[0]).slice(0, 3);

  return (
    <div>
      <header className={ui.hero}>
        <div className="container">
          <div className={ui.heroInner}>
            <Breadcrumbs items={[{ label: 'Research', href: '/research' }, { label: study.title }]} />
            <div className={ui.cardTop}>
              <StatusBadge status={study.status} label={researchStatusLabel(study.status)} />
              <span className={ui.label}>{study.studyType === 'INTERVENTIONAL' ? 'Interventional' : 'Observational'}</span>
              {formatPhase(study.phase) && <span className={ui.label}>{formatPhase(study.phase)}</span>}
            </div>
            <h1 className={ui.heroTitle}>{study.title}</h1>
            {study.officialTitle && study.officialTitle !== study.title && <p className={ui.heroLead}>{study.officialTitle}</p>}
          </div>
        </div>
      </header>

      <div className="container">
        <div className={ui.detailLayout}>
          <div className={`${ui.detailMain} ${ui.prose}`}>
            <Notice>
              This is a registered study tracked in the Sterling IMRES research watch. It is sponsored by {study.sponsor} and run by the investigators named in the registry, not by Sterling IMRES. Details come from ClinicalTrials.gov{study.lastUpdated ? `, last updated ${formatDate(study.lastUpdated)}` : ''}.
            </Notice>
            <section>
              <h2>Summary</h2>
              <p>{study.summary}</p>
            </section>
            {study.objectives?.length ? (
              <section>
                <h2>Objectives</h2>
                <ul>{study.objectives.map(o => <li key={o}>{o}</li>)}</ul>
              </section>
            ) : null}
            <section>
              <h2>Methodology</h2>
              <div className={ui.panel}>
                <MetaList
                  items={[
                    ['Study design', study.design],
                    ['Conditions', study.conditions.join('; ')],
                    ['Interventions', study.interventions?.join('; ')],
                    ['Primary outcome', study.primaryOutcome],
                    ['Sample size', study.enrollment && `${study.enrollment.toLocaleString('en-GB')} participants (${study.enrollmentType === 'ACTUAL' ? 'actual' : 'estimated'})`],
                    ['Locations', study.countries?.join(', ')],
                  ]}
                />
              </div>
            </section>
            {study.investigators?.length ? (
              <section>
                <h2>Registered investigators</h2>
                <ul className={ui.authorList} style={{ listStyle: 'none', padding: 0 }}>
                  {study.investigators.map(inv => (
                    <li key={inv.name} className={ui.authorItem} style={{ marginTop: 0 }}>
                      <span>{inv.name}</span>
                      <span>{roleLabel(inv.role)}</span>
                      {inv.affiliation && <span>{inv.affiliation}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {(libraryPubs.length > 0 || study.resultsPublications?.length) && (
              <section>
                <h2>Findings and resulting publications</h2>
                {libraryPubs.length > 0 && <div className={ui.list}>{libraryPubs.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>}
                {study.resultsPublications?.length ? (
                  <ul style={{ marginTop: '1.25rem' }}>
                    {study.resultsPublications.map(r => (
                      <li key={r.citation}>
                        {r.citation}{' '}
                        {r.pmid && <a href={`https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`} target="_blank" rel="noopener noreferrer">PubMed {r.pmid}</a>}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            )}
            {related.length > 0 && (
              <section>
                <h2>Related research</h2>
                <div className={ui.flatList}>{related.map(r => <ResearchCard key={r.slug} study={r} />)}</div>
              </section>
            )}
          </div>
          <aside className={ui.aside}>
            <div className={ui.panel}>
              <h3>Record</h3>
              <MetaList
                items={[
                  ['Lifecycle status', researchStatusLabel(study.status)],
                  ['Registry status', registryStatusLabels[study.registryStatus]],
                  ['Trial registration', <a key="nct" href={study.url} target="_blank" rel="noopener noreferrer">{study.nctId} <ExternalLinkIcon size={12} /></a>],
                  ['Lead sponsor', study.sponsor],
                  ['Collaborators', study.collaborators?.join('; ')],
                  ['Start', formatDate(study.startDate)],
                  ['Primary completion', formatDate(study.primaryCompletionDate)],
                  ['Study completion', formatDate(study.completionDate)],
                  ['Results posted on registry', study.hasResults ? 'Yes' : 'No'],
                  ['Registry last updated', formatDate(study.lastUpdated)],
                ]}
              />
            </div>
            <div className={ui.panel}>
              <h3>Divisions</h3>
              <DivisionTags ids={study.divisions} />
            </div>
          </aside>
        </div>
      </div>
      <div style={{ height: '5rem' }} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'MedicalStudy',
          name: study.title,
          description: study.summary,
          url: `${siteConfig.url}/research/${study.slug}`,
          identifier: study.nctId,
          sponsor: { '@type': 'Organization', name: study.sponsor },
          healthCondition: study.conditions,
          sameAs: study.url,
        }}
      />
    </div>
  );
}
