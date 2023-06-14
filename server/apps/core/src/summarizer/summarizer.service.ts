import { PrismaService } from '@app/prisma';
import { AppEvent, MicroServiceName, TextAndUrlPayload } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';
import { Helper } from '../utils/helper';
import { Summarizer, Task } from '@prisma/client';

@Injectable()
export class SummarizerService {
  constructor(
    private prisma: PrismaService,
    @Inject(MicroServiceName.WORKER) private client: ClientProxy,
  ) {}

  async run({ url, text }: TextAndUrlPayload) {
    const summarizer = await this.prisma.summarizer.create({
      data: { url, text },
    });
    this.client.emit(AppEvent.RUN_SUMMARIZER, { url, text, id: summarizer.id });
  }

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.summarizer.findMany(query);
    const count = await this.prisma.summarizer.count({ where: query.where });
    return {
      values: Helper.cleanTaskInListResponse(
        values as (Summarizer & { task: Task })[],
      ),
      count,
    };
  }

  async findOne(id: string) {
    return await this.prisma.summarizer.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
