import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlExtractor } from './runners/extractors/url.extractor';
import { Helper } from './utils/helper';
import { SoupExtractor } from './runners/extractors/soup.extractor';
import { Summarizer } from './runners/summarizer';
import { KeywordExtractor } from './runners/extractors/keyword.extractor';
import { Lighthouse } from './runners/lighthouse';
import { Observatory } from './runners/observatory';
import { SerpScore } from './runners/serp';
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
    // const soup = new SoupExtractor(Helper.pageContent);
    // const result = {
    //   images: soup.images(),
    //   links: soup.links(),
    //   header: soup.headers(),
    // };
    // return result;
  }

  @Get('test-link')
  async testLink() {
    const soup = new SoupExtractor();
    await soup.loadUrl(Helper.testUrl);
    const result = await soup.extract(['HEADERS', 'IMAGES']);
    return result;
  }

  @Get('summarize')
  async summarize() {
    const result = new Summarizer().run(Helper.testText);
    return result;
  }

  @Get('extract-keywords')
  async extractKeywords() {
    const result = new KeywordExtractor().extract({ text: Helper.testText });
    return result;
  }

  @Get('lighthouse')
  async lighthouse() {
    const result = new Lighthouse().run('https://shippool.app/');
    return result;
  }

  @Get('observatory')
  async observatory() {
    const result = new Observatory().run('https://shippool.app/');
    return result;
  }

  @Get('serp')
  async serp() {
    const result = new SerpScore().run(
      'https://www.google.com/search?q=google',
    );
    return result;
  }
}
