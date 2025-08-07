import type { IFilter } from "@/pages/HomePage";
import { baseApi } from "../constant";
import type {
  CarDetailResponse,
  CreateRentalRequest,
  CreateRentalResponse,
  MsCarCardPaginatedResponse,
  MsCarPaginatedResponse,
  MsCarRequest,
  TrRentalPaginatedResponse,
} from "../interfaces";
import axios from "axios";

export const GetCarCardService = async (
  filters: IFilter,
  page: number,
  order?: string
): Promise<MsCarCardPaginatedResponse> => {
  try {
    let url = `${baseApi}/MsCar?pickupDate=${filters.pickupDate}&returnDate=${
      filters.returnDate
    }&carYear=${filters.productionYear ?? ""}&page=${page}`;

    // Add sorting parameter if provided
    if (order && (order === "asc" || order === "desc")) {
      url += `&order=${order}`;
    }

    const response = await axios.get(url);

    console.log("Response data: ", response.data);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
    };
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || "Something went wrong when getting the data"
    );
  }
};

export const GetCarDetail = async (
  carId: string,
  pickupDate: string,
  returnDate: string
): Promise<CarDetailResponse> => {
  try {
    const response = await axios.get(
      baseApi +
        `/MsCar/${carId}?pickupDate=${pickupDate}&returnDate=${returnDate}`
    );

    console.log(response.data.data);
    return response.data.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || "Something went wrong when getting the data"
    );
  }
};

export const GetManageCarData = async (
  page: number = 1,
  pageSize: number = 10
): Promise<MsCarPaginatedResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      baseApi +
        `/MsCar/GetAllCompleteCarData?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      data: response.data.data,
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
    };
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || "Something went wrong when getting the data"
    );
  }
};

export const UploadCarInformationService = async (carData: MsCarRequest) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(baseApi + "/MsCar", carData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    return response.data.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || "Something went wrong when sending the data"
    );
  }
};

export const UploadCarImagesService = async (carId: string, files: File[]) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const token = localStorage.getItem("token");

    const response = await axios.post(
      baseApi + `/MsCar/upload-images/${carId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Upload images response.data: ", response.data);

    return response.data.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || "Something went wrong when sending the data"
    );
  }
};

export const deleteCar = async (carId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(baseApi + `/MsCar/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status code: ", response.status);
    console.log("DeleteCar response.data : ", response.data);

    return response.data.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message ||
        "Something went wrong when trying to delete data"
    );
  }
};

// TrRental
export const createRentalService = async (
  request: CreateRentalRequest
): Promise<CreateRentalResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(baseApi + "/TrRental", request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("create rental response data: ", response.data.data);
    return response.data.data;
  } catch (e: any) {
    throw new Error(
      e.response.data.message ||
        "Something went wrong when trying to rent a car"
    );
  }
};

export const getUserRentalService = async (
  page: number = 1,
  pageSize: number = 10
): Promise<TrRentalPaginatedResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      baseApi + `/TrRental/my-rentals?page=${page}&limit=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      data: response.data.data,
      currentPage: response.data.currentPage,
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
    };
  } catch (e: any) {
    throw new Error(
      e.response.data.message || "Something went wrong when getting the data"
    );
  }
};

export const processPaymentService = async (
  rentalId: string,
  paymentMethod: string
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      baseApi + `/TrRental/${rentalId}/payment`,
      JSON.stringify(paymentMethod),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (e: any) {
    throw new Error(e.response.data.message || "Unexcpected problem");
  }
};
