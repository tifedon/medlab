import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Notice from '@/components/Notice';
import ProgrammeList from '@/components/ProgrammeList';
import { programmes } from '@/lib/education';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Short, practical workshops in development for review teams, authors and reviewers.',
  alternates: { canonical: '/education/workshops' },
};

export default function Page() {
  const records = programmes.filter(p => p.format === 'workshop');
  return (
    <div>
      <PageHero kicker="Education" title="Workshops" lead="Short, practical workshops in development for review teams, authors and reviewers." breadcrumbs={[{ label: 'Education', href: '/education' }, { label: 'Workshops' }]} stats={[{ value: records.length, label: 'planned' }]} />
      <Section>
        <Notice tone="caution">Not yet enrolling. Sterling IMRES does not award accredited degrees, certificates or CPD credits.</Notice>
      </Section>
      <Section last>
        <ProgrammeList programmes={records} />
      </Section>
    </div>
  );
}
