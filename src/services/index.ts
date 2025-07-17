import { baseApi } from "../constant";
import type {
  MsCarCardResponse,
  MsCarRequest,
  MsCarResponse,
} from "../interfaces";
import axios from "axios";

export const GetCarCardService = async (): Promise<MsCarCardResponse[]> => {
  try {
    const response = await axios.get(baseApi + "/MsCar");

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    return response.data.data;
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
    const response = await axios.post(baseApi + "/MsCar", carData, {
      headers: {
        "Content-Type": "application/json",
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

    const response = await axios.post(
      baseApi + `/upload-images/${carId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
