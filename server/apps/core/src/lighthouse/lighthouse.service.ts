import { PrismaService } from '@app/prisma';
import { AppEvent, LighthousePayload, MicroServiceName } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';

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

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.ligthouse.findMany(query);
    const count = await this.prisma.ligthouse.count({ where: query.where });
    return { values, count };
  }

  async findOne(id: string) {
    return await this.prisma.ligthouse.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
