import { resourceRecords } from '@/data/media';

export interface LearningResource {
  slug: string;
  title: string;
  provider: string;
  kind: 'course' | 'handbook' | 'guideline' | 'toolkit' | 'database' | 'textbook';
  access: string;
  format: string;
  description: string;
  url: string;
  divisions: string[];
}

export interface PlannedProgramme {
  slug: string;
  title: string;
  format: 'course' | 'workshop';
  status: 'in-development' | 'upcoming';
  audience: string;
  description: string;
  outcomes: string[];
  divisions: string[];
  /** Paths of library records the programme is built around. */
  buildsOn: string[];
}

export const learningResources: LearningResource[] = resourceRecords;

/**
 * Programmes the institute intends to offer. None are enrolling yet, and none
 * lead to an accredited award or certification (blueprint §16).
 */
export const programmes: PlannedProgramme[] = [
  {
    slug: 'research-methodology-foundations',
    title: 'Foundations of research methodology',
    format: 'course',
    status: 'in-development',
    audience: 'Clinicians, students and allied health professionals starting research',
    description: 'From a clinical question to a registered protocol: study designs, bias, sample size, ethics and registration.',
    outcomes: ['Frame a structured research question', 'Choose a study design that fits the question', 'Write and register a protocol'],
    divisions: ['research', 'clinical-medicine'],
    buildsOn: ['/books/designing-clinical-research-5th-edition', '/books/modern-epidemiology-4th-edition', '/publications/hernan-robins-target-trial-emulation-2016', '/publications/riley-sample-size-clinical-prediction-model-2020'],
  },
  {
    slug: 'evidence-based-practice',
    title: 'Evidence-based practice and critical appraisal',
    format: 'course',
    status: 'in-development',
    audience: 'Clinicians, dentists, nurses and pharmacists',
    description: 'How to find, appraise and apply evidence, including risk-of-bias tools and certainty-of-evidence ratings.',
    outcomes: ['Appraise trials and systematic reviews', 'Interpret GRADE certainty ratings', 'Apply evidence to a clinical decision'],
    divisions: ['evidence-review-integrity', 'clinical-medicine', 'nursing-allied-health'],
    buildsOn: ['/books/cochrane-handbook-systematic-reviews-interventions-2e', '/publications/rob-2-risk-of-bias-tool-randomised-trials', '/publications/grade-guidelines-1-evidence-profiles-summary-of-findings', '/publications/amstar-2-critical-appraisal-tool-systematic-reviews'],
  },
  {
    slug: 'scientific-writing-publishing',
    title: 'Scientific writing and publishing',
    format: 'course',
    status: 'in-development',
    audience: 'Early-career researchers and prospective authors',
    description: 'Structuring a manuscript, using reporting guidelines, authorship and the peer-review process.',
    outcomes: ['Structure a manuscript to a reporting guideline', 'Apply authorship criteria', 'Respond constructively to peer review'],
    divisions: ['editorial-publications', 'research'],
    buildsOn: ['/books/how-to-write-and-publish-a-scientific-paper-9e', '/books/ama-manual-of-style-11e', '/publications/consort-2025-statement-reporting-randomised-trials', '/publications/peer-review-flawed-process-heart-of-science'],
  },
  {
    slug: 'biomedical-foundations',
    title: 'Biomedical foundations for clinical learners',
    format: 'course',
    status: 'upcoming',
    audience: 'Students in medicine, dentistry, nursing and allied health',
    description: 'Physiology, pathology and pharmacology principles linked to clinical reasoning through illustrated cases.',
    outcomes: ['Explain core physiological control systems', 'Link mechanisms of disease to presentation', 'Relate drug action to mechanism'],
    divisions: ['biomedical-sciences', 'pharmacology-natural-products'],
    buildsOn: ['/books/guyton-hall-textbook-medical-physiology-15e', '/books/robbins-kumar-basic-pathology-11e', '/books/rang-dales-pharmacology-10e'],
  },
  {
    slug: 'oral-health-evidence',
    title: 'Evidence-based dentistry',
    format: 'course',
    status: 'upcoming',
    audience: 'Dentists, dental therapists and dental students',
    description: 'Appraising evidence on caries, periodontal disease and oral–systemic links for everyday dental decisions.',
    outcomes: ['Appraise dental trials and reviews', 'Use current periodontal classification', 'Communicate evidence to patients'],
    divisions: ['dentistry-oral-sciences', 'evidence-review-integrity'],
    buildsOn: ['/publications/staging-grading-periodontitis-framework-2018', '/publications/efp-s3-guideline-stage-i-iii-periodontitis-2020', '/books/lindhes-clinical-periodontology-and-implant-dentistry-7th-edition'],
  },
  {
    slug: 'medical-illustration-for-scientists',
    title: 'Medical illustration and scientific figures',
    format: 'course',
    status: 'upcoming',
    audience: 'Researchers, educators and illustrators',
    description: 'Principles of clear scientific figures, anatomical accuracy and correct licensing and attribution of images.',
    outcomes: ['Design a clear, accurate figure', 'Choose and attribute openly licensed images', 'Review figures for scientific accuracy'],
    divisions: ['medical-illustration-visualization'],
    buildsOn: ['/publications/ten-simple-rules-for-better-figures', '/publications/misuse-of-colour-in-science-communication', '/books/netter-atlas-of-human-anatomy-8e', '/medical-illustration/gallery'],
  },
  {
    slug: 'systematic-review-workshop',
    title: 'Systematic review protocol workshop',
    format: 'workshop',
    status: 'in-development',
    audience: 'Review teams preparing a protocol',
    description: 'A practical workshop that takes a review team from question to a PROSPERO-ready protocol and PRISMA-compliant plan.',
    outcomes: ['Draft eligibility criteria and a search strategy', 'Plan risk-of-bias and synthesis methods', 'Prepare protocol registration'],
    divisions: ['evidence-review-integrity', 'research'],
    buildsOn: ['/books/cochrane-handbook-systematic-reviews-interventions-2e', '/publications/prisma-2020-statement-reporting-systematic-reviews', '/books/introduction-to-meta-analysis-2e'],
  },
  {
    slug: 'visual-abstract-workshop',
    title: 'Visual abstract workshop',
    format: 'workshop',
    status: 'upcoming',
    audience: 'Authors and editors',
    description: 'Turning a study’s key question, method and result into an accurate single-panel visual summary.',
    outcomes: ['Identify the one finding to show', 'Lay out a visual abstract', 'Check it against the paper for accuracy'],
    divisions: ['medical-illustration-visualization', 'editorial-publications'],
    buildsOn: ['/publications/visual-abstracts-disseminate-research-social-media', '/publications/visual-abstracts-triple-crossover-trial-dissemination'],
  },
  {
    slug: 'peer-review-workshop',
    title: 'Peer review in practice',
    format: 'workshop',
    status: 'upcoming',
    audience: 'Researchers new to reviewing',
    description: 'What editors need from reviewers, how to structure a review, and the ethical duties of reviewers.',
    outcomes: ['Structure a constructive review', 'Recognise reporting and integrity problems', 'Apply confidentiality and conflict-of-interest rules'],
    divisions: ['editorial-publications', 'evidence-review-integrity'],
    buildsOn: ['/publications/innovations-in-peer-review-multidisciplinary-perspective', '/publications/peer-review-flawed-process-heart-of-science', '/publications/potential-predatory-vs-legitimate-biomedical-journals'],
  },
];

export function getProgrammeBySlug(slug: string) {
  return programmes.find(p => p.slug === slug);
}

export function getProgrammesByDivision(divisionId: string) {
  return programmes.filter(p => p.divisions.includes(divisionId));
}

export function getResourcesByDivision(divisionId: string) {
  return learningResources.filter(r => r.divisions.includes(divisionId));
}
