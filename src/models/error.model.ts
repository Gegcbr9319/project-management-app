export interface ErrorResponse {
  statusCode: number | string;
  message: string;
}

export interface ErrorState {
  error?: ErrorResponse;
}

export interface ApiError {
  status: number;
  data: ErrorResponse;
}
