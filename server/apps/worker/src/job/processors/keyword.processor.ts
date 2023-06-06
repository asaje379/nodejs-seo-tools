import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JobService } from '../job.service';
import { Job } from 'bull';
import { TaskType } from '@prisma/client';
import { AppEvent } from '../../events';
import {
  KeywordExtractor,
  KeywordExtractorArgs,
} from '../../runners/extractors/keyword.extractor';
import { JobQueues } from '@app/shared';

@Processor(JobQueues.Keyword)
export class JobKeywordProcessor {
  constructor(
    @Inject(JobQueues.Server) private appClient: ClientProxy,
    private service: JobService,
  ) {}

  @Process(AppEvent.RUN_KEYWORD)
  async runExtractor({ id, data }: Job) {
    const task = await this.service.init(id, {
      data,
      type: TaskType.KEYWORD,
    });

    const _data = data as KeywordExtractorArgs;
    const result = await new KeywordExtractor().extract({
      text: _data.text,
      ...(_data.stopwords && { stopwords: _data.stopwords }),
    });

    this.appClient.emit(AppEvent.KEYWORD_FINISHED, result);
    await this.service.end(task.id, result);
  }
}
