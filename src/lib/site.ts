export const siteConfig = {
  name: 'Sterling IMRES',
  fullName: 'Sterling Institute for Medical Research, Education and Sciences',
  shortCode: 'IMRES',
  press: 'Sterling IMRES Press',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  description:
    'A multidisciplinary institute advancing medical knowledge through rigorous research, evidence-based education, scientific integrity, scholarly publishing and clear scientific communication.',
  positioning:
    'Sterling IMRES is a multidisciplinary institute dedicated to advancing medical knowledge through rigorous research, evidence-based education, scientific integrity, scholarly publishing and clear scientific communication.',
  // Official mailboxes are a pending partner decision (blueprint §29). Structured
  // enquiries go through the contact form, which stores them for administrators.
  status: 'Working concept · October 2026',
};

export const LIBRARY_NOTICE =
  'This work was written and published by the people and publisher named here. It is listed in the Sterling IMRES reference library for study and citation. Sterling IMRES did not author or publish it, and listing a work does not mean its authors are affiliated with the institute.';

export const MEDICAL_DISCLAIMER =
  'Content on this website is for education and research communication. It is not individual medical advice, diagnosis or treatment. Speak to a qualified health professional about your own care.';
