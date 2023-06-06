import { Body, Controller, Get, Inject, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { JobQueues } from './events/queues';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { AppEvent } from './events';
import { SiteMapExtractorArgs, SoupExtractorArgs } from './utils/typings';
import { FrontendEvent } from './events/frontend.event';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(JobQueues.Extractor) private extractorClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('events')
  sse() {
    return FrontendEvent.observer;
  }

  @Post('run-extractor')
  async runExtractor(
    @Body() { url, options }: { url: string; options: string[] },
  ) {
    this.extractorClient.emit(AppEvent.RUN_SOUP_EXTRACTOR, {
      url,
      options,
    } as SoupExtractorArgs);
    return 'Démarrage';
  }

  @Get('site-map')
  async generateSiteMap() {
    this.extractorClient.emit(AppEvent.RUN_SITEMAP, {
      url: 'https://shippool.app/'
    } as SiteMapExtractorArgs);
    return 'Démarrage site map extractor';
  }

  @EventPattern(AppEvent.EXTRACTION_FINISHED)
  async runSoupExtractor(data: SoupExtractorArgs) {
    console.log(data);
    FrontendEvent.emit({
      data: { event: AppEvent.EXTRACTION_FINISHED, data },
    });
  }

  @EventPattern(AppEvent.SITEMAP_FINISHED)
  async runSiteMap(data: SiteMapExtractorArgs) {
    console.log(data);
    FrontendEvent.emit({
      data: { event: AppEvent.SITEMAP_FINISHED, data },
    });
  }
}
