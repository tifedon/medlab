import Link from 'next/link';
import {
  divisions,
  getResearchByDivision,
  getResearchByStatuses,
  currentStatuses,
  upcomingStatuses,
  publications,
  researchRecords,
  teamMembers,
} from '@/lib/data';
import { bookCategoryLabels } from '@/lib/books';
import { publicationTypeLabels } from '@/lib/publications';
import { researchStatusLabel } from '@/lib/research';
import { getCatalogueBooks } from '@/lib/press-catalogue';
import DivisionCard from '@/components/DivisionCard';
import ResearchCard from '@/components/ResearchCard';
import SectionHeader from '@/components/SectionHeader';
import CTASection from '@/components/CTASection';
import ui from '@/components/ui.module.css';
import HomeClient, { type HomeSearchSuggestion } from './HomeClient';
import styles from './page.module.css';

const searchText = (...fields: (string | undefined | string[])[]) => fields.flat().filter(Boolean).join(' ');

export default async function HomePage() {
  const books = await getCatalogueBooks();
  const featuredResearch = getResearchByStatuses(currentStatuses).slice(0, 3);
  const upcomingResearch = getResearchByStatuses(upcomingStatuses).length;
  const searchSuggestions: HomeSearchSuggestion[] = [
    ...researchRecords.map(record => ({
      id: `research-${record.slug}`,
      title: record.title,
      description: `${researchStatusLabel(record.status)} · ${record.nctId}`,
      kind: 'Research' as const,
      href: `/research/${record.slug}`,
      searchText: searchText(
        record.title,
        record.officialTitle,
        record.nctId,
        record.summary,
        record.sponsor,
        record.status,
        record.conditions,
        record.interventions,
        record.divisions,
        record.investigators?.map(investigator => investigator.name),
      ),
    })),
    ...publications.map(publication => ({
      id: `publication-${publication.slug}`,
      title: publication.title,
      description: `${publicationTypeLabels[publication.type]} · ${publication.journal}`,
      kind: 'Publications' as const,
      href: `/research/publications/${publication.slug}`,
      searchText: searchText(
        publication.title,
        publication.summary,
        publication.journal,
        publication.publisher,
        publication.type,
        publication.doi,
        publication.pmid,
        publication.pmcid,
        publication.keywords,
        publication.divisions,
        publication.corporateAuthor,
        publication.authors.map(author => author.name),
      ),
    })),
    ...books.map(book => ({
      id: `book-${book.slug}`,
      title: book.title,
      description: `${bookCategoryLabels[book.category]} · ${book.publisher}`,
      kind: 'Books' as const,
      href: `/books/${book.slug}`,
      searchText: searchText(
        book.title,
        book.subtitle,
        book.summary,
        book.publisher,
        book.category,
        book.isbn13,
        book.keywords,
        book.divisions,
        book.authors.map(author => author.name),
        book.editors.map(editor => editor.name),
      ),
    })),
    ...teamMembers.map(member => ({
      id: `person-${member.slug}`,
      title: member.name,
      description: `${member.title} · ${member.specialty}`,
      kind: 'People' as const,
      href: `/people/${member.slug}`,
      searchText: searchText(
        member.name,
        member.title,
        member.specialty,
        member.degrees,
        member.biography,
        member.expertise,
        member.researchInterests,
        member.divisions,
      ),
    })),
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>

          <h1 className={styles.heroTitle}>
            Medical research, education and publishing in one institute
          </h1>
          <p className={styles.heroSubtitle}>
            Sterling IMRES is a comprehensive medical institute bringing together clinical research, scientific education, and scholarly publishing into a unified, evidence-based platform.
          </p>
          <HomeClient suggestions={searchSuggestions} />

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
            link={{ href: '/research?stage=current', label: 'All current research' }}
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
          <div className={styles.accountCopy}>
            <p>
              Sterling IMRES provides open access to our research directory and publications. However, we offer verified accounts for researchers, clinicians, and institutional partners who need to collaborate on active studies, submit publications to Sterling IMRES Press, or access restricted educational resources.
            </p>
            <p>
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
