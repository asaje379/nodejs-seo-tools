import { AppEvent, SiteMapPayload } from '@app/shared';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { SitemapService } from './sitemap.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../utils/typings';


@Controller('site-map')
@ApiTags('SiteMap')
export class SitemapController {
  constructor(private service: SitemapService) {}

  @Post('run')
  async run(@Body() data: SiteMapPayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.SITEMAP_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.SITEMAP_STATUS_CHANGED, data },
    });
  }

  @Get()
  async all(@Query() args: Pagination) {
    return await this.service.findAll(args);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
