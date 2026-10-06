import type { ReactNode } from 'react';
import styles from './ui.module.css';

export default function EmptyState({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className={styles.empty}>
      <h3>{title}</h3>
      <p>{children}</p>
      {actions && <div className={styles.heroActions}>{actions}</div>}
    </div>
  );
}
