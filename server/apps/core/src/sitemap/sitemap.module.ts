import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env, MicroServiceName } from '@app/shared';
import { SitemapService } from './sitemap.service';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MicroServiceName.WORKER,
        transport: Transport.REDIS,
        options: Env.REDIS_OPTIONS,
      },
    ]),
    PrismaModule,
  ],
  controllers: [SitemapController],
  providers: [SitemapService],
})
export class SitemapModule {}
