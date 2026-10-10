export * from './divisions';
export * from './research';
export * from './people';
export * from './projects';
export * from './publications';
export * from './books';
export * from './insights';
export * from './education';
export * from './illustrations';

import { divisions } from './divisions';
import { researchRecords } from './research';
import { teamMembers } from './people';
import { projects } from './projects';
import { publications } from './publications';
import { books } from './books';
import { insights } from './insights';
import { illustrations } from './illustrations';

const matches = (q: string, ...fields: (string | undefined | (string | undefined)[])[]) =>
  fields.flat().some(field => field?.toLowerCase().includes(q));

export function searchResources(query: string) {
  const q = query.trim().toLowerCase();
  return {
    research: researchRecords.filter(r =>
      matches(q, r.title, r.officialTitle, r.nctId, r.summary, r.sponsor, r.status, r.conditions, r.divisions, r.investigators?.map(i => i.name)),
    ),
    people: teamMembers.filter(member =>
      matches(q, member.name, member.title, member.specialty, member.degrees, member.divisions, member.expertise, member.researchInterests, member.biography),
    ),
    projects: projects.filter(p => matches(q, p.title, p.overview, p.type, p.status, p.divisions)),
    publications: publications.filter(p =>
      matches(q, p.title, p.summary, p.journal, p.publisher, p.type, p.doi, p.pmid, p.keywords, p.divisions, p.corporateAuthor, p.authors.map(a => a.name)),
    ),
    books: books.filter(b =>
      matches(q, b.title, b.subtitle, b.summary, b.publisher, b.category, b.isbn13, b.keywords, b.divisions, [...b.authors, ...b.editors].map(a => a.name)),
    ),
    insights: insights.filter(i => matches(q, i.title, i.excerpt, i.category, i.divisions, i.body)),
    divisions: divisions.filter(d => matches(q, d.name, d.role, d.overview, d.keyAreas)),
  };
}

export type SearchResults = ReturnType<typeof searchResources>;

/** Resolves an internal record path such as `/books/<slug>` to its title. */
export function recordTitle(href: string): string {
  const [, kind, slug] = href.split('/');
  if (!slug) return href;
  const lookup: Record<string, () => string | undefined> = {
    books: () => books.find(b => b.slug === slug)?.title,
    publications: () => publications.find(p => p.slug === slug)?.title,
    research: () => researchRecords.find(r => r.slug === slug)?.title,
    projects: () => projects.find(p => p.slug === slug)?.title,
    'medical-illustration': () => (slug === 'gallery' ? 'Illustration gallery' : illustrations.find(i => i.slug === slug)?.title),
  };
  return lookup[kind]?.() ?? href;
}
