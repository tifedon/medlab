import Link from 'next/link';
import ProgrammeCard from './ProgrammeCard';
import { recordTitle } from '@/lib/data';
import type { PlannedProgramme } from '@/lib/education';
import ui from './ui.module.css';

/** Programmes with the library records each one is built on. */
export default function ProgrammeList({ programmes }: { programmes: PlannedProgramme[] }) {
  return (
    <div className={ui.grid2}>
      {programmes.map(p => (
        <div key={p.slug} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <ProgrammeCard programme={p} />
          {p.buildsOn.length > 0 && (
            <div className={ui.panel}>
              <h3>Built on</h3>
              <ul className={ui.linkList}>{p.buildsOn.map(href => <li key={href}><Link href={href}>{recordTitle(href)}</Link></li>)}</ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
