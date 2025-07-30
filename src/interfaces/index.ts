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

export interface CarDetailResponse {
  car: MsCarResponse;
  totalPrice: number;
  rentalDays: number;
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

// TrRental
export interface CreateRentalRequest {
  carId: string;
  rentalDate: string;
  returnDate: string;
}

export interface CreateRentalResponse {
  rentalId: string;
  message: string;
  totalPrice: number;
}

export interface RentalHistoryResponse {
  rentalId: string;
  carName: string;
  carModel: string;
  carYear: number;
  rentalDate: string;
  returnDate: string;
  totalDay: number;
  pricePerDay: number;
  totalPrice: number;
  paymentStatus: boolean;
}

export interface TrRentalPaginatedResponse {
  data: RentalHistoryResponse[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface PaymentRequest {
  paymentMethod: string;
}

export interface PaymentResponse {
  message: string;
  paymentId?: string;
  totalAmount?: number;
}

export interface RentalDetailForPayment {
  rentalId: string;
  carName: string;
  carModel: string;
  carYear: number;
  rentalDate: string;
  returnDate: string;
  totalDay: number;
  pricePerDay: number;
  totalPrice: number;
  paymentStatus: boolean;
}