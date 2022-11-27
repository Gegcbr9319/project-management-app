export interface ErrorResponse {
  statusCode: number;
  message: string;
}

export interface ErrorState {
  error?: ErrorResponse;
}

export interface ApiError {
  status: number;
  data: ErrorResponse;
}
