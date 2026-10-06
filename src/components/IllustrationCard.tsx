import Link from 'next/link';
import { illustrationCategoryLabels, type Illustration } from '@/lib/illustrations';
import styles from './ui.module.css';

export default function IllustrationCard({ illustration: i }: { illustration: Illustration }) {
  return (
    <article className={`${styles.card} ${styles.figure}`}>
      <div className={styles.figureImage}>
        {/* Served from Wikimedia Commons under the licence shown. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={i.imageUrl} alt={i.title} loading="lazy" width={i.width} height={i.height} />
      </div>
      <div className={styles.figureBody}>
        <div className={styles.cardTop}>
          <span className={styles.label}>{illustrationCategoryLabels[i.category]}</span>
        </div>
        <h3 className={styles.cardTitle}>
          <Link href={`/medical-illustration/${i.slug}`}>{i.title}</Link>
        </h3>
        <div className={styles.cardMeta}>
          <span>{i.creator}</span>
          <span>{i.license}</span>
        </div>
      </div>
    </article>
  );
}
