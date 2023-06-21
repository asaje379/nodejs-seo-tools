import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { Observatory } from '../../runners/observatory';
import { AppEvent, JobQueues, UrlMsArgs } from '@app/shared';

@Processor(JobQueues.Observatory)
export class JobOservatoryProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_OBSERVATORY)
  async runObservatory({ id, data }: Job) {
    const _data = data as UrlMsArgs;
    const task = await this.service.init(id, {
      data,
      type: TaskType.OBSERVATORY,
    });
    await this.service.setObservatoryTask(task.id, _data.id);
    this.appClient.emit(AppEvent.OBSERVATORY_STATUS_CHANGED, {});

    const observatory = new Observatory();
    const result = await observatory.run(_data.url);
    await this.service.end(task.id, result);
    this.appClient.emit(AppEvent.OBSERVATORY_STATUS_CHANGED, result);
  }
}
