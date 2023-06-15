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
import { Sitemap } from './runners/sitemap';
import { InternalLink } from './runners/internal-link';
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

  @Get('sitemap')
  async sitemap() {
    const result = new Sitemap().generateSiteMap('https://shippool.app/');
    return result;
  }

  @Get('internal-link')
  async internalLink() {
    const result = new InternalLink().getInternalLink('https://shippool.app/', 3);
    return result;
  }

  @Get('serp')
  async serp() {
    const result = new SerpScore().run(
      {url: 'https://www.google.com/search?q=google+hello+kitty&rlz=1C5CHFA_enBJ1025BJ1027&ei=7_p-ZJ_HH56akdUPiKO2cA&start=10&sa=N&ved=2ahUKEwjf-uSDqa7_AhUeTaQEHYiRDQ4Q8tMDegQIBBAE&biw=1393&bih=764&dpr=2&bshm=nce/1', keyword: 'toto'}
    );
    return result;
  }
}
