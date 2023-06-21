import { Module } from '@nestjs/common';
import { LighthouseController } from './lighthouse.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env, MicroServiceName } from '@app/shared';
import { LighthouseService } from './lighthouse.service';
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
  controllers: [LighthouseController],
  providers: [LighthouseService],
})
export class LighthouseModule {}
