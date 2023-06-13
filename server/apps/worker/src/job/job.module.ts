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
  JobInternalLinkProcessor,
} from './processors';
import { PrismaModule } from '@app/prisma';
import { JobQueues, MicroServiceName } from '@app/shared';

@Module({
  imports: [
    BullModule.registerQueue({
      name: JobQueues.Extractor,
    }),
    BullModule.registerQueue({
      name: JobQueues.Lighthouse,
    }),
    BullModule.registerQueue({
      name: JobQueues.Summarizer,
    }),
    BullModule.registerQueue({
      name: JobQueues.Sitemap,
    }),
    BullModule.registerQueue({
      name: JobQueues.InternalLink,
    }),
    BullModule.registerQueue({
      name: JobQueues.Observatory,
    }),
    BullModule.registerQueue({
      name: JobQueues.Keyword,
    }),
    ClientsModule.register([
      {
        name: MicroServiceName.SERVER,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
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
    JobInternalLinkProcessor,
  ],
  exports: [BullModule],
})
export class JobModule {}
