import { Process, Processor } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { AppEvent, JobQueues, SerpMsArgs } from '@app/shared';
import { SerpScore } from '../../runners/serp';

@Processor(JobQueues.Serp)
export class JobSerpProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_SERP)
  async runSerp({ id, data }: Job) {
    const _data = data as SerpMsArgs;
    const task = await this.service.init(id, {
      data: { url: _data.url },
      type: TaskType.SERP,
    });
    console.log(_data);

    await this.service.setSerpTask(task.id, _data.id);
    this.appClient.emit(AppEvent.SERP_STATUS_CHANGED, {});
    console.log('-------- before run serp ----------');
    
    const result = await new SerpScore().run(_data);
    console.log(result);
    this.appClient.emit(AppEvent.SERP_STATUS_CHANGED, result);
    await this.service.end(task.id, result);
  }
}
