export interface MsCarCardPaginatedResponse {
  data: MsCarCardResponse[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface MsCarCardResponse {
  car_id: string;
  name: string;
  price_per_day: number;
  status: boolean;
  imageLink: string;
}

export interface MsCarImages {
  image_car_id: string;
  image_link: string;
  car_id: string;
}

export interface MsCarPaginatedResponse {
  data: MsCarResponse[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface MsCarResponse {
  car_id: string;
  name: string;
  model: string;
  year: number;
  license_plate: string;
  number_of_car_seats: number;
  transmission: string;
  price_per_day: number;
  status: boolean;
  images: MsCarImages[];
}

export interface MsCarRequest {
  name: string;
  model: string;
  year: number;
  license_plate: string;
  number_of_car_seats: number;
  transmission: string;
  price_per_day: number;
}
