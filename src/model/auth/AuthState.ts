import { User } from 'model/user';
import { Token } from './Token';

export interface AuthenticatedState {
  isAuthenticated: true;
  user: User;
  token: Token;
}

export interface UnauthenticatedState {
  isAuthenticated: false;
}

export type AuthState = UnauthenticatedState | AuthenticatedState;
