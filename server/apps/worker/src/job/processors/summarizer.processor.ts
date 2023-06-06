import { Process, Processor } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { AppEvent } from '../../events';
import { Summarizer } from '../../runners/summarizer';
import { JobQueues } from '@app/shared';

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

    const _data = data as { text: string };
    const result = new Summarizer().run(_data.text);

    this.appClient.emit(AppEvent.SUMMARIZER_FINISHED, result);
    await this.service.end(task.id, result);
  }
}
