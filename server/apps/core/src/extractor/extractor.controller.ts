import { Body, Controller, Post } from '@nestjs/common';
import { ExtractorService } from './extractor.service';

@Controller('extractor')
export class ExtractorController {
  constructor(private service: ExtractorService) {}

  // @Post('run')
  // async run(@Body() data: TextAndStopwordPayload) {
  //   return await this.service.run(data);
  // }

  // @EventPattern(AppEvent.KEYWORD_STATUS_CHANGED)
  // async terminateAndRespond(data: any) {
  //   FrontendEvent.emit({
  //     data: { event: AppEvent.KEYWORD_STATUS_CHANGED, data },
  //   });
  // }

  // @Get()
  // async all(@Query() args: Pagination) {
  //   return await this.service.findAll(args);
  // }

  // @Get(':id')
  // async one(@Param('id') id: string) {
  //   return await this.service.findOne(id);
  // }
}
