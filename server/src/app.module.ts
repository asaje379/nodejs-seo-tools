import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobQueues } from './events/queues';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: JobQueues.Extractor,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    BullModule.registerQueue({
      name: JobQueues.Server,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
