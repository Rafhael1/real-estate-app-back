export interface ISearchPropertiesQuery {
  minPrice: number | string;
  maxPrice: number | string;
  bedrooms: number | string;
  city: string;
  country: string;
  page: number;
  pageSize: number;
	searchType: string;
}

export interface IGeolocations {
  country: string;
  name: string;
  lat: string;
  lng: string;
}

export interface ICountries {
  name: string;
  cod: string;
}
