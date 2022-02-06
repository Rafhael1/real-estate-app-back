import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicService {
  autocomplete() {
    return `This action returns all public`;
  }

  getTrendingProperties() {
    return 'all properties';
  }

  getPropertyById(id: number) {
    return `This action returns a #${id} public`;
  }

  searchProperties() {
    return `this returns the search results`;
  }

  increasePropertyViews() {
    return 'Increased property view';
  }
}
