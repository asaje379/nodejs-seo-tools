import { AppEvent, LighthousePayload } from '@app/shared';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { LighthouseService } from './lighthouse.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../utils/typings';

@Controller('lighthouse')
@ApiTags('Lighthouse')
export class LighthouseController {
  constructor(private service: LighthouseService) {}

  @Post('run')
  async run(@Body() data: LighthousePayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.LIGHTHOUSE_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.LIGHTHOUSE_STATUS_CHANGED, data },
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
