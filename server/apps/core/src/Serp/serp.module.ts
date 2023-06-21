import { Module } from '@nestjs/common';
import { SerpController } from './serp.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env, MicroServiceName } from '@app/shared';
import { SerpService } from './serp.service';
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
  controllers: [SerpController],
  providers: [SerpService],
})
export class SerpModule {}
