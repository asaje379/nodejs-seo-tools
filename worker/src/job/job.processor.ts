import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AppEvent } from 'src/events';
import { SoupExtractor } from 'src/runners';
import { SoupExtractorArgs } from 'src/utils/typings';
import { JobQueues } from './job.queues';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Processor(JobQueues.Extractor)
export class JobProcessor {
  constructor(@Inject(JobQueues.Server) private appClient: ClientProxy) {}

  @Process(AppEvent.RUN_SOUP_EXTRACTOR)
  async runExtractor({ id, data }: Job) {
    const _data = data as SoupExtractorArgs;
    const soup = new SoupExtractor();
    await soup.loadUrl(_data.url);
    const result = await soup.extract(_data.options);
    console.log(`Job ${id} finished:`, result);

    this.appClient.emit(AppEvent.SOUP_EXTRACTION_FINISHED, result);
  }
}
