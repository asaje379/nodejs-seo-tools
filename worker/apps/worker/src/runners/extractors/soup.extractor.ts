import JSSoup from 'jssoup';
import { Http } from '../../utils/http';
import {
  Extractor,
  SoupExtractionResult,
  SoupExtractorKind,
} from '../../utils/typings';

export class SoupExtractor
  implements Extractor<SoupExtractorKind[], SoupExtractionResult>
{
  soup: any;
  baseUrl: string | undefined = undefined;

  async loadUrl(url: string) {
    const urlInfo = await Http.getUrlPageInfo(url);
    this.soup = new JSSoup(urlInfo.content);
    this.baseUrl = Http.getBaseUrl(url);
    return this;
  }

  async extract(kinds: SoupExtractorKind[]) {
    const result: SoupExtractionResult = {};

    for (const kind of kinds) {
      if (kind === 'HEADERS') result.headers = this.headers();
      if (kind === 'IMAGES') result.images = this.images();
      if (kind === 'LINKS') result.links = await this.links();
    }

    return result;
  }

  images() {
    const imgInfos = this.soup.findAll('img') as any[];
    const result = {
      images: [],
      summary: {
        missingTitle: 0,
        missingAlt: 0,
        duplicates: 0,
        total: imgInfos.length,
      },
    };

    for (const info of imgInfos) {
      const img = String(info);
      if (result.images.includes(img)) {
        result.summary.duplicates++;
        continue;
      }

      result.images.push(img);
      const { alt, title } = info.attrs;
      if (!alt) result.summary.missingAlt++;
      if (!title) result.summary.missingTitle++;
    }
    return result;
  }

  async links() {
    const linksInfo = this.soup.findAll('a') as any[];

    const result = {};

    for (const link of linksInfo) {
      let href = link.attrs.href as string;
      if (!href.startsWith('http')) {
        href = [this.baseUrl, href].join(href.startsWith('/') ? '' : '/');
      }
      console.log(link.attrs.href, href);
      const pageInfo = await Http.getUrlPageInfo(href);
      console.log(pageInfo.status);
      const key = String(pageInfo.status);
      if (!(key in result)) {
        result[key] = [String(link)];
        continue;
      }

      if (result[key].includes(String(link))) continue;
      result[key].push(String(link));
    }

    return result;
  }

  headers() {
    const hInfos = {
      h1: this.soup.findAll('h1'),
      h2: this.soup.findAll('h2'),
      h3: this.soup.findAll('h3'),
      h4: this.soup.findAll('h4'),
      h5: this.soup.findAll('h5'),
      h6: this.soup.findAll('h6'),
    };

    return {
      h1: {
        count: hInfos.h1.length,
        values: hInfos.h1.map((it) => String(it)),
      },
      h2: {
        count: hInfos.h2.length,
        values: hInfos.h2.map((it) => String(it)),
      },
      h3: {
        count: hInfos.h3.length,
        values: hInfos.h3.map((it) => String(it)),
      },
      h4: {
        count: hInfos.h4.length,
        values: hInfos.h4.map((it) => String(it)),
      },
      h5: {
        count: hInfos.h5.length,
        values: hInfos.h5.map((it) => String(it)),
      },
      h6: {
        count: hInfos.h6.length,
        values: hInfos.h6.map((it) => String(it)),
      },
    };
  }
}
