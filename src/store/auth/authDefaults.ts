import { AuthState, ISerializableToken, Token } from 'models';

export const authDefaults: AuthState = (JSON.parse(
  window.localStorage.getItem('auth') || 'null',
  (key: string, value: unknown): unknown => {
    return key === 'token' ? new Token((value as ISerializableToken).encoded) : value;
  }
) as AuthState) || { isAuthenticated: false };
