import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import ProfileCard from '@/components/ProfileCard';
import EmptyState from '@/components/EmptyState';
import FilterBar, { param } from '@/components/FilterBar';
import Notice from '@/components/Notice';
import { divisions } from '@/lib/divisions';
import { libraryContributors, teamMembers } from '@/lib/people';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'People',
  description: 'The Sterling IMRES people directory: verified team profiles and the authors, editors and investigators credited on works in the reference library.',
  alternates: { canonical: '/people' },
};

const roles = ['Author', 'Editor', 'Investigator'];

export default async function PeoplePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const current = { division: param(sp.division), role: param(sp.role), letter: param(sp.letter) };
  const familyInitial = (name: string) => (name.split(/\s+/).pop() ?? name).charAt(0).toUpperCase();

  const filtered = libraryContributors.filter(
    c =>
      (!current.division || c.divisions.includes(current.division)) &&
      (!current.role || c.roles.includes(current.role as never)) &&
      (!current.letter || familyInitial(c.name) === current.letter),
  );
  const letters = [...new Set(libraryContributors.map(c => familyInitial(c.name)))].filter(l => /[A-Z]/.test(l)).sort();

  return (
    <div>
      <PageHero
        kicker="People"
        title="People directory"
        lead="Doctors, dentists, nurses, pharmacologists, biomedical scientists, methodologists, illustrators and editors — linked to the work they actually contributed to."
        breadcrumbs={[{ label: 'People' }]}
        stats={[
          { value: teamMembers.length, label: 'verified team profiles' },
          { value: libraryContributors.length, label: 'credited authors, editors and investigators' },
        ]}
      />

      <Section>
        <SectionHeader kicker="Sterling IMRES team" title="Founding team and contributors" />
        {teamMembers.length === 0 && (
          <EmptyState title="Team profiles are being verified" actions={<Link href="/collaborate" className="btn btn--secondary">Become a contributor</Link>}>
            Profiles of Sterling IMRES staff and contributors — with degrees, specialties, memberships, ORCID and linked research — are published only after the details are verified.
          </EmptyState>
        )}
      </Section>

      <Section last>
        <SectionHeader
          kicker="Reference library"
          title="Authors, editors and investigators"
          lead="People credited on the published works and registered studies in the Sterling reference library, with affiliations as they appear in the source record."
        />
        <Notice>These people are listed because they are credited on works in the library. They are not Sterling IMRES staff, and a listing does not imply any affiliation with the institute.</Notice>
        <div style={{ height: '1.5rem' }} />
        <FilterBar
          basePath="/people"
          current={current}
          groups={[
            { param: 'division', label: 'Division', options: divisions.map(d => ({ value: d.id, label: d.shortName })) },
            { param: 'role', label: 'Role', options: roles.map(r => ({ value: r, label: r })) },
            { param: 'letter', label: 'Surname', options: letters.map(l => ({ value: l, label: l })) },
          ]}
        />
        <p className={ui.resultCount} aria-live="polite">{filtered.length} people</p>
        {filtered.length ? (
          <div className={ui.grid3}>{filtered.map(person => <ProfileCard key={person.slug} person={person} />)}</div>
        ) : (
          <EmptyState title="No people match these filters">Try another division, role or letter.</EmptyState>
        )}
      </Section>
    </div>
  );
}
