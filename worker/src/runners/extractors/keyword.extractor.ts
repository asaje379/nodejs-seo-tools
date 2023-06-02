import * as rake from 'node-rake-v2';
import { Extractor } from 'src/utils/typings';

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
