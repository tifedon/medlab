import type { ReactNode } from 'react';
import styles from './ui.module.css';

/** Definition list for record metadata; entries without a value are hidden (blueprint: unverified fields stay hidden). */
export default function MetaList({ items }: { items: [string, ReactNode | undefined | null | false][] }) {
  return (
    <dl className={styles.metaList}>
      {items
        .filter(([, value]) => value !== undefined && value !== null && value !== false && value !== '')
        .map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
    </dl>
  );
}
