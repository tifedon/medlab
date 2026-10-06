import { publications } from './publications';
import { books } from './books';
import { researchRecords } from './research';

/**
 * Profile fields for verified Sterling IMRES staff and contributors (blueprint §9).
 * The list stays empty until names, qualifications and memberships are verified.
 */
export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  degrees: string[];
  specialty: string;
  divisions: string[];
  biography: string;
  expertise: string[];
  researchInterests: string[];
  education: string[];
  experience: string[];
  memberships: string[];
  orcid?: string;
  googleScholar?: string;
  researchGate?: string;
}

export const teamMembers: TeamMember[] = [];

export type ContributionRole = 'Author' | 'Editor' | 'Investigator';

export interface ContributionRef {
  kind: 'publication' | 'book' | 'research';
  slug: string;
  title: string;
  role: string;
  year?: number;
  href: string;
}

/** A person credited on a work in the reference library. Not a Sterling IMRES staff profile. */
export interface LibraryContributor {
  slug: string;
  name: string;
  affiliations: string[];
  orcid?: string;
  roles: ContributionRole[];
  divisions: string[];
  works: ContributionRef[];
}

export function personSlug(name: string) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildContributors(): LibraryContributor[] {
  const map = new Map<string, LibraryContributor>();

  const add = (
    person: { name: string; affiliation?: string; orcid?: string },
    role: ContributionRole,
    divisions: string[],
    work: ContributionRef,
  ) => {
    // Registry names carry credentials ("Jane Doe, MD, PhD"); index the name only.
    const name = person.name.split(',')[0].trim();
    const slug = personSlug(name);
    if (!slug) return;
    const entry =
      map.get(slug) ?? { slug, name, affiliations: [], roles: [], divisions: [], works: [] };
    if (person.affiliation && !entry.affiliations.includes(person.affiliation)) entry.affiliations.push(person.affiliation);
    if (person.orcid && !entry.orcid) entry.orcid = person.orcid;
    if (!entry.roles.includes(role)) entry.roles.push(role);
    divisions.forEach(d => !entry.divisions.includes(d) && entry.divisions.push(d));
    if (!entry.works.some(w => w.kind === work.kind && w.slug === work.slug)) entry.works.push(work);
    map.set(slug, entry);
  };

  publications.forEach(p =>
    p.authors.forEach(a =>
      add(a, 'Author', p.divisions, {
        kind: 'publication',
        slug: p.slug,
        title: p.title,
        role: 'Author',
        year: Number(p.publishedDate.slice(0, 4)),
        href: `/publications/${p.slug}`,
      }),
    ),
  );

  books.forEach(b => {
    const ref = { kind: 'book' as const, slug: b.slug, title: b.title, year: b.year, href: `/books/${b.slug}` };
    b.authors.forEach(a => add(a, 'Author', b.divisions, { ...ref, role: a.role ?? 'Author' }));
    b.editors.forEach(e => add(e, 'Editor', b.divisions, { ...ref, role: e.role ?? 'Editor' }));
  });

  researchRecords.forEach(r =>
    r.investigators?.forEach(i =>
      add(i, 'Investigator', r.divisions, {
        kind: 'research',
        slug: r.slug,
        title: r.title,
        role: i.role ? i.role.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()) : 'Investigator',
        year: r.startDate ? Number(r.startDate.slice(0, 4)) : undefined,
        href: `/research/${r.slug}`,
      }),
    ),
  );

  return [...map.values()].sort((a, b) => {
    const family = (n: string) => n.split(/\s+/).pop() ?? n;
    return family(a.name).localeCompare(family(b.name)) || a.name.localeCompare(b.name);
  });
}

export const libraryContributors: LibraryContributor[] = buildContributors();

export function getContributorBySlug(slug: string) {
  return libraryContributors.find(c => c.slug === slug);
}

export function getContributorsByDivision(divisionId: string) {
  return libraryContributors.filter(c => c.divisions.includes(divisionId));
}
