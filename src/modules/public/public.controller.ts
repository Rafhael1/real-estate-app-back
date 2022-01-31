import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('/auto-complete-locations')
  autocomplete() {
    return this.publicService.autocomplete();
  }

  @Get()
  findAllPropeties() {
    return this.publicService.findAllPropeties();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicService.findOne(+id);
  }
}
