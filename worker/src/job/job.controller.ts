import { InjectQueue } from '@nestjs/bull';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppEvent } from 'src/events';
import { JobQueues } from './job.queues';
import { Queue } from 'bull';
import { SoupExtractorArgs } from 'src/utils/typings';
import { KeywordExtractorArgs } from 'src/runners/extractors/keyword.extractor';

@Controller('job')
export class JobController {
  constructor(
    @InjectQueue(JobQueues.Extractor) private extractorQueue: Queue,
  ) {}

  @EventPattern(AppEvent.RUN_SOUP_EXTRACTOR)
  async runSoupExtractor(data: SoupExtractorArgs) {
    console.log(data, 'qjhdjqhs');
    await this.extractorQueue.add(AppEvent.RUN_SOUP_EXTRACTOR, data);
  }

  @EventPattern(AppEvent.RUN_KEYWORD)
  async runKeywordExtractor(data: KeywordExtractorArgs) {
    await this.extractorQueue.add(AppEvent.RUN_KEYWORD, data);
  }

  @EventPattern(AppEvent.RUN_LIGHTHOUSE)
  async runLighthouse(data: { url: string }) {
    await this.extractorQueue.add(AppEvent.RUN_LIGHTHOUSE, data);
  }

  @EventPattern(AppEvent.RUN_SUMMARIZER)
  async runSummarize(data: { text: string }) {
    await this.extractorQueue.add(AppEvent.RUN_SUMMARIZER, data);
  }

  @EventPattern(AppEvent.RUN_OBSERVATORY)
  async runObservatory(data: { url: string }) {
    await this.extractorQueue.add(AppEvent.RUN_OBSERVATORY, data);
  }
}
