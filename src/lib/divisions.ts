export type DivisionId =
  | 'research'
  | 'clinical-medicine'
  | 'dentistry-oral-sciences'
  | 'nursing-allied-health'
  | 'pharmacology-natural-products'
  | 'biomedical-sciences'
  | 'evidence-review-integrity'
  | 'medical-illustration-visualization'
  | 'editorial-publications';

export interface Division {
  id: DivisionId;
  name: string;
  shortName: string;
  kind: 'division' | 'unit';
  color: string;
  colorLight: string;
  role: string;
  overview: string;
  keyAreas: string[];
  educationFocus: string[];
  collaboration: string[];
}

export const divisions: Division[] = [
  {
    id: 'research',
    name: 'Research Division',
    shortName: 'Research',
    kind: 'division',
    color: '#0d7377',
    colorLight: '#e0f5f5',
    role: 'Research design, methodology, multidisciplinary programs and research coordination.',
    overview:
      'The Research Division is the methodological home of the institute. It supports study design, protocol development, statistical planning and the coordination of multidisciplinary programmes so that work across every division meets a shared standard of rigour.',
    keyAreas: ['Study design and protocols', 'Biostatistics and data analysis', 'Clinical trial methodology', 'Research ethics and registration', 'Implementation and mixed-methods research', 'Research coordination'],
    educationFocus: ['Research methodology', 'Protocol writing', 'Statistics for clinicians'],
    collaboration: ['Co-design of multidisciplinary studies', 'Methodological and statistical review of protocols', 'Studies within a trial (SWATs) and trial-process research'],
  },
  {
    id: 'clinical-medicine',
    name: 'Clinical Medicine Division',
    shortName: 'Clinical Medicine',
    kind: 'division',
    color: '#1b4f8a',
    colorLight: '#e6eef8',
    role: 'Clinical science, disease-focused scholarship, clinical education and medically reviewed content.',
    overview:
      'The Clinical Medicine Division brings clinical science and disease-focused scholarship together with clinical education. It provides the medical review that clinically sensitive material on the platform requires before publication.',
    keyAreas: ['Cardiometabolic disease', 'Infectious disease', 'Internal medicine reviews', 'Appraisal of clinical guidelines', 'Clinical education', 'Medical review of published content'],
    educationFocus: ['Evidence-based clinical practice', 'Interpreting clinical trials', 'Clinical case-based learning'],
    collaboration: ['Clinical review of educational and published material', 'Disease-focused review articles', 'Clinical input into research protocols'],
  },
  {
    id: 'dentistry-oral-sciences',
    name: 'Dentistry and Oral Sciences Division',
    shortName: 'Dentistry',
    kind: 'division',
    color: '#2f7d6d',
    colorLight: '#e5f4f0',
    role: 'Oral health, dental science, dental education and related research.',
    overview:
      'The Dentistry and Oral Sciences Division covers oral health, dental science and dental education. It connects oral disease research with its links to general health and with the training of dental professionals.',
    keyAreas: ['Periodontology', 'Cariology and preventive dentistry', 'Oral medicine and pathology', 'Oral health epidemiology', 'Oral–systemic health', 'Dental education'],
    educationFocus: ['Evidence-based dentistry', 'Oral health promotion', 'Dental research methods'],
    collaboration: ['Oral health research and reviews', 'Dental education resources', 'Illustrated dental reference material'],
  },
  {
    id: 'nursing-allied-health',
    name: 'Nursing and Allied Health Division',
    shortName: 'Nursing & Allied Health',
    kind: 'division',
    color: '#8a4b9c',
    colorLight: '#f4ebf7',
    role: 'Nursing, respiratory therapy, rehabilitation, laboratory and allied health perspectives.',
    overview:
      'The Nursing and Allied Health Division represents the professions that deliver much of everyday care: nursing, respiratory therapy, rehabilitation, laboratory science and other allied health fields. It ensures their evidence and perspectives shape institutional work.',
    keyAreas: ['Nursing practice and patient safety', 'Respiratory therapy', 'Rehabilitation and physiotherapy', 'Medical laboratory science', 'Interprofessional education', 'Quality of care'],
    educationFocus: ['Nursing research literacy', 'Respiratory care', 'Interprofessional practice'],
    collaboration: ['Practice-based research with nursing and allied health teams', 'Handbooks and clinical skills resources', 'Interprofessional education projects'],
  },
  {
    id: 'pharmacology-natural-products',
    name: 'Pharmacology and Natural Products Division',
    shortName: 'Pharmacology',
    kind: 'division',
    color: '#b5651d',
    colorLight: '#fbf0e4',
    role: 'Pharmacology, therapeutics, natural products and medication-related research.',
    overview:
      'The Pharmacology and Natural Products Division studies how medicines act and how they are used safely. Its scope includes therapeutics, medication safety and the evaluation of natural products as sources of new drugs.',
    keyAreas: ['Clinical pharmacology', 'Therapeutics', 'Natural product drug discovery', 'Pharmacovigilance and medication safety', 'Ethnopharmacology', 'Antimicrobial stewardship'],
    educationFocus: ['Principles of pharmacology', 'Medication safety', 'Evaluating natural product evidence'],
    collaboration: ['Natural product and pharmacology research', 'Medication safety reviews', 'Pharmacology teaching resources'],
  },
  {
    id: 'biomedical-sciences',
    name: 'Biomedical Sciences Division',
    shortName: 'Biomedical Sciences',
    kind: 'division',
    color: '#a23b52',
    colorLight: '#f9e8ec',
    role: 'Physiology, pathology, molecular mechanisms, anatomy and laboratory sciences.',
    overview:
      'The Biomedical Sciences Division covers the scientific foundations of medicine: physiology, pathology, molecular mechanisms, anatomy and the laboratory sciences that connect them to diagnosis.',
    keyAreas: ['Physiology', 'Pathology', 'Molecular and cell biology', 'Human anatomy', 'Immunology', 'Laboratory diagnostics'],
    educationFocus: ['Foundations of physiology', 'Mechanisms of disease', 'Laboratory science'],
    collaboration: ['Mechanistic and laboratory research', 'Biomedical reference works', 'Scientific figures with the illustration unit'],
  },
  {
    id: 'evidence-review-integrity',
    name: 'Evidence Review and Scientific Integrity Division',
    shortName: 'Evidence & Integrity',
    kind: 'division',
    color: '#3d5a80',
    colorLight: '#e9eef5',
    role: 'Systematic review, critical appraisal, reproducibility, standards and research integrity.',
    overview:
      'The Evidence Review and Scientific Integrity Unit sets and checks the standards that the rest of the institute works to. It conducts systematic reviews, appraises evidence, and handles reporting standards, reproducibility, corrections and research integrity.',
    keyAreas: ['Systematic reviews and meta-analysis', 'Critical appraisal', 'Certainty of evidence (GRADE)', 'Reporting standards', 'Reproducibility', 'Research integrity and corrections'],
    educationFocus: ['Systematic review methods', 'Critical appraisal', 'Responsible research conduct'],
    collaboration: ['Systematic and rapid reviews', 'Methodological peer review', 'Integrity and corrections enquiries'],
  },
  {
    id: 'medical-illustration-visualization',
    name: 'Medical Illustration and Visualization Division',
    shortName: 'Illustration',
    kind: 'division',
    color: '#c0577a',
    colorLight: '#fbeaf0',
    role: 'Anatomical illustration, scientific figures, visual abstracts and educational diagrams.',
    overview:
      'The Medical Illustration and Visualization Unit treats visual communication as a scientific capability. It produces and reviews anatomical illustration, publication figures, visual abstracts and educational diagrams, and keeps track of image licensing and attribution.',
    keyAreas: ['Anatomical illustration', 'Scientific figures', 'Visual abstracts', 'Educational diagrams', 'Data visualisation', 'Image licensing and attribution'],
    educationFocus: ['Designing scientific figures', 'Visual abstracts', 'Licensing and attribution'],
    collaboration: ['Publication figures and visual abstracts', 'Illustrated atlases and learning books', 'Educational diagram series'],
  },
  {
    id: 'editorial-publications',
    name: 'Editorial and Publications Division',
    shortName: 'Editorial',
    kind: 'division',
    color: '#5b6b2f',
    colorLight: '#f0f3e4',
    role: 'Books, journals, reports, editorial standards, peer review and publishing operations.',
    overview:
      'The Editorial and Publications Division runs the publishing arm of the institute, including the proposed Sterling IMRES Press. It manages editorial standards, peer review, authorship policy, metadata and distribution.',
    keyAreas: ['Book publishing (Sterling IMRES Press)', 'Peer review', 'Editorial standards', 'Authorship and contributorship', 'Publication ethics', 'Metadata and distribution'],
    educationFocus: ['Scientific writing', 'Peer review practice', 'Publishing ethics'],
    collaboration: ['Authoring or editing a book or monograph', 'Peer review and copyediting', 'Institutional reports and standards'],
  },
];

export function getDivisionById(id: string): Division | undefined {
  return divisions.find(d => d.id === id);
}

export function divisionName(id: string): string {
  return getDivisionById(id)?.shortName ?? id.replace(/-/g, ' ');
}
