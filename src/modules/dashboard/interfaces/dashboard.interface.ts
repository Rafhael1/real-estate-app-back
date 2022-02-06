import { Document } from 'mongoose';

export interface IDashboard extends Document {
  title: string;
  description: string;
  bathrooms: number;
  bedrooms: number;
  squareMeter: number;
  address: string;
  propertyType: string;
  country: string;
  price: number;
  status: string;
  images: string[];
  user: {
    id: string;
    email: string;
    name: string;
    phone: number;
  };
  postDate: Date;
  views: number;
}
