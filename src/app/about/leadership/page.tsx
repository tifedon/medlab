import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Notice from '@/components/Notice';
import EmptyState from '@/components/EmptyState';
import { leadershipRoles } from '@/lib/institute';
import { teamMembers } from '@/lib/people';
import ui from '@/components/ui.module.css';

export const metadata: Metadata = {
  title: 'Leadership',
  description: 'Leadership roles at Sterling IMRES and how leadership appointments are verified before publication.',
  alternates: { canonical: '/about/leadership' },
};

export default function LeadershipPage() {
  return (
    <div>
      <PageHero kicker="Leadership" title="Leadership" lead="Leadership names, credentials and affiliations are published only after they have been verified." breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Leadership' }]} />
      <Section>
        <Notice>Sterling IMRES is a working concept. Rather than listing unconfirmed people, this page sets out the leadership roles and will show named leaders once the partners confirm appointments and the details have been checked.</Notice>
      </Section>
      <Section>
        <SectionHeader kicker="Appointed leaders" title="Verified leadership" />
        {teamMembers.length === 0 ? (
          <EmptyState title="Appointments to be announced" actions={<Link href="/projects/founding-team-verification" className="btn btn--secondary">Follow the verification project</Link>}>
            Leadership profiles will appear here with verified qualifications, memberships and the work each person leads.
          </EmptyState>
        ) : null}
      </Section>
      <Section last>
        <SectionHeader kicker="Structure" title="Leadership roles" />
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead><tr><th scope="col">Role</th><th scope="col">Remit</th></tr></thead>
            <tbody>{leadershipRoles.map(r => <tr key={r.role}><td>{r.role}</td><td>{r.remit}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
