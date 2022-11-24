import { AuthState } from 'model/auth';
import { ISerializableToken, Token } from 'model/auth/Token';

export const authDefaults: AuthState = (JSON.parse(
  window.localStorage.getItem('auth') || 'null',
  (key: string, value: unknown): unknown => {
    return key === 'token' ? new Token((value as ISerializableToken).encoded) : value;
  }
) as AuthState) || { isAuthenticated: false };
