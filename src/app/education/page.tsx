import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Notice from '@/components/Notice';
import ProgrammeCard from '@/components/ProgrammeCard';
import ResourceCard from '@/components/ResourceCard';
import CTASection from '@/components/CTASection';
import { learningResources, programmes } from '@/lib/education';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Planned courses and workshops in research methods, evidence-based practice, scientific writing and medical illustration, plus free learning resources.',
  alternates: { canonical: '/education' },
};

export default function EducationPage() {
  const courses = programmes.filter(p => p.format === 'course');
  const workshops = programmes.filter(p => p.format === 'workshop');
  return (
    <div>
      <PageHero
        kicker="Education"
        title="Learn from the evidence"
        lead="Courses, workshops and resources covering research methodology, evidence-based medicine, scientific writing, biomedical sciences, dentistry, nursing, pharmacology and medical illustration."
        breadcrumbs={[{ label: 'Education' }]}
        stats={[
          { value: courses.length, label: 'planned courses' },
          { value: workshops.length, label: 'planned workshops' },
          { value: learningResources.length, label: 'free learning resources' },
        ]}
        actions={
          <>
            <Link href="/education/courses" className="btn btn--primary">Courses</Link>
            <Link href="/education/workshops" className="btn btn--secondary">Workshops</Link>
            <Link href="/education/resources" className="btn btn--secondary">Resources</Link>
          </>
        }
      />
      <Section>
        <Notice tone="caution">Courses and workshops are in development and not yet enrolling. Sterling IMRES does not award accredited degrees, certificates or CPD credits.</Notice>
      </Section>
      <Section>
        <SectionHeader kicker="Courses" title="Planned courses" link={{ href: '/education/courses', label: 'All courses' }} />
        <div className={ui.grid3}>{courses.slice(0, 3).map(p => <ProgrammeCard key={p.slug} programme={p} />)}</div>
      </Section>
      <Section>
        <SectionHeader kicker="Workshops" title="Planned workshops" link={{ href: '/education/workshops', label: 'All workshops' }} />
        <div className={ui.grid3}>{workshops.map(p => <ProgrammeCard key={p.slug} programme={p} />)}</div>
      </Section>
      <Section>
        <SectionHeader kicker="Resources" title="Free learning resources" lead="Reputable, freely available resources from other organisations that support our teaching." link={{ href: '/education/resources', label: 'All resources' }} />
        <div className={ui.grid3}>{learningResources.slice(0, 6).map(r => <ResourceCard key={r.slug} resource={r} />)}</div>
      </Section>
      <Section>
        <SectionHeader kicker="More learning" title="Visual and editorial" />
        <div className={ui.grid2} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <article className={ui.card}>
            <h2 className={ui.cardTitle}><Link href="/medical-illustration">Medical illustration</Link></h2>
            <p className={ui.cardText}>Explore our gallery of professional medical illustrations.</p>
          </article>
          <article className={ui.card}>
            <h2 className={ui.cardTitle}><Link href="/insights">Insights</Link></h2>
            <p className={ui.cardText}>Read articles, updates, and perspectives from our team.</p>
          </article>
        </div>
      </Section>
      <Section last>
        <CTASection
          title="Teach with Sterling IMRES"
          text="Help shape courses, journal clubs, evidence appraisal sessions and division-specific teaching."
          actions={<><Link href="/contact?topic=education" className="btn btn--primary">Contact the education team</Link><Link href="/collaborate" className="btn btn--dark">Collaborate</Link></>}
        />
      </Section>
    </div>
  );
}
