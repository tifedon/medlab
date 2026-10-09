export type ProjectType =
  | 'research'
  | 'educational'
  | 'publishing'
  | 'evidence-review'
  | 'medical-illustration'
  | 'reference-work'
  | 'digital-learning'
  | 'institutional';

export type ProjectStatus = 'upcoming' | 'in-progress' | 'completed';

export interface ProjectUpdate {
  date: string;
  text: string;
}

export interface Project {
  slug: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  phase?: string;
  overview: string;
  objectives: string[];
  deliverables: string[];
  timeline: string;
  team: string;
  divisions: string[];
  updates: ProjectUpdate[];
  /** Internal links to related records, e.g. `/publications`, `/books/...`. */
  related: { label: string; href: string }[];
}

export const projectTypeLabels: Record<ProjectType, string> = {
  research: 'Research project',
  educational: 'Educational project',
  publishing: 'Publishing project',
  'evidence-review': 'Evidence review project',
  'medical-illustration': 'Medical illustration project',
  'reference-work': 'Reference work',
  'digital-learning': 'Digital learning project',
  institutional: 'Institutional project',
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  upcoming: 'Upcoming',
  'in-progress': 'In progress',
  completed: 'Completed',
};

/**
 * Institutional projects come from the partner blueprint (October 2026): its
 * development roadmap and current build status. They are the institute's own
 * work, so no external people or dates are attached until confirmed.
 */
