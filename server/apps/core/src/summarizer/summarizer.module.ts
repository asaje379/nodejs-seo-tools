import { Module } from '@nestjs/common';
import { SummarizerService } from './summarizer.service';
import { SummarizerController } from './summarizer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroServiceName } from '@app/shared';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MicroServiceName.WORKER,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    PrismaModule,
  ],
  providers: [SummarizerService],
  controllers: [SummarizerController],
})
export class SummarizerModule {}
