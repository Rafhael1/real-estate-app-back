import * as mongoose from 'mongoose';

export const GeolocationsSchema = new mongoose.Schema({
	country: { type: String, required: false },
	city: { type: String, required: false },
});
