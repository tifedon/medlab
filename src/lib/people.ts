import type { DivisionId } from './divisions';

export interface TeamMember {
  slug: string;
  name: string;
  email: string;
  image: string;
  title: string;
  degrees: string[];
  specialty: string;
  divisions: DivisionId[];
  biography: string;
  expertise: string[];
  researchInterests: string[];
}

/** The canonical Sterling IMRES team roster used by every people surface. */
export const teamMembers: TeamMember[] = [
  {
    slug: 'robert-glassman',
    name: 'Robert H. Glassman',
    email: 'robert@sterlingimres.com',
    image: '/Characters/Headshot/Robert Glassman.png',
    title: 'Director of Clinical Research',
    degrees: ['MD', 'MACP', 'FCCP'],
    specialty: 'Internal Medicine',
    divisions: ['clinical-medicine', 'research'],
    biography: 'Robert H. Glassman brings extensive experience in clinical research and internal medicine, with a focus on rigorous evidence review and clinical excellence across Sterling IMRES disciplines.',
    expertise: ['Internal Medicine', 'Clinical Trials', 'Evidence-based Practice'],
    researchInterests: ['Chronic disease management', 'Health outcomes'],
  },
  {
    slug: 'elias-thorne',
    name: 'Elias R. Thorne',
    email: 'elias@sterlingimres.com',
    image: '/Characters/Headshot/Dr Elias Thorne.png',
    title: 'Senior Researcher',
    degrees: ['MD', 'PhD', 'FCCP'],
    specialty: 'Pulmonology',
    divisions: ['clinical-medicine', 'research'],
    biography: 'Elias R. Thorne focuses on translational research in pulmonology, connecting laboratory findings with patient care and clinical study design.',
    expertise: ['Pulmonology', 'Translational Medicine', 'Molecular Biology'],
    researchInterests: ['Asthma pathophysiology', 'COPD'],
  },
  {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    email: 'sarah@sterlingimres.com',
    image: '/Characters/Headshot/Dr Sarah Chen.png',
    title: 'Head of Scientific Integrity',
    degrees: ['MD', 'FCCP', 'ATSF'],
    specialty: 'Thoracic Medicine',
    divisions: ['evidence-review-integrity', 'editorial-publications'],
    biography: 'Sarah Chen works across thoracic medicine, scientific integrity and publication standards, supporting careful review and responsible research communication.',
    expertise: ['Thoracic Medicine', 'Scientific Publishing', 'Research Ethics'],
    researchInterests: ['Publication bias', 'Peer review models'],
  },
  {
    slug: 'marcus-vance',
    name: 'Marcus Vance',
    email: 'marcus@sterlingimres.com',
    image: '/Characters/Headshot/Marcus Vance.png',
    title: 'Chief Medical Editor',
    degrees: ['MD', 'FACP', 'FAASM'],
    specialty: 'Sleep Medicine',
    divisions: ['editorial-publications', 'clinical-medicine'],
    biography: 'Marcus Vance combines clinical expertise in sleep medicine with experience in scholarly communication and medical editing.',
    expertise: ['Sleep Medicine', 'Medical Editing', 'Scholarly Communication'],
    researchInterests: ['Circadian rhythms', 'Medical pedagogy'],
  },
  {
    slug: 'amina-yusuf',
    name: 'Amina K. Yusuf',
    email: 'amina@sterlingimres.com',
    image: '/Characters/Headshot/Dr Amina K Yusuf.png',
    title: 'Lead Biomedical Scientist',
    degrees: ['MD', 'PhD', 'FACP'],
    specialty: 'Immunology',
    divisions: ['biomedical-sciences'],
    biography: 'Amina K. Yusuf leads biomedical science work focused on immunology, autoimmune responses and diagnostic methods.',
    expertise: ['Immunology', 'Autoimmunity', 'Diagnostics'],
    researchInterests: ['T-cell regulation', 'Biomarker discovery'],
  },
  {
    slug: 'david-ojo',
    name: 'David O. Ojo',
    email: 'david@sterlingimres.com',
    image: '/Characters/Headshot/Dr David Ojo.jpg',
    title: 'Critical Care Specialist',
    degrees: ['MD', 'FCCM'],
    specialty: 'Critical Care',
    divisions: ['clinical-medicine'],
    biography: 'David O. Ojo contributes critical-care expertise to acute-care research, evidence review and clinical guidance.',
    expertise: ['Critical Care', 'Resuscitation', 'Sepsis'],
    researchInterests: ['Haemodynamic monitoring', 'Acute respiratory failure'],
  },
  {
    slug: 'michael-davies',
    name: 'Michael T. Davies',
    email: 'michael@sterlingimres.com',
    image: '/Characters/Headshot/Micheal T Davis.png',
    title: 'Respiratory Therapist',
    degrees: ['RRT-ACCS'],
    specialty: 'Respiratory Care',
    divisions: ['nursing-allied-health'],
    biography: 'Michael T. Davies brings an allied-health perspective to research and evidence-based respiratory care.',
    expertise: ['Respiratory Therapy', 'Ventilator Management', 'Adult Critical Care'],
    researchInterests: ['Non-invasive ventilation strategies'],
  },
  {
    slug: 'emily-rostova',
    name: 'Emily N. Rostova',
    email: 'emily@sterlingimres.com',
    image: '/Characters/Headshot/Dr Emily Rostove.png',
    title: 'Director of Pharmacology',
    degrees: ['PharmD', 'BCPS'],
    specialty: 'Pharmacotherapy',
    divisions: ['pharmacology-natural-products'],
    biography: 'Emily N. Rostova contributes pharmacological research and evidence review expertise in drug safety, interactions and clinical pharmacology.',
    expertise: ['Pharmacotherapy', 'Drug Safety', 'Clinical Pharmacology'],
    researchInterests: ['Pharmacogenomics', 'Antimicrobial stewardship'],
  },
  {
    slug: 'elena-gomez',
    name: 'Elena R. Gomez',
    email: 'elena@sterlingimres.com',
    image: '/Characters/Headshot/Elena Gomez.png',
    title: 'Nurse Practitioner',
    degrees: ['APRN', 'AGACNP-BC'],
    specialty: 'Adult-Gerontology',
    divisions: ['nursing-allied-health'],
    biography: 'Elena R. Gomez integrates advanced nursing practice into clinical research, with a focus on adult-gerontology and acute-care outcomes.',
    expertise: ['Acute Care', 'Gerontology', 'Advanced Nursing Practice'],
    researchInterests: ['Ageing populations', 'Acute-care transitions'],
  },
  {
    slug: 'lars-johansen',
    name: 'Lars Johansen',
    email: 'lars@sterlingimres.com',
    image: '/Characters/Headshot/Dr Lars Johansen.png',
    title: 'Epidemiologist',
    degrees: ['MD', 'MPH'],
    specialty: 'Public Health',
    divisions: ['research'],
    biography: 'Lars Johansen supports population-health research through epidemiology, study design and biostatistical analysis.',
    expertise: ['Epidemiology', 'Public Health', 'Biostatistics'],
    researchInterests: ['Infectious-disease modelling', 'Population health'],
  },
  {
    slug: 'mei-lin',
    name: 'Mei Lin',
    email: 'mei@sterlingimres.com',
    image: '/Characters/Headshot/Mei lin.png',
    title: 'Evidence Review Coordinator',
    degrees: ['MD'],
    specialty: 'General Medicine',
    divisions: ['evidence-review-integrity', 'research'],
    biography: 'Mei Lin coordinates systematic reviews and evidence synthesis, supporting transparent and reproducible methods across the institute.',
    expertise: ['Systematic Reviews', 'Meta-analysis', 'Evidence Grading'],
    researchInterests: ['Evidence-synthesis methodology'],
  },
  {
    slug: 'jason-reynolds',
    name: 'Jason Reynolds',
    email: 'jason@sterlingimres.com',
    image: '/Characters/Headshot/Jason reynolds.png',
    title: 'Pulmonary Function Technologist',
    degrees: ['CPFT', 'RPFT'],
    specialty: 'Diagnostics',
    divisions: ['nursing-allied-health'],
    biography: 'Jason Reynolds contributes technical expertise in pulmonary-function diagnostics and clinical data quality.',
    expertise: ['Pulmonary Function Testing', 'Diagnostic Equipment', 'Data Quality'],
    researchInterests: ['Spirometry standardisation'],
  },
  {
    slug: 'sophia-rossi',
    name: 'Sophia V. Rossi',
    email: 'sophia@sterlingimres.com',
    image: '/Characters/Headshot/Sophia v rossi.ng',
    title: 'Lead Medical Illustrator',
    degrees: ['CMI'],
    specialty: 'Medical Visualization',
    divisions: ['medical-illustration-visualization'],
    biography: 'Sophia V. Rossi translates complex anatomical and physiological concepts into clear, accurate medical illustrations.',
    expertise: ['Medical Illustration', 'Anatomy', 'Visual Communication'],
    researchInterests: ['Visual cognition in medical learning'],
  },
  {
    slug: 'chloe-bennett',
    name: 'Chloe M. Bennett',
    email: 'chloe@sterlingimres.com',
    image: '/Characters/Headshot/Dr Chloe Bennett.png',
    title: 'Research Educator',
    degrees: ['MD', 'MSc'],
    specialty: 'Medical Education',
    divisions: ['research', 'clinical-medicine'],
    biography: 'Chloe M. Bennett develops curricula and teaching tools that connect current research with clinical learning.',
    expertise: ['Medical Education', 'Curriculum Design', 'E-learning'],
    researchInterests: ['Adult learning theory', 'Simulation in healthcare'],
  },
];

export function getTeamMemberBySlug(slug: string) {
  return teamMembers.find(member => member.slug === slug);
}

export function getTeamMembersByDivision(divisionId: string) {
  return teamMembers.filter(member => member.divisions.includes(divisionId as DivisionId));
}
