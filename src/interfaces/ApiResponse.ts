export interface ApiResponse<T> {
  statusCode: number;
  requestMethod: string;
  data: T;
}
