export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
}

export interface AssignRoleRequest{
  email : string;
  role : string;
}
