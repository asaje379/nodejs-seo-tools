import { Controller, Get, Sse } from '@nestjs/common';
import { CoreService } from './core.service';
import { FrontendEvent } from './events';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get('liveness')
  getHello(): string {
    return this.coreService.getHello();
  }

  @Sse('events')
  sse() {
    return FrontendEvent.observer;
  }
}
