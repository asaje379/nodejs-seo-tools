import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { BullModule } from '@nestjs/bull';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobService } from './job.service';
import {
  JobExtractorProcessor,
  JobKeywordProcessor,
  JobLighthouseProcessor,
  JobOservatoryProcessor,
  JobSummarizerProcessor,
  JobSiteMapProcessor,
} from './processors';
import { PrismaModule } from '@app/prisma';
import { Env, JobQueues, MicroServiceName } from '@app/shared';

const redisOptions = { host: Env.REDIS_HOST, port: Env.REDIS_PORT };

@Module({
  imports: [
    BullModule.registerQueue({
      name: JobQueues.Extractor,
      redis: redisOptions,
    }),
    BullModule.registerQueue({
      name: JobQueues.Lighthouse,
      redis: redisOptions,
    }),
    BullModule.registerQueue({
      name: JobQueues.Summarizer,
      redis: redisOptions,
    }),
    BullModule.registerQueue({
      name: JobQueues.Sitemap,
      redis: redisOptions,
    }),
    BullModule.registerQueue({
      name: JobQueues.Observatory,
      redis: redisOptions,
    }),
    BullModule.registerQueue({
      name: JobQueues.Keyword,
      redis: redisOptions,
    }),
    ClientsModule.register([
      {
        name: MicroServiceName.SERVER,
        transport: Transport.REDIS,
        options: Env.REDIS_OPTIONS,
      },
    ]),
    PrismaModule,
  ],
  controllers: [JobController],
  providers: [
    JobService,
    JobExtractorProcessor,
    JobLighthouseProcessor,
    JobSummarizerProcessor,
    JobOservatoryProcessor,
    JobKeywordProcessor,
    JobSiteMapProcessor,
  ],
  exports: [BullModule],
})
export class JobModule {}
