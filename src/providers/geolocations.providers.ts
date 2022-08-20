import { Connection } from 'mongoose';
import { GeolocationsSchema } from './schemas/geolocations.schema';

export const geolocationsProviders = [
	{
		provide: 'GEOLOCATIONS_MODEL',
		useFactory: (connection: Connection) =>
			connection.model('Geolocations', GeolocationsSchema),
		inject: ['DATABASE_CONNECTION'],
	},
];
