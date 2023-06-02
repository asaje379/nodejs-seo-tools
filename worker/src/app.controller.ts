import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlExtractor } from './runners/extractors/url.extractor';
import { Helper } from './utils/helper';
import { SoupExtractor } from './runners/extractors/soup.extractor';
import { Http } from './utils/http';
import { EventPattern } from '@nestjs/microservices';
import { AppEvent } from './events';
import { SoupExtractorArgs } from './runners/typings';

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
    const soup = new SoupExtractor(Helper.testUrl);
    const result = await soup.extract(['HEADERS', 'IMAGES']);
    console.log(result);
    return result;
  }

  @EventPattern(AppEvent.RUN_SOUP_EXTRACTOR)
  runSoupExtractor(data: SoupExtractorArgs) {}
}
