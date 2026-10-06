import type { ReactNode } from 'react';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import styles from './ui.module.css';

interface PageHeroProps {
  kicker: string;
  title: string;
  lead?: ReactNode;
  breadcrumbs?: Crumb[];
  stats?: { value: string | number; label: string }[];
  actions?: ReactNode;
  children?: ReactNode;
}

export default function PageHero({ kicker, title, lead, breadcrumbs, stats, actions, children }: PageHeroProps) {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroInner}>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <span className={styles.kicker}>{kicker}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          {lead && <p className={styles.heroLead}>{lead}</p>}
          {actions && <div className={styles.heroActions}>{actions}</div>}
          {children}
          {stats && (
            <div className={styles.heroStats}>
              {stats.map(stat => (
                <div key={stat.label} className={styles.heroStat}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
