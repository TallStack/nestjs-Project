import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): {} {
    // return {name: 'retirement annuity policy'};
    return this.appService.getHello();
  }
}
