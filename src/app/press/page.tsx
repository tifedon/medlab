import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Sterling IMRES Press',
  description: 'The scholarly publishing arm of the Sterling Institute for Medical Research, Education and Sciences (Sterling IMRES).',
  alternates: { canonical: '/press' },
};

export default function PressPage() {
  return (
    <div>
      <PageHero
        kicker="Publishing"
        title="About Sterling IMRES Press"
        lead="The scholarly publishing arm of the Sterling Institute for Medical Research, Education and Sciences."
        breadcrumbs={[{ label: 'Sterling IMRES Press' }]}
      />
      
      <Section last>
        <div className={ui.editorialFeature}>
          <h2>Publishing with purpose</h2>
          <div className={ui.editorialCopy}>
          <p>
            Sterling IMRES Press is the scholarly publishing arm of the Sterling Institute for Medical Research, Education and Sciences (Sterling IMRES).
          </p>
          
          <p>
            Sterling IMRES is a multidisciplinary medical research and education institute whose broader work spans medical research, clinical sciences, dentistry, nursing and allied health, pharmacology, biomedical sciences, evidence review, scientific integrity, medical visualization, and scholarly communication.
          </p>
          
          <p>
            Within this wider institutional structure, Sterling IMRES Press operates under the Editorial and Publications Division and is responsible for the development, editorial review, publication, and distribution of books and other scholarly resources produced by or associated with the Institute.
          </p>
          
          <p>
            The Press supports the Institute’s research and educational mission by transforming medical and scientific knowledge into professionally developed publications for students, healthcare professionals, researchers, educators, and institutions.
          </p>
          
          <p>
            Its publishing program may include medical reference works, encyclopedias, textbooks, clinical handbooks, scientific monographs, research methodology books, evidence-based medicine resources, biomedical science titles, nursing and allied health publications, pharmacology resources, medical atlases, visual learning materials, research reports, evidence reviews, technical reports, and other scholarly works.
          </p>
          
          <p>
            Sterling IMRES Press works with physicians, researchers, scientists, pharmacists, nurses, allied health professionals, evidence reviewers, medical illustrators, editors, and other specialists according to the needs of each publication.
          </p>
          
          <p>
            The Press is committed to responsible authorship, scientific integrity, appropriate specialist review, evidence-based content, accurate referencing, professional editing, and high publication standards.
          </p>
          
          <p>
            Its role is not to define the whole of Sterling IMRES, but to serve as the Institute’s dedicated publication and scholarly communication wing.
          </p>
          </div>
        </div>

          <div className={ui.institutionalSignature}>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--teal-700)' }}>Sterling IMRES Press</p>
            <p style={{ margin: '0.25rem 0', color: 'var(--navy-700)' }}>Editorial and Publications Division</p>
            <p style={{ margin: '0.25rem 0', color: 'var(--navy-700)' }}>Sterling Institute for Medical Research, Education and Sciences</p>
            <p style={{ margin: '0.25rem 0', color: 'var(--navy-700)' }}>
              Website: <a href="https://sterlingimres.com" style={{ color: 'var(--teal-600)', textDecoration: 'none', fontWeight: 500 }}>sterlingimres.com</a>
            </p>
          </div>
      </Section>
    </div>
  );
}
