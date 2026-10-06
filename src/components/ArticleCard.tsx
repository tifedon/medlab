import Link from 'next/link';
import { insightCategoryLabels, type Insight } from '@/lib/insights';
import { formatDate } from '@/lib/format';
import styles from './ui.module.css';

export default function ArticleCard({ insight }: { insight: Insight }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.label}>{insightCategoryLabels[insight.category]}</span>
      </div>
      <h3 className={styles.cardTitle}>
        <Link href={`/insights/${insight.slug}`}>{insight.title}</Link>
      </h3>
      <p className={styles.cardText}>{insight.excerpt}</p>
      <div className={styles.cardMeta}>
        <span>{insight.author}</span>
        <span>{formatDate(insight.publishedDate)}</span>
        <span>{insight.readTime} min read</span>
      </div>
    </article>
  );
}
