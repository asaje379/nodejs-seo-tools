import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ObservatoryService } from './observatory.service';
import { AppEvent, UrlPayload } from '@app/shared';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { Pagination } from '../utils/typings';

@Controller('observatory')
export class ObservatoryController {
  constructor(private service: ObservatoryService) {}

  @Post('run')
  async run(@Body() data: UrlPayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.OBSERVATORY_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.OBSERVATORY_STATUS_CHANGED, data },
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
