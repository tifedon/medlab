import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import DivisionTags from '@/components/DivisionTags';
import { researchRecords, researchThemes } from '@/lib/research';
import { publications } from '@/lib/publications';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Research themes',
  description: 'Cross-divisional research themes at Sterling IMRES and the studies and publications that sit under each.',
  alternates: { canonical: '/research/themes' },
};

export default function ThemesPage() {
  return (
    <div>
      <PageHero kicker="Research" title="Research themes" lead="Themes cut across divisions, so a question can draw on clinical, biomedical, pharmacological and methodological expertise at once." breadcrumbs={[{ label: 'Research', href: '/research' }, { label: 'Themes' }]} />
      <Section last>
        <div className={ui.grid2}>
          {researchThemes.map(theme => {
            const studies = researchRecords.filter(r => r.divisions.some(d => theme.divisions.includes(d)));
            const pubs = publications.filter(p => theme.divisions.includes(p.divisions[0]));
            return (
              <article key={theme.id} className={ui.card} id={theme.id}>
                <h2 className={ui.cardTitle}>{theme.title}</h2>
                <p className={ui.cardText}>{theme.description}</p>
                <DivisionTags ids={theme.divisions} />
                <ul className={ui.linkList} style={{ marginBottom: '1rem' }}>
                  {studies.slice(0, 3).map(s => <li key={s.slug}><Link href={`/research/${s.slug}`}>{s.title}</Link></li>)}
                </ul>
                <div className={ui.cardMeta}>
                  <span>{studies.length} studies</span>
                  <span>{pubs.length} publications</span>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
