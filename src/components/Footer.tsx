import Link from 'next/link';
import { BrandLogo } from './Icons';
import { divisions } from '@/lib/divisions';
import { legalLinks } from '@/lib/navigation';
import { MEDICAL_DISCLAIMER, siteConfig } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <BrandLogo size="md" />
            </div>
            <p className={styles.description}>{siteConfig.positioning}</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--navy-400)' }}>Have a question or proposal?</span>
              <Link href="/contact" className={styles.footerLink} style={{ color: 'var(--teal-600)', fontWeight: 500 }}>
                Contact Sterling IMRES
              </Link>
            </div>
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <h2 className={styles.columnTitle}>Institute</h2>
              <Link href="/about" className={styles.footerLink}>About</Link>
              <Link href="/about/mission" className={styles.footerLink}>Mission and vision</Link>
              <Link href="/about/governance" className={styles.footerLink}>Governance</Link>
              <Link href="/people" className={styles.footerLink}>People</Link>
              <Link href="/projects" className={styles.footerLink}>Projects</Link>
            </div>
            <div className={styles.column}>
              <h2 className={styles.columnTitle}>Knowledge</h2>
              <Link href="/research" className={styles.footerLink}>Research</Link>
              <Link href="/publications" className={styles.footerLink}>Publications</Link>
              <Link href="/books" className={styles.footerLink}>Books</Link>
              <Link href="/education" className={styles.footerLink}>Education</Link>
              <Link href="/insights" className={styles.footerLink}>Insights</Link>
            </div>
            <div className={styles.column}>
              <h2 className={styles.columnTitle}>Divisions</h2>
              {divisions.slice(0, 5).map(d => (
                <Link key={d.id} href={`/divisions/${d.id}`} className={styles.footerLink}>{d.shortName}</Link>
              ))}
              <Link href="/divisions" className={styles.footerLink}>All nine divisions</Link>
            </div>
            <div className={styles.column}>
              <h2 className={styles.columnTitle}>Practice</h2>
              <Link href="/scientific-integrity" className={styles.footerLink}>Scientific integrity</Link>
              <Link href="/medical-illustration" className={styles.footerLink}>Medical illustration</Link>
              <Link href="/collaborate" className={styles.footerLink}>Collaborate</Link>
              <Link href="/search" className={styles.footerLink}>Search</Link>
              <Link href="/privacy" className={styles.footerLink}>Privacy</Link>
              <Link href="/terms" className={styles.footerLink}>Terms</Link>
            </div>
          </div>
        </div>




      </div>
    </footer>
  );
}
