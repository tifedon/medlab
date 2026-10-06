import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import DivisionTags from '@/components/DivisionTags';
import IllustrationCard from '@/components/IllustrationCard';
import MetaList from '@/components/MetaList';
import Notice from '@/components/Notice';
import JsonLd from '@/components/JsonLd';
import { ExternalLinkIcon } from '@/components/Icons';
import { getIllustrationBySlug, illustrationCategoryLabels, illustrations } from '@/lib/illustrations';
import ui from '@/components/ui.module.css';

export function generateStaticParams() {
  return illustrations.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getIllustrationBySlug(slug);
  if (!item) return { title: 'Illustration not found' };
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/medical-illustration/${slug}` },
    openGraph: { title: item.title, description: item.description, images: [{ url: item.imageUrl, width: item.width, height: item.height, alt: item.title }] },
  };
}

export default async function IllustrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getIllustrationBySlug(slug);
  if (!item) notFound();
  const related = illustrations.filter(i => i.slug !== item.slug && i.category === item.category).concat(illustrations.filter(i => i.slug !== item.slug && i.category !== item.category)).slice(0, 4);

  return (
    <div>
      <header className={ui.hero}>
        <div className="container">
          <div className={ui.heroInner}>
            <Breadcrumbs items={[{ label: 'Medical illustration', href: '/medical-illustration' }, { label: 'Gallery', href: '/medical-illustration/gallery' }, { label: item.title }]} />
            <span className={ui.kicker}>{illustrationCategoryLabels[item.category]}</span>
            <h1 className={ui.heroTitle}>{item.title}</h1>
          </div>
        </div>
      </header>
      <div className="container">
        <div className={ui.detailLayout}>
          <div className={`${ui.detailMain} ${ui.prose}`}>
            <figure className={ui.panel} style={{ padding: '1.5rem', background: 'var(--gray-50)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.title} width={item.width} height={item.height} style={{ margin: '0 auto', maxHeight: '70vh', width: 'auto' }} />
              <figcaption style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                {item.title}. By {item.creator}, {item.license}, via Wikimedia Commons.
              </figcaption>
            </figure>
            <section>
              <h2>Description</h2>
              <p>{item.description}</p>
            </section>
            <Notice>This illustration was created by {item.creator} and is not Sterling IMRES work. It is shown under {item.license}. Reuse it only on the terms of that licence and credit the creator.</Notice>
            {related.length > 0 && (
              <section>
                <h2>More illustrations</h2>
                <div className={ui.grid2}>{related.map(i => <IllustrationCard key={i.slug} illustration={i} />)}</div>
              </section>
            )}
          </div>
          <aside className={ui.aside}>
            <div className={ui.panel}>
              <h3>Attribution</h3>
              <MetaList
                items={[
                  ['Creator', item.creator],
                  ['Licence', item.licenseUrl ? <a key="l" href={item.licenseUrl} target="_blank" rel="noopener noreferrer">{item.license}</a> : item.license],
                  ['Source file', <a key="s" href={item.sourcePageUrl} target="_blank" rel="noopener noreferrer">{item.commonsFile} <ExternalLinkIcon size={12} /></a>],
                  ['Dimensions shown', `${item.width} × ${item.height}px`],
                ]}
              />
            </div>
            <div className={ui.panel}>
              <h3>Divisions</h3>
              <DivisionTags ids={item.divisions} />
            </div>
          </aside>
        </div>
      </div>
      <div style={{ height: '5rem' }} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          name: item.title,
          contentUrl: item.imageUrl,
          creator: { '@type': 'Person', name: item.creator },
          license: item.licenseUrl,
          acquireLicensePage: item.sourcePageUrl,
        }}
      />
    </div>
  );
}
