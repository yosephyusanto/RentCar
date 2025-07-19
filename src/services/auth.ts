import axios from "axios";
import { baseApi } from "../constant";
import type {
  AssignRoleRequest,
  LoginRequest,
  RegisterRequest,
} from "../interfaces/auth";

export const registerApi = async (data: RegisterRequest) => {
  try {
    const response = await axios.post(baseApi + "/Account/register", data);
    console.log(response.data);
    return response.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || "Something went wrong when sending the data"
    );
  }
};

export const loginApi = async (data: LoginRequest) => {
  try {
    const response = await axios.post(baseApi + "/Account/login", data);
    console.log(response.data);
    return response.data;
  } catch (e: any) {
    console.log(e.response?.data?.message);
    throw new Error(
      e.response?.data?.message || "Something went wrong when sending the data"
    );
  }
};

export const assignRole = async (data: AssignRoleRequest) => {
  try {
    const response = await axios.post(baseApi + "/Account/assign-role", data);
    return response.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || "Something went wrong when assign role"
    );
  }
};
