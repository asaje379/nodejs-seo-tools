import { Module } from '@nestjs/common';
import { InternalLinkController } from './internal-link.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroServiceName } from '@app/shared';
import { InternalLinkService } from './internal-link.service';
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
  controllers: [InternalLinkController],
  providers: [InternalLinkService],
})
export class InternalLinkModule {}
