import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { KeywordExtractor } from '../../runners/extractors/keyword.extractor';
import { AppEvent, JobQueues, TextAndStopwordsMsArgs } from '@app/shared';

@Processor(JobQueues.Keyword)
export class JobKeywordProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_KEYWORD)
  async runExtractor({ id, data }: Job) {
    const _data = data as TextAndStopwordsMsArgs;
    const task = await this.service.init(id, {
      data,
      type: TaskType.KEYWORD,
    });
    await this.service.setKeywordTask(task.id, _data.id);

    const keyword = new KeywordExtractor();
    const result = await keyword.extract({
      text: _data.text,
      ...(_data.stopwords && { stopwords: _data.stopwords.split(',') }),
    });

    await this.service.end(task.id, result);
    return this.appClient.emit(AppEvent.KEYWORD_STATUS_CHANGED, result);
  }
}
