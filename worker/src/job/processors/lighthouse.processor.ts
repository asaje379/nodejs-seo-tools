import { Process, Processor } from '@nestjs/bull';
import { JobQueues } from '../job.queues';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { JobService } from '../job.service';
import { AppEvent } from 'src/events';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { Lighthouse } from 'src/runners/lighthouse';

@Processor(JobQueues.Lighthouse)
export class JobLighthouseProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_LIGHTHOUSE)
  async runLighthouse({ id, data }: Job) {
    const task = await this.service.init(id, {
      data,
      type: TaskType.LIGHTHOUSE,
    });

    const _data = data as { url: string };
    const result = new Lighthouse().run(_data.url);

    this.appClient.emit(AppEvent.LIGHTHOUSE_FINISHED, result);
    await this.service.end(task.id, result);
  }
}
