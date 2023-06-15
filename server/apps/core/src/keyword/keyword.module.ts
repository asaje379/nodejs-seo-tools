import { Module } from '@nestjs/common';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
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
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
