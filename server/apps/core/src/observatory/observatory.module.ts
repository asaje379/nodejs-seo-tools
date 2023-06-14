import { Module } from '@nestjs/common';
import { ObservatoryService } from './observatory.service';
import { ObservatoryController } from './observatory.controller';
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
  providers: [ObservatoryService],
  controllers: [ObservatoryController],
})
export class ObservatoryModule {}
