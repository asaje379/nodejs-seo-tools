import { PrismaService } from '@app/prisma';
import { AppEvent, InternalLinkPayload, MicroServiceName, SiteMapPayload } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../utils/typings';
import { paginate } from 'nestjs-prisma-pagination';
import { Helper } from '../utils/helper';
import { InternalLink, Task } from '@prisma/client';

@Injectable()
export class InternalLinkService {
  constructor(
    private prisma: PrismaService,
    @Inject(MicroServiceName.WORKER) private client: ClientProxy,
  ) {}

  async run({ url, nbre }: InternalLinkPayload) {
    const internalLink = await this.prisma.internalLink.create({
      data: { url, depth: nbre },
    });
    this.client.emit(AppEvent.RUN_INTERNAL_LINKS, { url, id: internalLink.id, nbre });
  }

  async findAll(args?: Pagination) {
    const query = paginate(args, { includes: ['task'], search: ['url'] });
    const values = await this.prisma.internalLink.findMany(query);
    const count = await this.prisma.internalLink.count({ where: query.where });
    return {
      values: Helper.cleanTaskInListResponse(
        values as (InternalLink & { task: Task })[],
      ),
      count,
    };
  }

  async findOne(id: string) {
    return await this.prisma.internalLink.findFirst({
      where: { id },
      include: { task: true },
    });
  }
}
