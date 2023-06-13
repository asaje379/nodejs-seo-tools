import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { JobQueues } from '@app/shared';
import { BullModule } from '@nestjs/bull';
import { LighthouseModule } from './lighthouse/lighthouse.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { InternalLinkModule } from './internalLink/internal-link.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: JobQueues.Server,
    }),
    LighthouseModule,
    SitemapModule,
    InternalLinkModule,
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
