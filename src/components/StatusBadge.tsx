import styles from './ui.module.css';

type Tone = 'green' | 'blue' | 'amber' | 'purple' | 'teal' | 'neutral';

const tones: Record<string, Tone> = {
  proposed: 'neutral',
  upcoming: 'purple',
  recruiting: 'green',
  'in-progress': 'blue',
  'data-analysis': 'blue',
  'manuscript-preparation': 'amber',
  completed: 'teal',
  published: 'teal',
  archived: 'neutral',
  'in-development': 'amber',
  'in-editing': 'amber',
};

export default function StatusBadge({ status, label }: { status: string; label: string }) {
  return <span className={`${styles.status} ${styles[`status_${tones[status] ?? 'neutral'}`]}`}>{label}</span>;
}
