import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  bathrooms: { type: Number, required: false },
  bedrooms: { type: Number, required: false },
  squareMeter: { type: Number, required: false },
  address: { type: String, required: false },
  propertyType: { type: String, required: false, default: 'Residencial' },
  country: { type: String, required: false },
  price: { type: Number, required: false },
  status: { type: String, required: false },
  images: { type: [String], required: true },
  user: {
    id: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: false },
    phone: { type: Number, required: false },
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  views: { type: Number, required: false, default: 0 },
});
