import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { BullModule } from '@nestjs/bull';
import { JobQueues } from './job.queues';
import { JobProcessor } from './job.processor';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    BullModule.registerQueue({
      name: JobQueues.Extractor,
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
  ],
  controllers: [JobController],
  providers: [JobProcessor],
  exports: [BullModule],
})
export class JobModule {}
