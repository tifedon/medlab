import Link from 'next/link';
import {
  divisions,
  getResearchByDivision,
  getResearchByStatuses,
  currentStatuses,
  upcomingStatuses,
  researchRecords,
} from '@/lib/data';
import DivisionCard from '@/components/DivisionCard';
import ResearchCard from '@/components/ResearchCard';
import SectionHeader from '@/components/SectionHeader';
import CTASection from '@/components/CTASection';
import ui from '@/components/ui.module.css';
import { siteConfig } from '@/lib/site';
import HomeClient from './HomeClient';
import styles from './page.module.css';

export default function HomePage() {
  const featuredResearch = getResearchByStatuses(currentStatuses).slice(0, 3);
  const upcomingResearch = getResearchByStatuses(upcomingStatuses).length;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>

          <h1 className={styles.heroTitle}>
            Medical research, education{' '}<br />and publishing in one institute
          </h1>
          <p className={styles.heroSubtitle}>
            Sterling IMRES is a comprehensive medical institute bringing together clinical research, scientific education, and scholarly publishing into a unified, evidence-based platform.
          </p>
          <HomeClient />

        </div>
      </section>

      <section className={styles.divisionsSection}>
        <div className="container">

          <div className="division-grid">
            {divisions.map(division => (
              <DivisionCard
                key={division.id}
                division={division}
                counts={[
                  { label: 'studies', value: getResearchByDivision(division.id).length },
                ]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={ui.section}>
        <div className="container">
          <SectionHeader
            kicker="Research watch"
            title="Current research"
            lead={`Registered studies that are recruiting or in progress, with ${upcomingResearch} more due to start.`}
            link={{ href: '/research/current', label: 'All current research' }}
          />
          <div className={ui.flatList}>
            {featuredResearch.map(study => <ResearchCard key={study.slug} study={study} />)}
          </div>
        </div>
      </section>

      <section className={styles.resourcesSection}>
        <div className="container">
          <SectionHeader kicker="Capabilities" title="Education, integrity and visualisation" />
          <div className={styles.resourceGrid}>

            <Link href="/scientific-integrity" className={styles.resourceCard}>
              <span className={styles.resourceLabel}>Scientific integrity</span>
              <h3>Standards for trustworthy records</h3>
              <p>Evidence review, reporting standards, corrections and editorial policy.</p>
            </Link>
            <Link href="/medical-illustration" className={styles.resourceCard}>
              <span className={styles.resourceLabel}>Medical illustration</span>
              <h3>Visual communication as a science</h3>
              <p>Anatomical illustration, figures and visual abstracts, correctly licensed.</p>
            </Link>
            <Link href="/collaborate" className={styles.resourceCard}>
              <span className={styles.resourceLabel}>Collaborate</span>
              <h3>Work with the institute</h3>
              <p>Research, academic, clinical, editorial, review, illustration and education.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className={ui.section}>
        <div className="container">
          <SectionHeader kicker="Account & Privacy" title="Why we ask you to sign in" />
          <div style={{ maxWidth: '800px', fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--navy-800)', marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1.25rem' }}>
              Sterling IMRES provides open access to our research directory and publications. However, we offer verified accounts for researchers, clinicians, and institutional partners who need to collaborate on active studies, submit publications to Sterling IMRES Press, or access restricted educational resources.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              When you sign in using your Google account, we request access to your basic profile information (such as your name and email address). This data is strictly used to authenticate your identity, determine your upload access permissions within our workspaces, and ensure scientific integrity across all contributions to the institute.
            </p>
            <p>
              We are committed to protecting your data. For full details on how we collect, use, and safeguard your information, please read our <Link href="/privacy" style={{ color: 'var(--teal-600)', fontWeight: 500, textDecoration: 'underline' }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className={`${ui.section} ${ui.sectionLast}`}>
        <div className="container">
          <CTASection
            title="Contribute to Sterling IMRES"
            text="Researchers, clinicians, dentists, nurses, pharmacologists, biomedical scientists, editors, illustrators and educators can propose research, reviews and teaching."
            actions={
              <>
                <Link href="/collaborate" className="btn btn--primary btn--lg">Collaborate</Link>
                <Link href="/contact" className="btn btn--dark btn--lg">Contact us</Link>
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
