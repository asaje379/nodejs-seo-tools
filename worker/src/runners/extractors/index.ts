export interface Extractor<T, Q> {
  extract: (args: T) => Q | Promise<Q>;
}

export * from './soup.extractor';
export * from './url.extractor';
