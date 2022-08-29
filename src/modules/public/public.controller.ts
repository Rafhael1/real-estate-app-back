import { Controller, Get, Patch, Param, Query, Req } from '@nestjs/common';
import { PublicService } from './public.service';
import { ISearchPropertiesQuery } from './interfaces/public.interfaces';
@Controller('public')
export class PublicController {
	constructor(private readonly publicService: PublicService) {}

	@Get('/auto-complete-locations')
	autocomplete(@Query() location: { country: string; city: string }) {
		return this.publicService.autocomplete(location);
	}

	@Get('/countries')
	getCountries() {
		return this.publicService.getCountries();
	}

	@Get('/trending-properties')
	getTrendingProperties() {
		return this.publicService.getTrendingProperties();
	}

	@Get('property-details/:id')
	getPropertyById(@Param('id') id: string) {
		return this.publicService.getPropertyById(id);
	}

	@Get('/search-properties')
	searchProperties(@Query() filter: ISearchPropertiesQuery, @Req() req: any) {
		return this.publicService.searchProperties(filter, req.pagination);
	}

	@Patch('/increase-property-views-count/:postId')
	increasePropertyViews(@Param('postId') postId: string) {
		return this.publicService.increasePropertyViews(postId);
	}
}
