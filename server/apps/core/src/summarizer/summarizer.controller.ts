import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SummarizerService } from './summarizer.service';
import { AppEvent, TextAndUrlPayload } from '@app/shared';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { Pagination } from '../utils/typings';

@Controller('summarizer')
export class SummarizerController {
  constructor(private service: SummarizerService) {}

  @Post('run')
  async run(@Body() data: TextAndUrlPayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.SUMMARIZER_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.SUMMARIZER_STATUS_CHANGED, data },
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
