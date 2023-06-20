import { PrismaService } from '@app/prisma';
import {
  AppEvent,
  MicroServiceName,
  TextAndStopwordPayload,
} from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';
import { Helper } from '../utils/helper';
import { Keyword, Task } from '@prisma/client';

@Injectable()
export class KeywordService {
  constructor(
    private prisma: PrismaService,
    @Inject(MicroServiceName.WORKER) private client: ClientProxy,
  ) {}

  async run({ text, stopwords }: TextAndStopwordPayload) {
    const keyword = await this.prisma.keyword.create({
      data: { text, stopwords },
    });
    this.client.emit(AppEvent.RUN_KEYWORD, { text, stopwords, id: keyword.id });
  }

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.keyword.findMany(query);
    const count = await this.prisma.keyword.count({ where: query.where });
    return {
      values: Helper.cleanTaskInListResponse(
        values as (Keyword & { task: Task })[],
      ),
      count,
    };
  }

  async findOne(id: string) {
    return await this.prisma.keyword.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
