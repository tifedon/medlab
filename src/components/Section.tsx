import type { ReactNode } from 'react';
import styles from './ui.module.css';

/** Page section inside the standard container. `last` adds bottom spacing before the footer. */
export default function Section({ children, last, id, labelledBy }: { children: ReactNode; last?: boolean; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${styles.section} ${last ? styles.sectionLast : ''}`}>
      <div className="container">{children}</div>
    </section>
  );
}
