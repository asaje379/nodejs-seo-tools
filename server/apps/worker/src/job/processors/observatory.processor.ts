import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { Observatory } from '../../runners/observatory';
import { AppEvent, JobQueues } from '@app/shared';

@Processor(JobQueues.Observatory)
export class JobOservatoryProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_OBSERVATORY)
  async runObservatory({ id, data }: Job) {
    const task = await this.service.init(id, {
      data,
      type: TaskType.OBSERVATORY,
    });

    const _data = data as { url: string };
    const result = new Observatory().run(_data.url);

    this.appClient.emit(AppEvent.OBSERVATORY_STATUS_CHANGED, result);
    await this.service.end(task.id, result);
  }
}
