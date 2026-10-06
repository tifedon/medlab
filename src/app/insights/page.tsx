import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ArticleCard from '@/components/ArticleCard';
import EmptyState from '@/components/EmptyState';
import FilterBar, { param } from '@/components/FilterBar';
import { insightCategoryLabels, insights } from '@/lib/insights';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Research updates, evidence reviews, medical education, scientific integrity, publishing, institute news and research methods from Sterling IMRES.',
  alternates: { canonical: '/insights' },
};

export default async function InsightsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { category: param(sp.category) };
  const categories = [...new Set(insights.map(i => i.category))];
  const filtered = insights.filter(i => !current.category || i.category === current.category);
  return (
    <div>
      <PageHero kicker="Insights" title="Insights" lead="Editorial articles from Sterling IMRES. Each one discusses works in the reference library and links to them, so every claim can be checked." breadcrumbs={[{ label: 'Insights' }]} />
      <Section last>
        <FilterBar basePath="/insights" current={current} groups={[{ param: 'category', label: 'Category', options: categories.map(c => ({ value: c, label: insightCategoryLabels[c] })) }]} />
        {filtered.length ? <div className={ui.grid3}>{filtered.map(i => <ArticleCard key={i.slug} insight={i} />)}</div> : <EmptyState title="No insights in this category">Choose another category.</EmptyState>}
      </Section>
    </div>
  );
}
