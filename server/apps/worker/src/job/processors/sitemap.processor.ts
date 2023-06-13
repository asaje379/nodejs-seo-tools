import { Process, Processor } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { AppEvent, JobQueues, SiteMapMsArgs } from '@app/shared';
import { Sitemap } from '../../runners/sitemap';

@Processor(JobQueues.Sitemap)
export class JobSiteMapProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_SITEMAP)
  async runSiteMap({ id, data }: Job) {
    const _data = data as SiteMapMsArgs;
    const task = await this.service.init(id, {
      data: { url: _data.url },
      type: TaskType.SITEMAP,
    });
    await this.service.setSitemapTask(task.id, _data.id);
    this.appClient.emit(AppEvent.SITEMAP_STATUS_CHANGED, {});
    const result = await new Sitemap().generateSiteMap(_data.url);
    this.appClient.emit(AppEvent.SITEMAP_STATUS_CHANGED, result);
    await this.service.end(task.id, result);
  }
}
