import { illustrationRecords } from '@/data/media';

export type IllustrationCategory = 'anatomy' | 'cellular' | 'molecular' | 'dental' | 'physiology' | 'procedural' | 'infographic';

export interface Illustration {
  slug: string;
  title: string;
  commonsFile: string;
  description: string;
  category: IllustrationCategory;
  creator: string;
  license: string;
  licenseUrl?: string;
  imageUrl: string;
  width: number;
  height: number;
  sourcePageUrl: string;
  divisions: string[];
}

export const illustrationCategoryLabels: Record<IllustrationCategory, string> = {
  anatomy: 'Anatomy',
  cellular: 'Cellular',
  molecular: 'Molecular',
  dental: 'Dental',
  physiology: 'Physiology',
  procedural: 'Procedural',
  infographic: 'Infographic',
};

export const illustrations: Illustration[] = illustrationRecords;

export function getIllustrationBySlug(slug: string) {
  return illustrations.find(i => i.slug === slug);
}

export function getIllustrationsByDivision(divisionId: string) {
  return illustrations.filter(i => i.divisions.includes(divisionId));
}
