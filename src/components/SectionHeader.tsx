import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRightIcon } from './Icons';
import styles from './ui.module.css';

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  lead?: ReactNode;
  link?: { href: string; label: string };
  id?: string;
}

export default function SectionHeader({ kicker, title, lead, link, id }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <h2 className={styles.sectionTitle} id={id}>{title}</h2>
        {lead && <p className={styles.sectionLead}>{lead}</p>}
      </div>
      {link && (
        <Link href={link.href} className={styles.sectionLink}>
          {link.label} <ArrowRightIcon size={15} />
        </Link>
      )}
    </div>
  );
}
