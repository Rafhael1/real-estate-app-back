import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { IDashboard } from '../dashboard/interfaces/dashboard.interface';
import {
  ISearchPropertiesQuery,
  IGeolocations,
  ICountries,
} from './interfaces/public.interfaces';
import searcher from 'src/utils/fuzzySearcher';

@Injectable()
export class PublicService {
  constructor(
    @Inject('PROPERTIES_MODEL')
    private propertiesModel: Model<IDashboard>,
    @Inject('GEOLOCATIONS_MODEL')
    private geolocationsModel: Model<IGeolocations>,
    @Inject('COUNTRIES_MODEL')
    private countriesModel: Model<ICountries>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async autocomplete(location: { country: string; city: string }) {
    const cachedGeolocations: [IGeolocations] = await this.cacheManager.get(
      location.country,
    );

    if (!cachedGeolocations?.some(e => e.country === location.country)) {
      const res = await this.geolocationsModel.find({
        country: location.country,
      });
      this.cacheManager.set(location.country, res, { ttl: 300 });
      return searcher(res, location.city, ['city']);
    }

    if (location.city) {
      const filtered = searcher(cachedGeolocations, location.city, ['city']);
      return filtered;
    }
    return cachedGeolocations;
  }

  async getCountries() {
    const cachedCountries: [ICountries] = await this.cacheManager.get(
      'countries',
    );
    if (cachedCountries) {
      return cachedCountries;
    }
    const countries = await this.countriesModel.find().sort({ name: 1 });
    this.cacheManager.set('countries', countries, { ttl: 5000 });

    return countries;
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

  async searchProperties(filter: ISearchPropertiesQuery, pagination) {
    const filterCreator = {};

    if (filter.city?.length > 1) {
      filterCreator['city'] = filter.city;
    }
    const getData = this.propertiesModel
      .find({
        price: {
          $gte: filter?.minPrice || 0,
          $lte: filter?.maxPrice || 100000000,
        },
        isPostActive: true,
        country: filter.country,
        filterCreator,
      })
      .limit(pagination.pageSize)
      .skip(filter.page - 1);

    const getTotalResults = this.propertiesModel.count({
      price: {
        $gte: filter?.minPrice || 0,
        $lte: filter?.maxPrice || 100000000,
      },
      isPostActive: true,
      country: filter.country,
      filterCreator,
    });

    const [data, totalResults] = await Promise.all([getData, getTotalResults]);

    return {
      pagination: { pageSize: pagination.pageSize, totalResults },
      data,
    };
  }

  async increasePropertyViews(postId: string) {
    return await this.propertiesModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { views: 1 } },
    );
  }
}
