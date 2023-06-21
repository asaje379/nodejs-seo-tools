import { Module } from '@nestjs/common';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
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
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
