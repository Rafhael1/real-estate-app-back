import mongoose from 'mongoose';

const GeolocationsSchema = new mongoose.Schema({
	country: { type: String, required: false },
	name: { type: String, required: false },
	lat: { type: String, required: false },
	lng: { type: String, required: false }
});

const model = mongoose.model('Geolocations', GeolocationsSchema);

export default model;