import { UserDto } from 'model/user';
import { API_BASE } from './constants';
import { ErrorResponse } from 'model/errors/ErrorResponse';
import { handleError } from './handleError';

export const getUser = async (id: string): Promise<UserDto> => {
  const response = (await fetch(`${API_BASE}/users/${id}`).then((response) => response.json())) as
    | UserDto
    | ErrorResponse;

  return handleError<UserDto>(response);
};
