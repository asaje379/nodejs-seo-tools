import { Body, Controller, Get, Inject, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { JobQueues } from './events/queues';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { AppEvent } from './events';
import { SoupExtractorArgs } from './utils/typings';
import { Helper } from './utils/helper';
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

  @EventPattern(AppEvent.SOUP_EXTRACTION_FINISHED)
  async runSoupExtractor(data: SoupExtractorArgs) {
    FrontendEvent.emit({
      data: { event: AppEvent.SOUP_EXTRACTION_FINISHED, data },
    });
  }
}
