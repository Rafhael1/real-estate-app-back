import { Connection } from 'mongoose';
import { PropertiesSchema } from './schemas/properties.schema';

export const propertiesProviders = [
	{
		provide: 'PROPERTIES_MODEL',
		useFactory: (connection: Connection) =>
			connection.model('Properties', PropertiesSchema),
		inject: ['DATABASE_CONNECTION'],
	},
];
