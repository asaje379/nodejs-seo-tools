import { Process, Processor } from '@nestjs/bull';
import { JobQueues } from '../job.queues';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Inject } from '@nestjs/common';
import { AppEvent } from 'src/events';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { Summarizer } from 'src/runners/summarizer';

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
