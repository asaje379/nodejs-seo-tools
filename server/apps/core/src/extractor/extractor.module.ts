import { Module } from '@nestjs/common';
import { ExtractorService } from './extractor.service';
import { ExtractorController } from './extractor.controller';
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
  providers: [ExtractorService],
  controllers: [ExtractorController],
})
export class ExtractorModule {}
