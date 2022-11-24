import { Token, UpdateUserDto } from 'models';

export interface AuthenticatedState {
  isAuthenticated: true;
  user: UpdateUserDto;
  token: Token;
}

export interface UnauthenticatedState {
  isAuthenticated: false;
}

export type AuthState = UnauthenticatedState | AuthenticatedState;
