import { InjectQueue } from '@nestjs/bull';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppEvent } from 'src/events';
import { JobQueues } from './job.queues';
import { Queue } from 'bull';
import { SoupExtractorArgs } from 'src/utils/typings';

@Controller('job')
export class JobController {
  constructor(
    @InjectQueue(JobQueues.Extractor) private extractorQueue: Queue,
  ) {}

  @EventPattern(AppEvent.RUN_SOUP_EXTRACTOR)
  async runSoupExtractor(data: SoupExtractorArgs) {
    await this.extractorQueue.add(AppEvent.RUN_SOUP_EXTRACTOR, data);
  }
}
