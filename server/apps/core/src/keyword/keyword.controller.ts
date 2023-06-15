import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { AppEvent, TextAndStopwordPayload } from '@app/shared';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { Pagination } from '../utils/typings';
import { ApiTags } from '@nestjs/swagger';

@Controller('keyword')
@ApiTags('Keyword extractor')
export class KeywordController {
  constructor(private service: KeywordService) {}

  @Post('run')
  async run(@Body() data: TextAndStopwordPayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.KEYWORD_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.KEYWORD_STATUS_CHANGED, data },
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
