import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import DivisionTags from '@/components/DivisionTags';
import JsonLd from '@/components/JsonLd';
import { getTeamMemberBySlug, teamMembers } from '@/lib/people';
import { siteConfig } from '@/lib/site';
import ui from '@/components/ui.module.css';
import PrintButton from './PrintButton';

export function generateStaticParams() {
  return teamMembers.map(member => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return { title: 'Team member not found' };

  return {
    title: `${member.name}, ${member.degrees.join(', ')}`,
    description: member.biography,
    alternates: { canonical: `/people/${slug}` },
  };
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  return (
    <div>
      <div className="container" style={{ paddingTop: 'var(--space-8)' }}>
        <Breadcrumbs items={[{ label: 'People', href: '/people' }, { label: member.name }]} />

        <div className={ui.detailLayout} style={{ alignItems: 'flex-start', marginTop: 'var(--space-6)' }}>
          <main className={ui.detailMain}>
            <div style={{ display: 'flex', gap: 'var(--space-8)', marginBottom: 'var(--space-8)', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ width: 240, height: 240, position: 'relative', overflow: 'hidden', borderRadius: 0, background: 'var(--gray-100)', border: '1px solid var(--gray-200)', flex: '0 0 240px' }}>
                <Image src={member.image} alt={`Portrait of ${member.name}`} fill sizes="240px" style={{ objectFit: 'cover', objectPosition: 'top' }} priority />
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <span className={ui.kicker}>Sterling IMRES team</span>
                <h1 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', margin: 'var(--space-2) 0', color: 'var(--navy-900)' }}>{member.name}</h1>
                <p style={{ color: 'var(--gray-500)', fontSize: 'var(--text-md)', marginBottom: 'var(--space-2)' }}>{member.degrees.join(', ')}</p>
                <p style={{ color: 'var(--navy-800)', fontSize: 'var(--text-lg)', fontWeight: 600 }}>{member.title}</p>
                <p style={{ color: 'var(--gray-600)', marginTop: 'var(--space-2)' }}>{member.specialty}</p>
              </div>
            </div>

            <section style={{ borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Biography</h2>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.7 }}>{member.biography}</p>
            </section>

            <section style={{ borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Areas of expertise</h2>
              <ul className={ui.tagRow}>{member.expertise.map(item => <li key={item} className={ui.tag}>{item}</li>)}</ul>
            </section>

            <section>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Research interests</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: 'var(--space-5)', color: 'var(--gray-600)' }}>
                {member.researchInterests.map(interest => <li key={interest} style={{ marginBottom: 'var(--space-2)' }}>{interest}</li>)}
              </ul>
            </section>
          </main>

          <aside className={ui.aside}>
            <div className={ui.panel}>
              <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Team details</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>Divisions</p>
              <DivisionTags ids={member.divisions} />
              <p style={{ color: 'var(--gray-500)', fontSize: 'var(--text-sm)', margin: 'var(--space-5) 0 var(--space-1)' }}>Email</p>
              <a href={`mailto:${member.email}`} style={{ color: 'var(--teal-700)', fontWeight: 600, wordBreak: 'break-word' }}>{member.email}</a>
            </div>
            <div style={{ marginTop: 'var(--space-5)' }}><PrintButton /></div>
          </aside>
        </div>
      </div>
      <div style={{ height: '5rem' }} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: member.name,
          honorificSuffix: member.degrees.join(', '),
          jobTitle: member.title,
          image: `${siteConfig.url}${member.image}`,
          url: `${siteConfig.url}/people/${member.slug}`,
          worksFor: { '@type': 'Organization', name: siteConfig.fullName, url: siteConfig.url },
        }}
      />
    </div>
  );
}
