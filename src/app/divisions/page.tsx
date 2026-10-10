import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import DivisionCard from '@/components/DivisionCard';
import { divisions, getBooksByDivision, getPublicationsByDivision, getResearchByDivision, getTeamMembersByDivision } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Divisions and units',
  description: 'The nine divisions and units of Sterling IMRES, from research methodology and clinical medicine to evidence review, medical illustration and publishing.',
  alternates: { canonical: '/divisions' },
};

export default function DivisionsPage() {
  return (
    <div>
      <PageHero
        kicker="Structure"
        title="Nine divisions and units"
        lead="Broad enough to support clinical, academic, educational and publishing work, without presenting the institute as a hospital or a university."
        breadcrumbs={[{ label: 'Divisions' }]}
        stats={[
          { value: divisions.filter(d => d.kind === 'division').length, label: 'divisions' },
          { value: divisions.filter(d => d.kind === 'unit').length, label: 'units' },
        ]}
      />
      <Section last>
        <div className="division-grid">
          {divisions.map(division => (
            <DivisionCard
              key={division.id}
              division={division}
              counts={[
                { label: 'publications', value: getPublicationsByDivision(division.id).length },
                { label: 'books', value: getBooksByDivision(division.id).length },
                { label: 'studies', value: getResearchByDivision(division.id).length },
                { label: 'team', value: getTeamMembersByDivision(division.id).length },
              ]}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
