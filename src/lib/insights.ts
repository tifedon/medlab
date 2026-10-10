import { insightRecords } from '@/data/insights';

export type InsightCategory =
  | 'research-updates'
  | 'evidence-reviews'
  | 'medical-education'
  | 'scientific-integrity'
  | 'publications'
  | 'institute-news'
  | 'commentary'
  | 'research-methods';

export interface InsightRef {
  kind: 'publication' | 'book' | 'research' | 'illustration' | 'project';
  slug: string;
}

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  author: string;
  authorSlug?: string;
  publishedDate: string;
  readTime: number;
  divisions: string[];
  featured?: boolean;
  /** Body as paragraphs; `## ` starts a subheading. */
  body: string[];
  references: InsightRef[];
}

export const insightCategoryLabels: Record<InsightCategory, string> = {
  'research-updates': 'Research update',
  'evidence-reviews': 'Evidence review',
  'medical-education': 'Medical education',
  'scientific-integrity': 'Scientific integrity',
  publications: 'Publications',
  'institute-news': 'Institute news',
  commentary: 'Commentary',
  'research-methods': 'Research methods',
};

export const insights: Insight[] = [...insightRecords].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

export function getInsightBySlug(slug: string) {
  return insights.find(i => i.slug === slug);
}

export function getInsightsByDivision(divisionId: string) {
  return insights.filter(i => i.divisions.includes(divisionId));
}
