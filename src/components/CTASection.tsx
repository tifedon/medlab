import type { ReactNode } from 'react';
import styles from './ui.module.css';

export default function CTASection({ title, text, actions }: { title: string; text: ReactNode; actions: ReactNode }) {
  return (
    <div className={styles.cta}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className={styles.heroActions}>{actions}</div>
    </div>
  );
}
