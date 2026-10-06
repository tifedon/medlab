import Link from 'next/link';
import styles from './ui.module.css';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  param: string;
  label: string;
  options: FilterOption[];
}

type Params = Record<string, string | undefined>;

function hrefFor(basePath: string, current: Params, param: string, value?: string) {
  const next = new URLSearchParams();
  Object.entries({ ...current, [param]: value }).forEach(([k, v]) => v && next.set(k, v));
  const qs = next.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/** Link-based filters: work without JavaScript and produce shareable URLs. */
export default function FilterBar({ basePath, groups, current }: { basePath: string; groups: FilterGroup[]; current: Params }) {
  return (
    <nav className={styles.filterBar} aria-label="Filters">
      {groups
        .filter(g => g.options.length > 1)
        .map(group => (
          <div key={group.param} className={styles.filterGroup} role="group" aria-label={group.label}>
            <span className={styles.filterLabel}>{group.label}</span>
            <Link
              href={hrefFor(basePath, current, group.param)}
              className={`${styles.filterChip} ${!current[group.param] ? styles.filterChipActive : ''}`}
              aria-current={!current[group.param] ? 'true' : undefined}
            >
              All
            </Link>
            {group.options.map(option => {
              const active = current[group.param] === option.value;
              return (
                <Link
                  key={option.value}
                  href={hrefFor(basePath, current, group.param, option.value)}
                  className={`${styles.filterChip} ${active ? styles.filterChipActive : ''}`}
                  aria-current={active ? 'true' : undefined}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        ))}
    </nav>
  );
}

/** Reads a single string value from Next's searchParams object. */
export function param(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
