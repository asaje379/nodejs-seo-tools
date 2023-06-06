export enum AppEvent {
  RUN_SOUP_EXTRACTOR = 'RUN_SOUP_EXTRACTOR',
  RUN_SUMMARIZER = 'RUN_SUMMARIZER',
  RUN_SITEMAP = 'RUN_SITEMAP',
  RUN_INTERNAL_LINKS = 'RUN_INTERNAL_LINKS',
  RUN_KEYWORD = 'RUN_KEYWORD',
  RUN_LIGHTHOUSE = 'RUN_LIGHTHOUSE',
  RUN_OBSERVATORY = 'RUN_OBSERVATORY',

  EXTRACTION_FINISHED = 'EXTRACTION_FINISHED',
  SUMMARIZER_FINISHED = 'SUMMARIZER_FINISHED',
  SITEMAP_FINISHED = 'SITEMAP_FINISHED',
  KEYWORD_FINISHED = 'KEYWORD_FINISHED',
  LIGHTHOUSE_FINISHED = 'LIGHTHOUSE_FINISHED',
  OBSERVATORY_FINISHED = 'OBSERVATORY_FINISHED',
}

export enum JobQueues {
  Extractor = 'EXTRACTOR',
  Lighthouse = 'LIGHTHOUSE',
  Observatory = 'OBSERVATORY',
  Summarizer = 'SUMMARIZER',
  Keyword = 'KEYWORD',
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
