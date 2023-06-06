import { PrismaService } from '@app/prisma';
import { AppEvent, LighthousePayload, MicroServiceName } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LighthouseService {
  constructor(
    private prisma: PrismaService,
    @Inject(MicroServiceName.WORKER) private client: ClientProxy,
  ) {}

  async run({ url }: LighthousePayload) {
    const lighthouse = await this.prisma.ligthouse.create({
      data: { url },
    });
    this.client.emit(AppEvent.RUN_LIGHTHOUSE, { url, id: lighthouse.id });
  }

  async findAll() {
    return await this.prisma.ligthouse.findMany({ include: { task: true } });
  }

  async findOne(id: string) {
    return await this.prisma.ligthouse.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
