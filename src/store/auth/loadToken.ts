import { Token, AuthState } from 'models';

export const loadToken = (): AuthState => {
  const token = localStorage.getItem('token');

  if (token) {
    return {
      token: new Token(token),
    };
  } else {
    return {
      token: null,
    };
  }
};
