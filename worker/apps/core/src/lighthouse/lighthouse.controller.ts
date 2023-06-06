import { AppEvent, LighthousePayload } from '@app/shared';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FrontendEvent } from '../events';
import { LighthouseService } from './lighthouse.service';

@Controller('lighthouse')
export class LighthouseController {
  constructor(private service: LighthouseService) {}

  @Post('run')
  async run(@Body() data: LighthousePayload) {
    return await this.service.run(data);
  }

  @EventPattern(AppEvent.LIGHTHOUSE_FINISHED)
  async terminateAndRespond(data: any) {
    FrontendEvent.emit({
      data: { event: AppEvent.LIGHTHOUSE_FINISHED, data },
    });
  }

  @Get()
  async all() {
    return await this.service.findAll();
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
}
