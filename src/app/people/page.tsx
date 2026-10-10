import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ProfileCard from '@/components/ProfileCard';
import EmptyState from '@/components/EmptyState';
import FilterBar, { param } from '@/components/FilterBar';
import { divisions } from '@/lib/divisions';
import { teamMembers } from '@/lib/people';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Our team',
  description: 'Meet the Sterling IMRES physicians, researchers, healthcare professionals, editors, educators and medical illustrators.',
  alternates: { canonical: '/people' },
};

export default async function PeoplePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { division: param(sp.division), specialty: param(sp.specialty) };
  const specialties = [...new Set(teamMembers.map(member => member.specialty))].sort();
  const usedDivisions = divisions.filter(division => teamMembers.some(member => member.divisions.includes(division.id)));
  const filtered = teamMembers.filter(member =>
    (!current.division || member.divisions.includes(current.division as (typeof member.divisions)[number])) &&
    (!current.specialty || member.specialty === current.specialty),
  );

  return (
    <div>
      <PageHero
        kicker="People"
        title="Meet the Sterling IMRES team"
        lead="Our multidisciplinary team brings together clinical practice, research, evidence review, education, publishing and medical visualization."
        breadcrumbs={[{ label: 'People' }]}
        stats={[{ value: teamMembers.length, label: 'team members' }]}
      />

      <Section last>
        <SectionHeader kicker="Our team" title="People across the institute" lead="Open a profile to learn about each team member’s role, specialty and areas of expertise." />
        <FilterBar
          basePath="/people"
          current={current}
          groups={[
            { param: 'division', label: 'Division', options: usedDivisions.map(division => ({ value: division.id, label: division.shortName })) },
            { param: 'specialty', label: 'Specialty', options: specialties.map(specialty => ({ value: specialty, label: specialty })) },
          ]}
        />
        <p className={ui.resultCount} aria-live="polite">{filtered.length} {filtered.length === 1 ? 'team member' : 'team members'}</p>
        {filtered.length ? (
          <div className={ui.grid3}>{filtered.map(person => <ProfileCard key={person.slug} person={person} />)}</div>
        ) : (
          <EmptyState title="No team members match these filters">Clear a filter to see the full team.</EmptyState>
        )}
      </Section>
    </div>
  );
}
