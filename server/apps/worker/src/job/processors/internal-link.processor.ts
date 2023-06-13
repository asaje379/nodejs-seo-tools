import { Process, Processor } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { AppEvent, InternalLinkMsArgs, JobQueues } from '@app/shared';
import { InternalLink } from '../../runners/internal-link';

@Processor(JobQueues.InternalLink)
export class JobInternalLinkProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_INTERNAL_LINKS)
  async runInternalLink({ id, data }: Job) {
    const _data = data as InternalLinkMsArgs;
    const task = await this.service.init(id, {
      data: { url: _data.url },
      type: TaskType.INTERNAL_LINKS,
    });
    console.log(_data);

    await this.service.setInternalLinkTask(task.id, _data.id);
    this.appClient.emit(AppEvent.INTERNAL_LINK_STATUS_CHANGED, {});
    const result = await new InternalLink().getInternalLink(_data.url, _data.nbre);

    this.appClient.emit(AppEvent.INTERNAL_LINK_STATUS_CHANGED, result);
    await this.service.end(task.id, result);
  }
}
