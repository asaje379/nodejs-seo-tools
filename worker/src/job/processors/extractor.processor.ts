import { Process, Processor } from '@nestjs/bull';
import { JobQueues } from '../job.queues';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { AppEvent } from 'src/events';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { SoupExtractorArgs } from 'src/utils/typings';
import { SoupExtractor } from 'src/runners';

@Processor(JobQueues.Extractor)
export class JobExtractorProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_SOUP_EXTRACTOR)
  async runExtractor({ id, data }: Job) {
    console.log('hello');
    const task = await this.service.init(id, {
      data,
      type: TaskType.EXTRACTOR,
    });

    const _data = data as SoupExtractorArgs;
    const soup = new SoupExtractor();
    await soup.loadUrl(_data.url);
    const result = await soup.extract(_data.options);

    console.log(result, 'result');

    this.appClient.emit(AppEvent.EXTRACTION_FINISHED, result);
    await this.service.end(task.id, result);
  }
}
