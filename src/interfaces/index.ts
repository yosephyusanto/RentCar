export interface MsCarCardResponse {
  car_id: string;
  name: string;
  price_per_day: number;
  status: boolean;
  imageLink: string;
}

export interface MsCarImages{
  image_car_id : string;
  image_link: string;
  car_id: string;
}

export interface MsCarResponse{
  car_id : string;
  name: string;
  model: string;
  year: number;
  license_plate: string;
  number_of_car_seats: number;
  transmission: string;
  price_per_day : number;
  status: boolean;
  images : MsCarImages[];
}

export interface MsCarRequest {
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  numberOfSeats: string;
  transmission: string;
  pricePerDay: number;
}


