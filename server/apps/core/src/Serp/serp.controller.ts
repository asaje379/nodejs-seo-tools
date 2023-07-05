import { AppEvent, SerpPayload, SiteMapPayload } from '@app/shared';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { SerpService } from './serp.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../utils/typings';
// import { SerpScore } from 'apps/worker/src/runners/serp';


@Controller('serp')
@ApiTags('Serp')
export class SerpController {
  constructor(private service: SerpService) { }

  @Post('run')
  async run(@Body() data: SerpPayload, @Req() request: Request) {
    const userAgent = request.headers['user-agent'];
    data['userAgent'] = userAgent;
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.SERP_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.SERP_STATUS_CHANGED, data },
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
