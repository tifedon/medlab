import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Notice from '@/components/Notice';
import { param } from '@/components/FilterBar';
import { divisions } from '@/lib/divisions';
import { inquiryTypes } from '@/lib/institute';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { MEDICAL_DISCLAIMER } from '@/lib/site';
import ContactForm from './ContactForm';
import styles from './page.module.css';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Sterling IMRES about research collaboration, education, editorial and publications, scientific review or medical illustration.',
  alternates: { canonical: '/contact' },
};

const routes = [
  ['General inquiry', 'Questions about the institute, the website or anything not covered below.'],
  ['Research collaboration', 'Propose a study, join a programme or ask about methodological support.'],
  ['Education', 'Courses, workshops, teaching partnerships and learning resources.'],
  ['Editorial and publications', 'Book proposals, authorship, peer review and Sterling IMRES Press.'],
  ['Scientific review', 'Evidence reviews, appraisal, corrections and integrity concerns about a record.'],
  ['Medical illustration', 'Figures, visual abstracts, atlases and image licensing.'],
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const topic = param(sp.topic);
  const defaultType = inquiryTypes.some(t => t.value === topic) ? topic : undefined;

  return (
    <div>
      <PageHero kicker="Contact" title="Contact Sterling IMRES" lead="Choose the type of enquiry so it reaches the right team. Include a DOI, ISBN, trial number or record title where it helps." breadcrumbs={[{ label: 'Contact' }]} />
      <Section>
        <Notice tone="caution">{MEDICAL_DISCLAIMER} Please do not send personal medical information through this form.</Notice>
      </Section>
      <Section last>
        <div className={styles.layout}>
          <ContactForm configured={isSupabaseConfigured()} defaultType={defaultType} divisions={divisions.map(d => ({ id: d.id, name: d.name }))} />
          <aside className={ui.list}>
            {routes.map(([title, text]) => (
              <div key={title} className={ui.panel}>
                <h3 style={{ marginBottom: '0.35rem', textTransform: 'none', letterSpacing: 0, fontSize: '1rem', color: 'var(--navy-900)' }}>{title}</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
            <p className={ui.sectionLead}>Looking for a way to work with us? See <Link href="/collaborate">collaboration pathways</Link>.</p>
          </aside>
        </div>
      </Section>
    </div>
  );
}
