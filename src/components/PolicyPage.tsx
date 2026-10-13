import type { ReactNode } from 'react';
import PageHero from './PageHero';
import Section from './Section';
import ui from './ui.module.css';

/** Shared layout for the institute's policy pages. */
export default function PolicyPage({ title, lead, updated, children }: { title: string; lead: string; updated: string; children: ReactNode }) {
  return (
    <div>
      <PageHero kicker="Policy" title={title} lead={lead} breadcrumbs={[{ label: title }]} />
      <Section last>
        <div style={{ maxWidth: 760 }}>
          <div className={ui.prose} style={{ marginTop: '2rem' }}>{children}</div>
        </div>
      </Section>
    </div>
  );
}
