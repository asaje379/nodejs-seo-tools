import { config } from 'dotenv';

config();

export enum AppEvent {
  RUN_SOUP_EXTRACTOR = 'RUN_SOUP_EXTRACTOR',
  RUN_SUMMARIZER = 'RUN_SUMMARIZER',
  RUN_SITEMAP = 'RUN_SITEMAP',
  RUN_INTERNAL_LINKS = 'RUN_INTERNAL_LINKS',
  RUN_KEYWORD = 'RUN_KEYWORD',
  RUN_LIGHTHOUSE = 'RUN_LIGHTHOUSE',
  RUN_OBSERVATORY = 'RUN_OBSERVATORY',
  RUN_SERP = 'RUN_SERP',

  EXTRACTION_STATUS_CHANGED = 'EXTRACTION_STATUS_CHANGED',
  SUMMARIZER_STATUS_CHANGED = 'SUMMARIZER_STATUS_CHANGED',
  SITEMAP_STATUS_CHANGED = 'SITEMAP_STATUS_CHANGED',
  KEYWORD_STATUS_CHANGED = 'KEYWORD_STATUS_CHANGED',
  LIGHTHOUSE_STATUS_CHANGED = 'LIGHTHOUSE_STATUS_CHANGED',
  OBSERVATORY_STATUS_CHANGED = 'OBSERVATORY_STATUS_CHANGED',
  INTERNAL_LINK_STATUS_CHANGED = 'INTERNAL_LINK_STATUS_CHANGED',
  SERP_STATUS_CHANGED = 'SERP_STATUS_CHANGED',
}

export enum JobQueues {
  Extractor = 'EXTRACTOR',
  Lighthouse = 'LIGHTHOUSE',
  Observatory = 'OBSERVATORY',
  Summarizer = 'SUMMARIZER',
  Keyword = 'KEYWORD',
  Sitemap = 'SITEMAP',
  Serp = 'SERP',
  InternalLink = 'INTERNALLINK',
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

export interface Extractor<T, Q> {
  extract: (args: T) => Q | Promise<Q>;
}

export class Env {
  static REDIS_HOST = process.env.REDIS_HOST;
  static REDIS_PORT = +process.env.REDIS_PORT;

  static REDIS_OPTIONS = {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
  };
}

