import Link from 'next/link';
import { insightCategoryLabels, type Insight } from '@/lib/insights';
import { formatDate } from '@/lib/format';
import styles from './ui.module.css';

export default function ArticleCard({ insight }: { insight: Insight }) {
  return (
    <article className={styles.listItem}>
      <div className={styles.listItemMain}>
        <div className={styles.listItemTop}>
          <span className={styles.label}>{insightCategoryLabels[insight.category]}</span>
        </div>
        <h3 className={styles.listItemTitle}>
          <Link href={`/insights/${insight.slug}`}>{insight.title}</Link>
        </h3>
        <p className={styles.listItemByline}>
          {insight.authorSlug ? <Link href={`/people/${insight.authorSlug}`}>{insight.author}</Link> : insight.author}
        </p>
        <p className={styles.listItemText}>{insight.excerpt}</p>
      </div>
      <div className={styles.listItemRight}>
        {formatDate(insight.publishedDate)}
      </div>
    </article>
  );
}
