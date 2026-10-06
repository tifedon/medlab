import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRightIcon,
  BookmarkIcon,
  FileTextIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@/components/Icons';
import { publications, researchRecords, divisions } from '@/lib/data';
import { publicationTypeLabels } from '@/lib/publications';
import { requireRole } from '@/lib/auth';
import { signOut } from '@/app/auth/actions';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'My research account',
  description: 'The Sterling IMRES workspace for research readers and approved contributors.',
};

export const dynamic = 'force-dynamic';

export default async function UserPage() {
  const identity = await requireRole('user');
  const recommendedPapers = publications.slice(0, 3);
  const displayName = identity.fullName || identity.email.split('@')[0] || 'Research reader';

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">

          <div className={styles.heroGrid}>
            <div>
              <h1>Welcome, {displayName}</h1>
              <p>Follow research, publications and books across the nine Sterling IMRES divisions in one place.</p>
            </div>
            <form action={signOut}>
              <button className={styles.signOutButton} type="submit">Sign out</button>
            </form>
          </div>
        </div>
      </section>

      <div className={`container ${styles.workspace}`}>
        <aside className={styles.sidebar}>


          <nav className={styles.accountNav} aria-label="Account navigation">
            <Link href="/user" className={styles.activeNav}><UserIcon size={17} /> Overview</Link>
            <Link href="/research"><BookmarkIcon size={17} /> Research library</Link>
            <Link href="/publications"><FileTextIcon size={17} /> Publications</Link>
          </nav>
        </aside>

        <main className={styles.mainColumn}>
          <section className={styles.accessGrid} aria-label="Account access summary">
            <div className={styles.accessCard}>
              <span>Research access</span>
              <strong>{publications.length} publications · {researchRecords.length} studies</strong>
              <p>Browse verified works and registered studies across every division.</p>
              <Link href="/research">Explore evidence <ArrowRightIcon size={15} /></Link>
            </div>
            <div className={styles.accessCard}>
              <span>Division coverage</span>
              <strong>{divisions.length} divisions and units</strong>
              <p>From research methods and clinical medicine to illustration and publishing.</p>
              <Link href="/divisions">View divisions <ArrowRightIcon size={15} /></Link>
            </div>
            <div className={`${styles.accessCard} ${styles.permissionCard}`}>
              <span>Publishing permission</span>
              <strong>{identity.canUpload ? 'Upload enabled' : 'Approval required'}</strong>
              <p>
                {identity.canUpload
                  ? 'Your login ID is approved to submit research records.'
                  : 'Only administrators and approved contributors can upload papers.'}
              </p>
              <Link href={identity.canUpload ? '/publications' : '/contact'}>
                {identity.canUpload ? 'Open contributor tools' : 'Request contributor access'} <ArrowRightIcon size={15} />
              </Link>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div><span className={styles.sectionKicker}>Evidence briefing</span><h2>Recommended research</h2></div>
              <Link href="/research">View full library</Link>
            </div>
            <div className={styles.paperList}>
              {recommendedPapers.map((paper, index) => (
                <Link href={`/publications/${paper.slug}`} className={styles.paperCard} key={paper.slug}>
                  <span className={styles.paperIndex}>0{index + 1}</span>
                  <div>
                    <span className={styles.paperMeta}>{publicationTypeLabels[paper.type]} · {paper.openAccess ? 'Open access' : 'Subscription'}</span>
                    <h3>{paper.title}</h3>
                    <p>{paper.journal} · {paper.publishedDate.slice(0, 4)}</p>
                  </div>
                  <ArrowRightIcon size={18} />
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
