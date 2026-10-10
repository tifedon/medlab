import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import DivisionTags from '@/components/DivisionTags';
import ArticleCard from '@/components/ArticleCard';
import JsonLd from '@/components/JsonLd';
import Notice from '@/components/Notice';
import { getInsightBySlug, insightCategoryLabels, insights, type InsightRef } from '@/lib/insights';
import { recordTitle } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { MEDICAL_DISCLAIMER, siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';

export function generateStaticParams() {
  return insights.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: 'Article not found' };
  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { title: insight.title, description: insight.excerpt, type: 'article', publishedTime: insight.publishedDate },
  };
}

const refPath = (ref: InsightRef) => `/${ref.kind === 'publication' ? 'publications' : ref.kind === 'book' ? 'books' : ref.kind === 'illustration' ? 'medical-illustration' : ref.kind === 'project' ? 'projects' : 'research'}/${ref.slug}`;

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();
  const more = insights.filter(i => i.slug !== insight.slug).slice(0, 3);

  return (
    <div>
      <header className={ui.hero}>
        <div className="container">
          <div className={ui.heroInner}>
            <Breadcrumbs items={[{ label: 'Insights', href: '/insights' }, { label: insight.title }]} />
            <span className={ui.kicker}>{insightCategoryLabels[insight.category]}</span>
            <h1 className={ui.heroTitle}>{insight.title}</h1>
            <p className={ui.heroLead}>{insight.excerpt}</p>
            <p className={ui.cardByline} style={{ marginTop: '1rem' }}>
              {insight.authorSlug ? <Link href={`/people/${insight.authorSlug}`}>{insight.author}</Link> : insight.author}
              {' · '}{formatDate(insight.publishedDate)} · {insight.readTime} min read
            </p>
          </div>
        </div>
      </header>
      <div className="container">
        <div className={ui.detailLayout}>
          <article className={`${ui.detailMain} ${ui.prose}`}>
            <div>
              {insight.body.map((block, i) =>
                block.startsWith('## ') ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}>{block}</p>,
              )}
            </div>
            {['clinical-medicine', 'dentistry-oral-sciences', 'nursing-allied-health', 'pharmacology-natural-products'].some(d => insight.divisions.includes(d)) && <Notice tone="caution">{MEDICAL_DISCLAIMER}</Notice>}
            <section>
              <h2>Sources in the library</h2>
              <ul className={ui.linkList}>
                {insight.references.map(ref => {
                  const href = refPath(ref);
                  return <li key={href}><Link href={href}>{recordTitle(href)}</Link></li>;
                })}
              </ul>
            </section>
          </article>
          <aside className={ui.aside}>
            <div className={ui.panel}>
              <h3>Divisions</h3>
              <DivisionTags ids={insight.divisions} />
            </div>
          </aside>
        </div>
        {more.length > 0 && (
          <section className={ui.section}>
            <h2 className={ui.sectionTitle} style={{ marginBottom: '1.5rem' }}>More insights</h2>
            <div className={ui.flatList}>{more.map(i => <ArticleCard key={i.slug} insight={i} />)}</div>
          </section>
        )}
      </div>
      <div style={{ height: '5rem' }} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: insight.title,
          description: insight.excerpt,
          datePublished: insight.publishedDate,
          author: insight.authorSlug
            ? { '@type': 'Person', name: insight.author, url: `${siteConfig.url}/people/${insight.authorSlug}` }
            : { '@type': 'Organization', name: siteConfig.fullName },
          url: `${siteConfig.url}/insights/${insight.slug}`,
        }}
      />
    </div>
  );
}
