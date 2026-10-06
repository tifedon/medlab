import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import { values } from '@/lib/institute';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Values',
  description: 'The seven principles of Sterling IMRES and how each should appear in practice.',
  alternates: { canonical: '/about/values' },
};

export default function ValuesPage() {
  return (
    <div>
      <PageHero kicker="Values" title="Principles, and how they look in practice" lead="Each value is written as a practice that readers can check against the institute’s work." breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Values' }]} />
      <Section last>
        <div className={ui.grid3}>
          {values.map((v, i) => (
            <article key={v.title} className={ui.card}>
              <span className={ui.kicker}>{String(i + 1).padStart(2, '0')}</span>
              <h2 className={ui.cardTitle} style={{ marginTop: '0.5rem' }}>{v.title}</h2>
              <p className={ui.cardText}>{v.practice}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
