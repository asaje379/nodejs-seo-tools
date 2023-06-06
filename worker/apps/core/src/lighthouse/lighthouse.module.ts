import { Module } from '@nestjs/common';
import { LighthouseController } from './lighthouse.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroServiceName } from '@app/shared';
import { LighthouseService } from './lighthouse.service';
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
  controllers: [LighthouseController],
  providers: [LighthouseService],
})
export class LighthouseModule {}
