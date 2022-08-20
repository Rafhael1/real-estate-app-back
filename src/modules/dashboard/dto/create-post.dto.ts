export class CreatePostDto {
  title: string;
  description: string;
  squareMeter: number;
  bathrooms: number;
  bedrooms: number;
  address?: string;
  propertyType: string;
  city: string;
  country: string;
  price: number;
  status: string;
  userId: string;
  images: [string];
}
