import { Extractor } from '@app/shared';
import * as rake from 'node-rake-v2';

export interface KeywordExtractorArgs {
  text: string;
  stopwords?: string[];
}

export class KeywordExtractor
  implements Extractor<KeywordExtractorArgs, string[]>
{
  extract({ text, stopwords }: KeywordExtractorArgs) {
    return rake.generate(text, stopwords ? { stopwords } : undefined);
  }
}
