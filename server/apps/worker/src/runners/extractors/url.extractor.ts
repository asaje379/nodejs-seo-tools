import { Extractor } from '../../utils/typings';

export class UrlExtractor implements Extractor<string, string[]> {
  extract(str: string, lower = false) {
    const regexp =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()'@:%_\+.~#?!&//=]*)/gi;
    const urls = str.match(regexp);
    return lower ? urls.map((item) => item.toLowerCase()) : urls;
  }
}
