import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { JobQueues } from '@app/shared';
import { BullModule } from '@nestjs/bull';
import { LighthouseModule } from './lighthouse/lighthouse.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: JobQueues.Server,
    }),
    LighthouseModule,
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
