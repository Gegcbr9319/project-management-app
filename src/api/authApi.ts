import { AuthToken } from 'model/auth';
import { NewUserDto, UserAuthDto, UserDto } from 'model/user';
import { API_BASE } from './constants';
import { ErrorResponse } from 'model/errors/ErrorResponse';
import { handleError } from './handleError';

export const signUp = async (newUserData: NewUserDto): Promise<UserDto> => {
  const response = (await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  }).then((response) => response.json())) as UserDto | ErrorResponse;

  return handleError<UserDto>(response);
};

export const signIn = async (userAuthData: UserAuthDto): Promise<AuthToken> => {
  const response = (await fetch(`${API_BASE}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userAuthData),
  }).then((response) => response.json())) as AuthToken | ErrorResponse;

  return handleError<AuthToken>(response);
};
