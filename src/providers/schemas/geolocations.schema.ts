import * as mongoose from 'mongoose';

export const GeolocationsSchema = new mongoose.Schema({
  country: { type: String, required: false },
  name: { type: String, required: false },
  lat: { type: String, required: false },
  lng: { type: String, required: false },
});
