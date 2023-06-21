import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { JobModule } from './job/job.module';
import { PrismaModule } from '@app/prisma';
import { Env } from '@app/shared';

@Module({
  imports: [
    BullModule.forRoot({
      redis: Env.REDIS_OPTIONS,
    }),
    JobModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
