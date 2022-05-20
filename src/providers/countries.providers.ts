import { Connection } from 'mongoose';
import { CountriesSchema } from './schemas/countries.schema';

export const countriesProviders = [
  {
    provide: 'COUNTRIES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Countries', CountriesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
