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

export interface SiteMapExtractorArgs {
  url: string;
}

export interface Extractor<T, Q> {
  extract: (args: T) => Q | Promise<Q>;
}
