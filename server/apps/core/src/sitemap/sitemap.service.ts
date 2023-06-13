import { PrismaService } from '@app/prisma';
import { AppEvent, MicroServiceName, SiteMapPayload } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';

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
    console.log('------------ after inserted in db ----------------');
    
    this.client.emit(AppEvent.RUN_SITEMAP, { url, id: sitemap.id });
  }

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.sitemap.findMany(query);
    const count = await this.prisma.sitemap.count({ where: query.where });
    return { values, count };
  }

  async findOne(id: string) {
    return await this.prisma.sitemap.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
