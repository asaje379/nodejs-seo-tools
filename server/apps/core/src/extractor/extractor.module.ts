import { Module } from '@nestjs/common';
import { ExtractorService } from './extractor.service';
import { ExtractorController } from './extractor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env, MicroServiceName } from '@app/shared';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MicroServiceName.WORKER,
        transport: Transport.REDIS,
        options: {
          host: Env.REDIS_HOST,
          port: Env.REDIS_PORT,
        },
      },
    ]),
    PrismaModule,
  ],
  providers: [ExtractorService],
  controllers: [ExtractorController],
})
export class ExtractorModule {}
