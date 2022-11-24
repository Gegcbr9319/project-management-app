import { AuthState, UnauthenticatedState } from 'model/auth';
import { Token } from 'model/auth/Token';

export const authDefaults: AuthState = JSON.parse(window.localStorage.getItem('auth') || '', (key: string, value: unknown): unknown => {
  return key === 'token' ? new Token(value as string) : value;
}) as AuthState
  || { isAuthenticated: false };
