import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import CTASection from '@/components/CTASection';
import DivisionIcon from '@/components/DivisionIcon';
import { collaborationTypes } from '@/lib/institute';
import { divisions } from '@/lib/divisions';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Collaborate',
  description: 'Research, academic, clinical, editorial, evidence review, illustration and education collaboration with Sterling IMRES.',
  alternates: { canonical: '/collaborate' },
};



export default function CollaboratePage() {
  return (
    <div>
      <PageHero
        kicker="Collaborate"
        title="Work with Sterling IMRES"
        lead="Open to researchers, clinicians, dentists, nurses, biomedical scientists, pharmacologists, editors, illustrators, educators and institutions."
        breadcrumbs={[{ label: 'Collaborate' }]}
        actions={<Link href="/contact?topic=research-collaboration" className="btn btn--primary">Propose a collaboration</Link>}
      />
      <Section>
        <SectionHeader kicker="Pathways" title="Ways to collaborate" />
        <div className={ui.grid3}>
          {collaborationTypes.map(c => (
            <article key={c.type} className={ui.card}>
              <h3 className={ui.cardTitle}>{c.type}</h3>
              <p className={ui.cardText}>{c.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader kicker="By division" title="Opportunities in each division" />
        <div className={ui.grid3}>
          {divisions.map(d => (
            <article key={d.id} className={ui.card}>
              <div className={ui.profileHead}>
                <DivisionIcon division={d} size={40} />
                <h3 className={ui.cardTitle}><Link href={`/divisions/${d.id}#collaborate`}>{d.name}</Link></h3>
              </div>
              <ul className={ui.cardText} style={{ paddingLeft: '1.1rem', listStyle: 'disc' }}>{d.collaboration.map(c => <li key={c}>{c}</li>)}</ul>
            </article>
          ))}
        </div>
      </Section>

      <Section last>
        <CTASection
          title="Not a partnership announcement"
          text="Sterling IMRES does not list partner institutions until a partnership is agreed and both parties have given permission. Collaborations will be shown on the relevant division and project pages once confirmed."
          actions={<Link href="/contact?topic=research-collaboration" className="btn btn--primary">Start a conversation</Link>}
        />
      </Section>
    </div>
  );
}
