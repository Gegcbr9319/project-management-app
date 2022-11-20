import { User } from 'model/user';

export interface AuthenticatedState {
  isAuthenticated: true;
  user: User;
  token: string;
}

export interface UnauthenticatedState {
  isAuthenticated: false;
}

export type AuthState = UnauthenticatedState | AuthenticatedState;
