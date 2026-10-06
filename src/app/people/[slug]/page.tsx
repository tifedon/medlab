import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { getContributorBySlug, libraryContributors } from '@/lib/people';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';
import PrintButton from './PrintButton';

export function generateStaticParams() {
  return libraryContributors.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const person = getContributorBySlug(slug);
  if (!person) return { title: 'Person not found' };
  return {
    title: person.name,
    description: `${person.name} — ${person.roles.join(', ').toLowerCase()} of ${person.works.length} work(s) in the Sterling IMRES reference library.`,
    alternates: { canonical: `/people/${slug}` },
  };
}

const kindLabels = { publication: 'Publications', book: 'Books', research: 'Registered studies' } as const;

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getContributorBySlug(slug);
  if (!person) notFound();

  const groups = (['publication', 'book', 'research'] as const)
    .map(kind => ({ kind, works: person.works.filter(w => w.kind === kind).sort((a, b) => (b.year ?? 0) - (a.year ?? 0)) }))
    .filter(g => g.works.length);

  return (
    <div>
      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'People', href: '/people' }, { label: person.name }]} />
        
        <h1 style={{ fontSize: '2.5rem', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)', color: 'var(--navy-900)' }}>
          {person.name}
        </h1>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-8)', color: 'var(--navy-800)' }}>
          {person.roles.join(', ') || 'Contributor'}
          {person.affiliations.length > 0 && `, ${person.affiliations[0]}`}
        </h2>

        <div className={ui.detailLayout} style={{ alignItems: 'flex-start' }}>
          <div className={ui.detailMain}>
            
            <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
              <div style={{ width: '240px', height: '240px', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)', fontSize: '0.875rem', border: '1px solid var(--gray-200)' }}>
                No photo available
              </div>
              
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ fontSize: '1.125rem', color: 'var(--navy-900)' }}>
                  {person.divisions && person.divisions.length > 0 ? `Member of ${person.divisions.join(' and ')}` : 'Contributor to the reference library'}
                </p>
              </div>
            </div>

            <section style={{ borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Education
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>Information not provided in source records.</p>
            </section>

            <section style={{ borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Biography
              </h3>
              <p style={{ color: 'var(--gray-600)' }}>
                This page lists works in the Sterling IMRES reference library that credit {person.name}. It is built from the source records, not from a profile supplied by this person.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)' }}>Library Works</h3>
              {groups.map(group => (
                <div key={group.kind} style={{ marginBottom: 'var(--space-6)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--gray-500)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {kindLabels[group.kind]}
                  </h4>
                  <ul className={ui.flatList}>
                    {group.works.map(work => (
                      <li key={work.href} className={ui.listItem}>
                        <div className={ui.listItemMain}>
                          <h3 className={ui.listItemTitle} style={{ fontSize: '1.05rem' }}>
                            <Link href={work.href}>{work.title}</Link>
                          </h3>
                          <p className={ui.listItemByline} style={{ margin: 0 }}>{work.role}</p>
                        </div>
                        <div className={ui.listItemRight}>
                          {work.year && <span>{work.year}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>

          <aside className={ui.aside}>
            <div style={{ background: 'var(--gray-50)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', border: '1px solid var(--gray-200)' }}>
              <h3 style={{ fontSize: '1.125rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                Contact Information
              </h3>
              
              {person.affiliations.length > 0 ? (
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>Affiliation:</span>
                  <span style={{ fontSize: '1rem', color: 'var(--teal-700)', fontWeight: 600 }}>{person.affiliations.join('; ')}</span>
                </div>
              ) : null}

              {person.orcid ? (
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>ORCID:</span>
                  <a href={`https://orcid.org/${person.orcid}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1rem', color: 'var(--teal-700)', fontWeight: 600, wordBreak: 'break-all' }}>
                    {person.orcid}
                  </a>
                </div>
              ) : null}

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)', display: 'block', marginBottom: '0.25rem' }}>Email:</span>
                <span style={{ fontSize: '1rem', color: 'var(--teal-700)', fontWeight: 600 }}>Not public</span>
              </div>
            </div>

            <div style={{ padding: '0 var(--space-2)' }}>
              <h3 style={{ fontSize: '1.125rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                Links
              </h3>
              <PrintButton />
            </div>
          </aside>
        </div>
      </div>
      <div style={{ height: '5rem' }} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: person.name,
          url: `${siteConfig.url}/people/${person.slug}`,
          ...(person.orcid ? { sameAs: [`https://orcid.org/${person.orcid}`] } : {}),
        }}
      />
    </div>
  );
}
