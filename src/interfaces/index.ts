export interface MsCarCardResponse {
  car_id: string;
  name: string;
  price_per_day: number;
  status: boolean;
  imageLink: string;
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


