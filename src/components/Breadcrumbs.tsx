import Link from 'next/link';
import JsonLd from './JsonLd';
import { siteConfig } from '@/lib/site';
import styles from './ui.module.css';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ label: 'Home', href: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol>
        {trail.map((item, i) => (
          <li key={`${item.label}-${i}`}>
            {item.href && i < trail.length - 1 ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
          })),
        }}
      />
    </nav>
  );
}
