import { studyRecords } from '@/data/studies';

export type ResearchStatus =
  | 'proposed'
  | 'upcoming'
  | 'recruiting'
  | 'in-progress'
  | 'data-analysis'
  | 'manuscript-preparation'
  | 'completed'
  | 'published'
  | 'archived';

export type RegistryStatus = 'RECRUITING' | 'NOT_YET_RECRUITING' | 'ACTIVE_NOT_RECRUITING' | 'COMPLETED';

export interface StudyRecord {
  slug: string;
  nctId: string;
  title: string;
  officialTitle?: string;
  registryStatus: RegistryStatus;
  studyType: 'INTERVENTIONAL' | 'OBSERVATIONAL';
  phase?: string;
  design?: string;
  conditions: string[];
  interventions?: string[];
  enrollment?: number;
  enrollmentType?: 'ACTUAL' | 'ESTIMATED';
  sponsor: string;
  collaborators?: string[];
  investigators?: { name: string; role?: string; affiliation?: string }[];
  startDate?: string;
  primaryCompletionDate?: string;
  completionDate?: string;
  lastUpdated?: string;
  countries?: string[];
  primaryOutcome?: string;
  objectives?: string[];
  summary: string;
  resultsPublications?: { citation: string; pmid?: string }[];
  hasResults?: boolean;
  divisions: string[];
  url: string;
}

export interface ResearchRecord extends StudyRecord {
  status: ResearchStatus;
  libraryPublications: string[];
}

export const researchStatusModel: { status: ResearchStatus; label: string; meaning: string }[] = [
  { status: 'proposed', label: 'Proposed', meaning: 'Concept under development.' },
  { status: 'upcoming', label: 'Upcoming', meaning: 'Approved for future work but not yet active.' },
  { status: 'recruiting', label: 'Recruiting', meaning: 'Participant or collaborator recruitment is active, where applicable.' },
  { status: 'in-progress', label: 'In progress', meaning: 'Active study or research activity.' },
  { status: 'data-analysis', label: 'Data analysis', meaning: 'Data collection complete, analysis underway.' },
  { status: 'manuscript-preparation', label: 'Manuscript preparation', meaning: 'Research completed, publication being prepared.' },
  { status: 'completed', label: 'Completed', meaning: 'Research activity completed.' },
  { status: 'published', label: 'Published', meaning: 'Output formally published.' },
  { status: 'archived', label: 'Archived', meaning: 'Retained for record but no longer active.' },
];

export function researchStatusLabel(status: ResearchStatus) {
  return researchStatusModel.find(s => s.status === status)?.label ?? status;
}

/** Map the ClinicalTrials.gov registry status onto the institute's research lifecycle. */
function lifecycleStatus(study: StudyRecord): ResearchStatus {
  switch (study.registryStatus) {
    case 'NOT_YET_RECRUITING':
      return 'upcoming';
    case 'RECRUITING':
      return 'recruiting';
    case 'ACTIVE_NOT_RECRUITING':
      return 'in-progress';
    case 'COMPLETED':
      return study.resultsPublications?.length ? 'published' : 'completed';
  }
}

export const registryStatusLabels: Record<RegistryStatus, string> = {
  RECRUITING: 'Recruiting',
  NOT_YET_RECRUITING: 'Not yet recruiting',
  ACTIVE_NOT_RECRUITING: 'Active, not recruiting',
  COMPLETED: 'Completed',
};

/** Library publications that report a tracked study's results. */
const resultPublications: Record<string, string[]> = {
  'sprint-intensive-blood-pressure-control': ['sprint-intensive-blood-pressure-control-2015'],
  'recovery-platform-trial': ['recovery-dexamethasone-covid-19-2021'],
};

export const researchRecords: ResearchRecord[] = studyRecords.map(study => ({
  ...study,
  status: lifecycleStatus(study),
  libraryPublications: resultPublications[study.slug] ?? [],
}));

export function getResearchForPublication(publicationSlug: string) {
  return researchRecords.filter(r => r.libraryPublications.includes(publicationSlug));
}

export const currentStatuses: ResearchStatus[] = ['recruiting', 'in-progress', 'data-analysis', 'manuscript-preparation'];
export const completedStatuses: ResearchStatus[] = ['completed', 'published'];
export const upcomingStatuses: ResearchStatus[] = ['proposed', 'upcoming'];

export function getResearchBySlug(slug: string) {
  return researchRecords.find(r => r.slug === slug);
}

export function getResearchByStatuses(statuses: ResearchStatus[]) {
  return researchRecords.filter(r => statuses.includes(r.status));
}

export function getResearchByDivision(divisionId: string) {
  return researchRecords.filter(r => r.divisions.includes(divisionId));
}

export function formatPhase(phase?: string) {
  if (!phase || phase === 'NA') return undefined;
  return phase
    .split(/[,|/]/)
    .map(p => p.trim().replace('EARLY_PHASE', 'Early phase ').replace('PHASE', 'Phase '))
    .join(' / ');
}

export const researchThemes = [
  {
    id: 'methods',
    title: 'Trial methods and research efficiency',
    description: 'How studies are designed, recruited and run - including platform trials and studies within a trial.',
    divisions: ['research', 'evidence-review-integrity'],
  },
  {
    id: 'cardiometabolic-infectious',
    title: 'Cardiometabolic and infectious disease',
    description: 'Clinical questions in common chronic and infectious conditions where trial evidence directly shapes care.',
    divisions: ['clinical-medicine', 'pharmacology-natural-products'],
  },
  {
    id: 'oral-systemic',
    title: 'Oral health and its links to general health',
    description: 'Periodontal and dental disease, prevention, and the relationship between oral and systemic health.',
    divisions: ['dentistry-oral-sciences', 'biomedical-sciences'],
  },
  {
    id: 'care-rehabilitation',
    title: 'Nursing care, rehabilitation and respiratory therapy',
    description: 'Interventions delivered by nurses and allied health professionals, from pulmonary rehabilitation to patient safety.',
    divisions: ['nursing-allied-health'],
  },
  {
    id: 'natural-products',
    title: 'Medicines and natural products',
    description: 'Pharmacological evaluation of established drugs and of compounds derived from natural sources.',
    divisions: ['pharmacology-natural-products'],
  },
  {
    id: 'mechanisms',
    title: 'Mechanisms, biomarkers and laboratory science',
    description: 'Physiological, molecular and laboratory work that explains disease and supports diagnosis.',
    divisions: ['biomedical-sciences', 'nursing-allied-health'],
  },
];
