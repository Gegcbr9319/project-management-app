export interface ErrorResponse {
  statusCode: string;
  message: string;
}

export class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }

  toString() {
    return `Error ${this.code}: ${this.message}`;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super('400', message);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string) {
    super('401', message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super('404', message);
  }
}

export class AlreadyExistsError extends ApiError {
  constructor(message: string) {
    super('409', message);
  }
}

export const throwApiError = (code: string, message: string): void => {
  switch (code) {
    case '400':
      throw new BadRequestError(message);
    case '401':
      throw new AuthenticationError(message);
    case '404':
      throw new NotFoundError(message);
    case '409':
      throw new AlreadyExistsError(message);
    default:
      throw new ApiError(code, message);
  }
};
