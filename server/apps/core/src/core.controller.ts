import { Controller, Get, Sse } from '@nestjs/common';
import { CoreService } from './core.service';
import { FrontendEvent } from './events';

@Controller()
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  getHello(): string {
    return this.coreService.getHello();
  }

  @Sse('events')
  sse() {
    return FrontendEvent.observer;
  }
}
