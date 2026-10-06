import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Notice from '@/components/Notice';
import ProgrammeList from '@/components/ProgrammeList';
import { programmes } from '@/lib/education';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Structured courses in development, each built on verified works in the reference library.',
  alternates: { canonical: '/education/courses' },
};

export default function Page() {
  const records = programmes.filter(p => p.format === 'course');
  return (
    <div>
      <PageHero kicker="Education" title="Courses" lead="Structured courses in development, each built on verified works in the reference library." breadcrumbs={[{ label: 'Education', href: '/education' }, { label: 'Courses' }]} stats={[{ value: records.length, label: 'planned' }]} />
      <Section>
        <Notice tone="caution">Not yet enrolling. Sterling IMRES does not award accredited degrees, certificates or CPD credits.</Notice>
      </Section>
      <Section last>
        <ProgrammeList programmes={records} />
      </Section>
    </div>
  );
}
