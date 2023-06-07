export enum AppEvent {
  RUN_SOUP_EXTRACTOR = 'RUN_SOUP_EXTRACTOR',
  RUN_SUMMARIZER = 'RUN_SUMMARIZER',
  RUN_SITEMAP = 'RUN_SITEMAP',
  RUN_INTERNAL_LINKS = 'RUN_INTERNAL_LINKS',
  RUN_KEYWORD = 'RUN_KEYWORD',
  RUN_LIGHTHOUSE = 'RUN_LIGHTHOUSE',
  RUN_OBSERVATORY = 'RUN_OBSERVATORY',

  EXTRACTION_STATUS_CHANGED = 'EXTRACTION_STATUS_CHANGED',
  SUMMARIZER_STATUS_CHANGED = 'SUMMARIZER_STATUS_CHANGED',
  SITEMAP_STATUS_CHANGED = 'SITEMAP_STATUS_CHANGED',
  KEYWORD_STATUS_CHANGED = 'KEYWORD_STATUS_CHANGED',
  LIGHTHOUSE_STATUS_CHANGED = 'LIGHTHOUSE_STATUS_CHANGED',
  OBSERVATORY_STATUS_CHANGED = 'OBSERVATORY_STATUS_CHANGED',
}

export enum JobQueues {
  Extractor = 'EXTRACTOR',
  Lighthouse = 'LIGHTHOUSE',
  Observatory = 'OBSERVATORY',
  Summarizer = 'SUMMARIZER',
  Keyword = 'KEYWORD',
  Sitemap = 'SITEMAP',
  Server = 'SERVER_APP',
}

export enum MicroServiceName {
  SERVER = 'SERVER_APP',
  WORKER = 'WORKER_APP',
}

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
  links?: Record<string, string[]>;
  headers?: Record<string, { count: number; values: string[] }>;
};

export interface SoupExtractorArgs {
  url: string;
  options: SoupExtractorKind[];
}

export interface Extractor<T, Q> {
  extract: (args: T) => Q | Promise<Q>;
}
