import type { Division } from '@/lib/divisions';
import styles from './ui.module.css';

// Simple line glyphs per division, drawn on a 24px grid.
const glyphs: Record<string, React.ReactNode> = {
  research: <><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5M8.5 11h5M11 8.5v5" /></>,
  'clinical-medicine': <><path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" /><path d="M8 12h2l1-2 2 4 1-2h2" /></>,
  'dentistry-oral-sciences': <path d="M7 3c-2.2 0-4 1.8-4 4.2 0 2.7 1.2 4.3 1.8 6.6.5 2 .8 7.2 2.7 7.2 1.8 0 1.6-5 4.5-5s2.7 5 4.5 5c1.9 0 2.2-5.2 2.7-7.2.6-2.3 1.8-3.9 1.8-6.6C21 4.8 19.2 3 17 3c-2 0-3 1-5 1S9 3 7 3Z" />,
  'nursing-allied-health': <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M12 8v8M8 12h8" /></>,
  'pharmacology-natural-products': <><path d="m10.5 20.5-7-7a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7Z" /><path d="m8.5 8.5 7 7" /><path d="M17 3c2 1 3 3 3 5-2 0-4-1-5-3" /></>,
  'biomedical-sciences': <path d="M7 3c0 6 10 6 10 12s-10 0-10 6M17 3c0 6-10 6-10 12M9 6h6M9 18h6M8 12h8" />,
  'evidence-review-integrity': <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  'medical-illustration-visualization': <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  'editorial-publications': <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Z" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5M8 7h8M8 11h6" /></>,
};

export default function DivisionIcon({ division, size = 44 }: { division: Division; size?: number }) {
  return (
    <span className={styles.divisionIcon} style={{ width: size, height: size, background: division.colorLight, color: division.color }} aria-hidden="true">
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {glyphs[division.id]}
      </svg>
    </span>
  );
}
