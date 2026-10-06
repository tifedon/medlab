import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/user', '/sign-in', '/sign-up', '/search'] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
