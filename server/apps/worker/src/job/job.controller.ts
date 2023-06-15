import { InjectQueue } from '@nestjs/bull';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Queue } from 'bull';
import { KeywordExtractorArgs } from '../runners/extractors/keyword.extractor';
import { AppEvent, JobQueues, SoupExtractorPayload } from '@app/shared';

@Controller('job')
export class JobController {
  constructor(
    @InjectQueue(JobQueues.Extractor) private extractorQueue: Queue,
    @InjectQueue(JobQueues.Sitemap) private sitemapQueue: Queue,
    @InjectQueue(JobQueues.InternalLink) private internalLinkQueue: Queue,
    @InjectQueue(JobQueues.Keyword) private keywordQueue: Queue,
    @InjectQueue(JobQueues.Lighthouse) private lighthouseQueue: Queue,
    @InjectQueue(JobQueues.Summarizer) private summarizerQueue: Queue,
    @InjectQueue(JobQueues.Observatory) private observatoryQueue: Queue,
    @InjectQueue(JobQueues.Serp) private serpQueue: Queue,
  ) {}

  @EventPattern(AppEvent.RUN_SOUP_EXTRACTOR)
  async runSoupExtractor(data: SoupExtractorPayload) {
    console.log(data, 'qjhdjqhs');
    await this.extractorQueue.add(AppEvent.RUN_SOUP_EXTRACTOR, data);
  }

  @EventPattern(AppEvent.RUN_KEYWORD)
  async runKeywordExtractor(data: KeywordExtractorArgs) {
    await this.keywordQueue.add(AppEvent.RUN_KEYWORD, data);
  }

  @EventPattern(AppEvent.RUN_LIGHTHOUSE)
  async runLighthouse(data: { url: string; id: string }) {
    await this.lighthouseQueue.add(AppEvent.RUN_LIGHTHOUSE, data);
  }

  @EventPattern(AppEvent.RUN_SUMMARIZER)
  async runSummarize(data: { text: string }) {
    await this.summarizerQueue.add(AppEvent.RUN_SUMMARIZER, data);
  }

  @EventPattern(AppEvent.RUN_OBSERVATORY)
  async runObservatory(data: { url: string }) {
    await this.observatoryQueue.add(AppEvent.RUN_OBSERVATORY, data);
  }

  @EventPattern(AppEvent.RUN_SITEMAP)
  async runSiteMap(data: { url: string }) {
    console.log('------------ run site map extractorQueue ------------------');
    await this.sitemapQueue.add(AppEvent.RUN_SITEMAP, data);
  }

  @EventPattern(AppEvent.RUN_INTERNAL_LINKS)
  async runInternalLink(data: { url: string, maxDepth: number }) {
    await this.internalLinkQueue.add(AppEvent.RUN_INTERNAL_LINKS, data);
  }

  @EventPattern(AppEvent.RUN_SERP)
  async runSerp(data: { url: string, keyword: string }) {
    await this.serpQueue.add(AppEvent.RUN_SERP, data);
  }
}
