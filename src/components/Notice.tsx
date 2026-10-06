import type { ReactNode } from 'react';
import { AlertCircleIcon, InfoIcon } from './Icons';
import styles from './ui.module.css';

export default function Notice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'caution' }) {
  return (
    <div className={`${styles.notice} ${tone === 'caution' ? styles.noticeAmber : ''}`} role="note">
      {tone === 'caution' ? <AlertCircleIcon size={18} /> : <InfoIcon size={18} />}
      <div>{children}</div>
    </div>
  );
}
