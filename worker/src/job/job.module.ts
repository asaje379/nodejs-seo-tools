import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { BullModule } from '@nestjs/bull';
import { JobQueues } from './job.queues';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobService } from './job.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import {
  JobExtractorProcessor,
  JobKeywordProcessor,
  JobLighthouseProcessor,
  JobOservatoryProcessor,
  JobSummarizerProcessor,
  JobSiteMapProcessor,
} from './processors';

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
      name: JobQueues.Observatory,
    }),
    BullModule.registerQueue({
      name: JobQueues.Keyword,
    }),
    ClientsModule.register([
      {
        name: JobQueues.Server,
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
    JobSiteMapProcessor
  ],
  exports: [BullModule],
})
export class JobModule {}
