import { PrismaService } from '@app/prisma';
import { AppEvent, MicroServiceName, SoupExtractorPayload } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';
import { Helper } from '../utils/helper';
import { Extractor, Task } from '@prisma/client';

@Injectable()
export class ExtractorService {
  constructor(
    private prisma: PrismaService,
    @Inject(MicroServiceName.WORKER) private client: ClientProxy,
  ) {}

  async run({ url, options }: SoupExtractorPayload) {
    const keyword = await this.prisma.extractor.create({
      data: { url, kinds: options.join(',') },
    });
    this.client.emit(AppEvent.RUN_KEYWORD, { url, options, id: keyword.id });
  }

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.extractor.findMany(query);
    const count = await this.prisma.extractor.count({ where: query.where });
    console.log(values);
    return {
      values: Helper.cleanTaskInListResponse(
        values as (Extractor & { task: Task })[],
      ),
      count,
    };
  }

  async findOne(id: string) {
    return await this.prisma.extractor.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
