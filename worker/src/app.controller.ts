import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlExtractor } from './runners/extractors/url.extractor';
import { Helper } from './utils/helper';
import { SoupExtractor } from './runners/extractors/soup.extractor';
import { Http } from './utils/http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('extract-url')
  extractUrl() {
    const urlExtractor = new UrlExtractor();
    const urls = urlExtractor.extract(Helper.pageContent);
    return urls;
  }

  @Get('soup')
  soup() {
    const soup = new SoupExtractor(Helper.pageContent);
    const result = {
      images: soup.images(),
      links: soup.links(),
      header: soup.headers(),
    };

    return result;
  }

  @Get('test-link')
  async testLink() {
    const domain = Http.getDomain(Helper.testUrl);
    const baseURL = Http.getBaseUrl(Helper.testUrl);
    console.log([domain, baseURL]);
    const urlInfo = await Http.getUrlPageInfo(Helper.testUrl);
    if (!urlInfo) throw new InternalServerErrorException();
    const soup = new SoupExtractor(urlInfo.content);
    const result = {
      images: soup.images(),
      links: await soup.links(Http.getBaseUrl(Helper.testUrl)),
      header: soup.headers(),
    };
    console.log(result);
    return result;
  }
}
