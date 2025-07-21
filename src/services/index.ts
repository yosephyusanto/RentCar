import { baseApi } from "../constant";
import type {
  MsCarCardPaginatedResponse,
  MsCarRequest,
  MsCarResponse,
} from "../interfaces";
import axios from "axios";

export const GetCarCardService = async (
  page: number,
  order?: string
): Promise<MsCarCardPaginatedResponse> => {
  try {
    let url = `${baseApi}/MsCar?page=${page}`;

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

export const GetCarDetail = async (carId: string): Promise<MsCarResponse> => {
  try {
    const response = await axios.get(baseApi + `/MsCar/${carId}`);
    return response.data.data;
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
    formData.append("carId", carId);
    files.forEach((file) => {
      formData.append("files", file);
    });

    const token = localStorage.getItem("token");

    const response = await axios.post(
      baseApi + `/upload-images/${carId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || "Something went wrong when sending the data"
    );
  }
};
