import { Process, Processor } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { JobService } from '../job.service';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { Lighthouse } from '../../runners/lighthouse';
import { AppEvent, JobQueues, UrlMsArgs } from '@app/shared';

@Processor(JobQueues.Lighthouse)
export class JobLighthouseProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_LIGHTHOUSE)
  async runLighthouse({ id, data }: Job) {
    const _data = data as UrlMsArgs;
    const task = await this.service.init(id, {
      data: { url: _data.url },
      type: TaskType.LIGHTHOUSE,
    });
    await this.service.setLighthouseTask(task.id, _data.id);
    this.appClient.emit(AppEvent.LIGHTHOUSE_STATUS_CHANGED, {});

    const lighthouse = new Lighthouse();
    const result = await lighthouse.run(_data.url);

    await this.service.end(task.id, result);
    this.appClient.emit(AppEvent.LIGHTHOUSE_STATUS_CHANGED, result);
  }
}
