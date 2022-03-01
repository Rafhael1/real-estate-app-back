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

  async getTrendingProperties() {
    const getTrendingProperties = await this.propertiesModel
      .find()
      .sort({ views: -1 })
      .limit(10);
    console.log(getTrendingProperties);
    return getTrendingProperties;
  }

  async getPropertyById(id: string) {
    const property = await this.propertiesModel.findOne({
      _id: id,
    });
    return property;
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
