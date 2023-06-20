import { PrismaService } from '@app/prisma';
import { AppEvent, MicroServiceName, UrlPayload } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';
import { Helper } from '../utils/helper';
import { Observatory, Task } from '@prisma/client';

@Injectable()
export class ObservatoryService {
  constructor(
    private prisma: PrismaService,
    @Inject(MicroServiceName.WORKER) private client: ClientProxy,
  ) {}

  async run({ url }: UrlPayload) {
    const observatory = await this.prisma.observatory.create({
      data: { url },
    });
    this.client.emit(AppEvent.RUN_OBSERVATORY, { url, id: observatory.id });
  }

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.observatory.findMany(query);
    const count = await this.prisma.observatory.count({ where: query.where });
    return {
      values: Helper.cleanTaskInListResponse(
        values as (Observatory & { task: Task })[],
      ),
      count,
    };
  }

  async findOne(id: string) {
    return await this.prisma.observatory.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
