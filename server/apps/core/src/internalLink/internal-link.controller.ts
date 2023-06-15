import { AppEvent, InternalLinkPayload } from '@app/shared';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { InternalLinkService } from './internal-link.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../utils/typings';


@Controller('internal-link')
@ApiTags('InternalLink')
export class InternalLinkController {
  constructor(private service: InternalLinkService) { }

  @Post('run')
  async run(@Body() data: InternalLinkPayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.INTERNAL_LINK_STATUS_CHANGED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.INTERNAL_LINK_STATUS_CHANGED, data },
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
