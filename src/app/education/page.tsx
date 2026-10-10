import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Notice from '@/components/Notice';
import ProgrammeList from '@/components/ProgrammeList';
import ResourceCard from '@/components/ResourceCard';
import CTASection from '@/components/CTASection';
import { learningResources, programmes } from '@/lib/education';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Planned courses, workshops and verified learning resources from Sterling IMRES.',
  alternates: { canonical: '/education' },
};

export default function EducationPage() {
  const inDevelopment = programmes.filter(programme => programme.status === 'in-development');
  const upcoming = programmes.filter(programme => programme.status === 'upcoming');

  return (
    <div>
      <PageHero
        kicker="Education"
        title="Education and training"
        lead="Planned courses and workshops grounded in the same verified books, publications and standards used across the institute."
        breadcrumbs={[{ label: 'Education' }]}
        stats={[
          { value: programmes.length, label: 'planned programmes' },
          { value: learningResources.length, label: 'learning resources' },
        ]}
      />

      <Section>
        <Notice tone="caution">
          These programmes are not currently enrolling and do not lead to an accredited award or certification. Their status will be updated before registration opens.
        </Notice>
      </Section>

      <Section id="in-development">
        <SectionHeader kicker="In development" title="Courses and workshops being prepared" />
        <ProgrammeList programmes={inDevelopment} />
      </Section>

      <Section id="upcoming">
        <SectionHeader kicker="Upcoming" title="Planned programmes" />
        <ProgrammeList programmes={upcoming} />
      </Section>

      <Section id="resources">
        <SectionHeader kicker="Open learning" title="Verified external resources" lead="Selected guidance, databases and toolkits from recognised providers." />
        <div className={ui.grid3}>
          {learningResources.map(resource => <ResourceCard key={resource.slug} resource={resource} />)}
        </div>
      </Section>

      <Section last>
        <CTASection
          title="Develop education with Sterling IMRES"
          text="Educators, clinicians, researchers and illustrators can propose teaching, workshops and learning resources."
          actions={<Link href="/contact?topic=education" className="btn btn--primary">Discuss an education project</Link>}
        />
      </Section>
    </div>
  );
}
