import { Http } from './../../utils/http';
import { Process, Processor } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { Summarizer } from '../../runners/summarizer';
import { AppEvent, JobQueues, TextAndUrlMsArgs } from '@app/shared';

@Processor(JobQueues.Summarizer)
export class JobSummarizerProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_SUMMARIZER)
  async runSummarizer({ id, data }: Job) {
    const task = await this.service.init(id, {
      data,
      type: TaskType.SUMMARIZER,
    });

    const _data = data as TextAndUrlMsArgs;

    await this.service.setSummarizerTask(task.id, _data.id);
    this.appClient.emit(AppEvent.SUMMARIZER_STATUS_CHANGED, {});

    let text = _data.text;
    if (_data.url) {
      const { content } = await Http.getUrlPageInfo(_data.url);
      text = content;
    }

    const runner = new Summarizer();
    const result = await runner.run(text);

    await this.service.end(task.id, result);
    return this.appClient.emit(AppEvent.SUMMARIZER_STATUS_CHANGED, result);
  }
}
