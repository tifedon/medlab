import type { MetadataRoute } from 'next';
import { books, divisions, illustrations, insights, projects, publications, researchRecords, teamMembers } from '@/lib/data';
import { primaryNav, legalLinks } from '@/lib/navigation';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = new Set<string>(['/', '/insights', '/collaborate', '/contact', '/education']);
  primaryNav.forEach(g => g.columns.forEach(c => c.links.forEach(l => staticPaths.add(l.href.split(/[?#]/)[0]))));
  legalLinks.forEach(l => staticPaths.add(l.href));

  const dynamicPaths = [
    ...divisions.map(d => `/divisions/${d.id}`),
    ...researchRecords.map(r => `/research/${r.slug}`),
    ...projects.map(p => `/projects/${p.slug}`),
    ...publications.map(p => `/publications/${p.slug}`),
    ...books.map(b => `/books/${b.slug}`),
    ...illustrations.map(i => `/medical-illustration/${i.slug}`),
    ...insights.map(i => `/insights/${i.slug}`),
    ...teamMembers.map(member => `/people/${member.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map(path => ({
    url: `${siteConfig.url}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.split('/').length === 2 ? 0.8 : 0.6,
  }));
}
