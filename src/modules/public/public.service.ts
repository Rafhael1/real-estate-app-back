import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IDashboard } from '../dashboard/interfaces/dashboard.interface';
@Injectable()
export class PublicService {
  constructor(
    @Inject('PROPERTIES_MODEL')
    private propertiesModel: Model<IDashboard>,
  ) {}
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

  async increasePropertyViews(postId) {
    await this.propertiesModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { views: 1 } },
    );

    return 'Increased property view';
  }
}
