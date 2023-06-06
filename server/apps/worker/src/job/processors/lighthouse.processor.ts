import { Process, Processor } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { JobService } from '../job.service';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { AppEvent } from '../../events';
import { Lighthouse } from '../../runners/lighthouse';
import { JobQueues, LighthouseMsArgs } from '@app/shared';

@Processor(JobQueues.Lighthouse)
export class JobLighthouseProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_LIGHTHOUSE)
  async runLighthouse({ id, data }: Job) {
    console.log('[Task started:Lighthouse]', id, data);
    const _data = data as LighthouseMsArgs;
    const task = await this.service.init(id, {
      data: { url: _data.url },
      type: TaskType.LIGHTHOUSE,
    });
    await this.service.setLighthouseTask(task.id, _data.id);

    const result = new Lighthouse().run(_data.url);

    await this.service.end(task.id, result);
    this.appClient.emit(AppEvent.LIGHTHOUSE_FINISHED, result);
  }
}