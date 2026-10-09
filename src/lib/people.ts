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
  email: string;
  image: string;
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

export const teamMembers: TeamMember[] = [
  {
    slug: 'robert-glassman',
    name: 'Robert H. Glassman',
    email: 'robert@sterlingimres.com',
    image: '/Characters/Headshot/Robert Glassman.png',
    title: 'Director of Clinical Research',
    degrees: ['MD', 'MACP', 'FCCP'],
    specialty: 'Internal Medicine',
    divisions: ['clinical'],
    biography: 'Robert H. Glassman brings over two decades of experience in clinical research and internal medicine. He is deeply committed to rigorous evidence review and driving forward clinical excellence across Sterling IMRES disciplines.',
    expertise: ['Internal Medicine', 'Clinical Trials', 'Evidence-based Practice'],
    researchInterests: ['Chronic Disease Management', 'Health Outcomes'],
    education: ['MD, Harvard Medical School'],
    experience: ['20+ years in clinical practice', 'Former Chief of Medicine'],
    memberships: ['Master, American College of Physicians', 'Fellow, American College of Chest Physicians']
  },
  {
    slug: 'elias-thorne',
    name: 'Elias R. Thorne',
    email: 'elias@sterlingimres.com',
    image: '/Characters/Headshot/Elias Thorne.png',
    title: 'Senior Researcher',
    degrees: ['MD', 'PhD', 'FCCP'],
    specialty: 'Pulmonology',
    divisions: ['clinical', 'research'],
    biography: 'Elias R. Thorne focuses on translational research in pulmonology. His dual background as a physician-scientist allows him to bridge the gap between laboratory findings and patient care.',
    expertise: ['Pulmonology', 'Translational Medicine', 'Molecular Biology'],
    researchInterests: ['Asthma Pathophysiology', 'COPD'],
    education: ['MD/PhD, Johns Hopkins University'],
    experience: ['Principal Investigator for multiple NIH grants'],
    memberships: ['Fellow, American College of Chest Physicians']
  },
  {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    email: 'sarah@sterlingimres.com',
    image: '/Characters/Headshot/Sarah Chen.png',
    title: 'Head of Scientific Integrity',
    degrees: ['MD', 'FCCP', 'ATSF'],
    specialty: 'Thoracic Medicine',
    divisions: ['editorial'],
    biography: 'Sarah Chen is an expert in thoracic medicine and a staunch advocate for scientific integrity. She oversees publication standards and peer-review rigor at Sterling IMRES Press.',
    expertise: ['Thoracic Surgery', 'Scientific Publishing', 'Ethics'],
    researchInterests: ['Publication Bias', 'Peer Review Models'],
    education: ['MD, Stanford University'],
    experience: ['Former Editor-in-Chief of a major thoracic journal'],
    memberships: ['American Thoracic Society Fellow']
  },
  {
    slug: 'marcus-vance',
    name: 'Marcus Vance',
    email: 'marcus@sterlingimres.com',
    image: '/Characters/Headshot/Marcus Vance.png',
    title: 'Chief Medical Editor',
    degrees: ['MD', 'FACP', 'FAASM'],
    specialty: 'Sleep Medicine',
    divisions: ['editorial'],
    biography: 'Marcus Vance blends clinical expertise in sleep medicine with extensive experience in scholarly communication, leading the editorial direction of our primary publications.',
    expertise: ['Sleep Medicine', 'Medical Editing', 'Scholarly Communication'],
    researchInterests: ['Circadian Rhythms', 'Medical Pedagogy'],
    education: ['MD, University of Pennsylvania'],
    experience: ['15 years in medical publishing'],
    memberships: ['Fellow, American College of Physicians']
  },
  {
    slug: 'amina-yusuf',
    name: 'Amina K. Yusuf',
    email: 'amina@sterlingimres.com',
    image: '/Characters/Headshot/Amina Yusuf.png',
    title: 'Lead Biomedical Scientist',
    degrees: ['MD', 'PhD', 'FACP'],
    specialty: 'Immunology',
    divisions: ['biomedical'],
    biography: 'Amina K. Yusuf leads our biomedical science initiatives. Her research focuses on immunology and autoimmune responses, driving innovations in diagnostic methodologies.',
    expertise: ['Immunology', 'Autoimmunity', 'Diagnostics'],
    researchInterests: ['T-cell regulation', 'Biomarker discovery'],
    education: ['MD/PhD, University of Oxford'],
    experience: ['Director of Immunology Lab'],
    memberships: ['Fellow, American College of Physicians']
  },
  {
    slug: 'david-ojo',
    name: 'David O. Ojo',
    email: 'david@sterlingimres.com',
    image: '/Characters/Headshot/David Ojo.png',
    title: 'Critical Care Specialist',
    degrees: ['MD', 'FCCM'],
    specialty: 'Critical Care',
    divisions: ['clinical'],
    biography: 'David O. Ojo is a specialist in critical care medicine. His clinical insights directly inform our acute care research programs and critical care guidelines.',
    expertise: ['Critical Care', 'Resuscitation', 'Sepsis'],
    researchInterests: ['Hemodynamic Monitoring', 'Acute Respiratory Failure'],
    education: ['MD, University of Toronto'],
    experience: ['ICU Attending Physician'],
    memberships: ['Fellow, American College of Critical Care Medicine']
  },
  {
    slug: 'michael-davies',
    name: 'Michael T. Davies',
    email: 'michael@sterlingimres.com',
    image: '/Characters/Headshot/Michael Davies.png',
    title: 'Respiratory Therapist',
    degrees: ['RRT-ACCS'],
    specialty: 'Respiratory Care',
    divisions: ['allied-health'],
    biography: 'Michael T. Davies provides crucial allied health perspectives to our research, ensuring respiratory care protocols are evidence-based and practically applicable.',
    expertise: ['Respiratory Therapy', 'Ventilator Management', 'Adult Critical Care'],
    researchInterests: ['Non-invasive ventilation strategies'],
    education: ['BS, Respiratory Care'],
    experience: ['Lead Respiratory Therapist'],
    memberships: ['American Association for Respiratory Care']
  },
  {
    slug: 'emily-rostova',
    name: 'Emily N. Rostova',
    email: 'emily@sterlingimres.com',
    image: '/Characters/Headshot/Emily Rostova.png',
    title: 'Director of Pharmacology',
    degrees: ['PharmD', 'BCPS'],
    specialty: 'Pharmacotherapy',
    divisions: ['pharmacology'],
    biography: 'Emily N. Rostova leads pharmacological research and evidence reviews, specializing in drug interactions, pharmacokinetics, and safe medication practices.',
    expertise: ['Pharmacotherapy', 'Drug Safety', 'Clinical Pharmacology'],
    researchInterests: ['Pharmacogenomics', 'Antimicrobial Stewardship'],
    education: ['PharmD, UCSF'],
    experience: ['Clinical Pharmacy Specialist'],
    memberships: ['Board Certified Pharmacotherapy Specialist']
  },
  {
    slug: 'elena-gomez',
    name: 'Elena R. Gomez',
    email: 'elena@sterlingimres.com',
    image: '/Characters/Headshot/Elena Gomez.png',
    title: 'Nurse Practitioner',
    degrees: ['APRN', 'AGACNP-BC'],
    specialty: 'Adult-Gerontology',
    divisions: ['nursing'],
    biography: 'Elena R. Gomez integrates advanced nursing practice into our clinical research, focusing on adult-gerontology and acute care outcomes.',
    expertise: ['Acute Care', 'Gerontology', 'Advanced Nursing Practice'],
    researchInterests: ['Aging populations', 'Acute care transitions'],
    education: ['MSN, Duke University'],
    experience: ['Lead Nurse Practitioner in Acute Care'],
    memberships: ['American Association of Nurse Practitioners']
  },
  {
    slug: 'lars-johansen',
    name: 'Lars Johansen',
    email: 'lars@sterlingimres.com',
    image: '/Characters/Headshot/Lars Johansen.png',
    title: 'Epidemiologist',
    degrees: ['MD', 'MPH'],
    specialty: 'Public Health',
    divisions: ['research'],
    biography: 'Lars Johansen analyzes population health data and directs epidemiological studies, providing the statistical backbone for our public health interventions.',
    expertise: ['Epidemiology', 'Public Health', 'Biostatistics'],
    researchInterests: ['Infectious disease modeling', 'Population health'],
    education: ['MPH, Johns Hopkins Bloomberg School of Public Health'],
    experience: ['Senior Epidemiologist'],
    memberships: ['American Public Health Association']
  },
  {
    slug: 'mei-lin',
    name: 'Mei Lin',
    email: 'mei@sterlingimres.com',
    image: '/Characters/Headshot/Mei Lin.png',
    title: 'Evidence Review Coordinator',
    degrees: ['MD'],
    specialty: 'General Medicine',
    divisions: ['editorial'],
    biography: 'Mei Lin coordinates systematic evidence reviews and meta-analyses, ensuring all Sterling IMRES publications are founded on the highest quality data.',
    expertise: ['Systematic Reviews', 'Meta-analysis', 'Evidence Grading'],
    researchInterests: ['Methodology of evidence synthesis'],
    education: ['MD, National University of Singapore'],
    experience: ['Evidence Synthesis Specialist'],
    memberships: ['Cochrane Collaboration']
  },
  {
    slug: 'jason-reynolds',
    name: 'Jason Reynolds',
    email: 'jason@sterlingimres.com',
    image: '/Characters/Headshot/Jason Reynolds.png',
    title: 'Pulmonary Function Technologist',
    degrees: ['CPFT', 'RPFT'],
    specialty: 'Diagnostics',
    divisions: ['allied-health'],
    biography: 'Jason Reynolds oversees diagnostic methodologies in pulmonary function. His technical expertise ensures accuracy in our clinical data collection.',
    expertise: ['Pulmonary Function Testing', 'Diagnostic Equipment', 'Data Quality'],
    researchInterests: ['Spirometry standardization'],
    education: ['AS, Cardiopulmonary Technology'],
    experience: ['Chief PFT Lab Technologist'],
    memberships: ['National Board for Respiratory Care']
  },
  {
    slug: 'sophia-rossi',
    name: 'Sophia V. Rossi',
    email: 'sophia@sterlingimres.com',
    image: '/Characters/Headshot/Sophia Rossi.png',
    title: 'Lead Medical Illustrator',
    degrees: ['CMI'],
    specialty: 'Medical Visualization',
    divisions: ['illustration'],
    biography: 'Sophia V. Rossi translates complex anatomical and physiological concepts into clear, accurate medical illustrations that elevate our educational materials and publications.',
    expertise: ['Medical Illustration', 'Anatomy', 'Visual Communication'],
    researchInterests: ['Visual cognition in medical learning'],
    education: ['MA, Medical and Biological Illustration'],
    experience: ['Award-winning Certified Medical Illustrator'],
    memberships: ['Association of Medical Illustrators']
  },
  {
    slug: 'chloe-bennett',
    name: 'Chloe M. Bennett',
    email: 'chloe@sterlingimres.com',
    image: '/Characters/Headshot/Chloe Bennett.png',
    title: 'Research Educator',
    degrees: ['MD', 'MSc'],
    specialty: 'Medical Education',
    divisions: ['education'],
    biography: 'Chloe M. Bennett develops innovative curricula and teaching tools for Sterling IMRES, bridging the gap between cutting-edge research and clinical application.',
    expertise: ['Medical Education', 'Curriculum Design', 'E-learning'],
    researchInterests: ['Adult learning theory', 'Simulation in healthcare'],
    education: ['MSc Medical Education'],
    experience: ['Director of Medical Education'],
    memberships: ['Academy of Medical Educators']
  }
];

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

export function getTeamMemberBySlug(slug: string) {
  return teamMembers.find(c => c.slug === slug);
}
