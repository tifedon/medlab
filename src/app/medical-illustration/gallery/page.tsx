import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Notice from '@/components/Notice';
import IllustrationCard from '@/components/IllustrationCard';
import EmptyState from '@/components/EmptyState';
import FilterBar, { param } from '@/components/FilterBar';
import { illustrationCategoryLabels, illustrations } from '@/lib/illustrations';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Illustration gallery',
  description: 'Openly licensed anatomical, cellular, molecular, dental, physiological and procedural illustrations with creator and licence attribution.',
  alternates: { canonical: '/medical-illustration/gallery' },
};

export default async function GalleryPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { category: param(sp.category) };
  const categories = [...new Set(illustrations.map(i => i.category))];
  const filtered = illustrations.filter(i => !current.category || i.category === current.category);
  return (
    <div>
      <PageHero kicker="Medical illustration" title="Illustration gallery" lead="Each image is shown under its original licence, with its creator credited." breadcrumbs={[{ label: 'Medical illustration', href: '/medical-illustration' }, { label: 'Gallery' }]} stats={[{ value: illustrations.length, label: 'illustrations' }]} />
      <Section>
        <Notice>These illustrations were created by the people named on each record and are hosted on Wikimedia Commons. They are not Sterling IMRES work. Reuse must follow each image’s licence.</Notice>
      </Section>
      <Section last>
        <FilterBar basePath="/medical-illustration/gallery" current={current} groups={[{ param: 'category', label: 'Category', options: categories.map(c => ({ value: c, label: illustrationCategoryLabels[c] })) }]} />
        {filtered.length ? <div className={ui.grid4}>{filtered.map(i => <IllustrationCard key={i.slug} illustration={i} />)}</div> : <EmptyState title="No illustrations in this category">Choose another category.</EmptyState>}
      </Section>
    </div>
  );
}
