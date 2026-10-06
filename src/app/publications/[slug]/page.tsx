import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorList from '@/components/AuthorList';
import DivisionTags from '@/components/DivisionTags';
import LibraryNotice from '@/components/LibraryNotice';
import MetaList from '@/components/MetaList';
import PublicationCard from '@/components/PublicationCard';
import ResearchCard from '@/components/ResearchCard';
import JsonLd from '@/components/JsonLd';
import { ExternalLinkIcon } from '@/components/Icons';
import { formatCitation, getPublicationBySlug, publicationTypeLabels, publications } from '@/lib/publications';
import { getResearchForPublication } from '@/lib/research';
import { formatDate } from '@/lib/format';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';

export function generateStaticParams() {
  return publications.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPublicationBySlug(slug);
  if (!p) return { title: 'Publication not found' };
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/publications/${slug}` },
    openGraph: { title: p.title, description: p.summary, type: 'article', publishedTime: p.publishedDate, authors: p.authors.map(a => a.name) },
  };
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPublicationBySlug(slug);
  if (!p) notFound();

  const research = getResearchForPublication(p.slug);
  const related = publications
    .filter(o => o.slug !== p.slug)
    .map(o => ({ o, score: (o.divisions[0] === p.divisions[0] ? 2 : 0) + o.keywords.filter(k => p.keywords.includes(k)).length }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(x => x.o);

  return (
    <div>
      <header className={ui.hero}>
        <div className="container">
          <div className={ui.heroInner}>
            <Breadcrumbs items={[{ label: 'Publications', href: '/publications' }, { label: p.title }]} />
            <div className={ui.cardTop}>
              <span className={ui.label}>{publicationTypeLabels[p.type]}</span>
              {p.openAccess && <span className="access-badge access-badge--open">Open access</span>}
            </div>
            <h1 className={ui.heroTitle} style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}>{p.title}</h1>
            <p className={ui.heroLead}><em>{p.journal}</em> · {formatDate(p.publishedDate)}</p>
            <div className={ui.heroActions}>
              <a href={p.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer">Read at the publisher <ExternalLinkIcon size={14} /></a>
              {p.pmcid && <a href={`https://pmc.ncbi.nlm.nih.gov/articles/${p.pmcid}/`} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">Full text on PMC</a>}
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className={ui.detailLayout}>
          <div className={`${ui.detailMain} ${ui.prose}`}>
            <LibraryNotice source={p.verifiedVia} />
            <section>
              <h2>Summary</h2>
              <p>{p.summary}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Summary written by Sterling IMRES editors. Read the original abstract at the publisher.</p>
            </section>
            <section>
              <h2>Authors</h2>
              {p.authors.length > 0 && <AuthorList people={p.authors} />}
              {(p.authorsTruncated || p.corporateAuthor) && (
                <p style={{ marginTop: '1rem' }}>
                  {p.corporateAuthor && <>Group author: <strong>{p.corporateAuthor}</strong>. </>}
                  {p.authorsTruncated && 'The full author list is available from the publisher.'}
                </p>
              )}
            </section>
            <section>
              <h2>Cite this work</h2>
              <p className={ui.citation}>{formatCitation(p)}</p>
            </section>
            {research.length > 0 && (
              <section>
                <h2>Related research</h2>
                <div className={ui.list}>{research.map(r => <ResearchCard key={r.slug} study={r} />)}</div>
              </section>
            )}
            {related.length > 0 && (
              <section>
                <h2>Related publications</h2>
                <div className={ui.list}>{related.map(r => <PublicationCard key={r.slug} publication={r} />)}</div>
              </section>
            )}
          </div>
          <aside className={ui.aside}>
            <div className={ui.panel}>
              <h3>Publication details</h3>
              <MetaList
                items={[
                  ['Journal', <em key="j">{p.journal}</em>],
                  ['Publisher', p.publisher],
                  ['Published', formatDate(p.publishedDate)],
                  ['Volume / issue', [p.volume, p.issue && `(${p.issue})`].filter(Boolean).join(' ') || undefined],
                  ['Pages', p.pages],
                  ['DOI', p.doi && <a key="doi" href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">{p.doi}</a>],
                  ['PubMed', p.pmid && <a key="pm" href={`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`} target="_blank" rel="noopener noreferrer">{p.pmid}</a>],
                  ['PMC', p.pmcid],
                  ['Licence', p.license],
                  ['Metadata source', p.verifiedVia],
                ]}
              />
            </div>
            <div className={ui.panel}>
              <h3>Keywords</h3>
              <ul className={ui.tagRow}>{p.keywords.map(k => <li key={k}><Link className={ui.tag} href={`/search?q=${encodeURIComponent(k)}`}>{k}</Link></li>)}</ul>
              <h3>Divisions</h3>
              <DivisionTags ids={p.divisions} />
            </div>
          </aside>
        </div>
      </div>
      <div style={{ height: '5rem' }} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ScholarlyArticle',
          headline: p.title,
          datePublished: p.publishedDate,
          author: p.authors.map(a => ({ '@type': 'Person', name: a.name })),
          isPartOf: { '@type': 'Periodical', name: p.journal },
          publisher: { '@type': 'Organization', name: p.publisher },
          ...(p.doi ? { sameAs: `https://doi.org/${p.doi}` } : {}),
          url: `${siteConfig.url}/publications/${p.slug}`,
        }}
      />
    </div>
  );
}
