import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import IllustrationCard from '@/components/IllustrationCard';
import PublicationCard from '@/components/PublicationCard';
import CTASection from '@/components/CTASection';
import { illustrations } from '@/lib/illustrations';
import { getPublicationsByDivision } from '@/lib/publications';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Medical illustration',
  description: 'Anatomical illustration, scientific diagrams, research figures, visual abstracts and biomedical visualisation at Sterling IMRES.',
  alternates: { canonical: '/medical-illustration' },
};

const services = ['Anatomical illustration', 'Scientific diagrams', 'Research figures', 'Visual abstracts', 'Biomedical visualisation', 'Infographics', 'Publication illustration'];

export default function MedicalIllustrationPage() {
  const research = getPublicationsByDivision('medical-illustration-visualization').filter(p => p.divisions[0] === 'medical-illustration-visualization').slice(0, 4);
  return (
    <div>
      <PageHero
        kicker="Medical illustration"
        title="Visual communication as a scientific capability"
        lead="Medical illustration is an institutional capability, not decoration. Figures are reviewed for accuracy, and every image is correctly licensed and credited."
        breadcrumbs={[{ label: 'Medical illustration' }]}
        actions={<><Link href="/medical-illustration/gallery" className="btn btn--primary">Open the gallery</Link><Link href="/medical-illustration/projects" className="btn btn--secondary">Projects</Link></>}
      />
      <Section>
        <SectionHeader kicker="Capabilities" title="What the unit works on" />
        <ul className={ui.tagRow}>{services.map(s => <li key={s} className={ui.tag}>{s}</li>)}</ul>
      </Section>
      <Section>
        <SectionHeader kicker="Gallery" title="Openly licensed illustrations" lead="Selected from Wikimedia Commons with full creator and licence details." link={{ href: '/medical-illustration/gallery', label: 'Full gallery' }} />
        <div className={ui.grid4}>{illustrations.slice(0, 4).map(i => <IllustrationCard key={i.slug} illustration={i} />)}</div>
      </Section>
      <Section>
        <SectionHeader kicker="Evidence" title="Research on visual communication" link={{ href: '/divisions/medical-illustration-visualization', label: 'The Illustration unit' }} />
        <div className={ui.grid2}>{research.map(p => <PublicationCard key={p.slug} publication={p} />)}</div>
      </Section>
      <Section last>
        <CTASection
          title="Commission or collaborate on illustration"
          text="Publication figures, visual abstracts, illustrated atlases and educational diagram series."
          actions={<Link href="/contact?topic=medical-illustration" className="btn btn--primary">Contact the illustration unit</Link>}
        />
      </Section>
    </div>
  );
}
