import { Controller, Get, Patch, Param } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('/auto-complete-locations')
  autocomplete() {
    return this.publicService.autocomplete();
  }

  @Get('/trending-properties')
  getTrendingProperties() {
    return this.publicService.getTrendingProperties();
  }

  @Get('property-details/:id')
  getPropertyById(@Param('id') id: string) {
    return this.publicService.getPropertyById(+id);
  }

  @Get('/search-properties')
  searchProperties() {
    return this.publicService.searchProperties();
  }

  @Patch('/increase-property-views-count/:postId')
  increasePropertyViews(@Param('postId') postId: string) {
    return this.publicService.increasePropertyViews(postId);
  }
}
