import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { IDashboard } from '../dashboard/interfaces/dashboard.interface';
import {
  ISearchPropertiesQuery,
  IGeolocations,
} from './interfaces/public.interfaces';
@Injectable()
export class PublicService {
  constructor(
    @Inject('PROPERTIES_MODEL')
    private propertiesModel: Model<IDashboard>,
    @Inject('GEOLOCATIONS_MODEL')
    private geolocationsModel: Model<IGeolocations>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async autocomplete(location: { country: string }) {
    const cachedGeolocations: [IGeolocations] = await this.cacheManager.get(
      'geolocations',
    );

    if (!cachedGeolocations?.some(e => e.country === location.country)) {
      const res = await this.geolocationsModel.find({
        country: location.country,
      });
      await this.cacheManager.set('geolocations', res, { ttl: 1000 });
      return res;
    }
    return cachedGeolocations;
  }

  async getTrendingProperties() {
    const getTrendingProperties = await this.propertiesModel
      .find()
      .sort({ views: -1 })
      .limit(10);
    return getTrendingProperties;
  }

  async getPropertyById(id: string) {
    const property = await this.propertiesModel.findOne({
      _id: id,
    });
    return property;
  }

  async searchProperties(filter: ISearchPropertiesQuery) {
    const data = await this.propertiesModel.find({
      squareMeter: {
        $gte: filter.minSquareMeters || 0,
        $lte: filter.maxSquareMeters || 10000,
      },
      price: {
        $gte: filter.minPrice || 0,
        $lte: filter.maxPrice || 100000000,
      },
      bedrooms: filter.bedrooms || !null,
      city: filter.city || !null,
      country: filter.country || !null,
    });

    return data;
  }

  async increasePropertyViews(postId: string) {
    await this.propertiesModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { views: 1 } },
    );

    return 'Increased property view';
  }
}
