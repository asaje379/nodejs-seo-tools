import { Process, Processor } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { AppEvent, JobQueues } from '@app/shared';
import { Sitemap } from '../../runners/sitemap';

@Processor(JobQueues.Sitemap)
export class JobSiteMapProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_SITEMAP)
  async runSiteMap({ id, data }: Job) {
    const task = await this.service.init(id, {
      data,
      type: TaskType.SITEMAP,
    });

    const _data = data as { text: string };
    const result = new Sitemap().generateSiteMap(_data.text);

    this.appClient.emit(AppEvent.SITEMAP_FINISHED, result);
    await this.service.end(task.id, result);
  }
}