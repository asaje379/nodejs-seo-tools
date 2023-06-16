import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ExtractorService } from './extractor.service';
import { AppEvent, SoupExtractorPayload } from '@app/shared';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { Pagination } from '../utils/typings';

@Controller('extractor')
export class ExtractorController {
  constructor(private service: ExtractorService) {}

  @Post('run')
  async run(@Body() data: SoupExtractorPayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.EXTRACTION_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.EXTRACTION_STATUS_CHANGED, data },
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
