import { PrismaService } from '@app/prisma';
import { AppEvent, MicroServiceName, SiteMapPayload } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';
import { Helper } from '../utils/helper';
import { Sitemap, Task } from '@prisma/client';

@Injectable()
export class SitemapService {
  constructor(
    private prisma: PrismaService,
    @Inject(MicroServiceName.WORKER) private client: ClientProxy,
  ) {}

  async run({ url }: SiteMapPayload) {
    const sitemap = await this.prisma.sitemap.create({
      data: { url },
    });
    this.client.emit(AppEvent.RUN_SITEMAP, { url, id: sitemap.id });
  }

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.sitemap.findMany(query);
    const count = await this.prisma.sitemap.count({ where: query.where });
    return {
      values: Helper.cleanTaskInListResponse(
        values as (Sitemap & { task: Task })[],
      ),
      count,
    };
  }

  async findOne(id: string) {
    return await this.prisma.sitemap.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
