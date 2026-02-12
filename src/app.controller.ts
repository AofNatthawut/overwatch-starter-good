import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('status')
  getStatus() {
    return {
      system: 'ULTRON',
      status: 'ONLINE',
    };
  }
}