export const projects: Project[] = [
  {
    slug: 'multi-page-platform-architecture',
    title: 'Multi-page platform architecture',
    type: 'institutional',
    status: 'completed',
    phase: 'Foundation',
    overview: 'The first technical build of the institutional website: a multi-page Next.js and TypeScript application with content hubs, dynamic detail routes and typed local content that can later move to a CMS or database.',
    objectives: ['Replace a single brochure page with connected content hubs', 'Separate content from presentation through typed data files', 'Provide the full route map described in the blueprint'],
    deliverables: ['Content hubs for research, projects, publications, books, education, integrity, illustration and insights', 'Dynamic detail pages for every record type', 'Sitemap, robots file and custom 404 page'],
    timeline: 'Completed during the Phase 1 foundation work.',
    team: 'Sterling IMRES founding team',
    divisions: ['editorial-publications', 'research'],
    updates: [{ date: '2026-10', text: 'All routes in the blueprint route map are live with real, verified library content.' }],
    related: [{ label: 'Search the platform', href: '/search' }],
  },
  {
    slug: 'secure-accounts-and-roles',
    title: 'Secure accounts and role-based access',
    type: 'institutional',
    status: 'completed',
    phase: 'Foundation',
    overview: 'Sign-in and sign-up backed by Supabase authentication, with each login mapped to a user or administrator role and an upload permission, as the blueprint requires before any admin area is introduced.',
    objectives: ['Authenticate readers and contributors', 'Separate administrator access from regular accounts', 'Prepare for contributor uploads behind explicit permission'],
    deliverables: ['Sign-in and sign-up pages', 'User and administrator workspaces', 'Row-level-security protected profile table'],
    timeline: 'Completed October 2026.',
    team: 'Sterling IMRES founding team',
    divisions: ['editorial-publications'],
    updates: [{ date: '2026-10', text: 'User and administrator workspaces are live behind role checks.' }],
    related: [{ label: 'Sign in', href: '/sign-in' }],
  },
  {
    slug: 'sterling-reference-library',
    title: 'Sterling reference library',
    type: 'reference-work',
    status: 'in-progress',
    phase: 'Verified content',
    overview: 'A curated, verified library of published articles, reference books and registered studies for each of the nine divisions. Every record is checked against an authoritative source (Crossref, ISBN catalogues or ClinicalTrials.gov) and credited to its real authors and publisher.',
    objectives: ['List at least five verified works per division', 'Record authors, editors, identifiers and licences accurately', 'Link every work to the divisions and topics it supports'],
    deliverables: ['Publications catalogue with citations and DOIs', 'Books catalogue with authors, editors and ISBNs', 'Research watch of registered studies across the lifecycle'],
    timeline: 'Ongoing; new works are added after verification.',
    team: 'Editorial and Publications Division with the Evidence Review and Scientific Integrity Unit',
    divisions: ['editorial-publications', 'evidence-review-integrity'],
    updates: [{ date: '2026-10', text: 'First verified set published across all nine divisions.' }],
    related: [
      { label: 'Publications', href: '/publications' },
      { label: 'Books', href: '/books' },
      { label: 'Research watch', href: '/research' },
    ],
  },
  {
    slug: 'open-licence-visual-library',
    title: 'Open-licence visual library',
    type: 'medical-illustration',
    status: 'in-progress',
    phase: 'Verified content',
    overview: 'A gallery of openly licensed anatomical, cellular and scientific illustrations with full creator and licence attribution, as the starting point for the institute’s own illustration portfolio.',
    objectives: ['Show how images should be credited and licensed', 'Provide reusable visuals for teaching', 'Prepare a portfolio structure for original Sterling IMRES work'],
    deliverables: ['Illustration gallery with licence details', 'Detail pages with creator and source attribution'],
    timeline: 'Ongoing.',
    team: 'Medical Illustration and Visualization Unit',
    divisions: ['medical-illustration-visualization'],
    updates: [{ date: '2026-10', text: 'First set of openly licensed illustrations published with attribution.' }],
    related: [{ label: 'Illustration gallery', href: '/medical-illustration/gallery' }],
  },
  {
    slug: 'technical-validation',
    title: 'Technical validation and quality assurance',
    type: 'institutional',
    status: 'in-progress',
    phase: 'Phase 3',
    overview: 'Type checking, linting, production builds, responsive testing and accessibility checks against WCAG 2.2 AA practice before public launch.',
    objectives: ['Pass type checks, linting and a production build', 'Check every page family on desktop and mobile', 'Complete keyboard and screen-reader testing'],
    deliverables: ['Clean production build', 'Accessibility and responsive QA report'],
    timeline: 'Before launch.',
    team: 'Sterling IMRES founding team',
    divisions: ['editorial-publications'],
    updates: [],
    related: [],
  },
  {
    slug: 'founding-team-verification',
    title: 'Founding team and leadership verification',
    type: 'institutional',
    status: 'upcoming',
    phase: 'Phase 2',
    overview: 'Confirm which named people will represent the institute publicly, verify their qualifications and memberships, and publish a small verified founding team instead of many unverified profiles.',
    objectives: ['Agree leadership roles and approval authority', 'Verify degrees, titles and memberships', 'Publish profiles linked to the work each person contributes to'],
    deliverables: ['Verified leadership page', 'Founding team profiles in the people directory'],
    timeline: 'Follows the partners’ governance decisions.',
    team: 'Partners and founding team',
    divisions: ['editorial-publications'],
    updates: [],
    related: [{ label: 'Leadership', href: '/about/leadership' }],
  },
  {
    slug: 'launch-infrastructure',
    title: 'Launch infrastructure',
    type: 'institutional',
    status: 'upcoming',
    phase: 'Phase 4',
    overview: 'Deploy to Vercel, connect the custom domain, and set up analytics, form handling, official email addresses and the legal policies.',
    objectives: ['Deploy and connect the domain with HTTPS', 'Create official email addresses', 'Publish privacy, terms, disclaimer and corrections policies'],
    deliverables: ['Production deployment on the institute’s domain', 'Working enquiry routing', 'Published legal policies'],
    timeline: 'After technical validation.',
    team: 'Sterling IMRES founding team',
    divisions: ['editorial-publications'],
    updates: [],
    related: [{ label: 'Privacy policy', href: '/privacy' }],
  },
  {
    slug: 'editorial-operations',
    title: 'Editorial operations',
    type: 'publishing',
    status: 'upcoming',
    phase: 'Phase 5',
    overview: 'Internal workflows for content approval, review dates, corrections and publishing, so every record has a clear owner, reviewer and approver.',
    objectives: ['Define content owners, reviewers and approvers', 'Introduce review dates for clinical material', 'Operate a visible corrections process'],
    deliverables: ['Written authorship, contributor and medical review policy', 'Content state workflow from draft to published'],
    timeline: 'Phase 5 of the roadmap.',
    team: 'Editorial and Publications Division',
    divisions: ['editorial-publications', 'evidence-review-integrity'],
    updates: [],
    related: [{ label: 'Editorial standards', href: '/scientific-integrity/editorial-standards' }],
  },
  {
    slug: 'cms-database-migration',
    title: 'CMS and database migration',
    type: 'digital-learning',
    status: 'upcoming',
    phase: 'Phase 6',
    overview: 'Move high-volume structured content from local TypeScript files into an editorial CMS or database once the volume of real content justifies it.',
    objectives: ['Choose a CMS or database', 'Migrate records without changing the front end', 'Enable server-side search and filtering'],
    deliverables: ['Editorial CMS or database', 'Migrated content with the same routes'],
    timeline: 'When content volume requires it.',
    team: 'Sterling IMRES founding team',
    divisions: ['editorial-publications'],
    updates: [],
    related: [],
  },
  {
    slug: 'sterling-imres-press',
    title: 'Sterling IMRES Press',
    type: 'publishing',
    status: 'upcoming',
    phase: 'Phase 7',
    overview: 'Formalise Sterling IMRES Press as the institute’s publishing imprint: book metadata, ISBN workflow, PublishDrive distribution and catalogue pages for the institute’s own titles.',
    objectives: ['Confirm the imprint name before use in retail metadata', 'Set up ISBN and metadata management', 'Distribute approved titles through PublishDrive'],
    deliverables: ['Imprint and metadata standard', 'First titles approved by the Editorial and Publications Division'],
    timeline: 'Phase 7 of the roadmap.',
    team: 'Editorial and Publications Division',
    divisions: ['editorial-publications'],
    updates: [],
    related: [{ label: 'Books and the publishing programme', href: '/books' }],
  },
  {
    slug: 'advanced-platform',
    title: 'Advanced platform features',
    type: 'digital-learning',
    status: 'upcoming',
    phase: 'Phase 8',
    overview: 'Richer search, author dashboards, institutional reporting, APIs or member workflows - added only when there is a validated need.',
    objectives: ['Validate need before building', 'Extend search and author tools'],
    deliverables: ['Defined only after need is validated'],
    timeline: 'Phase 8 of the roadmap.',
    team: 'Sterling IMRES founding team',
    divisions: ['research', 'editorial-publications'],
    updates: [],
    related: [],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find(p => p.slug === slug);
}

export function getProjectsByStatus(status: ProjectStatus) {
  return projects.filter(p => p.status === status);
}

export function getProjectsByDivision(divisionId: string) {
  return projects.filter(p => p.divisions.includes(divisionId));
}
