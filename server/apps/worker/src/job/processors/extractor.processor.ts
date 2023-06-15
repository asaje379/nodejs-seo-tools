import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { SoupExtractor } from '../../runners';
import { AppEvent, JobQueues, UrlOptionsMsArgs } from '@app/shared';

@Processor(JobQueues.Extractor)
export class JobExtractorProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_SOUP_EXTRACTOR)
  async runExtractor({ id, data }: Job) {
    const _data = data as UrlOptionsMsArgs;
    const task = await this.service.init(id, {
      data,
      type: TaskType.EXTRACTOR,
    });
    await this.service.setExtractorTask(task.id, _data.id);

    const soup = new SoupExtractor();
    await soup.loadUrl(_data.url);
    const result = await soup.extract(_data.options);

    console.log(result, 'result');

    this.appClient.emit(AppEvent.EXTRACTION_STATUS_CHANGED, result);
    await this.service.end(task.id, result);
  }
}
