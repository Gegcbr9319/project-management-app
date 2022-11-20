import { ErrorResponse, throwApiError } from 'model/errors';

export const handleError = <TSuccess>(response: TSuccess | ErrorResponse): TSuccess => {
  if (Object.prototype.hasOwnProperty.call(response, 'statusCode')) {
    // API error
    const { statusCode, message } = response as ErrorResponse;
    throwApiError(statusCode, message);
  }

  return response as TSuccess;
};
