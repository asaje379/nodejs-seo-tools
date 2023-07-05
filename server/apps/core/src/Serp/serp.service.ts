import { PrismaService } from '@app/prisma';
import { AppEvent, MicroServiceName, SerpPayload } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';
import { Helper } from '../utils/helper';
import { Task, Serp } from '@prisma/client';

@Injectable()
export class SerpService {
  constructor(
    private prisma: PrismaService,
    @Inject(MicroServiceName.WORKER) private client: ClientProxy,
  ) {}

  async run({ url, keyword, maxResult, userAgent }: SerpPayload) {
    const serp = await this.prisma.serp.create({
      data: { url, keyword, maxResult, userAgent },
    });
    this.client.emit(AppEvent.RUN_SERP, { url, id: serp.id, keyword, maxResult, userAgent });
  }

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.serp.findMany(query);
    const count = await this.prisma.serp.count({ where: query.where });
    return {
      values: Helper.cleanTaskInListResponse(
        values as (Serp & { task: Task })[],
      ),
      count,
    };
  }

  async findOne(id: string) {
    return await this.prisma.serp.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
