import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, Timeout, Token } from 'models';
import { loadToken } from './loadToken';

export const authSlice = createSlice({
  name: 'auth',
  initialState: loadToken(),
  reducers: {
    setToken({ token }: AuthState, { payload: newToken }: PayloadAction<Token>): AuthState {
      token?.clearTimeout();
      window.localStorage.setItem('token', newToken.encoded);
      return {
        token: newToken,
      };
    },
    removeToken({ token }: AuthState): AuthState {
      token?.clearTimeout();
      window.localStorage.removeItem('token');
      return {
        token: null,
      };
    },
    setTokenTimeout({ token }: AuthState, { payload: timeout }: PayloadAction<Timeout>): void {
      token?.clearTimeout();
      if (token) {
        token.timeout = timeout;
      }
    },
  },
});

export const { setToken, removeToken, setTokenTimeout } = authSlice.actions;
