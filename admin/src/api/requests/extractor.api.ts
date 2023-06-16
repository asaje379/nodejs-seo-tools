import { http } from '..';
import { Pagination } from './typings';

export type SoupExtractorKind = 'HEADERS' | 'IMAGES' | 'LINKS';
export type SoupExtractionResult = {
  images?: {
    images: string[];
    summary: {
      missingTitle: number;
      missingAlt: number;
      duplicates: number;
      total: number;
    };
  };
  links?: Record<string, LinkItem[]>;
  headers?: Record<string, { count: number; values: string[] }>;
};

export type LinkItem = {
  href: string;
  html: string;
  key: string;
};

export type SoupExtractor = {
  url: string;
  options: SoupExtractorKind[];
};

export default {
  async run(data: SoupExtractor) {
    await http.post('extractor/run', data);
  },

  async all(args?: Pagination) {
    const res = await http.get(
      'extractor',
      args ? { params: args } : undefined,
    );
    return res.data;
  },

  async one(id: string) {
    const res = await http.get('extractor/' + id);
    return res.data;
  },
};
